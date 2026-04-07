import Hero from '@/components/Home/Hero'
import RollingLogos from '@/components/Home/RollingLogos'
import Services from '@/components/Home/Services'
import Industries from '@/components/Home/Industries'
import WhyChooseUs from '@/components/Home/WhyChooseUs'
import Testimonials from '@/components/Home/Testimonials'
import Process from '@/components/Home/Process'
import FAQ from '@/components/Home/FAQ'
import ContactForm from '@/components/Home/ContactForm'

export const metadata = {
    title: 'RG Tech Engineering | Best CNC Laser Cutting & Metal Fabrication Chennai',
    description: 'RG Tech Engineering Works: Leading CNC Fiber Laser Cutting Services in Chennai. Precision MS, SS, Aluminum, Copper & Brass cutting up to 45mm. Fast 24/7 support.',
    alternates: {
        canonical: '/',
    },
    openGraph: {
        title: 'RG Tech Engineering | Best CNC Laser Cutting & Metal Fabrication Chennai',
        description: 'Leading CNC Fiber Laser Cutting Services in Chennai. Precision MS, SS, Aluminum, Copper & Brass cutting up to 45mm.',
        url: '/',
        type: 'website',
    }
}

export default function Home() {
    return (
        <main>
            <Hero />
            <RollingLogos />
            <Services />
            <Industries />
            <WhyChooseUs />
            <Process />
            <Testimonials />
            <FAQ />
            <ContactForm />
        </main>
    )
}
