import { CHENNAI_LOCALITIES } from './data'
import publishedLocations from '../content/published-locations.json'

/*
 * Cities the site publishes service pages for.
 *
 * Chennai is the original market and its ~600 URLs are already indexed, so its
 * slug and locality list must not change — every /chennai/... URL that exists
 * today still resolves exactly as before.
 *
 * Madurai and Coimbatore hold the FULL locality list, but a locality page only
 * goes live once its slug appears in content/published-locations.json. The
 * pillar pages are live immediately; localities are released one per city per
 * day by the publishing cron. Everything unreleased 404s and stays out of the
 * sitemap, so Google never sees a page before it is meant to exist.
 */

export const MADURAI_LOCALITIES = [
    'Anna Nagar', 'K K Nagar', 'Villapuram', 'Thirunagar', 'Goripalayam',
    'Tallakulam', 'Simmakkal', 'Mattuthavani', 'Avaniyapuram', 'Sellur',
    'Ellis Nagar', 'Pasumalai', 'Vilangudi', 'Othakadai', 'Samayanallur',
    'Kochadai', 'Arappalayam', 'Chokkikulam', 'Narimedu', 'Melur',
    'Thiruparankundram', 'Palanganatham', 'Jaihindpuram', 'Kalavasal',
    'Arasaradi', 'Koodal Nagar', 'Yanaikkal', 'Nelpettai', 'East Gate',
    'South Gate', 'Bethaniapuram', 'Thathaneri', 'Madakulam', 'Karuppayurani',
    'Kadachanendhal', 'Nagamalai Puthukottai', 'Sundarajan Patti',
    'Sathamangalam', 'Iyer Bungalow', 'Thiruppalai', 'S S Colony',
    'Vaanamamalai Nagar', 'Anaiyur', 'Ponmeni', 'Uthangudi', 'Paravai',
    'Vadapalanji', 'Surveyor Colony', 'Alanganallur', 'Thirumangalam',
]

export const COIMBATORE_LOCALITIES = [
    'R S Puram', 'Gandhipuram', 'Peelamedu', 'Saibaba Colony', 'Singanallur',
    'Ganapathy', 'Ramanathapuram', 'Kuniyamuthur', 'Vadavalli', 'Thudiyalur',
    'Sundarapuram', 'Podanur', 'Ondipudur', 'Kalapatti', 'Saravanampatti',
    'Hopes College', 'Race Course', 'Ukkadam', 'Sitra', 'Kavundampalayam',
    'Koundampalayam', 'Vellakinar', 'G N Mills', 'Narasimhanaickenpalayam',
    'Sulur', 'Kovaipudur', 'Thondamuthur', 'Maniyakarampalayam',
    'Avarampalayam', 'Selvapuram', 'Kurichi', 'Chinniyampalayam', 'Neelambur',
    'Irugur', 'Vilankurichi', 'Thaneerpandal', 'Nava India', 'Town Hall',
    'Sivananda Colony', 'Tatabad', 'Ganeshapuram', 'Edayarpalayam', 'Perur',
    'Madukkarai', 'Karamadai', 'Annur', 'Kinathukadavu', 'Othakalmandapam',
    'Chettipalayam', 'Malumichampatti',
]

export const CITIES = {
    chennai: {
        slug: 'chennai',
        name: 'Chennai',
        region: 'Tamil Nadu',
        localities: CHENNAI_LOCALITIES,
        isPrimary: true,
        // Where the workshop actually is. Only Chennai gets "our facility"
        // language; the others are served from here.
        hasFacility: true,
        blurb: 'Our CNC fiber laser facility is in Ayanambakkam, Chennai.',
    },
    madurai: {
        slug: 'madurai',
        name: 'Madurai',
        region: 'Tamil Nadu',
        localities: MADURAI_LOCALITIES,
        isPrimary: false,
        hasFacility: false,
        blurb: 'Cut and fabricated at our Chennai facility and dispatched to Madurai.',
    },
    coimbatore: {
        slug: 'coimbatore',
        name: 'Coimbatore',
        region: 'Tamil Nadu',
        localities: COIMBATORE_LOCALITIES,
        isPrimary: false,
        hasFacility: false,
        blurb: 'Cut and fabricated at our Chennai facility and dispatched to Coimbatore.',
    },
}

export const CITY_SLUGS = Object.keys(CITIES)

export const getCity = (slug) => CITIES[String(slug || '').toLowerCase()] || null

export const localitySlug = (locality) =>
    String(locality).toLowerCase().replace(/\s+/g, '-')

/**
 * Localities with a LIVE page for this city.
 *
 * Chennai is grandfathered — all of its pages are already indexed. Everywhere
 * else is gated on content/published-locations.json so pages appear on the
 * schedule rather than all at once.
 */
export function publishedLocalities(citySlug) {
    const city = getCity(citySlug)
    if (!city) return []
    if (city.isPrimary) return city.localities

    const released = new Set(publishedLocations[city.slug] || [])
    return city.localities.filter((l) => released.has(localitySlug(l)))
}

/** Localities still waiting to be released, in publish order. */
export function pendingLocalities(citySlug) {
    const city = getCity(citySlug)
    if (!city || city.isPrimary) return []
    const released = new Set(publishedLocations[city.slug] || [])
    return city.localities.filter((l) => !released.has(localitySlug(l)))
}

export function isLocalityPublished(citySlug, locality) {
    const city = getCity(citySlug)
    if (!city) return false
    if (city.isPrimary) return true
    return (publishedLocations[city.slug] || []).includes(localitySlug(locality))
}

/**
 * Canonical path for a service page.
 *   serviceUrl('chennai', 'steel-gates')                -> /chennai/steel-gates
 *   serviceUrl('madurai', 'steel-gates', 'Anna Nagar')  -> /madurai/steel-gates-in-anna-nagar
 */
export function serviceUrl(citySlug, serviceKey, locality) {
    const base = `/${citySlug}/${serviceKey}`
    return locality ? `${base}-in-${localitySlug(locality)}` : base
}

/** The bare service key from a pillarServices entry, e.g. 'steel-gates'. */
export const serviceKeyOf = (service) => service.slug.split('/').pop()
