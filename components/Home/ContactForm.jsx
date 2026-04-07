"use client"
import { useState } from 'react'
import { Phone, Mail, MapPin, Upload, ArrowRight } from 'lucide-react'
import { pillarServices } from '@/lib/data'

const ContactForm = () => {
    const [formData, setFormData] = useState({ name: '', phone: '', service: '', material: '', message: '' })
    const handleInputChange = (e) => { const { name, value } = e.target; setFormData(prev => ({ ...prev, [name]: value })) }
    const handleSubmit = (e) => { e.preventDefault(); alert('Thank you! We will respond within 24 hours.') }

    return (
        <section id="contact" className="py-24 bg-[#1C3D5A] relative overflow-hidden">
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#E85A4F]/10 rounded-full blur-[120px]"></div>
            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row border border-white/20">
                    <div className="lg:w-2/5 bg-slate-50 p-12">
                        <h3 className="text-3xl font-bold text-[#1C3D5A] mb-6 font-heading italic">Start Your <span className="text-[#E85A4F]">Project</span></h3>
                        <p className="text-slate-500 mb-10 font-medium">Engineer-verified pricing and technical feasibility analysis within 24 business hours.</p>

                        <div className="space-y-8">
                            <div className="flex items-start gap-4">
                                <Phone className="w-6 h-6 text-[#E85A4F] mt-1" />
                                <div>
                                    <p className="font-bold text-[#1C3D5A]">Direct Line</p>
                                    <p className="text-slate-500">+91 63807-36439</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <Mail className="w-6 h-6 text-[#E85A4F] mt-1" />
                                <div>
                                    <p className="font-bold text-[#1C3D5A]">Technical Support</p>
                                    <p className="text-slate-500">admin@rgtechengineeringworks.com</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <MapPin className="w-6 h-6 text-[#E85A4F] mt-1" />
                                <div>
                                    <p className="font-bold text-[#1C3D5A]">Registered Facility</p>
                                    <p className="text-slate-500">Ayanambakkam, Chennai - 600095</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex-grow p-12">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Full Name *" className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#E85A4F]/20 focus:border-[#E85A4F] outline-none transition-all text-sm" required />
                                <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="WhatsApp Number *" className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#E85A4F]/20 focus:border-[#E85A4F] outline-none transition-all text-sm" required />
                            </div>
                            <div className="grid md:grid-cols-2 gap-6">
                                <select name="service" value={formData.service} onChange={handleInputChange} className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#E85A4F]/20 focus:border-[#E85A4F] outline-none transition-all text-sm appearance-none" required>
                                    <option value="">Select Service *</option>
                                    {pillarServices.map((s, i) => (<option key={i} value={s.name}>{s.name}</option>))}
                                </select>
                                <select name="material" value={formData.material} onChange={handleInputChange} className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#E85A4F]/20 focus:border-[#E85A4F] outline-none transition-all text-sm appearance-none">
                                    <option value="">Select Material</option>
                                    <option value="Mild Steel">Mild Steel</option>
                                    <option value="Stainless Steel">Stainless Steel</option>
                                    <option value="Aluminum">Aluminum</option>
                                    <option value="Brass">Brass</option>
                                    <option value="Copper">Copper</option>
                                </select>
                            </div>
                            <textarea name="message" value={formData.message} onChange={handleInputChange} rows={4} placeholder="Thickness, Quantity, Delivery Location..." className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#E85A4F]/20 focus:border-[#E85A4F] outline-none transition-all text-sm resize-none"></textarea>
                            
                            <button type="button" className="w-full py-6 border-2 border-dashed border-gray-200 rounded-xl text-slate-400 font-bold text-xs uppercase tracking-widest hover:border-[#E85A4F] hover:text-[#E85A4F] transition-all flex items-center justify-center gap-3">
                                <Upload className="w-5 h-5" /> Attach CAD/DXF/STEP File
                            </button>

                            <button type="submit" className="w-full bg-[#E85A4F] text-white py-5 rounded-xl font-bold text-sm hover:bg-[#D44E45] transition-all shadow-xl shadow-[#E85A4F]/20 flex items-center justify-center gap-3">
                                Request Technical Quote <ArrowRight className="w-4 h-4" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ContactForm;
