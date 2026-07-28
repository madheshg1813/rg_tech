import Image from 'next/image'
import { Phone, CheckCircle, ArrowRight, Shield, Clock, Star } from 'lucide-react'

const Hero = () => {
    return (
        <section id="home" className="on-dark hero-gradient text-white py-20 min-h-[600px] flex items-center relative overflow-hidden">
            <div className="absolute inset-0 hero-texture pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 skew-x-12 translate-x-1/2 pointer-events-none"></div>
            <div className="max-w-7xl mx-auto px-4 relative z-10 w-full">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-4xl md:text-6xl font-bold font-heading leading-tight mb-6 text-balance">
                            Your Trusted Partner for <br />
                            <span className="text-accent">CNC Laser Cutting & Fabrication</span>
                        </h2>
                        <p className="text-lg text-white/70 mb-10 max-w-xl">
                            High-Precision Metal Cutting up to 45mm – MS, SS, Aluminum, Copper & Brass
                        </p>

                        <div className="grid grid-cols-2 gap-y-4 gap-x-8 mb-12">
                            {[
                                "Precision up to 0.01mm",
                                "Large bed: 8000x2500mm",
                                "All metal types",
                                "Quick turnaround"
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="w-5 h-5 rounded-full border border-white/30 flex items-center justify-center">
                                        <CheckCircle className="w-3.5 h-3.5 text-accent" />
                                    </div>
                                    <span className="text-sm font-medium">{item}</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-wrap gap-5">
                            <a href="#contact" className="btn btn-primary">
                                Get a Quote <ArrowRight className="w-4 h-4" />
                            </a>
                            <a href="tel:+916380736439" className="btn btn-secondary-dark">
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
                        <div className="rounded-3xl overflow-hidden shadow-2xl relative border-4 border-white/10">
                            <Image
                                src="https://res.cloudinary.com/o1ytbfuz/image/upload/v1785177077/rg-tech/hero-laser"
                                alt="CNC fiber laser cutting machine at RG Tech Engineering, Chennai"
                                width={1200}
                                height={900}
                                priority
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                className="w-full aspect-[4/3] object-cover"
                            />
                            <div className="on-light absolute bottom-6 left-6 bg-white p-6 rounded-2xl shadow-xl max-w-[220px] transition-transform hover:scale-105 duration-300">
                                <p className="text-[10px] font-black text-fg-subtle uppercase tracking-widest mb-1">Bed Sizes</p>
                                <p className="text-lg font-black text-[#0F2A44] leading-none mb-1">8000 x 2500mm</p>
                                <p className="text-sm font-bold text-accent">Large Format Processing</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero;
