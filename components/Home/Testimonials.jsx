import { Star, MapPin, Truck, ShieldCheck, Clock } from 'lucide-react'
import { testimonials, deliveryCities } from '@/lib/data'
import Avatar from '@/components/Avatar'

/*
 * Testimonials — playbook corrections.
 *
 *   no decorative blobs      the 256px blue radial blur behind the heading, and
 *                            the oversized watermark star that scaled on hover
 *                            inside every card, are both gone
 *   no icon tiles            the three delivery guarantees had blue-tinted
 *                            rounded tiles; they are bare outline icons now
 *   swipe row on phones      these are the playbook's "tall showcase cards", so
 *                            on a phone they become a horizontal rail at 86%
 *                            width with the next card peeking, instead of three
 *                            full-height cards stacked vertically
 *   one card shell           .card rather than a bespoke rounded-3xl
 *
 * The stars keep their amber fill but lose the green stroke they were given —
 * a star outlined in the accent colour and filled in amber read as two marks
 * fighting for the same shape.
 */
const Testimonials = () => {
    return (
        <section className="section bg-surface-2">
            <div className="shell">
                <div className="mb-10 text-center sm:mb-14">
                    <p className="eyebrow-text">Client Success</p>
                    <h2 className="h2 mt-2">
                        Voice of <span className="text-accent">Trust</span>
                    </h2>
                </div>

                <div className="swipe-row sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
                    {testimonials.map((t, i) => (
                        <figure key={i} className="card flex flex-col p-5 sm:p-8">
                            <div className="mb-5 flex gap-1" aria-label={`${t.rating} out of 5 stars`}>
                                {[...Array(t.rating)].map((_, j) => (
                                    <Star key={j} className="h-4 w-4 fill-[#F59E0B] text-[#F59E0B]" />
                                ))}
                            </div>

                            <blockquote className="mb-6 flex-1 text-sm leading-relaxed text-fg-muted sm:text-base">
                                &ldquo;{t.text}&rdquo;
                            </blockquote>

                            <figcaption className="flex items-center gap-4 border-t border-line pt-5">
                                <Avatar name={t.name} image={t.image} size={44} />
                                <div className="min-w-0">
                                    <p className="text-sm font-bold text-fg">{t.name}</p>
                                    <p className="mt-0.5 truncate text-xs font-medium text-fg-muted">{t.company}</p>
                                    {t.city && (
                                        <p className="meta-label mt-1 flex items-center gap-1 text-fg-subtle">
                                            <MapPin className="h-3 w-3" /> {t.city}
                                            {t.state ? `, ${t.state}` : ''}
                                        </p>
                                    )}
                                </div>
                            </figcaption>
                        </figure>
                    ))}
                </div>

                {/* ── Delivery trust strip ──────────────────────────────────── */}
                <div className="card mt-10 p-5 sm:mt-14 sm:p-9">
                    <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-12">
                        <div className="lg:w-[40%]">
                            <p className="eyebrow-text">Dispatching Nationwide</p>
                            <h3 className="subsection-title mt-2 text-fg">
                                Delivering laser-cut parts across India
                            </h3>
                            <p className="mt-3 text-sm leading-relaxed text-fg-muted sm:text-base">
                                Cut and fabricated in Chennai, packed to survive transit, and dispatched to
                                fabricators, OEMs and architects nationwide.
                            </p>
                        </div>

                        <div className="lg:flex-1">
                            <div className="flex flex-wrap gap-2">
                                {deliveryCities.map((city) => (
                                    <span
                                        key={city}
                                        className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface-2 px-3 py-1.5 text-xs font-semibold text-fg-muted sm:px-4 sm:py-2 sm:text-sm"
                                    >
                                        <MapPin className="h-3.5 w-3.5 text-accent" />
                                        {city}
                                    </span>
                                ))}
                            </div>

                            <div className="mt-7 grid gap-5 border-t border-line pt-6 sm:grid-cols-3">
                                {[
                                    { Icon: ShieldCheck, label: 'Dimensional QC', sub: 'Checked before dispatch' },
                                    { Icon: Truck, label: 'Protected packing', sub: 'Edge-guarded crating' },
                                    { Icon: Clock, label: '24h quote', sub: 'Business-hours response' },
                                ].map(({ Icon, label, sub }) => (
                                    <div key={label} className="flex items-center gap-3">
                                        <Icon
                                            className="h-5 w-5 flex-none text-fg"
                                            strokeWidth={1.6}
                                            aria-hidden="true"
                                        />
                                        <div>
                                            <p className="meta-label text-fg">{label}</p>
                                            <p className="text-xs font-medium text-fg-subtle">{sub}</p>
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
