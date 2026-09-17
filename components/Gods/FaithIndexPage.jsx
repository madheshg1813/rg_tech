import { notFound } from 'next/navigation'
import { godDesignGroups } from '@/lib/godDesigns'
import { getFaith } from '@/lib/gods'
import { BASE_URL } from '@/lib/data'
import { ORG_ID, breadcrumbSchema, jsonLdGraph, jsonLdScript } from '@/lib/schema'
import GodDesignIndex from '@/components/Gods/GodDesignIndex'

/*
 * One faith's index — /designs/gods/hindu, /christian, /islamic.
 *
 * Three routes, one component, because the pages differ only in their data.
 * Each route file is four lines: it names its faith and nothing else.
 *
 * These sit alongside the dynamic [god] segment. Next resolves a literal
 * segment before a dynamic one, so /designs/gods/hindu reaches this page and
 * /designs/gods/ganesh reaches the gallery — but it does mean the three faith
 * slugs are now reserved and can never also be gallery slugs. Nothing in GODS
 * uses them, and the check in lib/gods.js would have to be the place to catch
 * it if anything ever did.
 */

const KEYWORDS = {
    hindu: [
        'hindu god laser cut designs',
        'deity panel designs',
        'pooja room laser cut panel',
        'temple laser cutting design',
    ],
    christian: [
        'christian laser cut panel',
        'jesus laser cut design',
        'mother mary metal panel',
        'velankanni matha panel design',
        'holy cross laser cutting',
    ],
    islamic: [
        'islamic laser cut panel',
        'islamic geometric jali',
        'arabesque metal screen',
        'mihrab arch panel',
        'masjid laser cutting design',
    ],
}

const ENQUIRY = {
    hindu: 'laser cut Hindu deity panel designs',
    christian: 'laser cut Christian panel designs',
    islamic: 'laser cut Islamic panel designs',
}

export function faithMetadata(slug) {
    const faith = getFaith(slug)
    if (!faith) return {}

    const url = `${BASE_URL}/designs/gods/${slug}`
    const description = `${faith.lead} Cut in mild steel, stainless steel, brass and copper in Chennai, 1 ft to 8 ft.`

    return {
        // No brand suffix — app/layout.js applies the title template.
        title: faith.title,
        description,
        keywords: KEYWORDS[slug],
        alternates: { canonical: `/designs/gods/${slug}` },
        openGraph: {
            title: faith.title,
            description: faith.lead,
            url,
            type: 'website',
            siteName: 'RG Tech Engineering Works',
        },
    }
}

export default function FaithIndexPage({ faith: slug }) {
    const faith = getFaith(slug)
    if (!faith) notFound()

    const sections = godDesignGroups(slug)
    // Nothing published for this faith yet. A page of headings with no tiles
    // under them is thin content, and the sitemap leaves it out for the same
    // reason, so 404 until the first gallery lands.
    if (sections.length === 0) notFound()

    const total = sections.reduce((n, s) => n + s.designs.length, 0)
    const pageUrl = `${BASE_URL}/designs/gods/${slug}`

    const graph = jsonLdGraph(
        {
            '@type': 'CollectionPage',
            '@id': `${pageUrl}#collection`,
            name: faith.title,
            url: pageUrl,
            isPartOf: { '@id': `${BASE_URL}/designs/gods#collection` },
            publisher: { '@id': ORG_ID },
            mainEntity: {
                '@type': 'ItemList',
                numberOfItems: total,
                itemListElement: sections.flatMap((section) =>
                    section.designs.map((d) => ({
                        '@type': 'ListItem',
                        name: d.name,
                        url: `${BASE_URL}${d.href}`,
                    }))
                ),
            },
        },
        breadcrumbSchema(
            [
                { name: 'Home', url: BASE_URL },
                { name: 'God Designs', url: `${BASE_URL}/designs/gods` },
                { name: faith.label, url: pageUrl },
            ],
            pageUrl
        )
    )

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(graph)} />

            <GodDesignIndex
                title={`${faith.label} Laser Cut`}
                accent="Panel Designs"
                lead={
                    `${faith.lead} ${total} galleries in all, cut from mild steel, stainless ` +
                    `steel, brass and copper on our CNC fiber laser in Chennai, at any size from ` +
                    `1 ft up to a full 8 ft arch.`
                }
                sections={sections}
                enquiry={ENQUIRY[slug]}
            />
        </>
    )
}
