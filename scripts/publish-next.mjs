#!/usr/bin/env node
/**
 * Publishes the next queued article, but only if enough days have passed since
 * the last one went live.
 *
 * Run daily from GitHub Actions. The interval check lives here rather than in
 * the cron expression because `*​/3` in cron resets at the end of each month —
 * the 31st and the 1st are one day apart, not three — and a skipped or delayed
 * run would silently drop an article. Checking elapsed time makes the schedule
 * self-healing: if a run fails, the next day's run publishes instead.
 *
 * State is Sanity itself. There is no state file to commit back from CI, so the
 * queue cannot drift out of sync with what is actually live.
 *
 * Usage:
 *   node scripts/publish-next.mjs --status   # what would happen, no writes
 *   node scripts/publish-next.mjs --dry-run  # pick the next post, do not write
 *   node scripts/publish-next.mjs --force    # ignore the interval
 *   node scripts/publish-next.mjs            # normal scheduled run
 */

import { readFileSync, existsSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createClient } from '@sanity/client'
import { queue } from '../content/queue/index.mjs'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')

const INTERVAL_DAYS = Number(process.env.PUBLISH_INTERVAL_DAYS || 3)
const DRY_RUN = process.argv.includes('--dry-run')
const STATUS = process.argv.includes('--status')
const FORCE = process.argv.includes('--force')

/* Local .env.local for manual runs; in CI the values come from secrets. */
function loadEnv() {
    const file = join(ROOT, '.env.local')
    if (!existsSync(file)) return
    for (const line of readFileSync(file, 'utf8').split('\n')) {
        const t = line.trim()
        if (!t || t.startsWith('#')) continue
        const eq = t.indexOf('=')
        if (eq === -1) continue
        const k = t.slice(0, eq).trim()
        if (!process.env[k]) process.env[k] = t.slice(eq + 1).trim()
    }
}
loadEnv()

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_TOKEN

if (!projectId || !token) {
    console.error('✖ Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_TOKEN')
    process.exit(1)
}

const client = createClient({ projectId, dataset, apiVersion: '2024-01-01', token, useCdn: false })

const DAY_MS = 24 * 60 * 60 * 1000

async function main() {
    if (!queue.length) {
        console.log('Queue is empty — nothing scheduled.')
        return
    }

    const live = await client.fetch(
        `*[_type == "post" && defined(slug.current)]{ "slug": slug.current, publishedAt }`
    )
    const liveSlugs = new Set(live.map((p) => p.slug))

    const pending = queue.filter((entry) => !liveSlugs.has(entry.slug))

    const latest = live
        .map((p) => (p.publishedAt ? new Date(p.publishedAt).getTime() : 0))
        .filter(Boolean)
        .sort((a, b) => b - a)[0]

    const daysSince = latest ? (Date.now() - latest) / DAY_MS : Infinity

    console.log(`Queue     : ${queue.length} total, ${pending.length} pending`)
    console.log(`Live posts: ${live.length}`)
    console.log(
        `Last post : ${latest ? new Date(latest).toISOString().slice(0, 10) : 'none'}` +
        `${latest ? ` (${daysSince.toFixed(1)} days ago)` : ''}`
    )
    console.log(`Interval  : ${INTERVAL_DAYS} days\n`)

    if (!pending.length) {
        console.log('✓ Every queued article is already live. Nothing to do.')
        return
    }

    const next = pending[0]

    if (STATUS) {
        console.log(`Next up   : ${next.slug}`)
        console.log(pending.length > 1 ? `Then      : ${pending[1].slug}` : '')
        return
    }

    if (!FORCE && daysSince < INTERVAL_DAYS) {
        const wait = (INTERVAL_DAYS - daysSince).toFixed(1)
        console.log(`Waiting — ${wait} more day(s) before "${next.slug}" is due.`)
        return
    }

    const post = await next.load()
    // Set the date at publish time so it reflects when the post actually
    // went live, not when it was drafted.
    const now = new Date().toISOString()
    post.publishedAt = now
    post.updatedAt = now

    if (DRY_RUN) {
        console.log(`(dry run) would publish: ${post.title}`)
        console.log(`  slug   : ${post.slug.current}`)
        console.log(`  blocks : ${post.body?.length ?? 0}`)
        console.log(`  faqs   : ${post.faqs?.length ?? 0}`)
        return
    }

    await client.createOrReplace(post)

    // Handed to the workflow so it can mark the row in the tracking sheet.
    // The Blogs tab has no slug column, so it is matched on the post title.
    writeFileSync(
        join(ROOT, 'publish-summary.json'),
        JSON.stringify(
            [{ title: post.sheetTitle || post.title, url: `https://www.rgtechengineeringworks.com/blog/${post.slug.current}` }],
            null,
            2
        )
    )

    console.log(`✓ Published: ${post.title}`)
    console.log(`  /blog/${post.slug.current}`)
    console.log(`  ${pending.length - 1} article(s) remaining in the queue.`)
}

main().catch((err) => {
    console.error('✖ Publish failed:', err?.message || err)
    process.exit(1)
})
