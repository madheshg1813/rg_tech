/*
 * Which blog guides to surface on which service pillar.
 *
 * Hand-mapped rather than "latest three" or a tag match: with only nine
 * articles, an automatic rule would put the same recent posts on all six
 * pillars, and a page about steel gates would recommend a waterjet comparison.
 * Each pick below answers a question a visitor to THAT service actually has.
 *
 * Keyed by the service key (the last segment of the pillar URL), which is what
 * serviceKeyOf() in lib/cities.js returns.
 *
 * Slugs are validated at render time — see pickArticles. A slug that no longer
 * exists in Sanity is dropped rather than rendered as a dead card, and the gap
 * is backfilled from the newest remaining posts, so a renamed or unpublished
 * article can never leave a pillar with two cards or a broken link.
 */

export const ARTICLES_BY_SERVICE = {
    // The general pillar: what it is, how it runs, what it costs.
    'laser-cutting-services': [
        'what-is-cnc-fiber-laser-cutting',
        'how-cnc-laser-cutting-works',
        'laser-cutting-cost-guide',
    ],

    // Sheet work is where file quality and tolerance decide the outcome.
    'sheet-metal-laser-cutting-services': [
        'dxf-file-preparation-for-laser-cutting',
        'laser-cutting-tolerances-explained',
        'materials-that-can-be-laser-cut',
    ],

    // Fabrication buyers are choosing a process before they choose a supplier.
    'fabrication-services': [
        'laser-cutting-vs-plasma-cutting',
        'laser-cutting-vs-waterjet-cutting',
        'laser-cutting-cost-guide',
    ],

    // Gates live outdoors, so grade selection is the question that matters.
    'steel-gates': [
        'stainless-steel-grades-304-vs-316-vs-430',
        'materials-that-can-be-laser-cut',
        'laser-cutting-cost-guide',
    ],

    // A door has to fit an opening, so tolerance sits next to grade here.
    'metal-safety-doors': [
        'stainless-steel-grades-304-vs-316-vs-430',
        'laser-cutting-tolerances-explained',
        'materials-that-can-be-laser-cut',
    ],

    // Decorative work starts as artwork someone sends us, and dense patterns
    // are what drive the price up.
    'decorative-metal-panels': [
        'dxf-file-preparation-for-laser-cutting',
        'materials-that-can-be-laser-cut',
        'laser-cutting-cost-guide',
    ],
}

export const ARTICLE_COUNT = 3

/**
 * Resolve a service's recommended articles against the posts that actually
 * exist right now.
 *
 * @param {string} serviceKey  last segment of the pillar URL
 * @param {Array}  posts       everything from getPosts(), newest first
 * @returns {Array} up to ARTICLE_COUNT posts, in the curated order
 */
export function pickArticles(serviceKey, posts = []) {
    if (!Array.isArray(posts) || posts.length === 0) return []

    const bySlug = new Map(posts.filter((p) => p?.slug).map((p) => [p.slug, p]))
    const wanted = ARTICLES_BY_SERVICE[serviceKey] || []

    const picked = wanted.map((slug) => bySlug.get(slug)).filter(Boolean)

    // Backfill from the newest posts not already shown, so the row is always
    // full even if a curated slug has been unpublished or renamed.
    if (picked.length < ARTICLE_COUNT) {
        const taken = new Set(picked.map((p) => p.slug))
        for (const p of posts) {
            if (picked.length >= ARTICLE_COUNT) break
            if (!p?.slug || taken.has(p.slug)) continue
            picked.push(p)
            taken.add(p.slug)
        }
    }

    return picked.slice(0, ARTICLE_COUNT)
}
