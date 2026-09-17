/**
 * Picture-led design galleries for individual deities, served at
 * /designs/gods/<slug>.
 *
 * Deliberately separate from lib/gods.js. That module drives the city deity
 * pages (/chennai/vinayagar-laser-cutting-services) — sales pages built around
 * copy, specs and one shared panel image. This is a gallery: the images are the
 * page. Keeping them apart also lets each use the name its audience searches
 * for. The city routes use the Tamil "vinayagar"; people looking for pictures
 * search "ganesh", so that is the slug here. Neither naming scheme has to bend
 * to the other.
 *
 * `godKey` links back to lib/gods.js where an equivalent exists, so this page
 * can point at the city pages without duplicating their copy.
 *
 * ── ADDING IMAGES ────────────────────────────────────────────────────────────
 * 1. Put the files in  public/gallery/gods/<slug>/
 *    It must be under public/gallery — scripts/upload-to-cloudinary.mjs only
 *    walks INCLUDE_DIRS ('gallery', 'works', 'services'). A folder anywhere
 *    else is skipped silently, and because *.jpg/png go through Git LFS the
 *    deployed site would then serve a 130-byte pointer instead of the photo.
 * 2. npm run cloudinary:migrate
 * 3. Paste the resulting Cloudinary URLs into `images` below.
 *
 * A deity with an empty `images` array still renders, so the route can be
 * opened and checked, but it is marked noindex and kept out of the sitemap —
 * see app/designs/gods/[god]/page.js. Both flip automatically once the first
 * image is added; there is no second switch to remember.
 */

import { GODS, GOD_GROUPS, FAITHS, getGod } from '@/lib/gods'
import { GOD_DESIGN_SEEDS } from '@/lib/godDesignSeeds'
import { buildBlurb, buildFaqs, buildMetaDescription } from '@/lib/godDesignCopy'
import { PANEL_VARIANTS, variantFromFile } from '@/lib/godDesignVariants'
import manifest from '@/lib/cloudinaryManifest.json'

/** Matches the IMG constant in content/lib/images.mjs. */
const CDN = 'https://res.cloudinary.com/o1ytbfuz/image/upload'

/**
 * Deities cross-linked from the foot of a design page.
 *
 * Keys into GODS in lib/gods.js. Only the ones people actually search for as
 * metal panel designs — the full 50-deity list belongs on the city pages, not
 * repeated at the bottom of every gallery.
 */
/*
 * Candidates for the "other deity panels" strip, most-searched first.
 *
 * Longer than the eight tiles the strip shows, deliberately: the current
 * gallery is removed from its own strip, so a list of exactly eight left seven
 * tiles and a hole in the 4x4 grid. The extras are spares — crosslinkDesigns()
 * takes the first eight that survive the filter.
 */
/*
 * Keyed by faith. This was one Hindu list, written when every gallery was
 * Hindu — so once the Christian and Islamic sets landed, a Mother Mary page
 * and a mihrab arch page both ended in "Other deity laser cut panels:
 * Murugan, Shiva, Lakshmi…". A gallery only cross-links within its own faith.
 */
export const CROSSLINK_GODS = {
    hindu: [
        'murugan', 'shiva', 'lakshmi', 'saraswati',
        'hanuman', 'krishna', 'durga', 'perumal',
        'vinayagar', 'nataraja', 'ayyappa', 'meenakshi-amman',
    ],
    christian: [
        'jesus-christ', 'mother-mary', 'velankanni-matha', 'holy-cross',
        'sacred-heart', 'st-antony', 'holy-family', 'last-supper',
        'holy-spirit-dove', 'church-arch',
    ],
    islamic: [
        'islamic-geometric-jali', 'mihrab-arch', 'masjid-silhouette', 'arabesque-panel',
        'moroccan-screen', 'star-and-crescent', 'kaaba-silhouette',
    ],
}

/** How many tiles the strip shows: two rows of four. */
export const CROSSLINK_COUNT = 8

/**
 * @typedef  {Object} GodDesignImage
 * @property {string} src       Cloudinary URL, no file extension (the loader
 *                              appends f_auto/q_auto and picks the format).
 * @property {string} title     Shown on hover and in the lightbox.
 * @property {string} material  Finish depicted, e.g. 'Stainless Steel 304'.
 * @property {number} width     True pixel width, from cloudinaryManifest.json.
 * @property {number} height    True pixel height — next/image needs the real
 *                              ratio or the grid reflows as images load.
 */

/**
 * Hand-written galleries.
 *
 * An entry here wins over anything generated for the same godKey, so upgrading
 * a page from templated copy to written copy means adding it to this array and
 * nothing else. Ganesh is the reference: if you are writing a second one, copy
 * its shape.
 */
const HAND_WRITTEN = [
    {
        slug: 'ganesh',
        name: 'Lord Ganesh',
        godKey: 'vinayagar',
        alsoKnownAs: ['Ganesha', 'Vinayagar', 'Pillaiyar'],
        placements: ['pooja room screens', 'main gate inserts', 'temple arches', 'wall art'],
        /*
         * The Tamil names sit inside the sentence rather than in a strip of
         * synonyms under the hero. Same search coverage for vinayagar and
         * pillaiyar, but it reads as a description instead of a keyword list,
         * and it is the one line on the page Google is most likely to quote.
         */
        // The blurb runs long because it is the hero lead; the description is
        // written separately to stay inside Google's ~160 character cut.
        metaDescription:
            'Laser cut Lord Ganesh panels — Vinayagar and Pillaiyar designs — for ' +
            'pooja rooms, gates and temple arches. Mild steel, stainless steel, ' +
            'brass and copper, cut in Chennai.',
        blurb:
            'Laser cut Lord Ganesh panels — Vinayagar and Pillaiyar designs — ' +
            'for pooja rooms, main gates, temple arches and wall art. Cut from ' +
            'mild steel, stainless steel, brass and copper, in sizes from a 1 ft ' +
            'pooja room panel up to a full 8 ft arch.',
        /*
         * Design renders, not photographs of delivered panels. `material`
         * names the finish each render depicts so the page says what it is
         * showing — it is not a record of a job that shipped.
         *
         * width/height are the real pixel dimensions from the Cloudinary
         * manifest. next/image needs the true aspect ratio or it reserves a
         * wrongly-shaped box and the grid jumps as each image loads.
         */
        /*
         * Written for this page specifically. lib/godPage.js has its own
         * godFaqs() covering the generic deity questions across 200 city
         * pages; repeating those here would be duplicate content competing
         * with them.
         *
         * Split three/five on purpose. The first three answer what someone is
         * looking at -- the catalogue above -- and the remaining five answer
         * who is cutting it, which is the half a picture cannot carry. The
         * Vinayagar and Pillaiyar names are worked into the answers rather
         * than listed as a strip of synonyms under the hero: the same search
         * coverage, but reading as sentences a customer would actually ask.
         *
         * Every claim here has a source in the site: bed size and material
         * range from lib/data.js, the delivery cities from lib/cities.js,
         * quote turnaround and opening hours from the organisation schema.
         * Nothing about volumes, years in business or customer counts, which
         * nothing in the repo establishes.
         */
        faqs: [
            // ── The designs on this page ────────────────────────────────
            {
                q: 'Are the Ganesh designs on this page ready to order?',
                a: 'Yes. Every panel carries a reference code, GAN-01 through GAN-07. Send that code on WhatsApp and we come back with sizes, material options and pricing for it. The images are design renders rather than photographs of delivered jobs, so the finish named under each one is the finish that design depicts — the same cutting file can be run in any material we stock.',
            },
            {
                q: 'What sizes and thicknesses can a laser cut Ganesh panel be made in?',
                a: 'Anything from a 1 ft pooja room panel to a full 8 ft temple arch. Our bed takes sheets up to 8000 x 2500 mm, so a large Vinayagar panel is cut in one piece with no welded join running through the design. Interior screens are typically 1.5 mm to 3 mm; exterior panels and gate inserts generally need 3 mm or more to stay flat and resist wind load.',
            },
            {
                q: 'Will the fine detail in the crown and ornaments hold together?',
                a: 'That is the main thing we check before cutting. Once metal is removed, thin ornamental strands can be left floating or too weak to stay flat. We add discreet bridges where needed and, on very fine designs, suggest a slightly thicker sheet so the pattern keeps its shape. It matters most on backlit panels like GAN-01 and GAN-02, which are mounted on standoffs with an LED strip behind them and read best with a bolder design and fewer very fine gaps.',
            },

            // ── RG Tech Engineering Works ───────────────────────────────
            {
                q: 'Where are RG Tech\'s Ganesh panels cut?',
                a: 'In our own workshop in Chennai, on our CNC fiber laser — the panels are not brokered out to a third party. That is also why an 8 ft Vinayagar arch comes out in a single piece: the 8000 x 2500 mm bed takes the full sheet in one setup, so there is no welded joint running through the deity.',
            },
            {
                q: 'Does RG Tech deliver Vinayagar panels outside Chennai?',
                a: 'Yes. Panels are cut in Chennai and delivered across Tamil Nadu, including Coimbatore, Madurai and Salem. Cutting in one place keeps the finish consistent — the same machine, the same operator and the same powder coating line whichever city the panel is going to.',
            },
            {
                q: 'Does RG Tech finish the panel, or only cut it?',
                a: 'Both, and you can stop at whichever stage you need. Cutting, bending, welding and powder coating are all in house, so a panel can leave as a bare cut sheet or arrive framed, coated and ready to mount. Cut-only panels usually ship in 3 to 5 working days once the design is approved; framed and powder coated panels take 7 to 12 working days, because coating cure time cannot be rushed without hurting durability.',
            },
            {
                q: 'Can RG Tech cut a Pillaiyar design from my own photo or temple reference?',
                a: 'Yes, and it is most of what we do here. Send a photograph, a temple image or even a rough sketch on WhatsApp and we convert it into a cutting-ready vector. Detailed source images usually need small connecting bridges added before they can be cut — we handle that and show you the adjusted design for approval before anything is cut. Vinayagar, Pillaiyar and Ganesha are the same deity, so whichever name and whichever reference you bring, the process is identical.',
            },
            {
                q: 'What else does RG Tech Engineering cut?',
                a: 'Deity panels are one part of it. The same fiber laser and finishing line produce designer gates, jali and partition screens, compound wall inserts, signage and industrial job work in mild steel, stainless steel, aluminium, brass and copper. Send a drawing with material and quantity and a firm, itemised quote comes back within 24 business hours, Monday to Saturday.',
            },
        ],
        /** @type {GodDesignImage[]} */
        images: [
            {
                src: `${CDN}/v1789463822/rg-tech/gallery/gods/ganesh/ganesh-lotus-backlit-panel`,
                title: 'Backlit Lotus Panel',
                material: 'Golden PVD on stainless steel',
                width: 1536,
                height: 2752,
            },
            {
                src: `${CDN}/v1789463822/rg-tech/gallery/gods/ganesh/ganesh-minimal-backlit-panel`,
                title: 'Backlit Minimal Panel',
                material: 'Golden PVD on stainless steel',
                width: 1536,
                height: 2752,
            },
            {
                src: `${CDN}/v1789463822/rg-tech/gallery/gods/ganesh/ganesh-mandala-bold-panel`,
                title: 'Bold Mandala Panel',
                material: 'Black powder coated mild steel',
                width: 1536,
                height: 2752,
            },
            {
                src: `${CDN}/v1789463821/rg-tech/gallery/gods/ganesh/ganesh-lotus-seated-panel`,
                title: 'Seated Lotus Panel',
                material: 'Black powder coated mild steel',
                width: 1536,
                height: 2752,
            },
            {
                src: `${CDN}/v1789463821/rg-tech/gallery/gods/ganesh/ganesh-om-motif-panel`,
                title: 'Om Motif Panel',
                material: 'Black powder coated mild steel',
                width: 1536,
                height: 2752,
            },
            {
                src: `${CDN}/v1789463821/rg-tech/gallery/gods/ganesh/ganesh-dancing-panel`,
                title: 'Dancing Ganesh Panel',
                material: 'Black powder coated mild steel',
                width: 1536,
                height: 2752,
            },
            {
                src: `${CDN}/v1789463821/rg-tech/gallery/gods/ganesh/ganesh-frontal-framed-panel`,
                title: 'Classic Framed Panel',
                material: 'Black powder coated mild steel',
                width: 1536,
                height: 2752,
            },
        ],
    },
]

/**
 * A gallery for every god, symbol and fixture in GODS.
 *
 * Generated entries start with no images, which is the point: the route exists
 * so it can be opened and checked, and app/designs/gods/[god]/page.js keeps it
 * noindex and out of the sitemap until the first image lands. Both flip on
 * their own, so a gallery goes live by adding pictures and nothing else — no
 * second switch, no list to remember to update.
 *
 * Slug is the god key. The key already reads as a URL (`radha-krishna`,
 * `meenakshi-amman`) and reusing it means the design gallery and the city pages
 * cannot drift apart. The one exception is Ganesh, which is hand-written and
 * deliberately slugged `ganesh` rather than `vinayagar`: people searching for
 * pictures type the Sanskrit name, and lib/godDesigns' header explains why the
 * two naming schemes are allowed to differ.
 */
/**
 * Images for a generated gallery, read straight out of the Cloudinary manifest.
 *
 * There is no list to maintain and no URLs to paste: drop files into
 * public/gallery/gods/<slug>/, run `npm run cloudinary:migrate`, and the page
 * fills itself on the next build. The manifest already carries the publicId,
 * the version and the true pixel dimensions, which is everything an entry
 * needs — and taking the dimensions from there rather than typing them means
 * they cannot drift from the file on disk and reflow the strip.
 *
 * Order follows PANEL_VARIANTS rather than the filesystem, so GAN-01 is the
 * same design on every gallery and reference codes stay comparable.
 */
function manifestImages(slug) {
    const prefix = `/gallery/gods/${slug}/`
    const found = []

    for (const [path, meta] of Object.entries(manifest)) {
        if (!path.startsWith(prefix) || meta.resourceType !== 'image') continue
        const file = path.slice(prefix.length)
        if (file.includes('/')) continue

        const variant = variantFromFile(slug, file)
        if (!variant) continue

        found.push({
            order: PANEL_ORDER.indexOf(variant.key),
            src: `${CDN}/v${meta.version}/${meta.publicId}`,
            title: variant.title,
            material: variant.material,
            width: meta.width,
            height: meta.height,
        })
    }

    return found
        .sort((a, b) => a.order - b.order)
        .map(({ order, ...img }) => img)
}

function generatedDesign(god, seed) {
    const entry = {
        slug: god.key,
        name: god.name,
        godKey: god.key,
        kind: seed.kind,
        alsoKnownAs: seed.alsoKnownAs,
        placements: seed.placements,
        images: manifestImages(god.key),
    }
    return {
        ...entry,
        blurb: buildBlurb(entry),
        metaDescription: buildMetaDescription(entry),
        faqs: buildFaqs(entry),
    }
}

const PANEL_ORDER = PANEL_VARIANTS.map((v) => v.key)

const handWrittenKeys = new Set(HAND_WRITTEN.map((d) => d.godKey))

export const GOD_DESIGNS = [
    ...HAND_WRITTEN,
    ...GODS.flatMap((god) => {
        if (handWrittenKeys.has(god.key)) return []
        const seed = GOD_DESIGN_SEEDS.find((x) => x.key === god.key)
        // No seed means no gallery rather than a generic one: a page that
        // cannot say where its panels get fixed has nothing to say at all.
        if (!seed) return []
        return [generatedDesign(god, seed)]
    }),
]

/**
 * Every published gallery, bucketed by the groups in lib/gods.js.
 *
 * Drives /designs/gods and, with `faith` given, each of the three faith
 * index pages. Galleries with no images are left out for
 * the same reason they are noindex: an index page whose tiles lead to "coming
 * soon" pages is worse than a shorter index. Empty groups are dropped too, so
 * the page cannot render a heading with nothing under it while the set is
 * being filled in.
 */
export function godDesignGroups(faith) {
    const order = new Map(GODS.map((g, i) => [g.key, i]))

    return GOD_GROUPS.map((group) => {
        // Which faith a group belongs to is read off its subjects rather than
        // declared twice — a group only ever holds one faith's subjects.
        const groupFaith = GODS.find((g) => g.group === group)?.faith || 'hindu'

        const designs = GOD_DESIGNS.filter((d) => {
            if (d.images.length === 0) return false
            const god = getGod(d.godKey)
            if (god?.group !== group) return false
            return !faith || god.faith === faith
        })
            .sort((a, b) => (order.get(a.godKey) ?? 0) - (order.get(b.godKey) ?? 0))
            .map((d) => ({
                slug: d.slug,
                name: d.name,
                href: godDesignUrl(d.slug),
                image: thumbFor(d.slug, d),
                count: d.images.length,
            }))

        return { group, faith: groupFaith, designs }
    }).filter((section) => section.designs.length > 0)
}

/**
 * The faith tabs across the top of the design indexes.
 *
 * Counted from the full, unfiltered set, so the numbers read the same on
 * /designs/gods and on each faith page — the tab says how many Christian
 * galleries exist, not how many are on the page you are standing on. Only
 * faiths with published galleries get a tab; a tab that leads to a 404 is
 * worse than no tab.
 */
export function faithTabs() {
    const sections = godDesignGroups()
    return FAITHS.map((f) => ({
        slug: f.slug,
        label: f.label,
        href: `/designs/gods/${f.slug}`,
        count: sections
            .filter((s) => s.faith === f.slug)
            .reduce((n, s) => n + s.designs.length, 0),
    })).filter((f) => f.count > 0)
}

export const getGodDesign = (slug) =>
    GOD_DESIGNS.find((d) => d.slug === String(slug || '').toLowerCase()) || null

export const godDesignUrl = (slug) => `/designs/gods/${slug}`

/**
 * Only galleries that actually have pictures. Drives the sitemap and the
 * indexability switch — an empty gallery is thin content and does not belong
 * in either.
 */
export const publishedGodDesigns = () => GOD_DESIGNS.filter((d) => d.images.length > 0)

/**
 * Catalogue reference shown on each card, e.g. GAN-01.
 *
 * Derived from the slug and position rather than stored, so it cannot drift
 * out of sync with the list. The trade-off is that reordering `images`
 * renumbers everything — fine while these are only quoted in a live WhatsApp
 * chat, but if a code ever goes on a quote or invoice, move it into the image
 * entry so it is fixed.
 */
export function designRef(design, index) {
    const prefix = design.slug.slice(0, 3).toUpperCase()
    return `${prefix}-${String(index + 1).padStart(2, '0')}`
}

/**
 * Cards for the "other deity designs" strip.
 *
 * Each entry points at a design gallery when that deity has one, and falls
 * back to its Chennai city page otherwise — Chennai because it is the primary
 * market and the page that actually exists for all 50 deities. Deities without
 * their own gallery borrow a representative panel image, so the strip is never
 * broken while the galleries are being built out one at a time.
 */
/**
 * The tile image for a gallery.
 *
 * Prefers a purpose-made `<slug>-thumb.jpg`: the tiles are 4:3 landscape and
 * the panels are 3:5 portrait, so using a panel here cropped away most of the
 * design and cut the figure off at the crown and the feet. Thumbnails are shot
 * wide with the whole figure in frame for exactly this slot.
 *
 * Falls back to the gallery's first panel where no thumbnail exists yet, so a
 * deity is never tile-less while the set is being filled in.
 */
function thumbFor(slug, gallery) {
    const meta = manifest[`/gallery/gods/${slug}/${slug}-thumb.jpg`]
    if (meta?.resourceType === 'image') return `${CDN}/v${meta.version}/${meta.publicId}`
    return gallery?.images?.[0]?.src || null
}

export function crosslinkDesigns(currentSlug, fallbackImage, faith = 'hindu') {
    const links = (CROSSLINK_GODS[faith] || CROSSLINK_GODS.hindu).map((key) => {
        const god = getGod(key)
        if (!god) return null

        const gallery = GOD_DESIGNS.find((d) => d.godKey === key && d.images.length > 0)
        if (gallery && gallery.slug === currentSlug) return null

        const image = gallery ? thumbFor(gallery.slug, gallery) : fallbackImage

        return {
            key,
            name: god.name,
            /*
             * The old fallback pointed at /chennai/<key>-laser-cutting-services.
             * Those now 301 to a gallery — or to the home page for a deity that
             * has none, which is exactly the case this branch handles. So the
             * fallback was guaranteed to bounce a visitor to the home page. The
             * index is the honest destination: it is where the other galleries
             * are, and it does not pretend this deity has one.
             */
            // The faith's own index, not the all-faiths one, so a stand-in
            // tile on a Christian page does not land on a Hindu-first listing.
            href: gallery ? godDesignUrl(gallery.slug) : `/designs/gods/${faith}`,
            image,
            // Says plainly that the tile is a stand-in, so alt text never
            // claims to show a panel of a deity it does not show.
            isOwnImage: Boolean(gallery),
        }
    })
        .filter(Boolean)

    // Whole rows of four only. The Islamic list is seven long, six once the
    // current page drops out — laid out as-is that is a row of four and a
    // stranded two. Below four there is no full row to protect, so keep all.
    const fullRows = links.length < 4 ? links.length : Math.floor(links.length / 4) * 4
    return links.slice(0, Math.min(CROSSLINK_COUNT, fullRows))
}

/** Alt text that describes the work rather than repeating the page title. */
export function godImageAlt(design, image, index) {
    const material = image.material ? `${image.material} ` : ''
    return `Laser cut ${material}${design.name} design ${index} by RG Tech Engineering`
}
