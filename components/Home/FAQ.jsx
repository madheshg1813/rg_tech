import { Plus } from 'lucide-react'
import { faqs } from '@/lib/data'

/*
 * Uses the same .faq-card accordion as the service pages, and <details> rather
 * than useState, so the answers are server-rendered into the markup and this is
 * no longer a client component.
 */
const FAQ = () => {
    const columns = [
        faqs.slice(0, Math.ceil(faqs.length / 2)),
        faqs.slice(Math.ceil(faqs.length / 2)),
    ].filter((column) => column.length > 0)

    return (
        <section className="relative isolate overflow-hidden py-20 sm:py-24 lg:py-32 bg-gradient-to-b from-surface-2 via-white to-white">
            <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
                <div className="text-center mb-12 sm:mb-16">
                    {/* Flanking hairlines make the label read as a stamped
                        section marker rather than the smallest line of text on
                        the page. Decoration only; the label is unchanged. */}
                    <p className="eyebrow mb-4 flex items-center justify-center gap-3">
                        <span aria-hidden="true" className="h-px w-6 bg-gradient-to-r from-transparent to-accent-ink/40" />
                        Support
                        <span aria-hidden="true" className="h-px w-6 bg-gradient-to-l from-transparent to-accent-ink/40" />
                    </p>
                    <h2 className="section-title text-fg text-balance">
                        Technical <span className="text-accent">FAQs</span>
                    </h2>
                </div>
                <div className="faq-columns">
                    {columns.map((column, col) => (
                        <div key={col} className="faq-column">
                            {column.map((faq, i) => (
                                <details key={i} className="faq-card">
                                    <summary className="faq-q">
                                        <span>{faq.q}</span>
                                        <Plus className="faq-icon" aria-hidden="true" />
                                    </summary>
                                    <div className="faq-a">{faq.a}</div>
                                </details>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default FAQ;
