"use client";

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { 
    Phone, Mail, MapPin, Clock, ChevronDown, ChevronRight, MessageCircle, 
    Menu, X, FileText 
} from 'lucide-react'
import { pillarServices, CHENNAI_LOCALITIES } from '@/lib/data'

const Header = ({ setCatalogueModalOpen }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [servicesDropdown, setServicesDropdown] = useState(false)
    const [openMobileService, setOpenMobileService] = useState(null)
    const pathname = usePathname()

    const toggleMobileMenu = () => setMobileMenuOpen(prev => !prev)
    const toggleServicesDropdown = () => setServicesDropdown(prev => !prev)

    useEffect(() => {
        setMobileMenuOpen(false)
        setServicesDropdown(false)
        setOpenMobileService(null)
    }, [pathname])

    return (
        <>
            {/* Top Info Bar */}
            <div className="bg-ink text-white/90 text-[11px] font-medium tracking-wide uppercase border-b border-white/5">
                <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <MapPin className="w-3 h-3 text-accent" />
                            <span className="hidden md:inline">Chennai Hub | Industrial Excellence</span>
                            <span className="md:hidden">Chennai, IN</span>
                        </div>
                        <div className="hidden lg:flex items-center gap-2 border-l border-white/10 pl-4">
                            <Clock className="w-3 h-3 text-accent" />
                            <span>Mon–Sat: 09:00–19:00</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-6">
                        <a href="tel:+916380736439" className="flex items-center gap-1.5 hover:text-accent transition-colors">
                            <Phone className="w-3 h-3" />
                            <span>+91 63807-36439</span>
                        </a>
                        <a href="mailto:admin@rgtechengineeringworks.com" className="hidden sm:flex items-center gap-1.5 hover:text-accent transition-colors lowercase tracking-normal">
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
                            <Image
                                src="https://res.cloudinary.com/o1ytbfuz/image/upload/v1785177077/rg-tech/rg-tech-logo"
                                alt="RG Tech Engineering Works — CNC fiber laser cutting specialist in Chennai"
                                // Intrinsic ratio of the source file (2169x2362), scaled.
                                // A mismatched ratio here makes next/image warn and can
                                // reserve the wrong space before the image loads.
                                width={220}
                                height={240}
                                priority
                                sizes="56px"
                                className="h-14 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
                                style={{ width: "auto", height: "auto" }}
                            />
                            <div className="transition-all hidden sm:block">
                                <h1 className="text-xl font-bold text-[#0F2A44] leading-none tracking-tight font-heading">
                                    RG Tech <span className="text-accent">Engineering</span>
                                </h1>
                                <p className="text-[10px] text-fg-muted font-bold uppercase tracking-[0.2em] mt-1 opacity-70">
                                    CNC Fiber Laser Specialist
                                </p>
                            </div>
                        </Link>

                        <nav className="hidden lg:flex items-center gap-8">
                            <div className="relative group">
                                <button
                                    onClick={toggleServicesDropdown}
                                    onMouseEnter={() => !servicesDropdown && setServicesDropdown(true)}
                                    className="text-[#0F2A44] hover:text-accent transition-all font-semibold text-[14px] flex items-center gap-1.5 py-2"
                                >
                                    Services <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${servicesDropdown ? 'rotate-180' : ''}`} />
                                </button>
                                {servicesDropdown && (
                                    <div
                                        onMouseLeave={() => setServicesDropdown(false)}
                                        className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-[1200px] z-50 overflow-visible animate-in fade-in slide-in-from-top-2"
                                    >
                                        <div className="bg-white rounded-3xl shadow-2xl border border-line py-4 w-[420px] mx-auto relative">
                                            <div className="px-6 py-2 mb-2">
                                                <p className="text-[10px] font-bold text-accent uppercase tracking-widest">Our Expertise</p>
                                            </div>
                                            {pillarServices.map((s, i) => (
                                                <div key={i} className="px-2 relative group/service">
                                                    <Link
                                                        href={s.slug}
                                                        onClick={() => setServicesDropdown(false)}
                                                        className="flex justify-between items-center gap-3 px-4 py-3 rounded-2xl hover:bg-surface-2 transition-all group/link"
                                                    >
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-8 h-8 rounded-lg bg-surface-3 flex items-center justify-center group-hover/link:bg-[#F59E0B]/10 transition-colors">
                                                                <ChevronRight className="w-4 h-4 text-[#0F2A44] group-hover/link:text-accent" />
                                                            </div>
                                                            <span className="text-[15px] font-medium text-[#0F2A44]/80 group-hover/link:text-[#0F2A44] transition-colors">{s.name}</span>
                                                        </div>
                                                    </Link>

                                                    <div className="absolute left-full top-0 w-12 h-full z-10 bg-transparent" />

                                                    <div className="invisible group-hover/service:visible absolute left-full top-[-16px] pl-6 w-[300px] z-50 animate-in fade-in slide-in-from-left-2 pointer-events-auto">
                                                        <div className="bg-white rounded-3xl shadow-2xl border border-line p-6">
                                                            <div className="mb-4">
                                                                <p className="text-[10px] font-bold text-accent uppercase tracking-widest mb-1">Serving Across Chennai</p>
                                                                <h4 className="text-lg font-bold text-[#0F2A44] font-heading">Our Localities</h4>
                                                            </div>
                                                            <div className="flex flex-col gap-y-1 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                                                {CHENNAI_LOCALITIES.map((city, idx) => (
                                                                    <Link
                                                                        key={idx}
                                                                        href={`${s.slug}-in-${city.toLowerCase().replace(/\s+/g, '-')}`}
                                                                        onClick={() => setServicesDropdown(false)}
                                                                        className="text-[13px] text-fg-muted hover:text-accent py-1.5 transition-all font-medium border-b border-transparent hover:border-[#F59E0B]/10 whitespace-nowrap"
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

                            <a href="/#industries" className="text-[#0F2A44]/70 hover:text-accent transition-all font-semibold text-[14px] hover:translate-y-[-1px]">Industries</a>
                            <Link href="/gallery" className="text-[#0F2A44] hover:text-accent transition-all font-bold text-[14px] hover:translate-y-[-1px] border-b-2 border-transparent hover:border-[#F59E0B] pb-1">Gallery</Link>
                            <Link href="/blog" className="text-[#0F2A44] hover:text-accent transition-all font-bold text-[14px] hover:translate-y-[-1px] border-b-2 border-transparent hover:border-[#F59E0B] pb-1">Blog</Link>
                            <a href="/#about" className="text-[#0F2A44]/70 hover:text-accent transition-all font-semibold text-[14px] hover:translate-y-[-1px]">About</a>
                            <a href="/contact" className="text-[#0F2A44]/70 hover:text-accent transition-all font-semibold text-[14px] hover:translate-y-[-1px]">Contact</a>
                        </nav>

                        <div className="hidden lg:flex items-center gap-4">
                            <a href="https://wa.me/916380736439" className="btn btn-secondary-light btn-sm group">
                                <MessageCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                WhatsApp
                            </a>
                            <button onClick={() => setCatalogueModalOpen(true)} className="btn btn-primary btn-sm">
                                <FileText className="w-4 h-4" /> Request Catalogue
                            </button>
                        </div>

                        <button onClick={toggleMobileMenu} className="lg:hidden p-3 rounded-2xl bg-surface-2 text-[#0F2A44] hover:bg-[#F59E0B]/10 hover:text-accent transition-all">
                            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>

                    {mobileMenuOpen && (
                        /*
                         * Services collapse by default. Previously all six rendered
                         * their eight localities at once — about 60 rows the user had
                         * to scroll past to reach Gallery or Contact.
                         * Capped height keeps the sticky header usable on short screens.
                         */
                        <nav className="lg:hidden mt-5 pb-6 flex flex-col gap-4 max-h-[calc(100vh-9rem)] overflow-y-auto overscroll-contain custom-scrollbar animate-in fade-in slide-in-from-top-4">
                            <div className="flex flex-col gap-2">
                                <p className="text-[10px] font-bold text-accent uppercase tracking-widest mb-1 pl-1">Services</p>

                                {pillarServices.map((s, i) => {
                                    const open = openMobileService === i
                                    return (
                                        <div key={i} className="rounded-2xl border border-line overflow-hidden">
                                            <div className="flex items-stretch">
                                                {/* Tapping the name navigates; the chevron expands. */}
                                                <Link
                                                    href={s.slug}
                                                    onClick={() => setMobileMenuOpen(false)}
                                                    className="flex-1 text-fg font-bold text-[15px] py-4 px-4 hover:bg-surface-2 transition-colors"
                                                >
                                                    {s.name}
                                                </Link>
                                                <button
                                                    onClick={() => setOpenMobileService(open ? null : i)}
                                                    aria-expanded={open}
                                                    aria-label={`${open ? 'Hide' : 'Show'} locations for ${s.name}`}
                                                    className="px-4 border-l border-line text-fg-subtle hover:bg-surface-2 transition-colors"
                                                >
                                                    <ChevronDown
                                                        className={`w-5 h-5 transition-transform ${open ? 'rotate-180 text-accent' : ''}`}
                                                    />
                                                </button>
                                            </div>

                                            {open && (
                                                <div className="bg-surface-2 border-t border-line px-2 py-2">
                                                    {CHENNAI_LOCALITIES.slice(0, 8).map((city, idx) => (
                                                        <Link
                                                            key={idx}
                                                            href={`${s.slug}-in-${city.toLowerCase().replace(/\s+/g, '-')}`}
                                                            onClick={() => setMobileMenuOpen(false)}
                                                            className="block text-[14px] text-fg-muted py-2.5 px-3 rounded-lg hover:bg-white hover:text-accent transition-colors"
                                                        >
                                                            {city}
                                                        </Link>
                                                    ))}
                                                    <Link
                                                        href={s.slug}
                                                        onClick={() => setMobileMenuOpen(false)}
                                                        className="block text-center text-[13px] font-bold text-accent py-3"
                                                    >
                                                        View all areas →
                                                    </Link>
                                                </div>
                                            )}
                                        </div>
                                    )
                                })}
                            </div>

                            <div className="flex flex-col gap-1 pt-3 border-t border-line">
                                <p className="text-[10px] font-bold text-accent uppercase tracking-widest mb-1 pl-1">Navigation</p>
                                {[
                                    { label: 'Gallery', href: '/gallery' },
                                    { label: 'Blog', href: '/blog' },
                                    { label: 'Industries', href: '/#industries' },
                                    { label: 'About Us', href: '/#about' },
                                    { label: 'Contact', href: '/contact' },
                                ].map(({ label, href }) => (
                                    <Link
                                        key={label}
                                        href={href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="text-fg font-bold text-[15px] py-3 px-4 rounded-xl hover:bg-surface-2 transition-colors"
                                    >
                                        {label}
                                    </Link>
                                ))}
                            </div>

                            <div className="grid grid-cols-2 gap-3 pt-2">
                                <a href="https://wa.me/916380736439" className="btn btn-secondary-light">
                                    <MessageCircle className="w-4 h-4" /> WhatsApp
                                </a>
                                <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="btn btn-primary">
                                    Get Quote
                                </Link>
                            </div>
                        </nav>
                    )}
                </div>
            </header>
        </>
    )
}

export default Header;
