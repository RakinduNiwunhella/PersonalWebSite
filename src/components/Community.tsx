import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Community() {
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
        gsap.fromTo('.comm-card',
            { y: 30, opacity: 0 },
            {
                y: 0, opacity: 1, duration: .8, stagger: .15, ease: 'power3.out',
                scrollTrigger: { trigger: ref.current, start: 'top 75%' }
            }
        );
    }, []);

    return (
        <section className="section" id="community" ref={ref}>
            <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%', padding: '0 var(--pad-x)' }}>
                <div className="section-label">
                    <div className="section-label-line" />
                    <h2>Community &amp; Networking</h2>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
                    <div className="comm-card card">
                        <h3 style={{ fontSize: '1.0625rem', fontWeight: 600, marginBottom: '.5rem' }}>Tech Meetups</h3>
                        <p style={{ color: 'var(--text-muted)', lineHeight: 1.65 }}>Attending regional AI/ML and software engineering symposiums to keep current with industry trends and connect with professionals.</p>
                    </div>
                    <div className="comm-card card">
                        <h3 style={{ fontSize: '1.0625rem', fontWeight: 600, marginBottom: '.5rem' }}>Company Visits</h3>
                        <p style={{ color: 'var(--text-muted)', lineHeight: 1.65 }}>Engaging with leading tech companies in Sri Lanka to understand agile enterprise environments and build professional relationships.</p>
                    </div>
                    <div className="comm-card card">
                        <h3 style={{ fontSize: '1.0625rem', fontWeight: 600, marginBottom: '.5rem' }}>Competitions &amp; Events</h3>
                        <p style={{ color: 'var(--text-muted)', lineHeight: 1.65 }}>Participating in IEEE Xtreme, local hackathons, and inter-university events fostering collaboration and technical growth.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
