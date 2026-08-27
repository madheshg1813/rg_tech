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

    // The two slot sizes the layout renders, plus each at double density. The
    // 2x entries are derived from the rounded 1x width rather than from the
    // height, so a 2x device asks for a candidate that exists exactly instead
    // of rounding past it to the next one up.
    const slots = [CARD_H_MOBILE, CARD_H].map((h) => ({ w: Math.round(h * ratio), h }))
    const variants = [...slots, ...slots.map((s) => ({ w: s.w * 2, h: s.h * 2 }))]
        .sort((a, b) => a.w - b.w)

    // Only the frames that got clamped are actually cropped; g_auto keeps the
    // cut centred on the panel rather than on empty floor.
    const url = (v) =>
        cld(work.src, { width: v.w, height: v.h, crop: 'fill', gravity: 'auto', dpr: false })

    return {
        ...work,
        ratio,
        src: url(slots[1]),
        srcSet: variants.map((v) => `${url(v)} ${v.w}w`).join(', '),
        sizes: `(max-width: 767px) ${slots[0].w}px, ${slots[1].w}px`,
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
        <section id="our-works" className="py-24 bg-surface-2 border-y border-line overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 mb-12">
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

            <div className="max-w-7xl mx-auto px-4 mt-12 text-center">
                <Link href="/gallery" className="btn btn-secondary-light group">
                    View the full gallery
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
        </section>
    )
}

export default OurWorks
