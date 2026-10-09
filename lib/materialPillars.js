/*
 * The material category pillars, and where each one is actually routed.
 *
 * Exists so the four material pages can link to one another. Before this they
 * linked only to /contact, WhatsApp and themselves in other cities, so a buyer
 * comparing stainless against mild steel had to go back to the menu, and the
 * four pages passed no authority between them.
 *
 * `cities` is the load-bearing field. Aluminium, copper and mild steel are
 * wired in all four city catch-alls; stainless steel is wired in
 * app/chennai/[...slug] only. Rendering a link without checking this is what
 * put three 404s on the stainless page, so every consumer filters on it.
 *
 * Adding a pillar to another city means adding the slug here AND wiring the
 * resolver in that city's route - this list does not create pages.
 */

const ALL_CITIES = ['chennai', 'madurai', 'coimbatore', 'salem']

export const MATERIAL_PILLARS = [
    {
        slug: 'aluminum-laser-cutting-services',
        label: 'Aluminium laser cutting',
        cities: ALL_CITIES,
    },
    {
        slug: 'copper-laser-cutting-services',
        label: 'Copper laser cutting',
        cities: ALL_CITIES,
    },
    {
        slug: 'mild-steel-laser-cutting-services',
        label: 'Mild steel laser cutting',
        cities: ALL_CITIES,
    },
    {
        slug: 'stainless-steel-laser-cutting',
        label: 'Stainless steel laser cutting',
        cities: ['chennai'],
    },
]

/**
 * The other material pillars reachable from this city, excluding the current
 * one. Returns [] when there is nothing to show, so a caller can skip the
 * section rather than render an empty heading.
 *
 * @param {string} currentSlug the slug of the page doing the linking
 * @param {string} citySlug    the city being viewed
 */
export function otherMaterials(currentSlug, citySlug) {
    return MATERIAL_PILLARS.filter(
        (m) => m.slug !== currentSlug && m.cities.includes(citySlug)
    )
}
