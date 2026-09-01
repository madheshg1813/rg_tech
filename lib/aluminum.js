import { BASE_URL } from './data'
import { getCity } from './cities'
import { ORG_ID, faqPageSchema, breadcrumbSchema, jsonLdGraph } from './schema'

/*
 * Aluminum laser cutting — a standalone category pillar.
 *
 * Deliberately NOT part of pillarServices. Adding it there would have given it
 * the shared ServiceClient layout and, more to the point, a locality page for
 * every published area — 800+ thin variants of a page that is meant to exist
 * four times. This lives in the city catch-all as its own branch, checked the
 * same way resolveGod is, so it renders on the four city pillars and nowhere
 * else. A URL like /chennai/aluminum-laser-cutting-services-in-adyar resolves
 * to no pillar service and 404s, which is the intent.
 *
 * The copy is aluminum-specific on purpose. Reflectivity, dross, heat
 * distortion and anodised finishes are the real problems with cutting this
 * metal; a generic "precision and quality" page would rank for nothing and tell
 * a buyer nothing.
 */

export const ALUMINUM_SLUG = 'aluminum-laser-cutting-services'

/*
 * "Aluminum", not "Aluminium".
 *
 * The site body copy uses the British spelling in places, but every heading,
 * title and description here follows the US spelling the page was specified
 * with, because that is the spelling the target keywords use and it must match
 * end to end — slug, H1, title, description. Mixing them across a single page
 * is the one thing worth avoiding.
 */
export const ALUMINUM = {
    slug: ALUMINUM_SLUG,
    name: 'Aluminum Laser Cutting',

    heroImage:
        'https://res.cloudinary.com/o1ytbfuz/image/upload/v1788097920/rg-tech/services/aluminum-laser-cutting-services',
    heroRatio: 1.15,
    heroAlt:
        'CNC fiber laser cutting head slicing an aluminum sheet, sparks fanning across the bed',

    stamp: 'Reflective Metal Specialists',

    lead:
        'Aluminum reflects the beam, burrs on the underside and moves as it heats. We cut it on a fiber source built for reflective metal, with nitrogen assist for a clean, oxide-free edge — sheet, plate, ACP and anodised stock, up to 8000 × 2500 mm in a single setup.',

    /* Section 3 — six problems buyers actually bring us, each with what we do
     * about it. Written as pain -> fix so the section is not another feature
     * list. */
    painPoints: [
        {
            icon: 'Zap',
            pain: 'Aluminum reflects the beam',
            fix: 'Our fiber source has back-reflection protection, so high-reflectivity stock is cut without damaging the laser or stalling the job.',
        },
        {
            icon: 'Layers',
            pain: 'Burr and dross underneath',
            fix: 'Nitrogen assist gas gives a bright, oxide-free edge that needs no deburring before anodising, welding or paint.',
        },
        {
            icon: 'Wind',
            pain: 'Thin sheet warps with heat',
            fix: 'Low heat input, tuned pulse settings and nesting that spreads the cut sequence keep 1–3 mm sheet flat.',
        },
        {
            icon: 'Shield',
            pain: 'Anodised finish gets marked',
            fix: 'We cut through the protective film and support the sheet so the finished face never touches the slat bed.',
        },
        {
            icon: 'Ruler',
            pain: 'Long parts drift out of tolerance',
            fix: 'An 8000 × 2500 mm bed cuts a full sheet in one setup — no repositioning, no joint where the tolerance stacks.',
        },
        {
            icon: 'Clock',
            pain: 'Quotes take days to arrive',
            fix: 'Send a DXF, drawing or photo and you get an itemised, engineer-verified quote within 24 business hours.',
        },
    ],

    /* Section 4 — the three steps, from the customer's side. */
    process: [
        {
            step: '01',
            icon: 'Send',
            title: 'Share your reference',
            desc: 'A DXF or DWG, a PDF drawing, a photograph or a hand sketch on WhatsApp. Tell us the alloy, the thickness and the quantity.',
        },
        {
            step: '02',
            icon: 'FileText',
            title: 'We produce the cutting file',
            desc: 'We convert it to a cutting-ready file, nest it to save material and add any bridging the pattern needs, then send it back for your approval before the machine runs.',
        },
        {
            step: '03',
            icon: 'Truck',
            title: 'We cut, finish and deliver',
            desc: 'Cut on the fiber laser at our Ayanambakkam unit, edges checked, packed flat with edge protection and delivered across Tamil Nadu.',
        },
    ],

    /* Section 5 — the sub-categories. These are the specific jobs people search
     * for; each is a line of work we already run, not an aspiration. */
    subServices: [
        { name: 'Aluminium sheet laser cutting', desc: '0.5 – 12 mm in 1050, 5052, 6061 and 6082.' },
        { name: 'ACP / composite panel cutting', desc: 'Aluminium composite panels for facades and signage.' },
        { name: 'Aluminium decorative laser cutting', desc: 'Jali screens, partitions, railings and privacy panels.' },
        { name: 'Name boards & signage', desc: 'Letters, logos and backlit sign faces.' },
        { name: 'Enclosure & panel cutouts', desc: 'Control panel faces, vents and connector cutouts.' },
        { name: 'Brackets & mounting plates', desc: 'Repeat production runs to a fixed drawing.' },
        { name: 'Anodised aluminum cutting', desc: 'Cut through film so the finish arrives unmarked.' },
        { name: 'Aluminium panel laser cutting', desc: 'Perforated and patterned facade, cladding and elevation panels.' },
        { name: 'Aluminium laser cutting designs', desc: 'Pattern library or your own artwork, scaled to the opening.' },
        { name: 'Prototype & one-off parts', desc: 'Single pieces cut from your drawing, no tooling.' },
    ],

    faqs: [
        ['What thickness of aluminum can you laser cut?',
            'From 0.5 mm sheet up to 12 mm plate on the fiber laser. Above that we quote plasma or waterjet instead and tell you which suits the part — thicker aluminum on a fiber source costs more in gas and time than the edge quality justifies.'],
        ['Which aluminum grades do you cut?',
            'The common Indian stock: 1050 and 1100 for sheet metal work, 5052 for formed and marine parts, and 6061 and 6082 for structural and machined components. Tell us the grade with your enquiry, because it changes the cutting parameters and the price.'],
        ['Will the cut edge need deburring?',
            'Usually not. We cut aluminum with nitrogen assist, which gives a bright, oxide-free edge with minimal dross — ready for anodising, welding or paint without a secondary operation. Heavier plate may carry a light burr, which we remove before dispatch.'],
        ['Can you cut anodised or powder-coated aluminum?',
            'Yes. We cut through the protective film with the finished face supported so it never rubs on the slat bed. Send it with the film on and leave it on until installation.'],
        ['Do you cut ACP — aluminium composite panel?',
            'Yes, for facade cladding, signage and elevation panels, including perforated and patterned work. ACP has a plastic core, so it is cut at different settings from solid sheet; mention it in your enquiry.'],
        ['What file format should I send?',
            'DXF is ideal. DWG, STEP, PDF and even a clear photograph or hand sketch all work — we convert them into a cutting file and send it back for your approval before anything is cut.'],
        ['How much does aluminum laser cutting cost?',
            'It is priced per job, because cutting is charged by the distance the beam travels rather than by the size of the sheet. A dense perforated panel costs several times a simple bracket cut from the same stock. Send the drawing, alloy and quantity for an itemised quote within 24 business hours.'],
        ['Do you deliver outside Chennai?',
            'Yes. Everything is cut at our Ayanambakkam unit and delivered across Tamil Nadu, including Madurai, Coimbatore and Salem, packed flat with edge protection. Share the delivery pincode with your enquiry and freight is quoted with the parts.'],
    ],
}

/** True when this slug array is the aluminum pillar for a valid city. */
export function resolveAluminum(citySlug, slugArray) {
    const city = getCity(citySlug)
    if (!city || !Array.isArray(slugArray) || slugArray.length !== 1) {
        return { city: null, aluminum: null }
    }
    // Exact match only. "…-in-adyar" must NOT resolve here — this category has
    // pillars and no locality pages.
    if (slugArray[0] !== ALUMINUM_SLUG) return { city, aluminum: null }
    return { city, aluminum: ALUMINUM }
}

export const aluminumUrl = (citySlug) => `/${citySlug}/${ALUMINUM_SLUG}`

/** Headline and search snippet, per city. */
export function aluminumCopy(city) {
    const place = city.name
    return {
        h1: `Aluminum Laser Cutting Services in ${place}`,
        // The layout template appends " | RG Tech Engineering Works", so this
        // must NOT include the brand or it renders twice.
        metaTitle: `Aluminum Laser Cutting Services in ${place}`,
        metaDescription:
            `Get precision aluminum laser cutting services in ${place} from RG Tech Engineering Works. High-quality cutting, accurate finishes, and reliable solutions for industrial and custom fabrication needs.`,
        canonical: aluminumUrl(city.slug),
        url: `${BASE_URL}${aluminumUrl(city.slug)}`,
    }
}

/* Metadata for the Next route. */
export function aluminumMetadata(citySlug) {
    const city = getCity(citySlug)
    if (!city) return {}
    const c = aluminumCopy(city)

    return {
        title: c.metaTitle,
        description: c.metaDescription,
        alternates: { canonical: c.canonical },
        openGraph: {
            title: `${c.metaTitle} | RG Tech Engineering Works`,
            description: c.metaDescription,
            url: c.url,
            type: 'website',
            images: [{
                url: ALUMINUM.heroImage,
                width: 1600,
                height: 1395,
                alt: ALUMINUM.heroAlt,
            }],
        },
        twitter: {
            card: 'summary_large_image',
            title: `${c.metaTitle} | RG Tech Engineering Works`,
            description: c.metaDescription,
            images: [ALUMINUM.heroImage],
        },
    }
}

/*
 * Structured data for the page.
 *
 * faqs are stored as [question, answer] pairs because that is what reads
 * cleanly in this file; faqPageSchema wants {q, a}, so they are mapped here
 * rather than storing the more verbose shape.
 */
export function aluminumGraph(citySlug) {
    const city = getCity(citySlug)
    if (!city) return null
    const c = aluminumCopy(city)

    const service = {
        '@type': 'Service',
        '@id': `${c.url}#service`,
        name: c.h1,
        serviceType: 'Aluminum laser cutting',
        description: c.metaDescription,
        provider: { '@id': ORG_ID },
        areaServed: { '@type': 'City', name: city.name },
        url: c.url,
        hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: `Aluminum laser cutting in ${city.name}`,
            itemListElement: ALUMINUM.subServices.map((s) => ({
                '@type': 'Offer',
                itemOffered: { '@type': 'Service', name: s.name, description: s.desc },
            })),
        },
    }

    return jsonLdGraph(
        service,
        breadcrumbSchema(
            [
                { name: 'Home', url: BASE_URL },
                { name: c.h1, url: c.url },
            ],
            c.url
        ),
        faqPageSchema(ALUMINUM.faqs.map(([q, a]) => ({ q, a })), c.url)
    )
}
