import Image from 'next/image'
import { MapPin, Star, Navigation, ExternalLink } from 'lucide-react'
import { GMB_URL, GMB_MAP_URL, GMB_REVIEW_URL, GMB_DIRECTIONS_URL } from '@/lib/data'
import GoogleRating from '@/components/GoogleRating'

/**
 * Google Business Profile block for landing pages.
 *
 * Links the page to the verified GBP listing.
 *
 * It now carries a rating badge and the profile QR. The original note here said
 * no rating should be shown, for two reasons — a hardcoded number goes stale,
 * and review markup risks a penalty. The second reason is fully respected:
 * components/GoogleRating.jsx renders the figure visually and emits NO
 * schema.org AggregateRating, which is the part Google actually penalises. The
 * first is mitigated, not solved — the number lives in one constant in that
 * file and has to be edited by hand if it moves.
 *
 * @param {string} [cityName] locality, used only to make the copy specific
 */
export default function GoogleBusinessCard({ cityName }) {
    const where = cityName ? `${cityName}, Chennai` : 'Chennai'

    return (
        <section className="py-16 bg-surface-2 border-t border-line">
            <div className="max-w-6xl mx-auto px-4">
                <div className="rounded-[2rem] border border-line bg-white p-8 md:p-10 flex flex-col lg:flex-row lg:items-center gap-8">
                    <div className="flex-1 min-w-0">
                        <p className="eyebrow mb-3">
                            Verified Business
                        </p>
                        <h2 className="subsection-title text-fg">
                            Find RG Tech Engineering on Google
                        </h2>
                        <p className="text-base text-fg-muted mt-3 leading-relaxed">
                            See our workshop location, opening hours, photos of recent work and
                            customer reviews on our Google Business Profile — serving {where}.
                        </p>
                        <p className="text-sm text-fg-subtle mt-4 flex items-start gap-2">
                            <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5 text-accent" />
                            Door No. 63, B&amp;C Flat, Galaxy Company Salai, Ponniamman Nagar,
                            Ayanambakkam, Chennai 600095
                        </p>
                        <div className="mt-5 pt-5 border-t border-line">
                            <GoogleRating />
                        </div>
                    </div>

                    {/* The QR is desktop-only: on a phone the reader is holding
                        the device that would have to scan it. The buttons carry
                        the same destination, so nothing needs the code. */}
                    <div className="hidden lg:block flex-none">
                        <div className="framed-soft bg-white p-2">
                            <Image
                                src="/google-review-qr.png"
                                alt="QR code linking to the RG Tech Engineering Works Google Business Profile"
                                width={1104}
                                height={1104}
                                // unoptimized on purpose. A QR is a bitmap of hard-edged
                                // modules; any resample or lossy re-encode softens those
                                // edges and costs scan reliability. It is also 14 KB, so
                                // there is nothing to gain. This also stops Next emitting
                                // an 11-entry srcset of the same URL.
                                unoptimized
                                className="w-[132px] h-[132px]"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 lg:w-[260px] flex-shrink-0">
                        <a
                            href={GMB_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary w-full"
                        >
                            View on Google <ExternalLink className="w-4 h-4" />
                        </a>
                        <a
                            href={GMB_DIRECTIONS_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-secondary-light w-full"
                        >
                            <Navigation className="w-4 h-4" /> Get Directions
                        </a>
                        <a
                            href={GMB_REVIEW_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 text-sm font-bold text-accent hover:underline py-1"
                        >
                            <Star className="w-4 h-4" /> Leave a review
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}
