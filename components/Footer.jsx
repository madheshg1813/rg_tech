import Link from 'next/link'
import Image from 'next/image'
import {
    Phone, Mail, MapPin, ChevronRight, MessageCircle,
    Facebook, Instagram, Linkedin, Twitter
} from 'lucide-react'
import { pillarServices } from '@/lib/data'

const Footer = () => {
    return (
        <footer className="bg-[#1C3D5A] text-white py-24 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
                    {/* Brand Section */}
                    <div className="space-y-8">
                        <Link href="/" className="flex items-center gap-3">
                            <img src="/RG-Tech-Logo.png" alt="RG Tech Logo" className="h-12 w-auto brightness-0 invert" />
                            <h2 className="text-2xl font-bold font-heading">RG Tech</h2>
                        </Link>
                        <p className="text-white/60 leading-relaxed font-medium">
                            Tamil Nadu's premier CNC Fiber Laser Cutting & Metal Fabrication partner. Delivering industrial precision with zero-defect commitment since inception.
                        </p>
                        <div className="flex gap-4">
                            {[Facebook, Instagram, Linkedin, Twitter].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-[#E85A4F] hover:scale-110 transition-all duration-300">
                                    <Icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-bold mb-8 font-heading text-[#E85A4F]">Core Services</h4>
                        <ul className="space-y-4">
                            {pillarServices.map((s, i) => (
                                <li key={i}>
                                    <Link href={s.slug} className="text-white/60 hover:text-white flex items-center gap-2 group transition-colors font-medium">
                                        <ChevronRight className="w-4 h-4 text-[#E85A4F] group-hover:translate-x-1 transition-transform" />
                                        {s.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Important Pages */}
                    <div>
                        <h4 className="text-lg font-bold mb-8 font-heading text-[#E85A4F]">Resources</h4>
                        <ul className="space-y-4">
                            {['Gallery', 'Blog', 'About Us', 'Contact', 'Privacy Policy'].map((link, i) => (
                                <li key={i}>
                                    <Link href={link === 'Gallery' ? '/gallery' : link === 'Blog' ? '/blog' : `/#${link.toLowerCase().replace(' ', '-')}`} className="text-white/60 hover:text-white flex items-center gap-2 group transition-colors font-medium">
                                        <ChevronRight className="w-4 h-4 text-[#E85A4F] group-hover:translate-x-1 transition-transform" />
                                        {link}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-bold mb-8 font-heading text-[#E85A4F]">Reach Us</h4>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-[#E85A4F]/10 flex items-center justify-center flex-shrink-0">
                                    <MapPin className="w-5 h-5 text-[#E85A4F]" />
                                </div>
                                <p className="text-white/60 text-sm leading-relaxed font-medium">
                                    No. 46, Thirumudivakkam Main Rd,<br />
                                    Thirumudivakkam, Chennai,<br />
                                    Tamil Nadu 600044
                                </p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-[#E85A4F]/10 flex items-center justify-center flex-shrink-0">
                                    <Phone className="w-5 h-5 text-[#E85A4F]" />
                                </div>
                                <a href="tel:+916380736439" className="text-white hidden sm:block font-bold">+91 63807 36439</a>
                                <a href="tel:+916380736439" className="text-white sm:hidden font-bold">+91 63807-36439</a>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-[#E85A4F]/10 flex items-center justify-center flex-shrink-0">
                                    <Mail className="w-5 h-5 text-[#E85A4F]" />
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
                        <a href="https://wa.me/916380736439" className="flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-xl font-bold text-sm hover:scale-105 transition-transform shadow-lg shadow-green-500/20">
                            <MessageCircle className="w-4 h-4" /> Engineering Support
                        </a>
                    </div>
                </div>
            </div>

            {/* Background elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#E85A4F]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        </footer>
    )
}

export default Footer;
