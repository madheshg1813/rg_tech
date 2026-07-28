import { createBuilder, IMAGES, makePost } from '../lib/pt.mjs'

const { p, h2, h3, li, nli, rich, image, table, callout, faqs } = createBuilder('hclw')

const body = [
    p('A CNC laser turns a drawing on your screen into a metal part with no tooling, no dies and no setup change between one design and the next. Understanding the steps between those two points makes it much easier to send files that cut cleanly and to spot why a quote came back higher than expected.'),

    h2('How CNC Laser Cutting Works: The Six Stages'),
    p('Every job follows the same sequence, whether it is one prototype bracket or a thousand production parts:'),
    nli('CAD file preparation — your drawing is checked and converted into machine-ready geometry.'),
    nli('Nesting — parts are arranged on the sheet to get the most out of the material.'),
    nli('Machine setup — nozzle, focal position and assist gas are selected for the material and thickness.'),
    nli('Piercing — the beam burns an entry hole before it can begin following a contour.'),
    nli('Cutting — the head traces the profile at a feed rate matched to material and thickness.'),
    nli('Separation and inspection — parts are removed, edges checked, critical dimensions verified.'),

    h2('Stage 1: From CAD File to Cutting Path'),
    p('The machine does not read your drawing directly. Geometry is converted into a toolpath: a sequence of coordinates plus instructions for where to pierce, where to start and stop, and which direction to travel.'),
    p('Three things are checked first, and all three are common reasons a file gets sent back:'),
    li('Open contours. A profile with a gap cannot be cut as a closed shape and must be repaired.'),
    li('Duplicate lines. Two identical overlapping lines make the laser cut the same path twice, doubling time and often ruining the edge.'),
    li('Features below minimum size. A hole smaller than the material thickness rarely cuts reliably.'),
    p('Send vector geometry — DXF or DWG — rather than a scanned drawing or an image. Getting this right before you send the file is the single biggest lever on turnaround.'),

    h2('Stage 2: Nesting and Why It Decides Your Material Cost'),
    p('Nesting arranges every part on the sheet to maximise yield. It sounds like a detail. It is often the largest single influence on the material line of your quote.'),
    p('Good nesting considers:'),
    li('Rotating parts so irregular shapes interlock rather than leaving voids.'),
    li('Sharing cut lines between adjacent parts where the design allows, cutting once instead of twice.'),
    li('Keeping enough space that heat from one cut does not distort the part beside it.'),
    li('Grain direction, when the material has one and the part will be bent.'),
    image(IMAGES.sheet, 'Nested sheet metal parts cut on a CNC fiber laser to maximise material yield', 'Tight nesting is where most of the material saving on a job comes from.'),
    callout('tip', 'If you are ordering repeat quantities, say so at quoting stage. A quantity that fills a sheet cleanly can cost less per part than a smaller batch that wastes half of it.'),

    h2('Stage 3: Machine Setup — Focus, Nozzle and Gas'),
    h3('Focal position'),
    p('The beam converges to its narrowest point at the focal spot. Where that point sits relative to the sheet surface changes the cut. Focus slightly into the material for thicker plate, near the surface for thin sheet. Wrong focus produces a wide, rough kerf and often an incomplete cut.'),
    h3('Nozzle'),
    p('The nozzle shapes the assist gas flow around the beam. Diameter is matched to thickness — too small and gas cannot clear the kerf, too large and gas is wasted while pressure at the cut drops.'),
    h3('Assist gas'),
    p('This is the choice that most affects your finished edge:'),
    table(
        'Assist gas selection and its effect on the cut',
        ['Gas', 'Typical use', 'Edge result', 'Relative cost'],
        [
            ['Oxygen', 'Mild steel, thicker plate', 'Oxidised edge, needs cleaning before coating', 'Low'],
            ['Nitrogen', 'Stainless, aluminium, parts to be welded or coated', 'Bright, oxide-free, weld-ready', 'High'],
            ['Compressed air', 'Thin mild steel and aluminium', 'Light oxide, acceptable for many uses', 'Lowest'],
        ]
    ),
    p('Oxygen adds an exothermic reaction that speeds cutting on thick mild steel, which is why it remains standard there despite the oxide it leaves. Nitrogen is inert — it clears molten metal without reacting, leaving a clean edge, but uses far more gas.'),

    h2('Stage 4: Piercing'),
    p('A laser cannot start mid-material at full speed. It must first pierce: dwelling in one spot to burn through before motion begins.'),
    p('Piercing matters commercially because it is slow relative to cutting. A part with many small holes spends a surprising proportion of its cycle time piercing rather than cutting. This is why a perforated panel costs far more than a plain blank of the same size — the cut length may be similar, but the pierce count is not.'),
    callout('warning', 'If a design has hundreds of small holes, ask whether the pattern can be simplified. Reducing pierce count is often the cheapest change you can make to a part.'),

    h2('Stage 5: The Cut Itself'),
    p('With setup complete, the head follows the toolpath. Beam power melts a narrow line of material and assist gas blows the melt out of the underside of the cut.'),
    p('Feed rate is the balance point. Too fast and the beam does not fully penetrate, leaving an incomplete cut or heavy dross. Too slow and excess heat goes into the plate, widening the kerf and risking distortion on thin sheet.'),
    p('Realistic accuracy on typical sheet is about +/- 0.1 mm, widening on thicker plate as kerf taper and heat input grow. Flag any critical dimension before cutting rather than at inspection.'),

    h2('Stage 6: Separation, Deburring and Inspection'),
    p('Parts are held in the sheet by small tabs or by the surrounding skeleton until cutting finishes. They are then separated, and critical dimensions are checked before dispatch.'),
    p('A correctly parameterised fiber laser cut needs little or no deburring, which is one of its main advantages. Where dross does appear — usually on thicker plate or with incorrect gas settings — it is removed at this stage.'),

    h2('What Makes One Job Slower Than Another'),
    p('Two parts of identical size can differ several-fold in machine time. The drivers are:'),
    li('Total cut length, not part area. An intricate jali pattern has many times the cut length of a plain panel.'),
    li('Pierce count, as above.'),
    li('Material and thickness — thicker plate cuts slower and needs more gas.'),
    li('Assist gas choice, since nitrogen consumption is significant.'),
    li('Tolerance requirements, which may force a slower, more controlled feed.'),
    rich('If you are new to the process, start with ', ['what is CNC fiber laser cutting', '/blog/what-is-cnc-fiber-laser-cutting'], ' for the wider picture.'),

    h2('What This Means for Your Drawing'),
    p('Understanding the process changes how you design:'),
    li('Keep the smallest hole diameter at or above material thickness.'),
    li('Reduce unnecessary pierces where the design allows.'),
    li('Specify nitrogen only where the edge genuinely needs to be oxide-free.'),
    li('Allow for kerf on parts that must fit together.'),
    li('Send vectors with closed contours and no duplicate lines.'),
    rich('RG Tech runs CNC fiber laser cutting in Chennai on an 8000 x 2500 mm bed, cutting mild and stainless steel to 45 mm. Send a drawing through our ', ['contact form', '/contact'], ' and you get an itemised quote within 24 business hours.'),
]

export const post = makePost({
    slug: 'how-cnc-laser-cutting-works',
    title: 'How CNC Laser Cutting Works: Step by Step',
    sheetTitle: 'How CNC Laser Cutting Works',
    summary:
        'The six stages between your CAD file and a finished metal part — file preparation, nesting, machine setup, piercing, cutting and inspection — and how each one affects your cost and lead time.',
    tldr:
        'A CNC laser converts your drawing into a toolpath, nests parts to save material, then pierces and cuts with a focused beam while assist gas clears the melt. Cut length and pierce count drive cost far more than part area does.',
    readTime: '8 min read',
    mainImageUrl: IMAGES.machine,
    mainImageAlt: 'CNC fiber laser cutting machine in operation at RG Tech Engineering, Chennai',
    bannerEyebrow: 'PROCESS GUIDE',
    bannerHeading: 'How CNC Laser Cutting Works',
    bannerSubheading: 'From CAD File to Finished Part',
    bannerBadge: 'STEP BY STEP',
    metaTitle: 'How CNC Laser Cutting Works: Process, Assist Gas & Piercing',
    metaDescription:
        'How CNC laser cutting works, step by step: CAD prep, nesting, focus, assist gas, piercing and inspection — and how each stage affects your cost and lead time.',
    keywords: [
        'how cnc laser cutting works',
        'laser cutting process',
        'laser cutting assist gas',
        'laser cutting nesting',
        'laser piercing',
        'cnc laser cutting chennai',
    ],
    body,
    faqs: faqs([
        ['How does a CNC laser cutting machine work?',
            'A focused laser beam melts a narrow line of metal while assist gas blows the molten material out of the cut. A CNC controller moves the head along a toolpath generated from your CAD file, so the part matches the drawing and repeats identically.'],
        ['What is piercing in laser cutting?',
            'Before the beam can follow a contour it must burn an entry hole through the material, dwelling in one spot to do so. Piercing is slower than cutting, which is why parts with many holes cost more than the cut length alone suggests.'],
        ['Which assist gas is used in laser cutting?',
            'Oxygen for mild steel, where it speeds cutting but leaves an oxidised edge. Nitrogen for stainless, aluminium and anything to be welded or coated, giving a bright oxide-free edge. Compressed air for thin material where light oxide is acceptable.'],
        ['What is nesting in laser cutting?',
            'Arranging parts on the sheet to maximise yield. Good nesting rotates and interlocks parts, shares cut lines where possible and keeps enough spacing to avoid heat distortion. It is usually the biggest influence on material cost.'],
        ['Why do some laser cut parts cost more than others?',
            'Cost follows total cut length and pierce count, not part area. An intricate perforated panel can take many times longer than a plain blank of the same size.'],
        ['What is focal position in laser cutting?',
            'The point where the beam converges to its narrowest. Its position relative to the sheet surface is set for the material and thickness — incorrect focus produces a wide, rough kerf or an incomplete cut.'],
        ['Do laser cut parts need deburring?',
            'Usually not. A correctly parameterised fiber laser leaves minimal burr. Dross can appear on thicker plate or with wrong gas settings and is removed before dispatch.'],
        ['What accuracy can CNC laser cutting achieve?',
            'About +/- 0.1 mm on typical sheet thicknesses. Accuracy widens on thicker plate as kerf taper and heat input increase, so flag critical dimensions before cutting.'],
    ]),
})
