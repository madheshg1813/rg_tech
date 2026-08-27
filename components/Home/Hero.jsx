import Image from 'next/image'
import { Phone, Check, ArrowRight, ShieldCheck } from 'lucide-react'
import GoogleRating from '@/components/GoogleRating'

/*
 * Hero.
 *
 * Restructured to the Sree E-Waste layout: white ground with graph-paper rule,
 * a mono credential stamp above the headline, the accent word carried inside
 * the H1 rather than on a separate line, a compact tick list, and a hard-framed
 * photograph with a spec card breaking its bottom-left corner.
 *
 * The colour scheme is unchanged — RG Tech's green accent and blue CTA. What
 * changed is how much of the page is white: the tinted gradient, the stripe
 * texture and the skewed indigo wedge are all gone, so the only colour above
 * the fold is in the three places that carry meaning.
 */

const POINTS = [
    'Precision up to 0.01mm',
    'Large bed: 8000x2500mm',
    'All metal types',
    'Quick turnaround',
]

// "ISO Certified" removed: the Google rating below is a verifiable, third-party
// claim a visitor can click through and check, which is worth more here than an
// unlinked certification badge.
const CREDENTIALS = [
    '15+ Years',
    '1000+ Projects',
]

const Hero = () => {
    return (
        <section
            id="home"
            className="hero-gradient relative overflow-hidden border-b border-line py-14 md:py-20"
        >
            <div className="hero-grid-paper" aria-hidden="true" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 w-full">
                <div className="grid lg:grid-cols-[1.04fr_.96fr] gap-10 lg:gap-14 items-center">
                    <div>
                        <p className="stamp mb-6">
                            <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
                            CNC Fiber Laser Specialist
                        </p>

                        {/* h2, not h1: components/Header.jsx already renders the
                            brand lockup as the page's h1 on every route. Kept as
                            it was — this restyle is not the place to change the
                            heading structure. */}
                        <h2 className="display-title text-fg text-balance">
                            Your Trusted Partner for{' '}
                            <span className="text-accent">CNC Laser Cutting</span>{' '}&amp; Fabrication
                        </h2>

                        <p className="section-lead mt-6 max-w-[50ch]">
                            High-precision metal cutting up to 45mm — MS, SS, Aluminium, Copper
                            and Brass, cut at our Chennai unit and delivered on schedule.
                        </p>

                        <div className="flex flex-col sm:flex-row flex-wrap gap-3 mt-9">
                            <a href="#contact" className="btn btn-primary">
                                Get a Quote <ArrowRight className="w-4 h-4" />
                            </a>
                            <a href="tel:+916380736439" className="btn btn-secondary-light">
                                <Phone className="w-4 h-4" /> Call 63807-36439
                            </a>
                        </div>

                        {/* Ticks run inline and wrap, rather than sitting in a
                            two-column grid. At this size they are a list of
                            claims, not a feature table. */}
                        <ul className="flex flex-wrap gap-x-6 gap-y-2 mt-9 p-0 list-none">
                            {POINTS.map((item) => (
                                <li key={item} className="flex items-center gap-2 text-sm font-medium text-fg-muted">
                                    <Check className="w-4 h-4 flex-none text-accent" aria-hidden="true" />
                                    {item}
                                </li>
                            ))}
                        </ul>

                        <div className="flex flex-wrap items-center gap-x-6 gap-y-4 mt-9 pt-7 border-t border-line">
                            <GoogleRating />
                            <span className="hidden sm:block w-px h-8 bg-line" aria-hidden="true" />
                            {CREDENTIALS.map((c) => (
                                <span key={c} className="meta-label text-fg-subtle">{c}</span>
                            ))}
                        </div>
                    </div>

                    {/* The badge overlaps the frame's bottom-left corner and is
                        allowed to hang outside it, so the photograph reads as a
                        mounted print rather than as a card with a caption. */}
                    <div className="relative">
                        <div className="framed">
                            <Image
                                src="https://res.cloudinary.com/o1ytbfuz/image/upload/v1785177077/rg-tech/hero-laser"
                                alt="CNC fiber laser cutting machine at RG Tech Engineering, Chennai"
                                width={1200}
                                height={900}
                                priority
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                className="w-full aspect-[4/3] object-cover"
                            />
                        </div>
                        <div className="framed absolute -left-3 -bottom-4 sm:-left-4 sm:-bottom-5 max-w-[78%] px-4 py-3 flex items-center gap-3">
                            <ShieldCheck className="w-6 h-6 flex-none text-accent" aria-hidden="true" />
                            <span className="block">
                                <b className="block font-heading font-extrabold text-[0.95rem] leading-tight tracking-[-0.02em] text-fg">
                                    8000 x 2500mm
                                </b>
                                <span className="meta-label block text-fg-subtle mt-0.5">
                                    Large Format Bed
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero;
