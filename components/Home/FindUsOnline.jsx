import { ArrowRight, MapPin, Star } from 'lucide-react'
import { GoogleMark, JustdialMark } from '@/components/BrandMarks'
import { GMB_URL, JUSTDIAL_URL } from '@/lib/data'

/*
 * "Listed, Reviewed and Reachable" — the third-party listings, under the
 * reviews.
 *
 * Reviews on our own page are our word for it. These two are not: they are
 * places a buyer can check the business exists, has a real address and has a
 * history, on platforms they already trust. That is the whole job of the
 * section, so both cards lead with verification rather than with marketing.
 *
 * Both links open in a new tab and carry rel="noopener". They also appear in
 * the organisation's sameAs (lib/schema.js), which is the signal Google uses to
 * reconcile the website, the Business Profile and the Justdial listing as one
 * entity — worth more for the local pack than most on-page markup.
 *
 * A server component: two static links, nothing to hydrate.
 */

const LISTINGS = [
    {
        name: 'Google Business Profile',
        badge: 'Verified listing',
        desc:
            'Read the reviews customers have left, see the workshop location and get ' +
            'directions to the unit.',
        cta: 'View our Google profile',
        href: GMB_URL,
        Mark: GoogleMark,
        Badge: Star,
    },
    {
        name: 'Justdial',
        badge: 'Listed since 2024',
        desc:
            'Our full service listing, contact details and enquiry history on Justdial, ' +
            'Chennai.',
        cta: 'View our Justdial listing',
        href: JUSTDIAL_URL,
        Mark: JustdialMark,
        Badge: MapPin,
    },
]

export default function FindUsOnline() {
    return (
        <section className="py-16 sm:py-24 bg-white border-t border-line">
            <div className="max-w-5xl mx-auto px-4">
                <div className="text-center">
                    <p className="eyebrow mb-3 inline-flex items-center gap-2.5">
                        <span className="h-px w-6 bg-accent-ink/40" aria-hidden="true" />
                        Find us online
                    </p>
                    <h2 className="section-title text-fg text-balance">
                        Listed, Reviewed{' '}
                        <span className="whitespace-nowrap">
                            and <span className="text-accent">Reachable</span>
                        </span>
                    </h2>
                    <p className="section-lead text-base sm:text-[1.0625rem] mt-4 sm:mt-5 max-w-[52ch] mx-auto">
                        We are a real, verifiable CNC laser cutting unit in Chennai — check us on
                        the platforms you already trust before you send a drawing.
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mt-10 sm:mt-14">
                    {LISTINGS.map(({ name, badge, desc, cta, href, Mark, Badge }) => (
                        <a
                            key={name}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group rounded-[1.25rem] sm:rounded-3xl border border-line bg-white p-6 sm:p-8 flex flex-col hover:border-line-strong hover:shadow-xl transition-all duration-300"
                        >
                            <div className="flex items-start justify-between gap-3">
                                {/*
                                    min-w rather than w: the Google mark is a
                                    square glyph and the Justdial one is a
                                    wordmark, so the box has to grow sideways
                                    for one and stay square for the other.
                                */}
                                <span className="h-11 min-w-11 px-3 rounded-2xl bg-surface-2 border border-line flex items-center justify-center shrink-0">
                                    <Mark />
                                </span>
                                <span className="inline-flex items-center gap-1.5 rounded-full bg-cta/10 px-3 py-1.5 meta-label text-accent">
                                    <Badge className="w-3 h-3" aria-hidden="true" />
                                    {badge}
                                </span>
                            </div>

                            <h3 className="card-title text-fg mt-6">{name}</h3>
                            <p className="text-sm sm:text-[0.9375rem] text-fg-muted mt-2 leading-relaxed flex-1">
                                {desc}
                            </p>

                            {/*
                                An underline that is part of the link rather than a
                                border on the card: the whole card is the anchor, so
                                this is the bit that has to look pressable.
                            */}
                            <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-accent border-b-2 border-accent-ink/25 pb-1.5 self-start group-hover:gap-3 group-hover:border-accent-ink/60 transition-all">
                                {cta}
                                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                            </span>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    )
}
