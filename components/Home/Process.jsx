import { processSteps } from '@/lib/data'

/*
 * Process — rebuilt as the playbook's compact stepper.
 *
 * It was five tall cards with 2.5rem radii, a floating numbered badge breaking
 * each card's top edge, a tinted icon tile that filled blue on hover, and a full
 * description. On a phone that was five full screens to read five steps.
 *
 * The playbook's version is one line of numbered ink dots with a short title and
 * a brief subline, readable in a single view. The connecting rule runs behind
 * the dots on desktop so the row reads as a sequence rather than five unrelated
 * items; it is hidden on phones, where the steps stack two per row.
 *
 * The icons are dropped rather than restyled: at this size a number and a title
 * carry the step, and an icon beside a numeral competes with it.
 */
const Process = () => {
    return (
        <section id="process" className="section bg-surface">
            <div className="shell">
                <div className="mb-10 text-center sm:mb-14">
                    <p className="eyebrow-text">Workflow</p>
                    <h2 className="h2 mt-2">
                        Execution <span className="text-accent">Workflow</span>
                    </h2>
                    <p className="section-lead mx-auto mt-4 max-w-xl">
                        Precision and discipline from blueprint to finished part.
                    </p>
                </div>

                <div className="relative">
                    {/* The rule sits behind the dots, inset by half a dot so it
                        never pokes out past the first or last one. */}
                    <div
                        className="absolute left-0 right-0 top-4 hidden h-px bg-line lg:block"
                        style={{ marginInline: '10%' }}
                        aria-hidden="true"
                    />

                    <ol className="relative grid list-none grid-cols-2 gap-x-4 gap-y-8 p-0 sm:grid-cols-3 lg:grid-cols-5 lg:gap-x-6">
                        {processSteps.map((s, i) => (
                            <li key={i} className="text-center">
                                <span className="step-num mx-auto ring-4 ring-surface">
                                    {s.step}
                                </span>
                                <h3 className="mt-3 text-sm font-bold leading-tight tracking-tight text-fg sm:text-base">
                                    {s.title}
                                </h3>
                                <p className="mt-1.5 text-xs leading-snug text-fg-muted sm:text-sm">
                                    {s.desc}
                                </p>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </section>
    )
}

export default Process;
