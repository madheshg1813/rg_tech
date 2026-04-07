"use client"
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { faqs } from '@/lib/data'

const FAQ = () => {
    const [openFaq, setOpenFaq] = useState(null)
    const toggleFaq = (i) => setOpenFaq(prev => prev === i ? null : i)

    return (
        <section className="py-24 bg-white">
            <div className="max-w-3xl mx-auto px-4">
                <div className="text-center mb-16">
                    <p className="text-[#E85A4F] font-bold text-sm uppercase tracking-widest mb-2">Support</p>
                    <h3 className="text-3xl md:text-4xl font-bold text-[#1C3D5A] font-heading italic">Technical <span className="text-[#E85A4F]">FAQs</span></h3>
                </div>
                <div className="space-y-4">
                    {faqs.map((faq, i) => (
                        <div key={i} className="border border-slate-200 rounded-xl overflow-hidden transition-all hover:bg-slate-50">
                            <button onClick={() => toggleFaq(i)} className="w-full flex justify-between items-center p-6 text-left group">
                                <span className="font-bold text-[#1C3D5A] text-[15px] pr-8">{faq.q}</span>
                                <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${openFaq === i ? 'rotate-180 text-[#E85A4F]' : ''}`} />
                            </button>
                            {openFaq === i && (
                                <div className="px-6 pb-6 animate-in fade-in slide-in-from-top-2">
                                    <p className="text-[14px] text-slate-500 leading-relaxed border-l-2 border-[#E85A4F]/30 pl-4">{faq.a}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default FAQ;
