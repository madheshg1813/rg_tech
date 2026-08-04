import { createBuilder, IMAGES, makePost } from '../lib/pt.mjs'

const { p, h2, h3, li, nli, rich, image, table, callout, faqs } = createBuilder('lcg')

const body = [
    p('Almost every enquiry opens the same way: what does laser cutting cost per hour? It is a reasonable question with an unhelpful answer, because machine time is only one input and rarely the largest one.'),
    p('This guide breaks a laser cutting quote into the parts it is actually made of, so you can see where your money goes and which of your own decisions move the number.'),

    callout('tldr', 'Laser cutting is priced per job, not per hour. Material is usually the biggest line, then cutting time (driven by cut length and piercing count, not part area), then setup. Quantity, nesting efficiency and drawing quality are the three levers you control.'),

    h2('Why Nobody Can Quote You a Rate Per Hour'),
    p('A 2 mm mild steel bracket and a 25 mm plate flange occupy the same machine, but they do not consume it at the same rate. Thick plate cuts slowly, needs more assist gas, and takes a long pierce at the start of every closed contour. The same hour of machine time can produce forty of one part or three of the other.'),
    p('Quoting per hour would mean either overcharging thin work or underpricing thick work. So a real quote is built from the job in front of it.'),

    h2('What a Quote Is Actually Made Of'),
    table(
        'The components of a laser cutting price',
        ['Component', 'What drives it', 'Typical share'],
        [
            ['Material', 'Grade, thickness, sheet size, market price', 'Often the largest'],
            ['Cutting time', 'Total cut length and number of pierces', 'Second largest'],
            ['Piercing', 'One pierce per closed contour, longer on thick plate', 'Hidden in cutting time'],
            ['Assist gas', 'Nitrogen costs more than oxygen; thickness drives volume', 'Small but real'],
            ['Setup and programming', 'Nesting, parameter selection, sheet loading', 'Fixed per job'],
            ['Secondary work', 'Deburring, bending, coating if quoted', 'Varies'],
        ]
    ),

    h3('Material'),
    p('On most jobs the metal costs more than the cutting. Grade matters more than people expect: stainless is several times the price of mild steel, and within stainless the jump from 304 to 316 is significant. Thickness compounds it, because you pay by weight.'),
    p('Metal prices also move. A quote that was accurate in March may not be in June, which is why quotations carry a validity period.'),

    h3('Cut length, not part area'),
    p('This is the single most misunderstood part of laser pricing. The machine charges you for the distance the beam travels, not the size of the part.'),
    p('A plain 300 mm square plate has 1,200 mm of cut. The same square with a decorative pattern inside it might have 40,000 mm of cut. Same material, same sheet space, thirty times the machine time. This is why an ornamental jali panel costs far more than its raw size suggests.'),
    image(IMAGES.panel, 'Intricate laser cut decorative metal panel showing high cut length relative to part size', 'Pattern density, not panel size, is what drives the cutting time on decorative work.'),

    h3('Piercing'),
    p('Every closed shape needs the beam to punch through the material before it can start travelling. On thin sheet a pierce is nearly instant. On 25 mm plate it takes noticeably longer, and a part with sixty holes pays that cost sixty times.'),
    p('If a design has a large number of small holes in thick plate, the pierces can cost more than the cutting.'),

    h2('The Three Levers You Control'),

    h3('1. Quantity'),
    p('Setup and programming are largely fixed per job. Spread across one part they are the whole price; spread across two hundred they disappear. Per-unit cost falls steeply from one to about twenty pieces, then flattens.'),
    callout('tip', 'If you know you will repeat an order, say so at quoting stage. Knowing a job will run again changes how we nest and program it, and that is worth more than haggling on the first batch.'),

    h3('2. Nesting efficiency'),
    p('Parts are arranged on the sheet to waste as little as possible. You pay for the sheet, not the parts, so skeleton waste is your money.'),
    p('Two things help: flexible quantities, and parts that tessellate. If you need "about 50" rather than exactly 50, we can often fill the sheet and give you 54 for the same material cost.'),

    h3('3. Drawing quality'),
    rich('A clean, manufacturable file quotes faster and cuts cleaner. A file with open contours, duplicate lines or text left as fonts needs repair work before it can be programmed, and that time is real. We cover this in detail in ', ['preparing DXF files for laser cutting', '/blog/dxf-file-preparation-for-laser-cutting'], '.'),

    h2('Things That Quietly Add Cost'),
    li('Very small holes in thick plate. As a rule, a hole smaller than the material thickness is difficult and sometimes impossible; it may need drilling instead.'),
    li('Tight tolerances applied everywhere rather than where they matter.'),
    li('Nitrogen-cut stainless for a cosmetic edge, where oxygen would have done for a part that gets painted.'),
    li('Sharp internal corners, which need a dwell and can burn; a small radius cuts faster and looks better.'),
    li('Splitting an order across several deliveries, each of which is a separate setup and dispatch.'),

    h2('How to Get a Quote You Can Rely On'),
    p('Send these five things and a quote comes back quickly and does not move afterwards:'),
    nli('The DXF or DWG, drawn 1:1 in millimetres.'),
    nli('Material and grade — "mild steel" is not enough if you meant SS 304.'),
    nli('Thickness.'),
    nli('Quantity, and whether it is likely to repeat.'),
    nli('What happens to the part next: bending, welding, powder coating, or straight into service.'),
    rich('That last point matters more than it sounds. A part heading for a press brake needs different allowances from one going straight to assembly, as covered in ', ['laser cutting tolerances explained', '/blog/laser-cutting-tolerances-explained'], '.'),

    h2('Is Laser Always the Cheapest Route?'),
    p('No, and it is worth saying so. For very thick plate where edge quality does not matter, plasma is usually cheaper. For materials that cannot take heat, waterjet is the answer even though it costs more. For a simple round hole in one piece of sheet, a drill beats programming a laser.'),
    rich('We set out where each process wins in ', ['laser cutting vs plasma cutting', '/blog/laser-cutting-vs-plasma-cutting'], ' and ', ['laser cutting vs waterjet cutting', '/blog/laser-cutting-vs-waterjet-cutting'], '. If your job is better suited to another process, we would rather tell you than take the order.'),

    callout('warning', 'Be cautious of any supplier quoting a flat per-hour or per-kilogram rate without seeing your drawing. It means they are averaging, and on an unusual job the average is wrong in one direction or the other.'),
]

export const post = makePost({
    slug: 'laser-cutting-cost-guide',
    title: 'What Does Laser Cutting Cost? A Practical Pricing Guide',
    sheetTitle: 'Laser Cutting Cost Guide',
    summary:
        'What actually goes into a laser cutting quote — material, cut length, piercing, gas and setup — and the three decisions that move your price the most.',
    tldr:
        'Laser cutting is priced per job rather than per hour. Material is usually the biggest line, then cutting time driven by total cut length and piercing count. Quantity, nesting and drawing quality are the levers you control.',
    readTime: '8 min read',
    mainImageUrl: IMAGES.machine,
    mainImageAlt: 'CNC fiber laser cutting machine processing a nested sheet at RG Tech Engineering Chennai',
    bannerEyebrow: 'PRICING GUIDE',
    bannerHeading: 'What Laser Cutting Costs',
    bannerSubheading: 'Where the Money Goes in a Cutting Quote',
    bannerBadge: 'COST BREAKDOWN',
    metaTitle: 'Laser Cutting Cost Guide: How Pricing Actually Works',
    metaDescription:
        'How laser cutting is priced: material, cut length, piercing, assist gas and setup. What raises cost, what lowers it, and the five details that get you an accurate quote.',
    keywords: [
        'laser cutting cost',
        'laser cutting price per hour',
        'laser cutting quote',
        'sheet metal cutting cost',
        'cnc laser cutting rate chennai',
        'laser cutting cost calculation',
    ],
    body,
    faqs: faqs([
        ['How much does laser cutting cost per hour?',
            'Reputable suppliers do not quote a flat hourly rate, because a 2 mm bracket and a 25 mm plate consume the same hour very differently. Price is built from material, total cut length, piercing count, assist gas and setup for your specific job.'],
        ['What is the biggest cost in laser cutting?',
            'On most jobs, the material itself. Grade and thickness drive it, since you pay by weight and stainless costs several times more than mild steel. Cutting time is usually the second largest component.'],
        ['Why does a decorative panel cost more than a plain plate of the same size?',
            'Because the machine charges for the distance the beam travels, not the area of the part. A plain 300 mm square has about 1,200 mm of cut; the same square with a jali pattern can have 40,000 mm.'],
        ['Does ordering more parts reduce the price per piece?',
            'Yes, substantially at first. Setup and programming are largely fixed per job, so per-unit cost falls steeply from one piece up to roughly twenty, then flattens out.'],
        ['What information do you need to give me an accurate quote?',
            'A DXF or DWG drawn 1:1 in millimetres, the material and grade, the thickness, the quantity, and what happens to the part after cutting — bending, welding, coating or straight into service.'],
        ['Why do laser cutting quotes expire?',
            'Metal prices move. Since material is usually the largest line in the quote, a price that was accurate one month may not hold the next, so quotations carry a validity period.'],
        ['Is laser cutting cheaper than plasma or waterjet?',
            'Not always. Plasma is usually cheaper on very thick plate where edge quality is not critical, and waterjet is the right answer for heat-sensitive materials despite costing more. Laser wins on precision and edge finish in sheet and moderate plate.'],
        ['Can I reduce cost by changing my design?',
            'Often, yes. Avoiding holes smaller than the material thickness, adding small radii to sharp internal corners, allowing flexible quantities so the sheet nests fully, and applying tight tolerances only where they matter all reduce price.'],
    ]),
})
