import { Star, MapPin, Truck, ShieldCheck, Clock } from 'lucide-react'
import { testimonials, deliveryCities } from '@/lib/data'
import Avatar from '@/components/Avatar'

const Testimonials = () => {
    return (
        <section className="py-24 bg-surface-2 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#F59E0B]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <p className="text-accent font-black text-xs uppercase tracking-[0.3em] mb-3">Client Success</p>
                    <h2 className="text-3xl md:text-5xl font-black text-fg font-heading">
                        Voice of <span className="text-accent">Trust</span>
                    </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((t, i) => (
                        <figure
                            key={i}
                            className="bg-white p-10 rounded-3xl border border-line hover:shadow-xl transition-all duration-300 relative group flex flex-col"
                        >
                            <Star className="w-10 h-10 text-accent/10 absolute top-8 right-8 group-hover:scale-110 transition-transform" />

                            <div className="flex gap-1 mb-6" aria-label={`${t.rating} out of 5 stars`}>
                                {[...Array(t.rating)].map((_, j) => (
                                    <Star key={j} className="w-4 h-4 fill-[#F59E0B] text-accent" />
                                ))}
                            </div>

                            <blockquote className="text-fg-muted italic mb-8 leading-relaxed text-[15px] flex-1">
                                &ldquo;{t.text}&rdquo;
                            </blockquote>

                            <figcaption className="pt-6 border-t border-line flex items-center gap-4">
                                <Avatar name={t.name} image={t.image} size={44} />
                                <div className="min-w-0">
                                    <p className="font-bold text-fg text-sm">{t.name}</p>
                                    <p className="text-xs text-fg-muted font-medium mt-0.5 truncate">{t.company}</p>
                                    {t.city && (
                                        <p className="text-[11px] text-fg-subtle font-bold uppercase tracking-wider mt-1 flex items-center gap-1">
                                            <MapPin className="w-3 h-3" /> {t.city}
                                            {t.state ? `, ${t.state}` : ''}
                                        </p>
                                    )}
                                </div>
                            </figcaption>
                        </figure>
                    ))}
                </div>

                {/* ── Delivery trust strip ──────────────────────────────────── */}
                <div className="mt-16 rounded-[2rem] border border-line bg-white p-8 md:p-10">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-12">
                        <div className="lg:w-[40%]">
                            <p className="text-accent font-black text-[11px] uppercase tracking-[0.25em] mb-3">
                                Dispatching Nationwide
                            </p>
                            <h3 className="text-2xl font-bold text-fg leading-snug">
                                Delivering laser-cut parts across India
                            </h3>
                            <p className="text-[15px] text-fg-muted mt-3 leading-relaxed">
                                Cut and fabricated in Chennai, packed to survive transit, and dispatched to
                                fabricators, OEMs and architects nationwide.
                            </p>
                        </div>

                        <div className="lg:flex-1">
                            <div className="flex flex-wrap gap-2.5">
                                {deliveryCities.map((city) => (
                                    <span
                                        key={city}
                                        className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface-2 px-4 py-2 text-[13px] font-semibold text-fg-muted"
                                    >
                                        <MapPin className="w-3.5 h-3.5 text-accent" />
                                        {city}
                                    </span>
                                ))}
                            </div>

                            <div className="mt-8 pt-6 border-t border-line grid sm:grid-cols-3 gap-6">
                                {[
                                    { Icon: ShieldCheck, label: 'Dimensional QC', sub: 'Checked before dispatch' },
                                    { Icon: Truck, label: 'Protected packing', sub: 'Edge-guarded crating' },
                                    { Icon: Clock, label: '24h quote', sub: 'Business-hours response' },
                                ].map(({ Icon, label, sub }) => (
                                    <div key={label} className="flex items-center gap-3">
                                        <span className="w-10 h-10 rounded-xl bg-[#F59E0B]/10 flex items-center justify-center flex-shrink-0">
                                            <Icon className="w-5 h-5 text-accent" />
                                        </span>
                                        <div>
                                            <p className="text-[13px] font-black text-fg uppercase tracking-wide">
                                                {label}
                                            </p>
                                            <p className="text-[12px] text-fg-subtle font-medium">{sub}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Testimonials;
