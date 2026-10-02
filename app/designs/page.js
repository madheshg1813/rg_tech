import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, MessageCircle, Truck, Ruler, FileText, Layers } from 'lucide-react'
import { categoryUrl, navCategories } from '@/lib/designs'
import DesignNav from '@/components/Designs/DesignNav'
import { BASE_URL } from '@/lib/data'
import { organizationSchema, jsonLdGraph, jsonLdScript } from '@/lib/schema'

/*
 * /designs — the national catalogue hub.
 *
 * Targets the two head terms in the research, "laser cutting design" and
 * "cnc cutting design", both at the 50,000 bucket. Deliberately says METAL in the
 * first line: the same phrases carry a large MDF and acrylic audience we cannot
 * serve, and filtering them out in the copy is cheaper than fielding the
 * enquiries.
 */

export const metadata = {
    title: 'Laser Cutting Designs | CNC Cut Metal Patterns Delivered Across India',
    description:
        'CNC laser cutting designs cut in mild steel, stainless steel and brass — deity panels, jali screens, gates and wall art. Cut to your size from your reference and dispatched across India.',
    alternates: { canonical: '/designs' },
    keywords: [
        'laser cutting design',
        'cnc cutting design',
        'cnc laser cutting design',
        'metal laser cutting design',
        'steel laser cutting design',
        'laser cut sheet design',
    ],
    openGraph: {
        title: 'Laser Cutting Designs in Metal | RG Tech Engineering',
        description:
            'CNC cut deity panels, jali screens, gates and wall art in steel and brass. Cut to your size, delivered across India.',
        url: `${BASE_URL}/designs`,
        images: [{ url: '/og?title=Laser+Cutting+Designs&sub=CNC+Cut+Metal+Patterns+%E2%80%94+Delivered+Across+India', width: 1200, height: 630, alt: 'Laser cutting designs by RG Tech Engineering' }],
    },
}

const HOW = [
    { Icon: FileText, title: 'Send a reference', body: 'A photograph, a temple picture, a sketch or a CAD file. Anything we can read.' },
    { Icon: Ruler, title: 'We draw it to your size', body: 'Cut file prepared to your opening, with bridges added so nothing drops out. Sent back for approval.' },
    { Icon: Layers, title: 'Cut and finished', body: 'Steel or brass, powder coated or polished, on a fiber laser up to 8000 x 2500 mm.' },
    { Icon: Truck, title: 'Dispatched to you', body: 'Packed flat with edge protection and freighted anywhere in India.' },
]

export default function DesignsHub() {
    const graph = jsonLdGraph(organizationSchema, {
        '@type': 'CollectionPage',
        '@id': `${BASE_URL}/designs#webpage`,
        url: `${BASE_URL}/designs`,
        name: 'Laser Cutting Designs',
        description:
            'CNC laser cutting designs cut in metal — deity panels, jali screens, gates and wall art, delivered across India.',
        isPartOf: { '@id': `${BASE_URL}/#website` },
        about: { '@id': `${BASE_URL}/#organization` },
    })

    return (
        <div className="bg-white">
            <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(graph)} />

            <section className="section hero-gradient py-16 md: relative overflow-hidden">
                <div className="hero-grid-paper" aria-hidden="true" />
                <div className="shell max-w-4xl sm:px-6 relative z-10 text-center">
                    <p className="eyebrow mb-4">Design Catalogue</p>
                    <h1 className="display-title text-fg mb-6 text-balance">
                        Laser Cutting Designs, <span className="text-accent">Cut in Metal</span>
                    </h1>
                    <p className="section-lead max-w-2xl mx-auto">
                        Deity panels, jali screens, gates and wall art — CNC cut from mild steel,
                        stainless steel and brass to the size you need, and dispatched anywhere in
                        India. We cut metal only; we do not cut MDF or acrylic.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
                        <a href="https://wa.me/916380736439" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                            <MessageCircle className="w-5 h-5" /> Send Your Design
                        </a>
                        <Link href="/contact" className="btn btn-secondary-light">
                            Request a Quote <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                    <div className="mt-10">
                        <DesignNav categories={navCategories()} />
                    </div>
                </div>
            </section>

            {/* Categories */}
            <section className="section md:">
                <div className="shell sm:px-6">
                    <div className="text-center mb-12">
                        <p className="eyebrow mb-3">Browse</p>
                        <h2 className="section-title text-fg">
                            Design <span className="text-accent">Categories</span>
                        </h2>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* navCategories(), not CATEGORIES: a category with no
                            designs yet would otherwise show here as a "0 designs"
                            card linking to an empty listing. */}
                        {navCategories().map(({ category: cat, designs: items }) => {
                            const cover = items[0]?.images?.[0]?.src
                            return (
                                <Link
                                    key={cat.slug}
                                    href={categoryUrl(cat)}
                                    className="group bg-white rounded-2xl overflow-hidden border border-line shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col"
                                >
                                    {cover && (
                                        <div className="aspect-[4/3] overflow-hidden bg-surface-2 relative">
                                            <Image
                                                src={cover}
                                                alt={`${cat.name} — laser cut metal panels by RG Tech Engineering`}
                                                fill
                                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                        </div>
                                    )}
                                    <div className="p-6 sm:p-8 flex flex-col flex-1">
                                        <p className="meta-label text-fg-subtle mb-3">
                                            {items.length} design{items.length === 1 ? '' : 's'}
                                        </p>
                                        <h3 className="card-title text-fg mb-3 group-hover:text-accent transition-colors">
                                            {cat.name}
                                        </h3>
                                        <p className="text-sm text-fg-muted leading-relaxed mb-6">{cat.tagline}</p>
                                        <span className="mt-auto meta-label text-accent flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                                            View designs <ArrowRight className="w-3.5 h-3.5" />
                                        </span>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* How it works */}
            <section className="section md: bg-surface-2">
                <div className="shell sm:px-6">
                    <div className="text-center mb-12">
                        <p className="eyebrow mb-3">How It Works</p>
                        <h2 className="section-title text-fg">
                            From your reference to <span className="text-accent">your doorstep</span>
                        </h2>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {HOW.map(({ Icon, title, body }) => (
                            <div key={title} className="bg-white rounded-2xl border border-line p-6 sm:p-8">
                                <span className="inline-flex mb-6">
                                    <Icon className="w-6 h-6 text-accent" />
                                </span>
                                <h3 className="card-title text-fg mb-3">{title}</h3>
                                <p className="text-sm text-fg-muted leading-relaxed">{body}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Local cross-link — the counterpart to the national framing above. */}
            <section className="section md:">
                <div className="shell max-w-3xl sm:px-6 text-center">
                    <p className="eyebrow mb-3">Looking for a local supplier?</p>
                    <h2 className="section-title text-fg mb-6">
                        We also cut <span className="text-accent">to order in your city</span>
                    </h2>
                    <p className="section-lead mb-8">
                        Designs on this page are cut at our Chennai unit and shipped nationwide. If you
                        want a local service page with turnaround times for your area, start here.
                    </p>
                    <div className="flex flex-wrap gap-3 justify-center">
                        {[
                            ['Chennai', '/chennai/decorative-metal-panels'],
                            ['Madurai', '/madurai/decorative-metal-panels'],
                            ['Coimbatore', '/coimbatore/decorative-metal-panels'],
                            ['Salem', '/salem/decorative-metal-panels'],
                        ].map(([name, href]) => (
                            <Link
                                key={name}
                                href={href}
                                className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface-2 px-4 py-2 text-sm font-semibold text-fg-muted hover:border-cta hover:text-accent transition-colors"
                            >
                                {name}
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
