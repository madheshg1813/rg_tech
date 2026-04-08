import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Calendar, Tag, ChevronLeft, ArrowRight, Clock, Star, Share2, Printer, Mail, MessageCircle } from 'lucide-react'
import { APPS_SCRIPT_URL, BASE_URL, DEFAULT_OG_IMAGE } from '@/lib/data'

export async function generateMetadata({ params }) {
    const slug = await params.slug
    const posts = await getPosts()
    const post = posts.find(p => p.slug === slug)

    if (!post) return {}

    return {
        title: post.metaTitle || post.title,
        description: post.metaDescription || post.summary,
        alternates: {
            canonical: `/blog/${slug}`,
        },
        openGraph: {
            title: post.title,
            description: post.summary,
            images: [post.image || DEFAULT_OG_IMAGE],
            url: `/blog/${slug}`,
            type: 'article',
        }
    }
}

async function getPosts() {
    try {
        const res = await fetch(APPS_SCRIPT_URL, { next: { revalidate: 3600 } })
        if (!res.ok) return []
        const data = await res.json()
        return data.posts || []
    } catch (e) {
        return []
    }
}

export default async function BlogPostPage({ params }) {
    const slug = await params.slug
    const posts = await getPosts()
    const post = posts.find(p => p.slug === slug)

    if (!post) {
        notFound()
    }

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.title,
        "description": post.summary,
        "image": post.image || DEFAULT_OG_IMAGE,
        "author": { "@type": "Organization", "name": "RG Tech Engineering" },
        "datePublished": post.date,
        "publisher": { "@type": "Organization", "name": "RG Tech Engineering" }
    }

    return (
        <article className="bg-[#FAFBFC] min-h-screen">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            
            {/* Post Header */}
            <header className="bg-[#1C3D5A] text-white py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-[#E85A4F]/5 skew-y-3 translate-y-20"></div>
                <div className="max-w-4xl mx-auto px-4 relative z-10">
                    <Link href="/blog" className="inline-flex items-center gap-3 text-[#E85A4F] font-black text-[11px] uppercase tracking-widest mb-10 group bg-white/5 px-6 py-2 rounded-full border border-white/10 hover:bg-white/10 transition-colors">
                        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Analysis
                    </Link>
                    
                    <div className="flex flex-wrap items-center gap-8 text-[11px] font-black text-white/50 uppercase tracking-widest mb-8">
                        <div className="flex items-center gap-3">
                            <Calendar className="w-4 h-4 text-[#E85A4F]" />
                            {post.date}
                        </div>
                        <div className="flex items-center gap-3">
                            <Clock className="w-4 h-4 text-[#E85A4F]" />
                            {post.readTime || '5 min read'}
                        </div>
                        <div className="flex items-center gap-3">
                            <Tag className="w-4 h-4 text-[#E85A4F]" />
                            {post.category || 'Tech Guide'}
                        </div>
                    </div>
                    
                    <h1 className="text-4xl md:text-6xl font-black font-heading leading-tight italic tracking-tight mb-10 text-balance animate-in fade-in slide-in-from-bottom-4 duration-700">
                        {post.title}
                    </h1>

                    <div className="flex flex-wrap gap-4 pt-10 border-t border-white/10">
                        <div className="flex items-center gap-4 py-3 px-6 bg-white/5 rounded-2xl border border-white/10">
                            <div className="w-10 h-10 rounded-full bg-[#E85A4F] flex items-center justify-center font-black text-xs">RG</div>
                            <div>
                                <p className="text-[11px] font-black uppercase tracking-widest">Technical Board</p>
                                <p className="text-[14px] text-white/60 font-medium">Engineering Verified</p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 py-24">
                <div className="grid lg:grid-cols-12 gap-16">
                    {/* Content Column */}
                    <div className="lg:col-span-8">
                        <div className="bg-white rounded-[3rem] p-8 md:p-16 border border-slate-100 shadow-2xl relative">
                            {post.image && (
                                <div className="mb-16 -mt-12 md:-mt-20 group relative overflow-hidden rounded-[2rem] shadow-premium ring-4 ring-white">
                                    <img 
                                        src={post.image} 
                                        alt={post.title} 
                                        className="w-full h-auto object-cover transition-transform duration-[2s] group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                                </div>
                            )}

                            <div 
                                className="blog-content prose prose-lg prose-slate max-w-none prose-headings:font-black prose-headings:font-heading prose-headings:italic prose-headings:tracking-tight prose-p:text-slate-600 prose-p:leading-relaxed prose-strong:text-[#1C3D5A] prose-a:text-[#E85A4F] prose-img:rounded-3xl prose-img:shadow-xl"
                                dangerouslySetInnerHTML={{ __html: post.content }} 
                            />

                            <div className="mt-20 pt-10 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8">
                                <div className="flex items-center gap-6">
                                    <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Analysis Share</p>
                                    <div className="flex gap-3">
                                        {[Share2, Printer, Mail].map((Icon, idx) => (
                                            <button key={idx} className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-[#E85A4F] hover:text-white transition-all">
                                                <Icon className="w-5 h-5" />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {['Engineering', 'Manufacturing', 'Technology'].map(t => (
                                        <span key={t} className="px-4 py-1.5 bg-slate-50 text-slate-500 text-[10px] font-black uppercase tracking-widest rounded-lg border border-slate-100 italic">#{t}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Column */}
                    <aside className="lg:col-span-4 space-y-8">
                        {/* Newsletter/CTA */}
                        <div className="bg-[#1C3D5A] p-10 rounded-[2.5rem] text-white relative overflow-hidden shadow-2xl">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#E85A4F]/10 rounded-full blur-2xl"></div>
                            <h4 className="text-2xl font-black font-heading italic tracking-tight mb-6">Technical Consultation</h4>
                            <p className="text-white/60 mb-10 text-[15px] leading-relaxed font-medium">Need specific engineering analysis for your aerospace or industrial project?</p>
                            <a href="https://wa.me/916380736439?text=I read your blog and need a technical consultation." target="_blank" rel="noopener noreferrer" className="w-full py-5 bg-[#E85A4F] text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:scale-105 transition-all shadow-xl shadow-black/20">
                                <MessageCircle className="w-5 h-5" /> Consult Engineer
                            </a>
                        </div>

                        {/* Recent Analysis Sidebar */}
                        <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm">
                            <h4 className="text-xl font-black text-[#1C3D5A] font-heading italic tracking-tight mb-8">Related Analysis</h4>
                            <div className="space-y-8">
                                {posts.filter(p => p.slug !== slug).slice(0, 4).map((rp, i) => (
                                    <Link key={i} href={`/blog/${rp.slug}`} className="group block">
                                        <p className="text-[10px] font-black text-[#E85A4F] uppercase tracking-widest mb-3">{rp.date}</p>
                                        <h5 className="text-[15px] font-bold text-[#1C3D5A] leading-tight group-hover:text-[#E85A4F] transition-colors line-clamp-2 italic tracking-tight mb-4">{rp.title}</h5>
                                        <div className="flex items-center gap-2 text-[#E85A4F] font-black text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all">
                                            Read Analysis <ArrowRight className="w-3 h-3" />
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </article>
    )
}
