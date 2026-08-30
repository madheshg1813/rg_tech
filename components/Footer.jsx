import Link from 'next/link'
import Image from 'next/image'
import {
    Phone, Mail, MapPin, ChevronRight, MessageCircle,
    Instagram, Youtube, Star, ExternalLink
} from 'lucide-react'
import { pillarServices, GMB_URL, GMB_MAP_URL, GMB_REVIEW_URL, SOCIAL_LINKS } from '@/lib/data'

// Only the channels RG Tech actually has. Facebook, LinkedIn and Twitter were
// dropped with the placeholder markup — see the note on SOCIAL_LINKS in
// lib/data.js. Add an entry there and it appears here automatically.
const SocialIcon = { Instagram, Youtube }

const Footer = () => {
    return (
        <footer className="on-dark surface-dark text-white py-24 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
                    {/* Brand Section */}
                    <div className="space-y-8">
                        <Link href="/" className="flex items-center gap-3">
                            <Image
                                src="https://res.cloudinary.com/o1ytbfuz/image/upload/v1785177077/rg-tech/rg-tech-logo"
                                alt="RG Tech Engineering Works — CNC laser cutting and metal fabrication in Chennai"
                                width={220}
                                height={240}
                                loading="lazy"
                                sizes="48px"
                                className="h-12 w-auto brightness-0 invert"
                                style={{ width: "auto", height: "auto" }}
                            />
                            <h2 className="subsection-title">RG Tech</h2>
                        </Link>
                        <p className="text-white/60 leading-relaxed font-medium">
                            Tamil Nadu's premier CNC Fiber Laser Cutting & Metal Fabrication partner. Delivering industrial precision with zero-defect commitment since inception.
                        </p>
                        <div className="flex gap-4">
                            {SOCIAL_LINKS.map(({ name, icon, url }) => {
                                const Icon = SocialIcon[icon]
                                if (!Icon) return null
                                return (
                                    <a
                                        key={name}
                                        href={url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={`RG Tech Engineering on ${name}`}
                                        data-analytics={`social-${name.toLowerCase()}`}
                                        className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-cta hover:scale-110 transition-all duration-300"
                                    >
                                        <Icon className="w-5 h-5" />
                                    </a>
                                )
                            })}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="card-title mb-8 text-accent">Core Services</h4>
                        <ul className="space-y-4">
                            {pillarServices.map((s, i) => (
                                <li key={i}>
                                    <Link href={s.slug} className="text-white/60 hover:text-white flex items-center gap-2 group transition-colors font-medium">
                                        <ChevronRight className="w-4 h-4 text-accent group-hover:translate-x-1 transition-transform" />
                                        {s.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Important Pages */}
                    <div>
                        <h4 className="card-title mb-8 text-accent">Resources</h4>
                        <ul className="space-y-4">
                            {[
                                { label: 'Gallery', href: '/gallery' },
                                { label: 'Blog', href: '/blog' },
                                { label: 'Contact', href: '/contact' },
                                { label: 'About Us', href: '/about' },
                                { label: 'Terms & Conditions', href: '/terms' },
                                { label: 'Google Business Profile', href: GMB_URL, external: true },
                            ].map(({ label: link, href, external }, i) => {
                                const cls = "text-white/60 hover:text-white flex items-center gap-2 group transition-colors font-medium"
                                const inner = (
                                    <>
                                        <ChevronRight className="w-4 h-4 text-accent group-hover:translate-x-1 transition-transform" />
                                        {link}
                                    </>
                                )
                                return (
                                    <li key={i}>
                                        {external ? (
                                            <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
                                                {inner}
                                            </a>
                                        ) : (
                                            <Link href={href} className={cls}>{inner}</Link>
                                        )}
                                    </li>
                                )
                            })}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="card-title mb-8 text-accent">Reach Us</h4>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-cta/10 flex items-center justify-center flex-shrink-0">
                                    <MapPin className="w-5 h-5 text-accent" />
                                </div>
                                <div>
                                    <p className="text-white/60 text-sm leading-relaxed font-medium">
                                        Door No. 63, B&amp;C Flat, Galaxy Company Salai,<br />
                                        Ponniamman Nagar, Ayanambakkam,<br />
                                        Chennai, Tamil Nadu 600095
                                    </p>
                                    <a
                                        href={GMB_MAP_URL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 mt-2 text-accent text-sm font-bold hover:underline"
                                    >
                                        View on Google Maps <ExternalLink className="w-3.5 h-3.5" />
                                    </a>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-cta/10 flex items-center justify-center flex-shrink-0">
                                    <Phone className="w-5 h-5 text-accent" />
                                </div>
                                <a href="tel:+916380736439" className="text-white hidden sm:block font-bold">+91 63807 36439</a>
                                <a href="tel:+916380736439" className="text-white sm:hidden font-bold">+91 63807-36439</a>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-cta/10 flex items-center justify-center flex-shrink-0">
                                    <Mail className="w-5 h-5 text-accent" />
                                </div>
                                <a href="mailto:admin@rgtechengineeringworks.com" className="text-white/80 hover:text-white transition-colors text-sm font-medium truncate">admin@rgtechengineeringworks.com</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-white/40 text-sm font-medium">
                        © {new Date().getFullYear()} RG Tech Engineering Works. All Rights Reserved.
                    </p>
                    <div className="flex items-center gap-4">
                        <a href="https://wa.me/916380736439" className="btn btn-whatsapp btn-sm">
                            <MessageCircle className="w-4 h-4" /> Engineering Support
                        </a>
                    </div>
                </div>
            </div>

            {/* Background elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-cta/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        </footer>
    )
}

export default Footer;
