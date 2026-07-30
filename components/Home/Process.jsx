import { 
    FileText, Send, Zap, Eye, Truck, HelpCircle 
} from 'lucide-react'
import { processSteps } from '@/lib/data'

const IconMap = {
    FileText, Send, Zap, Eye, Truck, HelpCircle
}

const Process = () => {

    return (
        <section id="process" className="bg-white py-24">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-20">
                    <p className="eyebrow mb-2">Workflow</p>
                    <h3 className="section-title text-fg">Execution <span className="text-accent">Workflow</span></h3>
                    <p className="section-lead mt-4">Precision and discipline from blueprint to finished part.</p>
                </div>
                <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-10">
                    {processSteps.map((s, i) => {
                        const Icon = IconMap[s.icon] || HelpCircle
                        return (
                            <div key={i} className="relative group p-6 sm:p-10 rounded-[1.75rem] sm:rounded-[2.5rem] bg-surface-2 hover:bg-white hover:shadow-xl transition-all duration-300">
                                <div className="absolute -top-6 left-10 w-14 h-14 bg-ink-2 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg border-4 border-white">
                                    {s.step}
                                </div>
                                <div className="w-10 h-10 rounded-xl bg-cta/10 flex items-center justify-center mb-4 group-hover:bg-cta transition-colors mt-4">
                                    <Icon className="w-5 h-5 text-accent group-hover:text-white" />
                                </div>
                                <h4 className="card-title text-fg mb-3">{s.title}</h4>
                                <p className="text-sm text-fg-muted leading-relaxed font-medium opacity-80">{s.desc}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default Process;
