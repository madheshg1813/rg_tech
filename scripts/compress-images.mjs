#!/usr/bin/env node
/**
 * Batch-compress a folder of photos into web-ready JPEGs.
 *
 * Written for the "Our Works" drop: a zip of phone photos of finished jobs,
 * mixed sizes, with a few exact duplicates. Files are hashed first so a repeat
 * of the same photo is dropped rather than uploaded twice, then each survivor
 * is EXIF-rotated, bounded to --max px on its longest side and re-encoded with
 * mozjpeg. Output is renamed rg-work-01.jpg, rg-work-02.jpg, … so the public
 * paths are stable and URL-safe, and _report.json records the mapping back to
 * the original filenames.
 *
 * The encoder is mozjpeg, which is the same one Squoosh runs behind its
 * "MozJPEG" option — this is that, in bulk, from the command line.
 *
 * The defaults are set to be visually lossless rather than small. They used to
 * be 1400px at quality 78 with libjpeg's default 4:2:0 chroma subsampling, and
 * that combination is wrong for this subject: a laser-cut panel is mostly fine
 * repeating perforations, which is the high-frequency detail 4:2:0 averages
 * away and quality 78 rings around. 4:4:4 keeps colour at full resolution and
 * quality 88 is above the point where mozjpeg artefacts are visible on detail
 * like this.
 *
 * Compressing here is permanent, so it is the one step worth being generous
 * at. It does not decide what the visitor downloads: this produces the stored
 * master, and Cloudinary re-encodes per breakpoint at delivery (f_auto/q_auto
 * in lib/cloudinary.js). A bigger, cleaner master costs repo size only, and
 * gives Cloudinary better input to resize from.
 *
 * Usage:
 *   node scripts/compress-images.mjs <src-dir> <out-dir> [flags]
 *
 * Flags:
 *   --max=2400       longest side in px; 0 keeps the original size
 *   --quality=88     mozjpeg quality, 1-100
 *   --start=1        first output number, for adding to an existing set
 *   --prefix=rg-work output basename
 *
 * Then move the output into public/, make sure its folder is listed in
 * INCLUDE_DIRS in scripts/upload-to-cloudinary.mjs, and run:
 *   npm run cloudinary:upload
 */

import { readdirSync, readFileSync, mkdirSync, writeFileSync, statSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { createHash } from 'node:crypto'
import sharp from 'sharp'

const args = process.argv.slice(2)
const positional = args.filter((a) => !a.startsWith('--'))

function flag(name, fallback) {
  const hit = args.find((a) => a.startsWith(`--${name}=`))
  return hit === undefined ? fallback : hit.slice(name.length + 3)
}

const SRC = positional[0]
const OUT = positional[1]
const MAX = Number(flag('max', 2400))
const QUALITY = Number(flag('quality', 88))
const START = Number(flag('start', 1))
const PREFIX = flag('prefix', 'rg-work')

if (!SRC || !OUT) {
  console.error('usage: node scripts/compress-images.mjs <src-dir> <out-dir> [--max=2400] [--quality=88] [--start=1] [--prefix=rg-work]')
  process.exit(1)
}
if (!existsSync(SRC)) {
  console.error(`✖ source folder not found: ${SRC}`)
  process.exit(1)
}

/*
 * 4:4:4 above quality 82, libjpeg's 4:2:0 below it. Subsampling is the first
 * thing to give up when the target is size, and the last when the target is
 * fidelity, so it follows the quality rather than being set separately.
 */
const CHROMA = QUALITY >= 82 ? '4:4:4' : '4:2:0'

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

console.log(`\nmozjpeg q${QUALITY} ${CHROMA}, ${MAX ? `max ${MAX}px` : 'original size'}, numbering from ${START}`)
console.log(`${files.length} files, ${skipped} duplicates dropped, ${kept.length} to compress\n`)

let i = START - 1
let beforeTotal = 0
let afterTotal = 0
const report = []

for (const { f, abs } of kept) {
  i++
  const name = `${PREFIX}-${String(i).padStart(2, '0')}.jpg`
  const dest = join(OUT, name)
  const before = statSync(abs).size
  const img = sharp(abs).rotate()
  const meta = await img.metadata()
  if (MAX) img.resize({ width: MAX, height: MAX, fit: 'inside', withoutEnlargement: true })
  await img
    .jpeg({ quality: QUALITY, mozjpeg: true, progressive: true, chromaSubsampling: CHROMA })
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
