/**
 * Article content for "What Is CNC Fiber Laser Cutting?".
 *
 * Kept separate from scripts/publish-cnc-article.mjs so the same document can be
 * published to Sanity, previewed locally, or re-used without touching transport
 * code. Exports the author, category and post documents.
 */

const IMG = 'https://res.cloudinary.com/o1ytbfuz/image/upload'
const HERO = `${IMG}/v1785177077/rg-tech/hero-laser`
const IMG_FIBER = `${IMG}/v1785177058/rg-tech/gallery/laser-cutting-services/kw_fiber_hd`
const IMG_MACHINE = `${IMG}/v1785177058/rg-tech/gallery/laser-cutting-services/kw_cnc_machine_hd`
const IMG_SHEET = `${IMG}/v1785177070/rg-tech/gallery/sheet-metal-laser-cutting/sm_01`
const IMG_PANEL = `${IMG}/v1785176986/rg-tech/gallery/decorative-metal-panels/rg-tech-catelog-vol-02_page-0054`

/* ---------------------------------------------------- portable text helpers */

let k = 0
const key = () => `k${++k}`

const span = (text, marks = []) => ({ _type: 'span', _key: key(), text, marks })

const block = (style, children, extra = {}) => ({
    _type: 'block',
    _key: key(),
    style,
    markDefs: extra.markDefs || [],
    children,
    ...(extra.listItem ? { listItem: extra.listItem, level: 1 } : {}),
})

const p = (text) => block('normal', [span(text)])
const h2 = (text) => block('h2', [span(text)])
const h3 = (text) => block('h3', [span(text)])
const li = (text) => block('normal', [span(text)], { listItem: 'bullet' })
const nli = (text) => block('normal', [span(text)], { listItem: 'number' })

/** Paragraph with inline links: rich('Text ', ['anchor', '/url', external?], ' more') */
const rich = (...parts) => {
    const markDefs = []
    const children = []
    for (const part of parts) {
        if (typeof part === 'string') {
            children.push(span(part))
        } else {
            const [text, href, external = false] = part
            const _key = key()
            markDefs.push({ _type: 'link', _key, href, external })
            children.push(span(text, [_key]))
        }
    }
    return block('normal', children, { markDefs })
}

const image = (url, alt, caption) => ({
    _type: 'contentImage',
    _key: key(),
    externalUrl: url,
    alt,
    ...(caption ? { caption } : {}),
})

const table = (caption, headers, rows) => ({
    _type: 'contentTable',
    _key: key(),
    caption,
    headers,
    rows: rows.map((cells) => ({ _type: 'tableRow', _key: key(), cells })),
})

const callout = (tone, text) => ({ _type: 'callout', _key: key(), tone, text })

/* --------------------------------------------------------------- documents */

const AUTHOR_ID = 'author.madhesh-g'
const CATEGORY_ID = 'category.laser-cutting-guides'
const POST_ID = 'post.what-is-cnc-fiber-laser-cutting'

const author = {
    _id: AUTHOR_ID,
    _type: 'author',
    name: 'Madhesh G',
    slug: { _type: 'slug', current: 'madhesh-g' },
    role: 'Content Writer',
    bio: 'Madhesh G writes about CNC fiber laser cutting, sheet metal fabrication and manufacturing process selection for RG Tech Engineering Works, Chennai.',
    email: 'admin@rgtechengineeringworks.com',
}

const category = {
    _id: CATEGORY_ID,
    _type: 'category',
    title: 'Laser Cutting Guides',
    slug: { _type: 'slug', current: 'laser-cutting-guides' },
    description: 'Technical explainers on CNC fiber laser cutting and metal fabrication.',
}

const body = [
    p('If you have been quoted for "laser cutting" and wondered what you are actually paying for, this guide explains the process end to end: how a fiber laser cuts metal, what it can and cannot do, the thicknesses and tolerances that are realistic, and how it compares with plasma and waterjet.'),

    h2('What Is CNC Fiber Laser Cutting?'),
    p('CNC fiber laser cutting is a thermal cutting process. A high-power laser beam is generated in an optically pumped fiber, delivered to a cutting head, and focused to a spot roughly 0.1–0.4 mm across. At that spot the metal is melted and vaporised almost instantly, while a jet of assist gas blows the molten material out of the cut. The head is driven along a path by a CNC controller reading your CAD file.'),
    p('The word "CNC" means the movement is computer controlled, so the cut follows your drawing exactly and repeats identically on part one and part one thousand. "Fiber" describes how the beam is produced — and that distinction matters more than most buyers realise.'),
    image(IMG_FIBER, 'CNC fiber laser cutting head focusing the beam onto a steel sheet', 'The beam is focused to a spot a few tenths of a millimetre wide — this is why fiber laser edges are so clean.'),

    h3('Fiber Laser vs CO2 Laser: Why the Source Matters'),
    p('Older industrial cutters used CO2 gas lasers. Fiber lasers have largely replaced them for sheet metal work because the beam wavelength (around 1.06 microns) is absorbed far better by metals than the 10.6-micron CO2 wavelength.'),
    li('Faster on thin sheet — often two to three times the cutting speed of an equivalent CO2 machine.'),
    li('Cuts reflective metals such as copper and brass, which CO2 lasers struggle with and can be damaged by.'),
    li('No mirrors or laser gas to maintain, so running cost and downtime are lower.'),
    li('Much higher electrical efficiency, which keeps the per-part cost down on long runs.'),
    rich('The trade-off is that CO2 still handles non-metals like acrylic and wood, which fiber cannot cut. For a broader technical primer on the underlying process, ', ['TWI has a good overview of laser cutting', 'https://www.twi-global.com/technical-knowledge/faqs/what-is-laser-cutting', true], '.'),

    h2('How the CNC Fiber Laser Cutting Process Works'),
    p('From your file to a finished part, the sequence is consistent:'),
    nli('CAD file preparation — your DXF, DWG or STEP file is checked for open contours, duplicate lines and features too small to cut.'),
    nli('Nesting — parts are arranged on the sheet to maximise yield. Good nesting is where most of the material saving on a job comes from.'),
    nli('Machine setup — the correct nozzle, focal length and assist gas are selected for the material and thickness.'),
    nli('Piercing and cutting — the beam pierces the sheet, then follows the contour at a feed rate matched to the material.'),
    nli('Deburring and inspection — parts are separated, edges checked, and critical dimensions verified before dispatch.'),

    h3('Assist Gas: The Detail That Decides Your Edge Quality'),
    p('Assist gas does the work of clearing molten metal from the kerf, and the choice changes both cost and finish:'),
    li('Oxygen — used on mild steel. It adds an exothermic reaction that speeds cutting on thicker plate, but leaves an oxidised edge that must be cleaned before painting or powder coating.'),
    li('Nitrogen — an inert cut that leaves a clean, bright, oxide-free edge. Essential for stainless steel and for anything being welded or coated straight after cutting. It uses far more gas, so it costs more.'),
    li('Compressed air — an economical middle ground for thin mild steel and aluminium where a slight edge oxide is acceptable.'),
    callout('tip', 'If your parts are going straight to powder coating or welding, ask for a nitrogen cut. Paying a little more at the cutting stage is cheaper than grinding oxide off every edge afterwards.'),

    h2('What Materials and Thicknesses Can Be Fiber Laser Cut?'),
    p('Capability varies by machine power. The table below reflects what RG Tech Engineering runs on our CNC fiber laser in Chennai:'),
    table(
        'CNC fiber laser cutting capability at RG Tech Engineering, Chennai',
        ['Material', 'Maximum thickness', 'Typical assist gas', 'Notes'],
        [
            ['Mild steel (MS)', 'Up to 45 mm', 'Oxygen', 'Most economical; oxide edge needs cleaning before coating'],
            ['Stainless steel (SS 304/316/430)', 'Up to 45 mm', 'Nitrogen', 'Bright, oxide-free edge suitable for direct welding'],
            ['Aluminium', 'Up to 30 mm', 'Nitrogen', 'Reflective and highly conductive; needs correct parameters'],
            ['Copper', 'Up to 16 mm', 'Nitrogen', 'Requires back-reflection protection on the laser source'],
            ['Brass', 'Up to 16 mm', 'Nitrogen', 'As with copper, only cut on machines built to handle reflection'],
        ]
    ),
    p('Maximum sheet size matters as much as thickness. Our bed takes sheets up to 8000 x 2500 mm, which means long structural members and large architectural panels are cut in one piece instead of being welded together from smaller sheets.'),
    image(IMG_SHEET, 'Sheet metal parts cut on a CNC fiber laser at RG Tech Engineering Chennai', 'Nested sheet metal components cut in a single setup.'),

    h2('CNC Fiber Laser Cutting Tolerance and Accuracy'),
    p('Realistic expectations matter more than headline numbers. On typical sheet gauges a well-maintained fiber laser holds positional accuracy of about +/- 0.1 mm. That figure widens as the plate gets thicker, for two physical reasons:'),
    li('Kerf taper — the cut is very slightly wider at the top than the bottom, and the effect grows with thickness.'),
    li('Heat input — more heat means more thermal movement in the sheet during cutting, especially on large thin parts.'),
    rich('Cut-edge quality itself is formally classified under ', ['ISO 9013, the international standard for thermal cuts', 'https://www.iso.org/standard/71133.html', true], ', which grades perpendicularity and average surface roughness. If your drawing calls out a specific edge quality, say so at quoting stage.'),
    callout('warning', 'Be sceptical of any shop advertising a blanket "0.01 mm accuracy" for laser cutting. That is beam positioning resolution, not the achievable tolerance on a finished part in real material.'),

    h2('Fiber Laser Cutting vs Plasma vs Waterjet'),
    p('Laser is not always the right answer. Choosing correctly is usually the single biggest cost lever on a job:'),
    table(
        'Fiber laser vs plasma vs waterjet for metal cutting',
        ['Criterion', 'Fiber laser', 'Plasma', 'Waterjet'],
        [
            ['Typical tolerance', '+/- 0.1 mm', '+/- 0.5–1.5 mm', '+/- 0.1–0.2 mm'],
            ['Edge finish', 'Clean, minimal burr', 'Rougher, dross likely', 'Slightly frosted, no burr'],
            ['Heat-affected zone', 'Very small', 'Large', 'None — cold cutting'],
            ['Thin sheet speed', 'Excellent', 'Moderate', 'Slow'],
            ['Very thick plate', 'Limited by power', 'Strong', 'Strong but slow'],
            ['Non-metals', 'No', 'No', 'Yes'],
            ['Relative cost', 'Moderate', 'Low', 'High'],
        ]
    ),
    p('In short: fiber laser for precision and finish on sheet and medium plate, plasma where thick structural steel needs cutting cheaply and tolerance is loose, waterjet where heat cannot be tolerated at all or where the material is not metal.'),

    h2('Where CNC Fiber Laser Cutting Is Used'),
    rich('The process underpins most of what we make. Precision blanks and brackets go into machine frames and enclosures through our ', ['sheet metal laser cutting service', '/chennai/sheet-metal-laser-cutting-services'], ', while heavier architectural work becomes ', ['custom steel gates', '/chennai/steel-gates'], ' and ', ['metal safety doors', '/chennai/metal-safety-doors'], '.'),
    rich('On the architectural side, intricate jali screens and facade cladding are produced as ', ['decorative metal panels', '/chennai/decorative-metal-panels'], '. Where a part needs bending, welding or coating after cutting, it moves into our ', ['metal fabrication services', '/chennai/fabrication-services'], ' without leaving the building.'),
    image(IMG_PANEL, 'Laser cut decorative metal jali panel design produced in Chennai', 'Decorative jali panels rely on the narrow kerf a fiber laser produces.'),
    rich('You can see finished examples across materials and thicknesses in our ', ['project gallery', '/gallery'], '.'),

    h2('How to Prepare Files for CNC Laser Cutting'),
    p('Most delays and cost overruns start in the file, not on the machine. A few rules save real money:'),
    li('Send vectors, not images. DXF or DWG go straight to the machine; a JPEG has to be redrawn.'),
    li('Close every contour. Open paths cannot be cut and have to be repaired first.'),
    li('Remove duplicate and overlapping lines, or the laser may cut the same path twice.'),
    li('Keep the smallest hole diameter at or above material thickness. Below that, holes become unreliable and slow.'),
    li('Convert text to outlines, otherwise fonts substitute or vanish on our system.'),
    li('State material, grade, thickness and quantity in the drawing or the email — a DXF alone cannot be quoted.'),
    li('Allow for kerf on parts that must fit together, especially press-fit joints and slots.'),
    callout('tldr', 'A clean DXF with closed contours, no duplicate lines, and material plus thickness stated is the difference between a quote in hours and a week of back-and-forth.'),

    h2('What Affects the Cost of Laser Cutting?'),
    p('Cutting is priced on machine time and material, not on part area. The main drivers:'),
    li('Total cut length — a dense decorative pattern can take many times longer than a plain blank of the same size.'),
    li('Number of pierces — every hole starts with a pierce, and piercing is slower than cutting.'),
    li('Material and thickness — thicker plate cuts slower and needs more assist gas.'),
    li('Assist gas choice — nitrogen costs noticeably more than oxygen or air.'),
    li('Nesting efficiency — better nesting means fewer sheets and directly lower material cost.'),
    li('Quantity — setup is amortised across the batch, so unit price falls as volume rises.'),
    li('Secondary operations — bending, welding, deburring and coating are quoted separately.'),

    h2('Choosing a CNC Fiber Laser Cutting Service'),
    p('Before placing an order, it is worth asking a prospective supplier:'),
    li('What is your maximum thickness in the specific material and grade I need?'),
    li('What bed size do you run — can my part be cut in one piece?'),
    li('Which assist gas will you use, and what edge condition should I expect?'),
    li('Do you provide nesting, and will you share the yield?'),
    li('Can you do bending, welding and coating in-house, or does the part move to another vendor?'),
    li('What tolerance will you commit to on my critical dimensions?'),
    rich('RG Tech Engineering runs CNC fiber laser cutting from Chennai with an 8000 x 2500 mm bed and in-house fabrication and finishing. Send a drawing through our ', ['contact form', '/#contact'], ' and you get an itemised quote within 24 business hours.'),
]

const faqs = [
    {
        question: 'What is CNC fiber laser cutting in simple terms?',
        answer: 'It is a computer-controlled process where a tightly focused laser beam melts and vaporises metal along a path taken from your CAD file, while assist gas blows the molten material out of the cut. The result is a clean, accurate edge that repeats identically across every part in the batch.',
    },
    {
        question: 'What is the difference between fiber laser and CO2 laser cutting?',
        answer: 'Fiber lasers produce a shorter-wavelength beam that metals absorb far more efficiently, making them faster on sheet, cheaper to run and safe on reflective metals like copper and brass. CO2 lasers are slower on metal but can cut non-metals such as acrylic and wood, which fiber lasers cannot.',
    },
    {
        question: 'What thickness can a CNC fiber laser cut?',
        answer: 'It depends on machine power. RG Tech Engineering cuts mild and stainless steel up to 45 mm, aluminium up to 30 mm, and copper and brass up to 16 mm. Beyond those limits, plasma or waterjet is usually the better process.',
    },
    {
        question: 'How accurate is CNC fiber laser cutting?',
        answer: 'A well-maintained fiber laser holds roughly +/- 0.1 mm on typical sheet thicknesses. Accuracy widens on thicker plate because of kerf taper and heat input, so critical dimensions should be flagged before cutting.',
    },
    {
        question: 'Which materials cannot be cut with a fiber laser?',
        answer: 'Fiber lasers do not cut non-metals such as acrylic, wood, glass or most plastics. Some plastics also release harmful fumes when heated. For those materials a CO2 laser or waterjet is the correct choice.',
    },
    {
        question: 'Is laser cutting cheaper than plasma cutting?',
        answer: 'Not always. Plasma has a lower hourly rate and suits thick structural steel where tolerance is loose. Fiber laser usually wins on thin to medium material because it is faster, wastes less through nesting, and needs little or no secondary finishing.',
    },
    {
        question: 'What file format is best for laser cutting?',
        answer: 'DXF is the most reliable, with DWG and STEP also accepted. Files should have closed contours, no duplicate lines, and text converted to outlines. Raster images such as JPEG or PNG must be redrawn as vectors before cutting.',
    },
    {
        question: 'Does laser cutting leave a burr on the edge?',
        answer: 'A correctly parameterised fiber laser cut leaves minimal to no burr, which is one of its main advantages over plasma. Some dross can appear on thicker plate or with incorrect gas settings, and is removed during deburring.',
    },
]

const post = {
    _id: POST_ID,
    _type: 'post',
    title: 'What Is CNC Fiber Laser Cutting? A Complete Guide',
    slug: { _type: 'slug', current: 'what-is-cnc-fiber-laser-cutting' },
    summary:
        'A plain-English guide to CNC fiber laser cutting — how the process works, what thicknesses and tolerances are realistic, how it compares with plasma and waterjet, and how to prepare files so your job is quoted quickly.',
    tldr:
        'CNC fiber laser cutting uses a focused laser beam and assist gas to cut metal from a CAD file. Expect around +/- 0.1 mm on sheet, up to 45 mm in mild and stainless steel, a clean low-burr edge, and costs driven by cut length, pierces and assist gas rather than part area.',
    author: { _type: 'reference', _ref: AUTHOR_ID },
    category: { _type: 'reference', _ref: CATEGORY_ID },
    publishedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    readTime: '11 min read',
    mainImageUrl: HERO,
    mainImageAlt:
        'CNC fiber laser cutting machine cutting a steel sheet at RG Tech Engineering, Chennai',
    bannerEyebrow: 'TECHNICAL GUIDE · 2026',
    bannerHeading: 'CNC Fiber Laser Cutting',
    bannerSubheading: 'Process, Materials, Tolerances & Costs',
    bannerBadge: 'ISO 9013 EDGE QUALITY',
    metaTitle: 'What Is CNC Fiber Laser Cutting? Process, Materials & Tolerances',
    metaDescription:
        'CNC fiber laser cutting explained: how the process works, materials and thicknesses, realistic tolerances, assist gas, cost drivers, and how it compares to plasma and waterjet.',
    keywords: [
        'cnc fiber laser cutting',
        'what is fiber laser cutting',
        'fiber laser vs co2 laser',
        'laser cutting tolerance',
        'laser cutting thickness',
        'laser cutting chennai',
        'sheet metal laser cutting',
    ],
    body,
    faqs: faqs.map((f) => ({ _type: 'faq', _key: key(), question: f.question, answer: f.answer })),
}


export { author, category, post, AUTHOR_ID, CATEGORY_ID, POST_ID, HERO }
