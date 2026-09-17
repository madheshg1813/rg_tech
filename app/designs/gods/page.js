import { godDesignGroups } from '@/lib/godDesigns'
import { FAITHS } from '@/lib/gods'
import { BASE_URL } from '@/lib/data'
import { ORG_ID, breadcrumbSchema, jsonLdGraph, jsonLdScript } from '@/lib/schema'
import GodDesignIndex from '@/components/Gods/GodDesignIndex'

/*
 * The design index — /designs/gods.
 *
 * Until the galleries were built this path was deliberately not a page: an
 * index of three tiles is not worth a route. With the set filled in it is the
 * obvious parent — every gallery links up to it, and it collects the picture
 * searches that name no particular subject ("laser cut god designs", "temple
 * panel designs").
 *
 * It now carries three faiths, so it holds everything with a filter across the
 * top and each faith also gets its own page underneath: /designs/gods/hindu,
 * /christian and /islamic. The galleries themselves stay flat at
 * /designs/gods/<slug> — they were published and indexed before the other two
 * faiths existed, and moving sixty pages to gain a tidier path would cost more
 * in redirects than the tidiness is worth.
 */

export const metadata = {
    // No brand suffix — app/layout.js applies the "%s | RG Tech Engineering
    // Works" template, and adding one here double-brands the tab.
    title: 'Laser Cut God & Religious Panel Designs',
    description:
        'Laser cut panel designs for pooja rooms, prayer rooms, main gates and arches. ' +
        'Hindu deity, Christian and Islamic designs cut in mild steel, stainless steel, ' +
        'brass and copper in Chennai.',
    keywords: [
        'laser cut god designs',
        'deity panel designs',
        'pooja room laser cut panel',
        'christian laser cut panel',
        'islamic laser cut panel',
        'temple laser cutting design',
    ],
    alternates: { canonical: '/designs/gods' },
    openGraph: {
        title: 'Laser Cut God & Religious Panel Designs',
        description:
            'Hindu, Christian and Islamic panel designs for prayer rooms, gates and arches — cut in Chennai.',
        url: `${BASE_URL}/designs/gods`,
        type: 'website',
        siteName: 'RG Tech Engineering Works',
    },
}

export default function Page() {
    const sections = godDesignGroups()
    const total = sections.reduce((n, s) => n + s.designs.length, 0)

    // Only faiths that actually have published galleries get a filter button —
    // a tab that filters to nothing is worse than no tab.
    const faiths = FAITHS.map((f) => ({
        slug: f.slug,
        label: f.label,
        count: sections
            .filter((s) => s.faith === f.slug)
            .reduce((n, s) => n + s.designs.length, 0),
    })).filter((f) => f.count > 0)

    const pageUrl = `${BASE_URL}/designs/gods`
    const graph = jsonLdGraph(
        /*
         * A CollectionPage with an ItemList, not a Product list. These are
         * galleries of design renders; listing them as products would need
         * prices and availability we do not publish per design.
         */
        {
            '@type': 'CollectionPage',
            '@id': `${pageUrl}#collection`,
            name: 'Laser Cut God & Religious Panel Designs',
            url: pageUrl,
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
                { name: 'God Designs', url: pageUrl },
            ],
            pageUrl
        )
    )

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(graph)} />

            <GodDesignIndex
                title="Laser Cut Panels for"
                accent="Every Deity, Symbol and Arch"
                lead={
                    `${total} design galleries for pooja room screens, prayer room panels, main ` +
                    `gate inserts, temple and church arches and wall art. Cut from mild steel, ` +
                    `stainless steel, brass and copper on our CNC fiber laser in Chennai, at any ` +
                    `size from 1 ft up to a full 8 ft arch.`
                }
                sections={sections}
                faiths={faiths}
                enquiry="laser cut religious panel designs"
            />
        </>
    )
}
