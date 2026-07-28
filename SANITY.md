# Sanity CMS + blog

Project **RG Tech Engineering** (`2a9iugna`), dataset `production` — both verified
against the Sanity API.

## ✅ Published

```
$ npm run sanity:publish
  ✓ read access OK
  ✓ write access OK
  ✓ author    Madhesh G
  ✓ category  Laser Cutting Guides
  ✓ post      What Is CNC Fiber Laser Cutting? A Complete Guide
✓ Published: /blog/what-is-cnc-fiber-laser-cutting
```

Live at `/blog/what-is-cnc-fiber-laser-cutting`, statically generated at build
time via `generateStaticParams`, revalidating hourly.

Re-run `npm run sanity:publish` any time — documents use fixed `_id`s and are
created-or-replaced, so it updates the post rather than duplicating it.
`npm run sanity:publish:draft` stages it as a draft instead.

## The `production` dataset is PRIVATE — this matters

The first publish succeeded but the blog still showed nothing. Cause: the
dataset is private, and the read client was anonymous.

```
anonymous  count(*[_type=="post"])  ->  0
with token count(*[_type=="post"])  ->  1
```

`lib/sanity.js` now passes `SANITY_API_TOKEN` on reads. That variable has **no**
`NEXT_PUBLIC_` prefix, so Next.js keeps it server-side and never ships it to the
browser — which is safe because every Sanity call happens in a server component.
If you ever need Sanity data inside a `"use client"` component, fetch it in a
server parent and pass it down as props.

Because the API CDN does not serve private datasets, `useCdn` is disabled
whenever a token is present. Pages already cache through ISR
(`revalidate = 3600`), so this costs nothing in practice.

**Alternative:** make the dataset public in sanity.io/manage and drop the token.
Not done here, because a public dataset also makes unpublished drafts
world-readable.

## Two tokens exist, and that is fine

| Token | Role | Use |
| --- | --- | --- |
| `RG Tech Claude` | Access Manager | Cannot read or write content. Harmless, unused. |
| new publish token | Editor | Reads and writes content. This is the one in `.env.local`. |

## The article

`content/what-is-cnc-fiber-laser-cutting.mjs` — written, structured and verified.
Content is deliberately separate from the publishing script so it can be
previewed, revised or re-published without touching transport code.

| Element | Count |
| --- | --- |
| Content blocks | 65 |
| H2 keyword headings | 9 |
| H3 subheadings | 2 |
| Bulleted points | 29 |
| Numbered steps | 5 |
| Images (Cloudinary) | 3 |
| Comparison tables | 2 |
| Callouts (TL;DR / tip / warning) | 3 |
| Internal links | 7 |
| External links | 2 |
| FAQs | 8 |

**H2s** (each targeting a search intent): What Is CNC Fiber Laser Cutting? ·
How the CNC Fiber Laser Cutting Process Works · What Materials and Thicknesses
Can Be Fiber Laser Cut? · CNC Fiber Laser Cutting Tolerance and Accuracy ·
Fiber Laser Cutting vs Plasma vs Waterjet · Where CNC Fiber Laser Cutting Is
Used · How to Prepare Files for CNC Laser Cutting · What Affects the Cost of
Laser Cutting? · Choosing a CNC Fiber Laser Cutting Service

**Internal links** point to all five service pages plus the gallery and contact
form. **External links** go to TWI (laser cutting primer) and ISO 9013 (the
thermal-cut quality standard), both `rel="nofollow noopener noreferrer"`.

## Content model

`sanity/schemas/index.js` defines `post`, `author`, `category`, plus
`contentImage`, `contentTable`, `callout` and `faq` blocks. Plain objects, no
`sanity` studio package required — drop them into a Studio's `schema.types` when
you add one.

Notable fields: `tldr`, `bannerEyebrow/Heading/Subheading/Badge` (the article
banner), `faqs[]`, `keywords[]`, and `*Url` twins on every image field so assets
can live in Cloudinary instead of Sanity.

## Blog design

Rebuilt to match the reference layout:

- **Banner** — brand-gradient card with eyebrow pill, heading, subheading, image and status badge
- **Sticky sidebar** — "In this page" TOC, quote CTA, "Summarize with AI" (ChatGPT / Claude / Gemini / Perplexity), share rail with copy-link
- **Author byline** — avatar, name, role, "Updated on …"
- **TL;DR** callout, category pill, breadcrumb, read time
- **Body** — H2/H3 with anchor ids, amber bullets, numbered steps, bordered tables that scroll on narrow screens, image captions, styled links
- **FAQ accordion** + related posts

The TOC and the rendered headings share `slugifyHeading()` in
`lib/portableText.js`, including the duplicate-heading counter, so anchors can
never drift out of sync.

## Schema.org

Articles emit one linked `@graph`: `BlogPosting` → `author` as a **Person**
(`personSchema()`), `publisher` → the site Organization by `@id`, plus
`BreadcrumbList` and `FAQPage`. Author records carry `jobTitle`, `worksFor` and
optional `sameAs`.

## Adding a Studio (optional)

Not installed — the `sanity` studio package is heavy and publishing works
headlessly. If you want a visual editor:

```bash
npm i sanity next-sanity styled-components
```

then create `sanity.config.js` importing `schemaTypes` from
`sanity/schemas/index.js` and mount it at `app/studio/[[...tool]]/page.jsx`.

## Migration note

The old Google Apps Script blog endpoint returned **0 posts**, so nothing needed
migrating. `APPS_SCRIPT_URL` is still used by the admin page and is otherwise
unreferenced by the blog.
