import {
    Shield, Zap, Wrench, Target, Building2, Factory, Cpu, Layers
} from 'lucide-react'

/*
 * Industrial standards ribbon.
 *
 * The items used to sit at opacity-30 and grayscale, lifting to full only under
 * the pointer. That made a row of capability claims read as disabled — and on a
 * phone, where there is no pointer at all, they could never reach the state they
 * were designed for. They now render at full strength at rest.
 *
 * Hover is left as a small lift to the accent green rather than an opacity
 * change, so the row still responds without implying it was switched off before.
 */
const INDUSTRIAL_ICONS = [
    { icon: Shield, name: 'ISO CERTIFIED' },
    { icon: Zap, name: 'HIGH POWER FIBER' },
    { icon: Wrench, name: 'MFG SUPPORT' },
    { icon: Target, name: 'PRECISION CNC' },
    { icon: Building2, name: 'STRUCTURAL STEEL' },
    { icon: Factory, name: 'OEM VENDOR' },
    { icon: Cpu, name: 'SMART NESTING' },
    { icon: Layers, name: 'MULTI-MATERIAL' },
]

const Item = ({ item }) => (
    <div className="group mx-10 flex items-center gap-4">
        <item.icon
            className="h-8 w-8 flex-none text-fg transition-colors duration-200 group-hover:text-accent"
            strokeWidth={1.6}
            aria-hidden="true"
        />
        <span className="meta-label text-fg transition-colors duration-200 group-hover:text-accent">
            {item.name}
        </span>
    </div>
)

const RollingLogos = () => {
    return (
        <div className="relative overflow-hidden border-y border-line bg-white py-10">
            <div className="shell mb-6">
                <p className="meta-label text-center text-fg-subtle">
                    Our Industrial Standards &amp; Capabilities
                </p>
            </div>
            <div className="flex animate-scroll whitespace-nowrap">
                {INDUSTRIAL_ICONS.map((item, i) => (
                    <Item key={i} item={item} />
                ))}
                {/* Duplicated so the track loops without a visible seam. */}
                {INDUSTRIAL_ICONS.map((item, i) => (
                    <Item key={`dup-${i}`} item={item} />
                ))}
            </div>
        </div>
    )
}

export default RollingLogos;
