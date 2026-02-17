import { useState, useEffect } from 'react'
import { Routes, Route, Link, useLocation, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Phone, Mail, MapPin, Clock, ChevronDown, ChevronRight, ChevronLeft, ArrowRight, Send, Upload, Star, MessageCircle, Menu, X, Shield, Target, Zap, Wrench, Building2, Paintbrush, Users, Factory, Cpu, Wind, CheckCircle, FileText, Package, Truck, Eye, Settings, DoorOpen, Layers, PanelTop, Scissors, Ruler, Sparkles, Plus, Minus, Home, Download } from 'lucide-react'

// --- Constants ---

const CHENNAI_LOCALITIES = [
    "Adyar", "Alandur", "Alwarpet", "Ambattur", "Aminjikarai", "Anna Nagar", "Arumbakkam",
    "Ashok Nagar", "Avadi", "Chetpet", "Chrompet", "Ekkatuthangal", "Gerugambakkam",
    "Guindy", "Kattupakkam", "Koyambedu", "Mangadu", "Medavakkam", "Nanganallur",
    "Nungambakkam", "OMR", "Palavanthangal", "Pallavaram", "Perungudi", "Poonamallee",
    "Porur", "Ramapuram", "Saidapet", "Sembakkam", "Shenoy Nagar", "T Nagar",
    "Tambaram", "Thirumudivakkam", "Tidel Park", "Velachery"
]

const SERVICE_IMAGE_POOLS = {
    'laser-cutting-services': [
        'https://images.unsplash.com/photo-1764114235896-034c8772de01?q=80&w=1200',
        'https://images.unsplash.com/photo-1729944950511-e9c71556cfd4?q=80&w=1200',
        'https://images.unsplash.com/photo-1738162837619-5d0b158abcec?q=80&w=1200',
        'https://images.unsplash.com/photo-1745422899427-047466540679?q=80&w=1200'
    ],
    'sheet-metal-laser-cutting-services': [
        'https://images.unsplash.com/photo-1763926025420-adf538deaee4?q=80&w=1200',
        'https://images.unsplash.com/photo-1764115424769-ebdd2683d5a8?q=80&w=1200',
        'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=1200'
    ],
    'fabrication-services': [
        'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=1200',
        'https://images.unsplash.com/photo-1598302936664-407d6c250e2c?q=80&w=1200',
        'https://images.unsplash.com/photo-1517520287167-4bbf64a00d66?q=80&w=1200'
    ],
    'steel-gates': [
        'https://images.unsplash.com/photo-1715541275956-4845a5cf74c1?q=80&w=1200',
        'https://images.unsplash.com/photo-1510166089176-b57564a542b1?q=80&w=1200',
        'https://images.unsplash.com/photo-1511253018283-0570b5dcb989?q=80&w=1200'
    ],
    'metal-safety-doors': [
        'https://images.unsplash.com/photo-1760597307381-2bec368dcf26?q=80&w=1200',
        'https://images.unsplash.com/photo-1534349762230-e0cadf78f5db?q=80&w=1200'
    ],
    'decorative-metal-panels': [
        'https://images.unsplash.com/photo-1762813632307-1e094bcfee68?q=80&w=1200',
        'https://images.unsplash.com/photo-1766485019016-710d7e121add?q=80&w=1200',
        'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=1200'
    ]
}

// --- Components ---

const CatalogueModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({ name: '', phone: '' })
    const [submitted, setSubmitted] = useState(false)

    const catalogues = [
        { name: 'RG Tech Catalogue Vol-01', file: '/catalogues/RG-Tech-Catelog-Vol-01.pdf', size: '28 MB' },
        { name: 'RG Tech Catalogue Vol-02', file: '/catalogues/RG-Tech-Catelog-Vol-02.pdf', size: '36 MB' },
        { name: 'RG Tech Catalogue Vol-03', file: '/catalogues/RG_Tech-Vol.03.pdf', size: '4 MB' },
        { name: 'RG Tech Catalogue Vol-04', file: '/catalogues/RG-Tech-Catelog-vol-4.pdf', size: '35 MB' }
    ]

    const handleSubmit = (e) => {
        e.preventDefault()
        if (formData.name && formData.phone) {
            setSubmitted(true)
        }
    }

    const handleDownload = (catalogueFile) => {
        window.open(catalogueFile, '_blank')
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in">
            <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
                <div className="sticky top-0 bg-gradient-to-r from-primary to-accent p-6 rounded-t-3xl">
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="text-2xl font-bold text-white">Download Catalogues</h3>
                            <p className="text-white/80 text-sm mt-1">Get our complete product catalogues</p>
                        </div>
                        <button onClick={onClose} className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                            <X className="w-5 h-5 text-white" />
                        </button>
                    </div>
                </div>

                <div className="p-6">
                    {!submitted ? (
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Your Name *</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-accent focus:ring-4 focus:ring-accent/10 outline-none transition-all"
                                    placeholder="Enter your full name"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number *</label>
                                <input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-accent focus:ring-4 focus:ring-accent/10 outline-none transition-all"
                                    placeholder="Enter your phone number"
                                    pattern="[0-9]{10}"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-accent text-white py-4 rounded-xl font-bold hover:bg-accent-dark transition-all shadow-lg shadow-accent/20 flex items-center justify-center gap-2"
                            >
                                Continue to Download <ArrowRight className="w-5 h-5" />
                            </button>
                        </form>
                    ) : (
                        <div className="space-y-4">
                            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 mb-6">
                                <div className="flex items-center gap-3">
                                    <CheckCircle className="w-6 h-6 text-green-600" />
                                    <div>
                                        <p className="font-bold text-green-900">Thank you, {formData.name}!</p>
                                        <p className="text-sm text-green-700">Download any catalogue below</p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid gap-3">
                                {catalogues.map((cat, idx) => (
                                    <div key={idx} className="border-2 border-gray-200 rounded-xl p-4 hover:border-accent transition-all group">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                                                    <FileText className="w-6 h-6 text-accent" />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-900">{cat.name}</p>
                                                    <p className="text-sm text-gray-500">{cat.size}</p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => handleDownload(cat.file)}
                                                className="bg-accent text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-accent-dark transition-all flex items-center gap-2 shadow-md"
                                            >
                                                <Download className="w-4 h-4" /> Download
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

const Header = ({ toggleMobileMenu, mobileMenuOpen, toggleServicesDropdown, servicesDropdown, pillarServices, setCatalogueModalOpen }) => {
    return (
        <>
            {/* Top Info Bar - Sleeker & More Professional */}
            <div className="bg-[#2C3E50] text-white/90 text-[11px] font-medium tracking-wide uppercase border-b border-white/5">
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
                        <a href="mailto:rgtech97@gmail.com" className="hidden sm:flex items-center gap-1.5 hover:text-accent transition-colors lowercase tracking-normal">
                            <Mail className="w-3 h-3 uppercase" />
                            <span>rgtech97@gmail.com</span>
                        </a>
                    </div>
                </div>
            </div>

            {/* Main Header - Glassmorphism & High-End Aesthetic */}
            <header className="glass sticky top-0 z-50 shadow-premium transition-all duration-300">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex justify-between items-center">
                        <Link to="/" className="flex items-center gap-3.5 group">
                            <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform duration-300">
                                <span className="text-lg font-black text-white italic tracking-tighter">RG</span>
                            </div>
                            <div className="transition-all">
                                <h1 className="text-xl font-bold text-primary leading-none tracking-tight font-heading">
                                    RG Tech <span className="text-accent">Engineering</span>
                                </h1>
                                <p className="text-[10px] text-text-muted font-bold uppercase tracking-[0.2em] mt-1 opacity-70">
                                    CNC Fiber Laser Specialist
                                </p>
                            </div>
                        </Link>

                        <nav className="hidden lg:flex items-center gap-8">
                            <div className="relative group">
                                <button
                                    onClick={toggleServicesDropdown}
                                    onMouseEnter={() => !servicesDropdown && setServicesDropdown(true)}
                                    className="text-primary hover:text-accent transition-all font-semibold text-[14px] flex items-center gap-1.5 py-2"
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
                                                <p className="text-[10px] font-bold text-accent uppercase tracking-widest">Our Expertise</p>
                                            </div>
                                            {pillarServices.map((s, i) => (
                                                <div key={i} className="px-2 relative group/service">
                                                    <Link
                                                        to={s.slug}
                                                        onClick={() => setServicesDropdown(false)}
                                                        className="flex justify-between items-center gap-3 px-4 py-3 rounded-2xl hover:bg-slate-50 transition-all group/link"
                                                    >
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center group-hover/link:bg-accent-soft transition-colors">
                                                                <ChevronRight className="w-4 h-4 text-primary group-hover/link:text-accent" />
                                                            </div>
                                                            <span className="text-[15px] font-medium text-primary/80 group-hover/link:text-primary transition-colors">{s.name}</span>
                                                        </div>
                                                    </Link>

                                                    {/* Hover Bridge to keep submenu open while moving cursor horizontally */}
                                                    <div className="absolute left-full top-0 w-12 h-full z-10 bg-transparent" />

                                                    {/* Hyper-Local Submenu for all Pillar Services */}
                                                    <div className="invisible group-hover/service:visible absolute left-full top-[-16px] pl-6 w-[300px] z-50 animate-in fade-in slide-in-from-left-2 pointer-events-auto">
                                                        <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 p-6">
                                                            <div className="mb-4">
                                                                <p className="text-[10px] font-bold text-accent uppercase tracking-widest mb-1">Serving Across Chennai</p>
                                                                <h4 className="text-lg font-bold text-primary font-heading">Our Localities</h4>
                                                            </div>
                                                            <div className="flex flex-col gap-y-1 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                                                {CHENNAI_LOCALITIES.map((city, idx) => (
                                                                    <Link
                                                                        key={idx}
                                                                        to={`${s.slug}/${city.toLowerCase().replace(/\s+/g, '-')}`}
                                                                        onClick={() => toggleServicesDropdown()}
                                                                        className="text-[13px] text-text-muted hover:text-accent py-1.5 transition-all font-medium border-b border-transparent hover:border-accent/10 whitespace-nowrap"
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

                            <a href="/#industries" className="text-primary/70 hover:text-accent transition-all font-semibold text-[14px] hover:translate-y-[-1px]">Industries</a>
                            <Link to="/gallery" className="text-primary hover:text-accent transition-all font-bold text-[14px] hover:translate-y-[-1px] border-b-2 border-accent/0 hover:border-accent pb-1">Gallery</Link>
                            <a href="/#about" className="text-primary/70 hover:text-accent transition-all font-semibold text-[14px] hover:translate-y-[-1px]">About</a>
                            <a href="/#contact" className="text-primary/70 hover:text-accent transition-all font-semibold text-[14px] hover:translate-y-[-1px]">Contact</a>
                        </nav>

                        <div className="hidden lg:flex items-center gap-4">
                            <a href="https://wa.me/916380736439" className="text-primary border-2 border-slate-200 px-5 py-2.5 rounded-2xl font-bold text-[13px] hover:border-accent hover:text-accent transition-all flex items-center gap-2 group shadow-sm bg-white/50">
                                <MessageCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                WhatsApp
                            </a>
                            <button onClick={() => setCatalogueModalOpen(true)} className="bg-accent text-white px-7 py-2.5 rounded-2xl font-bold text-[13px] hover:bg-accent-dark transition-all shadow-lg shadow-accent/20 hover:shadow-accent/30 hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2">
                                <FileText className="w-4 h-4" /> Request Catalogue
                            </button>
                        </div>

                        <button onClick={toggleMobileMenu} className="lg:hidden p-3 rounded-2xl bg-slate-50 text-primary hover:bg-accent-soft hover:text-accent transition-all">
                            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>

                    {mobileMenuOpen && (
                        <nav className="lg:hidden mt-6 pb-6 flex flex-col gap-4 animate-in fade-in slide-in-from-top-4">
                            <div className="flex flex-col gap-2">
                                <p className="text-[10px] font-bold text-accent uppercase tracking-widest mb-2 pl-1">Services</p>
                                {pillarServices.map((s, i) => (
                                    <div key={i} className="flex flex-col">
                                        <Link to={s.slug} onClick={toggleMobileMenu} className="text-primary font-bold text-base py-3 px-4 rounded-2xl hover:bg-slate-50 bg-slate-50/30 border border-slate-100/50 mb-2 transition-all">{s.name}</Link>

                                        {/* Mobile Localities Toggle for current service */}
                                        <div className="flex flex-col gap-2 p-4 mb-4 bg-slate-50/30 rounded-2xl border border-slate-100/50">
                                            <p className="text-[10px] font-bold text-accent uppercase tracking-widest mb-1 opacity-70">Popular Locations</p>
                                            {CHENNAI_LOCALITIES.slice(0, 8).map((city, idx) => (
                                                <Link
                                                    key={idx}
                                                    to={`${s.slug}/${city.toLowerCase().replace(/\s+/g, '-')}`}
                                                    onClick={toggleMobileMenu}
                                                    className="text-[14px] text-text-muted py-2 px-1 hover:text-accent transition-all font-medium border-b border-slate-100/50 last:border-0"
                                                >
                                                    {city}
                                                </Link>
                                            ))}
                                            <Link to={s.slug} onClick={toggleMobileMenu} className="text-center text-[13px] font-bold text-accent pt-4">Main Service Details</Link>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-slate-100">
                                <p className="text-[10px] font-bold text-accent uppercase tracking-widest mb-2 pl-1">Navigation</p>
                                <a href="/#industries" onClick={toggleMobileMenu} className="text-primary font-bold text-base py-3 px-4 rounded-2xl hover:bg-slate-50 transition-all">Industries</a>
                                <Link to="/gallery" onClick={toggleMobileMenu} className="text-primary font-bold text-base py-3 px-4 rounded-2xl hover:bg-slate-50 transition-all">Gallery</Link>
                                <a href="/#about" onClick={toggleMobileMenu} className="text-primary font-bold text-base py-3 px-4 rounded-2xl hover:bg-slate-50 transition-all">About Us</a>
                                <a href="/#contact" onClick={toggleMobileMenu} className="text-primary font-bold text-base py-3 px-4 rounded-2xl hover:bg-slate-50 transition-all">Contact</a>
                            </div>
                            <div className="grid grid-cols-2 gap-3 mt-4">
                                <a href="https://wa.me/916380736439" className="text-primary font-bold py-3.5 rounded-2xl bg-slate-100 flex items-center justify-center gap-2 text-sm shadow-sm">
                                    <MessageCircle className="w-4 h-4" /> WhatsApp
                                </a>
                                <a href="#contact" onClick={toggleMobileMenu} className="bg-accent text-white py-3.5 rounded-2xl font-bold text-center text-sm shadow-lg shadow-accent/20">Get Quote</a>
                            </div>
                        </nav>
                    )}
                </div>
            </header>
        </>
    )
}

const Footer = ({ pillarServices }) => {
    return (
        <footer className="bg-primary text-white py-24 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="grid lg:grid-cols-12 gap-16 mb-20">
                    <div className="lg:col-span-4">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/10">
                                <span className="text-lg font-black text-white italic tracking-tighter">RG</span>
                            </div>
                            <div>
                                <h5 className="font-bold text-xl tracking-tight leading-none font-heading">RG Tech Engineering</h5>
                                <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest mt-1">CNC Fiber Laser Specialist</p>
                            </div>
                        </div>
                        <p className="text-white/60 text-[15px] leading-relaxed mb-8 max-w-sm font-medium">
                            Providing top-tier industrial laser cutting and precision fabrication services for Chennai's engineering sectors. Built on precision, speed, and technical excellence.
                        </p>
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/5 shadow-sm">
                            <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                            <span className="text-[11px] font-bold text-white/50 uppercase tracking-widest">Verified Hub: Chennai, IN</span>
                        </div>
                    </div>
                    <div className="lg:col-span-2">
                        <h6 className="font-bold mb-8 text-[12px] uppercase tracking-[0.2em] text-accent">Company</h6>
                        <ul className="space-y-4">
                            <li><a href="/#about" className="text-white/60 hover:text-white transition-colors text-[14px] font-medium">About Us</a></li>
                            <li><a href="/#industries" className="text-white/60 hover:text-white transition-colors text-[14px] font-medium">Industries</a></li>
                            <li><Link to="/gallery" className="text-white/60 hover:text-white transition-colors text-[14px] font-medium">Project Gallery</Link></li>
                            <li><a href="/#contact" className="text-white/60 hover:text-white transition-colors text-[14px] font-medium">Contact</a></li>
                            <li><a href="https://wa.me/916380736439" className="text-white/60 hover:text-white transition-colors text-[14px] font-medium">WhatsApp Support</a></li>
                        </ul>
                    </div>
                    <div className="lg:col-span-3">
                        <h6 className="font-bold mb-8 text-[12px] uppercase tracking-[0.2em] text-accent">Services</h6>
                        <ul className="space-y-4">
                            {pillarServices.map((s, i) => (
                                <li key={i}>
                                    <Link to={s.slug} className="text-white/60 hover:text-white transition-colors text-[14px] font-medium block">{s.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="lg:col-span-3">
                        <h6 className="font-bold mb-8 text-[12px] uppercase tracking-[0.2em] text-accent">Contact Desk</h6>
                        <ul className="space-y-5">
                            <li>
                                <a href="tel:+916380736439" className="group flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-accent transition-colors duration-300">
                                        <Phone className="w-4 h-4 text-white/60 group-hover:text-white" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest leading-none mb-1">Sales Hub</p>
                                        <p className="text-[14px] font-bold">+91 63807-36439</p>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                                        <MapPin className="w-4 h-4 text-white/60" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest leading-none mb-1">Works Address</p>
                                        <p className="text-[14px] font-bold leading-relaxed">Ayanambakkam, Chennai - 600095</p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <div className="mt-10 pt-8 border-t border-white/5">
                            <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest mb-1">GSTIN Registered</p>
                            <p className="text-[13px] font-bold">33HGZPS9605D1ZP</p>
                        </div>
                    </div>
                </div>
                <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-white/40 text-[12px] font-medium">
                        © 2024 RG Tech Engineering Works. All rights reserved. Precision Laser Cutting Specialist.
                    </p>
                    <div className="flex items-center gap-8">
                        <a href="#" className="text-white/40 hover:text-white transition-colors text-[12px] font-bold uppercase tracking-widest">Privacy</a>
                        <a href="#" className="text-white/40 hover:text-white transition-colors text-[12px] font-bold uppercase tracking-widest">Terms</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

const RollingLogos = () => {
    const industrialIcons = [
        { icon: Shield, name: 'ISO CERTIFIED' },
        { icon: Zap, name: 'HIGH POWER FIBER' },
        { icon: Wrench, name: 'MFG SUPPORT' },
        { icon: Target, name: 'PRECISION CNC' },
        { icon: Building2, name: 'STRUCTURAL STEEL' },
        { icon: Factory, name: 'OEM VENDOR' },
        { icon: Cpu, name: 'SMART NESTING' },
        { icon: Layers, name: 'MULTI-MATERIAL' }
    ]
    return (
        <div className="bg-white border-y border-gray-100 py-10 overflow-hidden relative">
            <div className="max-w-7xl mx-auto px-4 mb-6">
                <p className="text-center text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Our Industrial Standards & Capabilities</p>
            </div>
            <div className="flex animate-scroll whitespace-nowrap">
                {industrialIcons.map((item, i) => (
                    <div key={i} className="flex items-center gap-4 mx-10 opacity-30 hover:opacity-100 transition-opacity grayscale hover:grayscale-0">
                        <item.icon className="w-8 h-8 text-[#2C3E50]" />
                        <span className="font-bold text-[#2C3E50] text-xs tracking-widest uppercase">{item.name}</span>
                    </div>
                ))}
                {/* Duplicate for infinite loop */}
                {industrialIcons.map((item, i) => (
                    <div key={`dup-${i}`} className="flex items-center gap-4 mx-10 opacity-30 hover:opacity-100 transition-opacity grayscale hover:grayscale-0">
                        <item.icon className="w-8 h-8 text-[#2C3E50]" />
                        <span className="font-bold text-[#2C3E50] text-xs tracking-widest uppercase">{item.name}</span>
                    </div>
                ))}
            </div>
            <style>{`
                @keyframes scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-scroll {
                    display: flex;
                    width: max-content;
                    animation: scroll 40s linear infinite;
                }
            `}</style>
        </div>
    )
}

const ScrollToTop = () => {
    const { pathname } = useLocation()
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])
    return null
}

const ServiceDirectory = ({ services }) => {
    return (
        <section className="py-24 bg-slate-50 border-t border-slate-200">
            <div className="max-w-7xl mx-auto px-4">
                <div className="mb-16">
                    <p className="text-[#E85A4F] font-bold text-sm uppercase tracking-widest mb-2">Service Directory</p>
                    <h3 className="text-3xl md:text-5xl font-bold text-[#1C3D5A] font-heading">Explore Our Expertise</h3>
                    <p className="text-[#5A6C7D] mt-4 font-medium max-w-2xl text-lg">
                        Discover the full range of engineering solutions and specialized services we provide across Chennai.
                        Each capability is optimized for high-precision industrial and architectural requirements.
                    </p>
                </div>

                <div className="space-y-20">
                    {services.map((s, i) => (
                        <div key={i}>
                            <div className="flex items-center gap-6 mb-8">
                                <h4 className="text-2xl font-bold text-[#1C3D5A] font-heading">
                                    {s.name}
                                </h4>
                                <div className="flex-1 h-[1px] bg-slate-200"></div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                                {s.keywords.map((kw, idx) => (
                                    <div
                                        key={idx}
                                        className="group relative h-40 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 cursor-default border border-slate-200"
                                    >
                                        <img
                                            src={kw.img}
                                            alt={kw.text}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[0.5] group-hover:grayscale-0"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#1C3D5A]/90 via-[#1C3D5A]/20 to-transparent opacity-100 group-hover:opacity-90 transition-opacity"></div>
                                        <div className="absolute bottom-0 left-0 p-4 w-full">
                                            <p className="text-white font-bold text-xs leading-tight group-hover:text-[#E85A4F] transition-colors line-clamp-2">
                                                {kw.text}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

const ServicePage = ({ services }) => {
    const { city, serviceSlug } = useParams()
    const location = useLocation()

    // Resolve content either by prop directly or by slug from URL
    const content = services ? services.find(s => s.slug === location.pathname || s.slug === `/chennai/${serviceSlug}`) : null

    if (!content) return <Navigate to="/" />

    const cityName = city
        ? city.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
        : null

    const getRotationIndex = (name) => {
        if (!name) return 0
        let hash = 0
        for (let i = 0; i < name.length; i++) {
            hash = name.charCodeAt(i) + ((hash << 5) - hash)
        }
        return Math.abs(hash)
    }

    const cityIndex = getRotationIndex(cityName)

    const localizeText = (text) => {
        if (!cityName || !text) return text
        const localPhrases = [
            `trusted in ${cityName}`,
            `serving the ${cityName} industrial belt`,
            `${cityName}'s preferred engineering hub`,
            `available across ${cityName}`
        ]
        const phrase = localPhrases[cityIndex % localPhrases.length]

        return text
            .replace(/Chennai/g, cityName)
            .replace(/industrial hub/g, phrase)
            .replace(/industrial region/g, `${cityName} manufacturing zone`)
            .replace(/engineering hub/g, `${cityName} technical center`)
    }

    const serviceKey = content.slug.split('/').pop()
    const pool = SERVICE_IMAGE_POOLS[serviceKey] || SERVICE_IMAGE_POOLS['laser-cutting-services']

    const displayHeroImage = cityName ? pool[cityIndex % pool.length] : content.heroImage
    const displaySecondaryImage = cityName ? pool[(cityIndex + 1) % pool.length] : content.secondaryImage

    const displayTitle = cityName ? `${content.name} in ${cityName}` : content.title
    const displayMetaTitle = cityName ? `${content.name} in ${cityName} | Precision CNC Fiber Cutting` : content.metaTitle
    const displayMetaDesc = cityName ? `Best ${content.name.toLowerCase()} in ${cityName}, Chennai. Precision fiber laser cutting for industrial parts. Fast 24h delivery.` : content.metaDescription

    const displaySeoParagraph = cityName ? localizeText(content.seoParagraph) : content.seoParagraph
    const displayAltText = cityName ? `${content.name} in ${cityName} - Precision Industrial Work` : `${content.name} - RG Tech Engineering works`

    const allFaqs = content.faqs || []
    const displayFaqs = cityName
        ? [...allFaqs.slice(cityIndex % allFaqs.length), ...allFaqs.slice(0, cityIndex % allFaqs.length)].slice(0, 4)
        : allFaqs

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": (displayFaqs || []).map(f => ({
            "@type": "Question",
            "name": localizeText(f.q),
            "acceptedAnswer": { "@type": "Answer", "text": localizeText(f.a) }
        }))
    }

    const howToSchema = {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": `How to book ${content.name} in ${cityName || 'Chennai'}`,
        "step": (content.processSteps || []).map((s, i) => ({
            "@type": "HowToStep",
            "position": i + 1,
            "name": localizeText(s.title),
            "text": localizeText(s.desc)
        }))
    }

    return (
        <div className="bg-white selection:bg-accent/20">
            <Helmet>
                <title>{displayMetaTitle}</title>
                <meta name="description" content={displayMetaDesc} />
                <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
                <script type="application/ld+json">{JSON.stringify(howToSchema)}</script>
            </Helmet>

            {/* Breadcrumb - Sleeker */}
            <div className="bg-slate-50 border-b border-slate-100 py-3.5">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-wider text-text-muted/60">
                        <Link to="/" className="hover:text-accent transition-colors">Home</Link>
                        <ChevronRight className="w-3 h-3" />
                        <a href="/#services" className="hover:text-accent transition-colors">Services</a>
                        <ChevronRight className="w-3 h-3" />
                        <Link to={content.slug} className={`${cityName ? 'hover:text-accent' : 'text-primary'}`}>{content.name}</Link>
                        {cityName && (
                            <>
                                <ChevronRight className="w-3 h-3" />
                                <span className="text-primary">{cityName}</span>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Hero Section - Split Layout Premium */}
            <section className="relative overflow-hidden pt-20 pb-24 md:pt-28 md:pb-36 bg-white">
                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <div className="grid lg:grid-cols-12 gap-16 items-center">
                        <div className="lg:col-span-7">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-soft text-accent text-[11px] font-black uppercase tracking-[0.2em] mb-6">
                                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></span>
                                Premium Industrial Quality
                            </div>
                            <h1 className="text-4xl md:text-6xl font-bold text-primary leading-[1.1] font-heading tracking-tight text-balance">
                                {displayTitle}
                            </h1>
                            <p className="text-lg md:text-xl text-text-muted mt-8 leading-relaxed max-w-2xl font-medium opacity-80">
                                {localizeText(content.heroDesc)}
                            </p>
                            <div className="flex flex-wrap gap-4 mt-12">
                                <a href="#quote" className="bg-accent text-white px-8 py-4.5 rounded-2xl font-bold text-[14px] hover:bg-accent-dark transition-all shadow-xl shadow-accent/20 flex items-center gap-3 hover:translate-y-[-2px]">
                                    Get Pricing & Quote <ArrowRight className="w-4 h-4" />
                                </a>
                                <a href="#quote" className="bg-white border-2 border-slate-100 text-primary px-8 py-4.5 rounded-2xl font-bold text-[14px] hover:border-accent hover:text-accent transition-all flex items-center gap-3 shadow-sm hover:translate-y-[-2px]">
                                    <Upload className="w-4 h-4 text-accent" /> Technical Specs
                                </a>
                            </div>
                        </div>
                        <div className="lg:col-span-5 relative">
                            <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl border-[8px] border-white ring-1 ring-slate-100">
                                <img src={displayHeroImage} alt={displayAltText} className="w-full h-[540px] object-cover scale-105 hover:scale-100 transition-transform duration-700" />
                            </div>
                            <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-accent/5 rounded-full blur-3xl"></div>
                            <div className="absolute -top-12 -right-12 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
                        </div>
                    </div>

                    {/* Trust Strip - Upgrade for variety */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-24">
                        {(content.trustStrip || []).map((t, i) => (
                            <div key={i} className="bg-slate-50/50 p-6 rounded-3xl border border-slate-100 flex items-center gap-5 hover:bg-white hover:shadow-premium transition-all duration-300 group">
                                <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center flex-shrink-0 group-hover:bg-accent-soft transition-colors text-primary group-hover:text-accent">
                                    <t.icon className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="font-bold text-primary text-[15px]">{t.label}</p>
                                    <p className="text-[12px] text-text-muted mt-0.5 font-medium">{t.sub}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <RollingLogos />

            {/* Why Section - Optimized Layout */}
            <section className="bg-slate-50/50 py-24 border-y border-slate-100">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="max-w-3xl mb-16">
                        <h3 className="text-3xl md:text-4xl font-bold text-primary font-heading tracking-tight">
                            Why Industrial Leaders Choose Us
                        </h3>
                        <p className="text-text-muted mt-4 font-medium leading-relaxed">
                            Serving the {cityName || 'Chennai'} industrial hub with unmatched precision and zero-defect commitment.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8">
                        {(content.whyCards || []).map((c, i) => (
                            <div key={i} className="bg-white p-10 rounded-[2rem] shadow-premium border border-slate-50 flex items-start gap-8 hover:shadow-xl transition-all duration-300 group">
                                <div className="w-16 h-16 rounded-[1.25rem] bg-slate-50 flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-colors duration-500">
                                    <c.icon className="w-8 h-8 text-primary group-hover:text-white transition-colors" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-primary text-xl mb-3 font-heading">{localizeText(c.title)}</h4>
                                    <p className="text-[15px] text-text-muted leading-relaxed font-medium opacity-80">{localizeText(c.desc)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Capabilities - Refined Grid */}
            <section className="bg-white py-24">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <div className="relative">
                            <h3 className="text-3xl md:text-4xl font-bold text-primary font-heading tracking-tight mb-8">
                                Production Capabilities
                            </h3>
                            <p className="text-text-muted leading-relaxed font-medium mb-12 text-lg">
                                {localizeText(content.capabilityDesc)}
                            </p>
                            <div className="space-y-4">
                                {(content.capabilitiesList || []).map((c, i) => (
                                    <div key={i} className="flex flex-col gap-1 p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-accent/30 transition-colors">
                                        <span className="text-[11px] font-black text-accent uppercase tracking-widest">{c.label}</span>
                                        <span className="text-[16px] font-bold text-primary">{c.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative">
                            <div className="rounded-[3rem] overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-700">
                                <img src={displaySecondaryImage} alt={`${content.name} industrial process`} className="w-full h-[600px] object-cover" />
                            </div>
                            <div className="absolute -bottom-6 -right-6 bg-accent text-white p-8 rounded-3xl shadow-xl z-20 hidden md:block border-4 border-white">
                                <p className="text-4xl font-black font-heading leading-none">24</p>
                                <p className="text-xs font-bold uppercase tracking-widest mt-1 opacity-80">Hour Delivery</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Industries - Badge Layout */}
            <section className="bg-primary py-24 text-white overflow-hidden relative">
                <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
                    <div className="mb-14">
                        <h3 className="text-3xl md:text-4xl font-bold font-heading tracking-tight mb-4">Industries We Empower</h3>
                        <p className="text-white/60 font-medium max-w-2xl mx-auto">Specialized solutions for high-demand engineering sectors across {cityName || 'the region'}.</p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-4">
                        {(content.supportedIndustries || []).map((ind, i) => (
                            <div key={i} className="bg-white/10 hover:bg-white/20 px-8 py-5 rounded-2xl flex items-center gap-4 transition-all border border-white/5 backdrop-blur-sm group cursor-default">
                                <ind.icon className="w-6 h-6 text-accent group-hover:scale-110 transition-transform" />
                                <span className="font-bold text-[15px]">{localizeText(ind.name)}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process - Step Refinement */}
            <section className="bg-white py-24">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-20">
                        <h3 className="text-3xl md:text-4xl font-bold text-primary font-heading tracking-tight">Execution Workflow</h3>
                        <p className="text-text-muted mt-4 font-medium">Precision and discipline from blueprint to finished part.</p>
                    </div>
                    <div className={`grid md:grid-cols-2 lg:grid-cols-${(content.processSteps?.length === 4 || content.processSteps?.length === 8) ? '4' : '3'} gap-10`}>
                        {(content.processSteps || []).map((s, i) => (
                            <div key={i} className="relative group p-10 rounded-[2.5rem] bg-slate-50 hover:bg-white hover:shadow-premium transition-all duration-300">
                                <div className="absolute -top-6 left-10 w-14 h-14 bg-primary rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg border-4 border-white">
                                    {s.step}
                                </div>
                                <h4 className="font-bold text-primary text-xl mt-4 mb-3 font-heading">{localizeText(s.title)}</h4>
                                <p className="text-[15px] text-text-muted leading-relaxed font-medium opacity-80">{localizeText(s.desc)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Quotation Aid */}
            <section className="bg-slate-50 py-24">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="bg-white p-12 md:p-16 rounded-[3rem] shadow-premium border border-slate-100 flex flex-col md:flex-row gap-12 items-center">
                        <div className="md:w-3/5">
                            <h3 className="text-3xl font-bold text-primary font-heading tracking-tight mb-4">Fast-Track Pricing</h3>
                            <p className="text-text-muted font-medium mb-8">Help our engineers respond faster by including these details.</p>
                            <div className="grid gap-4">
                                {(content.checklist || []).map((item, i) => (
                                    <div key={i} className="flex items-center gap-4 group">
                                        <div className="w-6 h-6 rounded-full bg-accent text-white flex items-center justify-center flex-shrink-0 shadow-sm shadow-accent/20">
                                            <CheckCircle className="w-3.5 h-3.5" />
                                        </div>
                                        <span className="text-[15px] font-bold text-primary/80 group-hover:text-primary transition-colors">{localizeText(item)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="md:w-2/5 flex flex-col gap-4 w-full">
                            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 text-center">
                                <p className="text-[10px] font-black text-accent uppercase tracking-widest mb-2">Our Response Time</p>
                                <p className="text-4xl font-black text-primary font-heading tracking-tight">24h</p>
                                <p className="text-[11px] font-bold text-text-muted mt-2 uppercase tracking-wide">Business Days</p>
                            </div>
                            <a href="#contact" className="w-full bg-primary text-white py-5 rounded-2xl font-bold text-sm text-center hover:bg-black transition-all">Submit Inquiry</a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials - Card Polish */}
            <section className="bg-white py-24">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h3 className="text-3xl font-bold text-primary font-heading tracking-tight">Verified Engineering Success</h3>
                        <p className="text-text-muted mt-4 font-medium">Trusted by Tier 1 & Tier 2 automotive vendors in Chennai.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { name: 'Rajesh Kumar', company: 'KR Fabrications', text: `RG Tech's precision in ${content.name} is unmatched. Their support for our ${cityName || 'Chennai'} projects has been vital.` },
                            { name: 'Suresh Babu', company: 'Sai Industrial', text: `Excellent turnaround time. We received our laser cut parts in ${cityName || 'record time'} with perfect finishing.` },
                            { name: 'Priya V.', company: 'Architectural Designs', text: `Their jali designs and custom metal work in ${cityName || 'Chennai'} are top-notch. Highly recommended.` }
                        ].map((t, i) => (
                            <div key={i} className="bg-slate-50/30 p-10 rounded-[2.5rem] border border-slate-100 hover:bg-white hover:shadow-premium transition-all duration-500 group">
                                <div className="flex gap-1 mb-6">
                                    {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-4 h-4 text-accent fill-accent" />)}
                                </div>
                                <p className="text-[15px] text-primary/80 italic leading-relaxed font-medium mb-8">"{t.text}"</p>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center font-bold text-primary">
                                        {t.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-bold text-primary text-[14px]">{t.name}</p>
                                        <p className="text-[10px] text-accent font-black uppercase tracking-widest">{t.company}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ - High-end Reveal */}
            <section className="bg-slate-50/50 py-24 border-t border-slate-100">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h3 className="text-3xl font-bold text-primary font-heading tracking-tight">Industry Insights & FAQs</h3>
                        <p className="text-text-muted mt-4 font-medium">Expert answers for technical project planning.</p>
                    </div>
                    <div className="grid gap-4">
                        {(displayFaqs || []).map((faq, i) => (
                            <div key={i} className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:shadow-premium transition-all duration-300">
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="w-2 h-2 rounded-full bg-accent"></div>
                                    <p className="font-bold text-primary text-[16px] font-heading">{localizeText(faq.q)}</p>
                                </div>
                                <p className="text-[14px] text-text-muted leading-relaxed font-medium pl-4 border-l-2 border-slate-100">{localizeText(faq.a)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SEO & Localization Context */}
            {displaySeoParagraph && (
                <section className="bg-white py-24 border-t border-slate-100">
                    <div className="max-w-4xl mx-auto px-4">
                        {cityName && (
                            <div className="flex items-center gap-4 mb-8">
                                <h2 className="text-2xl font-bold text-primary font-heading tracking-tight">Industrial Excellence in {cityName}</h2>
                                <div className="flex-1 h-[1px] bg-slate-100"></div>
                            </div>
                        )}
                        <p className="text-text-muted leading-[1.8] text-[15px] font-medium opacity-80 prose prose-slate max-w-none" dangerouslySetInnerHTML={{ __html: displaySeoParagraph }} />
                    </div>
                </section>
            )}

            {/* Hyper-Local Navigation */}
            {cityName && (
                <section className="bg-slate-50 py-24">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="flex items-center justify-between mb-10">
                            <h3 className="text-xl font-bold text-primary font-heading tracking-tight">Explore Other Hubs</h3>
                            <div className="w-12 h-1 bg-accent/20 rounded-full"></div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                            {CHENNAI_LOCALITIES.filter(c => c !== cityName).slice(0, 18).map((cityLink, i) => (
                                <Link
                                    key={i}
                                    to={`${content.slug}/${cityLink.toLowerCase().replace(/\s+/g, '-')}`}
                                    className="bg-white px-5 py-3 rounded-xl text-[12px] font-bold text-text-muted hover:text-accent hover:shadow-premium hover:translate-y-[-2px] border border-white text-center transition-all shadow-sm"
                                >
                                    {cityLink}
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Service Directory Section with Keywords */}
            <ServiceDirectory services={services} />

            {/* Final CTA */}
            <section id="quote" className="bg-primary pt-24 pb-32 relative overflow-hidden text-center text-white">
                <div className="max-w-4xl mx-auto px-4 relative z-10">
                    <h2 className="text-4xl md:text-5xl font-bold font-heading tracking-tight mb-8">Ready for Industrial Precision?</h2>
                    <p className="text-white/60 text-lg font-medium mb-12 max-w-2xl mx-auto">Get your technical drawings verified and priced within 24 business hours by our engineering team.</p>
                    <div className="flex justify-center gap-6 flex-wrap">
                        <a href="https://wa.me/916380736439" className="bg-white text-primary px-10 py-5 rounded-2xl font-black text-sm flex items-center gap-3 hover:bg-slate-100 transition-all shadow-xl">
                            <MessageCircle className="w-5 h-5 text-[#25D366]" /> WhatsApp Engineering
                        </a>
                        <a href="#contact" className="bg-accent text-white px-10 py-5 rounded-2xl font-black text-sm hover:bg-accent-dark transition-all shadow-xl">
                            Submit Quote Online
                        </a>
                    </div>
                </div>
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/20 rounded-full"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/20 rounded-full"></div>
                </div>
            </section>
        </div>
    )
}

// --- Main App ---

function App() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [servicesDropdown, setServicesDropdown] = useState(false)
    const [catalogueModalOpen, setCatalogueModalOpen] = useState(false)
    const [openFaq, setOpenFaq] = useState(null)
    const [formData, setFormData] = useState({ name: '', phone: '', service: '', material: '', message: '' })
    const toggleMobileMenu = () => setMobileMenuOpen(prev => !prev)
    const toggleServicesDropdown = () => setServicesDropdown(prev => !prev)
    const handleInputChange = (e) => { const { name, value } = e.target; setFormData(prev => ({ ...prev, [name]: value })) }
    const handleSubmit = (e) => { e.preventDefault(); alert('Thank you! We will respond within 24 hours.') }
    const toggleFaq = (i) => setOpenFaq(prev => prev === i ? null : i)

    const pillarServices = [
        {
            name: 'Laser Cutting Services',
            slug: '/chennai/laser-cutting-services',
            title: 'Laser Cutting Services in Chennai',
            metaTitle: 'Laser Cutting Services in Chennai | Precision CNC Fiber Cutting',
            metaDescription: 'Best laser cutting services in Chennai using advanced CNC fiber laser technology. Precision cuts for MS, SS, Aluminum, Copper & Brass. 24hr delivery.',
            heroImage: 'https://images.unsplash.com/photo-1764114235896-034c8772de01?q=80&w=1200',
            heroDesc: 'Fast, accurate CNC & fiber laser cutting for industrial parts, brackets, panels, enclosures, and production components — built for repeatability and clean edges.',
            secondaryImage: 'https://images.unsplash.com/photo-1729944950511-e9c71556cfd4?q=80&w=800',
            trustStrip: [
                { icon: Layers, label: 'MS, SS, Al, Cu, Brass', sub: 'Multi-material cutting' },
                { icon: Factory, label: 'OEM & Job Work', sub: 'Industrial-grade output' },
                { icon: Ruler, label: '0.01mm Tolerance', sub: 'CNC precision control' },
                { icon: Clock, label: '24–48hr Turnaround', sub: 'Fast delivery on orders' }
            ],
            whyCards: [
                { icon: Target, title: 'Precision Output', desc: 'Clean kerf, minimal burr, and consistent dimensions across every cut — ready for assembly or finishing.' },
                { icon: Layers, title: 'Production Ready', desc: 'From single prototypes to large batch cutting with repeatable accuracy and batch control.' },
                { icon: Wrench, title: 'Material Flexibility', desc: 'Mild steel, stainless steel 304/316/430, aluminium, copper, and brass — as per your requirement.' },
                { icon: FileText, title: 'Job Support & DFM', desc: 'Design-for-manufacturing input to reduce material waste, cutting time, and overall cost.' }
            ],
            capabilityDesc: 'Our high-performance CNC fiber laser infrastructure delivers rapid, burr-free cutting for varied industrial demands, ensuring peak material efficiency and edge smoothness.',
            capabilitiesList: [
                { label: 'Primary Tech', value: 'High-Power CNC Fiber Laser (up to 12kW)' },
                { label: 'Cutting Tolerance', value: '± 0.05mm structural precision' },
                { label: 'Mild Steel Cap', value: 'Clean cut up to 45mm' },
                { label: 'Stainless Steel', value: 'Oxide-free Nitrogen cutting up to 40mm' },
                { label: 'Aluminum/Copper', value: 'High-reflectivity processing up to 30mm' },
                { label: 'Bed Dimensions', value: '8000mm x 2500mm (Ultra-Large Format)' }
            ],
            supportedIndustries: [
                { icon: Factory, name: 'Automotive OEM Vendors' },
                { icon: Wind, name: 'HVAC & Ducting Mfgs' },
                { icon: Cpu, name: 'Electrical Panel Fabricators' },
                { icon: Building2, name: 'Pre-Engineered Buildings (PEB)' }
            ],
            processSteps: [
                { step: '01', title: 'DXF Optimization', desc: 'Analyzing files for nesting and kerf compensation' },
                { step: '02', title: 'Material Calibration', desc: 'Setting laser parameters for specific alloy grades' },
                { step: '03', title: 'Precision Cutting', desc: 'High-speed fiber profiling with real-time sensors' },
                { step: '04', title: 'Quality Inspection', desc: 'Dimensional verification and edge burr checks' }
            ],
            checklist: [
                'Correct DXF/DWG file scaling',
                'Material thickness and grade (e.g., SS316, IS2062)',
                'Specific edge finish requirements',
                'Critical dimensional tolerances (if any)'
            ],
            faqs: [
                { q: 'What is the advantage of your large-bed laser?', a: 'Our 8m bed allows us to cut large structural frames and long plates without joins, maintaining strength and accuracy.' },
                { q: 'Can you cut reflective materials like Copper?', a: 'Yes, our modern fiber lasers are equipped with back-reflection protection specifically for Copper and Brass.' },
                { q: 'What is your typical turnaround for bulk jobs?', a: 'Most bulk laser jobs are dispatched within 48-72 hours depending on volume.' },
                { q: 'Do you offer nesting services?', a: 'Yes, we include CAD nesting to ensure you get the maximum parts out of every sheet.' },
                { q: 'What file formats do you accept?', a: 'We prefer DXF or DWG files for direct laser processing, but can also work with PDF or sketches for design support.' },
                { q: 'Do you provide material or should I supply it?', a: 'We offer both options—complete material sourcing or labor-only job work using your supplied sheets.' },
                { q: 'What is the maximum thickness you can cut?', a: 'We handle mild steel up to 45mm and stainless steel up to 40mm with high-precision fiber technology.' },
                { q: 'Is laser cutting better than plasma?', a: 'For industrial parts, laser offers much tighter tolerances, cleaner edges, and a smaller heat-affected zone than plasma.' }
            ],
            seoParagraph: 'If you\'re searching for <strong class="text-[#2C3E50]">laser cutting services in Chennai</strong> for repeat industrial parts, choosing the right process — <strong class="text-[#2C3E50]">CNC laser cutting</strong> or <strong class="text-[#2C3E50]">fiber laser cutting</strong> — directly impacts edge quality, accuracy, and overall fabrication cost. At RG Tech Engineering Works, we support engineering customers with stable cutting, nesting efficiency, and production-friendly documentation so parts fit right the first time.',
            keywords: [
                { text: 'CNC Laser Cutting', img: '/gallery/Laser Cutting Services/kw_unique_laser_cnc.png' },
                { text: 'Fiber Laser Cutting', img: '/gallery/Laser Cutting Services/kw_unique_laser_fiber.png' },
                { text: 'MS Laser Cutting', img: '/gallery/Laser Cutting Services/kw_unique_laser_ms_plate.png' },
                { text: 'SS Laser Cutting', img: '/gallery/Laser Cutting Services/kw_unique_laser_ss_mirror.png' },
                { text: 'Aluminum Laser Cutting', img: '/gallery/Laser Cutting Services/kw_aluminum_hd.png' },
                { text: 'Brass Laser Cutting', img: '/gallery/Laser Cutting Services/kw_brass_hd.png' },
                { text: 'Copper Laser Cutting', img: '/gallery/Laser Cutting Services/kw_copper_hd.png' },
                { text: 'Laser Cutting Job Work', img: '/gallery/Laser Cutting Services/kw_laser_hd.png' },
                { text: 'Precision Metal Cutting', img: '/gallery/Laser Cutting Services/kw_fiber_hd.png' },
                { text: 'CNC Cutting', img: '/gallery/Laser Cutting Services/kw_cnc_machine_hd.png' }
            ]
        },
        {
            name: 'Sheet Metal Laser Cutting',
            slug: '/chennai/sheet-metal-laser-cutting-services',
            title: 'Sheet Metal Laser Cutting in Chennai',
            metaTitle: 'Sheet Metal Laser Cutting Services Chennai | MS & SS Cutting',
            metaDescription: 'Specialized sheet metal laser cutting services in Chennai. Thick plate cutting, MS sheet cutting, and SS precision processing for industrial vendors.',
            heroImage: 'https://images.unsplash.com/photo-1763926025420-adf538deaee4?q=80&w=1200',
            heroDesc: 'High-volume sheet metal laser cutting for MS, SS, and Aluminum plates. We handle everything from thin sheets to heavy industrial plates up to 45mm.',
            secondaryImage: 'https://images.unsplash.com/photo-1764115424769-ebdd2683d5a8?q=80&w=800',
            trustStrip: [
                { icon: Layers, label: 'Thin to Heavy Plate', sub: 'Up to 45mm processed' },
                { icon: Target, label: 'High Yield Nesting', sub: 'Reduce material waste' },
                { icon: Zap, label: 'Fiber Speed', sub: 'Fast execution of batch' },
                { icon: Package, label: 'OEM Ready', sub: 'Inspection & labeling' }
            ],
            whyCards: [
                { icon: Shield, title: 'Clean Edges', desc: 'Specialized gas mixtures for oxide-free cutting on stainless steel.' },
                { icon: Ruler, title: 'Tight Tolerances', desc: 'Precision +/- 0.1mm for accurate assembly fitment.' },
                { icon: Factory, title: 'Industrial Scale', desc: 'High-power lasers for continuous production runs.' },
                { icon: CheckCircle, title: 'Material Optimization', desc: 'Advanced nesting software for maximum material utilization.' }
            ],
            capabilityDesc: 'We specialize in industrial-scale sheet metal processing with high-power fiber lasers, ensuring precision and efficiency for all your projects.',
            capabilitiesList: [
                { label: 'MS Capacity', value: '0.5mm to 45mm' },
                { label: 'SS Capacity', value: '0.5mm to 45mm' },
                { label: 'Aluminum', value: '1mm to 30mm' },
                { label: 'Copper & Brass', value: '0.5mm to 16mm' },
                { label: 'Bed Size', value: 'Up to 8000 x 2500mm' },
                { label: 'Edge Finish', value: 'Burr-free, ready for bending or welding' }
            ],
            supportedIndustries: [
                { icon: Factory, name: 'Control Panel Fabricators' },
                { icon: Building2, name: 'Pre-Engineering Buildings' },
                { icon: Wrench, name: 'Heavy Equipment Manufacturing' },
                { icon: Cpu, name: 'Electrical Enclosures' }
            ],
            processSteps: [
                { step: '01', title: 'Drawing Review', desc: 'Verify DXF/DWG for manufacturability' },
                { step: '02', title: 'Nesting', desc: 'Optimize layout for material yield' },
                { step: '03', title: 'Laser Cutting', desc: 'High-speed, precise cutting' },
                { step: '04', title: 'Quality Check', desc: 'Dimensional accuracy and edge quality' },
                { step: '05', title: 'Packaging', desc: 'Secure packing for transport' },
                { step: '06', title: 'Delivery', desc: 'On-time dispatch to your site' }
            ],
            checklist: [
                'Material grade and type (e.g., MS IS2062, SS304)',
                'Sheet thickness and dimensions',
                'Quantity required',
                'DXF/DWG files with accurate scaling',
                'Any post-cutting operations (e.g., bending, deburring)',
                'Delivery address and preferred timeline'
            ],
            faqs: [
                { q: 'What is the max thickness for MS sheet cutting?', a: 'Our high-power fiber laser can cut Mild Steel plates up to 45mm thickness.' },
                { q: 'How do you ensure sheet material yield?', a: 'We use advanced nesting software to minimize scrap and maximize parts per sheet.' },
                { q: 'Can you cut perforated patterns in thin sheets?', a: 'Yes, our lasers handle intricate patterns in thin sheets (0.5mm+) with zero warping.' },
                { q: 'Do you provide deburring services?', a: 'Yes, we provide mechanical deburring to ensure smooth, safe edges for handling.' },
                { q: 'Can you cut SS316 grade sheets?', a: 'Yes, we cut all SS grades including 304, 316, and 430 with high precision.' },
                { q: 'Is there a minimum order value?', a: 'We cater to all order sizes, from small job work to steady OEM supply.' },
                { q: 'Do you offer transport for heavy plates?', a: 'We can arrange local transport across Chennai for bulk and heavy plate orders.' },
                { q: 'What is your bed capacity for large sheets?', a: 'We have machines with bed sizes up to 8 meters (8000mm x 2500mm).' }
            ],
            seoParagraph: 'For <strong class="text-[#2C3E50]">sheet metal laser cutting in Chennai</strong>, especially for thick plates and high-volume orders, our advanced fiber laser technology ensures superior edge quality and minimal material waste. We cater to a wide range of industrial applications, providing precise <strong class="text-[#2C3E50]">MS sheet cutting</strong> and <strong class="text-[#2C3E50]">SS precision processing</strong> for various sectors.',
            keywords: [
                { text: 'Sheet Metal Fabrication', img: '/gallery/Fabrication Services/kw_unique_fab_weld.png' },
                { text: 'Sheet Metal Cutting', img: '/gallery/Sheet Metal Laser Cutting/WhatsApp Image 2026-02-11 at 5.32.32 PM (1).jpeg' },
                { text: 'Plate Cutting', img: '/gallery/Sheet Metal Laser Cutting/WhatsApp Image 2026-02-11 at 5.32.21 PM.jpeg' },
                { text: 'Thick Plate Cutting', img: '/gallery/Sheet Metal Laser Cutting/WhatsApp Image 2026-02-11 at 5.32.43 PM (2).jpeg' },
                { text: 'CRCA Sheet Cutting', img: '/gallery/Sheet Metal Laser Cutting/WhatsApp Image 2026-02-11 at 9.33.05 PM (1).jpeg' },
                { text: 'GI Sheet Cutting', img: '/gallery/Sheet Metal Laser Cutting/WhatsApp Image 2026-02-11 at 5.32.43 PM.jpeg' },
                { text: 'Industrial Sheet Processing', img: '/gallery/Sheet Metal Laser Cutting/WhatsApp Image 2026-02-11 at 5.32.33 PM (1).jpeg' },
                { text: 'CNC Fiber Laser Sheet Cutting', img: '/gallery/Laser Cutting Services/kw_unique_laser_fiber.png' }
            ]
        },
        {
            name: 'Fabrication Services',
            slug: '/chennai/fabrication-services',
            title: 'Industrial Fabrication Services in Chennai',
            metaTitle: 'Industrial Fabrication Services Chennai | Sheet Metal & SS',
            metaDescription: 'Expert industrial fabrication services in Chennai. We provide bending, welding, and assembly for sheet metal and stainless steel projects.',
            heroImage: 'https://images.unsplash.com/photo-1598302936664-407d6c250e2c?q=80&w=1200',
            heroDesc: 'Comprehensive industrial fabrication in Chennai. From precise laser cutting to specialized bending and high-strength welding, we handle the full production cycle.',
            secondaryImage: 'https://images.unsplash.com/photo-1764114441097-6a475eca993d?q=80&w=800',
            trustStrip: [
                { icon: Wrench, label: 'High-Precision Bending', sub: 'Up to 3m hydraulic' },
                { icon: Shield, label: 'TIG/MIG Welding', sub: 'High-strength joints' },
                { icon: CheckCircle, label: 'Full Assembly', sub: 'Machine enclosures' },
                { icon: Package, label: 'Finish Ready', sub: 'Powder coat options' }
            ],
            whyCards: [
                { icon: Target, title: 'One-Stop Shop', desc: 'Cut, bend, weld, and assemble under one roof to reduce lead times.' },
                { icon: Layers, title: 'Pharma & Food Grade', desc: 'Specialized stainless steel fabrication with 304/316 precision.' }
            ],
            capabilityDesc: 'End-to-end metal fabrication involving heavy-duty bending, high-strength structural welding, and precision assembly for industrial applications.',
            capabilitiesList: [
                { label: 'Bending Force', value: '300-Ton CNC Press Brake' },
                { label: 'Max Length', value: 'Bending up to 3100mm' },
                { label: 'Welding Specs', value: 'ASME Quality TIG/MIG/Spot Welding' },
                { label: 'Materials', value: 'Certified MS, SS304/316, Armor Plate' }
            ],
            supportedIndustries: [
                { icon: Factory, name: 'Heavy Machine OEM' },
                { icon: Shield, name: 'Defense & Aerospace' },
                { icon: Building2, name: 'Mining & Logistics' }
            ],
            processSteps: [
                { step: '01', title: 'Fit-up Review', desc: 'Jig and fixture design for assembly alignment' },
                { step: '02', title: 'Precision Bending', desc: 'CNC controlled angle accuracy check' },
                { step: '03', title: 'Certified Welding', desc: 'Structural joining following WPS guidelines' },
                { step: '04', title: 'Stress Relieving', desc: 'Ensuring weld integrity and geometry' }
            ],
            checklist: [
                'Weld strength / penetration requirements',
                'Critical assembly fitment tolerances',
                'Surface treatment (Painting/Galvanizing)',
                'Third-party inspection needs'
            ],
            faqs: [
                { q: 'Can you handle SS316 fabrication?', a: 'Yes, we have specialized setups and consumables for SS316 to prevent cross-contamination.' },
                { q: 'Do you provide leak-tested welding?', a: 'Yes, we perform DP (Dye Penetrant) testing for enclosures requiring air/water tightness.' },
                { q: 'What is your maximum bending thickness?', a: 'We can bend up to 12mm MS over 3 meters, and thicker plates over shorter lengths.' },
                { q: 'Do you offer post-weld grinding and polishing?', a: 'Absolutely. We provide industrial finishes ranging from rough grinding to high-gloss mirror polishing for SS.' },
                { q: 'Can you fabricate based on physical samples?', a: 'Yes, our engineering team can reverse-engineer your physical part to create production drawings.' },
                { q: 'Do you support prototype development?', a: 'We specialize in bridging the gap between design and production with rapid prototyping for new components.' },
                { q: 'What type of welding machines do you use?', a: 'We use premium inverter-based TIG, MIG, and Spot welding machines for consistent joint strength.' },
                { q: 'Can you handle large-volume structural fabrication?', a: 'Yes, our shop floor is equipped for heavy structural work including frames, skids, and large brackets.' }
            ],
            seoParagraph: 'Professional fabrication services in Chennai for industrial and architectural needs.',
            keywords: [
                { text: 'Metal Fabrication', img: '/gallery/Fabrication Services/kw_unique_fab_weld.png' },
                { text: 'Industrial Fabrication Services', img: '/gallery/Fabrication Services/kw_fab_industrial_hd.png' },
                { text: 'Welded Assemblies', img: '/gallery/Fabrication Services/kw_fab_welding_hd.png' },
                { text: 'CNC Bending', img: '/gallery/Fabrication Services/kw_unique_fab_bending.png' },
                { text: 'Folding', img: '/gallery/Fabrication Services/kw_fab_folding_hd.png' },
                { text: 'TIG/MIG Welding', img: '/gallery/Fabrication Services/kw_fab_hd.png' },
                { text: 'Structural Fabrication', img: '/gallery/Fabrication Services/architectural_fabrication_ceiling.png' },
                { text: 'Machine Enclosures', img: '/gallery/Fabrication Services/kw_fab_custom_hd.png' },
                { text: 'Custom Steel Fabrication', img: '/gallery/Fabrication Services/kw_unique_fab_weld.png' }
            ]
        },
        {
            name: 'Steel Gates',
            slug: '/chennai/steel-gates',
            title: 'Laser Cut Steel Gates in Chennai',
            metaTitle: 'Laser Cut Steel Gates Chennai | Designer SS Gates Online',
            metaDescription: 'Custom designer steel gates in Chennai. Laser cut gate designs in MS and Stainless Steel. Modern entrances for homes and factories. Durable finishes.',
            heroImage: 'https://images.unsplash.com/photo-1715541275956-4845a5cf74c1?q=80&w=1200',
            heroDesc: 'Elevate your property with custom laser-cut steel gates. Combining modern aesthetics with industrial-grade security, our gates are built to last.',
            secondaryImage: 'https://images.unsplash.com/photo-1766485019016-710d7e121add?q=80&w=800',
            trustStrip: [
                { icon: Sparkles, label: 'Designer Patterns', sub: '100+ CNC designs' },
                { icon: Shield, label: 'Heavy Duty', sub: 'Structural frames' },
                { icon: Target, label: 'Custom Fit', sub: 'On-site measurement' },
                { icon: Paintbrush, label: 'Weather Resistant', sub: 'Powder coated' }
            ],
            whyCards: [
                { icon: Target, title: 'Visual Impact', desc: 'Intricate patterns that create a stunning first impression.' },
                { icon: Shield, title: 'Lifetime Durability', desc: 'Premium materials and anti-rust treatments for longevity.' }
            ],
            capabilityDesc: 'Custom-engineered entrance solutions that blend high-end laser-cut aesthetics with heavy-duty structural frames for residential and commercial security.',
            capabilitiesList: [
                { label: 'Frame Material', value: 'Heavy Duty MS Hollow Sections' },
                { label: 'Design Infill', value: '3mm-8mm Laser-Cut Designer Plates' },
                { label: 'Rust Protection', value: 'Epoxy Primer + Polyurethane (PU) Finish' },
                { label: 'Operation', value: 'Manual, Sliding, or Fully Automated' }
            ],
            supportedIndustries: [
                { icon: Home, name: 'Luxury Residential Villas' },
                { icon: Building2, name: 'Gated Communities' },
                { icon: Factory, name: 'Corporate Industrial Units' }
            ],
            processSteps: [
                { step: '01', title: 'Site Inspection', desc: 'Physical measurement and floor level check' },
                { step: '02', title: 'Pattern Approval', desc: 'Selecting from architectural 2D/3D catalogs' },
                { step: '03', title: 'Structural Fab', desc: 'Welding the main swing/slide frame' },
                { step: '04', title: 'Pattern Inlay', desc: 'Precision fixing of the laser-cut panels' }
            ],
            checklist: [
                'Width and Height of the clear opening',
                'Swing space vs Sliding track availability',
                'Automation preference (Motorized/Manual)',
                'Color and RAL finish code'
            ],
            faqs: [
                { q: 'Do you provide the motor for sliding gates?', a: 'Yes, we can integrate high-quality Italian or local motors with remote access.' },
                { q: 'Will the gate rust in coastal Chennai?', a: 'We recommend SS304 or Sand-blasted MS with PU coating for coastal regions to prevent rust.' },
                { q: 'Can you cut my custom CAD pattern?', a: 'Absolutely. We specialize in custom architectural designs beyond our standard catalog.' },
                { q: 'How long does site installation take?', a: 'Typically 1–2 days once the gate is fabricated and transported to your site.' },
                { q: 'Do you offer bi-folding gates for narrow spaces?', a: 'Yes, we design specialized bi-folding laser-cut gates that require minimal parking space.' },
                { q: 'What maintenance is required for automated gates?', a: 'Basic cleaning and periodic lubrication of the track/hinges ensure years of smooth operation.' },
                { q: 'Can the gate be integrated with home automation?', a: 'Our motors are compatible with most smart home systems for mobile-app control.' },
                { q: 'What is the standard thickness for gate panels?', a: 'We use 3mm to 6mm plates depending on the design complexity and security needs.' }
            ],
            seoParagraph: 'Modern laser cut gate designs in Chennai for residential and commercial properties.',
            keywords: [
                { text: 'Laser Cut Gates', img: '/gallery/Steel Gates/kw_unique_gate_laser.png' },
                { text: 'Designer Steel Gates', img: '/gallery/Steel Gates/kw_unique_gate_designer.png' },
                { text: 'Modern Entrance Gates', img: '/gallery/Steel Gates/kw_unique_gate_pattern.png' },
                { text: 'Sliding Gates', img: '/gallery/Steel Gates/kw_unique_gate_sliding.png' },
                { text: 'Automated Gates', img: '/gallery/Steel Gates/kw_gate_hd.png' },
                { text: 'Front Gate Designs', img: '/gallery/Steel Gates/gen_gate_front.png' },
                { text: 'MS Gate Fabrication', img: '/gallery/Steel Gates/kw_unique_gate_minimal.png' },
                { text: 'SS Gate Designs', img: '/gallery/Steel Gates/kw_gate_modern_hd.png' },
                { text: 'Villa Gates', img: '/gallery/Steel Gates/kw_unique_gate_villa.png' }
            ]
        },
        {
            name: 'Metal Safety Doors',
            slug: '/chennai/metal-safety-doors',
            title: 'Metal Safety Doors in Chennai',
            metaTitle: 'Metal Safety Doors Chennai | Laser Cut Security Doors',
            metaDescription: 'Premium metal safety doors in Chennai. Secure your home with laser-cut designer security doors. Custom sizes in MS and SS for residential use.',
            heroImage: 'https://images.unsplash.com/photo-1760597307381-2bec368dcf26?q=80&w=1200',
            heroDesc: 'Uncompromising security meets stunning design. Our laser-cut metal safety doors provide industrial-grade protection with a premium look.',
            secondaryImage: 'https://images.unsplash.com/photo-1764115424769-ebdd2683d5a8?q=80&w=800',
            trustStrip: [
                { icon: Shield, label: 'Anti-Theft', sub: 'High-strength panels' },
                { icon: Zap, label: 'Breathable Jali', sub: 'Airflow + Security' },
                { icon: Target, label: 'Precision Fit', sub: 'Zero gap fitment' },
                { icon: Layers, label: 'Multi-Material', sub: 'MS, SS, Wood-Inlay' }
            ],
            whyCards: [
                { icon: Target, title: 'Smart Designs', desc: 'Safety features hidden within beautiful jali patterns.' },
                { icon: Shield, title: 'Rigid Frame', desc: 'Heavy-duty steel frames that resist forced entry.' }
            ],
            capabilityDesc: 'Industrial-grade home security solutions featuring reinforced steel frames and artistic laser-cut jali patterns, providing both uncompromising protection and architectural beauty.',
            capabilitiesList: [
                { label: 'Security Panel', value: '4mm-6mm MS/SS High-Strength Plate' },
                { label: 'Lock Prep', value: 'Pre-machined for Multi-Stage Digital Locks' },
                { icon: Wind, label: 'Ventilation', value: 'Optimized Jali airflow ratio' },
                { label: 'Durability', value: 'Galvanized + High-Gloss PU Coating' }
            ],
            supportedIndustries: [
                { icon: Home, name: 'Premium Apartments' },
                { icon: Shield, name: 'Corporate Security Units' },
                { icon: Building2, name: 'Commercial Offices' }
            ],
            processSteps: [
                { step: '01', title: 'Survey & Scan', desc: 'Precise electronic measurement of entrance clearance' },
                { step: '02', title: 'Pattern Customization', desc: 'Scaling jali motifs to fit door dimensions' },
                { step: '03', title: 'Core Fabrication', desc: 'Welding reinforced Z-sections for high stiffness' },
                { step: '04', title: 'Hardware Integration', desc: 'Pre-fitting hinges and security locking mechanisms' }
            ],
            checklist: [
                'Opening direction (L/R - Inside/Outside)',
                'Existing frame material (Wood/Concrete/Granite)',
                'Digital-lock vs Manual-lock cutouts',
                'Mesh type requirement (Mosquito/Stainless Mesh)'
            ],
            faqs: [
                { q: 'Is it possible to integrate a mosquito mesh?', a: 'Yes, we provide a dual-layer door system with a secondary mesh frame behind the laser-cut panel.' },
                { q: 'Can I use a smart digital lock on your safety doors?', a: 'Certainly. We can laser-cut the lock pocket specifically to the dimensions of any major digital lock brand.' },
                { q: 'Do you offer wood-finish textures?', a: 'Yes, we can powder-coat the steel with realistic wood-grain textures to match your main door.' },
                { q: 'What is the security rating of your doors?', a: 'We use reinforced steel Z-sections and 4mm+ plates, making them highly resistant to forced entry.' },
                { q: 'Are these doors suitable for apartment entrances?', a: 'Definitely. They are designed to fit perfectly within the standard 4ft x 7ft or 3.5ft x 7ft apartment frames.' },
                { q: 'Does the door come with a warranty?', a: 'We provide a 1-year manufacturing warranty on the structure and high-quality coating.' },
                { q: 'How do you handle site measurements?', a: 'Our technician visits your home to take precision laser measurements before we start fabrication.' },
                { q: 'Can I customize the jali design?', a: 'Yes, you can choose from our residential catalog or provide your own reference design.' }
            ],
            seoParagraph: 'Designer safety doors in Chennai with laser cut patterns for home security.',
            keywords: [
                { text: 'Security Doors', img: '/gallery/Metal Safety Doors/kw_unique_door_security.png' },
                { text: 'Apartment Safety Doors', img: '/gallery/Metal Safety Doors/kw_door_hd.png' },
                { text: 'Laser Cut Door Jali', img: '/gallery/Metal Safety Doors/kw_unique_door_jali_hero.png' },
                { text: 'Residential Safety Doors', img: '/gallery/Metal Safety Doors/gen_door_apt.png' },
                { text: 'Main Door Safety Grill', img: '/gallery/Metal Safety Doors/modern_safety_door_installation.jpg' },
                { text: 'Designer Security Doors', img: '/gallery/Metal Safety Doors/kw_unique_door_security.png' },
                { text: 'Metal Jali Doors', img: '/gallery/Metal Safety Doors/kw_unique_door_jali_hero.png' }
            ]
        },
        {
            name: 'Decorative Metal Panels',
            slug: '/chennai/decorative-metal-panels',
            title: 'Decorative Metal Panels in Chennai',
            metaTitle: 'Laser Cut Jali & Decorative Panels Chennai | CNC Metal Art',
            metaDescription: 'Best decorative metal panels in Chennai. Laser cut jali for interiors, pooja rooms, partitions, and balconies. CNC metal wall art and 3D panels.',
            heroImage: 'https://images.unsplash.com/photo-1762813632307-1e094bcfee68?q=80&w=1200',
            heroDesc: 'Premium CNC jali and decorative metal panels for modern architecture. Perfect for interiors, partitions, balconies, and exterior facades.',
            secondaryImage: 'https://images.unsplash.com/photo-1766485019016-710d7e121add?q=80&w=800',
            trustStrip: [
                { icon: Sparkles, label: 'Artistic CNC', sub: 'Precision detailing' },
                { icon: Layers, label: 'Al, Cu, Brass, SS', sub: 'Premium metals' },
                { icon: Target, label: 'Interior Ready', sub: 'Pooja/Partitions' },
                { icon: Wind, label: 'Balcony Panels', sub: 'UV/Rust resistant' }
            ],
            whyCards: [
                { icon: Target, title: 'Infinite Designs', desc: 'Download from our catalog or bring your own Pinterest designs.' },
                { icon: Zap, title: 'Fast Execution', desc: 'Quick turnaround for interior designers and architects.' }
            ],
            capabilityDesc: 'Sophisticated metal art and architectural screening solutions for premium interiors, facade treatments, and space partitioning.',
            capabilitiesList: [
                { label: 'Complexity', value: 'Micro-precision laser carving (±0.02mm)' },
                { label: 'Metal Range', value: 'PVD Coated SS, Mirror Brass, Copper, Aluminum' },
                { label: 'Size Formats', value: 'Continuous panels up to 3000mm length' },
                { label: 'Mounting', value: 'Hidden studs, framing, or standoff systems' }
            ],
            supportedIndustries: [
                { icon: Paintbrush, name: 'Interior Design Hubs' },
                { icon: Building2, name: 'Architectural Project Sites' },
                { icon: Sparkles, name: 'Luxury Hospitality' }
            ],
            processSteps: [
                { step: '01', title: 'Material Selection', desc: 'Choosing base alloy and PVD finish/texture' },
                { step: '02', title: 'Intricate Carving', desc: 'Ultra-precision laser processing for fine motifs' },
                { step: '03', title: 'Surface Treatment', desc: 'Polishing, brushing, or protective clear-coating' },
                { step: '04', title: 'Shadow Mapping', desc: 'Ensuring light-play through pattern verification' }
            ],
            checklist: [
                'Indoor vs Outdoor application (Material choice)',
                'Visual privacy vs Transparency ratio',
                'Installation height and mounting safety',
                'Special finishes (Antique / PVD / Rose Gold)'
            ],
            faqs: [
                { q: 'Are your brass panels actual brass or coated?', a: 'We provide both solid brass sheets and PVD-coated stainless steel which offers better durability and cost efficiency.' },
                { q: 'Can you create 3D effects with metal?', a: 'By layering different laser-cut patterns and using standoffs, we can create stunning depth and 3D shadow effects.' },
                { q: 'Can these panels be used for balcony railings?', a: 'Yes, we use thicker 5mm-8mm sheets for railings to ensure structural safety and BCA compliance.' },
                { q: 'What is PVD coating?', a: 'Physical Vapor Deposition is a high-end finish that provides vibrant gold, rose-gold, or black colors with extreme scratch resistance.' },
                { q: 'Can you cut very intricate pooja room designs?', a: 'Yes, our precision lasers can handle extremely fine motifs, ideal for religious and spiritual patterns.' },
                { q: 'Do you offer backlit panel solutions?', a: 'We can provide the metal casing and acrylic diffusers, ready for your electrician to install LED strips.' },
                { q: 'How do I clean decorative metal panels?', a: 'A simple wipe with a soft microfiber cloth is enough to maintain the sheen of our coated panels.' },
                { q: 'What is the maximum size for a single panel?', a: 'We can cut single continuous panels up to 3 meters (10 feet) in height/length.' }
            ],
            seoParagraph: 'Custom CNC jali panels and laser cut decorative screens for Chennai interiors.',
            keywords: [
                { text: 'CNC Jali', img: '/gallery/Decorative Metal Panels/kw_jali_hd.png' },
                { text: 'Metal Partitions', img: '/gallery/Decorative Metal Panels/gen_dec_tree.png' },
                { text: 'Room Divider Panels', img: '/gallery/Decorative Metal Panels/decorative_jali_pattern_01.png' },
                { text: 'Wall Art', img: '/gallery/Decorative Metal Panels/gen_dec_peacock.png' },
                { text: 'Religious Laser Cutting', img: '/gallery/Decorative Metal Panels/gen_dec_vinayagar.png' },
                { text: 'Vinayagar Designs', img: '/gallery/Decorative Metal Panels/gen_dec_vinayagar_v2.png' },
                { text: 'Buddha Designs', img: '/gallery/Decorative Metal Panels/gen_dec_buddha.png' },
                { text: 'Perumal Designs', img: '/gallery/Decorative Metal Panels/gen_dec_perumal.png' },
                { text: 'Jesus Designs', img: '/gallery/Decorative Metal Panels/gen_dec_jesus.png' },
                { text: 'Butterfly Patterns', img: '/gallery/Decorative Metal Panels/gen_dec_butterfly.png' },
                { text: 'Peacock Patterns', img: '/gallery/Decorative Metal Panels/gen_dec_peacock_ss.png' },
                { text: 'Tree of Life Jali', img: '/gallery/Decorative Metal Panels/gen_dec_tree_v2.png' },
                { text: 'Balcony Panels', img: '/gallery/Decorative Metal Panels/gen_dec_murugar.png' }
            ]
        }
    ]

    const activePillarServices = pillarServices;

    const industries = [
        { icon: Settings, name: 'Automotive Vendors', desc: 'Precision parts for vehicle components & assemblies' },
        { icon: Factory, name: 'Machine Builders / OEM', desc: 'Custom brackets, housings & structural components' },
        { icon: Cpu, name: 'Electrical Panel Mfg.', desc: 'Panel cutouts, bus bar supports & enclosures' },
        { icon: Wind, name: 'HVAC & Ducting', desc: 'Duct components, dampers & ventilation parts' },
        { icon: Building2, name: 'Construction', desc: 'Structural steel, brackets & embedded elements' },
        { icon: Paintbrush, name: 'Interiors / Architectural', desc: 'Decorative screens, railings & artistic metal works' }
    ]

    const differentiators = [
        { icon: CheckCircle, title: 'Quality Checks & Fitment Control', desc: 'Rigorous QC at every stage ensures dimensional accuracy.' },
        { icon: Wrench, title: 'Production + Prototype Support', desc: 'From single prototype to full production runs.' },
        { icon: FileText, title: 'Drawing Support (DXF/STEP)', desc: 'We help convert sketches to production-ready files.' },
        { icon: Layers, title: 'Material Flexibility', desc: 'MS, SS 304/316/430, Aluminum, Copper & Brass.' },
        { icon: Sparkles, title: 'Clean Edges & Finishing', desc: 'Burr-free cuts ready for paint, powder coat or weld.' },
        { icon: Package, title: 'Reliable Delivery & Packaging', desc: 'Secure packaging and on-time dispatch across Chennai.' }
    ]

    const processSteps = [
        { step: '01', title: 'Share Requirement', desc: 'Send your drawing (DXF/STEP) with specs', icon: FileText },
        { step: '02', title: 'Quick Quote + DFM', desc: 'Get pricing with manufacturing suggestions', icon: Send },
        { step: '03', title: 'Production', desc: 'Precision cutting and fabrication begins', icon: Zap },
        { step: '04', title: 'QC + Finishing', desc: 'Quality checks and surface treatment', icon: Eye },
        { step: '05', title: 'Dispatch', desc: 'Packed and delivered to your location', icon: Truck }
    ]

    const testimonials = [
        { name: 'Rajesh Kumar', company: 'KR Fabrications Pvt Ltd', text: 'RG Tech delivered 200+ laser-cut panels on time with perfect dimensional accuracy. Their DFM suggestions saved us 15% on material costs.', rating: 5 },
        { name: 'Priya Venkatesh', company: 'Archstone Interiors', text: 'The decorative jali panels they produced for our hotel lobby project were flawless. Excellent finishing quality and responsive communication.', rating: 5 },
        { name: 'Suresh Babu', company: 'Sai Industrial Solutions', text: 'We have been sourcing laser-cut parts from RG Tech for 3 years. Consistent quality, competitive pricing, and reliable delivery every time.', rating: 5 }
    ]

    const faqs = [
        { q: 'What files do you accept for laser cutting?', a: 'We accept DXF, STEP, DWG, PDF, and even hand-drawn sketches. Our team can help convert your designs to production-ready files.' },
        { q: 'Do you handle prototype and bulk orders?', a: 'Yes! We support single-piece prototypes through to high-volume production runs with consistent quality.' },
        { q: 'What materials do you work with?', a: 'Mild Steel (up to 45mm), Stainless Steel 304/316/430 (up to 45mm), Aluminum (up to 30mm), Copper and Brass (up to 16mm).' },
        { q: 'Do you provide fabrication after cutting?', a: 'Absolutely. We offer complete fabrication services including bending, welding, grinding, and powder coating.' },
        { q: 'Can I order custom gates/doors with laser patterns?', a: 'Yes, we specialize in custom-designed steel gates, safety doors, and decorative panels with intricate laser-cut patterns.' },
        { q: 'How do I get a quote quickly?', a: 'Share your drawing with material, thickness, and quantity details via our form or WhatsApp. We respond within 24 business hours.' }
    ]

    const GalleryPage = () => {
        const [activeFilter, setActiveFilter] = useState('All')
        const [visibleItems, setVisibleItems] = useState(12)
        const [lightboxIndex, setLightboxIndex] = useState(null)
        const isLightboxOpen = lightboxIndex !== null

        const filters = [
            'All',
            'Laser Cutting Services',
            'Sheet Metal Laser Cutting',
            'Fabrication Services',
            'Steel Gates',
            'Metal Safety Doors',
            'Decorative Metal Panels'
        ]

        const items = [
            // Laser Cutting Services (Representative Set of 60)
            { img: '/gallery/Laser Cutting Services/lc_01.jpg', title: 'Laser Cutting Project 01', material: 'MS/SS Industrial', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/lc_02.jpg', title: 'Laser Cutting Project 02', material: 'MS/SS Industrial', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/lc_03.jpg', title: 'Laser Cutting Project 03', material: 'MS/SS Industrial', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/lc_04.jpg', title: 'Laser Cutting Project 04', material: 'MS/SS Industrial', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/lc_05.jpg', title: 'Laser Cutting Project 05', material: 'MS/SS Industrial', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/lc_06.jpg', title: 'Laser Cutting Project 06', material: 'MS/SS Industrial', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/lc_07.jpg', title: 'Laser Cutting Project 07', material: 'MS/SS Industrial', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/lc_08.jpg', title: 'Laser Cutting Project 08', material: 'MS/SS Industrial', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/lc_09.jpg', title: 'Laser Cutting Project 09', material: 'MS/SS Industrial', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/lc_10.jpg', title: 'Laser Cutting Project 10', material: 'MS/SS Industrial', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/lc_11.jpg', title: 'Laser Cutting Project 11', material: 'MS/SS Industrial', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/lc_12.jpg', title: 'Laser Cutting Project 12', material: 'MS/SS Industrial', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/lc_13.jpg', title: 'Laser Cutting Project 13', material: 'MS/SS Industrial', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/lc_14.jpg', title: 'Laser Cutting Project 14', material: 'MS/SS Industrial', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/lc_15.jpg', title: 'Laser Cutting Project 15', material: 'MS/SS Industrial', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/lc_16.jpg', title: 'Laser Cutting Project 16', material: 'MS/SS Industrial', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/lc_17.jpg', title: 'Laser Cutting Project 17', material: 'MS/SS Industrial', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/lc_18.jpg', title: 'Laser Cutting Project 18', material: 'MS/SS Industrial', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/lc_19.jpg', title: 'Laser Cutting Project 19', material: 'MS/SS Industrial', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/lc_20.jpg', title: 'Laser Cutting Project 20', material: 'MS/SS Industrial', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/lc_whatsapp_01.jpg', title: 'Client Project 01', material: 'Precision Cut', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/lc_whatsapp_02.jpg', title: 'Client Project 02', material: 'Precision Cut', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/lc_whatsapp_03.jpg', title: 'Client Project 03', material: 'Precision Cut', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/lc_whatsapp_04.jpg', title: 'Client Project 04', material: 'Precision Cut', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/kw_laser_hd.png', title: 'High Density Laser Work', material: 'MS Plate', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/kw_aluminum_hd.png', title: 'Aluminum Laser Cutting', material: 'Industrial Aluminum', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/kw_brass_hd.png', title: 'Brass Laser Cutting', material: 'Premium Brass', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/kw_copper_hd.png', title: 'Copper Laser Cutting', material: 'Pure Copper', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/kw_cnc_machine_hd.png', title: 'CNC Machine Output', material: 'Precision Engineered', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/kw_fiber_hd.png', title: 'Fiber Laser Work', material: 'SS Components', filter: 'Laser Cutting Services' },

            // Sheet Metal Laser Cutting
            { img: '/gallery/Sheet Metal Laser Cutting/sm_01.jpg', title: 'Sheet Metal Project 01', material: 'Custom Bending', filter: 'Sheet Metal Laser Cutting' },
            { img: '/gallery/Sheet Metal Laser Cutting/sm_02.jpg', title: 'Sheet Metal Project 02', material: 'Custom Bending', filter: 'Sheet Metal Laser Cutting' },
            { img: '/gallery/Sheet Metal Laser Cutting/sm_03.jpg', title: 'Sheet Metal Project 03', material: 'Custom Bending', filter: 'Sheet Metal Laser Cutting' },
            { img: '/gallery/Sheet Metal Laser Cutting/sm_04.jpg', title: 'Sheet Metal Project 04', material: 'Custom Bending', filter: 'Sheet Metal Laser Cutting' },
            { img: '/gallery/Sheet Metal Laser Cutting/sm_05.jpg', title: 'Sheet Metal Project 05', material: 'Custom Bending', filter: 'Sheet Metal Laser Cutting' },
            { img: '/gallery/Sheet Metal Laser Cutting/sm_06.jpg', title: 'Sheet Metal Project 06', material: 'Custom Bending', filter: 'Sheet Metal Laser Cutting' },
            { img: '/gallery/Sheet Metal Laser Cutting/sm_07.jpg', title: 'Sheet Metal Project 07', material: 'Custom Bending', filter: 'Sheet Metal Laser Cutting' },
            { img: '/gallery/Sheet Metal Laser Cutting/sm_08.jpg', title: 'Sheet Metal Project 08', material: 'Custom Bending', filter: 'Sheet Metal Laser Cutting' },
            { img: '/gallery/Sheet Metal Laser Cutting/sm_09.jpg', title: 'Sheet Metal Project 09', material: 'Custom Bending', filter: 'Sheet Metal Laser Cutting' },
            { img: '/gallery/Sheet Metal Laser Cutting/sm_10.jpg', title: 'Sheet Metal Project 10', material: 'Custom Bending', filter: 'Sheet Metal Laser Cutting' },
            { img: '/gallery/Sheet Metal Laser Cutting/sm_11.jpg', title: 'Sheet Metal Project 11', material: 'Custom Bending', filter: 'Sheet Metal Laser Cutting' },
            { img: '/gallery/Sheet Metal Laser Cutting/sm_12.jpg', title: 'Sheet Metal Project 12', material: 'Custom Bending', filter: 'Sheet Metal Laser Cutting' },
            { img: '/gallery/Sheet Metal Laser Cutting/sm_13.jpg', title: 'Sheet Metal Project 13', material: 'Custom Bending', filter: 'Sheet Metal Laser Cutting' },
            { img: '/gallery/Sheet Metal Laser Cutting/sm_14.jpg', title: 'Sheet Metal Project 14', material: 'Custom Bending', filter: 'Sheet Metal Laser Cutting' },
            { img: '/gallery/Sheet Metal Laser Cutting/sm_15.jpg', title: 'Sheet Metal Project 15', material: 'Custom Bending', filter: 'Sheet Metal Laser Cutting' },
            { img: '/gallery/Sheet Metal Laser Cutting/sm_16.jpg', title: 'Sheet Metal Project 16', material: 'Custom Bending', filter: 'Sheet Metal Laser Cutting' },
            { img: '/gallery/Sheet Metal Laser Cutting/sm_17.jpg', title: 'Sheet Metal Project 17', material: 'Custom Bending', filter: 'Sheet Metal Laser Cutting' },
            { img: '/gallery/Sheet Metal Laser Cutting/sm_18.jpg', title: 'Sheet Metal Project 18', material: 'Custom Bending', filter: 'Sheet Metal Laser Cutting' },
            { img: '/gallery/Sheet Metal Laser Cutting/sm_19.jpg', title: 'Sheet Metal Project 19', material: 'Custom Bending', filter: 'Sheet Metal Laser Cutting' },
            { img: '/gallery/Sheet Metal Laser Cutting/sm_20.jpg', title: 'Sheet Metal Project 20', material: 'Custom Bending', filter: 'Sheet Metal Laser Cutting' },
            { img: '/gallery/Sheet Metal Laser Cutting/gen_blank.png', title: 'Sheet Metal Base', material: 'Metal Sheet', filter: 'Sheet Metal Laser Cutting' },

            // Fabrication Services
            { img: '/gallery/Fabrication Services/RG-Tech-Catelog-vol-4_page-0008.jpg', title: 'Fabrication Design 01', material: 'Industrial Steel', filter: 'Fabrication Services' },
            { img: '/gallery/Fabrication Services/RG-Tech-Catelog-vol-4_page-0009.jpg', title: 'Fabrication Design 02', material: 'Industrial Steel', filter: 'Fabrication Services' },
            { img: '/gallery/Fabrication Services/RG-Tech-Catelog-vol-4_page-0010.jpg', title: 'Fabrication Design 03', material: 'Industrial Steel', filter: 'Fabrication Services' },
            { img: '/gallery/Fabrication Services/RG-Tech-Catelog-vol-4_page-0011.jpg', title: 'Fabrication Design 04', material: 'Industrial Steel', filter: 'Fabrication Services' },
            { img: '/gallery/Fabrication Services/RG-Tech-Catelog-vol-4_page-0012.jpg', title: 'Fabrication Design 05', material: 'Industrial Steel', filter: 'Fabrication Services' },
            { img: '/gallery/Fabrication Services/RG-Tech-Catelog-vol-4_page-0013.jpg', title: 'Fabrication Design 06', material: 'Industrial Steel', filter: 'Fabrication Services' },
            { img: '/gallery/Fabrication Services/RG-Tech-Catelog-vol-4_page-0015.jpg', title: 'Fabrication Design 07', material: 'Industrial Steel', filter: 'Fabrication Services' },
            { img: '/gallery/Fabrication Services/RG-Tech-Catelog-vol-4_page-0016.jpg', title: 'Fabrication Design 08', material: 'Industrial Steel', filter: 'Fabrication Services' },
            { img: '/gallery/Fabrication Services/RG-Tech-Catelog-vol-4_page-0017.jpg', title: 'Fabrication Design 09', material: 'Industrial Steel', filter: 'Fabrication Services' },
            { img: '/gallery/Fabrication Services/RG-Tech-Catelog-vol-4_page-0018.jpg', title: 'Fabrication Design 10', material: 'Industrial Steel', filter: 'Fabrication Services' },
            { img: '/gallery/Fabrication Services/RG-Tech-Catelog-vol-4_page-0019.jpg', title: 'Fabrication Design 11', material: 'Industrial Steel', filter: 'Fabrication Services' },
            { img: '/gallery/Fabrication Services/RG-Tech-Catelog-vol-4_page-0020.jpg', title: 'Fabrication Design 12', material: 'Industrial Steel', filter: 'Fabrication Services' },

            // Steel Gates
            { img: '/gallery/Steel Gates/RG-Tech-Catelog-vol-4_page-0120.jpg', title: 'Steel Gate Design 01', material: 'Solid Steel', filter: 'Steel Gates' },
            { img: '/gallery/Steel Gates/RG-Tech-Catelog-vol-4_page-0121.jpg', title: 'Steel Gate Design 02', material: 'Solid Steel', filter: 'Steel Gates' },
            { img: '/gallery/Steel Gates/RG-Tech-Catelog-vol-4_page-0122.jpg', title: 'Steel Gate Design 03', material: 'Solid Steel', filter: 'Steel Gates' },
            { img: '/gallery/Steel Gates/RG-Tech-Catelog-vol-4_page-0123.jpg', title: 'Steel Gate Design 04', material: 'Solid Steel', filter: 'Steel Gates' },
            { img: '/gallery/Steel Gates/RG-Tech-Catelog-vol-4_page-0124.jpg', title: 'Steel Gate Design 05', material: 'Solid Steel', filter: 'Steel Gates' },
            { img: '/gallery/Steel Gates/RG-Tech-Catelog-vol-4_page-0125.jpg', title: 'Steel Gate Design 06', material: 'Solid Steel', filter: 'Steel Gates' },
            { img: '/gallery/Steel Gates/RG-Tech-Catelog-vol-4_page-0126.jpg', title: 'Steel Gate Design 07', material: 'Solid Steel', filter: 'Steel Gates' },
            { img: '/gallery/Steel Gates/RG-Tech-Catelog-vol-4_page-0127.jpg', title: 'Steel Gate Design 08', material: 'Solid Steel', filter: 'Steel Gates' },
            { img: '/gallery/Steel Gates/RG-Tech-Catelog-vol-4_page-0128.jpg', title: 'Steel Gate Design 09', material: 'Solid Steel', filter: 'Steel Gates' },
            { img: '/gallery/Steel Gates/RG-Tech-Catelog-vol-4_page-0129.jpg', title: 'Steel Gate Design 10', material: 'Solid Steel', filter: 'Steel Gates' },
            { img: '/gallery/Steel Gates/RG-Tech-Catelog-vol-4_page-0130.jpg', title: 'Steel Gate Design 11', material: 'Solid Steel', filter: 'Steel Gates' },
            { img: '/gallery/Steel Gates/RG-Tech-Catelog-vol-4_page-0131.jpg', title: 'Steel Gate Design 12', material: 'Solid Steel', filter: 'Steel Gates' },
            { img: '/gallery/Steel Gates/RG-Tech-Catelog-vol-4_page-0132.jpg', title: 'Steel Gate Design 13', material: 'Solid Steel', filter: 'Steel Gates' },
            { img: '/gallery/Steel Gates/RG-Tech-Catelog-vol-4_page-0133.jpg', title: 'Steel Gate Design 14', material: 'Solid Steel', filter: 'Steel Gates' },
            { img: '/gallery/Steel Gates/RG-Tech-Catelog-vol-4_page-0134.jpg', title: 'Steel Gate Design 15', material: 'Solid Steel', filter: 'Steel Gates' },
            { img: '/gallery/Steel Gates/RG-Tech-Catelog-vol-4_page-0135.jpg', title: 'Steel Gate Design 16', material: 'Solid Steel', filter: 'Steel Gates' },
            { img: '/gallery/Steel Gates/RG-Tech-Catelog-vol-4_page-0136.jpg', title: 'Steel Gate Design 17', material: 'Solid Steel', filter: 'Steel Gates' },
            { img: '/gallery/Steel Gates/RG-Tech-Catelog-vol-4_page-0137.jpg', title: 'Steel Gate Design 18', material: 'Solid Steel', filter: 'Steel Gates' },
            { img: '/gallery/Steel Gates/RG-Tech-Catelog-vol-4_page-0138.jpg', title: 'Steel Gate Design 19', material: 'Solid Steel', filter: 'Steel Gates' },
            { img: '/gallery/Steel Gates/RG-Tech-Catelog-vol-4_page-0139.jpg', title: 'Steel Gate Design 20', material: 'Solid Steel', filter: 'Steel Gates' },
            { img: '/gallery/Steel Gates/RG-Tech-Catelog-vol-4_page-0140.jpg', title: 'Steel Gate Design 21', material: 'Solid Steel', filter: 'Steel Gates' },
            { img: '/gallery/Steel Gates/RG-Tech-Catelog-vol-4_page-0141.jpg', title: 'Steel Gate Design 22', material: 'Solid Steel', filter: 'Steel Gates' },
            { img: '/gallery/Steel Gates/RG-Tech-Catelog-vol-4_page-0142.jpg', title: 'Steel Gate Design 23', material: 'Solid Steel', filter: 'Steel Gates' },
            { img: '/gallery/Steel Gates/RG-Tech-Catelog-vol-4_page-0143.jpg', title: 'Steel Gate Design 24', material: 'Solid Steel', filter: 'Steel Gates' },
            { img: '/gallery/Steel Gates/RG-Tech-Catelog-vol-4_page-0144.jpg', title: 'Steel Gate Design 25', material: 'Solid Steel', filter: 'Steel Gates' },
            { img: '/gallery/Steel Gates/RG-Tech-Catelog-vol-4_page-0145.jpg', title: 'Steel Gate Design 26', material: 'Solid Steel', filter: 'Steel Gates' },
            { img: '/gallery/Steel Gates/RG-Tech-Catelog-vol-4_page-0146.jpg', title: 'Steel Gate Design 27', material: 'Solid Steel', filter: 'Steel Gates' },
            { img: '/gallery/Steel Gates/RG-Tech-Catelog-vol-4_page-0147.jpg', title: 'Steel Gate Design 28', material: 'Solid Steel', filter: 'Steel Gates' },
            { img: '/gallery/Steel Gates/RG-Tech-Catelog-vol-4_page-0148.jpg', title: 'Steel Gate Design 29', material: 'Solid Steel', filter: 'Steel Gates' },
            { img: '/gallery/Steel Gates/RG-Tech-Catelog-vol-4_page-0149.jpg', title: 'Steel Gate Design 30', material: 'Solid Steel', filter: 'Steel Gates' },
            { img: '/gallery/Steel Gates/RG-Tech-Catelog-vol-4_page-0150.jpg', title: 'Steel Gate Design 31', material: 'Solid Steel', filter: 'Steel Gates' },
            { img: '/gallery/Steel Gates/RG-Tech-Catelog-vol-4_page-0151.jpg', title: 'Steel Gate Design 32', material: 'Solid Steel', filter: 'Steel Gates' },
            { img: '/gallery/Steel Gates/RG-Tech-Catelog-vol-4_page-0152.jpg', title: 'Steel Gate Design 33', material: 'Solid Steel', filter: 'Steel Gates' },
            { img: '/gallery/Steel Gates/RG-Tech-Catelog-vol-4_page-0153.jpg', title: 'Steel Gate Design 34', material: 'Solid Steel', filter: 'Steel Gates' },
            { img: '/gallery/Steel Gates/RG-Tech-Catelog-vol-4_page-0154.jpg', title: 'Steel Gate Design 35', material: 'Solid Steel', filter: 'Steel Gates' },

            // Metal Safety Doors
            { img: '/gallery/Metal Safety Doors/1-13.jpg', title: 'Safety Door Design 01', material: 'Reinforced Metal', filter: 'Metal Safety Doors' },
            { img: '/gallery/Metal Safety Doors/7x3-5-feet-18-3-kilograms-paint-coated-mild-steel-safety-doors-466.jpg', title: 'Safety Door Design 02', material: 'Reinforced Metal', filter: 'Metal Safety Doors' },
            { img: '/gallery/Metal Safety Doors/Stainless-Steel-Thickened-Smart-Lock-Armored-Main-Gate-Meta-Home-Entrance-Front-Entry-Doors-Exterior-Door-Safety-Steel-Door.png_300x300.avif', title: 'Safety Door Design 03', material: 'Reinforced Metal', filter: 'Metal Safety Doors' },
            { img: '/gallery/Metal Safety Doors/download (1).jpg', title: 'Safety Door Design 04', material: 'Reinforced Metal', filter: 'Metal Safety Doors' },
            { img: '/gallery/Metal Safety Doors/download (2).jpg', title: 'Safety Door Design 05', material: 'Reinforced Metal', filter: 'Metal Safety Doors' },
            { img: '/gallery/Metal Safety Doors/download.jpg', title: 'Safety Door Design 06', material: 'Reinforced Metal', filter: 'Metal Safety Doors' },
            { img: '/gallery/Metal Safety Doors/flowert-safety-door.webp', title: 'Flowert Safety Door', material: 'Reinforced Metal', filter: 'Metal Safety Doors' },
            { img: '/gallery/Metal Safety Doors/image5.jpg', title: 'Safety Door Design 08', material: 'Reinforced Metal', filter: 'Metal Safety Doors' },
            { img: '/gallery/Metal Safety Doors/images.jpg', title: 'Safety Door Design 09', material: 'Reinforced Metal', filter: 'Metal Safety Doors' },
            { img: '/gallery/Metal Safety Doors/metal-ms-safety-door-for-resi-20240524162939656.jpg', title: 'MS Safety Door', material: 'Reinforced Metal', filter: 'Metal Safety Doors' },
            { img: '/gallery/Metal Safety Doors/mild-steel-hinged-safety-door.jpg', title: 'Hinged Safety Door', material: 'Reinforced Metal', filter: 'Metal Safety Doors' },
            { img: '/gallery/Metal Safety Doors/mild-steel-safety-door-500x500.webp', title: 'Mild Steel Door', material: 'Reinforced Metal', filter: 'Metal Safety Doors' },
            { img: '/gallery/Metal Safety Doors/ms-safety-door-500x500.webp', title: 'MS Safety Solution', material: 'Reinforced Metal', filter: 'Metal Safety Doors' },
            { img: '/gallery/Metal Safety Doors/premium-quality-are-made-of-heavy-duty-stainless-steel-safety-doors--144.jpg', title: 'Premium Safety Door', material: 'Reinforced Metal', filter: 'Metal Safety Doors' },
            { img: '/gallery/Metal Safety Doors/product-jpeg-500x500.webp', title: 'Safety Door Design 15', material: 'Reinforced Metal', filter: 'Metal Safety Doors' },
            { img: '/gallery/Metal Safety Doors/product-jpeg.jpg', title: 'Safety Door Design 16', material: 'Reinforced Metal', filter: 'Metal Safety Doors' },
            { img: '/gallery/Metal Safety Doors/safety-door-250x250.webp', title: 'Safety Door Design 17', material: 'Reinforced Metal', filter: 'Metal Safety Doors' },
            { img: '/gallery/Metal Safety Doors/safety-door-jali.jpg', title: 'Jali Safety Door', material: 'Reinforced Metal', filter: 'Metal Safety Doors' },
            { img: '/gallery/Metal Safety Doors/stainless-steel-safety-door-2219578321-0ix6pmz1.avif', title: 'Stainless Steel Door', material: 'Reinforced Metal', filter: 'Metal Safety Doors' },
            { img: '/gallery/Metal Safety Doors/stainless-steel-silver-safety-door.jpeg', title: 'Silver Safety Door', material: 'Reinforced Metal', filter: 'Metal Safety Doors' },
            { img: '/gallery/Metal Safety Doors/steel-safety-door.jpg', title: 'Steel Safety Door', material: 'Reinforced Metal', filter: 'Metal Safety Doors' },

            // Decorative Metal Panels
            { img: '/gallery/Decorative Metal Panels/RG-Tech-Catelog-Vol-02_page-0004.jpg', title: 'Decorative Panel 01', material: 'Decorative Laser Cut', filter: 'Decorative Metal Panels' },
            { img: '/gallery/Decorative Metal Panels/RG-Tech-Catelog-Vol-02_page-0005.jpg', title: 'Decorative Panel 02', material: 'Decorative Laser Cut', filter: 'Decorative Metal Panels' },
            { img: '/gallery/Decorative Metal Panels/RG-Tech-Catelog-Vol-02_page-0006.jpg', title: 'Decorative Panel 03', material: 'Decorative Laser Cut', filter: 'Decorative Metal Panels' },
            { img: '/gallery/Decorative Metal Panels/RG-Tech-Catelog-Vol-02_page-0011.jpg', title: 'Decorative Panel 04', material: 'Decorative Laser Cut', filter: 'Decorative Metal Panels' },
            { img: '/gallery/Decorative Metal Panels/RG-Tech-Catelog-Vol-02_page-0012.jpg', title: 'Decorative Panel 05', material: 'Decorative Laser Cut', filter: 'Decorative Metal Panels' },
            { img: '/gallery/Decorative Metal Panels/RG-Tech-Catelog-Vol-02_page-0013.jpg', title: 'Decorative Panel 06', material: 'Decorative Laser Cut', filter: 'Decorative Metal Panels' },
            { img: '/gallery/Decorative Metal Panels/RG-Tech-Catelog-Vol-02_page-0018.jpg', title: 'Decorative Panel 07', material: 'Decorative Laser Cut', filter: 'Decorative Metal Panels' },
            { img: '/gallery/Decorative Metal Panels/RG-Tech-Catelog-Vol-02_page-0019.jpg', title: 'Decorative Panel 08', material: 'Decorative Laser Cut', filter: 'Decorative Metal Panels' },
            { img: '/gallery/Decorative Metal Panels/RG-Tech-Catelog-Vol-02_page-0020.jpg', title: 'Decorative Panel 09', material: 'Decorative Laser Cut', filter: 'Decorative Metal Panels' },
            { img: '/gallery/Decorative Metal Panels/RG-Tech-Catelog-Vol-02_page-0025.jpg', title: 'Decorative Panel 10', material: 'Decorative Laser Cut', filter: 'Decorative Metal Panels' },
            { img: '/gallery/Decorative Metal Panels/RG-Tech-Catelog-Vol-02_page-0026.jpg', title: 'Decorative Panel 11', material: 'Decorative Laser Cut', filter: 'Decorative Metal Panels' },
            { img: '/gallery/Decorative Metal Panels/RG-Tech-Catelog-Vol-02_page-0027.jpg', title: 'Decorative Panel 12', material: 'Decorative Laser Cut', filter: 'Decorative Metal Panels' },
            { img: '/gallery/Decorative Metal Panels/RG-Tech-Catelog-Vol-02_page-0032.jpg', title: 'Decorative Panel 13', material: 'Decorative Laser Cut', filter: 'Decorative Metal Panels' },
            { img: '/gallery/Decorative Metal Panels/RG-Tech-Catelog-Vol-02_page-0033.jpg', title: 'Decorative Panel 14', material: 'Decorative Laser Cut', filter: 'Decorative Metal Panels' },
            { img: '/gallery/Decorative Metal Panels/RG-Tech-Catelog-Vol-02_page-0034.jpg', title: 'Decorative Panel 15', material: 'Decorative Laser Cut', filter: 'Decorative Metal Panels' },
            { img: '/gallery/Decorative Metal Panels/RG-Tech-Catelog-Vol-02_page-0039.jpg', title: 'Decorative Panel 16', material: 'Decorative Laser Cut', filter: 'Decorative Metal Panels' },
            { img: '/gallery/Decorative Metal Panels/RG-Tech-Catelog-Vol-02_page-0040.jpg', title: 'Decorative Panel 17', material: 'Decorative Laser Cut', filter: 'Decorative Metal Panels' },
            { img: '/gallery/Decorative Metal Panels/RG-Tech-Catelog-Vol-02_page-0041.jpg', title: 'Decorative Panel 18', material: 'Decorative Laser Cut', filter: 'Decorative Metal Panels' },
            { img: '/gallery/Decorative Metal Panels/RG-Tech-Catelog-Vol-02_page-0046.jpg', title: 'Decorative Panel 19', material: 'Decorative Laser Cut', filter: 'Decorative Metal Panels' },
            { img: '/gallery/Decorative Metal Panels/RG-Tech-Catelog-Vol-02_page-0047.jpg', title: 'Decorative Panel 20', material: 'Decorative Laser Cut', filter: 'Decorative Metal Panels' },
            { img: '/gallery/Decorative Metal Panels/RG-Tech-Catelog-Vol-02_page-0048.jpg', title: 'Decorative Panel 21', material: 'Decorative Laser Cut', filter: 'Decorative Metal Panels' },
            { img: '/gallery/Decorative Metal Panels/RG-Tech-Catelog-Vol-02_page-0053.jpg', title: 'Decorative Panel 22', material: 'Decorative Laser Cut', filter: 'Decorative Metal Panels' },
            { img: '/gallery/Decorative Metal Panels/RG-Tech-Catelog-Vol-02_page-0054.jpg', title: 'Decorative Panel 23', material: 'Decorative Laser Cut', filter: 'Decorative Metal Panels' },
            { img: '/gallery/Decorative Metal Panels/RG-Tech-Catelog-Vol-02_page-0055.jpg', title: 'Decorative Panel 24', material: 'Decorative Laser Cut', filter: 'Decorative Metal Panels' },
            { img: '/gallery/Decorative Metal Panels/RG-Tech-Catelog-Vol-02_page-0060.jpg', title: 'Decorative Panel 25', material: 'Decorative Laser Cut', filter: 'Decorative Metal Panels' },
            { img: '/gallery/Decorative Metal Panels/RG-Tech-Catelog-Vol-02_page-0061.jpg', title: 'Decorative Panel 26', material: 'Decorative Laser Cut', filter: 'Decorative Metal Panels' },
            { img: '/gallery/Decorative Metal Panels/RG-Tech-Catelog-Vol-02_page-0062.jpg', title: 'Decorative Panel 27', material: 'Decorative Laser Cut', filter: 'Decorative Metal Panels' }
        ]

        const filtered = activeFilter === 'All' ? items : items.filter(i => i.filter === activeFilter)
        const displayed = filtered.slice(0, visibleItems)

        const handleFilterClick = (f) => { setActiveFilter(f); setVisibleItems(12); setLightboxIndex(null); }
        const openLightbox = (index) => setLightboxIndex(index)
        const closeLightbox = () => setLightboxIndex(null)
        const nextImage = (e) => { e.stopPropagation(); setLightboxIndex(prev => (prev + 1) % displayed.length) }
        const prevImage = (e) => { e.stopPropagation(); setLightboxIndex(prev => (prev - 1 + displayed.length) % displayed.length) }

        return (
            <div className="bg-white min-h-screen">
                <Helmet>
                    <title>Design Gallery | RG Tech Engineering</title>
                    <meta name="description" content="Explore our library of laser cutting and fabrication designs. From intricate jali patterns to heavy industrial components." />
                </Helmet>

                {/* Gallery Hero */}
                <section className="bg-primary text-white py-24 relative overflow-hidden">
                    <div className="absolute inset-0 bg-accent/5 skew-y-3 translate-y-20 pointer-events-none"></div>
                    <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
                        <p className="text-accent font-black text-xs uppercase tracking-[0.4em] mb-4">Visual Portfolio</p>
                        <h2 className="text-4xl md:text-6xl font-black font-heading mb-6 italic tracking-tight">Design <span className="text-accent">Library</span></h2>
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
                                    className={`px-6 py-3 rounded-2xl text-sm font-bold transition-all border shadow-sm ${activeFilter === f ? 'bg-primary text-white border-primary shadow-xl shadow-primary/20 scale-105' : 'bg-white text-primary/60 border-slate-100 hover:border-accent hover:text-accent'}`}
                                >
                                    {f}
                                </button>
                            ))}
                        </div>

                        {items.length > 0 ? (
                            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
                                {displayed.map((item, i) => (
                                    <div
                                        key={i}
                                        onClick={() => openLightbox(i)}
                                        className="break-inside-avoid group relative rounded-3xl overflow-hidden bg-white border border-slate-100 shadow-sm transition-all hover:shadow-2xl cursor-zoom-in hover:-translate-y-1"
                                    >
                                        <img src={item.img} alt={item.title} className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 p-8 flex flex-col justify-end">
                                            <p className="text-accent text-[10px] font-black uppercase tracking-[0.2em] mb-2">{item.filter}</p>
                                            <h4 className="text-white font-bold text-lg font-heading leading-tight mb-3">{item.title}</h4>
                                            <div className="flex justify-between items-center">
                                                <p className="text-white/60 text-xs font-medium italic">{item.material}</p>
                                                <div className="w-10 h-10 rounded-xl bg-accent text-white flex items-center justify-center scale-75 group-hover:scale-100 transition-transform">
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
                                    <Plus className="w-10 h-10 text-accent animate-pulse" />
                                </div>
                                <h3 className="text-3xl font-black font-heading text-primary mb-6 italic">Incoming <span className="text-accent">Portfolio</span></h3>
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
                            <div className="fixed inset-0 z-[100] bg-primary/95 backdrop-blur-2xl flex items-center justify-center p-4 animate-in fade-in duration-300">
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
                                            <div className="inline-block px-4 py-1.5 bg-accent/20 border border-accent/20 rounded-full">
                                                <p className="text-accent font-black text-[10px] uppercase tracking-widest">{displayed[lightboxIndex].filter}</p>
                                            </div>
                                            <h3 className="text-3xl md:text-5xl font-black font-heading leading-tight tracking-tight italic">{displayed[lightboxIndex].title}</h3>
                                        </div>

                                        <div className="p-8 bg-white/5 rounded-[2rem] border border-white/10 space-y-6 backdrop-blur-md">
                                            <div className="flex justify-between items-center text-sm">
                                                <span className="text-white/40 font-bold uppercase tracking-widest text-[10px]">Material Grade</span>
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
                                    className="group relative bg-primary text-white px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-primary/30 hover:shadow-accent/40 hover:bg-accent transition-all overflow-hidden"
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

    const HomePage = () => (
        <div className="bg-white">
            <Helmet>
                <title>RG Tech Engineering | Your Trusted Partner for CNC Laser Cutting & Fabrication</title>
                <meta name="description" content="RG Tech Engineering Works - High-precision CNC Fiber Laser Cutting Services in Chennai. MS, SS, Aluminum, Copper & Brass cutting up to 45mm." />
            </Helmet>

            {/* Hero - Reverted to Dark Navy Industrial */}
            <section id="home" className="bg-[#1C3D5A] text-white py-20 min-h-[600px] flex items-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 skew-x-12 translate-x-1/2 pointer-events-none"></div>
                <div className="max-w-7xl mx-auto px-4 relative z-10 w-full">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-4xl md:text-6xl font-bold font-heading leading-tight mb-6">
                                Your Trusted Partner for <br />
                                <span className="text-[#E85A4F]">CNC Laser Cutting & Fabrication</span>
                            </h2>
                            <p className="text-lg text-white/70 mb-10 max-w-xl">
                                High-Precision Metal Cutting up to 45mm – MS, SS, Aluminum, Copper & Brass
                            </p>

                            <div className="grid grid-cols-2 gap-y-4 gap-x-8 mb-12">
                                <div className="flex items-center gap-3">
                                    <div className="w-5 h-5 rounded-full border border-white/30 flex items-center justify-center">
                                        <CheckCircle className="w-3.5 h-3.5 text-[#E85A4F]" />
                                    </div>
                                    <span className="text-sm font-medium">Precision up to 0.01mm</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-5 h-5 rounded-full border border-white/30 flex items-center justify-center">
                                        <CheckCircle className="w-3.5 h-3.5 text-[#E85A4F]" />
                                    </div>
                                    <span className="text-sm font-medium">Large bed: 8000x2500mm</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-5 h-5 rounded-full border border-white/30 flex items-center justify-center">
                                        <CheckCircle className="w-3.5 h-3.5 text-[#E85A4F]" />
                                    </div>
                                    <span className="text-sm font-medium">All metal types</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-5 h-5 rounded-full border border-white/30 flex items-center justify-center">
                                        <CheckCircle className="w-3.5 h-3.5 text-[#E85A4F]" />
                                    </div>
                                    <span className="text-sm font-medium">Quick turnaround</span>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-5">
                                <a href="#contact" className="bg-[#E85A4F] text-white px-8 py-4 rounded-xl font-bold flex items-center gap-3 hover:bg-[#D44E45] transition-colors shadow-lg shadow-black/20">
                                    Get a Quote <ArrowRight className="w-4 h-4" />
                                </a>
                                <a href="tel:+916380736439" className="bg-[#5A6C7D]/40 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold flex items-center gap-3 border border-white/10 hover:bg-[#5A6C7D]/60 transition-colors">
                                    <Phone className="w-4 h-4" /> Call Now
                                </a>
                            </div>

                            <div className="flex gap-6 mt-12 pt-8 border-t border-white/10">
                                <div className="flex items-center gap-2 text-white/50 text-xs font-bold uppercase tracking-widest">
                                    <Shield className="w-4 h-4" /> ISO Certified
                                </div>
                                <div className="flex items-center gap-2 text-white/50 text-xs font-bold uppercase tracking-widest">
                                    <Clock className="w-4 h-4" /> 15+ Years
                                </div>
                                <div className="flex items-center gap-2 text-white/50 text-xs font-bold uppercase tracking-widest">
                                    <Star className="w-4 h-4" /> 1000+ Projects
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="rounded-3xl overflow-hidden shadow-2xl relative">
                                <img src="https://images.unsplash.com/photo-1764114235896-034c8772de01?q=80&w=1200" alt="CNC Laser Machine" className="w-full aspect-[4/3] object-cover" />
                                <div className="absolute bottom-6 left-6 bg-white p-6 rounded-2xl shadow-xl max-w-[220px]">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Bed Sizes</p>
                                    <p className="text-lg font-black text-[#1C3D5A]">8000 x 2500mm</p>
                                    <p className="text-sm font-bold text-[#E85A4F]">3000 x 1500mm</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Snippet */}
            <section id="services" className="py-24 bg-[#F8F6F3]">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                        <div>
                            <p className="text-[#E85A4F] font-bold text-sm uppercase tracking-widest mb-2">Our Capabilities</p>
                            <h3 className="text-3xl md:text-4xl font-bold text-[#1C3D5A] font-heading">Industrial Services</h3>
                        </div>
                        <p className="text-[#5A6C7D] font-medium max-w-md">Precision engineering services delivered from our state-of-the-art facility in Chennai.</p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {pillarServices.map((s, i) => (
                            <Link key={i} to={s.slug} className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-gray-100">
                                <div className="w-14 h-14 rounded-xl bg-[#E85A4F]/10 flex items-center justify-center mb-8 group-hover:bg-[#E85A4F] transition-colors">
                                    <Zap className="w-6 h-6 text-[#E85A4F] group-hover:text-white" />
                                </div>
                                <h4 className="text-xl font-bold text-[#1C3D5A] mb-4 font-heading">{s.name}</h4>
                                <p className="text-[15px] text-[#5A6C7D] leading-relaxed mb-8 flex-grow">
                                    {s.metaDescription.split('. ')[0]}. Expert cutting and processing for all industrial grades.
                                </p>
                                <div className="pt-6 border-t border-gray-50 flex items-center justify-between text-[#E85A4F] font-bold text-[13px] group-hover:translate-x-1 transition-transform">
                                    Explore Service <ArrowRight className="w-4 h-4" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Industries - Grid Layout */}
            <section id="industries" className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <p className="text-[#E85A4F] font-bold text-sm uppercase tracking-widest mb-2">Sectors Served</p>
                        <h3 className="text-3xl md:text-5xl font-bold text-[#1C3D5A] font-heading">Industries We Empower</h3>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                        {industries.map((ind, i) => (
                            <div key={i} className="bg-[#F8F6F3] p-6 rounded-2xl text-center hover:bg-[#E85A4F]/10 transition-colors group">
                                <ind.icon className="w-8 h-8 text-[#1C3D5A] mx-auto mb-4 opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                                <p className="text-xs font-bold text-[#1C3D5A] uppercase tracking-wider">{ind.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why RG Tech - Dark Section */}
            <section id="about" className="py-24 bg-[#1C3D5A] text-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid md:grid-cols-3 gap-12">
                        <div className="md:col-span-1">
                            <p className="text-[#E85A4F] font-bold text-sm uppercase tracking-widest mb-4">Why Choose Us</p>
                            <h3 className="text-3xl md:text-4xl font-bold font-heading leading-tight">Expertise That Drives Precision</h3>
                        </div>
                        <div className="md:col-span-2 grid md:grid-cols-2 gap-8">
                            {differentiators.map((d, i) => (
                                <div key={i} className="flex gap-6">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                                        <d.icon className="w-6 h-6 text-[#E85A4F]" />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold mb-3 font-heading">{d.title}</h4>
                                        <p className="text-white/60 text-[15px] leading-relaxed italic">"{d.desc}"</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-24 bg-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#7FB3D5]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <div className="text-center mb-16">
                        <p className="text-accent font-black text-xs uppercase tracking-[0.3em] mb-3">Client Success</p>
                        <h3 className="text-3xl md:text-5xl font-black text-primary font-heading">Voice of Trust</h3>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {testimonials.map((t, i) => (
                            <div key={i} className="bg-slate-50/50 p-10 rounded-3xl border border-slate-100 hover:shadow-xl transition-all duration-300 relative group">
                                <Star className="w-10 h-10 text-accent/10 absolute top-8 right-8 group-hover:scale-110 transition-transform" />
                                <div className="flex gap-1 mb-6">
                                    {[...Array(t.rating)].map((_, j) => <Star key={j} className="w-4 h-4 fill-accent text-accent" />)}
                                </div>
                                <p className="text-primary/70 italic mb-8 leading-relaxed text-[15px]">"{t.text}"</p>
                                <div className="pt-6 border-t border-slate-200">
                                    <p className="font-bold text-primary text-sm">{t.name}</p>
                                    <p className="text-xs text-text-muted font-bold uppercase tracking-wider mt-1">{t.company}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-24 bg-white">
                <div className="max-w-3xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <p className="text-[#E85A4F] font-bold text-sm uppercase tracking-widest mb-2">Support</p>
                        <h3 className="text-3xl md:text-4xl font-bold text-[#1C3D5A] font-heading">Technical FAQs</h3>
                    </div>
                    <div className="space-y-4">
                        {faqs.map((faq, i) => (
                            <div key={i} className="border border-gray-200 rounded-xl overflow-hidden transition-all hover:bg-[#F8F6F3]">
                                <button onClick={() => toggleFaq(i)} className="w-full flex justify-between items-center p-6 text-left group">
                                    <span className="font-bold text-[#1C3D5A] text-[15px] pr-8">{faq.q}</span>
                                    <ChevronDown className={`w-5 h-5 text-[#5A6C7D] transition-transform ${openFaq === i ? 'rotate-180 text-[#E85A4F]' : ''}`} />
                                </button>
                                {openFaq === i && (
                                    <div className="px-6 pb-6 animate-in fade-in slide-in-from-top-2">
                                        <p className="text-[14px] text-[#5A6C7D] leading-relaxed border-l-2 border-[#E85A4F]/30 pl-4">{faq.a}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Quick Quote Form */}
            <section id="contact" className="py-24 bg-[#1C3D5A] relative overflow-hidden">
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#E85A4F]/10 rounded-full blur-[100px]"></div>
                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row">
                        <div className="lg:w-2/5 bg-[#F8F6F3] p-12">
                            <h3 className="text-3xl font-bold text-[#1C3D5A] mb-6 font-heading">Start Your Project</h3>
                            <p className="text-[#5A6C7D] mb-10 font-medium">Engineer-verified pricing and technical feasibility analysis within 24 business hours.</p>

                            <div className="space-y-8">
                                <div className="flex items-start gap-4">
                                    <Phone className="w-6 h-6 text-[#E85A4F] mt-1" />
                                    <div>
                                        <p className="font-bold text-[#1C3D5A]">Direct Line</p>
                                        <p className="text-[#5A6C7D]">+91 63807-36439</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <Mail className="w-6 h-6 text-[#E85A4F] mt-1" />
                                    <div>
                                        <p className="font-bold text-[#1C3D5A]">Technical Support</p>
                                        <p className="text-[#5A6C7D]">rgtech97@gmail.com</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <MapPin className="w-6 h-6 text-[#E85A4F] mt-1" />
                                    <div>
                                        <p className="font-bold text-[#1C3D5A]">Registered Facility</p>
                                        <p className="text-[#5A6C7D]">Ayanambakkam, Chennai - 600095</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex-grow p-12">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Full Name *" className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#E85A4F]/20 focus:border-[#E85A4F] outline-none transition-all text-sm" required />
                                    <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="WhatsApp Number *" className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#E85A4F]/20 focus:border-[#E85A4F] outline-none transition-all text-sm" required />
                                </div>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <select name="service" value={formData.service} onChange={handleInputChange} className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#E85A4F]/20 focus:border-[#E85A4F] outline-none transition-all text-sm appearance-none" required>
                                        <option value="">Select Service *</option>
                                        {pillarServices.map((s, i) => (<option key={i} value={s.name}>{s.name}</option>))}
                                    </select>
                                    <select name="material" value={formData.material} onChange={handleInputChange} className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#E85A4F]/20 focus:border-[#E85A4F] outline-none transition-all text-sm appearance-none">
                                        <option value="">Select Material</option>
                                        <option>Mild Steel</option><option>SS 304</option><option>SS 316</option><option>Aluminum</option><option>Copper</option><option>Brass</option>
                                    </select>
                                </div>
                                <textarea name="message" value={formData.message} onChange={handleInputChange} rows={4} placeholder="Thickness, Quantity, Delivery Location..." className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#E85A4F]/20 focus:border-[#E85A4F] outline-none transition-all text-sm resize-none"></textarea>

                                <button className="w-full py-6 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 font-bold text-xs uppercase tracking-widest hover:border-[#E85A4F] hover:text-[#E85A4F] transition-all flex items-center justify-center gap-3">
                                    <Upload className="w-5 h-5" /> Attach CAD/DXF/STEP File
                                </button>

                                <button type="submit" className="w-full bg-[#E85A4F] text-white py-5 rounded-xl font-bold text-sm hover:bg-[#D44E45] transition-all shadow-xl shadow-[#E85A4F]/20 flex items-center justify-center gap-3">
                                    Request Technical Quote <ArrowRight className="w-4 h-4" />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )

    return (
        <div className="min-h-screen bg-white font-sans selection:bg-[#7FB3D5]/30">
            <ScrollToTop />
            <Header
                toggleMobileMenu={toggleMobileMenu}
                mobileMenuOpen={mobileMenuOpen}
                toggleServicesDropdown={toggleServicesDropdown}
                servicesDropdown={servicesDropdown}
                pillarServices={pillarServices}
                setCatalogueModalOpen={setCatalogueModalOpen}
            />

            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/gallery" element={<GalleryPage />} />
                {/* Generic city routes for all services */}
                <Route path="/chennai/:serviceSlug/:city" element={<ServicePage services={pillarServices} />} />
                {pillarServices.map((s, i) => (
                    <Route key={i} path={s.slug} element={<ServicePage services={pillarServices} />} />
                ))}
            </Routes>

            <Footer pillarServices={pillarServices} />

            {/* Floating WhatsApp */}
            <a href="https://wa.me/916380736439" className="fixed bottom-6 right-6 w-14 h-14 bg-[#25D366] rounded-2xl flex items-center justify-center shadow-lg hover:scale-110 transition-transform z-50">
                <MessageCircle className="w-7 h-7 text-white" />
            </a>

            {/* Catalogue Download Modal */}
            <CatalogueModal isOpen={catalogueModalOpen} onClose={() => setCatalogueModalOpen(false)} />
        </div>
    )
}

export default App
