/**
 * BulletStreak — desktop-only
 * A thin projectile fires horizontally across the viewport when scrolled into view.
 * direction: 'ltr' fires left-to-right, 'rtl' fires right-to-left.
 */
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Props {
    direction?: 'ltr' | 'rtl';
    /** vertical offset from centre of the container, e.g. -20 or 30 */
    offsetY?: number;
    /** 0–1 delay before firing */
    delay?: number;
}

export default function BulletStreak({ direction = 'ltr', offsetY = 0, delay = 0 }: Props) {
    const wrapRef = useRef<HTMLDivElement>(null);
    const bulletRef = useRef<HTMLDivElement>(null);
    const trailRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const bullet = bulletRef.current;
        const trail = trailRef.current;
        const wrap = wrapRef.current;
        if (!bullet || !trail || !wrap) return;

        const isLtr = direction === 'ltr';
        // start/end x values in vw units
        const startX = isLtr ? -8 : 108;
        const endX = isLtr ? 108 : -8;

        // Set initial position
        gsap.set(bullet, { xPercent: startX * (window.innerWidth / 100), opacity: 0 });
        gsap.set(trail, { opacity: 0, scaleX: 0, transformOrigin: isLtr ? 'left center' : 'right center' });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: wrap,
                start: 'top 78%',
                toggleActions: 'play none none none',
            },
            delay,
        });

        // Fire the bullet
        tl.to(bullet, {
            xPercent: endX * (window.innerWidth / 100),
            opacity: 1,
            duration: 0.55,
            ease: 'power3.in',
        }, 0)
            // Fade it out just before it exits
            .to(bullet, {
                opacity: 0,
                duration: 0.12,
            }, 0.43)
            // Trail grows behind it
            .fromTo(trail, {
                opacity: 0.35,
                scaleX: 0,
            }, {
                opacity: 0,
                scaleX: 1,
                duration: 0.55,
                ease: 'power2.out',
            }, 0);

        return () => { tl.kill(); };
    }, [direction, delay]);

    const isLtr = direction === 'ltr';

    return (
        // desktop-only via className
        <div
            ref={wrapRef}
            className="desktop-only"
            style={{
                position: 'relative',
                height: 32,
                overflow: 'visible',
                pointerEvents: 'none',
                zIndex: 6,
            }}
        >
            {/* Horizontal trail */}
            <div
                ref={trailRef}
                style={{
                    position: 'absolute',
                    top: `calc(50% + ${offsetY}px)`,
                    left: isLtr ? 0 : 'auto',
                    right: isLtr ? 'auto' : 0,
                    width: '100vw',
                    height: 1,
                    background: isLtr
                        ? 'linear-gradient(90deg, transparent 0%, var(--accent) 60%, var(--accent-fire) 100%)'
                        : 'linear-gradient(270deg, transparent 0%, var(--accent) 60%, var(--accent-fire) 100%)',
                    transform: `scaleX(0)`,
                    transformOrigin: isLtr ? 'left center' : 'right center',
                }}
            />

            {/* The pellet */}
            <div
                ref={bulletRef}
                style={{
                    position: 'absolute',
                    top: `calc(50% + ${offsetY}px)`,
                    left: 0,
                    transform: 'translateY(-50%)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0,
                }}
            >
                {/* Glow ahead of bullet */}
                <div style={{
                    width: 14,
                    height: 3,
                    borderRadius: 2,
                    background: 'linear-gradient(90deg, transparent, var(--accent-fire))',
                    opacity: 0.7,
                    order: isLtr ? 0 : 1,
                    transform: isLtr ? 'scaleX(1)' : 'scaleX(-1)',
                }} />
                {/* Pellet body */}
                <div style={{
                    width: 9,
                    height: 14,
                    borderRadius: isLtr ? '50% 50% 30% 30% / 60% 60% 40% 40%' : '30% 30% 50% 50% / 40% 40% 60% 60%',
                    background: 'linear-gradient(180deg, #eee 0%, #bbb 30%, #888 70%, #555 100%)',
                    boxShadow: '0 0 8px var(--accent-fire), 0 0 16px rgba(239,68,68,0.4)',
                    transform: 'rotate(90deg)',
                    flexShrink: 0,
                }} />
            </div>
        </div>
    );
}
