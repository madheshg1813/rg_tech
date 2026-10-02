import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ArrowRight, MessageCircle, ChevronRight } from 'lucide-react'
import { getCategory, designsIn, designUrl, categoryUrl, navCategories } from '@/lib/designs'
import DesignNav from '@/components/Designs/DesignNav'
import { BASE_URL } from '@/lib/data'
import { organizationSchema, jsonLdGraph, jsonLdScript } from '@/lib/schema'

/* Category listing, e.g. /designs/gods. Prerendered — the set is small and fixed. */

export function generateStaticParams() {
    return navCategories().map(({ category }) => ({ category: category.slug }))
}

export async function generateMetadata({ params }) {
    const { category } = await params
    const cat = getCategory(category)
    if (!cat) return {}

    return {
        title: `${cat.name} | Laser Cut Metal Panels Across India`,
        description: `${cat.tagline}. CNC cut in mild steel, stainless steel and brass to your size, and dispatched across India.`,
        alternates: { canonical: categoryUrl(cat) },
        openGraph: {
            title: `${cat.name} | RG Tech Engineering`,
            description: cat.tagline,
            url: `${BASE_URL}${categoryUrl(cat)}`,
            images: [{
                url: `/og?title=${encodeURIComponent(cat.name)}&sub=${encodeURIComponent('Laser Cut Metal — Delivered Across India')}`,
                width: 1200, height: 630, alt: cat.name,
            }],
        },
    }
}

export default async function CategoryPage({ params }) {
    const { category } = await params
    const cat = getCategory(category)
    if (!cat) notFound()

    // A category defined in lib/designs.js but not yet filled in is not a page.
    // Serving it would put an empty listing on a live URL, which is exactly the
    // thin page navCategories() exists to keep out of the nav and the sitemap.
    const items = designsIn(cat.slug)
    if (!items.length) notFound()

    const graph = jsonLdGraph(organizationSchema, {
        '@type': 'CollectionPage',
        '@id': `${BASE_URL}${categoryUrl(cat)}#webpage`,
        url: `${BASE_URL}${categoryUrl(cat)}`,
        name: cat.name,
        description: cat.tagline,
        isPartOf: { '@id': `${BASE_URL}/#website` },
    }, {
        '@type': 'BreadcrumbList',
        '@id': `${BASE_URL}${categoryUrl(cat)}#breadcrumbs`,
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
            { '@type': 'ListItem', position: 2, name: 'Designs', item: `${BASE_URL}/designs` },
            { '@type': 'ListItem', position: 3, name: cat.name, item: `${BASE_URL}${categoryUrl(cat)}` },
        ],
    })

    return (
        <div className="bg-white">
            <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(graph)} />

            <section className="section hero-gradient py-16 md: relative overflow-hidden">
                <div className="hero-grid-paper" aria-hidden="true" />
                <div className="shell max-w-4xl sm:px-6 relative z-10 text-center">
                    <nav aria-label="Breadcrumb" className="flex items-center justify-center gap-1.5 meta-label text-fg-subtle mb-5">
                        <Link href="/designs" className="hover:text-accent transition-colors">Designs</Link>
                        <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
                        <span className="text-fg">{cat.menuName}</span>
                    </nav>
                    <h1 className="display-title text-fg mb-6 text-balance">{cat.name}</h1>
                    <p className="section-lead max-w-2xl mx-auto mb-10">{cat.intro}</p>
                    <DesignNav categories={navCategories()} />
                </div>
            </section>

            <section className="section md:">
                <div className="shell sm:px-6">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {items.map((d) => (
                            <Link
                                key={d.slug}
                                href={designUrl(d)}
                                className="group bg-white rounded-2xl overflow-hidden border border-line shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col"
                            >
                                <div className="aspect-[4/3] overflow-hidden bg-surface-2 relative">
                                    <Image
                                        src={d.images[0].src}
                                        alt={`${d.name} laser cutting design cut in metal by RG Tech Engineering`}
                                        fill
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>
                                <div className="p-6 sm:p-8 flex flex-col flex-1">
                                    <h2 className="card-title text-fg mb-2 group-hover:text-accent transition-colors">
                                        {d.name} Designs
                                    </h2>
                                    {d.aliases?.length > 0 && (
                                        <p className="text-xs text-fg-subtle mb-3">
                                            Also called {d.aliases.join(', ')}
                                        </p>
                                    )}
                                    <p className="text-sm text-fg-muted leading-relaxed mb-6">{d.tagline}</p>
                                    <span className="mt-auto meta-label text-accent flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                                        See sizes &amp; materials <ArrowRight className="w-3.5 h-3.5" />
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {items.length === 0 && (
                        <div className="text-center py-16 bg-surface-2 rounded-2xl sm:rounded-3xl border-2 border-dashed border-line-strong">
                            <h2 className="subsection-title text-fg mb-4">
                                Designs <span className="text-accent">coming soon</span>
                            </h2>
                            <p className="section-lead max-w-md mx-auto">
                                This category is being photographed. Send us the pattern you want in the
                                meantime and we will cut it.
                            </p>
                        </div>
                    )}
                </div>
            </section>

            <section className="section md: bg-surface-2">
                <div className="shell max-w-3xl sm:px-6 text-center">
                    <p className="eyebrow mb-3">Not listed?</p>
                    <h2 className="section-title text-fg mb-6">
                        We cut from <span className="text-accent">your reference</span>
                    </h2>
                    <p className="section-lead mb-8">
                        The catalogue is a starting point, not a limit. Send a photograph, a temple
                        picture or a sketch on WhatsApp and we will convert it into a cutting file and
                        send it back for your approval.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="https://wa.me/916380736439" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                            <MessageCircle className="w-5 h-5" /> Send Your Reference
                        </a>
                        <Link href="/contact" className="btn btn-secondary-light">
                            Request a Quote <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}
