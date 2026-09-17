import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, MessageCircle, Phone } from 'lucide-react'
import { godDesignGroups } from '@/lib/godDesigns'
import { BASE_URL } from '@/lib/data'
import { ORG_ID, breadcrumbSchema, jsonLdGraph, jsonLdScript } from '@/lib/schema'

/*
 * The deity design index — /designs/gods.
 *
 * Until now this path was deliberately not a page: the galleries were built
 * one at a time and an index of three tiles is not worth a route. With the set
 * filled in it becomes the obvious parent — every gallery links up to it, and
 * it collects the picture searches that name no particular deity ("laser cut
 * god designs", "temple panel designs").
 *
 * A server component with no interactive parts, so all of it ships as HTML.
 *
 * Sections come from GOD_GROUPS in lib/gods.js rather than being listed again
 * here. Galleries with no images are already filtered out by godDesignGroups(),
 * which is the same rule that keeps them noindex — so this page can never link
 * to a "coming soon" gallery, and no heading appears above an empty row.
 */

const WA = '916380736439'
const WA_LINK = `https://wa.me/${WA}?text=${encodeURIComponent(
    'Hi RG Tech, I am looking for laser cut deity panel designs. Please share the catalogue, sizes and pricing.'
)}`

export const metadata = {
    // No brand suffix — app/layout.js applies the "%s | RG Tech Engineering
    // Works" template, and adding one here double-brands the tab.
    title: 'Laser Cut God & Deity Panel Designs',
    description:
        'Laser cut deity panel designs for pooja rooms, main gates and temple arches. ' +
        'Ganesh, Murugan, Shiva, Lakshmi and more, cut in mild steel, stainless steel, ' +
        'brass and copper in Chennai.',
    keywords: [
        'laser cut god designs',
        'deity panel designs',
        'pooja room laser cut panel',
        'temple laser cutting design',
        'god cnc cutting design',
    ],
    alternates: { canonical: '/designs/gods' },
    openGraph: {
        title: 'Laser Cut God & Deity Panel Designs',
        description:
            'Deity panel designs for pooja rooms, gates and temple arches — cut in Chennai.',
        url: `${BASE_URL}/designs/gods`,
        type: 'website',
        siteName: 'RG Tech Engineering Works',
    },
}

export default function Page() {
    const sections = godDesignGroups()
    const total = sections.reduce((n, s) => n + s.designs.length, 0)

    const pageUrl = `${BASE_URL}/designs/gods`
    const graph = jsonLdGraph(
        /*
         * A CollectionPage with an ItemList, not a Product list. These are
         * galleries of design renders; listing them as products would need
         * prices and availability we do not publish per design.
         */
        {
            '@type': 'CollectionPage',
            '@id': `${pageUrl}#collection`,
            name: 'Laser Cut God & Deity Panel Designs',
            url: pageUrl,
            publisher: { '@id': ORG_ID },
            mainEntity: {
                '@type': 'ItemList',
                numberOfItems: total,
                itemListElement: sections.flatMap((section) =>
                    section.designs.map((d) => ({
                        '@type': 'ListItem',
                        name: d.name,
                        url: `${BASE_URL}${d.href}`,
                    }))
                ),
            },
        },
        breadcrumbSchema(
            [
                { name: 'Home', url: BASE_URL },
                { name: 'God Designs', url: pageUrl },
            ],
            pageUrl
        )
    )

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(graph)} />

            <div className="bg-white">
                {/* ── Hero ─────────────────────────────────────────────── */}
                <section className="hero-gradient pt-8 sm:pt-16 md:pt-24 pb-8 sm:pb-14 md:pb-16 relative overflow-hidden border-b border-line">
                    <div className="hero-grid-paper" aria-hidden="true" />
                    <div className="max-w-5xl mx-auto px-4 relative z-10 text-center">
                        <h1 className="display-title max-sm:text-[1.75rem] text-fg text-balance">
                            Laser Cut God Designs —{' '}
                            <span className="text-accent">Every Deity, Symbol and Arch</span>
                        </h1>

                        <p className="section-lead text-base sm:text-[1.0625rem] mt-5 sm:mt-7 max-w-[60ch] mx-auto">
                            {total} design galleries for pooja room screens, main gate inserts,
                            temple arches and wall art. Cut from mild steel, stainless steel, brass
                            and copper on our CNC fiber laser in Chennai, at any size from 1 ft up
                            to a full 8 ft arch.
                        </p>

                        <div className="flex justify-center gap-2.5 sm:gap-4 mt-6 sm:mt-9">
                            <a
                                href={WA_LINK}
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
                </section>

                {/* ── The galleries, by group ──────────────────────────── */}
                {sections.map((section, i) => (
                    <section
                        key={section.group}
                        className={`pt-10 sm:pt-14 pb-10 sm:pb-14 ${
                            i % 2 === 1 ? 'bg-surface-2 border-y border-line' : ''
                        }`}
                    >
                        <div className="max-w-7xl mx-auto px-4">
                            <div className="flex flex-wrap items-end justify-between gap-2 sm:gap-4 mb-5 sm:mb-8">
                                <h2 className="section-title max-sm:text-2xl text-fg">
                                    {section.group}
                                </h2>
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
                                            <h3 className="card-title text-fg leading-snug">
                                                {d.name}
                                            </h3>
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
                ))}

                {/* ── Closing ask ──────────────────────────────────────── */}
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
                                    Send a photograph, a temple reference or a rough sketch on
                                    WhatsApp. We convert it to a cutting-ready design, check it
                                    holds together once metal is removed, and confirm sizes before
                                    anything is cut.
                                </p>
                            </div>
                            <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3 shrink-0">
                                <a
                                    href={WA_LINK}
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
            </div>
        </>
    )
}
