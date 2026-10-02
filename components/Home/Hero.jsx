import { Phone, Check, ArrowRight } from 'lucide-react'
import GoogleRating from '@/components/GoogleRating'
import JustdialBadge from '@/components/JustdialBadge'

/*
 * Hero — rebuilt to the playbook's fixed hero rules.
 *
 * What the playbook fixes, and what changed to meet it:
 *
 *   white ground, no tint or glow   the hero-gradient and its indigo/green
 *                                   radial washes are gone; the only texture is
 *                                   a faint neutral grid, radially masked
 *   no badge above the H1           the mono "CNC Fiber Laser Specialist" stamp
 *                                   is removed — the headline starts the page
 *   headline <= 7 words             was nine ("Your Trusted Partner for ...")
 *   one accent word only            "Precision" carries it; the headline
 *                                   previously ran three accented words
 *
 * The headline states the service plainly rather than leading with the
 * customer's problem, which is a deliberate departure from the playbook's
 * preference for a pain-point hero: asked for simple and professional, and for
 * an industrial supplier a buyer is scanning for capability, not a hook.
 *   home hero centred, no image     the framed photograph and its spec card are
 *                                   gone, so the fold is headline -> CTA -> proof
 *   buttons side by side on phones  they stacked full-width before, which is the
 *                                   single thing the playbook calls out twice
 *   exactly three trust ticks       was four, in a wrapping inline list
 *
 * The photograph is not lost — OurWorks runs directly below this section and is
 * where the machine and the cut parts now live.
 */

// Three, not four: the playbook caps the tick row at three so it reads as a
// claim strip rather than a spec table. Each one is verifiable from the
// capability data on the service pages.
const TICKS = [
    '0.01mm precision',
    'Up to 45mm thick',
    'All metal types',
]

const Hero = () => {
    return (
        <section
            id="home"
            className="section relative overflow-hidden border-b border-line bg-surface py-14 md:"
        >
            <div className="grid-backdrop" aria-hidden="true" />

            <div className="shell relative z-10">
                <div className="mx-auto max-w-3xl text-center">
                    {/* h2, not h1: components/Header.jsx renders the brand lockup
                        as the page's h1 on every route. The playbook calls this
                        slot the H1 and the site should follow, but that is a
                        heading-structure change across 1,400 pages, not a
                        restyle, so it stays as it was. */}
                    <h2 className="display-title text-fg text-balance">
                        <span className="text-accent">Precision</span>{' '}
                        CNC Laser Cutting &amp; Fabrication
                    </h2>

                    <p className="section-lead mt-6 mx-auto max-w-[52ch]">
                        High-precision metal cutting up to 45mm — MS, SS, Aluminium, Copper
                        and Brass, cut at our Chennai unit and delivered on the date we gave you.
                    </p>

                    {/* One row at every width. The playbook is explicit that the
                        pair never stacks and never goes full-width on phones, so
                        the call button sheds the number below 640px rather than
                        wrapping the pair onto two lines — at 390px the full
                        label pushes the two buttons 28px past the gutter. */}
                    <div className="mt-8 flex flex-row flex-nowrap justify-center gap-2.5 sm:gap-3">
                        <a href="#contact" className="btn btn-primary">
                            Get a Quote <ArrowRight className="w-4 h-4" />
                        </a>
                        <a href="tel:+916380736439" className="btn btn-ghost">
                            <Phone className="w-4 h-4" />
                            <span className="hidden sm:inline">Call 63807-36439</span>
                            <span className="sm:hidden">Call Now</span>
                        </a>
                    </div>

                    <ul className="mt-7 flex flex-wrap justify-center gap-x-6 gap-y-2 p-0 list-none">
                        {TICKS.map((item) => (
                            <li key={item} className="tick">
                                <Check aria-hidden="true" />
                                {item}
                            </li>
                        ))}
                    </ul>

                    {/* The playbook puts a proof row under the ticks. Ours is the
                        Google rating: third-party, clickable and checkable, which
                        is the only claim here a visitor can independently verify. */}
                    <div className="mt-9 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 border-t border-line pt-7">
                        <GoogleRating />
                        <JustdialBadge />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero;
