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
        ]
    },
}

export default nextConfig
