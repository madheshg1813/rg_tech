import {
    Settings, Factory, Cpu, Wind, Building2, Paintbrush, HelpCircle
} from 'lucide-react'
import { industries } from '@/lib/data'

const IconMap = {
    Settings, Factory, Cpu, Wind, Building2, Paintbrush, HelpCircle
}

/*
 * Industries - the hover tint is gone.
 *
 * The tile previously went blue on hover (bg-cta/10) and the icon scaled and
 * changed opacity. The playbook forbids hover recolouring, and these tiles are
 * not links, so they had a hover state that promised a destination there was
 * none of. They are now static cards.
 */
const Industries = () => {
    return (
        <section id="industries" className="section bg-surface">
            <div className="shell">
                <div className="mb-10 text-center sm:mb-14">
                    <p className="eyebrow-text">Sectors Served</p>
                    <h2 className="h2 mt-2">Industries We Serve</h2>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
                    {industries.map((ind, i) => {
                        const Icon = IconMap[ind.icon] || HelpCircle
                        return (
                            <div key={i} className="card relative isolate flex h-full flex-col overflow-hidden p-4 pt-5 sm:p-6 sm:pt-7">
                                <span
                                    aria-hidden="true"
                                    className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-accent-ink"
                                />
                                <Icon
                                    className="mb-3 h-7 w-7 text-accent sm:mb-4 sm:h-8 sm:w-8"
                                    strokeWidth={1.6}
                                    aria-hidden="true"
                                />
                                <h3 className="font-heading text-[0.9375rem] font-bold leading-snug tracking-[-0.012em] text-fg sm:text-base">
                                    {ind.name}
                                </h3>
                                <p className="mt-1.5 text-xs leading-snug text-fg-muted sm:text-sm">
                                    {ind.desc}
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
