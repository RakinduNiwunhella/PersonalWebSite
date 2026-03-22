import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, Linkedin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
        gsap.fromTo('.contact-item',
            { y: 20, opacity: 0 },
            {
                y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out',
                scrollTrigger: { trigger: ref.current, start: 'top 80%' }
            }
        );
    }, []);

    return (
        <section id="contact" className="section" ref={ref}>
            <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%', padding: '0 var(--pad-x)' }}>
                <div className="section-label">
                    <div className="section-label-line" />
                    <h2>Contact Me</h2>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                    <a href="mailto:rakindu15@gmail.com" className="contact-item card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.5rem', textDecoration: 'none', color: 'inherit' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 48, height: 48, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', color: 'var(--accent)', flexShrink: 0 }}>
                            <Mail size={24} />
                        </div>
                        <div>
                            <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: '0.2rem', fontWeight: 700 }}>Email</p>
                            <span style={{ fontSize: '1rem', fontWeight: 600 }}>rakindu15@gmail.com</span>
                        </div>
                    </a>
                    
                    <a href="tel:+94702504417" className="contact-item card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.5rem', textDecoration: 'none', color: 'inherit' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 48, height: 48, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', color: 'var(--accent)', flexShrink: 0 }}>
                            <Phone size={24} />
                        </div>
                        <div>
                            <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: '0.2rem', fontWeight: 700 }}>Phone</p>
                            <span style={{ fontSize: '1rem', fontWeight: 600 }}>+94 70 250 4417</span>
                        </div>
                    </a>
                    
                    <a href="https://www.linkedin.com/in/rakindu-niwunhella/" target="_blank" rel="noopener noreferrer" className="contact-item card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.5rem', textDecoration: 'none', color: 'inherit' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 48, height: 48, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', color: 'var(--accent)', flexShrink: 0 }}>
                            <Linkedin size={24} />
                        </div>
                        <div>
                            <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: '0.2rem', fontWeight: 700 }}>LinkedIn</p>
                            <span style={{ fontSize: '1rem', fontWeight: 600 }}>Rakindu Niwunhella</span>
                        </div>
                    </a>
                </div>
            </div>
        </section>
    );
}
