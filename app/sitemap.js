import { pillarServices, BASE_URL } from '@/lib/data'
import { CITIES, serviceUrl, serviceKeyOf, publishedLocalities } from '@/lib/cities'
import { publishedGodDesigns, godDesignUrl } from '@/lib/godDesigns'
import { aluminumUrl } from '@/lib/aluminum'
import { copperUrl } from '@/lib/copper'
import { mildSteelUrl } from '@/lib/mildSteel'
import { jobWorkUrl } from '@/lib/jobWork'
import { getPosts } from '@/lib/sanity'

/*
 * 5 minutes, not an hour.
 *
 * Posts are published straight into Sanity by the publish-blog cron, with no
 * deploy involved, so this window is the only thing that decides how long a new
 * article stays invisible here. At 3600 a post was live at its own URL but
 * missing from the listing and the sitemap for up to an hour.
 */
export const revalidate = 300

export default async function sitemap() {
    const today = new Date().toISOString().split('T')[0]

    const staticPages = [
        { url: BASE_URL,                  lastModified: today, changeFrequency: 'daily',   priority: 1.0 },
        { url: `${BASE_URL}/gallery`,     lastModified: today, changeFrequency: 'weekly',  priority: 0.8 },
        { url: `${BASE_URL}/blog`,        lastModified: today, changeFrequency: 'weekly',  priority: 0.8 },
        { url: `${BASE_URL}/contact`,     lastModified: today, changeFrequency: 'monthly', priority: 0.9 },
        { url: `${BASE_URL}/about`,       lastModified: today, changeFrequency: 'monthly', priority: 0.7 },
        { url: `${BASE_URL}/terms`,       lastModified: today, changeFrequency: 'yearly',  priority: 0.3 },
    ]

    // Service pages for every city: the pillar plus one page per locality.
    // Chennai is the primary market so its pages carry higher priority.
    const cityPages = Object.values(CITIES).flatMap(city =>
        pillarServices.flatMap(s => {
            const key = serviceKeyOf(s)
            const pillar = {
                url: `${BASE_URL}${serviceUrl(city.slug, key)}`,
                lastModified: today,
                changeFrequency: 'monthly',
                priority: city.isPrimary ? 0.8 : 0.7,
            }
            const localities = publishedLocalities(city.slug).map(locality => ({
                url: `${BASE_URL}${serviceUrl(city.slug, key, locality)}`,
                lastModified: today,
                changeFrequency: 'monthly',
                priority: city.isPrimary ? 0.6 : 0.5,
            }))
            return [pillar, ...localities]
        })
    )

    // Aluminum laser cutting: a pillar in each city and no locality variants,
    // so four entries rather than the 200+ a pillarServices entry would produce.
    const aluminumPages = Object.values(CITIES).map((city) => ({
        url: `${BASE_URL}${aluminumUrl(city.slug)}`,
        lastModified: today,
        changeFrequency: 'weekly',
        priority: city.isPrimary ? 0.9 : 0.8,
    }))

    // Copper laser cutting: same pillars-only arrangement as aluminum above.
    const copperPages = Object.values(CITIES).map((city) => ({
        url: `${BASE_URL}${copperUrl(city.slug)}`,
        lastModified: today,
        changeFrequency: 'weekly',
        priority: city.isPrimary ? 0.9 : 0.8,
    }))

    // Mild steel laser cutting: same pillars-only arrangement as above.
    const mildSteelPages = Object.values(CITIES).map((city) => ({
        url: `${BASE_URL}${mildSteelUrl(city.slug)}`,
        lastModified: today,
        changeFrequency: 'weekly',
        priority: city.isPrimary ? 0.9 : 0.8,
    }))

    // Laser cutting job work: the commercial pillar above the categories.
    // Highest priority of the city pages — it is the top of the funnel and the
    // hub the others are linked from.
    const jobWorkPages = Object.values(CITIES).map((city) => ({
        url: `${BASE_URL}${jobWorkUrl(city.slug)}`,
        lastModified: today,
        changeFrequency: 'weekly',
        priority: city.isPrimary ? 1.0 : 0.9,
    }))

    /*
     * The 200 city deity pages used to be listed here. They now 301 to their
     * design gallery (see cityDeityRedirects in next.config.js), and a sitemap
     * that advertises a redirect asks Google to crawl a page only to be sent
     * somewhere else — so they are gone rather than merely deprioritised.
     *
     * The galleries they point at are listed below, which is where the
     * crawl budget should go.
     */

    /*
     * City-independent deity design galleries (/designs/gods/<slug>), and the
     * index that collects them.
     *
     * The index goes first and at a higher priority: it is the parent of the
     * fifty galleries and the destination the 200 redirected city pages now
     * funnel toward, so it is the page to have crawled soonest.
     *
     * publishedGodDesigns() returns only galleries that actually have images —
     * an empty one is noindex on the page itself, so listing it here would
     * contradict that and point crawlers at a "coming soon" panel.
     */
    const godDesignIndex = {
        url: `${BASE_URL}/designs/gods`,
        lastModified: today,
        changeFrequency: 'weekly',
        priority: 0.8,
    }

    const godDesignPages = publishedGodDesigns().map(design => ({
        url: `${BASE_URL}${godDesignUrl(design.slug)}`,
        lastModified: today,
        changeFrequency: 'monthly',
        priority: 0.7,
    }))

    // Blog posts now come from Sanity, matching what /blog actually renders.
    const posts = await getPosts()
    const blogPages = posts.map(p => ({
        url: `${BASE_URL}/blog/${p.slug}`,
        lastModified: (p.updatedAt || p.publishedAt || today).split('T')[0],
        changeFrequency: 'monthly',
        priority: 0.7,
    }))

    return [...staticPages, ...cityPages, ...aluminumPages, ...copperPages, ...mildSteelPages, ...jobWorkPages, godDesignIndex, ...godDesignPages, ...blogPages]
}
