import { GMB_URL } from '@/lib/data'

/*
 * Google rating badge.
 *
 * Drawn as inline SVG rather than shipped as the PNG, so it stays crisp at any
 * size, costs no request, and sits on the page at exactly the weight the rest
 * of the type is set in.
 *
 * ---------------------------------------------------------------------------
 * IMPORTANT — this is a visual claim only, deliberately NOT schema markup.
 *
 * components/GoogleBusinessCard.jsx notes that the site shows no hardcoded
 * rating, to avoid a stale number and a fake-review-markup penalty. Half of
 * that reasoning still holds and is handled here:
 *
 *   - The number lives in ONE constant (RATING/REVIEW_COUNT below) so it is a
 *     one-line edit when it moves, not a hunt through markup.
 *   - It is NOT emitted as schema.org AggregateRating. Self-serving review
 *     markup on your own domain is the thing Google actually penalises;
 *     displaying the figure and linking to the live listing is not.
 *
 * The rating is still a manually-kept number. If it slips below 5.0 and nobody
 * edits this file, the page is wrong — that is the accepted trade.
 * ---------------------------------------------------------------------------
 */

const RATING = '5.0'
// Set to a number to render "· N reviews"; null hides the count entirely.
// Left null because an out-of-date count is more obviously wrong than a
// slow-moving average, and it grows every week.
const REVIEW_COUNT = null

/** Google's four-colour "G". Used to identify the source of the rating. */
const GoogleG = ({ className }) => (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
        <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z" />
        <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z" />
        <path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24s.85 6.91 2.34 9.88l7.35-5.7z" />
        <path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z" />
    </svg>
)

const Star = ({ className }) => (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
        <path d="M12 2.5l2.9 5.88 6.49.94-4.7 4.58 1.11 6.46L12 17.31l-5.8 3.05 1.11-6.46-4.7-4.58 6.49-.94L12 2.5z" />
    </svg>
)

/**
 * @param {'inline'|'stacked'} [variant] inline sits in a row of credentials;
 *   stacked gives the rating its own line above the stars.
 * @param {boolean} [onDark] flips the label colours for dark bands.
 */
export default function GoogleRating({ variant = 'inline', onDark = false, className = '' }) {
    const label = `Rated ${RATING} out of 5 on Google${REVIEW_COUNT ? ` from ${REVIEW_COUNT} reviews` : ''}`

    return (
        <a
            href={GMB_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${label} — open our Google Business Profile`}
            data-analytics="google-rating"
            className={`group inline-flex items-center gap-2.5 ${className}`}
        >
            <GoogleG className="w-5 h-5 flex-none" />

            <span className={variant === 'stacked' ? 'flex flex-col' : 'inline-flex items-center gap-2'}>
                <span className="inline-flex items-center gap-1.5">
                    <span className={`font-heading font-extrabold text-[0.95rem] leading-none tracking-[-0.02em] ${onDark ? 'text-white' : 'text-fg'}`}>
                        {RATING}
                    </span>
                    <span className="inline-flex gap-0.5 text-[#FBBC05]" aria-hidden="true">
                        {Array.from({ length: 5 }, (_, i) => <Star key={i} className="w-3.5 h-3.5" />)}
                    </span>
                </span>
                <span className={`meta-label ${variant === 'stacked' ? 'mt-1' : ''} ${onDark ? 'text-fg-invert-muted' : 'text-fg-subtle'} group-hover:underline`}>
                    Google Reviews
                    {REVIEW_COUNT ? ` · ${REVIEW_COUNT}` : ''}
                </span>
            </span>
        </a>
    )
}
