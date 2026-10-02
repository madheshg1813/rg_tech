# Deity panel images — house style and how to reproduce it

Everything needed to generate more panel images for `/designs/gods/<slug>` and
have them match what is already published. Read the **Style** section before
changing any prompt: most of it is the record of things that were tried and did
not work.

- **Generator:** `scripts/generate-god-designs.mjs`
- **Variants:** `lib/godDesignVariants.js`
- **Subjects:** `lib/godDesignSeeds.js`
- **Folder list:** `GOD-IMAGE-FOLDERS.md`

---

## 1. The house style

A **photorealistic product photograph of a finished panel**. Not artwork, not a
cutting file, not a flat illustration.

| | |
|---|---|
| Panel | dark bronze or matte black metal, brushed, mounted on standoffs |
| Wall | plain cream textured plaster, nothing else in shot |
| Light | warm golden LED **behind** the panel, glowing through the cut-outs and spilling onto the wall |
| Framing | straight on, centred, panel nearly fills the frame |
| Credit | `© RG TECH ENGINEERING WORKS` engraved along the bottom edge |

The reference is `public/gallery/gods/ganesh/ganesh-lotus-backlit-panel.jpg`.
When in doubt, open it and compare.

### Why backlighting is the load-bearing instruction

It is what makes the cut-outs read as **holes** rather than as printed lines.
Describe the lighting before the subject. Drop it and the render collapses into
a flat drawing of a panel, which is a different product.

---

## 2. Two wrong turns — do not repeat these

Both of these were generated, looked plausible in isolation, and were wrong.

**Flat black-on-white line art.** Asking for "flat two-tone stencil artwork,
pure black on pure white" produces clean line art that looks like a cutting
file. It is not what the gallery shows, and it contradicts the page's own FAQ,
which says the images are design renders of panels. If you find yourself adding
`no shading, no 3D, no perspective` to the prompt, you are heading here.

**Bare plate with no light.** A photoreal panel with no backlight came out as a
dark plate on a grey wall with a solid black silhouette where the face should
be. Technically a photograph, but the design is unreadable.

There is also a third, quieter failure: the same prompt returned flat artwork
once and a photograph the next time. The fix was naming the artefact in the
**first** sentence — "Photorealistic product photograph of a finished…". Models
drift on ambiguous openings.

---

## 3. The prompt

Assembled in `scripts/generate-god-designs.mjs` as
`<subject> + <finish> + STYLE`. The STYLE block, verbatim:

```
Photorealistic product photograph of a finished laser-cut decorative metal wall panel, shot straight on and centred.
The panel is mounted on standoffs a few centimetres clear of a plain cream textured plaster wall.
Warm golden LED light sits behind the panel: it glows through every cut-out and spills softly onto the wall around all four edges.
The subject and the border are formed by the metal that REMAINS — fine continuous linework — while the cut-away areas show the lit wall behind.
Symmetrical ornamental border frame filling the panel edge to edge.
Along the bottom edge of the panel, engraved into the same metal in clean capitals: "© RG TECH ENGINEERING WORKS".
Vertical portrait 3:5 composition. The panel fills nearly the whole frame, with only a narrow margin of wall showing.
Soft even studio lighting, gentle shadow behind the panel, no harsh highlights.
No other text, no logos, no watermarks, no people, no furniture, no plants, no props.
```

Subject wording differs by `kind`, because a third of the list is not a deity:

| kind | phrasing |
|---|---|
| `deity` | `The cut design shows the Hindu deity <Name>, depicted respectfully and traditionally, <figure>.` |
| `symbol` | `The cut design shows the sacred <Name> symbol, <abstract>.` |
| `fixture` | `The cut design shows a decorative <name> design, <abstract>.` |

`Om Symbol` and `Vel Symbol` already contain the word, so the generator strips a
trailing "Symbol" — otherwise you get "the Om Symbol symbol", which is both
ungrammatical and an instruction the model will try to satisfy.

---

## 4. Image spec

| | |
|---|---|
| Size | **1024 × 1707 px** |
| Ratio | **3 : 5** — the physical plate, 300 × 500 mm (or 600 × 1000 mm as a wall panel) |
| Format | `.jpg`, quality 88, mozjpeg |
| Path | `public/gallery/gods/<slug>/` |
| Filename | `<slug>-<variant-key>.jpg` — e.g. `murugan-floral-jali.jpg` |

The filename is not cosmetic. `lib/godDesigns.js` reads the variant key back off
the end to recover the panel's title and material, so a rename silently drops
the image from the page. Treat variant keys as fixed once images exist.

The original Ganesh set is 1536 × 2752 (near 9:16). The card mattes rather than
crops — `object-contain` on an `aspect-[3/5]` box — so the two ratios coexist
without either being cut into. Do not switch the card to `object-cover`: it
shaves ~7% off the top and bottom, which on these designs clips the border.

---

## 5. Running it

```bash
# one deity, one panel — always do this first after any prompt change
node scripts/generate-god-designs.mjs --god murugan --count 1

# a full deity
node scripts/generate-god-designs.mjs --god murugan --count 7

# everything (~343 images, several hours)
node scripts/generate-god-designs.mjs --all --count 7

# see prompts without spending anything
node scripts/generate-god-designs.mjs --god murugan --dry-run
```

Output lands in `public/gallery/gods/<slug>/review/`, never straight into the
gallery. Existing files are skipped unless `--force`.

### Rate limits

Image models have a low per-minute ceiling. The first unthrottled `--all`
attempt failed **141 of 143** with `RESOURCE_EXHAUSTED`. The generator now
spaces requests by `GEMINI_THROTTLE_MS` (default 4000) and retries 429s with
backoff at 8s → 16s → 32s → 64s → 128s. If a long run still fails in blocks,
raise the throttle rather than the retries — the gap is what keeps it under the
limit; the retries only rescue bursts.

### Config

```bash
GEMINI_API_KEY=            # Vertex accepts it as ?key=, not as a Bearer token
GEMINI_VERTEX_PROJECT=     # unset -> Generative Language API instead
GEMINI_VERTEX_LOCATION=global
GEMINI_IMAGE_MODEL=gemini-3-pro-image
GEMINI_THROTTLE_MS=4000
```

Two things that cost an hour to discover:

- **Vertex accepts the credential as `?key=`.** It is documented as OAuth-only,
  and the same token in an `Authorization: Bearer` header returns 401.
- **Location matters.** On this project `global` carries the gemini-3 image
  models; `us-central1` returns "Publisher model not found" for the same
  request.

---

## 6. Review before publishing

Nothing goes live unchecked. Three things, in order of how much they cost if
missed:

1. **Iconography.** Wrong number of arms, a missing or wrong attribute, the
   wrong mount. On a page selling to devotees in Tamil Nadu this costs more
   than the page earns. No script can check it.
2. **The credit line.** Read `© RG TECH ENGINEERING WORKS` letter by letter.
   Text is where image models still slip, and a misspelt company name across
   fifty panels is worse than no credit line at all.
3. **Cuttability.** The page claims these are designs we can cut. Look for
   floating islands — shapes with no connection to the surrounding metal, which
   would fall out. Some are unavoidable and get bridged when the cutting file is
   prepared, but a design that is mostly islands is not a design.

Then:

```bash
# move the keepers up one level
mv public/gallery/gods/murugan/review/*.jpg public/gallery/gods/murugan/

npm run cloudinary:migrate
```

**No URLs to paste.** `lib/godDesigns.js` reads images straight out of
`lib/cloudinaryManifest.json`, matching on the folder and the filename, and
takes the true pixel dimensions from there. The page fills itself on the next
build, turns indexable, and enters the sitemap — all on its own. A gallery with
no images stays `noindex` and out of the sitemap, so half-finished work is safe
to leave in place.

---

## 7. Adding a new subject

1. Add a row to `GODS` in `lib/gods.js` (if it is not already there).
2. Add a matching row to `GOD_DESIGN_SEEDS` in `lib/godDesignSeeds.js`:
   - `kind` — `deity` | `symbol` | `fixture`
   - `alsoKnownAs` — leave empty unless certain. A wrong alternate name is
     worse than a missing one: it puts the page in front of the wrong query.
   - `placements` — where these panels actually get fixed. This carries most of
     the difference between one gallery's copy and the next, so be specific.
3. `node scripts/generate-god-designs.mjs --god <key> --count 7`
4. Review, move, migrate.

Copy is generated from the seed by `lib/godDesignCopy.js`. It deliberately makes
**no iconographic claims** — no arms, weapons, mounts or postures — because
`lib/gods.js` sets that rule for the whole site and because fifty subjects is
more than can be researched reliably. Craft facts are true of every panel we
cut; a confident wrong detail about a deity is not.

To replace generated copy with written copy, add the entry to `HAND_WRITTEN` in
`lib/godDesigns.js`. A hand-written entry always wins. Ganesh is the reference.
