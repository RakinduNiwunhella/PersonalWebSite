/**
 * SectionFX — mounts once, hooks every .section-label on the page.
 * When each label scrolls into view:
 *  1. The accent line draws left→right with a glowing "bullet tip" riding it.
 *  2. A muzzle flash bursts at the end of the line.
 *  3. The h2 slams in with an elastic impact.
 * Desktop-only (hidden on ≤768 px via CSS .desktop-only logic / media query).
 */
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SectionFX() {
    useEffect(() => {
        // Only run on desktop
        if (window.innerWidth <= 768) return;

        const labels = gsap.utils.toArray<HTMLElement>('.section-label');

        const cleanups: (() => void)[] = [];

        labels.forEach((label) => {
            const line = label.querySelector<HTMLElement>('.section-label-line');
            const h2 = label.querySelector<HTMLElement>('h2');
            if (!line || !h2) return;

            /* ── Bullet-tip glow dot (drawn dynamically, removed after animation) ── */
            const dot = document.createElement('div');
            dot.style.cssText = `
        position: absolute;
        top: 50%; left: 0;
        transform: translate(-50%, -50%);
        width: 8px; height: 8px;
        border-radius: 50%;
        background: var(--accent-fire);
        box-shadow: 0 0 10px var(--accent-fire), 0 0 20px rgba(239,68,68,0.6);
        pointer-events: none;
        z-index: 10;
        opacity: 0;
      `;
            line.style.position = 'relative';
            line.appendChild(dot);

            /* ── Muzzle flash (at right end of line) ── */
            const flash = document.createElement('div');
            flash.style.cssText = `
        position: absolute;
        top: 50%; right: -6px;
        transform: translate(50%, -50%) scale(0);
        width: 22px; height: 22px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(251,191,36,0.95) 0%, rgba(239,68,68,0.6) 45%, transparent 70%);
        pointer-events: none;
        z-index: 11;
        opacity: 0;
        filter: blur(2px);
      `;
            line.appendChild(flash);

            /* ── Shell casing (small oval that falls off) ── */
            const shell = document.createElement('div');
            shell.style.cssText = `
        position: absolute;
        top: 0; right: -4px;
        transform: translate(50%, -50%) rotate(-20deg) scale(0);
        width: 5px; height: 11px;
        border-radius: 2px 2px 50% 50% / 2px 2px 40% 40%;
        background: linear-gradient(90deg, #c49a00 0%, #fbbf24 35%, #ffe066 50%, #fbbf24 65%, #c49a00 100%);
        pointer-events: none;
        z-index: 12;
        opacity: 0;
      `;
            line.appendChild(shell);

            // Reset: line invisible initially
            gsap.set(line, { scaleX: 0, transformOrigin: 'left center' });
            gsap.set(h2, { opacity: 0, y: 18 });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: label,
                    start: 'top 80%',
                    toggleActions: 'play none none none',
                },
            });

            // 1. Line draws in — bullet tip travels right
            tl.to(line, { scaleX: 1, duration: 0.45, ease: 'power3.inOut' }, 0)
                .to(dot, { opacity: 1, duration: 0.05 }, 0)
                .to(dot, { left: '100%', duration: 0.45, ease: 'power3.inOut' }, 0)
                .to(dot, { opacity: 0, duration: 0.08 }, 0.41);

            // 2. Muzzle flash at tip
            tl.to(flash, {
                opacity: 1, scale: 1, duration: 0.08, ease: 'power4.out',
            }, 0.43)
                .to(flash, {
                    opacity: 0, scale: 1.6, duration: 0.18, ease: 'power2.out',
                }, 0.51);

            // 3. Shell casing pops up and falls
            tl.to(shell, { opacity: 1, scale: 1, duration: 0.06, ease: 'power4.out' }, 0.43)
                .to(shell, {
                    y: -14, x: 8, rotation: 30, duration: 0.18, ease: 'power2.out',
                }, 0.43)
                .to(shell, {
                    y: 28, x: 14, rotation: 70, opacity: 0, duration: 0.28, ease: 'power1.in',
                }, 0.60);

            // 4. h2 slams into place
            tl.to(h2, {
                opacity: 1, y: 0, duration: 0.38, ease: 'back.out(2.5)',
            }, 0.42);

            cleanups.push(() => {
                tl.kill();
                dot.remove();
                flash.remove();
                shell.remove();
                // restore
                gsap.set(line, { scaleX: 1, clearProps: 'transformOrigin' });
                gsap.set(h2, { opacity: 1, y: 0 });
            });
        });

        return () => cleanups.forEach(fn => fn());
    }, []);

    // No visible DOM output — this is a pure side-effect component
    return null;
}
