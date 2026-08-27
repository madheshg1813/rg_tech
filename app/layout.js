import { Archivo, Public_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";
import {
    organizationSchema,
    webSiteSchema,
    jsonLdGraph,
    jsonLdScript,
} from "@/lib/schema";

// Three self-hosted families, each doing one job. next/font inlines the
// @font-face rules at build time, so there is no render-blocking request to
// Google Fonts — the same trio is loaded over the network on the Sree site this
// type system came from, and that is a round trip worth not paying.
//
// Archivo for display: a grotesque with flat terminals and tight, even spacing,
// which is what lets a headline sit at -0.035em without the letters colliding.
// Plus Jakarta Sans, the previous single family, is geometric and rounder — it
// could not be tracked that tight.
const archivo = Archivo({
    variable: "--font-display-brand",
    subsets: ["latin"],
    display: "swap",
    weight: ["500", "600", "700", "800"],
});

// Public Sans for body copy. Neutral, slightly narrower than Archivo, and
// designed for long reading at the 17px/1.62 the body is set in.
const publicSans = Public_Sans({
    variable: "--font-body-brand",
    subsets: ["latin"],
    display: "swap",
    weight: ["400", "500", "600"],
});

// JetBrains Mono for every uppercase micro-label — eyebrows, stat captions,
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
        default: "RG Tech Engineering | CNC Fiber Laser Cutting Specialist Chennai",
        // Full registered name in the suffix. Page titles should therefore stay
        // under ~33 characters to keep the whole thing inside Google's ~60
        // character display limit.
        template: "%s | RG Tech Engineering Works",
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
                alt: "RG Tech Engineering — CNC Fiber Laser Cutting Specialist Chennai",
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
    return (
        <html lang="en" className={`${archivo.variable} ${publicSans.variable} ${jetbrainsMono.variable} scroll-smooth`}>
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={jsonLdScript(siteGraph)}
                />
            </head>
            <body className="antialiased">
                <LayoutWrapper>{children}</LayoutWrapper>
            </body>
        </html>
    )
}
