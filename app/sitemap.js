import { pillarServices, BASE_URL } from '@/lib/data'
import { CITIES, serviceUrl, serviceKeyOf, publishedLocalities } from '@/lib/cities'
import { GODS, godUrl } from '@/lib/gods'
import { aluminumUrl } from '@/lib/aluminum'
import { copperUrl } from '@/lib/copper'
import { mildSteelUrl } from '@/lib/mildSteel'
import { getPosts } from '@/lib/sanity'

export const revalidate = 3600

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

    // Deity and sacred-symbol design pages. These are live on every city route
    // and were absent from the sitemap entirely — 200 indexable pages with no
    // entry. They are ungated, unlike locality pages, so all of them belong
    // here as soon as the city exists.
    const designPages = Object.values(CITIES).flatMap(city =>
        GODS.map(god => ({
            url: `${BASE_URL}${godUrl(city.slug, god.key)}`,
            lastModified: today,
            changeFrequency: 'monthly',
            priority: city.isPrimary ? 0.6 : 0.5,
        }))
    )

    // Blog posts now come from Sanity, matching what /blog actually renders.
    const posts = await getPosts()
    const blogPages = posts.map(p => ({
        url: `${BASE_URL}/blog/${p.slug}`,
        lastModified: (p.updatedAt || p.publishedAt || today).split('T')[0],
        changeFrequency: 'monthly',
        priority: 0.7,
    }))

    return [...staticPages, ...cityPages, ...aluminumPages, ...copperPages, ...mildSteelPages, ...designPages, ...blogPages]
}
