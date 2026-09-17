#!/usr/bin/env node
/**
 * Generates laser-cut panel renders for the design galleries at
 * /designs/gods/<slug>, using the Gemini image API.
 *
 * Usage:
 *   node scripts/generate-god-designs.mjs --god murugan
 *   node scripts/generate-god-designs.mjs --god murugan --count 7
 *   node scripts/generate-god-designs.mjs --all --count 7
 *   node scripts/generate-god-designs.mjs --god murugan --dry-run
 *
 * Output goes to  public/gallery/gods/<slug>/review/  — NOT into the gallery
 * folder itself. That is deliberate. Every image has to be looked at by a
 * person before it is published, for two separate reasons:
 *
 *   1. Iconography. Image models get deity attributes wrong often enough that
 *      it matters — a missing vel, the wrong number of arms, a garbled
 *      attribute. On a page selling to devotees in Tamil Nadu a wrong
 *      depiction costs more than the page earns. Nothing here can check that;
 *      only you can.
 *   2. Cuttability. The page claims these are designs we can cut. A render
 *      with floating islands, soft shading or a gradient is not cuttable, and
 *      publishing one makes the FAQ about bridging into a lie. The prompt
 *      pushes hard against it, but it does not always win.
 *
 * Once approved, move the keepers up one directory and run:
 *   npm run cloudinary:migrate
 * then paste the resulting URLs into the entry in lib/godDesigns.js.
 *
 * Re-running never overwrites: existing files are skipped unless --force.
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'
import { GODS } from '../lib/gods.js'
import { GOD_DESIGN_SEEDS } from '../lib/godDesignSeeds.js'
import { PANEL_VARIANTS } from '../lib/godDesignVariants.js'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')

/* ------------------------------------------------------------------ config */

// Same minimal reader as scripts/upload-to-cloudinary.mjs, so the script needs
// no extra dependency and no separate setup step.
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

const API_KEY = process.env.GEMINI_API_KEY
const MODEL = process.env.GEMINI_IMAGE_MODEL || 'gemini-2.5-flash-image'

/*
 * Two endpoints, same key.
 *
 * Set GEMINI_VERTEX_PROJECT and this talks to Vertex AI; leave it unset and it
 * talks to the Generative Language API. Both take the credential as `?key=`,
 * which is worth writing down because Vertex is documented as OAuth-only —
 * a Bearer header with the same token gets a 401, while `?key=` is accepted.
 *
 * Location matters more than it looks. On this project `global` carries the
 * gemini-3 image models and `us-central1` does not: the same request that
 * returns 200 globally returns "Publisher model not found" there.
 */
const VERTEX_PROJECT = process.env.GEMINI_VERTEX_PROJECT
const VERTEX_LOCATION = process.env.GEMINI_VERTEX_LOCATION || 'global'

const ENDPOINT = (model) => {
    if (!VERTEX_PROJECT) {
        return `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`
    }
    const host =
        VERTEX_LOCATION === 'global'
            ? 'aiplatform.googleapis.com'
            : `${VERTEX_LOCATION}-aiplatform.googleapis.com`
    return (
        `https://${host}/v1/projects/${VERTEX_PROJECT}/locations/${VERTEX_LOCATION}` +
        `/publishers/google/models/${model}:generateContent`
    )
}

// 3:5, the ratio of the physical plate — 300 x 500 mm, or 600 x 1000 mm for a
// wall panel. Every gallery image is produced at this size so the catalogue
// strip shows the panel's real proportions rather than a crop of them.
//
// The original Ganesh set is 1536 x 2752 (close to 9:16). The card is matted
// rather than cropped, so the two coexist without either being cut into — see
// the object-contain note in GodDesignGallery.
const OUT_W = 1024
const OUT_H = 1707

/*
 * Thumbnails are a separate image, not a crop of a panel.
 *
 * The crosslink tiles are 4:3 landscape and the panels are 3:5 portrait, so
 * cropping one to the other throws away most of the design and usually cuts
 * the figure in half. These are shot deliberately wide instead: the same
 * backlit panel, framed close on the deity so it still reads at tile size.
 *
 * 4:3 at 1200x900 — twice the tile's rendered width, so it stays sharp on a
 * 2x display without paying for more.
 */
const THUMB_W = 1200
const THUMB_H = 900

const THUMB_STYLE = [
    'Photorealistic product photograph of a finished laser-cut decorative metal wall panel, shot straight on and centred.',
    // The whole point of the retake. A "close" framing produced a crop with
    // the crown cut off the top and the legs off the bottom, which is the one
    // thing a thumbnail must not do to a deity.
    'The ENTIRE figure is visible from head to feet, complete and uncropped, with clear empty space above the head and below the feet.',
    'Nothing touches or runs off any edge of the frame.',
    'The panel is WIDE — a horizontal landscape panel, wider than it is tall, in 4:3 proportions, with ornamental border running along all four sides.',
    'Warm golden LED light behind the panel glows through every cut-out.',
    'The subject is formed by the metal that REMAINS — fine continuous linework — while the cut-away areas show the lit wall behind.',
    'Soft even studio lighting, no harsh highlights.',
    'No text, no letters, no numerals, no logos, no watermarks, no people, no props.',
].join(' ')

const args = process.argv.slice(2)
const flag = (name, fallback = null) => {
    const i = args.indexOf(`--${name}`)
    return i === -1 ? fallback : args[i + 1]
}
const DRY_RUN = args.includes('--dry-run')
const FORCE = args.includes('--force')
const ALL = args.includes('--all')
const THUMBS = args.includes('--thumbs')
const ONE = flag('god')
const COUNT = Number(flag('count', '7'))

/* ------------------------------------------------------------------ prompts */

/*
 * The brief, and it is a product photograph — not artwork.
 *
 * This took two wrong turns worth recording. Asked for "a panel design" the
 * model returns a shaded illustration. Told to produce flat two-tone stencil
 * artwork it produces clean black-on-white line art — which looks like a
 * cutting file, and is not what the gallery shows. The existing Ganesh set is a
 * photograph of a finished panel: dark metal on a cream wall, warm light coming
 * through the cut-outs, the credit line engraved along the bottom. That is the
 * house style and this prompt reproduces it.
 *
 * The lighting is the part that carries it. Backlighting is what makes the
 * cut-outs read as holes rather than as printed lines, so it is described
 * before the subject is.
 *
 * The credit line is asked of the model rather than composited afterwards,
 * because it has to sit on the panel in the panel's own material and catch the
 * same light. Every render has to be checked for it: text is where image models
 * still slip, and a misspelt company name across fifty panels is worse than
 * none. `--check` prints them side by side for exactly this.
 */
const STYLE = [
    'Photorealistic product photograph of a finished laser-cut decorative metal wall panel, shot straight on and centred.',
    'The panel is mounted on standoffs a few centimetres clear of a plain cream textured plaster wall.',
    'Warm golden LED light sits behind the panel: it glows through every cut-out and spills softly onto the wall around all four edges.',
    'The subject and the border are formed by the metal that REMAINS — fine continuous linework — while the cut-away areas show the lit wall behind.',
    'Symmetrical ornamental border frame filling the panel edge to edge.',
    'Along the bottom edge of the panel, engraved into the same metal in clean capitals: "© RG TECH ENGINEERING WORKS".',
    'Vertical portrait 3:5 composition. The panel fills nearly the whole frame, with only a narrow margin of wall showing.',
    'Soft even studio lighting, gentle shadow behind the panel, no harsh highlights.',
    'No other text, no logos, no watermarks, no people, no furniture, no plants, no props.',
].join(' ')

// Retired variants keep their entry so already-published files still resolve
// to a title and material, but nothing new is generated from them.
const VARIANTS = PANEL_VARIANTS.filter((v) => !v.retired)

function buildThumbPrompt(name, kind, seedIconography) {
    const shot = (subject) => `The cut design shows ${subject}. The panel is dark bronze stainless steel with a warm golden PVD sheen. ${THUMB_STYLE}`

    if (kind === 'symbol') {
        const bare = name.replace(/\s+Symbol$/i, '')
        return shot(`the sacred ${bare} symbol, centred and filling the frame`)
    }
    if (kind === 'fixture') {
        return shot(`a decorative ${name.toLowerCase()} design, centred and filling the frame`)
    }
    const who = seedIconography
        ? `the Hindu deity ${name} — ${seedIconography} —`
        : `the Hindu deity ${name}`
    return shot(
        `${who} depicted respectfully and traditionally, the complete figure shown head to feet. ` +
            `The figure must be ${name} and no other deity.`
    )
}

function buildPrompt(name, kind, variant, seedIconography) {
    const cut = (subject) =>
        `The cut design shows ${subject}. The panel is ${variant.finish}. ${STYLE}`

    if (kind === 'symbol') {
        // 'Om Symbol' and 'Vel Symbol' carry the word already; appending it
        // gives "the Om Symbol symbol".
        const bare = name.replace(/\s+Symbol$/i, '')
        return cut(`the sacred ${bare} symbol, ${variant.abstract}`)
    }
    if (kind === 'fixture') {
        return cut(`a decorative ${name.toLowerCase()} design, ${variant.abstract}`)
    }
    // The guard is not decoration. A sparse brief drifts toward whichever form
    // is most represented in training data, and for a simplified Hindu deity
    // silhouette that is Ganesh — which is what came back for Murugan's
    // 'minimal-bold' panel, elephant head and all.
    const who = seedIconography
        ? `the Hindu deity ${name} — ${seedIconography} —`
        : `the Hindu deity ${name}`
    return cut(
        `${who} depicted respectfully and traditionally, ${variant.pose}, ${variant.figure}. ` +
            `The figure must be ${name} and no other deity.`
    )
}

/* ------------------------------------------------------------------- gemini */

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

/*
 * Retry on 429.
 *
 * A first --all run failed 141 times out of 143 with RESOURCE_EXHAUSTED: the
 * loop fires as fast as the network allows and image models have a low
 * per-minute ceiling. Backoff turns that into a slow run instead of a wasted
 * one. THROTTLE_MS spaces requests even when nothing is failing, which is what
 * actually keeps it under the limit; the retries are for the bursts.
 */
const THROTTLE_MS = Number(process.env.GEMINI_THROTTLE_MS || 4000)
const MAX_RETRIES = 5

async function generateImage(prompt, attempt = 0) {
    /*
     * Network errors get the same ladder as a 429.
     *
     * A brief connectivity drop mid-run produced 47 failures out of 49 with
     * nothing but "fetch failed": undici throws rather than returning a status,
     * so the 429 branch below never saw it and every remaining subject was
     * written off in seconds. A blip should cost a pause, not a whole run.
     */
    let res
    try {
        res = await fetch(`${ENDPOINT(MODEL)}?key=${API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ role: 'user', parts: [{ text: prompt }] }],
                generationConfig: { responseModalities: ['IMAGE'] },
            }),
        })
    } catch (err) {
        if (attempt >= MAX_RETRIES) throw err
        const wait = 8000 * Math.pow(2, attempt)
        process.stdout.write(` [network, waiting ${wait / 1000}s]`)
        await sleep(wait)
        return generateImage(prompt, attempt + 1)
    }

    if (res.status === 429 && attempt < MAX_RETRIES) {
        // 8s, 16s, 32s, 64s, 128s. Quota windows are per-minute, so the later
        // waits are what actually clear it.
        const wait = 8000 * Math.pow(2, attempt)
        process.stdout.write(` [429, waiting ${wait / 1000}s]`)
        await sleep(wait)
        return generateImage(prompt, attempt + 1)
    }

    if (!res.ok) {
        const body = await res.text()
        throw new Error(`Gemini ${res.status}: ${body.slice(0, 300)}`)
    }

    const json = await res.json()
    const candidate = json?.candidates?.[0]
    const parts = candidate?.content?.parts || []
    const image = parts.find((p) => p.inlineData?.data)
    if (!image) {
        // A blocked generation returns 200 with a finishReason and no parts —
        // IMAGE_RECITATION (too close to training data) and IMAGE_SAFETY are
        // the two that show up. A refusal instead comes back as plain text.
        const text = parts.find((p) => p.text)?.text
        const reason = candidate?.finishReason
        const detail = text || candidate?.finishMessage || ''
        throw new Error(
            `No image returned${reason ? ` (${reason})` : ''}${detail ? `: ${detail.slice(0, 200)}` : ''}`
        )
    }
    return Buffer.from(image.inlineData.data, 'base64')
}

/*
 * Fit to the gallery's 9:16 without cropping.
 *
 * `contain` on white, not `cover`: the panel is the product, and cover would
 * shave the border frame off the top and bottom of every render. White matches
 * the generated background, so the padding is invisible.
 */
async function toPanel(buffer, outPath) {
    await sharp(buffer)
        .resize(OUT_W, OUT_H, { fit: 'contain', background: { r: 255, g: 255, b: 255 } })
        .jpeg({ quality: 88, mozjpeg: true })
        .toFile(outPath)
}

/* --------------------------------------------------------------------- main */

function loadSeeds() {
    const names = new Map(GODS.map((g) => [g.key, g.name]))

    /*
     * Ganesh has no seed row and never will.
     *
     * Its gallery is hand-written in GOD_DESIGNS and its god key is
     * `vinayagar`, so it appears in neither GOD_DESIGN_SEEDS (keyed by god key)
     * nor as a generated design. It still needs a thumbnail like every other
     * subject, so it is added here — the one place that has to know the
     * gallery folder is `ganesh` while the deity is Vinayagar.
     */
    const ganesh = {
        key: 'ganesh',
        kind: 'deity',
        name: 'Lord Ganesh',
        iconography:
            'an elephant-headed god with a curved trunk, a large belly and a broken tusk',
    }

    return [
        ganesh,
        ...GOD_DESIGN_SEEDS.map((s) => ({
            key: s.key,
            kind: s.kind,
            iconography: s.iconography,
            name: names.get(s.key) || s.key,
        })),
    ]
}

async function run() {
    const seeds = loadSeeds()
    const targets = ALL ? seeds : seeds.filter((s) => s.key === ONE)

    if (!ALL && !ONE) {
        console.error('\n✖ Pass --god <slug> or --all.\n')
        console.error('  Available slugs:')
        console.error('    ' + seeds.map((s) => s.key).join(', ') + '\n')
        process.exit(1)
    }
    if (targets.length === 0) {
        console.error(`\n✖ No seed for "${ONE}". See lib/godDesignSeeds.js.\n`)
        process.exit(1)
    }
    if (!API_KEY && !DRY_RUN) {
        console.error('\n✖ Missing GEMINI_API_KEY.\n')
        console.error('  Add it to .env.local:')
        console.error('    GEMINI_API_KEY=your-key-here\n')
        console.error('  Then re-run. Use --dry-run to see the prompts without a key.\n')
        process.exit(1)
    }

    const count = Math.min(Math.max(COUNT, 1), VARIANTS.length)
    console.log(
        `\n${DRY_RUN ? 'DRY RUN — ' : ''}${targets.length} subject(s), ${count} panel(s) each, ` +
            `model ${MODEL}\n`
    )

    let made = 0
    let failed = 0

    for (const seed of targets) {
        const dir = join(ROOT, 'public', 'gallery', 'gods', seed.key, 'review')
        if (!DRY_RUN) mkdirSync(dir, { recursive: true })
        console.log(`\n── ${seed.name} (${seed.kind}) → public/gallery/gods/${seed.key}/review/`)

        if (THUMBS) {
            const file = `${seed.key}-thumb.jpg`
            const outPath = join(dir, file)
            const publishedPath = join(dir, '..', file)

            if (!FORCE && (existsSync(outPath) || existsSync(publishedPath))) {
                console.log(`   skip   ${file} (exists)`)
                continue
            }

            const prompt = buildThumbPrompt(seed.name, seed.kind, seed.iconography)
            if (DRY_RUN) {
                console.log(`   would  ${file}`)
                console.log(`          ${prompt.slice(0, 150)}…`)
                continue
            }

            try {
                process.stdout.write(`   ..     ${file}`)
                const raw = await generateImage(prompt)
                /*
                 * contain, never cover.
                 *
                 * cover crops whatever the model returns down to 4:3, and when
                 * the model returned something taller it took the crown off the
                 * top and the feet off the bottom. Letterboxing on the panel's
                 * own wall colour is invisible; cutting the figure is not.
                 */
                await sharp(raw)
                    .resize(THUMB_W, THUMB_H, {
                        fit: 'contain',
                        background: { r: 244, g: 238, b: 228 },
                    })
                    .jpeg({ quality: 86, mozjpeg: true })
                    .toFile(outPath)
                console.log(`
   ok     ${file}          `)
                made++
                await sleep(THROTTLE_MS)
            } catch (err) {
                console.log(`
   FAIL   ${file} — ${err.message.replace(/\s+/g, ' ').slice(0, 160)}`)
                failed++
                await sleep(THROTTLE_MS)
            }
            continue
        }

        for (const variant of VARIANTS.slice(0, count)) {
            const file = `${seed.key}-${variant.key}.jpg`
            const outPath = join(dir, file)
            // Check the published folder as well as review/. Approved images
            // get moved up one level, which left review/ empty and made a
            // second --all run regenerate galleries that were already done.
            const publishedPath = join(dir, '..', file)

            if (!FORCE && (existsSync(outPath) || existsSync(publishedPath))) {
                console.log(`   skip   ${file} (exists)`)
                continue
            }

            const prompt = buildPrompt(seed.name, seed.kind, variant, seed.iconography)
            if (DRY_RUN) {
                console.log(`   would  ${file}`)
                console.log(`          ${prompt.slice(0, 150)}…`)
                continue
            }

            try {
                process.stdout.write(`   ..     ${file}`)
                const raw = await generateImage(prompt)
                await toPanel(raw, outPath)
                console.log(`
   ok     ${file}          `)
                made++
                await sleep(THROTTLE_MS)
            } catch (err) {
                console.log(`
   FAIL   ${file} — ${err.message.replace(/\s+/g, ' ').slice(0, 160)}`)
                failed++
                await sleep(THROTTLE_MS)
            }
        }
    }

    if (DRY_RUN) {
        console.log('\nDry run complete — nothing was generated or written.\n')
        return
    }

    console.log(`\n${made} generated, ${failed} failed.`)
    console.log('\nNext:')
    console.log('  1. Look at every image. Check the iconography and that the')
    console.log('     design is actually cuttable — one connected piece, no islands.')
    console.log('  2. Move the keepers out of review/ into the folder above it.')
    console.log('  3. npm run cloudinary:migrate')
    console.log('  4. Paste the URLs into the entry in lib/godDesigns.js.\n')
}

run().catch((err) => {
    console.error('\n✖', err.message, '\n')
    process.exit(1)
})
