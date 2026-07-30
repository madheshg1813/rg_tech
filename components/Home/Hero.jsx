import Image from 'next/image'
import { Phone, CheckCircle, ArrowRight, Shield, Clock, Star } from 'lucide-react'

const Hero = () => {
    return (
        <section
            id="home"
            className="hero-gradient py-16 md:py-24 md:min-h-[600px] flex items-center relative overflow-hidden"
        >
            <div className="absolute inset-0 hero-texture pointer-events-none"></div>
            {/* Soft indigo wedge, the light-theme stand-in for the old white/5 panel. */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-indigo/5 skew-x-12 translate-x-1/2 pointer-events-none hidden md:block"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 w-full">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    <div>
                        <p className="eyebrow mb-4">CNC Fiber Laser Specialist</p>
                        <h2 className="display-title text-fg mb-6 text-balance">
                            Your Trusted Partner for{' '}
                            <span className="text-accent">CNC Laser Cutting &amp; Fabrication</span>
                        </h2>
                        <p className="section-lead mb-10 max-w-xl">
                            High-Precision Metal Cutting up to 45mm – MS, SS, Aluminum, Copper &amp; Brass
                        </p>

                        {/* One column on a phone: "Large bed: 8000x2500mm" does not
                            fit a half-width column at 360px without wrapping badly. */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 mb-12">
                            {[
                                "Precision up to 0.01mm",
                                "Large bed: 8000x2500mm",
                                "All metal types",
                                "Quick turnaround"
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="w-5 h-5 rounded-full bg-brand-green/10 flex items-center justify-center flex-shrink-0">
                                        <CheckCircle className="w-3.5 h-3.5 text-brand-green" />
                                    </div>
                                    <span className="text-sm font-medium text-fg-muted">{item}</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col sm:flex-row flex-wrap gap-4">
                            <a href="#contact" className="btn btn-primary">
                                Get a Quote <ArrowRight className="w-4 h-4" />
                            </a>
                            <a href="tel:+916380736439" className="btn btn-secondary-light">
                                <Phone className="w-4 h-4" /> Call Now
                            </a>
                        </div>

                        {/* Wraps rather than scrolls: three labels do not fit one
                            phone-width row. */}
                        <div className="flex flex-wrap gap-x-6 gap-y-3 mt-12 pt-8 border-t border-line">
                            <div className="flex items-center gap-2 text-fg-subtle meta-label">
                                <Shield className="w-4 h-4" /> ISO Certified
                            </div>
                            <div className="flex items-center gap-2 text-fg-subtle meta-label">
                                <Clock className="w-4 h-4" /> 15+ Years
                            </div>
                            <div className="flex items-center gap-2 text-fg-subtle meta-label">
                                <Star className="w-4 h-4" /> 1000+ Projects
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="rounded-3xl overflow-hidden shadow-premium relative border border-line bg-white">
                            <Image
                                src="https://res.cloudinary.com/o1ytbfuz/image/upload/v1785177077/rg-tech/hero-laser"
                                alt="CNC fiber laser cutting machine at RG Tech Engineering, Chennai"
                                width={1200}
                                height={900}
                                priority
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                className="w-full aspect-[4/3] object-cover"
                            />
                            {/* Hidden on the narrowest screens, where a 220px card
                                covers most of the photo it is meant to annotate. */}
                            <div className="hidden sm:block absolute bottom-6 left-6 bg-white p-6 rounded-2xl shadow-xl max-w-[220px] border border-line transition-transform hover:scale-105 duration-300">
                                <p className="meta-label text-fg-subtle mb-1">Bed Sizes</p>
                                <p className="text-lg font-bold text-fg leading-none mb-1">8000 x 2500mm</p>
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
