import Image from 'next/image'

/*
 * Third-party brand marks, in one place so the hero pills and the "Listed,
 * Reviewed and Reachable" cards cannot drift apart.
 *
 * Both are decorative: every place that uses them already names the platform in
 * adjacent text, so both are aria-hidden and a screen reader hears the label
 * once rather than twice.
 */

/**
 * Google's four-colour G, inline rather than a file.
 *
 * Small, unchanging, and an <img> here would be a network round trip on the
 * critical path for a couple of kilobytes of logo.
 */
export function GoogleMark({ className = 'w-6 h-6' }) {
    return (
        <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
            <path
                fill="#4285F4"
                d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84a10.1 10.1 0 0 1-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"
            />
            <path
                fill="#34A853"
                d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7A21.99 21.99 0 0 0 24 46z"
            />
            <path
                fill="#FBBC05"
                d="M11.69 28.18A13.2 13.2 0 0 1 11 24c0-1.45.25-2.86.69-4.18v-5.7H4.34A21.99 21.99 0 0 0 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z"
            />
            <path
                fill="#EA4335"
                d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"
            />
        </svg>
    )
}

/**
 * The Justdial wordmark, served from public/ rather than hotlinked.
 *
 * Their own CDN would put a third-party request on the critical path and break
 * wherever this appears the day they move the file.
 *
 * The file is generated, not the raw download: scripts/prepare-logo.mjs trims
 * the padded square canvas and lifts the white background to transparency.
 * Without that pass the stock 600x600 download renders as a white block with a
 * four-pixel wordmark adrift in the middle of it.
 *
 * width/height are the generated file's intrinsics (540x139) so next/image
 * reserves the right box before it loads; `className` is what sizes it. Re-run
 * the script if the source is ever replaced, and update these two numbers.
 */
export function JustdialMark({ className = 'h-[18px] w-auto' }) {
    return (
        <Image
            src="/ai-logos/justdial.png"
            alt=""
            aria-hidden="true"
            width={540}
            height={139}
            sizes="80px"
            className={className}
        />
    )
}
