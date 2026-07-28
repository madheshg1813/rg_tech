import { createBuilder, IMAGES, makePost } from '../lib/pt.mjs'

const { p, h2, h3, li, nli, rich, image, table, callout, faqs } = createBuilder('lvw')

const body = [
    p('Laser and waterjet get compared because both are precise. They are precise in different ways, and the deciding factor is usually not accuracy at all — it is heat.'),
    p('Waterjet is a cold process. Laser is not. For most metal parts that difference is irrelevant and laser wins on speed and cost. For a specific set of jobs it is the only thing that matters, and no amount of laser speed compensates.'),

    h2('Laser Cutting vs Waterjet Cutting: The Short Answer'),
    table(
        'CNC fiber laser vs abrasive waterjet at a glance',
        ['Criterion', 'Fiber laser', 'Waterjet'],
        [
            ['Typical tolerance', '+/- 0.1 mm', '+/- 0.1 to 0.2 mm'],
            ['Heat-affected zone', 'Narrow but present', 'None — cold cutting'],
            ['Edge finish', 'Clean, may show oxide', 'Slightly frosted, no oxide'],
            ['Speed on thin sheet', 'Very fast', 'Slow'],
            ['Maximum thickness', 'Limited by machine power', 'Very thick, but very slow'],
            ['Materials', 'Metals only', 'Almost anything'],
            ['Cutting cost', 'Moderate', 'High'],
            ['Consumables', 'Assist gas, nozzles', 'Abrasive garnet, high-pressure parts'],
            ['Taper on edge', 'Minimal', 'Noticeable unless compensated'],
        ]
    ),
    callout('tldr', 'Both hold roughly the same tolerance. Laser is far faster and cheaper on metal. Choose waterjet when heat would damage the material, when the part is a non-metal, or when the plate is thicker than any available laser.'),

    h2('The Real Difference Is Heat, Not Accuracy'),
    p('People assume waterjet is chosen for precision. In practice the tolerances overlap — both processes sit around a tenth of a millimetre on typical work. The genuine differentiator is thermal input.'),
    h3('What laser heat actually does'),
    p('A fiber laser melts material locally. That leaves a narrow heat-affected zone where the metal has been through a rapid heat and cool cycle. In the vast majority of parts this is completely harmless.'),
    p('It matters in three situations:'),
    li('Hardened or heat-treated material, where local heating can soften the metal and undo the treatment.'),
    li('Parts with a tightly specified metallurgical condition, common in aerospace and some pressure applications.'),
    li('Material already prone to cracking under thermal stress.'),
    h3('Why waterjet has none'),
    rich('Abrasive waterjet cuts by erosion — a stream of water at roughly 4,000 bar carrying garnet abrasive physically wears through the material. No melting, no heat-affected zone, no metallurgical change. ', ['TWI has a good technical overview of the process', 'https://www.twi-global.com/technical-knowledge/faqs/what-is-water-jet-cutting', true], '.'),
    image(IMAGES.machine, 'CNC fiber laser cutting metal, the thermal alternative to cold waterjet cutting', 'Laser removes material with heat; waterjet removes it by abrasion.'),

    h2('Speed and Cost: Laser Wins Decisively on Metal'),
    p('This is where the two processes separate hardest. On 3 mm mild steel a fiber laser may run several metres per minute. A waterjet on the same material is often an order of magnitude slower.'),
    p('Waterjet also carries running costs laser does not:'),
    li('Garnet abrasive is consumed continuously and is a genuine per-metre cost.'),
    li('High-pressure pump components wear and need scheduled replacement.'),
    li('Slower cutting means more machine hours per part, which is usually the largest cost of all.'),
    p('For a batch of steel brackets, laser is not marginally cheaper. It is frequently several times cheaper once machine time is counted.'),

    h2('Where Waterjet Is the Only Option'),
    p('Waterjet earns its cost in cases laser simply cannot serve:'),
    nli('Non-metals — stone, glass, composites, thick rubber, some plastics. Fiber laser cuts none of these.'),
    nli('Heat-sensitive alloys where the heat-affected zone is unacceptable to the specification.'),
    nli('Very thick plate beyond available laser power, where waterjet will get there eventually.'),
    nli('Stacked or laminated materials that would fuse under thermal cutting.'),
    nli('Reflective metals on a laser without back-reflection protection — though a properly equipped fiber laser handles copper and brass safely.'),

    h2('Edge Quality: Different, Not Better'),
    p('The two edges look and behave differently, and neither is universally superior.'),
    table(
        'Cut edge characteristics compared',
        ['Aspect', 'Fiber laser', 'Waterjet'],
        [
            ['Appearance', 'Smooth, may show heat tint', 'Matte, lightly frosted'],
            ['Oxide layer', 'Present with oxygen assist, absent with nitrogen', 'Never — cold process'],
            ['Burr', 'Minimal', 'Minimal, occasional exit burr'],
            ['Taper', 'Slight, grows with thickness', 'Noticeable unless the head compensates'],
            ['Ready to weld', 'Yes with nitrogen assist', 'Yes'],
            ['Ready to paint', 'After cleaning if oxygen-cut', 'Yes'],
        ]
    ),
    callout('tip', 'If your only objection to laser is the oxide layer, ask for a nitrogen cut instead of switching process. Nitrogen gives a bright oxide-free edge at a fraction of waterjet cost.'),

    h2('Thickness: Both Have Limits'),
    p('Waterjet is often described as having no thickness limit. Technically almost true, practically misleading — it slows dramatically as thickness increases, and cost scales with time.'),
    p('Cutting 100 mm plate on a waterjet is possible and painfully slow. Most shops would route that job to plasma or oxy-fuel and accept the looser tolerance.'),
    rich('For reference, RG Tech cuts mild and stainless steel to 45 mm, aluminium to 30 mm and copper or brass to 16 mm on our fiber laser. Details are on our ', ['laser cutting services page', '/chennai/laser-cutting-services'], '.'),

    h2('Practical Differences Nobody Mentions in a Quote'),
    p('Beyond speed and heat, three operational details tend to surface only after the order is placed:'),
    h3('Parts come off a waterjet wet'),
    p('The bed is a water tank. Parts are submerged or heavily wetted during cutting, and carbon steel starts to flash-rust within hours unless it is dried and treated. On stainless it does not matter. On mild steel destined for paint it means an extra handling step.'),
    h3('Abrasive gets everywhere'),
    p('Garnet is consumed continuously and ends up in blind holes, pockets and tight internal features. Parts with enclosed geometry often need blowing out before assembly. Laser-cut parts have no equivalent problem.'),
    h3('Tabs and small parts'),
    p('Very small parts can drop into the waterjet tank and be lost, so they are usually held with tabs that must be broken out and dressed afterwards. Laser cutting uses tabs too, but the parts sit on a slat bed and are simply lifted off.'),
    callout('tip', 'If a part has deep pockets, blind slots or a mirror finish that must stay clean, factor post-cut cleaning into a waterjet quote. It is real labour and it is rarely included.'),

    h2('Choosing Between Them'),
    p('Work through these in order and the answer usually appears at the first or second question:'),
    nli('Is the material a metal? If not, waterjet.'),
    nli('Is the material heat-treated, or does the spec restrict the heat-affected zone? If yes, waterjet.'),
    nli('Is it thicker than the available laser can cut? If yes, waterjet or plasma.'),
    nli('Otherwise — laser, on speed and cost.'),
    rich('Most enquiries that arrive asking for waterjet turn out to be ordinary steel parts where laser is faster, cheaper and equally accurate. Send your drawing through our ', ['contact form', '/contact'], ' and we will tell you honestly which process the part needs, including when that means sending you elsewhere.'),
    rich('If you are also weighing plasma, see ', ['laser cutting vs plasma cutting', '/blog/laser-cutting-vs-plasma-cutting'], '.'),
]

export const post = makePost({
    slug: 'laser-cutting-vs-waterjet-cutting',
    title: 'Laser Cutting vs Waterjet Cutting: Which Suits Your Part?',
    sheetTitle: 'Laser Cutting vs Waterjet Cutting',
    summary:
        'Fiber laser and abrasive waterjet hold similar tolerances, so the decision comes down to heat, material and cost. A practical comparison of when each process is genuinely the right one.',
    tldr:
        'Both hold around +/- 0.1 mm. Laser is far faster and cheaper on metal. Waterjet is the answer only when heat would damage the material, the part is a non-metal, or the plate exceeds laser capability.',
    readTime: '7 min read',
    mainImageUrl: IMAGES.machine,
    mainImageAlt: 'CNC fiber laser cutting metal compared with waterjet cutting at RG Tech Engineering Chennai',
    bannerEyebrow: 'PROCESS COMPARISON',
    bannerHeading: 'Laser vs Waterjet',
    bannerSubheading: 'Heat, Materials & Cost per Part',
    bannerBadge: 'COLD VS THERMAL',
    metaTitle: 'Laser Cutting vs Waterjet Cutting: Heat, Cost & Material Guide',
    metaDescription:
        'Laser vs waterjet cutting compared: tolerance, heat-affected zone, materials, thickness and cost. When waterjet is necessary and when laser is faster and cheaper.',
    keywords: [
        'laser cutting vs waterjet cutting',
        'waterjet vs laser cutting',
        'heat affected zone laser cutting',
        'waterjet cutting cost',
        'metal cutting process comparison',
    ],
    body,
    faqs: faqs([
        ['Is waterjet more accurate than laser cutting?',
            'Not meaningfully. Both hold roughly +/- 0.1 mm on typical work. The real difference is heat: waterjet is a cold process with no heat-affected zone, laser is thermal.'],
        ['When should I choose waterjet over laser cutting?',
            'When the material is not a metal, when it is heat-treated or has a specification restricting the heat-affected zone, or when the plate is thicker than the available laser can cut.'],
        ['Is waterjet cutting more expensive than laser?',
            'On metal, usually yes and often several times so. Waterjet is far slower, consumes garnet abrasive continuously, and carries high-pressure component wear. Machine time is the dominant cost.'],
        ['Does laser cutting damage heat-treated steel?',
            'It can locally soften material immediately at the cut edge. On most parts this is harmless, but where the specification restricts the heat-affected zone, waterjet is the correct choice.'],
        ['Can a waterjet cut materials a laser cannot?',
            'Yes — stone, glass, composites, thick rubber and many plastics. Fiber lasers cut metals only.'],
        ['Which leaves a better edge, laser or waterjet?',
            'Different rather than better. Laser gives a smooth edge, oxide-free when cut with nitrogen. Waterjet gives a lightly frosted edge with no oxide at all but more taper unless the head compensates.'],
        ['Is there a thickness limit for waterjet cutting?',
            'Not a hard one, but cost scales with time and waterjet slows dramatically as thickness grows. Very thick plate is usually better suited to plasma or oxy-fuel.'],
        ['Can a fiber laser cut copper and brass?',
            'Yes, on machines fitted with back-reflection protection. These metals reflect beam energy back toward the source and will damage equipment not built to handle it.'],
    ]),
})
