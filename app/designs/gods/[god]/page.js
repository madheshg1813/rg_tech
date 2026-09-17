import { notFound } from 'next/navigation'
import GodDesignGallery from '@/components/Gods/GodDesignGallery'
import { GOD_DESIGNS, getGodDesign, godDesignUrl } from '@/lib/godDesigns'
import { headlinePlaces } from '@/lib/godDesignCopy'
import { BASE_URL } from '@/lib/data'
import { ORG_ID, breadcrumbSchema, faqPageSchema, jsonLdGraph, jsonLdScript } from '@/lib/schema'

/*
 * Deity design galleries — /designs/gods/<slug>.
 *
 * City-independent on purpose. The city deity pages under /{city}/ sell the
 * service and rank locally; this ranks for the picture searches ("ganesh laser
 * cutting design") that are not tied to a city, and links down into the city
 * pages rather than competing with them.
 *
 * Every slug in GOD_DESIGNS gets a route so it can be opened and checked, but
 * a gallery with no images is marked noindex here and left out of the sitemap.
 * Both flip automatically on the first image — there is no second switch.
 */

export function generateStaticParams() {
    return GOD_DESIGNS.map((d) => ({ god: d.slug }))
}

export async function generateMetadata({ params }) {
    const { god } = await params
    const design = getGodDesign(god)
    if (!design) return {}

    const path = godDesignUrl(design.slug)
    // No brand suffix — app/layout.js applies the "%s | RG Tech Engineering
    // Works" template. Adding one here double-brands the tab and pushes the
    // title past Google's display limit.
    const title = `${design.name} Laser Cutting Designs`
    // Hand-written entries have no metaDescription and fall back to the blurb,
    // which is what Ganesh did before generated galleries existed.
    const description = design.metaDescription || design.blurb
    const hasImages = design.images.length > 0

    return {
        title,
        description,
        keywords: [
            `${design.name.toLowerCase()} laser cutting design`,
            `${design.name.toLowerCase()} laser cut panel`,
            ...design.alsoKnownAs.map((n) => `${n.toLowerCase()} laser cutting design`),
            // From the gallery's own placements. These two were hardcoded to
            // 'pooja room laser cut panel' and 'temple laser cutting design',
            // which every Christian and Islamic gallery was declaring too.
            ...headlinePlaces(design.placements, 2)
                .split(', ')
                .filter(Boolean)
                .map((place) => `${place.toLowerCase()} laser cut panel`),
        ],
        alternates: { canonical: path },
        // An empty gallery is thin content. Keep it out of the index until it
        // has something to show, rather than spending crawl budget on a page
        // whose only message is "coming soon".
        robots: hasImages ? undefined : { index: false, follow: true },
        openGraph: {
            title,
            description,
            url: `${BASE_URL}${path}`,
            type: 'website',
            siteName: 'RG Tech Engineering Works',
            ...(hasImages && {
                images: [{ url: design.images[0].src, width: 1200, height: 630, alt: title }],
            }),
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            ...(hasImages && { images: [design.images[0].src] }),
        },
    }
}

export default async function Page({ params }) {
    const { god } = await params
    const design = getGodDesign(god)
    if (!design) notFound()

    const pageUrl = `${BASE_URL}${godDesignUrl(design.slug)}`

    /*
     * Typed as an ImageGallery rather than anything religious: what is shown is
     * photographs of laser-cut metal panels. Consistent with lib/godPage.js,
     * which keeps the deity pages on material, thickness and finish and makes
     * no claim about ritual suitability.
     *
     * Only emitted once there are images — an ImageGallery declaring zero
     * images is a contradiction Google is right to distrust.
     */
    const gallerySchema = design.images.length > 0 && {
        "@type": "ImageGallery",
        "@id": `${pageUrl}#gallery`,
        "name": `${design.name} Laser Cutting Designs`,
        "description": design.blurb,
        "url": pageUrl,
        "publisher": { "@id": ORG_ID },
        "associatedMedia": design.images.map((img) => ({
            "@type": "ImageObject",
            "contentUrl": img.src,
            "name": img.title,
            "material": img.material,
        })),
    }

    const graph = jsonLdGraph(
        gallerySchema || null,
        // Home -> {name}, with no "Designs" crumb in between. /designs and
        // /designs/gods are not pages, and lib/godPage.js already established
        // that a breadcrumb naming a URL that 404s is worse than a short trail.
        breadcrumbSchema(
            [
                { name: 'Home', url: BASE_URL },
                { name: design.name, url: pageUrl },
            ],
            pageUrl
        ),
        // These FAQs are written for this page and do not repeat the generic
        // set in lib/godPage.js, so the two are not competing for the same
        // rich result across 200 city pages.
        design.faqs?.length ? faqPageSchema(design.faqs, pageUrl) : null
    )

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(graph)} />
            <GodDesignGallery design={design} />
        </>
    )
}
