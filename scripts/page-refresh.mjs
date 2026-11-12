#!/usr/bin/env node
/*
 * RG Tech - daily page refresh audit
 * ----------------------------------
 * The free half of .claude/skills/rg-tech-page-refresh.
 *
 * Most of that skill is measurement rather than judgement: counting characters,
 * finding a character that is not allowed, scoring two FAQ questions for
 * overlap, asking a URL whether it still exists. None of that needs a model, so
 * none of it needs to cost anything. This script does that part on a schedule
 * and writes it to the same approval sheet.
 *
 * What it deliberately does NOT do is write prose. Where a fix needs a sentence
 * rewritten, the row carries the measured problem and an empty suggestion, and
 * a person fills in Your Edited Text. Run the Claude skill by hand when you
 * want those drafted for you.
 *
 *   node scripts/page-refresh.mjs --mode audit   # propose, sheet only
 *   node scripts/page-refresh.mjs --mode apply   # publish approved rows
 *   node scripts/page-refresh.mjs --mode audit --dry-run
 *
 * Audit never writes to Sanity. Apply only ever touches rows whose Approval
 * cell reads exactly "Approved".
 */

import { createClient } from '@sanity/client'
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { register } from 'node:module'
import { fileURLToPath } from 'node:url'

/* Lets the pillar files, which are written for a bundler, import under node. */
register(new URL('./lib/next-resolve.mjs', import.meta.url), import.meta.url)

/* ------------------------------------------------------------------ config */

const args = process.argv.slice(2)
const MODE = (args[args.indexOf('--mode') + 1] || 'audit').toLowerCase()
const DRY = args.includes('--dry-run')

if (!['audit', 'apply'].includes(MODE)) {
    console.error('✖ --mode must be audit or apply')
    process.exit(1)
}

/* Environment first (CI), then .env.local (a developer's machine). */
function env(key, fallback = '') {
    if (process.env[key]) return process.env[key]
    if (!env._file && existsSync('.env.local')) {
        env._file = Object.fromEntries(
            readFileSync('.env.local', 'utf8')
                .split('\n')
                .filter((l) => l.trim() && !l.trim().startsWith('#'))
                .map((l) => {
                    const i = l.indexOf('=')
                    return [l.slice(0, i).trim(), l.slice(i + 1).trim()]
                })
        )
    }
    return (env._file && env._file[key]) || fallback
}

const SHEET_URL = env('REFRESH_SHEET_URL')
const SHEET_SECRET = env('REFRESH_SHEET_SECRET')
const PROJECT_ID = env('NEXT_PUBLIC_SANITY_PROJECT_ID')
const DATASET = env('NEXT_PUBLIC_SANITY_DATASET', 'production')
const TOKEN = env('SANITY_API_TOKEN')
const BASE = 'https://www.rgtechengineeringworks.com'
const BRAND_SUFFIX = ' | RG Tech'   // app/layout.js title template

for (const [k, v] of Object.entries({ REFRESH_SHEET_URL: SHEET_URL, REFRESH_SHEET_SECRET: SHEET_SECRET, NEXT_PUBLIC_SANITY_PROJECT_ID: PROJECT_ID, SANITY_API_TOKEN: TOKEN })) {
    if (!v) { console.error(`✖ ${k} is not set`); process.exit(1) }
}

const sanity = createClient({ projectId: PROJECT_ID, dataset: DATASET, apiVersion: '2024-01-01', token: TOKEN, useCdn: false })

const TODAY = new Date().toISOString().slice(0, 10)
const STAMP = TODAY.replace(/-/g, '')

/* ------------------------------------------------------------------- sheet */

/*
 * Apps Script answers with a redirect that must be followed as a GET, which is
 * why this is a plain POST with redirect: 'follow' and no method override.
 */
async function sheet(action, tab, rows) {
    const res = await fetch(SHEET_URL, {
        method: 'POST',
        redirect: 'follow',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ secret: SHEET_SECRET, action, tab, rows }),
    })
    const text = await res.text()
    let json
    try { json = JSON.parse(text) } catch { throw new Error(`sheet ${action} ${tab}: not JSON: ${text.slice(0, 200)}`) }
    if (!json.ok) throw new Error(`sheet ${action} ${tab}: ${json.error}`)
    return json
}

async function settings() {
    const { rows } = await sheet('read', 'Settings')
    const get = (name, dflt) => {
        const r = rows.find((x) => x.Setting === name)
        return r && r.Value !== '' ? r.Value : dflt
    }
    return {
        perDay: Number(get('Pages per day', 2)),
        reauditDays: Number(get('Days before a page is audited again', 60)),
        maxLinks: Number(get('Max internal links added per page', 3)),
        maxFaqs: Number(get('Max FAQs per page', 8)),
        maxDashes: Number(get('Max dash fixes per page per day', 5)),
        kinds: String(get('Kinds allowed', 'post, pillar')).split(',').map((x) => x.trim()).filter(Boolean),
        faqThreshold: Number(get('FAQ similarity threshold', 0.6)),
        paused: String(get('Paused', 'No')).toLowerCase() === 'yes',
    }
}

/* ------------------------------------------------------------ portable text */

const isBlock = (b) => b && b._type === 'block'
const blocksOf = (p) => (p.body || []).filter(isBlock)
const plain = (b) => (b.children || []).map((s) => s.text || '').join('')
const bodyText = (p) => blocksOf(p).map(plain).join('\n')

/** Every href this post already points at, so nothing is linked twice. */
function existingHrefs(p) {
    const out = new Set()
    for (const b of p.body || []) for (const m of b.markDefs || []) if (m.href) out.add(m.href)
    return out
}

/** The one span inside a block that holds `find`, or null when it is not unique. */
function uniqueSpan(block, find) {
    const hits = (block.children || []).filter((c) => (c.text || '').includes(find))
    if (hits.length !== 1) return null
    if (hits[0].text.split(find).length - 1 !== 1) return null
    return hits[0]
}

/* ------------------------------------------------------------------ checks */

const AI_TERMS = [
    'delve', 'dive into', 'deep dive', 'unlock', 'unleash', 'elevate', 'empower',
    'leverage', 'seamless', 'robust', 'game-changer', 'game changer', 'revolutioni',
    'cutting-edge', 'navigate the landscape', 'fast-paced', 'ever-evolving',
    'it is no secret', "it's no secret", 'look no further', 'the world of',
    'at the end of the day', 'when it comes to', 'crucial role', 'pivotal role',
    'a testament to', 'tapestry', 'realm of', 'harness the power', 'in conclusion',
    'in this article we will',
]

const STOP = new Set('a an the is are was were what how do does can could i you your for of to in on with and or it that this be best from at as by'.split(' '))
const normalise = (q) => q.toLowerCase().replace(/[^a-z0-9 ]/g, ' ').split(/\s+/).filter((w) => w && !STOP.has(w))
function jaccard(a, b) {
    const A = new Set(a), B = new Set(b)
    let hit = 0
    for (const x of A) if (B.has(x)) hit++
    return hit / (A.size + B.size - hit)
}

/**
 * Where this post could link to another and does not.
 *
 * The anchor must be a phrase already sitting in a normal paragraph, so nothing
 * is reworded. When one phrase matches several posts - "laser cutting
 * tolerance" is a keyword on three of them - the target whose title shares the
 * most words with the phrase wins, and the row says it was ambiguous so a
 * person can overrule it.
 */
function linkOpportunities(post, all, max) {
    const taken = existingHrefs(post)
    const found = []

    for (const other of all) {
        if (other.slug === post.slug) continue
        const href = `/blog/${other.slug}`
        if (taken.has(href)) continue

        const phrases = (other.keywords || [])
            .filter((k) => k.split(' ').length >= 2 && !/chennai/i.test(k))
            .sort((a, b) => b.length - a.length)

        for (const phrase of phrases) {
            let placed = null
            for (const b of blocksOf(post)) {
                if (b.style && b.style !== 'normal') continue        // never inside a heading
                if ((b.markDefs || []).length) continue              // never inside a block that already has a link
                const text = plain(b)
                const i = text.toLowerCase().indexOf(phrase.toLowerCase())
                if (i < 0) continue
                const anchor = text.substr(i, phrase.length)
                if (!uniqueSpan(b, anchor)) continue
                placed = { blockKey: b._key, anchor, sentence: text }
                break
            }
            if (placed) { found.push({ target: other, href, phrase, ...placed }); break }
        }
    }

    /* one anchor, several candidate targets: keep the most specific */
    const byAnchor = new Map()
    for (const f of found) {
        const key = f.anchor.toLowerCase()
        const score = jaccard(normalise(f.phrase), normalise(f.target.title))
        const prev = byAnchor.get(key)
        if (!prev || score > prev.score) byAnchor.set(key, { ...f, score, ambiguous: Boolean(prev) })
        else prev.ambiguous = true
    }
    return [...byAnchor.values()].slice(0, max)
}

/*
 * Links and images, taken from the document rather than the rendered page.
 *
 * Scraping the HTML swept up the site chrome: the share row's claude.ai,
 * LinkedIn and Justdial links answer 403 or 503 to a bot while working fine in
 * a browser, and the AI logos beside them carry alt="" because they are
 * decorative, which is correct and not a fault. markDefs and contentImage are
 * the content itself, so neither mistake is possible.
 *
 * A host that refuses us is recorded as unverifiable, never as broken.
 */
const UNVERIFIABLE = new Set([401, 403, 405, 406, 429, 503])

async function contentLinks(post) {
    const out = []
    const seen = new Set()

    for (const b of post.body || []) {
        for (const m of b.markDefs || []) {
            if (!m.href || seen.has(m.href)) continue
            seen.add(m.href)
            const url = m.href.startsWith('/') ? BASE + m.href : m.href
            if (!/^https?:/.test(url)) continue          // mailto:, tel:, #anchor
            try {
                const r = await fetch(url, { redirect: 'follow' })
                if (r.status >= 400 && !UNVERIFIABLE.has(r.status)) {
                    out.push({ kind: 'link', url: m.href, status: r.status })
                }
            } catch {
                /* unreachable from this runner is not the same as broken */
            }
        }
        if (b._type === 'contentImage') {
            const alt = (b.alt || '').trim()
            // alt="" on a decorative image is correct; only a missing or
            // placeholder value is worth anyone's time.
            if (!alt || /^(image|photo|picture|img|graphic)$/i.test(alt)) {
                out.push({ kind: 'image', url: (b.externalUrl || '').slice(0, 120), alt: b.alt ?? '(missing)', blockKey: b._key })
            }
        }
    }
    return out
}

/** Every piece of prose in the document, including the parts outside paragraphs. */
function textNodes(post) {
    const out = []
    for (const b of post.body || []) {
        if (b._type === 'block') {
            for (const c of b.children || []) {
                if (c.text) out.push({ where: 'block', blockKey: b._key, spanKey: c._key, text: c.text, style: b.style })
            }
        } else if (b._type === 'callout' && b.text) {
            out.push({ where: 'callout', blockKey: b._key, text: b.text })
        } else if (b._type === 'contentTable') {
            (b.rows || []).forEach((r) => (r.cells || []).forEach((cell, i) => {
                if (cell) out.push({ where: 'table', blockKey: b._key, rowKey: r._key, cell: i, text: cell })
            }))
        }
    }
    return out
}

/* ------------------------------------------------------------- website */

/*
 * The six hand-written pillar pages.
 *
 * These live in the repo rather than in Sanity, which changes three things:
 * the words are read by importing the module, a fix is a string replacement in
 * a source file, and publishing means a commit and a deploy rather than an API
 * write. One pillar also serves several cities, so a single edit is never a
 * single page - the row carries the real URL count and a person sees it before
 * approving.
 */
const PILLARS = [
    { id: 'stainlessSteel', file: 'lib/stainlessSteel.js', label: 'Stainless steel laser cutting', slug: 'stainless-steel-laser-cutting' },
    { id: 'nameEngraving', file: 'lib/nameEngraving.js', label: 'Name engraving and metal name plates', slug: 'name-engraving-services' },
    { id: 'aluminum', file: 'lib/aluminum.js', label: 'Aluminium laser cutting', slug: 'aluminum-laser-cutting-services' },
    { id: 'copper', file: 'lib/copper.js', label: 'Copper laser cutting', slug: 'copper-laser-cutting-services' },
    { id: 'mildSteel', file: 'lib/mildSteel.js', label: 'Mild steel laser cutting', slug: 'mild-steel-laser-cutting-services' },
    { id: 'jobWork', file: 'lib/jobWork.js', label: 'Laser cutting job work', slug: 'laser-cutting-job-work' },
]

/** Live URLs a pillar actually serves, counted from the sitemap, never guessed. */
async function sitemapUrls() {
    const xml = await (await fetch(`${BASE}/sitemap.xml`)).text()
    return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
}

/** The pillar's exported data object, read by importing the real module. */
async function loadPillar(p) {
    const mod = await import(new URL(`../${p.file}`, import.meta.url).href)
    const key = Object.keys(mod).find((k) => mod[k] && typeof mod[k] === 'object' && Array.isArray(mod[k].faqs))
    return key ? mod[key] : null
}

/** A source string must be replaceable without ambiguity, or it is not touched. */
function occursOnce(haystack, needle) {
    return needle && haystack.split(needle).length - 1 === 1
}

/* ------------------------------------------------------------- audit mode */

async function audit() {
    const cfg = await settings()
    if (cfg.paused) { console.log('Paused in Settings. Nothing to do.'); return }

    const posts = await sanity.fetch(
        '*[_type == "post" && defined(slug.current)]{_id,title,"slug":slug.current,summary,metaTitle,metaDescription,keywords,body,faqs} | order(title asc)'
    )

    /* A1: keep the register in step with Sanity and the repo. Dry runs read only. */
    const urls = await sitemapUrls()
    const reach = (slug) => urls.filter((u) => u.includes(`/${slug}`)).length
    if (!DRY) {
        await sheet('upsert', 'Page Register', [
            ...posts.map((p) => ({
                'Page ID': `post:${p.slug}`, Kind: 'post', Title: p.title,
                URL: `${BASE}/blog/${p.slug}`, Source: p._id,
            })),
            ...PILLARS.map((p) => ({
                'Page ID': `pillar:${p.id}`, Kind: 'pillar', Title: p.label,
                URL: urls.find((u) => u.includes(`/${p.slug}`)) || '', Source: p.file,
            })),
        ])
    }

    /* A2: oldest audited first, skipping anything inside the window or still open */
    const { rows: register } = await sheet('read', 'Page Register')
    const KINDS = cfg.kinds
    const cutoff = new Date(Date.now() - cfg.reauditDays * 864e5).toISOString().slice(0, 10)
    const due = register
        .filter((r) => KINDS.includes(r.Kind))
        .filter((r) => Number(r['Open Suggestions'] || 0) === 0)
        .filter((r) => !r['Last Audited'] || r['Last Audited'] < cutoff)
        .sort((a, b) => String(a['Last Audited'] || '').localeCompare(String(b['Last Audited'] || '')))

    /*
     * Round robin across kinds rather than straight down the list. Sorted purely
     * by date, the twelve blog posts would all come up before a single website
     * page did, because nothing has a date yet and posts are listed first. This
     * way each run takes one of each while both have work due.
     */
    const queues = KINDS.map((k) => due.filter((r) => r.Kind === k))
    const picked = []
    for (let i = 0; picked.length < cfg.perDay && queues.some((q) => q.length); i++) {
        const q = queues[i % queues.length]
        if (q.length) picked.push(q.shift())
    }

    if (!picked.length) { console.log('Every page is inside the re-audit window. Nothing due today.'); return }

    /* A3: the FAQ corpus is site-wide, because repetition across pages is the problem */
    const corpus = []
    for (const p of posts) for (const f of p.faqs || []) corpus.push({ owner: `post:${p.slug}`, where: `/blog/${p.slug}`, q: f.question, key: f._key, t: normalise(f.question) })
    const pillarData = {}
    for (const pl of PILLARS) {
        const data = await loadPillar(pl).catch(() => null)
        if (!data) continue
        pillarData[pl.id] = data
        for (const [q] of data.faqs || []) corpus.push({ owner: `pillar:${pl.id}`, where: `/chennai/${pl.slug}`, q, t: normalise(q) })
    }

    const rows = [], patches = []
    let n = 0
    /* `page` is {id, kind, title, url, source, reach} whichever kind it is. */
    const add = (page, o) => {
        n++
        const id = `S-${STAMP}-${String(n).padStart(2, '0')}`
        rows.push({
            'Suggestion ID': id, Date: TODAY, 'Page Title': page.title,
            'Page URL': page.url, 'Page ID': page.id,
            Kind: page.kind, Category: o.cat, Section: o.section,
            'Current Text': o.cur, 'Suggested Text': o.sug || '', 'Your Edited Text': '',
            'Why It Helps': o.why, 'Pages Affected': String(page.reach),
            'Anchor Text': o.anchor || '', 'Link Target': o.target || '',
            Approval: 'Pending', Notes: o.note || '', 'Applied Status': 'Not Applied', 'Applied At': '',
        })
        patches.push({
            'Suggestion ID': id, 'Page ID': page.id, Field: o.field,
            'Patch JSON': JSON.stringify({ id, pageId: page.id, kind: page.kind, source: page.source, field: o.field, ...o.patch }),
        })
    }

    const summary = []

    for (const entry of picked) {
        const before = n

        /* ---- website pillar page ---- */
        if (entry.Kind === 'pillar') {
            const pl = PILLARS.find((x) => `pillar:${x.id}` === entry['Page ID'])
            const data = pl && pillarData[pl.id]
            if (!pl || !data) continue

            const page = {
                id: `pillar:${pl.id}`, kind: 'pillar', title: pl.label,
                url: entry.URL || `${BASE}/chennai/${pl.slug}`, source: pl.file,
                reach: reach(pl.slug) || 1,
            }
            const src = readFileSync(pl.file, 'utf8')
            const counts = {}
            const bump = (k) => { counts[k] = (counts[k] || 0) + 1 }

            /* 1. em and en dashes in the source copy */
            let budget = cfg.maxDashes
            for (const line of [...new Set(src.split('\n').filter((l) => /[\u2013\u2014]/.test(l)))]) {
                if (budget-- <= 0) break
                const trimmed = line.trim()
                if (!occursOnce(src, trimmed)) continue
                add(page, {
                    cat: 'Dash Style', section: 'Page copy', field: 'repo',
                    cur: trimmed, sug: trimmed.replace(/\s*[\u2013\u2014]\s*/g, ' - '),
                    why: 'The site style is hyphens only. This line is in the page source.',
                    patch: { file: pl.file, find: trimmed, replace: trimmed.replace(/\s*[\u2013\u2014]\s*/g, ' - ') },
                })
                bump('dash')
            }

            /* 2. AI wording in the FAQ answers and page copy */
            for (const [q, a] of data.faqs || []) {
                const hit = AI_TERMS.find((t) => String(a).toLowerCase().includes(t))
                if (!hit) continue
                add(page, {
                    cat: 'AI Wording', section: `FAQ: ${q}`, field: 'repo',
                    cur: String(a), sug: '',
                    why: `Contains "${hit}", which reads as machine written. Rewrite it plainly in Your Edited Text.`,
                    note: 'Needs wording from you',
                    patch: { file: pl.file, find: String(a) },
                })
                bump('ai')
            }

            /* 3. FAQ repetition across the whole site, the real problem here */
            for (const [q] of data.faqs || []) {
                const mine = normalise(q)
                let worst = null
                for (const other of corpus) {
                    if (other.owner === page.id) continue
                    const score = jaccard(mine, other.t)
                    if (score >= cfg.faqThreshold && (!worst || score > worst.score)) worst = { ...other, score }
                }
                if (!worst || !occursOnce(src, q)) continue
                add(page, {
                    cat: 'FAQ', section: 'FAQ', field: 'repo',
                    cur: q, sug: '',
                    why: `${Math.round(worst.score * 100)}% the same as a question on ${worst.where} ("${worst.q}"). This page serves ${page.reach} URLs, so the duplicate is multiplied. Make it specific to ${pl.label.toLowerCase()} in Your Edited Text, or reject if both pages genuinely need it.`,
                    note: 'Needs wording from you',
                    patch: { file: pl.file, find: q },
                })
                bump('faq')
            }

            /* 4. meta title and description, measured as the live page renders them */
            try {
                const html = await (await fetch(page.url)).text()
                const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1] || ''
                const desc = (html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || ''
                if (title && (title.length > 60 || title.length < 45)) {
                    add(page, {
                        cat: 'Meta / SEO', section: 'Meta title', field: 'report-only',
                        cur: `${title}   (${title.length} ch as rendered)`, sug: '',
                        why: `${title.length > 60 ? 'Over 60 characters, so Google cuts it off' : 'Under 45 characters, which wastes the width'}. This title is built in ${pl.file}, so it needs a code change rather than a text swap.`,
                        note: 'Code change, do this by hand',
                        patch: { file: pl.file },
                    })
                    bump('meta')
                }
                if (desc && desc.length > 155) {
                    add(page, {
                        cat: 'Meta / SEO', section: 'Meta description', field: 'report-only',
                        cur: `${desc}   (${desc.length} ch)`, sug: '',
                        why: `${desc.length} characters, so the end is cut off in results. Built in ${pl.file}.`,
                        note: 'Code change, do this by hand',
                        patch: { file: pl.file },
                    })
                    bump('meta')
                }
            } catch { /* the live page being unreachable is not a finding */ }

            summary.push({ page, added: n - before, counts })
            continue
        }

        /* ---- blog post ---- */
        const post = posts.find((p) => `post:${p.slug}` === entry['Page ID'])
        if (!post) continue
        const page = {
            id: `post:${post.slug}`, kind: 'post', title: post.title,
            url: `${BASE}/blog/${post.slug}`, source: post._id, reach: 1,
        }
        const counts = {}
        const bump = (k) => { counts[k] = (counts[k] || 0) + 1 }

        /* 1. meta title, measured as it actually renders */
        const title = post.metaTitle || post.title
        const rendered = title.length + BRAND_SUFFIX.length
        if (rendered > 60 || rendered < 45) {
            add(page, {
                cat: 'Meta / SEO', section: 'Meta title', field: 'metaTitle',
                cur: `${title}   (${title.length} ch, renders as ${rendered} with "${BRAND_SUFFIX.trim()}")`,
                sug: '',
                why: rendered > 60
                    ? `Renders at ${rendered} characters, so Google cuts it off. It needs to be ${60 - BRAND_SUFFIX.length} or fewer before the brand suffix. Write the replacement in Your Edited Text.`
                    : `Renders at only ${rendered} characters and wastes most of the width Google gives you. Aim for 45 to 60 including the suffix. Write the replacement in Your Edited Text.`,
                note: 'Needs wording from you',
                patch: { budget: 60 - BRAND_SUFFIX.length },
            })
            bump('meta')
        }

        /* 2. meta description */
        const desc = post.metaDescription || post.summary || ''
        if (desc.length > 155 || desc.length < 70) {
            add(page, {
                cat: 'Meta / SEO', section: 'Meta description', field: 'metaDescription',
                cur: `${desc}   (${desc.length} ch)`,
                sug: '',
                why: desc.length > 155
                    ? `${desc.length} characters, so the end is cut off in results. Trim to 155 or fewer in Your Edited Text.`
                    : `Only ${desc.length} characters, which leaves most of the snippet unused. Aim for 120 to 155 in Your Edited Text.`,
                note: 'Needs wording from you',
                patch: { budget: 155 },
            })
            bump('meta')
        }

        /* 3. dashes, across paragraphs, callouts and table cells alike */
        const nodes = textNodes(post)
        const dashNodes = nodes.filter((t) => /[\u2013\u2014]/.test(t.text))
        const grouped = new Map()
        for (const t of dashNodes) {
            if (!grouped.has(t.blockKey)) grouped.set(t.blockKey, [])
            grouped.get(t.blockKey).push(t)
        }
        /* Capped so a day's rows stay reviewable. The rest come round next time. */
        let dashBudget = cfg.maxDashes
        for (const [blockKey, group] of grouped) {
            if (dashBudget-- <= 0) break
            const swap = (x) => x.replace(/\s*[\u2013\u2014]\s*/g, ' - ')
            add(page, {
                cat: 'Dash Style',
                section: group[0].where === 'callout' ? 'Callout' : group[0].where === 'table' ? 'Table' : 'Body',
                field: 'dash',
                cur: group.map((g) => g.text).join('\n'),
                sug: group.map((g) => swap(g.text)).join('\n'),
                why: 'The site style is hyphens only, never em or en dashes. A hyphen is the safe swap; if a colon or a full stop reads better, put that in Your Edited Text.',
                patch: { edits: group.map((g) => ({ ...g, replace: swap(g.text) })), blockKey },
            })
            bump('dash')
        }

        /* 4. AI wording */
        for (const t of nodes) {
            if (t.style && t.style !== 'normal') continue
            const hit = AI_TERMS.find((term) => t.text.toLowerCase().includes(term))
            if (!hit) continue
            add(page, {
                cat: 'AI Wording', section: t.where === 'callout' ? 'Callout' : 'Body', field: 'prose',
                cur: t.text, sug: '',
                why: `Contains "${hit}", which reads as machine written. Rewrite it plainly in Your Edited Text, or reject this row if it reads fine to you.`,
                note: 'Needs wording from you',
                patch: { node: t, term: hit },
            })
            bump('ai')
        }

        /* 5. FAQ repetition, scored against every other page */
        for (const f of post.faqs || []) {
            const mine = normalise(f.question)
            let worst = null
            for (const other of corpus) {
                if (other.owner === page.id) continue
                const score = jaccard(mine, other.t)
                if (score >= cfg.faqThreshold && (!worst || score > worst.score)) worst = { ...other, score }
            }
            if (!worst) continue
            add(page, {
                cat: 'FAQ', section: 'FAQ', field: 'faqs.edit',
                cur: `Q: ${f.question}`,
                sug: '',
                why: `${Math.round(worst.score * 100)}% the same as a question on ${worst.where} ("${worst.q}"). Two pages answering one question compete with each other in search. Rewrite this one to a different angle, or reject if they really are different questions.`,
                note: 'Needs wording from you',
                patch: { faqKey: f._key, collidesWith: worst.slug },
            })
            bump('faq')
        }

        /* 6. internal links */
        for (const o of linkOpportunities(post, posts, cfg.maxLinks)) {
            add(page, {
                cat: 'Internal Link', section: 'Body', field: 'body.link',
                cur: o.sentence,
                sug: `Same sentence, with "${o.anchor}" linked to /blog/${o.target.slug}`,
                anchor: o.anchor, target: BASE + o.href,
                why: `The phrase "${o.anchor}" is already in this sentence and ${o.target.title} is the page that explains it.${o.ambiguous ? ' More than one page matched this phrase, so check the target is the right one.' : ''}`,
                note: o.ambiguous ? 'Check the target' : '',
                patch: { blockKey: o.blockKey, anchor: o.anchor, href: o.href },
            })
            bump('link')
        }

        /* 7. broken links and missing alt text */
        for (const b of await contentLinks(post)) {
            add(page, {
                cat: b.kind === 'link' ? 'Broken Link' : 'Image Alt',
                section: b.kind === 'link' ? 'Body link' : 'Image', field: 'report-only',
                cur: b.kind === 'link' ? `${b.url} returns ${b.status}` : `${b.url} has alt "${b.alt}"`,
                sug: '',
                why: b.kind === 'link'
                    ? 'A link on this page no longer resolves. Put the replacement URL in Your Edited Text, or reject to have the link removed and the words kept.'
                    : 'This image has no useful alt text, which costs you image search and fails accessibility. Describe what is actually in the picture in Your Edited Text.',
                note: 'Needs wording from you',
                patch: { detail: b },
            })
            bump(b.kind === 'link' ? 'broken' : 'alt')
        }

        summary.push({ page, added: n - before, counts })
    }

    /* A7 */
    if (DRY) {
        console.log(`[dry run] ${rows.length} suggestions, nothing written`)
    } else if (rows.length) {
        await sheet('upsert', 'Patches', patches)
        await sheet('append', 'Suggestions', rows)
        await sheet('upsert', 'Page Register', summary.map((s) => ({
            'Page ID': s.page.id, 'Last Audited': TODAY, 'Open Suggestions': String(s.added),
        })))
    } else if (!DRY) {
        await sheet('upsert', 'Page Register', summary.map((s) => ({
            'Page ID': s.page.id, 'Last Audited': TODAY, 'Open Suggestions': '0',
        })))
    }

    /* A8 */
    console.log(`\nPage refresh audit ${TODAY}`)
    for (const s of summary) {
        const detail = Object.entries(s.counts).map(([k, v]) => `${k} ${v}`).join(' · ') || 'nothing to change'
        console.log(`  [${s.page.kind}] ${s.page.title}${s.page.reach > 1 ? `   (${s.page.reach} URLs)` : ''}`)
        console.log(`    ${s.page.url}`)
        console.log(`    ${s.added} suggestion(s): ${detail}`)
    }
    console.log(`\n  ${rows.length} row(s) written, all Pending. Nothing reaches the site until Approval says Approved.`)
}

/* ------------------------------------------------------------- apply mode */

/** Insert a link around `anchor` inside one block, splitting the span. */
function insertLink(block, anchor, href) {
    const span = uniqueSpan(block, anchor)
    if (!span) return false
    const i = span.text.indexOf(anchor)
    const markKey = `lnk${Math.random().toString(36).slice(2, 9)}`

    const pieces = []
    if (i > 0) pieces.push({ ...span, _key: `${span._key}a`, text: span.text.slice(0, i) })
    pieces.push({ ...span, _key: `${span._key}b`, text: anchor, marks: [...(span.marks || []), markKey] })
    if (i + anchor.length < span.text.length) pieces.push({ ...span, _key: `${span._key}c`, text: span.text.slice(i + anchor.length) })

    const at = block.children.indexOf(span)
    block.children.splice(at, 1, ...pieces)
    block.markDefs = [...(block.markDefs || []), { _key: markKey, _type: 'link', href }]
    return true
}

/*
 * Write new text back to wherever it came from. A paragraph keeps its span, a
 * callout is a single text field, a table cell is addressed by row and index.
 * Returns false when the document moved under us, which is a skip, not a write.
 */
function writeNode(body, node, text) {
    const block = body.find((b) => b._key === node.blockKey)
    if (!block) return false

    if (node.where === 'block') {
        const span = (block.children || []).find((c) => c._key === node.spanKey)
        if (!span || span.text !== node.text) return false
        span.text = text
        return true
    }
    if (node.where === 'callout') {
        if (block.text !== node.text) return false
        block.text = text
        return true
    }
    if (node.where === 'table') {
        const row = (block.rows || []).find((r) => r._key === node.rowKey)
        if (!row || row.cells[node.cell] !== node.text) return false
        row.cells[node.cell] = text
        return true
    }
    return false
}

async function apply() {
    const { rows: all } = await sheet('read', 'Suggestions')
    const approved = all.filter((r) => r.Approval === 'Approved' && (r['Applied Status'] === 'Not Applied' || r['Applied Status'] === ''))
    if (!approved.length) { console.log(`Page refresh ${TODAY}: no approved changes to publish.`); return }

    const { rows: patchRows } = await sheet('read', 'Patches')
    const patchFor = (id) => {
        const r = patchRows.find((x) => x['Suggestion ID'] === id)
        if (!r) return null
        try { return JSON.parse(r['Patch JSON']) } catch { return null }
    }

    /* group by page, so each document or file is written once */
    const byPage = new Map()
    for (const r of approved) {
        if (!byPage.has(r['Page ID'])) byPage.set(r['Page ID'], [])
        byPage.get(r['Page ID']).push(r)
    }

    const updates = [], log = []
    const touchedFiles = new Set()

    /* ---- website pages: edit the source, then commit and deploy ---- */
    for (const [pageId, rows] of byPage) {
        if (!pageId.startsWith('pillar:')) continue
        const pl = PILLARS.find((x) => `pillar:${x.id}` === pageId)
        if (!pl) { rows.forEach((r) => updates.push({ 'Suggestion ID': r['Suggestion ID'], 'Applied Status': 'Failed', Notes: 'Unknown pillar', 'Applied At': TODAY })); continue }

        let src = readFileSync(pl.file, 'utf8')
        const original = src
        let applied = 0, skipped = 0

        for (const row of rows.sort((a, b) => a['Suggestion ID'].localeCompare(b['Suggestion ID']))) {
            const id = row['Suggestion ID']
            const patch = patchFor(id)
            const mark = (status, note) => { updates.push({ 'Suggestion ID': id, 'Applied Status': status, Notes: note || '', 'Applied At': TODAY }); if (status !== 'Applied') skipped++ }
            if (!patch) { mark('Failed', 'No patch stored for this row'); continue }
            if (patch.field === 'report-only') { mark('Conflict - Skipped', 'This one needs a code change by hand'); continue }

            const human = (row['Your Edited Text'] || '').trim()
            const wording = human || (row['Suggested Text'] || '').trim()
            if (!wording) { mark('Conflict - Skipped', 'Needs your wording in Your Edited Text'); continue }
            if (/[\u2013\u2014]/.test(wording)) { mark('Failed', 'The wording contains an em or en dash, which the site style does not allow'); continue }
            if (/[`'"\\]/.test(wording)) { mark('Failed', 'Quotes and backslashes cannot be inserted into the source safely; edit this one by hand'); continue }
            if (!occursOnce(src, patch.find)) { mark('Conflict - Skipped', 'That text has changed in the repo since the audit'); continue }

            src = src.split(patch.find).join(wording)
            applied++; mark('Applied')
        }

        if (!applied) { log.push({ id: pageId, name: pl.label, applied: 0, skipped }); continue }

        /* the file must still be valid JavaScript before anything is committed */
        if (!DRY) {
            writeFileSync(pl.file, src)
            try {
                execFileSync('node', ['--check', pl.file], { stdio: 'pipe' })
                touchedFiles.add(pl.file)
            } catch (e) {
                writeFileSync(pl.file, original)
                rows.forEach((r) => updates.push({ 'Suggestion ID': r['Suggestion ID'], 'Applied Status': 'Failed', Notes: 'The edit would have broken the file, so nothing was changed', 'Applied At': TODAY }))
                log.push({ id: pageId, name: pl.label, applied: 0, skipped: rows.length, halted: 'the file would no longer parse' })
                continue
            }
        }
        log.push({ id: pageId, name: pl.label, applied, skipped, file: pl.file })
    }

    /* ---- blog posts: write to Sanity ---- */
    for (const [pageId, rows] of byPage) {
        if (!pageId.startsWith('post:')) continue
        const slug = pageId.replace(/^post:/, '')
        const doc = await sanity.fetch('*[_type == "post" && slug.current == $slug][0]', { slug })
        if (!doc) { rows.forEach((r) => updates.push({ 'Suggestion ID': r['Suggestion ID'], 'Applied Status': 'Failed', Notes: 'Post not found in Sanity', 'Applied At': TODAY })); continue }

        const body = JSON.parse(JSON.stringify(doc.body || []))
        const faqs = JSON.parse(JSON.stringify(doc.faqs || []))
        const set = {}
        let applied = 0, skipped = 0
        const linksBefore = (doc.body || []).reduce((n, b) => n + (b.markDefs || []).length, 0)

        for (const row of rows.sort((a, b) => a['Suggestion ID'].localeCompare(b['Suggestion ID']))) {
            const id = row['Suggestion ID']
            const patch = patchFor(id)
            const mark = (status, note) => { updates.push({ 'Suggestion ID': id, 'Applied Status': status, Notes: note || '', 'Applied At': TODAY }); if (status !== 'Applied') skipped++ }

            if (!patch) { mark('Failed', 'No patch stored for this row'); continue }

            /* a human's wording wins; an edited Suggested Text counts as theirs */
            const human = (row['Your Edited Text'] || '').trim()
            const wording = human || (row['Suggested Text'] || '').trim()

            if (/[\u2013\u2014]/.test(wording)) { mark('Failed', 'The wording contains an em or en dash, which the site style does not allow'); continue }

            if (row.Field === 'report-only' || patch.field === 'report-only') { mark('Conflict - Skipped', 'This row is a report only; fix it on the page itself'); continue }

            if (patch.field === 'metaTitle') {
                if (!human) { mark('Conflict - Skipped', 'Needs your wording in Your Edited Text'); continue }
                if (human.length + BRAND_SUFFIX.length > 60) { mark('Failed', `Renders at ${human.length + BRAND_SUFFIX.length}; must be 60 or fewer`); continue }
                set.metaTitle = human; applied++; mark('Applied'); continue
            }

            if (patch.field === 'metaDescription') {
                if (!human) { mark('Conflict - Skipped', 'Needs your wording in Your Edited Text'); continue }
                if (human.length > 155) { mark('Failed', `${human.length} characters; must be 155 or fewer`); continue }
                set.metaDescription = human; applied++; mark('Applied'); continue
            }

            if (patch.field === 'faqs.edit') {
                if (!human) { mark('Conflict - Skipped', 'Needs your wording in Your Edited Text'); continue }
                const f = faqs.find((x) => x._key === patch.faqKey)
                if (!f) { mark('Conflict - Skipped', 'That FAQ is no longer on the page'); continue }
                const m = human.match(/^Q:\s*(.+?)\s*(?:\n+A:\s*([\s\S]+))?$/i)
                if (!m) { mark('Failed', 'Write it as "Q: question" then a new line "A: answer"'); continue }
                f.question = m[1]
                if (m[2]) f.answer = m[2].trim()
                applied++; mark('Applied'); continue
            }

            /*
             * Rows written by the Claude skill before this script existed use
             * field "body" with substring edits. They are real rows waiting on
             * a real approval, so they are translated rather than rejected.
             */
            if (patch.field === 'body' && Array.isArray(patch.edits) && patch.edits[0] && patch.edits[0].find !== undefined) {
                let ok = true
                for (const e of patch.edits) {
                    const block = body.find((x) => x._key === e.blockKey)
                    const span = block && (block.children || []).find((c) => c._key === e.spanKey)
                    if (!span || (span.text.split(e.find).length - 1) !== 1) { ok = false; break }
                }
                if (!ok) { mark('Conflict - Skipped', 'The text changed in Sanity since the audit'); continue }
                for (const e of patch.edits) {
                    const block = body.find((x) => x._key === e.blockKey)
                    const span = block.children.find((c) => c._key === e.spanKey)
                    span.text = span.text.split(e.find).join(e.replace)
                }
                applied++; mark('Applied'); continue
            }

            if (patch.field === 'dash') {
                /* All or nothing: a half-fixed list looks worse than an unfixed one. */
                const texts = human ? human.split('\n') : patch.edits.map((e) => e.replace)
                if (texts.length !== patch.edits.length) { mark('Failed', `Expected ${patch.edits.length} line(s) in Your Edited Text, found ${texts.length}`); continue }
                const probe = JSON.parse(JSON.stringify(body))
                if (!patch.edits.every((e, i) => writeNode(probe, e, texts[i]))) { mark('Conflict - Skipped', 'The text changed in Sanity since the audit'); continue }
                patch.edits.forEach((e, i) => writeNode(body, e, texts[i]))
                applied++; mark('Applied'); continue
            }

            if (patch.field === 'prose') {
                if (!human) { mark('Conflict - Skipped', 'Needs your wording in Your Edited Text'); continue }
                if (!writeNode(body, patch.node, human)) { mark('Conflict - Skipped', 'That text has changed in Sanity since the audit'); continue }
                applied++; mark('Applied'); continue
            }

            if (patch.field === 'body.link') {
                const block = body.find((b) => b._key === patch.blockKey)
                if (!block) { mark('Conflict - Skipped', 'That paragraph is no longer on the page'); continue }
                if (!insertLink(block, patch.anchor, patch.href)) { mark('Conflict - Skipped', 'The anchor phrase is no longer unique in that paragraph'); continue }
                applied++; mark('Applied'); continue
            }

            mark('Failed', `Unknown patch field: ${patch.field}`)
        }

        if (!applied) { log.push({ slug, applied: 0, skipped }); continue }

        /* safety checks before the document is written */
        const linksAfter = body.reduce((n, b) => n + (b.markDefs || []).length, 0)
        const headingsSame = blocksOf({ body }).filter((b) => b.style && b.style !== 'normal').map(plain).join('|')
            === blocksOf(doc).filter((b) => b.style && b.style !== 'normal').map(plain).join('|')
        const lenBefore = bodyText(doc).length, lenAfter = bodyText({ body }).length
        const drift = Math.abs(lenAfter - lenBefore) / Math.max(1, lenBefore)

        if (linksAfter < linksBefore || !headingsSame || drift > 0.15) {
            const why = linksAfter < linksBefore ? 'a link would have been lost'
                : !headingsSame ? 'a heading would have changed'
                : `the text length moved by ${Math.round(drift * 100)}%`
            rows.forEach((r) => updates.push({ 'Suggestion ID': r['Suggestion ID'], 'Applied Status': 'Failed', Notes: `Nothing applied to this page: ${why}`, 'Applied At': TODAY }))
            log.push({ slug, applied: 0, skipped: rows.length, halted: why })
            continue
        }

        set.body = body
        set.faqs = faqs
        if (DRY) { console.log(`[dry run] would write ${applied} change(s) to ${slug}`) }
        else await sanity.patch(doc._id).set(set).commit()
        log.push({ slug, applied, skipped })
    }

    /*
     * Repo edits only reach the site through a commit, so this is the publish
     * step for a website page. Only the files this run actually changed are
     * staged - never `git add -A`, which would sweep up whatever else is in the
     * working tree. Railway deploys from main.
     */
    if (!DRY && touchedFiles.size) {
        const files = [...touchedFiles]
        const names = log.filter((l) => l.file && l.applied).map((l) => l.name).join(', ')
        const body = [
            `content: approved refresh edits to ${names}`,
            '',
            'Applied from the page refresh sheet, where each change was',
            'approved by hand before this run picked it up.',
            '',
            ...log.filter((l) => l.file && l.applied).map((l) => `  ${l.name}: ${l.applied} change(s)`),
        ].join('\n')
        try {
            execFileSync('git', ['add', ...files], { stdio: 'pipe' })
            execFileSync('git', ['commit', '-m', body], { stdio: 'pipe' })
            execFileSync('git', ['push', 'origin', 'HEAD:main'], { stdio: 'pipe' })
            global.__refreshSha = execFileSync('git', ['rev-parse', '--short', 'HEAD'], { encoding: 'utf8' }).trim()
            console.log(`  committed ${global.__refreshSha} and pushed; Railway will deploy`)
        } catch (e) {
            console.error(`  ✖ could not commit or push: ${String(e.stderr || e.message).slice(0, 200)}`)
            global.__refreshSha = 'push failed'
        }
    }

    if (!DRY) {
        await sheet('update', 'Suggestions', updates)
        await sheet('append', 'Apply Log', log.map((l) => ({
            Date: TODAY, 'Page Title': l.name || l.slug,
            'Page URL': l.file ? '' : `${BASE}/blog/${l.slug}`,
            'Page ID': l.id || `post:${l.slug}`, Kind: l.file ? 'pillar' : 'post',
            'Changes Applied': String(l.applied), 'Changes Skipped': String(l.skipped),
            Summary: l.halted ? `Halted: ${l.halted}` : `${l.applied} applied, ${l.skipped} skipped`,
            'Rollback Point': l.file ? (global.__refreshSha || 'commit') : 'Sanity history',
            'Live Check': l.applied ? 'Queued' : 'n/a',
        })))
        /* the register's open count drops by whatever is no longer pending */
        const { rows: after } = await sheet('read', 'Suggestions')
        const open = {}
        after.forEach((r) => { if (r['Applied Status'] === 'Not Applied' && r.Approval !== 'Rejected') open[r['Page ID']] = (open[r['Page ID']] || 0) + 1 })
        await sheet('upsert', 'Page Register', log.map((l) => {
            const id = l.id || `post:${l.slug}`
            return { 'Page ID': id, 'Open Suggestions': String(open[id] || 0) }
        }))
    }

    console.log(`\nPage refresh apply ${TODAY}`)
    for (const l of log) console.log(`  ${l.name || l.slug}: ${l.applied} applied, ${l.skipped} skipped${l.halted ? ` (halted: ${l.halted})` : ''}`)
    console.log('\n  Blog pages revalidate hourly, so applied changes are live within the hour.')
}

/* -------------------------------------------------------------------- run */

try {
    if (MODE === 'audit') await audit()
    else await apply()
} catch (err) {
    console.error(`✖ ${err.message}`)
    process.exit(1)
}
