import { BASE_URL } from './data'
import { getCity } from './cities'
import { ORG_ID, faqPageSchema, breadcrumbSchema, jsonLdGraph } from './schema'
import { NAME_ENGRAVING_CITY_CONTENT, relatedFor } from './nameEngravingCities'

/*
 * Name engraving and metal name plates - a standalone service pillar.
 *
 * Same arrangement as lib/stainlessSteel.js: an exact-slug page with no
 * locality variants, kept out of pillarServices so it cannot fan out into
 * hundreds of thin locality pages. The city catch-all checks it before the
 * service resolver, so "...-in-adyar" 404s by design.
 *
 * ── What we actually offer ────────────────────────────────────────────────
 * Confirmed with the business: both processes are in-house -
 *   - surface engraving / laser marking, where text is marked into the face
 *     of the plate without cutting through it, and
 *   - laser-cut lettering, where letters and logos are cut through the sheet
 *     (what the project photographs below show).
 * Copy must not promise anything beyond that: no prices, no turnaround
 * times, no guarantees, no engraving depth or size limits.
 *
 * ── Keeping it distinct ───────────────────────────────────────────────────
 * The material pillars mention "name boards & signage" as one line each. This
 * page owns the nameplate query itself - plate types, lettering, fonts, logos,
 * finishes and fixing - so keep the copy there and out of the material pages.
 */

export const NAME_ENGRAVING_SLUG = 'name-engraving-services'

/*
 * Cities this page is routed in. Each city's catch-all wires the resolver, so
 * this list and the routes must move together.
 *
 * Being routed is not the same as being live: Madurai, Coimbatore and Salem
 * each carry a `releaseAt` (lib/nameEngravingCities.js) and stay 404 until it
 * passes. Use liveNameEngravingCities() for anything that links or lists.
 */
export const NAME_ENGRAVING_CITIES = ['chennai', 'madurai', 'coimbatore', 'salem']

/*
 * Whether a city's page is live at `now`. Chennai has no release time - it is
 * already live. Checked per request (the city routes are dynamic and the
 * sitemap revalidates every five minutes), which is what makes the timed
 * release work with no deploy and no scheduled job.
 *
 * NAME_ENGRAVING_PREVIEW=1 treats every city as live. Local testing only;
 * never set it on Railway.
 */
export function isNameEngravingLive(citySlug, now = new Date()) {
    if (!NAME_ENGRAVING_CITIES.includes(citySlug)) return false
    if (process.env.NAME_ENGRAVING_PREVIEW === '1') return true
    const releaseAt = NAME_ENGRAVING_CITY_CONTENT[citySlug]?.releaseAt
    return !releaseAt || now >= new Date(releaseAt)
}

/** Cities whose page is live right now, in NAME_ENGRAVING_CITIES order. */
export const liveNameEngravingCities = (now = new Date()) =>
    NAME_ENGRAVING_CITIES.filter((c) => isNameEngravingLive(c, now))

/*
 * Genuine RG Tech nameplate work, from lib/works.js. Local public paths,
 * resolved through lib/cloudinary.js at render time. `rot` corrects photos
 * saved sideways with no EXIF tag (see the note in lib/cloudinary.js).
 */
export const NAME_PLATE_WORKS = [
    {
        src: '/works/sheet-metal-laser-cutting-services/rg-work-13.jpg',
        alt: 'Steel business name plate with a crown logo and script lettering laser-cut through the sheet',
        caption: 'Business name and logo, cut through steel sheet',
    },
    {
        src: '/works/sheet-metal-laser-cutting-services/rg-work-28.jpg',
        rot: 270,
        alt: 'Tamil lettering nameplate laser-cut in red powder-coated steel',
        caption: 'Tamil lettering in red powder-coated steel',
    },
    {
        src: '/works/sheet-metal-laser-cutting-services/rg-work-26.jpg',
        rot: 270,
        alt: 'Welcome nameplate with scroll ends laser-cut in yellow powder-coated steel',
        caption: 'Welcome plate with scroll ends, powder coated',
    },
]

/*
 * Unsplash photographs (free Unsplash licence, no attribution required).
 * They illustrate a type of plate, a process or a finish. Alt text describes
 * exactly what is in frame and never claims the work is ours - the genuine
 * RG Tech jobs are NAME_PLATE_WORKS above.
 *
 * `position` is the object-position used when a portrait frame is cropped
 * into a landscape slot, so the plate itself stays in view.
 */
export const STOCK_IMAGES = {
    engraving: {
        src: 'https://images.unsplash.com/photo-1732257297170-09599f1bbaec',
        // 16:9 source; only the ratio matters, the loader picks the width.
        width: 1600,
        height: 900,
        alt: 'Brass letter templates on an engraving machine bed, used to trace lettering onto metal',
    },
    // An actual metal name plate rather than a bare texture, so the
    // materials section shows what a finished plate looks like.
    material: {
        src: 'https://images.unsplash.com/photo-1783870290669-0b0969402028',
        width: 1500,
        height: 1000,
        alt: 'Oval brass name plate with raised lettering mounted on a red painted surface',
    },
}

/* One photograph per plate type, shown above the type cards. */
export const TYPE_IMAGES = [
    {
        src: 'https://images.unsplash.com/photo-1787979273736-dd7a0f72ec9e',
        position: 'center 85%',
        alt: 'Metal building name plate reading Belvedere Apts mounted on a wall below a lantern',
        label: 'Residential',
    },
    {
        src: 'https://images.unsplash.com/photo-1787068235634-464e710b3e92',
        position: 'center 50%',
        alt: 'Brass plate with a notice in capital letters fixed to a brick wall',
        label: 'Commercial',
    },
    {
        src: 'https://images.unsplash.com/photo-1783870291827-e514e3c4d536',
        position: 'center',
        alt: 'Engineering company name plate with raised lettering and a reference number',
        label: 'Industrial',
    },
]

export const NAME_ENGRAVING = {
    slug: NAME_ENGRAVING_SLUG,
    name: 'Name Engraving',

    heroWork: NAME_PLATE_WORKS[0],
    heroRatio: 4 / 3,

    stamp: 'Engraved · Laser-Cut · Made To Order',
    heroBadge: { label: 'Lettering', value: 'Tamil & English', unit: '' },

    lead:
        'Make every name and detail stand out with custom metal nameplates for homes, offices and industrial applications. Share your requirements with RG Tech Engineering Works for a tailored quotation.',

    /* Two ways the lettering can be made. Both in-house. */
    methods: [
        {
            icon: 'PenTool',
            title: 'Surface engraving',
            desc: 'Text, numbers and logos are laser-marked into the face of the plate without cutting through it. The plate stays one solid piece, which suits door plates, office plaques and equipment identification where the background has to stay intact.',
        },
        {
            icon: 'Scissors',
            title: 'Laser-cut lettering',
            desc: 'Letters and logos are cut right through the sheet, so the name reads as a silhouette against the wall or a backing plate behind it. This is the bolder option for gates, house fronts and shop entrances, and it is what the plates in our photographs above are.',
        },
    ],

    types: [
        { icon: 'Home', name: 'House name plates', desc: 'Family names, house names and door numbers for gates, compound walls and front doors.' },
        { icon: 'Building2', name: 'Office name plates', desc: 'Company names, cabin and department plates, and reception plaques with your logo.' },
        { icon: 'DoorOpen', name: 'Door plates', desc: 'Name and number plates sized for a single door, cabin or apartment entrance.' },
        { icon: 'Factory', name: 'Industrial identification plates', desc: 'Equipment tags, panel labels and machine plates with serials, ratings or asset numbers.' },
    ],

    /* Materials and finishes the site already sells elsewhere. Nothing here
     * that RG Tech does not stock or finish today. */
    materials: [
        { name: 'Stainless steel', desc: '304 for indoor and general use, 316 for coastal and wet locations.' },
        { name: 'Mild steel', desc: 'Economical, and powder coated in the colour you choose.' },
        { name: 'Aluminium', desc: 'Light enough for large plates and easy to fix to most walls.' },
        { name: 'Brass and copper', desc: 'Warm metal tones for pooja rooms, entrances and feature plates.' },
    ],

    finishes: [
        { name: 'Brushed stainless', desc: 'Fine satin grain that keeps fingerprints and glare down.' },
        { name: 'Mirror stainless', desc: 'Reflective face for reception and lobby plaques.' },
        { name: 'PVD gold and rose gold', desc: 'Coloured stainless for a premium entrance plate.' },
        { name: 'Powder coating', desc: 'A wide shade range on mild steel and aluminium.' },
    ],

    customization: [
        { name: 'Names and text', desc: 'Family names, company names, designations and short messages.' },
        { name: 'Tamil and English lettering', desc: 'Either script, or both on one plate.' },
        { name: 'Your choice of font', desc: 'Pick a typeface, or send a sample of the lettering you like.' },
        { name: 'Logos and emblems', desc: 'From a vector file, or traced from an image you send.' },
        { name: 'Door and house numbers', desc: 'Numbers alone, or combined with the name.' },
        { name: 'Decorative elements', desc: 'Borders, motifs and deity symbols around the lettering.' },
        { name: 'Size and shape', desc: 'Rectangular, oval or a custom outline to your drawing.' },
        { name: 'Mounting holes', desc: 'Drilled or cut for screws or stand-off fixings, if you need them.' },
    ],

    applications: [
        { name: 'Homes and apartments', desc: 'Gate and compound wall plates, front doors and flat entrances.' },
        { name: 'Offices', desc: 'Reception walls, cabin doors, conference rooms and directories.' },
        { name: 'Shops and commercial spaces', desc: 'Entrance name boards, welcome plates and brand logos.' },
        { name: 'Factories and plants', desc: 'Machine plates, panel labels and asset identification.' },
    ],

    process: [
        { step: '01', icon: 'MessageCircle', title: 'Enquiry', desc: 'Message us on WhatsApp or the contact form with what the plate is for.' },
        { step: '02', icon: 'ClipboardList', title: 'Requirements', desc: 'Tell us the text, size, material, finish and quantity. Share a logo or reference photo if you have one.' },
        { step: '03', icon: 'FileText', title: 'Quotation', desc: 'We quote against those details. If something is unclear, we ask before pricing it.' },
        { step: '04', icon: 'PenTool', title: 'Design approval', desc: 'You get a layout of the plate to check the spelling, spacing and size. Nothing is made until you approve it.' },
        { step: '05', icon: 'Factory', title: 'Production', desc: 'The plate is engraved or cut on our own machines in Ayanambakkam, finished, checked and handed over.' },
    ],

    /* Only things the business can stand behind: in-house processes, the
     * approval step, and no minimum order (stated across the site). */
    reasons: [
        { icon: 'Settings', title: 'Both processes in-house', desc: 'Surface engraving and laser cutting happen on our own machines, so one workshop handles the whole plate.' },
        { icon: 'CheckCircle', title: 'You approve the layout first', desc: 'Every plate is drawn up and sent for approval before production, so a spelling or spacing mistake is caught on screen, not in metal.' },
        { icon: 'Layers', title: 'Material and finish under one roof', desc: 'Stainless, mild steel, aluminium, brass and copper, with powder coating and stainless finishes, chosen to suit where the plate will be fixed.' },
        { icon: 'Package', title: 'No minimum order', desc: 'One house nameplate is quoted the same way as a set of office door plates or a batch of equipment tags.' },
    ],

    /* Internal links. Every path is an existing Chennai page. */
    related: [
        { href: '/chennai/stainless-steel-laser-cutting', title: 'Stainless Steel Laser Cutting', desc: 'SS 304, 316 and 430 sheet and plate.' },
        { href: '/chennai/laser-cutting-services', title: 'Laser Cutting Services', desc: 'CNC fiber laser cutting in all metals.' },
        { href: '/chennai/decorative-metal-panels', title: 'Decorative Metal Panels', desc: 'Jali, screens and wall panels.' },
        { href: '/chennai/steel-gates', title: 'Steel Gates', desc: 'Laser-cut gate panels and designs.' },
        { href: '/chennai/fabrication-services', title: 'Fabrication Services', desc: 'Bending, welding and finishing.' },
        { href: '/chennai/aluminum-laser-cutting-services', title: 'Aluminium Laser Cutting', desc: 'Lightweight sheet and plate parts.' },
    ],

    faqs: [
        ['Do you offer name engraving services in Chennai?',
            'Yes. Name plates are engraved or laser-cut at our own unit in Ayanambakkam, Chennai, for homes, offices, shops and industrial equipment.'],
        ['What is the difference between engraving and laser-cut lettering?',
            'Engraving marks the text into the surface of the plate, so the plate stays one solid piece. Laser-cut lettering cuts the letters right through the metal, so the name shows as a silhouette. Engraving suits door and office plates; cut lettering suits gates and building fronts.'],
        ['Which materials can my name plate be made in?',
            'Stainless steel, mild steel, aluminium, brass and copper. Stainless 316 is the better choice for coastal or wet locations; powder-coated mild steel is the economical option.'],
        ['What finishes are available?',
            'Brushed and mirror stainless steel, PVD gold and rose gold on stainless, and powder coating in a wide range of shades on mild steel and aluminium.'],
        ['Can I choose the font and the layout?',
            'Yes. Pick a typeface, or send a photo of lettering you like and we will match the style. You approve the full layout before anything is made.'],
        ['Can you engrave in Tamil?',
            'Yes. Tamil, English, or both on the same plate. Send the exact spelling you want so the approval layout matches it.'],
        ['Can you add our company logo?',
            'Yes. A vector file such as AI, SVG, PDF or DXF gives the cleanest result. If you only have an image, send it and we will trace it into a cutting or engraving file for you to approve.'],
        ['What sizes can you make?',
            'Plates are made to the size you ask for, from a small door plate to a large entrance board. Tell us the size, or the space it has to fit, when you enquire.'],
        ['What details should I send for a quotation?',
            'The text, the size, the material and finish you prefer, the quantity, and any logo or reference photo. With those we can quote accurately.'],
        ['How is the price worked out?',
            'It depends on the material, plate size, how much text or detail there is, whether it is engraved or cut, the finish and the quantity. Share your requirements and we send a tailored quotation.'],
        ['Will I see the design before it is made?',
            'Yes, always. We send a layout showing the text, font, spacing and size, and production starts only after you approve it.'],
        ['Is there a minimum order?',
            'No. A single house nameplate is welcome, and so is a batch of office door plates or equipment tags.'],
        ['How is the name plate fixed to the wall?',
            'We can drill mounting holes or prepare the plate for stand-off fixings, depending on the wall and the look you want. Ask about fitting when you enquire.'],
        ['Will the name plate last outdoors?',
            'Choose the material for the location: stainless steel 304 or 316, or powder-coated metal, are made for outdoor use. We will recommend one when you tell us where the plate is going.'],
        ['Can you make identification plates for machines and panels?',
            'Yes. Equipment tags, panel labels and asset plates with serial numbers, ratings or other text, in single pieces or in sets.'],
    ],
}

/*
 * The shared FAQs used on the non-Chennai pages, after each city's own. Picked
 * by question so the Chennai-only ones (the opening question, wall fitting,
 * coastal 316 advice) never appear on a page for another city.
 */
const SHARED_FAQS = [
    'What is the difference between engraving and laser-cut lettering?',
    'What finishes are available?',
    'Can I choose the font and the layout?',
    'Can you add our company logo?',
    'What sizes can you make?',
    'What details should I send for a quotation?',
    'How is the price worked out?',
    'Will I see the design before it is made?',
    'Is there a minimum order?',
]
const TAMIL_FAQ = 'Can you engrave in Tamil?'

/*
 * The full page content for one city. Chennai gets NAME_ENGRAVING as written;
 * the other cities get it overlaid with their own copy from
 * lib/nameEngravingCities.js.
 */
export function nameEngravingFor(citySlug) {
    const local = NAME_ENGRAVING_CITY_CONTENT[citySlug]
    if (!local) return NAME_ENGRAVING

    const base = NAME_ENGRAVING
    const byQ = new Map(base.faqs.map((f) => [f[0], f]))
    const ownText = local.faqs.map(([q]) => q.toLowerCase()).join(' ')
    const shared = SHARED_FAQS
        // Skip a shared question the city already answers in its own words.
        .filter((q) => !(q.includes('logo') && ownText.includes('logo')))
        .map((q) => byQ.get(q))
    // Tamil is covered by the Madurai and Salem copy; elsewhere add the
    // shared answer so every page still says it.
    if (!ownText.includes('tamil')) shared.push(byQ.get(TAMIL_FAQ))

    return {
        ...base,
        lead: local.lead,
        local: local.local,
        localities: local.localities,
        localitiesTitle: local.localitiesTitle,
        localitiesNote: local.localitiesNote,
        materialsLead: local.materialsLead,
        applications: local.applications,
        process: base.process.map((s) =>
            s.step === '05' ? { ...s, desc: local.productionDesc } : s
        ),
        related: relatedFor(citySlug),
        faqs: [...local.faqs, ...shared],
    }
}

/** True when this slug array is the name engraving page for a live city. */
export function resolveNameEngraving(citySlug, slugArray, now = new Date()) {
    const city = getCity(citySlug)
    if (!city || !isNameEngravingLive(city.slug, now)
        || !Array.isArray(slugArray) || slugArray.length !== 1) {
        return { city: null, nameEngraving: null }
    }
    // Exact match only, so no locality variant can resolve here.
    if (slugArray[0] !== NAME_ENGRAVING_SLUG) return { city, nameEngraving: null }
    return { city, nameEngraving: nameEngravingFor(city.slug) }
}

export const nameEngravingUrl = (citySlug) => `/${citySlug}/${NAME_ENGRAVING_SLUG}`

/** Headline and search snippet, per city. */
export function nameEngravingCopy(city) {
    const place = city.name
    const local = NAME_ENGRAVING_CITY_CONTENT[city.slug]
    return {
        h1: `Custom Metal Name Engraving Services in ${place}`,
        // app/layout.js appends " | RG Tech", so the brand stays out of this.
        // Chennai: 47 characters, 57 with the suffix - inside Google's ~60.
        // The other cities carry their own, written to the same limit.
        metaTitle: local?.metaTitle || `Name Engraving Services in ${place} | Name Plates`,
        metaDescription: local?.metaDescription ||
            `Name engraving services in ${place}: custom engraved and laser-cut metal name plates in stainless steel, brass and aluminium for homes, offices and industry.`,
        canonical: nameEngravingUrl(city.slug),
        url: `${BASE_URL}${nameEngravingUrl(city.slug)}`,
    }
}

export function nameEngravingMetadata(citySlug, heroUrl) {
    const city = getCity(citySlug)
    if (!city) return {}
    const c = nameEngravingCopy(city)
    const images = heroUrl
        ? [{ url: heroUrl, width: 1400, height: 1050, alt: NAME_ENGRAVING.heroWork.alt }]
        : undefined

    return {
        title: c.metaTitle,
        description: c.metaDescription,
        alternates: { canonical: c.canonical },
        openGraph: {
            title: `${c.metaTitle} | RG Tech`,
            description: c.metaDescription,
            url: c.url,
            type: 'website',
            ...(images ? { images } : {}),
        },
        twitter: {
            card: 'summary_large_image',
            title: `${c.metaTitle} | RG Tech`,
            description: c.metaDescription,
            ...(heroUrl ? { images: [heroUrl] } : {}),
        },
    }
}

/*
 * Structured data: the service, its offer catalogue (the plate types shown on
 * the page), breadcrumbs and the FAQs. No ratings - the page shows none of its
 * own.
 */
export function nameEngravingGraph(citySlug) {
    const city = getCity(citySlug)
    if (!city) return null
    const c = nameEngravingCopy(city)

    const service = {
        '@type': 'Service',
        '@id': `${c.url}#service`,
        name: c.h1,
        serviceType: 'Name engraving and metal name plates',
        description: c.metaDescription,
        provider: { '@id': ORG_ID },
        areaServed: { '@type': 'City', name: city.name },
        url: c.url,
        hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: `Metal name plates in ${city.name}`,
            itemListElement: nameEngravingFor(city.slug).types.map((t) => ({
                '@type': 'Offer',
                itemOffered: { '@type': 'Service', name: t.name, description: t.desc },
            })),
        },
    }

    return jsonLdGraph(
        service,
        breadcrumbSchema(
            [{ name: 'Home', url: BASE_URL }, { name: c.h1, url: c.url }],
            c.url
        ),
        faqPageSchema(nameEngravingFor(city.slug).faqs.map(([q, a]) => ({ q, a })), c.url)
    )
}
