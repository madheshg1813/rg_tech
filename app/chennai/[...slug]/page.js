import { notFound } from 'next/navigation'
import ServiceClient from '@/components/Service/ServiceClient'
import { pillarServices } from '@/lib/data'
import { getRotationIndex, localizeText } from '@/lib/utils'

export async function generateMetadata({ params }) {
    const slug = await params.slug
    const { content, cityName } = resolveService(slug)

    if (!content) return {}

    const displayMetaTitle = cityName 
        ? `Top-Rated ${content.name} in ${cityName} | RG Tech Engineering` 
        : content.metaTitle
    
    const displayMetaDesc = cityName 
        ? `Looking for high-precision ${content.name.toLowerCase()} in ${cityName}, Chennai? RG Tech Engineering provides premium industrial metal solutions with fast 24h response. Get a free quote today.` 
        : content.metaDescription

    return {
        title: displayMetaTitle,
        description: displayMetaDesc,
        alternates: {
            canonical: `/chennai/${slug.join('/')}`,
        }
    }
}

function resolveService(slugArray) {
    // slugArray could be ['laser-cutting-services'] or ['laser-cutting-services', 'anna-nagar']
    // handle legacy: ['laser-cutting-in-anna-nagar']
    
    let serviceSlug = ''
    let cityPart = ''
    
    if (slugArray.length === 1) {
        const fullSlugPart = slugArray[0]
        if (fullSlugPart.includes('-in-')) {
            serviceSlug = fullSlugPart.substring(0, fullSlugPart.lastIndexOf('-in-'))
            cityPart = fullSlugPart.substring(fullSlugPart.lastIndexOf('-in-') + 4)
        } else {
            serviceSlug = fullSlugPart
        }
    } else if (slugArray.length >= 2) {
        serviceSlug = slugArray[0]
        cityPart = slugArray[1]
    }

    const content = pillarServices.find(s => s.slug.split('/').pop() === serviceSlug)
    
    let cityName = null
    if (cityPart) {
        cityName = cityPart.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    }

    return { content, cityName }
}

export default async function Page({ params }) {
    const slug = await params.slug
    const { content, cityName } = resolveService(slug)

    if (!content) {
        notFound()
    }

    const cityIndex = getRotationIndex(cityName)

    return (
        <ServiceClient 
            content={content} 
            cityName={cityName} 
            cityIndex={cityIndex}
            pathName={`/chennai/${slug.join('/')}`} 
        />
    )
}
