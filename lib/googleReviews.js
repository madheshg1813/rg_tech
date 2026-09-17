import { GMB_PLACE_ID, GMB_URL } from '@/lib/data'

/*
 * Live Google Business Profile reviews.
 *
 * SERVER ONLY. Both code paths read an API credential out of the environment,
 * so nothing here may be imported from a 'use client' module. The rendering
 * half lives in components/Home/GoogleReviews.jsx, which receives the already
 * fetched array as a prop.
 *
 * ---------------------------------------------------------------------------
 * Two sources, tried in this order:
 *
 *   1. FEATURABLE_WIDGET_ID — featurable.com's free review-cache API. Returns
 *      the full review history plus the real total count and average, and is
 *      the route react-google-reviews is built around. Preferred. Two API
 *      versions are tried, v2 first — see the endpoint constants below.
 *
 *   2. GOOGLE_PLACES_API_KEY — the Google Places API. Works with nothing but a
 *      Google Cloud key, but Places hard-caps the response at the FIVE most
 *      recent reviews.
 *
 * With neither set, getGoogleReviews() returns null and the caller falls back
 * to the hand-written testimonials in lib/data.js. That is the deliberate
 * behaviour for local dev and for any build where the credential is missing:
 * the section still renders, it just renders the old copy.
 * ---------------------------------------------------------------------------
 *
 * Why the HTTP calls are hand-rolled instead of using the library's own
 * dangerouslyFetchPlaceReviews() helper:
 *
 *   react-google-reviews cannot be imported into a server module at all. Its
 *   entry point pulls in @emotion/react, which calls React.createContext at
 *   module scope; under the `react-server` export condition React does not
 *   export createContext, so merely importing the package from a server
 *   component fails the build with "$.createContext is not a function". The
 *   package is a client-side library and is used as one — components/Home/
 *   GoogleReviews.jsx imports <ReactGoogleReviews> behind 'use client'.
 *
 *   The two requests below are a query string each, and the response mapping
 *   matches what that helper produces, so nothing is lost. Requesting `rating`
 *   and `user_ratings_total` alongside the reviews actually gains something the
 *   helper discards: the real aggregate figures on the Places path too.
 *
 * Caching. Neither path sets its own cache headers — freshness is owned by the
 * page's `revalidate` (see app/page.js). The homepage is statically generated,
 * so these functions run at build time and again once per revalidation window,
 * not per visitor. Nothing here is on the request path.
 */

/*
 * Featurable's v1 widget endpoint, the shape this library's types describe.
 *
 * FEATURABLE_API_BASE_URL overrides the host, mirroring the library's own
 * `apiBaseUrl` prop. Unset in production; it exists so the live path can be
 * pointed at a local mock and verified without burning a real widget quota.
 */
const featurableEndpoint = () => {
    const base = (process.env.FEATURABLE_API_BASE_URL || 'https://api.featurable.com')
        .replace(/\/+$/, '')
    return `${base}/v1/widgets`
}

/*
 * Featurable's current public endpoint, and a different host and shape to v1.
 *
 * v1 (api.featurable.com) answers `widget_not_found` for widgets created in the
 * current editor, so v2 is tried first and v1 kept as the fallback for any
 * widget old enough to still be served there.
 *
 * The payloads are not compatible. v1 returns reviews at the top level already
 * in the shape the cards want; v2 nests everything under `widget` and renames
 * every field — author.name, text, rating.value, publishedAt — with the real
 * totals in `gbpLocationSummary`. normaliseV2Review() below is what bridges it.
 */
const FEATURABLE_V2_ENDPOINT = 'https://featurable.com/api/v2/widgets'

function normaliseV2Review(review) {
    const iso = review.publishedAt || review.createdAt || null

    return {
        reviewId: review.id || null,
        reviewer: {
            isAnonymous: !review.author?.name,
            displayName: review.author?.name || 'Anonymous',
            profilePhotoUrl: review.author?.avatarUrl || '',
        },
        starRating: review.rating?.value || 0,
        comment: review.text || review.originalText || '',
        createTime: iso,
        updateTime: review.updatedAt || iso,
    }
}

async function fromFeaturableV2(widgetId) {
    let payload
    try {
        const res = await fetch(`${FEATURABLE_V2_ENDPOINT}/${widgetId}`, {
            headers: { Accept: 'application/json' },
        })
        if (!res.ok) return giveUp('featurable v2', `HTTP ${res.status}`)
        payload = await res.json()
    } catch (err) {
        return giveUp('featurable v2', err.message)
    }

    // Like Places, failure arrives as a 200 with success:false in the body.
    if (!payload?.success) {
        return giveUp('featurable v2', payload?.error?.message || 'API reported success: false')
    }

    const widget = payload.widget
    if (!Array.isArray(widget?.reviews)) return giveUp('featurable v2', 'no reviews array in response')

    /*
     * isExampleReviews is Featurable's own flag for a widget that has not been
     * connected to a real profile yet and is showing placeholder content.
     * Publishing those as customer reviews would be a fabrication, so treat it
     * as a failure and let the static testimonials show instead.
     */
    if (widget.isExampleReviews) {
        return giveUp('featurable v2', 'widget is still showing Featurable example reviews')
    }

    const summary = widget.gbpLocationSummary || {}
    const reviews = widget.reviews.map(normaliseV2Review)
    if (reviews.length === 0) return giveUp('featurable v2', 'no reviews returned')

    return {
        reviews,
        // The summary counts every review on the profile, which is higher than
        // the number the widget returns — that is the honest figure for the
        // "from N Google reviews" line.
        totalReviewCount: summary.reviewsCount ?? null,
        averageRating: summary.rating ?? null,
        profileUrl: GMB_URL,
        source: 'featurable-v2',
    }
}

const PLACES_ENDPOINT = 'https://maps.googleapis.com/maps/api/place/details/json'

/*
 * Reviews are fetched during static generation, so a failure here must never
 * fail the build — a missing reviews section is recoverable, a broken deploy is
 * not. Everything below funnels through this: log loudly, return null, let the
 * caller fall back.
 */
function giveUp(source, reason) {
    console.warn(`[googleReviews] ${source}: ${reason} — falling back to static testimonials.`)
    return null
}

async function fromFeaturable(widgetId) {
    let payload
    try {
        const res = await fetch(`${featurableEndpoint()}/${widgetId}`, {
            headers: { Accept: 'application/json' },
        })
        if (!res.ok) return giveUp('featurable', `HTTP ${res.status}`)
        payload = await res.json()
    } catch (err) {
        return giveUp('featurable', err.message)
    }

    if (!payload?.success) return giveUp('featurable', 'API reported success: false')
    if (!Array.isArray(payload.reviews)) return giveUp('featurable', 'no reviews array in response')

    return {
        reviews: payload.reviews,
        totalReviewCount: payload.totalReviewCount ?? null,
        averageRating: payload.averageRating ?? null,
        profileUrl: payload.profileUrl || GMB_URL,
        source: 'featurable',
    }
}

/**
 * Places returns its own review shape. This maps it to the GoogleReview shape
 * <ReactGoogleReviews> expects, identically to the library's helper.
 */
function normalisePlacesReview(review) {
    const iso = review.time ? new Date(review.time * 1000).toISOString() : null

    return {
        reviewId: review.review_id || null,
        reviewer: {
            isAnonymous: !review.author_name,
            displayName: review.author_name || 'Anonymous',
            profilePhotoUrl: review.profile_photo_url || '',
        },
        starRating: review.rating || 0,
        comment: review.text || '',
        createTime: iso,
        updateTime: iso,
    }
}

async function fromPlaces(apiKey) {
    const query = new URLSearchParams({
        place_id: GMB_PLACE_ID,
        // rating and user_ratings_total are what make the aggregate line in the
        // section header real rather than derived from the five reviews on hand.
        fields: 'reviews,rating,user_ratings_total',
        key: apiKey,
    })

    let payload
    try {
        const res = await fetch(`${PLACES_ENDPOINT}?${query}`, {
            headers: { Accept: 'application/json' },
        })
        if (!res.ok) return giveUp('places', `HTTP ${res.status}`)
        payload = await res.json()
    } catch (err) {
        return giveUp('places', err.message)
    }

    // Places signals failure in the body with a 200, so the status is not enough.
    if (payload.status !== 'OK') {
        return giveUp('places', payload.error_message || payload.status || 'unknown error')
    }

    const reviews = (payload.result?.reviews || []).map(normalisePlacesReview)
    if (reviews.length === 0) return giveUp('places', 'no reviews returned')

    return {
        reviews,
        totalReviewCount: payload.result?.user_ratings_total ?? null,
        averageRating: payload.result?.rating ?? null,
        profileUrl: GMB_URL,
        source: 'places',
    }
}

/**
 * Reviews for the Google Business Profile in lib/data.js, newest first.
 *
 * @returns {Promise<{
 *   reviews: object[],
 *   totalReviewCount: number | null,
 *   averageRating: number | null,
 *   profileUrl: string,
 *   source: 'featurable-v2' | 'featurable' | 'places',
 * } | null>} null when no source is configured or every source failed.
 */
export async function getGoogleReviews() {
    const widgetId = process.env.FEATURABLE_WIDGET_ID
    const placesKey = process.env.GOOGLE_PLACES_API_KEY

    if (widgetId) {
        const v2 = await fromFeaturableV2(widgetId)
        if (v2) return withOnlyUsableReviews(v2)

        const featurable = await fromFeaturable(widgetId)
        if (featurable) return withOnlyUsableReviews(featurable)
    }

    if (placesKey) {
        const places = await fromPlaces(placesKey)
        if (places) return withOnlyUsableReviews(places)
    }

    return null
}

/*
 * A Google review can be a bare star rating with no words. Those are real and
 * they count toward the average, but as a card they are an empty quote, so they
 * are dropped from what gets rendered while the aggregate figures — which come
 * from Google, not from this array — stay untouched.
 *
 * Sorted newest first so the section leads with current work.
 */
function withOnlyUsableReviews(payload) {
    const reviews = payload.reviews
        .filter((r) => typeof r?.comment === 'string' && r.comment.trim().length > 0)
        .sort((a, b) => new Date(b.createTime ?? 0) - new Date(a.createTime ?? 0))

    if (reviews.length === 0) return giveUp(payload.source, 'every review was ratings-only')

    return { ...payload, reviews }
}
