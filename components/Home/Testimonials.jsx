import { Star, MapPin, Truck, ShieldCheck, Clock } from 'lucide-react'
import { testimonials, deliveryCities } from '@/lib/data'
import Avatar from '@/components/Avatar'
import GoogleReviews from '@/components/Home/GoogleReviews'
import { getGoogleReviews } from '@/lib/googleReviews'

/*
 * "Voice of Trust" - live Google Business Profile reviews, with the hand-written
 * testimonials as the fallback.
 *
 * This is an async server component. lib/googleReviews.js reads an API
 * credential, so the fetch has to stay on the server; only the already-fetched
 * array crosses into components/Home/GoogleReviews.jsx, which is the client half.
 *
 * When no review source is configured - local dev, or a build without the
 * credential - getGoogleReviews() returns null and StaticTestimonials() renders
 * the lib/data.js copy instead. The section is never empty and a review-API
 * outage can never fail the build. See lib/googleReviews.js for the setup.
 *
 * The delivery trust strip below is shared by both paths.
 */

/** The pre-Google-reviews content, kept as the fallback. */
function StaticTestimonials() {
    return (
        <>
            <div className="text-center mb-16">
                <p className="eyebrow mb-3">Client Success</p>
                <h2 className="section-title text-fg">
                    Voice of <span className="text-accent">Trust</span>
                </h2>
            </div>

            <div className="swipe-row sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
                {testimonials.map((t, i) => (
                    <figure
                        key={i}
                        className="bg-white p-6 sm:p-10 rounded-3xl border border-line hover:shadow-xl transition-all duration-300 relative group flex flex-col"
                    >
                        <Star className="w-10 h-10 text-accent/10 absolute top-8 right-8 group-hover:scale-110 transition-transform" />

                        <div className="flex gap-1 mb-6" aria-label={`${t.rating} out of 5 stars`}>
                            {[...Array(t.rating)].map((_, j) => (
                                <Star key={j} className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" />
                            ))}
                        </div>

                        <blockquote className="text-fg-muted italic mb-8 leading-relaxed text-base flex-1">
                            &ldquo;{t.text}&rdquo;
                        </blockquote>

                        <figcaption className="pt-6 border-t border-line flex items-center gap-4">
                            <Avatar name={t.name} image={t.image} size={44} />
                            <div className="min-w-0">
                                <p className="font-bold text-fg text-sm">{t.name}</p>
                                <p className="text-xs text-fg-muted font-medium mt-0.5 truncate">{t.company}</p>
                                {t.city && (
                                    <p className="meta-label text-fg-subtle mt-1 flex items-center gap-1">
                                        <MapPin className="w-3 h-3" /> {t.city}
                                        {t.state ? `, ${t.state}` : ''}
                                    </p>
                                )}
                            </div>
                        </figcaption>
                    </figure>
                ))}
            </div>
        </>
    )
}

const Testimonials = async () => {
    const live = await getGoogleReviews()

    return (
        <section className="py-24 bg-surface-2 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 relative z-10">
                {live ? (
                    <GoogleReviews
                        reviews={live.reviews}
                        averageRating={live.averageRating}
                        totalReviewCount={live.totalReviewCount}
                        profileUrl={live.profileUrl}
                    />
                ) : (
                    <StaticTestimonials />
                )}

                {/* ── Delivery trust strip ──────────────────────────────────── */}
                {/*
                    A dark panel, not a white box on a white section. This is
                    the one block on the page whose job is to say "national
                    scale", and it was the least distinguishable thing in the
                    section -- a hairline border on the same surface as
                    everything around it.

                    .surface-dark and .on-dark are the design system's own
                    dark-band treatment, already used by the contact band and
                    footer, so this stays inside the existing palette: the
                    accent resolves to its on-dark green and the eyebrow and
                    lead follow automatically.
                */}
                <div className="on-dark surface-dark relative isolate overflow-hidden mt-16 sm:mt-20 rounded-2xl sm:rounded-3xl p-6 sm:p-10 lg:p-14 shadow-[0_30px_70px_-34px_rgba(13,11,43,0.6)]">
                    {/* Same 46px rhythm as the site's hero texture, inverted
                        to white for a dark ground. */}
                    <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0"
                        style={{
                            backgroundImage:
                                'linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)',
                            backgroundSize: '46px 46px',
                            WebkitMaskImage:
                                'radial-gradient(ellipse 75% 65% at 12% 15%, #000, transparent 72%)',
                            maskImage:
                                'radial-gradient(ellipse 75% 65% at 12% 15%, #000, transparent 72%)',
                        }}
                    />

                    <div className="relative z-10 flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-16">
                        <div className="lg:w-[38%]">
                            <p className="eyebrow mb-4 flex items-center gap-3">
                                <span
                                    aria-hidden="true"
                                    className="h-px w-8 flex-none bg-gradient-to-r from-accent-on-dark to-transparent"
                                />
                                Dispatching Nationwide
                            </p>
                            <h3 className="subsection-title text-[1.75rem] sm:text-[2rem] leading-[1.18] text-white text-balance">
                                Delivering laser-cut parts across India
                            </h3>
                            <p className="section-lead mt-5 max-w-[46ch]">
                                Cut and fabricated in Chennai, packed to survive transit, and dispatched to
                                fabricators, OEMs and architects nationwide.
                            </p>
                        </div>

                        <div className="lg:flex-1">
                            {/* Chips read as a served-cities map legend: glass
                                pills on the dark ground, each lifting on
                                hover. They were grey-on-white and the faintest
                                thing in a card about reach. */}
                            <div className="flex flex-wrap gap-2 sm:gap-2.5">
                                {deliveryCities.map((city) => (
                                    <span
                                        key={city}
                                        className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-3.5 sm:px-4 py-2.5 text-sm font-semibold text-fg-invert backdrop-blur-sm transition-[transform,background-color,border-color] duration-200 ease-out hover:-translate-y-0.5 hover:border-accent-on-dark/50 hover:bg-white/[0.14] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                                    >
                                        <MapPin className="w-3.5 h-3.5 flex-none text-accent" />
                                        {city}
                                    </span>
                                ))}
                            </div>

                            <span
                                aria-hidden="true"
                                className="mt-9 block h-px bg-gradient-to-r from-transparent via-white/25 to-transparent"
                            />

                            {/* Three equal capability blocks. Bare icon-and-text
                                rows sharing one gutter read as a single run-on
                                line; these read as three claims. */}
                            <div className="mt-7 grid gap-2.5 sm:grid-cols-3 sm:gap-4">
                                {[
                                    { Icon: ShieldCheck, label: 'Dimensional QC', sub: 'Checked before dispatch' },
                                    { Icon: Truck, label: 'Protected packing', sub: 'Edge-guarded crating' },
                                    { Icon: Clock, label: '24h quote', sub: 'Business-hours response' },
                                ].map(({ Icon, label, sub }) => (
                                    <div
                                        key={label}
                                        className="flex flex-row sm:flex-col items-center sm:items-start gap-3.5 sm:gap-3.5 rounded-2xl border border-white/10 bg-white/[0.05] p-3.5 sm:p-4"
                                    >
                                        <span className="w-12 h-12 rounded-xl border border-accent-on-dark/25 bg-accent-on-dark/10 flex items-center justify-center flex-shrink-0">
                                            <Icon className="w-5 h-5 text-accent" strokeWidth={1.75} />
                                        </span>
                                        <div className="min-w-0">
                                            <p className="meta-label text-white whitespace-nowrap">
                                                {label}
                                            </p>
                                            <p className="text-xs text-fg-invert-muted font-medium mt-1 leading-snug">{sub}</p>
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
