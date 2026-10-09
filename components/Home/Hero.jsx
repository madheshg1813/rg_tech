import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Images, Crosshair, Timer, ShieldCheck, Handshake } from 'lucide-react'
import GoogleRating from '@/components/GoogleRating'
import JustdialBadge from '@/components/JustdialBadge'
import { cld, cldSize, cldBlurUrl } from '@/lib/cloudinary'

/*
 * Hero — split screen, per the industrial redesign brief.
 *
 * Left: headline, subheadline, two CTAs, trust row.
 * Right: the fiber laser mid-cut, with four capability cards floating over its
 * lower edge on desktop and sitting beneath it as a 2x2 grid on phones.
 *
 * Why the cards move rather than float on small screens: floating them means
 * overlapping the photograph, and at 390px there is no part of this image that
 * can lose a third of its height and still read as a laser cutting a sheet. So
 * the overlap is a desktop affordance and the phone gets a plain grid.
 *
 * The four cards are capability claims, not statistics — the brief lists them
 * under "statistic cards" but none of them is a number, and inventing figures to
 * fit the label is not on. The actual numbers live in the trust strip below.
 *
 * Palette is unchanged: green accent, navy ink, white ground. No gradient is
 * introduced; the only non-white surface here is the photograph itself.
 */

const HERO_IMG = '/hero-laser.png'

// Capability cards. Each is defensible from the machine spec or the service
// pages — nothing here is a claim the site cannot stand behind.
const CARDS = [
    { Icon: Crosshair, title: 'High Precision Cutting', sub: 'Tolerances to 0.01mm' },
    { Icon: Timer, title: 'Fast Turnaround', sub: 'Quote within 24 hours' },
    { Icon: ShieldCheck, title: 'Industrial Grade Quality', sub: 'Dimensional QC before dispatch' },
    { Icon: Handshake, title: 'Trusted Engineering Partner', sub: '15+ years in Chennai' },
]

const Hero = () => {
    // cldSize returns null and cldBlurUrl undefined when the manifest has no
    // entry (a fresh checkout before the Cloudinary upload runs). Both are fatal
    // to <Image> if passed through blind, so fall back to the asset's own 1:1.
    const { width, height } = cldSize(HERO_IMG) || { width: 1024, height: 1024 }
    const blur = cldBlurUrl(HERO_IMG)

    return (
        <section id="home" className="relative overflow-hidden border-b border-line bg-surface">
            <div className="grid-backdrop" aria-hidden="true" />

            <div className="shell relative z-10 py-10 sm:py-14 lg:py-20">
                <div className="grid items-center gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:gap-14">

                    {/* ── Left column ──────────────────────────────────── */}
                    <div>
                        {/*
                            h1, now that components/Header.jsx no longer wraps the
                            logo lockup in one. The homepage had been left with no
                            h1 at all. Same class, so nothing moves.
                        */}
                        <h1 className="display-title text-fg text-balance">
                            <span className="text-accent">Precision</span>{' '}
                            CNC Laser Cutting &amp; Fabrication Services
                        </h1>

                        <p className="section-lead mt-5 max-w-[54ch] sm:mt-6">
                            High-precision laser cutting, sheet metal fabrication and engineering
                            solutions for industries across Chennai.
                        </p>

                        <div className="mt-7 flex flex-row flex-nowrap gap-2.5 sm:mt-9 sm:gap-3">
                            <a href="#contact" className="btn btn-primary">
                                Get Free Quote <ArrowRight className="h-4 w-4" />
                            </a>
                            <Link href="/gallery" className="btn btn-ghost">
                                <Images className="h-4 w-4" />
                                <span className="hidden sm:inline">View Projects</span>
                                <span className="sm:hidden">Projects</span>
                            </Link>
                        </div>

                        <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-line pt-7 sm:mt-10">
                            <GoogleRating />
                            <JustdialBadge />
                        </div>
                    </div>

                    {/* ── Right column ─────────────────────────────────── */}
                    {/* pb on desktop reserves the space the cards overhang into,
                        so the following section is never overlapped. */}
                    <div className="relative lg:pb-24">
                        <div className="overflow-hidden rounded-2xl border border-line shadow-[0_30px_70px_-34px_rgba(15,42,68,0.45)] sm:rounded-3xl">
                            <Image
                                src={cld(HERO_IMG, { width: 1200 })}
                                alt="RG Tech's CNC fiber laser cutting a decorative pattern into mild steel sheet, sparks flying from the cut head"
                                width={width}
                                height={height}
                                priority
                                {...(blur ? { placeholder: 'blur', blurDataURL: blur } : {})}
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                className="h-full w-full object-cover"
                            />
                        </div>

                        {/* Floating on desktop, stacked below on phones. */}
                        <ul className="mt-4 grid list-none grid-cols-2 gap-2.5 p-0 sm:gap-3 lg:absolute lg:-bottom-0 lg:left-4 lg:right-4 lg:mt-0 lg:gap-4">
                            {CARDS.map(({ Icon, title, sub }) => (
                                <li
                                    key={title}
                                    className="rounded-xl border border-line bg-surface p-3 shadow-[0_10px_30px_-18px_rgba(15,42,68,0.45)] sm:rounded-2xl sm:p-4"
                                >
                                    <Icon
                                        className="mb-2 h-5 w-5 text-accent"
                                        strokeWidth={1.7}
                                        aria-hidden="true"
                                    />
                                    <p className="text-[0.8125rem] font-bold leading-tight tracking-[-0.01em] text-fg sm:text-sm">
                                        {title}
                                    </p>
                                    <p className="mt-1 text-xs leading-snug text-fg-muted">{sub}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero;
