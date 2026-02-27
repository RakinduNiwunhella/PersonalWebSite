import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function BulletSequence() {
    const sectionRef = useRef<HTMLElement>(null);
    const pelletRef = useRef<HTMLDivElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top top',
                    end: '+=1200',
                    pin: true,
                    scrub: 0.6,
                    anticipatePin: 1,
                }
            });

            // Phase 1: Fade out the background text
            tl.to(textRef.current, {
                opacity: 0,
                scale: 0.85,
                duration: 0.3,
                ease: 'none'
            }, 0);

            // Phase 2: The morph — shrink width, keep height, move down
            tl.fromTo(pelletRef.current,
                { scaleX: 1, scaleY: 1, y: 0 },
                {
                    scaleX: 0.15,
                    scaleY: 0.4,
                    y: window.innerHeight * 0.25,
                    duration: 1,
                    ease: 'power2.inOut'
                }, 0
            );

            // Phase 3: Glow intensifies as it shrinks
            tl.fromTo(glowRef.current,
                { opacity: 0, scale: 0.5 },
                {
                    opacity: 1,
                    scale: 2.5,
                    duration: 1,
                    ease: 'power2.in'
                }, 0.2
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} style={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
        }}>

            <h1 ref={textRef} style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 0,
                opacity: 0.06,
                fontSize: 'clamp(4rem, 15vw, 12rem)',
                fontWeight: 900,
                whiteSpace: 'nowrap',
                margin: 0,
                lineHeight: 0.85,
                pointerEvents: 'none',
                color: 'var(--text)',
                letterSpacing: '-0.04em'
            }}>
                PRECISION
            </h1>

            <div style={{
                position: 'relative',
                zIndex: 10,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                {/* The CSS Pellet */}
                <div
                    ref={pelletRef}
                    style={{
                        height: '18vh',
                        width: '7vh',
                        borderRadius: '8% 8% 50% 50% / 10% 10% 40% 40%',
                        background: 'linear-gradient(90deg, #555 0%, #aaa 30%, #eee 50%, #aaa 70%, #555 100%)',
                        boxShadow: '0 0 30px rgba(0,102,204,0.15), inset 0 8px 16px rgba(255,255,255,0.6), inset 0 -8px 20px rgba(0,0,0,0.6)',
                        position: 'relative',
                        willChange: 'transform',
                        transformOrigin: 'center center'
                    }}
                >
                    {/* Ridges near the flat top (base of the bullet) */}
                    <div style={{ position: 'absolute', top: '12%', left: '5%', right: '5%', height: 3, background: 'rgba(0,0,0,0.3)', borderRadius: 2 }} />
                    <div style={{ position: 'absolute', top: '22%', left: '5%', right: '5%', height: 3, background: 'rgba(0,0,0,0.3)', borderRadius: 2 }} />
                    <div style={{ position: 'absolute', top: '32%', left: '5%', right: '5%', height: 3, background: 'rgba(0,0,0,0.3)', borderRadius: 2 }} />
                </div>

                {/* Glow behind the pellet that intensifies as it morphs */}
                <div
                    ref={glowRef}
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '6vh',
                        height: '6vh',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(239,68,68,0.9) 0%, rgba(251,191,36,0.4) 40%, transparent 70%)',
                        opacity: 0,
                        filter: 'blur(8px)',
                        pointerEvents: 'none',
                        willChange: 'transform, opacity'
                    }}
                />
            </div>

        </section>
    );
}
