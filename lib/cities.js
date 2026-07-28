import { CHENNAI_LOCALITIES } from './data'

/*
 * Cities the site publishes service pages for.
 *
 * Chennai is the original and its URLs are already indexed, so its slug and
 * locality list must not change — every /chennai/... URL that exists today
 * still resolves exactly as before.
 *
 * Madurai and Coimbatore are new. Their locality lists start deliberately small:
 * pages publish one per day, and a locality only earns a page once it is worth
 * having one.
 */

export const MADURAI_LOCALITIES = [
    'Anna Nagar', 'K K Nagar', 'Villapuram', 'Thirunagar', 'Goripalayam',
    'Tallakulam', 'Simmakkal', 'Mattuthavani', 'Avaniyapuram', 'Sellur',
    'Ellis Nagar', 'Pasumalai', 'Vilangudi', 'Othakadai', 'Samayanallur',
    'Kochadai', 'Arappalayam', 'Chokkikulam', 'Narimedu', 'Melur',
]

export const COIMBATORE_LOCALITIES = [
    'R S Puram', 'Gandhipuram', 'Peelamedu', 'Saibaba Colony', 'Singanallur',
    'Ganapathy', 'Ramanathapuram', 'Kuniyamuthur', 'Vadavalli', 'Thudiyalur',
    'Sundarapuram', 'Podanur', 'Ondipudur', 'Kalapatti', 'Saravanampatti',
    'Hopes College', 'Race Course', 'Ukkadam', 'Sitra', 'Kavundampalayam',
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
 * Canonical path for a service page.
 *   serviceUrl('chennai', 'steel-gates')            -> /chennai/steel-gates
 *   serviceUrl('madurai', 'steel-gates', 'Anna Nagar') -> /madurai/steel-gates-in-anna-nagar
 */
export function serviceUrl(citySlug, serviceKey, locality) {
    const base = `/${citySlug}/${serviceKey}`
    return locality ? `${base}-in-${localitySlug(locality)}` : base
}

/** The bare service key from a pillarServices entry, e.g. 'steel-gates'. */
export const serviceKeyOf = (service) => service.slug.split('/').pop()
