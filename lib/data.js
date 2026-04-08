import { 
    Phone, Mail, MapPin, Clock, ChevronDown, ChevronRight, ChevronLeft, 
    ArrowRight, Send, Upload, Star, MessageCircle, Menu, X, Shield, 
    Target, Zap, Wrench, Building2, Paintbrush, Users, Factory, Cpu, 
    Wind, CheckCircle, FileText, Package, Truck, Eye, Settings, 
    DoorOpen, Layers, PanelTop, Scissors, Ruler, Sparkles, Plus, 
    Minus, Home, Download, LayoutDashboard, Languages, FileEdit, 
    Trash2, Globe, Search, Calendar, Tag 
} from 'lucide-react'

export const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbycIMpfSHcJ3gjpZJ-UMDCgFloRFLvZULBMWm5AHSkND0ZJtfa_eZBAMJNraImE_t1d/exec'
export const ADMIN_PASSWORD = 'RGTECH2026'
export const BASE_URL = 'https://www.rgtechengineeringworks.com'
export const DEFAULT_OG_IMAGE = `${BASE_URL}/gallery/Sheet%20Metal%20Laser%20Cutting/sm_12.jpg`

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
        '/gallery/Laser%20Cutting%20Services/kw_fiber_hd.png',
        '/gallery/Laser%20Cutting%20Services/kw_cnc_machine_hd.png',
        '/gallery/Laser%20Cutting%20Services/kw_aluminum_hd.png',
        '/gallery/Laser%20Cutting%20Services/RG-Tech-Catelog-Vol-01_page_10.jpg'
    ],
    'sheet-metal-laser-cutting-services': [
        '/gallery/Sheet%20Metal%20Laser%20Cutting/sm_01.jpg',
        '/gallery/Sheet%20Metal%20Laser%20Cutting/sm_02.jpg',
        '/gallery/Sheet%20Metal%20Laser%20Cutting/sm_03.jpg',
        '/gallery/Sheet%20Metal%20Laser%20Cutting/sm_12.jpg'
    ],
    'fabrication-services': [
        '/gallery/Fabrication%20Services/RG-Tech-Catelog-vol-4_page-0016.jpg',
        '/gallery/Fabrication%20Services/RG-Tech-Catelog-vol-4_page-0018.jpg',
        '/gallery/Fabrication%20Services/RG-Tech-Catelog-vol-4_page-0008.jpg',
        '/gallery/Fabrication%20Services/RG-Tech-Catelog-vol-4_page-0010.jpg'
    ],
    'steel-gates': [
        '/gallery/Steel%20Gates/RG-Tech-Catelog-vol-4_page-0120.jpg',
        '/gallery/Steel%20Gates/RG-Tech-Catelog-vol-4_page-0125.jpg',
        '/gallery/Steel%20Gates/RG-Tech-Catelog-vol-4_page-0129.jpg',
        '/gallery/Steel%20Gates/RG-Tech-Catelog-vol-4_page-0135.jpg'
    ],
    'metal-safety-doors': [
        '/gallery/Metal%20Safety%20Doors/premium-quality-are-made-of-heavy-duty-stainless-steel-safety-doors--144.jpg',
        '/gallery/Metal%20Safety%20Doors/mild-steel-hinged-safety-door.jpg',
        '/gallery/Metal%20Safety%20Doors/7x3-5-feet-18-3-kilograms-paint-coated-mild-steel-safety-doors-466.jpg',
        '/gallery/Metal%20Safety%20Doors/1-13.jpg'
    ],
    'decorative-metal-panels': [
        '/gallery/Decorative%20Metal%20Panels/RG-Tech-Catelog-Vol-02_page-0054.jpg',
        '/gallery/Decorative%20Metal%20Panels/RG-Tech-Catelog-Vol-02_page-0062.jpg',
        '/gallery/Decorative%20Metal%20Panels/RG-Tech-Catelog-Vol-02_page-0004.jpg',
        '/gallery/Decorative%20Metal%20Panels/RG-Tech-Catelog-Vol-02_page-0011.jpg'
    ]
}

export const catalogues = [
    { name: 'RG Tech Catalogue Vol-01', file: '/catalogues/RG-Tech-Catelog-Vol-01.pdf', size: '28 MB' },
    { name: 'RG Tech Catalogue Vol-02', file: '/catalogues/RG-Tech-Catelog-Vol-02.pdf', size: '36 MB' },
    { name: 'RG Tech Catalogue Vol-03', file: '/catalogues/RG_Tech-Vol.03.pdf', size: '4 MB' },
    { name: 'RG Tech Catalogue Vol-04', file: '/catalogues/RG-Tech-Catelog-vol-4.pdf', size: '35 MB' }
]

export const pillarServices = [
    {
        name: 'Laser Cutting Services',
        slug: '/chennai/laser-cutting-services',
        mainIcon: 'Scissors',
        title: 'Precision Laser Cutting Services in Chennai',
        metaTitle: 'Precision CNC Fiber Laser Cutting Services Chennai | RG Tech',
        metaDescription: 'Looking for laser cutting in Chennai? RG Tech offers high-precision CNC fiber laser cutting for MS, SS, and Aluminum. Reliable industrial job work with fast delivery.',
        heroImage: '/gallery/Laser%20Cutting%20Services/lc_01.jpg',
        heroDesc: 'High-precision industrial laser cutting in Chennai. We deliver +/- 0.1mm accuracy for MS, SS, and Aluminum parts with the latest fiber technology.',
        secondaryImage: '/gallery/Laser%20Cutting%20Services/lc_12.jpg',
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
            { q: 'What is the advantage of your large-bed laser?', a: 'Our 8m bed allows us to cut large structural frames and long plates without joins, maintaining strength and accuracy.' },
            { q: 'Can you cut reflective materials like Copper?', a: 'Yes, our modern fiber lasers are equipped with back-reflection protection specifically for Copper and Brass.' },
            { q: 'What is your typical turnaround for bulk jobs?', a: 'Most bulk laser jobs are dispatched within 48-72 hours depending on volume.' },
            { q: 'Do you offer nesting services?', a: 'Yes, we include CAD nesting to ensure you get the maximum parts out of every sheet.' },
            { q: 'What file formats do you accept?', a: 'We prefer DXF or DWG files for direct laser processing, but can also work with PDF or sketches for design support.' },
            { q: 'Do you provide material or should I supply it?', a: 'We offer both options—complete material sourcing or labor-only job work using your supplied sheets.' },
            { q: 'What is the maximum thickness you can cut?', a: 'We handle mild steel up to 45mm and stainless steel up to 40mm with high-precision fiber technology.' },
            { q: 'Is laser cutting better than plasma?', a: 'For industrial parts, laser offers much tighter tolerances, cleaner edges, and a smaller heat-affected zone than plasma.' }
        ],
        seoParagraph: 'If you\'re searching for <strong class="text-[#2C3E50]">laser cutting services in Chennai</strong> for repeat industrial parts, choosing the right process — <strong class="text-[#2C3E50]">CNC laser cutting</strong> or <strong class="text-[#2C3E50]">fiber laser cutting</strong> — directly impacts edge quality, accuracy, and overall fabrication cost. At RG Tech Engineering Works, we support engineering customers with stable cutting, nesting efficiency, and production-friendly documentation so parts fit right the first time.',
        keywords: [
            { text: 'CNC Laser Cutting', img: '/gallery/Laser%20Cutting%20Services/lc_01.jpg' },
            { text: 'Fiber Laser Cutting', img: '/gallery/Laser%20Cutting%20Services/lc_02.jpg' },
            { text: 'MS Laser Cutting', img: '/gallery/Laser%20Cutting%20Services/lc_03.jpg' },
            { text: 'SS Laser Cutting', img: '/gallery/Laser%20Cutting%20Services/lc_04.jpg' },
            { text: 'Aluminum Laser Cutting', img: '/gallery/Laser%20Cutting%20Services/lc_05.jpg' },
            { text: 'Brass Laser Cutting', img: '/gallery/Laser%20Cutting%20Services/lc_06.jpg' },
            { text: 'Copper Laser Cutting', img: '/gallery/Laser%20Cutting%20Services/lc_07.jpg' },
            { text: 'Precision Metal Cutting', img: '/gallery/Laser%20Cutting%20Services/lc_08.jpg' },
            { text: 'Industrial Parts', img: '/gallery/Laser%20Cutting%20Services/lc_09.jpg' },
            { text: 'CNC Cutting', img: '/gallery/Laser%20Cutting%20Services/lc_10.jpg' }
        ]
    },
    {
        name: 'Sheet Metal Laser Cutting',
        slug: '/chennai/sheet-metal-laser-cutting-services',
        mainIcon: 'PanelTop',
        title: 'Industrial Sheet Metal Laser Cutting Chennai',
        metaTitle: 'Sheet Metal Laser Cutting Services Chennai | MS & SS Processing',
        metaDescription: 'Expert sheet metal laser cutting services in Chennai. We handle thick plates (up to 45mm), MS sheet cutting, and precision SS processing for industrial OEMs.',
        heroImage: '/gallery/Sheet%20Metal%20Laser%20Cutting/sm_12.jpg',
        heroDesc: 'High-volume sheet metal laser cutting for MS, SS, and Aluminum plates. We handle everything from thin sheets to heavy industrial plates up to 45mm.',
        secondaryImage: '/gallery/Sheet%20Metal%20Laser%20Cutting/sm_06.jpg',
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
            { q: 'What is the max thickness for MS sheet cutting?', a: 'Our high-power fiber laser can cut Mild Steel plates up to 45mm thickness.' },
            { q: 'How do you ensure sheet material yield?', a: 'We use advanced nesting software to minimize scrap and maximize parts per sheet.' },
            { q: 'Can you cut perforated patterns in thin sheets?', a: 'Yes, our lasers handle intricate patterns in thin sheets (0.5mm+) with zero warping.' },
            { q: 'Do you provide deburring services?', a: 'Yes, we provide mechanical deburring to ensure smooth, safe edges for handling.' },
            { q: 'Can you cut SS316 grade sheets?', a: 'Yes, we cut all SS grades including 304, 316, and 430 with high precision.' },
            { q: 'Is there a minimum order value?', a: 'We cater to all order sizes, from small job work to steady OEM supply.' },
            { q: 'Do you offer transport for heavy plates?', a: 'We can arrange local transport across Chennai for bulk and heavy plate orders.' },
            { q: 'What is your bed capacity for large sheets?', a: 'We have machines with bed sizes up to 8 meters (8000mm x 2500mm).' }
        ],
        seoParagraph: 'For <strong class="text-[#2C3E50]">sheet metal laser cutting in Chennai</strong>, especially for thick plates and high-volume orders, our advanced fiber laser technology ensures superior edge quality and minimal material waste. We cater to a wide range of industrial applications, providing precise <strong class="text-[#2C3E50]">MS sheet cutting</strong> and <strong class="text-[#2C3E50]">SS precision processing</strong> for various sectors.',
        keywords: [
            { text: 'Sheet Metal Cutting', img: '/gallery/Sheet%20Metal%20Laser%20Cutting/sm_01.jpg' },
            { text: 'Plate Cutting', img: '/gallery/Sheet%20Metal%20Laser%20Cutting/sm_02.jpg' },
            { text: 'Thick Plate Cutting', img: '/gallery/Sheet%20Metal%20Laser%20Cutting/sm_03.jpg' },
            { text: 'CRCA Sheet Cutting', img: '/gallery/Sheet%20Metal%20Laser%20Cutting/sm_04.jpg' },
            { text: 'GI Sheet Cutting', img: '/gallery/Sheet%20Metal%20Laser%20Cutting/sm_05.jpg' },
            { text: 'Industrial Sheet Processing', img: '/gallery/Sheet%20Metal%20Laser%20Cutting/sm_06.jpg' },
            { text: 'CNC Fiber Laser Sheet Cutting', img: '/gallery/Sheet%20Metal%20Laser%20Cutting/sm_07.jpg' },
            { text: 'MS Plate Cutting', img: '/gallery/Sheet%20Metal%20Laser%20Cutting/sm_08.jpg' },
            { text: 'SS Sheet Cutting', img: '/gallery/Sheet%20Metal%20Laser%20Cutting/sm_09.jpg' },
            { text: 'Precision Sheet Metal', img: '/gallery/Sheet%20Metal%20Laser%20Cutting/sm_10.jpg' }
        ]
    },
    {
        name: 'Fabrication Services',
        slug: '/chennai/fabrication-services',
        mainIcon: 'Wrench',
        title: 'Metal Fabrication & Job Work in Chennai',
        metaTitle: 'Best Metal Fabrication Services Chennai | Sheet Metal & SS',
        metaDescription: 'Looking for professional metal fabrication in Chennai? We offer precision bending, TIG/MIG welding, and complete assembly for industrial and pharma projects.',
        heroImage: '/gallery/Fabrication%20Services/RG-Tech-Catelog-vol-4_page-0016.jpg',
        heroDesc: 'Comprehensive industrial fabrication in Chennai. From precise laser cutting to specialized bending and high-strength welding, we handle the full production cycle.',
        secondaryImage: '/gallery/Fabrication%20Services/RG-Tech-Catelog-vol-4_page-0018.jpg',
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
            { q: 'Can you handle SS316 fabrication?', a: 'Yes, we have specialized setups and consumables for SS316 to prevent cross-contamination.' },
            { q: 'Do you provide leak-tested welding?', a: 'Yes, we perform DP (Dye Penetrant) testing for enclosures requiring air/water tightness.' },
            { q: 'What is your maximum bending thickness?', a: 'We can bend up to 12mm MS over 3 meters, and thicker plates over shorter lengths.' },
            { q: 'Do you offer post-weld grinding and polishing?', a: 'Absolutely. We provide industrial finishes ranging from rough grinding to high-gloss mirror polishing for SS.' },
            { q: 'Can you fabricate based on physical samples?', a: 'Yes, our engineering team can reverse-engineer your physical part to create production drawings.' },
            { q: 'Do you support prototype development?', a: 'We specialize in bridging the gap between design and production with rapid prototyping for new components.' },
            { q: 'What type of welding machines do you use?', a: 'We use premium inverter-based TIG, MIG, and Spot welding machines for consistent joint strength.' },
            { q: 'Can you handle large-volume structural fabrication?', a: 'Yes, our shop floor is equipped for heavy structural work including frames, skids, and large brackets.' }
        ],
        seoParagraph: 'Professional fabrication services in Chennai for industrial and architectural needs.',
        keywords: [
            { text: 'Metal Fabrication', img: '/gallery/Fabrication%20Services/RG-Tech-Catelog-vol-4_page-0008.jpg' },
            { text: 'Industrial Fabrication Services', img: '/gallery/Fabrication%20Services/RG-Tech-Catelog-vol-4_page-0009.jpg' },
            { text: 'Welded Assemblies', img: '/gallery/Fabrication%20Services/RG-Tech-Catelog-vol-4_page-0010.jpg' },
            { text: 'CNC Bending', img: '/gallery/Fabrication%20Services/RG-Tech-Catelog-vol-4_page-0011.jpg' },
            { text: 'Folding', img: '/gallery/Fabrication%20Services/RG-Tech-Catelog-vol-4_page-0012.jpg' },
            { text: 'TIG/MIG Welding', img: '/gallery/Fabrication%20Services/RG-Tech-Catelog-vol-4_page-0013.jpg' },
            { text: 'Structural Fabrication', img: '/gallery/Fabrication%20Services/RG-Tech-Catelog-vol-4_page-0015.jpg' },
            { text: 'Machine Enclosures', img: '/gallery/Fabrication%20Services/RG-Tech-Catelog-vol-4_page-0016.jpg' },
            { text: 'Custom Steel Fabrication', img: '/gallery/Fabrication%20Services/RG-Tech-Catelog-vol-4_page-0017.jpg' },
            { text: 'Production Weldment', img: '/gallery/Fabrication%20Services/RG-Tech-Catelog-vol-4_page-0018.jpg' }
        ]
    },
    {
        name: 'Steel Gates',
        slug: '/chennai/steel-gates',
        mainIcon: 'Home',
        title: 'Designer Laser Cut Steel Gates Chennai',
        metaTitle: 'Laser Cut Steel Gates Chennai | Designer Main Gate Fabricators',
        metaDescription: 'Custom designer main gates in Chennai. Laser cut gate patterns in MS and Stainless Steel. Modern entrances for villas and factories with durable PU finishes.',
        heroImage: '/gallery/Steel%20Gates/RG-Tech-Catelog-vol-4_page-0129.jpg',
        heroDesc: 'Elevate your property with custom laser-cut steel gates. Combining modern aesthetics with industrial-grade security, our gates are built to last.',
        secondaryImage: '/gallery/Steel%20Gates/RG-Tech-Catelog-vol-4_page-0135.jpg',
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
            { q: 'Do you provide the motor for sliding gates?', a: 'Yes, we can integrate high-quality Italian or local motors with remote access.' },
            { q: 'Will the gate rust in coastal Chennai?', a: 'We recommend SS304 or Sand-blasted MS with PU coating for coastal regions to prevent rust.' },
            { q: 'Can you cut my custom CAD pattern?', a: 'Absolutely. We specialize in custom architectural designs beyond our standard catalog.' },
            { q: 'How long does site installation take?', a: 'Typically 1–2 days once the gate is fabricated and transported to your site.' },
            { q: 'Do you offer bi-folding gates for narrow spaces?', a: 'Yes, we design specialized bi-folding laser-cut gates that require minimal parking space.' },
            { q: 'What maintenance is required for automated gates?', a: 'Basic cleaning and periodic lubrication of the track/hinges ensure years of smooth operation.' },
            { q: 'Can the gate be integrated with home automation?', a: 'Our motors are compatible with most smart home systems for mobile-app control.' },
            { q: 'What is the standard thickness for gate panels?', a: 'We use 3mm to 6mm plates depending on the design complexity and security needs.' }
        ],
        seoParagraph: 'Modern laser cut gate designs in Chennai for residential and commercial properties.',
        keywords: [
            { text: 'Laser Cut Gates', img: '/gallery/Steel%20Gates/RG-Tech-Catelog-vol-4_page-0120.jpg' },
            { text: 'Designer Steel Gates', img: '/gallery/Steel%20Gates/RG-Tech-Catelog-vol-4_page-0121.jpg' },
            { text: 'Modern Entrance Gates', img: '/gallery/Steel%20Gates/RG-Tech-Catelog-vol-4_page-0122.jpg' },
            { text: 'Sliding Gates', img: '/gallery/Steel%20Gates/RG-Tech-Catelog-vol-4_page-0123.jpg' },
            { text: 'Automated Gates', img: '/gallery/Steel%20Gates/RG-Tech-Catelog-vol-4_page-0124.jpg' },
            { text: 'Front Gate Designs', img: '/gallery/Steel%20Gates/RG-Tech-Catelog-vol-4_page-0125.jpg' },
            { text: 'MS Gate Fabrication', img: '/gallery/Steel%20Gates/RG-Tech-Catelog-vol-4_page-0126.jpg' },
            { text: 'SS Gate Designs', img: '/gallery/Steel%20Gates/RG-Tech-Catelog-vol-4_page-0127.jpg' },
            { text: 'Villa Gates', img: '/gallery/Steel%20Gates/RG-Tech-Catelog-vol-4_page-0128.jpg' },
            { text: 'Architectural Gates', img: '/gallery/Steel%20Gates/RG-Tech-Catelog-vol-4_page-0129.jpg' }
        ]
    },
    {
        name: 'Metal Safety Doors',
        slug: '/chennai/metal-safety-doors',
        mainIcon: 'DoorOpen',
        title: 'Premium Metal Safety Doors in Chennai',
        metaTitle: 'Designer Metal Safety Doors Chennai | Laser Cut Security Doors',
        metaDescription: 'Best metal safety doors in Chennai. Secure your home with aesthetic laser-cut security doors. Custom multi-lock prep in MS and SS for residential use.',
        heroImage: '/gallery/Metal%20Safety%20Doors/premium-quality-are-made-of-heavy-duty-stainless-steel-safety-doors--144.jpg',
        heroDesc: 'Uncompromising security meets stunning design. Our laser-cut metal safety doors provide industrial-grade protection with a premium look.',
        secondaryImage: '/gallery/Metal%20Safety%20Doors/mild-steel-hinged-safety-door.jpg',
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
            { q: 'Is it possible to integrate a mosquito mesh?', a: 'Yes, we provide a dual-layer door system with a secondary mesh frame behind the laser-cut panel.' },
            { q: 'Can I use a smart digital lock on your safety doors?', a: 'Certainly. We can laser-cut the lock pocket specifically to the dimensions of any major digital lock brand.' },
            { q: 'Do you offer wood-finish textures?', a: 'Yes, we can powder-coat the steel with realistic wood-grain textures to match your main door.' },
            { q: 'What is the security rating of your doors?', a: 'We use reinforced steel Z-sections and 4mm+ plates, making them highly resistant to forced entry.' },
            { q: 'Are these doors suitable for apartment entrances?', a: 'Definitely. They are designed to fit perfectly within the standard 4ft x 7ft or 3.5ft x 7ft apartment frames.' },
            { q: 'Does the door come with a warranty?', a: 'We provide a 1-year manufacturing warranty on the structure and high-quality coating.' },
            { q: 'How do you handle site measurements?', a: 'Our technician visits your home to take precision laser measurements before we start fabrication.' },
            { q: 'Can I customize the jali design?', a: 'Yes, you can choose from our residential catalog or provide your own reference design.' }
        ],
        seoParagraph: 'Designer safety doors in Chennai with laser cut patterns for home security.',
        keywords: [
            { text: 'Security Doors', img: '/gallery/Metal%20Safety%20Doors/metal-ms-safety-door-for-resi-20240524162939656.jpg' },
            { text: 'Apartment Safety Doors', img: '/gallery/Metal%20Safety%20Doors/mild-steel-hinged-safety-door.jpg' },
            { text: 'Laser Cut Door Jali', img: '/gallery/Metal%20Safety%20Doors/safety-door-jali.jpg' },
            { text: 'Residential Safety Doors', img: '/gallery/Metal%20Safety%20Doors/image5.jpg' },
            { text: 'Main Door Safety Grill', img: '/gallery/Metal%20Safety%20Doors/steel-safety-door.jpg' },
            { text: 'Designer Security Doors', img: '/gallery/Metal%20Safety%20Doors/mild-steel-safety-door-500x500.webp' },
            { text: 'Metal Jali Doors', img: '/gallery/Metal%20Safety%20Doors/flowert-safety-door.webp' },
            { text: 'Premium Safety Entry', img: '/gallery/Metal%20Safety%20Doors/product-jpeg.jpg' },
            { text: 'Reinforced Metal Doors', img: '/gallery/Metal%20Safety%20Doors/premium-quality-are-made-of-heavy-duty-stainless-steel-safety-doors--144.jpg' }
        ]
    },
    {
        name: 'Decorative Metal Panels',
        slug: '/chennai/decorative-metal-panels',
        mainIcon: 'Sparkles',
        title: 'Custom Laser Cut Decorative Panels Chennai',
        metaTitle: 'Laser Cut Metal Jali & Decorative Panels Chennai | CNC Art',
        metaDescription: 'Stunning decorative metal panels in Chennai. Laser cut jali for interiors, pooja rooms, partitions, and facades. CNC metal wall art and 3D PVD-coated panels.',
        heroImage: '/gallery/Decorative%20Metal%20Panels/RG-Tech-Catelog-Vol-02_page-0054.jpg',
        heroDesc: 'Premium CNC jali and decorative metal panels for modern architecture. Perfect for interiors, partitions, balconies, and exterior facades.',
        secondaryImage: '/gallery/Decorative%20Metal%20Panels/RG-Tech-Catelog-Vol-02_page-0062.jpg',
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
            { q: 'Are your brass panels actual brass or coated?', a: 'We provide both solid brass sheets and PVD-coated stainless steel which offers better durability and cost efficiency.' },
            { q: 'Can you create 3D effects with metal?', a: 'By layering different laser-cut patterns and using standoffs, we can create stunning depth and 3D shadow effects.' },
            { q: 'Can these panels be used for balcony railings?', a: 'Yes, we use thicker 5mm-8mm sheets for railings to ensure structural safety and BCA compliance.' },
            { icon: 'Zap', q: 'What is PVD coating?', a: 'Physical Vapor Deposition is a high-end finish that provides vibrant gold, rose-gold, or black colors with extreme scratch resistance.' },
            { q: 'Can you cut very intricate pooja room designs?', a: 'Yes, our precision lasers can handle extremely fine motifs, ideal for religious and spiritual patterns.' },
            { q: 'Do you offer backlit panel solutions?', a: 'We can provide the metal casing and acrylic diffusers, ready for your electrician to install LED strips.' },
            { q: 'How do I clean decorative metal panels?', a: 'A simple wipe with a soft microfiber cloth is enough to maintain the sheen of our coated panels.' },
            { q: 'What is the maximum size for a single panel?', a: 'We can cut single continuous panels up to 3 meters (10 feet) in height/length.' }
        ],
        seoParagraph: 'Custom CNC jali panels and laser cut decorative screens for Chennai interiors.',
        keywords: [
            { text: 'Divine Durga & Spiritual Art', img: '/gallery/Decorative%20Metal%20Panels/RG-Tech-Catelog-Vol-02_page-0004.jpg' },
            { text: 'Traditional Deity Designs', img: '/gallery/Decorative%20Metal%20Panels/RG-Tech-Catelog-Vol-02_page-0005.jpg' },
            { text: 'Sacred Icon Patterns', img: '/gallery/Decorative%20Metal%20Panels/RG-Tech-Catelog-Vol-02_page-0006.jpg' },
            { text: 'Lord Ganesha Wall Art', img: '/gallery/Decorative%20Metal%20Panels/RG-Tech-Catelog-Vol-02_page-0011.jpg' },
            { text: 'Spiritual Religious Panels', img: '/gallery/Decorative%20Metal%20Panels/RG-Tech-Catelog-Vol-02_page-0012.jpg' },
            { text: 'Vinayagar Designs', img: '/gallery/Decorative%20Metal%20Panels/RG-Tech-Catelog-Vol-02_page-0013.jpg' },
            { text: 'Buddha Designs', img: '/gallery/Decorative%20Metal%20Panels/RG-Tech-Catelog-Vol-02_page-0018.jpg' },
            { text: 'Perumal Designs', img: '/gallery/Decorative%20Metal%20Panels/RG-Tech-Catelog-Vol-02_page-0019.jpg' },
            { text: 'Jesus Designs', img: '/gallery/Decorative%20Metal%20Panels/RG-Tech-Catelog-Vol-02_page-0020.jpg' },
            { text: 'Butterfly Patterns', img: '/gallery/Decorative%20Metal%20Panels/RG-Tech-Catelog-Vol-02_page-0025.jpg' },
            { text: 'Peacock Patterns', img: '/gallery/Decorative%20Metal%20Panels/RG-Tech-Catelog-Vol-02_page-0026.jpg' },
            { text: 'Tree of Life Jali', img: '/gallery/Decorative%20Metal%20Panels/RG-Tech-Catelog-Vol-02_page-0027.jpg' },
            { text: 'Balcony Panels', img: '/gallery/Decorative%20Metal%20Panels/RG-Tech-Catelog-Vol-02_page-0032.jpg' },
            { text: 'Interior Screens', img: '/gallery/Decorative%20Metal%20Panels/RG-Tech-Catelog-Vol-02_page-0033.jpg' },
            { text: 'Facade Panels', img: '/gallery/Decorative%20Metal%20Panels/RG-Tech-Catelog-Vol-02_page-0034.jpg' }
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

export const testimonials = [
    { name: 'Rajesh Kumar', company: 'KR Fabrications Pvt Ltd', text: 'RG Tech delivered 200+ laser-cut panels on time with perfect dimensional accuracy. Their DFM suggestions saved us 15% on material costs.', rating: 5 },
    { name: 'Priya Venkatesh', company: 'Archstone Interiors', text: 'The decorative jali panels they produced for our hotel lobby project were flawless. Excellent finishing quality and responsive communication.', rating: 5 },
    { name: 'Suresh Babu', company: 'Sai Industrial Solutions', text: 'We have been sourcing laser-cut parts from RG Tech for 3 years. Consistent quality, competitive pricing, and reliable delivery every time.', rating: 5 }
]

export const faqs = [
    { q: 'What files do you accept for laser cutting?', a: 'We accept DXF, STEP, DWG, PDF, and even hand-drawn sketches. Our team can help convert your designs to production-ready files.' },
    { q: 'Do you handle prototype and bulk orders?', a: 'Yes! We support single-piece prototypes through to high-volume production runs with consistent quality.' },
    { q: 'What materials do you work with?', a: 'Mild Steel (up to 45mm), Stainless Steel 304/316/430 (up to 45mm), Aluminum (up to 30mm), Copper and Brass (up to 16mm).' },
    { q: 'Do you provide fabrication after cutting?', a: 'Absolutely. We offer complete fabrication services including bending, welding, grinding, and powder coating.' },
    { q: 'Can I order custom gates/doors with laser patterns?', a: 'Yes, we specialize in custom-designed steel gates, safety doors, and decorative panels with intricate laser-cut patterns.' },
    { q: 'How do I get a quote quickly?', a: 'Share your drawing with material, thickness, and quantity details via our form or WhatsApp. We respond within 24 business hours.' }
]
