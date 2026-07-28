"use client"
import Link from 'next/link'
import Image from 'next/image'
import { 
    Phone, Mail, MapPin, Clock, ArrowRight, Shield, Target, Zap, 
    Wrench, CheckCircle, FileText, Package, Eye, Layers, Ruler, 
    Sparkles, Plus, MessageCircle, Wind, Scissors, PanelTop, Home, DoorOpen, Settings,
    Factory, Cpu, Building2, Paintbrush, Truck, Send
} from 'lucide-react'
import { SERVICE_IMAGE_POOLS } from '@/lib/data'
import { getRotationIndex, localizeText, buildAlt, resolveFaqs } from '@/lib/utils'
import GoogleBusinessCard from '@/components/GoogleBusinessCard'
import ServiceAreas from '@/components/Service/ServiceAreas'

const IconMap = {
    Phone, Mail, MapPin, Clock, ArrowRight, Shield, Target, Zap, 
    Wrench, CheckCircle, FileText, Package, Eye, Layers, Ruler, 
    Sparkles, Plus, MessageCircle, Wind, Scissors, PanelTop, Home, DoorOpen, Settings,
    Factory, Cpu, Building2, Paintbrush, Truck, Send
}

const ServiceClient = ({ content, cityName, cityIndex, pathName, metaTitle, faqs }) => {
    const Icon = IconMap[content.mainIcon] || Settings;
    const serviceKey = content.slug.split('/').pop()
    const pool = SERVICE_IMAGE_POOLS[serviceKey] || SERVICE_IMAGE_POOLS['laser-cutting-services']

    const displayHeroImage = cityName ? pool[cityIndex % pool.length] : content.heroImage
    const displaySecondaryImage = cityName ? pool[(cityIndex + 1) % pool.length] : content.secondaryImage
    const displayTitle = cityName ? `${content.name} in ${cityName}` : content.title
    const displaySeoParagraph = cityName ? localizeText(content.seoParagraph, cityName, cityIndex) : content.seoParagraph
    
    // Already rotated and localised on the server (see resolveFaqs) so that the
    // rendered text matches the FAQPage markup exactly.
    const displayFaqs = faqs ?? resolveFaqs(content, cityName, cityIndex)

    return (
        <div className="bg-white">
            {/* Service Hero */}
            <section className="on-dark hero-gradient text-white py-24 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none hero-texture"></div>
                <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 -skew-x-12 translate-x-1/4 pointer-events-none"></div>
                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#F59E0B]/10 border border-[#F59E0B]/20 rounded-xl mb-8">
                                <span className="w-2 h-2 rounded-full bg-[#F59E0B] animate-pulse"></span>
                                <span className="text-[11px] font-black text-accent uppercase tracking-[0.2em]">Certified Industrial Hub</span>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-bold font-heading leading-tight mb-8">
                                {displayTitle.split(' in ')[0]} <br />
                                <span className="text-accent">{displayTitle.includes(' in ') ? `in ${displayTitle.split(' in ')[1]}` : ''}</span>
                            </h1>
                            <p className="text-lg text-white/70 mb-12 max-w-xl leading-relaxed font-medium">
                                {localizeText(content.heroDesc, cityName, cityIndex)}
                            </p>
                            <div className="flex flex-wrap gap-5">
                                <a href="/contact" className="btn btn-primary">
                                    Get Technical Quote <ArrowRight className="w-4 h-4" />
                                </a>
                                <a href="https://wa.me/916380736439" className="btn btn-secondary-dark">
                                    <MessageCircle className="w-5 h-5" /> WhatsApp Support
                                </a>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="relative z-10 rounded-[2.5rem] overflow-hidden border-8 border-white/5 shadow-2xl skew-y-1">
                                <Image
                                    src={displayHeroImage}
                                    alt={buildAlt({
                                        // The service name already arrives via metaTitle keywords, so
                                        // the subject describes the shot instead of repeating it.
                                        metaTitle,
                                        subject: 'CNC fiber laser cutting machine in operation',
                                        location: cityName || 'Chennai',
                                    })}
                                    width={1000}
                                    height={750}
                                    priority
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                    className="w-full aspect-[4/3] object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent"></div>
                            </div>
                            <div className="on-light absolute -bottom-10 -left-10 bg-white p-10 rounded-[2.5rem] shadow-2xl z-20 hidden md:block border border-line group transition-transform hover:scale-105">
                                <p className="text-[10px] font-black text-fg-subtle uppercase tracking-widest mb-2">Technical Reach</p>
                                <p className="text-2xl font-black text-[#0F2A44] leading-tight">Fast 24h <br /><span className="text-accent">Response</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trust Strip */}
            <div className="bg-white border-b border-line">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-line">
                        {content.trustStrip.map((item, i) => (
                            <div key={i} className="py-10 px-8 flex items-center gap-5 group hover:bg-surface-2 transition-colors">
                                <div className="w-12 h-12 rounded-xl bg-[#F59E0B]/5 flex items-center justify-center text-accent group-hover:bg-[#F59E0B] group-hover:text-[#0F2A44] transition-all">
                                    {(() => {
                                        const TIcon = IconMap[item.icon] || Settings
                                        return <TIcon className="w-6 h-6" />
                                    })()}
                                </div>
                                <div>
                                    <p className="font-black text-[#0F2A44] text-[13px] uppercase tracking-wider">{item.label}</p>
                                    <p className="text-[11px] text-fg-subtle font-bold uppercase tracking-widest mt-0.5">{item.sub}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content & SEO Grid */}
            <section className="py-24 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <div className="order-2 lg:order-1">
                            <h2 className="text-3xl md:text-5xl font-bold text-[#0F2A44] font-heading mb-8 leading-tight">
                                Industrial Grade <br /><span className="text-accent">Precision & Excellence</span>
                            </h2>
                            <div className="prose prose-slate max-w-none mb-12">
                                <p className="text-lg text-fg-muted font-medium leading-relaxed italic" dangerouslySetInnerHTML={{ __html: displaySeoParagraph }} />
                            </div>
                            <div className="grid sm:grid-cols-2 gap-8">
                                {content.whyCards.slice(0, 2).map((card, i) => {
                                    const WIcon = IconMap[card.icon] || Settings
                                    return (
                                        <div key={i} className="p-8 rounded-[2rem] bg-surface-2 border border-line hover:shadow-xl transition-all">
                                            <WIcon className="w-8 h-8 text-accent mb-6" />
                                            <h4 className="font-black text-[#0F2A44] mb-3 text-lg">{card.title}</h4>
                                            <p className="text-sm text-fg-muted font-medium leading-relaxed">{localizeText(card.desc, cityName, cityIndex)}</p>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="order-1 lg:order-2 relative">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#F59E0B]/5 rounded-full blur-[120px] pointer-events-none"></div>
                            <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white">
                                <Image
                                    src={displaySecondaryImage}
                                    alt={buildAlt({
                                        metaTitle,
                                        subject: 'Finished precision metal fabrication sample',
                                        location: cityName || 'Chennai',
                                    })}
                                    width={900}
                                    height={900}
                                    loading="lazy"
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                    className="w-full aspect-square object-cover"
                                />
                            </div>
                            <div className="absolute -bottom-6 -right-6 bg-[#F59E0B] text-[#0F2A44] p-8 rounded-3xl shadow-xl z-20 hidden md:block border-4 border-white">
                                <p className="text-4xl font-black font-heading leading-none">24</p>
                                <p className="text-xs font-bold uppercase tracking-widest mt-1 opacity-80">Hour Delivery</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Capabilities List */}
            <section className="py-24 bg-surface-2">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="on-dark surface-dark rounded-[3rem] p-12 md:p-20 relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-[120px]"></div>
                        <div className="relative z-10">
                            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                                <div>
                                    <p className="text-accent font-black text-xs uppercase tracking-[0.4em] mb-4">Technical Benchmarks</p>
                                    <h3 className="text-3xl md:text-5xl font-bold text-white font-heading">Machine <span className="text-accent">Capabilities</span></h3>
                                </div>
                                <p className="text-white/50 font-medium max-w-sm leading-relaxed">{localizeText(content.capabilityDesc, cityName, cityIndex)}</p>
                            </div>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-16">
                                {content.capabilitiesList.map((item, i) => (
                                    <div key={i} className="flex items-center gap-6 group">
                                        <div className="w-2 h-10 bg-[#F59E0B] rounded-full group-hover:scale-y-125 transition-transform"></div>
                                        <div>
                                            <p className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-1">{item.label}</p>
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
                        <p className="text-accent font-black text-xs uppercase tracking-[0.4em] mb-4">Quality Assurance</p>
                        <h3 className="text-3xl md:text-4xl font-bold text-[#0F2A44] font-heading">Execution <span className="text-accent">Workflow</span></h3>
                        <p className="text-fg-muted mt-4 font-medium italic opacity-80">Precision and discipline from blueprint to finished part.</p>
                    </div>
                    <div className={`grid md:grid-cols-2 lg:grid-cols-${(content.processSteps.length === 4 || content.processSteps.length === 8) ? '4' : '3'} gap-10`}>
                        {content.processSteps.map((s, i) => (
                            <div key={i} className="relative group p-10 rounded-[2.5rem] bg-surface-2 hover:bg-white hover:shadow-2xl transition-all duration-300">
                                <div className="absolute -top-6 left-10 w-14 h-14 bg-ink-2 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg border-4 border-white">
                                    {s.step}
                                </div>
                                <h4 className="font-black text-[#0F2A44] text-xl mt-4 mb-3 font-heading">{localizeText(s.title, cityName, cityIndex)}</h4>
                                <p className="text-[14px] text-fg-muted leading-relaxed font-medium opacity-80">{localizeText(s.desc, cityName, cityIndex)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            
            {/* FAQ Section — 2 columns x 4 rows */}
            <section className="py-24 bg-surface-2">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <p className="text-accent font-black text-xs uppercase tracking-[0.4em] mb-4">Support & FAQ</p>
                        <h2 className="text-3xl md:text-4xl font-bold text-fg font-heading">
                            Service <span className="text-accent">Queries</span>
                        </h2>
                    </div>
                    {/*
                     * grid-flow-col with 4 explicit rows fills column 1 top-to-bottom
                     * before starting column 2, so the reading order matches the
                     * visual order. A plain 2-col grid would zig-zag left/right.
                     */}
                    <div className="grid md:grid-cols-2 md:grid-rows-4 md:grid-flow-col gap-4 md:gap-x-6">
                        {displayFaqs.slice(0, 8).map((faq, i) => (
                            <details
                                key={i}
                                className="group bg-white rounded-2xl border border-line shadow-sm overflow-hidden h-fit"
                            >
                                <summary className="flex items-start justify-between gap-4 p-6 cursor-pointer list-none">
                                    <span className="font-black text-fg text-[15px] leading-snug">{faq.q}</span>
                                    <Plus className="w-5 h-5 flex-shrink-0 mt-0.5 text-accent group-open:rotate-45 transition-transform" />
                                </summary>
                                <div className="px-6 pb-6">
                                    <p className="text-[14.5px] text-fg-muted leading-relaxed font-medium border-l-4 border-[#F59E0B] pl-5">
                                        {faq.a}
                                    </p>
                                </div>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* Locality mesh — after the FAQs */}
            <ServiceAreas
                serviceSlug={content.slug}
                serviceName={content.name}
                cityName={cityName}
            />

            {/* Google Business Profile */}
            <GoogleBusinessCard cityName={cityName} />

            {/* Call to Action */}
            <section className="on-dark py-24 surface-dark relative overflow-hidden">
                <div className="absolute inset-0 bg-[#F59E0B]/10 skew-y-3 translate-y-32"></div>
                <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
                    <h3 className="text-3xl md:text-5xl font-bold text-white font-heading mb-10">
                        Ready to Start Your <span className="text-accent">Industrial Project?</span>
                    </h3>
                    <p className="text-white/60 text-lg mb-12 max-w-2xl mx-auto font-medium">
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
        </div>
    )
}

export default ServiceClient;
