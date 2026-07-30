import { 
    CheckCircle, Wrench, FileText, Layers, Sparkles, Package, HelpCircle 
} from 'lucide-react'
import { differentiators } from '@/lib/data'

const IconMap = {
    CheckCircle, Wrench, FileText, Layers, Sparkles, Package, HelpCircle
}

const WhyChooseUs = () => {
    return (
        <section id="about" className="on-dark py-24 surface-dark text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-cta/5 rounded-full blur-[120px]"></div>
            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="grid md:grid-cols-3 gap-12">
                    <div className="md:col-span-1">
                        <p className="eyebrow mb-4">Why Choose Us</p>
                        <h3 className="section-title">Expertise That <br /><span className="text-accent">Drives Precision</span></h3>
                    </div>
                    <div className="md:col-span-2 grid md:grid-cols-2 gap-8">
                        {differentiators.map((d, i) => {
                            const Icon = IconMap[d.icon] || HelpCircle
                            return (
                                <div key={i} className="flex gap-6 group">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-cta transition-colors duration-300">
                                        <Icon className="w-6 h-6 text-accent group-hover:text-white" />
                                    </div>
                                    <div>
                                        <h4 className="card-title mb-3">{d.title}</h4>
                                        <p className="text-white/60 text-base leading-relaxed italic">"{d.desc}"</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default WhyChooseUs;
