"use client"
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect, useRef, useCallback, Fragment } from 'react'
import {
    X, ChevronLeft, ChevronRight, Maximize2, MessageCircle,
    Sparkles, Phone, ArrowRight, Plus, MapPin,
    Send, PenTool, Flame, Home, DoorOpen, Landmark, Frame,
} from 'lucide-react'
import { godImageAlt, designRef, crosslinkDesigns } from '@/lib/godDesigns'
import { headlinePlaces } from '@/lib/godDesignCopy'
import { CITIES, serviceUrl } from '@/lib/cities'
import { IMAGES } from '@/content/lib/images.mjs'

const WA = '916380736439'

const USES = [
    { icon: Home, label: 'Pooja rooms', detail: 'Partitions and back panels' },
    { icon: DoorOpen, label: 'Main gates', detail: 'Gate and compound wall inserts' },
    { icon: Landmark, label: 'Temple arches', detail: 'Entrance and arch panels' },
    { icon: Frame, label: 'Wall art', detail: 'Living and prayer room pieces' },
]

/*
 * How a custom panel actually gets made, in the order it happens.
 *
 * This replaced two paragraphs of prose that said the same thing. The prose
 * sat in a single column beside a short sticky card, so the section was a tall
 * left half against an empty right half -- most of a screen of nothing at the
 * bottom right on a desktop. Steps read faster than prose for a process, and
 * they use the full width, which is what removes the hole rather than any
 * change of colour.
 */
/*
 * The hero's proof line.
 *
 * Short claims, the way the reference uses them -- each one a reason to carry
 * on rather than a specification. Everything here traces to something already
 * on the site: the count is the gallery below, the quote turnaround and the
 * delivery cities are lib/data.js and lib/cities.js.
 */
const heroSpecs = (count) => [
    `${count} ready designs`,
    'Quote in 24 hours',
    'Delivered across Tamil Nadu',
]

const STEPS = [
    {
        icon: Send,
        title: 'Send your reference',
        body: 'A reference code from the catalogue above, a photograph, a temple image, or a sketch on the back of an envelope. All of them work.',
    },
    {
        icon: PenTool,
        title: 'We make it cuttable',
        body: 'It is converted to a vector cutting file, and we check the design holds together once metal is removed — adding bridges where an ornament would otherwise float free.',
    },
    {
        icon: Flame,
        title: 'Cut, finished, delivered',
        body: 'Cut on our CNC fiber laser in Chennai, then framed and powder coated in house if you want it ready to mount. Sizes are confirmed before anything is cut.',
    },
]

/** Prefilled WhatsApp link. Quoting the ref means the enquiry is unambiguous. */
function waLink(design, image, index) {
    const msg = image
        ? `Hi RG Tech, I'm interested in ${design.name} design ${designRef(design, index)} — ${image.title} (${image.material}). Please share sizes and pricing.`
        : `Hi RG Tech, I'm interested in laser cut ${design.name} designs. Please share the catalogue, sizes and pricing.`
    return `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`
}

/*
 * One catalogue cell.
 *
 * Shared by the phone scroller and the desktop marquee so the two cannot drift
 * apart -- only the sizing comes from the caller.
 *
 * `decorative` is for the marquee's second lap. That copy exists to make the
 * loop seamless and is aria-hidden, so it must not contain anything focusable:
 * it renders a plain clickable div instead of a button. Mouse users can still
 * open whichever copy is in front of them, and a screen reader is read the
 * seven real buttons once rather than announcing the strip four times over.
 */
function Panel({ design, item, index, onOpen, className = '', sizes, decorative = false }) {
    const Media = decorative ? 'div' : 'button'
    const mediaProps = decorative
        ? { role: 'presentation' }
        : { type: 'button', 'aria-label': `Open ${item.title} full size` }

    return (
        <figure
            className={`framed-soft group bg-white overflow-hidden flex flex-col transition-all hover:shadow-2xl hover:-translate-y-1 ${className}`}
        >
            {/*
                3:5 is the plate: 300 x 500 mm, or 600 x 1000 mm as a wall
                panel. The box shows the panel's real proportions rather than a
                crop of them.

                object-contain at every width, not just on phones. The original
                Ganesh set is 1536 x 2752 — near 9:16, not 3:5 — and `cover`
                would shave about 7% off the top and bottom of each one, which
                on these designs means clipping the border frame. Matting costs
                a few pixels of white either side, and the panels are on white
                anyway, so the bars are invisible.
            */}
            <Media
                {...mediaProps}
                onClick={() => onOpen(index)}
                className="relative aspect-[3/5] max-sm:max-h-[56svh] bg-surface-2 overflow-hidden cursor-zoom-in block w-full"
            >
                <Image
                    src={item.src}
                    alt={godImageAlt(design, item, index + 1)}
                    fill
                    sizes={sizes}
                    className="object-contain transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-ink/75 backdrop-blur-sm">
                    <span className="meta-label text-white/90">{designRef(design, index)}</span>
                </span>
                <span className="absolute bottom-3 right-3 w-9 h-9 rounded-xl bg-cta text-white flex items-center justify-center opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all">
                    <Maximize2 className="w-4 h-4" />
                </span>
            </Media>

            {/* Caption sits under the image rather than in a hover overlay --
                on touch there is no hover, and a catalogue should be readable
                without interaction. */}
            <figcaption className="p-3 sm:p-4 border-t border-line flex-1 flex flex-col">
                <h3 className="card-title text-fg leading-snug">{item.title}</h3>
                <p className="text-xs sm:text-sm text-fg-muted mt-1.5">{item.material}</p>
            </figcaption>
        </figure>
    )
}

export default function GodDesignGallery({ design }) {
    // What the h1 advertises this gallery is for, from the gallery's own data.
    const places = headlinePlaces(design.placements)

    const images = design.images
    const hasImages = images.length > 0
    const faqs = design.faqs || []
    const crosslinks = crosslinkDesigns(design.slug, IMAGES.panel)

    /*
     * Marquee card width, and why it is this wide.
     *
     * A lap has to be wider than the screen -- the track is drawn twice and
     * translated by -50%, so anything narrower shows the loop point. At 190px
     * a lap was 1470px, so it had to carry the set twice to clear a 1920
     * monitor, and the cost of that was seeing the same panel twice on screen
     * at once: ten cards fit, and the set is only seven.
     *
     * Bigger cards fix both ends of that. A lap of seven at 380px is 2660px,
     * past any ordinary monitor on its own, so the set is laid once and no
     * panel appears twice.
     *
     * The ceiling is vertical, not horizontal. These panels are 9:16, so width
     * costs height at nearly twice the rate: 360px of card is already a 640px
     * image, and a 1080p browser has about 940px of viewport once the chrome
     * is gone. Three panels across a 1920 screen would need roughly 620px each
     * -- an 1100px image, taller than the screen it sits in.
     */
    //
    // min-w-0 is load-bearing, not tidiness. These are flex items, so they
    // default to min-width:auto, and the media box inside carries an
    // aspect-ratio with no fixed height -- the height it gets from the flex
    // line feeds back through the ratio as a min-content width and pins the
    // card there, ignoring the width below it. Left in, every card stayed at
    // whatever width the first layout happened to settle on.
    const MARQUEE_CARD = 'w-[260px] lg:w-[320px] xl:w-[360px] 2xl:w-[400px] min-w-0'
    const MARQUEE_SIZES =
        '(min-width: 1536px) 400px, (min-width: 1280px) 360px, (min-width: 1024px) 320px, 260px'

    const [lightboxIndex, setLightboxIndex] = useState(null)
    const isOpen = lightboxIndex !== null
    const current = isOpen ? images[lightboxIndex] : null

    const close = () => setLightboxIndex(null)
    const next = (e) => { e?.stopPropagation(); setLightboxIndex((i) => (i + 1) % images.length) }
    const prev = (e) => { e?.stopPropagation(); setLightboxIndex((i) => (i - 1 + images.length) % images.length) }

    // Escape and arrow keys. The main gallery predates this and does without,
    // but a lightbox with no keyboard exit is a trap for anyone not using a
    // mouse, and it costs one effect.
    useEffect(() => {
        if (!isOpen) return
        const onKey = (e) => {
            if (e.key === 'Escape') close()
            if (e.key === 'ArrowRight') next()
            if (e.key === 'ArrowLeft') prev()
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [isOpen, images.length])

    /*
     * Autoplay for the mobile scroller.
     *
     * Phone only -- from sm: up the grid already shows every panel at once and
     * there is nothing to advance. Three guards, because a strip that moves by
     * itself is an accessibility problem if it cannot be stopped:
     *
     *   - a swipe hands control over for good. Autoplay does not fight the
     *     visitor for the strip once they have taken hold of it.
     *   - prefers-reduced-motion turns it off outright.
     *   - off-screen, or with the lightbox open, it holds still rather than
     *     scrolling somewhere nobody is looking.
     *
     * Reads the step off the rendered card instead of hardcoding it, so it
     * stays correct if the card width or the gap changes.
     */
    const scrollerRef = useRef(null)
    const rafRef = useRef(null)
    const takenOverRef = useRef(false)
    const lightboxOpenRef = useRef(false)
    const stopAutoplayRef = useRef(() => {})

    // Which panel the strip is resting on, for the "3 / 7" between the arrows.
    // A no-peek carousel gives no other clue how far through it you are.
    const [panelIndex, setPanelIndex] = useState(0)

    useEffect(() => { lightboxOpenRef.current = isOpen }, [isOpen])

    /*
     * The glide is animated by hand rather than with scrollTo's 'smooth'.
     *
     * Two reasons, either of which is enough. A mandatory snap container
     * fights a smooth programmatic scroll -- Chromium re-snaps mid-flight and
     * the strip ends up back where it started. And 'smooth' is simply inert in
     * some embedded webviews, where the same call with 'auto' lands instantly:
     * a carousel that silently never moves on a subset of browsers is worse
     * than one that does its own tween everywhere.
     *
     * Snapping is lifted for the duration, since setting scrollLeft every
     * frame under `mandatory` fights the snap engine the same way, and put
     * back at the end -- the strip lands exactly on a snap point, so the
     * visitor's own swipes carry on snapping with nothing to correct.
     */
    const glide = useCallback((to, ms) => {
        const el = scrollerRef.current
        if (!el) return
        const from = el.scrollLeft
        const t0 = performance.now()
        el.style.scrollSnapType = 'none'

        const frame = (now) => {
            const t = Math.min(1, (now - t0) / ms)
            const eased = 1 - Math.pow(1 - t, 3)
            el.scrollLeft = from + (to - from) * eased
            if (t < 1) {
                rafRef.current = requestAnimationFrame(frame)
            } else {
                rafRef.current = null
                el.style.scrollSnapType = ''
            }
        }
        rafRef.current = requestAnimationFrame(frame)
    }, [])

    // One panel in either direction, wrapping at both ends. Shared by the
    // arrows and by autoplay, so the two can never disagree about a step.
    const goToPanel = useCallback((dir) => {
        const el = scrollerRef.current
        if (!el || rafRef.current) return
        const card = el.firstElementChild
        if (!card) return

        const gap = parseFloat(getComputedStyle(el).columnGap) || 0
        const step = card.getBoundingClientRect().width + gap
        const max = el.scrollWidth - el.clientWidth
        const atEnd = el.scrollLeft >= max - 2
        const atStart = el.scrollLeft <= 2

        let to
        if (dir > 0) to = atEnd ? 0 : Math.min(max, el.scrollLeft + step)
        else to = atStart ? max : Math.max(0, el.scrollLeft - step)

        // Set the counter from the destination rather than waiting for the
        // scroll listener: it reads true the moment the arrow is pressed
        // instead of 450ms later, and a step stays correct even where scroll
        // events are coalesced away. The listener still covers swipes.
        setPanelIndex(Math.round(to / step))

        // A wrap crosses the whole strip, so it gets longer to travel in
        // rather than arriving as a whip-pan.
        glide(to, (dir > 0 ? atEnd : atStart) ? 700 : 450)
    }, [glide])

    // Pressing an arrow is the visitor steering, the same as a swipe: autoplay
    // stands down rather than yanking the strip onward mid-read.
    const onArrow = useCallback((dir) => {
        takenOverRef.current = true
        stopAutoplayRef.current()
        goToPanel(dir)
    }, [goToPanel])

    // Keep the counter honest however the strip moved -- arrow, swipe or
    // autoplay. Reading scrollLeft is the single source of truth.
    useEffect(() => {
        const el = scrollerRef.current
        if (!el) return
        const onScroll = () => {
            const card = el.firstElementChild
            if (!card) return
            const gap = parseFloat(getComputedStyle(el).columnGap) || 0
            const step = card.getBoundingClientRect().width + gap
            if (step > 0) setPanelIndex(Math.round(el.scrollLeft / step))
        }
        el.addEventListener('scroll', onScroll, { passive: true })
        return () => el.removeEventListener('scroll', onScroll)
    }, [images.length])

    useEffect(() => {
        const el = scrollerRef.current
        if (!el || images.length < 2) return

        const phone = window.matchMedia('(max-width: 639px)')
        const motionOk = window.matchMedia('(prefers-reduced-motion: no-preference)')

        let timer = null

        const stop = () => {
            clearInterval(timer)
            timer = null
            if (rafRef.current) cancelAnimationFrame(rafRef.current)
            rafRef.current = null
            el.style.scrollSnapType = ''
        }
        stopAutoplayRef.current = stop

        const advance = () => {
            if (takenOverRef.current || lightboxOpenRef.current) return
            goToPanel(1)
        }

        const start = () => {
            stop()
            if (phone.matches && motionOk.matches && !takenOverRef.current) {
                timer = setInterval(advance, 3500)
            }
        }

        const takeOver = () => { takenOverRef.current = true; stop() }
        el.addEventListener('pointerdown', takeOver, { passive: true })

        const io = new IntersectionObserver(
            ([entry]) => (entry.isIntersecting ? start() : stop()),
            { threshold: 0.25 }
        )
        io.observe(el)

        const onVisibility = () => (document.hidden ? stop() : start())
        document.addEventListener('visibilitychange', onVisibility)

        phone.addEventListener('change', start)
        motionOk.addEventListener('change', start)

        return () => {
            stop()
            io.disconnect()
            el.removeEventListener('pointerdown', takeOver)
            document.removeEventListener('visibilitychange', onVisibility)
            phone.removeEventListener('change', start)
            motionOk.removeEventListener('change', start)
            stopAutoplayRef.current = () => {}
        }
    }, [images.length, goToPanel])

    // Two balanced columns, matching the service pages. Split by count rather
    // than CSS columns so a long answer cannot strand a question mid-break.
    const faqColumns = [
        faqs.slice(0, Math.ceil(faqs.length / 2)),
        faqs.slice(Math.ceil(faqs.length / 2)),
    ]

    return (
        <div className="bg-white">
            {/* ── Hero ─────────────────────────────────────────────────────── */}
            {/*
             * Hero.
             *
             * Built to the reference layout: pill badge, a long headline whose
             * closing phrase carries the accent after an em dash, a wide lead,
             * the two CTAs, and a proof line with icon separators underneath.
             *
             * Two things stay ours. The buttons keep the house .btn treatment
             * -- WhatsApp green filled, phone as the white outline -- rather
             * than the reference's dark pill, and the accent is RG Tech's green
             * everywhere the reference used orange.
             *
             * The badge is the one deliberate departure from the design system:
             * globals.css sets 2px corners as the house style and .stamp is
             * square and mono to match, so this pill is built from utilities
             * instead. It is the shape the reference gets its character from.
             */}
            <section className="hero-gradient pt-5 sm:pt-16 md:pt-24 pb-6 sm:pb-16 md:pb-20 relative overflow-hidden border-b border-line">
                <div className="hero-grid-paper" aria-hidden="true" />

                <div className="max-w-6xl mx-auto px-4 relative z-10 text-center">
                    <p className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-white pl-3 pr-4 py-1.5 sm:py-2 shadow-sm">
                        <Sparkles className="w-4 h-4 text-accent" aria-hidden="true" />
                        <span className="text-sm font-semibold text-fg">
                            {design.name} Panel Designs
                        </span>
                    </p>

                    {/*
                        The accent is the closing phrase after the dash; the
                        dash itself stays in the base colour so it reads as
                        punctuation rather than as part of the highlight.

                        An en dash, not an em dash. A full em rule in a display
                        headline reads as machine-written, which is the last
                        thing a page selling hand-checked work wants.
                    */}
                    <h1 className="display-title max-sm:text-[1.625rem] max-sm:leading-[1.15] text-fg text-balance mt-4 sm:mt-7">
                        {design.name} Laser Cutting Designs –{' '}
                        <span className="text-accent">{places}</span>
                    </h1>

                    <p className="section-lead max-sm:text-[0.9375rem] max-sm:leading-[1.6] sm:text-[1.0625rem] mt-4 sm:mt-7 max-w-[62ch] mx-auto">
                        {design.blurb}
                    </p>

                    <div className="flex justify-center gap-2.5 sm:gap-4 mt-6 sm:mt-9">
                        <a
                            href={waLink(design)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-whatsapp flex-1 sm:flex-none px-3 py-3 text-[0.8125rem] sm:px-9 sm:py-[1.1rem] sm:text-[0.9375rem]"
                        >
                            <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span className="sm:hidden">WhatsApp</span>
                            <span className="hidden sm:inline">Get Design on WhatsApp</span>
                        </a>
                        <a
                            href={`tel:+${WA}`}
                            className="btn btn-secondary-light flex-1 sm:flex-none px-3 py-3 text-[0.8125rem] sm:px-9 sm:py-[1.1rem] sm:text-[0.9375rem]"
                        >
                            <Phone className="w-4 h-4" />
                            <span className="sm:hidden">Call Now</span>
                            <span className="hidden sm:inline">+91 63807 36439</span>
                        </a>
                    </div>

                    {/*
                     * The proof line, separators between items rather than
                     * after each -- a trailing mark on the last entry is the
                     * usual way this goes wrong.
                     *
                     * Desktop only. On a phone it costs two lines directly
                     * above the catalogue strip, which is the space the mobile
                     * pass was spent buying back.
                     */}
                    <div className="hidden sm:flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mt-7 text-sm text-fg-muted">
                        {heroSpecs(images.length).map((item, i) => (
                            <Fragment key={item}>
                                {i > 0 && (
                                    <Sparkles
                                        className="w-3.5 h-3.5 text-accent shrink-0"
                                        aria-hidden="true"
                                    />
                                )}
                                <span>{item}</span>
                            </Fragment>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Gallery ──────────────────────────────────────────────────── */}
            <section id="catalogue" className="pt-7 sm:pt-12 md:pt-16 pb-12 sm:pb-16 md:pb-24 scroll-mt-20">
                <div className="max-w-7xl mx-auto px-4">
                    {hasImages ? (
                        <>
                            {/*
                             * The visible catalogue header is gone by request;
                             * the panels speak for themselves and the strip now
                             * starts straight after the hero.
                             *
                             * The h2 stays as sr-only rather than being deleted.
                             * It is the section's only heading, so removing it
                             * outright would leave the page's largest block of
                             * content unlabelled in the document outline and
                             * drop the one on-page h2 carrying the phrase this
                             * page is built to rank for. It describes exactly
                             * what sits beneath it, so it is a label for a
                             * screen reader, not hidden keyword text.
                             */}
                            <h2 className="sr-only">{design.name} panel designs</h2>

                            {/*
                             * Phone: one panel per swipe, snapping.
                             *
                             * Nothing here is lazy-loaded by hand -- both this
                             * and the marquee below render every panel, and
                             * whichever one the breakpoint hides has no layout
                             * box, so its images never intersect and never
                             * download. That is also why neither carries
                             * `priority`: a preload emitted for the variant
                             * that is not on screen fetches the wrong srcset
                             * candidate on every load.
                             */}
                            <div
                                ref={scrollerRef}
                                className="sm:hidden flex snap-x snap-mandatory overflow-x-auto no-scrollbar -mx-4 px-4 scroll-px-4 gap-3"
                                role="group"
                                aria-label={`${design.name} panel designs, scroll sideways`}
                            >
                                {images.map((item, i) => (
                                    <Panel
                                        key={item.src}
                                        design={design}
                                        item={item}
                                        index={i}
                                        onOpen={setLightboxIndex}
                                        sizes="100vw"
                                        className="w-full min-w-0 shrink-0 snap-start"
                                    />
                                ))}
                            </div>

                            {images.length > 1 && (
                                <div className="sm:hidden flex items-center justify-center gap-5 mt-4">
                                    <button
                                        type="button"
                                        onClick={() => onArrow(-1)}
                                        aria-label="Previous design"
                                        className="w-11 h-11 rounded-xl border border-line-strong bg-white text-fg flex items-center justify-center active:bg-surface-2 transition-colors"
                                    >
                                        <ChevronLeft className="w-5 h-5" />
                                    </button>
                                    <p className="meta-label text-fg-muted tabular-nums" aria-live="polite">
                                        {panelIndex + 1} / {images.length}
                                    </p>
                                    <button
                                        type="button"
                                        onClick={() => onArrow(1)}
                                        aria-label="Next design"
                                        className="w-11 h-11 rounded-xl border border-line-strong bg-white text-fg flex items-center justify-center active:bg-surface-2 transition-colors"
                                    >
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                </div>
                            )}
                        </>
                    ) : null}
                </div>

                {/*
                 * Desktop: the home page's marquee, same CSS.
                 *
                 * .marquee-viewport already pauses the track on hover and on
                 * focus-within -- without that a panel would slide out from
                 * under the cursor on the way to a click -- masks both ends,
                 * and under prefers-reduced-motion drops the animation and
                 * becomes a plain horizontal scroller.
                 *
                 * Full-bleed rather than inside the page's max-width, because
                 * a strip that stops short of the edges reads as a stuck
                 * carousel rather than as something continuous.
                 */}
                {hasImages && (
                    <div className="hidden sm:block marquee-viewport overflow-hidden">
                        <div
                            className="marquee-track"
                            style={{ '--marquee-duration': '44s' }}
                        >
                            {/* The lap. This is the set that is announced and
                                tabbable; the copy below it exists only so the
                                -50% loop lands on an identical frame, and is
                                hidden and non-focusable so seven panels are not
                                read out twice and do not cost 14 tab stops. */}
                            {images.map((item, i) => (
                                <Panel
                                    key={item.src}
                                    design={design}
                                    item={item}
                                    index={i}
                                    onOpen={setLightboxIndex}
                                    sizes={MARQUEE_SIZES}
                                    className={`${MARQUEE_CARD} shrink-0 mx-2.5`}
                                />
                            ))}
                            <div className="flex" aria-hidden="true">
                                {images.map((item, i) => (
                                    <Panel
                                        key={`dup-${item.src}`}
                                        design={design}
                                        item={item}
                                        index={i}
                                        onOpen={setLightboxIndex}
                                        sizes={MARQUEE_SIZES}
                                        className={`${MARQUEE_CARD} shrink-0 mx-2.5`}
                                        decorative
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                <div className="max-w-7xl mx-auto px-4">
                    {!hasImages && (
                        /*
                         * No images yet. The route is live so it can be checked, but
                         * the page is noindex and out of the sitemap until the first
                         * image lands — see app/designs/gods/[god]/page.js.
                         */
                        <div className="max-w-3xl mx-auto py-14 px-6 sm:py-20 sm:px-8 text-center bg-white border border-line rounded-[1.5rem] sm:rounded-[3rem] shadow-xl shadow-line-strong/50">
                            <div className="w-24 h-24 bg-surface-2 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-line">
                                <Sparkles className="w-10 h-10 text-accent animate-pulse" />
                            </div>
                            <h2 className="subsection-title text-fg mb-4">
                                {design.name} <span className="text-accent">Designs Coming Soon</span>
                            </h2>
                            <p className="section-lead mb-10">
                                We are photographing our {design.name} panels for this gallery.
                                In the meantime, send us your reference or temple photograph on
                                WhatsApp and we will share designs, sizes and pricing directly.
                            </p>
                            <a
                                href={waLink(design)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-whatsapp"
                            >
                                <MessageCircle className="w-5 h-5" /> Request {design.name} Designs
                            </a>
                        </div>
                    )}
                </div>
            </section>

            {/* ── Custom work: the process, then the ask ──────────────────── */}
            <section className="py-12 sm:py-16 md:py-24 bg-surface-2 border-y border-line">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="max-w-2xl mb-9 sm:mb-12">
                        <p className="eyebrow text-accent mb-2 sm:mb-3">Custom Work</p>
                        <h2 className="section-title max-sm:text-2xl text-fg mb-4">
                            Cut to your size,{' '}
                            <span className="text-accent">from your reference</span>
                        </h2>
                        <p className="text-base sm:text-lg text-fg-muted leading-relaxed">
                            Every {design.name} design is cut from a vector drawing, so the detail
                            stays crisp at any scale — fine ornamental line work on a Vinayagar
                            pooja room screen, or a bold Pillaiyar silhouette across a full gate
                            panel.
                        </p>
                    </div>

                    {/* The three steps, numbered. Even columns, so the section
                        uses its full width instead of stacking one tall column
                        against an empty one. */}
                    <ol className="grid sm:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
                        {STEPS.map((step, i) => (
                            <li
                                key={step.title}
                                className="framed-soft bg-white p-5 sm:p-7 flex flex-col"
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-cta/10 flex items-center justify-center shrink-0">
                                        <step.icon className="w-5 h-5 text-accent" />
                                    </span>
                                    <span className="meta-label text-fg-subtle">
                                        {String(i + 1).padStart(2, '0')}
                                    </span>
                                </div>
                                <h3 className="card-title text-fg leading-snug mb-2">
                                    {step.title}
                                </h3>
                                <p className="text-[0.9375rem] text-fg-muted leading-relaxed">
                                    {step.body}
                                </p>
                            </li>
                        ))}
                    </ol>

                    {/* Where these are used — four cards across, not a bullet
                        list down one side. */}
                    <h3 className="card-title text-fg mt-12 sm:mt-14 mb-4 sm:mb-5">
                        Where these are used
                    </h3>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
                        {USES.map((use) => (
                            <div key={use.label} className="framed-soft bg-white p-4 sm:p-5">
                                <use.icon className="w-5 h-5 text-accent mb-3" />
                                <p className="card-title text-fg leading-snug">{use.label}</p>
                                <p className="text-xs sm:text-sm text-fg-muted mt-1 leading-snug">
                                    {use.detail}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* The ask, as a full-width band. It was a sticky card in a
                        half-width column, which is what left the dead space
                        below it once the prose beside it ran out. */}
                    <div className="mt-10 sm:mt-14 rounded-[1.25rem] sm:rounded-[2rem] border border-line bg-white p-6 sm:p-8 lg:p-10 flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-10">
                        <span className="w-12 h-12 rounded-xl bg-[#25D366]/10 flex items-center justify-center shrink-0">
                            <MessageCircle className="w-6 h-6 text-[#128C4A]" />
                        </span>
                        <div className="flex-1">
                            <h3 className="subsection-title text-fg">
                                Send us your {design.name} reference
                            </h3>
                            <p className="text-[0.9375rem] sm:text-base text-fg-muted mt-2 leading-relaxed max-w-xl">
                                Share a photo, temple image or sketch on WhatsApp. We come back with
                                a cutting-ready design, sizes and pricing — usually the same day.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3 shrink-0">
                            <a
                                href={waLink(design)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-whatsapp justify-center"
                            >
                                <MessageCircle className="w-5 h-5" /> WhatsApp Us Now
                            </a>
                            <a
                                href={`tel:+${WA}`}
                                className="btn btn-secondary-light justify-center"
                            >
                                <Phone className="w-4 h-4" /> +91 63807 36439
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Other deity designs ──────────────────────────────────────── */}
            {crosslinks.length > 0 && (
                <section className="py-12 sm:py-16 md:py-24">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="text-center mb-8 sm:mb-12">
                            <p className="eyebrow text-accent mb-3">More Designs</p>
                            <h2 className="section-title text-fg">
                                Other deity <span className="text-accent">laser cut panels</span>
                            </h2>
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
                            {crosslinks.map((link) => (
                                <Link
                                    key={link.key}
                                    href={link.href}
                                    className="framed-soft group bg-white overflow-hidden flex flex-col transition-all hover:shadow-2xl hover:-translate-y-1"
                                >
                                    <div className="relative aspect-[4/3] bg-surface-2 overflow-hidden">
                                        <Image
                                            src={link.image}
                                            alt={
                                                link.isOwnImage
                                                    ? `Laser cut ${link.name} panel by RG Tech Engineering`
                                                    : `Laser cut decorative metal panel by RG Tech Engineering`
                                            }
                                            fill
                                            loading="lazy"
                                            sizes="(max-width: 1024px) 50vw, 25vw"
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    </div>
                                    <div className="p-4 sm:p-5 border-t border-line flex-1 flex flex-col">
                                        <h3 className="card-title text-fg leading-snug">
                                            {link.name}
                                        </h3>
                                        <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-accent group-hover:gap-2.5 transition-all">
                                            View designs <ArrowRight className="w-3.5 h-3.5" />
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/*
                            Up to the index, not sideways to another eight
                            tiles. The strip shows the most-searched deities;
                            this is the only route to the other forty.
                        */}
                        <div className="mt-8 sm:mt-10 text-center">
                            <Link
                                href="/designs/gods"
                                className="btn btn-secondary-light px-6 py-3 text-[0.8125rem] sm:px-8 sm:py-[1rem] sm:text-[0.9375rem]"
                            >
                                View all god designs <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            {/* ── FAQs ─────────────────────────────────────────────────────── */}
            {faqs.length > 0 && (
                <section className="py-12 sm:py-16 md:py-24 bg-surface-2 border-y border-line">
                    <div className="max-w-5xl mx-auto px-4">
                        <div className="text-center mb-8 sm:mb-12">
                            <p className="eyebrow mb-3">Support &amp; FAQ</p>
                            <h2 className="section-title text-fg">
                                {design.name} <span className="text-accent">design queries</span>
                            </h2>
                        </div>
                        <div className="faq-columns">
                            {faqColumns.map((column, col) => (
                                <div key={col} className="faq-column">
                                    {column.map((faq) => (
                                        <details key={faq.q} className="faq-card">
                                            <summary className="faq-q">
                                                <span>{faq.q}</span>
                                                <Plus className="faq-icon" aria-hidden="true" />
                                            </summary>
                                            <div className="faq-a">{faq.a}</div>
                                        </details>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ── Where we work: the four city laser cutting pillars ───────── */}
            <section className="py-12 sm:py-16 md:py-24">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-8 sm:mb-12">
                        <p className="eyebrow text-accent mb-3">Where We Work</p>
                        <h2 className="section-title max-sm:text-2xl text-fg">
                            {design.name} laser cutting{' '}
                            <span className="text-accent">across Tamil Nadu</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
                        {Object.values(CITIES).map((city) => (
                            <Link
                                key={city.slug}
                                href={serviceUrl(city.slug, 'laser-cutting-services')}
                                className="framed-soft bg-white p-4 sm:p-6 group hover:shadow-xl transition-all hover:-translate-y-1"
                            >
                                <span className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-cta/10 flex items-center justify-center mb-3 sm:mb-4">
                                    <MapPin className="w-5 h-5 text-accent" />
                                </span>
                                <h3 className="card-title text-fg leading-snug">
                                    Laser Cutting in {city.name}
                                </h3>
                                <p className="text-sm text-fg-muted mt-2 leading-snug">
                                    {city.hasFacility
                                        ? 'Our CNC fiber laser facility'
                                        : `Cut in Chennai, delivered to ${city.name}`}
                                </p>
                                <span className="mt-3 sm:mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-fg-muted group-hover:text-accent group-hover:gap-2.5 transition-all">
                                    View <ArrowRight className="w-3.5 h-3.5" />
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Lightbox ─────────────────────────────────────────────────── */}
            {isOpen && (
                <div
                    className="on-dark fixed inset-0 z-[100] bg-ink/95 backdrop-blur-2xl flex items-center justify-center overflow-y-auto p-3 sm:p-4 animate-in fade-in duration-300"
                    onClick={close}
                    role="dialog"
                    aria-modal="true"
                    aria-label={`${current.title} — full size`}
                >
                    <button
                        onClick={close}
                        aria-label="Close"
                        className="fixed top-3 right-3 sm:absolute sm:top-6 sm:right-6 text-white/60 hover:text-white transition-colors z-[110] bg-white/10 sm:bg-white/5 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl"
                    >
                        <X className="w-5 h-5 sm:w-7 sm:h-7" />
                    </button>

                    {images.length > 1 && (
                        <button
                            onClick={prev}
                            aria-label="Previous design"
                            className="fixed sm:absolute left-1 sm:left-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors z-[110] bg-white/10 sm:bg-white/5 p-2 sm:p-4 rounded-2xl sm:rounded-3xl hover:bg-white/10"
                        >
                            <ChevronLeft className="w-5 h-5 sm:w-9 sm:h-9" />
                        </button>
                    )}

                    <div
                        className="max-w-5xl w-full my-auto flex flex-col lg:flex-row gap-5 sm:gap-8 lg:gap-12 items-center px-9 sm:px-12"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="bg-black/20 rounded-[1rem] sm:rounded-[2rem] p-2 sm:p-3 border border-white/5 shadow-2xl">
                            <Image
                                src={current.src}
                                alt={godImageAlt(design, current, lightboxIndex + 1)}
                                width={current.width}
                                height={current.height}
                                sizes="(max-width: 1024px) 80vw, 40vw"
                                // Tall portrait panels would otherwise run off the
                                // viewport; cap the height and let width follow.
                                className="w-auto h-auto max-h-[46vh] sm:max-h-[60vh] lg:max-h-[78vh] max-w-full object-contain rounded-[0.75rem] sm:rounded-[1.5rem]"
                            />
                        </div>

                        <div className="lg:w-72 shrink-0 text-center lg:text-left">
                            <p className="meta-label text-accent mb-2">{designRef(design, lightboxIndex)}</p>
                            <h3 className="section-title text-white mb-2 sm:mb-4">{current.title}</h3>
                            <p className="text-white/60 text-sm mb-5 sm:mb-8">
                                Material: <span className="font-bold text-accent">{current.material}</span>
                            </p>
                            <a
                                href={waLink(design, current, lightboxIndex)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-whatsapp w-full justify-center"
                            >
                                <MessageCircle className="w-5 h-5" /> Enquire about this design
                            </a>
                            <p className="meta-label text-white/25 mt-4 sm:mt-6">
                                {lightboxIndex + 1} of {images.length}
                            </p>
                        </div>
                    </div>

                    {images.length > 1 && (
                        <button
                            onClick={next}
                            aria-label="Next design"
                            className="fixed sm:absolute right-1 sm:right-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors z-[110] bg-white/10 sm:bg-white/5 p-2 sm:p-4 rounded-2xl sm:rounded-3xl hover:bg-white/10"
                        >
                            <ChevronRight className="w-5 h-5 sm:w-9 sm:h-9" />
                        </button>
                    )}
                </div>
            )}
        </div>
    )
}
