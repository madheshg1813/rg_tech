import { BASE_URL } from '@/lib/data'
import { getCity } from '@/lib/cities'
import { godUrl } from '@/lib/gods'
import { IMAGES } from '@/content/lib/images.mjs'
import { ORG_ID, breadcrumbSchema, faqPageSchema, jsonLdGraph } from '@/lib/schema'

/*
 * Metadata and structured data for deity design pages.
 *
 * Typed as a Product/Service offering rather than anything religious: what is
 * sold is a laser-cut metal panel. The copy and markup stay on material,
 * thickness and finish and make no claim about ritual suitability.
 */

export function godFaqs(god, city) {
    return [
        {
            q: `What sizes can RG Tech cut a ${god.name} design in ${city.name}?`,
            a: `Anything from a 1 ft pooja room panel up to a full 8 ft temple arch. Our bed takes sheets up to 8000 x 2500 mm, so large panels are cut in one piece with no welded joins interrupting the pattern.`,
        },
        {
            q: `Which material is best for a ${god.name} laser cut panel?`,
            a: `Mild steel with powder coating is the most economical and suits interiors. Stainless steel 304 or 316 is better for outdoor and coastal exposure. Brass and copper are used for feature pieces and pooja rooms where a warm metal tone is wanted.`,
        },
        {
            q: `Can RG Tech cut a ${god.name} design from my own photo?`,
            a: `Yes. Send a photograph, temple reference or sketch on WhatsApp and we convert it into a cutting-ready vector. We also check the design holds together once material is removed — many detailed images need small connecting bridges added before they can be cut.`,
        },
        {
            q: `What thickness is used for ${god.name} decorative panels?`,
            a: `Interior screens are typically 1.5 mm to 3 mm. Exterior panels and gate inserts generally need 3 mm or more to stay flat and resist wind load. We advise once we see the pattern and span.`,
        },
        {
            q: `How long does a custom ${god.name} panel take?`,
            a: `Cut-only panels usually ship in 3 to 5 working days after the design is approved. Panels needing framing and powder coating take 7 to 12 working days, since coating cure time cannot be rushed without hurting durability.`,
        },
        {
            q: `Does RG Tech deliver ${god.name} panels to ${city.name}?`,
            a: `Yes. Panels are cut and finished at our Chennai facility and dispatched to ${city.name} edge-protected so the pattern arrives undamaged.`,
        },
    ]
}

export function buildGodMetadata(citySlug, god, slug) {
    const city = getCity(citySlug)
    if (!city || !god) return {}

    const path = `/${citySlug}/${slug.join('/')}`
    const title = `${god.name} Laser Cutting Design in ${city.name}`
    const description = `Custom ${god.name} laser cutting designs in ${city.name}. CNC cut in mild steel, stainless steel and brass for pooja rooms, gates, temple arches and wall art. Send your reference on WhatsApp for sizes and pricing.`

    return {
        title,
        description,
        keywords: [
            `${god.name.toLowerCase()} laser cutting design`,
            `${god.name.toLowerCase()} laser cutting ${city.name.toLowerCase()}`,
            'god laser cutting design',
            'temple laser cutting design',
            'pooja room laser cut panel',
        ],
        alternates: { canonical: path },
        openGraph: {
            title,
            description,
            url: `${BASE_URL}${path}`,
            type: 'website',
            siteName: 'RG Tech Engineering Works',
            images: [{ url: IMAGES.panel, width: 1200, height: 630, alt: title }],
        },
        twitter: { card: 'summary_large_image', title, description, images: [IMAGES.panel] },
    }
}

export function buildGodPage(citySlug, god) {
    const city = getCity(citySlug)
    const pageUrl = `${BASE_URL}${godUrl(citySlug, god.key)}`
    const faqs = godFaqs(god, city)

    const serviceSchema = {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        "name": `${god.name} Laser Cutting Design`,
        "serviceType": "Decorative metal laser cutting",
        "description": `Custom CNC laser cut ${god.name} panels in mild steel, stainless steel and brass for pooja rooms, gates, temple arches and wall art in ${city.name}.`,
        "provider": { "@id": ORG_ID },
        "areaServed": { "@type": "City", "name": city.name },
        "url": pageUrl,
    }

    const graph = jsonLdGraph(
        serviceSchema,
        breadcrumbSchema(
            [
                { name: 'Home', url: BASE_URL },
                // No "Designs in {city}" crumb: it pointed at /{city}/designs,
                // which 404s. A breadcrumb naming a URL that does not resolve is
                // worse than a shorter trail, so the trail is Home -> {god}
                // until a city-level design index actually exists.
                { name: god.name, url: pageUrl },
            ],
            pageUrl
        ),
        faqPageSchema(faqs, pageUrl)
    )

    return { city, god, faqs, graph, pageUrl }
}
