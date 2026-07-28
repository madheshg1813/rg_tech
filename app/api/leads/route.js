import { NextResponse } from 'next/server'
import { sanityClient } from '@/lib/sanity'

/*
 * CSV export of website leads.
 *
 * Exists so leads can reach Google Sheets without depending on Apps Script:
 * paste an IMPORTDATA() formula into a cell and the sheet pulls this endpoint
 * on Google's own refresh schedule. No OAuth, no deployment settings, nothing
 * to keep in sync.
 *
 * Protected by a shared key because enquiries contain customer phone numbers.
 */

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const LEADS_QUERY = /* groq */ `
    *[_type == "enquiry"] | order(_createdAt desc) [0...$limit] {
        _createdAt, name, phone, email, service, material,
        message, fileName, source, page, forwardedToSheet
    }
`

/** RFC 4180: wrap in quotes, double any internal quote. */
function csvCell(value) {
    if (value === null || value === undefined) return ''
    let s = String(value)
    // Neutralise spreadsheet formula injection — a lead could otherwise submit
    // a name beginning with = and have it execute inside your sheet.
    if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`
    return `"${s.replace(/"/g, '""')}"`
}

export async function GET(request) {
    const expected = process.env.LEADS_EXPORT_KEY
    const provided = new URL(request.url).searchParams.get('key')

    if (!expected) {
        return NextResponse.json(
            { error: 'LEADS_EXPORT_KEY is not configured on the server.' },
            { status: 503 }
        )
    }
    if (provided !== expected) {
        return NextResponse.json({ error: 'Unauthorised.' }, { status: 401 })
    }
    if (!sanityClient) {
        return NextResponse.json({ error: 'Sanity is not configured.' }, { status: 503 })
    }

    const limitParam = Number(new URL(request.url).searchParams.get('limit'))
    const limit = Number.isFinite(limitParam) && limitParam > 0 ? Math.min(limitParam, 5000) : 1000

    let rows = []
    try {
        rows = await sanityClient.fetch(LEADS_QUERY, { limit })
    } catch (err) {
        console.error('[leads] fetch failed:', err?.message || err)
        return NextResponse.json({ error: 'Could not load leads.' }, { status: 502 })
    }

    const headers = [
        'Received At', 'Name', 'Phone', 'Email', 'Service',
        'Material', 'Message', 'Attachment', 'Source', 'Page',
    ]

    const lines = [headers.map(csvCell).join(',')]
    for (const r of rows) {
        lines.push([
            r._createdAt || '',
            r.name || '',
            r.phone || '',
            r.email || '',
            r.service || '',
            r.material || '',
            r.message || '',
            r.fileName || '',
            r.source || '',
            r.page || '',
        ].map(csvCell).join(','))
    }

    return new NextResponse(lines.join('\n'), {
        status: 200,
        headers: {
            'Content-Type': 'text/csv; charset=utf-8',
            // Short cache so IMPORTDATA sees new leads quickly without
            // hammering Sanity on every sheet recalculation.
            'Cache-Control': 'public, max-age=60, s-maxage=60',
            'X-Robots-Tag': 'noindex, nofollow',
        },
    })
}
