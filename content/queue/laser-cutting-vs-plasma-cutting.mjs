import { createBuilder, IMAGES, makePost } from '../lib/pt.mjs'

const { p, h2, h3, li, nli, rich, image, table, callout, faqs } = createBuilder('lvp')

const body = [
    p('Plasma is cheaper per hour. Laser is more accurate. That much is common knowledge — and it is also where most comparisons stop, which is why people still pick the wrong one and pay for it twice.'),
    p('This guide covers what actually separates the two processes: tolerance, edge quality, thickness range, heat distortion, and the finishing costs that rarely appear on a quote but always appear on the invoice.'),

    h2('Laser Cutting vs Plasma Cutting: The Short Answer'),
    table(
        'CNC fiber laser vs CNC plasma at a glance',
        ['Criterion', 'Fiber laser', 'Plasma'],
        [
            ['Typical tolerance', '+/- 0.1 mm', '+/- 0.5 to 1.5 mm'],
            ['Edge finish', 'Clean, square, minimal burr', 'Rougher, dross common, bevelled edge'],
            ['Heat-affected zone', 'Very narrow', 'Wide'],
            ['Thin sheet (under 6 mm)', 'Excellent', 'Poor to moderate'],
            ['Thick plate (over 25 mm)', 'Limited by machine power', 'Strong'],
            ['Kerf width', '0.1 to 0.4 mm', '1.5 to 4 mm'],
            ['Small holes', 'Down to material thickness', 'Roughly 2x thickness minimum'],
            ['Secondary finishing', 'Usually none', 'Often deburring or grinding'],
            ['Cost per hour', 'Higher', 'Lower'],
            ['Cost per finished part', 'Often lower on sheet', 'Often lower on heavy plate'],
        ]
    ),
    callout('tldr', 'Choose laser for sheet and medium plate where tolerance, hole detail or finish matter. Choose plasma for thick structural steel where a millimetre either way is irrelevant. The hourly rate is the wrong number to compare.'),

    h2('How the Two Processes Actually Differ'),
    p('Both are thermal processes — both melt metal and blow it out of the cut. The difference is how the heat is delivered, and that single difference drives every other characteristic.'),
    h3('Fiber laser'),
    p('A laser beam is focused to a spot roughly 0.1 to 0.4 mm across. Because the energy is concentrated into that tiny area, very little surrounding material is heated. The cut is narrow, the edge is close to square, and the part comes off the bed dimensionally close to the drawing.'),
    image(IMAGES.fiber, 'CNC fiber laser cutting head producing a narrow kerf in steel sheet', 'The focused spot is why laser kerf is measured in tenths of a millimetre.'),
    h3('Plasma'),
    p('Plasma forces gas through a constricted arc, producing a jet of ionised gas at roughly 20,000 degrees Celsius. That jet is far wider than a laser spot, so it removes more material, heats more of the surrounding plate, and leaves a cut edge with a visible bevel — typically 3 to 8 degrees off square.'),
    p('That bevel is the detail most people miss. On a bracket that gets welded, nobody notices. On a part that has to sit flush against another face, it becomes a fitting problem on site.'),

    h2('Tolerance and Accuracy'),
    p('A well-maintained fiber laser holds about +/- 0.1 mm on typical sheet thicknesses. Plasma realistically holds +/- 0.5 mm at best on thin material, widening to +/- 1.5 mm on heavy plate.'),
    p('Whether that gap matters depends entirely on what happens next:'),
    li('Parts that bolt together through matched hole patterns — laser, without question. A 1 mm positional error across a bolt circle turns into holes that will not line up.'),
    li('Parts that get welded into a jig — plasma is usually fine, because the jig sets the final position, not the cut.'),
    li('Parts with a visible edge in the finished product — laser, because plasma dross and bevel show through paint and powder coat.'),
    li('Structural plate that gets drilled later — plasma, and put the money into the drilling instead.'),
    rich('Cut edge quality has a formal standard, ', ['ISO 9013', 'https://www.iso.org/standard/71133.html', true], ', which grades perpendicularity and surface roughness for thermal cuts. If your drawing calls out an edge quality class, say so at quoting stage — it changes the process choice. We go deeper in ', ['laser cutting tolerances explained', '/blog/laser-cutting-tolerances-explained'], '.'),

    h2('Thickness: Where Each Process Wins'),
    p('This is the clearest dividing line, and it is not where most people assume it is.'),
    table(
        'Process suitability by material thickness',
        ['Thickness', 'Better choice', 'Why'],
        [
            ['Under 3 mm', 'Fiber laser', 'Plasma struggles to hold an edge; laser is faster and cleaner'],
            ['3 to 12 mm', 'Fiber laser', 'Laser still faster, no dross, no secondary work'],
            ['12 to 25 mm', 'Either', 'Decided by tolerance and finish, not by the process'],
            ['25 to 45 mm', 'Fiber laser if power allows', 'Laser edge still cleaner; speed advantage narrows'],
            ['Over 45 mm', 'Plasma', 'Beyond most fiber laser capability'],
        ]
    ),
    rich('At RG Tech we cut mild and stainless steel up to 45 mm on our fiber laser. Above that we will tell you plainly that plasma or waterjet is the right process rather than take a job the machine should not be doing. Full capability is on our ', ['laser cutting services page', '/chennai/laser-cutting-services'], '.'),

    h2('The Cost Comparison Everyone Gets Wrong'),
    p('Plasma has a lower hourly rate. That is true and it is also the least useful fact in this comparison, because hourly rate is not what you pay for. You pay for finished parts.'),
    p('Four costs move the total, and three of them favour laser on sheet work:'),
    nli('Cutting speed. On material under 6 mm a fiber laser is typically two to three times faster, so the higher hourly rate is spread across far more parts.'),
    nli('Kerf and nesting. Plasma kerf can be ten times wider. Across a densely nested sheet that lost material is real money, and it recurs on every sheet.'),
    nli('Secondary operations. Plasma parts frequently need deburring or grinding before coating. That labour is invisible on the cutting quote and very visible on the final cost.'),
    nli('Rework. A part cut 1 mm out of position that has to be re-made costs the whole part again, plus the schedule slip.'),
    callout('tip', 'Ask for a price per finished part, not per hour. If the quote excludes deburring, ask who is doing it and whether that time is in the number.'),
    rich('The mechanics behind those first two points — cut length, pierce count and nesting — are covered in ', ['how CNC laser cutting works', '/blog/how-cnc-laser-cutting-works'], '.'),

    h2('Material Compatibility'),
    p('Plasma requires an electrically conductive material — it cannot cut plastics, wood or composites at all. Fiber laser also handles only metals, but has its own restriction worth knowing.'),
    li('Mild steel — both process it well. Laser gives the cleaner edge.'),
    li('Stainless steel — laser with nitrogen leaves a bright, oxide-free edge ready to weld. Plasma leaves an oxidised edge that needs cleaning first.'),
    li('Aluminium — laser handles it with correct parameters. Plasma works but the edge is generally poorer.'),
    li('Copper and brass — laser only, and only on machines with back-reflection protection. These metals reflect beam energy back into the source and will damage equipment not built for it.'),
    li('Very thick carbon steel — plasma, comfortably.'),

    h2('Heat Distortion on Thin Sheet'),
    p('Heat input is where plasma quietly causes trouble. A wider heat-affected zone puts more energy into the plate, and thin sheet responds by warping.'),
    p('On a 2 mm panel with a long cut, plasma can leave a part that will not sit flat. No amount of careful assembly fixes a bowed panel — it has to be re-cut. Fiber laser concentrates heat into a narrow band and the part comes off the bed flat.'),
    image(IMAGES.sheet, 'Flat sheet metal components cut on a CNC fiber laser with no visible distortion', 'Narrow heat input is why laser-cut thin sheet stays flat.'),

    h2('When Plasma Is Genuinely the Right Choice'),
    p('This is not an argument that laser always wins. Plasma is the correct process when:'),
    li('Plate is thicker than a fiber laser can reach.'),
    li('Tolerance is loose and the edge will be welded or machined afterwards anyway.'),
    li('Volume is high, parts are simple, and the budget is tight.'),
    li('The job is structural steelwork rather than precision components.'),
    p('Specifying laser for 30 mm structural gussets that get welded into a frame is money spent on precision nobody will ever see.'),

    h2('How to Decide on Your Job'),
    p('Four questions settle it in most cases:'),
    nli('What tolerance does the drawing actually require — not what would be nice, what is required?'),
    nli('Will the cut edge be visible or coated in the finished product?'),
    nli('How thick is the material?'),
    nli('Does anything bolt to it through matched holes?'),
    rich('Tight tolerance, visible edge, under 45 mm, or matched holes: laser. Otherwise plasma probably saves you money. If you are unsure, send the drawing through our ', ['contact form', '/contact'], ' and we will tell you which process suits it — including when that means we are not the right supplier for the job.'),
]

export const post = makePost({
    slug: 'laser-cutting-vs-plasma-cutting',
    title: 'Laser Cutting vs Plasma Cutting: Which Should You Choose?',
    sheetTitle: 'Laser Cutting vs Plasma Cutting',
    summary:
        'A practical comparison of CNC fiber laser and plasma cutting — tolerance, edge quality, thickness range, heat distortion and the finishing costs that decide which process is actually cheaper per finished part.',
    tldr:
        'Laser holds about +/- 0.1 mm with a clean square edge; plasma holds +/- 0.5 to 1.5 mm with a bevel and dross. Use laser for sheet and medium plate where tolerance or finish matter, plasma for thick structural steel. Compare cost per finished part, not per hour.',
    readTime: '9 min read',
    mainImageUrl: IMAGES.fiber,
    mainImageAlt: 'CNC fiber laser cutting steel sheet, compared with plasma cutting, at RG Tech Engineering Chennai',
    bannerEyebrow: 'PROCESS COMPARISON',
    bannerHeading: 'Laser vs Plasma',
    bannerSubheading: 'Tolerance, Edge Quality & Real Cost',
    bannerBadge: 'ISO 9013 EDGE QUALITY',
    metaTitle: 'Laser Cutting vs Plasma Cutting: Tolerance, Cost & Edge Quality',
    metaDescription:
        'Laser vs plasma cutting compared: tolerance, edge finish, thickness limits and real cost per finished part. Know which process suits your job before you order.',
    keywords: [
        'laser cutting vs plasma cutting',
        'plasma vs laser cutting',
        'laser cutting tolerance',
        'plasma cutting tolerance',
        'metal cutting process comparison',
        'cnc cutting chennai',
    ],
    body,
    faqs: faqs([
        ['Is laser cutting better than plasma cutting?',
            'For sheet and medium plate, yes — laser holds tighter tolerance, leaves a square oxide-free edge and rarely needs secondary finishing. For plate thicker than a fiber laser can reach, or loose-tolerance structural work, plasma is the better and cheaper choice.'],
        ['Is plasma cutting cheaper than laser cutting?',
            'Per hour, yes. Per finished part, often not. Laser is two to three times faster on thin sheet, wastes far less material to kerf, and usually needs no deburring. Compare quotes on cost per finished part including any secondary work.'],
        ['What tolerance can plasma cutting hold?',
            'Realistically +/- 0.5 mm on thin material, widening to +/- 1.5 mm on heavy plate. Fiber laser holds roughly +/- 0.1 mm on typical sheet thicknesses.'],
        ['Does plasma cutting leave a bevel?',
            'Yes. Plasma cuts typically show a 3 to 8 degree bevel because the arc is cone-shaped. It is irrelevant on welded parts but becomes a fitting problem where a face must sit flush.'],
        ['Which is better for stainless steel, laser or plasma?',
            'Laser with nitrogen assist. It leaves a bright, oxide-free edge that can be welded or coated directly. Plasma leaves an oxidised edge that must be cleaned first.'],
        ['Can plasma cut thin sheet metal?',
            'It can, but poorly. Below about 3 mm the heat input tends to warp the sheet and the edge quality drops sharply. Fiber laser is the correct process for thin material.'],
        ['What thickness is too thick for laser cutting?',
            'It depends on machine power. RG Tech cuts mild and stainless steel up to 45 mm. Beyond that, plasma or waterjet is the appropriate process and we will say so rather than take the job.'],
        ['Does laser cutting need deburring?',
            'Usually not. A correctly parameterised fiber laser cut leaves minimal to no burr, which is one of its main cost advantages over plasma on parts heading for coating or assembly.'],
    ]),
})
