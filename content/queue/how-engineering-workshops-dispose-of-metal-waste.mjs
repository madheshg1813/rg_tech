import { createBuilder, IMAGES, makePost } from '../lib/pt.mjs'

const { p, h2, h3, li, nli, rich, image, table, callout, faqs } = createBuilder('mwd')

const body = [
    p('Every workshop that cuts, turns or grinds metal produces waste, and most of it is worth money. The difference between a shop that recovers that value and one that pays to have it taken away is almost entirely down to how the material is separated at the moment it hits the floor.'),
    p('This is a practical guide to what an engineering workshop actually generates, how each stream should be handled, and which of them are genuinely dangerous rather than merely untidy.'),

    callout('tldr', 'Segregate at source. Mixed scrap is graded down to the cheapest metal in the bin, so a single stainless offcut in the mild steel skip costs you the whole load. Keep aluminium, steel, stainless, copper and brass apart, and treat fine metal dust as a fire risk rather than as rubbish.'),

    h2('What a Workshop Actually Produces'),
    p('The word "scrap" hides five very different materials, each with its own value and its own handling problem:'),
    table(
        'Metal waste streams in a typical fabrication shop',
        ['Stream', 'Where it comes from', 'Handling note'],
        [
            ['Offcuts and drops', 'Remainder of a sheet or bar after cutting', 'Highest value, easiest to sort and often reusable'],
            ['Skeletons', 'The web left after laser or plasma nesting', 'Bulky; worth flattening or shearing before storage'],
            ['Turnings and swarf', 'Lathe, mill and drilling work', 'Often oil-wet, which lowers the price paid'],
            ['Grinding and linishing dust', 'Finishing operations', 'Fine, mixed with abrasive, low value, fire risk'],
            ['Filter and fume dust', 'Laser and welding extraction units', 'Can be reactive; treat as hazardous, not as sweepings'],
        ]
    ),

    h2('Segregation Is the Whole Game'),
    p('Scrap merchants pay by grade, and a grade is decided by the worst thing in the container. Drop one length of stainless into a bin of mild steel and the merchant does not pay you a blended rate — they pay you the mild steel rate for the whole bin, because separating it is now your problem transferred to them.'),
    p('The practical consequence is that segregation has to happen at the machine, not later at the bin. Once two metals are mixed in quantity, nobody in the shop is going to pull them apart by hand.'),
    nli('One clearly labelled container per metal, positioned within arm reach of the machine that produces it.'),
    nli('Separate containers for stainless grades if you run both 304 and 316 in volume — the price difference is real.'),
    nli('A dedicated drum for turnings, kept away from sheet offcuts so oil does not contaminate clean material.'),
    nli('A closed, non-combustible container for dust. Not an open bin, and not a cardboard box.'),
    rich('If you are unsure which grade an offcut is, it is usually cheaper to test it than to guess — the practical differences between the common stainless grades are set out in ', ['stainless steel grades 304 vs 316 vs 430', '/blog/stainless-steel-grades-304-vs-316-vs-430'], '.'),

    h2('Steel and Stainless'),
    p('Mild steel is the easiest stream to manage. It is magnetic, it is forgiving of light surface rust, and it has a stable resale route almost everywhere in India. Keep it dry if you can, because heavy scale reduces the recovered weight.'),
    p('Stainless is worth considerably more and behaves differently. It is largely non-magnetic in the 300 series, which is the quickest field check you have: a magnet that sticks firmly to something you believed was 304 is worth a second look.'),
    callout('warning', 'Do not store stainless offcuts in contact with mild steel. Iron particles transfer onto the stainless surface and rust there, which both spoils the material for reuse and gives a merchant a reason to downgrade it.'),

    h2('Aluminium'),
    p('Aluminium is light, valuable per kilo and easy to contaminate. The two things that reduce its value most are mixed alloys and attached hardware — steel rivets, fasteners and inserts left in an assembly all have to come out somewhere, and the merchant prices that labour into what they offer you.'),
    p('Keep extrusion, sheet and cast aluminium separate if your volume justifies it. They are different alloy families and are usually priced differently.'),
    image(IMAGES.sheet2, 'Laser cut sheet metal parts and the surrounding skeleton at RG Tech Engineering, Chennai', 'The skeleton left after nesting is scrap by definition, but it is clean, single-grade scrap — the most valuable kind.'),

    h2('Copper and Brass'),
    p('Copper is the highest value common workshop metal by a wide margin, and brass is not far behind. That has two consequences worth planning for.'),
    p('The first is that it is worth handling carefully even in small quantities — a modest drum of clean copper offcuts is not a trivial sum. The second is that it disappears. Copper is the metal most likely to walk out of an unsecured yard, and most shops that handle it in volume end up storing it inside rather than in the open.'),
    li('Keep bright, clean copper separate from copper with solder, paint or insulation on it. The clean grade is worth noticeably more.'),
    li('Brass swarf from machining is valuable but easily lost in a mixed swarf drum.'),
    li('Do not mix copper and brass. They look similar in a bin and they are not priced the same.'),

    h2('Metal Dust: the Stream That Is Actually Dangerous'),
    p('Everything above is a commercial question. Metal dust is a safety one, and it is the part of workshop waste most often handled badly.'),
    h3('Why fine metal is a fire and explosion risk'),
    p('Bulk metal does not burn in any way that concerns you. The same metal reduced to a fine powder has an enormous surface area relative to its mass, and can ignite from a spark and, in a confined space, deflagrate. Aluminium and magnesium dust are the serious cases; ferrous grinding dust is less reactive but still capable of a smouldering fire in a bin.'),
    h3('Where it accumulates'),
    li('Extraction filter cartridges and the collection bins beneath them.'),
    li('Downdraft benches and grinding booth trays.'),
    li('The underside of laser cutting beds and slat assemblies.'),
    li('Ledges, beams and light fittings, where settled dust is easy to overlook and easy to disturb.'),
    callout('warning', 'Never mix aluminium dust with ferrous grinding dust, and never let either get wet in an unventilated drum. Fine aluminium in contact with water can liberate hydrogen. If you cut aluminium regularly, a wet collector designed for the job is the correct equipment, not a dry cartridge unit borrowed from the steel side of the shop.'),
    h3('Housekeeping that actually helps'),
    nli('Vacuum rather than sweep or blow down. Compressed air puts settled dust into the air, which is the condition you are trying to avoid.'),
    nli('Use extraction equipment rated for the metal you are cutting, and empty it on a schedule rather than when it is visibly full.'),
    nli('Store collected dust in closed metal containers, outside the building, away from ignition sources.'),
    nli('Keep aluminium dust in its own container. It does not share.'),

    h2('Oil-Wet Swarf and Coolant'),
    p('Turnings from machining arrive soaked in cutting fluid. You are paid by weight for the metal and not for the oil, and a merchant who suspects a drum is heavy with coolant will discount it accordingly.'),
    p('Draining swarf over a grate into a collection tray recovers some fluid and improves the grade of what you sell. The drained fluid itself is not general waste — spent coolant and cutting oil are handled through an authorised waste contractor, not poured into a drain.'),

    h2('The Regulatory Side, Briefly'),
    p('Clean, uncontaminated metal scrap is a recyclable commodity and moves through the ordinary scrap trade. The streams that attract regulation are the contaminated ones: spent cutting fluid, oily rags and absorbents, solvent, and filter dust from processes that generate hazardous residues.'),
    rich('In India these fall under the Hazardous and Other Wastes (Management and Transboundary Movement) Rules, 2016, administered by the state pollution control boards — for a workshop in Tamil Nadu that is the ', ['Tamil Nadu Pollution Control Board', 'https://tnpcb.gov.in/', true], '. The practical requirement for a small unit is to use an authorised recycler or disposal facility and to keep the paperwork showing where the waste went.'),
    callout('tip', 'Rules and thresholds change, and what applies to a ten-person job shop is not what applies to a large plant. Treat this section as a pointer rather than as compliance advice, and confirm your own obligations with your state board before you rely on them.'),

    h2('A Routine That Works in a Small Shop'),
    p('None of this needs a waste management department. It needs a habit:'),
    li('Labelled bins at the machine, not at the door.'),
    li('Offcuts above a useful size returned to the rack rather than to the bin — the cheapest scrap is the scrap you never created.'),
    li('Swarf drained before it is drummed.'),
    li('Dust vacuumed on a fixed day, into closed metal containers, stored outside.'),
    li('One merchant you deal with regularly, who knows your grades and prices them consistently.'),
    li('Records of what left the site, especially for anything contaminated.'),

    h2('Reducing the Waste in the First Place'),
    p('Every kilogram of scrap started as material you paid full price for. Nesting is where most of it is decided: parts arranged tightly on the sheet leave less skeleton, and a job quoted with a flexible quantity can often be nested to fill the sheet instead of leaving an expensive remnant.'),
    rich('That trade-off between quantity, nesting and price is covered in ', ['what laser cutting costs', '/blog/laser-cutting-cost-guide'], ', and the material choices that affect how much of a sheet you can realistically use are in ', ['materials that can be laser cut', '/blog/materials-that-can-be-laser-cut'], '.'),
    p('At our own unit the skeleton from every job is separated by grade as it comes off the bed, and usable drops go back on the rack rather than into the bin. It is not sophisticated. It is just done every time, which is the only thing that makes it work.'),
]

export const post = makePost({
    slug: 'how-engineering-workshops-dispose-of-metal-waste',
    title: 'How Engineering Workshops Dispose of Metal Waste: Aluminium, Steel, Copper & Metal Dust',
    sheetTitle: 'How Engineering Workshops Dispose of Metal Waste',
    summary:
        'What a fabrication shop actually generates — offcuts, skeletons, swarf and filter dust — how to segregate each stream so it holds its value, and why fine metal dust is a safety problem rather than a housekeeping one.',
    tldr:
        'Segregate at source: mixed scrap is graded down to the cheapest metal in the bin. Keep aluminium, steel, stainless, copper and brass apart, drain swarf before drumming it, and treat fine metal dust as a fire risk in a closed metal container.',
    readTime: '8 min read',
    mainImageUrl: IMAGES.sheet,
    mainImageAlt: 'Laser cut sheet metal offcuts and skeleton separated by grade at RG Tech Engineering, Chennai',
    bannerEyebrow: 'WORKSHOP PRACTICE',
    bannerHeading: 'Disposing of Metal Waste',
    bannerSubheading: 'Offcuts, Swarf, Copper & the Dust That Burns',
    bannerBadge: 'SAFETY & VALUE',
    metaTitle: 'Workshop Metal Waste Disposal',
    metaDescription:
        'Metal waste disposal for engineering workshops: segregating aluminium, steel, copper and brass to hold scrap value, draining swarf, and handling metal dust safely.',
    keywords: [
        'metal waste disposal',
        'workshop scrap segregation',
        'aluminium scrap disposal',
        'metal dust fire risk',
        'swarf disposal',
        'copper scrap workshop',
        'engineering workshop waste management',
    ],
    body,
    faqs: faqs([
        ['How should an engineering workshop separate metal scrap?',
            'One labelled container per metal, positioned at the machine that produces it rather than by the door. Scrap is graded by the worst material in the container, so a single stainless offcut in a mild steel bin can be paid at the mild steel rate for the whole load.'],
        ['Why is mixed metal scrap worth less?',
            'A merchant prices a load by its lowest grade, because separating it becomes their cost. Blending stainless into mild steel, or brass into copper, converts a high-value load into a low-value one rather than averaging the two.'],
        ['Is metal dust from grinding and laser cutting dangerous?',
            'Yes. Fine metal has a very large surface area relative to its mass and can ignite from a spark, and in a confined space it can deflagrate. Aluminium and magnesium dust are the serious cases. Collect it by vacuum, store it in closed metal containers away from the building, and never mix aluminium dust with ferrous dust.'],
        ['How should aluminium dust be stored?',
            'In its own closed, non-combustible container, kept dry and away from ignition sources. Fine aluminium in contact with water can liberate hydrogen, so a dry cartridge filter intended for steel is the wrong equipment — a wet collector designed for aluminium is the correct one.'],
        ['What should be done with oily swarf and spent coolant?',
            'Drain the swarf over a grate before drumming it, since you are paid for metal and not for oil, and a wet drum is discounted. The drained fluid is not general waste — spent coolant and cutting oil go to an authorised waste contractor, never to a drain.'],
        ['Which workshop metal is worth the most?',
            'Copper by a clear margin, with brass close behind. Keep bright clean copper separate from copper carrying solder, paint or insulation, keep copper and brass apart, and store both securely — copper is the metal most likely to disappear from an open yard.'],
        ['Do Indian workshops need authorisation to dispose of metal waste?',
            'Clean uncontaminated metal scrap moves through the ordinary scrap trade. Contaminated streams — spent cutting fluid, oily absorbents, solvent and some filter dust — fall under the Hazardous and Other Wastes Rules, 2016, administered by the state pollution control board. Confirm your own obligations with your state board rather than relying on a general guide.'],
        ['How can a workshop produce less scrap in the first place?',
            'Nesting decides most of it: parts arranged tightly leave less skeleton, and a flexible quantity often lets a sheet be filled rather than leaving an expensive remnant. Returning usable drops to the rack instead of the bin is the other half — the cheapest scrap is the scrap never created.'],
    ]),
})
