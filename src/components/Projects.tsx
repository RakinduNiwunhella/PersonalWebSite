import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
    { num: '01', title: 'Rice-Vision', year: '2026', stack: 'FastAPI · React · GEE · LSTM · AWS', desc: 'Satellite-driven rice monitoring platform with NDVI/SAR analytics and Random Forest yield prediction.' },
    { num: '02', title: 'University Enrollment Manager', year: '2026', stack: 'Spring Boot · React · Docker · Neon', desc: 'Scalable web-based enrollment system with containerised Docker deployment.' },
    { num: '03', title: 'NLP Powered To-Do List', year: '2025', stack: 'React · Chrono.js · OpenWeatherMap API', desc: 'Smart task app with natural language date parsing and real-time weather integration.' },
    { num: '04', title: 'Climate Action Platform', year: '2025', stack: 'HTML · CSS · JS', desc: 'Responsive platform with interactive data visualizations for climate awareness.' },
    { num: '05', title: 'Traffic Data Simulator', year: '2024', stack: 'Python · Tkinter', desc: 'Simulation of traffic flow, congestion, and signal timing with optimization algorithms.' },
    { num: '06', title: 'Student Enrollment System', year: '2021', stack: 'C# · SQL', desc: 'Windows desktop app for streamlined student data management.' },
];

export default function Projects() {
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
        gsap.fromTo('.proj-row',
            { y: 30, opacity: 0 },
            {
                y: 0, opacity: 1, duration: .7, stagger: .1, ease: 'power3.out',
                scrollTrigger: { trigger: ref.current, start: 'top 75%' }
            }
        );
    }, []);

    return (
        <section className="section" id="projects" ref={ref}>
            <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%', padding: '0 4rem' }}>
                <div className="section-label">
                    <div className="section-label-line" />
                    <h2>Projects</h2>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {projects.map((p) => (
                        <div
                            key={p.num}
                            className="proj-row card"
                            style={{ display: 'grid', gridTemplateColumns: '56px 1fr 1fr auto', gap: '2rem', alignItems: 'center', marginBottom: '1rem', transition: 'transform .2s', cursor: 'default' }}
                            onMouseEnter={e => (e.currentTarget.style.transform = 'translateX(6px)')}
                            onMouseLeave={e => (e.currentTarget.style.transform = 'none')}
                        >
                            <span style={{ fontSize: '.875rem', fontWeight: 700, color: 'var(--text-muted)', fontVariantNumeric: 'tabular-nums' }}>{p.num}</span>
                            <div>
                                <h3 style={{ fontSize: '1.0625rem', fontWeight: 600, marginBottom: '.25rem' }}>{p.title}</h3>
                                <p style={{ fontSize: '.8125rem', color: 'var(--accent)', fontWeight: 500 }}>{p.stack}</p>
                            </div>
                            <p style={{ fontSize: '.9375rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{p.desc}</p>
                            <span className="tag">{p.year}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
