import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronLeft, Calendar, Clock, Plus } from 'lucide-react'
import { BASE_URL, DEFAULT_OG_IMAGE } from '@/lib/data'
import { getPosts, getPostBySlug, getPostSlugs, resolveImage } from '@/lib/sanity'
import { extractHeadings, estimateReadTime } from '@/lib/portableText'
import { buildAlt } from '@/lib/utils'
import {
    ORG_ID,
    WEBSITE_ID,
    personSchema,
    breadcrumbSchema,
    faqPageSchema,
    jsonLdGraph,
    jsonLdScript,
} from '@/lib/schema'
import PortableBody from '@/components/Blog/PortableBody'
import ArticleBanner from '@/components/Blog/ArticleBanner'
import ArticleSidebar from '@/components/Blog/ArticleSidebar'

export const revalidate = 3600

export async function generateStaticParams() {
    const slugs = await getPostSlugs()
    return slugs.map((slug) => ({ slug }))
}

function formatDate(value) {
    if (!value) return ''
    const d = new Date(value)
    if (Number.isNaN(d.getTime())) return String(value)
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
}

export async function generateMetadata({ params }) {
    const { slug } = await params
    const post = await getPostBySlug(slug)
    if (!post) return {}

    const image = resolveImage(post, 'mainImageUrl', 'mainImage', 1200) || DEFAULT_OG_IMAGE
    const title = post.metaTitle || post.title
    const description = post.metaDescription || post.summary

    return {
        title,
        description,
        keywords: post.keywords,
        alternates: { canonical: `/blog/${slug}` },
        authors: post.author?.name ? [{ name: post.author.name }] : undefined,
        openGraph: {
            title: post.title,
            description,
            url: `${BASE_URL}/blog/${slug}`,
            type: 'article',
            siteName: 'RG Tech Engineering Works',
            publishedTime: post.publishedAt,
            modifiedTime: post.updatedAt || post.publishedAt,
            authors: post.author?.name ? [post.author.name] : undefined,
            images: [{ url: image, width: 1200, height: 630, alt: post.mainImageAlt || post.title }],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [image],
        },
    }
}

export default async function BlogPostPage({ params }) {
    const { slug } = await params
    const post = await getPostBySlug(slug)
    if (!post) notFound()

    const allPosts = await getPosts()
    const related = allPosts.filter((p) => p.slug !== slug).slice(0, 4)

    const postUrl = `${BASE_URL}/blog/${slug}`
    const headings = extractHeadings(post.body)
    const readTime = post.readTime || estimateReadTime(post.body)
    const heroImage = resolveImage(post, 'mainImageUrl', 'mainImage', 1200)
    const authorImage = resolveImage(post.author, 'imageUrl', 'image', 160)
    const updated = post.updatedAt || post.publishedAt

    const article = {
        "@type": "BlogPosting",
        "@id": `${postUrl}#post`,
        "headline": post.title,
        "description": post.metaDescription || post.summary,
        "image": heroImage || DEFAULT_OG_IMAGE,
        "url": postUrl,
        "datePublished": post.publishedAt,
        "dateModified": updated,
        "wordCount": undefined,
        "keywords": post.keywords?.join(', '),
        "articleSection": post.category?.title,
        "inLanguage": "en-IN",
        // Author is a Person; the business remains the publisher.
        "author": post.author ? { "@id": `${BASE_URL}/#author-${post.author.slug || 'madhesh-g'}` } : { "@id": ORG_ID },
        "publisher": { "@id": ORG_ID },
        "isPartOf": { "@id": WEBSITE_ID },
        "mainEntityOfPage": { "@type": "WebPage", "@id": postUrl },
    }

    const graph = jsonLdGraph(
        article,
        post.author ? personSchema(post.author) : null,
        breadcrumbSchema(
            [
                { name: 'Home', url: BASE_URL },
                { name: 'Blog', url: `${BASE_URL}/blog` },
                { name: post.title, url: postUrl },
            ],
            postUrl
        ),
        faqPageSchema(
            (post.faqs || []).map((f) => ({ q: f.question, a: f.answer })),
            postUrl
        )
    )

    return (
        <article className="bg-white min-h-screen">
            <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(graph)} />

            {/*
             * max-w-7xl matches the header and footer gutters so the article
             * lines up with the rest of the site. The sidebar is a fixed 320px
             * rather than a 12-column fraction — on a 4/12 split it grew with
             * the viewport and squeezed the prose down to ~700px.
             */}
            <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
                <div className="grid lg:grid-cols-[minmax(0,1fr)_320px] gap-12 lg:gap-16">
                    {/* ── Article column ─────────────────────────────────────── */}
                    <div className="min-w-0">
                        {/* flex (not inline-flex) so the category pill starts a new line */}
                        <Link
                            href="/blog"
                            className="flex w-fit items-center gap-2 text-base font-medium text-fg-muted hover:text-fg transition-colors mb-8"
                        >
                            <ChevronLeft className="w-4 h-4" /> Blog
                        </Link>

                        {post.category?.title && (
                            <span className="inline-block rounded-full bg-cta/12 px-4 py-1.5 meta-label text-accent">
                                {post.category.title}
                            </span>
                        )}

                        <h1 className="mt-6 display-title text-fg text-balance">
                            {post.title}
                        </h1>

                        {/* Author byline */}
                        {post.author && (
                            <div className="mt-8 flex items-center gap-4">
                                {authorImage ? (
                                    <Image
                                        src={authorImage}
                                        alt={`${post.author.name}, ${post.author.role || 'author'} at RG Tech Engineering`}
                                        width={48}
                                        height={48}
                                        sizes="48px"
                                        className="w-12 h-12 rounded-full object-cover"
                                    />
                                ) : (
                                    <span
                                        aria-hidden="true"
                                        className="w-12 h-12 rounded-full bg-ink-2 text-white flex items-center justify-center font-bold text-sm"
                                    >
                                        {post.author.name.split(' ').map((w) => w[0]).slice(0, 2).join('')}
                                    </span>
                                )}
                                <div>
                                    <p className="font-bold text-fg text-base">{post.author.name}</p>
                                    <p className="text-sm text-fg-subtle">
                                        {post.author.role || 'Content Writer'} · Updated on {formatDate(updated)}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Banner */}
                        <div className="mt-10">
                            <ArticleBanner
                                eyebrow={post.bannerEyebrow}
                                heading={post.bannerHeading || post.title}
                                subheading={post.bannerSubheading}
                                badge={post.bannerBadge}
                                imageUrl={heroImage}
                                imageAlt={
                                    post.mainImageAlt ||
                                    buildAlt({ metaTitle: post.metaTitle || post.title, subject: post.title })
                                }
                            />
                        </div>

                        {/* TL;DR */}
                        {post.tldr && (
                            <div className="mt-10 rounded-2xl border border-line bg-surface-2 p-6">
                                <p className="text-base leading-relaxed text-fg-muted m-0">
                                    <span className="font-bold text-fg">TL;DR:</span> {post.tldr}
                                </p>
                            </div>
                        )}

                        <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-fg-subtle">
                            <span className="inline-flex items-center gap-2">
                                <Calendar className="w-4 h-4" /> {formatDate(post.publishedAt)}
                            </span>
                            <span className="inline-flex items-center gap-2">
                                <Clock className="w-4 h-4" /> {readTime}
                            </span>
                        </div>

                        {/* Body */}
                        <div className="mt-4">
                            <PortableBody value={post.body} />
                        </div>

                        {/* FAQs */}
                        {post.faqs?.length > 0 && (
                            <section className="mt-20" id="faqs">
                                <h2 className="scroll-mt-28 section-title text-fg mb-8">
                                    Frequently Asked Questions
                                </h2>
                                <div className="space-y-3">
                                    {post.faqs.map((f, i) => (
                                        <details
                                            key={i}
                                            className="group rounded-2xl border border-line bg-white overflow-hidden"
                                        >
                                            <summary className="flex items-center justify-between gap-6 p-6 cursor-pointer list-none">
                                                <span className="font-bold text-fg text-base">{f.question}</span>
                                                <Plus className="w-5 h-5 flex-shrink-0 text-accent group-open:rotate-45 transition-transform" />
                                            </summary>
                                            <div className="px-6 pb-6">
                                                <p className="text-base leading-relaxed text-fg-muted border-l-2 border-cta/40 pl-5">
                                                    {f.answer}
                                                </p>
                                            </div>
                                        </details>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Related */}
                        {related.length > 0 && (
                            <section className="mt-20 pt-12 border-t border-line">
                                <h2 className="subsection-title text-fg mb-8">Related reading</h2>
                                <div className="grid sm:grid-cols-2 gap-5">
                                    {related.map((rp) => (
                                        <Link
                                            key={rp.slug}
                                            href={`/blog/${rp.slug}`}
                                            className="group rounded-2xl border border-line p-6 hover:border-cta transition-colors"
                                        >
                                            <p className="font-bold text-fg leading-snug group-hover:text-accent transition-colors">
                                                {rp.title}
                                            </p>
                                            <p className="mt-2 text-sm text-fg-muted line-clamp-2">{rp.summary}</p>
                                        </Link>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* ── Sidebar ────────────────────────────────────────────── */}
                    <div className="min-w-0">
                        <ArticleSidebar headings={headings} url={postUrl} title={post.title} />
                    </div>
                </div>
            </div>
        </article>
    )
}
