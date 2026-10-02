"use client"

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown, MessageCircle, LayoutGrid } from 'lucide-react'

/*
 * Section navigation for /designs.
 *
 * One pill holding every category, each opening a menu of the designs inside it,
 * with the custom-design action sitting outside the pill so it reads as an
 * action rather than another category.
 *
 * Only categories that actually contain a design are passed in — an empty
 * category in the bar is a dead end for the visitor and a thin page for Google.
 * The bar fills out on its own as designs are added to lib/designs.js.
 */

const WA = 'https://wa.me/916380736439?text=' + encodeURIComponent(
    'Hi RG Tech, I have my own design reference. Please tell me what you need to quote it.'
)

export default function DesignNav({ categories }) {
    const [openSlug, setOpenSlug] = useState(null)
    const pathname = usePathname()
    const wrapRef = useRef(null)

    /* Close on outside click and on Escape. */
    useEffect(() => {
        if (!openSlug) return
        const onDown = (e) => {
            if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpenSlug(null)
        }
        const onKey = (e) => { if (e.key === 'Escape') setOpenSlug(null) }
        document.addEventListener('mousedown', onDown)
        window.addEventListener('keydown', onKey)
        return () => {
            document.removeEventListener('mousedown', onDown)
            window.removeEventListener('keydown', onKey)
        }
    }, [openSlug])

    /* Any navigation closes the menu. */
    useEffect(() => { setOpenSlug(null) }, [pathname])

    if (!categories?.length) return null

    return (
        <div ref={wrapRef} className="flex flex-col lg:flex-row lg:items-center lg:justify-center gap-3 lg:gap-4">
            {/* The pill. Scrolls horizontally on a phone rather than wrapping,
                so it stays one bar at every width. */}
            <nav
                aria-label="Design categories"
                className="rounded-full border border-line-strong bg-white/80 backdrop-blur-sm shadow-sm px-1.5 py-1.5 overflow-x-auto no-scrollbar"
            >
                <ul className="flex items-center gap-0.5 w-max mx-auto">
                    <li>
                        <Link
                            href="/designs"
                            aria-current={pathname === '/designs' ? 'page' : undefined}
                            className={`flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-semibold whitespace-nowrap transition-colors ${
                                pathname === '/designs'
                                    ? 'bg-cta text-white'
                                    : 'text-fg hover:bg-surface-2 hover:text-accent'
                            }`}
                        >
                            <LayoutGrid className="w-3.5 h-3.5" aria-hidden="true" /> All
                        </Link>
                    </li>

                    {categories.map(({ category, designs }) => {
                        const isOpen = openSlug === category.slug
                        const isActive = pathname.startsWith(`/designs/${category.slug}`)
                        return (
                            <li key={category.slug} className="relative">
                                <button
                                    type="button"
                                    aria-expanded={isOpen}
                                    aria-haspopup="true"
                                    onClick={() => setOpenSlug(isOpen ? null : category.slug)}
                                    onMouseEnter={() => setOpenSlug(category.slug)}
                                    className={`flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-semibold whitespace-nowrap transition-colors ${
                                        isActive
                                            ? 'bg-cta text-white'
                                            : 'text-fg hover:bg-surface-2 hover:text-accent'
                                    }`}
                                >
                                    {category.menuName}
                                    <ChevronDown
                                        className={`w-3.5 h-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                                        aria-hidden="true"
                                    />
                                </button>

                                {isOpen && (
                                    <div
                                        onMouseLeave={() => setOpenSlug(null)}
                                        className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50 animate-in fade-in slide-in-from-top-1"
                                    >
                                        <div className="bg-white rounded-2xl shadow-2xl border border-line p-2 w-60">
                                            <Link
                                                href={`/designs/${category.slug}`}
                                                className="block px-3 py-2 rounded-xl text-sm font-bold text-fg hover:bg-surface-2 hover:text-accent transition-colors"
                                            >
                                                All {category.menuName}
                                            </Link>
                                            <span className="block h-px bg-line my-1.5" aria-hidden="true"></span>
                                            {designs.map((d) => (
                                                <Link
                                                    key={d.slug}
                                                    href={`/designs/${category.slug}/${d.slug}`}
                                                    className="block px-3 py-2 rounded-xl text-sm font-medium text-fg-muted hover:bg-surface-2 hover:text-accent transition-colors"
                                                >
                                                    {d.name}
                                                    {d.aliases?.length > 0 && (
                                                        <span className="block text-xs text-fg-subtle mt-0.5">
                                                            {d.aliases.join(' · ')}
                                                        </span>
                                                    )}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </li>
                        )
                    })}
                </ul>
            </nav>

            <a
                href={WA}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-line-strong bg-white px-4 py-2.5 text-sm font-bold text-fg hover:border-cta hover:text-accent transition-colors whitespace-nowrap self-center lg:self-auto"
            >
                <MessageCircle className="w-4 h-4" /> Send Your Own Design
            </a>
        </div>
    )
}
