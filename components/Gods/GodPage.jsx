import Link from 'next/link'
import Image from 'next/image'
import {
    MessageCircle, ArrowRight, Ruler, Layers, Paintbrush, Wrench,
    ShieldCheck, Clock, Plus, Sparkles, Phone,
} from 'lucide-react'
import { relatedGods, godUrl } from '@/lib/gods'
import { IMAGES } from '@/content/lib/images.mjs'
import GoogleBusinessCard from '@/components/GoogleBusinessCard'

const WA = '916380736439'

/** Prefilled WhatsApp link — the enquiry arrives already saying what it is about. */
function waLink(god, city) {
    const msg = `Hi RG Tech, I'm interested in a laser cut ${god.name} design in ${city.name}. Please share designs, sizes and pricing.`
    return `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`
}

const SPECS = [
    { Icon: Ruler, label: 'Sizes', value: 'From 1 ft panels to full 8 ft temple arches' },
    { Icon: Layers, label: 'Materials', value: 'MS, SS 304/316, brass, copper, aluminium' },
    { Icon: Paintbrush, label: 'Finishes', value: 'Powder coat, golden PVD, brushed, mirror' },
    { Icon: Wrench, label: 'Thickness', value: '1.5 mm to 5 mm for decorative panels' },
]

const USES = [
    'Pooja room partitions and back panels',
    'Main gate and compound wall inserts',
    'Temple arch and entrance panels',
    'Wall art for living and prayer rooms',
    'Name boards combining deity motifs',
    'Window grills and balcony railings',
]

export default function GodPage({ god, city }) {
    const related = relatedGods(god.key, 6)
    const wa = waLink(god, city)
    const title = `${god.name} Laser Cutting Design`

    return (
        <div className="bg-white">
            {/* ── Hero ─────────────────────────────────────────────────────── */}
            <section className="hero-gradient py-16 md:py-24 relative overflow-hidden">
                <div className="hero-grid-paper" aria-hidden="true" />
                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <div className="inline-flex items-center gap-3 px-4 py-2 bg-cta/10 border border-cta/20 rounded-xl mb-8">
                                <Sparkles className="w-3.5 h-3.5 text-accent" />
                                <span className="meta-label text-accent">
                                    Custom Design Work
                                </span>
                            </div>

                            <h1 className="display-title text-fg mb-6">
                                {god.name} Laser Cutting
                                <br />
                                <span className="text-accent">Design in {city.name}</span>
                            </h1>

                            {god.alsoKnownAs && (
                                <p className="text-fg-subtle text-sm font-medium mb-6">
                                    Also known as {god.alsoKnownAs}
                                </p>
                            )}

                            <p className="section-lead mb-10 max-w-xl">
                                Precision CNC laser cut {god.name} panels in mild steel, stainless steel and
                                brass — cut from your reference or ours, finished and delivered across{' '}
                                {city.name}.
                            </p>

                            {/* Primary CTA is WhatsApp: for design work customers want to
                                send a photo and talk, not fill in a form. */}
                            <div className="flex flex-wrap gap-4">
                                <a
                                    href={wa}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-whatsapp btn-lg"
                                >
                                    <MessageCircle className="w-5 h-5" />
                                    Get Design on WhatsApp
                                </a>
                                <a href={`tel:+${WA}`} className="btn btn-secondary-light btn-lg">
                                    <Phone className="w-4 h-4" /> +91 63807 36439
                                </a>
                            </div>

                            <p className="text-fg-subtle text-sm mt-5">
                                Send a photo or sketch — we reply with sizes and pricing the same day.
                            </p>
                        </div>

                        <div className="relative">
                            <div className="framed">
                                <Image
                                    src={IMAGES.panel}
                                    alt={`Laser cut ${god.name} decorative metal panel design by RG Tech Engineering in ${city.name}`}
                                    width={900}
                                    height={1200}
                                    priority
                                    sizes="(max-width: 1024px) 100vw, 45vw"
                                    className="w-full aspect-[3/4] object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Specs ────────────────────────────────────────────────────── */}
            <section className="bg-white border-b border-line">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-x-0 lg:divide-y-0 lg:divide-x divide-line">
                        {SPECS.map(({ Icon, label, value }) => (
                            <div key={label} className="py-8 px-6 flex items-start gap-4">
                                <span className="w-11 h-11 rounded-xl bg-cta/10 flex items-center justify-center flex-shrink-0">
                                    <Icon className="w-5 h-5 text-accent" />
                                </span>
                                <div>
                                    <p className="meta-label text-fg">
                                        {label}
                                    </p>
                                    <p className="text-sm text-fg-muted mt-1 leading-snug">{value}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Detail + uses ────────────────────────────────────────────── */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-start">
                    <div>
                        <h2 className="section-title text-fg mb-6">
                            Custom {god.name} Panels,
                            <br />
                            <span className="text-accent">Cut to Your Size</span>
                        </h2>
                        <p className="text-lg text-fg-muted leading-relaxed mb-6">
                            Every {god.name} design is cut on our CNC fiber laser from a vector drawing, so
                            the detail stays crisp at any scale — fine ornamental line work on a pooja room
                            screen, or a bold silhouette across a full gate panel.
                        </p>
                        <p className="text-lg text-fg-muted leading-relaxed mb-8">
                            Bring a photograph, a temple reference or a rough sketch. We convert it to a
                            cutting file, check the design holds together structurally once material is
                            removed, and confirm the sizes with you before anything is cut.
                        </p>

                        <h3 className="card-title text-fg mb-4">Where these are used</h3>
                        <ul className="space-y-3">
                            {USES.map((u) => (
                                <li
                                    key={u}
                                    className="relative pl-7 text-base text-fg-muted leading-relaxed before:absolute before:left-0 before:top-[0.6em] before:w-2 before:h-2 before:rounded-full before:bg-cta"
                                >
                                    {u}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Sticky WhatsApp card — the ask stays on screen while reading */}
                    <div className="lg:sticky lg:top-28">
                        <div className="rounded-[2rem] border border-line bg-surface-2 p-8">
                            <span className="w-12 h-12 rounded-xl bg-[#25D366]/10 flex items-center justify-center mb-5">
                                <MessageCircle className="w-6 h-6 text-[#128C4A]" />
                            </span>
                            <h3 className="subsection-title text-fg">
                                Send us your {god.name} reference
                            </h3>
                            <p className="text-base text-fg-muted mt-3 leading-relaxed">
                                Share a photo, temple image or sketch on WhatsApp. We come back with
                                achievable sizes, material options, finish and a price — usually the same
                                day.
                            </p>

                            <a
                                href={wa}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-whatsapp w-full mt-6"
                            >
                                <MessageCircle className="w-5 h-5" /> Chat on WhatsApp
                            </a>
                            <Link href="/contact" className="btn btn-secondary-light w-full mt-3">
                                Request a Quote <ArrowRight className="w-4 h-4" />
                            </Link>

                            <div className="mt-6 pt-6 border-t border-line grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="flex items-center gap-2.5">
                                    <ShieldCheck className="w-4 h-4 text-accent flex-shrink-0" />
                                    <span className="text-sm text-fg-muted">Design check included</span>
                                </div>
                                <div className="flex items-center gap-2.5">
                                    <Clock className="w-4 h-4 text-accent flex-shrink-0" />
                                    <span className="text-sm text-fg-muted">Same-day reply</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Related designs ──────────────────────────────────────────── */}
            <section className="py-20 bg-surface-2 border-t border-line">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center mb-10">
                        <p className="eyebrow mb-3">
                            More Designs
                        </p>
                        <h2 className="section-title text-fg">
                            Related laser cut designs
                        </h2>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {related.map((g) => (
                            <Link
                                key={g.key}
                                href={godUrl(city.slug, g.key)}
                                className="group rounded-2xl border border-line bg-white px-6 py-5 hover:border-cta transition-colors"
                            >
                                <p className="font-bold text-fg group-hover:text-accent transition-colors">
                                    {g.name}
                                </p>
                                <p className="text-sm text-fg-subtle mt-1">
                                    Laser cutting design in {city.name}
                                </p>
                            </Link>
                        ))}
                    </div>
                    {/*
                     * There was a "View all N designs" link to /{city}/designs
                     * here. No such route exists — the city catch-all resolves
                     * its slug against the service list, so it 404'd on all 50
                     * deity pages in all four cities. Removed rather than
                     * repointed: the national /designs catalogue is a different
                     * thing (one design so far) and a city-level design index
                     * has not been planned yet. The grid above already links
                     * onward, so this is not a dead end.
                     */}
                </div>
            </section>

            <GoogleBusinessCard cityName={city.name} />

            {/* ── Closing CTA ──────────────────────────────────────────────── */}
            <section className="on-dark py-24 surface-dark relative overflow-hidden">
                <div className="absolute inset-0 bg-cta/10 skew-y-3 translate-y-32" />
                <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
                    <h2 className="section-title text-white mb-6">
                        Ready to make your <span className="text-accent">{god.name} design?</span>
                    </h2>
                    <p className="section-lead text-white/60 mb-10 max-w-2xl mx-auto">
                        Send your reference on WhatsApp and get sizes, material options and pricing back the
                        same day.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-lg">
                            <MessageCircle className="w-5 h-5" /> WhatsApp Us Now
                        </a>
                        <a href={`tel:+${WA}`} className="btn btn-secondary-light btn-lg">
                            <Phone className="w-4 h-4" /> +91 63807 36439
                        </a>
                    </div>
                </div>
            </section>
        </div>
    )
}
