# Cloudinary image migration — DONE

Cloud name `o1ytbfuz`. Credentials are in `.env.local` (gitignored) and verified
against the API (`/ping` → `{"status":"ok"}`).

## Result

**656 of 659 files uploaded. All 653 gallery images, the logo and the hero image
are now served from the Cloudinary CDN.** The site no longer serves a single
image from its own origin.

Measured delivery savings (real requests, browser `Accept` headers):

| Asset | Before (origin) | After (Cloudinary) | Saving |
| --- | --- | --- | --- |
| `hero-laser.png` @ mobile (w_640) | 872 KB PNG | **62 KB** WebP | **−93%** |
| `hero-laser.png` @ desktop (w_1080) | 872 KB PNG | **156 KB** WebP | **−82%** |
| `RG-Tech-Logo.png` @ 160px | 160 KB PNG | **2.4 KB** WebP | **−98%** |
| Gallery thumb @ w_384 | full-res JPG | **73 KB** WebP | varies |

Every `next/image` now emits a Cloudinary srcset with
`f_auto,q_auto,w_<width>,c_limit` injected per entry, e.g.

```
https://res.cloudinary.com/o1ytbfuz/image/upload/f_auto,q_auto,w_96,c_limit/v1785177077/rg-tech/rg-tech-logo 96w,
https://res.cloudinary.com/o1ytbfuz/image/upload/f_auto,q_auto,w_160,c_limit/v1785177077/rg-tech/rg-tech-logo 160w, …
```

762 paths were rewritten across 8 source files. `npm run build` passes and the
home, gallery, blog, service and OG-image routes were verified in a real browser.

## ⚠️ The catalogue PDFs did NOT migrate — they are still served locally

This is the one part that could not be completed, for two independent reasons.

**1. Three of the four exceed the free-tier upload limit.** Cloudinary's free
plan caps a single file at 10 MB:

| Catalogue | Size | Upload |
| --- | --- | --- |
| Vol-01 | 29 MB | ✖ rejected — over 10 MB |
| Vol-02 | 37 MB | ✖ rejected — over 10 MB |
| Vol-03 | 4 MB | ✔ uploaded |
| Vol-04 | 36 MB | ✖ rejected — over 10 MB |

**2. Cloudinary blocks PDF delivery by default.** Even Vol-03, which uploaded
successfully, returns `HTTP 401` with `x-cld-error: deny or ACL failure` when
fetched. This is an account-level security setting, not an upload problem.

Because pointing the site at a URL that 401s would have **broken a download that
currently works**, `lib/data.js` keeps all four catalogues on local paths. The
download button behaves exactly as before.

### To finish the PDF migration

1. **Allow PDF delivery**: Cloudinary console → Settings → Security →
   *Restricted media types* → allow **PDF and ZIP**. Then confirm:
   ```bash
   curl -I https://res.cloudinary.com/o1ytbfuz/raw/upload/v1785177079/rg-tech/catalogues/rg_tech-vol.03.pdf
   ```
   It should return `200`, not `401`.
2. **Get the three large files under 10 MB**, or upgrade the plan. These are
   scanned catalogue pages, so they compress well — but compression is lossy and
   these are design catalogues customers judge you on, so **that is your call,
   not something I should decide.** Options: compress (e.g. Ghostscript
   `-dPDFSETTINGS=/ebook`), split each volume into parts, or upgrade Cloudinary.
3. Re-add `'catalogues'` to `INCLUDE_DIRS` in `scripts/upload-to-cloudinary.mjs`,
   then `npm run cloudinary:migrate`.

Until then the three big PDFs remain a real cost: a user clicking "Vol-02"
downloads 37 MB from your origin.

## Deleting the local originals

The 653 gallery images are now redundant — nothing references them.

```bash
git rm -r --cached public/gallery
rm -rf public/gallery
```

That removes **157 MB** from the repo and from every future deploy. Keep
`public/catalogues` (103 MB) until the PDF situation above is resolved.

I have **not** run this — deleting 157 MB of originals should be your decision,
and it is worth confirming the deployed site looks right first.

## Addendum — the "Our Works" photos (54 files)

A zip of 59 phone photos of finished jobs was added later. They went through
`scripts/compress-images.mjs` first (dedupe by hash, EXIF-rotate, bound to
1400px, mozjpeg q78 — 8.95 MB down to 6.34 MB, 3 exact duplicates dropped), then
into `public/works/` as `rg-work-01.jpg` … `rg-work-55.jpg`. Two of the 56 were
phone screenshots with chat UI in frame rather than photos of work, so they were
left out — the numbering has gaps at 16 and 56 as a result.

`'works'` was added to `INCLUDE_DIRS` in `scripts/upload-to-cloudinary.mjs` and
all 54 uploaded cleanly; the manifest is now 710 entries.

They are consumed by `components/Home/OurWorks.jsx`, which resolves them through
`cld()` at render time rather than baking URLs into source — unlike the gallery,
that component is a server component, so the manifest never reaches the client.

Delivery is doing real work here: `rg-work-20.jpg` is a 240 KB stored JPEG and
comes back as a 54 KB WebP at `w_600`.

```bash
npm run images:compress -- <src-dir> <out-dir>
```

## Re-running

```bash
npm run cloudinary:upload:dry    # preview
npm run cloudinary:upload        # upload anything missing
npm run cloudinary:rewrite:dry   # preview the source rewrite
npm run cloudinary:rewrite       # apply
```

The upload is **idempotent and resumable** — it checkpoints the manifest every
25 files and skips anything already present. `--force` re-uploads.

## What each piece does

| File | Role |
| --- | --- |
| `scripts/upload-to-cloudinary.mjs` | Walks `public/gallery` + logo + hero; 8-way concurrent upload; writes the manifest. |
| `scripts/rewrite-image-paths.mjs` | Replaces local paths in source with Cloudinary URLs (matches raw, `%20`-encoded and fully-encoded forms). |
| `lib/cloudinaryManifest.json` | 656-entry map: local path → `{ publicId, version, width, height, … }`. **Committed** — the build needs it. |
| `lib/cloudinaryLoader.js` | Custom `next/image` loader; injects transforms per srcset entry. |
| `lib/cloudinary.js` | Runtime helpers (`cld`, `cldFile`, `cldBlurUrl`) for URLs outside `next/image`; falls back to the local path when an asset is not in the manifest. |
| `next.config.js` | Activates the custom loader only when a cloud name is set. |

## Design decisions worth knowing

**Why rewrite source instead of resolving at runtime.** The gallery is a client
component. Resolving through the manifest at runtime would push all 656 entries
(~90 KB of JSON) into the browser bundle. Baking the URLs in keeps that out of
the client payload.

**Why a custom loader instead of Next's optimiser.** With `loader: 'custom'`
Next stops proxying images through its own optimiser, which on Netlify runs as a
billable serverless function on every cold cache miss. Cloudinary already does
format negotiation and resizing at the edge; routing through both is overhead.

**No transformations baked into stored URLs.** The rewrite writes clean
`/image/upload/v123/<public-id>` URLs; the loader adds `w_`/`q_`/`f_auto` per
srcset entry. Baked-in transforms would lock every image to one size.

**A bug this surfaced.** Four paths were written as `` `${BASE}/gallery/x.jpg` ``
to build absolute URLs for schema.org and OG tags. Naive substitution produced
`https://www.rgtechengineeringworks.comhttps://res.cloudinary.com/...`. Fixed in
the affected files, and `rewrite-image-paths.mjs` now strips a redundant
`${BASE}`/`${BASE_URL}` prefix sitting before a Cloudinary URL, so a re-run
cannot reintroduce it.

## One security note

Your API Secret was pasted into a chat message and appears in that transcript.
It lives only in gitignored `.env.local` here. If you would rather it not sit in
a chat log, rotate it: Cloudinary console → Settings → API Keys → the
"RG Tech Engineering" key, then update `.env.local`.
