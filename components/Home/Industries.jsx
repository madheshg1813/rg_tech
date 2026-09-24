import {
    Settings, Factory, Cpu, Wind, Building2, Paintbrush, HelpCircle
} from 'lucide-react'
import { industries } from '@/lib/data'

const IconMap = {
    Settings, Factory, Cpu, Wind, Building2, Paintbrush, HelpCircle
}

/*
 * Sectors served.
 *
 * Six tiles that have to read as one showcase rather than six loose blocks,
 * so they share a ruled container: every tile carries the same brand strip
 * across its head, and the row sits on a single lit ground.
 *
 * The name is set in the heading family at 15px rather than the 11px mono
 * micro-label it was. Mono uppercase at 0.16em tracking is the site's voice
 * for stamped captions -- "LARGE FORMAT BED", "15+ YEARS" -- and these are not
 * captions, they are the six markets the business serves. At that size and
 * tracking, "ELECTRICAL PANEL MFG." took two lines and scanned a character at
 * a time.
 *
 * Hover moves transform, opacity and colour only, so the row never reflows
 * under the pointer, and all of it is dropped under prefers-reduced-motion.
 */
const Industries = () => {
    return (
        <section
            id="industries"
            className="relative isolate overflow-hidden bg-gradient-to-b from-white via-surface-2 to-white py-20 sm:py-24 lg:py-28"
        >
            {/* One soft highlight behind the row, so the tiles sit on lit
                ground instead of flat white. */}
            <span
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-[58%] -z-10 h-72 w-[68rem] max-w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cta/[0.07] blur-3xl"
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14 lg:mb-16">
                    <p className="eyebrow mb-4 flex items-center justify-center gap-3">
                        <span aria-hidden="true" className="h-px w-6 bg-gradient-to-r from-transparent to-accent-ink/40" />
                        Sectors Served
                        <span aria-hidden="true" className="h-px w-6 bg-gradient-to-l from-transparent to-accent-ink/40" />
                    </p>
                    <h3 className="section-title text-fg text-balance">Industries We Empower</h3>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-5">
                    {industries.map((ind, i) => {
                        const Icon = IconMap[ind.icon] || HelpCircle
                        return (
                            <div
                                key={i}
                                className="group relative isolate flex h-full min-h-[11.5rem] flex-col items-center justify-center overflow-hidden rounded-2xl border border-line bg-white px-4 py-7 text-center shadow-[0_1px_2px_rgba(15,42,68,0.04),0_10px_26px_-16px_rgba(15,42,68,0.16)] transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1.5 hover:border-accent-ink/35 hover:shadow-[0_2px_6px_rgba(15,42,68,0.06),0_26px_50px_-24px_rgba(15,42,68,0.30)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                            >
                                {/* Brand strip across the head of every tile:
                                    the thing that makes six cards read as one
                                    row. Present at rest, full on hover. */}
                                <span
                                    aria-hidden="true"
                                    className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent-ink via-brand-green to-cta opacity-55 transition-opacity duration-300 group-hover:opacity-100 motion-reduce:transition-none"
                                />

                                <span className="mb-5 inline-flex h-16 w-16 flex-none items-center justify-center rounded-2xl border border-accent-ink/10 bg-gradient-to-br from-brand-green/15 via-cta/10 to-transparent ring-1 ring-inset ring-white/60 transition-colors duration-300 group-hover:border-accent-ink/30 motion-reduce:transition-none">
                                    <Icon className="h-7 w-7 text-accent" strokeWidth={1.6} aria-hidden="true" />
                                </span>

                                <p className="font-heading text-[0.9375rem] font-bold leading-snug tracking-[-0.012em] text-fg text-balance">
                                    {ind.name}
                                </p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default Industries;
