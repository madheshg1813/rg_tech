import { BASE_URL, CHENNAI_LOCALITIES, pillarServices } from './data'

/*
 * Central JSON-LD definitions.
 *
 * Everything the site emits is defined here once and referenced by @id, so the
 * business is described as ONE entity across every page rather than being
 * redeclared (and quietly contradicted) page by page.
 */

export const ORG_ID = `${BASE_URL}/#organization`
export const WEBSITE_ID = `${BASE_URL}/#website`

const LOGO_URL =
    'https://res.cloudinary.com/o1ytbfuz/image/upload/v1785177077/rg-tech/rg-tech-logo'
const PRIMARY_IMAGE =
    'https://res.cloudinary.com/o1ytbfuz/image/upload/v1785177071/rg-tech/gallery/sheet-metal-laser-cutting/sm_12'

const PHONE = '+916380736439'
const PHONE_ALT = '+916369221078'
const EMAIL = 'admin@rgtechengineeringworks.com'

/**
 * The business node.
 *
 * Typed as BOTH Organization and LocalBusiness. LocalBusiness is a subclass of
 * Organization, so a single multi-typed node satisfies both without creating two
 * competing entities for one real-world company — which is what structured-data
 * validators flag when a site emits a separate Organization and LocalBusiness
 * for the same business.
 */
export const organizationSchema = {
    "@type": ["Organization", "LocalBusiness"],
    "@id": ORG_ID,
    "name": "RG Tech Engineering Works",
    "alternateName": "RG Tech Engineering",
    "url": BASE_URL,
    "description":
        "CNC fiber laser cutting and sheet metal fabrication in Chennai. Precision cutting of mild steel, stainless steel, aluminium, copper and brass up to 45mm, plus steel gates, safety doors and decorative metal panels.",
    "logo": {
        "@type": "ImageObject",
        "@id": `${BASE_URL}/#logo`,
        "url": LOGO_URL,
        "caption": "RG Tech Engineering Works logo",
    },
    "image": { "@id": `${BASE_URL}/#logo` },
    "telephone": [PHONE, PHONE_ALT],
    "email": EMAIL,
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "Door No. 63, B&C Flat, Galaxy Company Salai, Ponniamman Nagar, Ayanambakkam",
        "addressLocality": "Chennai",
        "addressRegion": "Tamil Nadu",
        "postalCode": "600095",
        "addressCountry": "IN",
    },
    // Approximate centre of Ayanambakkam. The previous value was Chennai city
    // centre, roughly 15 km from the actual premises — worth replacing with the
    // exact pin from your Google Business Profile when convenient.
    "geo": {
        "@type": "GeoCoordinates",
        "latitude": 13.0878,
        "longitude": 80.1553,
    },
    "taxID": "33HGZPS9605D1ZP",
    "founder": {
        "@type": "Person",
        "name": "Surya Narayanan Gopikrishnan",
    },
    "contactPoint": [
        {
            "@type": "ContactPoint",
            "telephone": PHONE,
            "email": EMAIL,
            "contactType": "sales",
            "areaServed": "IN",
            "availableLanguage": ["en", "ta"],
        },
    ],
    "openingHoursSpecification": [
        {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
            ],
            "opens": "09:00",
            "closes": "19:00",
        },
    ],
    "priceRange": "$$",
    "currenciesAccepted": "INR",
    "areaServed": [
        { "@type": "City", "name": "Chennai" },
        ...CHENNAI_LOCALITIES.map((name) => ({
            "@type": "Place",
            "name": `${name}, Chennai`,
        })),
    ],
    "knowsAbout": [
        "CNC fiber laser cutting",
        "Sheet metal laser cutting",
        "Metal fabrication",
        "Steel gate manufacturing",
        "Metal safety doors",
        "Decorative metal panels",
    ],
    "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Laser cutting and metal fabrication services",
        "itemListElement": pillarServices.map((service) => ({
            "@type": "Offer",
            "itemOffered": {
                "@type": "Service",
                "name": service.name,
                "url": `${BASE_URL}${service.slug}`,
            },
        })),
    },
}

export const webSiteSchema = {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    "name": "RG Tech Engineering Works",
    "url": BASE_URL,
    "inLanguage": "en-IN",
    "publisher": { "@id": ORG_ID },
    "potentialAction": {
        "@type": "SearchAction",
        "target": {
            "@type": "EntryPoint",
            "urlTemplate": `${BASE_URL}/chennai/{search_term_string}`,
        },
        "query-input": "required name=search_term_string",
    },
}

/** Strip HTML so answers stay plain text, as FAQPage requires. */
function toPlainText(value) {
    if (typeof value !== 'string') return ''
    return value
        .replace(/<[^>]*>/g, '')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/\s{2,}/g, ' ')
        .trim()
}

/**
 * FAQPage schema.
 *
 * `faqs` must be the SAME list, in the same wording, that the page actually
 * renders — Google requires FAQ markup to match visible content, so callers pass
 * the already-localised array rather than the raw source data.
 */
export function faqPageSchema(faqs, pageUrl) {
    const entities = (faqs || [])
        .map((faq) => ({ q: toPlainText(faq.q), a: toPlainText(faq.a) }))
        .filter((faq) => faq.q && faq.a)

    if (!entities.length) return null

    return {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        "mainEntity": entities.map((faq) => ({
            "@type": "Question",
            "name": faq.q,
            "acceptedAnswer": { "@type": "Answer", "text": faq.a },
        })),
    }
}

/**
 * Author as a schema.org Person, linked from BlogPosting by @id.
 *
 * Google's article guidelines expect a real named author rather than the
 * publishing organisation, so posts reference this node instead of falling back
 * to the business.
 */
export function personSchema(author) {
    if (!author?.name) return null
    const slug = author.slug || author.name.toLowerCase().replace(/\s+/g, '-')
    return {
        "@type": "Person",
        "@id": `${BASE_URL}/#author-${slug}`,
        "name": author.name,
        "jobTitle": author.role || "Content Writer",
        ...(author.bio ? { "description": author.bio } : {}),
        ...(author.imageUrl ? { "image": author.imageUrl } : {}),
        ...(author.email ? { "email": author.email } : {}),
        ...(author.sameAs?.length ? { "sameAs": author.sameAs } : {}),
        "worksFor": { "@id": ORG_ID },
        "url": `${BASE_URL}/blog`,
    }
}

export function breadcrumbSchema(items, pageUrl) {
    if (!items?.length) return null
    return {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        "itemListElement": items.map((item, i) => ({
            "@type": "ListItem",
            "position": i + 1,
            "name": item.name,
            "item": item.url,
        })),
    }
}

/**
 * Wrap nodes in a single @graph. One script tag per page keeps the entities
 * linked by @id instead of scattering disconnected islands of markup.
 */
export function jsonLdGraph(...nodes) {
    return {
        "@context": "https://schema.org",
        "@graph": nodes.filter(Boolean),
    }
}

/** Renders as a <script type="application/ld+json"> payload. */
export function jsonLdScript(graph) {
    return { __html: JSON.stringify(graph) }
}
