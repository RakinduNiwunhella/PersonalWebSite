import { useEffect, useRef, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Hero from './components/Hero';
import PistolSequence from './components/PistolSequence';
import SectionDivider from './components/SectionDivider';
import About from './components/About';
import Education from './components/Education';
import Projects from './components/Projects';
import Sports from './components/Sports';
import Leadership from './components/Leadership';
import Clubs from './components/Clubs';
import Community from './components/Community';
import Certificates from './components/Certificates';
import Competitions from './components/Competitions';
import Skills from './components/Skills';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

/* ── Decorative pellet ── */
function MiniPellet({ style }: { style?: React.CSSProperties }) {
  return (
    <div style={{
      width: 8, height: 18,
      borderRadius: '3px 3px 50% 50% / 3px 3px 40% 40%',
      background: 'linear-gradient(90deg, #666 0%, #bbb 40%, #eee 50%, #bbb 60%, #666 100%)',
      boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.5), inset 0 -2px 4px rgba(0,0,0,0.4)',
      opacity: 0.12,
      position: 'absolute',
      pointerEvents: 'none',
      ...style,
    }}>
      <div style={{ position: 'absolute', top: '12%', left: '12%', right: '12%', height: 1, background: 'rgba(0,0,0,0.2)' }} />
    </div>
  );
}

/* ── Parallax floating particle ── */
function FloatParticle({ x, y, size, speed, color }: { x: string; y: string; size: number; speed: number; color: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handleScroll = () => {
      const offset = window.scrollY * speed;
      el.style.transform = `translateY(${-offset}px)`;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div ref={ref} style={{
      position: 'absolute',
      top: y, left: x,
      width: size, height: size,
      borderRadius: '50%',
      background: color,
      opacity: 0.06,
      pointerEvents: 'none',
      willChange: 'transform',
    }} />
  );
}

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const crosshairRef = useRef<HTMLDivElement>(null);
  const tracerRef = useRef<HTMLDivElement>(null);
  const tracerGlowRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const depthRef = useRef<HTMLSpanElement>(null);
  const speedLinesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    let rafId: number;
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;
    let isVisible = false;
    let angle = 0;
    let lastScrollY = 0;
    let scrollVelocity = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      const firePoint = window.innerHeight + 1200;
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const globalPct = maxScroll > 0 ? scrollY / maxScroll : 0;

      // ── Scroll velocity (for speed lines) ──
      scrollVelocity = Math.abs(scrollY - lastScrollY);
      lastScrollY = scrollY;

      // ── Crosshair ──
      if (crosshairRef.current) {
        if (scrollY < firePoint) {
          if (isVisible) {
            crosshairRef.current.style.opacity = '0';
            isVisible = false;
          }
        } else {
          if (!isVisible) {
            crosshairRef.current.style.opacity = '1';
            isVisible = true;
          }
          currentX += (mouseX - currentX) * 0.35;
          currentY += (mouseY - currentY) * 0.35;
          angle += 0.15;
          crosshairRef.current.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%) rotate(${angle}deg)`;
        }
      }

      // ── Vertical tracer line — fades out before footer ──
      if (tracerRef.current) {
        if (scrollY < firePoint) {
          tracerRef.current.style.opacity = '0';
          if (tracerGlowRef.current) tracerGlowRef.current.style.opacity = '0';
        } else {
          const postFireScroll = scrollY - firePoint;
          const postFireMax = maxScroll - firePoint;
          let pct = postFireMax > 0 ? postFireScroll / postFireMax : 0;
          if (pct < 0) pct = 0;
          if (pct > 1) pct = 1;
          // Cap at 92% so it fades before the footer
          const cappedPct = Math.min(pct, 0.92);
          // Fade out smoothly in the last 10%
          const fadeOpacity = pct > 0.85 ? Math.max(0, 1 - (pct - 0.85) / 0.15) : 1;
          tracerRef.current.style.opacity = String(fadeOpacity);
          tracerRef.current.style.height = `${cappedPct * 100}vh`;
          // Glow at the tip of the tracer
          if (tracerGlowRef.current) {
            tracerGlowRef.current.style.opacity = String(fadeOpacity * 0.8);
            tracerGlowRef.current.style.top = `${cappedPct * 100}vh`;
          }
        }
      }

      // ── Side scroll progress bar ──
      if (progressRef.current) {
        progressRef.current.style.height = `${globalPct * 100}%`;
      }

      // ── Depth counter ──
      if (depthRef.current) {
        const depthPct = Math.round(globalPct * 100);
        depthRef.current.textContent = `${depthPct}%`;
        depthRef.current.style.opacity = scrollY > 200 ? '0.4' : '0';
      }

      // ── Speed lines (flash when scrolling fast) ──
      if (speedLinesRef.current) {
        const intensity = Math.min(scrollVelocity / 60, 1);
        speedLinesRef.current.style.opacity = String(intensity * 0.15);
      }

      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <>
      {/* ── Speed lines overlay (appears when scrolling fast) ── */}
      <div ref={speedLinesRef} style={{
        position: 'fixed', inset: 0, zIndex: 3, pointerEvents: 'none', opacity: 0,
        background: 'repeating-linear-gradient(0deg, transparent 0px, transparent 3px, var(--accent) 3px, var(--accent) 4px)',
        transition: 'opacity 0.1s ease-out',
      }} />

      {/* ── Vertical tracer line ── */}
      <div
        ref={tracerRef}
        style={{
          position: 'fixed', top: 0, left: '50%', width: 1, height: 0,
          transform: 'translateX(-50%)',
          background: 'linear-gradient(180deg, var(--accent) 0%, var(--accent-fire) 100%)',
          opacity: 0, zIndex: 4, pointerEvents: 'none',
          transition: 'opacity 0.4s ease',
          boxShadow: '0 0 6px var(--accent), 0 0 12px rgba(239,68,68,0.2)',
        }}
      />
      {/* Glow dot at tracer tip */}
      <div
        ref={tracerGlowRef}
        style={{
          position: 'fixed', top: 0, left: '50%', width: 6, height: 6,
          transform: 'translate(-50%, -50%)',
          borderRadius: '50%',
          background: 'var(--accent-fire)',
          boxShadow: '0 0 12px var(--accent-fire), 0 0 24px rgba(239,68,68,0.5)',
          opacity: 0, zIndex: 5, pointerEvents: 'none',
        }}
      />

      {/* ── Side scroll progress indicator ── */}
      <div style={{
        position: 'fixed', top: 0, right: 0, width: 3, height: '100vh',
        zIndex: 40, pointerEvents: 'none',
        background: 'var(--border)',
      }}>
        <div ref={progressRef} style={{
          width: '100%', height: '0%',
          background: 'linear-gradient(180deg, var(--accent) 0%, var(--accent-fire) 100%)',
          borderRadius: '0 0 2px 2px',
          boxShadow: '0 0 8px var(--accent)',
          transition: 'height 0.05s linear',
        }} />
      </div>

      {/* ── Scroll depth counter ── */}
      <span ref={depthRef} style={{
        position: 'fixed', bottom: 24, right: 16,
        fontFamily: 'monospace', fontSize: '.75rem', fontWeight: 700,
        color: 'var(--accent)', opacity: 0, zIndex: 40,
        pointerEvents: 'none', transition: 'opacity 0.3s ease',
        letterSpacing: '0.05em',
      }}>0%</span>

      {/* ── Crosshair Scope ── */}
      <div
        ref={crosshairRef}
        style={{
          position: 'fixed', top: 0, left: 0, width: 80, height: 80,
          zIndex: 50, pointerEvents: 'none', opacity: 0,
          transition: 'opacity 0.4s ease', willChange: 'transform',
        }}
      >
        <svg viewBox="0 0 80 80" width="80" height="80" style={{ position: 'absolute', inset: 0 }}>
          <circle cx="40" cy="40" r="30" fill="none" stroke="var(--accent)" strokeWidth="1.5" opacity="0.5" />
          <circle cx="40" cy="40" r="12" fill="none" stroke="var(--accent)" strokeWidth="1" opacity="0.3" />
          <line x1="0" y1="40" x2="26" y2="40" stroke="var(--accent)" strokeWidth="1" opacity="0.6" />
          <line x1="54" y1="40" x2="80" y2="40" stroke="var(--accent)" strokeWidth="1" opacity="0.6" />
          <line x1="40" y1="0" x2="40" y2="26" stroke="var(--accent)" strokeWidth="1" opacity="0.6" />
          <line x1="40" y1="54" x2="40" y2="80" stroke="var(--accent)" strokeWidth="1" opacity="0.6" />
          <line x1="18" y1="18" x2="22" y2="22" stroke="var(--accent)" strokeWidth="1" opacity="0.35" />
          <line x1="58" y1="18" x2="62" y2="22" stroke="var(--accent)" strokeWidth="1" opacity="0.35" />
          <line x1="18" y1="58" x2="22" y2="62" stroke="var(--accent)" strokeWidth="1" opacity="0.35" />
          <line x1="58" y1="58" x2="62" y2="62" stroke="var(--accent)" strokeWidth="1" opacity="0.35" />
          <circle cx="40" cy="40" r="2.5" fill="var(--accent-fire)" />
        </svg>
        <div style={{
          position: 'absolute', top: '50%', left: '50%', width: 10, height: 10,
          transform: 'translate(-50%, -50%)', borderRadius: '50%',
          background: 'var(--accent-fire)',
          boxShadow: '0 0 12px var(--accent-fire), 0 0 30px rgba(239,68,68,0.3)',
          animation: 'crosshairPulse 1.5s ease-in-out infinite',
        }} />
      </div>

      {/* ── Navbar ── */}
      <nav className="navbar" style={{ mixBlendMode: 'difference', color: '#fff', border: 'none', background: 'transparent', backdropFilter: 'none', WebkitBackdropFilter: 'none' }}>
        <span className="nav-logo" style={{ color: '#fff' }}>Rakindu Niwunhella</span>
        <div className="nav-links">
          <a href="#about" style={{ color: '#ccc' }}>About</a>
          <a href="#projects" style={{ color: '#ccc' }}>Work</a>
          <a href="#sports" style={{ color: '#ccc' }}>Shooting</a>
          <a href="#leadership" style={{ color: '#ccc' }}>Leadership</a>
          <a href="#clubs" style={{ color: '#ccc' }}>Clubs</a>
          <button className="theme-btn" onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')} style={{ color: '#ccc' }}>
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </nav>

      {/* ── Main ── */}
      <div className="page-wrap" style={{ position: 'relative' }}>
        {/* Decorative pellets */}
        <MiniPellet style={{ top: '15%', left: '8%', transform: 'rotate(20deg)' }} />
        <MiniPellet style={{ top: '22%', right: '12%', transform: 'rotate(-15deg)' }} />
        <MiniPellet style={{ top: '35%', left: '5%', transform: 'rotate(45deg)' }} />
        <MiniPellet style={{ top: '42%', right: '7%', transform: 'rotate(-30deg)' }} />
        <MiniPellet style={{ top: '55%', left: '10%', transform: 'rotate(10deg)' }} />
        <MiniPellet style={{ top: '60%', right: '15%', transform: 'rotate(-50deg)' }} />
        <MiniPellet style={{ top: '72%', left: '6%', transform: 'rotate(35deg)' }} />
        <MiniPellet style={{ top: '78%', right: '9%', transform: 'rotate(-20deg)' }} />
        <MiniPellet style={{ top: '88%', left: '12%', transform: 'rotate(60deg)' }} />
        <MiniPellet style={{ top: '92%', right: '11%', transform: 'rotate(-40deg)' }} />

        {/* Parallax floating particles at different speeds */}
        <FloatParticle x="5%" y="30%" size={80} speed={0.05} color="var(--accent)" />
        <FloatParticle x="85%" y="20%" size={60} speed={0.08} color="var(--accent-fire)" />
        <FloatParticle x="15%" y="50%" size={100} speed={0.03} color="var(--accent)" />
        <FloatParticle x="75%" y="45%" size={50} speed={0.1} color="var(--accent-fire)" />
        <FloatParticle x="90%" y="65%" size={70} speed={0.04} color="var(--accent)" />
        <FloatParticle x="10%" y="75%" size={40} speed={0.12} color="var(--accent-fire)" />
        <FloatParticle x="60%" y="85%" size={90} speed={0.06} color="var(--accent)" />
        <FloatParticle x="30%" y="15%" size={55} speed={0.07} color="var(--accent-fire)" />

        <Hero />
        <PistolSequence />

        <div className="content-tunnel" style={{ position: 'relative', zIndex: 10, paddingBottom: '10rem' }}>
          <About />
          <SectionDivider variant="burst" />
          <Education />
          <SectionDivider variant="slice" label="What I've Built" />
          <Projects />
          <SectionDivider variant="shockwave" />
          <Sports />
          <SectionDivider variant="glitch" label="ACHIEVEMENTS" />
          <Certificates />
          <SectionDivider variant="burst" />
          <Competitions />
          <SectionDivider variant="slice" label="Leading the way" />
          <Leadership />
          <SectionDivider variant="shockwave" />
          <Clubs />
          <SectionDivider variant="glitch" label="COMMUNITY" />
          <Community />
          <SectionDivider variant="burst" />
          <Skills />
        </div>

        <footer style={{ padding: '6rem 0', textAlign: 'center', borderTop: '1px solid var(--border)', color: 'var(--text-muted)', fontSize: '1rem', fontWeight: 500 }}>
          <p>Rakindu Niwunhella © {new Date().getFullYear()}</p>
        </footer>
      </div>
    </>
  );
}
