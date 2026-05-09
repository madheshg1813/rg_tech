import { notFound, redirect } from 'next/navigation'
import ServiceClient from '@/components/Service/ServiceClient'
import { pillarServices, BASE_URL, SERVICE_IMAGE_POOLS } from '@/lib/data'
import { getRotationIndex, localizeText } from '@/lib/utils'

export async function generateMetadata({ params }) {
    const { slug } = await params
    const { content, cityName } = resolveService(slug)

    if (!content) return {}

    const displayMetaTitle = cityName
        ? `Top-Rated ${content.name} in ${cityName} | RG Tech Engineering`
        : content.metaTitle

    const displayMetaDesc = cityName
        ? `Looking for high-precision ${content.name.toLowerCase()} in ${cityName}, Chennai? RG Tech Engineering provides premium industrial metal solutions with fast 24h response. Get a free quote today.`
        : content.metaDescription

    const serviceSlug = content.slug.split('/').pop()
    const pool = SERVICE_IMAGE_POOLS[serviceSlug] || []
    const heroImg = pool[0] || content.heroImage
    const ogImageUrl = heroImg
        ? `${BASE_URL}${heroImg}`
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

    // 301 redirect: /chennai/{service}/{city} → /chennai/{service}-in-{city}
    if (slug.length === 2) {
        redirect(`/chennai/${slug[0]}-in-${slug[1]}`)
    }

    const { content, cityName } = resolveService(slug)

    if (!content) notFound()

    const cityIndex = getRotationIndex(cityName)
    const pathName = `/chennai/${slug.join('/')}`

    // ── JSON-LD schemas ──────────────────────────────────────────────────────
    const pageUrl = `${BASE_URL}${pathName}`
    const displayTitle = cityName ? `${content.name} in ${cityName}` : content.title

    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": displayTitle,
        "description": cityName
            ? `High-precision ${content.name.toLowerCase()} in ${cityName}, Chennai by RG Tech Engineering.`
            : content.metaDescription,
        "provider": {
            "@type": "LocalBusiness",
            "@id": `${BASE_URL}/#organization`,
            "name": "RG Tech Engineering Works",
            "url": BASE_URL,
        },
        "areaServed": {
            "@type": "City",
            "name": cityName ? `${cityName}, Chennai` : "Chennai",
        },
        "url": pageUrl,
    }

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home",     "item": BASE_URL },
            { "@type": "ListItem", "position": 2, "name": content.name, "item": `${BASE_URL}${content.slug}` },
            ...(cityName ? [{ "@type": "ListItem", "position": 3, "name": cityName, "item": pageUrl }] : []),
        ],
    }

    const faqSchema = content.faqs?.length ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": content.faqs.map(faq => ({
            "@type": "Question",
            "name": faq.q,
            "acceptedAnswer": { "@type": "Answer", "text": faq.a },
        })),
    } : null

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            {faqSchema && (
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            )}
            <ServiceClient
                content={content}
                cityName={cityName}
                cityIndex={cityIndex}
                pathName={pathName}
            />
        </>
    )
}
