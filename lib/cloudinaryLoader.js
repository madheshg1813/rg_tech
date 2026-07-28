/**
 * Custom next/image loader.
 *
 * Next calls this once per entry in the generated srcset, so Cloudinary — not a
 * serverless function on our own origin — does the resizing and format
 * negotiation. That keeps image work entirely on the CDN edge.
 *
 * It handles three kinds of src:
 *   1. A Cloudinary delivery URL  -> inject/replace the transformation segment.
 *   2. A remote non-Cloudinary URL -> return unchanged.
 *   3. A local /public path        -> return unchanged (pre-migration fallback).
 *
 * Must stay synchronous and dependency-free: it is bundled for the client.
 */

const CLOUDINARY_HOST = 'res.cloudinary.com'

export default function cloudinaryLoader({ src, width, quality }) {
    if (typeof src !== 'string' || !src.includes(CLOUDINARY_HOST)) {
        return src
    }

    // .../<cloud>/image/upload/[<existing transforms>/]v123/<public-id>.<ext>
    const marker = '/image/upload/'
    const at = src.indexOf(marker)
    if (at === -1) return src

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

    const transforms = [
        'f_auto',
        `q_${quality || 'auto'}`,
        `w_${width}`,
        'c_limit', // never upscale past the original
    ].join(',')

    return `${prefix}${transforms}/${rest}`
}
