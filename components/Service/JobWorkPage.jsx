import Link from 'next/link'
import Image from 'next/image'
import {
    Package, FileText, Layers, Clock, Ruler, Receipt,
    Factory, Wrench, Cpu, Building2, Settings, Wind, Paintbrush, Home,
    ArrowRight, MessageCircle, Phone, Plus, MapPin, ChevronRight,
} from 'lucide-react'
import { JOB_WORK, jobWorkCopy, jobWorkUrl, categoryHub } from '@/lib/jobWork'
import { CITIES } from '@/lib/cities'
import GoogleRating from '@/components/GoogleRating'

/*
 * Laser cutting job work — the commercial pillar that sits above the nine
 * category pillars.
 *
 * Structure is deliberately different from every other page type on the site,
 * because the question is different. A category pillar answers "can you cut
 * this?"; this page answers "how do I engage you, and what do I get back?" —
 * so it leads with terms, then who already sends us work, then hands off to
 * whichever category the reader actually needs.
 *
 * Built mobile-first: every grid is a single column on a phone and the terms
 * read as a Q-and-A list rather than a table, which is what stops this page
 * turning into a wall of cells at 375px.
 */

const IconMap = {
    Package, FileText, Layers, Clock, Ruler, Receipt,
    Factory, Wrench, Cpu, Building2, Settings, Wind, Paintbrush, Home,
}

const HERO_CREDENTIALS = ['15+ Years', '1000+ Projects']

export default function JobWorkPage({ city, works, articles }) {
    const copy = jobWorkCopy(city)
    const j = JOB_WORK
    const hub = categoryHub(city.slug)
    const otherCities = Object.values(CITIES).filter((c) => c.slug !== city.slug)

    return (
        <div className="bg-white">

            {/* ── Hero ─────────────────────────────────────────────────────── */}
            <section className="hero-gradient relative overflow-hidden py-14 md:py-24">
                <div className="hero-grid-paper" aria-hidden="true" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                        <div>
                            <p className="stamp mb-6">
                                <Factory className="w-3.5 h-3.5" aria-hidden="true" />
                                {j.stamp}
                            </p>

                            <h1 className="display-title text-fg mb-6 text-balance">
                                Laser Cutting{' '}
                                <span className="text-accent">Job Work in {city.name}</span>
                            </h1>

                            <p className="section-lead mb-9 max-w-[52ch]">{j.lead}</p>

                            <div className="flex flex-col sm:flex-row flex-wrap gap-3">
                                <a href="https://wa.me/916380736439" className="btn btn-whatsapp">
                                    <MessageCircle className="w-5 h-5" /> WhatsApp Now
                                </a>
                                <a href="/contact" className="btn btn-secondary-light">
                                    Send Your Drawing <ArrowRight className="w-4 h-4" />
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

                        {/* Desktop only, and the sizes gate — not the CSS — is what
                            stops a phone fetching a hero it never paints. */}
                        <div className="relative hidden lg:block">
                            <div className="framed relative z-10">
                                <Image
                                    src={j.heroImage}
                                    alt={`${j.heroAlt} — ${copy.h1} | RG Tech Engineering`}
                                    width={1000}
                                    height={Math.round(1000 / j.heroRatio)}
                                    priority
                                    sizes="(max-width: 1023px) 2px, 50vw"
                                    style={{ aspectRatio: j.heroRatio }}
                                    className="w-full object-cover"
                                />
                            </div>
                            <div className="framed absolute -bottom-5 -left-4 xl:-left-8 px-5 py-4 z-20">
                                <p className="meta-label text-fg-subtle mb-1">{j.heroBadge.label}</p>
                                <p className="subsection-title text-fg">
                                    {j.heroBadge.value}<span className="text-accent">{j.heroBadge.unit}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Our works ────────────────────────────────────────────────── */}
            {works}

            {/* ── How job work runs ────────────────────────────────────────── */}
            <section className="py-16 md:py-20 bg-white border-t border-line">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-10 md:mb-14">
                        <p className="eyebrow mb-3">How It Works</p>
                        <h2 className="section-title text-fg">
                            The terms, before <span className="text-accent">the quote</span>
                        </h2>
                        <p className="section-lead mt-4 max-w-2xl mx-auto">
                            Everything a buyer comparing subcontractors asks first — answered
                            here rather than after three emails.
                        </p>
                    </div>

                    {/* A Q-and-A list, not a spec table: on a phone a table of terms
                        collapses into unreadable cells, this stays legible. */}
                    <dl className="grid md:grid-cols-2 gap-x-6 gap-y-0 m-0">
                        {j.terms.map((t) => {
                            const Icon = IconMap[t.icon] || Package
                            return (
                                <div key={t.q} className="flex items-start gap-4 py-5 border-b border-line">
                                    <span className="w-10 h-10 rounded-sm bg-cta/5 flex items-center justify-center text-accent flex-none mt-0.5">
                                        <Icon className="w-4.5 h-4.5" style={{ width: '1.1rem', height: '1.1rem' }} />
                                    </span>
                                    <div>
                                        <dt className="font-heading font-bold text-[1rem] tracking-[-0.015em] text-fg">
                                            {t.q}
                                        </dt>
                                        <dd className="m-0 mt-1.5 text-sm text-fg-muted leading-relaxed">
                                            {t.a}
                                        </dd>
                                    </div>
                                </div>
                            )
                        })}
                    </dl>
                </div>
            </section>

            {/* ── Who sends us job work ────────────────────────────────────── */}
            <section className="py-16 md:py-20 bg-surface-2 border-t border-line">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-10 md:mb-14">
                        <p className="eyebrow mb-3">Who We Cut For</p>
                        <h2 className="section-title text-fg">
                            Industries that send us <span className="text-accent">job work</span>
                        </h2>
                        <p className="section-lead mt-4 max-w-2xl mx-auto">
                            Most of our bed time is subcontract work for businesses that
                            already know what they need cut.
                        </p>
                    </div>

                    <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 list-none p-0">
                        {j.industries.map((ind) => {
                            const Icon = IconMap[ind.icon] || Factory
                            return (
                                <li key={ind.name} className="framed-soft bg-white p-5 flex flex-col">
                                    <span className="w-10 h-10 rounded-sm bg-cta/5 flex items-center justify-center text-accent mb-4">
                                        <Icon className="w-5 h-5" />
                                    </span>
                                    <h3 className="font-heading font-bold text-[0.98rem] tracking-[-0.015em] text-fg mb-1.5">
                                        {ind.name}
                                    </h3>
                                    <p className="text-sm text-fg-muted leading-relaxed">{ind.desc}</p>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </section>

            {/* ── The hub: every category, linked ──────────────────────────── */}
            <section className="py-16 md:py-20 bg-white border-t border-line">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-10 md:mb-14">
                        <p className="eyebrow mb-3">Every Category</p>
                        <h2 className="section-title text-fg">
                            What we cut in <span className="text-accent">{city.name}</span>
                        </h2>
                        <p className="section-lead mt-4 max-w-2xl mx-auto">
                            Nine categories, each with its own capabilities, materials and
                            pricing. Open the one your job belongs to.
                        </p>
                    </div>

                    <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 list-none p-0">
                        {hub.map((c) => (
                            <li key={c.href}>
                                <Link
                                    href={c.href}
                                    className="framed-soft group bg-white p-5 flex items-start gap-3 h-full hover:border-cta hover:shadow-md transition-all"
                                >
                                    <ChevronRight className="w-4 h-4 flex-none text-fg-subtle group-hover:text-accent mt-1 transition-colors" />
                                    <span>
                                        <span className="block font-heading font-bold text-[0.98rem] tracking-[-0.015em] text-fg group-hover:text-accent transition-colors">
                                            {c.name}
                                        </span>
                                        {c.desc && (
                                            <span className="block text-sm text-fg-muted mt-1 leading-relaxed">
                                                {c.desc}
                                            </span>
                                        )}
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* ── FAQs ─────────────────────────────────────────────────────── */}
            <section className="py-16 md:py-20 bg-surface-2 border-t border-line">
                <div className="max-w-5xl mx-auto px-4">
                    <div className="text-center mb-10 md:mb-12">
                        <p className="eyebrow mb-3">Support &amp; FAQ</p>
                        <h2 className="section-title text-fg">
                            Job work <span className="text-accent">questions</span>
                        </h2>
                    </div>

                    {/* Two independent flex columns, not a grid — a grid row is sized
                        to its tallest cell, so opening one answer would punch a hole
                        in the row beside it. */}
                    <div className="faq-columns">
                        {[0, 1].map((col) => (
                            <div key={col} className="faq-column">
                                {j.faqs
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

            {/* ── Other cities ─────────────────────────────────────────────── */}
            <section className="py-12 md:py-14 bg-white border-t border-line">
                <div className="max-w-5xl mx-auto px-4 text-center">
                    <p className="eyebrow mb-4">Also Serving</p>
                    <ul className="flex flex-wrap justify-center gap-3 list-none p-0">
                        {otherCities.map((c) => (
                            <li key={c.slug}>
                                <Link
                                    href={jobWorkUrl(c.slug)}
                                    className="inline-flex items-center gap-2 framed-soft bg-surface-2 px-4 py-2.5 text-sm font-medium text-fg-muted hover:bg-white hover:border-cta hover:text-fg transition-colors"
                                >
                                    <MapPin className="w-3.5 h-3.5 text-accent" />
                                    Job work in {c.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* ── Related reading ──────────────────────────────────────────── */}
            {articles}

            {/* ── Closing CTA ──────────────────────────────────────────────── */}
            <section className="on-dark py-16 md:py-20 surface-dark relative overflow-hidden">
                <div className="absolute inset-0 bg-cta/10 skew-y-3 translate-y-32" />
                <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
                    <h2 className="section-title text-white mb-6">
                        Have a drawing ready?{' '}
                        <span className="text-accent">Send it across.</span>
                    </h2>
                    <p className="section-lead text-white/60 mb-10 max-w-2xl mx-auto">
                        Itemised, engineer-verified pricing within 24 business hours — one
                        piece or a production run.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a href="https://wa.me/916380736439" className="btn btn-whatsapp btn-lg w-full sm:w-auto">
                            <MessageCircle className="w-5 h-5" /> WhatsApp Now
                        </a>
                        <a href="tel:+916380736439" className="btn btn-secondary-dark btn-lg w-full sm:w-auto">
                            <Phone className="w-4 h-4" /> +91 63807-36439
                        </a>
                    </div>
                </div>
            </section>
        </div>
    )
}
