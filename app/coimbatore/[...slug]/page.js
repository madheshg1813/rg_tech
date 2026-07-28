import ServiceClient from '@/components/Service/ServiceClient'
import { buildMetadata, buildServicePage } from '@/lib/servicePage'
import { jsonLdScript } from '@/lib/schema'

const CITY = 'coimbatore'

export async function generateMetadata({ params }) {
    return buildMetadata(CITY, params)
}

export default async function Page({ params }) {
    const page = await buildServicePage(CITY, params)

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(page.graph)} />
            <ServiceClient
                content={page.content}
                city={page.city}
                cityName={page.cityName}
                cityIndex={page.cityIndex}
                pathName={page.pathName}
                metaTitle={page.metaTitle}
                faqs={page.faqs}
            />
        </>
    )
}
