import { createBuilder, IMAGES, makePost } from '../lib/pt.mjs'

const { p, h2, h3, li, nli, rich, image, table, callout, faqs } = createBuilder('bnd')

const body = [
    p('A laser cuts flat blanks. Most of those blanks then go to a press brake, and that is where a surprising number of otherwise good parts go wrong.'),
    p('The problem is almost never the bending itself. It is that the flat pattern was drawn without accounting for what bending does to the metal — so the part comes off the brake with the right angles and the wrong dimensions.'),

    callout('tldr', 'Metal stretches when bent, so the flat blank must be shorter than the sum of the finished legs. That difference is the bend allowance. Get it from your fabricator before cutting, keep holes away from bend lines, and mind the grain direction.'),

    h2('Why a Flat Blank Is Not Just the Legs Added Up'),
    p('Bend a 100 mm and a 50 mm leg at 90 degrees and you might expect a 150 mm blank. Cut one and the finished part will be too long.'),
    p('When metal bends, the outside of the curve stretches and the inside compresses. Somewhere between them is a line that does neither — the neutral axis. The material effectively gains length across the bend, and the flat blank has to be shortened to compensate.'),
    p('That shortening is the bend deduction. Its size depends on material, thickness, bend radius and the tooling used.'),

    h2('K-Factor, in Plain Terms'),
    p('The neutral axis does not sit exactly in the middle of the thickness. It shifts towards the inside of the bend. The K-factor is simply where it sits, expressed as a fraction of the material thickness.'),
    li('A K-factor of 0.5 would mean the neutral axis is dead centre.'),
    li('In practice it usually falls between about 0.33 and 0.45 for common sheet metals.'),
    li('Softer materials and larger radii push it one way; harder materials and tight radii push it the other.'),
    callout('warning', 'Do not take a K-factor from a textbook and assume your parts will fit. It varies with the actual tooling, the material batch and the machine. The number that matters is the one your fabricator measures on their own brake.'),

    h2('The Rules That Save Parts'),

    h3('Minimum flange length'),
    p('A flange has to be long enough to sit on the die. Too short and it cannot be formed at all. A common working minimum is around four times the material thickness plus the bend radius, but it depends entirely on the tooling available.'),

    h3('Keep holes away from bend lines'),
    p('A hole too close to a bend distorts into an oval, because the metal around it is stretching. Keep the edge of any hole at least two and a half times the material thickness away from the start of the bend.'),
    p('Where a hole genuinely must sit near a bend, the alternatives are to bend first and drill after, or to add a relief cut.'),

    h3('Add bend reliefs'),
    p('Where a bend stops partway along an edge, the metal tears at the end of the bend line. A small relief notch cut into the blank at each end gives it somewhere to go. This is cheap to add at the cutting stage and impossible to add afterwards.'),

    h3('Mind the grain'),
    p('Rolled sheet has a grain direction. Bending along the grain is more likely to crack the outside of the bend, especially in aluminium and in harder tempers. Bending across the grain is safer.'),
    p('If a part has bends in two directions, tell us — the nesting can often be arranged so the critical bend runs the safe way.'),
    image(IMAGES.sheet, 'Flat laser cut sheet metal blanks prepared for press brake forming', 'Flat blanks cut with bend allowance, reliefs and hole clearance already designed in.'),

    h2('Bend Radius by Material'),
    table(
        'Typical minimum inside bend radius as a multiple of thickness',
        ['Material', 'Typical minimum inside radius', 'Notes'],
        [
            ['Mild steel', '1.0 x thickness', 'Forgiving; the usual baseline'],
            ['Stainless 304 / 316', '1.0 to 1.5 x thickness', 'Springs back more than mild steel'],
            ['Stainless 430', '1.5 x thickness or more', 'Ferritic, less formable'],
            ['Aluminium (soft temper)', '1.0 x thickness', 'Grain direction matters'],
            ['Aluminium (hard temper)', '2.0 x thickness or more', 'Cracks readily on tight radii'],
            ['Brass / copper', '1.0 x thickness', 'Generally very formable'],
        ]
    ),
    p('These are starting points. The real limit is set by the tooling and the specific batch, so treat anything tighter as a conversation rather than an assumption.'),

    h2('Springback'),
    p('Metal is elastic before it is plastic. Bend it to 90 degrees and release, and it will relax to slightly more than 90. The brake compensates by overbending, and the amount depends on material and thickness.'),
    p('Stainless springs back more than mild steel. This is normal and handled at the machine, but it is why a bend angle tolerance is wider than a cut tolerance.'),
    rich('That distinction between cutting accuracy and assembly accuracy is worth understanding before specifying tight tolerances — see ', ['laser cutting tolerances explained', '/blog/laser-cutting-tolerances-explained'], '.'),

    h2('What to Send Us'),
    nli('The flat DXF if you have calculated the bend allowance yourself, and tell us what K-factor you used.'),
    nli('Or the finished part dimensions and bend angles, and let us produce the flat pattern. This is usually safer.'),
    nli('Bend directions — up or down relative to the face you are dimensioning from.'),
    nli('Which dimensions are critical on the finished part rather than on the blank.'),
    nli('The material and temper, since formability varies significantly within aluminium in particular.'),
    rich('Sending the file clean makes all of this faster; the file-side requirements are in ', ['how to prepare a DXF for laser cutting', '/blog/dxf-file-preparation-for-laser-cutting'], '.'),

    callout('tip', 'If a part is going to be bent, say so at enquiry stage rather than after the blanks are cut. Bend allowance, reliefs and hole positions all have to be designed into the flat pattern, and none of them can be corrected once the sheet is cut.'),
]

export const post = makePost({
    slug: 'sheet-metal-bending-after-laser-cutting',
    title: 'Sheet Metal Bending After Laser Cutting: What to Design In',
    sheetTitle: 'Sheet Metal Bending After Laser Cutting',
    summary:
        'Bend allowance, K-factor, minimum flange lengths, hole clearance and grain direction — what has to be designed into a flat blank before it is cut.',
    tldr:
        'Metal stretches when bent, so a flat blank is shorter than the sum of its legs. Bend allowance, reliefs and hole clearance must be in the flat pattern before cutting, because none can be added afterwards.',
    readTime: '7 min read',
    mainImageUrl: IMAGES.sheet2,
    mainImageAlt: 'Laser cut sheet metal blanks prepared for press brake bending at RG Tech Engineering Chennai',
    bannerEyebrow: 'FABRICATION GUIDE',
    bannerHeading: 'Bending After Cutting',
    bannerSubheading: 'Bend Allowance, Reliefs & Grain Direction',
    bannerBadge: 'PRESS BRAKE',
    metaTitle: 'Sheet Metal Bending After Laser Cutting: Allowance & Design Rules',
    metaDescription:
        'How bending changes a laser cut blank: bend allowance and K-factor explained, minimum flange length, hole distance from bend lines, reliefs, grain direction and springback.',
    keywords: [
        'sheet metal bend allowance',
        'k factor sheet metal',
        'minimum bend radius',
        'sheet metal bending design',
        'press brake laser cut parts',
        'sheet metal fabrication chennai',
    ],
    body,
    faqs: faqs([
        ['What is bend allowance in sheet metal?',
            'The adjustment made to a flat blank to account for metal stretching around a bend. Because the outside of the curve stretches, the blank must be cut shorter than the sum of the finished leg lengths.'],
        ['What is the K-factor?',
            'The position of the neutral axis within the material thickness, expressed as a fraction. It typically falls between about 0.33 and 0.45 for common sheet metals, varying with material, bend radius and tooling.'],
        ['How far should a hole be from a bend line?',
            'At least two and a half times the material thickness from the edge of the hole to the start of the bend. Closer than that and the hole distorts into an oval as the surrounding metal stretches.'],
        ['What is a bend relief and why do I need one?',
            'A small notch cut at each end of a bend that stops partway along an edge. Without it the metal tears at the end of the bend line. It must be added at the cutting stage; it cannot be added afterwards.'],
        ['What is the minimum bend radius?',
            'Around one times the material thickness for mild steel, one to one and a half for 304 and 316 stainless, and up to twice thickness or more for hard-temper aluminium. Tooling and material batch set the real limit.'],
        ['Why does a bent part spring back?',
            'Metal is elastic before it deforms permanently, so it relaxes slightly when released. The press brake overbends to compensate. Stainless springs back more than mild steel.'],
        ['Does grain direction matter when bending?',
            'Yes. Bending along the grain is more likely to crack the outside of the bend, particularly in aluminium and harder tempers. Bending across the grain is safer, and nesting can often be arranged to suit.'],
        ['Should I calculate the flat pattern myself or send finished dimensions?',
            'Sending the finished dimensions and bend angles is usually safer, since bend allowance depends on the specific tooling and material. If you do send a flat pattern, tell us which K-factor you used.'],
    ]),
})
