import Link from 'next/link'
import { Calendar, Tag, ArrowRight, Clock, FileText } from 'lucide-react'
import { APPS_SCRIPT_URL, BASE_URL } from '@/lib/data'

export const metadata = {
    title: 'Technical Blog | CNC Laser Cutting & Metal Fabrication | RG Tech',
    description: 'Explore technical insights and deep dives into industrial laser cutting, fiber technology, and precision metal fabrication from our experts at RG Tech Chennai.',
    alternates: {
        canonical: '/blog',
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

export default async function BlogPage() {
    const posts = await getPosts()

    return (
        <div className="bg-white min-h-screen">
            {/* Blog Hero */}
            <section className="bg-[#1C3D5A] text-white py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-[#E85A4F]/5 skew-y-3 translate-y-20"></div>
                <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
                    <p className="text-[#E85A4F] font-black text-xs uppercase tracking-[0.4em] mb-4 text-balance">Technical Deep Dives</p>
                    <h1 className="text-4xl md:text-6xl font-black font-heading mb-6 tracking-tight italic">Engineering <span className="text-[#E85A4F]">Insights</span></h1>
                    <p className="text-white/60 max-w-2xl mx-auto text-lg font-medium leading-relaxed italic">
                        Expert perspectives on laser technology, industrial fabrication, and manufacturing optimization.
                    </p>
                </div>
            </section>

            <section className="py-24">
                <div className="max-w-7xl mx-auto px-4">
                    {posts.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {posts.map((post, i) => (
                                <Link 
                                    key={i} 
                                    href={`/blog/${post.slug}`}
                                    className="group bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500"
                                >
                                    <div className="aspect-[16/10] overflow-hidden relative">
                                        <img src={post.image || '/gallery/Sheet Metal Laser Cutting/sm_12.jpg'} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                        <div className="absolute top-6 left-6 flex gap-2">
                                            <span className="px-4 py-1.5 bg-[#1C3D5A] text-[#E85A4F] text-[10px] font-black uppercase tracking-widest rounded-full border border-white/10 backdrop-blur-md">
                                                {post.category || 'Tech Guide'}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-10">
                                        <div className="flex items-center gap-6 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-3.5 h-3.5 text-[#E85A4F]" />
                                                {post.date}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Clock className="w-3.5 h-3.5 text-[#E85A4F]" />
                                                {post.readTime || '5 min read'}
                                            </div>
                                        </div>
                                        <h3 className="text-2xl font-black text-[#1C3D5A] leading-tight mb-6 group-hover:text-[#E85A4F] transition-colors font-heading tracking-tight italic">
                                            {post.title}
                                        </h3>
                                        <p className="text-slate-500 text-[15px] leading-relaxed mb-8 line-clamp-3 font-medium opacity-80">
                                            {post.summary}
                                        </p>
                                        <div className="pt-8 border-t border-slate-50 flex items-center justify-between">
                                            <span className="text-[#E85A4F] font-black text-xs uppercase tracking-widest flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                                                Read Analysis <ArrowRight className="w-3.5 h-3.5" />
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-24 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
                             <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl">
                                <FileText className="w-8 h-8 text-[#E85A4F] animate-pulse" />
                            </div>
                            <h3 className="text-2xl font-black font-heading text-[#1C3D5A] italic mb-4">Awaiting New Engineering <span className="text-[#E85A4F]">Insights</span></h3>
                            <p className="text-slate-500 font-medium max-w-sm mx-auto">
                                Our technical experts are documenting new case studies. Check back soon for the latest manufacturing analysis.
                            </p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    )
}
