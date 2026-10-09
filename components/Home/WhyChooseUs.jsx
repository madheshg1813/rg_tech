import {
    CheckCircle, Wrench, FileText, Layers, Sparkles, Package, HelpCircle
} from 'lucide-react'
import { differentiators } from '@/lib/data'

const IconMap = {
    CheckCircle, Wrench, FileText, Layers, Sparkles, Package, HelpCircle
}

/*
 * Why choose us - three playbook corrections.
 *
 *   no decorative blobs        the 384px blue radial blur in the top-right
 *                              corner is removed
 *   no icon tiles, no recolour the white-on-white rounded tile that filled with
 *                              blue on hover is gone; bare outline icons in the
 *                              accent green, which is what the dark band is for
 *   no quote styling           the differentiators were wrapped in literal quote
 *                              marks and set in italic, which read as testimonials
 *                              from nobody. They are our own claims, set plainly.
 */
const WhyChooseUs = () => {
    return (
        <section id="about" className="on-dark section surface-dark text-white">
            <div className="shell">
                <div className="grid gap-10 md:grid-cols-3 md:gap-12">
                    <div className="md:col-span-1">
                        <p className="eyebrow-text">Why Choose Us</p>
                        <h2 className="h2 mt-2 text-white">
                            Expertise That <span className="text-accent">Drives Precision</span>
                        </h2>
                    </div>

                    <div className="grid gap-6 sm:gap-8 md:col-span-2 md:grid-cols-2">
                        {differentiators.map((d, i) => {
                            const Icon = IconMap[d.icon] || HelpCircle
                            return (
                                <div key={i} className="flex gap-4">
                                    <Icon
                                        className="mt-0.5 h-6 w-6 flex-none text-accent"
                                        strokeWidth={1.6}
                                        aria-hidden="true"
                                    />
                                    <div>
                                        <h3 className="card-title">{d.title}</h3>
                                        <p className="mt-2 text-sm leading-relaxed text-white/60">
                                            {d.desc}
                                        </p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default WhyChooseUs;
