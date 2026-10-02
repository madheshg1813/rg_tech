/**
 * Turn a downloaded brand logo into an asset that can sit in a UI chip.
 *
 * Stock logo downloads are square, padded, and flattened onto white. Dropped
 * into a 44px pill that renders as a white block with a four-pixel smudge in
 * the middle of it — the padding eats the height budget and the white
 * background sits proud of the surface behind it.
 *
 * Two passes fix both:
 *   trim   crop the flat border away so the artwork fills its own box, which
 *          is what lets `h-[13px] w-auto` size the wordmark rather than the
 *          canvas it happens to be centred on.
 *   alpha  white -> transparent, with a ramp between 200 and 250 rather than a
 *          hard cutoff. A hard cutoff leaves a white fringe on every
 *          antialiased curve, and this wordmark is nothing but curves.
 *
 *   node scripts/prepare-logo.mjs <src> <dest>
 */
import sharp from 'sharp'

const [, , SRC, DEST] = process.argv
if (!SRC || !DEST) {
    console.error('usage: node scripts/prepare-logo.mjs <src> <dest>')
    process.exit(1)
}

const SOLID_BELOW = 200 // at or under this, fully opaque
const CLEAR_ABOVE = 250 // at or over this, fully transparent

const before = await sharp(SRC).metadata()

const trimmed = await sharp(SRC)
    .trim({ background: '#ffffff', threshold: 12 })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

const { data, info } = trimmed
for (let i = 0; i < data.length; i += info.channels) {
    // How far the pixel is from white, measured on its darkest channel so a
    // saturated orange counts as "not white" even though it is bright.
    const m = Math.min(data[i], data[i + 1], data[i + 2])
    if (m >= CLEAR_ABOVE) data[i + 3] = 0
    else if (m > SOLID_BELOW) {
        data[i + 3] = Math.round(((CLEAR_ABOVE - m) / (CLEAR_ABOVE - SOLID_BELOW)) * 255)
    }
}

await sharp(data, { raw: { width: info.width, height: info.height, channels: info.channels } })
    .png({ compressionLevel: 9 })
    .toFile(DEST)

const after = await sharp(DEST).metadata()
console.log(`${SRC}  ${before.width}x${before.height} alpha:${!!before.hasAlpha}`)
console.log(`${DEST}  ${after.width}x${after.height} alpha:${!!after.hasAlpha}`)
console.log(`ratio ${(after.width / after.height).toFixed(2)}:1`)
