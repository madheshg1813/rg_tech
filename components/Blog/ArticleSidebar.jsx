"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
    List, ChevronDown, ArrowRight, Facebook, Linkedin,
    MessageCircle, Mail, Link2, Check,
} from 'lucide-react'

/** Highlights whichever heading is currently nearest the top of the viewport. */
function useActiveHeading(headings) {
    const [activeId, setActiveId] = useState('')

    useEffect(() => {
        if (!headings.length) return
        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
                if (visible[0]) setActiveId(visible[0].target.id)
            },
            // Band near the top of the viewport, so the active item tracks reading position.
            { rootMargin: '-88px 0px -70% 0px', threshold: 0 }
        )
        headings.forEach((h) => {
            const el = document.getElementById(h.id)
            if (el) observer.observe(el)
        })
        return () => observer.disconnect()
    }, [headings])

    return activeId
}

function TableOfContents({ headings }) {
    const [open, setOpen] = useState(true)
    const activeId = useActiveHeading(headings)

    if (!headings.length) return null

    return (
        <nav className="rounded-2xl border border-line bg-white overflow-hidden" aria-label="On this page">
            <button
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left"
            >
                <span className="flex items-center gap-2.5 font-bold text-fg text-[15px]">
                    <List className="w-4 h-4 text-fg-subtle" />
                    In this page
                </span>
                <ChevronDown
                    className={`w-4 h-4 text-fg-subtle transition-transform ${open ? 'rotate-180' : ''}`}
                />
            </button>

            {open && (
                <ul className="px-3 pb-4 space-y-0.5 max-h-[46vh] overflow-y-auto custom-scrollbar">
                    {headings.map((h) => (
                        <li key={h.id}>
                            <a
                                href={`#${h.id}`}
                                aria-current={activeId === h.id ? 'true' : undefined}
                                className={`block rounded-lg px-3 py-2 text-[13.5px] leading-snug transition-colors ${h.level === 3 ? 'pl-7' : ''
                                    } ${activeId === h.id
                                        ? 'bg-[#F59E0B]/10 text-[#B45309] font-bold'
                                        : 'text-fg-muted hover:text-fg hover:bg-surface-2'
                                    }`}
                            >
                                {h.text}
                            </a>
                        </li>
                    ))}
                </ul>
            )}
        </nav>
    )
}

/**
 * "Summarize with AI" — deep links the article URL into each assistant with a
 * pre-filled prompt. Rendered client-side because it needs the live URL.
 */
function SummarizeWithAi({ url, title }) {
    const prompt = `Summarise this article for me: ${title} — ${url}`
    const q = encodeURIComponent(prompt)

    const targets = [
        { name: 'ChatGPT', href: `https://chatgpt.com/?q=${q}` },
        { name: 'Claude', href: `https://claude.ai/new?q=${q}` },
        { name: 'Gemini', href: `https://gemini.google.com/app?q=${q}` },
        { name: 'Perplexity', href: `https://www.perplexity.ai/search?q=${q}` },
    ]

    return (
        <div>
            <p className="text-[11px] font-black uppercase tracking-[0.18em] text-fg-subtle mb-3">
                Summarize with AI
            </p>
            <div className="grid grid-cols-2 gap-2.5">
                {targets.map((t) => (
                    <a
                        key={t.name}
                        href={t.href}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="flex items-center justify-center gap-2 rounded-xl border border-line bg-white px-3 py-2.5 text-[13px] font-semibold text-fg hover:border-[#F59E0B] hover:text-[#B45309] transition-colors"
                    >
                        {t.name}
                    </a>
                ))}
            </div>
        </div>
    )
}

function ShareRail({ url, title }) {
    const [copied, setCopied] = useState(false)
    const u = encodeURIComponent(url)
    const t = encodeURIComponent(title)

    const links = [
        { name: 'Facebook', Icon: Facebook, href: `https://www.facebook.com/sharer/sharer.php?u=${u}` },
        { name: 'LinkedIn', Icon: Linkedin, href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}` },
        { name: 'WhatsApp', Icon: MessageCircle, href: `https://wa.me/?text=${t}%20${u}` },
        { name: 'Email', Icon: Mail, href: `mailto:?subject=${t}&body=${u}` },
    ]

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(url)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch {
            /* clipboard blocked — the share links still work */
        }
    }

    return (
        <div>
            <p className="text-[11px] font-black uppercase tracking-[0.18em] text-fg-subtle mb-3">Share</p>
            <div className="flex flex-wrap gap-2.5">
                {links.map(({ name, Icon, href }) => (
                    <a
                        key={name}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        aria-label={`Share on ${name}`}
                        title={`Share on ${name}`}
                        className="w-10 h-10 rounded-full border border-line bg-white flex items-center justify-center text-fg-muted hover:border-[#F59E0B] hover:text-[#B45309] transition-colors"
                    >
                        <Icon className="w-4 h-4" />
                    </a>
                ))}
                <button
                    onClick={copy}
                    aria-label="Copy link"
                    title={copied ? 'Link copied' : 'Copy link'}
                    className="w-10 h-10 rounded-full border border-line bg-white flex items-center justify-center text-fg-muted hover:border-[#F59E0B] hover:text-[#B45309] transition-colors"
                >
                    {copied ? <Check className="w-4 h-4 text-green-600" /> : <Link2 className="w-4 h-4" />}
                </button>
            </div>
        </div>
    )
}

export default function ArticleSidebar({ headings = [], url, title }) {
    return (
        <aside className="lg:sticky lg:top-28 space-y-5">
            <TableOfContents headings={headings} />

            {/* Conversion card — mirrors the reference layout's sidebar CTA slot */}
            <div className="rounded-2xl bg-[#F59E0B]/10 border border-[#F59E0B]/25 p-6 text-center">
                <p className="font-bold text-fg text-[17px] leading-snug">
                    Skip the guesswork.
                    <br />
                    Send us your drawing.
                </p>
                <p className="text-[13.5px] text-fg-muted mt-2.5 leading-relaxed">
                    CNC fiber laser cutting for MS, SS, aluminium, copper and brass — up to 45&nbsp;mm.
                </p>
                <Link href="/#contact" className="btn btn-primary w-full mt-5">
                    Get a Free Quote <ArrowRight className="w-4 h-4" />
                </Link>
            </div>

            <div className="rounded-2xl border border-line bg-white p-6 space-y-6">
                <SummarizeWithAi url={url} title={title} />
                <ShareRail url={url} title={title} />
            </div>
        </aside>
    )
}
