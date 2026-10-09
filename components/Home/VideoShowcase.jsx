import { videos } from '@/lib/videos'
import { cld, cldPoster } from '@/lib/cloudinary'

/*
 * Clips from the floor, between the hero and the Our Works strip.
 *
 * No heading. The section used to announce itself with an "In Motion" eyebrow,
 * an "Our Work in Motion" title and a line of description, which was three
 * lines of furniture above four small clips that explain themselves. The row
 * now sits bare between the hero and the works gallery, on the same white
 * ground as the hero so the two read as one opening rather than as two bands.
 *
 * A server component, like OurWorks: <video> needs no JavaScript to play, the
 * controls are the browser's own, and resolving Cloudinary URLs at render time
 * keeps the manifest out of the client bundle.
 *
 * The section renders nothing at all while lib/videos.js is empty, so the home
 * page is unchanged until the first clip is listed.
 *
 * Sizing follows OurWorks rather than inventing its own: a fixed tile height
 * with the width falling out of each clip's aspect ratio. Phone footage is
 * portrait, and a portrait video given a full column turns into a tower that
 * pushes everything below it off the screen — these are meant to read as a row
 * of small tiles sitting under the photographs, not as a feature.
 *
 * Every clip autoplays, muted and looping. `muted` and `playsInline` are what
 * make that permitted at all: an unmuted autoplay is blocked outright, and
 * without playsInline iOS takes the video fullscreen rather than playing it in
 * place. `controls` is not optional either — WCAG 2.2.2 wants a way to stop
 * motion running past five seconds, and a loop runs forever.
 *
 * The cost of running the whole row at once is paid down at delivery rather
 * than by not autoplaying: each clip is requested from Cloudinary at twice its
 * rendered width and no further, so a 720x1280 source is not shipped whole
 * into a 250px tile.
 */

// A single clip is the feature and gets the most height. Several become a row,
// still big, sized so four portrait clips fit one line inside max-w-7xl: at
// 440px tall a 9:16 clip is ~247px wide, so 4 tiles plus gaps come to ~1036px
// against the 1232px of usable width. A fifth wraps rather than shrinking the
// rest, which is the right failure — a row of five slivers reads as nothing.
const SOLO_H_MOBILE = 380
const SOLO_H = 560
const TILE_H_MOBILE = 300
const TILE_H = 440

// Width follows the clip's own ratio, clamped so a very tall or very wide
// frame cannot become a sliver or a banner.
const MIN_RATIO = 0.55
const MAX_RATIO = 1.45

function Clip({ video, solo }) {
    const natural = video.width && video.height ? video.width / video.height : 9 / 16
    const ratio = Math.min(Math.max(natural, MIN_RATIO), MAX_RATIO)

    const hMobile = solo ? SOLO_H_MOBILE : TILE_H_MOBILE
    const h = solo ? SOLO_H : TILE_H

    // Ask Cloudinary for a rendition sized to the slot, at 2x for retina. A
    // 720x1280 source delivered whole is ~2MB; into a 250px tile that is most
    // of a megabyte per clip spent on pixels no one can see, and with every
    // clip autoplaying it is paid on every page load.
    const deliveryWidth = Math.round(h * ratio * 2)

    // Falls back to the local path until the upload script has run, and to the
    // entry's own poster (then to none) until Cloudinary can generate one.
    // q_auto:eco rather than q_auto. It is a visible tradeoff on a full-bleed
    // hero video and an invisible one at 250px, and here it is paid four times
    // on every page load: 3.89MB across the row becomes 2.73MB.
    const src = cld(video.src, { width: deliveryWidth, quality: 'auto:eco' })
    const poster = cldPoster(video.src, deliveryWidth) || (video.poster ? cld(video.poster) : undefined)

    return (
        <figure className="m-0 flex flex-col">
            <div
                className="framed overflow-hidden h-[var(--tile-h-mobile)] sm:h-[var(--tile-h)] w-[var(--tile-w-mobile)] sm:w-[var(--tile-w)]"
                style={{
                    '--tile-h-mobile': `${hMobile}px`,
                    '--tile-h': `${h}px`,
                    '--tile-w-mobile': `${Math.round(hMobile * ratio)}px`,
                    '--tile-w': `${Math.round(h * ratio)}px`,
                    maxWidth: '100%',
                }}
            >
                <video
                    src={src}
                    poster={poster}
                    autoPlay
                    muted
                    loop
                    playsInline
                    controls
                    preload="auto"
                    // Deliberately generic without a label: one that names the
                    // wrong process is worse for a screen reader than none.
                    aria-label={video.title || 'Video of work at RG Tech Engineering Works'}
                    className="block h-full w-full object-cover bg-ink"
                />
            </div>

            {video.caption && (
                <figcaption className="mt-2 max-w-[18ch] text-xs leading-snug text-fg-muted text-pretty">
                    {video.caption}
                </figcaption>
            )}
        </figure>
    )
}

const VideoShowcase = () => {
    if (!videos.length) return null

    const solo = videos.length === 1

    return (
        <section
            id="on-the-floor"
            className="relative isolate overflow-hidden bg-surface border-b border-line py-8 sm:py-10"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                    {videos.map((video) => (
                        <Clip key={video.src} video={video} solo={solo} />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default VideoShowcase;
