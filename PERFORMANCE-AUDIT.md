# RG Tech — Performance & Stack Audit

_Audited 27 Jul 2026._

## 1. Stack verdict

| Question | Answer |
| --- | --- |
| Is it Next.js? | **Yes.** Next.js (latest) with the **App Router** (`app/` directory, server components by default). |
| Is it TypeScript? | **No.** Every source file is plain JavaScript — 33 files, all `.js` / `.jsx`. There is no `tsconfig.json`, only a `jsconfig.json` for the `@/*` path alias. |
| Does TypeScript make the site faster? | **No.** TypeScript is erased at build time. The browser receives identical JavaScript either way. TS buys you compile-time safety and better refactoring — not runtime speed, not a better Lighthouse score. |

`@types/node`, `@types/react` and `@types/react-dom` are already in `devDependencies`, so the project was *scaffolded* for TypeScript but never converted. Adding a `tsconfig.json` with `allowJs: true` is a 5-minute change whenever you want to start writing new files in TS.

**Conclusion: TypeScript is not why the site is slow.** The real causes are below.

---

## 2. What is actually making the site slow

### 🔴 Critical — 261 MB of assets served from the origin

```
public/                261 MB total
├── gallery/           157 MB   653 images
├── catalogues/        103 MB   4 PDFs (29 MB, 37 MB, 36 MB, 4 MB)
├── hero-laser.png     872 KB   ← rendered on EVERY page as a background
└── RG-Tech-Logo.png   160 KB   ← rendered in header + footer on every page
```

Every one of these is served from the Netlify origin with no image CDN, no format negotiation, and no responsive resizing.

Specific offenders:

- **`hero-laser.png` (872 KB)** is used on the home hero, gallery hero, blog hero, blog post hero and every service page hero. On four of those five it is decorative (`opacity-10`, `aria-hidden`) — it is a ~900 KB download for a background texture. As a plain `<img>` it is also **not lazy-loaded and not optimised**, so it competes with the LCP element.
- **`RG-Tech-Logo.png` (160 KB)** is a logo. It should be ~5 KB. It renders twice per page as a raw `<img>`.
- **653 gallery images (157 MB)** live in `lib/galleryData.js` as local paths. The gallery renders 12 at a time, which is good, but each one is a full-resolution catalogue page scan.
- **103 MB of PDFs** are linked directly from the catalogue modal. A user clicking "Vol-02" downloads 37 MB from your origin.

Because these sit in `public/`, they are also part of every deploy — slow builds and slow cold starts.

### 🔴 Critical — fonts are loaded twice, and one path is render-blocking

`app/layout.js` loads Inter and Outfit through `next/font/google`, which self-hosts the files and injects them with zero extra network round-trips. That is the correct approach.

But `app/globals.css` line 1 **also** does:

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:...&family=Outfit:...&display=swap');
```

A CSS `@import` at the top of a stylesheet is **render-blocking**: the browser must fetch `fonts.googleapis.com`, then fetch `fonts.gstatic.com`, before it can paint. That is two extra DNS lookups + TLS handshakes + round-trips on the critical path, downloading fonts that `next/font` has *already* self-hosted. It is pure waste and it directly delays First Contentful Paint.

Also, `--font-sans` / `--font-heading` are declared twice with conflicting values — `next/font` sets them to its generated family names on `<body>`, while `@theme` in `globals.css` hardcodes them to `'Inter', sans-serif`. The `@theme` values win inside `@layer base`, meaning **the self-hosted `next/font` files may never be used at all** and you fall back to the render-blocking Google copy.

### 🟠 High — `<img>` used instead of `next/image` in the hot path

| File | Element | Issue |
| --- | --- | --- |
| `components/Home/Hero.jsx:58` | `<img src="/hero-laser.png">` | LCP image, unoptimised, no `priority`, no width/height → layout shift |
| `components/Header.jsx:59` | `<img src="/RG-Tech-Logo.png">` | 160 KB, every page |
| `components/Footer.jsx:17` | `<img src="/RG-Tech-Logo.png">` | 160 KB, every page |
| `components/Service/ServiceClient.jsx:38,68,129` | 3 × `<img>` | Service pages are your SEO landing pages — these are the pages Google measures |
| `components/Gallery/GalleryClient.jsx:47` | `<img>` | Gallery hero |
| `app/blog/page.js:55`, `app/blog/[slug]/page.js:90` | `<img>` | Blog heroes |

`next/image` gives automatic AVIF/WebP, responsive `srcset`, lazy-loading and reserved space (no CLS). These bypass all of it.

Where `next/image` *is* used, `app/blog/page.js:79` and `components/Admin/AdminClient.jsx:200` pass **`unoptimized`**, which disables the optimiser entirely.

### 🟠 High — no `sizes` on fill/responsive images

`components/Gallery/GalleryClient.jsx:82` renders `<Image width={600} height={400}>` inside a CSS `columns` masonry layout. Without a `sizes` attribute Next generates a `srcset` for the full viewport width, so a phone downloads a desktop-sized image.

### 🟡 Medium — dead Vite application shipped in the repo

The repo contains a **complete second application** that is never built or served:

```
src/main.jsx          ← Vite entry point
src/App.jsx
src/index.css
src/galleryData.js    ← duplicate of lib/galleryData.js
vite.config.js
index.html            ← Vite HTML shell
```

`package.json` has no Vite dependency and no Vite script, so this is orphaned. It does not slow the site down at runtime, but it bloats the repo, confuses the build, and `src/galleryData.js` is a stale duplicate that will drift from `lib/galleryData.js`.

Also orphaned in `public/`: `saved_resource.html` (119 KB), `embed.html` (51 KB), `css` (83 KB), `js`, `vt`, `vt(1)`…`vt(7)`, `qr6lmc96iv`, and 13 loose `photo-*.webp` files. These are scraped page dumps, not site assets.

### 🟡 Medium — 653-item array shipped to the browser

`lib/galleryData.js` is 654 lines and imported by `components/Gallery/GalleryClient.jsx`, which is a `"use client"` component. The **entire 653-item array is serialised into the client bundle** even though only 12 items render initially. That is roughly 90 KB of JSON in the JS payload before a single image loads.

### 🟡 Medium — secrets committed in source

`lib/data.js:12` contains `ADMIN_PASSWORD = 'RGTECH2026'` in plain text, in a file imported by client components. This ships to every visitor's browser. Not a performance issue, but it should not stay there — it belongs in an environment variable checked server-side.

### 🟢 Low — `reactStrictMode` double-renders in dev only

`next.config.js` sets `reactStrictMode: true`. This is correct and has no production cost.

---

## 3. Priority order

| # | Fix | Impact | Effort |
| --- | --- | --- | --- |
| 1 | Move 653 images + PDFs to Cloudinary CDN, serve via responsive transforms | ⭐⭐⭐⭐⭐ | Medium |
| 2 | Delete the render-blocking `@import` in `globals.css`, single font via `next/font` | ⭐⭐⭐⭐ | Trivial |
| 3 | Replace `<img>` with `next/image` in Hero / Header / Footer / Service / Gallery | ⭐⭐⭐⭐ | Low |
| 4 | Compress / replace `hero-laser.png` (872 KB) and `RG-Tech-Logo.png` (160 KB) | ⭐⭐⭐⭐ | Trivial |
| 5 | Add `sizes` to responsive images; drop `unoptimized` | ⭐⭐⭐ | Trivial |
| 6 | Delete the dead Vite app and scraped junk in `public/` | ⭐⭐ | Trivial |
| 7 | Move gallery data server-side / paginate it out of the client bundle | ⭐⭐ | Medium |
| 8 | Move `ADMIN_PASSWORD` to a server-checked env var | — (security) | Low |

TypeScript does not appear on this list, because it would not change a single number.
