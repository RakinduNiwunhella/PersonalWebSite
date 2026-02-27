import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skillGroups = [
    { label: 'Languages', items: ['Python', 'Java', 'JavaScript', 'C#'] },
    { label: 'Frameworks', items: ['React', 'Spring Boot', 'FastAPI'] },
    { label: 'DevOps & Cloud', items: ['Docker', 'AWS EC2', 'AWS S3', 'GitHub'] },
    { label: 'Databases', items: ['PostgreSQL', 'PostGIS', 'Neon'] },
    { label: 'AI / ML', items: ['NLP', 'Machine Learning', 'LSTM', 'Random Forest'] },
    { label: 'Tools', items: ['Linux', 'Jira', 'Git', 'OOP'] },
];

export default function Skills() {
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
        gsap.fromTo('.skill-group',
            { y: 30, opacity: 0 },
            {
                y: 0, opacity: 1, duration: .7, stagger: .1, ease: 'power3.out',
                scrollTrigger: { trigger: ref.current, start: 'top 75%' }
            }
        );
    }, []);

    return (
        <section className="section" id="skills" ref={ref}>
            <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%', padding: '0 4rem' }}>
                <div className="section-label">
                    <div className="section-label-line" />
                    <h2>Technical Skills</h2>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
                    {skillGroups.map((g, i) => (
                        <div key={i} className="skill-group card">
                            <h3 style={{ fontSize: '.8125rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.06em', color: 'var(--accent)', marginBottom: '1rem' }}>
                                {g.label}
                            </h3>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.5rem' }}>
                                {g.items.map(s => (
                                    <span key={s} className="tag">{s}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
