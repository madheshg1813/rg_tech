/** Stable, URL-safe id for a heading — shared by the TOC and the rendered heading. */
export function slugifyHeading(text) {
    return String(text || '')
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .slice(0, 80)
}

/** Flatten a Portable Text block's spans to plain text. */
export function blockToPlainText(block) {
    if (!block?.children) return ''
    return block.children.map((c) => c.text || '').join('')
}

/**
 * Pull H2/H3 headings out of a Portable Text body for the "In this page" nav.
 * Ids are generated the same way the renderer does, so anchors always resolve.
 */
export function extractHeadings(body) {
    if (!Array.isArray(body)) return []
    const seen = new Map()

    return body
        .filter((b) => b._type === 'block' && (b.style === 'h2' || b.style === 'h3'))
        .map((b) => {
            const text = blockToPlainText(b)
            let id = slugifyHeading(text)
            // Guarantee uniqueness if two headings share wording.
            if (seen.has(id)) {
                const n = seen.get(id) + 1
                seen.set(id, n)
                id = `${id}-${n}`
            } else {
                seen.set(id, 1)
            }
            return { id, text, level: b.style === 'h2' ? 2 : 3 }
        })
        .filter((h) => h.text)
}

/** Rough reading time, used when the CMS field is empty. */
export function estimateReadTime(body) {
    if (!Array.isArray(body)) return '5 min read'
    const words = body
        .filter((b) => b._type === 'block')
        .map(blockToPlainText)
        .join(' ')
        .split(/\s+/)
        .filter(Boolean).length
    return `${Math.max(1, Math.round(words / 220))} min read`
}
