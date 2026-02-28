import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const roles = [
    { role: 'Advisory Member', org: 'Air Rifle Shooting Advisory & Management Committee, Royal College Union', year: '2025 – Present' },
    { role: 'Senior Prefect', org: 'Royal College', year: '2023/24', img: '/demo-prefect.png' },
    { role: 'Senior Steward', org: 'Royal College', year: '2022' },
    { role: 'Junior Steward', org: 'Royal College', year: '2021' },
    { role: 'Junior Prefect', org: 'Royal College', year: '2020' },
    { role: 'Primary Prefect', org: 'Royal College', year: '2016' },
    { role: 'Team Captain — U21 Air Rifle Shooting', org: 'Royal College', year: '2021', img: '/demo-shooting.png' },
    { role: 'Club Chairman', org: 'Green Circle, Royal College', year: '2022', img: '/demo-club.png' },
    { role: 'Club Secretary', org: 'Radio Club, Royal College', year: '2022' },
    { role: 'Club Treasurer', org: 'Radio Club, Royal College', year: '2021' },
    { role: 'Assistant Chairman', org: 'Green Circle, Royal College', year: '2021' },
    { role: 'Senior Board Member', org: 'Art Circle, Royal College', year: '2022' },
    { role: 'Assistant Secretary', org: 'Technologies Club, Royal College', year: '2020' },
];

function ImageCard({ src, alt }: { src: string; alt: string }) {
    return (
        <div style={{
            width: '100%',
            height: 200,
            borderRadius: 16,
            overflow: 'hidden',
            marginBottom: '1rem',
        }}>
            <img src={src} alt={alt} style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
            }} />
        </div>
    );
}

export default function Leadership() {
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.lead-row', { x: -30, opacity: 0 }, {
                x: 0, opacity: 1, duration: .7, stagger: .08, ease: 'power3.out',
                scrollTrigger: { trigger: ref.current, start: 'top 75%' }
            });
        }, ref);
        return () => ctx.revert();
    }, []);

    const institutional = roles.filter(r => ['Senior Prefect', 'Senior Steward', 'Junior Steward', 'Junior Prefect', 'Primary Prefect', 'Advisory Member'].includes(r.role));
    const sports = roles.filter(r => r.role.includes('Captain'));
    const clubLeadership = roles.filter(r => ['Club Chairman', 'Club Secretary', 'Club Treasurer', 'Assistant Chairman', 'Senior Board Member', 'Assistant Secretary'].includes(r.role));

    const renderRow = (r: typeof roles[0], i: number) => (
        <div key={i} className="lead-row card">
            {r.img && <ImageCard src={r.img} alt={r.role} />}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <div>
                    <h3 style={{ fontSize: '1.0625rem', fontWeight: 600, marginBottom: '.2rem' }}>{r.role}</h3>
                    <p style={{ fontSize: '.9375rem', color: 'var(--text-muted)' }}>{r.org}</p>
                </div>
                <span className="tag" style={{ whiteSpace: 'nowrap' }}>{r.year}</span>
            </div>
        </div>
    );

    return (
        <section className="section" id="leadership" ref={ref}>
            <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%', padding: '0 var(--pad-x)' }}>
                <div className="section-label">
                    <div className="section-label-line" />
                    <h2>Leadership</h2>
                </div>

                {/* Institutional */}
                <p style={{ fontSize: '.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '.75rem' }}>Institutional Leadership</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                    {institutional.map(renderRow)}
                </div>

                {/* Sports Captaincy */}
                <p style={{ fontSize: '.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent-fire)', marginBottom: '.75rem' }}>Sports Captaincy</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                    {sports.map(renderRow)}
                </div>

                {/* Club Leadership */}
                <p style={{ fontSize: '.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '.75rem' }}>Club & Society Leadership</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem' }}>
                    {clubLeadership.map(renderRow)}
                </div>
            </div>
        </section>
    );
}
