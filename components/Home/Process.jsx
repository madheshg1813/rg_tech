import {
    FileText, Send, Zap, Eye, Truck, HelpCircle, ChevronRight
} from 'lucide-react'
import { processSteps } from '@/lib/data'

const IconMap = {
    FileText, Send, Zap, Eye, Truck, HelpCircle
}

/*
 * Execution workflow.
 *
 * Two layouts of the same five steps, because a process reads differently
 * along an axis than it does in a grid:
 *
 *   lg and up   a horizontal rail, numbered nodes sitting on it, the card
 *               hanging beneath each node
 *   below lg    a vertical rail down the left with the cards to its right
 *
 * The rail is drawn per step rather than as one line behind everything: each
 * step owns the segment that leaves it, so the segment can highlight with its
 * own hover and no node needs a ring painted in the section's background
 * colour to punch a hole through a line running underneath it. A ring like
 * that only works while the background stays flat, and this section sits on a
 * gradient.
 *
 * Segment geometry, horizontal: nodes are centred in equal grid columns, so
 * consecutive centres are (column width + gap) apart. The segment starts one
 * node radius past its own centre and ends one radius short of the next, and
 * the chevron sits at the midpoint -- the column's right edge plus half the
 * gap. All of it falls out of `100%` and the gap, so nothing needs measuring
 * and it holds at any width.
 */
const Process = () => {
    return (
        <section
            id="process"
            className="relative isolate overflow-hidden bg-gradient-to-b from-white via-surface-2 to-white py-20 sm:py-24 lg:py-32"
        >
            <span aria-hidden="true" className="hero-grid-paper" style={{ opacity: 0.4 }} />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
                <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16 lg:mb-20">
                    <p className="eyebrow mb-4 flex items-center justify-center gap-3">
                        <span aria-hidden="true" className="h-px w-6 bg-gradient-to-r from-transparent to-accent-ink/40" />
                        Workflow
                        <span aria-hidden="true" className="h-px w-6 bg-gradient-to-l from-transparent to-accent-ink/40" />
                    </p>
                    <h3 className="section-title text-fg text-balance">
                        Execution <span className="text-accent">Workflow</span>
                    </h3>
                    <p className="section-lead mt-5">Precision and discipline from blueprint to finished part.</p>
                </div>

                {/* ── Horizontal rail (lg and up) ───────────────────────────── */}
                <ol className="hidden lg:grid grid-cols-5 gap-6 list-none p-0">
                    {processSteps.map((s, i) => {
                        const Icon = IconMap[s.icon] || HelpCircle
                        const last = i === processSteps.length - 1
                        return (
                            <li key={i} className="group relative flex flex-col items-center">
                                {/* Rail segment out of this node, and the
                                    chevron at its midpoint. */}
                                {!last && (
                                    <>
                                        <span
                                            aria-hidden="true"
                                            className="pointer-events-none absolute top-10 left-[calc(50%+2.5rem)] h-0.5 w-[calc(100%+1.5rem-5rem)] -translate-y-1/2 bg-gradient-to-r from-accent-ink/35 to-cta/25 transition-colors duration-300 group-hover:from-accent-ink group-hover:to-accent-ink/60"
                                        />
                                        <ChevronRight
                                            aria-hidden="true"
                                            className="pointer-events-none absolute top-10 left-[calc(100%+0.75rem)] h-4 w-4 -translate-x-1/2 -translate-y-1/2 text-accent/50 transition-colors duration-300 group-hover:text-accent"
                                        />
                                    </>
                                )}

                                {/* The number is the landmark: 80px, on the
                                    rail, flipping to brand green on hover. */}
                                <span className="relative z-10 flex h-20 w-20 flex-none items-center justify-center rounded-full border-4 border-white bg-ink-2 font-heading text-[1.75rem] font-extrabold leading-none text-white shadow-[0_10px_28px_-12px_rgba(13,11,43,0.65)] transition-[background-color,transform] duration-300 group-hover:-translate-y-1 group-hover:bg-accent-ink motion-reduce:transition-none motion-reduce:group-hover:translate-y-0">
                                    {s.step}
                                </span>

                                <div className="mt-7 w-full flex-1 rounded-2xl border border-line bg-white p-6 text-center shadow-[0_1px_2px_rgba(15,42,68,0.04),0_10px_28px_-18px_rgba(15,42,68,0.16)] transition-[transform,box-shadow,border-color] duration-300 ease-out group-hover:-translate-y-1.5 group-hover:border-accent-ink/30 group-hover:shadow-[0_2px_6px_rgba(15,42,68,0.06),0_28px_54px_-26px_rgba(15,42,68,0.28)] motion-reduce:transition-none motion-reduce:group-hover:translate-y-0">
                                    <span className="mx-auto mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-accent-ink/10 bg-gradient-to-br from-brand-green/15 via-cta/10 to-transparent ring-1 ring-inset ring-white/60 transition-colors duration-300 group-hover:border-accent-ink/30 motion-reduce:transition-none">
                                        <Icon className="h-6 w-6 text-accent" strokeWidth={1.6} aria-hidden="true" />
                                    </span>
                                    <h4 className="card-title text-fg leading-snug">{s.title}</h4>
                                    <p className="mt-2.5 text-sm leading-relaxed text-fg-muted">{s.desc}</p>
                                </div>
                            </li>
                        )
                    })}
                </ol>

                {/* ── Vertical rail (below lg) ──────────────────────────────── */}
                <ol className="lg:hidden list-none p-0 space-y-4 sm:space-y-5">
                    {processSteps.map((s, i) => {
                        const Icon = IconMap[s.icon] || HelpCircle
                        const last = i === processSteps.length - 1
                        return (
                            <li key={i} className="group relative flex gap-4 sm:gap-5">
                                <div className="relative flex-none">
                                    <span className="relative z-10 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full border-4 border-white bg-ink-2 font-heading text-lg sm:text-xl font-extrabold leading-none text-white shadow-[0_8px_22px_-10px_rgba(13,11,43,0.6)]">
                                        {s.step}
                                    </span>
                                    {/* Segment down to the next node: starts
                                        below this one and runs into the gap. */}
                                    {!last && (
                                        <span
                                            aria-hidden="true"
                                            className="pointer-events-none absolute left-1/2 top-14 sm:top-16 h-[calc(100%-3.5rem+1rem)] sm:h-[calc(100%-4rem+1.25rem)] w-0.5 -translate-x-1/2 bg-gradient-to-b from-accent-ink/35 to-cta/25"
                                        />
                                    )}
                                </div>

                                <div className="flex-1 rounded-2xl border border-line bg-white p-5 sm:p-6 shadow-[0_1px_2px_rgba(15,42,68,0.04),0_10px_28px_-18px_rgba(15,42,68,0.16)]">
                                    <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-accent-ink/10 bg-gradient-to-br from-brand-green/15 via-cta/10 to-transparent">
                                        <Icon className="h-5 w-5 text-accent" strokeWidth={1.6} aria-hidden="true" />
                                    </span>
                                    <h4 className="card-title text-fg leading-snug">{s.title}</h4>
                                    <p className="mt-2 text-sm leading-relaxed text-fg-muted">{s.desc}</p>
                                </div>
                            </li>
                        )
                    })}
                </ol>
            </div>
        </section>
    )
}

export default Process;
