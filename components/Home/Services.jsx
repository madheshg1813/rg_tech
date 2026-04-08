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
        <section id="services" className="py-24 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div>
                        <p className="text-[#E85A4F] font-bold text-sm uppercase tracking-widest mb-2">Our Capabilities</p>
                        <h3 className="text-3xl md:text-4xl font-bold text-[#1C3D5A] font-heading">Industrial Services</h3>
                    </div>
                    <p className="text-slate-500 font-medium max-w-md">Precision engineering services delivered from our state-of-the-art facility in Chennai.</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {pillarServices.map((s, i) => (
                        <Link key={i} href={s.slug} className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-gray-100">
                            <div className="w-14 h-14 rounded-xl bg-[#E85A4F]/10 flex items-center justify-center mb-8 group-hover:bg-[#E85A4F] transition-colors">
                                {(() => {
                                    const Icon = IconMap[s.mainIcon] || Settings
                                    return <Icon className="w-6 h-6 text-[#E85A4F] group-hover:text-white" />
                                })()}
                            </div>
                            <h4 className="text-xl font-bold text-[#1C3D5A] mb-4 font-heading">{s.name}</h4>
                            <p className="text-[15px] text-[#1C3D5A]/60 leading-relaxed mb-8 flex-grow">
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
    )
}

export default Services;
