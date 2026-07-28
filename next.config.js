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
}

export default nextConfig
