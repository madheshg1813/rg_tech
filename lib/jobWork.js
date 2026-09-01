import { BASE_URL } from './data'
import { getCity, serviceUrl, serviceKeyOf } from './cities'
import { pillarServices } from './data'
import { ALUMINUM, aluminumUrl } from './aluminum'
import { COPPER, copperUrl } from './copper'
import { MILD_STEEL, mildSteelUrl } from './mildSteel'
import { ORG_ID, faqPageSchema, breadcrumbSchema, jsonLdGraph } from './schema'

/*
 * Laser cutting job work — the top-level commercial pillar.
 *
 * This is a hub above the other nine pillars, not another one beside them.
 * Four city pages, no locality variants.
 *
 * ---------------------------------------------------------------------------
 * Why this does not cannibalise /{city}/laser-cutting-services
 *
 * "Job work" is not a service query, it is a commercial-arrangement query. In
 * Indian manufacturing it means subcontract production: a company sends its own
 * material or just a drawing, the job shop cuts it and returns it, and what the
 * buyer is actually comparing is terms — who supplies material, how it is
 * priced, what paperwork comes back, how fast, and whether the shop can take
 * repeat volume.
 *
 * So the split across the site is:
 *   /laser-cutting-services   what the machine can do   (capability)
 *   /laser-cutting-job-work   how you engage us         (commercial terms)
 *
 * This page therefore says almost nothing about cutting capability. Where a
 * capability question comes up it links out to the pillar that owns it, which
 * is also what makes this a hub. The phrase "laser cutting job work" appears in
 * this page's title, H1 and description and in no other page's title.
 *
 * Two existing overlaps to be aware of, neither in an indexed title:
 *   - fabrication-services carries the on-page H1 "Metal Fabrication & Job Work
 *     in Chennai" (its metaTitle does not mention job work)
 *   - laser-cutting-services' meta description ends "Reliable industrial job
 *     work with fast delivery"
 * Narrowing those two would give this page a clean run at the term.
 * ---------------------------------------------------------------------------
 *
 * A note on claims: everything stated here is already stated somewhere on the
 * site (material sourcing, 24-hour quotes, bed size, thickness, GST
 * registration). No new commercial promise — rates, shift capacity, statutory
 * job-work paperwork — has been invented. Confirm before adding any.
 */

export const JOB_WORK_SLUG = 'laser-cutting-job-work'

export const JOB_WORK = {
    slug: JOB_WORK_SLUG,
    name: 'Laser Cutting Job Work',

    heroImage:
        'https://res.cloudinary.com/o1ytbfuz/image/upload/v1788066514/rg-tech/services/laser-cutting-services',
    heroRatio: 0.95,
    heroAlt:
        'CNC fiber laser cutting head running a production nest on a steel sheet at the RG Tech job work unit',

    stamp: 'Subcontract & Bulk Production',
    heroBadge: { label: 'Single Setup', value: '8000 × 2500', unit: 'mm' },

    lead:
        'Send us your material or just the drawing. We cut it on our own fiber laser at Ayanambakkam, check it, and return it on your schedule — one prototype or a repeat production run, with a GST invoice and a delivery challan against every batch.',

    /* The commercial terms. This is the section that makes the page a job work
     * page rather than a second services page — it answers what a buyer
     * comparing subcontractors actually asks. */
    terms: [
        {
            icon: 'Package',
            q: 'Who supplies the material?',
            a: 'Either. Send your own sheet or plate and we cut and return it, or we source it to your specified grade and thickness and quote the metal with the cutting.',
        },
        {
            icon: 'FileText',
            q: 'What do we work from?',
            a: 'A DXF or DWG is ideal. A PDF drawing, a STEP file, a photograph or a hand sketch all work — we convert it, nest it and send it back for approval before the machine runs.',
        },
        {
            icon: 'Layers',
            q: 'Is there a minimum order?',
            a: 'No. A single piece is quoted the same way as a thousand. There is no tooling cost, so a one-off prototype and a repeat batch run on the same setup.',
        },
        {
            icon: 'Clock',
            q: 'How fast is a quote?',
            a: 'Within 24 business hours, itemised and engineer-verified. Cutting is charged by the distance the beam travels and the thickness it travels through, so the drawing decides the price, not the sheet size.',
        },
        {
            icon: 'Ruler',
            q: 'What can the machine take?',
            a: 'Sheets up to 8000 × 2500 mm in a single setup, and thickness to 45 mm in mild steel — so long parts come back without a joint where the tolerance would stack.',
        },
        {
            icon: 'Receipt',
            q: 'What paperwork comes back?',
            a: 'A GST invoice against our registration and a delivery challan with each batch, so your stores and accounts have what they need to book it in.',
        },
    ],

    /* Industries that actually send us job work. Written as who they are and
     * what they send, so a buyer recognises themselves. */
    industries: [
        {
            icon: 'Factory',
            name: 'OEMs & machine builders',
            desc: 'Base plates, brackets, guards and frame components to a fixed drawing, repeated batch after batch.',
        },
        {
            icon: 'Wrench',
            name: 'Sheet metal fabricators',
            desc: 'Overflow capacity when your own machine is loaded, or thickness beyond what it takes.',
        },
        {
            icon: 'Cpu',
            name: 'Electrical panel builders',
            desc: 'Panel faces, gland plates, vents and busbar cut-outs in MS, SS and copper.',
        },
        {
            icon: 'Building2',
            name: 'PEB & structural fabricators',
            desc: 'Gussets, cleats, base plates and connection plates cut from heavy plate.',
        },
        {
            icon: 'Settings',
            name: 'Automotive ancillaries',
            desc: 'Prototype and production sheet parts, jigs and fixture plates.',
        },
        {
            icon: 'Wind',
            name: 'HVAC & ducting',
            desc: 'Flanges, dampers, cabinet panels and ventilation grilles.',
        },
        {
            icon: 'Paintbrush',
            name: 'Signage & display',
            desc: 'Letters, logos, sign faces and backlit panels in steel, aluminium and brass.',
        },
        {
            icon: 'Home',
            name: 'Builders, architects & interior contractors',
            desc: 'Jali screens, facade panels, railings and gate work cut to the drawing on site.',
        },
    ],

    faqs: [
        ['What does laser cutting job work mean?',
            'It is subcontract cutting. You send the material, or just the drawing, and we cut the parts on our machine and return them to you — instead of buying a laser or waiting for capacity on your own. You are engaging the machine and the operator, not buying a finished product.'],
        ['Can I send my own material for cutting?',
            'Yes. Send your sheet or plate with the drawing and we cut and return it. If you would rather not handle procurement we source the metal to your specified grade and thickness and quote it together with the cutting.'],
        ['Is there a minimum order quantity for job work?',
            'No. There is no tooling to pay for, so a single prototype is quoted the same way as a production batch. Plenty of what we cut is one piece.'],
        ['How is laser cutting job work priced?',
            'By the distance the beam travels and the thickness it travels through, not by the size of the sheet. A dense perforated panel costs several times a simple bracket from the same stock. Send the drawing, material, thickness and quantity and the quote comes back itemised within 24 business hours.'],
        ['What is the turnaround on a job work order?',
            'The quote is within 24 business hours of receiving your drawing. Cutting time depends on the nest and the queue, and we commit to a dispatch date in writing at order confirmation rather than giving a general estimate.'],
        ['What paperwork do I get with the parts?',
            'A GST invoice raised against our registration, and a delivery challan with each batch so your stores can book the material in. Tell us at order stage if your accounts team needs anything specific on the documents.'],
        ['Can you handle repeat production runs?',
            'Yes. Once a drawing is approved the file, the nest and the parameters are kept, so a repeat order runs from the same program — part five hundred measures the same as part one, and the quote does not have to be rebuilt each time.'],
        ['Do you do anything beyond cutting?',
            'Yes — bending, welding, grinding and powder coating, so parts can leave finished rather than as flat blanks. If the job needs more than the laser, say so with the enquiry and it is quoted as one line.'],
    ],
}

/* ---- the hub: every category pillar this page links down to ---- */

/**
 * All nine category pillars for a city, with their URLs.
 *
 * This is what makes the page a pillar of pillars: it is the one place that
 * links to every category in one city, so link equity arriving on a broad
 * "job work" query flows down to the specific pages that convert.
 */
export function categoryHub(citySlug) {
    return [
        ...pillarServices.map((svc) => ({
            name: svc.name,
            href: serviceUrl(citySlug, serviceKeyOf(svc)),
            desc: svc.subServices?.length
                ? svc.subServices.slice(0, 2).map((s) => s.name).join(' · ')
                : '',
        })),
        { name: ALUMINUM.name, href: aluminumUrl(citySlug), desc: 'Sheet, panel and decorative work in aluminium' },
        { name: COPPER.name, href: copperUrl(citySlug), desc: 'Busbar, earthing and decorative copper' },
        { name: MILD_STEEL.name, href: mildSteelUrl(citySlug), desc: 'MS sheet and plate to 45 mm' },
    ]
}

/* ---- lookups ---- */

/** Exact-slug match only, so no "-in-{locality}" variant can resolve here. */
export function resolveJobWork(citySlug, slugArray) {
    const city = getCity(citySlug)
    if (!city || !Array.isArray(slugArray) || slugArray.length !== 1) {
        return { city: null, jobWork: null }
    }
    if (slugArray[0] !== JOB_WORK_SLUG) return { city, jobWork: null }
    return { city, jobWork: JOB_WORK }
}

export const jobWorkUrl = (citySlug) => `/${citySlug}/${JOB_WORK_SLUG}`

export function jobWorkCopy(city) {
    const place = city.name
    return {
        h1: `Laser Cutting Job Work in ${place}`,
        // The layout template appends " | RG Tech Engineering Works".
        metaTitle: `Laser Cutting Job Work in ${place}`,
        metaDescription:
            `Laser cutting job work in ${place} on a subcontract basis. Send your material or just the drawing — CNC fiber cutting to 45mm, no minimum order, quote in 24 hours, GST invoice with every batch.`,
        canonical: jobWorkUrl(city.slug),
        url: `${BASE_URL}${jobWorkUrl(city.slug)}`,
    }
}

export function jobWorkMetadata(citySlug) {
    const city = getCity(citySlug)
    if (!city) return {}
    const c = jobWorkCopy(city)

    return {
        title: c.metaTitle,
        description: c.metaDescription,
        alternates: { canonical: c.canonical },
        openGraph: {
            title: `${c.metaTitle} | RG Tech Engineering Works`,
            description: c.metaDescription,
            url: c.url,
            type: 'website',
            images: [{ url: JOB_WORK.heroImage, width: 1519, height: 1600, alt: JOB_WORK.heroAlt }],
        },
        twitter: {
            card: 'summary_large_image',
            title: `${c.metaTitle} | RG Tech Engineering Works`,
            description: c.metaDescription,
            images: [JOB_WORK.heroImage],
        },
    }
}

export function jobWorkGraph(citySlug) {
    const city = getCity(citySlug)
    if (!city) return null
    const c = jobWorkCopy(city)

    const service = {
        '@type': 'Service',
        '@id': `${c.url}#service`,
        name: c.h1,
        serviceType: 'Laser cutting job work',
        description: c.metaDescription,
        provider: { '@id': ORG_ID },
        areaServed: { '@type': 'City', name: city.name },
        url: c.url,
        /* The catalogue is the hub itself — the categories this page feeds. */
        hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: `Laser cutting job work in ${city.name}`,
            itemListElement: categoryHub(city.slug).map((c2) => ({
                '@type': 'Offer',
                itemOffered: { '@type': 'Service', name: c2.name, url: `${BASE_URL}${c2.href}` },
            })),
        },
    }

    return jsonLdGraph(
        service,
        breadcrumbSchema(
            [{ name: 'Home', url: BASE_URL }, { name: c.h1, url: c.url }],
            c.url
        ),
        faqPageSchema(JOB_WORK.faqs.map(([q, a]) => ({ q, a })), c.url)
    )
}
