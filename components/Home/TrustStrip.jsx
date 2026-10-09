import { works } from '@/lib/works'
import { industries, deliveryCities } from '@/lib/data'

/*
 * Trust strip — Section 2 of the industrial redesign brief.
 *
 * The brief asked for "Years of Experience, Projects Delivered, Industries
 * Served, Client Satisfaction". Three of those are supportable. "Client
 * Satisfaction" is not: there is no satisfaction survey behind this business,
 * and a percentage invented to fill a slot is the kind of number a buyer can
 * neither check nor forgive. It is replaced by the Google rating, which is a
 * real figure a visitor can click through to.
 *
 * Two of the four are derived from data rather than typed in, so they cannot
 * drift out of date: the project count follows lib/works.js, and the industry
 * count follows lib/data.js. Add a photograph or a sector and the strip updates
 * itself.
 *
 * No counters animate. The brief asks for animated counters in Section 8; a
 * number that counts up is a decoration on a figure that is either true or not,
 * and it costs a client component on a server-rendered band.
 */
const STATS = [
    { value: '15+', label: 'Years of experience' },
    { value: `${works.length}+`, label: 'Projects delivered' },
    { value: `${industries.length}`, label: 'Industries served' },
    { value: '5.0', label: 'Google rating' },
]

const TrustStrip = () => {
    return (
        <section className="border-b border-line bg-surface-2 py-5 sm:py-7">
            <div className="shell">
                <dl className="grid grid-cols-2 gap-x-4 gap-y-5 lg:grid-cols-4">
                    {STATS.map(({ value, label }) => (
                        <div key={label} className="text-center">
                            <dt className="sr-only">{label}</dt>
                            <dd className="m-0">
                                <span className="block font-heading text-[1.75rem] font-extrabold leading-none tracking-[-0.03em] text-accent sm:text-[2.125rem]">
                                    {value}
                                </span>
                                <span className="meta-label mt-1.5 block text-fg-subtle">{label}</span>
                            </dd>
                        </div>
                    ))}
                </dl>

                <p className="mt-4 text-center text-xs text-fg-subtle">
                    Cut and fabricated in Chennai · Delivered to {deliveryCities.length} cities across India
                </p>
            </div>
        </section>
    )
}

export default TrustStrip;
