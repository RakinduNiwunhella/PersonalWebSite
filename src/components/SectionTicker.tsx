import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SectionTickerProps {
    items: string[];
    /** seconds for one full loop. Default 32 */
    speed?: number;
    /** 1 = left→right, -1 = right→left. Default 1 */
    direction?: 1 | -1;
}

export default function SectionTicker({ items, speed = 32, direction = 1 }: SectionTickerProps) {
    const trackRef = useRef<HTMLDivElement>(null);
    const tweenRef = useRef<gsap.core.Tween | null>(null);
    const wrapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;
        const halfW = track.scrollWidth / 2;

        gsap.set(track, { x: direction === 1 ? 0 : -halfW });
        tweenRef.current = gsap.to(track, {
            x: direction === 1 ? -halfW : 0,
            duration: speed,
            ease: 'none',
            repeat: -1,
        });

        const pause = () => tweenRef.current?.pause();
        const resume = () => tweenRef.current?.resume();
        track.addEventListener('mouseenter', pause);
        track.addEventListener('mouseleave', resume);

        return () => {
            tweenRef.current?.kill();
            track.removeEventListener('mouseenter', pause);
            track.removeEventListener('mouseleave', resume);
        };
    }, [speed, direction]);

    useEffect(() => {
        gsap.fromTo(wrapRef.current,
            { opacity: 0, y: 16 },
            {
                opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
                scrollTrigger: { trigger: wrapRef.current, start: 'top 90%' },
            }
        );
    }, []);

    const doubled = [...items, ...items];

    return (
        <div ref={wrapRef} style={{ padding: '1.5rem 0', overflow: 'hidden' }}>
            <div
                style={{
                    maskImage: 'linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)',
                }}
            >
                <div ref={trackRef} style={{ display: 'flex', gap: '0.75rem', width: 'max-content' }}>
                    {doubled.map((item, i) => (
                        <span
                            key={i}
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.4rem',
                                padding: '0.35rem 0.95rem',
                                borderRadius: '999px',
                                border: '1px solid var(--border)',
                                background: 'transparent',
                                color: 'var(--text-muted)',
                                fontSize: '0.8125rem',
                                fontWeight: 500,
                                letterSpacing: '0.015em',
                                whiteSpace: 'nowrap',
                                cursor: 'default',
                                transition: 'border-color 0.2s, color 0.2s',
                                userSelect: 'none',
                            }}
                            onMouseEnter={e => {
                                (e.currentTarget as HTMLSpanElement).style.borderColor = 'rgba(255,59,48,0.35)';
                                (e.currentTarget as HTMLSpanElement).style.color = 'var(--text)';
                            }}
                            onMouseLeave={e => {
                                (e.currentTarget as HTMLSpanElement).style.borderColor = 'var(--border)';
                                (e.currentTarget as HTMLSpanElement).style.color = 'var(--text-muted)';
                            }}
                        >
                            <span style={{
                                width: 4, height: 4, borderRadius: '50%',
                                background: 'var(--text-muted)',
                                opacity: 0.45,
                                flexShrink: 0,
                            }} />
                            {item}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
