import { createBuilder, IMAGES, makePost } from '../lib/pt.mjs'

const { p, h2, h3, li, nli, rich, image, table, callout, faqs } = createBuilder('mtc')

const body = [
    p('"Can you laser cut this?" is the most common question we get, and the honest answer depends on two things: whether the material is a metal, and how thick it is.'),
    p('A CNC fiber laser cuts metal. It does not cut wood, acrylic, glass or stone — those need a CO2 laser or a waterjet. Within metals, each one behaves differently under the beam, and knowing which behaves well saves a lot of back and forth at quoting stage.'),

    h2('Materials a Fiber Laser Cuts Well'),
    table(
        'Metals cut on a CNC fiber laser, with practical thickness ranges',
        ['Material', 'Typical thickness at RG Tech', 'Assist gas', 'Notes'],
        [
            ['Mild steel', 'Up to 45 mm', 'Oxygen or nitrogen', 'The easiest and most economical material to cut'],
            ['Stainless steel', 'Up to 45 mm', 'Nitrogen', 'Bright, oxide-free edge ready to weld'],
            ['Aluminium', 'Up to 30 mm', 'Nitrogen', 'Reflective; needs correct parameters, cuts cleanly'],
            ['Copper', 'Up to 16 mm', 'Nitrogen', 'Highly reflective; needs back-reflection protection'],
            ['Brass', 'Up to 16 mm', 'Nitrogen', 'As copper — machine capability matters'],
            ['Galvanised steel', 'Sheet gauges', 'Nitrogen or air', 'Cuts well; zinc fume needs extraction'],
        ]
    ),
    callout('tldr', 'Mild steel, stainless and aluminium cover the large majority of jobs. Copper and brass are cut too, on machines equipped for reflective metals. Anything that is not a metal needs a different process entirely.'),

    h2('Mild Steel'),
    p('The workhorse. It absorbs the beam readily, cuts fast, and is the cheapest material per square metre. Mild steel is what most structural brackets, base plates, machine guards and fabricated frames are made from.'),
    p('The choice you have on mild steel is assist gas:'),
    li('Oxygen — faster on thicker plate because the reaction with iron adds heat. Leaves an oxide layer that must be cleaned before painting or powder coating.'),
    li('Nitrogen — slower and more expensive, but leaves a clean edge ready to coat or weld directly.'),
    rich('If the part is going straight for powder coating, the nitrogen premium often pays for itself in avoided cleaning labour. We explain the trade-off in ', ['how CNC laser cutting works', '/blog/how-cnc-laser-cutting-works'], '.'),

    h2('Stainless Steel'),
    p('Stainless is cut with nitrogen almost without exception. The inert gas clears molten metal without letting it oxidise, so the edge comes off bright and silver rather than blackened.'),
    p('That matters more on stainless than on anything else, because stainless parts are usually chosen for either corrosion resistance or appearance — and an oxidised cut edge compromises both. An oxide layer at the edge is a weak point for corrosion, and on architectural work it is simply visible.'),
    image(IMAGES.sheet, 'Stainless steel sheet metal components laser cut with a clean oxide-free edge', 'Nitrogen-assisted cutting leaves stainless edges bright and ready to weld.'),
    p('Common grades we cut are 304 and 316. Both behave predictably. 316 is marginally slower but the difference is not commercially significant.'),

    h2('Aluminium'),
    p('Aluminium reflects more of the beam than steel and conducts heat away from the cut faster, so it needs different parameters — higher power, nitrogen assist, and careful focus control.'),
    p('With those set correctly it cuts cleanly. Two things to know before you specify it:'),
    li('It is more prone to a small burr on the underside than steel, particularly on thicker sections.'),
    li('Thin aluminium sheet is more likely to move during cutting than steel of the same gauge, so tight tolerance on large thin parts needs discussion first.'),
    p('Where an alloy is heat-treated and the specification restricts the heat-affected zone, a cold process such as waterjet is the correct choice instead. Tell us at enquiry stage and we will say so.'),

    h2('Copper and Brass'),
    p('These are the materials where the machine matters more than the operator. Copper and brass reflect a large share of the incident beam straight back up the optical path toward the laser source.'),
    p('On a machine without back-reflection protection this damages the source — an expensive failure, which is why some shops will simply refuse copper work. Modern fiber lasers with isolation handle it safely, at reduced thickness compared to steel.'),
    callout('warning', 'If a supplier quotes copper or brass without asking about thickness, ask whether their machine has back-reflection protection. It is a reasonable question and any competent shop will answer it directly.'),

    h2('Materials a Fiber Laser Cannot Cut'),
    p('This list is as useful as the one above, and it is short:'),
    li('Wood, MDF and plywood — a CO2 laser cuts these; a fiber laser does not.'),
    li('Acrylic and most plastics — CO2 laser or router.'),
    li('Glass and stone — waterjet.'),
    li('Carbon fibre and composites — waterjet, because thermal cutting delaminates them.'),
    li('Leather, fabric, paper — CO2 laser.'),
    li('Any material with a PVC or chlorinated content — cutting these releases chlorine gas, which is both a health hazard and corrosive to machine components. No reputable shop will process them.'),
    p('Fiber and CO2 lasers differ in wavelength. Metals absorb the fiber wavelength well and organic materials do not, which is exactly why fiber took over metal cutting and CO2 remained the choice for everything else.'),

    h2('How Thickness Changes What Is Possible'),
    p('Capability is not just "can it cut through". Edge quality and accuracy both change with thickness:'),
    table(
        'What to expect at different thicknesses',
        ['Thickness', 'Edge quality', 'Accuracy', 'Speed'],
        [
            ['0.5 to 3 mm', 'Excellent, no burr', 'Best — around +/- 0.1 mm', 'Very fast'],
            ['3 to 12 mm', 'Very good', 'Around +/- 0.1 mm', 'Fast'],
            ['12 to 25 mm', 'Good, slight taper', 'Widening slightly', 'Moderate'],
            ['25 to 45 mm', 'Acceptable, visible taper', 'Loosest of the range', 'Slow'],
        ]
    ),
    rich('Kerf taper is the reason thicker plate loses accuracy — the cut is marginally wider at the top than the bottom. The mechanics behind it are covered in ', ['how CNC laser cutting works', '/blog/how-cnc-laser-cutting-works'], '.'),

    h2('Minimum Feature Size'),
    p('A useful rule regardless of material: the smallest reliable hole diameter is roughly equal to the material thickness. A 3 mm hole in 3 mm plate is fine. A 1 mm hole in 6 mm plate is not.'),
    p('Below that ratio the beam cannot clear molten material from the hole quickly enough, and you get an incomplete or rough opening. The same logic applies to thin slots and narrow tabs — keep them at or above material thickness.'),

    h2('What to Tell Us When You Enquire'),
    p('Four details let us quote accurately first time:'),
    nli('Material and grade — "3 mm stainless 304", not just "steel".'),
    nli('Thickness in millimetres.'),
    nli('Quantity, since it changes nesting and therefore price per part.'),
    nli('What happens next — welding, bending, powder coating — because it determines assist gas.'),
    rich('RG Tech cuts mild steel, stainless, aluminium, copper and brass on an 8000 x 2500 mm bed in Chennai. Send your drawing through our ', ['contact form', '/contact'], ' and we will confirm whether the material and thickness are within capability before quoting.'),
]

export const post = makePost({
    slug: 'materials-that-can-be-laser-cut',
    title: 'Materials That Can Be Laser Cut: A Complete Guide',
    sheetTitle: 'Materials That Can Be Laser Cut',
    summary:
        'Which metals a CNC fiber laser cuts and to what thickness — mild steel, stainless, aluminium, copper and brass — plus the materials it cannot cut and why.',
    tldr:
        'Fiber lasers cut metals only: mild steel and stainless to 45 mm, aluminium to 30 mm, copper and brass to 16 mm on machines with back-reflection protection. Wood, acrylic, glass and composites need a CO2 laser or waterjet.',
    readTime: '8 min read',
    mainImageUrl: IMAGES.sheet,
    mainImageAlt: 'Laser cut sheet metal components in mild steel and stainless at RG Tech Engineering Chennai',
    bannerEyebrow: 'MATERIAL GUIDE',
    bannerHeading: 'What Can Be Laser Cut',
    bannerSubheading: 'Metals, Thickness Limits & Assist Gas',
    bannerBadge: 'UP TO 45 MM',
    metaTitle: 'Materials That Can Be Laser Cut: Metals, Thickness & Limits',
    metaDescription:
        'Which metals a CNC fiber laser cuts and to what thickness — mild steel, stainless, aluminium, copper, brass — plus what needs a CO2 laser or waterjet instead.',
    keywords: [
        'materials that can be laser cut',
        'fiber laser cutting materials',
        'laser cutting thickness',
        'can a laser cut aluminium',
        'laser cutting copper brass',
        'laser cutting services chennai',
    ],
    body,
    faqs: faqs([
        ['What materials can a CNC fiber laser cut?',
            'Metals only — mild steel, stainless steel, aluminium, copper, brass and galvanised steel. Non-metals such as wood, acrylic, glass and composites require a CO2 laser or waterjet instead.'],
        ['What is the maximum thickness for laser cutting?',
            'It depends on the metal and machine power. At RG Tech we cut mild and stainless steel to 45 mm, aluminium to 30 mm, and copper or brass to 16 mm.'],
        ['Can a fiber laser cut aluminium?',
            'Yes. Aluminium reflects more beam energy and conducts heat away faster than steel, so it needs higher power and nitrogen assist, but it cuts cleanly with correct parameters.'],
        ['Can a laser cut copper and brass?',
            'Yes, on machines fitted with back-reflection protection. Both metals reflect beam energy back toward the laser source and will damage equipment not built to handle it, which is why some shops decline the work.'],
        ['Why can a fiber laser not cut wood or acrylic?',
            'Wavelength. Metals absorb the fiber laser wavelength efficiently while organic materials do not. Wood, acrylic, leather and fabric are cut on CO2 lasers.'],
        ['What is the smallest hole a laser can cut?',
            'As a working rule, the minimum reliable hole diameter is roughly equal to material thickness. Below that ratio the beam cannot clear molten material fast enough and the hole comes out rough or incomplete.'],
        ['Which assist gas should I choose for my material?',
            'Oxygen for thicker mild steel where an oxidised edge is acceptable. Nitrogen for stainless, aluminium, and any part going straight to welding or coating, since it leaves a bright oxide-free edge.'],
        ['Can PVC or chlorinated plastics be laser cut?',
            'No. Cutting them releases chlorine gas, which is hazardous to operators and corrodes machine components. No responsible shop will process these materials.'],
    ]),
})
