#!/usr/bin/env node
/**
 * Rewrites local /public image paths in the source to Cloudinary delivery URLs,
 * using lib/cloudinaryManifest.json produced by upload-to-cloudinary.mjs.
 *
 * Run this AFTER the upload. It edits source files in place, so commit first.
 *
 * Usage:
 *   node scripts/rewrite-image-paths.mjs --dry-run   # report only
 *   node scripts/rewrite-image-paths.mjs             # apply
 *
 * Why rewrite the source rather than resolve at runtime: the 653-entry manifest
 * would otherwise have to ship inside the client bundle for the gallery. Baking
 * the URLs in keeps that ~90 KB of JSON out of the browser payload entirely.
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { join, dirname, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const MANIFEST_PATH = join(ROOT, 'lib', 'cloudinaryManifest.json')
const DRY_RUN = process.argv.includes('--dry-run')

const TARGETS = [
    'lib/galleryData.js',
    'lib/data.js',
    'app/layout.js',
    'app/page.js',
    'app/blog/page.js',
    'app/blog/[slug]/page.js',
    'app/chennai/[...slug]/page.js',
    'components/Header.jsx',
    'components/Footer.jsx',
    'components/CatalogueModal.jsx',
    'components/Home/Hero.jsx',
    'components/Gallery/GalleryClient.jsx',
    'components/Service/ServiceClient.jsx',
    'components/Admin/AdminClient.jsx',
]

function loadEnv() {
    const file = join(ROOT, '.env.local')
    if (!existsSync(file)) return
    for (const line of readFileSync(file, 'utf8').split('\n')) {
        const t = line.trim()
        if (!t || t.startsWith('#')) continue
        const eq = t.indexOf('=')
        if (eq === -1) continue
        const k = t.slice(0, eq).trim()
        if (!process.env[k]) process.env[k] = t.slice(eq + 1).trim()
    }
}
loadEnv()

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
if (!CLOUD_NAME) {
    console.error('✖ NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME is not set in .env.local')
    process.exit(1)
}
if (!existsSync(MANIFEST_PATH)) {
    console.error('✖ lib/cloudinaryManifest.json not found — run the upload script first.')
    process.exit(1)
}

const manifest = JSON.parse(readFileSync(MANIFEST_PATH, 'utf8'))
const entries = Object.entries(manifest)
if (!entries.length) {
    console.error('✖ Manifest is empty — run the upload script first.')
    process.exit(1)
}

const BASE = `https://res.cloudinary.com/${CLOUD_NAME}`

function deliveryUrl(entry) {
    if (entry.resourceType === 'raw') {
        return `${BASE}/raw/upload/v${entry.version}/${entry.publicId}`
    }
    // No transformation baked in — the next/image loader injects w_/q_/f_auto
    // per srcset entry at render time.
    return `${BASE}/image/upload/v${entry.version}/${entry.publicId}`
}

/**
 * Build the replacement table. Each local path is matched in both its raw and
 * percent-encoded forms, longest first so nested paths can't be partly matched.
 */
const replacements = []
for (const [localPath, entry] of entries) {
    const url = deliveryUrl(entry)
    replacements.push([localPath, url])
    const encoded = localPath.split('/').map(encodeURIComponent).join('/')
    if (encoded !== localPath) replacements.push([encoded, url])
    // Also match the `%20`-only form the codebase uses in places.
    const spaceEncoded = localPath.replace(/ /g, '%20')
    if (spaceEncoded !== localPath && spaceEncoded !== encoded) {
        replacements.push([spaceEncoded, url])
    }
}
replacements.sort((a, b) => b[0].length - a[0].length)

let filesChanged = 0
let totalHits = 0

for (const rel of TARGETS) {
    const abs = join(ROOT, rel)
    if (!existsSync(abs)) continue

    const original = readFileSync(abs, 'utf8')
    let updated = original
    let hits = 0

    for (const [from, to] of replacements) {
        if (!updated.includes(from)) continue
        const parts = updated.split(from)
        hits += parts.length - 1
        updated = parts.join(to)
    }

    // Some paths are written as `${BASE}/gallery/x.jpg` to build an absolute URL
    // for schema.org / OG tags. Substituting the path leaves the now-redundant
    // origin glued to the front (`...comhttps://res.cloudinary.com/...`), so
    // strip any template prefix sitting directly before a Cloudinary URL.
    const before = updated
    updated = updated.replace(
        /\$\{(?:BASE|BASE_URL)\}(https:\/\/res\.cloudinary\.com)/g,
        '$1'
    )
    if (updated !== before) {
        console.log(`  ${rel}: stripped redundant \${BASE} prefix(es)`)
    }

    if (hits || updated !== original) {
        totalHits += hits
        filesChanged++
        console.log(`  ${rel}: ${hits} path${hits === 1 ? '' : 's'}`)
        if (!DRY_RUN) writeFileSync(abs, updated)
    }
}

console.log(
    `\n${DRY_RUN ? '(dry run) ' : ''}${totalHits} path${totalHits === 1 ? '' : 's'} in ${filesChanged} file${filesChanged === 1 ? '' : 's'}` +
    ` rewritten to ${BASE}\n`
)

if (!DRY_RUN && totalHits) {
    console.log('Next: `npm run build` to verify, then commit.')
    console.log('Once verified you can delete public/gallery and public/catalogues.\n')
}
