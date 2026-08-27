#!/usr/bin/env node
/**
 * Batch-compress a folder of photos into web-ready JPEGs.
 *
 * Written for the "Our Works" drop: a zip of phone photos of finished jobs,
 * mixed sizes, with a few exact duplicates. Files are hashed first so a repeat
 * of the same photo is dropped rather than uploaded twice, then each survivor
 * is EXIF-rotated, bounded to MAX px on its longest side and re-encoded with
 * mozjpeg. Output is renamed rg-work-01.jpg, rg-work-02.jpg, … so the public
 * paths are stable and URL-safe, and _report.json records the mapping back to
 * the original filenames.
 *
 * This is the pre-step to the Cloudinary upload, not a replacement for it:
 * Cloudinary still does format negotiation and per-breakpoint resizing at
 * delivery. Compressing here keeps the stored original and the repo small.
 *
 * Usage:
 *   node scripts/compress-images.mjs <src-dir> <out-dir>
 *
 * Then move the output into public/, make sure its folder is listed in
 * INCLUDE_DIRS in scripts/upload-to-cloudinary.mjs, and run:
 *   npm run cloudinary:upload
 */

import { readdirSync, readFileSync, mkdirSync, writeFileSync, statSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { createHash } from 'node:crypto'
import sharp from 'sharp'

const SRC = process.argv[2]
const OUT = process.argv[3]
const MAX = 1400
const QUALITY = 78

mkdirSync(OUT, { recursive: true })

const files = readdirSync(SRC)
  .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))

const seen = new Map()
const kept = []
let skipped = 0

for (const f of files) {
  const abs = join(SRC, f)
  const hash = createHash('md5').update(readFileSync(abs)).digest('hex')
  if (seen.has(hash)) { skipped++; console.log(`  dup  ${f}  (== ${seen.get(hash)})`); continue }
  seen.set(hash, f)
  kept.push({ f, abs })
}

console.log(`\n${files.length} files, ${skipped} duplicates dropped, ${kept.length} to compress\n`)

let i = 0
let beforeTotal = 0
let afterTotal = 0
const report = []

for (const { f, abs } of kept) {
  i++
  const name = `rg-work-${String(i).padStart(2, '0')}.jpg`
  const dest = join(OUT, name)
  const before = statSync(abs).size
  const img = sharp(abs).rotate()
  const meta = await img.metadata()
  await img
    .resize({ width: MAX, height: MAX, fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: QUALITY, mozjpeg: true, progressive: true })
    .toFile(dest)
  const after = statSync(dest).size
  const outMeta = await sharp(dest).metadata()
  beforeTotal += before
  afterTotal += after
  report.push({ name, source: f, w: outMeta.width, h: outMeta.height, before, after })
  console.log(`  ${name}  ${meta.width}x${meta.height} -> ${outMeta.width}x${outMeta.height}  ${(before/1024).toFixed(0)}KB -> ${(after/1024).toFixed(0)}KB`)
}

writeFileSync(join(OUT, '_report.json'), JSON.stringify(report, null, 2))
console.log(`\nTotal ${(beforeTotal/1024/1024).toFixed(2)} MB -> ${(afterTotal/1024/1024).toFixed(2)} MB  (${(100 - afterTotal/beforeTotal*100).toFixed(1)}% smaller)`)
