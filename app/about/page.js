import Link from 'next/link'
import {
    ArrowRight, MessageCircle, Phone, Mail, MapPin, Clock,
    Target, Layers, Ruler, Truck, ShieldCheck, Factory,
} from 'lucide-react'
import { organizationSchema, jsonLdGraph, jsonLdScript } from '@/lib/schema'
import { BASE_URL } from '@/lib/data'
import GoogleBusinessCard from '@/components/GoogleBusinessCard'

/*
 * About page.
 *
 * Company facts here are the ones the business publishes on its own printed
 * collateral (GSTIN, proprietor, machine bed sizes, per-material cutting
 * limits). Contact details deliberately match lib/schema.js rather than the
 * printed flyer — the flyer lists rgtechlaser.com and a gmail address, and the
 * site has always used this domain and admin@. Two published addresses for one
 * business is exactly what confuses customers and structured-data validators,
 * so one source of truth wins.
 */

export const metadata = {
    title: 'About RG Tech Engineering Works | CNC Laser Cutting Chennai',
    description:
        'RG Tech Engineering Works is a CNC fiber laser cutting and metal fabrication unit in Ayanambakkam, Chennai. Cutting MS, SS and aluminium up to 45mm on 8000x2500mm and 3000x1500mm beds.',
    alternates: { canonical: '/about' },
    openGraph: {
        title: 'About RG Tech Engineering Works',
        description:
            'CNC fiber laser cutting and metal fabrication in Chennai. Precision job work, bulk orders and on-time delivery.',
        url: `${BASE_URL}/about`,
        images: [
            {
                url: '/og?title=About+RG+Tech+Engineering&sub=CNC+Fiber+Laser+Cutting+%E2%80%94+Chennai',
                width: 1200,
                height: 630,
                alt: 'About RG Tech Engineering Works',
            },
        ],
    },
}

/* Cutting limits by material, as published on the company's own spec sheet. */
const MATERIALS = [
    { material: 'Mild Steel (MS)', limit: '45 mm' },
    { material: 'Stainless Steel', limit: '45 mm' },
    { material: 'SS 304', limit: '45 mm' },
    { material: 'SS 316', limit: '45 mm' },
    { material: 'SS 430', limit: '45 mm' },
    { material: 'Aluminium', limit: '30 mm' },
    { material: 'Copper', limit: '16 mm' },
    { material: 'Brass', limit: '16 mm' },
]

const CAPABILITIES = [
    {
        Icon: Target,
        title: 'CNC Fiber Laser Cutting',
        body: 'Profile cutting to ±0.01 mm on sheet and plate, with clean edges that need no secondary finishing.',
    },
    {
        Icon: Layers,
        title: 'Sheet Metal Cutting',
        body: 'Production runs and one-off prototypes from your DXF, DWG, STEP or PDF — or a hand sketch we convert.',
    },
    {
        Icon: Factory,
        title: 'Jali & Design Cutting',
        body: 'Decorative screens, temple panels, partitions and architectural jali work cut from your artwork or ours.',
    },
    {
        Icon: Ruler,
        title: 'Metal Fabrication',
        body: 'Steel gates, safety doors and fabricated assemblies, finished and delivered across Tamil Nadu.',
    },
]

const PRINCIPLES = [
    { Icon: Target, title: 'High Precision', body: 'Tolerances held to ±0.01 mm, verified before dispatch.' },
    { Icon: Factory, title: 'Modern Machines', body: 'Fiber laser sources on two beds, the larger at 8000 x 2500 mm.' },
    { Icon: ShieldCheck, title: 'Clean Cutting', body: 'Dross-free edges, so parts go straight to assembly.' },
    { Icon: Truck, title: 'On-time Delivery', body: 'Committed dates, with dispatch across India.' },
]

export default function AboutPage() {
    const graph = jsonLdGraph(organizationSchema, {
        '@type': 'AboutPage',
        '@id': `${BASE_URL}/about#webpage`,
        url: `${BASE_URL}/about`,
        name: 'About RG Tech Engineering Works',
        description:
            'CNC fiber laser cutting and metal fabrication in Ayanambakkam, Chennai.',
        about: { '@id': `${BASE_URL}/#organization` },
    })

    return (
        <div className="bg-white">
            <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(graph)} />

            {/* Hero */}
            <section className="hero-gradient py-16 md:py-24 relative overflow-hidden">
                <div className="hero-grid-paper" aria-hidden="true" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center">
                    <p className="eyebrow mb-4">About Us</p>
                    <h1 className="display-title text-fg mb-6 text-balance">
                        Precision in Every Cut,{' '}
                        <span className="text-accent">Quality in Every Detail</span>
                    </h1>
                    <p className="section-lead max-w-2xl mx-auto">
                        RG Tech Engineering Works is a CNC fiber laser cutting and metal fabrication
                        unit in Ayanambakkam, Chennai — cutting, forming and finishing metal for
                        fabricators, OEMs, architects and homeowners across Tamil Nadu.
                    </p>
                </div>
            </section>

            {/* Who we are */}
            <section className="py-20 md:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                    <div>
                        <p className="eyebrow mb-3">Who We Are</p>
                        <h2 className="section-title text-fg mb-6">
                            A job-work shop built around <span className="text-accent">one machine done properly</span>
                        </h2>
                        <div className="space-y-5 text-fg-muted text-base leading-relaxed">
                            <p>
                                We cut ideas and shape them into finished metal. Most of what leaves the
                                floor is job work — a customer sends a drawing, a material and a
                                quantity, and gets back parts that fit the first time.
                            </p>
                            <p>
                                That covers a wide range: a single prototype bracket, a production run of
                                sheet metal panels, a laser-cut jali screen for a temple or a villa
                                elevation, a steel gate, or a batch of name plates. The common thread is
                                the tolerance we hold and the date we commit to.
                            </p>
                            <p>
                                We quote from your file rather than a rate card, because a 2 mm mild
                                steel part and a 25 mm plate take very different machine time. Send a
                                DXF with material and quantity and you get an itemised quote within 24
                                business hours.
                            </p>
                        </div>
                    </div>

                    {/* Registered particulars */}
                    <div className="bg-surface-2 rounded-[1.5rem] border border-line p-6 sm:p-8">
                        <p className="eyebrow mb-5">Registered Particulars</p>
                        <dl className="divide-y divide-line">
                            {[
                                ['Legal name', 'RG Tech Engineering Works'],
                                ['Proprietor', 'Surya Narayanan Gopikrishnan'],
                                ['GSTIN', '33HGZPS9605D1ZP'],
                                ['Business', 'CNC fiber laser cutting & metal fabrication'],
                                ['Location', 'Ayanambakkam, Chennai — 600095'],
                                ['Working hours', 'Monday to Saturday, 09:00 – 19:00'],
                            ].map(([term, value]) => (
                                <div key={term} className="py-3.5 grid sm:grid-cols-[9rem_1fr] gap-1 sm:gap-4">
                                    <dt className="meta-label text-fg-subtle sm:pt-0.5">{term}</dt>
                                    <dd className="text-sm font-semibold text-fg">{value}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            </section>

            {/* What we do */}
            <section className="py-20 md:py-24 bg-surface-2">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="text-center mb-12">
                        <p className="eyebrow mb-3">What We Do</p>
                        <h2 className="section-title text-fg">
                            Four things, <span className="text-accent">done well</span>
                        </h2>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {CAPABILITIES.map(({ Icon, title, body }) => (
                            <div key={title} className="bg-white rounded-2xl border border-line p-6 sm:p-8">
                                <span className="w-12 h-12 rounded-xl bg-cta/10 flex items-center justify-center mb-6">
                                    <Icon className="w-6 h-6 text-accent" />
                                </span>
                                <h3 className="card-title text-fg mb-3">{title}</h3>
                                <p className="text-sm text-fg-muted leading-relaxed">{body}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Machine capacity */}
            <section className="py-20 md:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                    <div>
                        <p className="eyebrow mb-3">Capacity</p>
                        <h2 className="section-title text-fg mb-6">
                            What we can <span className="text-accent">cut</span>
                        </h2>
                        <p className="section-lead mb-8">
                            Two beds cover everything from small brackets to full-sheet architectural
                            panels without splitting a job across setups.
                        </p>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {['8000 x 2500 mm', '3000 x 1500 mm'].map((size, i) => (
                                <div key={size} className="rounded-2xl border border-line bg-surface-2 p-6">
                                    <p className="meta-label text-fg-subtle mb-2">
                                        {i === 0 ? 'Large bed' : 'Second bed'}
                                    </p>
                                    <p className="subsection-title text-fg">{size}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Scrolls inside its own container so the page never does. */}
                    <div className="overflow-x-auto rounded-2xl border border-line">
                        <table className="w-full border-collapse text-sm">
                            <caption className="sr-only">
                                Maximum cutting thickness by material
                            </caption>
                            <thead>
                                <tr className="bg-surface-2">
                                    <th scope="col" className="text-left meta-label text-fg-subtle px-6 py-4">
                                        Material
                                    </th>
                                    <th scope="col" className="text-right meta-label text-fg-subtle px-6 py-4">
                                        Max thickness
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {MATERIALS.map(({ material, limit }) => (
                                    <tr key={material} className="border-t border-line">
                                        <td className="px-6 py-3.5 font-semibold text-fg">{material}</td>
                                        <td className="px-6 py-3.5 text-right font-semibold text-accent whitespace-nowrap">
                                            {limit}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* How we work */}
            <section className="py-20 md:py-24 bg-surface-2">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="text-center mb-12">
                        <p className="eyebrow mb-3">How We Work</p>
                        <h2 className="section-title text-fg">
                            What you can <span className="text-accent">rely on</span>
                        </h2>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {PRINCIPLES.map(({ Icon, title, body }) => (
                            <div key={title} className="bg-white rounded-2xl border border-line p-6 sm:p-8">
                                <span className="w-12 h-12 rounded-xl bg-cta/10 flex items-center justify-center mb-6">
                                    <Icon className="w-6 h-6 text-accent" />
                                </span>
                                <h3 className="card-title text-fg mb-3">{title}</h3>
                                <p className="text-sm text-fg-muted leading-relaxed">{body}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact. GoogleBusinessCard is a full-width band of its own, so it
                sits after this section rather than inside the grid. */}
            <section className="py-20 md:py-24">
                <div className="max-w-3xl mx-auto px-4 sm:px-6">
                    <div>
                        <p className="eyebrow mb-3">Find Us</p>
                        <h2 className="section-title text-fg mb-8">
                            Visit the <span className="text-accent">workshop</span>
                        </h2>
                        <ul className="space-y-6">
                            <li className="flex items-start gap-4">
                                <span className="w-11 h-11 rounded-xl bg-cta/10 flex items-center justify-center flex-shrink-0">
                                    <MapPin className="w-5 h-5 text-accent" />
                                </span>
                                <div>
                                    <p className="meta-label text-fg-subtle mb-1.5">Address</p>
                                    <p className="text-sm text-fg-muted leading-relaxed">
                                        Door No. 63, B&amp;C Flat, Galaxy Company Salai,<br />
                                        Ponniamman Nagar, Ayanambakkam,<br />
                                        Chennai — 600095, Tamil Nadu
                                    </p>
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <span className="w-11 h-11 rounded-xl bg-cta/10 flex items-center justify-center flex-shrink-0">
                                    <Phone className="w-5 h-5 text-accent" />
                                </span>
                                <div>
                                    <p className="meta-label text-fg-subtle mb-1.5">Phone</p>
                                    <a href="tel:+916380736439" className="block text-sm font-semibold text-fg hover:text-accent transition-colors">
                                        +91 63807 36439
                                    </a>
                                    <a href="tel:+916369221078" className="block text-sm font-semibold text-fg hover:text-accent transition-colors">
                                        +91 63692 21078
                                    </a>
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <span className="w-11 h-11 rounded-xl bg-cta/10 flex items-center justify-center flex-shrink-0">
                                    <Mail className="w-5 h-5 text-accent" />
                                </span>
                                <div>
                                    <p className="meta-label text-fg-subtle mb-1.5">Email</p>
                                    <a href="mailto:admin@rgtechengineeringworks.com" className="text-sm font-semibold text-fg hover:text-accent transition-colors break-all">
                                        admin@rgtechengineeringworks.com
                                    </a>
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <span className="w-11 h-11 rounded-xl bg-cta/10 flex items-center justify-center flex-shrink-0">
                                    <Clock className="w-5 h-5 text-accent" />
                                </span>
                                <div>
                                    <p className="meta-label text-fg-subtle mb-1.5">Hours</p>
                                    <p className="text-sm text-fg-muted">Monday to Saturday, 09:00 – 19:00</p>
                                </div>
                            </li>
                        </ul>

                        <div className="flex flex-col sm:flex-row gap-4 mt-10">
                            <Link href="/contact" className="btn btn-primary">
                                Request a Quote <ArrowRight className="w-4 h-4" />
                            </Link>
                            <a
                                href="https://wa.me/916380736439"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-whatsapp"
                            >
                                <MessageCircle className="w-5 h-5" /> WhatsApp Us
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <GoogleBusinessCard />
        </div>
    )
}
