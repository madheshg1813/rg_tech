"use client";

import { useState } from 'react'
import { X, FileText, Download, ArrowRight, CheckCircle } from 'lucide-react'
import { catalogues } from '@/lib/data'

const CatalogueModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({ name: '', phone: '' })
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (formData.name && formData.phone) {
            setSubmitted(true)
        }
    }

    const handleDownload = (catalogueFile) => {
        window.open(catalogueFile, '_blank')
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in">
            <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
                <div className="sticky top-0 bg-gradient-to-r from-[#1C3D5A] to-[#E85A4F] p-6 rounded-t-3xl">
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="text-2xl font-bold text-white">Download Catalogues</h3>
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
                                <label className="block text-sm font-bold text-gray-700 mb-2">Your Name *</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#E85A4F] focus:ring-4 focus:ring-[#E85A4F]/10 outline-none transition-all"
                                    placeholder="Enter your full name"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number *</label>
                                <input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#E85A4F] focus:ring-4 focus:ring-[#E85A4F]/10 outline-none transition-all"
                                    placeholder="Enter your phone number"
                                    pattern="[0-9]{10}"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-[#E85A4F] text-white py-4 rounded-xl font-bold hover:bg-[#D44E45] transition-all shadow-lg shadow-[#E85A4F]/20 flex items-center justify-center gap-2"
                            >
                                Continue to Download <ArrowRight className="w-5 h-5" />
                            </button>
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
                                    <div key={idx} className="border-2 border-gray-200 rounded-xl p-4 hover:border-[#E85A4F] transition-all group">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 rounded-xl bg-[#E85A4F]/10 flex items-center justify-center group-hover:bg-[#E85A4F]/20 transition-colors">
                                                    <FileText className="w-6 h-6 text-[#E85A4F]" />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-900">{cat.name}</p>
                                                    <p className="text-sm text-gray-500">{cat.size}</p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => handleDownload(cat.file)}
                                                className="bg-[#E85A4F] text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-[#D44E45] transition-all flex items-center gap-2 shadow-md"
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
