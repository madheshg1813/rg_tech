import { Suspense } from 'react'
import GalleryClient from '@/components/Gallery/GalleryClient'

export const metadata = {
    title: 'Metal Design & Laser Cutting Portfolio | RG Tech Engineering',
    description: 'Explore our library of laser cutting and metal fabrication projects in Chennai. Designs include industrial parts, CNC jali patterns, steel gates, and safety doors.',
    alternates: {
        canonical: '/gallery',
    },
    openGraph: {
        title: 'Metal Design & Laser Cutting Portfolio | RG Tech Engineering',
        description: 'Explore our library of laser cutting and metal fabrication projects in Chennai.',
        url: '/gallery',
        type: 'website',
    }
}

export default function GalleryPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-white" />}>
            <GalleryClient />
        </Suspense>
    )
}
