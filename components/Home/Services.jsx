import Link from 'next/link'
import {
    ArrowRight, Scissors, PanelTop, Wrench, Home, DoorOpen, Sparkles, Settings
} from 'lucide-react'
import { pillarServices } from '@/lib/data'

const IconMap = {
    Scissors, PanelTop, Wrench, Home, DoorOpen, Sparkles, Settings
}

/*
 * Services grid.
 *
 * The whole card is the link, so everything inside is presentational and the
 * hit target is the full card rather than the CTA row alone.
 *
 * Card anatomy: a 4px brand strip across the top, a 72px icon plate, the
 * name, the description, then a pill CTA pinned to the floor with mt-auto.
 * The pin is what lines the six CTAs up -- the descriptions run one to four
 * lines, so without it every card's CTA sat at a different height.
 *
 * Hover moves transform, opacity and colour only. No layout property
 * animates, so the grid never reflows under the pointer, and every effect is
 * dropped under prefers-reduced-motion.
 */
const Services = () => {
    return (
        <section
            id="services"
            className="relative isolate overflow-hidden py-20 sm:py-24 lg:py-32 bg-gradient-to-b from-white via-surface-2 to-surface-2"
        >
            {/* The site's own hero texture, so the band belongs to the page
                rather than introducing a second visual language. */}
            <span aria-hidden="true" className="hero-grid-paper" style={{ opacity: 0.45 }} />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
                <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 lg:mb-20">
                    <p className="eyebrow mb-4 flex items-center justify-center gap-3">
                        <span aria-hidden="true" className="h-px w-6 bg-gradient-to-r from-transparent to-accent-ink/40" />
                        Our Capabilities
                        <span aria-hidden="true" className="h-px w-6 bg-gradient-to-l from-transparent to-accent-ink/40" />
                    </p>
                    <h3 className="section-title text-fg text-balance">Industrial Services</h3>
                </div>

                <div className="grid gap-5 sm:gap-6 lg:gap-7 md:grid-cols-2 lg:grid-cols-3">
                    {pillarServices.map((s, i) => {
                        const Icon = IconMap[s.mainIcon] || Settings
                        return (
                            <Link
                                key={i}
                                href={s.slug}
                                className="group relative isolate flex h-full flex-col overflow-hidden rounded-[22px] border border-line bg-white p-6 sm:p-8 lg:p-9 transition-[transform,box-shadow,border-color] duration-300 ease-out shadow-[0_1px_2px_rgba(15,42,68,0.04),0_10px_28px_-16px_rgba(15,42,68,0.14)] hover:-translate-y-2 hover:border-accent-ink/35 hover:shadow-[0_2px_6px_rgba(15,42,68,0.06),0_32px_60px_-28px_rgba(15,42,68,0.30)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                            >
                                {/* Brand strip across the card head. Always
                                    present so the card has an edge at rest;
                                    it saturates on hover. */}
                                <span
                                    aria-hidden="true"
                                    className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent-ink via-brand-green to-cta opacity-60 transition-opacity duration-300 group-hover:opacity-100 motion-reduce:transition-none"
                                />

                                <span className="mb-7 inline-flex h-[72px] w-[72px] flex-none items-center justify-center rounded-2xl border border-accent-ink/10 bg-gradient-to-br from-brand-green/15 via-cta/10 to-transparent ring-1 ring-inset ring-white/60 transition-colors duration-300 group-hover:border-accent-ink/30 motion-reduce:transition-none">
                                    <Icon className="h-8 w-8 text-accent" strokeWidth={1.6} aria-hidden="true" />
                                </span>

                                <h4 className="subsection-title text-[1.375rem] sm:text-[1.5rem] leading-[1.25] text-fg">
                                    {s.name}
                                </h4>

                                {/* Measure capped so the longest three
                                    descriptions read as a caption rather than
                                    running the full card width as a paragraph. */}
                                <p className="mt-3.5 mb-8 max-w-[40ch] text-[0.9375rem] sm:text-base leading-[1.75] text-fg-muted">
                                    {s.metaDescription.split('. ')[0]}. Expert cutting and processing for all industrial grades.
                                </p>

                                {/* CTA as a pill, pinned to the card floor so
                                    all six share a baseline whatever the
                                    description above them does. */}
                                <span className="mt-auto inline-flex items-center justify-between gap-3 self-start rounded-full border border-line bg-surface-2 py-2 pl-5 pr-2 transition-colors duration-300 group-hover:border-accent-ink/30 group-hover:bg-accent-ink/5 motion-reduce:transition-none">
                                    <span className="text-sm font-bold tracking-[-0.01em] text-accent">
                                        Explore Service
                                    </span>
                                    <span className="inline-flex h-9 w-9 flex-none items-center justify-center rounded-full border border-line bg-white text-accent transition-colors duration-300 group-hover:border-accent-ink group-hover:bg-accent-ink group-hover:text-white motion-reduce:transition-none">
                                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0" />
                                    </span>
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
