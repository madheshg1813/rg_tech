import Hero from '@/components/Home/Hero'
import RollingLogos from '@/components/Home/RollingLogos'
import Services from '@/components/Home/Services'
import Industries from '@/components/Home/Industries'
import OurWorks from '@/components/Home/OurWorks'
import WhyChooseUs from '@/components/Home/WhyChooseUs'
import Testimonials from '@/components/Home/Testimonials'
import FindUsOnline from '@/components/Home/FindUsOnline'
import Process from '@/components/Home/Process'
import FAQ from '@/components/Home/FAQ'
import ContactForm from '@/components/Home/ContactForm'
import { faqs } from '@/lib/data'
import { faqPageSchema, jsonLdGraph, jsonLdScript } from '@/lib/schema'

const BASE = "https://www.rgtechengineeringworks.com"

export const metadata = {
    title: 'RG Tech Engineering | Best CNC Laser Cutting & Metal Fabrication Chennai',
    description: 'RG Tech Engineering Works: Leading CNC Fiber Laser Cutting Services in Chennai. Precision MS, SS, Aluminum, Copper & Brass cutting up to 45mm. Fast 24/7 support.',
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
            <OurWorks />
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
