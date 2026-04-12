import { ImageResponse } from 'next/og'

export const runtime = 'nodejs'

export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const title = searchParams.get('title') || 'RG Tech Engineering'
    const sub   = searchParams.get('sub')   || 'CNC Fiber Laser Cutting Specialist — Chennai'

    return new ImageResponse(
        (
            <div
                style={{
                    width: '1200px',
                    height: '630px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-end',
                    padding: '80px 80px 72px 96px',
                    background: 'linear-gradient(135deg, #1C3D5A 0%, #0d2236 100%)',
                    position: 'relative',
                    fontFamily: 'sans-serif',
                }}
            >
                {/* Left accent bar */}
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '10px',
                        height: '100%',
                        background: '#E85A4F',
                    }}
                />

                {/* Top-right decorative circle */}
                <div
                    style={{
                        position: 'absolute',
                        top: '-80px',
                        right: '-80px',
                        width: '400px',
                        height: '400px',
                        borderRadius: '50%',
                        background: 'rgba(232, 90, 79, 0.08)',
                    }}
                />

                {/* Brand label */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '36px',
                        color: '#E85A4F',
                        fontSize: '16px',
                        fontWeight: 700,
                        letterSpacing: '0.25em',
                        textTransform: 'uppercase',
                    }}
                >
                    RG TECH ENGINEERING WORKS
                </div>

                {/* Page title */}
                <div
                    style={{
                        fontSize: title.length > 40 ? '52px' : '64px',
                        fontWeight: 900,
                        color: '#ffffff',
                        lineHeight: 1.1,
                        maxWidth: '960px',
                        marginBottom: '28px',
                    }}
                >
                    {title}
                </div>

                {/* Subtitle */}
                <div
                    style={{
                        fontSize: '26px',
                        color: '#94a3b8',
                        fontWeight: 500,
                        maxWidth: '800px',
                    }}
                >
                    {sub}
                </div>

                {/* Bottom domain */}
                <div
                    style={{
                        position: 'absolute',
                        bottom: '40px',
                        right: '80px',
                        fontSize: '18px',
                        color: '#475569',
                        fontWeight: 600,
                        letterSpacing: '0.05em',
                    }}
                >
                    rgtechengineeringworks.com
                </div>
            </div>
        ),
        { width: 1200, height: 630 }
    )
}
