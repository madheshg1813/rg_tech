"use client"
import { useState, useRef } from 'react'
import { Phone, Mail, MapPin, Upload, ArrowRight, CheckCircle, AlertTriangle, X, Loader2 } from 'lucide-react'
import { pillarServices } from '@/lib/data'

const EMPTY = { name: '', phone: '', email: '', service: '', material: '', message: '' }
const MAX_FILE_MB = 6

const ContactForm = () => {
    const [formData, setFormData] = useState(EMPTY)
    const [file, setFile] = useState(null)
    const [status, setStatus] = useState({ state: 'idle', message: '' })
    const fileInputRef = useRef(null)

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleFileChange = (e) => {
        const picked = e.target.files?.[0]
        if (!picked) return
        if (picked.size > MAX_FILE_MB * 1024 * 1024) {
            setStatus({
                state: 'error',
                message: `That file is ${(picked.size / 1024 / 1024).toFixed(1)} MB. Please keep attachments under ${MAX_FILE_MB} MB, or send it on WhatsApp.`,
            })
            e.target.value = ''
            return
        }
        setFile(picked)
        setStatus({ state: 'idle', message: '' })
    }

    const clearFile = () => {
        setFile(null)
        if (fileInputRef.current) fileInputRef.current.value = ''
    }

    /** Read the attachment as base64 so it can travel as JSON to Apps Script. */
    const readFileAsBase64 = (f) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onload = () => resolve(String(reader.result).split(',')[1] || '')
            reader.onerror = () => reject(new Error('Could not read the attachment.'))
            reader.readAsDataURL(f)
        })

    const handleSubmit = async (e) => {
        e.preventDefault()
        setStatus({ state: 'sending', message: '' })

        try {
            let filePayload = null
            if (file) {
                filePayload = { name: file.name, type: file.type, data: await readFileAsBase64(file) }
            }

            const res = await fetch('/api/enquiry', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    file: filePayload,
                    source: 'contact-form',
                    page: typeof window !== 'undefined' ? window.location.pathname : '',
                }),
            })

            const data = await res.json().catch(() => ({}))

            if (!res.ok || !data.ok) {
                // Never claim success we cannot verify — the previous version of
                // this form showed a thank-you alert and discarded the lead.
                setStatus({
                    state: 'error',
                    message: data.error || 'Something went wrong. Please WhatsApp us on +91 63807 36439.',
                })
                return
            }

            setStatus({
                state: 'success',
                message: "Thank you — your request is with our team. We respond within 24 business hours.",
            })
            setFormData(EMPTY)
            clearFile()
        } catch {
            setStatus({
                state: 'error',
                message: 'Network problem. Please try again, or WhatsApp us on +91 63807 36439.',
            })
        }
    }

    const sending = status.state === 'sending'
    const inputCls =
        'w-full px-5 py-4 rounded-xl border border-line bg-surface-2 focus:bg-white focus:ring-2 focus:ring-[#F59E0B]/20 focus:border-cta outline-none transition-all text-sm disabled:opacity-60'

    return (
        <section id="contact" className="on-dark py-24 surface-dark relative overflow-hidden">
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-cta/10 rounded-full blur-[120px]"></div>
            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="on-light bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row border border-white/20">
                    <div className="lg:w-2/5 bg-surface-2 p-6 sm:p-10">
                        <h2 className="section-title text-fg mb-6">
                            Start Your <span className="text-accent">Project</span>
                        </h2>
                        <p className="section-lead mb-10">
                            Engineer-verified pricing and technical feasibility analysis within 24 business hours.
                        </p>

                        <div className="space-y-8">
                            <div className="flex items-start gap-4">
                                <Phone className="w-6 h-6 text-accent mt-1" />
                                <div>
                                    <p className="font-bold text-fg">Direct Line</p>
                                    <a href="tel:+916380736439" className="text-fg-muted hover:text-accent transition-colors">
                                        +91 63807-36439
                                    </a>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <Mail className="w-6 h-6 text-accent mt-1" />
                                <div>
                                    <p className="font-bold text-fg">Technical Support</p>
                                    <a
                                        href="mailto:admin@rgtechengineeringworks.com"
                                        className="text-fg-muted hover:text-accent transition-colors break-all"
                                    >
                                        admin@rgtechengineeringworks.com
                                    </a>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <MapPin className="w-6 h-6 text-accent mt-1" />
                                <div>
                                    <p className="font-bold text-fg">Registered Facility</p>
                                    <p className="text-fg-muted">
                                        Door No. 63, B&amp;C Flat, Galaxy Company Salai,<br />
                                        Ponniamman Nagar, Ayanambakkam,<br />
                                        Chennai - 600095
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex-grow p-6 sm:p-10">
                        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                            <div className="grid md:grid-cols-2 gap-6">
                                <input
                                    type="text" name="name" value={formData.name} onChange={handleInputChange}
                                    placeholder="Full Name *" className={inputCls} required disabled={sending}
                                    autoComplete="name"
                                />
                                <input
                                    type="tel" name="phone" value={formData.phone} onChange={handleInputChange}
                                    placeholder="WhatsApp Number *" className={inputCls} required disabled={sending}
                                    autoComplete="tel"
                                />
                            </div>

                            <input
                                type="email" name="email" value={formData.email} onChange={handleInputChange}
                                placeholder="Email (optional)" className={inputCls} disabled={sending}
                                autoComplete="email"
                            />

                            <div className="grid md:grid-cols-2 gap-6">
                                <select
                                    name="service" value={formData.service} onChange={handleInputChange}
                                    className={`${inputCls} appearance-none`} required disabled={sending}
                                >
                                    <option value="">Select Service *</option>
                                    {pillarServices.map((s, i) => (
                                        <option key={i} value={s.name}>{s.name}</option>
                                    ))}
                                </select>
                                <select
                                    name="material" value={formData.material} onChange={handleInputChange}
                                    className={`${inputCls} appearance-none`} disabled={sending}
                                >
                                    <option value="">Select Material</option>
                                    <option value="Mild Steel">Mild Steel</option>
                                    <option value="Stainless Steel">Stainless Steel</option>
                                    <option value="Aluminum">Aluminum</option>
                                    <option value="Brass">Brass</option>
                                    <option value="Copper">Copper</option>
                                </select>
                            </div>

                            <textarea
                                name="message" value={formData.message} onChange={handleInputChange} rows={4}
                                placeholder="Thickness, Quantity, Delivery Location..."
                                className={`${inputCls} resize-none`} disabled={sending}
                            />

                            {/* Real file input — this button previously did nothing at all */}
                            <input
                                ref={fileInputRef}
                                type="file"
                                onChange={handleFileChange}
                                accept=".dxf,.dwg,.step,.stp,.stl,.pdf,.zip,.png,.jpg,.jpeg"
                                className="sr-only"
                                id="enquiry-file"
                                disabled={sending}
                            />
                            {file ? (
                                <div className="w-full py-4 px-5 border-2 border-cta/40 bg-cta/5 rounded-xl flex items-center justify-between gap-4">
                                    <span className="text-sm font-medium text-fg truncate">
                                        {file.name}{' '}
                                        <span className="text-fg-subtle">({(file.size / 1024).toFixed(0)} KB)</span>
                                    </span>
                                    <button
                                        type="button" onClick={clearFile} disabled={sending}
                                        className="text-fg-subtle hover:text-fg flex-shrink-0"
                                        aria-label="Remove attachment"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            ) : (
                                <label
                                    htmlFor="enquiry-file"
                                    className="w-full py-6 border-2 border-dashed border-line rounded-xl text-fg-subtle meta-label hover:border-cta hover:text-accent transition-all flex items-center justify-center gap-3 cursor-pointer"
                                >
                                    <Upload className="w-5 h-5" /> Attach CAD/DXF/STEP File
                                </label>
                            )}

                            <button type="submit" className="btn btn-primary btn-lg w-full" disabled={sending}>
                                {sending ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" /> Sending…
                                    </>
                                ) : (
                                    <>
                                        Request Technical Quote <ArrowRight className="w-4 h-4" />
                                    </>
                                )}
                            </button>

                            {status.state === 'success' && (
                                <p role="status" className="flex items-start gap-3 text-sm font-medium text-green-700 bg-green-50 border border-green-200 rounded-xl p-4">
                                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-px" /> {status.message}
                                </p>
                            )}
                            {status.state === 'error' && (
                                <p role="alert" className="flex items-start gap-3 text-sm font-medium text-red-700 bg-red-50 border border-red-200 rounded-xl p-4">
                                    <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-px" /> {status.message}
                                </p>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ContactForm;
