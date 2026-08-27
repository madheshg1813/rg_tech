"use client"
import Link from 'next/link'
import Image from 'next/image'
import { 
    Phone, Mail, MapPin, Clock, ArrowRight, Shield, Target, Zap, 
    Wrench, CheckCircle, FileText, Package, Eye, Layers, Ruler, 
    Sparkles, Plus, MessageCircle, Wind, Scissors, PanelTop, Home, DoorOpen, Settings,
    Factory, Cpu, Building2, Paintbrush, Truck, Send, ShieldCheck
} from 'lucide-react'
import { SERVICE_IMAGE_POOLS } from '@/lib/data'
import { getRotationIndex, localizeText, buildAlt, resolveFaqs } from '@/lib/utils'
import GoogleBusinessCard from '@/components/GoogleBusinessCard'
import GoogleRating from '@/components/GoogleRating'
import ServiceAreas from '@/components/Service/ServiceAreas'

// Matches the home hero. "ISO Certified" is deliberately absent from both:
// the Google rating beside it is verifiable, an unlinked badge is not.
const HERO_CREDENTIALS = ['15+ Years', '1000+ Projects']

const IconMap = {
    Phone, Mail, MapPin, Clock, ArrowRight, Shield, Target, Zap, 
    Wrench, CheckCircle, FileText, Package, Eye, Layers, Ruler, 
    Sparkles, Plus, MessageCircle, Wind, Scissors, PanelTop, Home, DoorOpen, Settings,
    Factory, Cpu, Building2, Paintbrush, Truck, Send
}

const ServiceClient = ({ content, city, cityName, cityIndex, pathName, metaTitle, faqs, works, articles }) => {
    const Icon = IconMap[content.mainIcon] || Settings;
    const serviceKey = content.slug.split('/').pop()
    const pool = SERVICE_IMAGE_POOLS[serviceKey] || SERVICE_IMAGE_POOLS['laser-cutting-services']

    // On a locality page the locality is the place; on a non-Chennai pillar the
    // city itself is. Chennai's pillar keeps its original hand-written copy so
    // the existing indexed pages are unchanged.
    const place = cityName || (city && !city.isPrimary ? city.name : null)

    const displayHeroImage = place ? pool[cityIndex % pool.length] : content.heroImage
    const displaySecondaryImage = place ? pool[(cityIndex + 1) % pool.length] : content.secondaryImage
    const displayTitle = cityName
        ? `${content.name} in ${cityName}`
        : city && !city.isPrimary
            ? `${content.name} in ${city.name}`
            : content.title
    const displaySeoParagraph = place ? localizeText(content.seoParagraph, place, cityIndex) : content.seoParagraph
    
    // Already rotated and localised on the server (see resolveFaqs) so that the
    // rendered text matches the FAQPage markup exactly.
    const displayFaqs = faqs ?? resolveFaqs(content, place, cityIndex)

    // Split into two balanced columns, first half then second half, so the
    // rendered order still reads down column one and then down column two.
    // Balanced rather than a fixed 4/4 because a service can carry fewer than
    // eight questions and a lopsided pair of columns looks like a mistake.
    const faqList = displayFaqs.slice(0, 8)
    const faqColumns = [
        faqList.slice(0, Math.ceil(faqList.length / 2)),
        faqList.slice(Math.ceil(faqList.length / 2)),
    ].filter((column) => column.length > 0)

    return (
        <div className="bg-white">
            {/* Service Hero */}
            <section className="hero-gradient py-16 md:py-24 relative overflow-hidden">
                <div className="hero-grid-paper" aria-hidden="true" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        <div>
                            <p className="stamp mb-6">
                                <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
                                Certified Industrial Hub
                            </p>
                            <h1 className="display-title text-fg mb-6">
                                {displayTitle.split(' in ')[0]} <br />
                                <span className="text-accent">{displayTitle.includes(' in ') ? `in ${displayTitle.split(' in ')[1]}` : ''}</span>
                            </h1>
                            <p className="section-lead mb-9 max-w-[50ch]">
                                {localizeText(content.heroDesc, place, cityIndex)}
                            </p>
                            <div className="flex flex-col sm:flex-row flex-wrap gap-3">
                                <a href="/contact" className="btn btn-primary">
                                    Get Technical Quote <ArrowRight className="w-4 h-4" />
                                </a>
                                <a href="https://wa.me/916380736439" className="btn btn-secondary-light">
                                    <MessageCircle className="w-5 h-5" /> WhatsApp Support
                                </a>
                            </div>

                            {/* Same credibility line as the home hero. Sits under
                                the CTAs so the rating is the last thing read
                                before the decision, and it is a third-party claim
                                the visitor can click through and check. */}
                            <div className="flex flex-wrap items-center gap-x-6 gap-y-4 mt-9 pt-7 border-t border-line">
                                <GoogleRating />
                                <span className="hidden sm:block w-px h-8 bg-line" aria-hidden="true" />
                                {HERO_CREDENTIALS.map((c) => (
                                    <span key={c} className="meta-label text-fg-subtle">{c}</span>
                                ))}
                            </div>
                        </div>

                        {/* Desktop only. On a phone this stacked below the copy
                            as a full-width block, pushing the CTAs and the
                            rating down the page for a shot that says nothing the
                            headline has not already said. Hidden at the same
                            breakpoint the two-column grid activates, so it is
                            shown exactly when there is a column to put it in.

                            `priority` stays on the Image: at lg and up this is
                            still the LCP element. Below lg the element is not
                            rendered at all, so nothing is fetched. */}
                        <div className="relative hidden lg:block">
                            <div className="framed relative z-10">
                                <Image
                                    src={displayHeroImage}
                                    alt={buildAlt({
                                        // The service name already arrives via metaTitle keywords, so
                                        // the subject describes the shot instead of repeating it.
                                        metaTitle,
                                        subject: 'CNC fiber laser cutting machine in operation',
                                        location: place || 'Chennai',
                                    })}
                                    width={1000}
                                    height={750}
                                    priority
                                    /*
                                     * The 2px below is not a typo.
                                     *
                                     * display:none does NOT stop the browser
                                     * fetching an <img>, and `priority` emits a
                                     * <link rel=preload> that fires regardless
                                     * of CSS — so without this a phone
                                     * downloaded the full 828px hero, at high
                                     * priority, for a column it never paints.
                                     *
                                     * Preload and srcset both honour `sizes`, so
                                     * declaring a 2px slot below the lg
                                     * breakpoint makes the browser pick the
                                     * smallest candidate there (96w, a few KB)
                                     * and the real one from lg up, where this is
                                     * the LCP element and priority earns its keep.
                                     */
                                    sizes="(max-width: 1023px) 2px, 50vw"
                                    className="w-full aspect-[4/3] object-cover"
                                />
                            </div>
                            <div className="framed absolute -bottom-5 -left-4 xl:-left-8 px-5 py-4 z-20 hidden lg:block">
                                <p className="meta-label text-fg-subtle mb-1">Technical Reach</p>
                                <p className="subsection-title text-fg">Fast 24h <span className="text-accent">Response</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/*
             * Photo proof, straight after the hero and its trust strip — the
             * same position it holds on the home page. Delivered work is the
             * strongest thing on the page, so it runs before the copy rather
             * than after it.
             *
             * Rendered by the route rather than imported here: OurWorks resolves
             * 54 Cloudinary URLs through the 710-entry manifest, and this file
             * is a client component, so importing it would push that whole
             * manifest into the browser bundle. Passed in as an already-rendered
             * element it stays server-side. The route also decides who gets it —
             * pillar pages only, not the locality pages.
             */}
            {works}

            {/* Content & SEO Grid */}
            <section className="py-24 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <div className="order-2 lg:order-1">
                            <h2 className="section-title text-fg mb-8">
                                Industrial Grade <br /><span className="text-accent">Precision & Excellence</span>
                            </h2>
                            <div className="prose prose-slate max-w-none mb-12">
                                <p className="section-lead" dangerouslySetInnerHTML={{ __html: displaySeoParagraph }} />
                            </div>
                            <div className="grid sm:grid-cols-2 gap-8">
                                {content.whyCards.slice(0, 2).map((card, i) => {
                                    const WIcon = IconMap[card.icon] || Settings
                                    return (
                                        <div key={i} className="p-8 rounded-[2rem] bg-surface-2 border border-line hover:shadow-xl transition-all">
                                            <WIcon className="w-8 h-8 text-accent mb-6" />
                                            <h4 className="card-title text-fg mb-3">{card.title}</h4>
                                            <p className="text-sm text-fg-muted font-medium leading-relaxed">{localizeText(card.desc, cityName, cityIndex)}</p>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="order-1 lg:order-2 relative">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-cta/5 rounded-full blur-[120px] pointer-events-none"></div>
                            <div className="relative rounded-[1.5rem] sm:rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white">
                                <Image
                                    src={displaySecondaryImage}
                                    alt={buildAlt({
                                        metaTitle,
                                        subject: 'Finished precision metal fabrication sample',
                                        location: place || 'Chennai',
                                    })}
                                    width={900}
                                    height={900}
                                    loading="lazy"
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                    className="w-full aspect-square object-cover"
                                />
                            </div>
                            <div className="absolute -bottom-6 -right-6 bg-cta text-white p-8 rounded-3xl shadow-xl z-20 hidden md:block border-4 border-white">
                                <p className="text-4xl font-bold leading-none">24</p>
                                <p className="meta-label mt-1 opacity-80">Hour Delivery</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Capabilities List */}
            <section className="py-24 bg-surface-2">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="on-dark surface-dark rounded-[1.5rem] sm:rounded-[3rem] p-6 sm:p-12 md:p-20 relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-[120px]"></div>
                        <div className="relative z-10">
                            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                                <div>
                                    <p className="eyebrow mb-4">Technical Benchmarks</p>
                                    <h3 className="section-title text-white">Machine <span className="text-accent">Capabilities</span></h3>
                                </div>
                                <p className="section-lead text-white/50 max-w-sm">{localizeText(content.capabilityDesc, cityName, cityIndex)}</p>
                            </div>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-16">
                                {content.capabilitiesList.map((item, i) => (
                                    <div key={i} className="flex items-center gap-6 group">
                                        <div className="w-2 h-10 bg-cta rounded-full group-hover:scale-y-125 transition-transform"></div>
                                        <div>
                                            <p className="text-white/40 meta-label mb-1">{item.label}</p>
                                            <p className="text-white font-bold text-lg">{item.value}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Execution Process */}
            <section className="bg-white py-24">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-20">
                        <p className="eyebrow mb-4">Quality Assurance</p>
                        <h3 className="section-title text-fg">Execution <span className="text-accent">Workflow</span></h3>
                        <p className="section-lead mt-4 opacity-80">Precision and discipline from blueprint to finished part.</p>
                    </div>
                    <div className={`grid md:grid-cols-2 lg:grid-cols-${(content.processSteps.length === 4 || content.processSteps.length === 8) ? '4' : '3'} gap-10`}>
                        {content.processSteps.map((s, i) => (
                            <div key={i} className="relative group p-6 sm:p-10 rounded-[1.75rem] sm:rounded-[2.5rem] bg-surface-2 hover:bg-white hover:shadow-2xl transition-all duration-300">
                                <div className="absolute -top-6 left-6 sm:left-10 w-14 h-14 bg-ink-2 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg border-4 border-white">
                                    {s.step}
                                </div>
                                <h4 className="card-title text-fg mt-4 mb-3">{localizeText(s.title, cityName, cityIndex)}</h4>
                                <p className="text-sm text-fg-muted leading-relaxed font-medium opacity-80">{localizeText(s.desc, cityName, cityIndex)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            
            {/*
             * FAQ — two independent columns, NOT one 2x4 grid. Grid rows are
             * sized to the tallest cell in the row, so the previous
             * `grid-rows-4 grid-flow-col` version opened a card-sized hole in
             * every row of both columns as soon as one answer was expanded.
             * Splitting the list into two flex stacks keeps top-to-bottom
             * reading order and lets each column size itself.
             */}
            <section className="py-24 bg-surface-2">
                <div className="max-w-5xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <p className="eyebrow mb-3">Support &amp; FAQ</p>
                        <h2 className="section-title text-fg">
                            Service <span className="text-accent">Queries</span>
                        </h2>
                    </div>
                    <div className="faq-columns">
                        {faqColumns.map((column, col) => (
                            <div key={col} className="faq-column">
                                {column.map((faq, i) => (
                                    <details key={i} className="faq-card">
                                        <summary className="faq-q">
                                            <span>{faq.q}</span>
                                            <Plus className="faq-icon" aria-hidden="true" />
                                        </summary>
                                        <div className="faq-a">{faq.a}</div>
                                    </details>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Locality mesh — after the FAQs */}
            <ServiceAreas
                city={city}
                serviceName={content.name}
                serviceKey={content.slug.split('/').pop()}
                cityName={cityName}
            />

            {/* Google Business Profile */}
            <GoogleBusinessCard cityName={place} />

            {/* Call to Action */}
            <section className="on-dark py-24 surface-dark relative overflow-hidden">
                <div className="absolute inset-0 bg-cta/10 skew-y-3 translate-y-32"></div>
                <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
                    <h3 className="section-title text-white mb-10">
                        Ready to Start Your <span className="text-accent">Industrial Project?</span>
                    </h3>
                    <p className="section-lead text-white/60 mb-12 max-w-2xl mx-auto">
                        Engineer-verified quotes and DFM analysis available within 24 business hours.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Link href="/contact" className="btn btn-primary btn-lg">
                            Get Quote Now
                        </Link>
                        <a href="tel:+916380736439" className="btn btn-secondary-dark btn-lg">
                            +91 63807-36439
                        </a>
                    </div>
                </div>
            </section>

            {/* Recommended reading, last thing before the footer. Same slot
                pattern as {works} above: built by the route so this client
                component never pulls the Sanity client into the browser
                bundle, and so the route decides who gets it — pillars only. */}
            {articles}
        </div>
    )
}

export default ServiceClient;
