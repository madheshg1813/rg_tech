/**
 * Portable Text builders shared by every queued article.
 *
 * createBuilder() returns a fresh set of helpers with their own key counter.
 * Keys only have to be unique within a document, but a module-level counter
 * would drift depending on import order, producing different keys on every
 * build and making Sanity diffs meaningless. A per-article prefix keeps them
 * stable and readable.
 */
export function createBuilder(prefix = 'k') {
    let n = 0
    const key = () => `${prefix}${++n}`

    const span = (text, marks = []) => ({ _type: 'span', _key: key(), text, marks })

    const block = (style, children, extra = {}) => ({
        _type: 'block',
        _key: key(),
        style,
        markDefs: extra.markDefs || [],
        children,
        ...(extra.listItem ? { listItem: extra.listItem, level: 1 } : {}),
    })

    const p = (text) => block('normal', [span(text)])
    const h2 = (text) => block('h2', [span(text)])
    const h3 = (text) => block('h3', [span(text)])
    const li = (text) => block('normal', [span(text)], { listItem: 'bullet' })
    const nli = (text) => block('normal', [span(text)], { listItem: 'number' })

    /**
     * Paragraph with inline links.
     *   rich('See ', ['our gates', '/chennai/steel-gates'], ' for details.')
     *   rich('Per ', ['ISO 9013', 'https://iso.org/...', true], '.')
     * A third element of `true` marks the link external (nofollow, new tab).
     */
    const rich = (...parts) => {
        const markDefs = []
        const children = []
        for (const part of parts) {
            if (typeof part === 'string') {
                children.push(span(part))
            } else {
                const [text, href, external = false] = part
                const _key = key()
                markDefs.push({ _type: 'link', _key, href, external })
                children.push(span(text, [_key]))
            }
        }
        return block('normal', children, { markDefs })
    }

    const image = (url, alt, caption) => ({
        _type: 'contentImage',
        _key: key(),
        externalUrl: url,
        alt,
        ...(caption ? { caption } : {}),
    })

    const table = (caption, headers, rows) => ({
        _type: 'contentTable',
        _key: key(),
        caption,
        headers,
        rows: rows.map((cells) => ({ _type: 'tableRow', _key: key(), cells })),
    })

    const callout = (tone, text) => ({ _type: 'callout', _key: key(), tone, text })

    const faqs = (list) =>
        list.map(([question, answer]) => ({ _type: 'faq', _key: key(), question, answer }))

    return { key, span, block, p, h2, h3, li, nli, rich, image, table, callout, faqs }
}

/** Cloudinary base for article imagery. */
export const IMG = 'https://res.cloudinary.com/o1ytbfuz/image/upload'

export const IMAGES = {
    hero: `${IMG}/v1785177077/rg-tech/hero-laser`,
    fiber: `${IMG}/v1785177058/rg-tech/gallery/laser-cutting-services/kw_fiber_hd`,
    machine: `${IMG}/v1785177058/rg-tech/gallery/laser-cutting-services/kw_cnc_machine_hd`,
    sheet: `${IMG}/v1785177070/rg-tech/gallery/sheet-metal-laser-cutting/sm_01`,
    sheet2: `${IMG}/v1785177070/rg-tech/gallery/sheet-metal-laser-cutting/sm_03`,
    panel: `${IMG}/v1785176986/rg-tech/gallery/decorative-metal-panels/rg-tech-catelog-vol-02_page-0054`,
    gate: `${IMG}/v1785177073/rg-tech/gallery/steel-gates/rg-tech-catelog-vol-4_page-0120`,
}

export const AUTHOR_ID = 'author.madhesh-g'
export const CATEGORY_ID = 'category.laser-cutting-guides'

/**
 * Wraps article data into a Sanity `post` document.
 * publishedAt is filled in by the publisher at publish time, not here, so the
 * date reflects when a post actually went live rather than when it was written.
 */
export function makePost({
    slug, title, sheetTitle, summary, tldr, readTime,
    mainImageUrl, mainImageAlt,
    bannerEyebrow, bannerHeading, bannerSubheading, bannerBadge,
    metaTitle, metaDescription, keywords,
    body, faqs,
}) {
    return {
        _id: `post.${slug}`,
        _type: 'post',
        title,
        // Exact "Cluster Page" wording from the tracking sheet. Page titles are
        // written for search and rarely match the sheet verbatim, so the
        // publisher reports this instead — otherwise the row silently never
        // gets marked Published.
        sheetTitle: sheetTitle || title,
        slug: { _type: 'slug', current: slug },
        summary,
        tldr,
        author: { _type: 'reference', _ref: AUTHOR_ID },
        category: { _type: 'reference', _ref: CATEGORY_ID },
        readTime,
        mainImageUrl,
        mainImageAlt,
        bannerEyebrow,
        bannerHeading,
        bannerSubheading,
        bannerBadge,
        metaTitle,
        metaDescription,
        keywords,
        body,
        faqs,
    }
}
