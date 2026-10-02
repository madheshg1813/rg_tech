"use client"

import { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'
import { ZoomIn, MessageCircle, X, ChevronLeft, ChevronRight } from 'lucide-react'

/*
 * The browsable design grid, with a zoom view.
 *
 * This is the page's lead content rather than a decorative hero image: someone
 * looking for a Ganesh panel wants to see panels, not a photograph of a machine.
 * Every card carries its own WhatsApp enquiry that pre-fills the reference
 * number, which is what makes it possible to tell later which patterns sell.
 *
 * Client component because of the zoom view. The page around it stays a server
 * component so the images and copy are still in the server-rendered HTML.
 */

const WA_NUMBER = '916380736439'

const waHref = (designName, ref) =>
    `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
        `Hi RG Tech, I'd like a quote for ${designName} design ${ref}.\n\nSize needed: \nMaterial: \nQuantity: \nDelivery pincode: `
    )}`

export default function DesignGrid({ designName, images }) {
    const [openIndex, setOpenIndex] = useState(null)
    const isOpen = openIndex !== null
    const dialogRef = useRef(null)
    const lastFocused = useRef(null)

    const close = useCallback(() => setOpenIndex(null), [])
    const prev = useCallback(
        () => setOpenIndex((i) => (i === null ? i : (i - 1 + images.length) % images.length)),
        [images.length]
    )
    const next = useCallback(
        () => setOpenIndex((i) => (i === null ? i : (i + 1) % images.length)),
        [images.length]
    )

    const open = (i) => {
        lastFocused.current = document.activeElement
        setOpenIndex(i)
    }

    /* Keyboard: Escape closes, arrows move. */
    useEffect(() => {
        if (!isOpen) return
        const onKey = (e) => {
            if (e.key === 'Escape') close()
            else if (e.key === 'ArrowLeft') prev()
            else if (e.key === 'ArrowRight') next()
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [isOpen, close, prev, next])

    /* Lock the page behind the dialog, and put focus somewhere useful. */
    useEffect(() => {
        if (!isOpen) {
            lastFocused.current?.focus?.()
            return
        }
        const previous = document.body.style.overflow
        document.body.style.overflow = 'hidden'
        dialogRef.current?.focus()
        return () => { document.body.style.overflow = previous }
    }, [isOpen])

    const current = isOpen ? images[openIndex] : null

    return (
        <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                {images.map((img, i) => (
                    <article
                        key={img.ref}
                        className="group bg-white rounded-2xl border border-line shadow-premium overflow-hidden flex flex-col transition-all hover:shadow-xl hover:border-line-strong"
                    >
                        <button
                            type="button"
                            onClick={() => open(i)}
                            aria-label={`Zoom into ${designName} design ${img.ref}`}
                            className="relative block w-full aspect-[4/3] overflow-hidden bg-surface-2 cursor-zoom-in"
                        >
                            <Image
                                src={img.src}
                                alt={`${designName} laser cut metal panel, design ${img.ref}`}
                                fill
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                priority={i < 3}
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <span className="absolute inset-0 bg-ink/0 group-hover:bg-ink/25 transition-colors flex items-center justify-center">
                                <span className="w-11 h-11 rounded-full bg-white/95 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all">
                                    <ZoomIn className="w-5 h-5 text-fg" />
                                </span>
                            </span>
                            <span className="absolute top-3 left-3 meta-label bg-white/95 text-fg px-2.5 py-1 rounded-full shadow-sm">
                                {img.ref}
                            </span>
                        </button>

                        <div className="flex items-center gap-2 p-3 sm:p-4 border-t border-line">
                            <button
                                type="button"
                                onClick={() => open(i)}
                                className="btn btn-secondary-light btn-sm flex-1"
                            >
                                <ZoomIn className="w-4 h-4" /> Preview
                            </button>
                            <a
                                href={waHref(designName, img.ref)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-primary btn-sm flex-1"
                            >
                                <MessageCircle className="w-4 h-4" /> Enquire
                            </a>
                        </div>
                    </article>
                ))}
            </div>

            {isOpen && (
                <div
                    className="on-dark fixed inset-0 z-[100] bg-ink/95 backdrop-blur-xl flex flex-col animate-in fade-in duration-200"
                    role="dialog"
                    aria-modal="true"
                    aria-label={`${designName} design ${current.ref}, ${openIndex + 1} of ${images.length}`}
                    ref={dialogRef}
                    tabIndex={-1}
                    onClick={(e) => { if (e.target === e.currentTarget) close() }}
                >
                    <div className="flex items-center justify-between gap-4 px-4 sm:px-6 py-4 border-b border-white/10">
                        <div className="min-w-0">
                            <p className="meta-label text-white/50">
                                {openIndex + 1} / {images.length}
                            </p>
                            <p className="card-title text-white truncate">
                                {designName} · {current.ref}
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={close}
                            aria-label="Close preview"
                            className="w-11 h-11 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors flex-shrink-0"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="flex-1 min-h-0 flex items-center gap-2 sm:gap-4 px-2 sm:px-6 py-4">
                        {images.length > 1 && (
                            <button
                                type="button"
                                onClick={prev}
                                aria-label="Previous design"
                                className="w-11 h-11 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors flex-shrink-0"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                        )}

                        <div className="relative flex-1 h-full min-h-0 rounded-2xl overflow-hidden bg-white/5">
                            <Image
                                src={current.src}
                                alt={`${designName} laser cut metal panel, design ${current.ref}, enlarged`}
                                fill
                                sizes="90vw"
                                className="object-contain"
                            />
                        </div>

                        {images.length > 1 && (
                            <button
                                type="button"
                                onClick={next}
                                aria-label="Next design"
                                className="w-11 h-11 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors flex-shrink-0"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        )}
                    </div>

                    <div className="px-4 sm:px-6 py-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center gap-3 sm:justify-between">
                        <p className="text-sm text-white/60">
                            Cut to your size in mild steel, stainless or brass. Quote the reference when you enquire.
                        </p>
                        <a
                            href={waHref(designName, current.ref)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary flex-shrink-0"
                        >
                            <MessageCircle className="w-5 h-5" /> Enquire about {current.ref}
                        </a>
                    </div>
                </div>
            )}
        </>
    )
}
