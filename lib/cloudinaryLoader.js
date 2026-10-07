/**
 * Custom next/image loader.
 *
 * Next calls this once per entry in the generated srcset, so Cloudinary — not a
 * serverless function on our own origin — does the resizing and format
 * negotiation. That keeps image work entirely on the CDN edge.
 *
 * It handles four kinds of src:
 *   1. A Cloudinary delivery URL  -> inject/replace the transformation segment.
 *   2. An Unsplash delivery URL   -> set w/q on their imgix pipeline.
 *   3. Any other remote URL       -> return unchanged.
 *   4. A local /public path       -> return unchanged (pre-migration fallback).
 *
 * Must stay synchronous and dependency-free: it is bundled for the client.
 */

const CLOUDINARY_HOST = 'res.cloudinary.com'
const UNSPLASH_HOST = 'images.unsplash.com'

export default function cloudinaryLoader({ src, width, quality }) {
    if (typeof src !== 'string') return src

    /*
     * Unsplash serves through imgix, which takes the same w/q/auto/fit params.
     * Honouring `width` here is what stops Next warning that the loader does not
     * implement width — and, more to the point, it is what makes the srcset real:
     * without it every viewport downloads the one size the URL happens to carry.
     *
     * fit=crop with no crop box just constrains to w, so the aspect ratio of the
     * source is preserved and the CSS does the framing.
     */
    if (src.includes(UNSPLASH_HOST)) {
        const [base] = src.split('?')
        const q = quality || 80
        return `${base}?auto=format&fit=crop&w=${width}&q=${q}`
    }

    if (!src.includes(CLOUDINARY_HOST)) {
        return src
    }

    /*
     * .../<cloud>/image/upload/[<transforms>/]v123/<public-id>.<ext>
     *
     * /video/upload/ is matched too, because cldPoster() builds a still frame
     * from a clip at that path. It was falling through unchanged, so Next warned
     * that the loader ignores width and every viewport fetched the same w_900
     * frame the helper happened to bake in.
     */
    const marker = ['/image/upload/', '/video/upload/']
        .find((m) => src.includes(m))
    if (!marker) return src
    const at = src.indexOf(marker)

    const prefix = src.slice(0, at + marker.length)
    let rest = src.slice(at + marker.length)

    // Drop any transformation segment already present so ours is authoritative.
    // A transformation segment is the leading path chunk that is not a version
    // (v123…) and contains transformation syntax (a comma or `x_` parameter).
    const firstSlash = rest.indexOf('/')
    if (firstSlash !== -1) {
        const head = rest.slice(0, firstSlash)
        const isVersion = /^v\d+$/.test(head)
        const looksLikeTransform = head.includes(',') || /^[a-z]{1,3}_/.test(head)
        if (!isVersion && looksLikeTransform) {
            rest = rest.slice(firstSlash + 1)
        }
    }

    /*
     * q_auto:best, not q_auto.
     *
     * Bare q_auto resolves to Cloudinary's "good" tier. The step up costs far
     * less than it looks like it should, because f_auto hands AVIF to anything
     * that will take it and AVIF absorbs the difference: measured on the hero
     * at w_828, q_auto is 99KB as WebP and 61KB as AVIF, while q_auto:best is
     * 84KB as AVIF -- better than the old quality AND smaller than the old
     * WebP. c_limit keeps it from ever upscaling past the original, so a
     * higher tier can never invent detail the source does not have.
     */
    const transforms = [
        'f_auto',
        `q_${quality || 'auto:best'}`,
        `w_${width}`,
        'c_limit', // never upscale past the original
    ].join(',')

    return `${prefix}${transforms}/${rest}`
}
