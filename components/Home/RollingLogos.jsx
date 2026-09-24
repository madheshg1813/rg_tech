import {
    Shield, Zap, Wrench, Target, Building2, Factory, Cpu, Layers
} from 'lucide-react'

/*
 * Capability ribbon.
 *
 * Built on .marquee-viewport / .marquee-track rather than the older
 * .animate-scroll this used to carry. That system is already behind the Our
 * Works strip and the design galleries, and it brings three things this strip
 * did not have: the ends are masked so badges enter and leave instead of being
 * sliced off at the viewport edge, the run pauses on hover and on keyboard
 * focus, and under prefers-reduced-motion the animation is dropped and the row
 * becomes an ordinary horizontal scroller rather than freezing mid-slide.
 *
 * The track is laid twice and translated by -50%, which is what makes the loop
 * seamless. The second lap is aria-hidden: it exists for the eye, and a screen
 * reader should be read eight capabilities once, not sixteen.
 *
 * Contrast is the substantive change. Every badge was opacity-30 and
 * grayscale, which is the styling of something disabled -- a strip of claims
 * about the business, drawn as though it were switched off.
 */
const CAPABILITIES = [
    { icon: Shield, name: 'ISO CERTIFIED' },
    { icon: Zap, name: 'HIGH POWER FIBER' },
    { icon: Wrench, name: 'MFG SUPPORT' },
    { icon: Target, name: 'PRECISION CNC' },
    { icon: Building2, name: 'STRUCTURAL STEEL' },
    { icon: Factory, name: 'OEM VENDOR' },
    { icon: Cpu, name: 'SMART NESTING' },
    { icon: Layers, name: 'MULTI-MATERIAL' },
]

function Badge({ item }) {
    const Icon = item.icon
    return (
        <span className="group mx-2.5 inline-flex flex-none items-center gap-3.5 rounded-full border border-line bg-white py-2.5 pl-2.5 pr-6 shadow-[0_1px_2px_rgba(15,42,68,0.04),0_8px_20px_-14px_rgba(15,42,68,0.18)] transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-accent-ink/35 hover:shadow-[0_2px_6px_rgba(15,42,68,0.06),0_18px_36px_-18px_rgba(15,42,68,0.28)] motion-reduce:transition-none motion-reduce:hover:translate-y-0">
            <span className="inline-flex h-11 w-11 flex-none items-center justify-center rounded-full border border-accent-ink/10 bg-gradient-to-br from-brand-green/15 via-cta/10 to-transparent ring-1 ring-inset ring-white/60 transition-colors duration-300 group-hover:border-accent-ink/30 motion-reduce:transition-none">
                <Icon className="h-5 w-5 text-accent" strokeWidth={1.75} aria-hidden="true" />
            </span>
            <span className="meta-label text-fg">{item.name}</span>
        </span>
    )
}

const RollingLogos = () => {
    return (
        <section className="relative isolate overflow-hidden border-y border-line bg-gradient-to-b from-white via-surface-2 to-white py-12 sm:py-14">
            {/* A single soft highlight behind the run, so the ribbon sits on
                something rather than on flat white. */}
            <span
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-64 w-[60rem] max-w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cta/[0.06] blur-3xl"
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-8 sm:mb-10">
                <p className="eyebrow flex items-center justify-center gap-3 text-center">
                    <span aria-hidden="true" className="h-px w-6 flex-none bg-gradient-to-r from-transparent to-accent-ink/40" />
                    Our Industrial Standards &amp; Capabilities
                    <span aria-hidden="true" className="h-px w-6 flex-none bg-gradient-to-l from-transparent to-accent-ink/40" />
                </p>
            </div>

            <div className="marquee-viewport overflow-hidden">
                <div className="marquee-track" style={{ '--marquee-duration': '48s' }}>
                    {CAPABILITIES.map((item) => (
                        <Badge key={item.name} item={item} />
                    ))}
                    {/* Second lap: the loop's seam, hidden from assistive tech. */}
                    <span aria-hidden="true" className="flex">
                        {CAPABILITIES.map((item) => (
                            <Badge key={`dup-${item.name}`} item={item} />
                        ))}
                    </span>
                </div>
            </div>
        </section>
    )
}

export default RollingLogos;
