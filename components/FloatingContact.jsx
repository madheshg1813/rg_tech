/*
 * Persistent contact affordances, ported from the Sree E-Waste site.
 *
 * Two pieces that swap over at 760px:
 *
 *   Desktop  a floating WhatsApp pill, bottom-right. White so the label stays
 *            readable over any section, with the badge in WhatsApp's own green
 *            — the one place on the site that green is not RG Tech's.
 *   Mobile   a sticky two-action bar at the bottom of the viewport: Call and
 *            WhatsApp, both immediate. The pill collapses to just its badge and
 *            lifts clear of that bar.
 *
 * Deliberately not a third "Get a Quote" action: that only navigates to a form,
 * which is a thing to fill in rather than a way to reach someone, and it would
 * compete with the two channels that actually get answered.
 *
 * A server component — it is two links and some CSS, so none of it needs to
 * reach the browser as JavaScript.
 */

const PHONE = '+916380736439'
const PHONE_DISPLAY = '63807-36439'
const WA_NUMBER = '916380736439'
const WA_MESSAGE =
    'Hi RG Tech, I have a laser cutting / fabrication requirement. Here are the details:'

const WA_HREF = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MESSAGE)}`

/** Official WhatsApp glyph. */
const WhatsAppGlyph = (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
)

const PhoneGlyph = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
)

export default function FloatingContact() {
    return (
        <>
            {/* Desktop float. The label leads with what the customer gets back,
                not with the channel — "Send your drawing" is a smaller ask than
                "Chat with us", and it says what to send. */}
            <a
                className="wa"
                href={WA_HREF}
                target="_blank"
                rel="noopener"
                aria-label="Send your drawing to RG Tech Engineering on WhatsApp"
                data-analytics="whatsapp-float"
            >
                <span className="wa-ic">
                    <WhatsAppGlyph />
                </span>
                <span className="wa-tx">
                    <b>Send your drawing</b>
                    <span>Quote in 24 hours</span>
                </span>
            </a>

            {/* Mobile action bar. */}
            <div className="mcall">
                <a className="btn btn-primary" href={`tel:${PHONE}`} data-analytics="call-bar">
                    <PhoneGlyph /> Call {PHONE_DISPLAY}
                </a>
                <a
                    className="mcall-wa"
                    href={WA_HREF}
                    target="_blank"
                    rel="noopener"
                    aria-label="Chat with RG Tech Engineering on WhatsApp"
                    data-analytics="whatsapp-bar"
                >
                    <WhatsAppGlyph width="21" height="21" />
                    <span>WhatsApp</span>
                </a>
            </div>
        </>
    )
}
