import Image from 'next/image'
import { Phone, Check, ArrowRight, ShieldCheck } from 'lucide-react'
import GoogleRating from '@/components/GoogleRating'
import { GoogleMark, JustdialMark } from '@/components/BrandMarks'
import { GMB_URL, JUSTDIAL_URL } from '@/lib/data'

/*
 * The primary CTA goes to WhatsApp, not to the contact form further down.
 *
 * Nearly every enquiry this business gets arrives on WhatsApp, and the message
 * is prefilled so the first thing the customer sends already says what they
 * want — a blank chat window gets abandoned far more often. The form is still
 * on the page for anyone who prefers it.
 */
const QUOTE_MESSAGE =
    'Hi RG Tech, I would like a quote for laser cutting. ' +
    'Material, thickness and quantity: '
const QUOTE_WA = `https://wa.me/916380736439?text=${encodeURIComponent(QUOTE_MESSAGE)}`

/*
 * Third-party listings, directly under the CTA.
 *
 * Placed here rather than only in the section further down because this is
 * where a first-time visitor decides whether the business is real. Both open in
 * a new tab: sending someone off-site from the hero would lose the visit.
 */
const LISTING_PILLS = [
    { label: 'Reviewed on Google', href: GMB_URL, Mark: GoogleMark, markClass: 'w-4 h-4' },
    { label: 'Listed on Justdial', href: JUSTDIAL_URL, Mark: JustdialMark, markClass: 'h-[13px] w-auto' },
]

/*
 * Hero.
 *
 * Light ground, as the design system intends — "white is the page default,
 * heroes included".
 *
 * What changed is everything standing on it: a larger headline, a primary CTA
 * that carries its own light, a rim-lit photograph over a soft brand bloom,
 * and the spec card floating across its corner rather than parked beside it.
 *
 * The blooms are the light-ground reading of the same idea: brand colour, far
 * enough out of focus to be lit air rather than a shape, at an opacity that
 * survives on white without tinting the copy in front of it.
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
            className="hero-gradient relative isolate overflow-hidden border-b border-line py-16 sm:py-20 lg:py-28"
        >
            {/* Soft lighting: a green bloom behind the photograph and a blue
                one under the CTA, both far enough out of focus to read as lit
                air rather than as shapes. */}
            <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-32 -top-40 -z-10 h-[34rem] w-[34rem] rounded-full bg-brand-green/10 blur-[130px]"
            />
            <span
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-48 -left-40 -z-10 h-[32rem] w-[32rem] rounded-full bg-cta/10 blur-[140px]"
            />
            {/* The site's own engineering rule. The dark version of this hero
                drew its grid in white, which is invisible on a light ground —
                this is the light-surface original, drawn in --color-line. */}
            <span aria-hidden="true" className="hero-grid-paper" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 w-full">
                <div className="grid lg:grid-cols-[1.04fr_.96fr] gap-12 lg:gap-16 items-center">
                    <div>
                        {/* .stamp, the system's own credential badge, carried
                            on a pill rather than its default square corner. */}
                        <p className="stamp mb-7 rounded-full px-4 py-2">
                            <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
                            CNC Fiber Laser Specialist
                        </p>

                        {/* h2, not h1: components/Header.jsx already renders the
                            brand lockup as the page's h1 on every route. Kept as
                            it was — this restyle is not the place to change the
                            heading structure. */}
                        <h2 className="display-title text-[clamp(2.375rem,5.6vw,4.25rem)] leading-[1.04] text-fg text-balance">
                            Your Trusted Partner for{' '}
                            <span className="text-accent">CNC Laser Cutting</span>{' '}&amp; Fabrication
                        </h2>

                        <p className="section-lead mt-6 max-w-[52ch] text-[1.0625rem] sm:text-lg">
                            High-precision metal cutting up to 45mm — MS, SS, Aluminium, Copper
                            and Brass, cut at our Chennai unit and delivered on schedule.
                        </p>

                        <div className="flex flex-col sm:flex-row flex-wrap gap-3 mt-9">
                            <a
                                href={QUOTE_WA}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-primary btn-lg shadow-[0_18px_40px_-14px_rgba(29,78,216,0.75)]"
                            >
                                Get a Quote <ArrowRight className="w-4 h-4" />
                            </a>
                            <a href="tel:+916380736439" className="btn btn-secondary-light btn-lg">
                                <Phone className="w-4 h-4" /> Call 63807-36439
                            </a>
                        </div>

                        <div className="flex flex-wrap gap-2.5 mt-7">
                            {LISTING_PILLS.map(({ label, href, Mark, markClass }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2.5 rounded-full border border-line bg-white px-4 py-3 min-h-11 text-sm font-semibold text-fg shadow-[0_1px_2px_rgba(15,42,68,0.05)] transition-[transform,box-shadow,border-color] duration-200 ease-out hover:-translate-y-0.5 hover:border-accent-ink/35 hover:shadow-[0_8px_18px_-10px_rgba(15,42,68,0.28)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                                >
                                    <Mark className={markClass} />
                                    {label}
                                </a>
                            ))}
                        </div>

                        {/* Each claim gets a ringed tick rather than a bare
                            check. They were the faintest thing in the column. */}
                        <ul className="flex flex-wrap gap-x-6 gap-y-3 mt-8 p-0 list-none">
                            {POINTS.map((item) => (
                                <li key={item} className="flex items-center gap-2.5 text-sm font-medium text-fg-muted">
                                    <span className="inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-accent-ink/10">
                                        <Check className="w-3 h-3 text-accent" aria-hidden="true" />
                                    </span>
                                    {item}
                                </li>
                            ))}
                        </ul>

                        <div className="flex flex-wrap items-center gap-x-6 gap-y-4 mt-8 pt-7 border-t border-line">
                            <GoogleRating />
                            <span className="hidden sm:block w-px h-8 bg-line" aria-hidden="true" />
                            {CREDENTIALS.map((c) => (
                                <span key={c} className="meta-label text-fg-subtle">{c}</span>
                            ))}
                        </div>
                    </div>

                    {/* The photograph is the centrepiece: a bloom behind it, a
                        light-catching rim, and the spec card breaking its
                        bottom-left corner as a floating glass panel rather than
                        a white box parked beside it. */}
                    <div className="relative">
                        <span
                            aria-hidden="true"
                            className="pointer-events-none absolute -inset-6 -z-10 rounded-2xl bg-gradient-to-tr from-cta/15 via-brand-green/12 to-transparent blur-3xl"
                        />
                        <div className="group relative overflow-hidden rounded-2xl ring-1 ring-line shadow-[0_30px_70px_-32px_rgba(15,42,68,0.45)]">
                            <Image
                                src="https://res.cloudinary.com/o1ytbfuz/image/upload/v1785177077/rg-tech/hero-laser"
                                alt="CNC fiber laser cutting machine at RG Tech Engineering, Chennai"
                                width={1200}
                                height={900}
                                priority
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                className="w-full aspect-[4/3] object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                            />
                            {/* Seats the photograph into the dark ground so its
                                lower edge does not cut off against it. */}
                            <span
                                aria-hidden="true"
                                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/20 via-transparent to-transparent"
                            />
                        </div>

                        <div className="absolute -left-2 -bottom-6 sm:-left-6 sm:-bottom-7 max-w-[88%] rounded-2xl border border-line bg-white/95 px-5 py-4 backdrop-blur-md shadow-[0_24px_50px_-24px_rgba(15,42,68,0.45)] flex items-center gap-4">
                            <span className="inline-flex h-12 w-12 flex-none items-center justify-center rounded-xl border border-accent-ink/15 bg-gradient-to-br from-brand-green/15 via-cta/10 to-transparent">
                                <ShieldCheck className="w-6 h-6 text-accent" aria-hidden="true" />
                            </span>
                            <span className="block">
                                <b className="block font-heading font-extrabold text-[1.125rem] leading-tight tracking-[-0.02em] text-fg">
                                    8000 x 2500mm
                                </b>
                                <span className="meta-label block text-fg-subtle mt-1">
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
