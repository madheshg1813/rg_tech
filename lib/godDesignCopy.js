/**
 * Copy builder for the design galleries at /designs/gods/<slug>.
 *
 * lib/godDesigns.js carries one hand-written entry (Ganesh). Writing another
 * forty-nine by hand is not realistic, and forty-nine pages carrying the same
 * paragraph verbatim is worse than none — so this composes each gallery's
 * blurb and FAQs from a small per-entry seed instead.
 *
 * ── WHAT MAKES THE PAGES DIFFER ─────────────────────────────────────────────
 * Three things, in descending order of how much they matter:
 *
 *   1. The photographs. They are the page; everything here is the caption.
 *   2. `placements` and `alsoKnownAs` on the seed — real, specific, and
 *      different per entry. They appear in the blurb and in the answers.
 *   3. Deterministic rotation. Each templated answer has three phrasings and
 *      the slug picks one, so two galleries rarely read the same way end to
 *      end.
 *
 * That is mitigation, not a cure. Rotation varies the wording; it does not
 * invent new facts. If a gallery starts earning traffic worth defending, the
 * answer is to hand-write its entry in GOD_DESIGNS, which overrides all of
 * this — see the `overrides` note there. Treat generated copy as the floor a
 * page launches on, not the ceiling it stays at.
 *
 * ── WHAT THE COPY IS ALLOWED TO SAY ─────────────────────────────────────────
 * lib/gods.js sets the rule and it holds here: these are decorative metal
 * panels, not religious artefacts. The copy stays on material, thickness,
 * finish and fixing, and makes no claim about ritual suitability, religious
 * authority, or what a given figure means. That is not ours to make, and it is
 * also what keeps a template honest across fifty subjects — craft facts are
 * true of every panel we cut; iconographic claims would have to be researched
 * one at a time and would be wrong often enough to matter.
 *
 * `kind` exists for the same reason. A third of this list is not a deity at
 * all — Om, Vel, Trishul, Swastik and Kalasam are symbols, and Temple Arch,
 * Pooja Room and friends are fixtures. Calling either "a deity panel" in body
 * copy reads as a template that was never checked.
 */

/** Stable small hash, so a slug always picks the same phrasing. */
function pick(slug, salt, options) {
    let h = salt
    for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0
    return options[h % options.length]
}

/** "Vinayagar and Pillaiyar" — for the blurb, where a list reads badly. */
function namesPhrase(alsoKnownAs = []) {
    if (alsoKnownAs.length === 0) return ''
    if (alsoKnownAs.length === 1) return alsoKnownAs[0]
    return `${alsoKnownAs.slice(0, -1).join(', ')} and ${alsoKnownAs[alsoKnownAs.length - 1]}`
}

/**
 * How the subject is referred to in a sentence.
 *
 * A deity gets its name used attributively ("a Murugan panel"); a symbol and a
 * fixture do not read that way, so they get their own shapes.
 */
function subject(seed) {
    const { name, kind } = seed
    switch (kind) {
        case 'symbol':
            return { panel: `${name} panel`, work: `${name} cutting`, article: 'a' }
        case 'fixture':
            return { panel: `${name.toLowerCase()} panel`, work: `${name.toLowerCase()} work`, article: 'a' }
        default:
            return { panel: `${name} panel`, work: `${name} panel work`, article: 'a' }
    }
}

/*
 * The three placements named in the gallery h1, shortened to headline length.
 *
 * The h1 used to end in a hardcoded "Pooja Rooms, Gates, Arches" — written when
 * every gallery was Hindu. On a Mother Mary or a mihrab panel that is simply
 * wrong, and it is the most prominent line on the page. Driving it from the
 * seed's own placements means a gallery can only ever advertise what it is
 * actually for.
 *
 * The map exists because placements are written to read inside a sentence
 * ("for pooja room screens, main gate inserts and temple arches"), and a
 * headline wants the noun on its own. Anything unmapped falls back to title
 * case, so a new placement degrades to clumsy rather than to blank.
 */
const HEADLINE_PLACE = {
    'pooja room screens': 'Pooja Rooms',
    'prayer room screens': 'Prayer Rooms',
    'main gate inserts': 'Gates',
    'temple arches': 'Temple Arches',
    'church and chapel arches': 'Church Arches',
    'masjid arches': 'Masjid Arches',
    'grotto and shrine panels': 'Shrines',
    'shrine surrounds': 'Shrines',
    'partition and jali screens': 'Jali Screens',
    'backlit feature walls': 'Feature Walls',
    'wall art': 'Wall Art',
    'name boards': 'Name Boards',
    'study wall panels': 'Study Walls',
    'pooja room doors': 'Pooja Doors',
    'mandapam panels': 'Mandapams',
    'dining room panels': 'Dining Rooms',
    'chapel entrances': 'Chapels',
}

const titleCase = (s) => s.replace(/\b[a-z]/g, (c) => c.toUpperCase())

export function headlinePlaces(placements, limit = 3) {
    const seen = new Set()
    const out = []
    for (const place of placements || []) {
        const short = HEADLINE_PLACE[place] || titleCase(place)
        // Two placements can shorten to the same noun — 'grotto and shrine
        // panels' and 'shrine surrounds' both give 'Shrines'.
        if (seen.has(short)) continue
        seen.add(short)
        out.push(short)
        if (out.length === limit) break
    }
    return out.join(', ')
}

export function buildBlurb(seed) {
    const names = namesPhrase(seed.alsoKnownAs)
    const alt = names ? ` — ${names} designs —` : ''

    // Three placements, not all of them. The seeds carry up to four so the
    // answers can draw on a spare, but a blurb that lists every one reads as a
    // run-on and it is also the meta description, where Google truncates
    // around 160 characters.
    const places = seed.placements.slice(0, 3)
    const listed = `${places.slice(0, -1).join(', ')} and ${places[places.length - 1]}`

    return pick(seed.slug, 7, [
        `Laser cut ${seed.name} panels${alt} for ${listed}. Cut from mild steel, ` +
            `stainless steel, brass and copper, in sizes from a 1 ft panel ` +
            `up to a full 8 ft arch.`,
        `${seed.name} designs${alt} cut on our CNC fiber laser in Chennai, for ` +
            `${listed}. Mild steel, stainless steel, brass and copper, from a 1 ft panel ` +
            `to a full 8 ft arch in one piece.`,
        `Laser cut ${seed.name} panels for ${listed}` +
            `${names ? `, also searched as ${names}` : ''}. Cut in mild steel, stainless ` +
            `steel, brass or copper, at any size from 1 ft up to a full 8 ft arch.`,
    ])
}

/**
 * The meta description, which is NOT the blurb.
 *
 * The blurb is the hero lead and is allowed to run to three lines. Reused as a
 * description it came out at 230 to 300 characters, and Google truncates
 * around 160 — so the half that carries the materials and the size range, the
 * part a searcher is actually scanning for, was being cut off.
 *
 * Built to sit just under the limit with the subject, two placements and the
 * size range, in that order.
 */
export function buildMetaDescription(seed) {
    const places = seed.placements.slice(0, 2).join(' and ')
    const names = namesPhrase(seed.alsoKnownAs)
    const alt = names ? ` (${names})` : ''
    const base = `Laser cut ${seed.name}${alt} panels for ${places}. Mild steel, stainless steel, brass and copper, 1 ft to 8 ft, cut in Chennai.`

    // Drop the alternate names rather than let the size range be truncated:
    // the names are already in the h1, the blurb and the FAQs.
    if (base.length > 158 && names) {
        return `Laser cut ${seed.name} panels for ${places}. Mild steel, stainless steel, brass and copper, 1 ft to 8 ft, cut in Chennai.`
    }
    return base
}

/**
 * Three answers about what is on the page, five about who cuts it.
 *
 * The split is deliberate and matches the hand-written Ganesh set: the first
 * three answer what someone is looking at, the rest answer the half a
 * photograph cannot carry.
 */
export function buildFaqs(seed) {
    const s = subject(seed)
    const { name, slug } = seed
    const ref = slug.slice(0, 3).toUpperCase()
    const places = seed.placements.join(', ')
    const names = namesPhrase(seed.alsoKnownAs)

    return [
        {
            q: `Are the ${name} designs on this page ready to order?`,
            a:
                `Yes. Every panel carries a reference code, ${ref}-01 onwards. Send that ` +
                `code on WhatsApp and we come back with sizes, material options and ` +
                `pricing for it. The images are design renders rather than photographs ` +
                `of delivered jobs, so the finish named under each one is the finish ` +
                `that design depicts — the same cutting file runs in any material we stock.`,
        },
        {
            q: `What sizes and thicknesses can a laser cut ${name} panel be made in?`,
            a:
                `Anything from a 1 ft panel to a full 8 ft arch. Our bed takes sheets up ` +
                `to 8000 x 2500 mm, so a large ${s.panel} is cut in one piece with no ` +
                `welded join running through the design. Interior screens are typically ` +
                `1.5 mm to 3 mm; panels for ${seed.placements[1] || 'exterior use'} ` +
                `generally need 3 mm or more to stay flat and resist wind load.`,
        },
        {
            q: pick(slug, 11, [
                `Will the fine detail in ${s.article} ${s.panel} hold together?`,
                `Does the fine detail survive once the metal is cut away?`,
                `Can a detailed ${name} design be cut without the thin parts breaking?`,
            ]),
            a:
                `That is the main thing we check before cutting. Once metal is removed, ` +
                `thin strands can be left floating or too weak to stay flat. We add ` +
                `discreet bridges where needed and, on very fine work, suggest a slightly ` +
                `thicker sheet so the pattern keeps its shape. It matters most on backlit ` +
                `panels, which are mounted on standoffs with an LED strip behind them and ` +
                `read best with a bolder design and fewer very fine gaps.`,
        },

        {
            q: pick(slug, 23, [
                `Where are RG Tech's ${name} panels cut?`,
                `Does RG Tech cut these ${name} panels in house?`,
                `Who actually cuts the ${name} panels sold here?`,
            ]),
            a:
                `In our own workshop in Chennai, on our CNC fiber laser — the panels are ` +
                `not brokered out to a third party. That is also why a full 8 ft ${s.panel} ` +
                `comes out in a single piece: the 8000 x 2500 mm bed takes the whole sheet ` +
                `in one setup, so there is no welded joint running through the design.`,
        },
        {
            q: pick(slug, 31, [
                `Does RG Tech deliver ${name} panels outside Chennai?`,
                `Can a ${name} panel be delivered to Coimbatore or Madurai?`,
                `Do you supply ${name} panels across Tamil Nadu?`,
            ]),
            a:
                `Yes. Panels are cut in Chennai and delivered across Tamil Nadu, including ` +
                `Coimbatore, Madurai and Salem. Cutting in one place keeps the finish ` +
                `consistent — the same machine, the same operator and the same powder ` +
                `coating line whichever city the panel is going to.`,
        },
        {
            q: pick(slug, 41, [
                `Does RG Tech finish the panel, or only cut it?`,
                `Is the ${name} panel powder coated before it ships?`,
                `Can the panel arrive framed and ready to mount?`,
            ]),
            a:
                `Both, and you can stop at whichever stage you need. Cutting, bending, ` +
                `welding and powder coating are all in house, so a panel can leave as a ` +
                `bare cut sheet or arrive framed, coated and ready to mount. Cut-only ` +
                `panels usually ship in 3 to 5 working days once the design is approved; ` +
                `framed and powder coated panels take 7 to 12 working days, because ` +
                `coating cure time cannot be rushed without hurting durability.`,
        },
        {
            q: pick(slug, 53, [
                `Can RG Tech cut ${s.article} ${s.panel} from my own photo or reference?`,
                `I have my own ${name} design — can you cut that?`,
                `Can you work from a photograph or a sketch?`,
            ]),
            a:
                `Yes, and it is most of what we do. Send a photograph, a reference image or ` +
                `even a rough sketch on WhatsApp and we convert it into a cutting-ready ` +
                `vector. Detailed source images usually need small connecting bridges ` +
                `added before they can be cut — we handle that and show you the adjusted ` +
                `design for approval before anything is cut.` +
                (names ? ` ${name} and ${names} are the same subject, so whichever name and whichever reference you bring, the process is identical.` : ''),
        },
        {
            q: pick(slug, 67, [
                `What else does RG Tech Engineering cut?`,
                `Do you only make ${name} panels?`,
                `What other laser cutting work does RG Tech take on?`,
            ]),
            a:
                `${seed.kind === 'deity' ? 'Deity panels' : 'Decorative panels'} are one ` +
                `part of it. The same fiber laser and finishing line produce designer ` +
                `gates, jali and partition screens, compound wall inserts, signage and ` +
                `industrial job work in mild steel, stainless steel, aluminium, brass and ` +
                `copper. Send a drawing with material and quantity and a firm, itemised ` +
                `quote comes back within 24 business hours, Monday to Saturday.`,
        },
    ]
}
