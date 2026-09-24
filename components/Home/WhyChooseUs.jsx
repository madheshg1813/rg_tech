import {
    CheckCircle, Wrench, FileText, Layers, Sparkles, Package, HelpCircle
} from 'lucide-react'
import { differentiators } from '@/lib/data'

const IconMap = {
    CheckCircle, Wrench, FileText, Layers, Sparkles, Package, HelpCircle
}

/*
 * Why Choose Us — capability showcase.
 *
 * Charcoal and emerald, not the site's navy. The navy band is still the right
 * ground for the footer and the CTA strips, but it was working against this
 * section: navy and green are both cool, so they compete, and the accent came
 * out flatter than it should. On a true neutral the same green reads
 * noticeably more saturated.
 *
 * The ground is set inline rather than as a class in globals.css. A
 * .surface-charcoal written into @layer utilities was tree-shaken out of the
 * compiled stylesheet even though the markup used it — the same class with the
 * --color-accent-on-dark redefinition removed survives, so the theme-variable
 * override is what trips it. Inline, it cannot be dropped, and the section
 * carries its own palette rather than adding a one-caller class to the global
 * sheet. --color-accent-on-dark is set on the element so .on-dark's own rules
 * (.text-accent, .eyebrow) inherit the emerald without the markup naming it.
 *
 * #00C875 on #0F1115 measures about 8:1, and the muted body grey about 7.5:1
 * on the raised panels, so both clear AA comfortably.
 *
 * Structure is unchanged: a one-third heading column beside a two-thirds grid
 * of the six differentiators.
 *
 * The heading column was two lines of text in a third of the width, which read
 * as a gap rather than a column. It now carries a rule, a divider and a drawn
 * crosshair, and on desktop it sticks while the capabilities scroll past it.
 *
 * The features were bare icon-and-text rows with nothing separating them, so
 * six capabilities read as one undifferentiated list. Each is now a raised
 * panel on #161A22, a step up from the #0F1115 ground — depth by elevation
 * rather than by borrowing a border.
 *
 * The icons were 48px plates at bg-white/10, the faintest thing in a section
 * whose job is to look substantial. They are 56px on an emerald-washed plate,
 * and they light up on hover.
 *
 * Hover moves transform, opacity and colour only, so the grid never reflows
 * under the pointer, and all of it is dropped under prefers-reduced-motion.
 */
const WhyChooseUs = () => {
    return (
        <section
            id="about"
            className="on-dark text-white relative isolate overflow-hidden py-24 lg:py-28"
            style={{
                '--color-accent-on-dark': '#00C875',
                backgroundColor: '#0F1115',
                backgroundImage:
                    'radial-gradient(55% 80% at 88% 0%, rgba(0,200,117,.14), transparent 60%),' +
                    'linear-gradient(160deg, #0F1115 0%, #13161D 55%, #161A22 100%)',
            }}
        >
            {/* Layered lighting. An emerald bloom top-right and a cool white
                one bottom-left, both far enough out of focus to read as lit air
                rather than as shapes. No blue: that is the hue this palette is
                getting away from. */}
            <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-24 -top-32 -z-10 h-[34rem] w-[34rem] rounded-full bg-[#00C875]/[0.12] blur-[130px]"
            />
            <span
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-40 -left-32 -z-10 h-[30rem] w-[30rem] rounded-full bg-white/[0.045] blur-[140px]"
            />
            <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 opacity-[0.14] [background-image:linear-gradient(to_right,rgba(255,255,255,.16)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.16)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,#000,transparent)]"
            />
            {/* A hairline of brand colour along the top edge, so the band reads
                as a deliberate surface rather than as a hole in the page. */}
            <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00C875]/40 to-transparent"
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
                <div className="grid md:grid-cols-3 gap-12 lg:gap-16">

                    {/* Heading column. Sticky from lg up so it holds its place
                        while the capabilities scroll past. */}
                    <div className="md:col-span-1">
                        <div className="lg:sticky lg:top-28">
                            <p className="eyebrow mb-4 flex items-center gap-3">
                                <span
                                    aria-hidden="true"
                                    className="h-px w-8 flex-none bg-gradient-to-r from-[#00C875]/80 to-transparent"
                                />
                                Why Choose Us
                            </p>

                            <h3 className="section-title text-balance">
                                Expertise That <br /><span className="text-accent">Drives Precision</span>
                            </h3>

                            <span
                                aria-hidden="true"
                                className="mt-8 block h-px w-full max-w-[13rem] bg-gradient-to-r from-white/25 via-white/10 to-transparent"
                            />

                            {/* A drawn crosshair: the section's claim is
                                precision, so the empty half of this column says
                                so instead of sitting blank. Decorative only. */}
                            <svg
                                aria-hidden="true"
                                viewBox="0 0 120 120"
                                className="mt-10 hidden lg:block h-28 w-28 text-white/20"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1"
                            >
                                <circle cx="60" cy="60" r="46" />
                                <circle cx="60" cy="60" r="30" strokeDasharray="4 6" />
                                <circle cx="60" cy="60" r="4" stroke="#00C875" strokeWidth="2" />
                                <path d="M60 2v26M60 92v26M2 60h26M92 60h26" />
                            </svg>
                        </div>
                    </div>

                    {/* Capabilities. */}
                    <div className="md:col-span-2 grid sm:grid-cols-2 gap-4 lg:gap-5">
                        {differentiators.map((d, i) => {
                            const Icon = IconMap[d.icon] || HelpCircle
                            return (
                                <div
                                    key={i}
                                    className="group relative isolate flex h-full gap-5 overflow-hidden rounded-2xl border border-white/[0.07] bg-[#161A22] p-5 lg:p-6 shadow-[0_1px_0_rgba(255,255,255,0.03)_inset,0_18px_40px_-28px_rgba(0,0,0,0.9)] transition-[transform,background-color,border-color,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:border-[#00C875]/35 hover:bg-[#1A1F29] hover:shadow-[0_1px_0_rgba(255,255,255,0.05)_inset,0_26px_54px_-26px_rgba(0,0,0,1)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                                >
                                    {/* Brand strip across the head of the panel,
                                        drawn in on hover. */}
                                    <span
                                        aria-hidden="true"
                                        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00C875]/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 motion-reduce:transition-none"
                                    />

                                    <div className="flex-shrink-0">
                                        <span className="relative inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-[#00C875]/20 via-[#00C875]/[0.06] to-transparent ring-1 ring-inset ring-white/[0.06] transition-[border-color,box-shadow] duration-300 group-hover:border-[#00C875]/50 group-hover:shadow-[0_0_30px_-6px_rgba(0,200,117,0.55)] motion-reduce:transition-none">
                                            <Icon
                                                className="h-7 w-7 text-accent"
                                                strokeWidth={1.75}
                                                aria-hidden="true"
                                            />
                                        </span>
                                    </div>

                                    <div className="min-w-0">
                                        <h4 className="card-title mb-2 text-[1.0625rem] lg:text-lg text-white text-balance">
                                            {d.title}
                                        </h4>
                                        <p className="text-[#A6ADBB] text-[0.9375rem] leading-relaxed text-pretty">
                                            &quot;{d.desc}&quot;
                                        </p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default WhyChooseUs;
