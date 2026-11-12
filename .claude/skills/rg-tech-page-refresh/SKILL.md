---
name: "rg-tech-page-refresh"
description: "Daily refresh audit for rgtechengineeringworks.com. Audits 2 pages a day (blog posts in Sanity, pillar and service pages in the repo) for AI-sounding wording, typos, em and en dashes, repeated FAQs, thin or over-long meta, missing internal links and broken links. Writes every suggestion to the approval sheet with a before-and-after and a blast radius, then applies only the rows marked Approved and takes them live."
---

# RG Tech page refresh

Every day this skill audits **2 pages** of rgtechengineeringworks.com, writes each proposed change to the
approval sheet as a before-and-after a non-technical reader can judge, and on a later run applies only the
rows that were marked `Approved` and takes them live.

Nothing is ever changed without an approval in the sheet. Audit mode is strictly read-only.

Two modes. Take the mode from the request; a scheduled run names it.

| Mode | Trigger | Steps |
|---|---|---|
| `audit` | "run the page audit", the morning scheduled run | A1 to A8 |
| `apply` | "apply approved page changes", the evening scheduled run | P1 to P8 |

Every scheduled run starts with no memory. Read all state from the sheet, Sanity, the repo and the live site.
Never rely on anything remembered from a previous run.

---

## Hard rules

1. **Audit mode never writes.** Not to Sanity, not to the repo, not to git. It reads and proposes only.
2. **Never apply a row whose Approval is not exactly `Approved`.** Empty, `Pending`, `Rejected` and anything
   else are left alone. A typo in that cell means "not approved".
3. **Never invent a fact.** No capacities, tolerances, materials, prices, turnaround times, certifications,
   project counts or client names that are not already on the site or in the repo. If a sentence needs a fact
   you cannot source, leave the sentence alone.
4. **Edit fragments, never regenerate a page.** Each suggestion replaces one exact piece of text.
5. **Never change** a slug, URL, H1, heading structure, image, component, layout or any design token. This
   skill changes words, links and FAQs. It does not touch UI. If a fix would need a UI change, skip it and say
   so in the report.
6. **Never remove an existing link** unless it is a `Broken Link` row that was approved.
7. **Hyphens only.** The site's standing style rule is hyphens, never em (`—`) or en (`–`) dashes. Every
   suggestion you write must obey it, and finding them is check 3.
8. **Blast radius before approval.** Repo pages are templates: one edit can change hundreds of URLs. Every
   row must carry the true count in `Pages Affected` (A6). Never guess it.
9. **Two pages a day means two pages.** Do not widen the run because the pages were clean. A quiet day is a
   normal result and a short report is the correct output.
10. **ISO certification is confirmed.** Do not flag "ISO CERTIFIED" as an unverified claim.

---

## Setup (both modes)

### 1. Repo and working directory

Work in the repository root (the directory holding `lib/sanity.js` and `app/`). Confirm it is clean before
`apply` mode does anything: `git status --porcelain`. If it is dirty, stop and report; never apply changes on
top of someone else's uncommitted work.

### 2. Config

Read `.env.local` in the repo root for `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET` and
`SANITY_API_TOKEN`. Read the sheet bridge settings from the same file:

| Key | Meaning |
|---|---|
| `REFRESH_SHEET_URL` | the Apps Script `/exec` URL of the audit bridge |
| `REFRESH_SHEET_SECRET` | the shared secret the bridge checks |
| `REFRESH_SHEET_ID` | the spreadsheet id, used only to build the link in the report |

If any of the three is missing, stop and tell the user to deploy `apps-script/AuditBridge.gs` (instructions in
that file's header) and add the keys. Do not fall back to a different sheet.

**Never print a token or secret** in output, in the sheet, or in a commit. Pass them through environment
variables or a `chmod 600` file in the scratchpad.

### 3. Sheet bridge

All sheet reads and writes go through the Apps Script bridge, not a Sheets connector, so scheduled runs need
no interactive sign-in.

```
curl -s -L -m 120 -H 'Content-Type: application/json' \
     --data-binary @body.json "$REFRESH_SHEET_URL"
```

Do **not** pass `-X POST`: Apps Script replies with a redirect that must be followed as a GET, and `-X` forces
the wrong verb on the redirect. Body shape:

```json
{"secret": "...", "action": "read|append|upsert|update", "tab": "...", "rows": [...]}
```

`upsert` matches on the tab's key column and writes only the fields given. `update` never appends.
Check `"ok": true` on every reply; a reply without it is a failure, even with HTTP 200.

### 4. Sheet tabs

| Tab | Key column | Purpose |
|---|---|---|
| `Page Register` | `Page ID` | every auditable page and when it was last looked at |
| `Suggestions` | `Suggestion ID` | the approval surface, the only tab a human needs |
| `Patches` | `Suggestion ID` | hidden; the machine-readable change for each row |
| `Apply Log` | append only | what went live, when, and the rollback point |
| `Settings` | `Setting` | knobs, read every run |

`Suggestions` columns, in order:

```
Suggestion ID | Date | Page Title | Page URL | Page ID | Kind | Category | Section |
Current Text | Suggested Text | Your Edited Text | Why It Helps | Pages Affected |
Anchor Text | Link Target | Approval | Notes | Applied Status | Applied At
```

Categories: `AI Wording`, `Typo / Grammar`, `Dash Style`, `FAQ`, `Meta / SEO`, `Internal Link`,
`Broken Link`, `Image Alt`.

### 5. Settings

Read the `Settings` tab every run and use its values over the defaults here.

| Setting | Default |
|---|---|
| Pages per day | 2 |
| Days before a page is audited again | 60 |
| Max internal links added per page | 3 |
| Max FAQs per page | 8 |
| FAQ similarity threshold | 0.60 |
| Kinds allowed | `post, pillar` |
| Paused | `No` |

If `Paused` is `Yes`, report that in one line and stop.

### 6. The two kinds of page

| Kind | Where the words live | How it goes live | Blast radius |
|---|---|---|---|
| `post` | Sanity, `_type == "post"` | Sanity write, then ISR | 1 URL |
| `pillar` | a file under `lib/` in the repo | commit, push, Railway deploy | 4 or more URLs |
| `service` | `pillarServices` in `lib/data.js` | commit, push, Railway deploy | up to ~200 URLs |

`service` is **off by default** in `Kinds allowed` because one edit can rewrite a couple of hundred indexed
pages. Only audit it when the Settings row says so.

#### Sanity

12 posts at the time of writing. Read with the project's own client:

```
node --env-file=.env.local -e "..."   # @sanity/client is already a dependency
```

A post's shape: `title`, `slug.current`, `summary`, `tldr`, `metaTitle`, `metaDescription`, `keywords`,
`body` and `faqs`.

`body` is **Portable Text, not HTML**. It is an array of blocks, each with a `_key`, each holding `children`
spans that each have their own `_key` and `text`. A patch therefore addresses a block `_key` and a span
`_key` - never a string offset, and never a regenerated array.

`faqs` is an array of `{_key, _type: 'faq', question, answer}`.

The blog post route has `revalidate = 3600`, the listing and sitemap `300`. So a Sanity change is live within
the hour without a deploy. Say that in the report rather than claiming it is instant.

#### Repo pillar pages

Hand-written copy lives in `lib/stainlessSteel.js`, `lib/nameEngraving.js`, `lib/aluminum.js`,
`lib/copper.js`, `lib/mildSteel.js` and `lib/jobWork.js`. Each exports a content object with its own FAQ list.
`lib/servicePage.js` is the shared template and `lib/data.js` holds `pillarServices`.

---

## Mode: audit

### A1. Sync the register

Build the current list of auditable pages and `upsert` it into `Page Register`: Page ID
(`post:<slug>` or `pillar:<lib-file-basename>`), Kind, Title, URL, Source (the Sanity `_id` or the repo path),
Last Audited, Open Suggestions. Never write `Last Audited` here in audit mode except in A7.

- Posts: query Sanity for every `_type == "post"` with its slug and title.
- Pillars: the six `lib/` files above.

### A2. Pick the day's pages

From the register, take pages whose `Kind` is in `Kinds allowed`, ordered by **oldest `Last Audited` first**,
skipping any that:

- were audited inside the re-audit window, or
- already have open suggestions awaiting approval.

Take `Pages per day` of them. If fewer qualify, take what there is and say so. If none do, report
"every page is inside the re-audit window" and stop.

### A3. Gather, once per run

- **The live page** for each picked page (`curl -s`), to see what a reader actually gets.
- **The link target inventory**: read `https://www.rgtechengineeringworks.com/sitemap.xml` and keep every URL.
  A suggested internal link may only point at a URL in that sitemap that returns 200. Nothing else.
- **The FAQ corpus**: every FAQ question across all Sanity posts *and* all six pillar files. This is what
  check 4 compares against, so it has to be the whole corpus, not just the page being audited.
- **The page's primary keyword**: `keywords[0]` if set, else `metaTitle`, else inferred from the slug and H1.
  When inferred, say so in `Why It Helps`.

### A4. The checks

Run all eight on each page. Each finding is one row. When a check finds nothing, say nothing - do not
manufacture work to fill the sheet.

**1. AI wording.** Sentences that read as machine-written. Suggest a plain rewrite of that one sentence, or
deletion when it carries no information. Watch for: delve, dive into, deep dive, unlock, unleash, elevate,
empower, leverage (as a verb), seamless, seamlessly, robust, game-changer, revolutionise, cutting-edge,
navigate the landscape, in today's fast-paced world, ever-evolving, it is no secret that, look no further,
the world of, at the end of the day, when it comes to, plays a crucial role, plays a pivotal role, a testament
to, tapestry, realm, harness the power, in conclusion, in this article we will, whether you are a ... or a ...,
and the three-item rule-of-three flourish ("faster, cleaner and more precise"). Also flag a sentence that
states nothing a customer could act on. Category `AI Wording`.

**2. Typos and grammar.** Spelling, grammar, punctuation, doubled words, and product or place names written
wrongly: "Chennai" not "chennai", "CNC" not "cnc", "stainless steel" not "Stainless Steel" mid-sentence,
"RG Tech Engineering Works" in full on first mention. One row per sentence. Category `Typo / Grammar`.

**3. Dash style.** Any `—` (em) or `–` (en) dash. The rule is hyphens only, everywhere. Replace with a hyphen,
or better, recast the sentence: an em dash is usually a comma, a full stop or a colon. Give the whole sentence
as Current and Suggested so the reader sees the shape, not a lone character. Category `Dash Style`.

> There are about 163 of these in Sanity across the 12 posts. Do **not** try to clear them in one run. Take at
> most 5 per page per day, worst-reading first, so each run stays reviewable.

**4. FAQ quality.** Three separate problems:

   - **Repetition.** Compare this page's FAQ questions against the whole A3 corpus. Normalise (lowercase, drop
     punctuation and stop words) and score by token overlap, Jaccard style. At or above the similarity
     threshold, the pair counts as a duplicate. When two pages ask the same question, the one on the *less
     relevant* page is the one to rewrite or drop. Say which page it collides with in `Why It Helps`.
   - **Thin answers.** An answer under 30 words, or one that restates the question, or one that answers a
     different question than it asks.
   - **A real gap.** Add an FAQ only when a buyer would genuinely ask it and no FAQ on the page answers it.
     Source it from the page's own content, never from outside knowledge about laser cutting.

   Keep the page at or under `Max FAQs per page`. Answers 40 to 80 words, plain language, no links.
   Category `FAQ`. For a new FAQ, Current Text is empty and Suggested Text is `Q: ...` then a newline `A: ...`.

**5. Meta title and description.** Title at most **60 characters** including the ` | RG Tech` suffix,
description at most **155**. Both must contain the primary keyword, read like a sentence a person wrote, and
give a reason to click. Flag a title that is far **under** length too - one post's is 29 characters, which
wastes the whole SERP line. Category `Meta / SEO`.

**6. Internal links.** Add at most `Max internal links added per page`.

   - The anchor must be a phrase **already present** in a sentence and already reading naturally. Only if no
     such phrase exists may you lightly reword one sentence, and then the reworded sentence goes in the row so
     the reader approves the wording, not just the link.
   - Relevance is the whole point: link to the page that genuinely answers what the anchor sentence raises.
     A gate page links to gates. Do not link a stainless page to an unrelated city page for the sake of it.
   - Never link to a page this page already links to. Never put a link in a heading, in the first sentence, or
     two in one sentence. Never "click here" or "read more".
   - Target must be in the A3 sitemap and return 200.
   - Category `Internal Link`; fill `Anchor Text` and `Link Target`.

**7. Broken links and images.** Request every link and image on the page. Report 404, 410 and 5xx (suggest the
redirect target if one exists, otherwise remove the link and keep the words), and images with no `alt` or
useless `alt` ("image", "photo", the filename). Suggest real alt text describing the actual object. If a host
is simply unreachable from this environment, skip it and say so - do not report it as broken.
Category `Broken Link` or `Image Alt`.

**8. Unsupported claims.** Any superlative or number a competitor could challenge and the site cannot
substantiate: "best in Chennai", "No. 1", "cheapest", a project count, a client logo claim, a tolerance or
thickness that contradicts `lib/data.js`. Suggest either the sourced version or removal. ISO certification is
confirmed and is not a finding. Category `Typo / Grammar`, with `Why It Helps` beginning `Claim:`.

### A5. Write each suggestion for two readers

Every row serves a person approving it and a machine applying it.

**For the person** - `Current Text` and `Suggested Text` are plain readable prose with no markup, no
Portable Text, no JSON. Enough surrounding words that the sentence makes sense alone. `Why It Helps` is one
sentence in plain English, naming the benefit, not the rule: "The title is 78 characters so Google cuts it
off mid-word; this is 58 and puts the service first."

**For the machine** - a patch in the hidden `Patches` tab:

```json
{"id": "S-20261112-01", "pageId": "post:laser-cutting-cost-guide", "kind": "post",
 "source": "<sanity _id or repo path>",
 "field": "body|faqs.add|faqs.edit|faqs.remove|metaTitle|metaDescription|summary|repo",
 "blockKey": "<block _key>", "spanKey": "<span _key>",
 "find": "<exact current text>", "replace": "<exact new text>",
 "faqKey": "<for faqs.edit and faqs.remove>",
 "faq": {"question": "...", "answer": "..."},
 "file": "<for kind repo>", "lineHint": 123}
```

- For `post` body edits, `find` must appear **exactly once** inside that span's `text`. Widen it until it does.
- For `repo`, `find` must appear **exactly once in the whole file**. Widen it until it does. Record the file
  path relative to the repo root.
- Two suggestions must never overlap the same text. Merge them into one row instead.

Suggestion IDs: `S-<YYYYMMDD>-<NN>`, numbered across the whole run.

### A6. Blast radius

Fill `Pages Affected` with the real number, computed, never estimated.

- `post`: always `1`.
- `pillar`: count the live URLs that render that file. Read the city list the file exports and count only
  cities whose route is actually wired. Cross-check against the A3 sitemap: the number must equal how many
  sitemap URLs contain that pillar's slug.
- `service`: the pillar URL plus its locality URLs, counted from the sitemap for that service slug.

If the sitemap count and the code's own city list disagree, use the sitemap number and note the disagreement
in the report - it usually means a release gate is still closed.

### A7. Save

1. `upsert` every patch into `Patches` (key `Suggestion ID`): Suggestion ID, Page ID, Field, Patch JSON as a
   string. Build the JSON in a file and send it with curl; never retype the text by hand.
   Keep a copy in the scratchpad as well.
2. `append` the rows to `Suggestions` with Approval `Pending`, Applied Status `Not Applied`, and
   `Your Edited Text` empty.
3. `upsert` `Last Audited` = today and `Open Suggestions` = the row count onto each audited page in
   `Page Register`.

### A8. Report

Short, plain, and honest. For each page: its title and URL, the counts by category, and the one change you
would make first if only one were approved. Then: anything skipped and why, any check that could not run, and
the sheet link with a reminder that nothing happens until `Approval` says `Approved`.

A page with no findings is reported as "no changes worth making", not padded.

---

## Mode: apply

### P1. Find approved work

`read` `Suggestions`. Take rows where Approval is exactly `Approved` **and** Applied Status is `Not Applied`
or empty. If there are none, report "no approved changes today" and stop. Group the rows by Page ID.

### P2. Load the patches

`read` `Patches`, match by Suggestion ID, parse `Patch JSON`. A row with no patch is marked `Failed` with the
reason in `Notes` - never guess the patch back from the text.

### P3. Honour human edits

If `Your Edited Text` is filled, it replaces the suggested wording. If it is empty, `Suggested Text` is used as
it stands. If someone edited `Suggested Text` in place and left `Your Edited Text` empty, treat the edited cell
as their wording.

Before using any human wording, check it for spelling, for the check-1 AI terms and for em and en dashes. If
it has any, do not apply that row: leave it `Not Applied` and write exactly what to fix in `Notes`
("'stainles' is misspelled"). Never silently correct someone's words.

### P4. Apply, per page

**Back up first, always.**

- `post`: fetch the whole document and write it to the scratchpad as
  `refresh-backup-<slug>-<YYYYMMDD-HHMM>.json`. Then apply patches to an in-memory copy:
  - `body`: find the block by `_key`, the span by `_key`, confirm `find` occurs exactly once in that span's
    `text`, and replace. If it does not occur exactly once, mark the row `Conflict - Skipped`: the text changed
    since the audit.
  - `faqs.add` appends. `faqs.edit` replaces the question and answer of the FAQ with that `_key`.
    `faqs.remove` drops it. A missing `_key` is a `Conflict - Skipped`.
  - meta fields: set the value and re-check the 60 and 155 limits.
  Write with a single `client.patch(_id).set({...}).commit()`.
- `repo`: confirm `git status --porcelain` is still clean, then apply each patch with an exact string
  replacement in the named file, confirming `find` occurs exactly once first.

**Safety checks before writing.** If any fails, apply nothing to that page, mark its rows `Failed` and report:

- the number of links did not fall, except for approved `Broken Link` rows;
- the number of body blocks is unchanged;
- no heading text changed;
- total text length moved by less than 15%;
- the result contains no `—`, no `–`, and none of the check-1 AI terms;
- for `repo`, `node --check` passes on every edited file.

### P5. Take it live

- `post`: the Sanity write is the publish. The page is live within its ISR window (one hour), the listing and
  sitemap within five minutes. Do not claim it is instant.
- `repo`: stage only the files this run edited - never `git add -A`. Commit with a message naming the page and
  the approved rows, ending with the repository's standard attribution line. Push to `main`. Railway deploys
  from `main`; poll `railway status` until it leaves `Building` and `Deploying`.

### P6. Verify on the live site

For every applied page, fetch the live URL and confirm: HTTP 200, the H1 is unchanged, and the new wording is
actually present. For a `post`, if the ISR window has not elapsed, say the change is queued rather than
reporting it as verified.

If verification fails: restore from the backup for a `post`, or `git revert` the commit for a `repo` page,
mark the rows `Failed`, and report what happened. Never leave a half-applied page.

### P7. Update the sheet

`update` each row with Applied Status (`Applied`, `Conflict - Skipped` or `Failed`) and Applied At.
Keep `Notes` to a sentence a non-technical reader understands.

`append` one `Apply Log` row per page: Date, Page Title, Page URL, Page ID, Kind, Changes Applied,
Changes Skipped, Summary, Backup Path or Commit SHA, Live Check (`OK`, `Queued` or `Failed`).

`upsert` `Open Suggestions` back down on each page in `Page Register`.

### P8. Report

One line per page: what went live, what was skipped and why, and the rollback point (backup file or commit
SHA). Name every `Conflict - Skipped` and `Failed` row with its reason.

---

## Failure handling

When a step fails, write the failure where the next run will find it - `Notes` on the row, the `Apply Log`,
and the report - and leave the sheet describing reality rather than intent.

If the bridge is unreachable (curl exit `000`), finish the audit anyway, save the rows to the scratchpad as
`refresh-suggestions-<YYYY-MM-DD>.json`, and say in the report which host was blocked and that nothing was
written to the sheet.

Never mark a row `Applied` that you did not verify. A run that half-worked is reported as half-worked.
