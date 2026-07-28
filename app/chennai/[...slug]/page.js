import { notFound, permanentRedirect } from 'next/navigation'
import ServiceClient from '@/components/Service/ServiceClient'
import { pillarServices, BASE_URL, SERVICE_IMAGE_POOLS } from '@/lib/data'
import { getRotationIndex, toAbsoluteUrl, resolveFaqs } from '@/lib/utils'
import {
    ORG_ID,
    faqPageSchema,
    breadcrumbSchema,
    jsonLdGraph,
    jsonLdScript,
} from '@/lib/schema'

/**
 * Single source of truth for the page's meta title. Used both for <title> and,
 * via ServiceClient, as the keyword source for image alt text — so the two can
 * never drift apart.
 */
function buildMetaTitle(content, cityName) {
    return cityName
        ? `Top-Rated ${content.name} in ${cityName} | RG Tech Engineering`
        : content.metaTitle
}

export async function generateMetadata({ params }) {
    const { slug } = await params
    const { content, cityName } = resolveService(slug)

    if (!content) return {}

    const displayMetaTitle = buildMetaTitle(content, cityName)

    const displayMetaDesc = cityName
        ? `Looking for high-precision ${content.name.toLowerCase()} in ${cityName}, Chennai? RG Tech Engineering provides premium industrial metal solutions with fast 24h response. Get a free quote today.`
        : content.metaDescription

    const serviceSlug = content.slug.split('/').pop()
    const pool = SERVICE_IMAGE_POOLS[serviceSlug] || []
    const heroImg = pool[0] || content.heroImage
    // heroImg is an absolute Cloudinary URL post-migration, but may still be a
    // local /public path. Only prefix the origin when it is actually relative —
    // prefixing an absolute URL yields "https://…comhttps://res.cloudinary…".
    const ogImageUrl = heroImg
        ? toAbsoluteUrl(heroImg)
        : `${BASE_URL}/og?title=${encodeURIComponent(displayMetaTitle)}&sub=CNC+Laser+Cutting+%26+Metal+Fabrication`

    return {
        title: displayMetaTitle,
        description: displayMetaDesc,
        alternates: {
            canonical: `/chennai/${slug.join('/')}`,
        },
        openGraph: {
            title: displayMetaTitle,
            description: displayMetaDesc,
            url: `${BASE_URL}/chennai/${slug.join('/')}`,
            type: 'website',
            siteName: 'RG Tech Engineering Works',
            images: [{ url: ogImageUrl, width: 1200, height: 630, alt: displayMetaTitle }],
        },
        twitter: {
            card: 'summary_large_image',
            title: displayMetaTitle,
            description: displayMetaDesc,
            images: [ogImageUrl],
        },
    }
}

function resolveService(slugArray) {
    let serviceSlug = ''
    let cityPart = ''

    if (slugArray.length === 1) {
        const fullSlugPart = slugArray[0]
        if (fullSlugPart.includes('-in-')) {
            serviceSlug = fullSlugPart.substring(0, fullSlugPart.lastIndexOf('-in-'))
            cityPart = fullSlugPart.substring(fullSlugPart.lastIndexOf('-in-') + 4)
        } else {
            serviceSlug = fullSlugPart
        }
    } else if (slugArray.length >= 2) {
        serviceSlug = slugArray[0]
        cityPart = slugArray[1]
    }

    const content = pillarServices.find(s => s.slug.split('/').pop() === serviceSlug)

    let cityName = null
    if (cityPart) {
        cityName = cityPart.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    }

    return { content, cityName }
}

export default async function Page({ params }) {
    const { slug } = await params

    // Permanent redirect: /chennai/{service}/{city} → /chennai/{service}-in-{city}
    if (slug.length === 2) {
        permanentRedirect(`/chennai/${slug[0]}-in-${slug[1]}`)
    }

    const { content, cityName } = resolveService(slug)

    if (!content) notFound()

    const cityIndex = getRotationIndex(cityName)
    const pathName = `/chennai/${slug.join('/')}`

    // ── JSON-LD schemas ──────────────────────────────────────────────────────
    const pageUrl = `${BASE_URL}${pathName}`
    const displayTitle = cityName ? `${content.name} in ${cityName}` : content.title

    // Computed here, then passed to ServiceClient, so the FAQ markup and the FAQ
    // the visitor actually sees are guaranteed to be the same text. Google treats
    // FAQPage markup that does not match visible content as a violation.
    const displayFaqs = resolveFaqs(content, cityName, cityIndex)

    const serviceSchema = {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        "name": displayTitle,
        "serviceType": content.name,
        "description": cityName
            ? `High-precision ${content.name.toLowerCase()} in ${cityName}, Chennai by RG Tech Engineering.`
            : content.metaDescription,
        "provider": { "@id": ORG_ID },
        "areaServed": {
            "@type": cityName ? "Place" : "City",
            "name": cityName ? `${cityName}, Chennai` : "Chennai",
        },
        "url": pageUrl,
    }

    const graph = jsonLdGraph(
        serviceSchema,
        breadcrumbSchema(
            [
                { name: "Home", url: BASE_URL },
                { name: content.name, url: `${BASE_URL}${content.slug}` },
                ...(cityName ? [{ name: cityName, url: pageUrl }] : []),
            ],
            pageUrl
        ),
        faqPageSchema(displayFaqs, pageUrl)
    )

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={jsonLdScript(graph)}
            />
            <ServiceClient
                content={content}
                cityName={cityName}
                cityIndex={cityIndex}
                pathName={pathName}
                metaTitle={buildMetaTitle(content, cityName)}
                faqs={displayFaqs}
            />
        </>
    )
}
