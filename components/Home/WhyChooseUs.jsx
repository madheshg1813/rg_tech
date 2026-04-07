import { differentiators } from '@/lib/data'

const WhyChooseUs = () => {
    return (
        <section id="about" className="py-24 bg-[#1C3D5A] text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#E85A4F]/5 rounded-full blur-[120px]"></div>
            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="grid md:grid-cols-3 gap-12">
                    <div className="md:col-span-1">
                        <p className="text-[#E85A4F] font-bold text-sm uppercase tracking-widest mb-4">Why Choose Us</p>
                        <h3 className="text-3xl md:text-4xl font-bold font-heading leading-tight italic">Expertise That <br /><span className="text-[#E85A4F]">Drives Precision</span></h3>
                    </div>
                    <div className="md:col-span-2 grid md:grid-cols-2 gap-8">
                        {differentiators.map((d, i) => (
                            <div key={i} className="flex gap-6 group">
                                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-[#E85A4F] transition-colors duration-300">
                                    <d.icon className="w-6 h-6 text-[#E85A4F] group-hover:text-white" />
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
    )
}

export default WhyChooseUs;
