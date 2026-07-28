#!/usr/bin/env node
/**
 * Publishes the "What Is CNC Fiber Laser Cutting?" article (plus its author and
 * category documents) to Sanity.
 *
 * Usage:
 *   node scripts/publish-cnc-article.mjs --check   # verify credentials only
 *   node scripts/publish-cnc-article.mjs --draft   # publish as a draft
 *   node scripts/publish-cnc-article.mjs           # publish live
 *
 * Idempotent: documents use fixed _ids and are created-or-replaced, so
 * re-running updates the post in place rather than duplicating it.
 */

import { readFileSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createClient } from '@sanity/client'
import { author, category, post, POST_ID } from '../content/what-is-cnc-fiber-laser-cutting.mjs'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')

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
const DRAFT = process.argv.includes('--draft')
const CHECK_ONLY = process.argv.includes('--check')

if (!projectId || !token) {
    console.error('\n✖ Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_TOKEN in .env.local\n')
    process.exit(1)
}

const client = createClient({
    projectId,
    dataset,
    apiVersion: '2024-01-01',
    token,
    useCdn: false,
})

/* -------------------------------------------------------------------- main */

async function main() {
    console.log(`\nSanity → project "${projectId}", dataset "${dataset}"`)

    // Fail fast with a clear diagnosis rather than a raw 403 mid-transaction.
    try {
        await client.fetch('*[_type == "post"][0]._id')
        console.log('  ✓ read access OK')
    } catch (err) {
        console.error(`  ✖ cannot read dataset: ${err?.message || err}`)
        process.exit(1)
    }

    try {
        await client.request({
            uri: `/data/mutate/${dataset}?dryRun=true`,
            method: 'POST',
            body: { mutations: [{ createOrReplace: { _id: 'permission.probe', _type: 'permissionProbe' } }] },
        })
        console.log('  ✓ write access OK')
    } catch (err) {
        const msg = err?.message || String(err)
        console.error('\n  ✖ WRITE ACCESS DENIED')
        console.error(`     ${msg.split('\n')[0]}`)
        console.error('\n  The configured SANITY_API_TOKEN cannot create documents.')
        console.error('  Create an **Editor** token instead:')
        console.error('    sanity.io/manage  ->  RG Tech Engineering  ->  API  ->  Tokens')
        console.error('    -> Add API token -> permissions: Editor')
        console.error('  then put it in .env.local as SANITY_API_TOKEN and re-run.\n')
        process.exit(1)
    }

    if (CHECK_ONLY) {
        console.log('\n(--check: credentials verified, nothing written)\n')
        return
    }

    const doc = DRAFT ? { ...post, _id: `drafts.${POST_ID}` } : post

    await client.createOrReplace(author)
    console.log(`  ✓ author    ${author.name}`)
    await client.createOrReplace(category)
    console.log(`  ✓ category  ${category.title}`)
    await client.createOrReplace(doc)
    console.log(`  ✓ post      ${post.title}`)

    const b = post.body
    console.log(
        `\n✓ Published${DRAFT ? ' as DRAFT' : ''}: /blog/${post.slug.current}` +
        `\n  ${b.filter((x) => x._type === 'block').length} blocks · ` +
        `${b.filter((x) => x._type === 'contentImage').length} images · ` +
        `${b.filter((x) => x._type === 'contentTable').length} tables · ` +
        `${post.faqs.length} FAQs\n`
    )
}

main().catch((err) => {
    console.error('\n✖ Publish failed:', err?.message || err, '\n')
    process.exit(1)
})
