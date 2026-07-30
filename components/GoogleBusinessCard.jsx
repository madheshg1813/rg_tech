import { MapPin, Star, Navigation, ExternalLink } from 'lucide-react'
import { GMB_URL, GMB_MAP_URL, GMB_REVIEW_URL, GMB_DIRECTIONS_URL } from '@/lib/data'

/**
 * Google Business Profile block for landing pages.
 *
 * Links the page to the verified GBP listing. Deliberately shows no star rating
 * or review count — those change constantly, and hardcoding them would put a
 * stale number on the page and risk a fake-review-markup penalty. Google renders
 * the live rating on the listing itself.
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
