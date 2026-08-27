import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { resolveImage } from '@/lib/sanity'
import { buildAlt } from '@/lib/utils'

/*
 * Recommended reading, last section before the footer on the service pillars.
 *
 * A server component: it resolves Sanity image URLs, and ServiceClient — where
 * this ends up — is a client component, so it is passed in as an already
 * rendered element rather than imported there. Same slot pattern as OurWorks.
 *
 * The heading is per-service ("Guides for steel gates") rather than a flat
 * "Recommended Articles" on all 24 pillars: the same h2 repeated across two
 * dozen indexed pages says nothing about any of them, and this one names the
 * thing the page is actually about.
 *
 * Renders nothing when there are no posts — Sanity is fetched through
 * safeFetch, which returns [] rather than throwing if it is unreachable, and an
 * empty heading above an empty grid is worse than no section.
 */

function formatDate(value) {
    if (!value) return null
    const d = new Date(value)
    if (Number.isNaN(d.getTime())) return null
    return d.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })
}

export default function RecommendedArticles({ posts = [], serviceName }) {
    if (!posts.length) return null

    const heading = serviceName
        ? `Guides for ${serviceName.toLowerCase()}`
        : 'Recommended articles'

    return (
        <section className="py-20 bg-surface-2 border-t border-line">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-12">
                    <p className="eyebrow mb-3">Technical Blog</p>
                    <h2 className="section-title text-fg">{heading}</h2>
                    <p className="section-lead mt-4 max-w-2xl mx-auto">
                        Written by the people who run the machine — what to send us,
                        what it costs, and what to expect back.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {posts.map((post) => {
                        const img = resolveImage(post, 'mainImageUrl', 'mainImage', 800)
                        const date = formatDate(post.publishedAt)

                        return (
                            <Link
                                key={post.slug}
                                href={`/blog/${post.slug}`}
                                className="framed-soft group bg-white flex flex-col hover:shadow-xl transition-shadow duration-300"
                            >
                                <div className="aspect-[16/10] overflow-hidden relative bg-surface-2 border-b border-line">
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
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    )}
                                </div>

                                <div className="p-6 flex flex-col flex-1">
                                    {post.category?.title && (
                                        <span className="self-start meta-label text-fg-subtle border border-line px-2.5 py-1 mb-4">
                                            {post.category.title}
                                        </span>
                                    )}

                                    <h3 className="card-title text-fg group-hover:text-accent transition-colors">
                                        {post.title}
                                    </h3>

                                    {post.summary && (
                                        <p className="text-sm text-fg-muted leading-relaxed mt-3 line-clamp-2">
                                            {post.summary}
                                        </p>
                                    )}

                                    <div className="mt-auto pt-5 flex items-center justify-between gap-3">
                                        <span className="meta-label text-fg-subtle truncate">
                                            {post.author?.name || 'RG Tech'}
                                        </span>
                                        <span className="meta-label text-fg-subtle whitespace-nowrap">
                                            {[date, post.readTime].filter(Boolean).join(' · ')}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        )
                    })}
                </div>

                <div className="text-center mt-12">
                    <Link href="/blog" className="btn btn-secondary-light group">
                        Explore More Blogs
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>
    )
}
