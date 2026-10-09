import Link from 'next/link'
import { ArrowRight, Images } from 'lucide-react'
import GoogleRating from '@/components/GoogleRating'
import JustdialBadge from '@/components/JustdialBadge'
import { videos } from '@/lib/videos'
import { cld, cldPoster } from '@/lib/cloudinary'

/*
 * Hero — centred, with the laser running underneath the headline.
 *
 * Order is fixed: H1 -> supporting line -> video -> CTAs -> third-party proof.
 *
 * What this replaced: a split screen with a photograph on the right and four
 * capability cards floating over its lower edge. The photograph was stock — a
 * licensed image of someone else's machine — while the clip below is our own
 * bed with our own job on it, which is worth more on the page that has to
 * establish we actually cut metal. The four cards made claims that the trust
 * strip immediately below now carries with real figures instead.
 *
 * ── Picking the clip ──────────────────────────────────────────────────────
 * lib/videos.js holds four and only one shows the laser cutting: rg-video-01,
 * "Fiber laser cutting a perforated circular panel on the bed". The other three
 * are finished work. The hero asks for the process, so the clip is selected by
 * src rather than by position, and falls back to the first entry if that file
 * is ever renamed — the hero then degrades to a different clip, not to a hole.
 *
 * ── Sizing ────────────────────────────────────────────────────────────────
 * Every clip is phone footage at a 0.56 ratio. A portrait video given the full
 * width of a hero becomes a tower that pushes the CTAs off the fold, so the
 * height is capped and the width falls out of the ratio. 560px is the height
 * components/Home/VideoShowcase.jsx already used for a single clip, so this is
 * the frame that footage was sized around. Both axes are additionally clamped
 * against the viewport so the video cannot outgrow a short laptop or a phone.
 *
 * autoplay + muted + loop + playsInline is what makes autoplay permitted at
 * all: unmuted autoplay is blocked outright, and without playsInline iOS takes
 * the video fullscreen rather than playing it in place. `controls` stays
 * because WCAG 2.2.2 wants a way to stop motion running past five seconds, and
 * a loop runs forever.
 */

const HERO_CLIP_SRC = '/videos/rg-video-01.mp4'

const H_DESKTOP = 560
const RATIO = 0.5625

const Hero = () => {
    const clip = videos.find((v) => v.src === HERO_CLIP_SRC) || videos[0] || null

    // Requested from Cloudinary at twice the rendered width and no further: the
    // source is ~2MB whole, and none of those pixels survive a 315px frame.
    const deliveryWidth = Math.round(H_DESKTOP * RATIO * 2)
    const src = clip ? cld(clip.src, { width: deliveryWidth, quality: 'auto:eco' }) : null
    const poster = clip ? cldPoster(clip.src, deliveryWidth) : undefined

    return (
        <section id="home" className="relative overflow-hidden border-b border-line bg-surface">
            <div className="grid-backdrop" aria-hidden="true" />

            <div className="shell relative z-10 py-10 sm:py-14 lg:py-16">
                <div className="mx-auto max-w-3xl text-center">

                    <h1 className="display-title text-fg text-balance">
                        <span className="text-accent">Precision</span>{' '}
                        CNC Laser Cutting &amp; Fabrication Services
                    </h1>

                    <p className="section-lead mx-auto mt-5 max-w-[54ch] text-pretty sm:mt-6">
                        High-precision laser cutting, sheet metal fabrication and engineering
                        solutions for industries across Chennai.
                    </p>

                    {clip && src && (
                        <div className="mt-8 flex justify-center sm:mt-10">
                            <div
                                className="overflow-hidden rounded-2xl border border-line bg-ink shadow-[0_24px_60px_-30px_rgba(15,42,68,0.45)] sm:rounded-3xl"
                                style={{
                                    height: `min(${H_DESKTOP}px, 60vh)`,
                                    width: `min(${Math.round(H_DESKTOP * RATIO)}px, 72vw)`,
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
                                    aria-label={clip.title || 'Fiber laser cutting at RG Tech Engineering Works'}
                                    className="block h-full w-full bg-ink object-cover"
                                />
                            </div>
                        </div>
                    )}

                    <div className="mt-8 flex flex-row flex-nowrap justify-center gap-2.5 sm:mt-9 sm:gap-3">
                        <a href="#contact" className="btn btn-primary">
                            Get Free Quote <ArrowRight className="h-4 w-4" />
                        </a>
                        <Link href="/gallery" className="btn btn-ghost">
                            <Images className="h-4 w-4" />
                            <span className="hidden sm:inline">View Projects</span>
                            <span className="sm:hidden">Projects</span>
                        </Link>
                    </div>

                    <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 border-t border-line pt-7">
                        <GoogleRating />
                        <JustdialBadge />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero;
