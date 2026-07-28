import ServiceClient from '@/components/Service/ServiceClient'
import GodPage from '@/components/Gods/GodPage'
import { buildMetadata, buildServicePage, resolveGod } from '@/lib/servicePage'
import { buildGodMetadata, buildGodPage } from '@/lib/godPage'
import { jsonLdScript } from '@/lib/schema'

const CITY = 'coimbatore'

export async function generateMetadata({ params }) {
    const { slug } = await params
    const { god } = resolveGod(CITY, slug)
    if (god) return buildGodMetadata(CITY, god, slug)
    return buildMetadata(CITY, params)
}

export default async function Page({ params }) {
    const { slug } = await params

    // Deity design pages share this catch-all; checked first so a god key can
    // never be shadowed by the service resolver.
    const { city, god } = resolveGod(CITY, slug)
    if (god) {
        const { graph } = buildGodPage(CITY, god)
        return (
            <>
                <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(graph)} />
                <GodPage god={god} city={city} />
            </>
        )
    }

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
