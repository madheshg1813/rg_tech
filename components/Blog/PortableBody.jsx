import Image from 'next/image'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import { Info, Lightbulb, AlertTriangle } from 'lucide-react'
import { urlForImage } from '@/lib/sanity'
import { slugifyHeading, blockToPlainText } from '@/lib/portableText'

/*
 * Heading ids must match lib/portableText.js exactly or the table of contents
 * links break, so both sides share slugifyHeading and the same de-duplication
 * counter seeded per render.
 */
function makeHeading(Tag, className, counter) {
    return function Heading({ children, value }) {
        const text = blockToPlainText(value) || String(children)
        let id = slugifyHeading(text)
        if (counter.has(id)) {
            const n = counter.get(id) + 1
            counter.set(id, n)
            id = `${id}-${n}`
        } else {
            counter.set(id, 1)
        }
        return (
            <Tag id={id} className={`scroll-mt-28 ${className}`}>
                {children}
            </Tag>
        )
    }
}

const CALLOUT_STYLES = {
    tldr: {
        icon: Info,
        wrap: 'bg-[#F59E0B]/10 border-[#F59E0B]/30',
        iconColor: 'text-accent',
        label: 'TL;DR',
    },
    tip: {
        icon: Lightbulb,
        wrap: 'bg-surface-2 border-line',
        iconColor: 'text-accent',
        label: 'Tip',
    },
    warning: {
        icon: AlertTriangle,
        wrap: 'bg-red-50 border-red-200',
        iconColor: 'text-red-600',
        label: 'Watch out',
    },
}

function Callout({ value }) {
    const style = CALLOUT_STYLES[value?.tone] || CALLOUT_STYLES.tip
    const Icon = style.icon
    return (
        <div className={`my-10 rounded-2xl border p-6 flex gap-4 ${style.wrap}`}>
            <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${style.iconColor}`} />
            <p className="text-[15px] leading-relaxed text-fg m-0">
                <span className="font-black">{style.label}:</span> {value?.text}
            </p>
        </div>
    )
}

function ContentTable({ value }) {
    if (!value?.rows?.length) return null
    return (
        <figure className="my-12">
            {/* Wide tables scroll inside their own container so the page never does. */}
            <div className="overflow-x-auto rounded-2xl border border-line">
                <table className="w-full border-collapse text-[15px] min-w-[520px]">
                    {value.headers?.length > 0 && (
                        <thead>
                            <tr className="bg-surface-2">
                                {value.headers.map((h, i) => (
                                    <th
                                        key={i}
                                        scope="col"
                                        className="text-left font-black text-fg px-6 py-4 border-b border-line"
                                    >
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                    )}
                    <tbody>
                        {value.rows.map((row, r) => (
                            <tr key={r} className="border-b border-line last:border-0">
                                {(row.cells || []).map((cell, c) => (
                                    <td
                                        key={c}
                                        className={`px-6 py-4 align-top ${c === 0 ? 'font-bold text-fg' : 'text-fg-muted'}`}
                                    >
                                        {cell}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {value.caption && (
                <figcaption className="text-center text-[13px] text-fg-subtle mt-4">{value.caption}</figcaption>
            )}
        </figure>
    )
}

function ContentImage({ value }) {
    const src = value?.externalUrl || urlForImage(value, 1200)
    if (!src) return null
    return (
        <figure className="my-12">
            <div className="rounded-2xl overflow-hidden border border-line">
                <Image
                    src={src}
                    alt={value.alt || ''}
                    width={1200}
                    height={700}
                    sizes="(max-width: 1024px) 100vw, 760px"
                    className="w-full h-auto object-cover"
                />
            </div>
            {value.caption && (
                <figcaption className="text-center text-[13px] text-fg-subtle mt-4">{value.caption}</figcaption>
            )}
        </figure>
    )
}

/**
 * Internal links use next/link for client-side nav and pass link equity.
 * External links get rel="nofollow noopener noreferrer" + target="_blank".
 */
function LinkMark({ value, children }) {
    const href = value?.href || '#'
    const isExternal = value?.external || /^https?:\/\//i.test(href) && !href.includes('rgtechengineeringworks.com')

    if (isExternal) {
        return (
            <a
                href={href}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="text-accent font-semibold underline underline-offset-2 hover:text-[#B45309]"
            >
                {children}
            </a>
        )
    }
    return (
        <Link
            href={href}
            className="text-accent font-semibold underline underline-offset-2 hover:text-[#B45309]"
        >
            {children}
        </Link>
    )
}

export default function PortableBody({ value }) {
    // Fresh counter per render keeps heading ids deterministic and unique.
    const counter = new Map()

    const components = {
        block: {
            h2: makeHeading('h2', 'text-3xl md:text-4xl font-bold text-fg mt-16 mb-6 leading-tight', counter),
            h3: makeHeading('h3', 'text-2xl font-bold text-fg mt-12 mb-4 leading-snug', counter),
            h4: ({ children }) => <h4 className="text-xl font-bold text-fg mt-10 mb-3">{children}</h4>,
            normal: ({ children }) => (
                <p className="text-[17px] leading-[1.8] text-fg-muted mb-6">{children}</p>
            ),
            blockquote: ({ children }) => (
                <blockquote className="my-10 border-l-4 border-[#F59E0B] pl-6 italic text-[17px] text-fg-muted">
                    {children}
                </blockquote>
            ),
        },
        list: {
            bullet: ({ children }) => <ul className="my-6 space-y-3 pl-1">{children}</ul>,
            number: ({ children }) => <ol className="my-6 space-y-3 list-decimal pl-6">{children}</ol>,
        },
        listItem: {
            bullet: ({ children }) => (
                <li className="relative pl-7 text-[17px] leading-[1.8] text-fg-muted before:absolute before:left-0 before:top-[0.7em] before:w-2 before:h-2 before:rounded-full before:bg-[#F59E0B]">
                    {children}
                </li>
            ),
            number: ({ children }) => (
                <li className="text-[17px] leading-[1.8] text-fg-muted pl-2">{children}</li>
            ),
        },
        marks: {
            strong: ({ children }) => <strong className="font-bold text-fg">{children}</strong>,
            em: ({ children }) => <em className="italic">{children}</em>,
            code: ({ children }) => (
                <code className="px-1.5 py-0.5 rounded bg-surface-3 text-[15px] font-mono text-fg">{children}</code>
            ),
            link: LinkMark,
        },
        types: {
            contentImage: ContentImage,
            contentTable: ContentTable,
            callout: Callout,
        },
    }

    if (!Array.isArray(value) || !value.length) return null
    return <PortableText value={value} components={components} />
}
