import Hero from '@/components/Home/Hero'
import TrustStrip from '@/components/Home/TrustStrip'
import RollingLogos from '@/components/Home/RollingLogos'
import Services from '@/components/Home/Services'
import Industries from '@/components/Home/Industries'
import OurWorks from '@/components/Home/OurWorks'
import WhyChooseUs from '@/components/Home/WhyChooseUs'
import Testimonials from '@/components/Home/Testimonials'
import FindUsOnline from '@/components/Home/FindUsOnline'
import Process from '@/components/Home/Process'
import VideoShowcase from '@/components/Home/VideoShowcase'
import FAQ from '@/components/Home/FAQ'
import ContactForm from '@/components/Home/ContactForm'
import { faqs } from '@/lib/data'
import { faqPageSchema, jsonLdGraph, jsonLdScript } from '@/lib/schema'

const BASE = "https://www.rgtechengineeringworks.com"

export const metadata = {
    /*
     * Absolute, so the layout does not append the brand a second time — the
     * brand already opens this title. "Best" is gone: it is an unsupported
     * superlative, it is not a phrase anyone searches, and it cost seven
     * characters ahead of the keyword.
     */
    title: { absolute: 'CNC Laser Cutting & Metal Fabrication in Chennai | RG Tech' },
    /*
     * "Fast 24/7 support" is removed: the business runs Mon-Sat 09:00-19:00,
     * which the opening-hours schema on every page already states, so the claim
     * contradicted our own structured data.
     */
    description: 'CNC fiber laser cutting and metal fabrication in Chennai. MS, SS, aluminium, copper and brass cut to 45mm. Send a drawing, get a quote in 24 hours.',
    alternates: {
        canonical: '/',
    },
    openGraph: {
        title: 'RG Tech Engineering | Best CNC Laser Cutting & Metal Fabrication Chennai',
        description: 'Leading CNC Fiber Laser Cutting Services in Chennai. Precision MS, SS, Aluminum, Copper & Brass cutting up to 45mm. Fast 24/7 support.',
        url: BASE,
        type: 'website',
        images: [
            {
                url: `${BASE}/og?title=RG+Tech+Engineering&sub=Best+CNC+Laser+Cutting+%26+Metal+Fabrication+in+Chennai`,
                width: 1200,
                height: 630,
                alt: 'RG Tech Engineering — Best CNC Laser Cutting & Metal Fabrication Chennai',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'RG Tech Engineering | Best CNC Laser Cutting & Metal Fabrication Chennai',
        description: 'Leading CNC Fiber Laser Cutting Services in Chennai. Precision MS, SS, Aluminum cutting up to 45mm.',
        images: [`${BASE}/og?title=RG+Tech+Engineering&sub=Best+CNC+Laser+Cutting+%26+Metal+Fabrication+in+Chennai`],
    },
}

/*
 * The Testimonials section fetches live Google reviews during static generation,
 * so the page itself has to re-generate for a new review to ever appear.
 *
 * Twelve hours. Featurable refreshes its own upstream cache every 48 hours, so
 * polling it faster than this buys nothing; the Places API has no such cache but
 * reviews on a workshop listing arrive weekly at best. Unlike /blog and the
 * sitemap — both on 5 minutes because publishing is scripted and should show up
 * promptly — nothing here is waiting on an operator.
 */
export const revalidate = 43200

export default function Home() {
    // The FAQ accordion below renders exactly these questions and answers, which
    // is what FAQPage markup requires.
    const homeGraph = jsonLdGraph(faqPageSchema(faqs, `${BASE}/`))

    // LayoutWrapper already provides the <main> landmark.
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={jsonLdScript(homeGraph)}
            />
            <Hero />
            <TrustStrip />
            <OurWorks />
            <VideoShowcase />
            <RollingLogos />
            <Services />
            <Industries />
            <WhyChooseUs />
            <Process />
            <Testimonials />
            <FindUsOnline />
            <FAQ />
            <ContactForm />
        </>
    )
}
