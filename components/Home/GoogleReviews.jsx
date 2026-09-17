import { Star, ExternalLink } from 'lucide-react'
import { GMB_REVIEW_URL } from '@/lib/data'
import GoogleReviewCard from '@/components/Home/GoogleReviewCard'
import ReviewScroller from '@/components/Home/ReviewScroller'
import { Stars, GoogleG, starsOf } from '@/components/Home/GoogleReviewParts'

/*
 * Live Google reviews, in the site's own card style.
 *
 * A server component: the review text is in the HTML that leaves the server.
 *
 * ---------------------------------------------------------------------------
 * Why react-google-reviews' <ReactGoogleReviews> is not used to render this.
 *
 * The library was the starting point here and lib/googleReviews.js still
 * follows its data contract exactly — the GoogleReview shape its `renderer`
 * receives, and the same Places-response mapping its dangerouslyFetchPlaceReviews
 * helper performs. What it cannot do is render on the server, in two ways:
 *
 *   1. Importing the package from a server module fails outright. Its entry
 *      point pulls in @emotion/react, which calls React.createContext at module
 *      scope; the `react-server` condition does not export createContext, so the
 *      build dies with "$.createContext is not a function".
 *
 *   2. Even behind 'use client' it renders nothing on the server. Passing
 *      `reviews` as a prop does not render them — the component copies the prop
 *      into internal state inside a useEffect, and effects do not run during
 *      SSR, so its `renderer` is called with an empty array and the prerendered
 *      HTML contains no reviews at all. They appear only after hydration.
 *
 * For a trust section on a page that is otherwise fully prerendered, that means
 * reviews invisible to crawlers and a block of content shifting in after paint,
 * in exchange for ~37 KB gzipped of carousel and CSS-in-JS that this layout does
 * not use. So the cards are rendered directly instead.
 *
 * If the stock Google-branded widget is ever wanted instead, the library does
 * that well — `layout="carousel"` or `"badge"` with its dist/index.css, wrapped
 * in a client component, accepting that it paints after hydration.
 * ---------------------------------------------------------------------------
 *
 * On structured data: the library can emit schema.org AggregateRating from these
 * reviews, and this deliberately does not — see the long note in
 * components/GoogleRating.jsx. Self-serving review markup on your own domain is
 * the thing Google penalises; showing the figures and linking to the live
 * listing is not.
 */

/**
 * @param {object[]} reviews GoogleReview-shaped, newest first.
 * @param {number|null} averageRating Google's own average, when the source knows it.
 * @param {number|null} totalReviewCount Google's own total, when the source knows it.
 * @param {string} profileUrl the Business Profile to send readers to.
 */
export default function GoogleReviews({
    reviews,
    averageRating,
    totalReviewCount,
    profileUrl,
}) {
    /*
     * Both sources normally report Google's own average. Where one does not, it
     * is derived from the reviews on hand. The label is the same either way,
     * which stays accurate: both are an average of real Google ratings.
     */
    const average =
        averageRating ??
        (reviews.length
            ? reviews.reduce((sum, r) => sum + starsOf(r.starRating), 0) / reviews.length
            : null)

    const count = totalReviewCount ?? reviews.length

    return (
        <>
            <div className="text-center mb-16">
                <p className="eyebrow mb-3">Client Success</p>
                <h2 className="section-title text-fg">
                    Voice of <span className="text-accent">Trust</span>
                </h2>

                {average !== null && (
                    <a
                        href={profileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Rated ${average.toFixed(1)} out of 5 from ${count} Google reviews — open our Google Business Profile`}
                        data-analytics="google-reviews-header"
                        className="group mt-6 inline-flex items-center gap-3 rounded-full border border-line bg-white px-5 py-2.5"
                    >
                        <GoogleG className="w-5 h-5 flex-none" />
                        <span className="font-heading font-extrabold text-[0.95rem] leading-none tracking-[-0.02em] text-fg">
                            {average.toFixed(1)}
                        </span>
                        <Stars count={Math.round(average)} />
                        <span className="meta-label text-fg-subtle group-hover:underline">
                            from {count} Google review{count === 1 ? '' : 's'}
                        </span>
                    </a>
                )}
            </div>

            {/*
                One row, scrolled sideways — not a grid that wraps to a second.
                Three cards at a time is the readable number on a desktop, and
                every review the widget returns is reachable by scrolling rather
                than being cut off at six.

                Widths are calc rather than percentages so the gap is subtracted
                exactly: three cards plus two 1.5rem gaps come to 100%, with no
                rounding drift that would leave a sliver of a fourth card.

                min-w-0 is load-bearing. These are flex items, so they default to
                min-width:auto and a long unbroken word in a review would push
                the card wider than its calc width.
            */}
            <ReviewScroller label={`${count} Google reviews for RG Tech Engineering Works`}>
                {reviews.map((review, i) => (
                    <div
                        key={review.reviewId ?? i}
                        className="shrink-0 min-w-0 snap-start w-[85%] sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)]"
                    >
                        <GoogleReviewCard review={review} />
                    </div>
                ))}
            </ReviewScroller>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
                <a
                    href={profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-bold text-accent hover:underline"
                >
                    Read all reviews on Google <ExternalLink className="w-4 h-4" />
                </a>
                <a
                    href={GMB_REVIEW_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-bold text-fg-muted hover:text-accent hover:underline"
                >
                    <Star className="w-4 h-4" /> Leave a review
                </a>
            </div>
        </>
    )
}
