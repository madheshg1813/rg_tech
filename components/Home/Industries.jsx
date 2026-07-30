import { 
    Settings, Factory, Cpu, Wind, Building2, Paintbrush, HelpCircle 
} from 'lucide-react'
import { industries } from '@/lib/data'

const IconMap = {
    Settings, Factory, Cpu, Wind, Building2, Paintbrush, HelpCircle
}

const Industries = () => {
    return (
        <section id="industries" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                    <p className="eyebrow mb-2">Sectors Served</p>
                    <h3 className="section-title text-fg">Industries We Empower</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {industries.map((ind, i) => {
                        const Icon = IconMap[ind.icon] || HelpCircle
                        return (
                            <div key={i} className="bg-surface-2 p-6 rounded-2xl text-center hover:bg-cta/10 transition-all duration-300 group">
                                <Icon className="w-8 h-8 text-fg mx-auto mb-4 opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                                <p className="meta-label text-fg">{ind.name}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default Industries;
