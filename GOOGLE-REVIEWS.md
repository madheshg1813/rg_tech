# Google reviews on the homepage

The "Voice of Trust" section on `/` renders live reviews from the Google Business
Profile. Until a credential is configured it renders the three hand-written
testimonials in `lib/data.js` instead, so the section is never empty and a
review-API outage can never fail a build.

## Files

| File | Role |
| --- | --- |
| [lib/googleReviews.js](lib/googleReviews.js) | Server-only fetch. Picks a source, normalises, drops ratings-only reviews, sorts newest first. |
| [components/Home/Testimonials.jsx](components/Home/Testimonials.jsx) | Async server component. Fetches, then renders live reviews or the static fallback. |
| [components/Home/GoogleReviews.jsx](components/Home/GoogleReviews.jsx) | Server component. Section heading, the rating badge, the card grid, the two CTAs. |
| [components/Home/GoogleReviewCard.jsx](components/Home/GoogleReviewCard.jsx) | One card. Client component, only for the Read more toggle. |
| [components/Home/GoogleReviewParts.jsx](components/Home/GoogleReviewParts.jsx) | `starsOf`, `Stars`, `GoogleG` — shared across the server/client boundary. |

The Place ID is already committed as `GMB_PLACE_ID` in
[lib/data.js](lib/data.js); nothing below needs it supplied again.

## Turning it on

Pick one source and put it in `.env.local` locally, and in the host's environment
variables for production. If both are set, Featurable wins.

### Option 1 — Featurable (recommended)

Free, and returns the **full review history** plus Google's real total count and
average.

1. Sign in at <https://featurable.com/app/widgets> with the Google account that
   owns the Business Profile.
2. Create a widget for **RG Tech Engineering Works**.
3. Copy the widget ID out of the dashboard (a UUID) and set:

```bash
FEATURABLE_WIDGET_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

Featurable refreshes its own copy of the reviews roughly every 48 hours, which is
why the homepage revalidates every 12 and not faster.

### Option 2 — Google Places API

Needs only a Google Cloud key, but **Places returns at most the 5 most recent
reviews** — that is a hard limit of the API, not of this code.

1. In <https://console.cloud.google.com>, create a project and enable
   **Places API**.
2. Create an API key. Restrict it to the Places API.
3. Set:

```bash
GOOGLE_PLACES_API_KEY=AIza...
```

Keep this key server-side only. It is read in `lib/googleReviews.js`, which is
never imported from a client component, and the name has no `NEXT_PUBLIC_`
prefix, so it is not exposed to the browser.

### Option 3 — neither

The static testimonials render. This is the current state of the repo.

## Freshness

`app/page.js` sets `export const revalidate = 43200` (12 hours). Reviews are
fetched during static generation, so a new review appears on the next
regeneration after that window — not instantly. Lowering it makes reviews appear
sooner at the cost of regenerating the homepage more often.

## Two deliberate decisions

**No `AggregateRating` structured data.** The rating is shown visually and links
to the live listing, but no review schema is emitted from our own domain. This
matches the long-standing reasoning in
[components/GoogleRating.jsx](components/GoogleRating.jsx): self-serving review
markup is the thing Google penalises. Do not add it without revisiting that.

Note that `components/GoogleRating.jsx` still carries a **hardcoded** `5.0`, used
on the locality and service pages. The homepage now shows the live figure, so
those two can disagree. Wiring that badge to `getGoogleReviews()` is the obvious
follow-up and was left out of scope.

**Reviewer photos are not used.** Cards use the initials avatar from
`components/Avatar.jsx` rather than the Google-hosted profile image. It keeps the
cards consistent with the rest of the site, avoids adding
`lh3.googleusercontent.com` to `next.config.js` (which the Cloudinary loader
would then need to pass through), and loads no Google asset into the visitor's
browser. The photo URL is still carried on each review object if this is ever
reversed.

## Why `react-google-reviews` is not a dependency

The <https://github.com/featurable/react-google-reviews> library was the starting
point, and the data contract here is still its `GoogleReview` shape — including
the same Places-response mapping its `dangerouslyFetchPlaceReviews` helper
performs. The library itself could not be used to render this section, for two
reasons found while wiring it up:

1. **It cannot be imported from a server module at all.** Its entry point pulls
   in `@emotion/react`, which calls `React.createContext` at module scope. The
   `react-server` export condition does not export `createContext`, so the build
   fails with `$.createContext is not a function`.

2. **It renders nothing during SSR, even behind `'use client'`.** Passing
   `reviews` as a prop does not render them — the component copies the prop into
   internal state inside a `useEffect`, and effects do not run on the server. Its
   `renderer` is therefore called with an empty array during prerender: the
   homepage HTML came out with zero review cards, and they appeared only after
   hydration.

For a trust section on an otherwise fully prerendered, SEO-driven page, that
meant reviews invisible to crawlers and a block of content shifting in after
paint, in exchange for ~37 KB gzipped of carousel and CSS-in-JS that a
custom-styled grid never uses.

If the stock Google-branded widget is ever preferred, the library does that part
well — `npm i react-google-reviews`, then `layout="carousel"` or `"badge"` with
its `dist/index.css`, inside a client component, accepting that it paints after
hydration.

## Testing without a real credential

`FEATURABLE_API_BASE_URL` overrides the Featurable host (it mirrors the library's
own `apiBaseUrl` prop). Point it at a local server that returns a v1 widget
payload — `{ success, profileUrl, totalReviewCount, averageRating, reviews[] }` —
to exercise the live path:

```bash
FEATURABLE_WIDGET_ID=test FEATURABLE_API_BASE_URL=http://127.0.0.1:4599 npm run build
```

Worth covering, since all of these have been wrong at some point: a `"FIVE"`
enum rating as well as a numeric one, a ratings-only review with no text (it must
be dropped from the cards but must not change the average), an anonymous
reviewer, and a comment long enough to trigger Read more.
