import Image from 'next/image'

/**
 * The wide banner card that opens each article: brand mark top-left, eyebrow
 * pill, large heading, subheading, a footer strip, and a visual with a status
 * badge on the right.
 *
 * Stays dark while the page heroes are light. It sits inside the white article
 * page and needs presence, so it uses the dark band surface. .hero-texture is
 * deliberately absent — its etched lines are indigo and vanish on dark.
 */
export default function ArticleBanner({
    eyebrow,
    heading,
    subheading,
    badge,
    imageUrl,
    imageAlt,
}) {
    return (
        <div className="on-dark surface-dark relative overflow-hidden rounded-[1.75rem] text-white">
            <div className="relative z-10 p-6 sm:p-8 md:p-12 min-h-[320px] md:min-h-[360px] flex flex-col">
                <p className="text-base font-semibold text-white/85">RG Tech Engineering</p>

                <div className="mt-auto pt-12 grid md:grid-cols-[1fr_auto] gap-10 items-end">
                    <div>
                        {eyebrow && (
                            <span className="inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1.5 meta-label text-white/90">
                                {eyebrow}
                            </span>
                        )}
                        {heading && (
                            <p className="mt-6 display-title">
                                {heading}
                            </p>
                        )}
                        {subheading && (
                            <p className="mt-3 text-lg md:text-xl text-white/70 font-medium">{subheading}</p>
                        )}
                    </div>

                    {imageUrl && (
                        <div className="relative hidden md:block">
                            <div className="w-[240px] rounded-xl overflow-hidden ring-1 ring-white/25 shadow-2xl">
                                <Image
                                    src={imageUrl}
                                    alt={imageAlt || ''}
                                    width={480}
                                    height={340}
                                    sizes="240px"
                                    className="w-full h-auto object-cover"
                                />
                            </div>
                            {badge && (
                                <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-md bg-brand-green px-3 py-1.5 meta-label text-white shadow-lg whitespace-nowrap">
                                    {badge}
                                </span>
                            )}
                        </div>
                    )}
                </div>

                <div className="mt-12 flex flex-wrap items-center gap-4 text-sm">
                    <span className="rounded-md border border-white/15 bg-white/10 px-3 py-1.5 font-medium text-white/85">
                        Official specs &amp; tolerances
                    </span>
                    <span className="text-white/45">www.rgtechengineeringworks.com</span>
                </div>
            </div>
        </div>
    )
}
