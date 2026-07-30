import Link from 'next/link'
import { MapPin } from 'lucide-react'
import { serviceUrl, publishedLocalities } from '@/lib/cities'

/**
 * "Serving All Areas in {city.name}" — the locality mesh for a service.
 *
 * Rendered on the pillar page and on every locality page for that service, so
 * each cluster page links to its siblings and back to the pillar.
 *
 * The current page's own locality stays in the list rather than being removed:
 * dropping it would make the grid shift position from page to page, and a
 * visitor who lands on the Porur page should still see Porur and know they are
 * in the right place. It renders as a non-link marked aria-current, because a
 * link pointing at the page you are already on is noise for both users and
 * crawlers.
 *
 * @param {object}  city         city config from lib/cities
 * @param {string}  serviceName  e.g. 'Steel Gates'
 * @param {string}  serviceKey   e.g. 'steel-gates'
 * @param {string} [cityName]    current locality, undefined on the pillar page
 */
export default function ServiceAreas({ city, serviceName, serviceKey, cityName }) {
    if (!city) return null
    const current = cityName ? cityName.toLowerCase() : null
    const pillarHref = serviceUrl(city.slug, serviceKey)

    // Only areas with a live page. Linking to an unreleased locality would send
    // users and crawlers to a 404.
    const areas = publishedLocalities(city.slug)
    if (!areas.length) return null

    return (
        <section className="py-20 bg-white border-t border-line">
            <div className="max-w-6xl mx-auto px-4">
                <div className="text-center mb-12">
                    <p className="eyebrow mb-3">
                        Areas We Cover
                    </p>
                    <h2 className="section-title text-fg">
                        Serving All Areas in {city.name}
                    </h2>
                    <p className="section-lead mt-4 max-w-2xl mx-auto">
                        {serviceName} delivered across {city.name} and the surrounding industrial belt.
                        Pick your locality for details and local turnaround times.
                    </p>
                </div>

                <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    {areas.map((locality) => {
                        const isCurrent = current === locality.toLowerCase()

                        if (isCurrent) {
                            return (
                                <li key={locality}>
                                    <span
                                        aria-current="page"
                                        className="flex items-center justify-center gap-1.5 text-center rounded-xl border-2 border-cta bg-cta/10 px-4 py-3 text-sm font-bold text-fg"
                                    >
                                        <MapPin className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                                        {locality}
                                    </span>
                                </li>
                            )
                        }

                        return (
                            <li key={locality}>
                                <Link
                                    href={serviceUrl(city.slug, serviceKey, locality)}
                                    className="block text-center rounded-xl border border-line bg-surface-2 px-4 py-3 text-sm font-medium text-fg-muted hover:bg-white hover:border-cta hover:text-fg transition-colors"
                                >
                                    {locality}
                                </Link>
                            </li>
                        )
                    })}
                </ul>

                {cityName && (
                    <div className="text-center mt-10">
                        <Link
                            href={pillarHref}
                            className="text-accent font-bold text-sm hover:underline"
                        >
                            ← Back to {serviceName} in {city.name}
                        </Link>
                    </div>
                )}
            </div>
        </section>
    )
}
