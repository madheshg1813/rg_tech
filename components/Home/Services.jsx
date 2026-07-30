import Link from 'next/link'
import { 
    ArrowRight, Scissors, PanelTop, Wrench, Home, DoorOpen, Sparkles, Settings 
} from 'lucide-react'
import { pillarServices } from '@/lib/data'

const IconMap = {
    Scissors, PanelTop, Wrench, Home, DoorOpen, Sparkles, Settings
}

const Services = () => {
    return (
        <section id="services" className="py-24 bg-surface-2">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div>
                        <p className="eyebrow mb-2">Our Capabilities</p>
                        <h3 className="section-title text-fg">Industrial Services</h3>
                    </div>
                    <p className="section-lead max-w-md">Precision engineering services delivered from our state-of-the-art facility in Chennai.</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {pillarServices.map((s, i) => (
                        <Link key={i} href={s.slug} className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-line">
                            <div className="w-14 h-14 rounded-xl bg-cta/10 flex items-center justify-center mb-8 group-hover:bg-cta transition-colors">
                                {(() => {
                                    const Icon = IconMap[s.mainIcon] || Settings
                                    return <Icon className="w-6 h-6 text-accent group-hover:text-white" />
                                })()}
                            </div>
                            <h4 className="card-title text-fg mb-4">{s.name}</h4>
                            <p className="text-base text-fg/60 leading-relaxed mb-8 flex-grow">
                                {s.metaDescription.split('. ')[0]}. Expert cutting and processing for all industrial grades.
                            </p>
                            <div className="pt-6 border-t border-line flex items-center justify-between text-accent font-bold text-sm group-hover:translate-x-1 transition-transform">
                                Explore Service <ArrowRight className="w-4 h-4" />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Services;
