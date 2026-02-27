import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type DividerVariant = 'burst' | 'slice' | 'glitch' | 'shockwave';

interface Props {
    variant?: DividerVariant;
    label?: string;
}

export default function SectionDivider({ variant = 'burst', label }: Props) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (variant === 'burst') {
                // Particles explode outward from center
                const particles = ref.current!.querySelectorAll('.burst-particle');
                gsap.fromTo(particles,
                    { scale: 0, opacity: 1 },
                    {
                        scale: 1,
                        opacity: 0,
                        duration: 0.8,
                        stagger: { each: 0.04, from: 'center' },
                        ease: 'power2.out',
                        scrollTrigger: { trigger: ref.current, start: 'top 80%' }
                    }
                );
                // Center diamond pops in
                gsap.fromTo(ref.current!.querySelector('.burst-center'),
                    { scale: 0, rotation: 45, opacity: 0 },
                    {
                        scale: 1, rotation: 0, opacity: 1,
                        duration: 0.5, delay: 0.2, ease: 'back.out(3)',
                        scrollTrigger: { trigger: ref.current, start: 'top 80%' }
                    }
                );
            }

            if (variant === 'slice') {
                gsap.fromTo(ref.current!.querySelector('.slice-line'),
                    { scaleX: 0 },
                    {
                        scaleX: 1, duration: 0.6, ease: 'power3.inOut',
                        scrollTrigger: { trigger: ref.current, start: 'top 80%' }
                    }
                );
                if (label) {
                    gsap.fromTo(ref.current!.querySelector('.slice-label'),
                        { opacity: 0, y: 20 },
                        {
                            opacity: 1, y: 0, duration: 0.5, delay: 0.3, ease: 'power2.out',
                            scrollTrigger: { trigger: ref.current, start: 'top 80%' }
                        }
                    );
                }
            }

            if (variant === 'glitch') {
                const chars = ref.current!.querySelectorAll('.glitch-char');
                gsap.fromTo(chars,
                    { opacity: 0, y: () => gsap.utils.random(-40, 40), x: () => gsap.utils.random(-20, 20), rotation: () => gsap.utils.random(-30, 30) },
                    {
                        opacity: 1, y: 0, x: 0, rotation: 0,
                        duration: 0.6, stagger: 0.03, ease: 'back.out(2)',
                        scrollTrigger: { trigger: ref.current, start: 'top 80%' }
                    }
                );
            }

            if (variant === 'shockwave') {
                gsap.fromTo(ref.current!.querySelectorAll('.wave'),
                    { scale: 0, opacity: 1 },
                    {
                        scale: 4, opacity: 0, duration: 1.2, stagger: 0.15, ease: 'power2.out',
                        scrollTrigger: { trigger: ref.current, start: 'top 75%' }
                    }
                );
                gsap.fromTo(ref.current!.querySelector('.impact-dot'),
                    { scale: 0 },
                    {
                        scale: 1, duration: 0.3, ease: 'back.out(3)',
                        scrollTrigger: { trigger: ref.current, start: 'top 75%' }
                    }
                );
            }
        }, ref);

        return () => ctx.revert();
    }, [variant]);

    // Generate random particle positions for the burst
    const burstParticles = Array.from({ length: 16 }, (_, i) => {
        const angle = (i / 16) * Math.PI * 2;
        const dist = 40 + Math.random() * 30;
        return {
            x: Math.cos(angle) * dist,
            y: Math.sin(angle) * dist,
            size: 3 + Math.random() * 5,
        };
    });

    return (
        <div ref={ref} style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '6rem 0',
            position: 'relative',
            overflow: 'hidden',
            zIndex: 5,
        }}>
            {variant === 'burst' && (
                <div style={{ position: 'relative', width: 160, height: 160 }}>
                    {burstParticles.map((p, i) => (
                        <div key={i} className="burst-particle" style={{
                            position: 'absolute',
                            top: `calc(50% + ${p.y}px)`,
                            left: `calc(50% + ${p.x}px)`,
                            width: p.size,
                            height: p.size,
                            transform: 'translate(-50%, -50%) scale(0)',
                            borderRadius: '50%',
                            background: i % 3 === 0 ? 'var(--accent-fire)' : i % 3 === 1 ? 'var(--accent)' : 'var(--text-muted)',
                            boxShadow: i % 3 === 0 ? '0 0 6px var(--accent-fire)' : 'none',
                        }} />
                    ))}
                    {/* Center diamond stays visible */}
                    <div className="burst-center" style={{
                        position: 'absolute',
                        top: '50%', left: '50%',
                        width: 10, height: 10,
                        transform: 'translate(-50%, -50%) scale(0) rotate(45deg)',
                        background: 'var(--accent)',
                        boxShadow: '0 0 12px var(--accent)',
                    }} />
                </div>
            )}

            {variant === 'slice' && (
                <div style={{ width: '100%', maxWidth: 1200, padding: '0 4rem', textAlign: 'center' }}>
                    <div className="slice-line" style={{
                        height: 1,
                        background: 'linear-gradient(90deg, transparent 0%, var(--accent) 20%, var(--accent) 80%, transparent 100%)',
                        transformOrigin: 'left center',
                    }} />
                    {label && (
                        <p className="slice-label" style={{
                            marginTop: '1.5rem',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            letterSpacing: '0.2em',
                            textTransform: 'uppercase',
                            color: 'var(--text-muted)',
                            background: 'var(--bg)',
                            display: 'inline-block',
                            padding: '0.5rem 1.5rem',
                            position: 'relative',
                            zIndex: 6,
                        }}>{label}</p>
                    )}
                </div>
            )}

            {variant === 'glitch' && label && (
                <div style={{ display: 'flex', gap: 2, background: 'var(--bg)', padding: '0.5rem 1.5rem', borderRadius: 8, position: 'relative', zIndex: 6 }}>
                    {label.split('').map((char, i) => (
                        <span key={i} className="glitch-char" style={{
                            display: 'inline-block',
                            fontSize: 'clamp(2rem, 5vw, 4rem)',
                            fontWeight: 900,
                            color: 'var(--text)',
                            opacity: 0,
                            letterSpacing: '-0.02em',
                        }}>
                            {char === ' ' ? '\u00A0' : char}
                        </span>
                    ))}
                </div>
            )}

            {variant === 'shockwave' && (
                <div style={{ position: 'relative', width: 80, height: 80 }}>
                    {[0, 1, 2].map(i => (
                        <div key={i} className="wave" style={{
                            position: 'absolute',
                            top: '50%', left: '50%',
                            width: 40, height: 40,
                            transform: 'translate(-50%, -50%) scale(0)',
                            borderRadius: '50%',
                            border: '1px solid var(--accent)',
                        }} />
                    ))}
                    <div className="impact-dot" style={{
                        position: 'absolute',
                        top: '50%', left: '50%',
                        width: 8, height: 8,
                        transform: 'translate(-50%, -50%) scale(0)',
                        borderRadius: '50%',
                        background: 'var(--accent-fire)',
                        boxShadow: '0 0 10px var(--accent-fire)',
                    }} />
                </div>
            )}
        </div>
    );
}
