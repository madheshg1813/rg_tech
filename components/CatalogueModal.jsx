"use client";

import { useState } from 'react'
import { X, FileText, Download, ArrowRight, CheckCircle } from 'lucide-react'
import { catalogues } from '@/lib/data'

const CatalogueModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({ name: '', phone: '' })
    const [submitted, setSubmitted] = useState(false)
    const [sending, setSending] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!formData.name || !formData.phone) return

        setSending(true)
        setError('')
        try {
            const res = await fetch('/api/enquiry', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    service: 'Catalogue download',
                    source: 'catalogue-modal',
                    page: typeof window !== 'undefined' ? window.location.pathname : '',
                }),
            })
            const data = await res.json().catch(() => ({}))
            if (!res.ok || !data.ok) {
                setError(data.error || 'Could not save your details. Please try again.')
                return
            }
            setSubmitted(true)
        } catch {
            setError('Network problem. Please try again.')
        } finally {
            setSending(false)
        }
    }

    const handleDownload = (catalogueFile) => {
        window.open(catalogueFile, '_blank')
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in">
            <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
                <div className="on-dark sticky top-0 surface-dark p-6 rounded-t-3xl">
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="subsection-title text-white">Download Catalogues</h3>
                            <p className="text-white/80 text-sm mt-1">Get our complete product catalogues</p>
                        </div>
                        <button onClick={onClose} className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                            <X className="w-5 h-5 text-white" />
                        </button>
                    </div>
                </div>

                <div className="p-6">
                    {!submitted ? (
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-sm font-bold text-fg-muted mb-2">Your Name *</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-3 border-2 border-line rounded-xl focus:border-cta focus:ring-4 focus:ring-[#F59E0B]/10 outline-none transition-all"
                                    placeholder="Enter your full name"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-fg-muted mb-2">Phone Number *</label>
                                <input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full px-4 py-3 border-2 border-line rounded-xl focus:border-cta focus:ring-4 focus:ring-[#F59E0B]/10 outline-none transition-all"
                                    placeholder="Enter your phone number"
                                    pattern="[0-9]{10}"
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary w-full" disabled={sending}>
                                {sending ? 'Saving…' : <>Continue to Download <ArrowRight className="w-5 h-5" /></>}
                            </button>

                            {error && (
                                <p role="alert" className="text-sm font-medium text-red-700 bg-red-50 border border-red-200 rounded-xl p-3">
                                    {error}
                                </p>
                            )}
                        </form>
                    ) : (
                        <div className="space-y-4">
                            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 mb-6">
                                <div className="flex items-center gap-3">
                                    <CheckCircle className="w-6 h-6 text-green-600" />
                                    <div>
                                        <p className="font-bold text-green-900">Thank you, {formData.name}!</p>
                                        <p className="text-sm text-green-700">Download any catalogue below</p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid gap-3">
                                {catalogues.map((cat, idx) => (
                                    <div key={idx} className="border-2 border-line rounded-xl p-4 hover:border-cta transition-all group">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 rounded-xl bg-cta/10 flex items-center justify-center group-hover:bg-cta/20 transition-colors">
                                                    <FileText className="w-6 h-6 text-accent" />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-fg">{cat.name}</p>
                                                    <p className="text-sm text-fg-subtle">{cat.size}</p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => handleDownload(cat.file)}
                                                className="btn btn-primary btn-sm"
                                            >
                                                <Download className="w-4 h-4" /> Download
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default CatalogueModal;
