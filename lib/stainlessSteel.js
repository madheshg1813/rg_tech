import { BASE_URL } from './data'
import { getCity } from './cities'
import { ORG_ID, faqPageSchema, breadcrumbSchema, jsonLdGraph } from './schema'

/*
 * Stainless steel laser cutting — a standalone category pillar.
 *
 * Same arrangement as lib/aluminum.js, lib/copper.js and lib/mildSteel.js:
 * pillars in each city and no locality pages. Deliberately NOT part of
 * pillarServices, which is what drives locality generation — one entry there
 * would turn a category into 800+ thin variants. The city catch-all checks this
 * before the service resolver and matches the exact slug, so "...-in-adyar"
 * 404s by design.
 *
 * ── Why this page exists ──────────────────────────────────────────────────
 * Aluminium, copper and mild steel each had a material pillar. Stainless did
 * not, despite being the second most asked-for metal on the enquiry line. SS
 * appeared only as a passing mention inside
 * /{city}/sheet-metal-laser-cutting-services and /{city}/fabrication-services,
 * neither of which can rank for "stainless steel laser cutting Chennai" because
 * neither is about stainless steel.
 *
 * ── Keeping it distinct ───────────────────────────────────────────────────
 * The copy is grade-led, because grade is what an SS buyer actually decides
 * first and what the other two pages never discuss. Where the mild steel page
 * is about plate thickness and mill scale, and the aluminium page about
 * reflectivity and dross, this one is about 304 vs 316 vs 430, nitrogen edges
 * and heat tint. If any of that drifts toward generic sheet-metal copy, the two
 * pages start competing and Google picks one.
 */

export const STAINLESS_STEEL_SLUG = 'stainless-steel-laser-cutting'

export const STAINLESS_STEEL = {
    slug: STAINLESS_STEEL_SLUG,
    name: 'Stainless Steel Laser Cutting',

    /*
     * Unsplash, pending a photograph of our own bed with stainless on it.
     * Licence: free for commercial use, no attribution required. Checked for
     * third-party branding before use — there is none in frame.
     */
    heroImage:
        'https://images.unsplash.com/photo-1764114235896-034c8772de01',
    heroRatio: 1.20,
    heroAlt:
        'CNC fiber laser cutting head mid-cut on a stainless steel sheet, sparks at the nozzle and the cut skeleton alongside',

    stamp: '304 · 316 · 316L · 430',
    heroBadge: { label: 'Sheet To Plate', value: '0.5 – 25', unit: 'mm' },

    lead:
        'Stainless is bought for the finish as much as the strength, and the cut is where that finish is won or lost. We cut SS from 0.5 mm shim to 25 mm plate on a high-power fiber source, nitrogen-assisted so the edge comes off bright and oxide-free — 304, 316, 316L and 430, up to 8000 x 2500 mm in a single setup.',

    /* Six problems SS buyers actually bring us. Grade and edge colour lead,
     * because those are the two things that come back as complaints. */
    painPoints: [
        {
            icon: 'Layers',
            pain: 'The cut edge comes back discoloured',
            fix: 'Heat tint is what oxygen does to stainless. We cut with nitrogen, which shields the kerf, so the edge arrives bright and needs no polishing before it is seen.',
        },
        {
            icon: 'Shield',
            pain: 'Nobody advises on grade',
            fix: '304 for general work, 316 or 316L where chloride or coastal air is in play, 430 where cost matters more than corrosion. Tell us the environment and we will say which grade the job actually needs.',
        },
        {
            icon: 'Zap',
            pain: 'The protective film is ruined',
            fix: 'PVC-filmed sheet is cut film-on with the parameters set for it, so the face you paid for is still protected when the part reaches you.',
        },
        {
            icon: 'Wind',
            pain: 'Thin sheet distorts',
            fix: 'Stainless holds heat far longer than mild steel. Cut sequencing and nesting spread that heat rather than concentrating it, so 0.5 – 2 mm sheet stays flat as it cools.',
        },
        {
            icon: 'Ruler',
            pain: 'Repeat parts drift batch to batch',
            fix: 'One nest, one setup, one program — part 500 measures the same as part 1. Typically +/-0.1 mm on sheet work.',
        },
        {
            icon: 'Clock',
            pain: 'Quotes take days',
            fix: 'Send the DXF with the grade, thickness and quantity and you get an itemised, engineer-verified quote within 24 business hours — prototype or production.',
        },
    ],

    process: [
        {
            step: '01',
            icon: 'Send',
            title: 'Share your drawing',
            desc: 'A DXF or DWG, a PDF, a photograph or a hand sketch on WhatsApp. Tell us the grade, the thickness, the finish and the quantity.',
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
            desc: 'Cut at our Ayanambakkam unit, deburred where it needs it, and delivered across Tamil Nadu — with bending, welding or polishing if you want it finished.',
        },
    ],

    subServices: [
        { name: 'Stainless steel sheet laser cutting', desc: '0.5 - 6 mm sheet in 304, 316, 316L and 430.' },
        { name: 'Stainless steel plate laser cutting', desc: '8 - 25 mm plate for structural and process work.' },
        { name: 'SS 304 laser cutting', desc: 'The general-purpose grade, for most indoor and dry work.' },
        { name: 'SS 316 & 316L laser cutting', desc: 'Molybdenum-bearing, for coastal, chemical and marine duty.' },
        { name: 'SS 430 laser cutting', desc: 'Ferritic and magnetic, where cost leads and corrosion is mild.' },
        { name: 'Mirror & brushed finish cutting', desc: 'Cut film-on so the decorative face survives the process.' },
        { name: 'Kitchen & food-grade components', desc: 'Worktop cut-outs, trays, covers and hygienic panels.' },
        { name: 'SS jali & decorative screens', desc: 'Perforated partitions, railings and façade panels.' },
        { name: 'Name boards & signage letters', desc: 'Cut lettering and logo plates in brushed or mirror SS.' },
        { name: 'Flanges, gaskets & washers', desc: 'Profile and bolt-hole work cut to drawing.' },
        { name: 'Enclosures & control panel parts', desc: 'Cut-outs, vents and mounting plates in 304 or 316.' },
        { name: 'Prototype & production runs', desc: 'One-offs through to repeat batches, no tooling.' },
    ],

    /*
     * Fifteen questions, written against the way SS is actually searched:
     * grade comparison, edge colour, thickness limits, finish protection, food
     * safety and price. The first six carry the primary keywords.
     */
    faqs: [
        ['Do you offer stainless steel laser cutting in Chennai?',
            'Yes. Stainless steel laser cutting is one of our core services, run from our own unit at Ayanambakkam, Chennai. We cut SS from 0.5 mm sheet to 25 mm plate in 304, 316, 316L and 430, and deliver across Chennai and the rest of Tamil Nadu.'],
        ['What thickness of stainless steel can you cut?',
            'From 0.5 mm shim up to 25 mm plate on the fiber laser. Thin stainless needs heat management more than power — it holds heat far longer than mild steel — so sequencing matters as much as the source rating.'],
        ['Which stainless steel grades do you cut?',
            '304, 316, 316L and 430 as standard, and we will quote 202, 310 or duplex on request. If you are unsure which grade the job needs, tell us where the part will live and we will advise.'],
        ['What is the difference between SS 304 and SS 316 for laser cutting?',
            'They cut almost identically. The difference is service life, not machining: 316 carries molybdenum, which resists chlorides, so it is the grade for coastal Chennai installations, swimming pools, chemical plant and marine work. 304 is the general-purpose choice everywhere else and costs noticeably less.'],
        ['Should I use 316 or 316L?',
            '316L is the low-carbon version. If the part will be welded and then left in a corrosive environment, 316L resists the carbide precipitation that can attack a weld seam. For bolted or unwelded parts, plain 316 is usually sufficient.'],
        ['Can you cut SS 430?',
            'Yes. 430 is ferritic, magnetic and cheaper than 304, and it suits dry indoor work — appliance panels, trims, decorative fittings. It is less corrosion-resistant, so it is the wrong grade for coastal or wet duty.'],
        ['Will the cut edge be discoloured?',
            'Not when it is cut with nitrogen, which is how we cut stainless by default. Nitrogen shields the kerf from oxygen, so the edge comes off bright and oxide-free. Oxygen cutting is faster and cheaper but leaves a straw-to-blue heat tint that has to be polished out before the part is seen.'],
        ['Do I need to polish or deburr the edge afterwards?',
            'Usually not. A nitrogen-cut edge on sheet is clean enough to use as it comes, and we deburr where a part needs handling. Thicker plate and any part with a decorative exposed edge can be linished on request.'],
        ['Can you cut mirror-finish or brushed stainless without scratching it?',
            'Yes. Decorative sheet arrives with a PVC protective film and we cut it film-on, with parameters set for that film, so the face you paid for is still covered when the part reaches you. Say that it is a finished face when you enquire.'],
        ['What tolerance can you hold on stainless steel?',
            'Typically +/-0.1 mm on sheet up to 6 mm. Heavier plate widens with the kerf and the heat-affected zone, so we quote the achievable tolerance alongside the part rather than promising one figure for every thickness.'],
        ['Is laser-cut stainless steel food safe?',
            'The material is — 304 and 316 are the standard food-contact grades. What matters is that the edge is clean and unoxidised, which nitrogen cutting gives you, and that the part is passivated if the specification calls for it. Tell us it is a food-contact part and we will cut and finish accordingly.'],
        ['Do you cut stainless steel jali and decorative screens?',
            'Yes, and it is a large part of what we do. Perforated partitions, railing infills, façade panels and temple screens are cut from our pattern library or from your own artwork, at any scale up to 8000 x 2500 mm.'],
        ['What file format should I send?',
            'DXF is ideal. DWG, STEP, PDF and even a clear photograph or hand sketch all work — we convert them into a cutting file and send it back for your approval before anything is cut.'],
        ['How much does stainless steel laser cutting cost in Chennai?',
            'Priced per job. Cutting is charged by the distance the beam travels and the thickness it travels through, so a 12 mm plate part takes far longer than the same outline in 2 mm. Grade affects the material cost, not the cutting time — 316 sheet costs more than 304 of the same size. Send the drawing, grade, thickness and quantity for an itemised quote within 24 business hours.'],
        ['Can you supply the stainless steel as well as cut it?',
            'Yes. We hold common sizes in 304 and 316 and can source 316L, 430 and decorative finishes. You are also welcome to send your own sheet — tell us the grade and surface condition so we set the machine up for the stock that actually arrives.'],
        ['Do you handle bending and welding after cutting?',
            'Yes. Press braking, TIG welding and assembly are all in-house, so a cut part can leave as a finished component rather than a flat blank. Stainless is TIG welded to keep the heat input down and the discolouration local.'],
    ],
}

/** True when this slug array is the stainless steel pillar for a valid city. */
export function resolveStainlessSteel(citySlug, slugArray) {
    const city = getCity(citySlug)
    if (!city || !Array.isArray(slugArray) || slugArray.length !== 1) {
        return { city: null, stainlessSteel: null }
    }
    // Exact match only, so no locality variant can resolve here.
    if (slugArray[0] !== STAINLESS_STEEL_SLUG) return { city, stainlessSteel: null }
    return { city, stainlessSteel: STAINLESS_STEEL }
}

export const stainlessSteelUrl = (citySlug) => `/${citySlug}/${STAINLESS_STEEL_SLUG}`

/** Headline and search snippet, per city. */
export function stainlessSteelCopy(city) {
    const place = city.name
    return {
        h1: `Stainless Steel Laser Cutting Services in ${place}`,
        // The layout template appends " | RG Tech Engineering Works", so this
        // must NOT include the brand or it renders twice.
        metaTitle: `Stainless Steel Laser Cutting in ${place}`,
        metaDescription:
            `Stainless steel laser cutting in ${place} — SS 304, 316, 316L and 430 cut from 0.5mm to 25mm. Nitrogen-cut bright edges, tight tolerances and a quote in 24 hours.`,
        canonical: stainlessSteelUrl(city.slug),
        url: `${BASE_URL}${stainlessSteelUrl(city.slug)}`,
    }
}

export function stainlessSteelMetadata(citySlug) {
    const city = getCity(citySlug)
    if (!city) return {}
    const c = stainlessSteelCopy(city)

    return {
        title: c.metaTitle,
        description: c.metaDescription,
        alternates: { canonical: c.canonical },
        openGraph: {
            title: `${c.metaTitle} | RG Tech Engineering Works`,
            description: c.metaDescription,
            url: c.url,
            type: 'website',
            images: [{ url: STAINLESS_STEEL.heroImage, width: 1600, height: 1330, alt: STAINLESS_STEEL.heroAlt }],
        },
        twitter: {
            card: 'summary_large_image',
            title: `${c.metaTitle} | RG Tech Engineering Works`,
            description: c.metaDescription,
            images: [STAINLESS_STEEL.heroImage],
        },
    }
}

/*
 * Structured data. faqs are stored as [question, answer] pairs because that is
 * what reads cleanly above; faqPageSchema wants {q, a}.
 */
export function stainlessSteelGraph(citySlug) {
    const city = getCity(citySlug)
    if (!city) return null
    const c = stainlessSteelCopy(city)

    const service = {
        '@type': 'Service',
        '@id': `${c.url}#service`,
        name: c.h1,
        serviceType: 'Stainless steel laser cutting',
        description: c.metaDescription,
        provider: { '@id': ORG_ID },
        areaServed: { '@type': 'City', name: city.name },
        url: c.url,
        hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: `Stainless steel laser cutting in ${city.name}`,
            itemListElement: STAINLESS_STEEL.subServices.map((s) => ({
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
        faqPageSchema(STAINLESS_STEEL.faqs.map(([q, a]) => ({ q, a })), c.url)
    )
}
