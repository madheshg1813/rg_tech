import { Suspense } from 'react'
import GalleryClient from '@/components/Gallery/GalleryClient'

const BASE = "https://www.rgtechengineeringworks.com"

export const metadata = {
    // Brand removed: the layout template already appends it.
    title: 'Laser Cutting & Metal Design Portfolio',
    description: 'Laser cutting and metal fabrication projects from our Chennai unit - CNC jali patterns, steel gates, safety doors and decorative panels.',
    alternates: {
        canonical: '/gallery',
    },
    openGraph: {
        title: 'Metal Design & Laser Cutting Portfolio | RG Tech Engineering',
        description: 'Browse 150+ precision laser cutting and metal fabrication projects from RG Tech Engineering, Chennai.',
        url: `${BASE}/gallery`,
        type: 'website',
        images: [
            {
                url: `${BASE}/og?title=Our+Design+Portfolio&sub=Precision+Laser+Cutting+%26+Metal+Fabrication+Projects`,
                width: 1200,
                height: 630,
                alt: 'RG Tech Engineering - Metal Design & Laser Cutting Portfolio',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Metal Design & Laser Cutting Portfolio | RG Tech Engineering',
        description: 'Browse 150+ precision laser cutting and metal fabrication projects from RG Tech Engineering, Chennai.',
        images: [`${BASE}/og?title=Our+Design+Portfolio&sub=Precision+Laser+Cutting+%26+Metal+Fabrication+Projects`],
    },
}

export default function GalleryPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-white" />}>
            <GalleryClient />
        </Suspense>
    )
}
