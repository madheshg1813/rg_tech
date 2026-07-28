import { NextResponse } from 'next/server'
import { APPS_SCRIPT_URL } from '@/lib/data'
import { createEnquiry } from '@/lib/sanity'

/*
 * Lead capture endpoint.
 *
 * The browser posts here rather than straight to Google Apps Script. That
 * matters for three reasons:
 *
 *  1. Apps Script does not answer CORS preflight, which is why the existing
 *     admin code uses `mode: 'no-cors'` — and an opaque response means the page
 *     cannot tell a success from a failure. Server-to-server has no CORS at all,
 *     so we can read the real result and tell the user the truth.
 *  2. The Apps Script URL stays out of the client bundle.
 *  3. Validation happens somewhere the user cannot bypass.
 */

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const SCRIPT_URL = process.env.APPS_SCRIPT_URL || APPS_SCRIPT_URL

// Apps Script payloads are capped well below this; 8 MB of base64 is ~6 MB of
// file, which is plenty for a DXF/STEP drawing and keeps the request sane.
const MAX_FILE_BYTES = 8 * 1024 * 1024

const str = (v, max = 2000) => (typeof v === 'string' ? v.trim().slice(0, max) : '')

export async function POST(request) {
    let payload
    try {
        payload = await request.json()
    } catch {
        return NextResponse.json({ ok: false, error: 'Invalid request body.' }, { status: 400 })
    }

    const name = str(payload.name, 120)
    const phone = str(payload.phone, 40)
    const email = str(payload.email, 160)
    const service = str(payload.service, 120)
    const material = str(payload.material, 80)
    const message = str(payload.message, 4000)
    const source = str(payload.source, 60) || 'contact-form'
    const page = str(payload.page, 300)

    if (!name || !phone) {
        return NextResponse.json(
            { ok: false, error: 'Name and phone number are required.' },
            { status: 422 }
        )
    }

    // Indian mobile numbers, tolerant of spaces, dashes and +91.
    const digits = phone.replace(/\D/g, '')
    if (digits.length < 10 || digits.length > 13) {
        return NextResponse.json(
            { ok: false, error: 'Please enter a valid phone number.' },
            { status: 422 }
        )
    }

    const file = payload.file && typeof payload.file === 'object' ? payload.file : null
    if (file?.data && file.data.length > MAX_FILE_BYTES) {
        return NextResponse.json(
            { ok: false, error: 'Attachment is too large. Please keep it under 6 MB or send it on WhatsApp.' },
            { status: 413 }
        )
    }

    const body = {
        action: 'addEnquiry',
        name,
        phone,
        email,
        service,
        material,
        message,
        source,
        page,
        submittedAt: new Date().toISOString(),
        ...(file?.data
            ? { fileName: str(file.name, 200), fileType: str(file.type, 100), fileData: file.data }
            : {}),
    }

    /*
     * Two destinations, deliberately ordered.
     *
     * Sanity is the system of record and is already configured, so the lead is
     * safe the moment it is stored. Google Sheets is a best-effort forward — if
     * the Apps Script is not deployed yet, or throws, the lead is still captured
     * and the visitor still gets a truthful confirmation.
     *
     * The only failure the visitor ever sees is when BOTH destinations fail.
     */
    const forwardToSheet = async () => {
        try {
            // text/plain avoids a CORS preflight and is what doPost(e) reads
            // from e.postData.contents.
            const res = await fetch(SCRIPT_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                body: JSON.stringify(body),
                redirect: 'follow',
                signal: AbortSignal.timeout(15_000),
            })
            const text = await res.text()
            if (!res.ok) return { ok: false, reason: `HTTP ${res.status}` }

            // Apps Script answers 200 with an HTML error page when a script
            // throws, so a status code alone is not proof the row was written.
            let parsed
            try {
                parsed = JSON.parse(text)
            } catch {
                return { ok: false, reason: `non-JSON reply: ${text.slice(0, 120)}` }
            }
            if (parsed.status === 'error' || parsed.ok === false) {
                return { ok: false, reason: JSON.stringify(parsed).slice(0, 200) }
            }
            return { ok: true }
        } catch (err) {
            return { ok: false, reason: err?.message || String(err) }
        }
    }

    const sheet = await forwardToSheet()
    if (!sheet.ok) {
        console.warn('[enquiry] Google Sheet forward failed:', sheet.reason)
    }

    let storedInSanity = false
    try {
        await createEnquiry({
            name, phone, email, service, material, message, source, page,
            submittedAt: body.submittedAt,
            fileName: body.fileName || '',
            forwardedToSheet: sheet.ok,
        })
        storedInSanity = true
    } catch (err) {
        console.error('[enquiry] Sanity write failed:', err?.message || err)
    }

    if (!storedInSanity && !sheet.ok) {
        return NextResponse.json(
            { ok: false, error: 'We could not record your request. Please WhatsApp us on +91 63807 36439.' },
            { status: 502 }
        )
    }

    return NextResponse.json({ ok: true })
}
