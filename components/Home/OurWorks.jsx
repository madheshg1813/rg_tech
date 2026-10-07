import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { works } from '@/lib/works'
import { cld, cldSize } from '@/lib/cloudinary'

/*
 * Three photo strips, adjacent rows scrolling in opposite directions.
 *
 * Deliberately a server component: the marquee is pure CSS (see .marquee-track
 * in globals.css), so nothing here needs to reach the browser as JavaScript,
 * and resolving the Cloudinary URLs at render time keeps the 710-entry manifest
 * out of the client bundle.
 */

// The two card heights the layout renders. Each is offered at 1x and 2x as a
// width-descriptor srcset, so the browser picks per breakpoint and per device
// pixel ratio rather than a phone downloading a desktop-sized crop.
//
// Mobile is deliberately close to desktop: at 150px a phone showed three
// slivers per row and the cut detail — which is the whole point of these
// photos — was unreadable. 220px puts roughly two cards on a 375px screen.
const CARD_H_MOBILE = 220
const CARD_H = 260

// Card width follows each photo's own aspect ratio rather than cropping
// everything to one shape — the work is a mix of tall gate panels and wide
// compound walls. Clamped so a very tall or very wide frame cannot turn into a
// sliver or a banner.
const MIN_RATIO = 0.62
const MAX_RATIO = 1.45

/*
 * Three rows, not one or two.
 *
 * Each row's track is rendered twice, so its layer is twice the width of its
 * share of the photos. Chrome rasterises a composited layer into a single
 * texture capped at 16384px: with all 54 photos split over two rows the track
 * came out ~18700px wide and the layer failed to raster, painting the whole
 * section blank. Three rows keeps every track near 10000px, well inside the cap.
 */
const ROW_COUNT = 3

function toCard(work) {
    const size = cldSize(work.src)
    const natural = size ? size.width / size.height : 1
    const ratio = Math.min(MAX_RATIO, Math.max(MIN_RATIO, natural))

    // One slot, at 1x and 2x, rather than both card heights at both densities.
    //
    // The two heights are 220px and 260px -- an 18% difference -- so four
    // candidates were being written out to choose between sizes a person cannot
    // tell apart. That cost is not the images, which are lazy; it is the URL
    // text. At 50 photos rendered twice for the loop, the marquee was emitting
    // over a thousand Cloudinary URLs into the HTML, and every one of them is
    // written a second time into the hydration payload. Phones now take the
    // desktop slot's candidate, which is marginally larger than they need and
    // never visible.
    const slot = { w: Math.round(CARD_H * ratio), h: CARD_H }
    const variants = [slot, { w: slot.w * 2, h: slot.h * 2 }]

    // Only the frames that got clamped are actually cropped; g_auto keeps the
    // cut centred on the panel rather than on empty floor.
    const url = (v) =>
        cld(work.src, { width: v.w, height: v.h, crop: 'fill', gravity: 'auto', dpr: false })

    return {
        ...work,
        ratio,
        src: url(slot),
        srcSet: variants.map((v) => `${url(v)} ${v.w}w`).join(', '),
        sizes: `${slot.w}px`,
    }
}

const cards = works.map(toCard)
const per = Math.ceil(cards.length / ROW_COUNT)

// Slightly different durations: three rows at one speed read as a single rigid
// block sliding, rather than as separate strips.
const DURATIONS = ['62s', '74s', '68s']

const rows = Array.from({ length: ROW_COUNT }, (_, i) => ({
    items: cards.slice(i * per, i * per + per),
    duration: DURATIONS[i],
    reverse: i % 2 === 1,
}))

function Card({ item }) {
    return (
        <div
            className="framed-soft relative h-[220px] md:h-[260px] shrink-0 mx-2 md:mx-2.5 bg-line"
            style={{ aspectRatio: item.ratio }}
        >
            <img
                src={item.src}
                srcSet={item.srcSet}
                sizes={item.sizes}
                alt={item.alt}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
            />
        </div>
    )
}

function Row({ row }) {
    // The track is rendered twice and translated by -50%, so the loop point
    // lands on an identical frame. The copy is aria-hidden to keep every photo
    // announced exactly once.
    //
    // Every card is lazy, and stays lazy now that this sits directly under the
    // hero on both the home page and the service pillars. 54 photos must not
    // compete with the hero's priority image for bandwidth on first paint; the
    // browser's lazy-load margin starts them well before they scroll into view
    // anyway.
    return (
        <div className="marquee-viewport overflow-hidden">
            <div
                className={`marquee-track ${row.reverse ? 'marquee-track-reverse' : ''}`}
                style={{ '--marquee-duration': row.duration }}
            >
                {row.items.map((item) => (
                    <Card key={item.src} item={item} />
                ))}
                <div className="flex" aria-hidden="true">
                    {row.items.map((item) => (
                        <Card key={`dup-${item.src}`} item={item} />
                    ))}
                </div>
            </div>
        </div>
    )
}

const OurWorks = () => {
    return (
        <section id="our-works" className="section bg-surface-2 border-y border-line overflow-hidden">
            <div className="shell mb-12">
                <div className="text-center">
                    <p className="eyebrow mb-2">Delivered Projects</p>
                    <h3 className="section-title text-fg">Our Works</h3>
                    <p className="mt-4 text-fg-muted max-w-2xl mx-auto">
                        Laser-cut gates, jali screens, temple panels, signage and decor —
                        cut, finished and installed by RG Tech Engineering.
                    </p>
                </div>
            </div>

            <div className="flex flex-col gap-3 md:gap-5">
                {rows.map((row, i) => (
                    <Row key={i} row={row} />
                ))}
            </div>

            <div className="shell mt-12 text-center">
                <Link href="/gallery" className="btn btn-secondary-light group">
                    View the full gallery
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
        </section>
    )
}

export default OurWorks
