import { 
    FileText, Send, Zap, Eye, Truck 
} from 'lucide-react'

const Process = () => {
    const processSteps = [
        { step: '01', title: 'Share Requirement', desc: 'Send your drawing (DXF/STEP) with specs', icon: FileText },
        { step: '02', title: 'Quick Quote + DFM', desc: 'Get pricing with manufacturing suggestions', icon: Send },
        { step: '03', title: 'Production', desc: 'Precision cutting and fabrication begins', icon: Zap },
        { step: '04', title: 'QC + Finishing', desc: 'Quality checks and surface treatment', icon: Eye },
        { step: '05', title: 'Dispatch', desc: 'Packed and delivered to your location', icon: Truck }
    ]

    return (
        <section id="process" className="bg-white py-24">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-20">
                    <p className="text-[#E85A4F] font-bold text-sm uppercase tracking-widest mb-2">Workflow</p>
                    <h3 className="text-3xl md:text-4xl font-bold text-[#1C3D5A] font-heading tracking-tight italic">Execution <span className="text-[#E85A4F]">Workflow</span></h3>
                    <p className="text-slate-500 mt-4 font-medium">Precision and discipline from blueprint to finished part.</p>
                </div>
                <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-10">
                    {processSteps.map((s, i) => (
                        <div key={i} className="relative group p-10 rounded-[2.5rem] bg-slate-50 hover:bg-white hover:shadow-xl transition-all duration-300">
                            <div className="absolute -top-6 left-10 w-14 h-14 bg-[#1C3D5A] rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg border-4 border-white">
                                {s.step}
                            </div>
                            <div className="w-10 h-10 rounded-xl bg-[#E85A4F]/10 flex items-center justify-center mb-4 group-hover:bg-[#E85A4F] transition-colors mt-4">
                                <s.icon className="w-5 h-5 text-[#E85A4F] group-hover:text-white" />
                            </div>
                            <h4 className="font-bold text-[#1C3D5A] text-xl mb-3 font-heading">{s.title}</h4>
                            <p className="text-[14px] text-slate-500 leading-relaxed font-medium opacity-80">{s.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Process;
