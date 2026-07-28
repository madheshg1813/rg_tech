import { BASE_URL } from './data'

export const getRotationIndex = (name) => {
    if (!name) return 0
    let hash = 0
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash)
    }
    return Math.abs(hash)
}

export const localizeText = (text, cityName, cityIndex) => {
    if (!cityName || !text) return text
    const localPhrases = [
        `trusted in ${cityName}`,
        `serving the ${cityName} industrial belt`,
        `${cityName}'s preferred engineering hub`,
        `available across ${cityName}`
    ]
    const phrase = localPhrases[cityIndex % localPhrases.length]

    return text
        .replace(/Chennai/g, cityName)
        .replace(/industrial hub/g, phrase)
        .replace(/industrial region/g, `${cityName} manufacturing zone`)
        .replace(/engineering hub/g, `${cityName} technical center`)
}

/**
 * Prefix the site origin only when `src` is a relative path. Image paths may be
 * absolute Cloudinary URLs or local /public paths, and blindly concatenating
 * BASE_URL onto an absolute URL produces a broken
 * "https://example.comhttps://res.cloudinary.com/…" that silently breaks OG
 * tags and structured data.
 */
export const toAbsoluteUrl = (src) => {
    if (!src) return ''
    if (/^https?:\/\//i.test(src)) return src
    return `${BASE_URL}${src.startsWith('/') ? '' : '/'}${src}`
}

/**
 * The FAQ list a service page shows: rotated per city so nearby localities do
 * not render identical content, then localised.
 *
 * This lives here rather than inside the component because the server needs the
 * identical list to build FAQPage markup. Two copies of this logic would drift,
 * and drifting FAQ markup is a structured-data violation.
 */
export const resolveFaqs = (content, cityName, cityIndex) => {
    const source = content?.faqs || []
    if (!source.length) return []

    // Rotated per city so neighbouring locality pages do not open with the same
    // question, but the full set of 8 is kept so the 2 x 4 grid stays complete.
    const list = cityName
        ? [
            ...source.slice(cityIndex % source.length),
            ...source.slice(0, cityIndex % source.length),
        ].slice(0, 8)
        : source.slice(0, 8)

    return list.map((faq) => ({
        q: localizeText(faq.q, cityName, cityIndex),
        a: localizeText(faq.a, cityName, cityIndex),
    }))
}

/* ------------------------------------------------------------------ alt text */

const BRAND = 'RG Tech Engineering'

/**
 * Strip the boilerplate that appears in every page title so the remaining words
 * can be reused as image keywords without repeating the brand twice.
 *   "Top-Rated Steel Gates in Porur | RG Tech Engineering" -> "Steel Gates in Porur"
 */
function titleKeywords(metaTitle) {
    if (!metaTitle) return ''
    return metaTitle
        .split('|')[0]
        .replace(/\b(Best|Top-Rated|Top Rated|Leading|Premium)\b/gi, '')
        .replace(/\bRG Tech Engineering(?: Works)?\b/gi, '')
        .replace(/\s{2,}/g, ' ')
        .replace(/\s*[–—-]\s*$/, '')
        .trim()
}

/**
 * Build a descriptive, keyword-bearing alt attribute from the page's meta title.
 *
 * Alt text exists for screen readers first and search engines second, so this
 * produces a readable phrase — not a keyword list. Each alt stays unique by
 * folding in the subject of the individual image.
 *
 * @param {object}  opts
 * @param {string}  opts.metaTitle  the page's meta title (keyword source)
 * @param {string} [opts.subject]   what this specific image shows
 * @param {string} [opts.location]  city / locality, defaults to Chennai
 * @param {number} [opts.index]     1-based position, for otherwise identical images
 */
export function buildAlt({ metaTitle, subject, location = 'Chennai', index } = {}) {
    const keywords = titleKeywords(metaTitle)
    const parts = []

    if (subject) parts.push(subject)
    if (keywords && keywords.toLowerCase() !== String(subject).toLowerCase()) {
        parts.push(keywords)
    }

    let alt = parts.join(' — ') || keywords || BRAND

    if (location && !new RegExp(location, 'i').test(alt)) alt += ` in ${location}`
    if (!/RG Tech/i.test(alt)) alt += ` | ${BRAND}`
    if (index) alt = alt.replace(' | ', ` (design ${index}) | `)

    // Keep within the ~125 character range screen readers handle comfortably.
    return alt.length > 125 ? `${alt.slice(0, 122).trimEnd()}…` : alt
}

/**
 * Alt text for a gallery item.
 *
 * The stored titles are filename-derived ("Rg Tech Catelog Vol 01 Page 10"),
 * which tells a screen-reader user nothing and carries no search value, so the
 * category becomes the subject instead. The index keeps each of the 653 alts
 * unique without inventing detail about images we cannot inspect.
 */
export function galleryAlt(item, index) {
    if (!item) return BRAND

    const category = (item.filter || 'Laser cut metalwork').replace(/\s+Services$/i, '')

    // Avoid saying "laser cutting" twice when the category already includes it.
    const mentionsLaser = /laser/i.test(category)
    const descriptor = mentionsLaser
        ? 'precision metal fabrication'
        : 'precision laser cut metalwork'

    const position = index ? ` design ${index}` : ''

    return `${category}${position} — ${descriptor} in Chennai | ${BRAND}`
}
