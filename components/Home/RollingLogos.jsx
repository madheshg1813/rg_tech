import { 
    Shield, Zap, Wrench, Target, Building2, Factory, Cpu, Layers 
} from 'lucide-react'

const RollingLogos = () => {
    const industrialIcons = [
        { icon: Shield, name: 'ISO CERTIFIED' },
        { icon: Zap, name: 'HIGH POWER FIBER' },
        { icon: Wrench, name: 'MFG SUPPORT' },
        { icon: Target, name: 'PRECISION CNC' },
        { icon: Building2, name: 'STRUCTURAL STEEL' },
        { icon: Factory, name: 'OEM VENDOR' },
        { icon: Cpu, name: 'SMART NESTING' },
        { icon: Layers, name: 'MULTI-MATERIAL' }
    ]
    
    return (
        <div className="bg-white border-y border-gray-100 py-10 overflow-hidden relative">
            <div className="max-w-7xl mx-auto px-4 mb-6">
                <p className="text-center text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Our Industrial Standards & Capabilities</p>
            </div>
            <div className="flex animate-scroll whitespace-nowrap">
                {industrialIcons.map((item, i) => (
                    <div key={i} className="flex items-center gap-4 mx-10 opacity-30 hover:opacity-100 transition-opacity grayscale hover:grayscale-0">
                        <item.icon className="w-8 h-8 text-[#2C3E50]" />
                        <span className="font-bold text-[#2C3E50] text-xs tracking-widest uppercase">{item.name}</span>
                    </div>
                ))}
                {/* Duplicate for infinite loop */}
                {industrialIcons.map((item, i) => (
                    <div key={`dup-${i}`} className="flex items-center gap-4 mx-10 opacity-30 hover:opacity-100 transition-opacity grayscale hover:grayscale-0">
                        <item.icon className="w-8 h-8 text-[#2C3E50]" />
                        <span className="font-bold text-[#2C3E50] text-xs tracking-widest uppercase">{item.name}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default RollingLogos;
