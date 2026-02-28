import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, ChevronUp } from 'lucide-react';

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
        <div style={{ width: '100%', height: 200, borderRadius: 16, overflow: 'hidden', marginBottom: '1rem' }}>
            <img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        </div>
    );
}

// A collapsible group used on mobile
function CollapsibleGroup({
    label, accentColor, items, renderRow, defaultOpen = false,
}: {
    label: string;
    accentColor: string;
    items: typeof roles;
    renderRow: (r: typeof roles[0], i: number) => React.ReactNode;
    defaultOpen?: boolean;
}) {
    const [open, setOpen] = useState(defaultOpen);
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

    if (!isMobile) {
        // On desktop render flat, no toggle
        return (
            <>
                <p style={{ fontSize: '.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: accentColor, marginBottom: '.75rem' }}>{label}</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                    {items.map(renderRow)}
                </div>
            </>
        );
    }

    return (
        <div style={{ marginBottom: '1rem' }}>
            {/* Accordion header */}
            <button
                onClick={() => setOpen(v => !v)}
                style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '.875rem 1rem',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    borderRadius: open ? '12px 12px 0 0' : 12,
                    cursor: 'pointer',
                    fontFamily: 'var(--font)',
                    transition: 'border-radius .2s',
                }}
            >
                <span style={{ fontSize: '.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: accentColor }}>
                    {label}
                </span>
                <span style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}>
                    {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    <span style={{ fontSize: '.75rem', marginLeft: '.375rem', color: 'var(--text-muted)' }}>
                        {items.length} items
                    </span>
                </span>
            </button>

            {/* Expandable content */}
            {open && (
                <div style={{
                    border: '1px solid var(--border)',
                    borderTop: 'none',
                    borderRadius: '0 0 12px 12px',
                    padding: '.75rem',
                    background: 'var(--bg)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '.75rem',
                }}>
                    {items.map(renderRow)}
                </div>
            )}
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

                <CollapsibleGroup label="Institutional Leadership" accentColor="var(--accent)" items={institutional} renderRow={renderRow} defaultOpen={true} />
                <CollapsibleGroup label="Sports Captaincy" accentColor="var(--accent-fire)" items={sports} renderRow={renderRow} defaultOpen={true} />
                <CollapsibleGroup label="Club & Society Leadership" accentColor="var(--accent)" items={clubLeadership} renderRow={renderRow} />
            </div>
        </section>
    );
}
