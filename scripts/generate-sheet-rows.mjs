#!/usr/bin/env node
/**
 * Generates the tracking-sheet rows for Madurai and Coimbatore.
 *
 * Produces a CSV covering the 12 pillar pages and all 600 locality cluster
 * pages, with live status checked against production rather than assumed —
 * marking a row Published when the URL 404s would be worse than leaving it
 * blank.
 *
 * Writes sheet-rows.csv, ready to paste into the Service Pages tab.
 *
 * Usage:
 *   node scripts/generate-sheet-rows.mjs           # check live status (slow, accurate)
 *   node scripts/generate-sheet-rows.mjs --offline # skip the HTTP checks
 */

import { writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { MADURAI_LOCALITIES, COIMBATORE_LOCALITIES } from '../content/locations.mjs'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const BASE = 'https://www.rgtechengineeringworks.com'
const OFFLINE = process.argv.includes('--offline')

const SERVICES = [
    ['Laser Cutting Services', 'laser-cutting-services'],
    ['Sheet Metal Laser Cutting Services', 'sheet-metal-laser-cutting-services'],
    ['Fabrication Services', 'fabrication-services'],
    ['Steel Gates', 'steel-gates'],
    ['Metal Safety Doors', 'metal-safety-doors'],
    ['Decorative Metal Panels', 'decorative-metal-panels'],
]

const CITIES = [
    ['Madurai', 'madurai', MADURAI_LOCALITIES],
    ['Coimbatore', 'coimbatore', COIMBATORE_LOCALITIES],
]

const slugify = (s) => s.toLowerCase().replace(/\s+/g, '-')

async function isLive(path) {
    if (OFFLINE) return null
    try {
        const res = await fetch(`${BASE}${path}`, { method: 'HEAD', redirect: 'follow' })
        return res.status === 200
    } catch {
        return null
    }
}

function csvCell(v) {
    const s = String(v ?? '')
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
}

async function main() {
    const rows = [['City', 'Type', 'Page', 'URL Slug', 'Status', 'Published URL']]

    for (const [cityName, citySlug, localities] of CITIES) {
        // Pillars first — these are already live.
        for (const [serviceName, serviceKey] of SERVICES) {
            const path = `/${citySlug}/${serviceKey}`
            const live = await isLive(path)
            rows.push([
                cityName,
                'Pillar',
                serviceName,
                path,
                live === null ? '' : live ? 'Published' : 'Pending',
                live ? `${BASE}${path}` : '',
            ])
        }
    }

    // Clusters, grouped by locality so the release order is obvious in the sheet:
    // a locality releases all six of its service pages on the same day.
    for (const [cityName, citySlug, localities] of CITIES) {
        for (const locality of localities) {
            for (const [serviceName, serviceKey] of SERVICES) {
                const path = `/${citySlug}/${serviceKey}-in-${slugify(locality)}`
                rows.push([
                    cityName,
                    'Cluster',
                    `${serviceName} in ${locality}`,
                    path,
                    'Pending',
                    '',
                ])
            }
        }
    }

    const csv = rows.map((r) => r.map(csvCell).join(',')).join('\n') + '\n'
    const out = join(ROOT, 'sheet-rows.csv')
    writeFileSync(out, csv)

    const pillars = rows.filter((r) => r[1] === 'Pillar').length
    const clusters = rows.filter((r) => r[1] === 'Cluster').length
    const published = rows.filter((r) => r[4] === 'Published').length

    console.log(`\nWrote sheet-rows.csv`)
    console.log(`  pillars   ${pillars}  (${published} verified live)`)
    console.log(`  clusters  ${clusters}`)
    console.log(`  total     ${rows.length - 1} rows\n`)
}

main()
