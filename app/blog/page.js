import Link from 'next/link'
import Image from 'next/image'
import { Calendar, ArrowRight, Clock, FileText } from 'lucide-react'
import { BASE_URL } from '@/lib/data'
import { getPosts, resolveImage } from '@/lib/sanity'
import { buildAlt } from '@/lib/utils'
import { breadcrumbSchema, jsonLdGraph, jsonLdScript } from '@/lib/schema'

const BASE = BASE_URL

export const revalidate = 3600

export const metadata = {
    title: 'Technical Blog | CNC Laser Cutting & Metal Fabrication | RG Tech',
    description:
        'Technical insights and deep dives into industrial laser cutting, fiber technology, and precision metal fabrication from RG Tech Engineering experts in Chennai.',
    alternates: { canonical: '/blog' },
    openGraph: {
        title: 'Technical Blog | CNC Laser Cutting & Metal Fabrication | RG Tech',
        description:
            'Expert perspectives on laser technology, industrial fabrication, and manufacturing optimization from RG Tech Engineering, Chennai.',
        url: `${BASE}/blog`,
        type: 'website',
        images: [
            {
                url: `${BASE}/og?title=Engineering+Insights+Blog&sub=CNC+Laser+Cutting+%26+Metal+Fabrication+Expertise`,
                width: 1200,
                height: 630,
                alt: 'RG Tech Engineering — Technical Blog',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Technical Blog | CNC Laser Cutting & Metal Fabrication | RG Tech',
        description:
            'Expert perspectives on laser technology and precision metal fabrication from RG Tech Engineering.',
        images: [`${BASE}/og?title=Engineering+Insights+Blog&sub=CNC+Laser+Cutting+%26+Metal+Fabrication+Expertise`],
    },
}

function formatDate(value) {
    if (!value) return ''
    const d = new Date(value)
    if (Number.isNaN(d.getTime())) return String(value)
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default async function BlogPage() {
    const posts = await getPosts()

    const graph = jsonLdGraph(
        breadcrumbSchema(
            [
                { name: 'Home', url: BASE },
                { name: 'Blog', url: `${BASE}/blog` },
            ],
            `${BASE}/blog`
        )
    )

    return (
        <div className="bg-white min-h-screen">
            <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(graph)} />

            {/* Blog Hero */}
            <section className="hero-gradient py-16 md:py-24 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none hero-texture"></div>
                <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
                    <p className="eyebrow mb-4">
                        Technical Deep Dives
                    </p>
                    <h1 className="display-title text-fg mb-6">
                        Engineering <span className="text-accent">Insights</span>
                    </h1>
                    <p className="section-lead max-w-2xl mx-auto">
                        Expert perspectives on laser technology, industrial fabrication, and manufacturing
                        optimization.
                    </p>
                </div>
            </section>

            <section className="py-24">
                <div className="max-w-7xl mx-auto px-4">
                    {posts.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {posts.map((post) => {
                                const img = resolveImage(post, 'mainImageUrl', 'mainImage', 800)
                                return (
                                    <Link
                                        key={post.slug}
                                        href={`/blog/${post.slug}`}
                                        className="group bg-white rounded-[2rem] overflow-hidden border border-line shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col"
                                    >
                                        <div className="aspect-[16/10] overflow-hidden relative bg-surface-2">
                                            {img && (
                                                <Image
                                                    src={img}
                                                    alt={
                                                        post.mainImageAlt ||
                                                        buildAlt({
                                                            metaTitle: 'CNC Laser Cutting & Metal Fabrication',
                                                            subject: post.title,
                                                        })
                                                    }
                                                    fill
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                                />
                                            )}
                                            {post.category?.title && (
                                                <span className="absolute top-6 left-6 px-4 py-1.5 bg-ink-2 text-accent meta-label rounded-full border border-white/10 backdrop-blur-md">
                                                    {post.category.title}
                                                </span>
                                            )}
                                        </div>
                                        <div className="p-8 flex flex-col flex-1">
                                            <div className="flex items-center gap-6 meta-label text-fg-subtle mb-5">
                                                <span className="flex items-center gap-2">
                                                    <Calendar className="w-3.5 h-3.5 text-accent" />
                                                    {formatDate(post.publishedAt)}
                                                </span>
                                                <span className="flex items-center gap-2">
                                                    <Clock className="w-3.5 h-3.5 text-accent" />
                                                    {post.readTime || '5 min read'}
                                                </span>
                                            </div>
                                            <h2 className="card-title text-fg mb-4 group-hover:text-accent transition-colors">
                                                {post.title}
                                            </h2>
                                            <p className="text-fg-muted text-base leading-relaxed mb-8 line-clamp-3">
                                                {post.summary}
                                            </p>
                                            <span className="mt-auto text-accent meta-label flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                                                Read Analysis <ArrowRight className="w-3.5 h-3.5" />
                                            </span>
                                        </div>
                                    </Link>
                                )
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-16 sm:py-24 bg-surface-2 rounded-[1.5rem] sm:rounded-[3rem] border-2 border-dashed border-line-strong">
                            <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl">
                                <FileText className="w-8 h-8 text-accent" />
                            </div>
                            <h2 className="subsection-title text-fg mb-4">
                                Awaiting New Engineering <span className="text-accent">Insights</span>
                            </h2>
                            <p className="text-fg-muted font-medium max-w-sm mx-auto">
                                Our technical experts are documenting new case studies. Check back soon for the
                                latest manufacturing analysis.
                            </p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    )
}
