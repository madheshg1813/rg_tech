/**
 * Deity and sacred-symbol designs offered as laser-cut work.
 *
 * These are decorative metal panels — temple arches, pooja room screens, name
 * boards and wall art — not religious artefacts. Page copy stays on the
 * craft: material, thickness, finish, fixing. It makes no claim about ritual
 * suitability or religious authority, which is not ours to make.
 *
 * `group` drives the category page sections and the related-design links.
 */

export const GOD_GROUPS = [
    'Primary deities',
    'Amman & village deities',
    'Navagraha & planetary',
    'Saints & gurus',
    'Sacred symbols',
    'Temple & pooja room',
]

export const GODS = [
    { key: 'murugan', name: 'Murugan', group: 'Primary deities' },
    { key: 'vinayagar', name: 'Vinayagar', alsoKnownAs: 'Ganesha', group: 'Primary deities' },
    { key: 'shiva', name: 'Shiva', group: 'Primary deities' },
    { key: 'parvati', name: 'Parvati', group: 'Primary deities' },
    { key: 'lakshmi', name: 'Lakshmi', group: 'Primary deities' },
    { key: 'saraswati', name: 'Saraswati', group: 'Primary deities' },
    { key: 'durga', name: 'Durga', group: 'Primary deities' },
    { key: 'kaliamman', name: 'Kaliamman', group: 'Amman & village deities' },
    { key: 'meenakshi-amman', name: 'Meenakshi Amman', group: 'Amman & village deities' },
    { key: 'mariamman', name: 'Mariamman', group: 'Amman & village deities' },
    { key: 'karuppasamy', name: 'Karuppasamy', group: 'Amman & village deities' },
    { key: 'ayyanar', name: 'Ayyanar', group: 'Amman & village deities' },
    { key: 'madurai-veeran', name: 'Madurai Veeran', group: 'Amman & village deities' },
    { key: 'muneeswaran', name: 'Muneeswaran', group: 'Amman & village deities' },
    { key: 'ayyappa', name: 'Ayyappa', group: 'Primary deities' },
    { key: 'hanuman', name: 'Hanuman', group: 'Primary deities' },
    { key: 'rama', name: 'Rama', group: 'Primary deities' },
    { key: 'sita', name: 'Sita', group: 'Primary deities' },
    { key: 'krishna', name: 'Krishna', group: 'Primary deities' },
    { key: 'radha-krishna', name: 'Radha Krishna', group: 'Primary deities' },
    { key: 'perumal', name: 'Perumal', alsoKnownAs: 'Venkateswara', group: 'Primary deities' },
    { key: 'narasimha', name: 'Narasimha', group: 'Primary deities' },
    { key: 'hayagriva', name: 'Hayagriva', group: 'Primary deities' },
    { key: 'dhanvantari', name: 'Dhanvantari', group: 'Primary deities' },
    { key: 'ardhanarishvara', name: 'Ardhanarishvara', group: 'Primary deities' },
    { key: 'nataraja', name: 'Nataraja', group: 'Primary deities' },
    { key: 'dakshinamurthy', name: 'Dakshinamurthy', group: 'Primary deities' },
    { key: 'bhairava', name: 'Bhairava', group: 'Amman & village deities' },
    { key: 'navagraha', name: 'Navagraha', group: 'Navagraha & planetary' },
    { key: 'surya', name: 'Surya Bhagavan', group: 'Navagraha & planetary' },
    { key: 'chandra', name: 'Chandra Bhagavan', group: 'Navagraha & planetary' },
    { key: 'shani', name: 'Shani Bhagavan', group: 'Navagraha & planetary' },
    { key: 'rahu-ketu', name: 'Rahu Ketu', group: 'Navagraha & planetary' },
    { key: 'navadurga', name: 'Navadurga', group: 'Amman & village deities' },
    { key: 'mahalakshmi', name: 'Mahalakshmi', group: 'Amman & village deities' },
    { key: 'annapoorani', name: 'Annapoorani', group: 'Amman & village deities' },
    { key: 'andal', name: 'Andal', group: 'Amman & village deities' },
    { key: 'raghavendra-swamy', name: 'Raghavendra Swamy', group: 'Saints & gurus' },
    { key: 'sai-baba', name: 'Sai Baba', group: 'Saints & gurus' },
    { key: 'shirdi-sai-baba', name: 'Shirdi Sai Baba', group: 'Saints & gurus' },
    { key: 'sathya-sai-baba', name: 'Sathya Sai Baba', group: 'Saints & gurus' },
    { key: 'om-symbol', name: 'Om Symbol', group: 'Sacred symbols' },
    { key: 'vel-symbol', name: 'Vel Symbol', group: 'Sacred symbols' },
    { key: 'trishul', name: 'Trishul', group: 'Sacred symbols' },
    { key: 'swastik', name: 'Swastik', group: 'Sacred symbols' },
    { key: 'kalasam', name: 'Kalasam', group: 'Sacred symbols' },
    { key: 'temple-arch', name: 'Temple Arch', group: 'Temple & pooja room' },
    { key: 'temple-entrance-panel', name: 'Temple Entrance Panel', group: 'Temple & pooja room' },
    { key: 'pooja-room', name: 'Pooja Room', group: 'Temple & pooja room' },
    { key: 'hindu-temple-decoration', name: 'Hindu Temple Decoration', group: 'Temple & pooja room' },
]

export const getGod = (key) => GODS.find((g) => g.key === String(key || '').toLowerCase()) || null

/** Slug suffix shared by every deity page. */
export const GOD_SUFFIX = 'laser-cutting-services'

export const godUrl = (citySlug, key) => `/${citySlug}/${key}-${GOD_SUFFIX}`

/** Same group, excluding the current one — used for related-design links. */
export function relatedGods(key, limit = 6) {
    const god = getGod(key)
    if (!god) return []
    const sameGroup = GODS.filter((g) => g.group === god.group && g.key !== key)
    if (sameGroup.length >= limit) return sameGroup.slice(0, limit)
    const others = GODS.filter((g) => g.group !== god.group && g.key !== key)
    return [...sameGroup, ...others].slice(0, limit)
}
