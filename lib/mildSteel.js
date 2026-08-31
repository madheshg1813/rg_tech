import { BASE_URL } from './data'
import { getCity } from './cities'
import { ORG_ID, faqPageSchema, breadcrumbSchema, jsonLdGraph } from './schema'

/*
 * Mild steel laser cutting — a standalone category pillar.
 *
 * Same arrangement as lib/aluminum.js and lib/copper.js: pillars in each city
 * and no locality pages. Deliberately NOT part of pillarServices, which is what
 * drives locality generation — one entry there would turn a four-page category
 * into 800+ thin variants. The city catch-all checks this before the service
 * resolver and matches the exact slug, so "...-in-adyar" 404s by design.
 *
 * The copy is mild-steel-specific. Where the aluminum page is about
 * reflectivity and dross, this one is about plate thickness, oxide edges and
 * mill scale — the things that actually decide an MS job.
 *
 * Note the overlap with /{city}/sheet-metal-laser-cutting-services, which also
 * mentions MS. That page sells the sheet-metal service; this one targets the
 * material query. Keep the copy distinct if both are to rank.
 */

export const MILD_STEEL_SLUG = 'mild-steel-laser-cutting-services'

export const MILD_STEEL = {
    slug: MILD_STEEL_SLUG,
    name: 'Mild Steel Laser Cutting',

    heroImage:
        'https://res.cloudinary.com/o1ytbfuz/image/upload/v1788196689/rg-tech/services/mild-steel-laser-cutting-services',
    heroRatio: 1.20,
    heroAlt:
        'CNC fiber laser cutting a gear profile out of thick mild steel plate on the machine bed',

    stamp: 'Plate Up To 45mm',
    heroBadge: { label: 'Sheet To Plate', value: '0.8 – 45', unit: 'mm' },

    lead:
        'Mild steel is the workhorse, and thickness is what decides who can take the job. We cut MS from 0.8 mm sheet to 45 mm plate on a high-power fiber source — oxygen for heavy plate, nitrogen where the edge has to be weld- or paint-ready — up to 8000 x 2500 mm in a single setup.',

    /* Six problems buyers actually bring us, each with what we do about it.
     * Thickness leads because it is why most MS enquiries are shopping around
     * in the first place. */
    painPoints: [
        {
            icon: 'Zap',
            pain: 'Nobody will quote thick plate',
            fix: 'We cut mild steel to 45 mm. Jobs turned away at 12 or 16 mm elsewhere are routine work here.',
        },
        {
            icon: 'Layers',
            pain: 'Oxide edge resists paint',
            fix: 'Oxygen is fast on heavy plate but leaves an oxide skin. Where the edge matters we cut with nitrogen instead, so it arrives ready to weld or coat.',
        },
        {
            icon: 'Wind',
            pain: 'Wide panels come back bowed',
            fix: 'Cut sequencing and nesting spread the heat rather than concentrating it, so thin, wide panels stay flat as they cool.',
        },
        {
            icon: 'Shield',
            pain: 'Mill scale ruins the edge',
            fix: 'Hot-rolled stock is set up for the surface condition it actually arrives in, not an ideal one, so scale does not turn into a ragged cut.',
        },
        {
            icon: 'Ruler',
            pain: 'Repeat parts drift batch to batch',
            fix: 'One nest, one setup, one program — part 500 measures the same as part 1. Typically +/-0.1 mm on sheet work.',
        },
        {
            icon: 'Clock',
            pain: 'Bulk runs quoted slowly',
            fix: 'Send the DXF and the quantity and you get an itemised, engineer-verified quote within 24 business hours — prototype or production.',
        },
    ],

    process: [
        {
            step: '01',
            icon: 'Send',
            title: 'Share your drawing',
            desc: 'A DXF or DWG, a PDF, a photograph or a hand sketch on WhatsApp. Tell us the grade, the thickness and the quantity.',
        },
        {
            step: '02',
            icon: 'FileText',
            title: 'We nest and confirm',
            desc: 'We convert it to a cutting-ready file and nest it to get the most parts out of each sheet, then send it back for your approval before the machine runs.',
        },
        {
            step: '03',
            icon: 'Truck',
            title: 'We cut, finish and deliver',
            desc: 'Cut at our Ayanambakkam unit, deburred where it needs it, and delivered across Tamil Nadu — with bending, welding or powder coating if you want it finished.',
        },
    ],

    subServices: [
        { name: 'MS sheet cutting', desc: '0.8 - 6 mm CR and HR sheet, cut to your drawing.' },
        { name: 'Heavy plate cutting', desc: '8 - 45 mm plate for structural and machine work.' },
        { name: 'Base plates & flanges', desc: 'Bolt-hole patterns and profiles to drawing.' },
        { name: 'Brackets & gussets', desc: 'Structural steel connections, cut in batches.' },
        { name: 'Gears, sprockets & cams', desc: 'Profile-cut blanks ready for machining.' },
        { name: 'Machine guards & enclosures', desc: 'Perforated and slotted panels for equipment.' },
        { name: 'Chequered plate cutting', desc: 'Flooring, treads and covers cut to size.' },
        { name: 'Gate & grill panels', desc: 'Decorative MS panels for gates and railings.' },
        { name: 'Prototype & production runs', desc: 'One-offs through to repeat batches, no tooling.' },
    ],

    faqs: [
        ['What thickness of mild steel can you cut?',
            'From 0.8 mm sheet to 45 mm plate on the fiber laser. Thickness is the usual reason an MS job gets turned away elsewhere; heavy plate is routine work here.'],
        ['Oxygen or nitrogen — which do you cut mild steel with?',
            'Both, and it depends on what happens to the part next. Oxygen is faster and more economical on heavy plate but leaves an oxide skin that paint struggles to key to. Nitrogen gives a bright, oxide-free edge ready to weld or coat. Tell us the downstream process and we choose the gas.'],
        ['Will I need to grind the edge before welding or painting?',
            'Not if we cut it with nitrogen. Oxygen-cut heavy plate carries a thin oxide layer that is normally wire-brushed or ground before paint — say so when you order and we cut accordingly.'],
        ['Do you cut hot-rolled and cold-rolled?',
            'Both. HR plate carries mill scale and needs different parameters from clean CR sheet, so we set up for the stock you actually send rather than an ideal surface.'],
        ['What tolerance can you hold on mild steel?',
            'Typically +/-0.1 mm on sheet up to 6 mm. Heavier plate widens with the kerf and the heat-affected zone, so we quote the achievable tolerance with the part rather than promising one figure for every thickness.'],
        ['Do you cut chequered plate?',
            'Yes, for flooring, treads and covers. The raised pattern changes the head height, so mention that it is chequered when you enquire.'],
        ['What file format should I send?',
            'DXF is ideal. DWG, STEP, PDF and even a clear photograph or hand sketch all work — we convert them into a cutting file and send it back for your approval before anything is cut.'],
        ['How much does mild steel laser cutting cost?',
            'Priced per job. Cutting is charged by the distance the beam travels and the thickness it travels through, so a 25 mm plate part takes far longer than the same outline in 3 mm. Send the drawing, grade, thickness and quantity for an itemised quote within 24 business hours.'],
    ],
}

/** True when this slug array is the mild steel pillar for a valid city. */
export function resolveMildSteel(citySlug, slugArray) {
    const city = getCity(citySlug)
    if (!city || !Array.isArray(slugArray) || slugArray.length !== 1) {
        return { city: null, mildSteel: null }
    }
    // Exact match only, so no locality variant can resolve here.
    if (slugArray[0] !== MILD_STEEL_SLUG) return { city, mildSteel: null }
    return { city, mildSteel: MILD_STEEL }
}

export const mildSteelUrl = (citySlug) => `/${citySlug}/${MILD_STEEL_SLUG}`

/** Headline and search snippet, per city. */
export function mildSteelCopy(city) {
    const place = city.name
    return {
        h1: `Mild Steel Laser Cutting Services in ${place}`,
        // The layout template appends " | RG Tech Engineering Works", so this
        // must NOT include the brand or it renders twice.
        metaTitle: `Mild Steel Laser Cutting Services in ${place}`,
        metaDescription:
            `Get precision mild steel laser cutting services in ${place} from RG Tech Engineering Works. MS sheet and plate cut up to 45mm with clean edges, tight tolerances and fast turnaround.`,
        canonical: mildSteelUrl(city.slug),
        url: `${BASE_URL}${mildSteelUrl(city.slug)}`,
    }
}

export function mildSteelMetadata(citySlug) {
    const city = getCity(citySlug)
    if (!city) return {}
    const c = mildSteelCopy(city)

    return {
        title: c.metaTitle,
        description: c.metaDescription,
        alternates: { canonical: c.canonical },
        openGraph: {
            title: `${c.metaTitle} | RG Tech Engineering Works`,
            description: c.metaDescription,
            url: c.url,
            type: 'website',
            images: [{ url: MILD_STEEL.heroImage, width: 1600, height: 1330, alt: MILD_STEEL.heroAlt }],
        },
        twitter: {
            card: 'summary_large_image',
            title: `${c.metaTitle} | RG Tech Engineering Works`,
            description: c.metaDescription,
            images: [MILD_STEEL.heroImage],
        },
    }
}

/*
 * Structured data. faqs are stored as [question, answer] pairs because that is
 * what reads cleanly above; faqPageSchema wants {q, a}.
 */
export function mildSteelGraph(citySlug) {
    const city = getCity(citySlug)
    if (!city) return null
    const c = mildSteelCopy(city)

    const service = {
        '@type': 'Service',
        '@id': `${c.url}#service`,
        name: c.h1,
        serviceType: 'Mild steel laser cutting',
        description: c.metaDescription,
        provider: { '@id': ORG_ID },
        areaServed: { '@type': 'City', name: city.name },
        url: c.url,
        hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: `Mild steel laser cutting in ${city.name}`,
            itemListElement: MILD_STEEL.subServices.map((s) => ({
                '@type': 'Offer',
                itemOffered: { '@type': 'Service', name: s.name, description: s.desc },
            })),
        },
    }

    return jsonLdGraph(
        service,
        breadcrumbSchema(
            [{ name: 'Home', url: BASE_URL }, { name: c.h1, url: c.url }],
            c.url
        ),
        faqPageSchema(MILD_STEEL.faqs.map(([q, a]) => ({ q, a })), c.url)
    )
}
