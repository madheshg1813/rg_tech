'use client'

import { useState } from 'react'
import Avatar from '@/components/Avatar'
import { Stars, GoogleG, starsOf } from '@/components/Home/GoogleReviewParts'

/*
 * One Google review, as a card in the site's own style.
 *
 * A client component, but only for the Read more toggle — the markup below
 * still server-renders in full, which is the whole point (see the note in
 * components/Home/GoogleReviews.jsx about why the library's own renderer is
 * not used). Nothing here reads the DOM or runs an effect, so the collapsed
 * card is complete in the initial HTML and hydration only attaches the button.
 */

/*
 * Roughly the length at which a review overflows six clamped lines. Only used
 * to decide whether the toggle is worth showing — the clamp itself is CSS, so
 * being a little out either way costs nothing but a redundant button.
 */
const LIKELY_CLAMPED_OVER = 260

/*
 * Dates are formatted from a fixed table rather than toLocaleDateString or
 * Intl.RelativeTimeFormat. This component is hydrated inside a statically
 * generated page: the server renders it at build time and the browser rehydrates
 * it whenever someone visits. A relative date ("2 months ago") is computed from
 * `now` and would differ between those two moments, which React reports as a
 * hydration mismatch. An absolute month is the same string in both.
 */
const MONTHS = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
]

function monthYear(iso) {
    if (!iso) return null
    const date = new Date(iso)
    if (Number.isNaN(date.getTime())) return null
    return `${MONTHS[date.getUTCMonth()]} ${date.getUTCFullYear()}`
}

export default function GoogleReviewCard({ review }) {
    const [expanded, setExpanded] = useState(false)

    const comment = review.comment.trim()

    /*
     * The full comment is always in the DOM and truncation is done with a CSS
     * line clamp, rather than by slicing the string. Two reasons: a crawler (and
     * a visitor with JS off) gets the complete review either way, and clamping
     * by line instead of by character keeps the cards the same height.
     */
    const mayOverflow = comment.length > LIKELY_CLAMPED_OVER

    /*
     * Reviewer photos are served from Google's own CDN. They are skipped in
     * favour of the initials avatar the rest of the site uses: it keeps the
     * cards visually consistent, avoids a third-party image host in
     * next.config.js (which the Cloudinary loader in lib/cloudinaryLoader.js
     * would then have to be taught to pass through), and leaves no
     * Google-hosted asset tracking the visitor.
     */
    const name = review.reviewer?.isAnonymous
        ? 'Google user'
        : review.reviewer?.displayName || 'Google user'
    const posted = monthYear(review.createTime)

    return (
        <figure className="h-full bg-white p-6 sm:p-7 rounded-2xl border border-line hover:shadow-xl transition-all duration-300 group flex flex-col">
            <div className="mb-4">
                <Stars count={starsOf(review.starRating)} />
            </div>

            <blockquote className="mb-6 flex-1">
                {/*
                    Plain, not italic and not in quote marks. These are somebody
                    else's words shown verbatim under a Google mark — setting
                    them in quoted italics styles them as a pull-quote we chose,
                    which is exactly the impression a review section should not
                    give. It also costs legibility at six clamped lines.
                */}
                <p
                    className={`text-fg-muted leading-relaxed text-[0.9375rem] ${
                        expanded ? '' : 'line-clamp-6'
                    }`}
                >
                    {comment}
                </p>
                {mayOverflow && (
                    <button
                        type="button"
                        onClick={() => setExpanded((v) => !v)}
                        aria-expanded={expanded}
                        className="mt-3 text-sm font-bold text-accent hover:underline"
                    >
                        {expanded ? 'Read less' : 'Read more'}
                    </button>
                )}
            </blockquote>

            {/*
                The Google mark sits on the attribution row rather than in the
                top corner: it is a statement about where the name and date came
                from, so it belongs beside them. In the corner it read as a
                decorative badge on the card as a whole.
            */}
            <figcaption className="pt-5 border-t border-line flex items-center gap-3">
                <Avatar name={name} image={null} size={40} />
                <div className="min-w-0 flex-1">
                    <p className="font-bold text-fg text-sm truncate">{name}</p>
                    {posted && (
                        <p className="text-xs text-fg-subtle mt-0.5">{posted}</p>
                    )}
                </div>
                <GoogleG
                    className="w-4 h-4 flex-none opacity-60 group-hover:opacity-100 transition-opacity"
                    aria-label="Posted on Google"
                />
            </figcaption>
        </figure>
    )
}
