import { useState, useEffect } from 'react'
import { Routes, Route, Link, useLocation, useParams, useSearchParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Phone, Mail, MapPin, Clock, ChevronDown, ChevronRight, ChevronLeft, ArrowRight, Send, Upload, Star, MessageCircle, Menu, X, Shield, Target, Zap, Wrench, Building2, Paintbrush, Users, Factory, Cpu, Wind, CheckCircle, FileText, Package, Truck, Eye, Settings, DoorOpen, Layers, PanelTop, Scissors, Ruler, Sparkles, Plus, Minus, Home, Download, LayoutDashboard, Languages, FileEdit, Trash2, Globe, Search, Calendar, Tag } from 'lucide-react'

// --- Constants ---

const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbycIMpfSHcJ3gjpZJ-UMDCgFloRFLvZULBMWm5AHSkND0ZJtfa_eZBAMJNraImE_t1d/exec'
const ADMIN_PASSWORD = 'RGTECH2026'
const BASE_URL = 'https://www.rgtechengineeringworks.com'
const DEFAULT_OG_IMAGE = `${BASE_URL}/gallery/Sheet%20Metal%20Laser%20Cutting/sm_12.jpg`

const CHENNAI_LOCALITIES = [
    "Adyar", "Alandur", "Alwarpet", "Ambattur", "Aminjikarai", "Anna Nagar", "Arumbakkam",
    "Ashok Nagar", "Avadi", "Chetpet", "Chrompet", "Ekkatuthangal", "Gerugambakkam",
    "Guindy", "Kattupakkam", "Koyambedu", "Mangadu", "Medavakkam", "Nanganallur",
    "Nungambakkam", "OMR", "Palavanthangal", "Pallavaram", "Perungudi", "Poonamallee",
    "Porur", "Ramapuram", "Saidapet", "Sembakkam", "Shenoy Nagar", "T Nagar",
    "Tambaram", "Thirumudivakkam", "Tidel Park", "Velachery"
]

const SERVICE_IMAGE_POOLS = {
    'laser-cutting-services': [
        '/gallery/Laser Cutting Services/kw_fiber_hd.png',
        '/gallery/Laser Cutting Services/kw_cnc_machine_hd.png',
        '/gallery/Laser Cutting Services/kw_aluminum_hd.png',
        '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_10.jpg'
    ],
    'sheet-metal-laser-cutting-services': [
        '/gallery/Sheet Metal Laser Cutting/sm_01.jpg',
        '/gallery/Sheet Metal Laser Cutting/sm_02.jpg',
        '/gallery/Sheet Metal Laser Cutting/sm_03.jpg',
        '/gallery/Sheet Metal Laser Cutting/sm_12.jpg'
    ],
    'fabrication-services': [
        '/gallery/Fabrication Services/RG-Tech-Catelog-vol-4_page-0016.jpg',
        '/gallery/Fabrication Services/RG-Tech-Catelog-vol-4_page-0018.jpg',
        '/gallery/Fabrication Services/RG-Tech-Catelog-vol-4_page-0008.jpg',
        '/gallery/Fabrication Services/RG-Tech-Catelog-vol-4_page-0010.jpg'
    ],
    'steel-gates': [
        '/gallery/Steel Gates/RG-Tech-Catelog-vol-4_page-0120.jpg',
        '/gallery/Steel Gates/RG-Tech-Catelog-vol-4_page-0125.jpg',
        '/gallery/Steel Gates/RG-Tech-Catelog-vol-4_page-0129.jpg',
        '/gallery/Steel Gates/RG-Tech-Catelog-vol-4_page-0135.jpg'
    ],
    'metal-safety-doors': [
        '/gallery/Metal Safety Doors/premium-quality-are-made-of-heavy-duty-stainless-steel-safety-doors--144.jpg',
        '/gallery/Metal Safety Doors/mild-steel-hinged-safety-door.jpg',
        '/gallery/Metal Safety Doors/7x3-5-feet-18-3-kilograms-paint-coated-mild-steel-safety-doors-466.jpg',
        '/gallery/Metal Safety Doors/1-13.jpg'
    ],
    'decorative-metal-panels': [
        '/gallery/Decorative Metal Panels/RG-Tech-Catelog-Vol-02_page-0054.jpg',
        '/gallery/Decorative Metal Panels/RG-Tech-Catelog-Vol-02_page-0062.jpg',
        '/gallery/Decorative Metal Panels/RG-Tech-Catelog-Vol-02_page-0004.jpg',
        '/gallery/Decorative Metal Panels/RG-Tech-Catelog-Vol-02_page-0011.jpg'
    ]
}

// --- Components ---

const CatalogueModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({ name: '', phone: '' })
    const [submitted, setSubmitted] = useState(false)

    const catalogues = [
        { name: 'RG Tech Catalogue Vol-01', file: '/catalogues/RG-Tech-Catelog-Vol-01.pdf', size: '28 MB' },
        { name: 'RG Tech Catalogue Vol-02', file: '/catalogues/RG-Tech-Catelog-Vol-02.pdf', size: '36 MB' },
        { name: 'RG Tech Catalogue Vol-03', file: '/catalogues/RG_Tech-Vol.03.pdf', size: '4 MB' },
        { name: 'RG Tech Catalogue Vol-04', file: '/catalogues/RG-Tech-Catelog-vol-4.pdf', size: '35 MB' }
    ]

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
                <div className="sticky top-0 bg-gradient-to-r from-primary to-accent p-6 rounded-t-3xl">
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
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-accent focus:ring-4 focus:ring-accent/10 outline-none transition-all"
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
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-accent focus:ring-4 focus:ring-accent/10 outline-none transition-all"
                                    placeholder="Enter your phone number"
                                    pattern="[0-9]{10}"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-accent text-white py-4 rounded-xl font-bold hover:bg-accent-dark transition-all shadow-lg shadow-accent/20 flex items-center justify-center gap-2"
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
                                    <div key={idx} className="border-2 border-gray-200 rounded-xl p-4 hover:border-accent transition-all group">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                                                    <FileText className="w-6 h-6 text-accent" />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-900">{cat.name}</p>
                                                    <p className="text-sm text-gray-500">{cat.size}</p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => handleDownload(cat.file)}
                                                className="bg-accent text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-accent-dark transition-all flex items-center gap-2 shadow-md"
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

// --- Blog Components ---

const BlogPage = () => {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch(APPS_SCRIPT_URL)
                const data = await res.json()
                if (data.posts) setPosts(data.posts)
                else setPosts([])
            } catch (e) { console.error('Blog fetch failed', e) }
            setLoading(false)
        }
        fetchPosts()
    }, [])

    return (
        <div className="bg-slate-50 min-h-screen pt-32 pb-20">
            <Helmet>
                <title>Engineering Blog | RG Tech Engineering Works Chennai</title>
                <meta name="description" content="Technical insights on fiber laser cutting, CNC processing, and metal fabrication from the experts at RG Tech Engineering Chennai." />
                <link rel="canonical" href={`${BASE_URL}/blog`} />
                <meta property="og:title" content="Engineering Blog | RG Tech Engineering Works Chennai" />
                <meta property="og:description" content="Technical insights on fiber laser cutting, CNC processing, and metal fabrication from the experts at RG Tech Engineering Chennai." />
                <meta property="og:image" content={DEFAULT_OG_IMAGE} />
                <meta property="og:url" content={`${BASE_URL}/blog`} />
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="RG Tech Engineering Works" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Engineering Blog | RG Tech Engineering Works Chennai" />
                <meta name="twitter:description" content="Technical insights on fiber laser cutting, CNC processing, and metal fabrication from the experts at RG Tech Engineering Chennai." />
                <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
            </Helmet>
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                    <p className="text-accent font-black text-xs uppercase tracking-[0.3em] mb-4">Insights & News</p>
                    <h1 className="text-4xl md:text-6xl font-black text-primary font-heading tracking-tight">Technical Mastery</h1>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-32">
                        <div className="w-16 h-16 border-4 border-slate-100 border-t-accent rounded-full animate-spin"></div>
                        <p className="mt-6 text-primary/40 font-bold uppercase tracking-widest text-xs">Accessing Knowledge Base...</p>
                    </div>
                ) : posts.length > 0 ? (
                    <div className="grid md:grid-cols-3 gap-8">
                        {posts.map((post, i) => (
                            <div key={i} className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group border border-slate-100">
                                <div className="aspect-[16/10] relative overflow-hidden">
                                    <img src={post.image || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158'} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                    <div className="absolute top-6 left-6 bg-white/90 backdrop-blur px-4 py-1.5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-accent shadow-sm">{post.category}</div>
                                </div>
                                <div className="p-10">
                                    <div className="flex items-center gap-3 text-primary/40 text-[11px] mb-6 font-bold uppercase tracking-wider">
                                        <Calendar className="w-3.5 h-3.5" /> {post.date}
                                    </div>
                                    <h3 className="text-2xl font-bold text-primary mb-6 font-heading leading-tight group-hover:text-accent transition-colors">{post.title}</h3>
                                    <p className="text-primary/60 text-[15px] leading-relaxed line-clamp-3 mb-10">{post.summary}</p>
                                    <Link to={`/blog/${post.slug}`} className="inline-flex items-center gap-3 bg-slate-50 text-primary px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-accent hover:text-white transition-all shadow-sm">
                                        Read Analysis <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-24 bg-white rounded-[3rem] border border-slate-100 max-w-2xl mx-auto shadow-sm">
                        <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-8">
                            <FileText className="w-10 h-10 text-slate-200" />
                        </div>
                        <h3 className="text-2xl font-bold text-primary font-heading">Archiving Knowledge</h3>
                        <p className="text-primary/40 mt-3 font-medium">New engineering case studies are being drafted. Check back soon.</p>
                    </div>
                )}
            </div>
        </div>
    )
}

const BlogPostPage = () => {
    const { slug } = useParams()
    const [post, setPost] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await fetch(APPS_SCRIPT_URL)
                const data = await res.json()
                if (data.posts) {
                    const found = data.posts.find(p => p.slug === slug)
                    setPost(found)
                }
            } catch (e) { console.error('Post fetch failed', e) }
            setLoading(false)
        }
        fetchPost()
        window.scrollTo(0, 0)
    }, [slug])

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="w-12 h-12 border-4 border-slate-100 border-t-accent rounded-full animate-spin"></div>
        </div>
    )

    if (!post) return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4">
            <div className="bg-white p-12 rounded-[3rem] shadow-sm text-center max-w-md border border-slate-100">
                <Search className="w-16 h-16 text-slate-100 mx-auto mb-8" />
                <h2 className="text-2xl font-bold text-primary font-heading">Article Not Found</h2>
                <p className="text-primary/50 mt-4 mb-8">The engineering insight you're looking for might have been moved or archived.</p>
                <Link to="/blog" className="inline-flex items-center gap-3 bg-accent text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-accent-dark transition-all shadow-xl shadow-accent/20">
                    Back to Blog <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </div>
    )

    const postTitle = post.metaTitle || post.title
    const postDesc = post.metaDescription || post.summary
    const postImage = post.image || DEFAULT_OG_IMAGE
    const postCanonical = `${BASE_URL}/blog/${slug}`

    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": postTitle,
        "description": postDesc,
        "image": postImage,
        "datePublished": post.date,
        "author": { "@type": "Organization", "name": "RG Tech Engineering Works", "url": BASE_URL },
        "publisher": {
            "@type": "Organization",
            "name": "RG Tech Engineering Works",
            "logo": { "@type": "ImageObject", "url": `${BASE_URL}/RG-Tech-Logo.png` }
        },
        "mainEntityOfPage": { "@type": "WebPage", "@id": postCanonical }
    }

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": `${BASE_URL}/` },
            { "@type": "ListItem", "position": 2, "name": "Blog", "item": `${BASE_URL}/blog` },
            { "@type": "ListItem", "position": 3, "name": post.title, "item": postCanonical }
        ]
    }

    return (
        <div className="bg-white min-h-screen pt-32 pb-32">
            <Helmet>
                <title>{postTitle} | RG Tech Blog</title>
                <meta name="description" content={postDesc} />
                <link rel="canonical" href={postCanonical} />
                <meta property="og:title" content={`${postTitle} | RG Tech Blog`} />
                <meta property="og:description" content={postDesc} />
                <meta property="og:image" content={postImage} />
                <meta property="og:url" content={postCanonical} />
                <meta property="og:type" content="article" />
                <meta property="og:site_name" content="RG Tech Engineering Works" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={`${postTitle} | RG Tech Blog`} />
                <meta name="twitter:description" content={postDesc} />
                <meta name="twitter:image" content={postImage} />
                <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
                <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
            </Helmet>

            <article className="max-w-4xl mx-auto px-4">
                <div className="mb-12">
                    <div className="flex items-center gap-4 mb-6">
                        <span className="bg-accent/10 text-accent px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">{post.category}</span>
                        <div className="flex items-center gap-2 text-primary/30 text-[11px] font-bold uppercase tracking-wider">
                            <Calendar className="w-3.5 h-3.5" /> {post.date}
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-primary font-heading leading-tight mb-8 tracking-tight">{post.title}</h1>
                    <div className="aspect-[21/9] rounded-[2.5rem] overflow-hidden shadow-2xl mb-16 border border-slate-100">
                        <img src={post.image || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158'} alt={post.title} className="w-full h-full object-cover" />
                    </div>
                </div>

                <div className="prose prose-slate prose-lg max-w-none text-primary/80 leading-[1.8] font-medium 
                    prose-headings:font-heading prose-headings:text-primary prose-headings:font-black prose-headings:tracking-tight
                    prose-strong:text-primary prose-strong:font-bold
                    prose-img:rounded-[2rem] prose-img:shadow-xl
                    prose-a:text-accent prose-a:no-underline hover:prose-a:underline
                "
                    dangerouslySetInnerHTML={{ __html: post.content }} />

                <div className="mt-20 pt-16 border-t border-slate-100">
                    <div className="bg-slate-50 p-12 rounded-[3rem] flex flex-col md:flex-row items-center justify-between gap-10 border border-slate-100/50">
                        <div className="max-w-md">
                            <h4 className="text-2xl font-black text-primary font-heading mb-3">Professional Engineering Consultation</h4>
                            <p className="text-primary/60 text-sm font-medium">Need precision laser cutting for your next project? Get a tech-verified quote today.</p>
                        </div>
                        <a href="https://wa.me/916380736439" className="whitespace-nowrap bg-primary text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-accent transition-all shadow-xl shadow-primary/20">
                            Start Project Hub
                        </a>
                    </div>
                </div>
            </article>
        </div>
    )
}

// --- Admin Component ---

const AdminPage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [password, setPassword] = useState('')
    const [tab, setTab] = useState('gallery') // 'gallery' | 'blog'
    const [status, setStatus] = useState('')
    const [loading, setLoading] = useState(false)

    // Form States
    const [blogData, setBlogData] = useState({
        title: '', category: 'Industry News', summary: '', content: '', image: '', slug: '',
        metaTitle: '', metaDescription: '', date: new Date().toLocaleDateString('en-GB')
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
            if (data.posts) setPosts(data.posts)
        } catch (e) { console.error('Admin fetch failed', e) }
    }

    const handleLogin = (e) => {
        e.preventDefault()
        if (password === ADMIN_PASSWORD) setIsLoggedIn(true)
        else alert('Invalid Authorization')
    }

    const handleBlogSubmit = async (e) => {
        e.preventDefault()
        setStatus('publishing')
        try {
            await fetch(APPS_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors', // Apps Script requires no-cors for simple redirects
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type: 'blog', password: ADMIN_PASSWORD, ...blogData })
            })
            setStatus('success')
            setBlogData({ title: '', category: 'Industry News', summary: '', content: '', image: '', slug: '', metaTitle: '', metaDescription: '', date: new Date().toLocaleDateString('en-GB') })
            setTimeout(() => setStatus(''), 3000)
            fetchAdminData()
        } catch (e) { setStatus('error') }
    }

    const handleGallerySubmit = async (e) => {
        e.preventDefault()
        setStatus('publishing')
        try {
            await fetch(APPS_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type: 'gallery', password: ADMIN_PASSWORD, ...galleryData })
            })
            setStatus('success')
            setGalleryData({ image: '', title: '', material: '', category: 'Laser Cutting Services' })
            setTimeout(() => setStatus(''), 3000)
        } catch (e) { setStatus('error') }
    }

    const handleDeleteBlog = async (postSlug) => {
        if (!confirm('Permanent deletion. Proceed?')) return
        setStatus('deleting')
        try {
            await fetch(APPS_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type: 'delete_blog', password: ADMIN_PASSWORD, slug: postSlug })
            })
            setStatus('success')
            setTimeout(() => setStatus(''), 3000)
            fetchAdminData()
        } catch (e) { setStatus('error') }
    }

    if (!isLoggedIn) return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
            <div className="bg-white/5 backdrop-blur-xl p-12 rounded-[3.5rem] w-full max-w-md border border-white/10 shadow-2xl">
                <div className="text-center mb-10">
                    <div className="w-20 h-20 bg-accent rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-accent/20">
                        <Shield className="w-10 h-10 text-white" />
                    </div>
                    <h2 className="text-3xl font-black text-white font-heading tracking-tight">RG TECH <span className="text-accent">OS</span></h2>
                    <p className="text-white/40 text-[11px] font-bold uppercase tracking-[0.3em] mt-2">Authorization Required</p>
                </div>
                <form onSubmit={handleLogin} className="space-y-6">
                    <input
                        type="password"
                        placeholder="Security Token"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white outline-none focus:ring-2 focus:ring-accent/50 transition-all font-mono"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit" className="w-full bg-white text-slate-900 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-accent hover:text-white transition-all shadow-xl">
                        Unlock System Console
                    </button>
                </form>
            </div>
        </div>
    )

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Sidebar */}
            <aside className="w-72 bg-primary text-white p-8 flex flex-col fixed h-full shadow-2xl z-20">
                <div className="flex items-center gap-3 mb-16">
                    <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center">
                        <Settings className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h2 className="font-black text-sm tracking-widest uppercase">Console</h2>
                        <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest leading-none">Management</p>
                    </div>
                </div>

                <nav className="space-y-3 flex-grow">
                    <button
                        onClick={() => setTab('gallery')}
                        className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${tab === 'gallery' ? 'bg-accent text-white shadow-xl shadow-accent/20' : 'text-white/40 hover:bg-white/5 hove:text-white'}`}
                    >
                        <Layers className="w-4 h-4" /> Gallery Hub
                    </button>
                    <button
                        onClick={() => setTab('blog')}
                        className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${tab === 'blog' ? 'bg-accent text-white shadow-xl shadow-accent/20' : 'text-white/40 hover:bg-white/5 hover:text-white'}`}
                    >
                        <FileEdit className="w-4 h-4" /> Content CMS
                    </button>
                </nav>

                <div className="pt-8 border-t border-white/5 mt-auto">
                    <button onClick={() => setIsLoggedIn(false)} className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-widest text-red-400 hover:bg-red-400/10 transition-all">
                        <X className="w-4 h-4" /> System Lock
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-grow ml-72 p-12">
                <header className="flex justify-between items-center mb-16 px-4">
                    <div>
                        <h1 className="text-4xl font-black text-primary font-heading tracking-tight">
                            {tab === 'gallery' ? 'Project Showroom' : 'Technical Insights'}
                        </h1>
                        <p className="text-primary/40 font-bold uppercase tracking-widest text-[10px] mt-2">Updating live site content...</p>
                    </div>
                    {status && (
                        <div className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest animate-pulse ${status === 'publishing' || status === 'deleting' ? 'bg-amber-100 text-amber-600' : status === 'success' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                            {status === 'publishing' ? 'Transmitting Data...' : status === 'deleting' ? 'Purging Entry...' : status === 'success' ? 'Success: Cache Purged' : 'Critical Failure'}
                        </div>
                    )}
                </header>

                {tab === 'gallery' ? (
                    <div className="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-sm max-w-4xl">
                        <form onSubmit={handleGallerySubmit} className="space-y-8">
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-primary/40 uppercase tracking-widest ml-4">Item Identification</label>
                                    <input type="text" placeholder="Entry Title (e.g. Spiral Staircase)" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-medium outline-none focus:ring-2 focus:ring-accent/20" value={galleryData.title} onChange={e => setGalleryData({ ...galleryData, title: e.target.value })} required />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-primary/40 uppercase tracking-widest ml-4">Material Grade</label>
                                    <input type="text" placeholder="Grade (e.g. SS 316, 20mm MS)" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-medium outline-none focus:ring-2 focus:ring-accent/20" value={galleryData.material} onChange={e => setGalleryData({ ...galleryData, material: e.target.value })} required />
                                </div>
                            </div>
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-primary/40 uppercase tracking-widest ml-4">Category Routing</label>
                                    <select className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-medium outline-none focus:ring-2 focus:ring-accent/20" value={galleryData.category} onChange={e => setGalleryData({ ...galleryData, category: e.target.value })}>
                                        <option>Laser Cutting Services</option>
                                        <option>Sheet Metal Laser Cutting</option>
                                        <option>Fabrication Services</option>
                                        <option>Steel Gates</option>
                                        <option>Metal Safety Doors</option>
                                        <option>Decorative Metal Panels</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-primary/40 uppercase tracking-widest ml-4">Object URL</label>
                                    <input type="text" placeholder="Image URL (Direct link)" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-medium outline-none focus:ring-2 focus:ring-accent/20" value={galleryData.image} onChange={e => setGalleryData({ ...galleryData, image: e.target.value })} required />
                                </div>
                            </div>
                            <button type="submit" className="bg-primary text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-accent transition-all shadow-xl shadow-primary/10">Publish to Showroom</button>
                        </form>
                    </div>
                ) : (
                    <div className="grid lg:grid-cols-5 gap-12">
                        <div className="lg:col-span-3">
                            <div className="bg-white p-12 rounded-[3.5rem] border border-slate-100 shadow-sm">
                                <form onSubmit={handleBlogSubmit} className="space-y-8">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-primary/40 uppercase tracking-widest ml-4">Header Title</label>
                                        <input type="text" placeholder="Article Headline" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-bold outline-none focus:ring-2 focus:ring-accent/20" value={blogData.title} onChange={e => setBlogData({ ...blogData, title: e.target.value })} required />
                                    </div>
                                    <div className="grid grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-primary/40 uppercase tracking-widest ml-4">Segment</label>
                                            <select className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-bold outline-none" value={blogData.category} onChange={e => setBlogData({ ...blogData, category: e.target.value })}>
                                                <option>Industry News</option>
                                                <option>Technical Guides</option>
                                                <option>Material Science</option>
                                                <option>Case Studies</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-primary/40 uppercase tracking-widest ml-4">System Slug</label>
                                            <input type="text" placeholder="url-friendly-slug" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-mono outline-none" value={blogData.slug} onChange={e => setBlogData({ ...blogData, slug: e.target.value })} required />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-primary/40 uppercase tracking-widest ml-4">Abstract Summary</label>
                                        <textarea rows={3} placeholder="Brief summary for card preview..." className="w-full bg-slate-50 border border-slate-100 rounded-3xl px-6 py-4 text-sm font-medium outline-none" value={blogData.summary} onChange={e => setBlogData({ ...blogData, summary: e.target.value })} required />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-primary/40 uppercase tracking-widest ml-4">Full Manuscript (HTML)</label>
                                        <textarea rows={10} placeholder="Full article body in HTML..." className="w-full bg-slate-50 border border-slate-100 rounded-3xl px-6 py-4 text-sm font-mono outline-none" value={blogData.content} onChange={e => setBlogData({ ...blogData, content: e.target.value })} required />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-primary/40 uppercase tracking-widest ml-4">Cover Asset URL</label>
                                        <input type="text" placeholder="High-res image URL" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-medium outline-none" value={blogData.image} onChange={e => setBlogData({ ...blogData, image: e.target.value })} required />
                                    </div>
                                    <div className="grid grid-cols-2 gap-8 bg-slate-50/50 p-8 rounded-3xl border border-dashed border-slate-200">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-accent uppercase tracking-widest ml-2">SEO Title</label>
                                            <input type="text" className="w-full bg-white border border-slate-100 rounded-xl px-4 py-3 text-xs" value={blogData.metaTitle} onChange={e => setBlogData({ ...blogData, metaTitle: e.target.value })} />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-accent uppercase tracking-widest ml-2">SEO Desc</label>
                                            <input type="text" className="w-full bg-white border border-slate-100 rounded-xl px-4 py-3 text-xs" value={blogData.metaDescription} onChange={e => setBlogData({ ...blogData, metaDescription: e.target.value })} />
                                        </div>
                                    </div>
                                    <button type="submit" className="bg-primary text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-accent transition-all shadow-xl">Deploy Manuscript</button>
                                </form>
                            </div>
                        </div>

                        <div className="lg:col-span-2 space-y-8">
                            <h4 className="text-xl font-black text-primary font-heading px-4">Live Articles</h4>
                            <div className="space-y-4">
                                {posts.length > 0 ? posts.map((p, i) => (
                                    <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between group hover:border-accent/10 transition-all">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-xl overflow-hidden shadow-inner">
                                                <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-primary text-sm line-clamp-1">{p.title}</p>
                                                <p className="text-[10px] text-primary/40 font-bold uppercase tracking-widest mt-1">{p.category}</p>
                                            </div>
                                        </div>
                                        <button onClick={() => handleDeleteBlog(p.slug)} className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-300 hover:bg-red-50 hover:text-red-500 transition-all opacity-0 group-hover:opacity-100">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                )) : (
                                    <div className="bg-slate-100/50 p-12 rounded-[2rem] text-center border-2 border-dashed border-slate-200">
                                        <Globe className="w-10 h-10 text-slate-200 mx-auto mb-4" />
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">No articles found</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    )
}

const Header = ({ toggleMobileMenu, mobileMenuOpen, toggleServicesDropdown, setMobileMenuOpen, servicesDropdown, setServicesDropdown, pillarServices, setCatalogueModalOpen }) => {
    return (
        <>
            {/* Top Info Bar - Sleeker & More Professional */}
            <div className="bg-[#2C3E50] text-white/90 text-[11px] font-medium tracking-wide uppercase border-b border-white/5">
                <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <MapPin className="w-3 h-3 text-accent" />
                            <span className="hidden md:inline">Chennai Hub | Industrial Excellence</span>
                            <span className="md:hidden">Chennai, IN</span>
                        </div>
                        <div className="hidden lg:flex items-center gap-2 border-l border-white/10 pl-4">
                            <Clock className="w-3 h-3 text-accent" />
                            <span>Mon–Sat: 09:00–19:00</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-6">
                        <a href="tel:+916380736439" className="flex items-center gap-1.5 hover:text-accent transition-colors">
                            <Phone className="w-3 h-3" />
                            <span>+91 63807-36439</span>
                        </a>
                        <a href="mailto:admin@rgtechengineeringworks.com" className="hidden sm:flex items-center gap-1.5 hover:text-accent transition-colors lowercase tracking-normal">
                            <Mail className="w-3 h-3 uppercase" />
                            <span>admin@rgtechengineeringworks.com</span>
                        </a>
                    </div>
                </div>
            </div>

            {/* Main Header - Glassmorphism & High-End Aesthetic */}
            <header className="glass sticky top-0 z-50 shadow-premium transition-all duration-300">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex justify-between items-center">
                        <Link to="/" className="flex items-center gap-3.5 group">
                            <img src="/RG-Tech-Logo.png" alt="RG Tech Logo" className="h-14 w-auto object-contain group-hover:scale-105 transition-transform duration-300" />
                            <div className="transition-all hidden sm:block">
                                <h1 className="text-xl font-bold text-primary leading-none tracking-tight font-heading">
                                    RG Tech <span className="text-accent">Engineering</span>
                                </h1>
                                <p className="text-[10px] text-text-muted font-bold uppercase tracking-[0.2em] mt-1 opacity-70">
                                    CNC Fiber Laser Specialist
                                </p>
                            </div>
                        </Link>

                        <nav className="hidden lg:flex items-center gap-8">
                            <div className="relative group">
                                <button
                                    onClick={toggleServicesDropdown}
                                    onMouseEnter={() => !servicesDropdown && setServicesDropdown(true)}
                                    className="text-primary hover:text-accent transition-all font-semibold text-[14px] flex items-center gap-1.5 py-2"
                                >
                                    Services <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${servicesDropdown ? 'rotate-180' : ''}`} />
                                </button>
                                {servicesDropdown && (
                                    <div
                                        onMouseLeave={() => setServicesDropdown(false)}
                                        className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-[1200px] z-50 overflow-visible animate-in fade-in slide-in-from-top-2"
                                    >
                                        <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 py-4 w-[420px] mx-auto relative">
                                            <div className="px-6 py-2 mb-2">
                                                <p className="text-[10px] font-bold text-accent uppercase tracking-widest">Our Expertise</p>
                                            </div>
                                            {pillarServices.map((s, i) => (
                                                <div key={i} className="px-2 relative group/service">
                                                    <Link
                                                        to={s.slug}
                                                        onClick={() => setServicesDropdown(false)}
                                                        className="flex justify-between items-center gap-3 px-4 py-3 rounded-2xl hover:bg-slate-50 transition-all group/link"
                                                    >
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center group-hover/link:bg-accent-soft transition-colors">
                                                                <ChevronRight className="w-4 h-4 text-primary group-hover/link:text-accent" />
                                                            </div>
                                                            <span className="text-[15px] font-medium text-primary/80 group-hover/link:text-primary transition-colors">{s.name}</span>
                                                        </div>
                                                    </Link>

                                                    {/* Hover Bridge to keep submenu open while moving cursor horizontally */}
                                                    <div className="absolute left-full top-0 w-12 h-full z-10 bg-transparent" />

                                                    {/* Hyper-Local Submenu for all Pillar Services */}
                                                    <div className="invisible group-hover/service:visible absolute left-full top-[-16px] pl-6 w-[300px] z-50 animate-in fade-in slide-in-from-left-2 pointer-events-auto">
                                                        <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 p-6">
                                                            <div className="mb-4">
                                                                <p className="text-[10px] font-bold text-accent uppercase tracking-widest mb-1">Serving Across Chennai</p>
                                                                <h4 className="text-lg font-bold text-primary font-heading">Our Localities</h4>
                                                            </div>
                                                            <div className="flex flex-col gap-y-1 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                                                {CHENNAI_LOCALITIES.map((city, idx) => (
                                                                    <Link
                                                                        key={idx}
                                                                        to={`${s.slug}-in-${city.toLowerCase().replace(/\s+/g, '-')}`}
                                                                        onClick={() => setServicesDropdown(false)}
                                                                        className="text-[13px] text-text-muted hover:text-accent py-1.5 transition-all font-medium border-b border-transparent hover:border-accent/10 whitespace-nowrap"
                                                                    >
                                                                        {city}
                                                                    </Link>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <a href="/#industries" className="text-primary/70 hover:text-accent transition-all font-semibold text-[14px] hover:translate-y-[-1px]">Industries</a>
                            <Link to="/gallery" className="text-primary hover:text-accent transition-all font-bold text-[14px] hover:translate-y-[-1px] border-b-2 border-accent/0 hover:border-accent pb-1">Gallery</Link>
                            <Link to="/blog" className="text-primary hover:text-accent transition-all font-bold text-[14px] hover:translate-y-[-1px] border-b-2 border-accent/0 hover:border-accent pb-1">Blog</Link>
                            <a href="/#about" className="text-primary/70 hover:text-accent transition-all font-semibold text-[14px] hover:translate-y-[-1px]">About</a>
                            <a href="/#contact" className="text-primary/70 hover:text-accent transition-all font-semibold text-[14px] hover:translate-y-[-1px]">Contact</a>
                        </nav>

                        <div className="hidden lg:flex items-center gap-4">
                            <a href="https://wa.me/916380736439" className="text-primary border-2 border-slate-200 px-5 py-2.5 rounded-2xl font-bold text-[13px] hover:border-accent hover:text-accent transition-all flex items-center gap-2 group shadow-sm bg-white/50">
                                <MessageCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                WhatsApp
                            </a>
                            <button onClick={() => setCatalogueModalOpen(true)} className="bg-accent text-white px-7 py-2.5 rounded-2xl font-bold text-[13px] hover:bg-accent-dark transition-all shadow-lg shadow-accent/20 hover:shadow-accent/30 hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2">
                                <FileText className="w-4 h-4" /> Request Catalogue
                            </button>
                        </div>

                        <button onClick={toggleMobileMenu} className="lg:hidden p-3 rounded-2xl bg-slate-50 text-primary hover:bg-accent-soft hover:text-accent transition-all">
                            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>

                    {mobileMenuOpen && (
                        <nav className="lg:hidden mt-6 pb-6 flex flex-col gap-4 animate-in fade-in slide-in-from-top-4">
                            <div className="flex flex-col gap-2">
                                <p className="text-[10px] font-bold text-accent uppercase tracking-widest mb-2 pl-1">Services</p>
                                {pillarServices.map((s, i) => (
                                    <div key={i} className="flex flex-col">
                                        <Link to={s.slug} onClick={() => setMobileMenuOpen(false)} className="text-primary font-bold text-base py-3 px-4 rounded-2xl hover:bg-slate-50 bg-slate-50/30 border border-slate-100/50 mb-2 transition-all">{s.name}</Link>

                                        {/* Mobile Localities Toggle for current service */}
                                        <div className="flex flex-col gap-2 p-4 mb-4 bg-slate-50/30 rounded-2xl border border-slate-100/50">
                                            <p className="text-[10px] font-bold text-accent uppercase tracking-widest mb-1 opacity-70">Popular Locations</p>
                                            {CHENNAI_LOCALITIES.slice(0, 8).map((city, idx) => (
                                                <Link
                                                    key={idx}
                                                    to={`${s.slug}-in-${city.toLowerCase().replace(/\s+/g, '-')}`}
                                                    onClick={() => setMobileMenuOpen(false)}
                                                    className="text-[14px] text-text-muted py-2 px-1 hover:text-accent transition-all font-medium border-b border-slate-100/50 last:border-0"
                                                >
                                                    {city}
                                                </Link>
                                            ))}
                                            <Link to={s.slug} onClick={() => setMobileMenuOpen(false)} className="text-center text-[13px] font-bold text-accent pt-4">Main Service Details</Link>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-slate-100">
                                <p className="text-[10px] font-bold text-accent uppercase tracking-widest mb-2 pl-1">Navigation</p>
                                <a href="/#industries" onClick={() => setMobileMenuOpen(false)} className="text-primary font-bold text-base py-3 px-4 rounded-2xl hover:bg-slate-50 transition-all">Industries</a>
                                <Link to="/gallery" onClick={() => setMobileMenuOpen(false)} className="text-primary font-bold text-base py-3 px-4 rounded-2xl hover:bg-slate-50 transition-all">Gallery</Link>
                                <a href="/#about" onClick={() => setMobileMenuOpen(false)} className="text-primary font-bold text-base py-3 px-4 rounded-2xl hover:bg-slate-50 transition-all">About Us</a>
                                <a href="/#contact" onClick={() => setMobileMenuOpen(false)} className="text-primary font-bold text-base py-3 px-4 rounded-2xl hover:bg-slate-50 transition-all">Contact</a>
                            </div>
                            <div className="grid grid-cols-2 gap-3 mt-4">
                                <a href="https://wa.me/916380736439" className="text-primary font-bold py-3.5 rounded-2xl bg-slate-100 flex items-center justify-center gap-2 text-sm shadow-sm">
                                    <MessageCircle className="w-4 h-4" /> WhatsApp
                                </a>
                                <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="bg-accent text-white py-3.5 rounded-2xl font-bold text-center text-sm shadow-lg shadow-accent/20">Get Quote</a>
                            </div>
                        </nav>
                    )}
                </div>
            </header>
        </>
    )
}

const Footer = ({ pillarServices }) => {
    return (
        <footer className="bg-primary text-white py-24 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="grid lg:grid-cols-12 gap-16 mb-20">
                    <div className="lg:col-span-4">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="bg-white/10 p-2 rounded-xl backdrop-blur-sm border border-white/10">
                                <img src="/RG-Tech-Logo.png" alt="RG Tech Engineering" className="h-12 w-auto object-contain" />
                            </div>
                            <div>
                                <h5 className="font-bold text-xl tracking-tight leading-none font-heading text-white">RG Tech Engineering</h5>
                                <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest mt-1">CNC Fiber Laser Specialist</p>
                            </div>
                        </div>
                        <p className="text-white/60 text-[15px] leading-relaxed mb-8 max-w-sm font-medium">
                            Providing top-tier industrial laser cutting and precision fabrication services for Chennai's engineering sectors. Built on precision, speed, and technical excellence.
                        </p>
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/5 shadow-sm">
                            <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                            <span className="text-[11px] font-bold text-white/50 uppercase tracking-widest">Verified Hub: Chennai, IN</span>
                        </div>
                    </div>
                    <div className="lg:col-span-2">
                        <h6 className="font-bold mb-8 text-[12px] uppercase tracking-[0.2em] text-accent">Company</h6>
                        <ul className="space-y-4">
                            <li><a href="/#about" className="text-white/60 hover:text-white transition-colors text-[14px] font-medium">About Us</a></li>
                            <li><a href="/#industries" className="text-white/60 hover:text-white transition-colors text-[14px] font-medium">Industries</a></li>
                            <li><Link to="/gallery" className="text-white/60 hover:text-white transition-colors text-[14px] font-medium">Project Gallery</Link></li>
                            <li><Link to="/blog" className="text-white/60 hover:text-white transition-colors text-[14px] font-medium">Technical Blog</Link></li>
                            <li><a href="/#contact" className="text-white/60 hover:text-white transition-colors text-[14px] font-medium">Contact</a></li>
                            <li><a href="https://wa.me/916380736439" className="text-white/60 hover:text-white transition-colors text-[14px] font-medium">WhatsApp Support</a></li>
                        </ul>
                    </div>
                    <div className="lg:col-span-3">
                        <h6 className="font-bold mb-8 text-[12px] uppercase tracking-[0.2em] text-accent">Services</h6>
                        <ul className="space-y-4">
                            {pillarServices.map((s, i) => (
                                <li key={i}>
                                    <Link to={s.slug} className="text-white/60 hover:text-white transition-colors text-[14px] font-medium block">{s.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="lg:col-span-3">
                        <h6 className="font-bold mb-8 text-[12px] uppercase tracking-[0.2em] text-accent">Contact Desk</h6>
                        <ul className="space-y-5">
                            <li>
                                <a href="tel:+916380736439" className="group flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-accent transition-colors duration-300">
                                        <Phone className="w-4 h-4 text-white/60 group-hover:text-white" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest leading-none mb-1">Sales Hub</p>
                                        <p className="text-[14px] font-bold">+91 63807-36439</p>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                                        <MapPin className="w-4 h-4 text-white/60" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest leading-none mb-1">Works Address</p>
                                        <p className="text-[14px] font-bold leading-relaxed">Ayanambakkam, Chennai - 600095</p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <div className="mt-10 pt-8 border-t border-white/5">
                            <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest mb-1">GSTIN Registered</p>
                            <p className="text-[13px] font-bold">33HGZPS9605D1ZP</p>
                        </div>
                    </div>
                </div>
                <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-white/40 text-[12px] font-medium">
                        © 2024 RG Tech Engineering Works. All rights reserved. Precision Laser Cutting Specialist.
                    </p>
                    <div className="flex items-center gap-8">
                        <a href="#" className="text-white/40 hover:text-white transition-colors text-[12px] font-bold uppercase tracking-widest">Privacy</a>
                        <a href="#" className="text-white/40 hover:text-white transition-colors text-[12px] font-bold uppercase tracking-widest">Terms</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

const RollingLogos = () => {
    const industrialIcons = [
        { icon: Shield, name: 'ISO CERTIFIED' },
        { icon: Zap, name: 'HIGH POWER FIBER' },
        { icon: Wrench, name: 'MFG SUPPORT' },
        { icon: Target, name: 'PRECISION CNC' },
        { icon: Building2, name: 'STRUCTURAL STEEL' },
        { icon: Factory, name: 'OEM VENDOR' },
        { icon: Cpu, name: 'SMART NESTING' },
        { icon: Layers, name: 'MULTI-MATERIAL' }
    ]
    return (
        <div className="bg-white border-y border-gray-100 py-10 overflow-hidden relative">
            <div className="max-w-7xl mx-auto px-4 mb-6">
                <p className="text-center text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Our Industrial Standards & Capabilities</p>
            </div>
            <div className="flex animate-scroll whitespace-nowrap">
                {industrialIcons.map((item, i) => (
                    <div key={i} className="flex items-center gap-4 mx-10 opacity-30 hover:opacity-100 transition-opacity grayscale hover:grayscale-0">
                        <item.icon className="w-8 h-8 text-[#2C3E50]" />
                        <span className="font-bold text-[#2C3E50] text-xs tracking-widest uppercase">{item.name}</span>
                    </div>
                ))}
                {/* Duplicate for infinite loop */}
                {industrialIcons.map((item, i) => (
                    <div key={`dup-${i}`} className="flex items-center gap-4 mx-10 opacity-30 hover:opacity-100 transition-opacity grayscale hover:grayscale-0">
                        <item.icon className="w-8 h-8 text-[#2C3E50]" />
                        <span className="font-bold text-[#2C3E50] text-xs tracking-widest uppercase">{item.name}</span>
                    </div>
                ))}
            </div>
            <style>{`
                @keyframes scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-scroll {
                    display: flex;
                    width: max-content;
                    animation: scroll 40s linear infinite;
                }
            `}</style>
        </div>
    )
}

const ScrollToTop = () => {
    const { pathname } = useLocation()
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])
    return null
}



const ServicePage = ({ services }) => {
    const { combinedSlug, serviceSlug: oldServiceSlug, city: oldCity } = useParams()
    const location = useLocation()

    // Support both old and new URL patterns
    const isInCity = combinedSlug?.includes('-in-')
    const serviceSlugPart = combinedSlug
        ? (isInCity ? combinedSlug.substring(0, combinedSlug.lastIndexOf('-in-')) : combinedSlug)
        : oldServiceSlug

    const city = combinedSlug
        ? (isInCity ? combinedSlug.substring(combinedSlug.lastIndexOf('-in-') + 4) : oldCity)
        : oldCity

    // Resolve content either by prop directly or by slug from URL
    const content = services ? services.find(s => s.slug === location.pathname || s.slug === `/chennai/${serviceSlugPart}`) : null

    if (!content) return <Navigate to="/" />

    const cityName = city
        ? city.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
        : null

    const getRotationIndex = (name) => {
        if (!name) return 0
        let hash = 0
        for (let i = 0; i < name.length; i++) {
            hash = name.charCodeAt(i) + ((hash << 5) - hash)
        }
        return Math.abs(hash)
    }

    const cityIndex = getRotationIndex(cityName)

    const localizeText = (text) => {
        if (!cityName || !text) return text
        const localPhrases = [
            `trusted in ${cityName}`,
            `serving the ${cityName} industrial belt`,
            `${cityName}'s preferred engineering hub`,
            `available across ${cityName}`
        ]
        const phrase = localPhrases[cityIndex % localPhrases.length]

        return text
            .replace(/Chennai/g, cityName)
            .replace(/industrial hub/g, phrase)
            .replace(/industrial region/g, `${cityName} manufacturing zone`)
            .replace(/engineering hub/g, `${cityName} technical center`)
    }

    const serviceKey = content.slug.split('/').pop()
    const pool = SERVICE_IMAGE_POOLS[serviceKey] || SERVICE_IMAGE_POOLS['laser-cutting-services']

    const displayHeroImage = cityName ? pool[cityIndex % pool.length] : content.heroImage
    const displaySecondaryImage = cityName ? pool[(cityIndex + 1) % pool.length] : content.secondaryImage

    const displayTitle = cityName ? `${content.name} in ${cityName}` : content.title
    const displayMetaTitle = cityName ? `Top-Rated ${content.name} in ${cityName} | RG Tech Engineering` : content.metaTitle
    const displayMetaDesc = cityName ? `Looking for high-precision ${content.name.toLowerCase()} in ${cityName}, Chennai? RG Tech Engineering provides premium industrial metal solutions with fast 24h response. Get a free quote today.` : content.metaDescription

    const displaySeoParagraph = cityName ? localizeText(content.seoParagraph) : content.seoParagraph
    const displayAltText = cityName ? `${content.name} in ${cityName} - Precision Industrial Work` : `${content.name} - RG Tech Engineering works`

    const allFaqs = content.faqs || []
    const displayFaqs = cityName
        ? [...allFaqs.slice(cityIndex % allFaqs.length), ...allFaqs.slice(0, cityIndex % allFaqs.length)].slice(0, 4)
        : allFaqs

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": (displayFaqs || []).map(f => ({
            "@type": "Question",
            "name": localizeText(f.q),
            "acceptedAnswer": { "@type": "Answer", "text": localizeText(f.a) }
        }))
    }

    const howToSchema = {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": `How to book ${content.name} in ${cityName || 'Chennai'}`,
        "step": (content.processSteps || []).map((s, i) => ({
            "@type": "HowToStep",
            "position": i + 1,
            "name": localizeText(s.title),
            "text": localizeText(s.desc)
        }))
    }

    const serviceCanonical = `${BASE_URL}${location.pathname}`
    const serviceOgImage = `${BASE_URL}${displayHeroImage.replace(/ /g, '%20')}`

    const breadcrumbItems = [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": `${BASE_URL}/` },
        { "@type": "ListItem", "position": 2, "name": content.name, "item": `${BASE_URL}${content.slug}` }
    ]
    if (cityName) {
        breadcrumbItems.push({
            "@type": "ListItem",
            "position": 3,
            "name": `${content.name} in ${cityName}`,
            "item": serviceCanonical
        })
    }

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbItems
    }

    return (
        <div className="bg-white selection:bg-accent/20">
            <Helmet>
                <title>{displayMetaTitle}</title>
                <meta name="description" content={displayMetaDesc} />
                <link rel="canonical" href={serviceCanonical} />
                <meta property="og:title" content={displayMetaTitle} />
                <meta property="og:description" content={displayMetaDesc} />
                <meta property="og:image" content={serviceOgImage} />
                <meta property="og:url" content={serviceCanonical} />
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="RG Tech Engineering Works" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={displayMetaTitle} />
                <meta name="twitter:description" content={displayMetaDesc} />
                <meta name="twitter:image" content={serviceOgImage} />
                <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
                <script type="application/ld+json">{JSON.stringify(howToSchema)}</script>
                <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
            </Helmet>

            {/* Breadcrumb - Sleeker */}
            <div className="bg-slate-50 border-b border-slate-100 py-3.5">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-wider text-text-muted/60">
                        <Link to="/" className="hover:text-accent transition-colors">Home</Link>
                        <ChevronRight className="w-3 h-3" />
                        <a href="/#services" className="hover:text-accent transition-colors">Services</a>
                        <ChevronRight className="w-3 h-3" />
                        <Link to={content.slug} className={`${cityName ? 'hover:text-accent' : 'text-primary'}`}>{content.name}</Link>
                        {cityName && (
                            <>
                                <ChevronRight className="w-3 h-3" />
                                <span className="text-primary">{cityName}</span>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Hero Section - Split Layout Premium */}
            <section className="relative overflow-hidden pt-20 pb-24 md:pt-28 md:pb-36 bg-white">
                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <div className="grid lg:grid-cols-12 gap-16 items-center">
                        <div className="lg:col-span-7">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-soft text-accent text-[11px] font-black uppercase tracking-[0.2em] mb-6">
                                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></span>
                                Premium Industrial Quality
                            </div>
                            <h1 className="text-4xl md:text-6xl font-bold text-primary leading-[1.1] font-heading tracking-tight text-balance">
                                {displayTitle}
                            </h1>
                            <p className="text-lg md:text-xl text-text-muted mt-8 leading-relaxed max-w-2xl font-medium opacity-80">
                                {localizeText(content.heroDesc)}
                            </p>
                            <div className="flex flex-wrap gap-4 mt-12">
                                <a href="#quote" className="bg-accent text-white px-8 py-4.5 rounded-2xl font-bold text-[14px] hover:bg-accent-dark transition-all shadow-xl shadow-accent/20 flex items-center gap-3 hover:translate-y-[-2px]">
                                    Get Pricing & Quote <ArrowRight className="w-4 h-4" />
                                </a>
                                <a href="#quote" className="bg-white border-2 border-slate-100 text-primary px-8 py-4.5 rounded-2xl font-bold text-[14px] hover:border-accent hover:text-accent transition-all flex items-center gap-3 shadow-sm hover:translate-y-[-2px]">
                                    <Upload className="w-4 h-4 text-accent" /> Technical Specs
                                </a>
                            </div>
                        </div>
                        <div className="lg:col-span-5 relative">
                            <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl border-[8px] border-white ring-1 ring-slate-100">
                                <img src={displayHeroImage} alt={displayAltText} className="w-full h-[540px] object-cover scale-105 hover:scale-100 transition-transform duration-700" />
                            </div>
                            <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-accent/5 rounded-full blur-3xl"></div>
                            <div className="absolute -top-12 -right-12 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
                        </div>
                    </div>

                    {/* Trust Strip - Upgrade for variety */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-24">
                        {(content.trustStrip || []).map((t, i) => (
                            <div key={i} className="bg-slate-50/50 p-6 rounded-3xl border border-slate-100 flex items-center gap-5 hover:bg-white hover:shadow-premium transition-all duration-300 group">
                                <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center flex-shrink-0 group-hover:bg-accent-soft transition-colors text-primary group-hover:text-accent">
                                    <t.icon className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="font-bold text-primary text-[15px]">{t.label}</p>
                                    <p className="text-[12px] text-text-muted mt-0.5 font-medium">{t.sub}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <RollingLogos />

            {/* Why Section - Optimized Layout */}
            <section className="bg-slate-50/50 py-24 border-y border-slate-100">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="max-w-3xl mb-16">
                        <h3 className="text-3xl md:text-4xl font-bold text-primary font-heading tracking-tight">
                            Why Industrial Leaders Choose Us
                        </h3>
                        <p className="text-text-muted mt-4 font-medium leading-relaxed">
                            Serving the {cityName || 'Chennai'} industrial hub with unmatched precision and zero-defect commitment.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8">
                        {(content.whyCards || []).map((c, i) => (
                            <div key={i} className="bg-white p-10 rounded-[2rem] shadow-premium border border-slate-50 flex items-start gap-8 hover:shadow-xl transition-all duration-300 group">
                                <div className="w-16 h-16 rounded-[1.25rem] bg-slate-50 flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-colors duration-500">
                                    <c.icon className="w-8 h-8 text-primary group-hover:text-white transition-colors" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-primary text-xl mb-3 font-heading">{localizeText(c.title)}</h4>
                                    <p className="text-[15px] text-text-muted leading-relaxed font-medium opacity-80">{localizeText(c.desc)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Capabilities - Refined Grid */}
            <section className="bg-white py-24">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <div className="relative">
                            <h3 className="text-3xl md:text-4xl font-bold text-primary font-heading tracking-tight mb-8">
                                Production Capabilities
                            </h3>
                            <p className="text-text-muted leading-relaxed font-medium mb-12 text-lg">
                                {localizeText(content.capabilityDesc)}
                            </p>
                            <div className="space-y-4">
                                {(content.capabilitiesList || []).map((c, i) => (
                                    <div key={i} className="flex flex-col gap-1 p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-accent/30 transition-colors">
                                        <span className="text-[11px] font-black text-accent uppercase tracking-widest">{c.label}</span>
                                        <span className="text-[16px] font-bold text-primary">{c.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative">
                            <div className="rounded-[3rem] overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-700">
                                <img src={displaySecondaryImage} alt={`${content.name} industrial process`} className="w-full h-[600px] object-cover" />
                            </div>
                            <div className="absolute -bottom-6 -right-6 bg-accent text-white p-8 rounded-3xl shadow-xl z-20 hidden md:block border-4 border-white">
                                <p className="text-4xl font-black font-heading leading-none">24</p>
                                <p className="text-xs font-bold uppercase tracking-widest mt-1 opacity-80">Hour Delivery</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Industries - Badge Layout */}
            <section className="bg-primary py-24 text-white overflow-hidden relative">
                <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
                    <div className="mb-14">
                        <h3 className="text-3xl md:text-4xl font-bold font-heading tracking-tight mb-4">Industries We Empower</h3>
                        <p className="text-white/60 font-medium max-w-2xl mx-auto">Specialized solutions for high-demand engineering sectors across {cityName || 'the region'}.</p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-4">
                        {(content.supportedIndustries || []).map((ind, i) => (
                            <div key={i} className="bg-white/10 hover:bg-white/20 px-8 py-5 rounded-2xl flex items-center gap-4 transition-all border border-white/5 backdrop-blur-sm group cursor-default">
                                <ind.icon className="w-6 h-6 text-accent group-hover:scale-110 transition-transform" />
                                <span className="font-bold text-[15px]">{localizeText(ind.name)}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process - Step Refinement */}
            <section className="bg-white py-24">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-20">
                        <h3 className="text-3xl md:text-4xl font-bold text-primary font-heading tracking-tight">Execution Workflow</h3>
                        <p className="text-text-muted mt-4 font-medium">Precision and discipline from blueprint to finished part.</p>
                    </div>
                    <div className={`grid md:grid-cols-2 lg:grid-cols-${(content.processSteps?.length === 4 || content.processSteps?.length === 8) ? '4' : '3'} gap-10`}>
                        {(content.processSteps || []).map((s, i) => (
                            <div key={i} className="relative group p-10 rounded-[2.5rem] bg-slate-50 hover:bg-white hover:shadow-premium transition-all duration-300">
                                <div className="absolute -top-6 left-10 w-14 h-14 bg-primary rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg border-4 border-white">
                                    {s.step}
                                </div>
                                <h4 className="font-bold text-primary text-xl mt-4 mb-3 font-heading">{localizeText(s.title)}</h4>
                                <p className="text-[15px] text-text-muted leading-relaxed font-medium opacity-80">{localizeText(s.desc)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Service Highlights Section - Filtered to Current Service */}
            <section className="py-24 bg-slate-50 border-y border-slate-200">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="mb-16">
                        <p className="text-accent font-bold text-sm uppercase tracking-widest mb-2">Service Showcase</p>
                        <h3 className="text-3xl md:text-5xl font-bold text-primary font-heading tracking-tight">
                            {content.name} Quality & Finish
                        </h3>
                        <p className="text-text-muted mt-4 font-medium max-w-2xl text-lg opacity-80">
                            Take a closer look at our {content.name.toLowerCase()} work samples and precision benchmarks.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {(content.keywords || []).slice(0, 5).map((kw, idx) => (
                            <div
                                key={idx}
                                className={`group relative h-[500px] rounded-[2.5rem] overflow-hidden shadow-premium hover:shadow-2xl transition-all duration-500 cursor-default border border-slate-100 bg-[#2c2e33] ${idx === 0 ? 'lg:col-span-2' : ''}`}
                            >
                                <img
                                    src={kw.img}
                                    alt={kw.text}
                                    className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                                <div className="absolute bottom-0 left-0 p-8 w-full">
                                    <p className="text-white font-bold text-lg leading-tight group-hover:text-accent transition-colors">
                                        {kw.text}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 bg-white p-10 rounded-[3rem] border border-slate-100 shadow-premium flex flex-col md:flex-row items-center justify-between gap-8">
                        <div>
                            <h4 className="text-2xl font-bold text-primary font-heading mb-2">Want to see more industrial samples?</h4>
                            <p className="text-text-muted font-medium text-base">Explore our complete catalog of {content.name.toLowerCase()} projects.</p>
                        </div>
                        <Link
                            to={`/gallery?category=${encodeURIComponent(content.name)}`}
                            className="inline-flex items-center gap-4 bg-accent text-white px-10 py-5 rounded-2xl font-bold text-[15px] hover:bg-accent-dark transition-all shadow-xl shadow-accent/20 group whitespace-nowrap"
                        >
                            View Full {content.name} Gallery
                            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Quotation Aid */}
            <section className="bg-slate-50 py-24">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="bg-white p-12 md:p-16 rounded-[3rem] shadow-premium border border-slate-100 flex flex-col md:flex-row gap-12 items-center">
                        <div className="md:w-3/5">
                            <h3 className="text-3xl font-bold text-primary font-heading tracking-tight mb-4">Fast-Track Pricing</h3>
                            <p className="text-text-muted font-medium mb-8">Help our engineers respond faster by including these details.</p>
                            <div className="grid gap-4">
                                {(content.checklist || []).map((item, i) => (
                                    <div key={i} className="flex items-center gap-4 group">
                                        <div className="w-6 h-6 rounded-full bg-accent text-white flex items-center justify-center flex-shrink-0 shadow-sm shadow-accent/20">
                                            <CheckCircle className="w-3.5 h-3.5" />
                                        </div>
                                        <span className="text-[15px] font-bold text-primary/80 group-hover:text-primary transition-colors">{localizeText(item)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="md:w-2/5 flex flex-col gap-4 w-full">
                            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 text-center">
                                <p className="text-[10px] font-black text-accent uppercase tracking-widest mb-2">Our Response Time</p>
                                <p className="text-4xl font-black text-primary font-heading tracking-tight">24h</p>
                                <p className="text-[11px] font-bold text-text-muted mt-2 uppercase tracking-wide">Business Days</p>
                            </div>
                            <a href="#contact" className="w-full bg-primary text-white py-5 rounded-2xl font-bold text-sm text-center hover:bg-black transition-all">Submit Inquiry</a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials - Card Polish */}
            <section className="bg-white py-24">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h3 className="text-3xl font-bold text-primary font-heading tracking-tight">Verified Engineering Success</h3>
                        <p className="text-text-muted mt-4 font-medium">Trusted by Tier 1 & Tier 2 automotive vendors in Chennai.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { name: 'Rajesh Kumar', company: 'KR Fabrications', text: `RG Tech's precision in ${content.name} is unmatched. Their support for our ${cityName || 'Chennai'} projects has been vital.` },
                            { name: 'Suresh Babu', company: 'Sai Industrial', text: `Excellent turnaround time. We received our laser cut parts in ${cityName || 'record time'} with perfect finishing.` },
                            { name: 'Priya V.', company: 'Architectural Designs', text: `Their jali designs and custom metal work in ${cityName || 'Chennai'} are top-notch. Highly recommended.` }
                        ].map((t, i) => (
                            <div key={i} className="bg-slate-50/30 p-10 rounded-[2.5rem] border border-slate-100 hover:bg-white hover:shadow-premium transition-all duration-500 group">
                                <div className="flex gap-1 mb-6">
                                    {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-4 h-4 text-accent fill-accent" />)}
                                </div>
                                <p className="text-[15px] text-primary/80 italic leading-relaxed font-medium mb-8">"{t.text}"</p>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center font-bold text-primary">
                                        {t.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-bold text-primary text-[14px]">{t.name}</p>
                                        <p className="text-[10px] text-accent font-black uppercase tracking-widest">{t.company}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ - High-end Reveal */}
            <section className="bg-slate-50/50 py-24 border-t border-slate-100">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h3 className="text-3xl font-bold text-primary font-heading tracking-tight">Industry Insights & FAQs</h3>
                        <p className="text-text-muted mt-4 font-medium">Expert answers for technical project planning.</p>
                    </div>
                    <div className="grid gap-4">
                        {(displayFaqs || []).map((faq, i) => (
                            <div key={i} className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:shadow-premium transition-all duration-300">
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="w-2 h-2 rounded-full bg-accent"></div>
                                    <p className="font-bold text-primary text-[16px] font-heading">{localizeText(faq.q)}</p>
                                </div>
                                <p className="text-[14px] text-text-muted leading-relaxed font-medium pl-4 border-l-2 border-slate-100">{localizeText(faq.a)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SEO & Localization Context */}
            {displaySeoParagraph && (
                <section className="bg-white py-24 border-t border-slate-100">
                    <div className="max-w-4xl mx-auto px-4">
                        {cityName && (
                            <div className="flex items-center gap-4 mb-8">
                                <h2 className="text-2xl font-bold text-primary font-heading tracking-tight">Industrial Excellence in {cityName}</h2>
                                <div className="flex-1 h-[1px] bg-slate-100"></div>
                            </div>
                        )}
                        <p className="text-text-muted leading-[1.8] text-[15px] font-medium opacity-80 prose prose-slate max-w-none" dangerouslySetInnerHTML={{ __html: displaySeoParagraph }} />
                    </div>
                </section>
            )}

            {/* Hyper-Local Navigation */}
            {cityName && (
                <section className="bg-slate-50 py-24">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="flex items-center justify-between mb-10">
                            <h3 className="text-xl font-bold text-primary font-heading tracking-tight">Explore Other Hubs</h3>
                            <div className="w-12 h-1 bg-accent/20 rounded-full"></div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                            {CHENNAI_LOCALITIES.filter(c => c !== cityName).slice(0, 18).map((cityLink, i) => (
                                <Link
                                    key={i}
                                    to={`${content.slug}-in-${cityLink.toLowerCase().replace(/\s+/g, '-')}`}
                                    className="bg-white px-5 py-3 rounded-xl text-[12px] font-bold text-text-muted hover:text-accent hover:shadow-premium hover:translate-y-[-2px] border border-white text-center transition-all shadow-sm"
                                >
                                    {cityLink}
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}



            {/* Final CTA */}
            <section id="quote" className="bg-primary pt-24 pb-32 relative overflow-hidden text-center text-white">
                <div className="max-w-4xl mx-auto px-4 relative z-10">
                    <h2 className="text-4xl md:text-5xl font-bold font-heading tracking-tight mb-8">Ready for Industrial Precision?</h2>
                    <p className="text-white/60 text-lg font-medium mb-12 max-w-2xl mx-auto">Get your technical drawings verified and priced within 24 business hours by our engineering team.</p>
                    <div className="flex justify-center gap-6 flex-wrap">
                        <a href="https://wa.me/916380736439" className="bg-white text-primary px-10 py-5 rounded-2xl font-black text-sm flex items-center gap-3 hover:bg-slate-100 transition-all shadow-xl">
                            <MessageCircle className="w-5 h-5 text-[#25D366]" /> WhatsApp Engineering
                        </a>
                        <a href="#contact" className="bg-accent text-white px-10 py-5 rounded-2xl font-black text-sm hover:bg-accent-dark transition-all shadow-xl">
                            Submit Quote Online
                        </a>
                    </div>
                </div>
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/20 rounded-full"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/20 rounded-full"></div>
                </div>
            </section>
        </div>
    )
}

// --- Main App ---

function App() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [servicesDropdown, setServicesDropdown] = useState(false)
    const [catalogueModalOpen, setCatalogueModalOpen] = useState(false)
    const [openFaq, setOpenFaq] = useState(null)
    const [formData, setFormData] = useState({ name: '', phone: '', service: '', material: '', message: '' })
    const toggleMobileMenu = () => setMobileMenuOpen(prev => !prev)
    const toggleServicesDropdown = () => setServicesDropdown(prev => !prev)
    const handleInputChange = (e) => { const { name, value } = e.target; setFormData(prev => ({ ...prev, [name]: value })) }
    const handleSubmit = (e) => { e.preventDefault(); alert('Thank you! We will respond within 24 hours.') }
    const toggleFaq = (i) => setOpenFaq(prev => prev === i ? null : i)
    const location = useLocation()

    useEffect(() => {
        setMobileMenuOpen(false)
        setServicesDropdown(false)
    }, [location])

    const pillarServices = [
        {
            name: 'Laser Cutting Services',
            slug: '/chennai/laser-cutting-services',
            mainIcon: Scissors,
            title: 'Precision Laser Cutting Services in Chennai',
            metaTitle: 'Precision CNC Fiber Laser Cutting Services Chennai | RG Tech',
            metaDescription: 'Looking for laser cutting in Chennai? RG Tech offers high-precision CNC fiber laser cutting for MS, SS, and Aluminum. Reliable industrial job work with fast delivery.',
            heroImage: '/gallery/Laser Cutting Services/lc_01.jpg',
            heroDesc: 'High-precision industrial laser cutting in Chennai. We deliver +/- 0.1mm accuracy for MS, SS, and Aluminum parts with the latest fiber technology.',
            secondaryImage: '/gallery/Laser Cutting Services/lc_12.jpg',
            trustStrip: [
                { icon: Layers, label: 'MS, SS, Al, Cu, Brass', sub: 'Multi-material cutting' },
                { icon: Factory, label: 'OEM & Job Work', sub: 'Industrial-grade output' },
                { icon: Ruler, label: '0.01mm Tolerance', sub: 'CNC precision control' },
                { icon: Clock, label: '24–48hr Turnaround', sub: 'Fast delivery on orders' }
            ],
            whyCards: [
                { icon: Target, title: 'Precision Output', desc: 'Clean kerf, minimal burr, and consistent dimensions across every cut — ready for assembly or finishing.' },
                { icon: Layers, title: 'Production Ready', desc: 'From single prototypes to large batch cutting with repeatable accuracy and batch control.' },
                { icon: Wrench, title: 'Material Flexibility', desc: 'Mild steel, stainless steel 304/316/430, aluminium, copper, and brass — as per your requirement.' },
                { icon: FileText, title: 'Job Support & DFM', desc: 'Design-for-manufacturing input to reduce material waste, cutting time, and overall cost.' }
            ],
            capabilityDesc: 'Our high-performance CNC fiber laser infrastructure delivers rapid, burr-free cutting for varied industrial demands, ensuring peak material efficiency and edge smoothness.',
            capabilitiesList: [
                { label: 'Primary Tech', value: 'High-Power CNC Fiber Laser (up to 12kW)' },
                { label: 'Cutting Tolerance', value: '± 0.05mm structural precision' },
                { label: 'Mild Steel Cap', value: 'Clean cut up to 45mm' },
                { label: 'Stainless Steel', value: 'Oxide-free Nitrogen cutting up to 40mm' },
                { label: 'Aluminum/Copper', value: 'High-reflectivity processing up to 30mm' },
                { label: 'Bed Dimensions', value: '8000mm x 2500mm (Ultra-Large Format)' }
            ],
            supportedIndustries: [
                { icon: Factory, name: 'Automotive OEM Vendors' },
                { icon: Wind, name: 'HVAC & Ducting Mfgs' },
                { icon: Cpu, name: 'Electrical Panel Fabricators' },
                { icon: Building2, name: 'Pre-Engineered Buildings (PEB)' }
            ],
            processSteps: [
                { step: '01', title: 'DXF Optimization', desc: 'Analyzing files for nesting and kerf compensation' },
                { step: '02', title: 'Material Calibration', desc: 'Setting laser parameters for specific alloy grades' },
                { step: '03', title: 'Precision Cutting', desc: 'High-speed fiber profiling with real-time sensors' },
                { step: '04', title: 'Quality Inspection', desc: 'Dimensional verification and edge burr checks' }
            ],
            checklist: [
                'Correct DXF/DWG file scaling',
                'Material thickness and grade (e.g., SS316, IS2062)',
                'Specific edge finish requirements',
                'Critical dimensional tolerances (if any)'
            ],
            faqs: [
                { q: 'What is the advantage of your large-bed laser?', a: 'Our 8m bed allows us to cut large structural frames and long plates without joins, maintaining strength and accuracy.' },
                { q: 'Can you cut reflective materials like Copper?', a: 'Yes, our modern fiber lasers are equipped with back-reflection protection specifically for Copper and Brass.' },
                { q: 'What is your typical turnaround for bulk jobs?', a: 'Most bulk laser jobs are dispatched within 48-72 hours depending on volume.' },
                { q: 'Do you offer nesting services?', a: 'Yes, we include CAD nesting to ensure you get the maximum parts out of every sheet.' },
                { q: 'What file formats do you accept?', a: 'We prefer DXF or DWG files for direct laser processing, but can also work with PDF or sketches for design support.' },
                { q: 'Do you provide material or should I supply it?', a: 'We offer both options—complete material sourcing or labor-only job work using your supplied sheets.' },
                { q: 'What is the maximum thickness you can cut?', a: 'We handle mild steel up to 45mm and stainless steel up to 40mm with high-precision fiber technology.' },
                { q: 'Is laser cutting better than plasma?', a: 'For industrial parts, laser offers much tighter tolerances, cleaner edges, and a smaller heat-affected zone than plasma.' }
            ],
            seoParagraph: 'If you\'re searching for <strong class="text-[#2C3E50]">laser cutting services in Chennai</strong> for repeat industrial parts, choosing the right process — <strong class="text-[#2C3E50]">CNC laser cutting</strong> or <strong class="text-[#2C3E50]">fiber laser cutting</strong> — directly impacts edge quality, accuracy, and overall fabrication cost. At RG Tech Engineering Works, we support engineering customers with stable cutting, nesting efficiency, and production-friendly documentation so parts fit right the first time.',
            keywords: [
                { text: 'CNC Laser Cutting', img: '/gallery/Laser Cutting Services/lc_01.jpg' },
                { text: 'Fiber Laser Cutting', img: '/gallery/Laser Cutting Services/lc_02.jpg' },
                { text: 'MS Laser Cutting', img: '/gallery/Laser Cutting Services/lc_03.jpg' },
                { text: 'SS Laser Cutting', img: '/gallery/Laser Cutting Services/lc_04.jpg' },
                { text: 'Aluminum Laser Cutting', img: '/gallery/Laser Cutting Services/lc_05.jpg' },
                { text: 'Brass Laser Cutting', img: '/gallery/Laser Cutting Services/lc_06.jpg' },
                { text: 'Copper Laser Cutting', img: '/gallery/Laser Cutting Services/lc_07.jpg' },
                { text: 'Precision Metal Cutting', img: '/gallery/Laser Cutting Services/lc_08.jpg' },
                { text: 'Industrial Parts', img: '/gallery/Laser Cutting Services/lc_09.jpg' },
                { text: 'CNC Cutting', img: '/gallery/Laser Cutting Services/lc_10.jpg' }
            ]
        },
        {
            name: 'Sheet Metal Laser Cutting',
            slug: '/chennai/sheet-metal-laser-cutting-services',
            mainIcon: PanelTop,
            title: 'Industrial Sheet Metal Laser Cutting Chennai',
            metaTitle: 'Sheet Metal Laser Cutting Services Chennai | MS & SS Processing',
            metaDescription: 'Expert sheet metal laser cutting services in Chennai. We handle thick plates (up to 45mm), MS sheet cutting, and precision SS processing for industrial OEMs.',
            heroImage: '/gallery/Sheet Metal Laser Cutting/sm_12.jpg',
            heroDesc: 'High-volume sheet metal laser cutting for MS, SS, and Aluminum plates. We handle everything from thin sheets to heavy industrial plates up to 45mm.',
            secondaryImage: '/gallery/Sheet Metal Laser Cutting/sm_06.jpg',
            trustStrip: [
                { icon: Layers, label: 'Thin to Heavy Plate', sub: 'Up to 45mm processed' },
                { icon: Target, label: 'High Yield Nesting', sub: 'Reduce material waste' },
                { icon: Zap, label: 'Fiber Speed', sub: 'Fast execution of batch' },
                { icon: Package, label: 'OEM Ready', sub: 'Inspection & labeling' }
            ],
            whyCards: [
                { icon: Shield, title: 'Clean Edges', desc: 'Specialized gas mixtures for oxide-free cutting on stainless steel.' },
                { icon: Ruler, title: 'Tight Tolerances', desc: 'Precision +/- 0.1mm for accurate assembly fitment.' },
                { icon: Factory, title: 'Industrial Scale', desc: 'High-power lasers for continuous production runs.' },
                { icon: CheckCircle, title: 'Material Optimization', desc: 'Advanced nesting software for maximum material utilization.' }
            ],
            capabilityDesc: 'We specialize in industrial-scale sheet metal processing with high-power fiber lasers, ensuring precision and efficiency for all your projects.',
            capabilitiesList: [
                { label: 'MS Capacity', value: '0.5mm to 45mm' },
                { label: 'SS Capacity', value: '0.5mm to 45mm' },
                { label: 'Aluminum', value: '1mm to 30mm' },
                { label: 'Copper & Brass', value: '0.5mm to 16mm' },
                { label: 'Bed Size', value: 'Up to 8000 x 2500mm' },
                { label: 'Edge Finish', value: 'Burr-free, ready for bending or welding' }
            ],
            supportedIndustries: [
                { icon: Factory, name: 'Control Panel Fabricators' },
                { icon: Building2, name: 'Pre-Engineering Buildings' },
                { icon: Wrench, name: 'Heavy Equipment Manufacturing' },
                { icon: Cpu, name: 'Electrical Enclosures' }
            ],
            processSteps: [
                { step: '01', title: 'Drawing Review', desc: 'Verify DXF/DWG for manufacturability' },
                { step: '02', title: 'Nesting', desc: 'Optimize layout for material yield' },
                { step: '03', title: 'Laser Cutting', desc: 'High-speed, precise cutting' },
                { step: '04', title: 'Quality Check', desc: 'Dimensional accuracy and edge quality' },
                { step: '05', title: 'Packaging', desc: 'Secure packing for transport' },
                { step: '06', title: 'Delivery', desc: 'On-time dispatch to your site' }
            ],
            checklist: [
                'Material grade and type (e.g., MS IS2062, SS304)',
                'Sheet thickness and dimensions',
                'Quantity required',
                'DXF/DWG files with accurate scaling',
                'Any post-cutting operations (e.g., bending, deburring)',
                'Delivery address and preferred timeline'
            ],
            faqs: [
                { q: 'What is the max thickness for MS sheet cutting?', a: 'Our high-power fiber laser can cut Mild Steel plates up to 45mm thickness.' },
                { q: 'How do you ensure sheet material yield?', a: 'We use advanced nesting software to minimize scrap and maximize parts per sheet.' },
                { q: 'Can you cut perforated patterns in thin sheets?', a: 'Yes, our lasers handle intricate patterns in thin sheets (0.5mm+) with zero warping.' },
                { q: 'Do you provide deburring services?', a: 'Yes, we provide mechanical deburring to ensure smooth, safe edges for handling.' },
                { q: 'Can you cut SS316 grade sheets?', a: 'Yes, we cut all SS grades including 304, 316, and 430 with high precision.' },
                { q: 'Is there a minimum order value?', a: 'We cater to all order sizes, from small job work to steady OEM supply.' },
                { q: 'Do you offer transport for heavy plates?', a: 'We can arrange local transport across Chennai for bulk and heavy plate orders.' },
                { q: 'What is your bed capacity for large sheets?', a: 'We have machines with bed sizes up to 8 meters (8000mm x 2500mm).' }
            ],
            seoParagraph: 'For <strong class="text-[#2C3E50]">sheet metal laser cutting in Chennai</strong>, especially for thick plates and high-volume orders, our advanced fiber laser technology ensures superior edge quality and minimal material waste. We cater to a wide range of industrial applications, providing precise <strong class="text-[#2C3E50]">MS sheet cutting</strong> and <strong class="text-[#2C3E50]">SS precision processing</strong> for various sectors.',
            keywords: [
                { text: 'Sheet Metal Cutting', img: '/gallery/Sheet Metal Laser Cutting/sm_01.jpg' },
                { text: 'Plate Cutting', img: '/gallery/Sheet Metal Laser Cutting/sm_02.jpg' },
                { text: 'Thick Plate Cutting', img: '/gallery/Sheet Metal Laser Cutting/sm_03.jpg' },
                { text: 'CRCA Sheet Cutting', img: '/gallery/Sheet Metal Laser Cutting/sm_04.jpg' },
                { text: 'GI Sheet Cutting', img: '/gallery/Sheet Metal Laser Cutting/sm_05.jpg' },
                { text: 'Industrial Sheet Processing', img: '/gallery/Sheet Metal Laser Cutting/sm_06.jpg' },
                { text: 'CNC Fiber Laser Sheet Cutting', img: '/gallery/Sheet Metal Laser Cutting/sm_07.jpg' },
                { text: 'MS Plate Cutting', img: '/gallery/Sheet Metal Laser Cutting/sm_08.jpg' },
                { text: 'SS Sheet Cutting', img: '/gallery/Sheet Metal Laser Cutting/sm_09.jpg' },
                { text: 'Precision Sheet Metal', img: '/gallery/Sheet Metal Laser Cutting/sm_10.jpg' }
            ]
        },
        {
            name: 'Fabrication Services',
            slug: '/chennai/fabrication-services',
            mainIcon: Wrench,
            title: 'Metal Fabrication & Job Work in Chennai',
            metaTitle: 'Best Metal Fabrication Services Chennai | Sheet Metal & SS',
            metaDescription: 'Looking for professional metal fabrication in Chennai? We offer precision bending, TIG/MIG welding, and complete assembly for industrial and pharma projects.',
            heroImage: '/gallery/Fabrication Services/RG-Tech-Catelog-vol-4_page-0016.jpg',
            heroDesc: 'Comprehensive industrial fabrication in Chennai. From precise laser cutting to specialized bending and high-strength welding, we handle the full production cycle.',
            secondaryImage: '/gallery/Fabrication Services/RG-Tech-Catelog-vol-4_page-0018.jpg',
            trustStrip: [
                { icon: Wrench, label: 'High-Precision Bending', sub: 'Up to 3m hydraulic' },
                { icon: Shield, label: 'TIG/MIG Welding', sub: 'High-strength joints' },
                { icon: CheckCircle, label: 'Full Assembly', sub: 'Machine enclosures' },
                { icon: Package, label: 'Finish Ready', sub: 'Powder coat options' }
            ],
            whyCards: [
                { icon: Target, title: 'One-Stop Shop', desc: 'Cut, bend, weld, and assemble under one roof to reduce lead times.' },
                { icon: Layers, title: 'Pharma & Food Grade', desc: 'Specialized stainless steel fabrication with 304/316 precision.' }
            ],
            capabilityDesc: 'End-to-end metal fabrication involving heavy-duty bending, high-strength structural welding, and precision assembly for industrial applications.',
            capabilitiesList: [
                { label: 'Bending Force', value: '300-Ton CNC Press Brake' },
                { label: 'Max Length', value: 'Bending up to 3100mm' },
                { label: 'Welding Specs', value: 'ASME Quality TIG/MIG/Spot Welding' },
                { label: 'Materials', value: 'Certified MS, SS304/316, Armor Plate' }
            ],
            supportedIndustries: [
                { icon: Factory, name: 'Heavy Machine OEM' },
                { icon: Shield, name: 'Defense & Aerospace' },
                { icon: Building2, name: 'Mining & Logistics' }
            ],
            processSteps: [
                { step: '01', title: 'Fit-up Review', desc: 'Jig and fixture design for assembly alignment' },
                { step: '02', title: 'Precision Bending', desc: 'CNC controlled angle accuracy check' },
                { step: '03', title: 'Certified Welding', desc: 'Structural joining following WPS guidelines' },
                { step: '04', title: 'Stress Relieving', desc: 'Ensuring weld integrity and geometry' }
            ],
            checklist: [
                'Weld strength / penetration requirements',
                'Critical assembly fitment tolerances',
                'Surface treatment (Painting/Galvanizing)',
                'Third-party inspection needs'
            ],
            faqs: [
                { q: 'Can you handle SS316 fabrication?', a: 'Yes, we have specialized setups and consumables for SS316 to prevent cross-contamination.' },
                { q: 'Do you provide leak-tested welding?', a: 'Yes, we perform DP (Dye Penetrant) testing for enclosures requiring air/water tightness.' },
                { q: 'What is your maximum bending thickness?', a: 'We can bend up to 12mm MS over 3 meters, and thicker plates over shorter lengths.' },
                { q: 'Do you offer post-weld grinding and polishing?', a: 'Absolutely. We provide industrial finishes ranging from rough grinding to high-gloss mirror polishing for SS.' },
                { q: 'Can you fabricate based on physical samples?', a: 'Yes, our engineering team can reverse-engineer your physical part to create production drawings.' },
                { q: 'Do you support prototype development?', a: 'We specialize in bridging the gap between design and production with rapid prototyping for new components.' },
                { q: 'What type of welding machines do you use?', a: 'We use premium inverter-based TIG, MIG, and Spot welding machines for consistent joint strength.' },
                { q: 'Can you handle large-volume structural fabrication?', a: 'Yes, our shop floor is equipped for heavy structural work including frames, skids, and large brackets.' }
            ],
            seoParagraph: 'Professional fabrication services in Chennai for industrial and architectural needs.',
            keywords: [
                { text: 'Metal Fabrication', img: '/gallery/Fabrication Services/RG-Tech-Catelog-vol-4_page-0008.jpg' },
                { text: 'Industrial Fabrication Services', img: '/gallery/Fabrication Services/RG-Tech-Catelog-vol-4_page-0009.jpg' },
                { text: 'Welded Assemblies', img: '/gallery/Fabrication Services/RG-Tech-Catelog-vol-4_page-0010.jpg' },
                { text: 'CNC Bending', img: '/gallery/Fabrication Services/RG-Tech-Catelog-vol-4_page-0011.jpg' },
                { text: 'Folding', img: '/gallery/Fabrication Services/RG-Tech-Catelog-vol-4_page-0012.jpg' },
                { text: 'TIG/MIG Welding', img: '/gallery/Fabrication Services/RG-Tech-Catelog-vol-4_page-0013.jpg' },
                { text: 'Structural Fabrication', img: '/gallery/Fabrication Services/RG-Tech-Catelog-vol-4_page-0015.jpg' },
                { text: 'Machine Enclosures', img: '/gallery/Fabrication Services/RG-Tech-Catelog-vol-4_page-0016.jpg' },
                { text: 'Custom Steel Fabrication', img: '/gallery/Fabrication Services/RG-Tech-Catelog-vol-4_page-0017.jpg' },
                { text: 'Production Weldment', img: '/gallery/Fabrication Services/RG-Tech-Catelog-vol-4_page-0018.jpg' }
            ]
        },
        {
            name: 'Steel Gates',
            slug: '/chennai/steel-gates',
            mainIcon: Home,
            title: 'Designer Laser Cut Steel Gates Chennai',
            metaTitle: 'Laser Cut Steel Gates Chennai | Designer Main Gate Fabricators',
            metaDescription: 'Custom designer main gates in Chennai. Laser cut gate patterns in MS and Stainless Steel. Modern entrances for villas and factories with durable PU finishes.',
            heroImage: '/gallery/Steel Gates/RG-Tech-Catelog-vol-4_page-0129.jpg',
            heroDesc: 'Elevate your property with custom laser-cut steel gates. Combining modern aesthetics with industrial-grade security, our gates are built to last.',
            secondaryImage: '/gallery/Steel Gates/RG-Tech-Catelog-vol-4_page-0135.jpg',
            trustStrip: [
                { icon: Sparkles, label: 'Designer Patterns', sub: '100+ CNC designs' },
                { icon: Shield, label: 'Heavy Duty', sub: 'Structural frames' },
                { icon: Target, label: 'Custom Fit', sub: 'On-site measurement' },
                { icon: Paintbrush, label: 'Weather Resistant', sub: 'Powder coated' }
            ],
            whyCards: [
                { icon: Target, title: 'Visual Impact', desc: 'Intricate patterns that create a stunning first impression.' },
                { icon: Shield, title: 'Lifetime Durability', desc: 'Premium materials and anti-rust treatments for longevity.' }
            ],
            capabilityDesc: 'Custom-engineered entrance solutions that blend high-end laser-cut aesthetics with heavy-duty structural frames for residential and commercial security.',
            capabilitiesList: [
                { label: 'Frame Material', value: 'Heavy Duty MS Hollow Sections' },
                { label: 'Design Infill', value: '3mm-8mm Laser-Cut Designer Plates' },
                { label: 'Rust Protection', value: 'Epoxy Primer + Polyurethane (PU) Finish' },
                { label: 'Operation', value: 'Manual, Sliding, or Fully Automated' }
            ],
            supportedIndustries: [
                { icon: Home, name: 'Luxury Residential Villas' },
                { icon: Building2, name: 'Gated Communities' },
                { icon: Factory, name: 'Corporate Industrial Units' }
            ],
            processSteps: [
                { step: '01', title: 'Site Inspection', desc: 'Physical measurement and floor level check' },
                { step: '02', title: 'Pattern Approval', desc: 'Selecting from architectural 2D/3D catalogs' },
                { step: '03', title: 'Structural Fab', desc: 'Welding the main swing/slide frame' },
                { step: '04', title: 'Pattern Inlay', desc: 'Precision fixing of the laser-cut panels' }
            ],
            checklist: [
                'Width and Height of the clear opening',
                'Swing space vs Sliding track availability',
                'Automation preference (Motorized/Manual)',
                'Color and RAL finish code'
            ],
            faqs: [
                { q: 'Do you provide the motor for sliding gates?', a: 'Yes, we can integrate high-quality Italian or local motors with remote access.' },
                { q: 'Will the gate rust in coastal Chennai?', a: 'We recommend SS304 or Sand-blasted MS with PU coating for coastal regions to prevent rust.' },
                { q: 'Can you cut my custom CAD pattern?', a: 'Absolutely. We specialize in custom architectural designs beyond our standard catalog.' },
                { q: 'How long does site installation take?', a: 'Typically 1–2 days once the gate is fabricated and transported to your site.' },
                { q: 'Do you offer bi-folding gates for narrow spaces?', a: 'Yes, we design specialized bi-folding laser-cut gates that require minimal parking space.' },
                { q: 'What maintenance is required for automated gates?', a: 'Basic cleaning and periodic lubrication of the track/hinges ensure years of smooth operation.' },
                { q: 'Can the gate be integrated with home automation?', a: 'Our motors are compatible with most smart home systems for mobile-app control.' },
                { q: 'What is the standard thickness for gate panels?', a: 'We use 3mm to 6mm plates depending on the design complexity and security needs.' }
            ],
            seoParagraph: 'Modern laser cut gate designs in Chennai for residential and commercial properties.',
            keywords: [
                { text: 'Laser Cut Gates', img: '/gallery/Steel Gates/RG-Tech-Catelog-vol-4_page-0120.jpg' },
                { text: 'Designer Steel Gates', img: '/gallery/Steel Gates/RG-Tech-Catelog-vol-4_page-0121.jpg' },
                { text: 'Modern Entrance Gates', img: '/gallery/Steel Gates/RG-Tech-Catelog-vol-4_page-0122.jpg' },
                { text: 'Sliding Gates', img: '/gallery/Steel Gates/RG-Tech-Catelog-vol-4_page-0123.jpg' },
                { text: 'Automated Gates', img: '/gallery/Steel Gates/RG-Tech-Catelog-vol-4_page-0124.jpg' },
                { text: 'Front Gate Designs', img: '/gallery/Steel Gates/RG-Tech-Catelog-vol-4_page-0125.jpg' },
                { text: 'MS Gate Fabrication', img: '/gallery/Steel Gates/RG-Tech-Catelog-vol-4_page-0126.jpg' },
                { text: 'SS Gate Designs', img: '/gallery/Steel Gates/RG-Tech-Catelog-vol-4_page-0127.jpg' },
                { text: 'Villa Gates', img: '/gallery/Steel Gates/RG-Tech-Catelog-vol-4_page-0128.jpg' },
                { text: 'Architectural Gates', img: '/gallery/Steel Gates/RG-Tech-Catelog-vol-4_page-0129.jpg' }
            ]
        },
        {
            name: 'Metal Safety Doors',
            slug: '/chennai/metal-safety-doors',
            mainIcon: DoorOpen,
            title: 'Premium Metal Safety Doors in Chennai',
            metaTitle: 'Designer Metal Safety Doors Chennai | Laser Cut Security Doors',
            metaDescription: 'Best metal safety doors in Chennai. Secure your home with aesthetic laser-cut security doors. Custom multi-lock prep in MS and SS for residential use.',
            heroImage: '/gallery/Metal Safety Doors/premium-quality-are-made-of-heavy-duty-stainless-steel-safety-doors--144.jpg',
            heroDesc: 'Uncompromising security meets stunning design. Our laser-cut metal safety doors provide industrial-grade protection with a premium look.',
            secondaryImage: '/gallery/Metal Safety Doors/mild-steel-hinged-safety-door.jpg',
            trustStrip: [
                { icon: Shield, label: 'Anti-Theft', sub: 'High-strength panels' },
                { icon: Zap, label: 'Breathable Jali', sub: 'Airflow + Security' },
                { icon: Target, label: 'Precision Fit', sub: 'Zero gap fitment' },
                { icon: Layers, label: 'Multi-Material', sub: 'MS, SS, Wood-Inlay' }
            ],
            whyCards: [
                { icon: Target, title: 'Smart Designs', desc: 'Safety features hidden within beautiful jali patterns.' },
                { icon: Shield, title: 'Rigid Frame', desc: 'Heavy-duty steel frames that resist forced entry.' }
            ],
            capabilityDesc: 'Industrial-grade home security solutions featuring reinforced steel frames and artistic laser-cut jali patterns, providing both uncompromising protection and architectural beauty.',
            capabilitiesList: [
                { label: 'Security Panel', value: '4mm-6mm MS/SS High-Strength Plate' },
                { label: 'Lock Prep', value: 'Pre-machined for Multi-Stage Digital Locks' },
                { icon: Wind, label: 'Ventilation', value: 'Optimized Jali airflow ratio' },
                { label: 'Durability', value: 'Galvanized + High-Gloss PU Coating' }
            ],
            supportedIndustries: [
                { icon: Home, name: 'Premium Apartments' },
                { icon: Shield, name: 'Corporate Security Units' },
                { icon: Building2, name: 'Commercial Offices' }
            ],
            processSteps: [
                { step: '01', title: 'Survey & Scan', desc: 'Precise electronic measurement of entrance clearance' },
                { step: '02', title: 'Pattern Customization', desc: 'Scaling jali motifs to fit door dimensions' },
                { step: '03', title: 'Core Fabrication', desc: 'Welding reinforced Z-sections for high stiffness' },
                { step: '04', title: 'Hardware Integration', desc: 'Pre-fitting hinges and security locking mechanisms' }
            ],
            checklist: [
                'Opening direction (L/R - Inside/Outside)',
                'Existing frame material (Wood/Concrete/Granite)',
                'Digital-lock vs Manual-lock cutouts',
                'Mesh type requirement (Mosquito/Stainless Mesh)'
            ],
            faqs: [
                { q: 'Is it possible to integrate a mosquito mesh?', a: 'Yes, we provide a dual-layer door system with a secondary mesh frame behind the laser-cut panel.' },
                { q: 'Can I use a smart digital lock on your safety doors?', a: 'Certainly. We can laser-cut the lock pocket specifically to the dimensions of any major digital lock brand.' },
                { q: 'Do you offer wood-finish textures?', a: 'Yes, we can powder-coat the steel with realistic wood-grain textures to match your main door.' },
                { q: 'What is the security rating of your doors?', a: 'We use reinforced steel Z-sections and 4mm+ plates, making them highly resistant to forced entry.' },
                { q: 'Are these doors suitable for apartment entrances?', a: 'Definitely. They are designed to fit perfectly within the standard 4ft x 7ft or 3.5ft x 7ft apartment frames.' },
                { q: 'Does the door come with a warranty?', a: 'We provide a 1-year manufacturing warranty on the structure and high-quality coating.' },
                { q: 'How do you handle site measurements?', a: 'Our technician visits your home to take precision laser measurements before we start fabrication.' },
                { q: 'Can I customize the jali design?', a: 'Yes, you can choose from our residential catalog or provide your own reference design.' }
            ],
            seoParagraph: 'Designer safety doors in Chennai with laser cut patterns for home security.',
            keywords: [
                { text: 'Security Doors', img: '/gallery/Metal Safety Doors/metal-ms-safety-door-for-resi-20240524162939656.jpg' },
                { text: 'Apartment Safety Doors', img: '/gallery/Metal Safety Doors/mild-steel-hinged-safety-door.jpg' },
                { text: 'Laser Cut Door Jali', img: '/gallery/Metal Safety Doors/safety-door-jali.jpg' },
                { text: 'Residential Safety Doors', img: '/gallery/Metal Safety Doors/image5.jpg' },
                { text: 'Main Door Safety Grill', img: '/gallery/Metal Safety Doors/steel-safety-door.jpg' },
                { text: 'Designer Security Doors', img: '/gallery/Metal Safety Doors/mild-steel-safety-door-500x500.webp' },
                { text: 'Metal Jali Doors', img: '/gallery/Metal Safety Doors/flowert-safety-door.webp' },
                { text: 'Premium Safety Entry', img: '/gallery/Metal Safety Doors/product-jpeg.jpg' },
                { text: 'Reinforced Metal Doors', img: '/gallery/Metal Safety Doors/premium-quality-are-made-of-heavy-duty-stainless-steel-safety-doors--144.jpg' }
            ]
        },
        {
            name: 'Decorative Metal Panels',
            slug: '/chennai/decorative-metal-panels',
            mainIcon: Sparkles,
            title: 'Custom Laser Cut Decorative Panels Chennai',
            metaTitle: 'Laser Cut Metal Jali & Decorative Panels Chennai | CNC Art',
            metaDescription: 'Stunning decorative metal panels in Chennai. Laser cut jali for interiors, pooja rooms, partitions, and facades. CNC metal wall art and 3D PVD-coated panels.',
            heroImage: '/gallery/Decorative Metal Panels/RG-Tech-Catelog-Vol-02_page-0054.jpg',
            heroDesc: 'Premium CNC jali and decorative metal panels for modern architecture. Perfect for interiors, partitions, balconies, and exterior facades.',
            secondaryImage: '/gallery/Decorative Metal Panels/RG-Tech-Catelog-Vol-02_page-0062.jpg',
            trustStrip: [
                { icon: Sparkles, label: 'Artistic CNC', sub: 'Precision detailing' },
                { icon: Layers, label: 'Al, Cu, Brass, SS', sub: 'Premium metals' },
                { icon: Target, label: 'Interior Ready', sub: 'Pooja/Partitions' },
                { icon: Wind, label: 'Balcony Panels', sub: 'UV/Rust resistant' }
            ],
            whyCards: [
                { icon: Target, title: 'Infinite Designs', desc: 'Download from our catalog or bring your own Pinterest designs.' },
                { icon: Zap, title: 'Fast Execution', desc: 'Quick turnaround for interior designers and architects.' }
            ],
            capabilityDesc: 'Sophisticated metal art and architectural screening solutions for premium interiors, facade treatments, and space partitioning.',
            capabilitiesList: [
                { label: 'Complexity', value: 'Micro-precision laser carving (±0.02mm)' },
                { label: 'Metal Range', value: 'PVD Coated SS, Mirror Brass, Copper, Aluminum' },
                { label: 'Size Formats', value: 'Continuous panels up to 3000mm length' },
                { label: 'Mounting', value: 'Hidden studs, framing, or standoff systems' }
            ],
            supportedIndustries: [
                { icon: Paintbrush, name: 'Interior Design Hubs' },
                { icon: Building2, name: 'Architectural Project Sites' },
                { icon: Sparkles, name: 'Luxury Hospitality' }
            ],
            processSteps: [
                { step: '01', title: 'Material Selection', desc: 'Choosing base alloy and PVD finish/texture' },
                { step: '02', title: 'Intricate Carving', desc: 'Ultra-precision laser processing for fine motifs' },
                { step: '03', title: 'Surface Treatment', desc: 'Polishing, brushing, or protective clear-coating' },
                { step: '04', title: 'Shadow Mapping', desc: 'Ensuring light-play through pattern verification' }
            ],
            checklist: [
                'Indoor vs Outdoor application (Material choice)',
                'Visual privacy vs Transparency ratio',
                'Installation height and mounting safety',
                'Special finishes (Antique / PVD / Rose Gold)'
            ],
            faqs: [
                { q: 'Are your brass panels actual brass or coated?', a: 'We provide both solid brass sheets and PVD-coated stainless steel which offers better durability and cost efficiency.' },
                { q: 'Can you create 3D effects with metal?', a: 'By layering different laser-cut patterns and using standoffs, we can create stunning depth and 3D shadow effects.' },
                { q: 'Can these panels be used for balcony railings?', a: 'Yes, we use thicker 5mm-8mm sheets for railings to ensure structural safety and BCA compliance.' },
                { q: 'What is PVD coating?', a: 'Physical Vapor Deposition is a high-end finish that provides vibrant gold, rose-gold, or black colors with extreme scratch resistance.' },
                { q: 'Can you cut very intricate pooja room designs?', a: 'Yes, our precision lasers can handle extremely fine motifs, ideal for religious and spiritual patterns.' },
                { q: 'Do you offer backlit panel solutions?', a: 'We can provide the metal casing and acrylic diffusers, ready for your electrician to install LED strips.' },
                { q: 'How do I clean decorative metal panels?', a: 'A simple wipe with a soft microfiber cloth is enough to maintain the sheen of our coated panels.' },
                { q: 'What is the maximum size for a single panel?', a: 'We can cut single continuous panels up to 3 meters (10 feet) in height/length.' }
            ],
            seoParagraph: 'Custom CNC jali panels and laser cut decorative screens for Chennai interiors.',
            keywords: [
                { text: 'Divine Durga & Spiritual Art', img: '/gallery/Decorative Metal Panels/RG-Tech-Catelog-Vol-02_page-0004.jpg' },
                { text: 'Traditional Deity Designs', img: '/gallery/Decorative Metal Panels/RG-Tech-Catelog-Vol-02_page-0005.jpg' },
                { text: 'Sacred Icon Patterns', img: '/gallery/Decorative Metal Panels/RG-Tech-Catelog-Vol-02_page-0006.jpg' },
                { text: 'Lord Ganesha Wall Art', img: '/gallery/Decorative Metal Panels/RG-Tech-Catelog-Vol-02_page-0011.jpg' },
                { text: 'Spiritual Religious Panels', img: '/gallery/Decorative Metal Panels/RG-Tech-Catelog-Vol-02_page-0012.jpg' },
                { text: 'Vinayagar Designs', img: '/gallery/Decorative Metal Panels/RG-Tech-Catelog-Vol-02_page-0013.jpg' },
                { text: 'Buddha Designs', img: '/gallery/Decorative Metal Panels/RG-Tech-Catelog-Vol-02_page-0018.jpg' },
                { text: 'Perumal Designs', img: '/gallery/Decorative Metal Panels/RG-Tech-Catelog-Vol-02_page-0019.jpg' },
                { text: 'Jesus Designs', img: '/gallery/Decorative Metal Panels/RG-Tech-Catelog-Vol-02_page-0020.jpg' },
                { text: 'Butterfly Patterns', img: '/gallery/Decorative Metal Panels/RG-Tech-Catelog-Vol-02_page-0025.jpg' },
                { text: 'Peacock Patterns', img: '/gallery/Decorative Metal Panels/RG-Tech-Catelog-Vol-02_page-0026.jpg' },
                { text: 'Tree of Life Jali', img: '/gallery/Decorative Metal Panels/RG-Tech-Catelog-Vol-02_page-0027.jpg' },
                { text: 'Balcony Panels', img: '/gallery/Decorative Metal Panels/RG-Tech-Catelog-Vol-02_page-0032.jpg' },
                { text: 'Interior Screens', img: '/gallery/Decorative Metal Panels/RG-Tech-Catelog-Vol-02_page-0033.jpg' },
                { text: 'Facade Panels', img: '/gallery/Decorative Metal Panels/RG-Tech-Catelog-Vol-02_page-0034.jpg' }
            ]
        }
    ]

    const activePillarServices = pillarServices;

    const industries = [
        { icon: Settings, name: 'Automotive Vendors', desc: 'Precision parts for vehicle components & assemblies' },
        { icon: Factory, name: 'Machine Builders / OEM', desc: 'Custom brackets, housings & structural components' },
        { icon: Cpu, name: 'Electrical Panel Mfg.', desc: 'Panel cutouts, bus bar supports & enclosures' },
        { icon: Wind, name: 'HVAC & Ducting', desc: 'Duct components, dampers & ventilation parts' },
        { icon: Building2, name: 'Construction', desc: 'Structural steel, brackets & embedded elements' },
        { icon: Paintbrush, name: 'Interiors / Architectural', desc: 'Decorative screens, railings & artistic metal works' }
    ]

    const differentiators = [
        { icon: CheckCircle, title: 'Quality Checks & Fitment Control', desc: 'Rigorous QC at every stage ensures dimensional accuracy.' },
        { icon: Wrench, title: 'Production + Prototype Support', desc: 'From single prototype to full production runs.' },
        { icon: FileText, title: 'Drawing Support (DXF/STEP)', desc: 'We help convert sketches to production-ready files.' },
        { icon: Layers, title: 'Material Flexibility', desc: 'MS, SS 304/316/430, Aluminum, Copper & Brass.' },
        { icon: Sparkles, title: 'Clean Edges & Finishing', desc: 'Burr-free cuts ready for paint, powder coat or weld.' },
        { icon: Package, title: 'Reliable Delivery & Packaging', desc: 'Secure packaging and on-time dispatch across Chennai.' }
    ]

    const processSteps = [
        { step: '01', title: 'Share Requirement', desc: 'Send your drawing (DXF/STEP) with specs', icon: FileText },
        { step: '02', title: 'Quick Quote + DFM', desc: 'Get pricing with manufacturing suggestions', icon: Send },
        { step: '03', title: 'Production', desc: 'Precision cutting and fabrication begins', icon: Zap },
        { step: '04', title: 'QC + Finishing', desc: 'Quality checks and surface treatment', icon: Eye },
        { step: '05', title: 'Dispatch', desc: 'Packed and delivered to your location', icon: Truck }
    ]

    const testimonials = [
        { name: 'Rajesh Kumar', company: 'KR Fabrications Pvt Ltd', text: 'RG Tech delivered 200+ laser-cut panels on time with perfect dimensional accuracy. Their DFM suggestions saved us 15% on material costs.', rating: 5 },
        { name: 'Priya Venkatesh', company: 'Archstone Interiors', text: 'The decorative jali panels they produced for our hotel lobby project were flawless. Excellent finishing quality and responsive communication.', rating: 5 },
        { name: 'Suresh Babu', company: 'Sai Industrial Solutions', text: 'We have been sourcing laser-cut parts from RG Tech for 3 years. Consistent quality, competitive pricing, and reliable delivery every time.', rating: 5 }
    ]

    const faqs = [
        { q: 'What files do you accept for laser cutting?', a: 'We accept DXF, STEP, DWG, PDF, and even hand-drawn sketches. Our team can help convert your designs to production-ready files.' },
        { q: 'Do you handle prototype and bulk orders?', a: 'Yes! We support single-piece prototypes through to high-volume production runs with consistent quality.' },
        { q: 'What materials do you work with?', a: 'Mild Steel (up to 45mm), Stainless Steel 304/316/430 (up to 45mm), Aluminum (up to 30mm), Copper and Brass (up to 16mm).' },
        { q: 'Do you provide fabrication after cutting?', a: 'Absolutely. We offer complete fabrication services including bending, welding, grinding, and powder coating.' },
        { q: 'Can I order custom gates/doors with laser patterns?', a: 'Yes, we specialize in custom-designed steel gates, safety doors, and decorative panels with intricate laser-cut patterns.' },
        { q: 'How do I get a quote quickly?', a: 'Share your drawing with material, thickness, and quantity details via our form or WhatsApp. We respond within 24 business hours.' }
    ]

    const GalleryPage = () => {
        const [searchParams] = useSearchParams()
        const categoryParam = searchParams.get('category')

        const [activeFilter, setActiveFilter] = useState('All')
        const [visibleItems, setVisibleItems] = useState(12)
        const [lightboxIndex, setLightboxIndex] = useState(null)
        const isLightboxOpen = lightboxIndex !== null

        const filters = [
            'All',
            'Laser Cutting Services',
            'Sheet Metal Laser Cutting',
            'Fabrication Services',
            'Steel Gates',
            'Metal Safety Doors',
            'Decorative Metal Panels'
        ]

        useEffect(() => {
            if (categoryParam && filters.includes(categoryParam)) {
                setActiveFilter(categoryParam)
            }
        }, [categoryParam])

        const items = [
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_10.jpg', title: 'Rg Tech Catelog Vol 01 Page 10', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_100.jpg', title: 'Rg Tech Catelog Vol 01 Page 100', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_101.jpg', title: 'Rg Tech Catelog Vol 01 Page 101', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_102.jpg', title: 'Rg Tech Catelog Vol 01 Page 102', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_103.jpg', title: 'Rg Tech Catelog Vol 01 Page 103', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_104.jpg', title: 'Rg Tech Catelog Vol 01 Page 104', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_105.jpg', title: 'Rg Tech Catelog Vol 01 Page 105', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_106.jpg', title: 'Rg Tech Catelog Vol 01 Page 106', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_107.jpg', title: 'Rg Tech Catelog Vol 01 Page 107', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_108.jpg', title: 'Rg Tech Catelog Vol 01 Page 108', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_109.jpg', title: 'Rg Tech Catelog Vol 01 Page 109', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_11.jpg', title: 'Rg Tech Catelog Vol 01 Page 11', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_110.jpg', title: 'Rg Tech Catelog Vol 01 Page 110', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_111.jpg', title: 'Rg Tech Catelog Vol 01 Page 111', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_112.jpg', title: 'Rg Tech Catelog Vol 01 Page 112', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_113.jpg', title: 'Rg Tech Catelog Vol 01 Page 113', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_114.jpg', title: 'Rg Tech Catelog Vol 01 Page 114', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_115.jpg', title: 'Rg Tech Catelog Vol 01 Page 115', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_116.jpg', title: 'Rg Tech Catelog Vol 01 Page 116', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_117.jpg', title: 'Rg Tech Catelog Vol 01 Page 117', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_118.jpg', title: 'Rg Tech Catelog Vol 01 Page 118', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_119.jpg', title: 'Rg Tech Catelog Vol 01 Page 119', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_12.jpg', title: 'Rg Tech Catelog Vol 01 Page 12', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_120.jpg', title: 'Rg Tech Catelog Vol 01 Page 120', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_121.jpg', title: 'Rg Tech Catelog Vol 01 Page 121', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_122.jpg', title: 'Rg Tech Catelog Vol 01 Page 122', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_123.jpg', title: 'Rg Tech Catelog Vol 01 Page 123', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_124.jpg', title: 'Rg Tech Catelog Vol 01 Page 124', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_125.jpg', title: 'Rg Tech Catelog Vol 01 Page 125', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_126.jpg', title: 'Rg Tech Catelog Vol 01 Page 126', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_127.jpg', title: 'Rg Tech Catelog Vol 01 Page 127', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_128.jpg', title: 'Rg Tech Catelog Vol 01 Page 128', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_129.jpg', title: 'Rg Tech Catelog Vol 01 Page 129', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_13.jpg', title: 'Rg Tech Catelog Vol 01 Page 13', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_130.jpg', title: 'Rg Tech Catelog Vol 01 Page 130', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_131.jpg', title: 'Rg Tech Catelog Vol 01 Page 131', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_132.jpg', title: 'Rg Tech Catelog Vol 01 Page 132', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_133.jpg', title: 'Rg Tech Catelog Vol 01 Page 133', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_134.jpg', title: 'Rg Tech Catelog Vol 01 Page 134', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_135.jpg', title: 'Rg Tech Catelog Vol 01 Page 135', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_136.jpg', title: 'Rg Tech Catelog Vol 01 Page 136', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_137.jpg', title: 'Rg Tech Catelog Vol 01 Page 137', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_138.jpg', title: 'Rg Tech Catelog Vol 01 Page 138', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_139.jpg', title: 'Rg Tech Catelog Vol 01 Page 139', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_14.jpg', title: 'Rg Tech Catelog Vol 01 Page 14', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_140.jpg', title: 'Rg Tech Catelog Vol 01 Page 140', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_141.jpg', title: 'Rg Tech Catelog Vol 01 Page 141', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_142.jpg', title: 'Rg Tech Catelog Vol 01 Page 142', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_143.jpg', title: 'Rg Tech Catelog Vol 01 Page 143', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_144.jpg', title: 'Rg Tech Catelog Vol 01 Page 144', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_145.jpg', title: 'Rg Tech Catelog Vol 01 Page 145', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_146.jpg', title: 'Rg Tech Catelog Vol 01 Page 146', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_147.jpg', title: 'Rg Tech Catelog Vol 01 Page 147', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_148.jpg', title: 'Rg Tech Catelog Vol 01 Page 148', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_149.jpg', title: 'Rg Tech Catelog Vol 01 Page 149', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_15.jpg', title: 'Rg Tech Catelog Vol 01 Page 15', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_150.jpg', title: 'Rg Tech Catelog Vol 01 Page 150', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_151.jpg', title: 'Rg Tech Catelog Vol 01 Page 151', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_152.jpg', title: 'Rg Tech Catelog Vol 01 Page 152', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_153.jpg', title: 'Rg Tech Catelog Vol 01 Page 153', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_154.jpg', title: 'Rg Tech Catelog Vol 01 Page 154', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_155.jpg', title: 'Rg Tech Catelog Vol 01 Page 155', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_156.jpg', title: 'Rg Tech Catelog Vol 01 Page 156', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_157.jpg', title: 'Rg Tech Catelog Vol 01 Page 157', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_158.jpg', title: 'Rg Tech Catelog Vol 01 Page 158', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_159.jpg', title: 'Rg Tech Catelog Vol 01 Page 159', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_16.jpg', title: 'Rg Tech Catelog Vol 01 Page 16', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_160.jpg', title: 'Rg Tech Catelog Vol 01 Page 160', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_161.jpg', title: 'Rg Tech Catelog Vol 01 Page 161', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_162.jpg', title: 'Rg Tech Catelog Vol 01 Page 162', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_163.jpg', title: 'Rg Tech Catelog Vol 01 Page 163', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_164.jpg', title: 'Rg Tech Catelog Vol 01 Page 164', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_165.jpg', title: 'Rg Tech Catelog Vol 01 Page 165', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_166.jpg', title: 'Rg Tech Catelog Vol 01 Page 166', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_167.jpg', title: 'Rg Tech Catelog Vol 01 Page 167', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_168.jpg', title: 'Rg Tech Catelog Vol 01 Page 168', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_169.jpg', title: 'Rg Tech Catelog Vol 01 Page 169', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_17.jpg', title: 'Rg Tech Catelog Vol 01 Page 17', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_170.jpg', title: 'Rg Tech Catelog Vol 01 Page 170', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_171.jpg', title: 'Rg Tech Catelog Vol 01 Page 171', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_172.jpg', title: 'Rg Tech Catelog Vol 01 Page 172', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_173.jpg', title: 'Rg Tech Catelog Vol 01 Page 173', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_174.jpg', title: 'Rg Tech Catelog Vol 01 Page 174', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_175.jpg', title: 'Rg Tech Catelog Vol 01 Page 175', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_176.jpg', title: 'Rg Tech Catelog Vol 01 Page 176', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_177.jpg', title: 'Rg Tech Catelog Vol 01 Page 177', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_178.jpg', title: 'Rg Tech Catelog Vol 01 Page 178', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_179.jpg', title: 'Rg Tech Catelog Vol 01 Page 179', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_18.jpg', title: 'Rg Tech Catelog Vol 01 Page 18', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_180.jpg', title: 'Rg Tech Catelog Vol 01 Page 180', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_181.jpg', title: 'Rg Tech Catelog Vol 01 Page 181', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_182.jpg', title: 'Rg Tech Catelog Vol 01 Page 182', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_183.jpg', title: 'Rg Tech Catelog Vol 01 Page 183', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_184.jpg', title: 'Rg Tech Catelog Vol 01 Page 184', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_185.jpg', title: 'Rg Tech Catelog Vol 01 Page 185', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_186.jpg', title: 'Rg Tech Catelog Vol 01 Page 186', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_187.jpg', title: 'Rg Tech Catelog Vol 01 Page 187', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_188.jpg', title: 'Rg Tech Catelog Vol 01 Page 188', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_189.jpg', title: 'Rg Tech Catelog Vol 01 Page 189', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_19.jpg', title: 'Rg Tech Catelog Vol 01 Page 19', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_190.jpg', title: 'Rg Tech Catelog Vol 01 Page 190', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_191.jpg', title: 'Rg Tech Catelog Vol 01 Page 191', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_192.jpg', title: 'Rg Tech Catelog Vol 01 Page 192', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_193.jpg', title: 'Rg Tech Catelog Vol 01 Page 193', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_194.jpg', title: 'Rg Tech Catelog Vol 01 Page 194', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_195.jpg', title: 'Rg Tech Catelog Vol 01 Page 195', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_196.jpg', title: 'Rg Tech Catelog Vol 01 Page 196', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_197.jpg', title: 'Rg Tech Catelog Vol 01 Page 197', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_198.jpg', title: 'Rg Tech Catelog Vol 01 Page 198', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_199.jpg', title: 'Rg Tech Catelog Vol 01 Page 199', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_2.jpg', title: 'Rg Tech Catelog Vol 01 Page 2', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_20.jpg', title: 'Rg Tech Catelog Vol 01 Page 20', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_200.jpg', title: 'Rg Tech Catelog Vol 01 Page 200', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_201.jpg', title: 'Rg Tech Catelog Vol 01 Page 201', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_202.jpg', title: 'Rg Tech Catelog Vol 01 Page 202', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_203.jpg', title: 'Rg Tech Catelog Vol 01 Page 203', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_204.jpg', title: 'Rg Tech Catelog Vol 01 Page 204', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_205.jpg', title: 'Rg Tech Catelog Vol 01 Page 205', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_206.jpg', title: 'Rg Tech Catelog Vol 01 Page 206', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_207.jpg', title: 'Rg Tech Catelog Vol 01 Page 207', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_208.jpg', title: 'Rg Tech Catelog Vol 01 Page 208', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_209.jpg', title: 'Rg Tech Catelog Vol 01 Page 209', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_21.jpg', title: 'Rg Tech Catelog Vol 01 Page 21', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_210.jpg', title: 'Rg Tech Catelog Vol 01 Page 210', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_211.jpg', title: 'Rg Tech Catelog Vol 01 Page 211', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_212.jpg', title: 'Rg Tech Catelog Vol 01 Page 212', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_213.jpg', title: 'Rg Tech Catelog Vol 01 Page 213', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_214.jpg', title: 'Rg Tech Catelog Vol 01 Page 214', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_215.jpg', title: 'Rg Tech Catelog Vol 01 Page 215', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_216.jpg', title: 'Rg Tech Catelog Vol 01 Page 216', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_217.jpg', title: 'Rg Tech Catelog Vol 01 Page 217', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_218.jpg', title: 'Rg Tech Catelog Vol 01 Page 218', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_219.jpg', title: 'Rg Tech Catelog Vol 01 Page 219', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_22.jpg', title: 'Rg Tech Catelog Vol 01 Page 22', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_220.jpg', title: 'Rg Tech Catelog Vol 01 Page 220', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_221.jpg', title: 'Rg Tech Catelog Vol 01 Page 221', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_222.jpg', title: 'Rg Tech Catelog Vol 01 Page 222', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_223.jpg', title: 'Rg Tech Catelog Vol 01 Page 223', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_224.jpg', title: 'Rg Tech Catelog Vol 01 Page 224', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_225.jpg', title: 'Rg Tech Catelog Vol 01 Page 225', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_226.jpg', title: 'Rg Tech Catelog Vol 01 Page 226', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_227.jpg', title: 'Rg Tech Catelog Vol 01 Page 227', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_228.jpg', title: 'Rg Tech Catelog Vol 01 Page 228', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_229.jpg', title: 'Rg Tech Catelog Vol 01 Page 229', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_23.jpg', title: 'Rg Tech Catelog Vol 01 Page 23', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_230.jpg', title: 'Rg Tech Catelog Vol 01 Page 230', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_231.jpg', title: 'Rg Tech Catelog Vol 01 Page 231', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_232.jpg', title: 'Rg Tech Catelog Vol 01 Page 232', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_233.jpg', title: 'Rg Tech Catelog Vol 01 Page 233', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_234.jpg', title: 'Rg Tech Catelog Vol 01 Page 234', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_235.jpg', title: 'Rg Tech Catelog Vol 01 Page 235', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_236.jpg', title: 'Rg Tech Catelog Vol 01 Page 236', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_237.jpg', title: 'Rg Tech Catelog Vol 01 Page 237', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_238.jpg', title: 'Rg Tech Catelog Vol 01 Page 238', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_239.jpg', title: 'Rg Tech Catelog Vol 01 Page 239', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_24.jpg', title: 'Rg Tech Catelog Vol 01 Page 24', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_240.jpg', title: 'Rg Tech Catelog Vol 01 Page 240', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_241.jpg', title: 'Rg Tech Catelog Vol 01 Page 241', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_242.jpg', title: 'Rg Tech Catelog Vol 01 Page 242', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_243.jpg', title: 'Rg Tech Catelog Vol 01 Page 243', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_244.jpg', title: 'Rg Tech Catelog Vol 01 Page 244', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_245.jpg', title: 'Rg Tech Catelog Vol 01 Page 245', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_25.jpg', title: 'Rg Tech Catelog Vol 01 Page 25', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_26.jpg', title: 'Rg Tech Catelog Vol 01 Page 26', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_27.jpg', title: 'Rg Tech Catelog Vol 01 Page 27', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_28.jpg', title: 'Rg Tech Catelog Vol 01 Page 28', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_29.jpg', title: 'Rg Tech Catelog Vol 01 Page 29', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_3.jpg', title: 'Rg Tech Catelog Vol 01 Page 3', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_30.jpg', title: 'Rg Tech Catelog Vol 01 Page 30', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_31.jpg', title: 'Rg Tech Catelog Vol 01 Page 31', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_32.jpg', title: 'Rg Tech Catelog Vol 01 Page 32', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_33.jpg', title: 'Rg Tech Catelog Vol 01 Page 33', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_34.jpg', title: 'Rg Tech Catelog Vol 01 Page 34', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_35.jpg', title: 'Rg Tech Catelog Vol 01 Page 35', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_36.jpg', title: 'Rg Tech Catelog Vol 01 Page 36', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_37.jpg', title: 'Rg Tech Catelog Vol 01 Page 37', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_38.jpg', title: 'Rg Tech Catelog Vol 01 Page 38', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_39.jpg', title: 'Rg Tech Catelog Vol 01 Page 39', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_4.jpg', title: 'Rg Tech Catelog Vol 01 Page 4', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_40.jpg', title: 'Rg Tech Catelog Vol 01 Page 40', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_41.jpg', title: 'Rg Tech Catelog Vol 01 Page 41', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_42.jpg', title: 'Rg Tech Catelog Vol 01 Page 42', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_43.jpg', title: 'Rg Tech Catelog Vol 01 Page 43', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_44.jpg', title: 'Rg Tech Catelog Vol 01 Page 44', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_45.jpg', title: 'Rg Tech Catelog Vol 01 Page 45', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_46.jpg', title: 'Rg Tech Catelog Vol 01 Page 46', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_47.jpg', title: 'Rg Tech Catelog Vol 01 Page 47', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_48.jpg', title: 'Rg Tech Catelog Vol 01 Page 48', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_49.jpg', title: 'Rg Tech Catelog Vol 01 Page 49', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_5.jpg', title: 'Rg Tech Catelog Vol 01 Page 5', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_50.jpg', title: 'Rg Tech Catelog Vol 01 Page 50', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_51.jpg', title: 'Rg Tech Catelog Vol 01 Page 51', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_52.jpg', title: 'Rg Tech Catelog Vol 01 Page 52', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_53.jpg', title: 'Rg Tech Catelog Vol 01 Page 53', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_54.jpg', title: 'Rg Tech Catelog Vol 01 Page 54', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_55.jpg', title: 'Rg Tech Catelog Vol 01 Page 55', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_56.jpg', title: 'Rg Tech Catelog Vol 01 Page 56', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_57.jpg', title: 'Rg Tech Catelog Vol 01 Page 57', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_58.jpg', title: 'Rg Tech Catelog Vol 01 Page 58', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_59.jpg', title: 'Rg Tech Catelog Vol 01 Page 59', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_6.jpg', title: 'Rg Tech Catelog Vol 01 Page 6', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_60.jpg', title: 'Rg Tech Catelog Vol 01 Page 60', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_61.jpg', title: 'Rg Tech Catelog Vol 01 Page 61', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_62.jpg', title: 'Rg Tech Catelog Vol 01 Page 62', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_63.jpg', title: 'Rg Tech Catelog Vol 01 Page 63', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_64.jpg', title: 'Rg Tech Catelog Vol 01 Page 64', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_65.jpg', title: 'Rg Tech Catelog Vol 01 Page 65', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_66.jpg', title: 'Rg Tech Catelog Vol 01 Page 66', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_67.jpg', title: 'Rg Tech Catelog Vol 01 Page 67', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_68.jpg', title: 'Rg Tech Catelog Vol 01 Page 68', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_69.jpg', title: 'Rg Tech Catelog Vol 01 Page 69', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_7.jpg', title: 'Rg Tech Catelog Vol 01 Page 7', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_70.jpg', title: 'Rg Tech Catelog Vol 01 Page 70', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_71.jpg', title: 'Rg Tech Catelog Vol 01 Page 71', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_72.jpg', title: 'Rg Tech Catelog Vol 01 Page 72', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_73.jpg', title: 'Rg Tech Catelog Vol 01 Page 73', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_74.jpg', title: 'Rg Tech Catelog Vol 01 Page 74', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_75.jpg', title: 'Rg Tech Catelog Vol 01 Page 75', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_76.jpg', title: 'Rg Tech Catelog Vol 01 Page 76', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_77.jpg', title: 'Rg Tech Catelog Vol 01 Page 77', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_78.jpg', title: 'Rg Tech Catelog Vol 01 Page 78', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_79.jpg', title: 'Rg Tech Catelog Vol 01 Page 79', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_8.jpg', title: 'Rg Tech Catelog Vol 01 Page 8', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_80.jpg', title: 'Rg Tech Catelog Vol 01 Page 80', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_81.jpg', title: 'Rg Tech Catelog Vol 01 Page 81', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_82.jpg', title: 'Rg Tech Catelog Vol 01 Page 82', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_83.jpg', title: 'Rg Tech Catelog Vol 01 Page 83', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_84.jpg', title: 'Rg Tech Catelog Vol 01 Page 84', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_85.jpg', title: 'Rg Tech Catelog Vol 01 Page 85', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_86.jpg', title: 'Rg Tech Catelog Vol 01 Page 86', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_87.jpg', title: 'Rg Tech Catelog Vol 01 Page 87', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_88.jpg', title: 'Rg Tech Catelog Vol 01 Page 88', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_89.jpg', title: 'Rg Tech Catelog Vol 01 Page 89', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_9.jpg', title: 'Rg Tech Catelog Vol 01 Page 9', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_90.jpg', title: 'Rg Tech Catelog Vol 01 Page 90', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_91.jpg', title: 'Rg Tech Catelog Vol 01 Page 91', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_92.jpg', title: 'Rg Tech Catelog Vol 01 Page 92', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_93.jpg', title: 'Rg Tech Catelog Vol 01 Page 93', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_94.jpg', title: 'Rg Tech Catelog Vol 01 Page 94', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_95.jpg', title: 'Rg Tech Catelog Vol 01 Page 95', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_96.jpg', title: 'Rg Tech Catelog Vol 01 Page 96', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_97.jpg', title: 'Rg Tech Catelog Vol 01 Page 97', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_98.jpg', title: 'Rg Tech Catelog Vol 01 Page 98', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-01_page_99.jpg', title: 'Rg Tech Catelog Vol 01 Page 99', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_1.jpg', title: 'Rg Tech Catelog Vol 02 Page 1', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_10.jpg', title: 'Rg Tech Catelog Vol 02 Page 10', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_100.jpg', title: 'Rg Tech Catelog Vol 02 Page 100', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_101.jpg', title: 'Rg Tech Catelog Vol 02 Page 101', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_102.jpg', title: 'Rg Tech Catelog Vol 02 Page 102', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_103.jpg', title: 'Rg Tech Catelog Vol 02 Page 103', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_104.jpg', title: 'Rg Tech Catelog Vol 02 Page 104', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_105.jpg', title: 'Rg Tech Catelog Vol 02 Page 105', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_106.jpg', title: 'Rg Tech Catelog Vol 02 Page 106', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_107.jpg', title: 'Rg Tech Catelog Vol 02 Page 107', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_108.jpg', title: 'Rg Tech Catelog Vol 02 Page 108', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_109.jpg', title: 'Rg Tech Catelog Vol 02 Page 109', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_11.jpg', title: 'Rg Tech Catelog Vol 02 Page 11', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_110.jpg', title: 'Rg Tech Catelog Vol 02 Page 110', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_111.jpg', title: 'Rg Tech Catelog Vol 02 Page 111', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_112.jpg', title: 'Rg Tech Catelog Vol 02 Page 112', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_113.jpg', title: 'Rg Tech Catelog Vol 02 Page 113', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_114.jpg', title: 'Rg Tech Catelog Vol 02 Page 114', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_115.jpg', title: 'Rg Tech Catelog Vol 02 Page 115', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_116.jpg', title: 'Rg Tech Catelog Vol 02 Page 116', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_117.jpg', title: 'Rg Tech Catelog Vol 02 Page 117', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_118.jpg', title: 'Rg Tech Catelog Vol 02 Page 118', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_119.jpg', title: 'Rg Tech Catelog Vol 02 Page 119', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_12.jpg', title: 'Rg Tech Catelog Vol 02 Page 12', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_120.jpg', title: 'Rg Tech Catelog Vol 02 Page 120', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_121.jpg', title: 'Rg Tech Catelog Vol 02 Page 121', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_122.jpg', title: 'Rg Tech Catelog Vol 02 Page 122', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_123.jpg', title: 'Rg Tech Catelog Vol 02 Page 123', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_124.jpg', title: 'Rg Tech Catelog Vol 02 Page 124', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_125.jpg', title: 'Rg Tech Catelog Vol 02 Page 125', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_126.jpg', title: 'Rg Tech Catelog Vol 02 Page 126', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_127.jpg', title: 'Rg Tech Catelog Vol 02 Page 127', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_128.jpg', title: 'Rg Tech Catelog Vol 02 Page 128', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_129.jpg', title: 'Rg Tech Catelog Vol 02 Page 129', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_13.jpg', title: 'Rg Tech Catelog Vol 02 Page 13', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_130.jpg', title: 'Rg Tech Catelog Vol 02 Page 130', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_131.jpg', title: 'Rg Tech Catelog Vol 02 Page 131', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_132.jpg', title: 'Rg Tech Catelog Vol 02 Page 132', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_133.jpg', title: 'Rg Tech Catelog Vol 02 Page 133', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_134.jpg', title: 'Rg Tech Catelog Vol 02 Page 134', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_135.jpg', title: 'Rg Tech Catelog Vol 02 Page 135', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_136.jpg', title: 'Rg Tech Catelog Vol 02 Page 136', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_137.jpg', title: 'Rg Tech Catelog Vol 02 Page 137', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_138.jpg', title: 'Rg Tech Catelog Vol 02 Page 138', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_139.jpg', title: 'Rg Tech Catelog Vol 02 Page 139', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_14.jpg', title: 'Rg Tech Catelog Vol 02 Page 14', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_140.jpg', title: 'Rg Tech Catelog Vol 02 Page 140', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_141.jpg', title: 'Rg Tech Catelog Vol 02 Page 141', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_142.jpg', title: 'Rg Tech Catelog Vol 02 Page 142', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_143.jpg', title: 'Rg Tech Catelog Vol 02 Page 143', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_144.jpg', title: 'Rg Tech Catelog Vol 02 Page 144', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_145.jpg', title: 'Rg Tech Catelog Vol 02 Page 145', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_146.jpg', title: 'Rg Tech Catelog Vol 02 Page 146', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_147.jpg', title: 'Rg Tech Catelog Vol 02 Page 147', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_148.jpg', title: 'Rg Tech Catelog Vol 02 Page 148', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_149.jpg', title: 'Rg Tech Catelog Vol 02 Page 149', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_15.jpg', title: 'Rg Tech Catelog Vol 02 Page 15', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_150.jpg', title: 'Rg Tech Catelog Vol 02 Page 150', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_151.jpg', title: 'Rg Tech Catelog Vol 02 Page 151', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_152.jpg', title: 'Rg Tech Catelog Vol 02 Page 152', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_153.jpg', title: 'Rg Tech Catelog Vol 02 Page 153', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_154.jpg', title: 'Rg Tech Catelog Vol 02 Page 154', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_155.jpg', title: 'Rg Tech Catelog Vol 02 Page 155', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_156.jpg', title: 'Rg Tech Catelog Vol 02 Page 156', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_157.jpg', title: 'Rg Tech Catelog Vol 02 Page 157', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_158.jpg', title: 'Rg Tech Catelog Vol 02 Page 158', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_159.jpg', title: 'Rg Tech Catelog Vol 02 Page 159', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_16.jpg', title: 'Rg Tech Catelog Vol 02 Page 16', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_160.jpg', title: 'Rg Tech Catelog Vol 02 Page 160', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_161.jpg', title: 'Rg Tech Catelog Vol 02 Page 161', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_162.jpg', title: 'Rg Tech Catelog Vol 02 Page 162', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_163.jpg', title: 'Rg Tech Catelog Vol 02 Page 163', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_164.jpg', title: 'Rg Tech Catelog Vol 02 Page 164', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_165.jpg', title: 'Rg Tech Catelog Vol 02 Page 165', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_166.jpg', title: 'Rg Tech Catelog Vol 02 Page 166', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_167.jpg', title: 'Rg Tech Catelog Vol 02 Page 167', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_168.jpg', title: 'Rg Tech Catelog Vol 02 Page 168', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_169.jpg', title: 'Rg Tech Catelog Vol 02 Page 169', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_17.jpg', title: 'Rg Tech Catelog Vol 02 Page 17', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_170.jpg', title: 'Rg Tech Catelog Vol 02 Page 170', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_171.jpg', title: 'Rg Tech Catelog Vol 02 Page 171', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_172.jpg', title: 'Rg Tech Catelog Vol 02 Page 172', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_173.jpg', title: 'Rg Tech Catelog Vol 02 Page 173', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_174.jpg', title: 'Rg Tech Catelog Vol 02 Page 174', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_175.jpg', title: 'Rg Tech Catelog Vol 02 Page 175', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_176.jpg', title: 'Rg Tech Catelog Vol 02 Page 176', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_177.jpg', title: 'Rg Tech Catelog Vol 02 Page 177', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_178.jpg', title: 'Rg Tech Catelog Vol 02 Page 178', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_179.jpg', title: 'Rg Tech Catelog Vol 02 Page 179', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_18.jpg', title: 'Rg Tech Catelog Vol 02 Page 18', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_180.jpg', title: 'Rg Tech Catelog Vol 02 Page 180', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_181.jpg', title: 'Rg Tech Catelog Vol 02 Page 181', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_182.jpg', title: 'Rg Tech Catelog Vol 02 Page 182', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_183.jpg', title: 'Rg Tech Catelog Vol 02 Page 183', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_184.jpg', title: 'Rg Tech Catelog Vol 02 Page 184', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_185.jpg', title: 'Rg Tech Catelog Vol 02 Page 185', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_186.jpg', title: 'Rg Tech Catelog Vol 02 Page 186', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_187.jpg', title: 'Rg Tech Catelog Vol 02 Page 187', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_188.jpg', title: 'Rg Tech Catelog Vol 02 Page 188', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_189.jpg', title: 'Rg Tech Catelog Vol 02 Page 189', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_19.jpg', title: 'Rg Tech Catelog Vol 02 Page 19', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_190.jpg', title: 'Rg Tech Catelog Vol 02 Page 190', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_191.jpg', title: 'Rg Tech Catelog Vol 02 Page 191', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_192.jpg', title: 'Rg Tech Catelog Vol 02 Page 192', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_193.jpg', title: 'Rg Tech Catelog Vol 02 Page 193', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_194.jpg', title: 'Rg Tech Catelog Vol 02 Page 194', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_195.jpg', title: 'Rg Tech Catelog Vol 02 Page 195', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_196.jpg', title: 'Rg Tech Catelog Vol 02 Page 196', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_197.jpg', title: 'Rg Tech Catelog Vol 02 Page 197', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_198.jpg', title: 'Rg Tech Catelog Vol 02 Page 198', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_199.jpg', title: 'Rg Tech Catelog Vol 02 Page 199', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_2.jpg', title: 'Rg Tech Catelog Vol 02 Page 2', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_20.jpg', title: 'Rg Tech Catelog Vol 02 Page 20', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_200.jpg', title: 'Rg Tech Catelog Vol 02 Page 200', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_201.jpg', title: 'Rg Tech Catelog Vol 02 Page 201', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_202.jpg', title: 'Rg Tech Catelog Vol 02 Page 202', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_203.jpg', title: 'Rg Tech Catelog Vol 02 Page 203', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_204.jpg', title: 'Rg Tech Catelog Vol 02 Page 204', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_205.jpg', title: 'Rg Tech Catelog Vol 02 Page 205', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_206.jpg', title: 'Rg Tech Catelog Vol 02 Page 206', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_207.jpg', title: 'Rg Tech Catelog Vol 02 Page 207', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_208.jpg', title: 'Rg Tech Catelog Vol 02 Page 208', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_209.jpg', title: 'Rg Tech Catelog Vol 02 Page 209', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_21.jpg', title: 'Rg Tech Catelog Vol 02 Page 21', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_210.jpg', title: 'Rg Tech Catelog Vol 02 Page 210', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_211.jpg', title: 'Rg Tech Catelog Vol 02 Page 211', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_212.jpg', title: 'Rg Tech Catelog Vol 02 Page 212', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_213.jpg', title: 'Rg Tech Catelog Vol 02 Page 213', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_214.jpg', title: 'Rg Tech Catelog Vol 02 Page 214', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_215.jpg', title: 'Rg Tech Catelog Vol 02 Page 215', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_22.jpg', title: 'Rg Tech Catelog Vol 02 Page 22', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_23.jpg', title: 'Rg Tech Catelog Vol 02 Page 23', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_24.jpg', title: 'Rg Tech Catelog Vol 02 Page 24', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_25.jpg', title: 'Rg Tech Catelog Vol 02 Page 25', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_26.jpg', title: 'Rg Tech Catelog Vol 02 Page 26', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_27.jpg', title: 'Rg Tech Catelog Vol 02 Page 27', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_28.jpg', title: 'Rg Tech Catelog Vol 02 Page 28', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_29.jpg', title: 'Rg Tech Catelog Vol 02 Page 29', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_3.png', title: 'Rg Tech Catelog Vol 02 Page 3', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_30.jpg', title: 'Rg Tech Catelog Vol 02 Page 30', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_31.jpg', title: 'Rg Tech Catelog Vol 02 Page 31', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_32.jpg', title: 'Rg Tech Catelog Vol 02 Page 32', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_33.jpg', title: 'Rg Tech Catelog Vol 02 Page 33', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_34.jpg', title: 'Rg Tech Catelog Vol 02 Page 34', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_35.jpg', title: 'Rg Tech Catelog Vol 02 Page 35', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_36.jpg', title: 'Rg Tech Catelog Vol 02 Page 36', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_37.jpg', title: 'Rg Tech Catelog Vol 02 Page 37', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_38.jpg', title: 'Rg Tech Catelog Vol 02 Page 38', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_39.jpg', title: 'Rg Tech Catelog Vol 02 Page 39', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_4.jpg', title: 'Rg Tech Catelog Vol 02 Page 4', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_40.jpg', title: 'Rg Tech Catelog Vol 02 Page 40', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_41.jpg', title: 'Rg Tech Catelog Vol 02 Page 41', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_42.jpg', title: 'Rg Tech Catelog Vol 02 Page 42', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_43.jpg', title: 'Rg Tech Catelog Vol 02 Page 43', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_44.jpg', title: 'Rg Tech Catelog Vol 02 Page 44', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_45.jpg', title: 'Rg Tech Catelog Vol 02 Page 45', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_46.jpg', title: 'Rg Tech Catelog Vol 02 Page 46', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_47.jpg', title: 'Rg Tech Catelog Vol 02 Page 47', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_48.jpg', title: 'Rg Tech Catelog Vol 02 Page 48', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_49.jpg', title: 'Rg Tech Catelog Vol 02 Page 49', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_5.jpg', title: 'Rg Tech Catelog Vol 02 Page 5', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_50.jpg', title: 'Rg Tech Catelog Vol 02 Page 50', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_51.jpg', title: 'Rg Tech Catelog Vol 02 Page 51', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_52.jpg', title: 'Rg Tech Catelog Vol 02 Page 52', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_53.jpg', title: 'Rg Tech Catelog Vol 02 Page 53', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_54.jpg', title: 'Rg Tech Catelog Vol 02 Page 54', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_55.jpg', title: 'Rg Tech Catelog Vol 02 Page 55', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_56.jpg', title: 'Rg Tech Catelog Vol 02 Page 56', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_57.jpg', title: 'Rg Tech Catelog Vol 02 Page 57', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_58.jpg', title: 'Rg Tech Catelog Vol 02 Page 58', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_59.jpg', title: 'Rg Tech Catelog Vol 02 Page 59', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_6.jpg', title: 'Rg Tech Catelog Vol 02 Page 6', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_60.jpg', title: 'Rg Tech Catelog Vol 02 Page 60', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_61.jpg', title: 'Rg Tech Catelog Vol 02 Page 61', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_62.jpg', title: 'Rg Tech Catelog Vol 02 Page 62', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_63.jpg', title: 'Rg Tech Catelog Vol 02 Page 63', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_64.jpg', title: 'Rg Tech Catelog Vol 02 Page 64', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_65.jpg', title: 'Rg Tech Catelog Vol 02 Page 65', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_66.jpg', title: 'Rg Tech Catelog Vol 02 Page 66', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_67.jpg', title: 'Rg Tech Catelog Vol 02 Page 67', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_68.jpg', title: 'Rg Tech Catelog Vol 02 Page 68', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_69.jpg', title: 'Rg Tech Catelog Vol 02 Page 69', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_7.jpg', title: 'Rg Tech Catelog Vol 02 Page 7', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_70.jpg', title: 'Rg Tech Catelog Vol 02 Page 70', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_71.jpg', title: 'Rg Tech Catelog Vol 02 Page 71', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_72.jpg', title: 'Rg Tech Catelog Vol 02 Page 72', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_73.jpg', title: 'Rg Tech Catelog Vol 02 Page 73', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_74.jpg', title: 'Rg Tech Catelog Vol 02 Page 74', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_75.jpg', title: 'Rg Tech Catelog Vol 02 Page 75', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_76.jpg', title: 'Rg Tech Catelog Vol 02 Page 76', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_77.jpg', title: 'Rg Tech Catelog Vol 02 Page 77', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_78.jpg', title: 'Rg Tech Catelog Vol 02 Page 78', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_79.jpg', title: 'Rg Tech Catelog Vol 02 Page 79', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_8.jpg', title: 'Rg Tech Catelog Vol 02 Page 8', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_80.jpg', title: 'Rg Tech Catelog Vol 02 Page 80', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_81.jpg', title: 'Rg Tech Catelog Vol 02 Page 81', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_82.jpg', title: 'Rg Tech Catelog Vol 02 Page 82', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_83.jpg', title: 'Rg Tech Catelog Vol 02 Page 83', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_84.jpg', title: 'Rg Tech Catelog Vol 02 Page 84', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_85.jpg', title: 'Rg Tech Catelog Vol 02 Page 85', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_86.jpg', title: 'Rg Tech Catelog Vol 02 Page 86', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_87.jpg', title: 'Rg Tech Catelog Vol 02 Page 87', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_88.jpg', title: 'Rg Tech Catelog Vol 02 Page 88', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_89.jpg', title: 'Rg Tech Catelog Vol 02 Page 89', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_9.jpg', title: 'Rg Tech Catelog Vol 02 Page 9', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_90.jpg', title: 'Rg Tech Catelog Vol 02 Page 90', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_91.jpg', title: 'Rg Tech Catelog Vol 02 Page 91', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_92.jpg', title: 'Rg Tech Catelog Vol 02 Page 92', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_93.jpg', title: 'Rg Tech Catelog Vol 02 Page 93', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_94.jpg', title: 'Rg Tech Catelog Vol 02 Page 94', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_95.jpg', title: 'Rg Tech Catelog Vol 02 Page 95', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_96.jpg', title: 'Rg Tech Catelog Vol 02 Page 96', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_97.jpg', title: 'Rg Tech Catelog Vol 02 Page 97', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_98.jpg', title: 'Rg Tech Catelog Vol 02 Page 98', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/RG-Tech-Catelog-Vol-02_page_99.jpg', title: 'Rg Tech Catelog Vol 02 Page 99', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/kw_aluminum_hd.png', title: 'Kw Aluminum Hd', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/kw_brass_hd.png', title: 'Kw Brass Hd', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/kw_cnc_machine_hd.png', title: 'Kw Cnc Machine Hd', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/kw_copper_hd.png', title: 'Kw Copper Hd', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/kw_fiber_hd.png', title: 'Kw Fiber Hd', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/kw_laser_hd.png', title: 'Kw Laser Hd', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/kw_unique_laser_cnc.png', title: 'Kw Unique Laser Cnc', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/kw_unique_laser_fiber.png', title: 'Kw Unique Laser Fiber', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/kw_unique_laser_ms_plate.png', title: 'Kw Unique Laser Ms Plate', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/kw_unique_laser_ss_mirror.png', title: 'Kw Unique Laser Ss Mirror', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/lc_01.jpg', title: 'Lc 01', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/lc_02.jpg', title: 'Lc 02', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/lc_03.jpg', title: 'Lc 03', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/lc_04.jpg', title: 'Lc 04', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/lc_05.jpg', title: 'Lc 05', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/lc_06.jpg', title: 'Lc 06', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/lc_07.jpg', title: 'Lc 07', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/lc_08.jpg', title: 'Lc 08', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/lc_09.jpg', title: 'Lc 09', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/lc_10.jpg', title: 'Lc 10', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/lc_11.jpg', title: 'Lc 11', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/lc_12.jpg', title: 'Lc 12', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/lc_13.jpg', title: 'Lc 13', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/lc_14.jpg', title: 'Lc 14', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/lc_15.jpg', title: 'Lc 15', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/lc_16.jpg', title: 'Lc 16', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/lc_17.jpg', title: 'Lc 17', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/lc_18.jpg', title: 'Lc 18', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/lc_19.jpg', title: 'Lc 19', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/lc_20.jpg', title: 'Lc 20', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/lc_whatsapp_01.jpg', title: 'Lc Whatsapp 01', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/lc_whatsapp_02.jpg', title: 'Lc Whatsapp 02', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/lc_whatsapp_03.jpg', title: 'Lc Whatsapp 03', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Laser Cutting Services/lc_whatsapp_04.jpg', title: 'Lc Whatsapp 04', material: 'Premium Metal', filter: 'Laser Cutting Services' },
            { img: '/gallery/Sheet Metal Laser Cutting/WhatsApp Image 2026-02-11 at 5.32.21 PM (1).jpeg', title: 'Whatsapp Image 2026 02 11 At 5', material: 'Premium Metal', filter: 'Sheet Metal Laser Cutting' },
            { img: '/gallery/Sheet Metal Laser Cutting/WhatsApp Image 2026-02-11 at 5.32.21 PM.jpeg', title: 'Whatsapp Image 2026 02 11 At 5', material: 'Premium Metal', filter: 'Sheet Metal Laser Cutting' },
            { img: '/gallery/Sheet Metal Laser Cutting/WhatsApp Image 2026-02-11 at 5.32.22 PM (1).jpeg', title: 'Whatsapp Image 2026 02 11 At 5', material: 'Premium Metal', filter: 'Sheet Metal Laser Cutting' },
            { img: '/gallery/Sheet Metal Laser Cutting/WhatsApp Image 2026-02-11 at 5.32.22 PM.jpeg', title: 'Whatsapp Image 2026 02 11 At 5', material: 'Premium Metal', filter: 'Sheet Metal Laser Cutting' },
            { img: '/gallery/Sheet Metal Laser Cutting/WhatsApp Image 2026-02-11 at 5.32.23 PM (2).jpeg', title: 'Whatsapp Image 2026 02 11 At 5', material: 'Premium Metal', filter: 'Sheet Metal Laser Cutting' },
            { img: '/gallery/Sheet Metal Laser Cutting/WhatsApp Image 2026-02-11 at 5.32.23 PM.jpeg', title: 'Whatsapp Image 2026 02 11 At 5', material: 'Premium Metal', filter: 'Sheet Metal Laser Cutting' },
            { img: '/gallery/Sheet Metal Laser Cutting/WhatsApp Image 2026-02-11 at 5.32.24 PM (1).jpeg', title: 'Whatsapp Image 2026 02 11 At 5', material: 'Premium Metal', filter: 'Sheet Metal Laser Cutting' },
            { img: '/gallery/Sheet Metal Laser Cutting/WhatsApp Image 2026-02-11 at 5.32.24 PM (2).jpeg', title: 'Whatsapp Image 2026 02 11 At 5', material: 'Premium Metal', filter: 'Sheet Metal Laser Cutting' },
            { img: '/gallery/Sheet Metal Laser Cutting/WhatsApp Image 2026-02-11 at 5.32.24 PM (3).jpeg', title: 'Whatsapp Image 2026 02 11 At 5', material: 'Premium Metal', filter: 'Sheet Metal Laser Cutting' },
            { img: '/gallery/Sheet Metal Laser Cutting/WhatsApp Image 2026-02-11 at 5.32.24 PM.jpeg', title: 'Whatsapp Image 2026 02 11 At 5', material: 'Premium Metal', filter: 'Sheet Metal Laser Cutting' },
            { img: '/gallery/Sheet Metal Laser Cutting/WhatsApp Image 2026-02-11 at 5.32.25 PM (1).jpeg', title: 'Whatsapp Image 2026 02 11 At 5', material: 'Premium Metal', filter: 'Sheet Metal Laser Cutting' },
            { img: '/gallery/Sheet Metal Laser Cutting/WhatsApp Image 2026-02-11 at 5.32.25 PM (2).jpeg', title: 'Whatsapp Image 2026 02 11 At 5', material: 'Premium Metal', filter: 'Sheet Metal Laser Cutting' },
            { img: '/gallery/Sheet Metal Laser Cutting/WhatsApp Image 2026-02-11 at 5.32.25 PM.jpeg', title: 'Whatsapp Image 2026 02 11 At 5', material: 'Premium Metal', filter: 'Sheet Metal Laser Cutting' },
            { img: '/gallery/Sheet Metal Laser Cutting/WhatsApp Image 2026-02-11 at 5.32.26 PM (1).jpeg', title: 'Whatsapp Image 2026 02 11 At 5', material: 'Premium Metal', filter: 'Sheet Metal Laser Cutting' },
            { img: '/gallery/Sheet Metal Laser Cutting/WhatsApp Image 2026-02-11 at 5.32.26 PM (3).jpeg', title: 'Whatsapp Image 2026 02 11 At 5', material: 'Premium Metal', filter: 'Sheet Metal Laser Cutting' },
            { img: '/gallery/Sheet Metal Laser Cutting/WhatsApp Image 2026-02-11 at 5.32.26 PM.jpeg', title: 'Whatsapp Image 2026 02 11 At 5', material: 'Premium Metal', filter: 'Sheet Metal Laser Cutting' },
            { img: '/gallery/Sheet Metal Laser Cutting/WhatsApp Image 2026-02-11 at 5.32.27 PM (1).jpeg', title: 'Whatsapp Image 2026 02 11 At 5', material: 'Premium Metal', filter: 'Sheet Metal Laser Cutting' },
            { img: '/gallery/Sheet Metal Laser Cutting/WhatsApp Image 2026-02-11 at 5.32.27 PM.jpeg', title: 'Whatsapp Image 2026 02 11 At 5', material: 'Premium Metal', filter: 'Sheet Metal Laser Cutting' },
            { img: '/gallery/Sheet Metal Laser Cutting/WhatsApp Image 2026-02-11 at 5.32.28 PM (1).jpeg', title: 'Whatsapp Image 2026 02 11 At 5', material: 'Premium Metal', filter: 'Sheet Metal Laser Cutting' },
            { img: '/gallery/Sheet Metal Laser Cutting/WhatsApp Image 2026-02-11 at 5.32.28 PM (2).jpeg', title: 'Whatsapp Image 2026 02 11 At 5', material: 'Premium Metal', filter: 'Sheet Metal Laser Cutting' },
            { img: '/gallery/Sheet Metal Laser Cutting/WhatsApp Image 2026-02-11 at 5.32.28 PM.jpeg', title: 'Whatsapp Image 2026 02 11 At 5', material: 'Premium Metal', filter: 'Sheet Metal Laser Cutting' },
            { img: '/gallery/Sheet Metal Laser Cutting/WhatsApp Image 2026-02-11 at 5.32.29 PM (1).jpeg', title: 'Whatsapp Image 2026 02 11 At 5', material: 'Premium Metal', filter: 'Sheet Metal Laser Cutting' },
            { img: '/gallery/Sheet Metal Laser Cutting/WhatsApp Image 2026-02-11 at 5.32.29 PM (2).jpeg', title: 'Whatsapp Image 2026 02 11 At 5', material: 'Premium Metal', filter: 'Sheet Metal Laser Cutting' },
            { img: '/gallery/Sheet Metal Laser Cutting/WhatsApp Image 2026-02-11 at 5.32.29 PM (3).jpeg', title: 'Whatsapp Image 2026 02 11 At 5', material: 'Premium Metal', filter: 'Sheet Metal Laser Cutting' },
            { img: '/gallery/Sheet Metal Laser Cutting/WhatsApp Image 2026-02-11 at 5.32.29 PM.jpeg', title: 'Whatsapp Image 2026 02 11 At 5', material: 'Premium Metal', filter: 'Sheet Metal Laser Cutting' },
            { img: '/gallery/Sheet Metal Laser Cutting/WhatsApp Image 2026-02-11 at 5.32.30 PM (2).jpeg', title: 'Whatsapp Image 2026 02 11 At 5', material: 'Premium Metal', filter: 'Sheet Metal Laser Cutting' },
            { img: '/gallery/Sheet Metal Laser Cutting/WhatsApp Image 2026-02-11 at 5.32.30 PM (3).jpeg', title: 'Whatsapp Image 2026 02 11 At 5', material: 'Premium Metal', filter: 'Sheet Metal Laser Cutting' },
            { img: '/gallery/Sheet Metal Laser Cutting/WhatsApp Image 2026-02-11 at 5.32.30 PM.jpeg', title: 'Whatsapp Image 2026 02 11 At 5', material: 'Premium Metal', filter: 'Sheet Metal Laser Cutting' },
            { img: '/gallery/Sheet Metal Laser Cutting/WhatsApp Image 2026-02-11 at 5.32.31 PM (2).jpeg', title: 'Whatsapp Image 2026 02 11 At 5', material: 'Premium Metal', filter: 'Sheet Metal Laser Cutting' },
            { img: '/gallery/Sheet Metal Laser Cutting/WhatsApp Image 2026-02-11 at 5.32.31 PM.jpeg', title: 'Whatsapp Image 2026 02 11 At 5', material: 'Premium Metal', filter: 'Sheet Metal Laser Cutting' },
            { img: '/gallery/Sheet Metal Laser Cutting/WhatsApp Image 2026-02-11 at 5.32.32 PM (2).jpeg', title: 'Whatsapp Image 2026 02 11 At 5', material: 'Premium Metal', filter: 'Sheet Metal Laser Cutting' },
            { img: '/gallery/Sheet Metal Laser Cutting/WhatsApp Image 2026-02-11 at 5.32.32 PM (3).jpeg', title: 'Whatsapp Image 2026 02 11 At 5', material: 'Premium Metal', filter: 'Sheet Metal Laser Cutting' },
            { img: '/gallery/Sheet Metal Laser Cutting/WhatsApp Image 2026-02-11 at 5.32.32 PM.jpeg', title: 'Whatsapp Image 2026 02 11 At 5', material: 'Premium Metal', filter: 'Sheet Metal Laser Cutting' },
            { img: '/gallery/Sheet Metal Laser Cutting/WhatsApp Image 2026-02-11 at 5.32.33 PM (1).jpeg', title: 'Whatsapp Image 2026 02 11 At 5', material: 'Premium Metal', filter: 'Sheet Metal Laser Cutting' },
            { img: '/gallery/Sheet Metal Laser Cutting/WhatsApp Image 2026-02-11 at 5.32.33 PM (2).jpeg', title: 'Whatsapp Image 2026 02 11 At 5', material: 'Premium Metal', filter: 'Sheet Metal Laser Cutting' },
            { img: '/gallery/Sheet Metal Laser Cutting/WhatsApp Image 2026-02-11 at 5.32.33 PM.jpeg', title: 'Whatsapp Image 2026 02 11 At 5', material: 'Premium Metal', filter: 'Sheet Metal Laser Cutting' },
            { img: '/gallery/Sheet Metal Laser Cutting/WhatsApp Image 2026-02-11 at 5.32.34 PM (1).jpeg', title: 'Whatsapp Image 2026 02 11 At 5', material: 'Premium Metal', filter: 'Sheet Metal Laser Cutting' },
            { img: '/gallery/Sheet Metal Laser Cutting/WhatsApp Image 2026-02-11 at 5.32.34 PM (2).jpeg', title: 'Whatsapp Image 2026 02 11 At 5', material: 'Premium Metal', filter: 'Sheet Metal Laser Cutting' },
            { img: '/gallery/Sheet Metal Laser Cutting/WhatsApp Image 2026-02-11 at 5.32.34 PM (3).jpeg', title: 'Whatsapp Image 2026 02 11 At 5', material: 'Premium Metal', filter: 'Sheet Metal Laser Cutting' },
            { img: '/gallery/Sheet Metal Laser Cutting/WhatsApp Image 2026-02-11 at 5.32.34 PM.jpeg', title: 'Whatsapp Image 2026 02 11 At 5', material: 'Premium Metal', filter: 'Sheet Metal Laser Cutting' },
            { img: '/gallery/Sheet Metal Laser Cutting/WhatsApp Image 2026-02-11 at 5.32.35 PM (1).jpeg', title: 'Whatsapp Image 2026 02 11 At 5', material: 'Premium Metal', filter: 'Sheet Metal Laser Cutting' },
            { img: '/gallery/Sheet Metal Laser Cutting/WhatsApp Image 2026-02-11 at 5.32.35 PM.jpeg', title: 'Whatsapp Image 2026 02 11 At 5', material: 'Premium Metal', filter: 'Sheet Metal Laser Cutting' },
            { img: '/gallery/Sheet Metal Laser Cutting/WhatsApp Image 2026-02-11 at 5.32.36 PM (2).jpeg', title: 'Whatsapp Image 2026 02 11 At 5', material: 'Premium Metal', filter: 'Sheet Metal Laser Cutting' },
            { img: '/gallery/Sheet Metal Laser Cutting/WhatsApp Image 2026-02-11 at 5.32.37 PM (1).jpeg', title: 'Whatsapp Image 2026 02 11 At 5', material: 'Premium Metal', filter: 'Sheet Metal Laser Cutting' },
            { img: '/gallery/Sheet Metal Laser Cutting/WhatsApp Image 2026-02-11 at 5.32.37 PM (2).jpeg', title: 'Whatsapp Image 2026 02 11 At 5', material: 'Premium Metal', filter: 'Sheet Metal Laser Cutting' },
            { img: '/gallery/Sheet Metal Laser Cutting/sm_01.jpg', title: 'Sm 01', material: 'Premium Metal', filter: 'Sheet Metal Laser Cutting' },
            { img: '/gallery/Sheet Metal Laser Cutting/sm_02.jpg', title: 'Sm 02', material: 'Premium Metal', filter: 'Sheet Metal Laser Cutting' },
            { img: '/gallery/Sheet Metal Laser Cutting/sm_03.jpg', title: 'Sm 03', material: 'Premium Metal', filter: 'Sheet Metal Laser Cutting' },
            { img: '/gallery/Sheet Metal Laser Cutting/sm_04.jpg', title: 'Sm 04', material: 'Premium Metal', filter: 'Sheet Metal Laser Cutting' },
            { img: '/gallery/Sheet Metal Laser Cutting/sm_05.jpg', title: 'Sm 05', material: 'Premium Metal', filter: 'Sheet Metal Laser Cutting' },
            { img: '/gallery/Sheet Metal Laser Cutting/sm_06.jpg', title: 'Sm 06', material: 'Premium Metal', filter: 'Sheet Metal Laser Cutting' },
            { img: '/gallery/Sheet Metal Laser Cutting/sm_07.jpg', title: 'Sm 07', material: 'Premium Metal', filter: 'Sheet Metal Laser Cutting' },
            { img: '/gallery/Sheet Metal Laser Cutting/sm_08.jpg', title: 'Sm 08', material: 'Premium Metal', filter: 'Sheet Metal Laser Cutting' },
            { img: '/gallery/Sheet Metal Laser Cutting/sm_09.jpg', title: 'Sm 09', material: 'Premium Metal', filter: 'Sheet Metal Laser Cutting' },
            { img: '/gallery/Sheet Metal Laser Cutting/sm_10.jpg', title: 'Sm 10', material: 'Premium Metal', filter: 'Sheet Metal Laser Cutting' },
            { img: '/gallery/Sheet Metal Laser Cutting/sm_11.jpg', title: 'Sm 11', material: 'Premium Metal', filter: 'Sheet Metal Laser Cutting' },
            { img: '/gallery/Sheet Metal Laser Cutting/sm_12.jpg', title: 'Sm 12', material: 'Premium Metal', filter: 'Sheet Metal Laser Cutting' },
            { img: '/gallery/Sheet Metal Laser Cutting/sm_13.jpg', title: 'Sm 13', material: 'Premium Metal', filter: 'Sheet Metal Laser Cutting' },
            { img: '/gallery/Sheet Metal Laser Cutting/sm_14.jpg', title: 'Sm 14', material: 'Premium Metal', filter: 'Sheet Metal Laser Cutting' },
            { img: '/gallery/Sheet Metal Laser Cutting/sm_15.jpg', title: 'Sm 15', material: 'Premium Metal', filter: 'Sheet Metal Laser Cutting' },
            { img: '/gallery/Sheet Metal Laser Cutting/sm_16.jpg', title: 'Sm 16', material: 'Premium Metal', filter: 'Sheet Metal Laser Cutting' },
            { img: '/gallery/Sheet Metal Laser Cutting/sm_17.jpg', title: 'Sm 17', material: 'Premium Metal', filter: 'Sheet Metal Laser Cutting' },
            { img: '/gallery/Sheet Metal Laser Cutting/sm_18.jpg', title: 'Sm 18', material: 'Premium Metal', filter: 'Sheet Metal Laser Cutting' },
            { img: '/gallery/Sheet Metal Laser Cutting/sm_19.jpg', title: 'Sm 19', material: 'Premium Metal', filter: 'Sheet Metal Laser Cutting' },
            { img: '/gallery/Sheet Metal Laser Cutting/sm_20.jpg', title: 'Sm 20', material: 'Premium Metal', filter: 'Sheet Metal Laser Cutting' },
            { img: '/gallery/Fabrication Services/RG-Tech-Catelog-vol-4_page-0008.jpg', title: 'Rg Tech Catelog Vol 4 Page 0008', material: 'Industrial Steel', filter: 'Fabrication Services' },
            { img: '/gallery/Fabrication Services/RG-Tech-Catelog-vol-4_page-0009.jpg', title: 'Rg Tech Catelog Vol 4 Page 0009', material: 'Industrial Steel', filter: 'Fabrication Services' },
            { img: '/gallery/Fabrication Services/RG-Tech-Catelog-vol-4_page-0010.jpg', title: 'Rg Tech Catelog Vol 4 Page 0010', material: 'Industrial Steel', filter: 'Fabrication Services' },
            { img: '/gallery/Fabrication Services/RG-Tech-Catelog-vol-4_page-0011.jpg', title: 'Rg Tech Catelog Vol 4 Page 0011', material: 'Industrial Steel', filter: 'Fabrication Services' },
            { img: '/gallery/Fabrication Services/RG-Tech-Catelog-vol-4_page-0012.jpg', title: 'Rg Tech Catelog Vol 4 Page 0012', material: 'Industrial Steel', filter: 'Fabrication Services' },
            { img: '/gallery/Fabrication Services/RG-Tech-Catelog-vol-4_page-0013.jpg', title: 'Rg Tech Catelog Vol 4 Page 0013', material: 'Industrial Steel', filter: 'Fabrication Services' },
            { img: '/gallery/Fabrication Services/RG-Tech-Catelog-vol-4_page-0015.jpg', title: 'Rg Tech Catelog Vol 4 Page 0015', material: 'Industrial Steel', filter: 'Fabrication Services' },
            { img: '/gallery/Fabrication Services/RG-Tech-Catelog-vol-4_page-0016.jpg', title: 'Rg Tech Catelog Vol 4 Page 0016', material: 'Industrial Steel', filter: 'Fabrication Services' },
            { img: '/gallery/Fabrication Services/RG-Tech-Catelog-vol-4_page-0017.jpg', title: 'Rg Tech Catelog Vol 4 Page 0017', material: 'Industrial Steel', filter: 'Fabrication Services' },
            { img: '/gallery/Fabrication Services/RG-Tech-Catelog-vol-4_page-0018.jpg', title: 'Rg Tech Catelog Vol 4 Page 0018', material: 'Industrial Steel', filter: 'Fabrication Services' },
            { img: '/gallery/Fabrication Services/RG-Tech-Catelog-vol-4_page-0019.jpg', title: 'Rg Tech Catelog Vol 4 Page 0019', material: 'Industrial Steel', filter: 'Fabrication Services' },
            { img: '/gallery/Fabrication Services/RG-Tech-Catelog-vol-4_page-0020.jpg', title: 'Rg Tech Catelog Vol 4 Page 0020', material: 'Industrial Steel', filter: 'Fabrication Services' },
            { img: '/gallery/Steel Gates/RG-Tech-Catelog-vol-4_page-0120.jpg', title: 'Rg Tech Catelog Vol 4 Page 0120', material: 'Solid Steel', filter: 'Steel Gates' },
            { img: '/gallery/Steel Gates/RG-Tech-Catelog-vol-4_page-0121.jpg', title: 'Rg Tech Catelog Vol 4 Page 0121', material: 'Solid Steel', filter: 'Steel Gates' },
            { img: '/gallery/Steel Gates/RG-Tech-Catelog-vol-4_page-0122.jpg', title: 'Rg Tech Catelog Vol 4 Page 0122', material: 'Solid Steel', filter: 'Steel Gates' },
            { img: '/gallery/Steel Gates/RG-Tech-Catelog-vol-4_page-0123.jpg', title: 'Rg Tech Catelog Vol 4 Page 0123', material: 'Solid Steel', filter: 'Steel Gates' },
            { img: '/gallery/Steel Gates/RG-Tech-Catelog-vol-4_page-0124.jpg', title: 'Rg Tech Catelog Vol 4 Page 0124', material: 'Solid Steel', filter: 'Steel Gates' },
            { img: '/gallery/Steel Gates/RG-Tech-Catelog-vol-4_page-0125.jpg', title: 'Rg Tech Catelog Vol 4 Page 0125', material: 'Solid Steel', filter: 'Steel Gates' },
            { img: '/gallery/Steel Gates/RG-Tech-Catelog-vol-4_page-0126.jpg', title: 'Rg Tech Catelog Vol 4 Page 0126', material: 'Solid Steel', filter: 'Steel Gates' },
            { img: '/gallery/Steel Gates/RG-Tech-Catelog-vol-4_page-0127.jpg', title: 'Rg Tech Catelog Vol 4 Page 0127', material: 'Solid Steel', filter: 'Steel Gates' },
            { img: '/gallery/Steel Gates/RG-Tech-Catelog-vol-4_page-0128.jpg', title: 'Rg Tech Catelog Vol 4 Page 0128', material: 'Solid Steel', filter: 'Steel Gates' },
            { img: '/gallery/Steel Gates/RG-Tech-Catelog-vol-4_page-0129.jpg', title: 'Rg Tech Catelog Vol 4 Page 0129', material: 'Solid Steel', filter: 'Steel Gates' },
            { img: '/gallery/Steel Gates/RG-Tech-Catelog-vol-4_page-0130.jpg', title: 'Rg Tech Catelog Vol 4 Page 0130', material: 'Solid Steel', filter: 'Steel Gates' },
            { img: '/gallery/Steel Gates/RG-Tech-Catelog-vol-4_page-0131.jpg', title: 'Rg Tech Catelog Vol 4 Page 0131', material: 'Solid Steel', filter: 'Steel Gates' },
            { img: '/gallery/Steel Gates/RG-Tech-Catelog-vol-4_page-0132.jpg', title: 'Rg Tech Catelog Vol 4 Page 0132', material: 'Solid Steel', filter: 'Steel Gates' },
            { img: '/gallery/Steel Gates/RG-Tech-Catelog-vol-4_page-0133.jpg', title: 'Rg Tech Catelog Vol 4 Page 0133', material: 'Solid Steel', filter: 'Steel Gates' },
            { img: '/gallery/Steel Gates/RG-Tech-Catelog-vol-4_page-0134.jpg', title: 'Rg Tech Catelog Vol 4 Page 0134', material: 'Solid Steel', filter: 'Steel Gates' },
            { img: '/gallery/Steel Gates/RG-Tech-Catelog-vol-4_page-0135.jpg', title: 'Rg Tech Catelog Vol 4 Page 0135', material: 'Solid Steel', filter: 'Steel Gates' },
            { img: '/gallery/Steel Gates/RG-Tech-Catelog-vol-4_page-0136.jpg', title: 'Rg Tech Catelog Vol 4 Page 0136', material: 'Solid Steel', filter: 'Steel Gates' },
            { img: '/gallery/Steel Gates/RG-Tech-Catelog-vol-4_page-0137.jpg', title: 'Rg Tech Catelog Vol 4 Page 0137', material: 'Solid Steel', filter: 'Steel Gates' },
            { img: '/gallery/Steel Gates/RG-Tech-Catelog-vol-4_page-0138.jpg', title: 'Rg Tech Catelog Vol 4 Page 0138', material: 'Solid Steel', filter: 'Steel Gates' },
            { img: '/gallery/Steel Gates/RG-Tech-Catelog-vol-4_page-0139.jpg', title: 'Rg Tech Catelog Vol 4 Page 0139', material: 'Solid Steel', filter: 'Steel Gates' },
            { img: '/gallery/Steel Gates/RG-Tech-Catelog-vol-4_page-0140.jpg', title: 'Rg Tech Catelog Vol 4 Page 0140', material: 'Solid Steel', filter: 'Steel Gates' },
            { img: '/gallery/Steel Gates/RG-Tech-Catelog-vol-4_page-0141.jpg', title: 'Rg Tech Catelog Vol 4 Page 0141', material: 'Solid Steel', filter: 'Steel Gates' },
            { img: '/gallery/Steel Gates/RG-Tech-Catelog-vol-4_page-0142.jpg', title: 'Rg Tech Catelog Vol 4 Page 0142', material: 'Solid Steel', filter: 'Steel Gates' },
            { img: '/gallery/Steel Gates/RG-Tech-Catelog-vol-4_page-0143.jpg', title: 'Rg Tech Catelog Vol 4 Page 0143', material: 'Solid Steel', filter: 'Steel Gates' },
            { img: '/gallery/Steel Gates/RG-Tech-Catelog-vol-4_page-0144.jpg', title: 'Rg Tech Catelog Vol 4 Page 0144', material: 'Solid Steel', filter: 'Steel Gates' },
            { img: '/gallery/Steel Gates/RG-Tech-Catelog-vol-4_page-0145.jpg', title: 'Rg Tech Catelog Vol 4 Page 0145', material: 'Solid Steel', filter: 'Steel Gates' },
            { img: '/gallery/Steel Gates/RG-Tech-Catelog-vol-4_page-0146.jpg', title: 'Rg Tech Catelog Vol 4 Page 0146', material: 'Solid Steel', filter: 'Steel Gates' },
            { img: '/gallery/Steel Gates/RG-Tech-Catelog-vol-4_page-0147.jpg', title: 'Rg Tech Catelog Vol 4 Page 0147', material: 'Solid Steel', filter: 'Steel Gates' },
            { img: '/gallery/Steel Gates/RG-Tech-Catelog-vol-4_page-0148.jpg', title: 'Rg Tech Catelog Vol 4 Page 0148', material: 'Solid Steel', filter: 'Steel Gates' },
            { img: '/gallery/Steel Gates/RG-Tech-Catelog-vol-4_page-0149.jpg', title: 'Rg Tech Catelog Vol 4 Page 0149', material: 'Solid Steel', filter: 'Steel Gates' },
            { img: '/gallery/Steel Gates/RG-Tech-Catelog-vol-4_page-0150.jpg', title: 'Rg Tech Catelog Vol 4 Page 0150', material: 'Solid Steel', filter: 'Steel Gates' },
            { img: '/gallery/Steel Gates/RG-Tech-Catelog-vol-4_page-0151.jpg', title: 'Rg Tech Catelog Vol 4 Page 0151', material: 'Solid Steel', filter: 'Steel Gates' },
            { img: '/gallery/Steel Gates/RG-Tech-Catelog-vol-4_page-0152.jpg', title: 'Rg Tech Catelog Vol 4 Page 0152', material: 'Solid Steel', filter: 'Steel Gates' },
            { img: '/gallery/Steel Gates/RG-Tech-Catelog-vol-4_page-0153.jpg', title: 'Rg Tech Catelog Vol 4 Page 0153', material: 'Solid Steel', filter: 'Steel Gates' },
            { img: '/gallery/Steel Gates/RG-Tech-Catelog-vol-4_page-0154.jpg', title: 'Rg Tech Catelog Vol 4 Page 0154', material: 'Solid Steel', filter: 'Steel Gates' },
            { img: '/gallery/Metal Safety Doors/1-13.jpg', title: '1 13', material: 'Reinforced Metal', filter: 'Metal Safety Doors' },
            { img: '/gallery/Metal Safety Doors/7x3-5-feet-18-3-kilograms-paint-coated-mild-steel-safety-doors-466.jpg', title: '7X3 5 Feet 18 3 Kilograms Paint Coated Mild Steel Safety Doors 466', material: 'Reinforced Metal', filter: 'Metal Safety Doors' },
            { img: '/gallery/Metal Safety Doors/Stainless-Steel-Thickened-Smart-Lock-Armored-Main-Gate-Meta-Home-Entrance-Front-Entry-Doors-Exterior-Door-Safety-Steel-Door.png_300x300.avif', title: 'Stainless Steel Thickened Smart Lock Armored Main Gate Meta Home Entrance Front Entry Doors Exterior Door Safety Steel Door', material: 'Reinforced Metal', filter: 'Metal Safety Doors' },
            { img: '/gallery/Metal Safety Doors/download (1).jpg', title: 'Download (1)', material: 'Reinforced Metal', filter: 'Metal Safety Doors' },
            { img: '/gallery/Metal Safety Doors/download (2).jpg', title: 'Download (2)', material: 'Reinforced Metal', filter: 'Metal Safety Doors' },
            { img: '/gallery/Metal Safety Doors/download.jpg', title: 'Download', material: 'Reinforced Metal', filter: 'Metal Safety Doors' },
            { img: '/gallery/Metal Safety Doors/flowert-safety-door.webp', title: 'Flowert Safety Door', material: 'Reinforced Metal', filter: 'Metal Safety Doors' },
            { img: '/gallery/Metal Safety Doors/image5.jpg', title: 'Image5', material: 'Reinforced Metal', filter: 'Metal Safety Doors' },
            { img: '/gallery/Metal Safety Doors/images.jpg', title: 'Images', material: 'Reinforced Metal', filter: 'Metal Safety Doors' },
            { img: '/gallery/Metal Safety Doors/metal-ms-safety-door-for-resi-20240524162939656.jpg', title: 'Metal Ms Safety Door For Resi 20240524162939656', material: 'Reinforced Metal', filter: 'Metal Safety Doors' },
            { img: '/gallery/Metal Safety Doors/mild-steel-hinged-safety-door.jpg', title: 'Mild Steel Hinged Safety Door', material: 'Reinforced Metal', filter: 'Metal Safety Doors' },
            { img: '/gallery/Metal Safety Doors/mild-steel-safety-door-500x500.webp', title: 'Mild Steel Safety Door 500X500', material: 'Reinforced Metal', filter: 'Metal Safety Doors' },
            { img: '/gallery/Metal Safety Doors/ms-safety-door-500x500.webp', title: 'Ms Safety Door 500X500', material: 'Reinforced Metal', filter: 'Metal Safety Doors' },
            { img: '/gallery/Metal Safety Doors/premium-quality-are-made-of-heavy-duty-stainless-steel-safety-doors--144.jpg', title: 'Premium Quality Are Made Of Heavy Duty Stainless Steel Safety Doors  144', material: 'Reinforced Metal', filter: 'Metal Safety Doors' },
            { img: '/gallery/Metal Safety Doors/product-jpeg-500x500.webp', title: 'Product Jpeg 500X500', material: 'Reinforced Metal', filter: 'Metal Safety Doors' },
            { img: '/gallery/Metal Safety Doors/product-jpeg.jpg', title: 'Product Jpeg', material: 'Reinforced Metal', filter: 'Metal Safety Doors' },
            { img: '/gallery/Metal Safety Doors/safety-door-250x250.webp', title: 'Safety Door 250X250', material: 'Reinforced Metal', filter: 'Metal Safety Doors' },
            { img: '/gallery/Metal Safety Doors/safety-door-jali.jpg', title: 'Safety Door Jali', material: 'Reinforced Metal', filter: 'Metal Safety Doors' },
            { img: '/gallery/Metal Safety Doors/stainless-steel-safety-door-2219578321-0ix6pmz1.avif', title: 'Stainless Steel Safety Door 2219578321 0Ix6Pmz1', material: 'Reinforced Metal', filter: 'Metal Safety Doors' },
            { img: '/gallery/Metal Safety Doors/stainless-steel-silver-safety-door.jpeg', title: 'Stainless Steel Silver Safety Door', material: 'Reinforced Metal', filter: 'Metal Safety Doors' },
            { img: '/gallery/Metal Safety Doors/steel-safety-door.jpg', title: 'Steel Safety Door', material: 'Reinforced Metal', filter: 'Metal Safety Doors' },
            { img: '/gallery/Decorative Metal Panels/RG-Tech-Catelog-Vol-02_page-0004.jpg', title: 'Rg Tech Catelog Vol 02 Page 0004', material: 'Decorative Laser Cut', filter: 'Decorative Metal Panels' },
            { img: '/gallery/Decorative Metal Panels/RG-Tech-Catelog-Vol-02_page-0005.jpg', title: 'Rg Tech Catelog Vol 02 Page 0005', material: 'Decorative Laser Cut', filter: 'Decorative Metal Panels' },
            { img: '/gallery/Decorative Metal Panels/RG-Tech-Catelog-Vol-02_page-0006.jpg', title: 'Rg Tech Catelog Vol 02 Page 0006', material: 'Decorative Laser Cut', filter: 'Decorative Metal Panels' },
            { img: '/gallery/Decorative Metal Panels/RG-Tech-Catelog-Vol-02_page-0011.jpg', title: 'Rg Tech Catelog Vol 02 Page 0011', material: 'Decorative Laser Cut', filter: 'Decorative Metal Panels' },
            { img: '/gallery/Decorative Metal Panels/RG-Tech-Catelog-Vol-02_page-0012.jpg', title: 'Rg Tech Catelog Vol 02 Page 0012', material: 'Decorative Laser Cut', filter: 'Decorative Metal Panels' },
            { img: '/gallery/Decorative Metal Panels/RG-Tech-Catelog-Vol-02_page-0013.jpg', title: 'Rg Tech Catelog Vol 02 Page 0013', material: 'Decorative Laser Cut', filter: 'Decorative Metal Panels' },
            { img: '/gallery/Decorative Metal Panels/RG-Tech-Catelog-Vol-02_page-0018.jpg', title: 'Rg Tech Catelog Vol 02 Page 0018', material: 'Decorative Laser Cut', filter: 'Decorative Metal Panels' },
            { img: '/gallery/Decorative Metal Panels/RG-Tech-Catelog-Vol-02_page-0019.jpg', title: 'Rg Tech Catelog Vol 02 Page 0019', material: 'Decorative Laser Cut', filter: 'Decorative Metal Panels' },
            { img: '/gallery/Decorative Metal Panels/RG-Tech-Catelog-Vol-02_page-0020.jpg', title: 'Rg Tech Catelog Vol 02 Page 0020', material: 'Decorative Laser Cut', filter: 'Decorative Metal Panels' },
            { img: '/gallery/Decorative Metal Panels/RG-Tech-Catelog-Vol-02_page-0025.jpg', title: 'Rg Tech Catelog Vol 02 Page 0025', material: 'Decorative Laser Cut', filter: 'Decorative Metal Panels' },
            { img: '/gallery/Decorative Metal Panels/RG-Tech-Catelog-Vol-02_page-0026.jpg', title: 'Rg Tech Catelog Vol 02 Page 0026', material: 'Decorative Laser Cut', filter: 'Decorative Metal Panels' },
            { img: '/gallery/Decorative Metal Panels/RG-Tech-Catelog-Vol-02_page-0027.jpg', title: 'Rg Tech Catelog Vol 02 Page 0027', material: 'Decorative Laser Cut', filter: 'Decorative Metal Panels' },
            { img: '/gallery/Decorative Metal Panels/RG-Tech-Catelog-Vol-02_page-0032.jpg', title: 'Rg Tech Catelog Vol 02 Page 0032', material: 'Decorative Laser Cut', filter: 'Decorative Metal Panels' },
            { img: '/gallery/Decorative Metal Panels/RG-Tech-Catelog-Vol-02_page-0033.jpg', title: 'Rg Tech Catelog Vol 02 Page 0033', material: 'Decorative Laser Cut', filter: 'Decorative Metal Panels' },
            { img: '/gallery/Decorative Metal Panels/RG-Tech-Catelog-Vol-02_page-0034.jpg', title: 'Rg Tech Catelog Vol 02 Page 0034', material: 'Decorative Laser Cut', filter: 'Decorative Metal Panels' },
            { img: '/gallery/Decorative Metal Panels/RG-Tech-Catelog-Vol-02_page-0039.jpg', title: 'Rg Tech Catelog Vol 02 Page 0039', material: 'Decorative Laser Cut', filter: 'Decorative Metal Panels' },
            { img: '/gallery/Decorative Metal Panels/RG-Tech-Catelog-Vol-02_page-0040.jpg', title: 'Rg Tech Catelog Vol 02 Page 0040', material: 'Decorative Laser Cut', filter: 'Decorative Metal Panels' },
            { img: '/gallery/Decorative Metal Panels/RG-Tech-Catelog-Vol-02_page-0041.jpg', title: 'Rg Tech Catelog Vol 02 Page 0041', material: 'Decorative Laser Cut', filter: 'Decorative Metal Panels' },
            { img: '/gallery/Decorative Metal Panels/RG-Tech-Catelog-Vol-02_page-0046.jpg', title: 'Rg Tech Catelog Vol 02 Page 0046', material: 'Decorative Laser Cut', filter: 'Decorative Metal Panels' },
            { img: '/gallery/Decorative Metal Panels/RG-Tech-Catelog-Vol-02_page-0047.jpg', title: 'Rg Tech Catelog Vol 02 Page 0047', material: 'Decorative Laser Cut', filter: 'Decorative Metal Panels' },
            { img: '/gallery/Decorative Metal Panels/RG-Tech-Catelog-Vol-02_page-0048.jpg', title: 'Rg Tech Catelog Vol 02 Page 0048', material: 'Decorative Laser Cut', filter: 'Decorative Metal Panels' },
            { img: '/gallery/Decorative Metal Panels/RG-Tech-Catelog-Vol-02_page-0053.jpg', title: 'Rg Tech Catelog Vol 02 Page 0053', material: 'Decorative Laser Cut', filter: 'Decorative Metal Panels' },
            { img: '/gallery/Decorative Metal Panels/RG-Tech-Catelog-Vol-02_page-0054.jpg', title: 'Rg Tech Catelog Vol 02 Page 0054', material: 'Decorative Laser Cut', filter: 'Decorative Metal Panels' },
            { img: '/gallery/Decorative Metal Panels/RG-Tech-Catelog-Vol-02_page-0055.jpg', title: 'Rg Tech Catelog Vol 02 Page 0055', material: 'Decorative Laser Cut', filter: 'Decorative Metal Panels' },
            { img: '/gallery/Decorative Metal Panels/RG-Tech-Catelog-Vol-02_page-0060.jpg', title: 'Rg Tech Catelog Vol 02 Page 0060', material: 'Decorative Laser Cut', filter: 'Decorative Metal Panels' },
            { img: '/gallery/Decorative Metal Panels/RG-Tech-Catelog-Vol-02_page-0061.jpg', title: 'Rg Tech Catelog Vol 02 Page 0061', material: 'Decorative Laser Cut', filter: 'Decorative Metal Panels' },
            { img: '/gallery/Decorative Metal Panels/RG-Tech-Catelog-Vol-02_page-0062.jpg', title: 'Rg Tech Catelog Vol 02 Page 0062', material: 'Decorative Laser Cut', filter: 'Decorative Metal Panels' },
        ]

        const filtered = activeFilter === 'All' ? items : items.filter(i => i.filter === activeFilter)
        const displayed = filtered.slice(0, visibleItems)

        const handleFilterClick = (f) => { setActiveFilter(f); setVisibleItems(12); setLightboxIndex(null); }
        const openLightbox = (index) => setLightboxIndex(index)
        const closeLightbox = () => setLightboxIndex(null)
        const nextImage = (e) => { e.stopPropagation(); setLightboxIndex(prev => (prev + 1) % displayed.length) }
        const prevImage = (e) => { e.stopPropagation(); setLightboxIndex(prev => (prev - 1 + displayed.length) % displayed.length) }

        return (
            <div className="bg-white min-h-screen">
                <Helmet>
                    <title>Metal Design & Laser Cutting Portfolio | RG Tech Engineering</title>
                    <meta name="description" content="Explore our library of laser cutting and metal fabrication projects in Chennai. Designs include industrial parts, CNC jali patterns, steel gates, and safety doors." />
                    <link rel="canonical" href={`${BASE_URL}/gallery`} />
                    <meta property="og:title" content="Metal Design & Laser Cutting Portfolio | RG Tech Engineering" />
                    <meta property="og:description" content="Explore our library of laser cutting and metal fabrication projects in Chennai. Designs include industrial parts, CNC jali patterns, steel gates, and safety doors." />
                    <meta property="og:image" content={DEFAULT_OG_IMAGE} />
                    <meta property="og:url" content={`${BASE_URL}/gallery`} />
                    <meta property="og:type" content="website" />
                    <meta property="og:site_name" content="RG Tech Engineering Works" />
                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:title" content="Metal Design & Laser Cutting Portfolio | RG Tech Engineering" />
                    <meta name="twitter:description" content="Explore our library of laser cutting and metal fabrication projects in Chennai. Designs include industrial parts, CNC jali patterns, steel gates, and safety doors." />
                    <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
                </Helmet>

                {/* Gallery Hero */}
                <section className="bg-primary text-white py-24 relative overflow-hidden">
                    <div className="absolute inset-0 bg-accent/5 skew-y-3 translate-y-20 pointer-events-none"></div>
                    <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
                        <p className="text-accent font-black text-xs uppercase tracking-[0.4em] mb-4">Visual Portfolio</p>
                        <h2 className="text-4xl md:text-6xl font-black font-heading mb-6 italic tracking-tight">Design <span className="text-accent">Library</span></h2>
                        <p className="text-white/60 max-w-2xl mx-auto text-lg font-medium leading-relaxed">
                            A comprehensive collection of our precision laser cutting, fabrication job work, and architectural metal designs.
                        </p>
                    </div>
                </section>

                <section className="py-24 bg-slate-50/50">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="flex flex-wrap justify-center gap-3 mb-16">
                            {filters.map(f => (
                                <button
                                    key={f}
                                    onClick={() => handleFilterClick(f)}
                                    className={`px-6 py-3 rounded-2xl text-sm font-bold transition-all border shadow-sm ${activeFilter === f ? 'bg-primary text-white border-primary shadow-xl shadow-primary/20 scale-105' : 'bg-white text-primary/60 border-slate-100 hover:border-accent hover:text-accent'}`}
                                >
                                    {f}
                                </button>
                            ))}
                        </div>

                        {items.length > 0 ? (
                            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
                                {displayed.map((item, i) => (
                                    <div
                                        key={i}
                                        onClick={() => openLightbox(i)}
                                        className="break-inside-avoid group relative rounded-3xl overflow-hidden bg-white border border-slate-100 shadow-sm transition-all hover:shadow-2xl cursor-zoom-in hover:-translate-y-1"
                                    >
                                        <img src={item.img} alt={item.title} className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 p-8 flex flex-col justify-end">
                                            <p className="text-accent text-[10px] font-black uppercase tracking-[0.2em] mb-2">{item.filter}</p>
                                            <h4 className="text-white font-bold text-lg font-heading leading-tight mb-3">{item.title}</h4>
                                            <div className="flex justify-between items-center">
                                                <p className="text-white/60 text-xs font-medium italic">{item.material}</p>
                                                <div className="w-10 h-10 rounded-xl bg-accent text-white flex items-center justify-center scale-75 group-hover:scale-100 transition-transform">
                                                    <Plus className="w-5 h-5" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="max-w-3xl mx-auto py-20 px-8 text-center bg-white border border-slate-100 rounded-[3rem] shadow-xl shadow-slate-200/50">
                                <div className="w-24 h-24 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-slate-100">
                                    <Plus className="w-10 h-10 text-accent animate-pulse" />
                                </div>
                                <h3 className="text-3xl font-black font-heading text-primary mb-6 italic">Incoming <span className="text-accent">Portfolio</span></h3>
                                <p className="text-lg text-slate-500 font-medium mb-10 leading-relaxed">
                                    Our latest project samples and high-precision fabrication designs are currently being updated in our digital library. Check back soon for our newest architectural and industrial works.
                                </p>
                                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                    <a
                                        href="https://wa.me/916380736439?text=I would like to see recent project samples for laser cutting/fabrication."
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-[#25D366] text-white px-8 py-4 rounded-2xl font-bold text-sm uppercase tracking-widest hover:scale-105 transition-all flex items-center gap-3 shadow-lg shadow-[#25D366]/20"
                                    >
                                        <MessageCircle className="w-5 h-5" /> Request Samples on WhatsApp
                                    </a>
                                </div>
                            </div>
                        )}

                        {/* Lightbox */}
                        {isLightboxOpen && (
                            <div className="fixed inset-0 z-[100] bg-primary/95 backdrop-blur-2xl flex items-center justify-center p-4 animate-in fade-in duration-300">
                                <button onClick={closeLightbox} className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors z-[110] bg-white/5 p-3 rounded-2xl">
                                    <X className="w-8 h-8" />
                                </button>

                                <button onClick={prevImage} className="absolute left-8 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors z-[110] bg-white/5 p-4 rounded-3xl hover:bg-white/10">
                                    <ChevronLeft className="w-10 h-10" />
                                </button>

                                <div className="max-w-6xl w-full flex flex-col lg:flex-row gap-12 items-center px-4">
                                    <div className="flex-1 relative group bg-black/20 rounded-[2.5rem] p-4 border border-white/5 shadow-2xl">
                                        <img
                                            src={displayed[lightboxIndex].img}
                                            alt={displayed[lightboxIndex].title}
                                            className="w-full max-h-[65vh] object-contain rounded-[2rem]"
                                        />
                                    </div>

                                    <div className="w-full lg:w-[400px] text-white flex flex-col gap-8">
                                        <div className="space-y-4">
                                            <div className="inline-block px-4 py-1.5 bg-accent/20 border border-accent/20 rounded-full">
                                                <p className="text-accent font-black text-[10px] uppercase tracking-widest">{displayed[lightboxIndex].filter}</p>
                                            </div>
                                            <h3 className="text-3xl md:text-5xl font-black font-heading leading-tight tracking-tight italic">{displayed[lightboxIndex].title}</h3>
                                        </div>

                                        <div className="p-8 bg-white/5 rounded-[2rem] border border-white/10 space-y-6 backdrop-blur-md">
                                            <div className="flex justify-between items-center text-sm">
                                                <span className="text-white/40 font-bold uppercase tracking-widest text-[10px]">Material Grade</span>
                                                <span className="font-bold text-accent">{displayed[lightboxIndex].material}</span>
                                            </div>
                                            <p className="text-white/60 text-sm leading-relaxed font-medium">
                                                Industry-standard precision cutting with zero-tolerance edge finish. Optimized for high-end structural and architectural installations.
                                            </p>
                                            <div className="pt-6 border-t border-white/10 flex flex-col gap-4">
                                                <a
                                                    href={`https://wa.me/916380736439?text=Enquiry: ${displayed[lightboxIndex].title} (${displayed[lightboxIndex].material})`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="w-full bg-[#25D366] text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:scale-[1.02] transition-transform shadow-2xl shadow-[#25D366]/20"
                                                >
                                                    <MessageCircle className="w-5 h-5" /> Enquire on WhatsApp
                                                </a>
                                                <p className="text-center text-[10px] text-white/20 font-bold tracking-widest uppercase">REF: RG-LIB-{lightboxIndex + 5000}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <button onClick={nextImage} className="absolute right-8 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors z-[110] bg-white/5 p-4 rounded-3xl hover:bg-white/10">
                                    <ChevronRight className="w-10 h-10" />
                                </button>
                            </div>
                        )}

                        {visibleItems < filtered.length && (
                            <div className="text-center mt-20">
                                <button
                                    onClick={() => setVisibleItems(prev => prev + 12)}
                                    className="group relative bg-primary text-white px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-primary/30 hover:shadow-accent/40 hover:bg-accent transition-all overflow-hidden"
                                >
                                    <span className="relative z-10">Load More Samples</span>
                                    <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                                </button>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        )
    }

    const HomePage = () => {
        const homeTitle = 'RG Tech Engineering | Best CNC Laser Cutting & Metal Fabrication Chennai'
        const homeDesc = 'RG Tech Engineering Works: Leading CNC Fiber Laser Cutting Services in Chennai. Precision MS, SS, Aluminum, Copper & Brass cutting up to 45mm. Fast 24/7 support.'

        const orgSchema = {
            "@context": "https://schema.org",
            "@type": ["Organization", "LocalBusiness"],
            "name": "RG Tech Engineering Works",
            "url": BASE_URL,
            "logo": `${BASE_URL}/RG-Tech-Logo.png`,
            "image": DEFAULT_OG_IMAGE,
            "description": homeDesc,
            "telephone": "+916380736439",
            "email": "admin@rgtechengineeringworks.com",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "Ayanambakkam",
                "addressLocality": "Chennai",
                "addressRegion": "Tamil Nadu",
                "postalCode": "600095",
                "addressCountry": "IN"
            },
            "openingHoursSpecification": [{
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
                "opens": "09:00",
                "closes": "19:00"
            }],
            "priceRange": "$$",
            "currenciesAccepted": "INR",
            "paymentAccepted": "Cash, Bank Transfer, UPI"
        }

        const websiteSchema = {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "RG Tech Engineering Works",
            "url": BASE_URL
        }

        return (
        <div className="bg-white">
            <Helmet>
                <title>{homeTitle}</title>
                <meta name="description" content={homeDesc} />
                <link rel="canonical" href={`${BASE_URL}/`} />
                <meta property="og:title" content={homeTitle} />
                <meta property="og:description" content={homeDesc} />
                <meta property="og:image" content={DEFAULT_OG_IMAGE} />
                <meta property="og:url" content={`${BASE_URL}/`} />
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="RG Tech Engineering Works" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={homeTitle} />
                <meta name="twitter:description" content={homeDesc} />
                <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
                <script type="application/ld+json">{JSON.stringify(orgSchema)}</script>
                <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
            </Helmet>

            {/* Hero - Reverted to Dark Navy Industrial */}
            <section id="home" className="bg-primary text-white py-20 min-h-[600px] flex items-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 skew-x-12 translate-x-1/2 pointer-events-none"></div>
                <div className="max-w-7xl mx-auto px-4 relative z-10 w-full">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-4xl md:text-6xl font-bold font-heading leading-tight mb-6 text-balance">
                                Your Trusted Partner for <br />
                                <span className="text-accent">CNC Laser Cutting & Fabrication</span>
                            </h2>
                            <p className="text-lg text-white/70 mb-10 max-w-xl">
                                High-Precision Metal Cutting up to 45mm – MS, SS, Aluminum, Copper & Brass
                            </p>

                            <div className="grid grid-cols-2 gap-y-4 gap-x-8 mb-12">
                                <div className="flex items-center gap-3">
                                    <div className="w-5 h-5 rounded-full border border-white/30 flex items-center justify-center">
                                        <CheckCircle className="w-3.5 h-3.5 text-accent" />
                                    </div>
                                    <span className="text-sm font-medium">Precision up to 0.01mm</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-5 h-5 rounded-full border border-white/30 flex items-center justify-center">
                                        <CheckCircle className="w-3.5 h-3.5 text-accent" />
                                    </div>
                                    <span className="text-sm font-medium">Large bed: 8000x2500mm</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-5 h-5 rounded-full border border-white/30 flex items-center justify-center">
                                        <CheckCircle className="w-3.5 h-3.5 text-accent" />
                                    </div>
                                    <span className="text-sm font-medium">All metal types</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-5 h-5 rounded-full border border-white/30 flex items-center justify-center">
                                        <CheckCircle className="w-3.5 h-3.5 text-accent" />
                                    </div>
                                    <span className="text-sm font-medium">Quick turnaround</span>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-5">
                                <a href="#contact" className="bg-accent text-white px-8 py-4 rounded-xl font-bold flex items-center gap-3 hover:bg-accent-dark transition-colors shadow-lg shadow-black/20">
                                    Get a Quote <ArrowRight className="w-4 h-4" />
                                </a>
                                <a href="tel:+916380736439" className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold flex items-center gap-3 border border-white/10 hover:bg-white/20 transition-colors">
                                    <Phone className="w-4 h-4" /> Call Now
                                </a>
                            </div>

                            <div className="flex gap-6 mt-12 pt-8 border-t border-white/10">
                                <div className="flex items-center gap-2 text-white/50 text-xs font-bold uppercase tracking-widest">
                                    <Shield className="w-4 h-4" /> ISO Certified
                                </div>
                                <div className="flex items-center gap-2 text-white/50 text-xs font-bold uppercase tracking-widest">
                                    <Clock className="w-4 h-4" /> 15+ Years
                                </div>
                                <div className="flex items-center gap-2 text-white/50 text-xs font-bold uppercase tracking-widest">
                                    <Star className="w-4 h-4" /> 1000+ Projects
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="rounded-3xl overflow-hidden shadow-2xl relative border-4 border-white/10">
                                <img src="/gallery/Sheet Metal Laser Cutting/sm_12.jpg" alt="CNC Laser Machine" className="w-full aspect-[4/3] object-cover" />
                                <div className="absolute bottom-6 left-6 bg-white p-6 rounded-2xl shadow-xl max-w-[220px] transition-transform hover:scale-105 duration-300">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Bed Sizes</p>
                                    <p className="text-lg font-black text-primary leading-none mb-1">8000 x 2500mm</p>
                                    <p className="text-sm font-bold text-accent">Large Format Processing</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Snippet */}
            <section id="services" className="py-24 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                        <div>
                            <p className="text-accent font-bold text-sm uppercase tracking-widest mb-2">Our Capabilities</p>
                            <h3 className="text-3xl md:text-4xl font-bold text-primary font-heading">Industrial Services</h3>
                        </div>
                        <p className="text-text-muted font-medium max-w-md">Precision engineering services delivered from our state-of-the-art facility in Chennai.</p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {pillarServices.map((s, i) => (
                            <Link key={i} to={s.slug} className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-gray-100">
                                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-8 group-hover:bg-accent transition-colors">
                                    <s.mainIcon className="w-6 h-6 text-accent group-hover:text-white" />
                                </div>
                                <h4 className="text-xl font-bold text-primary mb-4 font-heading">{s.name}</h4>
                                <p className="text-[15px] text-primary/60 leading-relaxed mb-8 flex-grow">
                                    {s.metaDescription.split('. ')[0]}. Expert cutting and processing for all industrial grades.
                                </p>
                                <div className="pt-6 border-t border-gray-50 flex items-center justify-between text-accent font-bold text-[13px] group-hover:translate-x-1 transition-transform">
                                    Explore Service <ArrowRight className="w-4 h-4" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Industries - Grid Layout */}
            <section id="industries" className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <p className="text-accent font-bold text-sm uppercase tracking-widest mb-2">Sectors Served</p>
                        <h3 className="text-3xl md:text-5xl font-bold text-primary font-heading">Industries We Empower</h3>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                        {industries.map((ind, i) => (
                            <div key={i} className="bg-slate-50 p-6 rounded-2xl text-center hover:bg-accent-soft transition-all duration-300 group">
                                <ind.icon className="w-8 h-8 text-primary mx-auto mb-4 opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                                <p className="text-[11px] font-black text-primary uppercase tracking-wider">{ind.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why RG Tech - Dark Section */}
            <section id="about" className="py-24 bg-primary text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[120px]"></div>
                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <div className="grid md:grid-cols-3 gap-12">
                        <div className="md:col-span-1">
                            <p className="text-accent font-bold text-sm uppercase tracking-widest mb-4">Why Choose Us</p>
                            <h3 className="text-3xl md:text-4xl font-bold font-heading leading-tight">Expertise That Drives Precision</h3>
                        </div>
                        <div className="md:col-span-2 grid md:grid-cols-2 gap-8">
                            {differentiators.map((d, i) => (
                                <div key={i} className="flex gap-6 group">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-accent transition-colors duration-300">
                                        <d.icon className="w-6 h-6 text-accent group-hover:text-white" />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold mb-3 font-heading">{d.title}</h4>
                                        <p className="text-white/60 text-[15px] leading-relaxed italic">"{d.desc}"</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-24 bg-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#7FB3D5]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <div className="text-center mb-16">
                        <p className="text-accent font-black text-xs uppercase tracking-[0.3em] mb-3">Client Success</p>
                        <h3 className="text-3xl md:text-5xl font-black text-primary font-heading">Voice of Trust</h3>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {testimonials.map((t, i) => (
                            <div key={i} className="bg-slate-50/50 p-10 rounded-3xl border border-slate-100 hover:shadow-xl transition-all duration-300 relative group">
                                <Star className="w-10 h-10 text-accent/10 absolute top-8 right-8 group-hover:scale-110 transition-transform" />
                                <div className="flex gap-1 mb-6">
                                    {[...Array(t.rating)].map((_, j) => <Star key={j} className="w-4 h-4 fill-accent text-accent" />)}
                                </div>
                                <p className="text-primary/70 italic mb-8 leading-relaxed text-[15px]">"{t.text}"</p>
                                <div className="pt-6 border-t border-slate-200">
                                    <p className="font-bold text-primary text-sm">{t.name}</p>
                                    <p className="text-xs text-text-muted font-bold uppercase tracking-wider mt-1">{t.company}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-24 bg-white">
                <div className="max-w-3xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <p className="text-accent font-bold text-sm uppercase tracking-widest mb-2">Support</p>
                        <h3 className="text-3xl md:text-4xl font-bold text-primary font-heading">Technical FAQs</h3>
                    </div>
                    <div className="space-y-4">
                        {faqs.map((faq, i) => (
                            <div key={i} className="border border-slate-200 rounded-xl overflow-hidden transition-all hover:bg-slate-50">
                                <button onClick={() => toggleFaq(i)} className="w-full flex justify-between items-center p-6 text-left group">
                                    <span className="font-bold text-primary text-[15px] pr-8">{faq.q}</span>
                                    <ChevronDown className={`w-5 h-5 text-text-muted transition-transform ${openFaq === i ? 'rotate-180 text-accent' : ''}`} />
                                </button>
                                {openFaq === i && (
                                    <div className="px-6 pb-6 animate-in fade-in slide-in-from-top-2">
                                        <p className="text-[14px] text-text-muted leading-relaxed border-l-2 border-accent/30 pl-4">{faq.a}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Quick Quote Form */}
            <section id="contact" className="py-24 bg-primary relative overflow-hidden">
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-[120px]"></div>
                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row border border-white/20">
                        <div className="lg:w-2/5 bg-slate-50 p-12">
                            <h3 className="text-3xl font-bold text-primary mb-6 font-heading">Start Your Project</h3>
                            <p className="text-text-muted mb-10 font-medium">Engineer-verified pricing and technical feasibility analysis within 24 business hours.</p>

                            <div className="space-y-8">
                                <div className="flex items-start gap-4">
                                    <Phone className="w-6 h-6 text-accent mt-1" />
                                    <div>
                                        <p className="font-bold text-primary">Direct Line</p>
                                        <p className="text-[#5A6C7D]">+91 63807-36439</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <Mail className="w-6 h-6 text-[#E85A4F] mt-1" />
                                    <div>
                                        <p className="font-bold text-[#1C3D5A]">Technical Support</p>
                                        <p className="text-[#5A6C7D]">admin@rgtechengineeringworks.com</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <MapPin className="w-6 h-6 text-[#E85A4F] mt-1" />
                                    <div>
                                        <p className="font-bold text-[#1C3D5A]">Registered Facility</p>
                                        <p className="text-[#5A6C7D]">Ayanambakkam, Chennai - 600095</p>
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
                                        <option>Mild Steel</option><option>SS 304</option><option>SS 316</option><option>Aluminum</option><option>Copper</option><option>Brass</option>
                                    </select>
                                </div>
                                <textarea name="message" value={formData.message} onChange={handleInputChange} rows={4} placeholder="Thickness, Quantity, Delivery Location..." className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#E85A4F]/20 focus:border-[#E85A4F] outline-none transition-all text-sm resize-none"></textarea>

                                <button className="w-full py-6 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 font-bold text-xs uppercase tracking-widest hover:border-[#E85A4F] hover:text-[#E85A4F] transition-all flex items-center justify-center gap-3">
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
        </div>
        )
    }

    return (
        <div className="min-h-screen bg-white font-sans selection:bg-[#7FB3D5]/30">
            <ScrollToTop />
            <Header
                toggleMobileMenu={toggleMobileMenu}
                mobileMenuOpen={mobileMenuOpen}
                setMobileMenuOpen={setMobileMenuOpen}
                toggleServicesDropdown={toggleServicesDropdown}
                servicesDropdown={servicesDropdown}
                setServicesDropdown={setServicesDropdown}
                pillarServices={pillarServices}
                setCatalogueModalOpen={setCatalogueModalOpen}
            />

            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/gallery" element={<GalleryPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:slug" element={<BlogPostPage />} />
                <Route path="/admin" element={<AdminPage />} />
                {/* Optimized routes for all services and city pages */}
                <Route path="/chennai/:combinedSlug" element={<ServicePage services={pillarServices} />} />
                <Route path="/chennai/:serviceSlug/:city" element={<ServicePage services={pillarServices} />} />
            </Routes>

            <Footer pillarServices={pillarServices} />

            {/* Floating WhatsApp */}
            <a href="https://wa.me/916380736439" className="fixed bottom-6 right-6 w-14 h-14 bg-[#25D366] rounded-2xl flex items-center justify-center shadow-lg hover:scale-110 transition-transform z-50">
                <MessageCircle className="w-7 h-7 text-white" />
            </a>

            {/* Catalogue Download Modal */}
            <CatalogueModal isOpen={catalogueModalOpen} onClose={() => setCatalogueModalOpen(false)} />
        </div>
    )
}

export default App
