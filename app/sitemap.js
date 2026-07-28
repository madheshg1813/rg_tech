import { pillarServices, CHENNAI_LOCALITIES, BASE_URL } from '@/lib/data'
import { getPosts } from '@/lib/sanity'

export const revalidate = 3600

export default async function sitemap() {
    const today = new Date().toISOString().split('T')[0]

    const staticPages = [
        { url: BASE_URL,                  lastModified: today, changeFrequency: 'daily',   priority: 1.0 },
        { url: `${BASE_URL}/gallery`,     lastModified: today, changeFrequency: 'weekly',  priority: 0.8 },
        { url: `${BASE_URL}/blog`,        lastModified: today, changeFrequency: 'weekly',  priority: 0.8 },
    ]

    // 6 service base pages
    const servicePages = pillarServices.map(s => ({
        url: `${BASE_URL}${s.slug}`,
        lastModified: today,
        changeFrequency: 'monthly',
        priority: 0.8,
    }))

    // 6 services × 99 localities = locality-specific service pages
    // URL format: /chennai/{service-slug}/{city-slug}
    const localityPages = pillarServices.flatMap(s =>
        CHENNAI_LOCALITIES.map(city => {
            const citySlug = city.toLowerCase().replace(/\s+/g, '-')
            const serviceSlug = s.slug.split('/').pop()
            return {
                url: `${BASE_URL}/chennai/${serviceSlug}-in-${citySlug}`,
                lastModified: today,
                changeFrequency: 'monthly',
                priority: 0.6,
            }
        })
    )

    // Blog posts now come from Sanity, matching what /blog actually renders.
    const posts = await getPosts()
    const blogPages = posts.map(p => ({
        url: `${BASE_URL}/blog/${p.slug}`,
        lastModified: (p.updatedAt || p.publishedAt || today).split('T')[0],
        changeFrequency: 'monthly',
        priority: 0.7,
    }))

    return [...staticPages, ...servicePages, ...localityPages, ...blogPages]
}
