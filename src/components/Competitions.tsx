import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Trophy, ChevronDown, ChevronUp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const comps = [
    { title: 'Sherlock 3.0 — Winner', org: 'IEEE WIE – IIT', year: '2026', desc: 'Won hybrid problem-solving competition demonstrating analytical thinking and teamwork.' },
    { title: 'Aftermath: Checkpoint Hunters — Winner', org: 'IEEE Student Branch – IIT', year: '2025', desc: 'Won the technical survival challenge in a high-pressure competitive setting.' },
    { title: 'OctWave 2.0 – AI/ML Initiative', org: 'IEEE IAS SB – University of Moratuwa', year: '2025', desc: 'Participated in cross-university AI/ML collaborative program.' },
    { title: 'IEEE Xtreme Programming Competition', org: 'IEEE', year: '2025', desc: '24-hour global competitive programming challenge.' },
    { title: 'CodeRally 6.0 – 24h Hackathon', org: 'IEEE Computer Society – IIT', year: '2025', desc: 'Intermediate tier; continuous 24-hour coding marathon.' },
    { title: '2nd Place — SLSSSA Air Rifle & Pistol Championship (U18)', org: 'SLSSSA', year: '2017', desc: 'Silver medal at the All-Island Sri Lanka Schools Air Rifle & Air Pistol Championship.' },
    { title: '2nd Place — SLSSSA Schools Championship (U18)', org: 'SLSSSA', year: '2016', desc: 'Silver medal at the All-Island Schools Championship.' },
    { title: '3rd Place — NSSF Air Gun Championship (Youth)', org: 'National Shooting Sport Federation', year: '2019', desc: 'Bronze medal in the open youth category at the national federation championship.' },
    { title: '2nd Place — 5th Navy Open Shooting Championship (Youth)', org: 'Sri Lanka Navy', year: '2018', desc: 'Silver medal in the youth division of the national Navy Open.' },
];

const MOBILE_PREVIEW = 3;

export default function Competitions() {
    const ref = useRef<HTMLElement>(null);
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        gsap.fromTo('.comp-row',
            { y: 30, opacity: 0 },
            {
                y: 0, opacity: 1, duration: .7, stagger: .1, ease: 'power3.out',
                scrollTrigger: { trigger: ref.current, start: 'top 75%' }
            }
        );
    }, []);

    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
    const visible = (!isMobile || showAll) ? comps : comps.slice(0, MOBILE_PREVIEW);
    const hidden = comps.length - MOBILE_PREVIEW;

    return (
        <section className="section" id="competitions" ref={ref}>
            <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%', padding: '0 var(--pad-x)' }}>
                <div className="section-label">
                    <div className="section-label-line" />
                    <h2>Competitions</h2>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '1rem',
                    marginBottom: '1.5rem',
                }}>
                    <div className="comp-row" style={{
                        borderRadius: 16,
                        overflow: 'hidden',
                        height: 'clamp(120px, 30vw, 160px)',
                        gridColumn: 'span 2',
                    }}>
                        <img src="/demo-trophy.png" alt="Competition Trophies" style={{
                            width: '100%', height: '100%', objectFit: 'cover', display: 'block',
                        }} />
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {visible.map((c, i) => (
                        <div key={i} className="comp-row card" style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem' }}>
                            <Trophy size={20} color="var(--accent-fire)" style={{ flexShrink: 0, marginTop: '.2rem' }} />
                            <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap', marginBottom: '.25rem' }}>
                                    <h3 style={{ fontSize: '1.0625rem', fontWeight: 600 }}>{c.title}</h3>
                                    <span className="tag">{c.year}</span>
                                </div>
                                <p style={{ fontSize: '.875rem', color: 'var(--accent)', fontWeight: 500, marginBottom: '.25rem' }}>{c.org}</p>
                                <p style={{ fontSize: '.9375rem', color: 'var(--text-muted)' }}>{c.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Show More / Less — mobile only */}
                {isMobile && (
                    <button
                        onClick={() => setShowAll(v => !v)}
                        style={{
                            marginTop: '1.25rem',
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '.5rem',
                            padding: '.875rem',
                            background: 'var(--bg-card)',
                            border: '1px solid var(--border)',
                            borderRadius: 12,
                            cursor: 'pointer',
                            color: 'var(--accent)',
                            fontSize: '.875rem',
                            fontWeight: 600,
                            fontFamily: 'var(--font)',
                            letterSpacing: '.02em',
                            transition: 'background .2s',
                        }}
                    >
                        {showAll ? (
                            <><ChevronUp size={16} /> Show less</>
                        ) : (
                            <><ChevronDown size={16} /> Show {hidden} more competitions</>
                        )}
                    </button>
                )}
            </div>
        </section>
    );
}
