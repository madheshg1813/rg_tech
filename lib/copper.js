import { BASE_URL } from './data'
import { getCity } from './cities'
import { ORG_ID, faqPageSchema, breadcrumbSchema, jsonLdGraph } from './schema'

/*
 * Copper laser cutting — a standalone category pillar, built to the same shape
 * as lib/aluminum.js. See that file for why this is deliberately NOT part of
 * pillarServices: it would inherit the shared ServiceClient layout and spawn a
 * locality page for every published area, which is 800+ thin variants of a page
 * meant to exist four times.
 *
 * The copy is copper-specific on purpose. Copper reflects more of the beam than
 * any metal we cut and conducts heat away from the kerf faster than aluminium,
 * so the machine problems are genuinely different — and busbar work, which is
 * most of the copper enquiry volume, has requirements no generic cutting page
 * would mention.
 *
 * Thickness is quoted as 0.5–16 mm to match what lib/data.js already states in
 * three places. A pillar page contradicting the site's own spec table is worse
 * than one that repeats it.
 */

export const COPPER_SLUG = 'copper-laser-cutting-services'

export const COPPER = {
    slug: COPPER_SLUG,
    name: 'Copper Laser Cutting',

    heroImage:
        'https://res.cloudinary.com/o1ytbfuz/image/upload/v1788156779/rg-tech/services/copper-laser-cutting-services',
    heroRatio: 1.79,
    heroAlt:
        'CNC fiber laser cutting head slicing a copper sheet on the bed, bright molten edge along the kerf',

    /*
     * Shot vertically on a phone, so it is 9:16. The section below the hero is
     * built around that rather than letterboxing it into a wide box.
     *
     * Delivered through f_auto,q_auto, which takes the 15 MB source down to
     * about 2.6 MB and picks the best codec per browser. The poster is a frame
     * grabbed at one second, so the section paints before any video byte loads.
     */
    video: {
        src: 'https://res.cloudinary.com/o1ytbfuz/video/upload/f_auto,q_auto/rg-tech/services/copper-laser-cutting-process.mp4',
        poster: 'https://res.cloudinary.com/o1ytbfuz/video/upload/so_1,f_auto,q_auto,w_720/rg-tech/services/copper-laser-cutting-process.jpg',
        width: 720,
        height: 1280,
    },

    stamp: 'High-Reflectivity Copper Specialists',

    lead:
        'Copper reflects more of the beam than any metal on our bed and pulls heat out of the kerf as fast as we put it in. We cut it on a fiber source with back-reflection protection and nitrogen assist for a bright, oxide-free edge — copper sheet, plate and busbar from 0.5 to 16 mm, up to 8000 × 2500 mm in a single setup.',

    /* Section 3 — six problems buyers actually bring us, each with what we do
     * about it. Written as pain -> fix so the section is not another feature
     * list. */
    painPoints: [
        {
            icon: 'Zap',
            pain: 'Copper throws the beam straight back',
            fix: 'Copper is the most reflective metal we cut, and it will destroy a source not built for it. Our fiber lasers carry back-reflection protection, so copper sheet cutting runs safely at full power instead of being refused.',
        },
        {
            icon: 'Flame',
            pain: 'Heat escapes before it cuts',
            fix: 'Copper conducts heat away from the kerf faster than aluminium or steel. We pierce with tuned high power density so the cut starts cleanly rather than stalling and blowing a crater in your material.',
        },
        {
            icon: 'Layers',
            pain: 'Oxidised, discoloured edges',
            fix: 'Nitrogen assist gives a bright, oxide-free copper edge that goes straight to plating, tinning, brazing or polishing with no secondary cleaning.',
        },
        {
            icon: 'Ruler',
            pain: 'Busbar holes come back burred',
            fix: 'Copper busbar cutting is bolted, not welded. We cut bolt holes and slots burr-free to drawing so contact faces seat flat and current density is not compromised at the joint.',
        },
        {
            icon: 'Coins',
            pain: 'Offcuts cost real money',
            fix: 'Copper is the most expensive stock on the floor. Every job is nested for material yield before it runs, and we return your offcuts with the parts.',
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
            desc: 'A DXF or DWG, a PDF drawing, a photograph or a hand sketch on WhatsApp. Tell us the copper grade, the thickness and the quantity.',
        },
        {
            step: '02',
            icon: 'FileText',
            title: 'We produce the cutting file',
            desc: 'We convert it to a cutting-ready file, nest it tight to protect your material cost and add any bridging the pattern needs, then send it back for your approval before the machine runs.',
        },
        {
            step: '03',
            icon: 'Truck',
            title: 'We cut, finish and deliver',
            desc: 'Cut on the fiber laser at our Ayanambakkam unit, edges checked, interleaved so the faces do not tarnish against each other, and delivered across Tamil Nadu.',
        },
    ],

    /* Section 5 — the sub-categories. Each of these is a line of work we
     * already run and a phrase buyers actually search, not an aspiration. */
    subServices: [
        { name: 'Copper sheet laser cutting', desc: '0.5 – 16 mm in C11000 ETP, C10100 OFHC and C12200 DHP.' },
        { name: 'Copper plate cutting', desc: 'Heavier sections cut flat and square to drawing.' },
        { name: 'Copper busbar cutting & drilling', desc: 'Panel busbars, links and lugs with burr-free bolt holes.' },
        { name: 'Earthing strips & terminals', desc: 'Earthing plates, strips and cable lugs to spec.' },
        { name: 'Copper jali & decorative screens', desc: 'Partitions, temple work and feature panels.' },
        { name: 'Copper nameplates & signage', desc: 'Letters, logos and etched-look sign faces.' },
        { name: 'Copper gaskets & washers', desc: 'Sealing rings, shims and spacers cut to tolerance.' },
        { name: 'Heat sink & heat exchanger parts', desc: 'Fins, base plates and cooling components.' },
        { name: 'Brass & copper feature panels', desc: 'Cladding and elevation panels in both metals.' },
        { name: 'Copper foil & thin-gauge cutting', desc: 'Shim stock and shielding down to 0.5 mm.' },
        { name: 'Transformer & switchgear parts', desc: 'Connectors, links and contact plates.' },
        { name: 'Prototype & one-off copper parts', desc: 'Single pieces cut from your drawing, no tooling.' },
    ],

    faqs: [
        ['What thickness of copper can you laser cut?',
            'From 0.5 mm foil-gauge sheet up to 16 mm plate on the fiber laser, which is the same range we quote for brass. Copper conducts heat away from the kerf far faster than steel, so beyond 16 mm the edge quality stops justifying the gas and cycle time — we will quote plasma or waterjet instead and tell you which suits the part.'],
        ['Which copper grades do you cut?',
            'The stock actually available in India: C11000 ETP copper for busbars and general sheet metal work, C10100 OFHC where conductivity or vacuum-brazing matters, and C12200 DHP for plumbing and heat exchanger parts. We cut brass alongside it. Tell us the grade with your enquiry — it changes the cutting parameters and the price.'],
        ['Can you laser cut copper busbars for electrical panels?',
            'Yes, and it is most of our copper volume. Copper busbar cutting is bolted rather than welded, so bolt holes, slots and radii are cut burr-free to your drawing and the contact faces seat flat. Send the panel GA or the busbar drawing with the current rating and we will confirm the section before cutting.'],
        ['Will the cut edge be oxidised or need deburring?',
            'No. We cut copper with nitrogen assist, which gives a bright, oxide-free edge with minimal dross — ready for tinning, plating, brazing or polishing without a secondary operation. Heavier plate may carry a light burr, which we remove before dispatch.'],
        ['Do you cut decorative copper jali, screens and cladding?',
            'Yes. Perforated copper jali, partition screens, temple and pooja room panels, elevation cladding and backlit feature walls. Copper develops a patina outdoors, so tell us whether you want it lacquered to hold the bright finish or left to weather naturally.'],
        ['What file format should I send?',
            'DXF is ideal. DWG, STEP, PDF and even a clear photograph or hand sketch all work — we convert them into a cutting file and send it back for your approval before anything is cut.'],
        ['How much does copper laser cutting cost?',
            'It is priced per job. Cutting is charged by the distance the beam travels rather than the size of the sheet, so a dense perforated jali costs several times a simple gasket cut from the same stock. Copper stock itself is the bigger variable — it is the most expensive metal on our floor, which is why every job is nested for yield. Send the drawing, grade and quantity for an itemised quote within 24 business hours.'],
        ['Do you deliver outside Chennai?',
            'Yes. Everything is cut at our Ayanambakkam unit and delivered across Tamil Nadu, including Madurai, Coimbatore and Salem. Copper parts are interleaved so the faces do not mark or tarnish against each other in transit. Share the delivery pincode with your enquiry and freight is quoted with the parts.'],
    ],
}

/** True when this slug array is the copper pillar for a valid city. */
export function resolveCopper(citySlug, slugArray) {
    const city = getCity(citySlug)
    if (!city || !Array.isArray(slugArray) || slugArray.length !== 1) {
        return { city: null, copper: null }
    }
    // Exact match only. "…-in-adyar" must NOT resolve here — this category has
    // pillars and no locality pages.
    if (slugArray[0] !== COPPER_SLUG) return { city, copper: null }
    return { city, copper: COPPER }
}

export const copperUrl = (citySlug) => `/${citySlug}/${COPPER_SLUG}`

/** Headline and search snippet, per city. */
export function copperCopy(city) {
    const place = city.name
    return {
        h1: `Copper Laser Cutting Services in ${place}`,
        // The layout template appends " | RG Tech Engineering Works", so this
        // must NOT include the brand or it renders twice.
        metaTitle: `Copper Laser Cutting Services in ${place}`,
        metaDescription:
            `Precision copper laser cutting services in ${place} from RG Tech Engineering Works. Copper sheet, plate and busbar cutting from 0.5 to 16 mm with clean, oxide-free edges.`,
        canonical: copperUrl(city.slug),
        url: `${BASE_URL}${copperUrl(city.slug)}`,
    }
}

/* Metadata for the Next route. */
export function copperMetadata(citySlug) {
    const city = getCity(citySlug)
    if (!city) return {}
    const c = copperCopy(city)

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
                url: COPPER.heroImage,
                width: 1600,
                height: Math.round(1600 / COPPER.heroRatio),
                alt: COPPER.heroAlt,
            }],
        },
        twitter: {
            card: 'summary_large_image',
            title: `${c.metaTitle} | RG Tech Engineering Works`,
            description: c.metaDescription,
            images: [COPPER.heroImage],
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
export function copperGraph(citySlug) {
    const city = getCity(citySlug)
    if (!city) return null
    const c = copperCopy(city)

    const service = {
        '@type': 'Service',
        '@id': `${c.url}#service`,
        name: c.h1,
        serviceType: 'Copper laser cutting',
        description: c.metaDescription,
        provider: { '@id': ORG_ID },
        areaServed: { '@type': 'City', name: city.name },
        url: c.url,
        hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: `Copper laser cutting in ${city.name}`,
            itemListElement: COPPER.subServices.map((s) => ({
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
        faqPageSchema(COPPER.faqs.map(([q, a]) => ({ q, a })), c.url)
    )
}
