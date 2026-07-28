/**
 * Publishing queue.
 *
 * Articles publish in the order listed here, one every PUBLISH_INTERVAL_DAYS
 * (default 3), driven by .github/workflows/publish-blog.yml.
 *
 * Each entry lazy-loads its article module so a scheduled run only parses the
 * one post it is about to publish, not all fifty.
 *
 * The publisher skips any slug already live in Sanity, so:
 *   - reordering this list is safe
 *   - re-running is safe
 *   - removing a published entry does not unpublish it
 *
 * To add an article: create content/queue/<slug>.mjs exporting `post`,
 * then append it below.
 */
export const queue = [
    {
        slug: 'what-is-cnc-fiber-laser-cutting',
        load: async () => (await import('../what-is-cnc-fiber-laser-cutting.mjs')).post,
    },
    // Order is deliberate: every internal /blog/ link in an article points at a
    // slug published earlier in this list, so no article ever ships with a link
    // to a post that is not live yet.
    {
        slug: 'how-cnc-laser-cutting-works',
        load: async () => (await import('./how-cnc-laser-cutting-works.mjs')).post,
    },
    {
        slug: 'materials-that-can-be-laser-cut',
        load: async () => (await import('./materials-that-can-be-laser-cut.mjs')).post,
    },
    {
        slug: 'laser-cutting-tolerances-explained',
        load: async () => (await import('./laser-cutting-tolerances-explained.mjs')).post,
    },
    {
        slug: 'laser-cutting-vs-plasma-cutting',
        load: async () => (await import('./laser-cutting-vs-plasma-cutting.mjs')).post,
    },
    {
        slug: 'laser-cutting-vs-waterjet-cutting',
        load: async () => (await import('./laser-cutting-vs-waterjet-cutting.mjs')).post,
    },
    // ── Remaining articles are appended here as they are drafted ──
]

export default queue
