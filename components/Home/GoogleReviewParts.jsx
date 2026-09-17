import { Star } from 'lucide-react'

/*
 * Pieces shared between the Google reviews section and its cards.
 *
 * Deliberately NOT marked 'use client', and deliberately not living in either
 * neighbouring file. GoogleReviews.jsx is a server component and
 * GoogleReviewCard.jsx is a client one, and both need these. A plain function
 * exported from a 'use client' module becomes a client reference when a server
 * component imports it — calling it during SSR then throws — so anything used
 * on both sides of the boundary has to sit outside it, as this does.
 *
 * Nothing here uses a hook or touches the DOM, so it renders in either place.
 */

/*
 * Google's Business Profile API reports ratings as an enum ("FIVE"), while the
 * Places API reports them as a number. Featurable passes through whichever its
 * upstream gave it, so both have to be handled or a five-star review renders as
 * zero stars.
 */
const STAR_WORDS = { ONE: 1, TWO: 2, THREE: 3, FOUR: 4, FIVE: 5 }

export function starsOf(starRating) {
    if (typeof starRating === 'number' && Number.isFinite(starRating)) {
        return Math.max(0, Math.min(5, Math.round(starRating)))
    }
    return STAR_WORDS[String(starRating).toUpperCase()] ?? 0
}

export function Stars({ count }) {
    return (
        <span className="inline-flex gap-1" aria-label={`${count} out of 5 stars`}>
            {Array.from({ length: 5 }, (_, i) => (
                <Star
                    key={i}
                    className={`w-4 h-4 ${i < count ? 'fill-[#F59E0B] text-accent' : 'text-line'}`}
                />
            ))}
        </span>
    )
}

/** Google's four-colour "G", matching the one in components/GoogleRating.jsx. */
export const GoogleG = ({ className }) => (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
        <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z" />
        <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z" />
        <path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24s.85 6.91 2.34 9.88l7.35-5.7z" />
        <path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z" />
    </svg>
)
