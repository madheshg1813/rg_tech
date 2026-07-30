import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";
import {
    organizationSchema,
    webSiteSchema,
    jsonLdGraph,
    jsonLdScript,
} from "@/lib/schema";

// Single self-hosted family for the whole site. next/font inlines the @font-face
// rules at build time, so there is no render-blocking request to Google Fonts.
//
// Plus Jakarta Sans rather than Inter: its wider apertures and geometric round
// forms hold up at display sizes, which is what the headline-led layout needs.
// 900 is not loaded — the type scale tops out at 800 (see globals.css).
const jakarta = Plus_Jakarta_Sans({
    variable: "--font-sans-brand",
    subsets: ["latin"],
    display: "swap",
    weight: ["400", "500", "600", "700", "800"],
});

const BASE = "https://www.rgtechengineeringworks.com"

export const metadata = {
    title: {
        default: "RG Tech Engineering | CNC Fiber Laser Cutting Specialist Chennai",
        template: "%s | RG Tech Engineering",
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
        <html lang="en" className={`${jakarta.variable} scroll-smooth`}>
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
