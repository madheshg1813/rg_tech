"use client";

import { useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import CatalogueModal from './CatalogueModal'

export default function LayoutWrapper({ children }) {
    const [catalogueModalOpen, setCatalogueModalOpen] = useState(false)

    return (
        <div className="bg-white selection:bg-[#E85A4F]/20">
            <Header setCatalogueModalOpen={setCatalogueModalOpen} />
            <main>{children}</main>
            <Footer />
            <CatalogueModal isOpen={catalogueModalOpen} onClose={() => setCatalogueModalOpen(false)} />
        </div>
    )
}
