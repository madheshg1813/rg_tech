'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

/*
 * Horizontal scroller for the Google reviews row.
 *
 * Takes the cards as `children` rather than the review array, so they stay
 * server-rendered: GoogleReviews.jsx is a server component and the review text
 * has to be in the HTML that leaves the server, not fetched by the browser.
 * A client component can accept an already-rendered server tree as children —
 * only the arrows and the scroll position live on this side of the boundary.
 *
 * Three cards visible at a time on a desktop, two on a tablet, one and a peek
 * on a phone. The peek matters: with a full-width card and no visible edge,
 * nothing says the row scrolls.
 */
export default function ReviewScroller({ children, label = 'Customer reviews' }) {
    const ref = useRef(null)
    const rafRef = useRef(null)
    const takenOverRef = useRef(false)
    const [atStart, setAtStart] = useState(true)
    const [atEnd, setAtEnd] = useState(false)

    const sync = useCallback(() => {
        const el = ref.current
        if (!el) return
        const max = el.scrollWidth - el.clientWidth
        setAtStart(el.scrollLeft <= 2)
        setAtEnd(el.scrollLeft >= max - 2)
    }, [])

    useEffect(() => {
        const el = ref.current
        if (!el) return
        sync()
        el.addEventListener('scroll', sync, { passive: true })
        window.addEventListener('resize', sync)
        return () => {
            el.removeEventListener('scroll', sync)
            window.removeEventListener('resize', sync)
            if (rafRef.current) cancelAnimationFrame(rafRef.current)
        }
    }, [sync])

    /*
     * Animated by hand rather than with scrollTo's 'smooth'.
     *
     * A `snap-mandatory` container fights a smooth programmatic scroll —
     * Chromium re-snaps mid-flight and the row ends up back where it started.
     * Snapping is lifted for the glide and restored at the end, where the row
     * is already resting on a snap point, so a swipe still snaps normally.
     */
    const glide = useCallback((to, ms = 420) => {
        const el = ref.current
        if (!el) return
        const from = el.scrollLeft
        const t0 = performance.now()
        el.style.scrollSnapType = 'none'

        const frame = (now) => {
            const t = Math.min(1, (now - t0) / ms)
            el.scrollLeft = from + (to - from) * (1 - Math.pow(1 - t, 3))
            if (t < 1) {
                rafRef.current = requestAnimationFrame(frame)
            } else {
                rafRef.current = null
                el.style.scrollSnapType = ''
                sync()
            }
        }
        rafRef.current = requestAnimationFrame(frame)
    }, [sync])

    const step = useCallback((dir) => {
        const el = ref.current
        if (!el || rafRef.current) return
        takenOverRef.current = true
        const card = el.firstElementChild
        if (!card) return
        const gap = parseFloat(getComputedStyle(el).columnGap) || 0
        const by = card.getBoundingClientRect().width + gap
        const max = el.scrollWidth - el.clientWidth
        glide(Math.max(0, Math.min(max, el.scrollLeft + dir * by)))
    }, [glide])

    /*
     * Autoplay.
     *
     * Advances one card every two seconds and wraps back to the first at the
     * end. Four guards, because a row that moves on its own is an
     * accessibility problem if it cannot be stopped:
     *
     *   - any interaction (pointer down, or an arrow press) hands control over
     *     for good. It does not resume and start moving under a reader again.
     *   - hovering pauses it, so a review cannot slide away mid-sentence.
     *   - prefers-reduced-motion turns it off outright.
     *   - off-screen, or in a background tab, it holds still: an
     *     IntersectionObserver reports nothing at all while the page is not
     *     rendering, so visibilitychange covers the case it cannot see.
     */
    useEffect(() => {
        const el = ref.current
        if (!el) return

        const motionOk = window.matchMedia('(prefers-reduced-motion: no-preference)')
        let timer = null
        let hovered = false

        const stop = () => { clearInterval(timer); timer = null }

        const advance = () => {
            if (takenOverRef.current || hovered || rafRef.current) return
            const max = el.scrollWidth - el.clientWidth
            if (max <= 0) return
            const card = el.firstElementChild
            if (!card) return
            const gap = parseFloat(getComputedStyle(el).columnGap) || 0
            const by = card.getBoundingClientRect().width + gap
            const atRight = el.scrollLeft >= max - 2
            // Wrapping crosses the whole row, so it gets longer to travel in
            // rather than arriving as a whip-pan.
            if (atRight) glide(0, 700)
            else glide(Math.min(max, el.scrollLeft + by), 420)
        }

        const start = () => {
            stop()
            if (motionOk.matches && !takenOverRef.current && !document.hidden) {
                timer = setInterval(advance, 2000)
            }
        }

        const takeOver = () => { takenOverRef.current = true; stop() }
        const onEnter = () => { hovered = true }
        const onLeave = () => { hovered = false }
        const onVisibility = () => (document.hidden ? stop() : start())

        el.addEventListener('pointerdown', takeOver, { passive: true })
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
        el.addEventListener('focusin', takeOver)
        document.addEventListener('visibilitychange', onVisibility)
        motionOk.addEventListener('change', start)

        const io = new IntersectionObserver(
            ([entry]) => (entry.isIntersecting ? start() : stop()),
            { threshold: 0.25 }
        )
        io.observe(el)

        return () => {
            stop()
            io.disconnect()
            el.removeEventListener('pointerdown', takeOver)
            el.removeEventListener('mouseenter', onEnter)
            el.removeEventListener('mouseleave', onLeave)
            el.removeEventListener('focusin', takeOver)
            document.removeEventListener('visibilitychange', onVisibility)
            motionOk.removeEventListener('change', start)
        }
    }, [glide])

    return (
        <div className="relative">
            <div
                ref={ref}
                role="group"
                aria-label={label}
                className="flex snap-x snap-mandatory overflow-x-auto no-scrollbar -mx-4 px-4 scroll-px-4 gap-5 sm:gap-6 items-stretch"
            >
                {children}
            </div>

            {/*
                Arrows only where there is no touch to swipe with, and only
                pointing somewhere there is still row to see — an arrow that
                does nothing is worse than no arrow.
            */}
            <div className="hidden lg:block">
                <button
                    type="button"
                    onClick={() => step(-1)}
                    disabled={atStart}
                    aria-label="Previous reviews"
                    className="absolute -left-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-line-strong bg-white text-fg flex items-center justify-center shadow-md transition-opacity disabled:opacity-0 disabled:pointer-events-none hover:bg-surface-2"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                    type="button"
                    onClick={() => step(1)}
                    disabled={atEnd}
                    aria-label="More reviews"
                    className="absolute -right-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-line-strong bg-white text-fg flex items-center justify-center shadow-md transition-opacity disabled:opacity-0 disabled:pointer-events-none hover:bg-surface-2"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>
        </div>
    )
}
