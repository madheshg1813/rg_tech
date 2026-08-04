import { createBuilder, IMAGES, makePost } from '../lib/pt.mjs'

const { p, h2, h3, li, nli, rich, image, table, callout, faqs } = createBuilder('ssg')

const body = [
    p('Three stainless grades cover almost everything that comes through a fabrication shop in Tamil Nadu: 304, 316 and 430. They look nearly identical on the rack and behave very differently in service.'),
    p('Choosing wrongly is expensive in both directions — 430 that rusts within a year on a coastal site, or 316 specified for an indoor bracket at three times the necessary cost.'),

    callout('tldr', '304 is the default for general use. 316 adds molybdenum and is the one to use near the sea or around chlorides. 430 is the budget option for dry indoor decorative work and is magnetic. All three cut cleanly on a fiber laser up to 45 mm.'),

    h2('The Short Version'),
    table(
        'Stainless steel grades compared',
        ['', '304', '316', '430'],
        [
            ['Family', 'Austenitic', 'Austenitic', 'Ferritic'],
            ['Key addition', '18% Cr, 8% Ni', 'Cr, Ni + 2% Mo', '16-18% Cr, no nickel'],
            ['Corrosion resistance', 'Good', 'Excellent, resists chlorides', 'Moderate, indoor only'],
            ['Magnetic', 'No (largely)', 'No (largely)', 'Yes'],
            ['Relative cost', 'Baseline', 'Noticeably higher', 'Lowest'],
            ['Weldability', 'Excellent', 'Excellent', 'Fair'],
            ['Typical use', 'General fabrication, railings, kitchen', 'Coastal, marine, chemical', 'Decorative trim, indoor panels'],
        ]
    ),

    h2('304: the Default'),
    p('If nobody has specified a grade, 304 is almost certainly what is meant. Around 18% chromium and 8% nickel give it a self-healing passive oxide layer, good formability and excellent weldability.'),
    p('It handles rain, humidity and most food and domestic environments without trouble. Railings, gates, kitchen equipment, structural brackets, planters, signage — 304 does all of it.'),
    p('Its weakness is chlorides. Salt attacks the passive layer locally and causes pitting: small deep holes rather than general rust. That is a real consideration in Chennai, and a serious one within a couple of kilometres of the coast.'),

    h2('316: When There Is Salt or Chemistry'),
    p('316 adds roughly 2% molybdenum, which stabilises the passive layer against chloride attack. Everything else about it is broadly similar to 304 — same look, same weldability, same fabrication behaviour.'),
    p('Use it when the part will live near the sea, in a swimming pool environment, in chemical processing, or anywhere it will be washed down with chlorinated water. In those conditions the price difference buys years of service life.'),
    callout('tip', 'For a coastal installation, do not stop at the grade. A 316 panel bolted with mild steel fasteners will still fail, because the fasteners rust and stain the panel. Match the fixings to the sheet.'),

    h2('430: the Budget Grade, With Conditions'),
    p('430 is ferritic. It contains chromium but essentially no nickel, which is why it costs the least of the three — nickel is the expensive ingredient in stainless.'),
    p('It gives a bright finish and resists indoor humidity perfectly well, which makes it a sensible choice for decorative panels, pooja room screens, wall art and interior trim that will never be rained on.'),
    p('It is magnetic, unlike 304 and 316, which is occasionally useful and occasionally a surprise. It is less weldable and less formable, and it will develop surface rust outdoors, particularly in coastal air.'),
    callout('warning', 'Do not use 430 outdoors in Chennai, Ramanathapuram or anywhere on the coast. It will look acceptable for a few months and then stain. The saving is not worth the callback.'),

    h2('Choosing in Practice'),
    nli('Will the part live outdoors? If no, 430 is worth considering. If yes, start at 304.'),
    nli('Is it within a few kilometres of the sea, or exposed to pool water, brine or chlorinated washdown? If yes, 316.'),
    nli('Does it need welding into an assembly? Prefer 304 or 316; 430 is harder to weld well.'),
    nli('Is appearance the whole point and the environment dry? 430 gives the same brightness for less.'),
    nli('Is it structural or safety-critical? Do not economise on grade.'),

    h2('How the Three Cut'),
    p('All three cut cleanly on a fiber laser, and we cut all of them up to 45 mm. The practical differences are about finish rather than capability:'),
    li('Nitrogen assist gas gives a bright, oxide-free edge that can be left as-cut or polished. It is the normal choice for visible stainless work.'),
    li('Oxygen cuts faster and cheaper but leaves an oxidised edge, which is fine for parts that will be painted or hidden.'),
    li('Stainless conducts heat less readily than mild steel, so it holds a crisp edge well but needs sensible nesting on thin decorative work to avoid heat build-up.'),
    image(IMAGES.sheet2, 'Laser cut stainless steel sheet metal components with clean nitrogen-cut edges', 'Nitrogen-cut stainless leaves a bright edge suitable for visible work.'),
    rich('Which gas is right for your job affects both finish and price, as covered in ', ['what laser cutting costs', '/blog/laser-cutting-cost-guide'], '.'),

    h2('Common Mistakes'),
    li('Specifying 316 for everything "to be safe". It is a real cost increase with no benefit indoors.'),
    li('Assuming a magnet test proves quality. Magnetism distinguishes 430 from 304 and 316, but heavily cold-worked 304 can become slightly magnetic too.'),
    li('Mixing grades in one assembly without thinking about galvanic contact.'),
    li('Ordering "SS" with no grade. It is the single most common cause of a job being quoted twice.'),
    rich('For where stainless sits among the other metals we cut, see ', ['materials that can be laser cut', '/blog/materials-that-can-be-laser-cut'], '.'),
]

export const post = makePost({
    slug: 'stainless-steel-grades-304-vs-316-vs-430',
    title: 'Stainless Steel Grades: 304 vs 316 vs 430',
    sheetTitle: 'Stainless Steel Grades 304 vs 316 vs 430',
    summary:
        'Which stainless grade to specify and why: corrosion resistance, cost, magnetism and weldability compared, with a decision order for coastal and indoor work.',
    tldr:
        '304 is the general-purpose default. 316 adds molybdenum for chloride and coastal environments. 430 is the low-cost magnetic grade for dry indoor decorative work only.',
    readTime: '7 min read',
    mainImageUrl: IMAGES.sheet,
    mainImageAlt: 'Laser cut stainless steel sheet components in 304 and 316 grade at RG Tech Engineering Chennai',
    bannerEyebrow: 'MATERIAL GUIDE',
    bannerHeading: 'Stainless: 304, 316 or 430',
    bannerSubheading: 'Choosing the Right Grade for the Environment',
    bannerBadge: 'GRADE SELECTION',
    metaTitle: 'Stainless Steel Grades Compared: 304 vs 316 vs 430',
    metaDescription:
        'A practical comparison of stainless steel 304, 316 and 430 — corrosion resistance, cost, magnetism, weldability and which to specify for coastal or indoor use.',
    keywords: [
        'stainless steel 304 vs 316',
        'ss 430 stainless steel',
        'stainless steel grades',
        'which stainless steel for coastal',
        'stainless steel laser cutting',
        'ss 304 316 430 difference',
    ],
    body,
    faqs: faqs([
        ['What is the difference between 304 and 316 stainless steel?',
            '316 contains roughly 2% molybdenum, which stabilises its passive layer against chloride attack. Both are austenitic with similar appearance and weldability, but 316 resists salt and pool water far better and costs noticeably more.'],
        ['Is 430 stainless steel any good?',
            'For dry indoor decorative work, yes — it gives a bright finish at the lowest cost of the three. It is magnetic, less weldable, and will stain if used outdoors, especially in coastal air.'],
        ['Which stainless steel is magnetic?',
            '430 is magnetic because it is ferritic and contains essentially no nickel. 304 and 316 are austenitic and largely non-magnetic, though heavily cold-worked 304 can become slightly magnetic.'],
        ['Which stainless grade should I use near the sea?',
            '316. Chloride in coastal air attacks the passive layer on 304 and causes pitting. Match the fasteners to the grade as well, since mild steel fixings will rust and stain a 316 panel.'],
        ['Can you laser cut all three stainless grades?',
            'Yes. We cut 304, 316 and 430 on a CNC fiber laser up to 45 mm. Nitrogen assist gives a bright oxide-free edge for visible work; oxygen is faster and cheaper where the part will be painted.'],
        ['Why is 316 more expensive than 304?',
            'The added molybdenum, plus a slightly higher nickel content. Nickel is the costly ingredient in stainless, which is also why nickel-free 430 is the cheapest of the three.'],
        ['Does stainless steel rust?',
            'It resists rust rather than being immune. The chromium oxide layer self-heals in the presence of oxygen, but chlorides can break it down locally and cause pitting, and surface contamination from carbon steel tools can cause staining.'],
        ['What happens if I just order "stainless steel" without a grade?',
            'The job usually has to be quoted twice. Grade drives both price and service life, so stating 304, 316 or 430 at enquiry stage saves a round trip.'],
    ]),
})
