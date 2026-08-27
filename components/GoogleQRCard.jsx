import Image from 'next/image'
import { Star, ExternalLink } from 'lucide-react'
import { GMB_URL, GMB_REVIEW_URL } from '@/lib/data'
import GoogleRating from '@/components/GoogleRating'

/*
 * The Google Business Profile QR, cut out of the sheet Google issued.
 *
 * The code encodes:
 *   https://local.google.com/place?placeid=ChIJG19k-TRhUjoRi4KEeB11SGE&utm_medium=noren&utm_source=gbp&utm_campaign=2026
 * — the same place id as GMB_PLACE_ID in lib/data.js, verified by decoding the
 * PNG that ships in public/. Note it opens the profile; it is not a
 * write-a-review deep link, which is why the review CTA next to it uses
 * GMB_REVIEW_URL instead.
 *
 * ---------------------------------------------------------------------------
 * On putting a QR on a web page at all.
 *
 * A QR is worth having here but it is NOT the primary action, because the
 * person most likely to be reading this is already holding the phone that would
 * have to scan it. So:
 *
 *   - Desktop  the code is useful — scan it with a phone and carry the listing
 *              away with you. Shown at a scannable size.
 *   - Mobile   the code is hidden outright and the buttons take over. Nobody
 *              scans their own screen.
 *
 * The buttons carry the same destination as the code, so nothing is reachable
 * only by scanning.
 * ---------------------------------------------------------------------------
 */

export default function GoogleQRCard({ className = '' }) {
    return (
        <div className={`framed-soft bg-white p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 sm:gap-8 ${className}`}>
            {/* sm:block, not a responsive size: at phone width this is furniture
                the reader cannot use, so it is removed rather than shrunk. */}
            <div className="hidden sm:block flex-none">
                <div className="framed-soft bg-white p-2">
                    <Image
                        src="/google-review-qr.png"
                        alt="QR code linking to the RG Tech Engineering Works Google Business Profile"
                        width={1104}
                        height={1104}
                        // unoptimized on purpose. A QR is a bitmap of hard-edged
                        // modules; any resample or lossy re-encode softens those
                        // edges and costs scan reliability. It is also 14 KB, so
                        // there is nothing to gain. This also stops Next emitting
                        // an 11-entry srcset of the same URL.
                        unoptimized
                        className="w-[152px] h-[152px]"
                    />
                </div>
            </div>

            <div className="flex-1 min-w-0 text-center sm:text-left">
                <p className="eyebrow mb-2">Verified on Google</p>
                <h3 className="card-title text-fg mb-2">
                    Scan to see our work, hours and reviews
                </h3>
                <p className="text-sm text-fg-muted leading-relaxed mb-5">
                    <span className="hidden sm:inline">
                        Point your phone camera at the code, or use the links below.
                    </span>
                    <span className="sm:hidden">
                        Open our Google Business Profile for photos of recent jobs,
                        opening hours and directions.
                    </span>
                </p>

                <div className="flex flex-col sm:flex-row flex-wrap items-center gap-3">
                    <a
                        href={GMB_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary w-full sm:w-auto"
                        data-analytics="gmb-profile"
                    >
                        View on Google <ExternalLink className="w-4 h-4" />
                    </a>
                    <a
                        href={GMB_REVIEW_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-secondary-light w-full sm:w-auto"
                        data-analytics="gmb-review"
                    >
                        <Star className="w-4 h-4" /> Leave a review
                    </a>
                </div>

                <div className="mt-5 pt-5 border-t border-line flex justify-center sm:justify-start">
                    <GoogleRating />
                </div>
            </div>
        </div>
    )
}
