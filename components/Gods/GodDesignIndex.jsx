import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, MessageCircle, Phone } from 'lucide-react'
import FaithFilter from '@/components/Gods/FaithFilter'

/*
 * The shared body of the four index pages: /designs/gods and the three faith
 * pages under it.
 *
 * They differ only in their heading, their lead, which sections they carry and
 * whether the faith filter is shown — so they are one component rather than
 * four near-copies. The first version of the Hindu page was a copy of the
 * parent with two lines changed, and it had already drifted by the time the
 * Christian one was written.
 *
 * A server component with no interactive parts except FaithFilter, so all of
 * it ships as HTML.
 */

const WA = '916380736439'

export const waLink = (what = 'laser cut deity panel designs') =>
    `https://wa.me/${WA}?text=${encodeURIComponent(
        `Hi RG Tech, I am looking for ${what}. Please share the catalogue, sizes and pricing.`
    )}`

function Section({ section, shaded }) {
    return (
        <section
            data-faith={section.faith}
            className={`pt-10 sm:pt-14 pb-10 sm:pb-14 ${
                shaded ? 'bg-surface-2 border-y border-line' : ''
            }`}
        >
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-wrap items-end justify-between gap-2 sm:gap-4 mb-5 sm:mb-8">
                    <h2 className="section-title max-sm:text-2xl text-fg">{section.group}</h2>
                    <p className="meta-label text-fg-subtle">
                        {section.designs.length} galler
                        {section.designs.length === 1 ? 'y' : 'ies'}
                    </p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
                    {section.designs.map((d) => (
                        <Link
                            key={d.slug}
                            href={d.href}
                            className="framed-soft group bg-white overflow-hidden flex flex-col transition-all hover:shadow-2xl hover:-translate-y-1"
                        >
                            <div className="relative aspect-[4/3] bg-surface-2 overflow-hidden">
                                {d.image && (
                                    <Image
                                        src={d.image}
                                        alt={`Laser cut ${d.name} panel designs by RG Tech Engineering`}
                                        fill
                                        loading="lazy"
                                        sizes="(max-width: 1024px) 50vw, 25vw"
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                )}
                            </div>
                            <div className="p-4 sm:p-5 border-t border-line flex-1 flex flex-col">
                                <h3 className="card-title text-fg leading-snug">{d.name}</h3>
                                <p className="text-xs sm:text-sm text-fg-muted mt-1">
                                    {d.count} design{d.count === 1 ? '' : 's'}
                                </p>
                                <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-accent group-hover:gap-2.5 transition-all">
                                    View designs <ArrowRight className="w-3.5 h-3.5" />
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default function GodDesignIndex({ title, accent, lead, sections, faiths, enquiry, children }) {
    /*
     * Shading alternates across the sections that are actually rendered. On the
     * filtered parent page it is computed before filtering, so switching faith
     * can leave two plain sections next to each other — which is the right
     * trade: recomputing it on the client would mean the server HTML and the
     * first client render disagree.
     */
    const rendered = sections.map((section, i) => (
        <Section key={section.group} section={section} shaded={i % 2 === 1} />
    ))

    return (
        <div className="bg-white">
            {/* ── Hero ─────────────────────────────────────────────────── */}
            <section className="hero-gradient pt-8 sm:pt-16 md:pt-24 pb-8 sm:pb-14 md:pb-16 relative overflow-hidden border-b border-line">
                <div className="hero-grid-paper" aria-hidden="true" />
                <div className="max-w-5xl mx-auto px-4 relative z-10 text-center">
                    <h1 className="display-title max-sm:text-[1.75rem] text-fg text-balance">
                        {title} <span className="text-accent">{accent}</span>
                    </h1>

                    <p className="section-lead text-base sm:text-[1.0625rem] mt-5 sm:mt-7 max-w-[60ch] mx-auto">
                        {lead}
                    </p>

                    <div className="flex justify-center gap-2.5 sm:gap-4 mt-6 sm:mt-9">
                        <a
                            href={waLink(enquiry)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-whatsapp flex-1 sm:flex-none px-3 py-3 text-[0.8125rem] sm:px-9 sm:py-[1.1rem] sm:text-[0.9375rem]"
                        >
                            <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span className="sm:hidden">WhatsApp</span>
                            <span className="hidden sm:inline">Get Designs on WhatsApp</span>
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
                </div>

                {children}
            </section>

            {/* ── The galleries ────────────────────────────────────────── */}
            {faiths ? <FaithFilter faiths={faiths}>{rendered}</FaithFilter> : rendered}

            {/* ── Closing ask ──────────────────────────────────────────── */}
            <section className="py-12 sm:py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="rounded-[1.25rem] sm:rounded-[2rem] border border-line bg-white p-6 sm:p-8 lg:p-10 flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-10">
                        <span className="w-12 h-12 rounded-xl bg-[#25D366]/10 flex items-center justify-center shrink-0">
                            <MessageCircle className="w-6 h-6 text-[#128C4A]" />
                        </span>
                        <div className="flex-1">
                            <h2 className="subsection-title text-fg">
                                Not seeing the design you want?
                            </h2>
                            <p className="text-[0.9375rem] sm:text-base text-fg-muted mt-2 leading-relaxed max-w-xl">
                                Send a photograph, a reference from your place of worship or a rough
                                sketch on WhatsApp. We convert it to a cutting-ready design, check it
                                holds together once metal is removed, and confirm sizes before
                                anything is cut.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3 shrink-0">
                            <a
                                href={waLink(enquiry)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-whatsapp justify-center"
                            >
                                <MessageCircle className="w-5 h-5" /> WhatsApp Us Now
                            </a>
                            <a href={`tel:+${WA}`} className="btn btn-secondary-light justify-center">
                                <Phone className="w-4 h-4" /> +91 63807 36439
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
