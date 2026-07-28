#!/usr/bin/env node
/**
 * Uploads every local image to Cloudinary and writes
 * lib/cloudinaryManifest.json — a map of local public path -> Cloudinary public id.
 *
 * The site reads that manifest through lib/cloudinary.js, so once this has run
 * the app serves images from the Cloudinary CDN instead of the origin.
 *
 * Usage:
 *   node scripts/upload-to-cloudinary.mjs            # upload everything missing
 *   node scripts/upload-to-cloudinary.mjs --dry-run  # list what would happen
 *   node scripts/upload-to-cloudinary.mjs --force    # re-upload even if present
 *
 * Safe to re-run: already-uploaded files are skipped unless --force is passed.
 */

import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from 'node:fs'
import { join, relative, extname, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { v2 as cloudinary } from 'cloudinary'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const PUBLIC_DIR = join(ROOT, 'public')
const MANIFEST_PATH = join(ROOT, 'lib', 'cloudinaryManifest.json')

const DRY_RUN = process.argv.includes('--dry-run')
const FORCE = process.argv.includes('--force')

/* ------------------------------------------------------------------ config */

// Minimal .env.local reader so the script needs no extra dependency.
function loadEnv() {
    const file = join(ROOT, '.env.local')
    if (!existsSync(file)) return
    for (const line of readFileSync(file, 'utf8').split('\n')) {
        const trimmed = line.trim()
        if (!trimmed || trimmed.startsWith('#')) continue
        const eq = trimmed.indexOf('=')
        if (eq === -1) continue
        const key = trimmed.slice(0, eq).trim()
        const value = trimmed.slice(eq + 1).trim()
        if (!process.env[key]) process.env[key] = value
    }
}
loadEnv()

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
const API_KEY = process.env.CLOUDINARY_API_KEY
const API_SECRET = process.env.CLOUDINARY_API_SECRET
const FOLDER = process.env.CLOUDINARY_FOLDER || 'rg-tech'

if (!CLOUD_NAME || !API_KEY || !API_SECRET) {
    console.error('\n✖ Missing Cloudinary credentials.\n')
    console.error('  Set these in .env.local:')
    console.error('    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=' + (CLOUD_NAME || '   <-- MISSING'))
    console.error('    CLOUDINARY_API_KEY=' + (API_KEY ? '(set)' : '   <-- MISSING'))
    console.error('    CLOUDINARY_API_SECRET=' + (API_SECRET ? '(set)' : '   <-- MISSING'))
    console.error('\n  Cloud name is the short id in your Cloudinary URLs:')
    console.error('    https://res.cloudinary.com/<CLOUD_NAME>/image/upload/...\n')
    process.exit(1)
}

cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: API_KEY,
    api_secret: API_SECRET,
    secure: true,
})

/* ------------------------------------------------------------- file walking */

const IMAGE_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif', '.svg'])
const RAW_EXT = new Set(['.pdf'])

// Only these live under public/ and are actually referenced by the site.
// Everything else in public/ is ignored.
//
// public/catalogues is deliberately NOT included: Cloudinary blocks PDF/ZIP
// delivery by default and three of the four volumes exceed the 10 MB free-tier
// upload limit, so the catalogues are still served from the origin.
const INCLUDE_DIRS = ['gallery']
const INCLUDE_FILES = ['hero-laser.png', 'RG-Tech-Logo.png']

function walk(dir, out = []) {
    for (const entry of readdirSync(dir)) {
        const full = join(dir, entry)
        if (statSync(full).isDirectory()) walk(full, out)
        else out.push(full)
    }
    return out
}

function collectFiles() {
    const files = []
    for (const d of INCLUDE_DIRS) {
        const full = join(PUBLIC_DIR, d)
        if (existsSync(full)) files.push(...walk(full))
    }
    for (const f of INCLUDE_FILES) {
        const full = join(PUBLIC_DIR, f)
        if (existsSync(full)) files.push(full)
    }
    return files.filter((f) => {
        const ext = extname(f).toLowerCase()
        return IMAGE_EXT.has(ext) || RAW_EXT.has(ext)
    })
}

/**
 * Local public path exactly as the site references it, e.g.
 *   /gallery/Steel Gates/RG-Tech-Catelog-vol-4_page-0120.jpg
 * Kept un-encoded — lib/cloudinary.js normalises lookups.
 */
function toPublicPath(absPath) {
    return '/' + relative(PUBLIC_DIR, absPath).split(/[\\/]/).join('/')
}

/**
 * Cloudinary public_id. Spaces and other awkward characters are replaced so the
 * delivery URLs stay clean and never need escaping.
 */
function toPublicId(publicPath) {
    const withoutExt = publicPath.replace(/\.[^.]+$/, '')
    const slug = withoutExt
        .replace(/^\//, '')
        .split('/')
        .map((seg) =>
            seg
                .normalize('NFKD')
                .replace(/[^\w\s.-]/g, '')
                .trim()
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-')
                .toLowerCase()
        )
        .join('/')
    return `${FOLDER}/${slug}`
}

/* -------------------------------------------------------------------- main */

async function main() {
    const manifest = existsSync(MANIFEST_PATH)
        ? JSON.parse(readFileSync(MANIFEST_PATH, 'utf8'))
        : {}

    const files = collectFiles()
    const todo = []

    for (const abs of files) {
        const publicPath = toPublicPath(abs)
        if (!FORCE && manifest[publicPath]) continue
        todo.push({ abs, publicPath, publicId: toPublicId(publicPath) })
    }

    const totalBytes = todo.reduce((n, t) => n + statSync(t.abs).size, 0)
    console.log(`\nCloudinary upload → cloud "${CLOUD_NAME}", folder "${FOLDER}"`)
    console.log(`  found     ${files.length} local files`)
    console.log(`  already   ${files.length - todo.length} in manifest`)
    console.log(`  to upload ${todo.length} (${(totalBytes / 1024 / 1024).toFixed(1)} MB)\n`)

    if (DRY_RUN) {
        for (const t of todo.slice(0, 20)) console.log(`  ${t.publicPath}\n    -> ${t.publicId}`)
        if (todo.length > 20) console.log(`  … and ${todo.length - 20} more`)
        console.log('\n(dry run — nothing uploaded)\n')
        return
    }

    if (!todo.length) {
        console.log('Nothing to do.\n')
        return
    }

    let done = 0
    let failed = 0
    const CONCURRENCY = 8

    async function worker(queue) {
        while (queue.length) {
            const task = queue.shift()
            if (!task) break
            const isRaw = RAW_EXT.has(extname(task.abs).toLowerCase())
            try {
                const res = await cloudinary.uploader.upload(task.abs, {
                    public_id: task.publicId,
                    resource_type: isRaw ? 'raw' : 'image',
                    overwrite: FORCE,
                    // Let Cloudinary keep the pristine original; we request
                    // derived sizes at delivery time via f_auto/q_auto/w_*.
                    unique_filename: false,
                    use_filename: false,
                })
                manifest[task.publicPath] = {
                    publicId: res.public_id,
                    resourceType: isRaw ? 'raw' : 'image',
                    version: res.version,
                    width: res.width ?? null,
                    height: res.height ?? null,
                    format: res.format ?? null,
                    bytes: res.bytes ?? null,
                }
                done++
            } catch (err) {
                failed++
                console.error(`  ✖ ${task.publicPath}: ${err?.message || err}`)
            }
            const n = done + failed
            if (n % 25 === 0 || n === todo.length) {
                console.log(`  ${n}/${todo.length} (${done} ok, ${failed} failed)`)
                // Checkpoint so a crash never loses completed work.
                writeFileSync(MANIFEST_PATH, JSON.stringify(sortKeys(manifest), null, 2) + '\n')
            }
        }
    }

    const queue = [...todo]
    await Promise.all(Array.from({ length: CONCURRENCY }, () => worker(queue)))

    writeFileSync(MANIFEST_PATH, JSON.stringify(sortKeys(manifest), null, 2) + '\n')
    console.log(`\n✓ ${done} uploaded, ${failed} failed.`)
    console.log(`  manifest: ${relative(ROOT, MANIFEST_PATH)} (${Object.keys(manifest).length} entries)\n`)
    if (failed) process.exitCode = 1
}

function sortKeys(obj) {
    return Object.fromEntries(Object.entries(obj).sort(([a], [b]) => a.localeCompare(b)))
}

main().catch((err) => {
    console.error(err)
    process.exit(1)
})
