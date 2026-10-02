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
    // Hindu
    'Primary deities',
    'Amman & village deities',
    'Navagraha & planetary',
    'Saints & gurus',
    'Sacred symbols',
    'Temple & pooja room',
    // Christian
    'Christian devotional',
    'Christian symbols',
    'Church & chapel',
    // Islamic
    'Islamic geometric',
    'Mosque & architecture',
    'Islamic symbols',
]

/**
 * The three faiths the catalogue covers, in the order they are listed.
 *
 * `figurative` is not presentational — it is the rule the image generator
 * reads. Islamic sacred art does not depict Allah, the Prophet, or any human
 * or animal form, so nothing under that faith may carry a figure. See the
 * guard in scripts/generate-god-designs.mjs.
 */
export const FAITHS = [
    {
        slug: 'hindu',
        label: 'Hindu',
        figurative: true,
        title: 'Hindu God & Deity Laser Cut Panel Designs',
        lead:
            'Deity, amman, navagraha and sacred symbol panels for pooja rooms, main ' +
            'gates and temple arches.',
    },
    {
        slug: 'christian',
        label: 'Christian',
        figurative: true,
        title: 'Christian Laser Cut Panel Designs',
        lead:
            'Jesus, Mother Mary, Velankanni, Holy Cross and church arch panels for ' +
            'prayer rooms, gates and chapel walls.',
    },
    {
        slug: 'islamic',
        label: 'Islamic',
        figurative: false,
        title: 'Islamic Laser Cut Panel Designs',
        lead:
            'Geometric jali, arabesque, mihrab arch and masjid panels for prayer ' +
            'rooms, gates and partition screens. Pattern and architecture only.',
    },
]

export const FAITH_SLUGS = FAITHS.map((f) => f.slug)
export const getFaith = (slug) => FAITHS.find((f) => f.slug === slug) || null

const RAW_GODS = [
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

    // ── Christian ───────────────────────────────────────────────────────────
    // Figurative imagery is ordinary in Tamil Catholic practice, so these use
    // the same depict-the-subject prompt path as the Hindu set. They are NOT
    // 'deity' though: calling Mary or a saint a deity is wrong in Christian
    // terms, which is why lib/godDesignSeeds.js gives them kind 'figure'.
    { key: 'jesus-christ', name: 'Jesus Christ', faith: 'christian', group: 'Christian devotional' },
    { key: 'sacred-heart', name: 'Sacred Heart of Jesus', faith: 'christian', group: 'Christian devotional' },
    { key: 'mother-mary', name: 'Mother Mary', faith: 'christian', group: 'Christian devotional' },
    { key: 'velankanni-matha', name: 'Our Lady of Velankanni', faith: 'christian', group: 'Christian devotional' },
    { key: 'holy-family', name: 'Holy Family', faith: 'christian', group: 'Christian devotional' },
    { key: 'last-supper', name: 'Last Supper', faith: 'christian', group: 'Christian devotional' },
    { key: 'st-antony', name: 'St. Antony', faith: 'christian', group: 'Christian devotional' },
    { key: 'holy-cross', name: 'Holy Cross', faith: 'christian', group: 'Christian symbols' },
    { key: 'holy-spirit-dove', name: 'Holy Spirit Dove', faith: 'christian', group: 'Christian symbols' },
    { key: 'church-arch', name: 'Church Arch Panel', faith: 'christian', group: 'Church & chapel' },

    // ── Islamic ─────────────────────────────────────────────────────────────
    // Pattern and architecture only — no figures, and no Arabic calligraphy.
    // Calligraphy is deliberately absent: an image model renders Arabic script
    // as malformed letterforms, and a mangled Quranic verse cut into steel is
    // not a quality problem, it is an offensive one. Those panels wait for
    // real vector calligraphy.
    { key: 'islamic-geometric-jali', name: 'Islamic Geometric Jali', faith: 'islamic', group: 'Islamic geometric' },
    { key: 'arabesque-panel', name: 'Arabesque Panel', faith: 'islamic', group: 'Islamic geometric' },
    { key: 'moroccan-screen', name: 'Moroccan Screen', faith: 'islamic', group: 'Islamic geometric' },
    { key: 'mihrab-arch', name: 'Mihrab Arch', faith: 'islamic', group: 'Mosque & architecture' },
    { key: 'masjid-silhouette', name: 'Masjid Silhouette', faith: 'islamic', group: 'Mosque & architecture' },
    { key: 'kaaba-silhouette', name: 'Kaaba Silhouette', faith: 'islamic', group: 'Mosque & architecture' },
    { key: 'star-and-crescent', name: 'Star & Crescent', faith: 'islamic', group: 'Islamic symbols' },
    { key: 'ramadan-eid-panel', name: 'Ramadan & Eid Panel', faith: 'islamic', group: 'Islamic symbols' },
]

/*
 * `faith` defaults rather than being written on all fifty Hindu rows — those
 * rows predate the other two faiths and rewriting every one of them to say
 * what was already implied is churn in a file people read.
 */
export const GODS = RAW_GODS.map((g) => ({ faith: 'hindu', ...g }))

/** Group names that actually carry subjects for a faith, in GOD_GROUPS order. */
export const groupsForFaith = (faith) =>
    GOD_GROUPS.filter((group) => GODS.some((g) => g.faith === faith && g.group === group))

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
