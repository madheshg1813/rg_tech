import { NextResponse } from 'next/server'
import { presignBucketObject } from '@/lib/bucket'
import { catalogues } from '@/lib/data'

/*
 * Hands out the catalogue PDFs.
 *
 * The four PDFs are 108 MB in total. They used to sit in /public, which meant
 * every deploy shipped them inside the container image and every clone dragged
 * them through Git LFS. They now live in a Railway bucket, which is private, so
 * this route mints a short-lived presigned URL and redirects to it — the bytes
 * come straight from object storage and never pass through the app.
 *
 * The allowlist is derived from lib/data.js rather than taking the filename from
 * the URL, so a request cannot be pointed at an arbitrary key in the bucket.
 */

export const runtime = 'nodejs'
// Presigned URLs are time-limited, so a cached redirect would eventually point
// at an expired signature.
export const dynamic = 'force-dynamic'

/** slug -> { key, filename } for every catalogue declared in lib/data.js */
const ALLOWED = new Map(
    catalogues.map((c) => {
        const filename = c.key.split('/').pop()
        return [filename.toLowerCase(), { key: c.key, filename }]
    })
)

export async function GET(request, { params }) {
    const { file } = await params
    const entry = ALLOWED.get(decodeURIComponent(file).toLowerCase())

    if (!entry) {
        return NextResponse.json({ error: 'Unknown catalogue.' }, { status: 404 })
    }

    const url = presignBucketObject(entry.key, 600, entry.filename)

    if (!url) {
        // Bucket not configured — say so plainly rather than redirecting nowhere.
        return NextResponse.json(
            { error: 'Catalogue storage is not configured on this server.' },
            { status: 503 }
        )
    }

    return NextResponse.redirect(url, 307)
}
