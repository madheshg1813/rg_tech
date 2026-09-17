'use client'

import { Children, useState } from 'react'

/*
 * The Hindu / Christian / Islamic filter on /designs/gods.
 *
 * Takes the group sections as `children` rather than the data, so they stay
 * server-rendered: the index is the page that collects the searches naming no
 * particular subject, and its value is the sixty-odd gallery names in the HTML
 * that leaves the server. A client component can accept an already-rendered
 * server tree as children, so only the buttons and the selection live on this
 * side of the boundary.
 *
 * Filtering hides rather than unmounts, for the same reason. Every section
 * stays in the DOM whatever is selected; a crawler, and anyone with JavaScript
 * off, sees the whole catalogue. `hidden` is a plain attribute here, not the
 * Tailwind utility — sections carry their own layout classes and a utility
 * would lose the `display` fight with them.
 *
 * Each child must carry `data-faith`. That is how this component knows what it
 * is holding without being handed the data as well.
 */
export default function FaithFilter({ faiths, children, label = 'Filter designs by faith' }) {
    const [active, setActive] = useState('all')

    // One published faith means "All designs" and that faith are the same set,
    // and a filter with one real option reads as a control that does nothing.
    if (faiths.length < 2) return children

    const tabs = [{ slug: 'all', label: 'All designs' }, ...faiths]

    return (
        <>
            <div
                role="group"
                aria-label={label}
                className="flex flex-wrap gap-2 sm:gap-3 justify-center px-4 mt-7 sm:mt-9"
            >
                {tabs.map((tab) => {
                    const on = active === tab.slug
                    return (
                        <button
                            key={tab.slug}
                            type="button"
                            onClick={() => setActive(tab.slug)}
                            aria-pressed={on}
                            className={`px-4 sm:px-5 py-2.5 rounded-full text-sm font-bold border transition-colors ${
                                on
                                    ? 'bg-accent-ink text-white border-accent-ink'
                                    : 'bg-white text-fg-muted border-line hover:border-line-strong hover:text-fg'
                            }`}
                        >
                            {tab.label}
                            {tab.count != null && (
                                <span className={`ml-2 ${on ? 'text-white/70' : 'text-fg-subtle'}`}>
                                    {tab.count}
                                </span>
                            )}
                        </button>
                    )
                })}
            </div>

            {Children.map(children, (child) => {
                if (!child?.props) return child
                const show = active === 'all' || child.props['data-faith'] === active
                return (
                    <div hidden={!show} key={child.key}>
                        {child}
                    </div>
                )
            })}
        </>
    )
}
