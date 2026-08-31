import ServiceClient from '@/components/Service/ServiceClient'
import OurWorks from '@/components/Home/OurWorks'
import RecommendedArticles from '@/components/Service/RecommendedArticles'
import { getPosts } from '@/lib/sanity'
import { pickArticles } from '@/lib/recommendedArticles'
import { serviceKeyOf } from '@/lib/cities'
import GodPage from '@/components/Gods/GodPage'
import AluminumPage from '@/components/Service/AluminumPage'
import CopperPage from '@/components/Service/CopperPage'
import MildSteelPage from '@/components/Service/MildSteelPage'
import { resolveAluminum, aluminumMetadata, aluminumGraph, ALUMINUM_SLUG } from '@/lib/aluminum'
import { resolveCopper, copperMetadata, copperGraph } from '@/lib/copper'
import { resolveMildSteel, mildSteelMetadata, mildSteelGraph } from '@/lib/mildSteel'
import { buildMetadata, buildServicePage, resolveGod } from '@/lib/servicePage'
import { buildGodMetadata, buildGodPage } from '@/lib/godPage'
import { jsonLdScript } from '@/lib/schema'

const CITY = 'coimbatore'

export async function generateMetadata({ params }) {
    const { slug } = await params
    if (resolveAluminum(CITY, slug).aluminum) return aluminumMetadata(CITY)
    if (resolveCopper(CITY, slug).copper) return copperMetadata(CITY)
    if (resolveMildSteel(CITY, slug).mildSteel) return mildSteelMetadata(CITY)
    const { god } = resolveGod(CITY, slug)
    if (god) return buildGodMetadata(CITY, god, slug)
    return buildMetadata(CITY, params)
}

export default async function Page({ params }) {
    const { slug } = await params

    /*
     * Aluminum laser cutting is its own pillar with its own layout, checked
     * before the service resolver so its slug cannot be shadowed. It matches on
     * the exact slug only, so there is no locality variant — by design, this
     * category exists on the four city pillars and nowhere else.
     */
    const { city: alCity, aluminum } = resolveAluminum(CITY, slug)
    if (aluminum) {
        const posts = await getPosts()
        const recommended = pickArticles('laser-cutting-services', posts)
        return (
            <>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={jsonLdScript(aluminumGraph(CITY))}
                />
                <AluminumPage
                    city={alCity}
                    works={<OurWorks />}
                    articles={
                        recommended.length
                            ? <RecommendedArticles posts={recommended} serviceName="aluminum laser cutting" />
                            : null
                    }
                />
            </>
        )
    }

    /*
     * Copper laser cutting — the same standalone-pillar arrangement as
     * aluminum above: exact slug only, four city pillars, no locality
     * variants, checked before the service resolver.
     */
    const { city: cuCity, copper } = resolveCopper(CITY, slug)
    if (copper) {
        const posts = await getPosts()
        const recommended = pickArticles('laser-cutting-services', posts)
        return (
            <>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={jsonLdScript(copperGraph(CITY))}
                />
                <CopperPage
                    city={cuCity}
                    works={<OurWorks />}
                    articles={
                        recommended.length
                            ? <RecommendedArticles posts={recommended} serviceName="copper laser cutting" />
                            : null
                    }
                />
            </>
        )
    }

    /*
     * Mild steel laser cutting — same standalone-pillar arrangement as aluminum
     * and copper above: exact slug only, four city pillars, no locality
     * variants, checked before the service resolver.
     */
    const { city: msCity, mildSteel } = resolveMildSteel(CITY, slug)
    if (mildSteel) {
        const posts = await getPosts()
        const recommended = pickArticles('laser-cutting-services', posts)
        return (
            <>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={jsonLdScript(mildSteelGraph(CITY))}
                />
                <MildSteelPage
                    city={msCity}
                    works={<OurWorks />}
                    articles={
                        recommended.length
                            ? <RecommendedArticles posts={recommended} serviceName="mild steel laser cutting" />
                            : null
                    }
                />
            </>
        )
    }

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
