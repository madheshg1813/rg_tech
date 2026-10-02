import { BASE_URL } from './data'

/*
 * The /designs catalogue.
 *
 * This is a NATIONAL section, deliberately not city-scoped. The /{city}/... service
 * pages target local service intent ("laser cutting services in Chennai"); every
 * design keyword in the research is generic, with no city in it, because a
 * customer choosing a pattern does not care where it is cut — they care that it
 * ships. So these pages sell the design and the dispatch, and link across to the
 * city pages for anyone who does want a local supplier.
 *
 * Structure follows the keyword data: category at depth one, design at depth two.
 * Volumes in the comments are Google Ads buckets (50/500/5k/50k), so treat them
 * as tiers rather than counts.
 *
 * IMAGES ARE PLACEHOLDERS. Every `images` array below points at existing
 * Cloudinary panels from the gallery so the layout can be judged with real
 * photographs. Swap the ids for the real artwork when it arrives — nothing else
 * needs to change.
 */

const IMG = 'https://res.cloudinary.com/o1ytbfuz/image/upload'
const panel = (v, n) => `${IMG}/${v}/rg-tech/gallery/decorative-metal-panels/rg-tech-catelog-vol-02_page-${n}`

/*
 * Placeholder set — see note above.
 *
 * Each entry is { src, ref }. `ref` is the number the customer quotes when they
 * enquire, so it appears on the card, in the zoom view and in the pre-filled
 * WhatsApp message. Replace these with the real design numbers when the artwork
 * lands; the ref is what tells you which patterns actually sell.
 */
const PLACEHOLDER_IMAGES = [
    { src: panel('v1785176983', '0004'), ref: 'GN-01' },
    { src: panel('v1785176983', '0005'), ref: 'GN-02' },
    { src: panel('v1785176982', '0006'), ref: 'GN-03' },
    { src: panel('v1785176983', '0011'), ref: 'GN-04' },
    { src: panel('v1785176983', '0012'), ref: 'GN-05' },
    { src: panel('v1785176983', '0013'), ref: 'GN-06' },
]

/* Materials offered on every design. Kept here rather than per-design because
 * the answer genuinely is the same for all of them. */
export const DESIGN_MATERIALS = [
    { name: 'Mild steel (MS)', detail: 'The default for gates, screens and outdoor panels. Powder coated in any shade.', thickness: '1.6 – 10 mm' },
    { name: 'Stainless steel 304', detail: 'Outdoor use with no repainting. Bare, brushed or mirror finish.', thickness: '1.2 – 6 mm' },
    { name: 'Stainless steel 316', detail: 'Coastal and high-humidity sites, where 304 would pit.', thickness: '1.2 – 6 mm' },
    { name: 'Brass', detail: 'Pooja rooms and temple work, where the warm colour is the point.', thickness: '1 – 3 mm' },
]

export const DESIGN_FINISHES = [
    'Powder coating in any RAL shade, matt or gloss',
    'Antique brass and copper-tone finishes',
    'Bare stainless, brushed or mirror polished',
    'Primer only, for site painting',
]

export const CATEGORIES = [
    {
        slug: 'gods',
        name: 'God & Deity Designs',
        menuName: 'Gods & Deities',
        // "cnc cutting design god" 500 · "cnc god design" 500 · "laser cutting god design" 500
        tagline: 'Laser cut deity panels for pooja rooms, temple arches and entrances',
        intro:
            'Deity panels are the most requested decorative work we cut. They go into pooja room partitions and doors, temple arches, main gates and wall features — cut from your reference or from our pattern library, in steel or brass, and dispatched anywhere in India.',
        eyebrow: 'Deity Designs',
    },
]

export const DESIGNS = [
    {
        slug: 'ganesh',
        category: 'gods',
        name: 'Ganesh',
        /*
         * One page, four names. The research has separate 500-volume keywords for
         * ganesh, ganesha, ganpati and vinayagar — all the same deity and the same
         * artwork. Splitting them into four pages would be four thin pages
         * competing with each other, so they are aliases on one page instead.
         *
         * Note the site already has /{city}/vinayagar-laser-cutting-services for
         * local intent. This page is the national one; they cross-link.
         */
        aliases: ['Ganesha', 'Ganpati', 'Vinayagar'],
        tagline: 'Ganesh, Ganesha, Ganpati and Vinayagar panels, laser cut to your size',
        summary:
            'Custom Ganesh laser cutting designs cut in mild steel, stainless steel and brass. For pooja room partitions and doors, temple arches, main gates, name boards and wall art — cut to your size from your reference or ours, and delivered across India.',
        /*
         * Search snippet. Separate from `summary`, which is on-page copy and can
         * run long — these are written to the SERP limits:
         *   metaTitle       aim under ~60 chars INCLUDING the "| RG Tech
         *                   Engineering Works" suffix the layout appends
         *   metaDescription under 165 chars, opening with the primary keyword
         */
        metaTitle: 'Ganesh Laser/CNC Cutting Designs',
        metaDescription:
            'Ganesh laser cutting designs cut in mild steel, stainless steel and brass. Custom sizes for pooja rooms, gates and wall art. Delivered across India.',
        /* Heading for the intro block. Per-design rather than a fixed string,
         * because the sentence that reads well above Ganesh copy is not the one
         * that reads well above a jali or a peacock. */
        introEyebrow: 'Made to Order',
        introHeading: 'Every Ganesh panel is cut to your size',
        intro: [
            'Ganesh is the design we are asked for most often, and almost never at a standard size. Every panel is cut to the opening it has to fit, which is why we quote from your measurement rather than from a catalogue.',
            'We cut the outline from a reference image, a temple photograph, a hand sketch or a CAD file. Where a pattern needs bridging so that no part of the figure drops out as scrap, we add it and send the file back for your approval before anything is cut.',
        ],
        /* Where customers actually use this design, from the application keywords. */
        uses: [
            { title: 'Pooja room partition', body: 'Full-height or half screens between the pooja space and the living room, usually 2 – 3 mm with a frame.' },
            { title: 'Pooja room door', body: 'A cut panel set into a wooden or steel door frame, often with a brass or antique finish.' },
            { title: 'Temple arch', body: 'Arched entrance panels and thoranam work, cut in heavier 4 – 6 mm steel for span.' },
            { title: 'Main gate insert', body: 'A Ganesh motif set into a gate leaf or above the entrance, in 4 – 6 mm MS, powder coated.' },
            { title: 'Wall feature', body: 'Standalone wall panels for a hall or entrance lobby, backlit or mounted on stand-offs.' },
            { title: 'Name board', body: 'A house name plate with a Ganesh motif at the head — the most common small order.' },
        ],
        images: PLACEHOLDER_IMAGES,
        /* Keywords this page is written for. Kept in the data so the intent behind
         * the copy is visible when it is next edited. */
        keywords: [
            'cnc ganesh design',
            'ganesh cnc cutting design',
            'ganesh laser cutting design',
            'cnc cutting design ganesh',
            'ganesha cnc design',
            'ganpati cnc design',
            'cnc cutting design ganpati',
            'vinayagar cnc design',
            'vinayagar laser cutting design',
            'laser cutting vinayagar design',
            'cnc cutting ganesh design',
            'laser cutting ganesh cnc design',
        ],
        faqs: [
            ['What sizes can a Ganesh laser cut panel be made in?',
                'Any size up to 8000 x 2500 mm in a single piece, which covers full-height pooja partitions and gate panels without a join. Larger spans are cut in sections with a designed overlap so the joint falls where the pattern hides it.'],
            ['Which material should I choose for a Ganesh panel?',
                'Mild steel powder coated for gates and outdoor screens, stainless 304 for outdoor work with no repainting, 316 near the coast, and brass for pooja rooms where the warm colour matters. Thickness follows the span, not the look.'],
            ['Can you cut a Ganesh design from a photo I send?',
                'Yes. Send a photograph, a temple picture or a rough sketch on WhatsApp. We convert it into a cutting file, add the bridges the pattern needs so no part of the figure drops out, and send it back for your approval before cutting.'],
            ['What thickness is used for a Ganesh decorative panel?',
                'Indoor wall panels and pooja screens are usually 1.6 – 3 mm. Pooja room doors and partitions 3 mm. Gate inserts and temple arches 4 – 6 mm, because they have to carry their own weight over a span.'],
            ['Do you deliver Ganesh panels outside Tamil Nadu?',
                'Yes. Panels are cut at our Chennai unit and dispatched across India, packed flat with edge protection. Share the delivery pincode with your enquiry and freight is quoted with the panel.'],
            ['How much does a Ganesh laser cut panel cost?',
                'It is priced per job, because cutting is charged by the distance the beam travels rather than the panel size. A dense pattern in the same sheet can cost several times a simple one. Send the size, material and a reference image and you get an itemised quote within 24 business hours.'],
            ['Is Ganpati or Vinayagar the same design?',
                'Yes — Ganesh, Ganesha, Ganpati and Vinayagar are the same deity and we cut all of them from the same pattern library. Tell us which regional style you want and we match the reference.'],
            ['How long does a custom Ganesh panel take?',
                'Typically 3 – 5 working days from drawing approval for a single panel, longer for coated or multi-panel orders. We commit to a date in writing at order confirmation.'],
        ],
    },
]

/* ---- lookups ---- */

export const getCategory = (slug) =>
    CATEGORIES.find((c) => c.slug === String(slug || '').toLowerCase()) || null

export const getDesign = (categorySlug, designSlug) =>
    DESIGNS.find(
        (d) =>
            d.category === String(categorySlug || '').toLowerCase() &&
            d.slug === String(designSlug || '').toLowerCase()
    ) || null

export const designsIn = (categorySlug) =>
    DESIGNS.filter((d) => d.category === String(categorySlug || '').toLowerCase())

export const designUrl = (d) => `/designs/${d.category}/${d.slug}`
export const categoryUrl = (c) => `/designs/${c.slug}`
export const designAbsUrl = (d) => `${BASE_URL}${designUrl(d)}`

/**
 * Categories that actually have something in them, with their designs attached.
 *
 * Drives the section nav, the hub listing and the sitemap. A category with no
 * designs is deliberately excluded everywhere: it is a dead end for a visitor
 * and a thin page for Google. Adding the first design to a category lights it up
 * in all three places at once, with no other change.
 *
 * Next categories to add, in keyword-volume order (see the research):
 *   jali      99,150   the largest cluster on the site by a wide margin
 *   pooja     20,550
 *   grill     14,200
 *   gate      12,300
 *   peacock   12,550   motif, cross-cuts the above
 *   flower     9,900
 */
export const navCategories = () =>
    CATEGORIES
        .map((category) => ({ category, designs: designsIn(category.slug) }))
        .filter(({ designs }) => designs.length > 0)

/** Every design name plus its aliases, for the "also known as" line and keywords. */
export const designNames = (d) => [d.name, ...(d.aliases || [])]
