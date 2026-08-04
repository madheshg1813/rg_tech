import { createBuilder, IMAGES, makePost } from '../lib/pt.mjs'

const { p, h2, h3, li, nli, rich, image, table, callout, faqs } = createBuilder('jal')

const body = [
    p('Laser-cut jali screens have become a standard element in South Indian architecture — compound gates, staircase railings, balcony infills, temple arches, pooja room partitions and facade shading.'),
    p('They are also the job most often designed without regard to how metal behaves, which is why some panels arrive crisp and flat and others arrive wavy with pieces missing.'),
    p('This guide covers what makes a jali design manufacturable, how to think about material and thickness, and what changes the price.'),

    callout('tldr', 'Every enclosed area of a jali pattern must connect to the frame or it drops out as scrap. Keep the thinnest web at least the material thickness, choose thickness for span rather than looks, and expect price to follow pattern density, not panel size.'),

    h2('The One Rule That Decides Whether a Design Works'),
    p('A laser cuts along lines. Anything fully enclosed by a cut falls out. This is obvious for a hole and much less obvious in an ornamental pattern.'),
    p('If a floral motif has a petal outlined all the way round, that petal is scrap. If a letter O appears in a name board, its centre is scrap. If a peacock has an eye drawn as a closed circle, the eye is scrap.'),
    p('So every part of the pattern that must remain has to physically connect to the rest of the panel. Designers call these bridges or tabs. Adding them is a design decision, not something the machine can guess.'),
    callout('warning', 'This is the single most common reason a jali file has to be sent back. A pattern that looks beautiful as a drawing can be, structurally, a frame with several hundred loose pieces in it.'),

    h2('Web Thickness: the Structural Minimum'),
    p('The web is the metal left between two cuts. It is what holds the panel together and it is where thin designs fail.'),
    table(
        'Practical minimum web width by material thickness',
        ['Material thickness', 'Suggested minimum web', 'Behaviour if thinner'],
        [
            ['1 to 2 mm', 'About 2 mm', 'Heat distortion, wavy panel'],
            ['3 to 5 mm', 'About 3 to 5 mm', 'Local warping around dense areas'],
            ['6 to 10 mm', 'About 6 to 10 mm', 'Slower cutting, heat build-up'],
            ['Above 10 mm', 'At least the thickness', 'Edge taper becomes visible'],
        ]
    ),
    p('A useful rule of thumb: the narrowest web should be at least as wide as the material is thick. Below that, the metal spends too long near the cut and the panel bows.'),
    p('Dense patterns also remove a lot of material. A screen that is 70% open has lost most of its stiffness, and needs either thicker material or a supporting frame.'),

    h2('Choosing Thickness for the Job'),
    li('1 to 2 mm — indoor decorative panels, pooja room screens, wall art, light partitions. Needs a frame or backing for anything larger than about a metre.'),
    li('3 mm — the general-purpose choice for interior screens and smaller gate infills. Holds a pattern well and stays flat.'),
    li('4 to 6 mm — compound gates, main gates, balcony railings, anything at ground level that people lean on or children pull.'),
    li('8 to 12 mm — structural or security applications, large spans, or where the panel is the barrier rather than an infill.'),
    p('Span matters more than appearance here. A 3 mm panel that looks substantial at 600 mm wide will visibly flex at 1,800 mm.'),
    image(IMAGES.panel, 'Laser cut decorative metal jali panel with connected pattern and even web thickness', 'A pattern where every element connects to the frame, with webs sized to the material thickness.'),

    h2('Material Choice'),
    h3('Mild steel'),
    p('The default for gates and outdoor screens. It is economical, cuts cleanly at any thickness, and takes powder coating well. It must be coated — bare mild steel will rust outdoors in a single Chennai monsoon.'),

    h3('Stainless steel'),
    p('For coastal sites, or where the client wants a bare metal finish with no coating maintenance. It costs more but there is nothing to repaint.'),
    rich('Grade matters: 304 for general outdoor use, 316 near the sea, and 430 only for dry indoor decorative panels. The differences are set out in ', ['stainless steel grades 304 vs 316 vs 430', '/blog/stainless-steel-grades-304-vs-316-vs-430'], '.'),

    h3('Brass and copper'),
    p('Used for smaller feature panels, temple work and pooja room screens where the warm colour is the point. Both are cut at more modest thicknesses and cost considerably more per square foot.'),
    rich('For how each metal behaves under the beam, see ', ['materials that can be laser cut', '/blog/materials-that-can-be-laser-cut'], '.'),

    h2('What Actually Drives the Price'),
    p('Jali pricing surprises people because it does not track panel size. It tracks how far the beam has to travel.'),
    p('A plain 1,200 x 600 mm panel has under 4 metres of cut. The same panel with a dense traditional pattern can have 200 metres of cut and several hundred pierces. The material cost is identical; the machine time is not remotely.'),
    li('Pattern density is the biggest factor by a wide margin.'),
    li('Number of separate enclosed shapes, because each one needs its own pierce.'),
    li('Thickness, which slows the cut and lengthens every pierce.'),
    li('Material grade.'),
    li('Finishing — powder coating, and whether edges need deburring for a hand-contact surface.'),
    rich('The general breakdown of a cutting quote is in ', ['what laser cutting costs', '/blog/laser-cutting-cost-guide'], '.'),
    callout('tip', 'If a design is over budget, reducing pattern density usually saves more than reducing panel size or dropping a thickness. A slightly more open version of the same motif can cut the price substantially and often looks better from a distance.'),

    h2('Practical Points for Installation'),
    nli('Decide the fixing method before the panel is cut. Bolt holes, tabs and frame returns all have to be in the cutting file.'),
    nli('Allow a tolerance gap in the opening. A panel cut to the exact measured opening will not go in once it is coated.'),
    nli('For gates, plan where the hinges land relative to the pattern, so a hinge does not sit on a thin web.'),
    nli('Specify whether edges will be touched. Hand-contact panels such as railings and pooja screens should be deburred.'),
    nli('Powder coat after cutting, not before, and confirm the colour against a sample rather than a code.'),

    h2('What to Send Us'),
    p('A jali enquiry moves fastest with: the finished panel size, the material and thickness, the pattern as a vector file or a clear reference image, the quantity, and where it is going — indoor, outdoor or coastal.'),
    rich('If the pattern is a photograph or a sketch, that is fine. We convert it into a cutting file, add the bridges the design needs, and send it back for approval before anything is cut. The file requirements for vector artwork are covered in ', ['how to prepare a DXF for laser cutting', '/blog/dxf-file-preparation-for-laser-cutting'], '.'),
]

export const post = makePost({
    slug: 'laser-cut-jali-design-guide',
    title: 'Laser Cut Jali Panels: A Design and Specification Guide',
    sheetTitle: 'Laser Cut Jali Design Guide',
    summary:
        'How to design a jali screen that can actually be cut: connected patterns, web thickness, material and thickness by application, and what really drives the price.',
    tldr:
        'Every enclosed part of a jali pattern must connect to the frame or it becomes scrap. Keep webs at least as wide as the material is thick, size thickness to the span, and expect price to follow pattern density rather than panel size.',
    readTime: '8 min read',
    mainImageUrl: IMAGES.panel,
    mainImageAlt: 'Laser cut decorative metal jali screen panel manufactured by RG Tech Engineering Chennai',
    bannerEyebrow: 'DESIGN GUIDE',
    bannerHeading: 'Laser Cut Jali Panels',
    bannerSubheading: 'Patterns, Webs, Thickness & Cost',
    bannerBadge: 'ARCHITECTURAL',
    metaTitle: 'Laser Cut Jali Design Guide: Patterns, Thickness & Cost',
    metaDescription:
        'Designing laser cut jali screens: why enclosed pattern areas must be bridged, minimum web width, choosing material and thickness by span, and what drives panel price.',
    keywords: [
        'laser cut jali design',
        'jali panel design',
        'cnc jali cutting',
        'metal jali screen',
        'laser cut partition panel',
        'jali cutting chennai',
    ],
    body,
    faqs: faqs([
        ['Why do parts of my jali design fall out when cut?',
            'Anything fully enclosed by a cut line becomes scrap. Every element that must remain in the panel has to connect physically to the surrounding metal through bridges or tabs, which is a design decision rather than something the machine infers.'],
        ['What thickness should a jali panel be?',
            '1 to 2 mm for indoor decorative panels, 3 mm for general interior screens and small gate infills, 4 to 6 mm for compound gates and balcony railings, and 8 to 12 mm for structural or security use. Span matters more than appearance.'],
        ['What is the minimum web thickness in a jali pattern?',
            'As a working rule the narrowest metal between two cuts should be at least as wide as the material is thick. Thinner webs let heat build up locally and the panel bows.'],
        ['Which material is best for an outdoor jali gate?',
            'Mild steel with powder coating is the economical default and must be coated. Stainless 304 suits outdoor use without coating maintenance, and 316 is the choice within a few kilometres of the coast.'],
        ['Why does a jali panel cost more than a plain panel of the same size?',
            'Cutting is charged by the distance the beam travels and the number of pierces, not by panel area. A plain 1200 x 600 mm panel has under 4 metres of cut; a dense pattern in the same panel can have 200 metres.'],
        ['Can you cut a jali from a photograph or a sketch?',
            'Yes. We convert reference images and hand sketches into a cutting file, add the bridges the pattern needs so nothing drops out, and send it back for your approval before cutting.'],
        ['How do I reduce the cost of a jali design?',
            'Reducing pattern density saves more than reducing panel size or thickness, because density drives cutting time. A slightly more open version of the same motif is usually cheaper and often reads better from a distance.'],
        ['Should a jali panel be powder coated before or after cutting?',
            'After. Coating adds measurable thickness, so a panel cut to the exact opening size will not fit once coated — allow a tolerance gap in the opening as well.'],
    ]),
})
