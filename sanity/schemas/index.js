/*
 * Sanity content model for the RG Tech blog.
 *
 * Plain objects rather than defineType() imports so this file stays usable
 * without pulling the full `sanity` studio package into the Next.js build.
 * Drop it straight into a Studio's `schema.types` when you add one.
 */

const author = {
    name: 'author',
    title: 'Author',
    type: 'document',
    fields: [
        { name: 'name', title: 'Name', type: 'string', validation: (R) => R.required() },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: { source: 'name', maxLength: 96 },
            validation: (R) => R.required(),
        },
        { name: 'role', title: 'Role', type: 'string', description: 'e.g. Content Writer' },
        { name: 'bio', title: 'Bio', type: 'text', rows: 3 },
        { name: 'image', title: 'Photo', type: 'image', options: { hotspot: true } },
        {
            name: 'imageUrl',
            title: 'Photo URL',
            type: 'url',
            description: 'External avatar URL, used when no image asset is uploaded.',
        },
        { name: 'email', title: 'Email', type: 'string' },
        {
            name: 'sameAs',
            title: 'Profile URLs',
            type: 'array',
            of: [{ type: 'url' }],
            description: 'LinkedIn / X / other profiles — emitted as schema.org sameAs.',
        },
    ],
    preview: { select: { title: 'name', subtitle: 'role', media: 'image' } },
}

const category = {
    name: 'category',
    title: 'Category',
    type: 'document',
    fields: [
        { name: 'title', title: 'Title', type: 'string', validation: (R) => R.required() },
        { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } },
        { name: 'description', title: 'Description', type: 'text', rows: 2 },
    ],
}

const faq = {
    name: 'faq',
    title: 'FAQ',
    type: 'object',
    fields: [
        { name: 'question', title: 'Question', type: 'string', validation: (R) => R.required() },
        { name: 'answer', title: 'Answer', type: 'text', rows: 4, validation: (R) => R.required() },
    ],
    preview: { select: { title: 'question' } },
}

/** Image inside article body — alt is required so no image ships without one. */
const contentImage = {
    name: 'contentImage',
    title: 'Image',
    type: 'image',
    options: { hotspot: true },
    fields: [
        {
            name: 'alt',
            title: 'Alt text',
            type: 'string',
            validation: (R) => R.required().warning('Required for accessibility and SEO.'),
        },
        { name: 'caption', title: 'Caption', type: 'string' },
        {
            name: 'externalUrl',
            title: 'External image URL',
            type: 'url',
            description: 'Use when the image lives on Cloudinary rather than in Sanity.',
        },
    ],
}

/** Simple comparison table rendered as a real <table>. */
const contentTable = {
    name: 'contentTable',
    title: 'Table',
    type: 'object',
    fields: [
        { name: 'caption', title: 'Caption', type: 'string' },
        {
            name: 'headers',
            title: 'Header cells',
            type: 'array',
            of: [{ type: 'string' }],
        },
        {
            name: 'rows',
            title: 'Rows',
            type: 'array',
            of: [
                {
                    type: 'object',
                    name: 'tableRow',
                    fields: [{ name: 'cells', title: 'Cells', type: 'array', of: [{ type: 'string' }] }],
                    preview: { select: { cells: 'cells' } },
                },
            ],
        },
    ],
    preview: { select: { title: 'caption' } },
}

const callout = {
    name: 'callout',
    title: 'Callout',
    type: 'object',
    fields: [
        {
            name: 'tone',
            title: 'Tone',
            type: 'string',
            options: { list: ['tldr', 'tip', 'warning'] },
            initialValue: 'tip',
        },
        { name: 'text', title: 'Text', type: 'text', rows: 3 },
    ],
}

const blockContent = {
    name: 'blockContent',
    title: 'Body',
    type: 'array',
    of: [
        {
            type: 'block',
            styles: [
                { title: 'Normal', value: 'normal' },
                { title: 'H2', value: 'h2' },
                { title: 'H3', value: 'h3' },
                { title: 'H4', value: 'h4' },
                { title: 'Quote', value: 'blockquote' },
            ],
            lists: [
                { title: 'Bullet', value: 'bullet' },
                { title: 'Numbered', value: 'number' },
            ],
            marks: {
                decorators: [
                    { title: 'Bold', value: 'strong' },
                    { title: 'Italic', value: 'em' },
                    { title: 'Code', value: 'code' },
                ],
                annotations: [
                    {
                        name: 'link',
                        title: 'Link',
                        type: 'object',
                        fields: [
                            { name: 'href', title: 'URL', type: 'url', validation: (R) => R.required() },
                            {
                                name: 'external',
                                title: 'External link',
                                type: 'boolean',
                                initialValue: false,
                                description: 'External links render with rel="nofollow noopener" and open in a new tab.',
                            },
                        ],
                    },
                ],
            },
        },
        contentImage,
        contentTable,
        callout,
    ],
}

const post = {
    name: 'post',
    title: 'Blog post',
    type: 'document',
    fields: [
        { name: 'title', title: 'Title', type: 'string', validation: (R) => R.required() },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: { source: 'title', maxLength: 96 },
            validation: (R) => R.required(),
        },
        { name: 'summary', title: 'Summary', type: 'text', rows: 3, validation: (R) => R.required() },
        { name: 'tldr', title: 'TL;DR', type: 'text', rows: 3 },

        { name: 'author', title: 'Author', type: 'reference', to: [{ type: 'author' }] },
        { name: 'category', title: 'Category', type: 'reference', to: [{ type: 'category' }] },

        { name: 'publishedAt', title: 'Published at', type: 'datetime', validation: (R) => R.required() },
        { name: 'updatedAt', title: 'Updated at', type: 'datetime' },
        { name: 'readTime', title: 'Read time', type: 'string', description: 'e.g. "9 min read"' },

        { name: 'mainImage', title: 'Main image', type: 'image', options: { hotspot: true } },
        {
            name: 'mainImageUrl',
            title: 'Main image URL',
            type: 'url',
            description: 'Cloudinary URL, used when no Sanity asset is uploaded.',
        },
        { name: 'mainImageAlt', title: 'Main image alt text', type: 'string' },

        // Banner strip shown at the top of the article, mirroring the reference design.
        { name: 'bannerEyebrow', title: 'Banner eyebrow', type: 'string', description: 'e.g. "TECHNICAL GUIDE · 2026"' },
        { name: 'bannerHeading', title: 'Banner heading', type: 'string' },
        { name: 'bannerSubheading', title: 'Banner subheading', type: 'string' },
        { name: 'bannerBadge', title: 'Banner badge', type: 'string', description: 'e.g. "ISO COMPLIANT"' },

        { name: 'metaTitle', title: 'Meta title', type: 'string' },
        { name: 'metaDescription', title: 'Meta description', type: 'text', rows: 2 },
        { name: 'keywords', title: 'Keywords', type: 'array', of: [{ type: 'string' }] },

        { name: 'body', title: 'Body', type: 'blockContent' },
        { name: 'faqs', title: 'FAQs', type: 'array', of: [faq] },
    ],
    orderings: [
        {
            title: 'Newest first',
            name: 'publishedAtDesc',
            by: [{ field: 'publishedAt', direction: 'desc' }],
        },
    ],
    preview: {
        select: { title: 'title', subtitle: 'summary', media: 'mainImage' },
    },
}

/**
 * A lead captured from the website — the contact form or the catalogue download.
 * Stored here so enquiries are never dependent on an external script being
 * configured correctly.
 */
const enquiry = {
    name: 'enquiry',
    title: 'Enquiry',
    type: 'document',
    fields: [
        { name: 'name', title: 'Name', type: 'string' },
        { name: 'phone', title: 'Phone', type: 'string' },
        { name: 'email', title: 'Email', type: 'string' },
        { name: 'service', title: 'Service', type: 'string' },
        { name: 'material', title: 'Material', type: 'string' },
        { name: 'message', title: 'Message', type: 'text', rows: 4 },
        { name: 'fileName', title: 'Attachment name', type: 'string' },
        {
            name: 'source',
            title: 'Source',
            type: 'string',
            description: 'contact-form or catalogue-modal',
        },
        { name: 'page', title: 'Submitted from page', type: 'string' },
        { name: 'submittedAt', title: 'Submitted at', type: 'datetime' },
        {
            name: 'forwardedToSheet',
            title: 'Forwarded to Google Sheet',
            type: 'boolean',
            description: 'False when the Apps Script was unreachable or not yet configured.',
        },
    ],
    orderings: [
        { title: 'Newest first', name: 'newest', by: [{ field: 'submittedAt', direction: 'desc' }] },
    ],
    preview: {
        select: { title: 'name', subtitle: 'phone' },
    },
}

export const schemaTypes = [post, author, category, enquiry, blockContent, contentImage, contentTable, callout, faq]

export default schemaTypes
