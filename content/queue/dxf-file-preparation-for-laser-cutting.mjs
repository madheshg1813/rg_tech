import { createBuilder, IMAGES, makePost } from '../lib/pt.mjs'

const { p, h2, h3, li, nli, rich, image, table, callout, faqs } = createBuilder('dxf')

const body = [
    p('A laser does exactly what the file tells it to. That is its great strength and the source of nearly every avoidable problem in a cutting job.'),
    p('This is a practical guide to preparing a DXF that cuts first time — what the machine needs, what quietly breaks it, and how to check your own file before you send it.'),

    callout('tldr', 'Draw 1:1 in millimetres. Every cut must be a closed, single-line contour with no duplicates, no open gaps and no construction geometry. Convert text to outlines. Delete everything that is not being cut.'),

    h2('What the Machine Actually Reads'),
    p('Cutting software does not see your drawing the way you do. It sees a set of closed loops and works out which side of each loop is scrap. From that it decides where to offset the toolpath by half a kerf, and in what order to cut.'),
    p('Everything else in the file — dimensions, hatching, title blocks, layers you forgot about — is noise it has to be told to ignore. If a piece of noise happens to be a closed loop, it may get cut.'),

    h2('The Rules That Matter'),

    h3('1. Draw 1:1 in millimetres'),
    p('No scaling, no paper space, no imperial units mixed into a metric drawing. If the part is 250 mm long, the geometry measures 250 units. This sounds obvious and is the most common single problem we see.'),

    h3('2. Every cut must be a closed contour'),
    p('An outline that looks closed on screen may have a 0.01 mm gap where two lines nearly meet. The software then treats it as an open path and either refuses it or cuts it as a slit rather than a shape.'),
    p('Most CAD packages have a join or heal command that closes gaps within a tolerance. Run it before exporting.'),

    h3('3. Remove duplicate lines'),
    p('Two identical lines stacked on top of each other are invisible on screen and cut twice — once forwards, once back over the same path. At best it wastes time, at worst it burns the edge and drops the part into the bed.'),
    p('This happens most often when geometry has been copied, mirrored or imported from another format.'),

    h3('4. Convert text to outlines'),
    p('A DXF stores text as a font reference, not as shapes. If our machine does not have your font, the text either vanishes or is substituted with something else. Explode or convert text to curves before exporting, then check the result still looks right.'),
    callout('warning', 'After converting text to outlines, look at closed letters like O, A, D and R. Their inner counters become separate loops that will drop out as scrap unless the design deliberately bridges them. On a name plate, that is the difference between a readable sign and a bag of loose ovals.'),

    h3('5. Delete everything that is not cut'),
    p('Dimensions, centre lines, hatching, borders, notes, hidden layers, construction circles. If it is in the file, someone has to decide whether it is geometry or annotation, and a wrong decision cuts a dimension line into your part.'),
    image(IMAGES.sheet2, 'Clean laser cut sheet metal components produced from a correctly prepared DXF file', 'A clean file cuts first time and needs no interpretation at the machine.'),

    h2('Design Rules the Physics Imposes'),
    p('Some things are legal in CAD and impossible in metal:'),
    table(
        'Practical design limits for laser cut parts',
        ['Feature', 'Practical guideline', 'Why'],
        [
            ['Minimum hole diameter', 'At least equal to material thickness', 'The beam cannot make a clean small hole in thick plate'],
            ['Minimum slot width', 'About the material thickness', 'Same limit; narrower closes up or burns'],
            ['Distance between cuts', 'At least the material thickness', 'Thin webs overheat and distort'],
            ['Internal corners', 'Add a small radius', 'A true sharp corner needs a dwell and tends to burn'],
            ['Distance from edge', 'At least the material thickness', 'Cutting too near the sheet edge is unstable'],
            ['Tab and slot fits', 'Allow for kerf on both parts', 'Nominal dimensions produce an interference fit'],
        ]
    ),
    p('These are guidelines, not absolute limits — thin sheet is far more forgiving than 25 mm plate. If a feature is close to the line, ask before redesigning around it.'),

    h2('Kerf: the Half-Millimetre That Catches People Out'),
    p('The beam removes a strip of material, typically 0.1 to 0.4 mm wide. Good software offsets the toolpath so the finished part matches your drawing, and for a standalone part you can ignore kerf entirely.'),
    p('Where it matters is parts that fit into each other. If you draw a 10 mm tab and a 10 mm slot, both come out at their nominal size, and the tab will not go in — because the slot lost half a kerf on each side and the tab lost half a kerf on each side too.'),
    rich('Design the clearance you want into the drawing rather than hoping the cut supplies it. The related accuracy questions are covered in ', ['laser cutting tolerances explained', '/blog/laser-cutting-tolerances-explained'], '.'),

    h2('Which File Format to Send'),
    li('DXF — the most reliable and what we prefer. Export as R12 or 2000 if your software offers a choice; newer versions carry features that add nothing for cutting.'),
    li('DWG — fine, and read directly.'),
    li('STEP or IGES — good for 3D parts we need to flatten, but tell us which faces matter.'),
    li('PDF — usable as a reference or for simple shapes, but vector-only. A scanned or rasterised PDF cannot be cut from.'),
    li('Sketches and photos — genuinely fine as a starting point. We convert them to a cutting file and send it back for approval before anything is cut.'),

    h2('A Two-Minute Check Before You Send'),
    nli('Measure one known dimension in your CAD. Does it read the value you intended, in millimetres?'),
    nli('Select all and check the layer list. Is anything on a layer you forgot about?'),
    nli('Run join or heal, then a duplicate-line removal.'),
    nli('Zoom to a letter of any text. Are the counters bridged where they need to be?'),
    nli('Look at the smallest hole. Is it at least as wide as the material is thick?'),
    // Deliberately not linked to the cost guide: that article links back here,
    // and the queue cannot publish two posts that reference each other.
    p('Do that and the quote comes back faster and the parts fit first time. It also affects price, because repairing a file is real work and it goes into the quotation like anything else.'),

    callout('tip', 'If you are not sure whether your file is clean, send it anyway with a note saying so. We check every file before cutting and will come back with what needs changing. That conversation is free; a bad batch of parts is not.'),
]

export const post = makePost({
    slug: 'dxf-file-preparation-for-laser-cutting',
    title: 'How to Prepare a DXF File for Laser Cutting',
    sheetTitle: 'DXF File Preparation for Laser Cutting',
    summary:
        'What a cutting machine needs from your drawing: closed contours, no duplicates, text as outlines, and the design limits that thickness imposes.',
    tldr:
        'Draw 1:1 in millimetres with every cut as a closed, single-line contour. Remove duplicates and annotation, convert text to outlines, and keep holes no smaller than the material thickness.',
    readTime: '8 min read',
    mainImageUrl: IMAGES.sheet,
    mainImageAlt: 'Precision laser cut sheet metal parts produced from a prepared DXF file at RG Tech Engineering',
    bannerEyebrow: 'FILE PREPARATION',
    bannerHeading: 'Preparing DXF Files',
    bannerSubheading: 'What the Machine Needs From Your Drawing',
    bannerBadge: 'DFM GUIDE',
    metaTitle: 'How to Prepare a DXF File for Laser Cutting: A Practical Guide',
    metaDescription:
        'Prepare DXF files that cut first time: closed contours, no duplicate lines, text converted to outlines, minimum hole sizes, kerf allowance and a pre-send checklist.',
    keywords: [
        'dxf file for laser cutting',
        'laser cutting file preparation',
        'dxf laser cutting requirements',
        'design for laser cutting',
        'minimum hole size laser cutting',
        'laser cutting kerf allowance',
    ],
    body,
    faqs: faqs([
        ['What file format is best for laser cutting?',
            'DXF is the most reliable and what we prefer, exported as R12 or 2000. DWG works equally well. STEP and IGES suit 3D parts that need flattening. Vector PDFs are usable for simple shapes, but scanned or rasterised PDFs cannot be cut from.'],
        ['Why does my DXF need closed contours?',
            'Cutting software identifies each shape as a closed loop to work out which side is scrap and where to offset the toolpath. An outline with even a 0.01 mm gap is treated as an open path and is either rejected or cut as a slit.'],
        ['What is the smallest hole a laser can cut?',
            'As a practical rule the hole diameter should be at least equal to the material thickness. Smaller holes in thick plate either close up, burn, or cannot be pierced cleanly, and may need drilling instead.'],
        ['Why does text disappear from my laser cutting file?',
            'DXF stores text as a font reference rather than as shapes. If the machine does not have your font, the text vanishes or is substituted. Convert text to outlines or curves before exporting.'],
        ['Do I need to allow for kerf in my drawing?',
            'Not for standalone parts — the software offsets the toolpath so the part matches your dimensions. You do need to allow for it on parts that fit together, since a nominal 10 mm tab and 10 mm slot will not assemble.'],
        ['Can you cut from a hand-drawn sketch?',
            'Yes. We convert sketches, photos and rough drawings into a cutting file and send it back for your approval before anything is cut.'],
        ['Why are duplicate lines a problem?',
            'They are invisible on screen but cut twice, once forwards and once back over the same path. That wastes machine time and can burn the edge or drop the part into the machine bed.'],
        ['Should I add radii to internal corners?',
            'Where you can, yes. A true sharp internal corner requires the beam to dwell and tends to burn. A small radius cuts faster, looks cleaner and is usually functionally identical.'],
    ]),
})
