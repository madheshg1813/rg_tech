import Image from 'next/image'
import {
    FileText, Send, Zap, Wrench, Eye, Truck, HelpCircle, ArrowRight,
} from 'lucide-react'
import { processSteps } from '@/lib/data'
import { cld, cldPoster } from '@/lib/cloudinary'

const IconMap = { FileText, Send, Zap, Wrench, Eye, Truck }

/*
 * Workflow — rebuilt as six premium process cards.
 *
 * The problem it fixes: six steps were laid into a five-column grid, so step 06
 * wrapped onto a row of its own and left a half-screen of dead white below it.
 * The grid is now 2 / 3 / 3, which divides six exactly at every breakpoint and
 * ends flush.
 *
 * ── On imagery ───────────────────────────────────────────────────────────
 * The brief asks for a photograph per stage: engineering drawings, an engineer
 * reviewing CAD, the laser cutting, welding, inspection, packed goods.
 *
 * RG Tech's library is roughly 1,057 photographs and almost all of them are
 * finished product — installed gates, screens, pergolas, panels. There is no
 * CAD workstation, no welding bay, no inspection bench and no packing table
 * anywhere in it.
 *
 * Two stages do have genuine images and they are used:
 *   03  a poster frame from rg-video-01, the fiber laser actually cutting
 *   06  rg-work-53, shot "ready for dispatch"
 *
 * The other four render as an icon on a tinted plate. That is deliberate: the
 * nearest available photographs show finished pergolas, and a pergola standing
 * in for "quality inspection" would be a picture that lies about what it shows.
 * Each card takes an optional `img`, so supplying a real photo later is a
 * one-line change in STAGE_MEDIA below — nothing else moves.
 */

// Genuine photography only. A stage with no honest image stays an icon.
const STAGE_MEDIA = {
    '03': {
        src: cldPoster('/videos/rg-video-01.mp4', 900),
        alt: 'RG Tech\'s fiber laser cutting a perforated circular panel on the bed',
    },
    '06': {
        src: cld('/works/rg-work-53.jpg', { width: 900 }),
        alt: 'Laser-cut window grill with floral panels, packed and ready for dispatch',
    },
}

const Process = () => {
    return (
        <section id="process" className="section bg-surface">
            <div className="shell">
                <div className="mx-auto mb-8 max-w-2xl text-center sm:mb-12">
                    <p className="eyebrow-text">Workflow</p>
                    <h2 className="h2 mt-2 text-balance">
                        From CAD Drawing to{' '}
                        <span className="text-accent">Finished Fabricated Product</span>
                    </h2>
                    <p className="section-lead mt-3">
                        Six stages, all under one roof in Chennai. Nothing is cut until you have
                        approved the file.
                    </p>
                </div>

                <ol className="grid list-none grid-cols-2 gap-2.5 p-0 sm:gap-4 md:grid-cols-3">
                    {processSteps.map((s) => {
                        const Icon = IconMap[s.icon] || HelpCircle
                        const media = STAGE_MEDIA[s.step]

                        return (
                            <li
                                key={s.step}
                                className="card group relative isolate flex flex-col overflow-hidden transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-accent-ink/35 hover:shadow-[0_24px_48px_-28px_rgba(15,42,68,0.35)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                            >
                                <span
                                    aria-hidden="true"
                                    className="pointer-events-none absolute inset-x-0 top-0 z-20 h-1 bg-accent-ink"
                                />

                                {/* 16:10 at every breakpoint, photo or not, so the
                                    six cards keep one baseline regardless of which
                                    stages have imagery yet. */}
                                <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface-3">
                                    {media?.src ? (
                                        <Image
                                            src={media.src}
                                            alt={media.alt}
                                            fill
                                            sizes="(max-width: 768px) 50vw, 33vw"
                                            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                                        />
                                    ) : (
                                        <span className="absolute inset-0 flex items-center justify-center">
                                            {/* The plate carries the hero's grid
                                                texture so a stage without a
                                                photograph still reads as a
                                                designed surface rather than as a
                                                picture that failed to load. */}
                                            <span
                                                aria-hidden="true"
                                                className="absolute inset-0 opacity-70 [background-image:linear-gradient(to_right,rgba(15,42,68,.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,42,68,.07)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_75%_75%_at_50%_50%,#000,transparent)]"
                                            />
                                            <Icon
                                                className="relative h-11 w-11 text-accent sm:h-14 sm:w-14"
                                                strokeWidth={1.3}
                                                aria-hidden="true"
                                            />
                                        </span>
                                    )}

                                    <span className="step-num absolute left-2.5 top-3 z-10 h-7 w-7 text-[0.7rem] shadow-[0_2px_8px_rgba(13,11,43,.4)] sm:left-3 sm:h-8 sm:w-8 sm:text-xs">
                                        {s.step}
                                    </span>
                                </div>

                                <div className="flex flex-1 flex-col p-3 sm:p-5">
                                    <h3 className="font-heading text-[0.9375rem] font-bold leading-snug tracking-[-0.015em] text-fg sm:text-base">
                                        {s.title}
                                    </h3>
                                    <p className="mt-1.5 text-xs leading-snug text-fg-muted sm:text-sm">
                                        {s.desc}
                                    </p>
                                </div>
                            </li>
                        )
                    })}
                </ol>

                <div className="mt-8 text-center sm:mt-10">
                    <a href="#contact" className="btn btn-primary">
                        Send your drawing <ArrowRight className="h-4 w-4" />
                    </a>
                </div>
            </div>
        </section>
    )
}

export default Process;
