'use client'

import { useEffect, useRef, useState } from 'react'

/*
 * A clip that costs nothing until it is nearly on screen.
 *
 * preload="none" was not enough on its own. A <video> with `autoplay` is still
 * a load-bearing request as far as the preload scanner is concerned: Chrome
 * fetched all four clips to completion before the home page had finished
 * painting, which put ~2.8MB in front of the hero image on a throttled mobile
 * connection and pushed LCP to 5.1s. The only reliable way to stop that is to
 * not give the element a src at all.
 *
 * So the tile renders as its poster frame, and the <video> is mounted only once
 * an IntersectionObserver says it is within 300px of the viewport. Nothing
 * about the clip itself changes -- same file, same quality, fetched later.
 *
 * The poster is an ordinary lazy <img>, so the four of them cost nothing on
 * first paint either. It is swapped for the real element rather than layered
 * under it, and both sit in the same fixed box, so the swap cannot shift
 * layout.
 *
 * Falls back to rendering the video immediately where IntersectionObserver is
 * missing, which is the safe direction: worst case is today's behaviour.
 */
export default function LazyVideo({ src, poster, label, className }) {
    const hostRef = useRef(null)
    const [show, setShow] = useState(false)

    useEffect(() => {
        if (show) return
        const el = hostRef.current
        if (!el) return

        if (typeof IntersectionObserver === 'undefined') {
            setShow(true)
            return
        }

        const MARGIN = 300
        let io = null

        const reveal = () => {
            setShow(true)
            if (io) io.disconnect()
            window.removeEventListener('scroll', onScroll)
            window.removeEventListener('resize', onScroll)
        }

        /*
         * A belt-and-braces fallback beside the observer.
         *
         * The observer is the mechanism; this is insurance. If it never
         * delivers a callback -- which does happen in embedded and headless
         * contexts -- the clips would silently never play, and a video row
         * that stays frozen is a worse failure than loading a little early.
         * A bounding-box check on scroll costs nothing until the page is
         * actually scrolled, and fetches nothing until the row is near.
         */
        const onScroll = () => {
            const r = el.getBoundingClientRect()
            if (r.top - MARGIN < window.innerHeight && r.bottom + MARGIN > 0) reveal()
        }

        io = new IntersectionObserver(
            (entries) => {
                if (entries.some((e) => e.isIntersecting)) reveal()
            },
            // Start fetching a little before the row scrolls in, so the clip is
            // moving by the time it is actually looked at.
            { rootMargin: `${MARGIN}px 0px` }
        )
        io.observe(el)

        window.addEventListener('scroll', onScroll, { passive: true })
        window.addEventListener('resize', onScroll, { passive: true })

        /*
         * Covers a load that already lands with the row on screen -- but in a
         * frame of its own, not inline.
         *
         * Called synchronously it read layout in the middle of hydration, which
         * forces the browser to stop and recalculate before carrying on. Inside
         * requestAnimationFrame the read happens once layout has settled, so
         * nothing is forced.
         *
         * This did not clear Lighthouse's forced-reflow audit and did not move
         * the score: three runs either side were 75-77 against 73-77, which is
         * the same noise band. The remaining reflow is still attributed to the
         * page chunk, so something else in it reads layout too. Kept anyway,
         * because not forcing layout during hydration is right regardless of
         * whether an audit notices.
         */
        const raf = requestAnimationFrame(onScroll)

        return () => {
            cancelAnimationFrame(raf)
            if (io) io.disconnect()
            window.removeEventListener('scroll', onScroll)
            window.removeEventListener('resize', onScroll)
        }
    }, [show])

    return (
        <div ref={hostRef} className="h-full w-full">
            {show ? (
                <video
                    src={src}
                    poster={poster}
                    autoPlay
                    muted
                    loop
                    playsInline
                    controls
                    // Eager now: by this point the element is on its way into
                    // view, the hero has long since painted, and waiting would
                    // only show a still frame where motion is expected.
                    preload="auto"
                    aria-label={label}
                    className={className}
                />
            ) : (
                <img
                    src={poster}
                    alt={label}
                    loading="lazy"
                    decoding="async"
                    className={className}
                />
            )}
        </div>
    )
}
