"use client";

import { useState } from 'react'
import dynamic from 'next/dynamic'
import Header from './Header'
import Footer from './Footer'

// The modal is only ever shown after a click, so keep it out of the initial
// bundle on every page load.
const CatalogueModal = dynamic(() => import('./CatalogueModal'), { ssr: false })

export default function LayoutWrapper({ children }) {
    const [catalogueModalOpen, setCatalogueModalOpen] = useState(false)

    return (
        <div className="bg-white selection:bg-cta/20">
            <Header setCatalogueModalOpen={setCatalogueModalOpen} />
            <main>{children}</main>
            <Footer />
            {catalogueModalOpen && (
                <CatalogueModal isOpen onClose={() => setCatalogueModalOpen(false)} />
            )}
        </div>
    )
}
