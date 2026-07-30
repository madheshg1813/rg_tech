"use client"
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { CheckCircle, X, ChevronLeft, ChevronRight, Plus, MessageCircle } from 'lucide-react'
import { galleryItems } from '@/lib/galleryData'
import { galleryAlt } from '@/lib/utils'

const filters = [
    'All',
    'Laser Cutting Services',
    'Sheet Metal Laser Cutting',
    'Fabrication Services',
    'Steel Gates',
    'Metal Safety Doors',
    'Decorative Metal Panels'
]

const GalleryClient = () => {
    const searchParams = useSearchParams()
    const categoryParam = searchParams.get('category')

    const [activeFilter, setActiveFilter] = useState('All')
    const [visibleItems, setVisibleItems] = useState(12)
    const [lightboxIndex, setLightboxIndex] = useState(null)
    const isLightboxOpen = lightboxIndex !== null

    useEffect(() => {
        if (categoryParam && filters.includes(categoryParam)) {
            setActiveFilter(categoryParam)
        }
    }, [categoryParam])

    const filtered = activeFilter === 'All' ? galleryItems : galleryItems.filter(i => i.filter === activeFilter)
    const displayed = filtered.slice(0, visibleItems)

    const handleFilterClick = (f) => { setActiveFilter(f); setVisibleItems(12); setLightboxIndex(null); }
    const openLightbox = (index) => setLightboxIndex(index)
    const closeLightbox = () => setLightboxIndex(null)
    const nextImage = (e) => { e.stopPropagation(); setLightboxIndex(prev => (prev + 1) % displayed.length) }
    const prevImage = (e) => { e.stopPropagation(); setLightboxIndex(prev => (prev - 1 + displayed.length) % displayed.length) }

    return (
        <div className="bg-white min-h-screen">
            {/* Gallery Hero */}
            <section className="hero-gradient py-16 md:py-24 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none hero-texture"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center">
                    <p className="eyebrow mb-4">Visual Portfolio</p>
                    <h1 className="display-title text-fg mb-6">Design <span className="text-accent">Library</span></h1>
                    <p className="section-lead max-w-2xl mx-auto">
                        A comprehensive collection of our precision laser cutting, fabrication job work, and architectural metal designs.
                    </p>
                </div>
            </section>

            <section className="py-24 bg-surface-2">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex flex-wrap justify-center gap-3 mb-16">
                        {filters.map(f => (
                            <button
                                key={f}
                                onClick={() => handleFilterClick(f)}
                                className={`px-6 py-3 rounded-2xl text-sm font-bold transition-all border shadow-sm ${activeFilter === f ? 'bg-ink-2 text-white border-ink-2 shadow-xl shadow-ink-2/25 scale-105' : 'bg-white text-fg/60 border-line hover:border-cta hover:text-accent'}`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>

                    {galleryItems.length > 0 ? (
                        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
                            {displayed.map((item, i) => (
                                <div
                                    key={i}
                                    onClick={() => openLightbox(i)}
                                    className="break-inside-avoid group relative rounded-3xl overflow-hidden bg-white border border-line shadow-sm transition-all hover:shadow-2xl cursor-zoom-in hover:-translate-y-1"
                                >
                                    <Image
                                        src={item.img}
                                        alt={galleryAlt(item, i + 1)}
                                        width={600}
                                        height={400}
                                        loading={i < 4 ? 'eager' : 'lazy'}
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                                        className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 p-8 flex flex-col justify-end">
                                        <p className="eyebrow mb-2">{item.filter}</p>
                                        <h4 className="card-title text-white mb-3">{item.title}</h4>
                                        <div className="flex justify-between items-center">
                                            <p className="text-white/60 text-xs font-medium">{item.material}</p>
                                            <div className="w-10 h-10 rounded-xl bg-cta text-white flex items-center justify-center scale-75 group-hover:scale-100 transition-transform">
                                                <Plus className="w-5 h-5" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="max-w-3xl mx-auto py-14 px-6 sm:py-20 sm:px-8 text-center bg-white border border-line rounded-[1.5rem] sm:rounded-[3rem] shadow-xl shadow-line-strong/50">
                            <div className="w-24 h-24 bg-surface-2 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-line">
                                <Plus className="w-10 h-10 text-accent animate-pulse" />
                            </div>
                            <h2 className="subsection-title text-fg mb-4">Incoming <span className="text-accent">Portfolio</span></h2>
                            <p className="section-lead mb-10">
                                Our latest project samples and high-precision fabrication designs are currently being updated in our digital library. Check back soon for our newest architectural and industrial works.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <a
                                    href="https://wa.me/916380736439?text=I would like to see recent project samples for laser cutting/fabrication."
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-primary"
                                >
                                    <MessageCircle className="w-5 h-5" /> Request Samples on WhatsApp
                                </a>
                            </div>
                        </div>
                    )}

                    {/* Lightbox */}
                    {isLightboxOpen && (
                        <div className="on-dark fixed inset-0 z-[100] bg-ink/95 backdrop-blur-2xl flex items-center justify-center p-4 animate-in fade-in duration-300">
                            <button onClick={closeLightbox} className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors z-[110] bg-white/5 p-3 rounded-2xl">
                                <X className="w-8 h-8" />
                            </button>

                            <button onClick={prevImage} className="absolute left-8 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors z-[110] bg-white/5 p-4 rounded-3xl hover:bg-white/10">
                                <ChevronLeft className="w-10 h-10" />
                            </button>

                            <div className="max-w-6xl w-full flex flex-col lg:flex-row gap-12 items-center px-4">
                                <div className="flex-1 relative group bg-black/20 rounded-[2.5rem] p-4 border border-white/5 shadow-2xl">
                                    <Image
                                        src={displayed[lightboxIndex].img}
                                        alt={galleryAlt(displayed[lightboxIndex], lightboxIndex + 1)}
                                        width={1200}
                                        height={900}
                                        sizes="(max-width: 1024px) 100vw, 60vw"
                                        className="w-full max-h-[65vh] object-contain rounded-[2rem]"
                                    />
                                </div>

                                <div className="w-full lg:w-[400px] text-white flex flex-col gap-8">
                                    <div className="space-y-4">
                                        <div className="inline-block px-4 py-1.5 bg-cta/20 border border-cta/20 rounded-full">
                                            <p className="text-accent meta-label">{displayed[lightboxIndex].filter}</p>
                                        </div>
                                        <h3 className="section-title">{displayed[lightboxIndex].title}</h3>
                                    </div>

                                    <div className="p-8 bg-white/5 rounded-[2rem] border border-white/10 space-y-6 backdrop-blur-md">
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-white/40 meta-label">Material Grade</span>
                                            <span className="font-bold text-accent">{displayed[lightboxIndex].material}</span>
                                        </div>
                                        <p className="text-white/60 text-sm leading-relaxed font-medium">
                                            Industry-standard precision cutting with zero-tolerance edge finish. Optimized for high-end structural and architectural installations.
                                        </p>
                                        <div className="pt-6 border-t border-white/10 flex flex-col gap-4">
                                            <a
                                                href={`https://wa.me/916380736439?text=Enquiry: ${displayed[lightboxIndex].title} (${displayed[lightboxIndex].material})`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="btn btn-primary w-full"
                                            >
                                                <MessageCircle className="w-5 h-5" /> Enquire on WhatsApp
                                            </a>
                                            <p className="text-center meta-label text-white/20">REF: RG-LIB-{lightboxIndex + 5000}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button onClick={nextImage} className="absolute right-8 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors z-[110] bg-white/5 p-4 rounded-3xl hover:bg-white/10">
                                <ChevronRight className="w-10 h-10" />
                            </button>
                        </div>
                    )}

                    {visibleItems < filtered.length && (
                        <div className="text-center mt-20">
                            <button
                                onClick={() => setVisibleItems(prev => prev + 12)}
                                className="btn btn-primary btn-lg"
                            >
                                Load More Samples
                            </button>
                        </div>
                    )}
                </div>
            </section>
        </div>
    )
}

export default GalleryClient;
