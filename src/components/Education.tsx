import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type EduEntry = {
    degree: string;
    institution: string;
    sub: string;
    year: string;
    marks: [string, string][];
};

const entries: EduEntry[] = [
    {
        degree: 'BSc (Hons) Computer Science',
        institution: 'Informatics Institute of Technology (IIT)',
        sub: 'Affiliated with University of Westminster, UK',
        year: '2024 – Present',
        marks: [],
    },
    {
        degree: 'Professional Certificate in Cyber Security',
        institution: 'PDU Informatics Institute of Technology (IIT)',
        sub: 'Distinction',
        year: '2025',
        marks: [],
    },
    {
        degree: 'GCE A/L – Physical Science Stream',
        institution: 'Royal College',
        sub: 'Maths: C | Physics: B | Chemistry: C',
        year: '2023/24',
        marks: [],
    },
    {
        degree: 'Diploma in IT (DiTEC)',
        institution: 'Esoft Metro Campus',
        sub: 'Awarded by Pearson, UK',
        year: '–',
        marks: [],
    },
    {
        degree: 'GCE O/L — 9 Distinctions',
        institution: 'Royal College',
        sub: 'All 9 subjects: A',
        year: '2019',
        marks: [],
    },
];

export default function Education() {
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
        gsap.fromTo('.edu-entry',
            { y: 40, opacity: 0 },
            {
                y: 0, opacity: 1, duration: .8, stagger: .15, ease: 'power3.out',
                scrollTrigger: { trigger: ref.current, start: 'top 75%' }
            }
        );
    }, []);

    return (
        <section className="section" id="education" ref={ref}>
            <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%', padding: '0 var(--pad-x)' }}>
                <div className="section-label">
                    <div className="section-label-line" />
                    <h2>Education</h2>
                </div>

                <div className="card" style={{ display: 'flex', flexDirection: 'column', padding: '1rem 2rem' }}>
                    {entries.map((e, i) => (
                        <div key={i} className="edu-entry" style={{ padding: '1.5rem 0', borderBottom: i < entries.length - 1 ? '1px solid var(--border)' : 'none' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap', marginBottom: e.marks.length ? '1.5rem' : 0 }}>
                                <div>
                                    <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '.25rem' }}>{e.degree}</h3>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '.9375rem' }}>{e.institution} &mdash; <span style={{ fontStyle: 'italic' }}>{e.sub}</span></p>
                                </div>
                                <span className="tag">{e.year}</span>
                            </div>

                            {e.marks.length > 0 && (
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(170px, 100%), 1fr))', gap: '.5rem 1.5rem' }}>
                                    {e.marks.map(([mod, score]) => (
                                        <div key={mod} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: '.35rem' }}>
                                            <span style={{ fontSize: '.875rem', color: 'var(--text-muted)' }}>{mod}</span>
                                            <span style={{ fontSize: '.875rem', fontWeight: 700, color: (Number(score) >= 90 || score === 'A') ? 'var(--accent)' : 'var(--text)' }}>{score}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
