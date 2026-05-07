import { pillarServices, CHENNAI_LOCALITIES, APPS_SCRIPT_URL, BASE_URL } from '@/lib/data'

export const revalidate = 3600

async function getBlogPosts() {
    try {
        const res = await fetch(APPS_SCRIPT_URL, { next: { revalidate: 3600 } })
        if (!res.ok) return []
        const data = await res.json()
        return data.posts || []
    } catch {
        return []
    }
}

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

    // Blog posts from live API
    const posts = await getBlogPosts()
    const blogPages = posts.map(p => ({
        url: `${BASE_URL}/blog/${p.slug}`,
        lastModified: p.date || today,
        changeFrequency: 'monthly',
        priority: 0.6,
    }))

    return [...staticPages, ...servicePages, ...localityPages, ...blogPages]
}
