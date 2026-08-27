import ServiceClient from '@/components/Service/ServiceClient'
import OurWorks from '@/components/Home/OurWorks'
import RecommendedArticles from '@/components/Service/RecommendedArticles'
import { getPosts } from '@/lib/sanity'
import { pickArticles } from '@/lib/recommendedArticles'
import { serviceKeyOf } from '@/lib/cities'
import GodPage from '@/components/Gods/GodPage'
import { buildMetadata, buildServicePage, resolveGod } from '@/lib/servicePage'
import { buildGodMetadata, buildGodPage } from '@/lib/godPage'
import { jsonLdScript } from '@/lib/schema'

const CITY = 'chennai'

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

    // The works strip is for the six service pillars only. buildServicePage
    // sets cityName only on a locality page (/{city}/{service}-in-{locality}),
    // so its absence is what marks a pillar. Rendered here rather than inside
    // ServiceClient, which is a client component — see the slot comment there.
    const isPillar = !page.cityName

    // Only the pillars fetch posts. getPosts() goes through safeFetch, so an
    // unreachable Sanity returns [] and the section simply does not render
    // rather than failing the page.
    const articlePosts = isPillar ? await getPosts() : []
    const recommended = isPillar
        ? pickArticles(serviceKeyOf(page.content), articlePosts)
        : []

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
                works={isPillar ? <OurWorks /> : null}
                articles={
                    isPillar && recommended.length
                        ? <RecommendedArticles posts={recommended} serviceName={page.content.name} />
                        : null
                }
            />
        </>
    )
}
