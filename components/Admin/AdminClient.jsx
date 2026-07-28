"use client"
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { 
    LayoutDashboard, FileEdit, Trash2, Globe, Tag, 
    Calendar, Shield, Mail, Phone, MapPin, 
    Upload, Star, MessageCircle, ArrowRight, X, Plus
} from 'lucide-react'
import { APPS_SCRIPT_URL, ADMIN_PASSWORD } from '@/lib/data'

const AdminClient = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [password, setPassword] = useState('')
    const [tab, setTab] = useState('gallery') // 'gallery' | 'blog'
    const [status, setStatus] = useState('')
    const [loading, setLoading] = useState(false)

    const [blogData, setBlogData] = useState({
        title: '', summary: '', content: '', image: '', category: 'Technical Guide',
        metaTitle: '', metaDescription: '', readTime: '5 min read'
    })
    const [galleryData, setGalleryData] = useState({ image: '', title: '', material: '', category: 'Laser Cutting Services' })
    const [posts, setPosts] = useState([])

    useEffect(() => {
        if (isLoggedIn) fetchAdminData()
    }, [isLoggedIn])

    const fetchAdminData = async () => {
        try {
            const res = await fetch(APPS_SCRIPT_URL)
            const data = await res.json()
            setPosts(data.posts || [])
        } catch (e) { console.error(e) }
    }

    const handleLogin = (e) => {
        e.preventDefault()
        if (password === ADMIN_PASSWORD) setIsLoggedIn(true)
        else alert('Invalid Admin Key')
    }

    const handleBlogSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const res = await fetch(APPS_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                body: JSON.stringify({ action: 'addPost', ...blogData })
            })
            setStatus('Post Submitted Successfully (Refreshing...)')
            setTimeout(() => window.location.reload(), 2000)
        } catch (e) { setStatus('Error submitting post') }
        setLoading(false)
    }

    const handleGallerySubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const res = await fetch(APPS_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                body: JSON.stringify({ action: 'addGallery', ...galleryData })
            })
            setStatus('Gallery Item Submitted (Refreshing...)')
            setTimeout(() => window.location.reload(), 2000)
        } catch (e) { setStatus('Error submitting') }
        setLoading(false)
    }

    const handleDeleteBlog = async (postSlug) => {
        if (!confirm('Delete this analysis?')) return
        try {
            await fetch(APPS_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                body: JSON.stringify({ action: 'deletePost', slug: postSlug })
            })
            setStatus('Deleted (Refreshing...)')
            setTimeout(() => window.location.reload(), 2000)
        } catch (e) { console.error(e) }
    }

    if (!isLoggedIn) {
        return (
            <div className="on-dark min-h-screen surface-dark flex items-center justify-center p-6">
                <div className="on-light w-full max-w-[440px] bg-white rounded-[2.5rem] shadow-2xl p-10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#F59E0B]/5 rounded-full blur-2xl"></div>
                    <div className="text-center mb-10">
                        <div className="w-16 h-16 bg-ink-2 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-[#0F2A44]/20 transform -rotate-6">
                            <Shield className="w-8 h-8 text-accent" />
                        </div>
                        <p className="text-accent font-black text-[10px] uppercase tracking-[0.4em] mb-4">Secure Gateway</p>
                        <h2 className="text-3xl font-black text-[#0F2A44] font-heading italic">Admin <span className="text-accent">Access</span></h2>
                    </div>
                    <form onSubmit={handleLogin} className="space-y-6">
                        <input
                            type="password"
                            placeholder="Enter Industrial Authorization Key"
                            className="w-full px-6 py-5 rounded-2xl bg-surface-2 border border-line focus:bg-white focus:border-[#F59E0B] focus:ring-4 focus:ring-[#F59E0B]/10 transition-all outline-none text-center font-bold text-fg-muted"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button type="submit" className="btn btn-primary w-full group">
                            Validate Credentials <ArrowRight className="inline-block ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#FAFBFC]">
            {/* Admin Nav */}
            <div className="bg-white border-b border-line px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-6 fixed top-0 w-full z-50">
                <div className="flex items-center gap-6">
                    <div className="bg-ink-2 px-5 py-2.5 rounded-xl flex items-center gap-3">
                        <Shield className="w-5 h-5 text-accent" />
                        <span className="text-white font-black text-[10px] uppercase tracking-[0.2em]">Engineering Control Panel</span>
                    </div>
                    <div className="flex gap-1 h-10 bg-surface-2 p-1 rounded-xl">
                        <button onClick={() => setTab('gallery')} className={`px-6 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${tab === 'gallery' ? 'bg-white text-accent shadow-sm' : 'text-fg-subtle hover:text-[#0F2A44]'}`}>Gallery</button>
                        <button onClick={() => setTab('blog')} className={`px-6 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${tab === 'blog' ? 'bg-white text-accent shadow-sm' : 'text-fg-subtle hover:text-[#0F2A44]'}`}>Technical Blog</button>
                    </div>
                </div>
                {status && (
                    <div className="px-6 py-2.5 bg-[#F59E0B]/10 border border-[#F59E0B]/10 text-accent text-[10px] font-black uppercase tracking-widest rounded-full animate-pulse">
                        {status}
                    </div>
                )}
            </div>

            <div className="max-w-7xl mx-auto px-6 pt-32 pb-24">
                {tab === 'gallery' ? (
                    <div className="grid lg:grid-cols-12 gap-12">
                        <div className="lg:col-span-5">
                            <div className="bg-white p-10 rounded-[2.5rem] border border-line shadow-premium sticky top-32">
                                <h3 className="text-2xl font-black text-[#0F2A44] font-heading italic mb-8">Add to <span className="text-accent">Portfolio</span></h3>
                                <form onSubmit={handleGallerySubmit} className="space-y-5">
                                    <input type="text" placeholder="Design Title" className="w-full px-6 py-4 rounded-xl bg-surface-2 border border-line focus:bg-white outline-none transition-all text-sm font-bold" value={galleryData.title} onChange={(e) => setGalleryData({ ...galleryData, title: e.target.value })} required />
                                    <input type="url" placeholder="Image URL (Unsplash or Static)" className="w-full px-6 py-4 rounded-xl bg-surface-2 border border-line focus:bg-white outline-none transition-all text-sm font-bold" value={galleryData.image} onChange={(e) => setGalleryData({ ...galleryData, image: e.target.value })} required />
                                    <input type="text" placeholder="Material (e.g. 5mm Mirror SS)" className="w-full px-6 py-4 rounded-xl bg-surface-2 border border-line focus:bg-white outline-none transition-all text-sm font-bold" value={galleryData.material} onChange={(e) => setGalleryData({ ...galleryData, material: e.target.value })} required />
                                    <select className="w-full px-6 py-4 rounded-xl bg-surface-2 border border-line focus:bg-white outline-none transition-all text-sm font-bold appearance-none" value={galleryData.category} onChange={(e) => setGalleryData({ ...galleryData, category: e.target.value })}>
                                        <option>Laser Cutting Services</option>
                                        <option>Sheet Metal Laser Cutting</option>
                                        <option>Fabrication Services</option>
                                        <option>Steel Gates</option>
                                        <option>Metal Safety Doors</option>
                                        <option>Decorative Metal Panels</option>
                                    </select>
                                    <button type="submit" disabled={loading} className="btn btn-primary w-full">
                                        Publish to Library
                                    </button>
                                </form>
                            </div>
                        </div>
                        <div className="lg:col-span-7">
                            <div className="bg-surface-2 p-10 rounded-[2.5rem] border border-line-strong border-dashed text-center">
                                <p className="text-fg-subtle font-bold italic">Gallery list management currently syncs directly with data.js via the Apps Script backend.</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-12">
                        <div className="bg-white p-12 rounded-[3rem] border border-line shadow-premium">
                            <h3 className="text-2xl font-black text-[#0F2A44] font-heading italic mb-10">Write New <span className="text-accent">Technical Analysis</span></h3>
                            <form onSubmit={handleBlogSubmit} className="space-y-8">
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="space-y-6">
                                        <input type="text" placeholder="Post Title" className="w-full px-6 py-5 rounded-2xl bg-surface-2 border border-line focus:bg-white outline-none transition-all font-bold" value={blogData.title} onChange={(e) => setBlogData({ ...blogData, title: e.target.value })} required />
                                        <textarea placeholder="Technical Summary (Short text for cards)" className="w-full px-6 py-5 rounded-2xl bg-surface-2 border border-line focus:bg-white outline-none transition-all font-bold min-h-[120px]" value={blogData.summary} onChange={(e) => setBlogData({ ...blogData, summary: e.target.value })} required></textarea>
                                        <input type="url" placeholder="Featured Image URL" className="w-full px-6 py-5 rounded-2xl bg-surface-2 border border-line focus:bg-white outline-none transition-all font-bold" value={blogData.image} onChange={(e) => setBlogData({ ...blogData, image: e.target.value })} required />
                                    </div>
                                    <div className="space-y-6">
                                        <input type="text" placeholder="SEO Meta Title" className="w-full px-6 py-5 rounded-2xl bg-surface-2 border border-line focus:bg-white outline-none transition-all font-bold" value={blogData.metaTitle} onChange={(e) => setBlogData({ ...blogData, metaTitle: e.target.value })} />
                                        <textarea placeholder="SEO Meta Description" className="w-full px-6 py-5 rounded-2xl bg-surface-2 border border-line focus:bg-white outline-none transition-all font-bold min-h-[120px]" value={blogData.metaDescription} onChange={(e) => setBlogData({ ...blogData, metaDescription: e.target.value })}></textarea>
                                        <div className="grid grid-cols-2 gap-4">
                                            <input type="text" placeholder="Category" className="w-full px-6 py-5 rounded-2xl bg-surface-2 border border-line focus:bg-white outline-none transition-all font-bold" value={blogData.category} onChange={(e) => setBlogData({ ...blogData, category: e.target.value })} />
                                            <input type="text" placeholder="Read Time" className="w-full px-6 py-5 rounded-2xl bg-surface-2 border border-line focus:bg-white outline-none transition-all font-bold" value={blogData.readTime} onChange={(e) => setBlogData({ ...blogData, readTime: e.target.value })} />
                                        </div>
                                    </div>
                                </div>
                                <textarea placeholder="Analysis Content (Supports HTML)" className="w-full px-8 py-8 rounded-[2rem] bg-surface-2 border border-line focus:bg-white outline-none transition-all font-medium min-h-[400px] font-mono text-sm leading-relaxed" value={blogData.content} onChange={(e) => setBlogData({ ...blogData, content: e.target.value })} required></textarea>
                                <button type="submit" disabled={loading} className="btn btn-primary btn-lg w-full">
                                    {loading ? 'Processing Industrial Upload...' : 'Publish Technical Analysis'}
                                </button>
                            </form>
                        </div>

                        <div className="space-y-6">
                            <h4 className="text-xl font-black text-[#0F2A44] font-heading italic pl-2">Live Insights Control</h4>
                            <div className="grid gap-4">
                                {posts.map((post, i) => (
                                    <div key={i} className="bg-white p-6 rounded-2xl border border-line flex items-center justify-between group hover:shadow-xl transition-all">
                                        <div className="flex items-center gap-6">
                                            <div className="w-12 h-12 rounded-xl bg-surface-2 overflow-hidden border border-line relative">
                                                <Image src={post.image} alt={`Featured image thumbnail for blog post: ${post.title}`} fill sizes="48px" className="object-cover" />
                                            </div>
                                            <div>
                                                <p className="font-black text-[#0F2A44] text-sm group-hover:text-accent transition-colors italic">{post.title}</p>
                                                <p className="text-[10px] text-fg-subtle font-bold uppercase tracking-widest mt-1">{post.date} • {post.category}</p>
                                            </div>
                                        </div>
                                        <button onClick={() => handleDeleteBlog(post.slug)} className="p-3 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default AdminClient;
