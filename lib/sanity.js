import { createClient } from '@sanity/client'
import { createImageUrlBuilder } from '@sanity/image-url'

export const SANITY_PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || ''
export const SANITY_DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const API_VERSION = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'

/** False until a project id is configured, so pages can fall back gracefully. */
export const isSanityConfigured = Boolean(SANITY_PROJECT_ID)

/*
 * The `production` dataset is PRIVATE, so anonymous reads return nothing — the
 * client must authenticate. SANITY_API_TOKEN has no NEXT_PUBLIC_ prefix, so
 * Next.js keeps it server-only and it is never bundled for the browser.
 *
 * This file must therefore only ever be imported from server components. If you
 * need Sanity data in a `"use client"` component, fetch it in a server parent
 * and pass it down as props — importing this there would break the build rather
 * than leak the token, but the intent is worth stating.
 *
 * Alternative: make the dataset public in sanity.io/manage and drop the token.
 * Not done here because a public dataset also makes unpublished drafts
 * world-readable.
 */
const READ_TOKEN = process.env.SANITY_API_TOKEN || ''

export const sanityClient = isSanityConfigured
    ? createClient({
        projectId: SANITY_PROJECT_ID,
        dataset: SANITY_DATASET,
        apiVersion: API_VERSION,
        ...(READ_TOKEN ? { token: READ_TOKEN } : {}),
        // The API CDN does not serve private datasets, and pages already cache
        // via ISR (revalidate = 3600), so live reads cost nothing extra here.
        useCdn: !READ_TOKEN,
        perspective: 'published',
    })
    : null

const builder = isSanityConfigured
    ? createImageUrlBuilder({ projectId: SANITY_PROJECT_ID, dataset: SANITY_DATASET })
    : null

/** Sanity asset -> URL. Returns '' when the ref is missing or Sanity is off. */
export function urlForImage(source, width = 1200) {
    if (!builder || !source?.asset) return ''
    return builder.image(source).width(width).auto('format').fit('max').url()
}

/*
 * Queries.
 *
 * Body images and author photos may live either in Sanity or on Cloudinary, so
 * every image field is fetched alongside its *Url twin and resolved at render.
 */

const POST_FIELDS = /* groq */ `
    _id,
    title,
    "slug": slug.current,
    summary,
    tldr,
    publishedAt,
    updatedAt,
    readTime,
    mainImageUrl,
    mainImageAlt,
    mainImage,
    bannerEyebrow,
    bannerHeading,
    bannerSubheading,
    bannerBadge,
    metaTitle,
    metaDescription,
    keywords,
    "author": author->{
        name,
        "slug": slug.current,
        role,
        bio,
        imageUrl,
        image,
        sameAs
    },
    "category": category->{ title, "slug": slug.current }
`

export const POSTS_QUERY = /* groq */ `
    *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
        ${POST_FIELDS}
    }
`

export const POST_BY_SLUG_QUERY = /* groq */ `
    *[_type == "post" && slug.current == $slug][0] {
        ${POST_FIELDS},
        body[]{
            ...,
            markDefs[]{ ... },
            _type == "contentImage" => { ..., asset-> }
        },
        faqs
    }
`

export const POST_SLUGS_QUERY = /* groq */ `
    *[_type == "post" && defined(slug.current)].slug.current
`

async function safeFetch(query, params = {}, fallback) {
    if (!sanityClient) return fallback
    try {
        return await sanityClient.fetch(query, params)
    } catch (err) {
        // A CMS outage should degrade the blog, never take the whole site down.
        console.error('[sanity] fetch failed:', err?.message || err)
        return fallback
    }
}

export async function getPosts() {
    return safeFetch(POSTS_QUERY, {}, [])
}

export async function getPostBySlug(slug) {
    return safeFetch(POST_BY_SLUG_QUERY, { slug }, null)
}

export async function getPostSlugs() {
    return safeFetch(POST_SLUGS_QUERY, {}, [])
}

/** Resolve a post/author image from either a Sanity asset or a plain URL. */
export function resolveImage(doc, urlField, imageField, width = 1200) {
    if (doc?.[urlField]) return doc[urlField]
    return urlForImage(doc?.[imageField], width)
}
