import Image from 'next/image'

/**
 * Client avatar.
 *
 * Renders a real photograph when one is supplied, otherwise falls back to the
 * person's initials on a deterministic brand-tinted background. Initials are
 * used deliberately rather than stock or generated faces, so the site never
 * shows an invented person as a named customer.
 */

// Brand-derived palette, all dark enough for white initials (>= 4.5:1).
const TONES = [
    { bg: '#16224F', fg: '#FFFFFF' }, // brand indigo
    { bg: '#0A3F2E', fg: '#FFFFFF' }, // brand green, darkened
    { bg: '#241C63', fg: '#FFFFFF' }, // deep indigo
    { bg: '#8A3B12', fg: '#FFFFFF' }, // amber, darkened for contrast
    { bg: '#123A52', fg: '#FFFFFF' }, // steel blue
]

function initialsOf(name) {
    return String(name || '?')
        .trim()
        .split(/\s+/)
        .map((w) => w[0])
        .filter(Boolean)
        .slice(0, 2)
        .join('')
        .toUpperCase()
}

/** Same name always gets the same colour, so avatars stay stable across renders. */
function toneFor(name) {
    let hash = 0
    for (let i = 0; i < String(name).length; i++) {
        hash = String(name).charCodeAt(i) + ((hash << 5) - hash)
    }
    return TONES[Math.abs(hash) % TONES.length]
}

export default function Avatar({ name, image, size = 48, className = '' }) {
    const px = `${size}px`

    if (image) {
        return (
            <Image
                src={image}
                alt={`${name} — RG Tech Engineering client`}
                width={size}
                height={size}
                sizes={px}
                className={`rounded-full object-cover ${className}`}
                style={{ width: px, height: px }}
            />
        )
    }

    const tone = toneFor(name)
    return (
        <span
            aria-hidden="true"
            className={`inline-flex items-center justify-center rounded-full font-bold select-none ${className}`}
            style={{
                width: px,
                height: px,
                backgroundColor: tone.bg,
                color: tone.fg,
                fontSize: `${Math.round(size * 0.36)}px`,
                letterSpacing: '0.02em',
            }}
        >
            {initialsOf(name)}
        </span>
    )
}
