/**
 * The panel variants a generated gallery is built from.
 *
 * Shared between two consumers that cannot import each other:
 *
 *   scripts/generate-god-designs.mjs  imports it directly (this file has no
 *       dependencies, so it loads fine outside Next) and uses `figure` /
 *       `abstract` for the composition and `finish` for how the metal reads.
 *   lib/godDesigns.js                 imports it normally and uses `key` to
 *       turn a filename back into a title and a material.
 *
 * The link between the two is the filename: the generator writes
 * `<slug>-<key>.jpg`, and the gallery reads the key back off the end. Rename a
 * key here and existing files stop resolving, so treat `key` as fixed once
 * images exist.
 *
 * Variants describe composition and density — how much metal is removed, how
 * bold the line is, whether it suits backlighting. Not iconography: those are
 * the things that genuinely differ between panels we cut, and they are claims
 * the page can stand behind.
 *
 * `faiths` scopes a variant to the traditions it belongs in, and it is a
 * correctness field, not a taste one. The original seven were written when the
 * catalogue was Hindu only, and four of them carry Hindu iconography in the
 * composition itself — a lotus seat, a mandala, a temple arch, an Om symbol
 * behind the figure. Left unscoped, the generator cheerfully produced
 * `islamic-geometric-jali-om-motif`: an Om placed on a panel for a mosque.
 * Every variant therefore names its faiths, and only `classic-frame` is plain
 * enough to belong to all three.
 *
 * `pose` exists because without it a set drifts to one shape. Shiva's first
 * seven came back as five bust portraits that differed only in their borders —
 * technically seven designs, but a customer scrolling them sees one. Poses are
 * spread deliberately: seated, standing, portrait, standing, half figure,
 * seated, standing. Deity prompts only — a pose instruction means nothing to
 * an Om symbol or a temple arch, which use `abstract` instead.
 */

export const PANEL_VARIANTS = [
    {
        key: 'lotus-frame',
        faiths: ['hindu'],
        title: 'Lotus Frame Panel',
        material: 'Golden PVD on stainless steel',
        finish: 'dark bronze stainless steel with a warm golden PVD sheen, finely brushed',
        pose: 'seated cross-legged on a lotus, full figure',
        figure: 'seated within a lotus motif, fine ornamental linework, arched frame',
        abstract: 'centred within a lotus motif, fine ornamental linework, arched frame',
    },
    {
        key: 'minimal-bold',
        faiths: ['hindu'],
        // Retired. The bold simplified treatment came back consistently thinner
        // than the rest of the set — large flat areas, little cut detail — and
        // next to a mandala or jali panel it reads as an unfinished draft
        // rather than a different design.
        //
        // Kept in the list rather than deleted: three galleries already have a
        // *-minimal-bold.jpg published, and variantFromFile resolves a file's
        // title and material by looking its key up here. Delete the entry and
        // those images silently vanish from their pages.
        retired: true,
        title: 'Bold Minimal Panel',
        material: 'Golden PVD on stainless steel',
        finish: 'dark bronze stainless steel with a warm golden PVD sheen, finely brushed',
        pose: 'standing upright, full figure, facing forward',
        figure: 'bold simplified silhouette, thick strokes, large open areas, suited to backlighting',
        abstract: 'bold simplified form, thick strokes, large open areas, suited to backlighting',
    },
    {
        key: 'mandala',
        faiths: ['hindu'],
        title: 'Mandala Panel',
        material: 'Black powder coated mild steel',
        finish: 'matte black powder-coated mild steel, fine even texture',
        pose: 'head and shoulders only, a close portrait',
        figure: 'set inside a dense circular mandala, radial symmetry, intricate cut detail',
        abstract: 'set inside a dense circular mandala, radial symmetry, intricate cut detail',
    },
    {
        key: 'arch-framed',
        faiths: ['hindu'],
        title: 'Arch Framed Panel',
        material: 'Black powder coated mild steel',
        finish: 'matte black powder-coated mild steel, fine even texture',
        pose: 'standing full figure, feet on a plinth',
        figure: 'under a temple arch with pillars either side, formal and symmetrical',
        abstract: 'under a temple arch with pillars either side, formal and symmetrical',
    },
    {
        key: 'om-motif',
        faiths: ['hindu'],
        title: 'Om Motif Panel',
        material: 'Black powder coated mild steel',
        finish: 'matte black powder-coated mild steel, fine even texture',
        pose: 'half figure from the waist up',
        figure: 'with a large Om symbol behind the figure, balanced composition',
        abstract: 'paired with a large Om symbol, balanced composition',
    },
    {
        key: 'floral-jali',
        faiths: ['hindu', 'islamic'],
        title: 'Floral Jali Panel',
        material: 'Black powder coated mild steel',
        finish: 'matte black powder-coated mild steel, fine even texture',
        pose: 'seated full figure, relaxed posture',
        figure: 'surrounded by a repeating floral jali lattice, even perforation across the panel',
        abstract: 'surrounded by a repeating floral jali lattice, even perforation across the panel',
    },
    // ── Christian ───────────────────────────────────────────────────────────
    // Church architecture and devotional ornament, matching what the Hindu set
    // takes from temple architecture. Same six-panel spread, same pose variety.
    {
        key: 'gothic-arch',
        faiths: ['christian'],
        title: 'Gothic Arch Panel',
        material: 'Black powder coated mild steel',
        finish: 'matte black powder-coated mild steel, fine even texture',
        pose: 'standing full figure, feet on a plinth',
        figure: 'under a pointed gothic arch with slender columns either side, formal and symmetrical',
        abstract: 'under a pointed gothic arch with slender columns either side, formal and symmetrical',
    },
    {
        key: 'radiant-glory',
        faiths: ['christian'],
        title: 'Radiant Glory Panel',
        material: 'Golden PVD on stainless steel',
        finish: 'dark bronze stainless steel with a warm golden PVD sheen, finely brushed',
        pose: 'half figure from the waist up',
        figure: 'set within a burst of radiating rays, symmetrical halo composition',
        abstract: 'set within a burst of radiating rays, symmetrical halo composition',
    },
    {
        key: 'rose-window',
        faiths: ['christian'],
        title: 'Rose Window Panel',
        material: 'Black powder coated mild steel',
        finish: 'matte black powder-coated mild steel, fine even texture',
        pose: 'head and shoulders only, a close portrait',
        figure: 'set inside a circular rose-window tracery, radial symmetry, intricate cut detail',
        abstract: 'set inside a circular rose-window tracery, radial symmetry, intricate cut detail',
    },
    {
        key: 'vine-border',
        faiths: ['christian'],
        title: 'Vine Border Panel',
        material: 'Black powder coated mild steel',
        finish: 'matte black powder-coated mild steel, fine even texture',
        pose: 'seated full figure, relaxed posture',
        figure: 'surrounded by a scrolling grapevine and wheat border, even cut detail across the panel',
        abstract: 'surrounded by a scrolling grapevine and wheat border, even cut detail across the panel',
    },
    {
        key: 'cross-frame',
        faiths: ['christian'],
        title: 'Cross Frame Panel',
        material: 'Golden PVD on stainless steel',
        finish: 'dark bronze stainless steel with a warm golden PVD sheen, finely brushed',
        pose: 'standing upright, full figure, facing forward',
        figure: 'with a slender cross rising behind, plain rectangular border, balanced composition',
        abstract: 'paired with a slender cross, plain rectangular border, balanced composition',
    },

    // ── Islamic ─────────────────────────────────────────────────────────────
    // No `pose` or `figure`: every Islamic subject is kind 'fixture' or
    // 'symbol', so the generator never reaches those fields — and a pose
    // instruction on a panel that must contain no living form is exactly the
    // stray hint that would put one there.
    {
        key: 'star-lattice',
        faiths: ['islamic'],
        title: 'Star Lattice Panel',
        material: 'Golden PVD on stainless steel',
        finish: 'dark bronze stainless steel with a warm golden PVD sheen, finely brushed',
        abstract: 'built from an interlacing eight-point star lattice repeating edge to edge, even perforation',
    },
    {
        key: 'arabesque-border',
        faiths: ['islamic'],
        title: 'Arabesque Border Panel',
        material: 'Black powder coated mild steel',
        finish: 'matte black powder-coated mild steel, fine even texture',
        abstract: 'framed by a scrolling arabesque vine border in continuous interlace, open geometric field within',
    },
    {
        key: 'mihrab-frame',
        faiths: ['islamic'],
        title: 'Mihrab Frame Panel',
        material: 'Black powder coated mild steel',
        finish: 'matte black powder-coated mild steel, fine even texture',
        abstract: 'set under a pointed horseshoe arch with a scalloped inner edge, formal and symmetrical',
    },
    {
        key: 'rosette-medallion',
        faiths: ['islamic'],
        title: 'Rosette Medallion Panel',
        material: 'Black powder coated mild steel',
        finish: 'matte black powder-coated mild steel, fine even texture',
        abstract: 'set inside a dense radial geometric rosette with sixteen-fold symmetry, intricate cut detail',
    },
    {
        key: 'muqarnas-crown',
        faiths: ['islamic'],
        title: 'Muqarnas Crown Panel',
        material: 'Golden PVD on stainless steel',
        finish: 'dark bronze stainless steel with a warm golden PVD sheen, finely brushed',
        abstract: 'crowned with a tiered muqarnas honeycomb band above a repeating geometric field',
    },

    // ── Shared ──────────────────────────────────────────────────────────────
    // Last on purpose: it is the plainest panel in the set, and this list is
    // also the order galleries display in.
    {
        key: 'classic-frame',
        faiths: ['hindu', 'christian', 'islamic'],
        title: 'Classic Framed Panel',
        material: 'Black powder coated mild steel',
        finish: 'matte black powder-coated mild steel, fine even texture',
        pose: 'standing full figure, turned slightly to one side',
        figure: 'centred in a plain rectangular border, traditional proportions, medium detail',
        abstract: 'centred in a plain rectangular border, traditional proportions, medium detail',
    },
]

/** Live variants for a faith, in list order. Retired ones are never offered. */
export const variantsForFaith = (faith) =>
    PANEL_VARIANTS.filter((v) => !v.retired && v.faiths.includes(faith))

/** Filename `murugan-floral-jali.jpg` -> the floral-jali variant. */
export function variantFromFile(slug, filename) {
    const base = filename.replace(/\.[a-z]+$/i, '')
    const suffix = base.startsWith(`${slug}-`) ? base.slice(slug.length + 1) : base
    return PANEL_VARIANTS.find((v) => v.key === suffix) || null
}
