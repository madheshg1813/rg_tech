"use client";

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import dynamic from 'next/dynamic'
import Header from './Header'
import Footer from './Footer'
import FloatingContact from './FloatingContact'
import GoogleQRCard from './GoogleQRCard'

// The modal is only ever shown after a click, so keep it out of the initial
// bundle on every page load.
const CatalogueModal = dynamic(() => import('./CatalogueModal'), { ssr: false })

/*
 * Routes that already render <GoogleBusinessCard /> in their own body. They get
 * the QR and the rating from that block, so the site-wide pre-footer below would
 * be a second Google panel stacked directly on the first.
 *
 * The four city prefixes cover every service page, locality page and deity page
 * — all of them go through ServiceClient or GodPage, both of which include the
 * card.
 */
const CITY_PREFIXES = ['/chennai', '/madurai', '/coimbatore', '/salem']
const PAGES_WITH_OWN_GOOGLE_CARD = ['/contact', '/about']

function hasOwnGoogleCard(pathname) {
    if (!pathname) return false
    if (PAGES_WITH_OWN_GOOGLE_CARD.includes(pathname)) return true
    return CITY_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`))
}

export default function LayoutWrapper({ children }) {
    const [catalogueModalOpen, setCatalogueModalOpen] = useState(false)
    const pathname = usePathname()
    const showGooglePreFooter = !hasOwnGoogleCard(pathname)

    return (
        <div className="bg-white selection:bg-cta/20">
            <Header setCatalogueModalOpen={setCatalogueModalOpen} />
            <main>{children}</main>

            {/* Pre-footer profile block, for the routes that do not already
                carry one in their own body. Placed here rather than in each page
                so it lands at the foot of every remaining route without touching
                any of them. */}
            {showGooglePreFooter && (
                <section className="py-14 bg-surface-2 border-t border-line">
                    <div className="max-w-5xl mx-auto px-4">
                        <GoogleQRCard />
                    </div>
                </section>
            )}

            <Footer />
            {/* After the footer so it is last in the tab order — it is fixed
                furniture, not part of the page's reading flow. */}
            <FloatingContact />
            {catalogueModalOpen && (
                <CatalogueModal isOpen onClose={() => setCatalogueModalOpen(false)} />
            )}
        </div>
    )
}
