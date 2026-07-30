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
        <section className="py-24 bg-white">
            <div className="max-w-5xl mx-auto px-4">
                <div className="text-center mb-12">
                    <p className="eyebrow mb-3">Support</p>
                    <h2 className="section-title text-fg">
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
