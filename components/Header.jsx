"use client";

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import {
    Phone, Mail, MapPin, Clock, ChevronDown, ChevronRight, MessageCircle,
    Menu, X, FileText, Newspaper, Building2
} from 'lucide-react'
import { pillarServices } from '@/lib/data'
import { ALUMINUM, aluminumUrl } from '@/lib/aluminum'
import { CITIES, serviceUrl, serviceKeyOf, publishedLocalities } from '@/lib/cities'

/* Everything under the Resources menu, shared by the desktop and mobile navs so
 * the two cannot drift apart. */
const RESOURCE_LINKS = [
    {
        label: 'Blog',
        href: '/blog',
        desc: 'Technical articles on cutting and fabrication',
        Icon: Newspaper,
    },
    {
        label: 'About Us',
        href: '/about',
        desc: 'The workshop, capacity and materials we cut',
        Icon: Building2,
    },
]

/*
 * What the Services menu lists for a city: the six pillarServices, plus the
 * standalone aluminum pillar.
 *
 * Aluminum is deliberately absent from pillarServices — that array is what
 * drives locality page generation, and this category is pillars-only. The menu
 * is the one place the two need to look like a single list, so they are joined
 * here rather than by widening pillarServices.
 *
 * Built once and used by both the desktop mega-menu and the mobile accordion,
 * so the two cannot drift apart as categories are added.
 */
function cityServiceLinks(citySlug) {
    return [
        ...pillarServices.map((svc) => ({
            name: svc.name,
            href: serviceUrl(citySlug, serviceKeyOf(svc)),
        })),
        { name: ALUMINUM.name, href: aluminumUrl(citySlug) },
    ]
}

const Header = ({ setCatalogueModalOpen }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [servicesDropdown, setServicesDropdown] = useState(false)
    const [resourcesDropdown, setResourcesDropdown] = useState(false)
    const [openMobileService, setOpenMobileService] = useState(null)
    const pathname = usePathname()

    const toggleMobileMenu = () => setMobileMenuOpen(prev => !prev)
    const toggleServicesDropdown = () => setServicesDropdown(prev => !prev)
    const toggleResourcesDropdown = () => setResourcesDropdown(prev => !prev)

    useEffect(() => {
        setMobileMenuOpen(false)
        setServicesDropdown(false)
        setResourcesDropdown(false)
        setOpenMobileService(null)
    }, [pathname])

    return (
        <>
            {/* Top Info Bar */}
            {/* Running text, not a label — .meta-label's 0.18em tracking is for
                two or three words, and pushes a phone number and an address off
                the bar on narrow screens. */}
            <div className="bg-ink text-white/90 text-xs font-medium tracking-wide uppercase border-b border-white/5">
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
                            <Mail className="w-3 h-3" />
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
                                <h1 className="card-title text-fg leading-none">
                                    RG Tech <span className="text-accent">Engineering</span>
                                </h1>
                                <p className="meta-label text-fg-muted mt-1 opacity-70">
                                    CNC Fiber Laser Specialist
                                </p>
                            </div>
                        </Link>

                        <nav className="hidden lg:flex items-center gap-8">
                            <div className="relative group">
                                <button
                                    onClick={toggleServicesDropdown}
                                    onMouseEnter={() => !servicesDropdown && setServicesDropdown(true)}
                                    aria-expanded={servicesDropdown}
                                    className="nav-link flex items-center gap-1.5 py-2"
                                >
                                    Services <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${servicesDropdown ? 'rotate-180' : ''}`} />
                                </button>
                                {servicesDropdown && (
                                    /*
                                     * Three city columns instead of the old single
                                     * list with a locality fly-out. With three cities
                                     * that pattern needs a two-deep hover chain, which
                                     * is fiddly with a mouse and impossible on touch.
                                     * Localities stay discoverable through the
                                     * "Serving All Areas" grid on every page.
                                     */
                                    <div
                                        onMouseLeave={() => setServicesDropdown(false)}
                                        className="absolute top-full left-1/2 -translate-x-1/2 pt-4 z-50 animate-in fade-in slide-in-from-top-2"
                                    >
                                        {/* Two rows of two from the fourth city onward. A
                                            fixed 3-column grid at 860px was sized for exactly
                                            three cities and left a hole in the second row as
                                            soon as a fourth was added. */}
                                        <div className="bg-white rounded-3xl shadow-2xl border border-line p-6 w-[680px] grid grid-cols-2 xl:w-[880px] xl:grid-cols-4 gap-5">
                                            {Object.values(CITIES).map((city) => (
                                                <div key={city.slug}>
                                                    <div className="flex items-center gap-2 px-3 pb-3 mb-2 border-b border-line">
                                                        <MapPin className="w-3.5 h-3.5 text-accent" />
                                                        <p className="meta-label text-fg">
                                                            {city.name}
                                                        </p>
                                                        {!city.isPrimary && (
                                                            <span className="ml-auto meta-label text-accent bg-cta/10 px-2 py-0.5 rounded-full">
                                                                New
                                                            </span>
                                                        )}
                                                    </div>
                                                    {cityServiceLinks(city.slug).map((svc) => (
                                                        <Link
                                                            key={svc.href}
                                                            href={svc.href}
                                                            onClick={() => setServicesDropdown(false)}
                                                            className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-surface-2 transition-colors group/link"
                                                        >
                                                            <ChevronRight className="w-3.5 h-3.5 text-fg-subtle group-hover/link:text-accent flex-shrink-0" />
                                                            <span className="text-sm font-medium text-fg-muted group-hover/link:text-fg leading-snug">
                                                                {svc.name}
                                                            </span>
                                                        </Link>
                                                    ))}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <Link href="/gallery" className="nav-link">Gallery</Link>

                            {/* Resources groups the reading material — Blog and About —
                                so the bar stays at four items as pages get added. */}
                            <div className="relative">
                                <button
                                    onClick={toggleResourcesDropdown}
                                    onMouseEnter={() => !resourcesDropdown && setResourcesDropdown(true)}
                                    aria-expanded={resourcesDropdown}
                                    className="nav-link flex items-center gap-1.5 py-2"
                                >
                                    Resources
                                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${resourcesDropdown ? 'rotate-180' : ''}`} />
                                </button>
                                {resourcesDropdown && (
                                    <div
                                        onMouseLeave={() => setResourcesDropdown(false)}
                                        className="absolute top-full left-1/2 -translate-x-1/2 pt-4 z-50 animate-in fade-in slide-in-from-top-2"
                                    >
                                        <div className="bg-white rounded-2xl shadow-2xl border border-line p-2 w-64">
                                            {RESOURCE_LINKS.map(({ label, href, desc, Icon }) => (
                                                <Link
                                                    key={href}
                                                    href={href}
                                                    onClick={() => setResourcesDropdown(false)}
                                                    className="flex items-start gap-3 px-3 py-3 rounded-xl hover:bg-surface-2 transition-colors group/link"
                                                >
                                                    <span className="w-8 h-8 rounded-lg bg-cta/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                        <Icon className="w-4 h-4 text-accent" />
                                                    </span>
                                                    <span className="min-w-0">
                                                        <span className="block text-sm font-bold text-fg group-hover/link:text-accent transition-colors">
                                                            {label}
                                                        </span>
                                                        <span className="block text-xs text-fg-muted leading-snug mt-0.5">
                                                            {desc}
                                                        </span>
                                                    </span>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <Link href="/contact" className="nav-link">Contact</Link>
                        </nav>

                        <div className="hidden lg:flex items-center gap-4">
                            <a href="https://wa.me/916380736439" className="btn btn-whatsapp btn-sm group">
                                <MessageCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                WhatsApp
                            </a>
                            <button onClick={() => setCatalogueModalOpen(true)} className="btn btn-primary btn-sm">
                                <FileText className="w-4 h-4" /> Request Catalogue
                            </button>
                        </div>

                        <button onClick={toggleMobileMenu} className="lg:hidden p-3 rounded-2xl bg-surface-2 text-fg hover:bg-cta/10 hover:text-accent transition-all">
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
                                <p className="meta-label text-accent mb-1 pl-1">Services</p>

                                {Object.values(CITIES).map((city, i) => {
                                    const open = openMobileService === i
                                    const areas = publishedLocalities(city.slug)
                                    return (
                                        <div key={city.slug} className="rounded-2xl border border-line overflow-hidden">
                                            <button
                                                onClick={() => setOpenMobileService(open ? null : i)}
                                                aria-expanded={open}
                                                className="w-full flex items-center justify-between gap-3 py-4 px-4 hover:bg-surface-2 transition-colors"
                                            >
                                                <span className="flex items-center gap-2 font-bold text-base text-fg">
                                                    <MapPin className="w-4 h-4 text-accent" />
                                                    {city.name}
                                                    {!city.isPrimary && (
                                                        <span className="meta-label text-accent bg-cta/10 px-2 py-0.5 rounded-full">
                                                            New
                                                        </span>
                                                    )}
                                                </span>
                                                <ChevronDown
                                                    className={`w-5 h-5 text-fg-subtle transition-transform ${open ? 'rotate-180 text-accent' : ''}`}
                                                />
                                            </button>

                                            {open && (
                                                <div className="bg-surface-2 border-t border-line px-2 py-2">
                                                    {cityServiceLinks(city.slug).map((svc) => (
                                                        <Link
                                                            key={svc.href}
                                                            href={svc.href}
                                                            onClick={() => setMobileMenuOpen(false)}
                                                            className="block text-sm font-medium text-fg-muted py-2.5 px-3 rounded-lg hover:bg-white hover:text-accent transition-colors"
                                                        >
                                                            {svc.name}
                                                        </Link>
                                                    ))}
                                                    {areas.length > 0 && (
                                                        <p className="text-xs text-fg-subtle px-3 pt-2 pb-1">
                                                            {areas.length} area{areas.length === 1 ? '' : 's'} covered in {city.name}
                                                        </p>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    )
                                })}
                            </div>

                            <div className="flex flex-col gap-1 pt-3 border-t border-line">
                                <p className="meta-label text-accent mb-1 pl-1">Navigation</p>
                                {[
                                    { label: 'Gallery', href: '/gallery' },
                                    ...RESOURCE_LINKS.map(({ label, href }) => ({ label, href })),
                                    { label: 'Contact', href: '/contact' },
                                ].map(({ label, href }) => (
                                    <Link
                                        key={label}
                                        href={href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="text-fg font-bold text-base py-3 px-4 rounded-xl hover:bg-surface-2 transition-colors"
                                    >
                                        {label}
                                    </Link>
                                ))}
                            </div>

                            <div className="grid grid-cols-2 gap-3 pt-2">
                                <a href="https://wa.me/916380736439" className="btn btn-whatsapp">
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
