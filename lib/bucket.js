import { createHash, createHmac } from 'node:crypto'

/*
 * Presigned GET URLs for the Railway bucket (S3-compatible, private).
 *
 * Railway buckets have no public read access — an unauthenticated GET returns
 * 403 AccessDenied — so objects can only be handed to a browser as a presigned
 * URL. This implements SigV4 query-string signing directly rather than pulling
 * in @aws-sdk/client-s3 + @aws-sdk/s3-request-presigner, which together are
 * ~10 MB installed. Signing a GET is about forty lines and needs no network
 * call, so the dependency buys nothing here.
 *
 * Reference: AWS SigV4, "Authenticating Requests: Using Query Parameters".
 */

const ALGORITHM = 'AWS4-HMAC-SHA256'
// Railway's S3 endpoint reports region "auto"; the signature just has to use
// the same value on both sides, so this is not a real geography.
const REGION = 'auto'
const SERVICE = 's3'

const sha256hex = (value) => createHash('sha256').update(value).digest('hex')
const hmac = (key, value) => createHmac('sha256', key).update(value).digest()

/* Percent-encode a path while leaving the separators intact. */
function encodeKey(key) {
    return key
        .split('/')
        .map((segment) => encodeURIComponent(segment))
        .join('/')
}

function signingKey(secret, date) {
    let k = hmac(`AWS4${secret}`, date)
    k = hmac(k, REGION)
    k = hmac(k, SERVICE)
    return hmac(k, 'aws4_request')
}

/**
 * Builds a presigned GET URL for an object in the bucket.
 *
 * @param {string} key         object key, e.g. 'catalogues/Vol-01.pdf'
 * @param {number} expiresIn   seconds until the URL stops working
 * @param {string} [filename]  when set, forces a download with this name
 *                             rather than rendering the PDF inline
 * @returns {string|null}       null when the bucket is not configured, so a
 *                              caller can fall back instead of throwing
 */
export function presignBucketObject(key, expiresIn = 600, filename) {
    const bucket = process.env.BUCKET_NAME
    const accessKeyId = process.env.BUCKET_ACCESS_KEY_ID
    const secretAccessKey = process.env.BUCKET_SECRET_ACCESS_KEY
    const endpoint = process.env.BUCKET_ENDPOINT || 'https://t3.storageapi.dev'

    if (!bucket || !accessKeyId || !secretAccessKey) return null

    // virtual-host addressing: <bucket>.<endpoint-host>
    const host = `${bucket}.${new URL(endpoint).host}`

    const now = new Date()
    const amzDate = now.toISOString().replace(/[:-]|\.\d{3}/g, '') // YYYYMMDDTHHMMSSZ
    const date = amzDate.slice(0, 8)
    const credential = `${accessKeyId}/${date}/${REGION}/${SERVICE}/aws4_request`

    const params = {
        'X-Amz-Algorithm': ALGORITHM,
        'X-Amz-Credential': credential,
        'X-Amz-Date': amzDate,
        'X-Amz-Expires': String(expiresIn),
        'X-Amz-SignedHeaders': 'host',
    }
    if (filename) {
        params['response-content-disposition'] =
            `attachment; filename="${filename}"`
    }

    // The canonical query string must be sorted by the *encoded* key.
    const canonicalQuery = Object.keys(params)
        .sort()
        .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
        .join('&')

    const canonicalRequest = [
        'GET',
        `/${encodeKey(key)}`,
        canonicalQuery,
        `host:${host}\n`,
        'host',
        'UNSIGNED-PAYLOAD',
    ].join('\n')

    const stringToSign = [
        ALGORITHM,
        amzDate,
        `${date}/${REGION}/${SERVICE}/aws4_request`,
        sha256hex(canonicalRequest),
    ].join('\n')

    const signature = createHmac('sha256', signingKey(secretAccessKey, date))
        .update(stringToSign)
        .digest('hex')

    return `https://${host}/${encodeKey(key)}?${canonicalQuery}&X-Amz-Signature=${signature}`
}
