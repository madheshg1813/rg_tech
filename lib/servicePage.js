import { notFound, permanentRedirect } from 'next/navigation'
import { pillarServices, BASE_URL, SERVICE_IMAGE_POOLS } from '@/lib/data'
import { getCity, serviceUrl, serviceKeyOf, localitySlug, publishedLocalities } from '@/lib/cities'
import { getRotationIndex, toAbsoluteUrl, resolveFaqs } from '@/lib/utils'
import {
    ORG_ID,
    faqPageSchema,
    breadcrumbSchema,
    jsonLdGraph,
} from '@/lib/schema'

/*
 * Shared implementation behind /chennai, /madurai and /coimbatore service pages.
 *
 * Each city has its own thin route file so Chennai's existing URLs keep
 * resolving through exactly the same code path they always have — this file was
 * lifted out of the Chennai route unchanged in behaviour, then parameterised by
 * city. A single catch-all like /[city]/[...slug] would have been less code but
 * would also swallow every unmatched path on the site.
 */

/**
 * Resolve a slug array to a service and locality within a given city.
 * Handles both `/{city}/{service}` and `/{city}/{service}-in-{locality}`.
 */
export function resolveService(citySlug, slugArray) {
    const city = getCity(citySlug)
    if (!city) return { city: null, content: null, cityName: null }

    let serviceSlug = ''
    let localityPart = ''

    if (slugArray.length === 1) {
        const part = slugArray[0]
        if (part.includes('-in-')) {
            serviceSlug = part.substring(0, part.lastIndexOf('-in-'))
            localityPart = part.substring(part.lastIndexOf('-in-') + 4)
        } else {
            serviceSlug = part
        }
    } else if (slugArray.length >= 2) {
        serviceSlug = slugArray[0]
        localityPart = slugArray[1]
    }

    const content = pillarServices.find((s) => serviceKeyOf(s) === serviceSlug)

    let cityName = null
    if (localityPart) {
        // Only resolve localities that are both served AND released. An
        // unreleased locality 404s so Google never indexes a page ahead of its
        // scheduled publish date.
        const match = publishedLocalities(city.slug).find(
            (l) => localitySlug(l) === localityPart.toLowerCase()
        )
        if (!match) return { city, content, cityName: null, badLocality: true }
        cityName = match
    }

    return { city, content, cityName }
}

/**
 * Meta title — also the keyword source for image alt text, so they cannot drift.
 *
 * Deliberately does NOT append the brand: app/layout.js applies the template
 * "%s | RG Tech Engineering" to every title. Adding it here produced
 * "... in Porur | RG Tech Engineering | RG Tech Engineering" on every locality
 * page, wasting characters Google would otherwise show.
 */
export function buildMetaTitle(content, cityName, city) {
    if (cityName) return `Top-Rated ${content.name} in ${cityName}`
    if (city && !city.isPrimary) return `${content.name} in ${city.name}`
    return content.metaTitle
}

function buildMetaDescription(content, cityName, city) {
    const place = cityName ? `${cityName}, ${city.name}` : city.name
    if (cityName || !city.isPrimary) {
        return `Looking for high-precision ${content.name.toLowerCase()} in ${place}? RG Tech Engineering provides premium industrial metal solutions with fast 24h response. Get a free quote today.`
    }
    return content.metaDescription
}

export async function buildMetadata(citySlug, params) {
    const { slug } = await params
    const { city, content, cityName } = resolveService(citySlug, slug)
    if (!city || !content) return {}

    const title = buildMetaTitle(content, cityName, city)
    const description = buildMetaDescription(content, cityName, city)

    const pool = SERVICE_IMAGE_POOLS[serviceKeyOf(content)] || []
    const heroImg = pool[0] || content.heroImage
    const path = `/${citySlug}/${slug.join('/')}`

    const ogImageUrl = heroImg
        ? toAbsoluteUrl(heroImg)
        : `${BASE_URL}/og?title=${encodeURIComponent(title)}&sub=CNC+Laser+Cutting+%26+Metal+Fabrication`

    return {
        title,
        description,
        alternates: { canonical: path },
        openGraph: {
            title,
            description,
            url: `${BASE_URL}${path}`,
            type: 'website',
            siteName: 'RG Tech Engineering Works',
            images: [{ url: ogImageUrl, width: 1200, height: 630, alt: title }],
        },
        twitter: { card: 'summary_large_image', title, description, images: [ogImageUrl] },
    }
}

/**
 * Everything the route's default export needs, so the route files stay thin.
 * Returns null when the caller should redirect (handled inside).
 */
export async function buildServicePage(citySlug, params) {
    const { slug } = await params

    // Legacy shape: /{city}/{service}/{locality} -> /{city}/{service}-in-{locality}
    if (slug.length === 2) {
        permanentRedirect(`/${citySlug}/${slug[0]}-in-${slug[1]}`)
    }

    const { city, content, cityName, badLocality } = resolveService(citySlug, slug)
    if (!city || !content || badLocality) notFound()

    const cityIndex = getRotationIndex(cityName || city.name)
    const pathName = `/${citySlug}/${slug.join('/')}`
    const pageUrl = `${BASE_URL}${pathName}`
    const displayTitle = cityName
        ? `${content.name} in ${cityName}`
        : city.isPrimary
            ? content.title
            : `${content.name} in ${city.name}`

    const displayFaqs = resolveFaqs(content, cityName || (city.isPrimary ? null : city.name), cityIndex)

    const serviceSchema = {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        "name": displayTitle,
        "serviceType": content.name,
        "description": buildMetaDescription(content, cityName, city),
        "provider": { "@id": ORG_ID },
        "areaServed": {
            "@type": cityName ? "Place" : "City",
            "name": cityName ? `${cityName}, ${city.name}` : city.name,
        },
        "url": pageUrl,
    }

    const crumbs = [
        { name: 'Home', url: BASE_URL },
        { name: `${content.name} in ${city.name}`, url: `${BASE_URL}${serviceUrl(citySlug, serviceKeyOf(content))}` },
        ...(cityName ? [{ name: cityName, url: pageUrl }] : []),
    ]

    const graph = jsonLdGraph(
        serviceSchema,
        breadcrumbSchema(crumbs, pageUrl),
        faqPageSchema(displayFaqs, pageUrl)
    )

    return {
        city,
        content,
        cityName,
        cityIndex,
        pathName,
        graph,
        metaTitle: buildMetaTitle(content, cityName, city),
        faqs: displayFaqs,
    }
}
