import { Sora, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";
import { godDesignGroups } from "@/lib/godDesigns";
import { FAITHS } from "@/lib/gods";
import {
    organizationSchema,
    webSiteSchema,
    jsonLdGraph,
    jsonLdScript,
} from "@/lib/schema";

// Three self-hosted families, each doing one job. next/font inlines the
// @font-face rules at build time, so there is no render-blocking request to
// Google Fonts.
//
// Sora for display. A geometric grotesque with a tall x-height and flat
// terminals, it holds its shape at the 2.1rem -> 4.75rem range the headlines
// run across. Archivo, which this replaces, sat lower and needed tighter
// tracking to read as a headline; Sora carries the weight on its own.
const sora = Sora({
    variable: "--font-display-brand",
    subsets: ["latin"],
    display: "swap",
    // 600 is deliberately absent: every --font-heading rule in globals.css
    // sets 700 or 800, and every font-heading class in the components pairs
    // with font-bold or font-extrabold. The two font-weight:600 rules on the
    // site (.nav-link and the stat pill) set no family, so they inherit Inter.
    weight: ["700", "800"],
});

// Inter for body copy. Designed for screen reading at small sizes, and neutral
// enough that it never competes with Sora in a heading/sub-line pair.
const inter = Inter({
    variable: "--font-body-brand",
    subsets: ["latin"],
    display: "swap",
    weight: ["400", "500", "600", "700"],
});

// JetBrains Mono for every uppercase micro-label - eyebrows, stat captions,
// badges. The monospace is what makes those labels read as stamped record
// headings rather than as small headlines.
const jetbrainsMono = JetBrains_Mono({
    variable: "--font-mono-brand",
    subsets: ["latin"],
    display: "swap",
    weight: ["400", "500", "700"],
});

const BASE = "https://www.rgtechengineeringworks.com"

export const metadata = {
    title: {
        default: "CNC Fiber Laser Cutting in Chennai | RG Tech",
        /*
         * Suffix shortened from " | RG Tech Engineering Works" (28 characters)
         * to " | RG Tech" (10). At 28 the suffix consumed nearly half of
         * Google's ~60-character display limit, so a page title had to fit in
         * ~32 characters to survive - which none of them did. Twelve of
         * thirteen templates were being truncated.
         *
         * The registered name is unchanged everywhere it carries legal or
         * trust weight: the Organization schema, the footer, the about page and
         * the OpenGraph siteName. This is the title tag only, and "RG Tech" is
         * already how the site refers to itself in body copy.
         */
        template: "%s | RG Tech",
    },
    description: "Tamil Nadu's premier CNC Fiber Laser Cutting & Metal Fabrication partner. Specialising in MS, SS, Aluminum laser cutting, steel gates, and decorative panels in Chennai.",
    metadataBase: new URL(BASE),
    alternates: {
        canonical: "/",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
    openGraph: {
        title: "RG Tech Engineering | CNC Fiber Laser Cutting Specialist Chennai",
        description: "Leading CNC Fiber Laser Cutting and Architectural Metal Fabrication in Chennai. Precision MS, SS, Aluminum cutting up to 45mm.",
        url: BASE,
        siteName: "RG Tech Engineering Works",
        images: [
            {
                url: "/og?title=RG+Tech+Engineering&sub=CNC+Fiber+Laser+Cutting+Specialist+%E2%80%94+Chennai",
                width: 1200,
                height: 630,
                alt: "RG Tech Engineering - CNC Fiber Laser Cutting Specialist Chennai",
            },
        ],
        locale: "en_IN",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "RG Tech Engineering | CNC Fiber Laser Cutting Specialist Chennai",
        description: "Leading CNC Fiber Laser Cutting and Metal Fabrication in Chennai. MS, SS, Aluminum cutting up to 45mm.",
        images: ["/og?title=RG+Tech+Engineering&sub=CNC+Fiber+Laser+Cutting+Specialist+%E2%80%94+Chennai"],
    },
}

// Organization + LocalBusiness + WebSite, emitted site-wide as one linked graph.
// Definitions live in lib/schema.js so every page references the same entity.
const siteGraph = jsonLdGraph(organizationSchema, webSiteSchema)

export default function RootLayout({ children }) {
    /*
     * Which faiths the Designs menu may link to.
     *
     * Computed here rather than in the Header because the Header is a client
     * component: importing lib/godDesigns there would ship the whole Cloudinary
     * manifest to the browser. Only the three short slugs cross the boundary.
     *
     * A faith with no published galleries 404s on its own page, so linking to
     * it from the nav would be a broken link on every page of the site while a
     * set is being filled in.
     */
    const designFaiths = FAITHS.filter((f) => godDesignGroups(f.slug).length > 0).map(
        (f) => f.slug
    )

    return (
        <html lang="en" className={`${sora.variable} ${inter.variable} ${jetbrainsMono.variable} scroll-smooth`}>
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={jsonLdScript(siteGraph)}
                />
            </head>
            <body className="antialiased">
                <LayoutWrapper designFaiths={designFaiths}>{children}</LayoutWrapper>
            </body>
        </html>
    )
}
