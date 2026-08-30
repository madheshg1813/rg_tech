import Link from 'next/link'
import Image from 'next/image'
import {
    Zap, Layers, Wind, Shield, Ruler, Clock, Send, FileText, Truck,
    ArrowRight, MessageCircle, Phone, Check, Plus, MapPin,
} from 'lucide-react'
import { ALUMINUM, aluminumCopy, aluminumUrl } from '@/lib/aluminum'
import { CITIES } from '@/lib/cities'
import GoogleRating from '@/components/GoogleRating'

/*
 * Aluminum laser cutting pillar.
 *
 * A separate layout from ServiceClient, as specified: hero, works, pain points,
 * three-step process, sub-categories, FAQs, articles. It shares the design
 * system — .btn, .stamp, .framed, .eyebrow, the FAQ accordion — so it reads as
 * the same site, but none of the section structure is inherited.
 *
 * A server component. `works` and `articles` arrive as already-rendered
 * elements from the route for the same reason they do in ServiceClient: it
 * keeps the Cloudinary manifest and the Sanity client out of the browser.
 */

const IconMap = { Zap, Layers, Wind, Shield, Ruler, Clock, Send, FileText, Truck }

const HERO_CREDENTIALS = ['15+ Years', '1000+ Projects']

const OTHER_CITIES = Object.values(CITIES)

export default function AluminumPage({ city, works, articles }) {
    const copy = aluminumCopy(city)
    const a = ALUMINUM

    return (
        <div className="bg-white">

            {/* ── 1. Hero ─────────────────────────────────────────────────── */}
            <section className="hero-gradient relative overflow-hidden py-16 md:py-24">
                <div className="hero-grid-paper" aria-hidden="true" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        <div>
                            <p className="stamp mb-6">
                                <Shield className="w-3.5 h-3.5" aria-hidden="true" />
                                {a.stamp}
                            </p>

                            <h1 className="display-title text-fg mb-6 text-balance">
                                Aluminum Laser Cutting{' '}
                                <span className="text-accent">Services in {city.name}</span>
                            </h1>

                            <p className="section-lead mb-9 max-w-[52ch]">{a.lead}</p>

                            <div className="flex flex-col sm:flex-row flex-wrap gap-3">
                                <a href="https://wa.me/916380736439" className="btn btn-whatsapp">
                                    <MessageCircle className="w-5 h-5" /> WhatsApp Now
                                </a>
                                <a href="/contact" className="btn btn-secondary-light">
                                    Get Technical Quote <ArrowRight className="w-4 h-4" />
                                </a>
                            </div>

                            <div className="flex flex-wrap items-center gap-x-6 gap-y-4 mt-9 pt-7 border-t border-line">
                                <GoogleRating />
                                <span className="hidden sm:block w-px h-8 bg-line" aria-hidden="true" />
                                {HERO_CREDENTIALS.map((c) => (
                                    <span key={c} className="meta-label text-fg-subtle">{c}</span>
                                ))}
                            </div>
                        </div>

                        {/* Desktop only, matching the other service heroes. The
                            sizes gate — not just the CSS — is what stops a phone
                            fetching a hero it never paints. */}
                        <div className="relative hidden lg:block">
                            <div className="framed relative z-10">
                                <Image
                                    src={a.heroImage}
                                    alt={`${a.heroAlt} — Aluminum Laser Cutting Services in ${city.name} | RG Tech Engineering`}
                                    width={1000}
                                    height={Math.round(1000 / a.heroRatio)}
                                    priority
                                    sizes="(max-width: 1023px) 2px, 50vw"
                                    style={{ aspectRatio: a.heroRatio }}
                                    className="w-full object-cover"
                                />
                            </div>
                            <div className="framed absolute -bottom-5 -left-4 xl:-left-8 px-5 py-4 z-20">
                                <p className="meta-label text-fg-subtle mb-1">Sheet To Plate</p>
                                <p className="subsection-title text-fg">
                                    0.5 – 12<span className="text-accent">mm</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 2. Our works ────────────────────────────────────────────── */}
            {works}

            {/* ── 3. Why choose RG Tech — pain -> fix ─────────────────────── */}
            <section className="py-20 bg-white border-t border-line">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-14">
                        <p className="eyebrow mb-3">What Goes Wrong Elsewhere</p>
                        <h2 className="section-title text-fg">
                            Why Choose <span className="text-accent">RG Tech Engineering</span>
                        </h2>
                        <p className="section-lead mt-4 max-w-2xl mx-auto">
                            Aluminum is the hardest of the common metals to cut well.
                            Here is what tends to go wrong, and what we do about it.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {a.painPoints.map((p) => {
                            const Icon = IconMap[p.icon] || Shield
                            return (
                                <div
                                    key={p.pain}
                                    className="framed-soft bg-white p-6 flex flex-col hover:shadow-lg transition-shadow duration-300"
                                >
                                    <span className="w-11 h-11 rounded-sm bg-cta/5 flex items-center justify-center text-accent mb-5">
                                        <Icon className="w-5 h-5" />
                                    </span>
                                    <h3 className="card-title text-fg mb-2">{p.pain}</h3>
                                    <p className="text-sm text-fg-muted leading-relaxed">{p.fix}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* ── 4. How we work — three steps ────────────────────────────── */}
            <section className="py-20 bg-surface-2 border-t border-line">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-14">
                        <p className="eyebrow mb-3">How We Work</p>
                        <h2 className="section-title text-fg">
                            From your reference to <span className="text-accent">delivered parts</span>
                        </h2>
                        <p className="section-lead mt-4 max-w-2xl mx-auto">
                            Three steps. Nothing is cut until you have approved the file.
                        </p>
                    </div>

                    <ol className="grid md:grid-cols-3 gap-5 list-none p-0">
                        {a.process.map((s) => {
                            const Icon = IconMap[s.icon] || Send
                            return (
                                <li key={s.step} className="framed-soft bg-white p-7 flex flex-col">
                                    <div className="flex items-center gap-4 mb-5">
                                        <span className="font-heading font-extrabold text-3xl leading-none tracking-[-0.04em] text-line-strong">
                                            {s.step}
                                        </span>
                                        <span className="w-11 h-11 rounded-sm bg-cta/5 flex items-center justify-center text-accent">
                                            <Icon className="w-5 h-5" />
                                        </span>
                                    </div>
                                    <h3 className="card-title text-fg mb-2">{s.title}</h3>
                                    <p className="text-sm text-fg-muted leading-relaxed">{s.desc}</p>
                                </li>
                            )
                        })}
                    </ol>
                </div>
            </section>

            {/* ── 5. Sub-categories ──────────────────────────────────────── */}
            <section className="py-20 bg-white border-t border-line">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-14">
                        <p className="eyebrow mb-3">Aluminum Work We Take On</p>
                        <h2 className="section-title text-fg">
                            Looking for something in aluminum?{' '}
                            <span className="text-accent">We cut it.</span>
                        </h2>
                        <p className="section-lead mt-4 max-w-2xl mx-auto">
                            If your job is not on this list, send it anyway — most of what
                            we cut started as a drawing nobody else would quote.
                        </p>
                    </div>

                    <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 list-none p-0">
                        {a.subServices.map((s) => (
                            <li
                                key={s.name}
                                className="framed-soft bg-white px-5 py-4 flex items-start gap-3"
                            >
                                <Check className="w-4 h-4 flex-none text-accent mt-1" aria-hidden="true" />
                                <span>
                                    <span className="block font-heading font-bold text-[0.95rem] tracking-[-0.015em] text-fg">
                                        {s.name}
                                    </span>
                                    <span className="block text-sm text-fg-muted mt-0.5">{s.desc}</span>
                                </span>
                            </li>
                        ))}
                    </ul>

                    <div className="text-center mt-12">
                        <a href="https://wa.me/916380736439" className="btn btn-whatsapp">
                            <MessageCircle className="w-4 h-4" /> Send your drawing
                        </a>
                    </div>
                </div>
            </section>

            {/* ── 6. FAQs ─────────────────────────────────────────────────── */}
            <section className="py-20 bg-surface-2 border-t border-line">
                <div className="max-w-5xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <p className="eyebrow mb-3">Support &amp; FAQ</p>
                        <h2 className="section-title text-fg">
                            Aluminum cutting <span className="text-accent">questions</span>
                        </h2>
                    </div>

                    {/* Two independent flex columns, not a grid — a grid row is
                        sized to its tallest cell, so opening one answer would
                        punch a hole in the row beside it. */}
                    <div className="faq-columns">
                        {[0, 1].map((col) => (
                            <div key={col} className="faq-column">
                                {a.faqs
                                    .filter((_, i) => i % 2 === col)
                                    .map(([q, ans]) => (
                                        <details key={q} className="faq-card">
                                            <summary className="faq-q">
                                                <span>{q}</span>
                                                <Plus className="faq-icon" aria-hidden="true" />
                                            </summary>
                                            <div className="faq-a">{ans}</div>
                                        </details>
                                    ))}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Other cities ────────────────────────────────────────────
                Without this the three non-Chennai pillars would have no inbound
                link anywhere in the served HTML: this category has no locality
                pages to link up from, the header mega-menu only renders while it
                is open, and the footer carries the Chennai URL only. Four pages
                that cross-link each other are reachable from any one of them. */}
            <section className="py-14 bg-white border-t border-line">
                <div className="max-w-5xl mx-auto px-4 text-center">
                    <p className="eyebrow mb-4">Also Serving</p>
                    <ul className="flex flex-wrap justify-center gap-3 list-none p-0">
                        {OTHER_CITIES.filter((c) => c.slug !== city.slug).map((c) => (
                            <li key={c.slug}>
                                <Link
                                    href={aluminumUrl(c.slug)}
                                    className="inline-flex items-center gap-2 framed-soft bg-surface-2 px-4 py-2.5 text-sm font-medium text-fg-muted hover:bg-white hover:border-cta hover:text-fg transition-colors"
                                >
                                    <MapPin className="w-3.5 h-3.5 text-accent" />
                                    Aluminum laser cutting in {c.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* ── 7. Related articles ─────────────────────────────────────── */}
            {articles}

            {/* Closing CTA */}
            <section className="on-dark py-20 surface-dark relative overflow-hidden">
                <div className="absolute inset-0 bg-cta/10 skew-y-3 translate-y-32" />
                <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
                    <h2 className="section-title text-white mb-6">
                        Aluminum job in {city.name}?{' '}
                        <span className="text-accent">Send the drawing.</span>
                    </h2>
                    <p className="section-lead text-white/60 mb-10 max-w-2xl mx-auto">
                        Itemised, engineer-verified pricing within 24 business hours.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/contact" className="btn btn-primary btn-lg">
                            Get Quote Now
                        </Link>
                        <a href="tel:+916380736439" className="btn btn-secondary-dark btn-lg">
                            <Phone className="w-4 h-4" /> +91 63807-36439
                        </a>
                    </div>
                </div>
            </section>
        </div>
    )
}
