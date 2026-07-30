import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { BASE_URL } from '@/lib/data'
import { organizationSchema, jsonLdGraph, jsonLdScript } from '@/lib/schema'

/*
 * Terms & Conditions.
 *
 * These are general commercial terms for metal job work, written to match how
 * this business actually operates (quote from a drawing, advance on order,
 * balance before dispatch, customer-supplied artwork). They are a starting
 * point, not legal advice — they should be reviewed by a solicitor before being
 * relied on in a dispute, and the payment percentages and lead times below must
 * be confirmed against what the business really commits to.
 */

const LAST_UPDATED = '30 July 2026'

export const metadata = {
    title: 'Terms & Conditions | RG Tech Engineering Works',
    description:
        'Terms and conditions governing quotations, orders, payment, delivery and liability for CNC laser cutting and metal fabrication work carried out by RG Tech Engineering Works, Chennai.',
    alternates: { canonical: '/terms' },
    robots: { index: true, follow: true },
}

const SECTIONS = [
    {
        id: 'about',
        heading: 'About these terms',
        body: [
            'These terms govern all quotations, orders and work carried out by RG Tech Engineering Works ("RG Tech", "we", "us"), a proprietorship registered in Tamil Nadu under GSTIN 33HGZPS9605D1ZP, with its workshop at Door No. 63, B&C Flat, Galaxy Company Salai, Ponniamman Nagar, Ayanambakkam, Chennai 600095.',
            'By placing an order with us, you ("the customer") accept these terms. Where a signed purchase order or written agreement between us says something different, that document takes precedence over these terms to the extent of the conflict.',
        ],
    },
    {
        id: 'quotations',
        heading: 'Quotations and pricing',
        body: [
            'Quotations are prepared from the drawings, material specification and quantity you supply. Because machine time depends on material grade, thickness, total cut length and piercing count, we do not quote a flat hourly or per-kilogram rate.',
            'Unless stated otherwise on the quotation, a quotation is valid for 15 days from its date and is exclusive of GST, freight and any secondary processes not expressly listed.',
            'Metal prices move. Where the market price of the material changes materially between quotation and order confirmation, we will tell you before proceeding and re-quote rather than absorb or pass on the difference silently.',
        ],
    },
    {
        id: 'orders',
        heading: 'Orders and acceptance',
        body: [
            'An order is accepted only once we confirm it in writing, whether by email, WhatsApp or a signed job card. Placing a purchase order does not by itself create a binding order until we confirm it.',
            'We may decline any order, including where the drawing is not manufacturable as supplied, where the material or thickness is outside our stated capacity, or where the required date cannot be met.',
        ],
    },
    {
        id: 'drawings',
        heading: 'Your drawings, files and designs',
        body: [
            'You retain ownership of all drawings, CAD files and artwork you supply. We use them solely to quote and to produce your parts, and we do not share them with third parties.',
            'You confirm that you own or are licensed to use everything you send us, and that cutting it does not infringe anyone else\'s intellectual property. This matters particularly for decorative, religious and branded designs. You are responsible for any third-party claim arising from artwork you supply.',
            'We produce to the file as supplied. Where a drawing is ambiguous, we will raise it before cutting; where it is dimensionally wrong but unambiguous, parts cut to that file are not a defect and are not returnable.',
            'Unless you tell us otherwise in writing, we may photograph finished work and show it in our portfolio or on our website. Tell us at order stage if a job is confidential and we will exclude it.',
        ],
    },
    {
        id: 'materials',
        heading: 'Materials, tolerances and finish',
        body: [
            'Where we supply the material, it is sourced to the grade specified in the quotation. Where you supply the material, we cut it as received and are not responsible for defects, incorrect grade or thickness variation in customer-supplied stock, nor for material lost to a defect that only becomes apparent during cutting.',
            'Cutting tolerance is ±0.01 mm unless a tighter or looser tolerance is agreed in writing. Standard mill tolerances apply to sheet thickness and flatness, and heat-affected edge discolouration is normal in laser cutting and is not a defect.',
            'Deburring, grading, coating and other secondary finishing are supplied only where expressly quoted.',
        ],
    },
    {
        id: 'delivery',
        heading: 'Lead times and delivery',
        body: [
            'Lead times quoted are estimates given in good faith from the workload at the time of quoting. We commit to dates in writing at order confirmation and tell you promptly if a committed date is at risk.',
            'Unless the quotation says otherwise, prices are ex-works our Chennai unit. Where we arrange transport on your behalf, we do so as your agent, and risk in the goods passes to you on dispatch.',
            'Please inspect goods on delivery. Shortages or transit damage must be reported within 48 hours of delivery, with photographs, so that a claim can be raised while it is still possible to do so.',
        ],
    },
    {
        id: 'payment',
        heading: 'Payment',
        body: [
            'Unless agreed otherwise in writing, an advance is payable on order confirmation and the balance before dispatch. Credit terms are available only where agreed in writing in advance.',
            'Title in the goods remains with RG Tech until payment has been received in full. Risk passes on dispatch.',
            'All prices are exclusive of GST, which is charged at the applicable rate. Bank charges, where any, are to your account.',
        ],
    },
    {
        id: 'changes',
        heading: 'Changes and cancellation',
        body: [
            'Changes to a confirmed order — including revised drawings, material or quantity — must be requested in writing and are subject to a re-quote of price and lead time.',
            'Once cutting has begun, an order cannot be cancelled without charge. Where you cancel after confirmation, you remain liable for material already purchased or committed for your job and for work already carried out.',
            'Custom and made-to-order parts cannot be returned for a refund where they conform to the drawing supplied.',
        ],
    },
    {
        id: 'defects',
        heading: 'Defects and remedy',
        body: [
            'We warrant that parts conform to the drawing and specification agreed at order confirmation. Claims for non-conformity must be raised within 7 days of delivery, with photographs and, where relevant, measurements.',
            'Where a claim is upheld, our responsibility is limited, at our option, to re-cutting or replacing the non-conforming parts, or to crediting their value. Please do not scrap, rework or dispose of parts you intend to claim on until we have had a reasonable opportunity to inspect them.',
        ],
    },
    {
        id: 'liability',
        heading: 'Limitation of liability',
        body: [
            'Nothing in these terms excludes or limits liability where it cannot lawfully be excluded or limited.',
            'Subject to that, our total liability arising out of or in connection with an order is limited to the value of that order, and we are not liable for indirect or consequential loss, including loss of profit, loss of contract, site delay costs or the cost of any third-party work built around our parts.',
            'Our parts are frequently one component in a larger assembly or structure. Responsibility for the design, structural adequacy and fitness for purpose of the finished assembly rests with you or your engineer, not with us, unless we have expressly been engaged to carry out that design.',
        ],
    },
    {
        id: 'force-majeure',
        heading: 'Circumstances beyond our control',
        body: [
            'We are not liable for delay or failure to perform caused by events beyond our reasonable control, including power failure, machine breakdown, shortage or delay in the supply of material, transport disruption, industrial action, fire, flood, epidemic, or act of government. Where such an event occurs we will tell you promptly and agree a revised date.',
        ],
    },
    {
        id: 'confidentiality',
        heading: 'Confidentiality',
        body: [
            'Each of us will keep confidential the commercial and technical information the other supplies in connection with an order, and use it only for the purpose of that order. This does not apply to information that is already public, or that we are required to disclose by law.',
        ],
    },
    {
        id: 'law',
        heading: 'Governing law and jurisdiction',
        body: [
            'These terms and any order placed under them are governed by the laws of India. The courts at Chennai, Tamil Nadu have exclusive jurisdiction over any dispute arising from them.',
            'We would ask that you raise any dispute with us directly first — most issues are resolved faster by a phone call to the workshop than by correspondence.',
        ],
    },
]

export default function TermsPage() {
    const graph = jsonLdGraph(organizationSchema, {
        '@type': 'WebPage',
        '@id': `${BASE_URL}/terms#webpage`,
        url: `${BASE_URL}/terms`,
        name: 'Terms & Conditions',
        description:
            'Terms and conditions for CNC laser cutting and metal fabrication work by RG Tech Engineering Works.',
        publisher: { '@id': `${BASE_URL}/#organization` },
    })

    return (
        <div className="bg-white">
            <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(graph)} />

            <section className="hero-gradient py-16 md:py-20 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none hero-texture"></div>
                <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10 text-center">
                    <p className="eyebrow mb-4">Legal</p>
                    <h1 className="display-title text-fg mb-6">
                        Terms &amp; <span className="text-accent">Conditions</span>
                    </h1>
                    <p className="section-lead">
                        The terms on which we quote, cut and deliver metal work.
                    </p>
                    <p className="meta-label text-fg-subtle mt-6">Last updated {LAST_UPDATED}</p>
                </div>
            </section>

            <section className="py-16 md:py-24">
                <div className="max-w-3xl mx-auto px-4 sm:px-6">
                    {/* Contents */}
                    <nav aria-label="Contents" className="rounded-2xl border border-line bg-surface-2 p-6 sm:p-8 mb-14">
                        <p className="eyebrow mb-4">Contents</p>
                        <ol className="grid sm:grid-cols-2 gap-x-8 gap-y-2.5">
                            {SECTIONS.map(({ id, heading }, i) => (
                                <li key={id} className="flex gap-3 text-sm">
                                    <span className="text-fg-subtle tabular-nums">{i + 1}.</span>
                                    <a href={`#${id}`} className="text-fg-muted hover:text-accent transition-colors">
                                        {heading}
                                    </a>
                                </li>
                            ))}
                        </ol>
                    </nav>

                    <div className="space-y-12">
                        {SECTIONS.map(({ id, heading, body }, i) => (
                            <section key={id} id={id} className="scroll-mt-28">
                                <h2 className="subsection-title text-fg mb-4">
                                    <span className="text-accent tabular-nums">{i + 1}.</span> {heading}
                                </h2>
                                <div className="space-y-4">
                                    {body.map((paragraph, j) => (
                                        <p key={j} className="text-base text-fg-muted leading-relaxed">
                                            {paragraph}
                                        </p>
                                    ))}
                                </div>
                            </section>
                        ))}
                    </div>

                    {/* Contact */}
                    <div className="mt-16 rounded-2xl border border-line bg-surface-2 p-6 sm:p-8">
                        <h2 className="card-title text-fg mb-3">Questions about these terms?</h2>
                        <p className="text-base text-fg-muted leading-relaxed mb-6">
                            Write to{' '}
                            <a href="mailto:admin@rgtechengineeringworks.com" className="text-accent font-semibold hover:underline">
                                admin@rgtechengineeringworks.com
                            </a>{' '}
                            or call{' '}
                            <a href="tel:+916380736439" className="text-accent font-semibold hover:underline">
                                +91 63807 36439
                            </a>
                            .
                        </p>
                        <Link href="/contact" className="btn btn-primary">
                            Contact Us <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}
