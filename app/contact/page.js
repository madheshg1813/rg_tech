import { Phone, MessageCircle, Mail, Clock, MapPin } from 'lucide-react'
import ContactForm from '@/components/Home/ContactForm'
import GoogleBusinessCard from '@/components/GoogleBusinessCard'
import { BASE_URL, GMB_DIRECTIONS_URL } from '@/lib/data'
import { ORG_ID, breadcrumbSchema, jsonLdGraph, jsonLdScript } from '@/lib/schema'

export const metadata = {
    title: 'Contact RG Tech Engineering | CNC Laser Cutting Quote in Chennai',
    description:
        'Send your drawing for a CNC fiber laser cutting or metal fabrication quote in Chennai. Engineer-verified pricing within 24 business hours. Call +91 63807 36439.',
    alternates: { canonical: '/contact' },
    openGraph: {
        title: 'Contact RG Tech Engineering | Get a Laser Cutting Quote',
        description:
            'Send your DXF, STEP or sketch and get engineer-verified pricing within 24 business hours from RG Tech Engineering, Chennai.',
        url: `${BASE_URL}/contact`,
        type: 'website',
        siteName: 'RG Tech Engineering Works',
        images: [
            {
                url: `${BASE_URL}/og?title=Contact+RG+Tech+Engineering&sub=Get+a+CNC+Laser+Cutting+Quote+in+24+Hours`,
                width: 1200,
                height: 630,
                alt: 'Contact RG Tech Engineering — CNC laser cutting quotes in Chennai',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Contact RG Tech Engineering | Get a Laser Cutting Quote',
        description: 'Engineer-verified laser cutting and fabrication quotes within 24 business hours.',
        images: [`${BASE_URL}/og?title=Contact+RG+Tech+Engineering&sub=Get+a+CNC+Laser+Cutting+Quote+in+24+Hours`],
    },
}

const QUICK_ACTIONS = [
    {
        Icon: Phone,
        label: 'Call us',
        value: '+91 63807 36439',
        href: 'tel:+916380736439',
        note: 'Mon–Sat, 09:00–19:00',
    },
    {
        Icon: MessageCircle,
        label: 'WhatsApp',
        value: 'Send a drawing',
        href: 'https://wa.me/916380736439',
        note: 'Fastest for DXF and photos',
    },
    {
        Icon: Mail,
        label: 'Email',
        value: 'admin@rgtechengineeringworks.com',
        href: 'mailto:admin@rgtechengineeringworks.com',
        note: 'Detailed specifications',
    },
]

export default function ContactPage() {
    const pageUrl = `${BASE_URL}/contact`

    const graph = jsonLdGraph(
        {
            "@type": "ContactPage",
            "@id": `${pageUrl}#contactpage`,
            "url": pageUrl,
            "name": "Contact RG Tech Engineering",
            "description":
                "Request a CNC fiber laser cutting or metal fabrication quote from RG Tech Engineering Works, Chennai.",
            "about": { "@id": ORG_ID },
            "inLanguage": "en-IN",
        },
        breadcrumbSchema(
            [
                { name: 'Home', url: BASE_URL },
                { name: 'Contact', url: pageUrl },
            ],
            pageUrl
        )
    )

    return (
        <div className="bg-white">
            <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(graph)} />

            {/* Hero */}
            <section className="hero-gradient py-16 md:py-24 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none hero-texture"></div>
                <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
                    <p className="eyebrow mb-4">
                        Get In Touch
                    </p>
                    <h1 className="display-title text-fg mb-6 text-balance">
                        Request a <span className="text-accent">Technical Quote</span>
                    </h1>
                    <p className="section-lead max-w-2xl mx-auto">
                        Send your drawing with material, thickness and quantity. You get engineer-verified
                        pricing and a DFM review within 24 business hours.
                    </p>
                </div>
            </section>

            {/* Quick actions */}
            <section className="py-16 bg-surface-2 border-b border-line">
                <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-6">
                    {QUICK_ACTIONS.map(({ Icon, label, value, href, note }) => (
                        <a
                            key={label}
                            href={href}
                            className="group min-w-0 bg-white rounded-2xl border border-line p-6 sm:p-8 hover:border-cta hover:shadow-xl transition-all"
                        >
                            <span className="w-12 h-12 rounded-xl bg-cta/10 flex items-center justify-center mb-5">
                                <Icon className="w-5 h-5 text-accent" />
                            </span>
                            <p className="meta-label text-fg-subtle">
                                {label}
                            </p>
                            {/*
                             * The email address is one unbreakable token; on a 375px
                             * screen it pushed the card 4px past the viewport.
                             * overflow-wrap:anywhere lets it break mid-word.
                             */}
                            <p className="font-bold text-fg mt-2 [overflow-wrap:anywhere] group-hover:text-accent transition-colors">
                                {value}
                            </p>
                            <p className="text-sm text-fg-muted mt-1">{note}</p>
                        </a>
                    ))}
                </div>
            </section>

            {/* The form — same component the home page uses */}
            <ContactForm />

            {/* Google Business Profile */}
            <GoogleBusinessCard />

            {/* Visit us */}
            <section className="py-20 bg-white">
                <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10">
                    <div className="rounded-2xl border border-line p-8">
                        <span className="w-11 h-11 rounded-xl bg-cta/10 flex items-center justify-center mb-5">
                            <MapPin className="w-5 h-5 text-accent" />
                        </span>
                        <h2 className="card-title text-fg mb-3">Visit the workshop</h2>
                        <p className="text-fg-muted leading-relaxed">
                            Door No. 63, B&amp;C Flat, Galaxy Company Salai,
                            <br />
                            Ponniamman Nagar, Ayanambakkam,
                            <br />
                            Chennai, Tamil Nadu 600095
                        </p>
                    </div>
                    <div className="rounded-2xl border border-line p-8">
                        <span className="w-11 h-11 rounded-xl bg-cta/10 flex items-center justify-center mb-5">
                            <Clock className="w-5 h-5 text-accent" />
                        </span>
                        <h2 className="card-title text-fg mb-3">Working hours</h2>
                        <p className="text-fg-muted leading-relaxed">
                            Monday to Saturday
                            <br />
                            09:00 – 19:00
                            <br />
                            <span className="text-fg-subtle">Sunday closed</span>
                        </p>
                    </div>
                </div>
            </section>
        </div>
    )
}
