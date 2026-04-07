import { Star } from 'lucide-react'
import { testimonials } from '@/lib/data'

const Testimonials = () => {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#E85A4F]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <p className="text-[#E85A4F] font-black text-xs uppercase tracking-[0.3em] mb-3">Client Success</p>
                    <h3 className="text-3xl md:text-5xl font-black text-[#1C3D5A] font-heading italic">Voice of <span className="text-[#E85A4F]">Trust</span></h3>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((t, i) => (
                        <div key={i} className="bg-slate-50/50 p-10 rounded-3xl border border-slate-100 hover:shadow-xl transition-all duration-300 relative group">
                            <Star className="w-10 h-10 text-[#E85A4F]/10 absolute top-8 right-8 group-hover:scale-110 transition-transform" />
                            <div className="flex gap-1 mb-6">
                                {[...Array(t.rating)].map((_, j) => (
                                    <Star key={j} className="w-4 h-4 fill-[#E85A4F] text-[#E85A4F]" />
                                ))}
                            </div>
                            <p className="text-[#1C3D5A]/70 italic mb-8 leading-relaxed text-[15px]">"{t.text}"</p>
                            <div className="pt-6 border-t border-slate-200">
                                <p className="font-bold text-[#1C3D5A] text-sm">{t.name}</p>
                                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">{t.company}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Testimonials;
