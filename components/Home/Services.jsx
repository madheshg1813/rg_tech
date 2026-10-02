import Link from 'next/link'
import {
    ArrowRight, Scissors, PanelTop, Wrench, Home, DoorOpen, Sparkles, Settings
} from 'lucide-react'
import { pillarServices } from '@/lib/data'

const IconMap = {
    Scissors, PanelTop, Wrench, Home, DoorOpen, Sparkles, Settings
}

/*
 * Services — restyled to the playbook's card rules.
 *
 *   plain outline icons        the blue-tinted icon tile, and its fill-with-blue
 *                              hover, are gone; the icon is a bare ink outline
 *   hover never recolours      hover is a lift, a soft shadow and a 3px arrow
 *                              nudge, handled by .card-link
 *   description XOR ticks      kept the one-line description, so no tick list
 *   2 per row on phones        was one full-width card per row, which made the
 *                              section seven screens long on a 390px viewport
 *   one card shell             .card, so the radius and border match every other
 *                              card on the site
 */
const Services = () => {
    return (
        <section id="services" className="section bg-surface-2">
            <div className="shell">
                <div className="mb-10 flex flex-col gap-4 sm:mb-14 md:flex-row md:items-end md:justify-between md:gap-6">
                    <div>
                        <p className="eyebrow-text">Our Capabilities</p>
                        <h2 className="h2 mt-2">Industrial Services</h2>
                    </div>
                    <p className="section-lead max-w-md">
                        Precision engineering services delivered from our facility in Chennai.
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">
                    {pillarServices.map((s, i) => {
                        const Icon = IconMap[s.mainIcon] || Settings
                        return (
                            <Link
                                key={i}
                                href={s.slug}
                                className="card card-link flex h-full flex-col p-3.5 sm:p-7"
                            >
                                <Icon
                                    className="mb-4 h-6 w-6 flex-none text-fg sm:mb-6 sm:h-7 sm:w-7"
                                    strokeWidth={1.6}
                                    aria-hidden="true"
                                />
                                <h3 className="card-title text-fg">{s.name}</h3>
                                {/* Hidden on phones: the service name already says
                                    what this is, and the playbook would rather the
                                    section fit the screen than repeat itself. */}
                                <p className="mt-2 hidden flex-grow text-sm leading-relaxed text-fg-muted sm:block">
                                    {s.metaDescription.split('. ')[0]}.
                                </p>
                                <span className="mt-4 flex items-center justify-between gap-2 border-t border-line pt-4 text-xs font-bold text-cta-ink sm:mt-6 sm:pt-5 sm:text-sm">
                                    Explore
                                    <ArrowRight className="card-arrow h-4 w-4" aria-hidden="true" />
                                </span>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default Services;
