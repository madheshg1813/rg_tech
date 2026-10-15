import Link from 'next/link'
import Image from 'next/image'
import {
    PenTool, Scissors, Home, Building2, DoorOpen, Factory, MessageCircle,
    ClipboardList, FileText, Settings, CheckCircle, Layers, Package,
    ArrowRight, Phone, Check, Plus, Shield,
} from 'lucide-react'
import { NAME_ENGRAVING, NAME_PLATE_WORKS, STOCK_IMAGES, TYPE_IMAGES } from '@/lib/nameEngraving'
import { cld, cldSize } from '@/lib/cloudinary'
import GoogleRating from '@/components/GoogleRating'
import JustdialBadge from '@/components/JustdialBadge'

/*
 * Name engraving / metal name plates pillar.
 *
 * Built from the same parts as StainlessSteelPage - hero, card grids, the
 * numbered process, the FAQ accordion, the dark closing CTA - with sections
 * specific to nameplates. Every class is from the existing design system.
 *
 * Images: the hero and the "Our nameplate work" grid are genuine RG Tech
 * jobs. The Unsplash photographs illustrate plate types, a process and a
 * finish; their alt text describes what is in frame and never claims the
 * work as ours.
 *
 * A server component, so cld() and the Cloudinary manifest stay on the server.
 */

const IconMap = {
    PenTool, Scissors, Home, Building2, DoorOpen, Factory, MessageCircle,
    ClipboardList, FileText, Settings, CheckCircle, Layers, Package,
}

const HERO_CREDENTIALS = ['15+ Years', '1000+ Projects']

const WHATSAPP_URL =
    'https://wa.me/916380736439?text=' +
    encodeURIComponent('Hi RG Tech, I would like a quote for a metal name plate.')

/*
 * Work photos are rendered as plain <img> with Cloudinary URLs, like the
 * works strip in OurWorks. next/image would hand them to the custom loader,
 * which drops any transformation already in the URL - including the a_<deg>
 * rotation two of these photographs need.
 */
function workImage(work, w) {
    const h = Math.round(w * 0.75)
    return cld(work.src, {
        width: w, height: h, crop: 'fill', gravity: 'auto', dpr: false,
        ...(work.rot ? { angle: work.rot } : {}),
    })
}

/* Section heading block, matching the centred headers on the other pillars. */
function SectionHead({ eyebrow, title, accent, lead }) {
    return (
        <div className="text-center mb-10 sm:mb-14">
            <p className="eyebrow mb-3">{eyebrow}</p>
            <h2 className="section-title text-fg">
                {title} <span className="text-accent">{accent}</span>
            </h2>
            {lead && <p className="section-lead mt-4 max-w-2xl mx-auto">{lead}</p>}
        </div>
    )
}

/* The check-mark list item used for sub-services on the other pillars. */
function CheckItem({ name, desc }) {
    return (
        <li className="framed-soft bg-white px-4 py-3 sm:px-5 sm:py-4 flex items-start gap-3">
            <Check className="w-4 h-4 flex-none text-accent mt-1" aria-hidden="true" />
            <span>
                <span className="block font-heading font-bold text-[0.95rem] tracking-[-0.015em] text-fg">
                    {name}
                </span>
                <span className="block text-sm text-fg-muted mt-0.5">{desc}</span>
            </span>
        </li>
    )
}

export default function NameEngravingPage({ city }) {
    const a = NAME_ENGRAVING
    const heroSrc = cld(a.heroWork.src)
    const heroSize = cldSize(a.heroWork.src) || { width: 1400, height: 1050 }

    return (
        <div className="bg-white">

            {/* ── 1. Hero ─────────────────────────────────────────────────── */}
            <section className="section hero-gradient relative overflow-hidden py-16 md:">
                <div className="hero-grid-paper" aria-hidden="true" />
                <div className="shell sm:px-6 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        <div>
                            <p className="stamp mb-6">
                                <Shield className="w-3.5 h-3.5" aria-hidden="true" />
                                {a.stamp}
                            </p>

                            <h1 className="display-title text-fg mb-6 text-balance">
                                Custom Metal Name Engraving{' '}
                                <span className="text-accent">Services in {city.name}</span>
                            </h1>

                            <p className="section-lead mb-9 max-w-[52ch]">{a.lead}</p>

                            <div className="flex flex-col sm:flex-row flex-wrap gap-3">
                                <a href={WHATSAPP_URL} className="btn btn-whatsapp">
                                    <MessageCircle className="w-5 h-5" /> WhatsApp Your Requirements
                                </a>
                                <a href="/contact" className="btn btn-secondary-light">
                                    Send an Enquiry <ArrowRight className="w-4 h-4" />
                                </a>
                            </div>

                            <div className="flex flex-wrap items-center gap-x-6 gap-y-4 mt-9 pt-7 border-t border-line">
                                <GoogleRating />
                                <JustdialBadge />
                                <span className="hidden sm:block w-px h-8 bg-line" aria-hidden="true" />
                                {HERO_CREDENTIALS.map((c) => (
                                    <span key={c} className="meta-label text-fg-subtle">{c}</span>
                                ))}
                            </div>
                        </div>

                        {/* Desktop only, matching the other service heroes. A
                            genuine RG Tech plate, not a stock photo. */}
                        <div className="relative hidden lg:block">
                            <div className="framed relative z-10">
                                <Image
                                    src={heroSrc}
                                    alt={`${a.heroWork.alt} - made by RG Tech Engineering, ${city.name}`}
                                    width={heroSize.width}
                                    height={heroSize.height}
                                    priority
                                    sizes="(max-width: 1023px) 2px, 50vw"
                                    style={{ aspectRatio: a.heroRatio }}
                                    className="w-full object-cover"
                                />
                            </div>
                            <div className="framed absolute -bottom-5 -left-4 xl:-left-8 px-5 py-4 z-20">
                                <p className="meta-label text-fg-subtle mb-1">{a.heroBadge.label}</p>
                                <p className="subsection-title text-fg">{a.heroBadge.value}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 2. Our nameplate work - genuine photographs ─────────────── */}
            <section className="section bg-surface-2 border-t border-line">
                <div className="shell">
                    <SectionHead
                        eyebrow="Delivered Projects"
                        title="Name plates from"
                        accent="our workshop"
                        lead="A few of the plates we have made. Every one started as a name, a logo or a photo sent to us on WhatsApp."
                    />
                    {/* The hero plate is already on screen at lg+, where the
                        hero image shows, so its card here is for phones and
                        tablets only - no photograph appears twice on a page. */}
                    <ul className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-5 px-5 pb-1 list-none sm:mx-auto sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 max-w-5xl">
                        {NAME_PLATE_WORKS.map((w) => (
                            <li
                                key={w.src}
                                className={`framed-soft bg-white overflow-hidden flex flex-col w-[78vw] shrink-0 snap-start sm:w-auto sm:shrink${
                                    w === a.heroWork ? ' sm:col-span-2 lg:hidden' : ''
                                }`}
                            >
                                <img
                                    src={workImage(w, 800)}
                                    srcSet={`${workImage(w, 480)} 480w, ${workImage(w, 800)} 800w, ${workImage(w, 1200)} 1200w`}
                                    sizes="(max-width: 639px) 78vw, 50vw"
                                    alt={w.alt}
                                    width={800}
                                    height={600}
                                    loading="lazy"
                                    decoding="async"
                                    className="w-full aspect-[4/3] object-cover"
                                />
                                <p className="px-5 py-4 text-sm text-fg-muted">{w.caption}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* ── 3. Engraving vs laser-cut lettering ─────────────────────── */}
            <section className="section bg-white border-t border-line overflow-hidden">
                <div className="shell">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        <div>
                            <p className="eyebrow mb-3">Two Ways To Make A Name Plate</p>
                            <h2 className="section-title text-fg mb-8">
                                Engraved into the metal, or{' '}
                                <span className="text-accent">cut right through it</span>
                            </h2>
                            <div className="grid gap-3 sm:gap-5">
                                {a.methods.map((m) => {
                                    const Icon = IconMap[m.icon] || PenTool
                                    return (
                                        <div key={m.title} className="framed-soft bg-white p-5 sm:p-6">
                                            <span className="inline-flex mb-4">
                                                <Icon className="w-5 h-5" />
                                            </span>
                                            <h3 className="card-title text-fg mb-2">{m.title}</h3>
                                            <p className="text-sm text-fg-muted leading-relaxed">{m.desc}</p>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <div>
                            <div className="framed">
                                <Image
                                    src={STOCK_IMAGES.engraving.src}
                                    alt={STOCK_IMAGES.engraving.alt}
                                    width={STOCK_IMAGES.engraving.width}
                                    height={STOCK_IMAGES.engraving.height}
                                    loading="lazy"
                                    sizes="(max-width: 1023px) 100vw, 50vw"
                                    className="w-full h-auto object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 4. Types of name plates ─────────────────────────────────── */}
            <section className="section bg-surface-2 border-t border-line">
                <div className="shell">
                    <SectionHead
                        eyebrow="Types Of Name Plates"
                        title="Name plates for"
                        accent="every door and machine"
                    />
                    <ul className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-5 px-5 pb-1 mb-3 list-none sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 sm:mb-5">
                        {TYPE_IMAGES.map((img) => (
                            <li key={img.src} className="framed-soft bg-white overflow-hidden w-[72vw] shrink-0 snap-start sm:w-auto sm:shrink">
                                <Image
                                    src={img.src}
                                    alt={img.alt}
                                    width={800}
                                    height={600}
                                    loading="lazy"
                                    sizes="(max-width: 639px) 72vw, 33vw"
                                    style={{ objectPosition: img.position }}
                                    className="w-full aspect-[4/3] object-cover"
                                />
                                <p className="meta-label text-fg-subtle px-5 py-3">{img.label}</p>
                            </li>
                        ))}
                    </ul>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
                        {a.types.map((t) => {
                            const Icon = IconMap[t.icon] || Home
                            return (
                                <div
                                    key={t.name}
                                    className="framed-soft bg-white p-5 sm:p-6 flex flex-col hover:shadow-lg transition-shadow duration-300"
                                >
                                    <span className="inline-flex mb-3 sm:mb-5">
                                        <Icon className="w-5 h-5" />
                                    </span>
                                    <h3 className="card-title text-fg mb-2">{t.name}</h3>
                                    <p className="text-sm text-fg-muted leading-relaxed">{t.desc}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* ── 5. Materials and finishes ───────────────────────────────── */}
            <section className="section bg-white border-t border-line">
                <div className="shell">
                    <div className="grid lg:grid-cols-[1fr_minmax(0,380px)] gap-12 lg:gap-16 items-start">
                        <div>
                            <p className="eyebrow mb-3">Materials &amp; Finishes</p>
                            <h2 className="section-title text-fg mb-4">
                                Choose the metal for <span className="text-accent">where it will hang</span>
                            </h2>
                            <p className="section-lead mb-10 max-w-[60ch]">
                                A plate on a covered office door and one on a gate facing the
                                sea need different metals. Tell us where yours is going and we
                                will suggest the right one.
                            </p>

                            <h3 className="subsection-title text-fg mb-5">Materials</h3>
                            <ul className="grid sm:grid-cols-2 gap-2 sm:gap-4 list-none p-0 mb-10">
                                {a.materials.map((m) => <CheckItem key={m.name} {...m} />)}
                            </ul>

                            <h3 className="subsection-title text-fg mb-5">Finishes</h3>
                            <ul className="grid sm:grid-cols-2 gap-2 sm:gap-4 list-none p-0">
                                {a.finishes.map((f) => <CheckItem key={f.name} {...f} />)}
                            </ul>
                        </div>
                        <div className="hidden lg:block lg:sticky lg:top-28">
                            <div className="framed">
                                <Image
                                    src={STOCK_IMAGES.material.src}
                                    alt={STOCK_IMAGES.material.alt}
                                    width={STOCK_IMAGES.material.width}
                                    height={STOCK_IMAGES.material.height}
                                    loading="lazy"
                                    sizes="(max-width: 1023px) 2px, 380px"
                                    className="w-full aspect-[4/3] object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 6. Customization options ────────────────────────────────── */}
            <section className="section bg-surface-2 border-t border-line">
                <div className="shell">
                    <SectionHead
                        eyebrow="Customization Options"
                        title="Your name, your font,"
                        accent="your logo"
                        lead="Everything on the plate is set to your requirements, and you see the full layout before it is made."
                    />
                    <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 list-none p-0">
                        {a.customization.map((c) => <CheckItem key={c.name} {...c} />)}
                    </ul>
                </div>
            </section>

            {/* ── 7. Applications ─────────────────────────────────────────── */}
            <section className="section bg-white border-t border-line">
                <div className="shell">
                    <SectionHead
                        eyebrow="Applications"
                        title="Where our name plates"
                        accent="are fixed"
                    />
                    <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 list-none p-0">
                        {a.applications.map((ap) => <CheckItem key={ap.name} {...ap} />)}
                    </ul>
                </div>
            </section>

            {/* ── 8. Process ──────────────────────────────────────────────── */}
            <section className="section bg-surface-2 border-t border-line">
                <div className="shell">
                    <SectionHead
                        eyebrow="Our Process"
                        title="From your enquiry to"
                        accent="a finished plate"
                        lead="Five steps. Nothing is engraved or cut until you have approved the layout."
                    />
                    <ol className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-5 list-none p-0">
                        {a.process.map((s) => {
                            const Icon = IconMap[s.icon] || FileText
                            return (
                                <li key={s.step} className="framed-soft bg-white p-5 sm:p-6 flex flex-col">
                                    <div className="flex items-center gap-4 mb-3 sm:mb-5">
                                        <span className="font-heading font-extrabold text-3xl leading-none tracking-[-0.04em] text-line-strong">
                                            {s.step}
                                        </span>
                                        <span className="inline-flex">
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

            {/* ── 9. Why choose RG Tech ───────────────────────────────────── */}
            <section className="section bg-white border-t border-line">
                <div className="shell">
                    <SectionHead
                        eyebrow="Why RG Tech"
                        title="Why Choose"
                        accent="RG Tech Engineering"
                    />
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
                        {a.reasons.map((r) => {
                            const Icon = IconMap[r.icon] || Settings
                            return (
                                <div
                                    key={r.title}
                                    className="framed-soft bg-white p-5 sm:p-6 flex flex-col hover:shadow-lg transition-shadow duration-300"
                                >
                                    <span className="inline-flex mb-3 sm:mb-5">
                                        <Icon className="w-5 h-5" />
                                    </span>
                                    <h3 className="card-title text-fg mb-2">{r.title}</h3>
                                    <p className="text-sm text-fg-muted leading-relaxed">{r.desc}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* ── 10. Related services ────────────────────────────────────── */}
            <section className="section bg-surface-2 border-t border-line">
                <div className="shell">
                    <SectionHead
                        eyebrow="Related Services"
                        title="More from our"
                        accent={`${city.name} workshop`}
                    />
                    <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 list-none p-0">
                        {a.related.map((r) => (
                            <li key={r.href}>
                                <Link
                                    href={r.href}
                                    className="framed-soft bg-white px-5 py-4 flex items-start justify-between gap-3 h-full hover:shadow-lg transition-shadow duration-300"
                                >
                                    <span>
                                        <span className="block font-heading font-bold text-[0.95rem] tracking-[-0.015em] text-fg">
                                            {r.title}
                                        </span>
                                        <span className="block text-sm text-fg-muted mt-0.5">{r.desc}</span>
                                    </span>
                                    <ArrowRight className="w-4 h-4 flex-none text-accent mt-1" aria-hidden="true" />
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* ── 11. FAQs ────────────────────────────────────────────────── */}
            <section className="section bg-white border-t border-line">
                <div className="shell max-w-5xl">
                    <div className="text-center mb-12">
                        <p className="eyebrow mb-3">Support &amp; FAQ</p>
                        <h2 className="section-title text-fg">
                            Name plate <span className="text-accent">questions</span>
                        </h2>
                    </div>

                    {/* Two independent flex columns, not a grid - see the
                        note on StainlessSteelPage. */}
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

            {/* ── 12. Closing CTA ─────────────────────────────────────────── */}
            <section className="section on-dark surface-dark relative overflow-hidden">
                <div className="shell max-w-4xl relative z-10 text-center">
                    <h2 className="section-title text-white mb-6">
                        Need a name plate in {city.name}?{' '}
                        <span className="text-accent">Share your requirements.</span>
                    </h2>
                    <p className="section-lead text-white/60 mb-10 max-w-2xl mx-auto">
                        Send the text, size, material and a logo or reference photo on
                        WhatsApp, and we will come back with a tailored quotation.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a href={WHATSAPP_URL} className="btn btn-whatsapp btn-lg">
                            <MessageCircle className="w-5 h-5" /> WhatsApp Now
                        </a>
                        <a href="tel:+916380736439" className="btn btn-secondary-dark btn-lg">
                            <Phone className="w-4 h-4" /> +91 63807-36439
                        </a>
                    </div>
                </div>
            </section>
        </div>
    )
}
