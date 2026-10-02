import {
    Settings, Factory, Cpu, Wind, Building2, Paintbrush, HelpCircle
} from 'lucide-react'
import { industries } from '@/lib/data'

const IconMap = {
    Settings, Factory, Cpu, Wind, Building2, Paintbrush, HelpCircle
}

/*
 * Industries — the hover tint is gone.
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

                <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-6">
                    {industries.map((ind, i) => {
                        const Icon = IconMap[ind.icon] || HelpCircle
                        return (
                            <div key={i} className="card p-3.5 text-center sm:p-6">
                                <Icon
                                    className="mx-auto mb-3 h-7 w-7 text-fg sm:mb-4 sm:h-8 sm:w-8"
                                    strokeWidth={1.6}
                                    aria-hidden="true"
                                />
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
