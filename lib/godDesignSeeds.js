/**
 * Per-gallery seeds for /designs/gods/<slug>.
 *
 * One row per entry in GODS (lib/gods.js). Everything a generated gallery says
 * that is specific to its subject comes from here, so this is the file to edit
 * when a page reads generically — not the templates in lib/godDesignCopy.js.
 *
 * Three fields, and only three, because each one is something we can state
 * without making a religious claim:
 *
 *   kind        'deity' | 'symbol' | 'fixture'. A third of GODS is not a
 *               deity, and copy that calls Om or a temple arch "a deity panel"
 *               reads as a template nobody checked.
 *   alsoKnownAs Names the same subject is searched under. Tamil and Sanskrit
 *               alternates mostly. Left empty where we are not certain — a
 *               wrong alternate name is worse for search than a missing one,
 *               because it puts the page in front of the wrong query.
 *   iconography Optional, and ONLY ever used in image prompts — never in page
 *               copy. Without it a sparse brief drifts to the most
 *               recognisable form: "bold simplified silhouette" for Murugan
 *               returned a Ganesh panel, elephant head and all. Name the
 *               attributes that identify the figure and nothing more. Leave it
 *               out where you are not certain; the guard sentence in the
 *               prompt still forbids substituting another deity.
 *   placements  Where panels of this kind actually get fixed. This is the
 *               field that carries most of the difference between one gallery
 *               and the next, so it is worth being specific: a pooja room
 *               screen and an 8 ft gate arch are different products.
 *
 * Deliberately NOT here: iconography. No arms, weapons, mounts or postures.
 * lib/gods.js sets the rule — the copy stays on the craft and makes no claim
 * about what a figure is or means. Fifty subjects is also far more than could
 * be researched reliably, and a confident wrong detail about a deity on a page
 * selling to devotees costs more than a generic sentence ever saves.
 */

/** @typedef {{ key: string, kind: 'deity'|'symbol'|'fixture', alsoKnownAs: string[], placements: string[] }} GodDesignSeed */

// Short labels, because they get listed. An earlier pass used the full
// phrases from the Ganesh page ('main gate and compound wall inserts'), and
// three of those in a row produced a sentence with five 'and's in it.
const POOJA = 'pooja room screens'
const GATE = 'main gate inserts'
const ARCH = 'temple arches'
const WALL = 'wall art'
const NAMEBOARD = 'name boards'
const BACKLIT = 'backlit feature walls'

/** @type {GodDesignSeed[]} */
export const GOD_DESIGN_SEEDS = [
    // ── Primary deities ─────────────────────────────────────────────────────
    { key: 'murugan', kind: 'deity', alsoKnownAs: ['Kartikeya', 'Subramanya', 'Skanda'], iconography: 'a young warrior god with a human face, holding the vel spear, with a peacock beside him', placements: [POOJA, GATE, ARCH, WALL] },
    { key: 'shiva', kind: 'deity', alsoKnownAs: ['Mahadeva', 'Eeswaran'], iconography: 'a male ascetic god with matted hair piled up, a crescent moon in his hair, a third eye on his forehead, a serpent around his neck, holding a trident', placements: [POOJA, ARCH, WALL, BACKLIT] },
    { key: 'parvati', kind: 'deity', alsoKnownAs: ['Uma', 'Gowri'], iconography: 'a serene goddess consort with a crown, holding a lotus', placements: [POOJA, WALL, ARCH] },
    { key: 'lakshmi', kind: 'deity', alsoKnownAs: ['Thirumagal'], iconography: 'a goddess on a lotus with four arms, holding lotus flowers, gold coins flowing from one open palm', placements: [POOJA, GATE, WALL, BACKLIT] },
    { key: 'saraswati', kind: 'deity', alsoKnownAs: ['Kalaimagal'], iconography: 'a goddess in white seated on a lotus, playing a veena, with a book and a swan', placements: [POOJA, WALL, 'study wall panels'] },
    { key: 'durga', kind: 'deity', alsoKnownAs: ['Durgai'], iconography: 'a many-armed warrior goddess holding weapons, with a lion beside her', placements: [POOJA, GATE, ARCH] },
    { key: 'ayyappa', kind: 'deity', alsoKnownAs: ['Sastha', 'Manikandan'], iconography: 'a young ascetic god seated in yogic posture with a band around his raised knees', placements: [POOJA, GATE, ARCH, WALL] },
    { key: 'hanuman', kind: 'deity', alsoKnownAs: ['Anjaneya', 'Maruti'], iconography: 'a devoted monkey-faced god with a tail, carrying a mace', placements: [GATE, ARCH, POOJA, WALL] },
    { key: 'rama', kind: 'deity', alsoKnownAs: [], iconography: 'a princely god standing with a longbow and quiver', placements: [POOJA, ARCH, WALL] },
    { key: 'sita', kind: 'deity', alsoKnownAs: [], iconography: 'a serene princess consort with a crown, holding a lotus', placements: [POOJA, WALL, ARCH] },
    { key: 'krishna', kind: 'deity', alsoKnownAs: ['Kannan'], iconography: 'a youthful god playing a transverse flute, a peacock feather in his crown', placements: [POOJA, WALL, BACKLIT, ARCH] },
    { key: 'radha-krishna', kind: 'deity', alsoKnownAs: [], iconography: 'a divine couple standing together, the god playing a transverse flute', placements: [WALL, POOJA, BACKLIT] },
    { key: 'perumal', kind: 'deity', alsoKnownAs: ['Venkateswara', 'Balaji', 'Thirumal'], iconography: 'a standing god with four arms holding a conch and a discus, a tall crown', placements: [POOJA, GATE, ARCH, WALL] },
    { key: 'narasimha', kind: 'deity', alsoKnownAs: [], iconography: 'a lion-headed god with a human body and a mane', placements: [POOJA, ARCH, WALL] },
    { key: 'hayagriva', kind: 'deity', alsoKnownAs: [], iconography: 'a horse-headed god with a human body, holding a conch and a discus', placements: [POOJA, WALL, 'study wall panels'] },
    { key: 'dhanvantari', kind: 'deity', alsoKnownAs: [], iconography: 'a four-armed god holding a pot of nectar and a medicinal herb', placements: [POOJA, WALL, NAMEBOARD] },
    { key: 'ardhanarishvara', kind: 'deity', alsoKnownAs: [], iconography: 'a single figure split down the middle, male on one side and female on the other', placements: [WALL, POOJA, BACKLIT] },
    { key: 'nataraja', kind: 'deity', alsoKnownAs: [], iconography: 'a four-armed god dancing inside a ring of flames, one leg raised', placements: [WALL, BACKLIT, ARCH, POOJA] },
    { key: 'dakshinamurthy', kind: 'deity', alsoKnownAs: [], iconography: 'a god seated under a banyan tree in a teaching posture, holding a flame', placements: [POOJA, WALL, ARCH] },

    // ── Amman & village deities ─────────────────────────────────────────────
    { key: 'kaliamman', kind: 'deity', alsoKnownAs: ['Kali'], iconography: 'a fierce dark goddess with many arms and a garland, standing upright', placements: [ARCH, GATE, POOJA] },
    { key: 'meenakshi-amman', kind: 'deity', alsoKnownAs: ['Meenakshi'], iconography: 'a crowned goddess standing with a green parrot on her hand', placements: [ARCH, POOJA, WALL] },
    { key: 'mariamman', kind: 'deity', alsoKnownAs: [], placements: [ARCH, GATE, POOJA] },
    { key: 'karuppasamy', kind: 'deity', alsoKnownAs: [], placements: [GATE, ARCH, 'shrine surrounds'] },
    { key: 'ayyanar', kind: 'deity', alsoKnownAs: [], placements: [GATE, ARCH, 'shrine surrounds'] },
    { key: 'madurai-veeran', kind: 'deity', alsoKnownAs: [], placements: [GATE, ARCH, 'shrine surrounds'] },
    { key: 'muneeswaran', kind: 'deity', alsoKnownAs: [], placements: [GATE, ARCH, 'shrine surrounds'] },
    { key: 'bhairava', kind: 'deity', alsoKnownAs: [], iconography: 'a fierce standing god with a trident and a dog at his feet', placements: [ARCH, POOJA, GATE] },
    { key: 'navadurga', kind: 'deity', alsoKnownAs: [], iconography: 'nine goddess figures arranged in a symmetrical panel', placements: [ARCH, POOJA, WALL] },
    { key: 'mahalakshmi', kind: 'deity', alsoKnownAs: [], iconography: 'a goddess on a lotus with four arms, holding lotus flowers, gold coins flowing from one palm', placements: [POOJA, GATE, WALL, BACKLIT] },
    { key: 'annapoorani', kind: 'deity', alsoKnownAs: [], iconography: 'a goddess standing with a serving ladle and a vessel of food', placements: [POOJA, 'kitchen wall panels', WALL] },
    { key: 'andal', kind: 'deity', alsoKnownAs: [], iconography: 'a garlanded woman standing with flowers in her hair, hands joined', placements: [POOJA, ARCH, WALL] },

    // ── Navagraha & planetary ───────────────────────────────────────────────
    { key: 'navagraha', kind: 'deity', alsoKnownAs: [], iconography: 'nine planetary deities arranged in a symmetrical grid, each in its own compartment', placements: [POOJA, ARCH, 'mandapam panels'] },
    { key: 'surya', kind: 'deity', alsoKnownAs: ['Surya'], iconography: 'the sun god standing with a radiating halo of sun rays, holding lotuses', placements: [GATE, WALL, POOJA, BACKLIT] },
    { key: 'chandra', kind: 'deity', alsoKnownAs: ['Chandra'], iconography: 'the moon god with a crescent moon behind his head, holding a lotus', placements: [POOJA, WALL, BACKLIT] },
    { key: 'shani', kind: 'deity', alsoKnownAs: ['Shani'], iconography: 'a dark solemn god standing with a staff, a crow beside him', placements: [POOJA, ARCH, WALL] },
    { key: 'rahu-ketu', kind: 'deity', alsoKnownAs: [], iconography: 'two serpent-bodied figures facing each other symmetrically', placements: [POOJA, ARCH, 'mandapam panels'] },

    // ── Saints & gurus ──────────────────────────────────────────────────────
    { key: 'raghavendra-swamy', kind: 'deity', alsoKnownAs: [], iconography: 'a seated saint in robes with a tall forehead mark, holding a staff and prayer beads', placements: [POOJA, WALL, ARCH] },
    { key: 'sai-baba', kind: 'deity', alsoKnownAs: [], iconography: 'an elderly saint seated with a cloth wrapped around his head, one leg crossed over the other', placements: [POOJA, WALL, BACKLIT] },
    { key: 'shirdi-sai-baba', kind: 'deity', alsoKnownAs: [], iconography: 'an elderly saint seated with a cloth wrapped around his head, one leg crossed over the other', placements: [POOJA, WALL, BACKLIT] },
    { key: 'sathya-sai-baba', kind: 'deity', alsoKnownAs: [], iconography: 'a saint with a large halo of hair, in a simple robe, one hand raised', placements: [POOJA, WALL, BACKLIT] },

    // ── Sacred symbols ──────────────────────────────────────────────────────
    { key: 'om-symbol', kind: 'symbol', alsoKnownAs: ['Omkara'], placements: [POOJA, WALL, BACKLIT, NAMEBOARD] },
    { key: 'vel-symbol', kind: 'symbol', alsoKnownAs: [], placements: [POOJA, GATE, WALL] },
    { key: 'trishul', kind: 'symbol', alsoKnownAs: [], placements: [GATE, POOJA, WALL] },
    { key: 'swastik', kind: 'symbol', alsoKnownAs: [], placements: [POOJA, NAMEBOARD, WALL] },
    { key: 'kalasam', kind: 'symbol', alsoKnownAs: [], placements: [ARCH, POOJA, GATE] },

    // ── Temple & pooja room fixtures ────────────────────────────────────────
    { key: 'temple-arch', kind: 'fixture', alsoKnownAs: [], placements: [ARCH, 'mandapam panels', GATE] },
    { key: 'temple-entrance-panel', kind: 'fixture', alsoKnownAs: [], placements: [ARCH, GATE, 'shrine surrounds'] },
    { key: 'pooja-room', kind: 'fixture', alsoKnownAs: [], placements: [POOJA, BACKLIT, 'pooja room doors'] },
    { key: 'hindu-temple-decoration', kind: 'fixture', alsoKnownAs: [], placements: [ARCH, 'mandapam panels', WALL] },
]

export const getSeed = (key) => GOD_DESIGN_SEEDS.find((s) => s.key === key) || null
