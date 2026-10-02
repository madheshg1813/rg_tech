import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import {
    ArrowRight, MessageCircle, ChevronRight, Ruler, Truck, Palette, CheckCircle, Plus,
} from 'lucide-react'
import {
    DESIGNS, getCategory, getDesign, designsIn, designUrl, categoryUrl,
    DESIGN_MATERIALS, DESIGN_FINISHES, navCategories,
} from '@/lib/designs'
import { BASE_URL } from '@/lib/data'
import { CITIES, serviceUrl } from '@/lib/cities'
import {
    organizationSchema, faqPageSchema, breadcrumbSchema, jsonLdGraph, jsonLdScript,
} from '@/lib/schema'
import DesignGrid from '@/components/Designs/DesignGrid'
import DesignNav from '@/components/Designs/DesignNav'

/*
 * A single design, e.g. /designs/gods/ganesh.
 *
 * National page: no city in the copy, because every design keyword in the
 * research is generic. The local counterpart is /{city}/decorative-metal-panels,
 * cross-linked at the foot rather than duplicated here.
 */

export function generateStaticParams() {
    return DESIGNS.map((d) => ({ category: d.category, design: d.slug }))
}

export async function generateMetadata({ params }) {
    const { category, design } = await params
    const d = getDesign(category, design)
    if (!d) return {}

    const names = [d.name, ...(d.aliases || [])].join(' / ')
    // Falls back to the same shape if a design omits its own, so the format
    // stays consistent as designs are added.
    const title = d.metaTitle || `${d.name} Laser/CNC Cutting Designs`
    const description = d.metaDescription || d.summary

    return {
        title,
        description,
        alternates: { canonical: designUrl(d) },
        keywords: d.keywords,
        openGraph: {
            title: `${names} Laser Cutting Designs`,
            description,
            url: `${BASE_URL}${designUrl(d)}`,
            images: [{
                url: `/og?title=${encodeURIComponent(`${d.name} Designs`)}&sub=${encodeURIComponent('CNC Laser Cut in Steel & Brass')}`,
                width: 1200, height: 630, alt: `${d.name} laser cutting design`,
            }],
        },
    }
}

export default async function DesignPage({ params }) {
    const { category, design } = await params
    const cat = getCategory(category)
    const d = getDesign(category, design)
    if (!cat || !d) notFound()

    const pageUrl = `${BASE_URL}${designUrl(d)}`
    const related = designsIn(cat.slug).filter((x) => x.slug !== d.slug).slice(0, 3)
    const wa = `https://wa.me/916380736439?text=${encodeURIComponent(
        `Hi RG Tech, I'm interested in a laser cut ${d.name} design. Please share sizes, materials and pricing.`
    )}`

    const graph = jsonLdGraph(
        organizationSchema,
        {
            '@type': 'Product',
            '@id': `${pageUrl}#product`,
            name: `${d.name} Laser Cutting Design`,
            description: d.summary,
            image: d.images.slice(0, 4).map((i) => i.src),
            brand: { '@id': `${BASE_URL}/#organization` },
            category: cat.name,
            // No price node: these are quoted per job from size, material and
            // pattern density, so any figure here would be wrong.
            additionalProperty: DESIGN_MATERIALS.map((m) => ({
                '@type': 'PropertyValue', name: m.name, value: m.thickness,
            })),
        },
        breadcrumbSchema([
            { name: 'Home', url: BASE_URL },
            { name: 'Designs', url: `${BASE_URL}/designs` },
            { name: cat.menuName, url: `${BASE_URL}${categoryUrl(cat)}` },
            { name: d.name, url: pageUrl },
        ], pageUrl),
        faqPageSchema(d.faqs.map(([q, a]) => ({ q, a })), pageUrl)
    )

    return (
        <div className="bg-white">
            <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(graph)} />

            {/*
             * Hero. The designs ARE the hero — no decorative photograph above the
             * fold. Someone searching "cnc ganesh design" wants to see panels, so
             * the grid starts immediately under the headline and every tile is
             * zoomable with its own enquiry.
             */}
            <section className="hero-gradient pt-10 md:pt-14 pb-16 md:pb-20 relative overflow-hidden">
                <div className="hero-grid-paper" aria-hidden="true" />
                <div className="shell sm:px-6 relative z-10">
                    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 meta-label text-fg-subtle mb-5">
                        <Link href="/designs" className="hover:text-accent transition-colors">Designs</Link>
                        <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
                        <Link href={categoryUrl(cat)} className="hover:text-accent transition-colors">{cat.menuName}</Link>
                    </nav>

                    <div className="grid lg:grid-cols-[minmax(0,1fr)_auto] gap-6 lg:gap-12 lg:items-end mb-10">
                        <div>
                            <h1 className="display-title text-fg mb-4 text-balance">
                                {d.name} <span className="text-accent">Laser Cutting Designs</span>
                            </h1>
                            {d.aliases?.length > 0 && (
                                <p className="text-sm text-fg-subtle mb-4">
                                    Also searched as {d.aliases.join(', ')} — same deity, same pattern library.
                                </p>
                            )}
                            <p className="section-lead max-w-2xl">{d.tagline}</p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 lg:flex-shrink-0">
                            <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                                <MessageCircle className="w-5 h-5" /> Send Your Size
                            </a>
                            <Link href="/contact" className="btn btn-secondary-light">
                                Request a Quote <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>

                    <div className="mb-10">
                        <DesignNav categories={navCategories()} />
                    </div>

                    <DesignGrid designName={d.name} images={d.images} />

                    <p className="text-sm text-fg-muted text-center mt-8 max-w-2xl mx-auto">
                        Tap any design to enlarge it. Every panel is cut to your size — quote the
                        reference number when you enquire, or send your own pattern and we will draw it.
                    </p>
                </div>
            </section>

            {/* Intro. Left-aligned heading rather than centred, so it sits with
                the reading block it introduces instead of floating above it. */}
            <section className="section py-16 md:">
                <div className="shell max-w-3xl sm:px-6">
                    <p className="eyebrow mb-3">{d.introEyebrow || 'Made to Order'}</p>
                    <h2 className="section-title text-fg mb-6 text-balance">
                        {d.introHeading || `Every ${d.name} panel is cut to your size`}
                    </h2>
                    <div className="space-y-5">
                        {d.intro.map((para, i) => (
                            <p key={i} className="text-base text-fg-muted leading-relaxed">{para}</p>
                        ))}
                    </div>
                </div>
            </section>

            {/* Where it's used */}
            <section className="section py-16 md:">
                <div className="shell sm:px-6">
                    <div className="text-center mb-12">
                        <p className="eyebrow mb-3">Applications</p>
                        <h2 className="section-title text-fg">
                            Where a {d.name} panel <span className="text-accent">goes</span>
                        </h2>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {d.uses.map((u) => (
                            <div key={u.title} className="bg-surface-2 rounded-2xl border border-line p-6 sm:p-8">
                                <span className="inline-flex mb-5">
                                    <CheckCircle className="w-5 h-5 text-accent" />
                                </span>
                                <h3 className="card-title text-fg mb-2">{u.title}</h3>
                                <p className="text-sm text-fg-muted leading-relaxed">{u.body}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Materials */}
            <section className="section py-16 md: bg-surface-2">
                <div className="shell sm:px-6 grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                    <div>
                        <p className="eyebrow mb-3">Materials</p>
                        <h2 className="section-title text-fg mb-6">
                            Cut in <span className="text-accent">metal only</span>
                        </h2>
                        <p className="section-lead mb-8">
                            We cut steel and brass on a CNC fiber laser. We do not cut MDF, acrylic, ACP
                            or PVC — if your design is for one of those, we are the wrong supplier and
                            would rather say so now.
                        </p>
                        <div className="overflow-x-auto rounded-2xl border border-line bg-white">
                            <table className="w-full border-collapse text-sm">
                                <caption className="sr-only">Materials and thickness range for {d.name} panels</caption>
                                <thead>
                                    <tr className="bg-surface-2">
                                        <th scope="col" className="text-left meta-label text-fg-subtle px-5 py-4">Material</th>
                                        <th scope="col" className="text-right meta-label text-fg-subtle px-5 py-4">Thickness</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {DESIGN_MATERIALS.map((m) => (
                                        <tr key={m.name} className="border-t border-line align-top">
                                            <td className="px-5 py-4">
                                                <span className="block font-semibold text-fg">{m.name}</span>
                                                <span className="block text-xs text-fg-muted mt-1 leading-relaxed">{m.detail}</span>
                                            </td>
                                            <td className="px-5 py-4 text-right font-semibold text-accent whitespace-nowrap">{m.thickness}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {[
                            { Icon: Ruler, title: 'Sizes', body: 'Up to 8000 x 2500 mm in one piece — full-height partitions and gate panels with no join. Larger spans are sectioned so the joint falls where the pattern hides it.' },
                            { Icon: Palette, title: 'Finishes', body: DESIGN_FINISHES.join(' · ') },
                            { Icon: Truck, title: 'Delivery', body: 'Cut at our Chennai unit and dispatched across India, packed flat with edge protection. Share your pincode and freight is quoted with the panel.' },
                        ].map(({ Icon, title, body }) => (
                            <div key={title} className="bg-white rounded-2xl border border-line p-6 sm:p-8">
                                <span className="inline-flex mb-5">
                                    <Icon className="w-5 h-5 text-accent" />
                                </span>
                                <h3 className="card-title text-fg mb-2">{title}</h3>
                                <p className="text-sm text-fg-muted leading-relaxed">{body}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQs — same accordion as the rest of the site */}
            <section className="section py-16 md:">
                <div className="shell max-w-5xl sm:px-6">
                    <div className="text-center mb-12">
                        <p className="eyebrow mb-3">Support &amp; FAQ</p>
                        <h2 className="section-title text-fg">
                            {d.name} design <span className="text-accent">questions</span>
                        </h2>
                    </div>
                    <div className="faq-columns">
                        {[
                            d.faqs.slice(0, Math.ceil(d.faqs.length / 2)),
                            d.faqs.slice(Math.ceil(d.faqs.length / 2)),
                        ].filter((col) => col.length > 0).map((column, ci) => (
                            <div key={ci} className="faq-column">
                                {column.map(([q, a]) => (
                                    <details key={q} className="faq-card">
                                        <summary className="faq-q">
                                            <span>{q}</span>
                                            <Plus className="faq-icon" aria-hidden="true" />
                                        </summary>
                                        <div className="faq-a">{a}</div>
                                    </details>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Related designs */}
            {related.length > 0 && (
                <section className="section py-16 md: bg-surface-2">
                    <div className="shell sm:px-6">
                        <div className="text-center mb-12">
                            <p className="eyebrow mb-3">More in {cat.menuName}</p>
                            <h2 className="section-title text-fg">Related <span className="text-accent">designs</span></h2>
                        </div>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {related.map((r) => (
                                <Link key={r.slug} href={designUrl(r)} className="group bg-white rounded-2xl overflow-hidden border border-line shadow-sm hover:shadow-xl transition-all flex flex-col">
                                    <div className="aspect-[4/3] overflow-hidden bg-surface-2 relative">
                                        <Image src={r.images[0].src} alt={`${r.name} laser cutting design`} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                                    </div>
                                    <div className="p-6">
                                        <h3 className="card-title text-fg group-hover:text-accent transition-colors">{r.name}</h3>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Local cross-link. The national/local split is the whole point of this
                section existing, so it is stated rather than implied. */}
            <section className="section py-16 md:">
                <div className="shell max-w-3xl sm:px-6 text-center">
                    <p className="eyebrow mb-3">Want a local supplier?</p>
                    <h2 className="section-title text-fg mb-6">
                        {d.name} panels, cut <span className="text-accent">in your city</span>
                    </h2>
                    <p className="section-lead mb-8">
                        This page ships nationwide from Chennai. For local turnaround times and area
                        coverage, use the decorative panel page for your city.
                    </p>
                    <div className="flex flex-wrap gap-3 justify-center">
                        {Object.values(CITIES).map((city) => (
                            <Link
                                key={city.slug}
                                href={serviceUrl(city.slug, 'decorative-metal-panels')}
                                className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface-2 px-4 py-2 text-sm font-semibold text-fg-muted hover:border-cta hover:text-accent transition-colors"
                            >
                                {city.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
