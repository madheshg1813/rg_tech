import { readFileSync, readdirSync, existsSync } from 'node:fs'

/**
 * The city deity pages, redirected to their design gallery.
 *
 * /{city}/{god}-laser-cutting-services was four near-identical pages per
 * deity — 200 in all — separated only by a city name. They now point at the
 * one gallery that actually shows the panels, or at the home page for a deity
 * whose gallery is not published yet.
 *
 * Built from lib/gods.js and lib/cities.js at config load rather than written
 * out by hand, so adding a deity or a city cannot leave a stale 200-row list
 * behind. Read as text because next.config.js is loaded outside the app, where
 * the '@/lib' alias does not resolve and lib/cities.js imports lib/data.
 *
 * Whether a gallery exists is decided by what is on disk in
 * public/gallery/gods/<slug>, which is the same thing that decides whether the
 * page is indexable — so a redirect can never point at a "coming soon" page.
 * Publishing a gallery changes its redirect on the next build with no edit here.
 */
function cityDeityRedirects() {
    const citySrc = readFileSync('./lib/cities.js', 'utf8')
    const cities = [...citySrc.matchAll(/slug:\s*'([a-z-]+)'/g)].map((m) => m[1])

    const godSrc = readFileSync('./lib/gods.js', 'utf8')
    const block = godSrc.match(/export const GODS = \[([\s\S]*?)\]/)[1]
    const keys = [...block.matchAll(/key:\s*'([^']+)'/g)].map((m) => m[1])

    const isPanel = (f) => /\.(jpg|jpeg|png|webp)$/i.test(f) && !/-thumb\./i.test(f)

    // Ganesh is the one gallery whose folder is not named after its god key.
    const gallerySlug = (key) => {
        const slug = key === 'vinayagar' ? 'ganesh' : key
        const dir = `./public/gallery/gods/${slug}`
        if (!existsSync(dir)) return null
        return readdirSync(dir).some(isPanel) ? slug : null
    }

    const rules = []
    for (const key of keys) {
        const slug = gallerySlug(key)
        const destination = slug ? `/designs/gods/${slug}` : '/'
        for (const city of cities) {
            rules.push({
                source: `/${city}/${key}-laser-cutting-services`,
                destination,
                permanent: true,
            })
        }
    }
    return rules
}

/** @type {import('next').NextConfig} */

// When a Cloudinary cloud name is configured we hand all image resizing to the
// Cloudinary CDN via a custom loader. Without it, Next's own optimiser stays in
// place so local /public images still work.
const hasCloudinary = Boolean(process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME)

const nextConfig = {
    reactStrictMode: true,
    images: {
        ...(hasCloudinary
            ? { loader: 'custom', loaderFile: './lib/cloudinaryLoader.js' }
            : {}),
        formats: ['image/avif', 'image/webp'],
        // Trim the default set to the breakpoints the layouts actually use, so
        // fewer derived variants get generated.
        deviceSizes: [400, 640, 828, 1080, 1280, 1920],
        imageSizes: [96, 160, 256, 384, 600],
        minimumCacheTTL: 60 * 60 * 24 * 365,
        remotePatterns: [
            { protocol: 'https', hostname: 'res.cloudinary.com' },
            { protocol: 'https', hostname: 'images.unsplash.com' },
            { protocol: 'https', hostname: 'www.rgtechengineeringworks.com' },
            { protocol: 'https', hostname: 'script.google.com' },
        ],
    },
    // Ship smaller client bundles by tree-shaking the icon set per-import.
    experimental: {
        optimizePackageImports: ['lucide-react'],
    },

    /*
     * Canonical host: apex → www.
     *
     * Note this emits 308, not the 301 the netlify.toml rule used — `permanent:
     * true` in Next means 308. Both are permanent redirects and Google treats
     * them the same for canonicalisation, so link equity is unaffected.
     *
     * This lived in netlify.toml as a CDN-level force redirect. Platforms that
     * run the app as a plain Node server (Railway) have no equivalent, so it has
     * to happen in the app. Kept host-scoped rather than blanket, so
     * localhost:3000 and any *.up.railway.app preview URL are untouched.
     *
     * Harmless while still on Netlify: the CDN rule fires first at the edge, so
     * this never gets a chance to run there. Safe to keep after cutover.
     */
    async redirects() {
        return [
            {
                source: '/:path*',
                has: [{ type: 'host', value: 'rgtechengineeringworks.com' }],
                destination: 'https://www.rgtechengineeringworks.com/:path*',
                permanent: true,
            },
            /*
             * The catalogues moved out of /public into object storage. The old
             * paths must not be left to the static handler: public/catalogues
             * still contains the Git LFS pointer files, and a host that clones
             * without fetching LFS serves those 132-byte text files with
             * Content-Type: application/pdf — a bookmark or a cached link would
             * download a corrupt PDF rather than fail.
             *
             * redirects() is evaluated before filesystem routes, so this wins
             * over the pointer files.
             */
            {
                source: '/catalogues/:file',
                destination: '/api/catalogue/:file',
                permanent: true,
            },
            ...cityDeityRedirects(),
        ]
    },
}

export default nextConfig
