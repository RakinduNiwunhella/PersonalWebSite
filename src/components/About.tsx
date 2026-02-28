import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
        gsap.fromTo('.about-content',
            { y: 40, opacity: 0 },
            {
                y: 0, opacity: 1, duration: 1, ease: 'power3.out',
                scrollTrigger: { trigger: ref.current, start: 'top 75%' }
            }
        );
    }, []);

    return (
        <section className="section" id="about" ref={ref}>
            <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%', padding: '0 var(--pad-x)' }}>
                <div className="section-label">
                    <div className="section-label-line" />
                    <h2>Professional Summary</h2>
                </div>
                <div className="about-content card" style={{ maxWidth: 800 }}>
                    <p style={{ fontSize: '1.125rem', lineHeight: 1.85, color: 'var(--text)', marginBottom: '1.5rem' }}>
                        Undergraduate Computer Science student at the <strong>Informatics Institute of Technology (IIT)</strong>, affiliated with the <strong>University of Westminster, UK</strong> — with a solid foundation in AI, machine learning, and software development.
                    </p>
                    <p style={{ fontSize: '1.125rem', lineHeight: 1.85, color: 'var(--text-muted)' }}>
                        Dedicated to exploring intelligent systems and data-driven innovation. Strong leadership and discipline demonstrated through securing a position as <strong>Senior Prefect</strong> and serving as <strong>Captain of the Royal College Rifle Shooting Team</strong>.
                    </p>
                </div>
            </div>
        </section>
    );
}
