import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
        gsap.fromTo('.hero-text-anim',
            { y: 50, opacity: 0, scale: 0.95 },
            { y: 0, opacity: 1, scale: 1, duration: 1.2, stagger: 0.15, ease: 'power3.out', delay: 0.2 }
        );
    }, []);

    return (
        <section id="home" ref={ref} className="hero-section">
            <div className="hero-content">

                {/* Text Content */}
                <div style={{ flex: 1, minWidth: 300 }}>
                    <h1 className="apple-text hero-text-anim" style={{ marginBottom: '1.5rem', color: 'var(--text)', textAlign: 'left' }}>
                        Rakindu Niwunhella.
                    </h1>
                    <h2 className="apple-text hero-text-anim" style={{ color: 'var(--text-muted)', marginBottom: '3rem', textAlign: 'left', fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
                        Code. Precision. Impact.
                    </h2>
                    <p className="apple-sub hero-text-anim" style={{ textAlign: 'left', margin: 0 }}>
                        CS Undergrad at IIT &amp; Westminster UK. <br />
                        Building AI-driven applications and competing at the national level in Rifle &amp; Air Pistol shooting.
                    </p>
                </div>

                {/* Profile Picture */}
                <div className="hero-text-anim" style={{
                    flex: '0 1 400px',
                    display: 'flex',
                    justifyContent: 'center',
                    position: 'relative'
                }}>
                    <div style={{
                        position: 'relative',
                        width: '100%',
                        aspectRatio: '3/4',
                        borderRadius: 24,
                        overflow: 'hidden',
                        background: 'transparent'
                    }}>
                        <img
                            src="/profile.jpg"
                            alt="Rakindu Niwunhella"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                objectPosition: 'center top'
                            }}
                        />
                        {/* Gradient mask to seamlessly blend the bottom edge into the background */}
                        <div style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            height: '50%',
                            background: 'linear-gradient(to top, var(--bg) 0%, transparent 100%)',
                            pointerEvents: 'none'
                        }} />
                    </div>
                </div>

            </div>

            <div className="hero-text-anim" style={{ position: 'absolute', bottom: '5%', left: '50%', transform: 'translateX(-50%)', opacity: 0.5 }}>
                <p style={{ fontSize: '0.875rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem', textAlign: 'center' }}>Scroll to experience</p>
                <div style={{ width: 1, height: 40, background: 'var(--text)', margin: '0 auto' }}></div>
            </div>
        </section>
    );
}
