"use client";

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
    Phone, Mail, MapPin, Clock, ChevronDown, ChevronRight, MessageCircle, 
    Menu, X, FileText 
} from 'lucide-react'
import { pillarServices, CHENNAI_LOCALITIES } from '@/lib/data'

const Header = ({ setCatalogueModalOpen }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [servicesDropdown, setServicesDropdown] = useState(false)
    const pathname = usePathname()

    const toggleMobileMenu = () => setMobileMenuOpen(prev => !prev)
    const toggleServicesDropdown = () => setServicesDropdown(prev => !prev)

    useEffect(() => {
        setMobileMenuOpen(false)
        setServicesDropdown(false)
    }, [pathname])

    return (
        <>
            {/* Top Info Bar */}
            <div className="bg-[#2C3E50] text-white/90 text-[11px] font-medium tracking-wide uppercase border-b border-white/5">
                <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <MapPin className="w-3 h-3 text-[#E85A4F]" />
                            <span className="hidden md:inline">Chennai Hub | Industrial Excellence</span>
                            <span className="md:hidden">Chennai, IN</span>
                        </div>
                        <div className="hidden lg:flex items-center gap-2 border-l border-white/10 pl-4">
                            <Clock className="w-3 h-3 text-[#E85A4F]" />
                            <span>Mon–Sat: 09:00–19:00</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-6">
                        <a href="tel:+916380736439" className="flex items-center gap-1.5 hover:text-[#E85A4F] transition-colors">
                            <Phone className="w-3 h-3" />
                            <span>+91 63807-36439</span>
                        </a>
                        <a href="mailto:admin@rgtechengineeringworks.com" className="hidden sm:flex items-center gap-1.5 hover:text-[#E85A4F] transition-colors lowercase tracking-normal">
                            <Mail className="w-3 h-3 uppercase" />
                            <span>admin@rgtechengineeringworks.com</span>
                        </a>
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <header className="glass sticky top-0 z-50 shadow-premium transition-all duration-300">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex justify-between items-center">
                        <Link href="/" className="flex items-center gap-3.5 group">
                            <img src="/RG-Tech-Logo.png" alt="RG Tech Logo" className="h-14 w-auto object-contain group-hover:scale-105 transition-transform duration-300" />
                            <div className="transition-all hidden sm:block">
                                <h1 className="text-xl font-bold text-[#1C3D5A] leading-none tracking-tight font-heading">
                                    RG Tech <span className="text-[#E85A4F]">Engineering</span>
                                </h1>
                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] mt-1 opacity-70">
                                    CNC Fiber Laser Specialist
                                </p>
                            </div>
                        </Link>

                        <nav className="hidden lg:flex items-center gap-8">
                            <div className="relative group">
                                <button
                                    onClick={toggleServicesDropdown}
                                    onMouseEnter={() => !servicesDropdown && setServicesDropdown(true)}
                                    className="text-[#1C3D5A] hover:text-[#E85A4F] transition-all font-semibold text-[14px] flex items-center gap-1.5 py-2"
                                >
                                    Services <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${servicesDropdown ? 'rotate-180' : ''}`} />
                                </button>
                                {servicesDropdown && (
                                    <div
                                        onMouseLeave={() => setServicesDropdown(false)}
                                        className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-[1200px] z-50 overflow-visible animate-in fade-in slide-in-from-top-2"
                                    >
                                        <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 py-4 w-[420px] mx-auto relative">
                                            <div className="px-6 py-2 mb-2">
                                                <p className="text-[10px] font-bold text-[#E85A4F] uppercase tracking-widest">Our Expertise</p>
                                            </div>
                                            {pillarServices.map((s, i) => (
                                                <div key={i} className="px-2 relative group/service">
                                                    <Link
                                                        href={s.slug}
                                                        onClick={() => setServicesDropdown(false)}
                                                        className="flex justify-between items-center gap-3 px-4 py-3 rounded-2xl hover:bg-slate-50 transition-all group/link"
                                                    >
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center group-hover/link:bg-accent-soft transition-colors">
                                                                <ChevronRight className="w-4 h-4 text-[#1C3D5A] group-hover/link:text-[#E85A4F]" />
                                                            </div>
                                                            <span className="text-[15px] font-medium text-[#1C3D5A]/80 group-hover/link:text-[#1C3D5A] transition-colors">{s.name}</span>
                                                        </div>
                                                    </Link>

                                                    <div className="absolute left-full top-0 w-12 h-full z-10 bg-transparent" />

                                                    <div className="invisible group-hover/service:visible absolute left-full top-[-16px] pl-6 w-[300px] z-50 animate-in fade-in slide-in-from-left-2 pointer-events-auto">
                                                        <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 p-6">
                                                            <div className="mb-4">
                                                                <p className="text-[10px] font-bold text-[#E85A4F] uppercase tracking-widest mb-1">Serving Across Chennai</p>
                                                                <h4 className="text-lg font-bold text-[#1C3D5A] font-heading">Our Localities</h4>
                                                            </div>
                                                            <div className="flex flex-col gap-y-1 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                                                {CHENNAI_LOCALITIES.map((city, idx) => (
                                                                    <Link
                                                                        key={idx}
                                                                        href={`${s.slug}-in-${city.toLowerCase().replace(/\s+/g, '-')}`}
                                                                        onClick={() => setServicesDropdown(false)}
                                                                        className="text-[13px] text-slate-500 hover:text-[#E85A4F] py-1.5 transition-all font-medium border-b border-transparent hover:border-[#E85A4F]/10 whitespace-nowrap"
                                                                    >
                                                                        {city}
                                                                    </Link>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <a href="/#industries" className="text-[#1C3D5A]/70 hover:text-[#E85A4F] transition-all font-semibold text-[14px] hover:translate-y-[-1px]">Industries</a>
                            <Link href="/gallery" className="text-[#1C3D5A] hover:text-[#E85A4F] transition-all font-bold text-[14px] hover:translate-y-[-1px] border-b-2 border-transparent hover:border-[#E85A4F] pb-1">Gallery</Link>
                            <Link href="/blog" className="text-[#1C3D5A] hover:text-[#E85A4F] transition-all font-bold text-[14px] hover:translate-y-[-1px] border-b-2 border-transparent hover:border-[#E85A4F] pb-1">Blog</Link>
                            <a href="/#about" className="text-[#1C3D5A]/70 hover:text-[#E85A4F] transition-all font-semibold text-[14px] hover:translate-y-[-1px]">About</a>
                            <a href="/#contact" className="text-[#1C3D5A]/70 hover:text-[#E85A4F] transition-all font-semibold text-[14px] hover:translate-y-[-1px]">Contact</a>
                        </nav>

                        <div className="hidden lg:flex items-center gap-4">
                            <a href="https://wa.me/916380736439" className="text-[#1C3D5A] border-2 border-slate-200 px-5 py-2.5 rounded-2xl font-bold text-[13px] hover:border-[#E85A4F] hover:text-[#E85A4F] transition-all flex items-center gap-2 group shadow-sm bg-white/50">
                                <MessageCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                WhatsApp
                            </a>
                            <button onClick={() => setCatalogueModalOpen(true)} className="bg-[#E85A4F] text-white px-7 py-2.5 rounded-2xl font-bold text-[13px] hover:bg-[#D44E45] transition-all shadow-lg shadow-[#E85A4F]/20 hover:shadow-[#E85A4F]/30 hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2">
                                <FileText className="w-4 h-4" /> Request Catalogue
                            </button>
                        </div>

                        <button onClick={toggleMobileMenu} className="lg:hidden p-3 rounded-2xl bg-slate-50 text-[#1C3D5A] hover:bg-accent-soft hover:text-[#E85A4F] transition-all">
                            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>

                    {mobileMenuOpen && (
                        <nav className="lg:hidden mt-6 pb-6 flex flex-col gap-4 animate-in fade-in slide-in-from-top-4">
                            <div className="flex flex-col gap-2">
                                <p className="text-[10px] font-bold text-[#E85A4F] uppercase tracking-widest mb-2 pl-1">Services</p>
                                {pillarServices.map((s, i) => (
                                    <div key={i} className="flex flex-col">
                                        <Link href={s.slug} onClick={() => setMobileMenuOpen(false)} className="text-[#1C3D5A] font-bold text-base py-3 px-4 rounded-2xl hover:bg-slate-50 bg-slate-50/30 border border-slate-100/50 mb-2 transition-all">{s.name}</Link>
                                        <div className="flex flex-col gap-2 p-4 mb-4 bg-slate-50/30 rounded-2xl border border-slate-100/50">
                                            <p className="text-[10px] font-bold text-[#E85A4F] uppercase tracking-widest mb-1 opacity-70">Popular Locations</p>
                                            {CHENNAI_LOCALITIES.slice(0, 8).map((city, idx) => (
                                                <Link
                                                    key={idx}
                                                    href={`${s.slug}-in-${city.toLowerCase().replace(/\s+/g, '-')}`}
                                                    onClick={() => setMobileMenuOpen(false)}
                                                    className="text-[14px] text-slate-500 py-2 px-1 hover:text-[#E85A4F] transition-all font-medium border-b border-slate-100/50 last:border-0"
                                                >
                                                    {city}
                                                </Link>
                                            ))}
                                            <Link href={s.slug} onClick={() => setMobileMenuOpen(false)} className="text-center text-[13px] font-bold text-[#E85A4F] pt-4">Main Service Details</Link>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-slate-100">
                                <p className="text-[10px] font-bold text-[#E85A4F] uppercase tracking-widest mb-2 pl-1">Navigation</p>
                                <a href="/#industries" onClick={() => setMobileMenuOpen(false)} className="text-[#1C3D5A] font-bold text-base py-3 px-4 rounded-2xl hover:bg-slate-50 transition-all">Industries</a>
                                <Link href="/gallery" onClick={() => setMobileMenuOpen(false)} className="text-[#1C3D5A] font-bold text-base py-3 px-4 rounded-2xl hover:bg-slate-50 transition-all">Gallery</Link>
                                <a href="/#about" onClick={() => setMobileMenuOpen(false)} className="text-[#1C3D5A] font-bold text-base py-3 px-4 rounded-2xl hover:bg-slate-50 transition-all">About Us</a>
                                <a href="/#contact" onClick={() => setMobileMenuOpen(false)} className="text-[#1C3D5A] font-bold text-base py-3 px-4 rounded-2xl hover:bg-slate-50 transition-all">Contact</a>
                            </div>
                            <div className="grid grid-cols-2 gap-3 mt-4">
                                <a href="https://wa.me/916380736439" className="text-[#1C3D5A] font-bold py-3.5 rounded-2xl bg-slate-100 flex items-center justify-center gap-2 text-sm shadow-sm">
                                    <MessageCircle className="w-4 h-4" /> WhatsApp
                                </a>
                                <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="bg-[#E85A4F] text-white py-3.5 rounded-2xl font-bold text-center text-sm shadow-lg shadow-[#E85A4F]/20">Get Quote</a>
                            </div>
                        </nav>
                    )}
                </div>
            </header>
        </>
    )
}

export default Header;
