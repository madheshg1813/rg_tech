"use client"
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { CheckCircle, X, ChevronLeft, ChevronRight, Plus, MessageCircle } from 'lucide-react'
import { galleryItems } from '@/lib/galleryData'

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
            <section className="bg-[#1C3D5A] text-white py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-[#E85A4F]/5 skew-y-3 translate-y-20 pointer-events-none"></div>
                <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
                    <p className="text-[#E85A4F] font-black text-xs uppercase tracking-[0.4em] mb-4">Visual Portfolio</p>
                    <h2 className="text-4xl md:text-6xl font-black font-heading mb-6 italic tracking-tight">Design <span className="text-[#E85A4F]">Library</span></h2>
                    <p className="text-white/60 max-w-2xl mx-auto text-lg font-medium leading-relaxed">
                        A comprehensive collection of our precision laser cutting, fabrication job work, and architectural metal designs.
                    </p>
                </div>
            </section>

            <section className="py-24 bg-slate-50/50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex flex-wrap justify-center gap-3 mb-16">
                        {filters.map(f => (
                            <button
                                key={f}
                                onClick={() => handleFilterClick(f)}
                                className={`px-6 py-3 rounded-2xl text-sm font-bold transition-all border shadow-sm ${activeFilter === f ? 'bg-[#1C3D5A] text-white border-[#1C3D5A] shadow-xl shadow-[#1C3D5A]/20 scale-105' : 'bg-white text-[#1C3D5A]/60 border-slate-100 hover:border-[#E85A4F] hover:text-[#E85A4F]'}`}
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
                                    className="break-inside-avoid group relative rounded-3xl overflow-hidden bg-white border border-slate-100 shadow-sm transition-all hover:shadow-2xl cursor-zoom-in hover:-translate-y-1"
                                >
                                    <img src={item.img} alt={item.title} className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#1C3D5A] via-[#1C3D5A]/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 p-8 flex flex-col justify-end">
                                        <p className="text-[#E85A4F] text-[10px] font-black uppercase tracking-[0.2em] mb-2">{item.filter}</p>
                                        <h4 className="text-white font-bold text-lg font-heading leading-tight mb-3">{item.title}</h4>
                                        <div className="flex justify-between items-center">
                                            <p className="text-white/60 text-xs font-medium italic">{item.material}</p>
                                            <div className="w-10 h-10 rounded-xl bg-[#E85A4F] text-white flex items-center justify-center scale-75 group-hover:scale-100 transition-transform">
                                                <Plus className="w-5 h-5" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="max-w-3xl mx-auto py-20 px-8 text-center bg-white border border-slate-100 rounded-[3rem] shadow-xl shadow-slate-200/50">
                            <div className="w-24 h-24 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-slate-100">
                                <Plus className="w-10 h-10 text-[#E85A4F] animate-pulse" />
                            </div>
                            <h3 className="text-3xl font-black font-heading text-[#1C3D5A] mb-6 italic">Incoming <span className="text-[#E85A4F]">Portfolio</span></h3>
                            <p className="text-lg text-slate-500 font-medium mb-10 leading-relaxed">
                                Our latest project samples and high-precision fabrication designs are currently being updated in our digital library. Check back soon for our newest architectural and industrial works.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <a
                                    href="https://wa.me/916380736439?text=I would like to see recent project samples for laser cutting/fabrication."
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-[#25D366] text-white px-8 py-4 rounded-2xl font-bold text-sm uppercase tracking-widest hover:scale-105 transition-all flex items-center gap-3 shadow-lg shadow-[#25D366]/20"
                                >
                                    <MessageCircle className="w-5 h-5" /> Request Samples on WhatsApp
                                </a>
                            </div>
                        </div>
                    )}

                    {/* Lightbox */}
                    {isLightboxOpen && (
                        <div className="fixed inset-0 z-[100] bg-[#1C3D5A]/95 backdrop-blur-2xl flex items-center justify-center p-4 animate-in fade-in duration-300">
                            <button onClick={closeLightbox} className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors z-[110] bg-white/5 p-3 rounded-2xl">
                                <X className="w-8 h-8" />
                            </button>

                            <button onClick={prevImage} className="absolute left-8 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors z-[110] bg-white/5 p-4 rounded-3xl hover:bg-white/10">
                                <ChevronLeft className="w-10 h-10" />
                            </button>

                            <div className="max-w-6xl w-full flex flex-col lg:flex-row gap-12 items-center px-4">
                                <div className="flex-1 relative group bg-black/20 rounded-[2.5rem] p-4 border border-white/5 shadow-2xl">
                                    <img
                                        src={displayed[lightboxIndex].img}
                                        alt={displayed[lightboxIndex].title}
                                        className="w-full max-h-[65vh] object-contain rounded-[2rem]"
                                    />
                                </div>

                                <div className="w-full lg:w-[400px] text-white flex flex-col gap-8">
                                    <div className="space-y-4">
                                        <div className="inline-block px-4 py-1.5 bg-[#E85A4F]/20 border border-[#E85A4F]/20 rounded-full">
                                            <p className="text-[#E85A4F] font-black text-[10px] uppercase tracking-widest">{displayed[lightboxIndex].filter}</p>
                                        </div>
                                        <h3 className="text-3xl md:text-5xl font-black font-heading leading-tight tracking-tight italic">{displayed[lightboxIndex].title}</h3>
                                    </div>

                                    <div className="p-8 bg-white/5 rounded-[2rem] border border-white/10 space-y-6 backdrop-blur-md">
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-white/40 font-bold uppercase tracking-widest text-[10px]">Material Grade</span>
                                            <span className="font-bold text-[#E85A4F]">{displayed[lightboxIndex].material}</span>
                                        </div>
                                        <p className="text-white/60 text-sm leading-relaxed font-medium">
                                            Industry-standard precision cutting with zero-tolerance edge finish. Optimized for high-end structural and architectural installations.
                                        </p>
                                        <div className="pt-6 border-t border-white/10 flex flex-col gap-4">
                                            <a
                                                href={`https://wa.me/916380736439?text=Enquiry: ${displayed[lightboxIndex].title} (${displayed[lightboxIndex].material})`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-full bg-[#25D366] text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:scale-[1.02] transition-transform shadow-2xl shadow-[#25D366]/20"
                                            >
                                                <MessageCircle className="w-5 h-5" /> Enquire on WhatsApp
                                            </a>
                                            <p className="text-center text-[10px] text-white/20 font-bold tracking-widest uppercase">REF: RG-LIB-{lightboxIndex + 5000}</p>
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
                                className="group relative bg-[#1C3D5A] text-white px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-[#1C3D5A]/30 hover:shadow-[#E85A4F]/40 hover:bg-[#E85A4F] transition-all overflow-hidden"
                            >
                                <span className="relative z-10">Load More Samples</span>
                                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                            </button>
                        </div>
                    )}
                </div>
            </section>
        </div>
    )
}

export default GalleryClient;
