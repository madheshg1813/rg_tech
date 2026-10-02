import Link from 'next/link'

/*
 * The All / Hindu / Christian / Islamic tabs on the design indexes.
 *
 * These are links, not toggles. They used to be client-side buttons that hid
 * sections in place, so choosing "Christian" changed nothing in the address
 * bar: a filtered view could not be shared, bookmarked or reached with the
 * back button, and a refresh dropped you back on "All designs". Each faith
 * already had its own page — /designs/gods/hindu, /christian, /islamic — with
 * its own title, lead and structured data, so the tabs now simply go there.
 *
 * That also means no client component. Every page is server-rendered with only
 * its own sections in the HTML, which is what those faith pages were built to
 * rank on in the first place.
 *
 * `scroll={false}` keeps the reader where they clicked. Without it every tab
 * change jumps back to the top of the hero, which on a phone puts the tabs they
 * just used a full screen away.
 */
export default function FaithFilter({ faiths, active = 'all', label = 'Filter designs by faith' }) {
    // One published faith means "All designs" and that faith are the same set,
    // and a filter with one real option reads as a control that does nothing.
    if (!faiths || faiths.length < 2) return null

    const tabs = [{ slug: 'all', label: 'All designs', href: '/designs/gods' }, ...faiths]

    return (
        <nav
            aria-label={label}
            className="flex flex-wrap gap-2 sm:gap-3 justify-center px-4 mt-7 sm:mt-9"
        >
            {tabs.map((tab) => {
                const on = active === tab.slug
                return (
                    <Link
                        key={tab.slug}
                        href={tab.href}
                        scroll={false}
                        aria-current={on ? 'page' : undefined}
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
                    </Link>
                )
            })}
        </nav>
    )
}
