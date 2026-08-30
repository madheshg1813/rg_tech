// Icons in this file are stored as *strings* (e.g. icon: 'Shield') and resolved
// to lucide-react components through IconMap in the rendering components. There
// is deliberately no lucide-react import here — importing 46 icon components
// into a module that every client component pulls in only bloats the bundle.

// "RG TECH LEADS" Apps Script — the deployment that contains handleEnquiry().
// The previous URL pointed at an older script that answers POSTs with
// "Invalid Password" and has no addEnquiry action, so it could never receive
// a lead.
export const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz0Rs61M3zXIAXs3UQSnCxHcQDngJ7wLRzCv8Ebgl94HAWpUgEic5Nc5GPxUxKm_b0w5g/exec'
export const ADMIN_PASSWORD = 'RGTECH2026'
export const BASE_URL = 'https://www.rgtechengineeringworks.com'

/*
 * Google Business Profile.
 *
 * Resolved from the share.google shortlink to its stable identifiers — short
 * links can expire or change, and a dead link in schema.org sameAs is worse
 * than no link at all.
 *
 *   Place ID : ChIJG19k-TRhUjoRi4KEeB11SGE
 *   CID      : 7009981589438628491
 */
export const GMB_PLACE_ID = 'ChIJG19k-TRhUjoRi4KEeB11SGE'
export const GMB_URL = 'https://maps.google.com/?cid=7009981589438628491'
export const GMB_MAP_URL = `https://www.google.com/maps/place/?q=place_id:${GMB_PLACE_ID}`
export const GMB_REVIEW_URL = `https://search.google.com/local/writereview?placeid=${GMB_PLACE_ID}`
export const GMB_DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination_place_id=${GMB_PLACE_ID}&destination=RG+Tech+Engineering+Works`
/*
 * Social channels.
 *
 * Only profiles that actually exist go in here. The footer previously rendered
 * four icons — Facebook, Instagram, LinkedIn, Twitter — every one of them
 * href="#", on every page of the site. An icon that looks like a link and goes
 * nowhere is worse than no icon.
 *
 * The YouTube URL is the /channel/<id> form, not a @handle: a handle can be
 * changed or reassigned, the channel id cannot. Same reasoning as the GMB
 * shortlink note above — these feed schema.org sameAs, where a dead link is
 * worse than no link at all.
 *
 * Verified live before being added (both 200; the channel's og:title reads
 * "RG Tech Engineering Works"). Add a profile here and it appears in the
 * footer and in sameAs at once.
 */
export const SOCIAL_LINKS = [
    { name: 'YouTube', icon: 'Youtube', url: 'https://www.youtube.com/channel/UC2atZgEKHm2EkmmVkIVrWcA' },
    { name: 'Instagram', icon: 'Instagram', url: 'https://www.instagram.com/rgtechengineeringworks/' },
]

export const DEFAULT_OG_IMAGE = `https://res.cloudinary.com/o1ytbfuz/image/upload/v1785177071/rg-tech/gallery/sheet-metal-laser-cutting/sm_12`

export const CHENNAI_LOCALITIES = [
    "Adyar", "Alandur", "Alwarpet", "Ambattur", "Aminjikarai", "Anna Nagar", "Arumbakkam",
    "Ashok Nagar", "Avadi", "Chetpet", "Chrompet", "Ekkatuthangal", "Gerugambakkam",
    "Guindy", "Kattupakkam", "Koyambedu", "Mangadu", "Medavakkam", "Nanganallur",
    "Nungambakkam", "OMR", "Palavanthangal", "Pallavaram", "Perungudi", "Poonamallee",
    "Porur", "Ramapuram", "Saidapet", "Sembakkam", "Shenoy Nagar", "T Nagar",
    "Tambaram", "Thirumudivakkam", "Tidel Park", "Velachery", "Kil Ayanambakkam",
    "Ayanambakkam", "Mel Ayanambakkam", "Padi", "Mogappair", "Vanagaram", "Maduravoyal",
    "Valasaravakkam", "Virugambakkam", "Saligramam", "Vadapalani", "Kodambakkam",
    "West Mambalam", "Mylapore", "Mandaveli", "RA Puram", "Thiruvanmiyur", "Kottivakkam",
    "Palavakkam", "Neelankarai", "Akkarai", "Injambakkam", "Sholinganallur", "Karapakkam",
    "Thoraipakkam", "Navalur", "Siruseri", "Kelambakkam", "Kovilambakkam", "Nanmangalam",
    "Madipakkam", "Keelkattalai", "Gowrivakkam", "Selaiyur", "Perungalathur", "Vandalur",
    "Urapakkam", "Guduvanchery", "Pammal", "Anakaputhur", "Kundrathur", "Thiruneermalai",
    "Kadaperi", "Peerkankaranai", "Mudichur", "Manapakkam", "Mugalivakkam", "Thiruvottiyur",
    "Ennore", "Manali", "Madhavaram", "Puzhal", "Red Hills", "Kolathur", "Perambur",
    "Vyasarpadi", "Tondiarpet", "Royapuram", "Sowcarpet", "Parrys", "Choolai", "Purasaiwakkam"
];

export const SERVICE_IMAGE_POOLS = {
    'laser-cutting-services': [
        'https://res.cloudinary.com/o1ytbfuz/image/upload/v1785177058/rg-tech/gallery/laser-cutting-services/kw_fiber_hd',
        'https://res.cloudinary.com/o1ytbfuz/image/upload/v1785177058/rg-tech/gallery/laser-cutting-services/kw_cnc_machine_hd',
        'https://res.cloudinary.com/o1ytbfuz/image/upload/v1785177056/rg-tech/gallery/laser-cutting-services/kw_aluminum_hd',
        'https://res.cloudinary.com/o1ytbfuz/image/upload/v1785176988/rg-tech/gallery/laser-cutting-services/rg-tech-catelog-vol-01_page_10'
    ],
    'sheet-metal-laser-cutting-services': [
        'https://res.cloudinary.com/o1ytbfuz/image/upload/v1785177070/rg-tech/gallery/sheet-metal-laser-cutting/sm_01',
        'https://res.cloudinary.com/o1ytbfuz/image/upload/v1785177070/rg-tech/gallery/sheet-metal-laser-cutting/sm_02',
        'https://res.cloudinary.com/o1ytbfuz/image/upload/v1785177070/rg-tech/gallery/sheet-metal-laser-cutting/sm_03',
        'https://res.cloudinary.com/o1ytbfuz/image/upload/v1785177071/rg-tech/gallery/sheet-metal-laser-cutting/sm_12'
    ],
    'fabrication-services': [
        'https://res.cloudinary.com/o1ytbfuz/image/upload/v1785176987/rg-tech/gallery/fabrication-services/rg-tech-catelog-vol-4_page-0016',
        'https://res.cloudinary.com/o1ytbfuz/image/upload/v1785176987/rg-tech/gallery/fabrication-services/rg-tech-catelog-vol-4_page-0018',
        'https://res.cloudinary.com/o1ytbfuz/image/upload/v1785176986/rg-tech/gallery/fabrication-services/rg-tech-catelog-vol-4_page-0008',
        'https://res.cloudinary.com/o1ytbfuz/image/upload/v1785176986/rg-tech/gallery/fabrication-services/rg-tech-catelog-vol-4_page-0010'
    ],
    'steel-gates': [
        'https://res.cloudinary.com/o1ytbfuz/image/upload/v1785177073/rg-tech/gallery/steel-gates/rg-tech-catelog-vol-4_page-0120',
        'https://res.cloudinary.com/o1ytbfuz/image/upload/v1785177073/rg-tech/gallery/steel-gates/rg-tech-catelog-vol-4_page-0125',
        'https://res.cloudinary.com/o1ytbfuz/image/upload/v1785177074/rg-tech/gallery/steel-gates/rg-tech-catelog-vol-4_page-0129',
        'https://res.cloudinary.com/o1ytbfuz/image/upload/v1785177074/rg-tech/gallery/steel-gates/rg-tech-catelog-vol-4_page-0135'
    ],
    'metal-safety-doors': [
        'https://res.cloudinary.com/o1ytbfuz/image/upload/v1785177063/rg-tech/gallery/metal-safety-doors/premium-quality-are-made-of-heavy-duty-stainless-steel-safety-doors-144',
        'https://res.cloudinary.com/o1ytbfuz/image/upload/v1785177063/rg-tech/gallery/metal-safety-doors/mild-steel-hinged-safety-door',
        'https://res.cloudinary.com/o1ytbfuz/image/upload/v1785177062/rg-tech/gallery/metal-safety-doors/7x3-5-feet-18-3-kilograms-paint-coated-mild-steel-safety-doors-466',
        'https://res.cloudinary.com/o1ytbfuz/image/upload/v1785177062/rg-tech/gallery/metal-safety-doors/1-13'
    ],
    'decorative-metal-panels': [
        'https://res.cloudinary.com/o1ytbfuz/image/upload/v1785176986/rg-tech/gallery/decorative-metal-panels/rg-tech-catelog-vol-02_page-0054',
        'https://res.cloudinary.com/o1ytbfuz/image/upload/v1785176986/rg-tech/gallery/decorative-metal-panels/rg-tech-catelog-vol-02_page-0062',
        'https://res.cloudinary.com/o1ytbfuz/image/upload/v1785176983/rg-tech/gallery/decorative-metal-panels/rg-tech-catelog-vol-02_page-0004',
        'https://res.cloudinary.com/o1ytbfuz/image/upload/v1785176983/rg-tech/gallery/decorative-metal-panels/rg-tech-catelog-vol-02_page-0011'
    ]
}

/*
 * The catalogues are served from the Railway bucket through
 * /api/catalogue/[file], which redirects to a presigned URL.
 *
 * They are NOT served from /public any more. At 108 MB across four files they
 * were the bulk of the container image, and because *.pdf is routed through Git
 * LFS a host that clones without fetching LFS objects — Railway does not fetch
 * them — served 130-byte pointer files instead of the PDFs.
 *
 * Cloudinary is not an option: PDF delivery is blocked account-wide by
 * Settings -> Security -> Restricted media types, verified as a 401 on a raw
 * upload, and the larger volumes exceed the free-tier upload limit.
 *
 * `key` is the object key in the bucket; the route derives the public path from
 * its filename and refuses anything not listed here.
 */
export const catalogues = [
    { name: 'RG Tech Catalogue Vol-01', key: 'catalogues/RG-Tech-Catelog-Vol-01.pdf', size: '28 MB' },
    { name: 'RG Tech Catalogue Vol-02', key: 'catalogues/RG-Tech-Catelog-Vol-02.pdf', size: '36 MB' },
    { name: 'RG Tech Catalogue Vol-03', key: 'catalogues/RG_Tech-Vol.03.pdf', size: '4 MB' },
    { name: 'RG Tech Catalogue Vol-04', key: 'catalogues/RG-Tech-Catelog-vol-4.pdf', size: '35 MB' },
].map((c) => ({ ...c, file: `/api/catalogue/${c.key.split('/').pop()}` }))

export const pillarServices = [
    {
        name: 'Laser Cutting Services',
        slug: '/chennai/laser-cutting-services',
        /* Purpose-shot landing image for this category. Used on the pillar
         * AND every locality page, replacing the rotated gallery pool — one
         * deliberate photograph beats a stock shot that changes per city.
         * landingRatio is the asset's own aspect; the hero renders at it so
         * the composition is never cropped by a fixed 4:3 slot. */
        landingImage: 'https://res.cloudinary.com/o1ytbfuz/image/upload/v1788066514/rg-tech/services/laser-cutting-services',
        landingRatio: 0.95,
        landingAlt: 'CNC fiber laser cutting head slicing a steel sheet, sparks flying across the bed',
        mainIcon: 'Scissors',
        title: 'Precision Laser Cutting Services in Chennai',
        metaTitle: 'Precision CNC Fiber Laser Cutting Services Chennai',
        metaDescription: 'Looking for laser cutting in Chennai? RG Tech offers high-precision CNC fiber laser cutting for MS, SS, and Aluminum. Reliable industrial job work with fast delivery.',
        heroImage: 'https://res.cloudinary.com/o1ytbfuz/image/upload/v1785177058/rg-tech/gallery/laser-cutting-services/lc_01',
        heroDesc: 'High-precision industrial laser cutting in Chennai. We deliver +/- 0.1mm accuracy for MS, SS, and Aluminum parts with the latest fiber technology.',
        secondaryImage: 'https://res.cloudinary.com/o1ytbfuz/image/upload/v1785177060/rg-tech/gallery/laser-cutting-services/lc_12',
        trustStrip: [
            { icon: 'Layers', label: 'MS, SS, Al, Cu, Brass', sub: 'Multi-material cutting' },
            { icon: 'Factory', label: 'OEM & Job Work', sub: 'Industrial-grade output' },
            { icon: 'Ruler', label: '0.01mm Tolerance', sub: 'CNC precision control' },
            { icon: 'Clock', label: '24–48hr Turnaround', sub: 'Fast delivery on orders' }
        ],
        whyCards: [
            { icon: 'Target', title: 'Precision Output', desc: 'Clean kerf, minimal burr, and consistent dimensions across every cut — ready for assembly or finishing.' },
            { icon: 'Layers', title: 'Production Ready', desc: 'From single prototypes to large batch cutting with repeatable accuracy and batch control.' },
            { icon: 'Wrench', title: 'Material Flexibility', desc: 'Mild steel, stainless steel 304/316/430, aluminium, copper, and brass — as per your requirement.' },
            { icon: 'FileText', title: 'Job Support & DFM', desc: 'Design-for-manufacturing input to reduce material waste, cutting time, and overall cost.' }
        ],
        capabilityDesc: 'Our high-performance CNC fiber laser infrastructure delivers rapid, burr-free cutting for varied industrial demands, ensuring peak material efficiency and edge smoothness.',
        capabilitiesList: [
            { label: 'Primary Tech', value: 'High-Power CNC Fiber Laser (up to 12kW)' },
            { label: 'Cutting Tolerance', value: '± 0.05mm structural precision' },
            { label: 'Mild Steel Cap', value: 'Clean cut up to 45mm' },
            { label: 'Stainless Steel', value: 'Oxide-free Nitrogen cutting up to 40mm' },
            { label: 'Aluminum/Copper', value: 'High-reflectivity processing up to 30mm' },
            { label: 'Bed Dimensions', value: '8000mm x 2500mm (Ultra-Large Format)' }
        ],
        supportedIndustries: [
            { icon: 'Factory', name: 'Automotive OEM Vendors' },
            { icon: 'Wind', name: 'HVAC & Ducting Mfgs' },
            { icon: 'Cpu', name: 'Electrical Panel Fabricators' },
            { icon: 'Building2', name: 'Pre-Engineered Buildings (PEB)' }
        ],
        processSteps: [
            { step: '01', title: 'DXF Optimization', desc: 'Analyzing files for nesting and kerf compensation' },
            { step: '02', title: 'Material Calibration', desc: 'Setting laser parameters for specific alloy grades' },
            { step: '03', title: 'Precision Cutting', desc: 'High-speed fiber profiling with real-time sensors' },
            { step: '04', title: 'Quality Inspection', desc: 'Dimensional verification and edge burr checks' }
        ],
        checklist: [
            'Correct DXF/DWG file scaling',
            'Material thickness and grade (e.g., SS316, IS2062)',
            'Specific edge finish requirements',
            'Critical dimensional tolerances (if any)'
        ],
        faqs: [
            { q: 'How much does laser cutting cost per hour at RG Tech Engineering?', a: 'Laser cutting is not billed on a flat hourly rate. RG Tech prices each job on material grade, thickness, total cut length, piercing count and quantity — a 2 mm MS part and a 25 mm plate take very different machine time. Send your DXF with material and quantity and you get a firm, itemised quote within 24 business hours.' },
            { q: 'What is the maximum thickness RG Tech can laser cut?', a: 'RG Tech cuts mild steel and stainless steel up to 45 mm, aluminium up to 30 mm, and copper and brass up to 16 mm on our CNC fiber laser. Anything thicker is better suited to plasma or waterjet, and we will tell you that up front rather than take the job.' },
            { q: 'What cutting tolerance does RG Tech Engineering hold?', a: 'We work to a positional tolerance of about +/- 0.1 mm on typical sheet thicknesses. Tolerance widens slightly as plate thickness increases, because kerf taper and heat input both grow — if your part has a critical fit, flag it and we will confirm what is achievable before cutting.' },
            { q: 'How long does laser cutting job work take at RG Tech in Chennai?', a: 'Quotes go out within 24 business hours. Most bulk laser jobs are dispatched in 48 to 72 hours depending on volume and finishing. Prototypes and small urgent batches can often be turned around faster — tell us your deadline when you send the drawing.' },
            { q: 'Which file formats does RG Tech accept for CNC laser cutting?', a: 'DXF and DWG are preferred because they go straight to the laser with no redraw. We also accept STEP, PDF and even hand-drawn sketches, and our team will convert them into production-ready cutting files for you.' },
            { q: 'Can RG Tech laser cut reflective metals like copper and brass?', a: 'Yes. Our fiber lasers are fitted with back-reflection protection specifically so copper and brass can be cut safely — these metals reflect beam energy back into the source and will damage machines that are not built for it.' },
            { q: 'Does RG Tech Engineering offer CAD nesting to reduce sheet wastage?', a: 'Yes, CAD nesting is included as standard. We arrange your parts to get the maximum yield from every sheet, which directly lowers your material cost — on repeat orders this routinely saves customers double-digit percentages.' },
            { q: 'Is there a minimum order quantity for laser cutting at RG Tech?', a: 'No minimum. RG Tech handles single-piece prototypes through to high-volume production runs. Per-unit cost does fall with quantity, so if you plan to repeat an order it is worth telling us at quoting stage.' },
        ],
        seoParagraph: 'If you\'re searching for <strong class="text-[#0A1929]">laser cutting services in Chennai</strong> for repeat industrial parts, choosing the right process — <strong class="text-[#0A1929]">CNC laser cutting</strong> or <strong class="text-[#0A1929]">fiber laser cutting</strong> — directly impacts edge quality, accuracy, and overall fabrication cost. At RG Tech Engineering Works, we support engineering customers with stable cutting, nesting efficiency, and production-friendly documentation so parts fit right the first time.',
        keywords: [
            { text: 'CNC Laser Cutting', img: 'https://res.cloudinary.com/o1ytbfuz/image/upload/v1785177058/rg-tech/gallery/laser-cutting-services/lc_01' },
            { text: 'Fiber Laser Cutting', img: 'https://res.cloudinary.com/o1ytbfuz/image/upload/v1785177059/rg-tech/gallery/laser-cutting-services/lc_02' },
            { text: 'MS Laser Cutting', img: 'https://res.cloudinary.com/o1ytbfuz/image/upload/v1785177059/rg-tech/gallery/laser-cutting-services/lc_03' },
            { text: 'SS Laser Cutting', img: 'https://res.cloudinary.com/o1ytbfuz/image/upload/v1785177059/rg-tech/gallery/laser-cutting-services/lc_04' },
            { text: 'Aluminum Laser Cutting', img: 'https://res.cloudinary.com/o1ytbfuz/image/upload/v1785177059/rg-tech/gallery/laser-cutting-services/lc_05' },
            { text: 'Brass Laser Cutting', img: 'https://res.cloudinary.com/o1ytbfuz/image/upload/v1785177060/rg-tech/gallery/laser-cutting-services/lc_06' },
            { text: 'Copper Laser Cutting', img: 'https://res.cloudinary.com/o1ytbfuz/image/upload/v1785177059/rg-tech/gallery/laser-cutting-services/lc_07' },
            { text: 'Precision Metal Cutting', img: 'https://res.cloudinary.com/o1ytbfuz/image/upload/v1785177059/rg-tech/gallery/laser-cutting-services/lc_08' },
            { text: 'Industrial Parts', img: 'https://res.cloudinary.com/o1ytbfuz/image/upload/v1785177059/rg-tech/gallery/laser-cutting-services/lc_09' },
            { text: 'CNC Cutting', img: 'https://res.cloudinary.com/o1ytbfuz/image/upload/v1785177060/rg-tech/gallery/laser-cutting-services/lc_10' }
        ]
    },
    {
        name: 'Sheet Metal Laser Cutting',
        slug: '/chennai/sheet-metal-laser-cutting-services',
        /* Purpose-shot landing image for this category. Used on the pillar
         * AND every locality page, replacing the rotated gallery pool — one
         * deliberate photograph beats a stock shot that changes per city.
         * landingRatio is the asset's own aspect; the hero renders at it so
         * the composition is never cropped by a fixed 4:3 slot. */
        landingImage: 'https://res.cloudinary.com/o1ytbfuz/image/upload/v1788066515/rg-tech/services/sheet-metal-laser-cutting-services',
        landingRatio: 1.83,
        landingAlt: 'Fiber laser cutting a profile out of black sheet metal on the machine bed',
        mainIcon: 'PanelTop',
        title: 'Industrial Sheet Metal Laser Cutting Chennai',
        metaTitle: 'Sheet Metal Laser Cutting Services Chennai | MS & SS Processing',
        metaDescription: 'Expert sheet metal laser cutting services in Chennai. We handle thick plates (up to 45mm), MS sheet cutting, and precision SS processing for industrial OEMs.',
        heroImage: 'https://res.cloudinary.com/o1ytbfuz/image/upload/v1785177071/rg-tech/gallery/sheet-metal-laser-cutting/sm_12',
        heroDesc: 'High-volume sheet metal laser cutting for MS, SS, and Aluminum plates. We handle everything from thin sheets to heavy industrial plates up to 45mm.',
        secondaryImage: 'https://res.cloudinary.com/o1ytbfuz/image/upload/v1785177071/rg-tech/gallery/sheet-metal-laser-cutting/sm_06',
        trustStrip: [
            { icon: 'Layers', label: 'Thin to Heavy Plate', sub: 'Up to 45mm processed' },
            { icon: 'Target', label: 'High Yield Nesting', sub: 'Reduce material waste' },
            { icon: 'Zap', label: 'Fiber Speed', sub: 'Fast execution of batch' },
            { icon: 'Package', label: 'OEM Ready', sub: 'Inspection & labeling' }
        ],
        whyCards: [
            { icon: 'Shield', title: 'Clean Edges', desc: 'Specialized gas mixtures for oxide-free cutting on stainless steel.' },
            { icon: 'Ruler', title: 'Tight Tolerances', desc: 'Precision +/- 0.1mm for accurate assembly fitment.' },
            { icon: 'Factory', title: 'Industrial Scale', desc: 'High-power lasers for continuous production runs.' },
            { icon: 'CheckCircle', title: 'Material Optimization', desc: 'Advanced nesting software for maximum material utilization.' }
        ],
        capabilityDesc: 'We specialize in industrial-scale sheet metal processing with high-power fiber lasers, ensuring precision and efficiency for all your projects.',
        capabilitiesList: [
            { label: 'MS Capacity', value: '0.5mm to 45mm' },
            { label: 'SS Capacity', value: '0.5mm to 45mm' },
            { label: 'Aluminum', value: '1mm to 30mm' },
            { label: 'Copper & Brass', value: '0.5mm to 16mm' },
            { label: 'Bed Size', value: 'Up to 8000 x 2500mm' },
            { label: 'Edge Finish', value: 'Burr-free, ready for bending or welding' }
        ],
        supportedIndustries: [
            { icon: 'Factory', name: 'Control Panel Fabricators' },
            { icon: 'Building2', name: 'Pre-Engineering Buildings' },
            { icon: 'Wrench', name: 'Heavy Equipment Manufacturing' },
            { icon: 'Cpu', name: 'Electrical Enclosures' }
        ],
        processSteps: [
            { step: '01', title: 'Drawing Review', desc: 'Verify DXF/DWG for manufacturability' },
            { step: '02', title: 'Nesting', desc: 'Optimize layout for material yield' },
            { step: '03', title: 'Laser Cutting', desc: 'High-speed, precise cutting' },
            { step: '04', title: 'Quality Check', desc: 'Dimensional accuracy and edge quality' },
            { step: '05', title: 'Packaging', desc: 'Secure packing for transport' },
            { step: '06', title: 'Delivery', desc: 'On-time dispatch to your site' }
        ],
        checklist: [
            'Material grade and type (e.g., MS IS2062, SS304)',
            'Sheet thickness and dimensions',
            'Quantity required',
            'DXF/DWG files with accurate scaling',
            'Any post-cutting operations (e.g., bending, deburring)',
            'Delivery address and preferred timeline'
        ],
        faqs: [
            { q: 'What sheet metal thickness range does RG Tech Engineering laser cut?', a: 'RG Tech processes thin-gauge sheet from around 0.8 mm right through to 45 mm plate in mild and stainless steel. Thin sheet is where fiber laser is at its cleanest — you get a square edge with almost no burr and no secondary deburring cost.' },
            { q: 'How accurate is sheet metal laser cutting at RG Tech?', a: 'We hold approximately +/- 0.1 mm on standard sheet gauges. Thin sheet cuts tighter than heavy plate because there is less heat input and less kerf taper, so tell us which dimensions are critical and we will orient the cut accordingly.' },
            { q: 'Does RG Tech provide bending and forming after sheet metal cutting?', a: 'Yes. RG Tech offers press-brake bending, forming, welding and finishing in-house, so a flat blank can leave as a finished formed part. Keeping cutting and bending under one roof avoids the tolerance stack-up you get when parts move between vendors.' },
            { q: 'What is the largest sheet RG Tech can cut in one piece?', a: 'Our bed takes sheets up to 8000 x 2500 mm. That means long structural members and large panels are cut in a single piece with no welded joins — stronger, straighter, and far better looking on architectural work.' },
            { q: 'How much does sheet metal laser cutting cost per meter at RG Tech?', a: 'Cost per metre rises with thickness, since thicker material needs slower feed and more assist gas. Rather than quote a rate that will not match your job, RG Tech prices from your actual DXF — cut length, pierces, material and quantity — and returns it within 24 business hours.' },
            { q: 'Can RG Tech cut galvanised and pre-coated sheet?', a: 'Yes, we regularly cut GI and pre-coated sheet. Some zinc burn-off at the cut edge is unavoidable with any thermal process, so where the edge will be exposed we recommend a post-cut touch-up, and we will point out where that matters.' },
            { q: 'Does RG Tech Engineering supply the sheet metal or do I send my own?', a: 'Either works. RG Tech can source material to your specified grade, or run pure labour-only job work on sheets you supply. Customers on repeat production often supply their own stock; one-off jobs are usually simpler if we source it.' },
            { q: 'How quickly can RG Tech deliver sheet metal parts in Chennai?', a: 'Within Chennai most sheet metal jobs are ready in 48 to 72 hours after drawing approval. Parts are QC-checked for dimensional accuracy and edge-protected before dispatch so they arrive in the condition they left in.' },
        ],
        seoParagraph: 'For <strong class="text-[#0A1929]">sheet metal laser cutting in Chennai</strong>, especially for thick plates and high-volume orders, our advanced fiber laser technology ensures superior edge quality and minimal material waste. We cater to a wide range of industrial applications, providing precise <strong class="text-[#0A1929]">MS sheet cutting</strong> and <strong class="text-[#0A1929]">SS precision processing</strong> for various sectors.',
        keywords: [
            { text: 'Sheet Metal Cutting', img: 'https://res.cloudinary.com/o1ytbfuz/image/upload/v1785177070/rg-tech/gallery/sheet-metal-laser-cutting/sm_01' },
            { text: 'Plate Cutting', img: 'https://res.cloudinary.com/o1ytbfuz/image/upload/v1785177070/rg-tech/gallery/sheet-metal-laser-cutting/sm_02' },
            { text: 'Thick Plate Cutting', img: 'https://res.cloudinary.com/o1ytbfuz/image/upload/v1785177070/rg-tech/gallery/sheet-metal-laser-cutting/sm_03' },
            { text: 'CRCA Sheet Cutting', img: 'https://res.cloudinary.com/o1ytbfuz/image/upload/v1785177070/rg-tech/gallery/sheet-metal-laser-cutting/sm_04' },
            { text: 'GI Sheet Cutting', img: 'https://res.cloudinary.com/o1ytbfuz/image/upload/v1785177070/rg-tech/gallery/sheet-metal-laser-cutting/sm_05' },
            { text: 'Industrial Sheet Processing', img: 'https://res.cloudinary.com/o1ytbfuz/image/upload/v1785177071/rg-tech/gallery/sheet-metal-laser-cutting/sm_06' },
            { text: 'CNC Fiber Laser Sheet Cutting', img: 'https://res.cloudinary.com/o1ytbfuz/image/upload/v1785177071/rg-tech/gallery/sheet-metal-laser-cutting/sm_07' },
            { text: 'MS Plate Cutting', img: 'https://res.cloudinary.com/o1ytbfuz/image/upload/v1785177071/rg-tech/gallery/sheet-metal-laser-cutting/sm_08' },
            { text: 'SS Sheet Cutting', img: 'https://res.cloudinary.com/o1ytbfuz/image/upload/v1785177071/rg-tech/gallery/sheet-metal-laser-cutting/sm_09' },
            { text: 'Precision Sheet Metal', img: 'https://res.cloudinary.com/o1ytbfuz/image/upload/v1785177071/rg-tech/gallery/sheet-metal-laser-cutting/sm_10' }
        ]
    },
    {
        name: 'Fabrication Services',
        slug: '/chennai/fabrication-services',
        /* Purpose-shot landing image for this category. Used on the pillar
         * AND every locality page, replacing the rotated gallery pool — one
         * deliberate photograph beats a stock shot that changes per city.
         * landingRatio is the asset's own aspect; the hero renders at it so
         * the composition is never cropped by a fixed 4:3 slot. */
        landingImage: 'https://res.cloudinary.com/o1ytbfuz/image/upload/v1788066515/rg-tech/services/fabrication-services',
        landingRatio: 1.17,
        landingAlt: 'Fabricated steel canopy with laser-cut jali screens over a landscaped seating area',
        mainIcon: 'Wrench',
        title: 'Metal Fabrication & Job Work in Chennai',
        metaTitle: 'Best Metal Fabrication Services Chennai | Sheet Metal & SS',
        metaDescription: 'Looking for professional metal fabrication in Chennai? We offer precision bending, TIG/MIG welding, and complete assembly for industrial and pharma projects.',
        heroImage: 'https://res.cloudinary.com/o1ytbfuz/image/upload/v1785176987/rg-tech/gallery/fabrication-services/rg-tech-catelog-vol-4_page-0016',
        heroDesc: 'Comprehensive industrial fabrication in Chennai. From precise laser cutting to specialized bending and high-strength welding, we handle the full production cycle.',
        secondaryImage: 'https://res.cloudinary.com/o1ytbfuz/image/upload/v1785176987/rg-tech/gallery/fabrication-services/rg-tech-catelog-vol-4_page-0018',
        trustStrip: [
            { icon: 'Wrench', label: 'High-Precision Bending', sub: 'Up to 3m hydraulic' },
            { icon: 'Shield', label: 'TIG/MIG Welding', sub: 'High-strength joints' },
            { icon: 'CheckCircle', label: 'Full Assembly', sub: 'Machine enclosures' },
            { icon: 'Package', label: 'Finish Ready', sub: 'Powder coat options' }
        ],
        whyCards: [
            { icon: 'Target', title: 'One-Stop Shop', desc: 'Cut, bend, weld, and assemble under one roof to reduce lead times.' },
            { icon: 'Layers', title: 'Pharma & Food Grade', desc: 'Specialized stainless steel fabrication with 304/316 precision.' }
        ],
        capabilityDesc: 'End-to-end metal fabrication involving heavy-duty bending, high-strength structural welding, and precision assembly for industrial applications.',
        capabilitiesList: [
            { label: 'Bending Force', value: '300-Ton CNC Press Brake' },
            { label: 'Max Length', value: 'Bending up to 3100mm' },
            { label: 'Welding Specs', value: 'ASME Quality TIG/MIG/Spot Welding' },
            { label: 'Materials', value: 'Certified MS, SS304/316, Armor Plate' }
        ],
        supportedIndustries: [
            { icon: 'Factory', name: 'Heavy Machine OEM' },
            { icon: 'Shield', name: 'Defense & Aerospace' },
            { icon: 'Building2', name: 'Mining & Logistics' }
        ],
        processSteps: [
            { step: '01', title: 'Fit-up Review', desc: 'Jig and fixture design for assembly alignment' },
            { step: '02', title: 'Precision Bending', desc: 'CNC controlled angle accuracy check' },
            { step: '03', title: 'Certified Welding', desc: 'Structural joining following WPS guidelines' },
            { step: '04', title: 'Stress Relieving', desc: 'Ensuring weld integrity and geometry' }
        ],
        checklist: [
            'Weld strength / penetration requirements',
            'Critical assembly fitment tolerances',
            'Surface treatment (Painting/Galvanizing)',
            'Third-party inspection needs'
        ],
        faqs: [
            { q: 'What fabrication services does RG Tech Engineering offer after laser cutting?', a: 'RG Tech covers the full route after cutting: press-brake bending, TIG and MIG welding, grinding, drilling, tapping, assembly and surface finishing. You can hand over a drawing and collect a finished assembly rather than managing four separate vendors.' },
            { q: 'Does RG Tech provide TIG and MIG welding for stainless steel?', a: 'Yes. TIG is used where the weld is visible or the material is thin and heat distortion matters, MIG where speed and penetration matter on heavier structural work. We select the process to suit the joint, not the other way round.' },
            { q: 'Can RG Tech Engineering handle complete assembly work?', a: 'Yes, RG Tech takes on sub-assembly and full assembly, including fastener fitting and fit-up checks. Assembling in-house means any tolerance issue is caught and corrected on our floor instead of on your site.' },
            { q: 'How much does metal fabrication cost per kg at RG Tech?', a: 'Fabrication is not sensibly priced by weight alone — two parts of identical weight can differ several-fold in cost depending on weld length, bend count, finishing and tolerance. RG Tech quotes from your drawing and returns a line-by-line breakdown within 24 business hours.' },
            { q: 'Does RG Tech offer powder coating and surface finishing?', a: 'Yes. RG Tech provides grinding, buffing, primer and powder coating in a range of shades. For outdoor or coastal installations we will recommend the coating system that will actually survive the environment.' },
            { q: 'Can RG Tech Engineering fabricate to my own drawings and GA specification?', a: 'Yes, and we prefer it. Send GA drawings, part drawings or 3D models and we will fabricate to spec. Our DFM review will also flag anything that is expensive or impractical to make before you commit to production.' },
            { q: 'How long does a custom fabrication order take at RG Tech?', a: 'Straightforward fabricated items typically run 3 to 7 working days after drawing sign-off. Larger structures or work involving coating take longer — RG Tech commits to a dated schedule at order confirmation rather than a vague estimate.' },
            { q: 'Does RG Tech Engineering take on prototype and single-piece fabrication?', a: 'Yes. RG Tech supports one-off prototypes as readily as production batches, which is how most customers start with us — a single trial part, then repeat production once it is proven.' },
        ],
        seoParagraph: 'Professional fabrication services in Chennai for industrial and architectural needs.',
        keywords: [
            { text: 'Metal Fabrication', img: 'https://res.cloudinary.com/o1ytbfuz/image/upload/v1785176986/rg-tech/gallery/fabrication-services/rg-tech-catelog-vol-4_page-0008' },
            { text: 'Industrial Fabrication Services', img: 'https://res.cloudinary.com/o1ytbfuz/image/upload/v1785176986/rg-tech/gallery/fabrication-services/rg-tech-catelog-vol-4_page-0009' },
            { text: 'Welded Assemblies', img: 'https://res.cloudinary.com/o1ytbfuz/image/upload/v1785176986/rg-tech/gallery/fabrication-services/rg-tech-catelog-vol-4_page-0010' },
            { text: 'CNC Bending', img: 'https://res.cloudinary.com/o1ytbfuz/image/upload/v1785176987/rg-tech/gallery/fabrication-services/rg-tech-catelog-vol-4_page-0011' },
            { text: 'Folding', img: 'https://res.cloudinary.com/o1ytbfuz/image/upload/v1785176987/rg-tech/gallery/fabrication-services/rg-tech-catelog-vol-4_page-0012' },
            { text: 'TIG/MIG Welding', img: 'https://res.cloudinary.com/o1ytbfuz/image/upload/v1785176987/rg-tech/gallery/fabrication-services/rg-tech-catelog-vol-4_page-0013' },
            { text: 'Structural Fabrication', img: 'https://res.cloudinary.com/o1ytbfuz/image/upload/v1785176987/rg-tech/gallery/fabrication-services/rg-tech-catelog-vol-4_page-0015' },
            { text: 'Machine Enclosures', img: 'https://res.cloudinary.com/o1ytbfuz/image/upload/v1785176987/rg-tech/gallery/fabrication-services/rg-tech-catelog-vol-4_page-0016' },
            { text: 'Custom Steel Fabrication', img: 'https://res.cloudinary.com/o1ytbfuz/image/upload/v1785176987/rg-tech/gallery/fabrication-services/rg-tech-catelog-vol-4_page-0017' },
            { text: 'Production Weldment', img: 'https://res.cloudinary.com/o1ytbfuz/image/upload/v1785176987/rg-tech/gallery/fabrication-services/rg-tech-catelog-vol-4_page-0018' }
        ]
    },
    {
        name: 'Steel Gates',
        slug: '/chennai/steel-gates',
        /* Purpose-shot landing image for this category. Used on the pillar
         * AND every locality page, replacing the rotated gallery pool — one
         * deliberate photograph beats a stock shot that changes per city.
         * landingRatio is the asset's own aspect; the hero renders at it so
         * the composition is never cropped by a fixed 4:3 slot. */
        landingImage: 'https://res.cloudinary.com/o1ytbfuz/image/upload/v1788066515/rg-tech/services/steel-gates',
        landingRatio: 1.33,
        landingAlt: 'Laser-cut sliding steel gate with slat panels and circular mandala inserts',
        mainIcon: 'Home',
        title: 'Designer Laser Cut Steel Gates Chennai',
        metaTitle: 'Laser Cut Steel Gates Chennai | Designer Main Gate Fabricators',
        metaDescription: 'Custom designer main gates in Chennai. Laser cut gate patterns in MS and Stainless Steel. Modern entrances for villas and factories with durable PU finishes.',
        heroImage: 'https://res.cloudinary.com/o1ytbfuz/image/upload/v1785177074/rg-tech/gallery/steel-gates/rg-tech-catelog-vol-4_page-0129',
        heroDesc: 'Elevate your property with custom laser-cut steel gates. Combining modern aesthetics with industrial-grade security, our gates are built to last.',
        secondaryImage: 'https://res.cloudinary.com/o1ytbfuz/image/upload/v1785177074/rg-tech/gallery/steel-gates/rg-tech-catelog-vol-4_page-0135',
        trustStrip: [
            { icon: 'Sparkles', label: 'Designer Patterns', sub: '100+ CNC designs' },
            { icon: 'Shield', label: 'Heavy Duty', sub: 'Structural frames' },
            { icon: 'Target', label: 'Custom Fit', sub: 'On-site measurement' },
            { icon: 'Paintbrush', label: 'Weather Resistant', sub: 'Powder coated' }
        ],
        whyCards: [
            { icon: 'Target', title: 'Visual Impact', desc: 'Intricate patterns that create a stunning first impression.' },
            { icon: 'Shield', title: 'Lifetime Durability', desc: 'Premium materials and anti-rust treatments for longevity.' }
        ],
        capabilityDesc: 'Custom-engineered entrance solutions that blend high-end laser-cut aesthetics with heavy-duty structural frames for residential and commercial security.',
        capabilitiesList: [
            { label: 'Frame Material', value: 'Heavy Duty MS Hollow Sections' },
            { label: 'Design Infill', value: '3mm-8mm Laser-Cut Designer Plates' },
            { label: 'Rust Protection', value: 'Epoxy Primer + Polyurethane (PU) Finish' },
            { label: 'Operation', value: 'Manual, Sliding, or Fully Automated' }
        ],
        supportedIndustries: [
            { icon: 'Home', name: 'Luxury Residential Villas' },
            { icon: 'Building2', name: 'Gated Communities' },
            { icon: 'Factory', name: 'Corporate Industrial Units' }
        ],
        processSteps: [
            { step: '01', title: 'Site Inspection', desc: 'Physical measurement and floor level check' },
            { step: '02', title: 'Pattern Approval', desc: 'Selecting from architectural 2D/3D catalogs' },
            { step: '03', title: 'Structural Fab', desc: 'Welding the main swing/slide frame' },
            { step: '04', title: 'Pattern Inlay', desc: 'Precision fixing of the laser-cut panels' }
        ],
        checklist: [
            'Width and Height of the clear opening',
            'Swing space vs Sliding track availability',
            'Automation preference (Motorized/Manual)',
            'Color and RAL finish code'
        ],
        faqs: [
            { q: 'How much does a laser cut steel gate cost per sq ft at RG Tech?', a: 'Gate pricing depends on material (MS, GI or stainless), sheet thickness, how dense the laser-cut pattern is, frame section and finish. Intricate patterns need far more cutting time than open designs. Share your opening size and a reference design and RG Tech will quote within 24 business hours.' },
            { q: 'How long does RG Tech Engineering take to make and install a main gate?', a: 'A custom laser-cut gate typically takes 7 to 12 working days from design approval, including cutting, frame fabrication, finishing and curing. Installation is usually a single day once the gate is on site.' },
            { q: 'Can RG Tech make a custom gate design from my own drawing or photo?', a: 'Yes. Send a photograph, a sketch or a CAD file and RG Tech will convert it into a cutting-ready vector, adjusting it so the pattern stays structurally sound — a design can look good on screen and still be too fragile to cut.' },
            { q: 'Which material does RG Tech recommend for gates - MS, SS or GI?', a: 'Mild steel is the most economical and takes powder coating well. Galvanised steel resists rust better for exposed sites. Stainless steel costs the most but needs the least maintenance. RG Tech recommends based on your location and how much upkeep you are willing to do.' },
            { q: 'Does RG Tech Engineering install gates across Chennai?', a: 'Yes, RG Tech delivers and installs across Chennai and the surrounding industrial belt, including hinge and post fitting and alignment. We measure the opening before fabrication so the gate fits the site as built, not as drawn.' },
            { q: 'Will a steel gate from RG Tech rust in coastal Chennai weather?', a: 'Bare mild steel will corrode in coastal air. RG Tech treats gates with primer and powder coating, and for seafront locations we recommend galvanised or stainless steel. Correctly specified and coated, a gate lasts years without visible corrosion.' },
            { q: 'Can RG Tech fit automation or a motor to a laser cut gate?', a: 'Yes. If you plan to automate, tell us at design stage — the frame needs to be built for the extra load and travel. Retro-fitting a motor to a gate that was not designed for it usually means reinforcing it later.' },
            { q: 'What finish options does RG Tech Engineering offer on steel gates?', a: 'Powder coating in a wide shade range, textured and matte finishes, wood-effect coatings, and brushed or mirror finish on stainless. RG Tech can also combine laser-cut steel with WPC or HPL infill panels for a two-material look.' },
        ],
        seoParagraph: 'Modern laser cut gate designs in Chennai for residential and commercial properties.',
        keywords: [
            { text: 'Laser Cut Gates', img: 'https://res.cloudinary.com/o1ytbfuz/image/upload/v1785177073/rg-tech/gallery/steel-gates/rg-tech-catelog-vol-4_page-0120' },
            { text: 'Designer Steel Gates', img: 'https://res.cloudinary.com/o1ytbfuz/image/upload/v1785177073/rg-tech/gallery/steel-gates/rg-tech-catelog-vol-4_page-0121' },
            { text: 'Modern Entrance Gates', img: 'https://res.cloudinary.com/o1ytbfuz/image/upload/v1785177073/rg-tech/gallery/steel-gates/rg-tech-catelog-vol-4_page-0122' },
            { text: 'Sliding Gates', img: 'https://res.cloudinary.com/o1ytbfuz/image/upload/v1785177073/rg-tech/gallery/steel-gates/rg-tech-catelog-vol-4_page-0123' },
            { text: 'Automated Gates', img: 'https://res.cloudinary.com/o1ytbfuz/image/upload/v1785177073/rg-tech/gallery/steel-gates/rg-tech-catelog-vol-4_page-0124' },
            { text: 'Front Gate Designs', img: 'https://res.cloudinary.com/o1ytbfuz/image/upload/v1785177073/rg-tech/gallery/steel-gates/rg-tech-catelog-vol-4_page-0125' },
            { text: 'MS Gate Fabrication', img: 'https://res.cloudinary.com/o1ytbfuz/image/upload/v1785177073/rg-tech/gallery/steel-gates/rg-tech-catelog-vol-4_page-0126' },
            { text: 'SS Gate Designs', img: 'https://res.cloudinary.com/o1ytbfuz/image/upload/v1785177073/rg-tech/gallery/steel-gates/rg-tech-catelog-vol-4_page-0127' },
            { text: 'Villa Gates', img: 'https://res.cloudinary.com/o1ytbfuz/image/upload/v1785177073/rg-tech/gallery/steel-gates/rg-tech-catelog-vol-4_page-0128' },
            { text: 'Architectural Gates', img: 'https://res.cloudinary.com/o1ytbfuz/image/upload/v1785177074/rg-tech/gallery/steel-gates/rg-tech-catelog-vol-4_page-0129' }
        ]
    },
    {
        name: 'Metal Safety Doors',
        slug: '/chennai/metal-safety-doors',
        /* Purpose-shot landing image for this category. Used on the pillar
         * AND every locality page, replacing the rotated gallery pool — one
         * deliberate photograph beats a stock shot that changes per city.
         * landingRatio is the asset's own aspect; the hero renders at it so
         * the composition is never cropped by a fixed 4:3 slot. */
        landingImage: 'https://res.cloudinary.com/o1ytbfuz/image/upload/v1788066515/rg-tech/services/metal-safety-doors',
        landingRatio: 1.33,
        landingAlt: 'Metal safety door with a laser-cut geometric grille panel at a house entrance',
        mainIcon: 'DoorOpen',
        title: 'Premium Metal Safety Doors in Chennai',
        metaTitle: 'Designer Metal Safety Doors Chennai | Laser Cut Security Doors',
        metaDescription: 'Best metal safety doors in Chennai. Secure your home with aesthetic laser-cut security doors. Custom multi-lock prep in MS and SS for residential use.',
        heroImage: 'https://res.cloudinary.com/o1ytbfuz/image/upload/v1785177063/rg-tech/gallery/metal-safety-doors/premium-quality-are-made-of-heavy-duty-stainless-steel-safety-doors-144',
        heroDesc: 'Uncompromising security meets stunning design. Our laser-cut metal safety doors provide industrial-grade protection with a premium look.',
        secondaryImage: 'https://res.cloudinary.com/o1ytbfuz/image/upload/v1785177063/rg-tech/gallery/metal-safety-doors/mild-steel-hinged-safety-door',
        trustStrip: [
            { icon: 'Shield', label: 'Anti-Theft', sub: 'High-strength panels' },
            { icon: 'Zap', label: 'Breathable Jali', sub: 'Airflow + Security' },
            { icon: 'Target', label: 'Precision Fit', sub: 'Zero gap fitment' },
            { icon: 'Layers', label: 'Multi-Material', sub: 'MS, SS, Wood-Inlay' }
        ],
        whyCards: [
            { icon: 'Target', title: 'Smart Designs', desc: 'Safety features hidden within beautiful jali patterns.' },
            { icon: 'Shield', title: 'Rigid Frame', desc: 'Heavy-duty steel frames that resist forced entry.' }
        ],
        capabilityDesc: 'Industrial-grade home security solutions featuring reinforced steel frames and artistic laser-cut jali patterns, providing both uncompromising protection and architectural beauty.',
        capabilitiesList: [
            { label: 'Security Panel', value: '4mm-6mm MS/SS High-Strength Plate' },
            { label: 'Lock Prep', value: 'Pre-machined for Multi-Stage Digital Locks' },
            { icon: 'Wind', label: 'Ventilation', value: 'Optimized Jali airflow ratio' },
            { label: 'Durability', value: 'Galvanized + High-Gloss PU Coating' }
        ],
        supportedIndustries: [
            { icon: 'Home', name: 'Premium Apartments' },
            { icon: 'Shield', name: 'Corporate Security Units' },
            { icon: 'Building2', name: 'Commercial Offices' }
        ],
        processSteps: [
            { step: '01', title: 'Survey & Scan', desc: 'Precise electronic measurement of entrance clearance' },
            { step: '02', title: 'Pattern Customization', desc: 'Scaling jali motifs to fit door dimensions' },
            { step: '03', title: 'Core Fabrication', desc: 'Welding reinforced Z-sections for high stiffness' },
            { step: '04', title: 'Hardware Integration', desc: 'Pre-fitting hinges and security locking mechanisms' }
        ],
        checklist: [
            'Opening direction (L/R - Inside/Outside)',
            'Existing frame material (Wood/Concrete/Granite)',
            'Digital-lock vs Manual-lock cutouts',
            'Mesh type requirement (Mosquito/Stainless Mesh)'
        ],
        faqs: [
            { q: 'What is the price of a steel safety door at RG Tech Engineering?', a: 'Safety door pricing turns on door size, sheet gauge, frame section, laser-cut pattern complexity, lock system and finish. RG Tech quotes against your actual opening size rather than a generic rate, and returns pricing within 24 business hours.' },
            { q: 'What sheet gauge does RG Tech use for metal safety doors?', a: 'RG Tech builds safety doors from heavy-gauge mild or stainless steel sheet on a welded structural frame. Gauge is matched to the span and the security level you need — a thin sheet on a wide door will flex regardless of how good the frame is.' },
            { q: 'Does RG Tech Engineering supply safety doors with frame and lock?', a: 'Yes, doors are supplied as a complete set with welded frame, hinges and provision for your chosen lock. Supplying the door and frame together means the two are aligned in our workshop rather than adjusted on site.' },
            { q: 'How long does RG Tech take to deliver a custom safety door?', a: 'Typically 7 to 12 working days from design approval, covering cutting, frame welding, finishing and coating cure time. Rushing the coating cure is the fastest way to ruin a good door, so we do not compress that stage.' },
            { q: 'Can RG Tech make safety doors to a non-standard opening size?', a: 'Yes, every door is made to measure. RG Tech works from your actual site dimensions, which matters in renovations where openings are rarely truly square — a standard-size door forces packing and shimming that looks poor.' },
            { q: 'Are RG Tech Engineering safety doors weather and termite proof?', a: 'Steel does not rot or attract termites, which is the main advantage over timber. For weather exposure, RG Tech primes and powder coats every door, and recommends galvanised or stainless for balcony and coastal positions.' },
            { q: 'Does RG Tech provide safety door installation in Chennai?', a: 'Yes, RG Tech installs across Chennai and nearby districts, including frame anchoring and alignment. We check the opening before fabrication so the door is built to fit.' },
            { q: 'What designs can RG Tech laser cut into a metal safety door?', a: 'Traditional jali patterns, geometric grids, floral motifs, custom monograms and house numbers. RG Tech adjusts open area so the pattern gives ventilation and light without weakening the panel or compromising security.' },
        ],
        seoParagraph: 'Designer safety doors in Chennai with laser cut patterns for home security.',
        keywords: [
            { text: 'Security Doors', img: 'https://res.cloudinary.com/o1ytbfuz/image/upload/v1785177063/rg-tech/gallery/metal-safety-doors/metal-ms-safety-door-for-resi-20240524162939656' },
            { text: 'Apartment Safety Doors', img: 'https://res.cloudinary.com/o1ytbfuz/image/upload/v1785177063/rg-tech/gallery/metal-safety-doors/mild-steel-hinged-safety-door' },
            { text: 'Laser Cut Door Jali', img: 'https://res.cloudinary.com/o1ytbfuz/image/upload/v1785177064/rg-tech/gallery/metal-safety-doors/safety-door-jali' },
            { text: 'Residential Safety Doors', img: 'https://res.cloudinary.com/o1ytbfuz/image/upload/v1785177062/rg-tech/gallery/metal-safety-doors/image5' },
            { text: 'Main Door Safety Grill', img: 'https://res.cloudinary.com/o1ytbfuz/image/upload/v1785177064/rg-tech/gallery/metal-safety-doors/steel-safety-door' },
            { text: 'Designer Security Doors', img: 'https://res.cloudinary.com/o1ytbfuz/image/upload/v1785177063/rg-tech/gallery/metal-safety-doors/mild-steel-safety-door-500x500' },
            { text: 'Metal Jali Doors', img: 'https://res.cloudinary.com/o1ytbfuz/image/upload/v1785177062/rg-tech/gallery/metal-safety-doors/flowert-safety-door' },
            { text: 'Premium Safety Entry', img: 'https://res.cloudinary.com/o1ytbfuz/image/upload/v1785177063/rg-tech/gallery/metal-safety-doors/product-jpeg' },
            { text: 'Reinforced Metal Doors', img: 'https://res.cloudinary.com/o1ytbfuz/image/upload/v1785177063/rg-tech/gallery/metal-safety-doors/premium-quality-are-made-of-heavy-duty-stainless-steel-safety-doors-144' }
        ]
    },
    {
        name: 'Decorative Metal Panels',
        slug: '/chennai/decorative-metal-panels',
        /* Purpose-shot landing image for this category. Used on the pillar
         * AND every locality page, replacing the rotated gallery pool — one
         * deliberate photograph beats a stock shot that changes per city.
         * landingRatio is the asset's own aspect; the hero renders at it so
         * the composition is never cropped by a fixed 4:3 slot. */
        landingImage: 'https://res.cloudinary.com/o1ytbfuz/image/upload/v1788066515/rg-tech/services/decorative-metal-panels',
        landingRatio: 0.68,
        landingAlt: 'Laser-cut stainless steel Buddha panel with a leaf pattern, mounted as a partition',
        mainIcon: 'Sparkles',
        title: 'Custom Laser Cut Decorative Panels Chennai',
        metaTitle: 'Laser Cut Metal Jali & Decorative Panels Chennai | CNC Art',
        metaDescription: 'Stunning decorative metal panels in Chennai. Laser cut jali for interiors, pooja rooms, partitions, and facades. CNC metal wall art and 3D PVD-coated panels.',
        heroImage: 'https://res.cloudinary.com/o1ytbfuz/image/upload/v1785176986/rg-tech/gallery/decorative-metal-panels/rg-tech-catelog-vol-02_page-0054',
        heroDesc: 'Premium CNC jali and decorative metal panels for modern architecture. Perfect for interiors, partitions, balconies, and exterior facades.',
        secondaryImage: 'https://res.cloudinary.com/o1ytbfuz/image/upload/v1785176986/rg-tech/gallery/decorative-metal-panels/rg-tech-catelog-vol-02_page-0062',
        trustStrip: [
            { icon: 'Sparkles', label: 'Artistic CNC', sub: 'Precision detailing' },
            { icon: 'Layers', label: 'Al, Cu, Brass, SS', sub: 'Premium metals' },
            { icon: 'Target', label: 'Interior Ready', sub: 'Pooja/Partitions' },
            { icon: 'Wind', label: 'Balcony Panels', sub: 'UV/Rust resistant' }
        ],
        whyCards: [
            { icon: 'Target', title: 'Infinite Designs', desc: 'Download from our catalog or bring your own Pinterest designs.' },
            { icon: 'Zap', title: 'Fast Execution', desc: 'Quick turnaround for interior designers and architects.' }
        ],
        capabilityDesc: 'Sophisticated metal art and architectural screening solutions for premium interiors, facade treatments, and space partitioning.',
        capabilitiesList: [
            { label: 'Complexity', value: 'Micro-precision laser carving (±0.02mm)' },
            { label: 'Metal Range', value: 'PVD Coated SS, Mirror Brass, Copper, Aluminum' },
            { label: 'Size Formats', value: 'Continuous panels up to 3000mm length' },
            { label: 'Mounting', value: 'Hidden studs, framing, or standoff systems' }
        ],
        supportedIndustries: [
            { icon: 'Paintbrush', name: 'Interior Design Hubs' },
            { icon: 'Building2', name: 'Architectural Project Sites' },
            { icon: 'Sparkles', name: 'Luxury Hospitality' }
        ],
        processSteps: [
            { step: '01', title: 'Material Selection', desc: 'Choosing base alloy and PVD finish/texture' },
            { step: '02', title: 'Intricate Carving', desc: 'Ultra-precision laser processing for fine motifs' },
            { step: '03', title: 'Surface Treatment', desc: 'Polishing, brushing, or protective clear-coating' },
            { step: '04', title: 'Shadow Mapping', desc: 'Ensuring light-play through pattern verification' }
        ],
        checklist: [
            'Indoor vs Outdoor application (Material choice)',
            'Visual privacy vs Transparency ratio',
            'Installation height and mounting safety',
            'Special finishes (Antique / PVD / Rose Gold)'
        ],
        faqs: [
            { q: 'How much do laser cut jali panels cost per sq ft at RG Tech?', a: 'Jali panel pricing is driven by pattern density more than panel area — a fine, intricate pattern needs many times the cut length of an open one. RG Tech prices from your actual pattern file and panel size, quoted within 24 business hours.' },
            { q: 'What thickness does RG Tech recommend for decorative jali panels?', a: 'For interior screens 1.5 mm to 3 mm is usually right. Exterior facade panels generally need 3 mm or more to stay flat and resist wind load. RG Tech advises on thickness once we see the pattern, span and fixing method.' },
            { q: 'Can RG Tech Engineering cut a custom CAD pattern for facade panels?', a: 'Yes. Send your pattern as DXF, DWG or even a reference image and RG Tech will convert it to a cutting-ready vector. We check that the design has enough connected material to hold together once cut — many decorative patterns do not as drawn.' },
            { q: 'Which materials does RG Tech use for decorative metal screens?', a: 'Mild steel for coated interior and exterior work, stainless steel 304 or 316 where corrosion resistance matters, aluminium where weight is a constraint, and copper or brass for feature pieces. RG Tech matches material to location and budget.' },
            { q: 'Does RG Tech Engineering supply decorative panels ready to install?', a: 'Yes. Panels can be supplied cut only, or fully finished with frames, mounting brackets and fixing points. Specifying the fixing method early matters — it changes the panel edge detail and the frame design.' },
            { q: 'How does RG Tech finish decorative panels for outdoor use?', a: 'Outdoor panels are deburred, primed and powder coated, or supplied in stainless where coating is not wanted. RG Tech will advise where a coating system is genuinely needed and where the material can be left bare.' },
            { q: 'Can RG Tech make large facade panels without visible joins?', a: 'Yes. Our 8000 x 2500 mm bed cuts large panels in a single piece, so a continuous pattern runs unbroken across the facade rather than being interrupted by weld lines — the usual giveaway on panels made from smaller sheets.' },
            { q: 'What lead time does RG Tech Engineering need for decorative panel orders?', a: 'Cut-only panels typically ship in 3 to 5 working days after pattern approval. Panels needing framing and powder coating take 7 to 12 working days, since coating cure time cannot be shortened without hurting durability.' },
        ],
        seoParagraph: 'Custom CNC jali panels and laser cut decorative screens for Chennai interiors.',
        keywords: [
            { text: 'Divine Durga & Spiritual Art', img: 'https://res.cloudinary.com/o1ytbfuz/image/upload/v1785176983/rg-tech/gallery/decorative-metal-panels/rg-tech-catelog-vol-02_page-0004' },
            { text: 'Traditional Deity Designs', img: 'https://res.cloudinary.com/o1ytbfuz/image/upload/v1785176983/rg-tech/gallery/decorative-metal-panels/rg-tech-catelog-vol-02_page-0005' },
            { text: 'Sacred Icon Patterns', img: 'https://res.cloudinary.com/o1ytbfuz/image/upload/v1785176982/rg-tech/gallery/decorative-metal-panels/rg-tech-catelog-vol-02_page-0006' },
            { text: 'Lord Ganesha Wall Art', img: 'https://res.cloudinary.com/o1ytbfuz/image/upload/v1785176983/rg-tech/gallery/decorative-metal-panels/rg-tech-catelog-vol-02_page-0011' },
            { text: 'Spiritual Religious Panels', img: 'https://res.cloudinary.com/o1ytbfuz/image/upload/v1785176983/rg-tech/gallery/decorative-metal-panels/rg-tech-catelog-vol-02_page-0012' },
            { text: 'Vinayagar Designs', img: 'https://res.cloudinary.com/o1ytbfuz/image/upload/v1785176983/rg-tech/gallery/decorative-metal-panels/rg-tech-catelog-vol-02_page-0013' },
            { text: 'Buddha Designs', img: 'https://res.cloudinary.com/o1ytbfuz/image/upload/v1785176983/rg-tech/gallery/decorative-metal-panels/rg-tech-catelog-vol-02_page-0018' },
            { text: 'Perumal Designs', img: 'https://res.cloudinary.com/o1ytbfuz/image/upload/v1785176982/rg-tech/gallery/decorative-metal-panels/rg-tech-catelog-vol-02_page-0019' },
            { text: 'Jesus Designs', img: 'https://res.cloudinary.com/o1ytbfuz/image/upload/v1785176983/rg-tech/gallery/decorative-metal-panels/rg-tech-catelog-vol-02_page-0020' },
            { text: 'Butterfly Patterns', img: 'https://res.cloudinary.com/o1ytbfuz/image/upload/v1785176984/rg-tech/gallery/decorative-metal-panels/rg-tech-catelog-vol-02_page-0025' },
            { text: 'Peacock Patterns', img: 'https://res.cloudinary.com/o1ytbfuz/image/upload/v1785176984/rg-tech/gallery/decorative-metal-panels/rg-tech-catelog-vol-02_page-0026' },
            { text: 'Tree of Life Jali', img: 'https://res.cloudinary.com/o1ytbfuz/image/upload/v1785176984/rg-tech/gallery/decorative-metal-panels/rg-tech-catelog-vol-02_page-0027' },
            { text: 'Balcony Panels', img: 'https://res.cloudinary.com/o1ytbfuz/image/upload/v1785176984/rg-tech/gallery/decorative-metal-panels/rg-tech-catelog-vol-02_page-0032' },
            { text: 'Interior Screens', img: 'https://res.cloudinary.com/o1ytbfuz/image/upload/v1785176984/rg-tech/gallery/decorative-metal-panels/rg-tech-catelog-vol-02_page-0033' },
            { text: 'Facade Panels', img: 'https://res.cloudinary.com/o1ytbfuz/image/upload/v1785176984/rg-tech/gallery/decorative-metal-panels/rg-tech-catelog-vol-02_page-0034' }
        ]
    }
]

export const industries = [
    { icon: 'Settings', name: 'Automotive Vendors', desc: 'Precision parts for vehicle components & assemblies' },
    { icon: 'Factory', name: 'Machine Builders / OEM', desc: 'Custom brackets, housings & structural components' },
    { icon: 'Cpu', name: 'Electrical Panel Mfg.', desc: 'Panel cutouts, bus bar supports & enclosures' },
    { icon: 'Wind', name: 'HVAC & Ducting', desc: 'Duct components, dampers & ventilation parts' },
    { icon: 'Building2', name: 'Construction', desc: 'Structural steel, brackets & embedded elements' },
    { icon: 'Paintbrush', name: 'Interiors / Architectural', desc: 'Decorative screens, railings & artistic metal works' }
]

export const differentiators = [
    { icon: 'CheckCircle', title: 'Quality Checks & Fitment Control', desc: 'Rigorous QC at every stage ensures dimensional accuracy.' },
    { icon: 'Wrench', title: 'Production + Prototype Support', desc: 'From single prototype to full production runs.' },
    { icon: 'FileText', title: 'Drawing Support (DXF/STEP)', desc: 'We help convert sketches to production-ready files.' },
    { icon: 'Layers', title: 'Material Flexibility', desc: 'MS, SS 304/316/430, Aluminum, Copper & Brass.' },
    { icon: 'Sparkles', title: 'Clean Edges & Finishing', desc: 'Burr-free cuts ready for paint, powder coat or weld.' },
    { icon: 'Package', title: 'Reliable Delivery & Packaging', desc: 'Secure packaging and on-time dispatch across Chennai.' }
]

export const processSteps = [
    { step: '01', title: 'Share Requirement', desc: 'Send your drawing (DXF/STEP) with specs', icon: 'FileText' },
    { step: '02', title: 'Quick Quote + DFM', desc: 'Get pricing with manufacturing suggestions', icon: 'Send' },
    { step: '03', title: 'Production', desc: 'Precision cutting and fabrication begins', icon: 'Zap' },
    { step: '04', title: 'QC + Finishing', desc: 'Quality checks and surface treatment', icon: 'Eye' },
    { step: '05', title: 'Dispatch', desc: 'Packed and delivered to your location', icon: 'Truck' }
]

/*
 * Testimonials.
 *
 * `city` powers the "delivering across India" trust strip. `image` is
 * intentionally left null: avatars render as initials until real, permissioned
 * client photographs are supplied. Do not fill these with stock or generated
 * faces — that would present invented people as real customers.
 */
export const testimonials = [
    { name: 'Rajesh Kumar', company: 'KR Fabrications Pvt Ltd', city: 'Coimbatore', state: 'Tamil Nadu', image: null, text: 'RG Tech delivered 200+ laser-cut panels on time with perfect dimensional accuracy. Their DFM suggestions saved us 15% on material costs.', rating: 5 },
    { name: 'Priya Venkatesh', company: 'Archstone Interiors', city: 'Chennai', state: 'Tamil Nadu', image: null, text: 'The decorative jali panels they produced for our hotel lobby project were flawless. Excellent finishing quality and responsive communication.', rating: 5 },
    { name: 'Suresh Babu', company: 'Sai Industrial Solutions', city: 'Hosur', state: 'Tamil Nadu', image: null, text: 'We have been sourcing laser-cut parts from RG Tech for 3 years. Consistent quality, competitive pricing, and reliable delivery every time.', rating: 5 }
]

/*
 * Trust strip shown under the testimonials.
 *
 * Only cities the business actually dispatches to should be listed here. These
 * are presented as "we deliver to", NOT as named customers, so nothing is
 * claimed that the site cannot stand behind.
 */
export const deliveryCities = [
    'Chennai', 'Coimbatore', 'Hosur', 'Bengaluru', 'Hyderabad', 'Pune',
    'Mumbai', 'Ahmedabad', 'Delhi NCR', 'Kolkata', 'Madurai', 'Trichy',
]

export const faqs = [
    { q: 'What files do you accept for laser cutting?', a: 'We accept DXF, STEP, DWG, PDF, and even hand-drawn sketches. Our team can help convert your designs to production-ready files.' },
    { q: 'Do you handle prototype and bulk orders?', a: 'Yes! We support single-piece prototypes through to high-volume production runs with consistent quality.' },
    { q: 'What materials do you work with?', a: 'Mild Steel (up to 45mm), Stainless Steel 304/316/430 (up to 45mm), Aluminum (up to 30mm), Copper and Brass (up to 16mm).' },
    { q: 'Do you provide fabrication after cutting?', a: 'Absolutely. We offer complete fabrication services including bending, welding, grinding, and powder coating.' },
    { q: 'Can I order custom gates/doors with laser patterns?', a: 'Yes, we specialize in custom-designed steel gates, safety doors, and decorative panels with intricate laser-cut patterns.' },
    { q: 'How do I get a quote quickly?', a: 'Share your drawing with material, thickness, and quantity details via our form or WhatsApp. We respond within 24 business hours.' }
]
