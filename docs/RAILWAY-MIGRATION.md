# Netlify → Railway migration runbook

The site is a Next.js app with server-rendered routes, API routes and ISR, so it
needs a running Node process — not a static host. Railway runs it as a container
with `next start`, which is the same command used locally.

Nothing in this repo is Netlify-only any more except `netlify.toml` and the
`@netlify/plugin-nextjs` devDependency, both of which stay in place until DNS has
cut over. Until then, both platforms can build the same commit.

## Why this migration is low risk

| Concern | Status |
|---|---|
| Port binding | `next start` reads `PORT`, which Railway injects. No change needed. |
| Image optimisation | Already delegated to Cloudinary via a custom loader (`next.config.js`), so Next's own optimiser — the usual memory hog on a container — is bypassed in production. |
| Deploy trigger | Railway deploys on git push. The locality release workflow already works by committing `content/published-locations.json`, so it keeps working untouched. |
| `/og` image route | Already `runtime = 'nodejs'`. No edge runtime to port. |
| Apex → www redirect | Moved from `netlify.toml` into `next.config.js` `redirects()`. Host-scoped, so localhost and `*.up.railway.app` are unaffected. Emits 308 rather than the old 301 — equivalent for canonicalisation. |

## Environment variables

Set these on the Railway service **before** the first deploy. Values are in
`.env.local`, which is gitignored — copy them across, do not commit them.

### Required

| Variable | Used by | Breaks if missing |
|---|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | blog | `/blog` and every article |
| `NEXT_PUBLIC_SANITY_DATASET` | blog | same |
| `SANITY_API_TOKEN` | blog reads/writes | same |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | image loader | **every image on the site** — without it `next.config.js` silently falls back to Next's own optimiser and the Cloudinary URLs 404 |
| `LEADS_EXPORT_KEY` | `/api/leads` | the CSV export the Google Sheet pulls via `IMPORTDATA` returns 500 |

### Optional

| Variable | Default if unset |
|---|---|
| `NEXT_PUBLIC_SANITY_API_VERSION` | falls back in `lib/sanity.js` |
| `APPS_SCRIPT_URL` | falls back to the constant in `lib/data.js` |

`CLOUDINARY_API_KEY` / `CLOUDINARY_API_SECRET` / `CLOUDINARY_FOLDER` are used only
by the local `cloudinary:*` upload scripts. They do not belong on the server.

## Cutover order

Do it in this order so the live site is never pointed at an unverified deploy.

1. `railway login`, then `railway init` in this directory (or link an existing
   project with `railway link`).
2. Set the environment variables above.
3. Deploy and wait for the build. Railway auto-detects Next.js; `railway.json`
   only adds a healthcheck on `/` and a restart policy.
4. **Verify on the generated `*.up.railway.app` URL, before touching DNS:**
   - `/` renders and images load (confirms the Cloudinary loader has its cloud name)
   - a service page, e.g. `/chennai/laser-cutting-services-in-adyar`
   - `/blog` and one article (confirms Sanity credentials)
   - `/sitemap.xml` returns ~617 `<loc>` entries
   - `/og?title=Test` returns a PNG
   - `/api/leads?key=<LEADS_EXPORT_KEY>` returns CSV
5. Add `www.rgtechengineeringworks.com` and `rgtechengineeringworks.com` as
   custom domains in Railway and let it issue certificates.
6. Lower the DNS TTL on the existing records first, wait for the old TTL to
   expire, then repoint. This keeps the switchover window short.
7. Confirm `http://rgtechengineeringworks.com` redirects (308) to the `www` host.

## After cutover is confirmed stable

Only once traffic is served by Railway:

- delete `netlify.toml`
- `npm uninstall @netlify/plugin-nextjs`
- delete the "Trigger Netlify rebuild" step from
  `.github/workflows/publish-blog.yml`. It is already optional and its own
  comment notes the rebuild is not required, because Sanity is the source of
  truth for the blog and `/blog` revalidates hourly.

## Known behaviour differences

- **ISR cache is on the container's local disk.** It is discarded on every
  redeploy and is not shared between replicas. Fine at one replica; the hourly
  revalidate simply refetches after a deploy. Do not scale past one replica
  without moving to a shared cache handler.
- **No CDN in front by default.** Netlify cached static assets at the edge.
  Consider putting Cloudflare in front of the Railway domain for `/_next/static`
  if asset latency matters.
- **Pick the region closest to the audience.** The traffic is Indian; choose the
  nearest available Railway region at service creation, because it cannot be
  changed later without recreating the service.
