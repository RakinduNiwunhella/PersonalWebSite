import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Target, Award, Medal } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const teamHistory = [
    { category: 'Under 21 – A Team', years: [{ yr: '2023', role: 'Member' }, { yr: '2022', role: 'Member' }, { yr: '2021', role: 'Captain' }] },
    { category: 'Under 18 – A Team', years: [{ yr: '2020', role: 'Member' }, { yr: '2019', role: 'Member' }, { yr: '2018', role: 'Member' }, { yr: '2017', role: 'Member' }, { yr: '2016', role: 'Member' }] },
    { category: 'Squash – Under 13', years: [{ yr: '2016–17', role: 'Member' }] },
];

const nationalAchievements = [
    { event: 'NSSF Air Gun Championship (Youth)', place: '3rd Place', year: '2019' },
    { event: '5th Navy Open Shooting Championship (Youth)', place: '2nd Place', year: '2018' },
];

const allIsland = [
    { year: '2023', detail: 'Qualified "Sharpshooter" — 10m Air Pistol (U21)' },
    { year: '2022', detail: 'Qualified "Sharpshooter" — SLSSSA (U21)' },
    { year: '2021', detail: 'Qualified "Sharpshooter" (U18)' },
    { year: '2020', detail: 'Qualified "Sharpshooter" (U18)' },
    { year: '2018', detail: 'Qualified "Sharpshooter" (U18)' },
    { year: '2017', detail: '2nd Place — SLSSSA Schools Air Rifle & Pistol Championship (U18)' },
    { year: '2016', detail: '2nd Place — SLSSSA Schools Championship (U18)' },
];

const colours = [
    { type: 'Sri Lanka Schools Colours', years: '2016, 2017, 2018, 2022' },
    { type: 'Royal College Colours', years: '2019, 2022, 2023, 2024' },
];

export default function Sports() {
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.sport-block', { y: 40, opacity: 0 }, {
                y: 0, opacity: 1, duration: .8, stagger: .15, ease: 'power3.out',
                scrollTrigger: { trigger: ref.current, start: 'top 75%' }
            });
        }, ref);
        return () => ctx.revert();
    }, []);

    return (
        <section className="section" id="sports" ref={ref}>
            <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%', padding: '0 4rem' }}>
                <div className="section-label">
                    <div className="section-label-line" />
                    <h2>Shooting &amp; Sports</h2>
                </div>

                {/* Hero image banner */}
                <div className="sport-block" style={{
                    width: '100%',
                    height: 300,
                    borderRadius: 24,
                    overflow: 'hidden',
                    marginBottom: '1.5rem',
                    position: 'relative',
                }}>
                    <img src="/demo-shooting.png" alt="Air Rifle Shooting" style={{
                        width: '100%', height: '100%', objectFit: 'cover', display: 'block',
                    }} />
                    <div style={{
                        position: 'absolute', bottom: 0, left: 0, right: 0,
                        padding: '2rem',
                        background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                    }}>
                        <p style={{ color: '#fff', fontSize: '1.25rem', fontWeight: 700 }}>8+ Years in Competitive Air Rifle Shooting</p>
                        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '.875rem' }}>Royal College Rifle Shooting Team — Captain (2021)</p>
                    </div>
                </div>

                {/* Colours + Team in a 2-col layout */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
                    {/* Colours */}
                    <div className="sport-block card">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem', marginBottom: '1rem' }}>
                            <Award size={22} color="var(--accent)" />
                            <h3 style={{ fontSize: '1.125rem', fontWeight: 700 }}>Colours Awarded</h3>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '.75rem' }}>
                            {colours.map((c, i) => (
                                <div key={i}>
                                    <span style={{ fontSize: '.875rem', fontWeight: 600, color: 'var(--accent-fire)' }}>{c.type}</span>
                                    <p style={{ fontSize: '.875rem', color: 'var(--text-muted)' }}>{c.years}</p>
                                </div>
                            ))}
                        </div>
                        <p style={{ marginTop: '.75rem', fontSize: '.8125rem', color: 'var(--text-muted)', fontStyle: 'italic', borderTop: '1px solid var(--border)', paddingTop: '.75rem' }}>
                            Basic Training: Air Rifle &amp; Air Pistol — A Grade (93%)
                        </p>
                    </div>

                    {/* Team Representation */}
                    <div className="sport-block card">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem', marginBottom: '1rem' }}>
                            <Target size={22} color="var(--accent-fire)" />
                            <h3 style={{ fontSize: '1.125rem', fontWeight: 700 }}>Team Representation</h3>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {teamHistory.map((t, i) => (
                                <div key={i}>
                                    <h4 style={{ fontSize: '.875rem', fontWeight: 600, marginBottom: '.4rem', color: 'var(--text)' }}>{t.category}</h4>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.4rem' }}>
                                        {t.years.map((y, j) => (
                                            <span key={j} className="tag" style={{
                                                background: y.role === 'Captain' ? 'var(--accent-fire)' : undefined,
                                                color: y.role === 'Captain' ? '#fff' : undefined,
                                                fontSize: '.75rem',
                                            }}>
                                                {y.yr} — {y.role}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* All-Island + National */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
                    <div className="sport-block card">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem', marginBottom: '1rem' }}>
                            <Target size={20} color="var(--accent)" />
                            <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>All-Island (SLSSSA)</h3>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '.4rem' }}>
                            {allIsland.map((a, i) => (
                                <div key={i} style={{ display: 'flex', gap: '.75rem', alignItems: 'baseline' }}>
                                    <span style={{ fontSize: '.8125rem', fontWeight: 700, color: 'var(--accent)', minWidth: 36 }}>{a.year}</span>
                                    <span style={{ fontSize: '.8125rem', color: 'var(--text-muted)' }}>{a.detail}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="sport-block card">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem', marginBottom: '1rem' }}>
                            <Medal size={20} color="var(--accent-fire)" />
                            <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>National (Open Category)</h3>
                        </div>
                        {/* Trophy image */}
                        <div style={{ borderRadius: 12, overflow: 'hidden', marginBottom: '1rem', height: 140 }}>
                            <img src="/demo-trophy.png" alt="Trophies" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '.75rem' }}>
                            {nationalAchievements.map((n, i) => (
                                <div key={i}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '.15rem' }}>
                                        <span style={{ fontSize: '.9375rem', fontWeight: 600 }}>{n.place}</span>
                                        <span className="tag">{n.year}</span>
                                    </div>
                                    <p style={{ fontSize: '.8125rem', color: 'var(--text-muted)' }}>{n.event}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
