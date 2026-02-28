import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const certs = [
    { name: 'Supervised Machine Learning: Regression & Classification', issuer: 'Stanford University / Coursera' },
    { name: 'Building with Llama 4', issuer: 'DeepLearning.AI / Coursera' },
    { name: 'AI For Everyone', issuer: 'DeepLearning.AI / Coursera' },
    { name: 'Foundations of Cybersecurity', issuer: 'Google / Coursera' },
    { name: 'Java Essential Training: Syntax & Structure', issuer: 'JetBrains / LinkedIn Learning' },
    { name: 'Learning Python', issuer: 'LinkedIn Learning' },
];

export default function Certificates() {
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
        gsap.fromTo('.cert-row',
            { y: 20, opacity: 0 },
            {
                y: 0, opacity: 1, duration: .6, stagger: .1, ease: 'power3.out',
                scrollTrigger: { trigger: ref.current, start: 'top 75%' }
            }
        );
    }, []);

    return (
        <section className="section" id="certificates" ref={ref}>
            <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%', padding: '0 var(--pad-x)' }}>
                <div className="section-label">
                    <div className="section-label-line" />
                    <h2>Certificates</h2>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
                    {certs.map((c, i) => (
                        <div key={i} className="cert-row card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem' }}>
                            <div>
                                <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '.2rem' }}>{c.name}</h3>
                                <p style={{ fontSize: '.875rem', color: 'var(--text-muted)' }}>{c.issuer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
