#!/usr/bin/env node
/**
 * Releases the next locality for each secondary city.
 *
 * One locality per city per day, and releasing a locality publishes ALL SIX of
 * its service pages at once. A visitor landing on "Anna Nagar" should find the
 * whole service range there, not one page with five siblings 404ing — and the
 * areas grid on each page links to the other five immediately.
 *
 * So a day's release is 2 localities = 12 pages.
 *
 * State lives in content/published-locations.json, committed back by CI. That
 * makes the release history auditable in git, and the commit is what triggers
 * the Netlify rebuild — no separate deploy hook needed.
 *
 * Usage:
 *   node scripts/release-locations.mjs --status   # buffer report, no changes
 *   node scripts/release-locations.mjs --dry-run  # show what would release
 *   node scripts/release-locations.mjs            # release today's localities
 */

import { readFileSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { MADURAI_LOCALITIES, COIMBATORE_LOCALITIES } from '../content/locations.mjs'

/*
 * Deliberately self-contained rather than importing lib/cities.js: that module
 * pulls in lib/data.js (a Next module with extensionless imports) and a JSON
 * file, neither of which bare Node ESM resolves the way the Next bundler does.
 * The service keys below are the only duplicated values, and a mismatch would
 * surface immediately as a 404 in the release output.
 */
const SERVICE_KEYS = [
    'laser-cutting-services',
    'sheet-metal-laser-cutting-services',
    'fabrication-services',
    'steel-gates',
    'metal-safety-doors',
    'decorative-metal-panels',
]

const RELEASE_CITIES_CONFIG = [
    { slug: 'madurai', name: 'Madurai', localities: MADURAI_LOCALITIES },
    { slug: 'coimbatore', name: 'Coimbatore', localities: COIMBATORE_LOCALITIES },
]

const localitySlug = (l) => String(l).toLowerCase().replace(/\s+/g, '-')
const serviceUrl = (city, key, locality) =>
    `/${city}/${key}${locality ? `-in-${localitySlug(locality)}` : ''}`

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const STATE_PATH = join(ROOT, 'content', 'published-locations.json')

const DRY_RUN = process.argv.includes('--dry-run')
const STATUS = process.argv.includes('--status')

/** Days of runway to keep queued. Below this the run warns loudly. */
const MIN_BUFFER_DAYS = Number(process.env.MIN_BUFFER_DAYS || 10)

const BASE_URL = 'https://www.rgtechengineeringworks.com'
const RELEASE_CITIES = RELEASE_CITIES_CONFIG

function loadState() {
    return JSON.parse(readFileSync(STATE_PATH, 'utf8'))
}

function saveState(state) {
    writeFileSync(STATE_PATH, JSON.stringify(state, null, 2) + '\n')
}

function pendingFor(city, state) {
    const released = new Set(state[city.slug] || [])
    return city.localities.filter((l) => !released.has(localitySlug(l)))
}

function main() {
    const state = loadState()

    console.log(`\nLocality release — ${new Date().toISOString().slice(0, 10)}\n`)

    const report = RELEASE_CITIES.map((city) => {
        const pending = pendingFor(city, state)
        const live = (state[city.slug] || []).length
        return { city, pending, live }
    })

    // Buffer report first — this is the number that matters for planning.
    let lowest = Infinity
    for (const { city, pending, live } of report) {
        const days = pending.length // one locality per day
        lowest = Math.min(lowest, days)
        console.log(
            `  ${city.name.padEnd(12)} ${String(live).padStart(2)} live · ` +
            `${String(pending.length).padStart(2)} pending · ${days} day(s) of runway`
        )
    }

    console.log(`\n  Buffer target: ${MIN_BUFFER_DAYS} days`)
    if (lowest < MIN_BUFFER_DAYS) {
        console.log(
            `  ⚠ RUNWAY LOW — only ${lowest} day(s) left. Add more localities to ` +
            `lib/cities.js before the queue empties.`
        )
    } else {
        console.log(`  ✓ Runway healthy (${lowest} days)`)
    }

    if (STATUS) {
        console.log('\n(--status: nothing changed)\n')
        return
    }

    const releasedToday = []

    for (const { city, pending } of report) {
        if (!pending.length) {
            console.log(`\n  ${city.name}: queue empty, nothing to release.`)
            continue
        }

        const next = pending[0]
        const slug = localitySlug(next)
        const urls = SERVICE_KEYS.map(
            (key) => `${BASE_URL}${serviceUrl(city.slug, key, next)}`
        )

        console.log(`\n  ${city.name} → ${next}  (${urls.length} pages)`)
        for (const u of urls) console.log(`      ${u}`)

        if (!DRY_RUN) {
            state[city.slug] = [...(state[city.slug] || []), slug]
        }
        releasedToday.push({ city: city.slug, cityName: city.name, locality: next, slug, urls })
    }

    if (DRY_RUN) {
        console.log('\n(dry run — nothing written)\n')
        return
    }

    if (!releasedToday.length) {
        console.log('\nNothing released.\n')
        return
    }

    saveState(state)
    console.log(
        `\n✓ Released ${releasedToday.length} localit${releasedToday.length === 1 ? 'y' : 'ies'} ` +
        `(${releasedToday.reduce((n, r) => n + r.urls.length, 0)} pages)\n`
    )

    // Handed to the workflow for the sheet update and the commit message.
    writeFileSync(join(ROOT, 'release-summary.json'), JSON.stringify(releasedToday, null, 2))
}

main()
