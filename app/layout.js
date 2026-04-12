import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";

const inter = Inter({ variable: "--font-sans", subsets: ["latin"] });
const outfit = Outfit({ variable: "--font-heading", subsets: ["latin"] });

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

// LocalBusiness + WebSite schemas injected globally
const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${BASE}/#organization`,
    "name": "RG Tech Engineering Works",
    "url": BASE,
    "logo": `${BASE}/RG-Tech-Logo.png`,
    "image": `${BASE}/gallery/Sheet%20Metal%20Laser%20Cutting/sm_12.jpg`,
    "description": "CNC Fiber Laser Cutting, Sheet Metal Fabrication, Steel Gates, Safety Doors and Decorative Metal Panels in Chennai.",
    "telephone": "+916380736439",
    "email": "rgtechengineeringworks@gmail.com",
    "address": {
        "@type": "PostalAddress",
        "addressLocality": "Chennai",
        "addressRegion": "Tamil Nadu",
        "addressCountry": "IN"
    },
    "geo": {
        "@type": "GeoCoordinates",
        "latitude": 13.0827,
        "longitude": 80.2707
    },
    "openingHoursSpecification": [
        {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
            "opens": "09:00",
            "closes": "18:00"
        }
    ],
    "sameAs": [
        "https://www.rgtechengineeringworks.com"
    ],
    "priceRange": "$$",
    "areaServed": {
        "@type": "City",
        "name": "Chennai"
    }
}

const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "RG Tech Engineering Works",
    "url": BASE,
    "potentialAction": {
        "@type": "SearchAction",
        "target": {
            "@type": "EntryPoint",
            "urlTemplate": `${BASE}/chennai/{search_term_string}`
        },
        "query-input": "required name=search_term_string"
    }
}

export default function RootLayout({ children }) {
    return (
        <html lang="en" className="scroll-smooth">
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
                />
            </head>
            <body className={`${inter.variable} ${outfit.variable} antialiased`}>
                <LayoutWrapper>{children}</LayoutWrapper>
            </body>
        </html>
    )
}
