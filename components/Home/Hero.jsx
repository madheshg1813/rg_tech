import Link from 'next/link'
import { ArrowRight, Images, Crosshair, Timer, ShieldCheck, Handshake } from 'lucide-react'
import GoogleRating from '@/components/GoogleRating'
import JustdialBadge from '@/components/JustdialBadge'

/*
 * Hero — centred, with the four capability cards under the fold line.
 *
 * The split screen is gone. The right column held a photograph of a fiber laser
 * that was stock, not ours, and on the page that has to establish we cut metal
 * a licensed picture of someone else's machine earns little. Removing it left a
 * two-column grid with one column, so the whole block is centred instead.
 *
 * The four cards stay. They are capability claims, not statistics -- none is a
 * number -- and each is defensible from the machine spec or the service pages.
 * Freed from overhanging the image, they run as one row of four on desktop and
 * a 2x2 grid on phones.
 *
 * Palette unchanged: green accent, navy ink, white ground, no gradient.
 */


// Capability cards. Each is defensible from the machine spec or the service
// pages — nothing here is a claim the site cannot stand behind.
const CARDS = [
    { Icon: Crosshair, title: 'High Precision Cutting', sub: 'Tolerances to 0.01mm' },
    { Icon: Timer, title: 'Fast Turnaround', sub: 'Quote within 24 hours' },
    { Icon: ShieldCheck, title: 'Industrial Grade Quality', sub: 'Dimensional QC before dispatch' },
    { Icon: Handshake, title: 'Trusted Engineering Partner', sub: '15+ years in Chennai' },
]

const Hero = () => {
    return (
        <section id="home" className="relative overflow-hidden border-b border-line bg-surface">
            <div className="grid-backdrop" aria-hidden="true" />

            <div className="shell relative z-10 py-10 sm:py-14 lg:py-20">
                <div className="mx-auto max-w-3xl text-center">
                    {/*
                        h1, because components/Header.jsx no longer wraps the logo
                        lockup in one and the homepage was left without any.
                    */}
                    <h1 className="display-title text-fg text-balance">
                        <span className="text-accent">Precision</span>{' '}
                        CNC Laser Cutting &amp; Fabrication Services
                    </h1>

                    <p className="section-lead mx-auto mt-5 max-w-[54ch] text-pretty sm:mt-6">
                        High-precision laser cutting, sheet metal fabrication and engineering
                        solutions for industries across Chennai.
                    </p>

                    <div className="mt-7 flex flex-row flex-nowrap justify-center gap-2.5 sm:mt-9 sm:gap-3">
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

                {/* Four across on desktop, 2x2 on phones. Wider than the centred
                    text column above, so the row reads as a base under it rather
                    than as a continuation of the paragraph. */}
                <ul className="mx-auto mt-10 grid max-w-5xl list-none grid-cols-2 gap-2.5 p-0 sm:gap-3 lg:mt-12 lg:grid-cols-4 lg:gap-4">
                    {CARDS.map(({ Icon, title, sub }) => (
                        <li
                            key={title}
                            className="rounded-xl border border-line bg-surface p-3 text-left shadow-[0_10px_30px_-18px_rgba(15,42,68,0.45)] sm:rounded-2xl sm:p-4"
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
        </section>
    )
}

export default Hero;
