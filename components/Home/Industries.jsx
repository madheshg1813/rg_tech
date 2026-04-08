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
                    <p className="text-[#E85A4F] font-bold text-sm uppercase tracking-widest mb-2">Sectors Served</p>
                    <h3 className="text-3xl md:text-5xl font-bold text-[#1C3D5A] font-heading">Industries We Empower</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {industries.map((ind, i) => {
                        const Icon = IconMap[ind.icon] || HelpCircle
                        return (
                            <div key={i} className="bg-slate-50 p-6 rounded-2xl text-center hover:bg-[#E85A4F]/10 transition-all duration-300 group">
                                <Icon className="w-8 h-8 text-[#1C3D5A] mx-auto mb-4 opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                                <p className="text-[11px] font-black text-[#1C3D5A] uppercase tracking-wider">{ind.name}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default Industries;
