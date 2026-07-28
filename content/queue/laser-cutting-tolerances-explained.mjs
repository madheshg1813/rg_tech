import { createBuilder, IMAGES, makePost } from '../lib/pt.mjs'

const { p, h2, h3, li, nli, rich, image, table, callout, faqs } = createBuilder('lct')

const body = [
    p('Most tolerance disputes are not caused by a machine cutting badly. They are caused by a drawing that never said what mattered, and a supplier who assumed something different from the customer.'),
    p('This guide sets out what accuracy a CNC fiber laser realistically achieves, what makes it drift, and how to specify a part so it fits first time.'),

    h2('What Tolerance Can a Fiber Laser Actually Hold?'),
    p('On typical sheet thicknesses, a well-maintained fiber laser holds approximately +/- 0.1 mm on cut features. That figure is reliable for material up to around 6 mm and loosens as thickness increases.'),
    table(
        'Realistic laser cutting tolerance by material thickness',
        ['Thickness', 'Achievable tolerance', 'Main limiting factor'],
        [
            ['0.5 to 3 mm', '+/- 0.1 mm', 'Machine positioning'],
            ['3 to 8 mm', '+/- 0.1 mm', 'Machine positioning'],
            ['8 to 16 mm', '+/- 0.15 mm', 'Kerf taper begins to show'],
            ['16 to 25 mm', '+/- 0.2 mm', 'Taper and heat input'],
            ['25 to 45 mm', '+/- 0.3 mm or wider', 'Taper, heat input, edge squareness'],
        ]
    ),
    callout('tldr', 'Expect +/- 0.1 mm on sheet, widening to +/- 0.3 mm or more on heavy plate. If your part needs tighter than that on a specific feature, it needs machining after cutting — say so on the drawing.'),

    h2('The Four Things That Move a Dimension'),
    h3('1. Kerf width'),
    p('The beam removes material. That removed width — the kerf — is typically 0.1 to 0.4 mm depending on thickness and parameters. The machine compensates by offsetting the toolpath to one side of the line, so the finished part matches the drawing.'),
    p('This works well, but it means the software has to know which side of the line is scrap. On an open contour or an ambiguous geometry it can guess wrong, and you get a part half a kerf undersize.'),
    h3('2. Kerf taper'),
    p('The cut is very slightly wider at the top than at the bottom, because the beam is a cone converging to a focal point. On 2 mm sheet this is undetectable. On 30 mm plate it is measurable and visible.'),
    p('Taper matters most on parts that must seat flush against another surface, and on holes that a shaft passes through.'),
    h3('3. Heat input and distortion'),
    p('Cutting puts heat into the plate. Thin sheet with long cuts, or dense nesting where parts sit close together, can bow or ripple. A part that measures correctly but will not lie flat is still a rejected part.'),
    image(IMAGES.sheet, 'Flat laser cut sheet metal parts checked for dimensional accuracy at RG Tech Engineering', 'Controlled heat input and sensible nesting keep thin parts flat.'),
    h3('4. Material condition'),
    p('Sheet arrives with its own tolerance. Mill thickness varies within grade. Plate can carry internal stress from rolling that releases when a shape is cut from it, moving the part after it leaves the bed. None of this is the laser, but all of it lands in your measurement.'),

    h2('Cut Tolerance Is Not Assembly Tolerance'),
    p('This is the distinction that causes the most trouble. A laser cuts a flat blank accurately. What happens afterwards has its own error budget, and it is usually larger:'),
    li('Bending. Press brake tolerance on a bent flange is typically wider than the cutting tolerance, and bend allowance varies with material batch.'),
    li('Welding. Heat pulls assemblies out of position by amounts that dwarf +/- 0.1 mm.'),
    li('Coating. Powder coat adds measurable thickness, which matters on close-fitting parts and inside holes.'),
    rich('If a fabricated assembly has to hit a tight overall dimension, the cutting tolerance is rarely the constraint. Specify where it counts and leave the rest open — we cover the practical consequences in ', ['how CNC laser cutting works', '/blog/how-cnc-laser-cutting-works'], '.'),

    h2('ISO 9013 and Edge Quality'),
    rich('Thermal cut quality has a formal standard: ', ['ISO 9013', 'https://www.iso.org/standard/71133.html', true], ', which grades perpendicularity, surface roughness and dimensional deviation for laser, plasma and oxy-fuel cuts.'),
    p('Most commercial work never invokes it, and it is not needed for a bracket. But if you are working to a customer specification that calls out an edge quality class, put it on the drawing at enquiry stage rather than at inspection. It changes process choice, assist gas and feed rate — and therefore price.'),

    h2('How to Specify Tolerance So You Get What You Need'),
    p('Four practical rules, in order of how much trouble they save:'),
    nli('Do not put a blanket tight tolerance on every dimension. It raises price on features nobody measures and dilutes attention on the ones that matter.'),
    nli('Call out the critical dimensions specifically. Two or three flagged features get real attention; forty do not.'),
    nli('Distinguish between hole position and hole diameter. Position across a bolt pattern is usually the thing that decides whether parts assemble; diameter often has more room than the drawing implies.'),
    nli('State what happens after cutting. A part heading for bending, welding or coating needs different allowances from one going straight into service.'),
    callout('tip', 'If one feature genuinely needs better than +/- 0.05 mm, laser it slightly undersize and machine or ream it afterwards. That is normal practice and cheaper than trying to force the tolerance out of the cutting process.'),

    h2('What to Check When Parts Arrive'),
    p('A quick incoming check catches problems while they are still cheap to fix:'),
    li('Overall length and width against the drawing.'),
    li('Centre-to-centre distance across the widest bolt pattern, not individual hole positions.'),
    li('Flatness — lay the part on a known flat surface and look for rock.'),
    li('Edge squareness on thick plate, where taper is expected.'),
    li('Burr on the underside, which indicates parameters were off.'),
    rich('RG Tech cuts to approximately +/- 0.1 mm on typical sheet, on an 8000 x 2500 mm bed in Chennai. If your drawing has critical features, flag them when you send it through our ', ['contact form', '/contact'], ' and we will confirm what is achievable before you commit to an order.'),
    rich('Accuracy also depends on what you are cutting — see ', ['materials that can be laser cut', '/blog/materials-that-can-be-laser-cut'], ' for how thickness limits vary by metal.'),
]

export const post = makePost({
    slug: 'laser-cutting-tolerances-explained',
    title: 'Laser Cutting Tolerances Explained: What to Expect',
    sheetTitle: 'Laser Cutting Tolerances Explained',
    summary:
        'What accuracy a CNC fiber laser realistically holds, how kerf, taper, heat and material condition move a dimension, and how to specify tolerance on a drawing so parts fit first time.',
    tldr:
        'Expect around +/- 0.1 mm on sheet, widening to +/- 0.3 mm or more on heavy plate. Kerf, taper, heat input and material condition all contribute. Flag critical dimensions specifically rather than applying a blanket tight tolerance.',
    readTime: '7 min read',
    mainImageUrl: IMAGES.fiber,
    mainImageAlt: 'CNC fiber laser cutting steel to close tolerance at RG Tech Engineering Chennai',
    bannerEyebrow: 'ACCURACY GUIDE',
    bannerHeading: 'Laser Cutting Tolerances',
    bannerSubheading: 'Kerf, Taper & What to Put on the Drawing',
    bannerBadge: 'ISO 9013',
    metaTitle: 'Laser Cutting Tolerances Explained: Accuracy by Thickness',
    metaDescription:
        'Laser cutting tolerances explained: realistic accuracy by thickness, how kerf, taper and heat move a dimension, and how to specify critical features on a drawing.',
    keywords: [
        'laser cutting tolerances',
        'laser cutting accuracy',
        'kerf width laser cutting',
        'iso 9013 cut quality',
        'sheet metal tolerance',
        'precision laser cutting chennai',
    ],
    body,
    faqs: faqs([
        ['What tolerance can laser cutting achieve?',
            'Approximately +/- 0.1 mm on typical sheet thicknesses up to about 8 mm. Accuracy widens as thickness increases, reaching +/- 0.3 mm or more on plate around 45 mm.'],
        ['What is kerf in laser cutting?',
            'The width of material removed by the beam, typically 0.1 to 0.4 mm. The machine offsets the toolpath to compensate so the finished part matches the drawing dimension.'],
        ['What causes kerf taper?',
            'The beam is a cone converging to a focal point, so the cut is marginally wider at the top than the bottom. It is undetectable on thin sheet and measurable on heavy plate.'],
        ['Why do laser cut parts sometimes warp?',
            'Heat input. Thin sheet with long cuts, or parts nested very close together, can bow or ripple. Internal stress released from rolled plate can also move a part after cutting.'],
        ['Can laser cutting hold tolerances tighter than 0.05 mm?',
            'Not reliably as a cutting process. The normal approach is to cut slightly undersize and machine or ream the critical feature afterwards, which is cheaper than forcing the tolerance out of the laser.'],
        ['Does material thickness affect laser cutting accuracy?',
            'Yes, significantly. Thin sheet holds the tightest tolerance. As thickness increases, kerf taper and heat input both grow and accuracy loosens accordingly.'],
        ['What is ISO 9013?',
            'The international standard grading thermal cut quality — perpendicularity, surface roughness and dimensional deviation. If your specification calls out an edge quality class, state it at enquiry stage since it affects process and price.'],
        ['How should I specify tolerance on a laser cutting drawing?',
            'Flag only the dimensions that genuinely matter rather than applying a blanket tight tolerance. Distinguish hole position from hole diameter, and say what happens after cutting, since bending, welding and coating each add their own variation.'],
    ]),
})
