import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ClubEntry {
    name: string;
    highlights: { year: string; role: string; projects?: string }[];
}

const clubs: ClubEntry[] = [
    {
        name: 'Green Circle — Royal College',
        highlights: [
            { year: '2022', role: 'Chairman / President', projects: 'ENVIRA\'22, Endanger, Mystic Leaves, Oceans\'22, Vortex\'22, Ecoiz' },
            { year: '2021', role: 'Assistant Chairman', projects: 'Vortex\'21, Our Oceans Our Future, Testudo\'21, Greener Mile, Endanger\'21' },
            { year: '2016–2020', role: 'Member' },
        ],
    },
    {
        name: 'Radio Club — Royal College',
        highlights: [
            { year: '2022', role: 'Secretary', projects: 'Paramount' },
            { year: '2021', role: 'Treasurer', projects: 'Technobot\'21, Frequencia, Electro, Zyclone' },
        ],
    },
    {
        name: 'Art Circle — Royal College',
        highlights: [{ year: '2022', role: 'Senior Board Member' }],
    },
    {
        name: 'Technologies Club — Royal College',
        highlights: [
            { year: '2020', role: 'Assistant Secretary', projects: 'Outbreak' },
            { year: '2018–2019', role: 'Member' },
        ],
    },
    {
        name: 'IEEE Student Branch — IIT',
        highlights: [{ year: '2024–Present', role: 'Member' }],
    },
    {
        name: 'IEEE WIE — IIT',
        highlights: [{ year: '2024–Present', role: 'Member' }],
    },
    {
        name: 'Computer Society — IIT',
        highlights: [{ year: '2024–Present', role: 'Member' }],
    },
    {
        name: 'Computer Society — Royal College',
        highlights: [{ year: '2017', role: 'Member' }],
    },
    {
        name: 'Young Inventors Club — Royal College',
        highlights: [{ year: '2017', role: 'Member' }],
    },
    {
        name: 'Globe Family — Royal College',
        highlights: [{ year: '2016–2017', role: 'Member' }],
    },
    {
        name: 'History Club — Royal College',
        highlights: [{ year: '2016–2017', role: 'Member' }],
    },
];

export default function Clubs() {
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.club-card', { y: 30, opacity: 0 }, {
                y: 0, opacity: 1, duration: .8, stagger: .1, ease: 'power3.out',
                scrollTrigger: { trigger: ref.current, start: 'top 75%' }
            });
        }, ref);
        return () => ctx.revert();
    }, []);

    // Separate leadership clubs from membership-only
    const leadershipClubs = clubs.filter(c => c.highlights.some(h => h.role !== 'Member'));
    const memberClubs = clubs.filter(c => c.highlights.every(h => h.role === 'Member'));

    return (
        <section className="section" id="clubs" ref={ref}>
            <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%', padding: '0 var(--pad-x)' }}>
                <div className="section-label">
                    <div className="section-label-line" />
                    <h2>Clubs &amp; Societies</h2>
                </div>

                {/* Club Activities banner */}
                <div className="club-card" style={{
                    width: '100%',
                    height: 220,
                    borderRadius: 24,
                    overflow: 'hidden',
                    marginBottom: '2rem',
                    position: 'relative',
                }}>
                    <img src="/demo-club.png" alt="Club Activities" style={{
                        width: '100%', height: '100%', objectFit: 'cover', display: 'block',
                    }} />
                    <div style={{
                        position: 'absolute', bottom: 0, left: 0, right: 0,
                        padding: '1.5rem 2rem',
                        background: 'linear-gradient(transparent, rgba(0,0,0,0.75))',
                    }}>
                        <p style={{ color: '#fff', fontSize: '1.125rem', fontWeight: 700 }}>Active in 11+ Clubs &amp; Societies</p>
                        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '.8125rem' }}>Chairman, Secretary, Treasurer — Progressive leadership across Royal College & IIT</p>
                    </div>
                </div>

                {/* Leadership Clubs */}
                <p style={{ fontSize: '.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '.75rem' }}>Leadership Roles</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
                    {leadershipClubs.map((c, i) => (
                        <div key={i} className="club-card card">
                            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '.75rem' }}>{c.name}</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
                                {c.highlights.map((h, j) => (
                                    <div key={j} style={{ borderLeft: `2px solid ${h.role !== 'Member' ? 'var(--accent-fire)' : 'var(--border)'}`, paddingLeft: '.75rem' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span style={{ fontSize: '.875rem', fontWeight: 600 }}>{h.role}</span>
                                            <span style={{ fontSize: '.75rem', color: 'var(--text-muted)', fontWeight: 500 }}>{h.year}</span>
                                        </div>
                                        {h.projects && (
                                            <p style={{ fontSize: '.8125rem', color: 'var(--text-muted)', marginTop: '.2rem', lineHeight: 1.5 }}>
                                                Projects: {h.projects}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Membership */}
                <p style={{ fontSize: '.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '.75rem' }}>Memberships</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.75rem' }}>
                    {memberClubs.map((c, i) => (
                        <div key={i} className="club-card card" style={{ padding: '1rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '.2rem' }}>
                            <span style={{ fontSize: '.9375rem', fontWeight: 600 }}>{c.name}</span>
                            <span style={{ fontSize: '.8125rem', color: 'var(--text-muted)' }}>{c.highlights.map(h => h.year).join(', ')}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
