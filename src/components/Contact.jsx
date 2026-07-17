import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Contact() {
  const footerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Reveal animation
      gsap.from('.contact-reveal', {
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 80%',
        },
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out',
      });
    }, footerRef);
    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isMobileDevice = typeof navigator !== 'undefined' && /Mobi|Android|iPhone/i.test(navigator.userAgent);

  const channels = [
    { 
      label: 'Email', 
      url: isMobileDevice 
        ? 'mailto:bishwajitsharma444@gmail.com' 
        : 'https://mail.google.com/mail/?view=cm&fs=1&to=bishwajitsharma444@gmail.com' 
    },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/bishwajitsharma-in/' },
    { label: 'GitHub', url: 'https://github.com/bishwajit-sharma101' }
  ];

  return (
    <footer id="contact" ref={footerRef} className="contact-section" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', padding: '15vh 5vw 4vh 5vw', backgroundColor: 'transparent', position: 'relative', zIndex: 10 }}>
      
      {/* Section Header */}
      <div className="contact-reveal" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '2rem', marginBottom: '4rem' }}>
        <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-secondary)' }}>[04 / CONTACT]</span>
        <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-secondary)' }}>GET IN TOUCH</span>
      </div>

      {/* Main Statement */}
      <div className="contact-reveal" style={{ marginBottom: '6rem' }}>
        <h2 className="text-serif" style={{ fontSize: 'clamp(3rem, 7vw, 8rem)', lineHeight: 1, margin: 0, textTransform: 'uppercase', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
          Let's build the <br/>
          <span style={{ color: 'var(--accent)' }}>next big thing.</span>
        </h2>
      </div>

      {/* Unified Channels Index */}
      <div className="contact-reveal" style={{ width: '100%', marginBottom: '6rem' }}>
        <p style={{ textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.2em', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>[INDEX / CHANNELS]</p>
        
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          {channels.map((channel, index) => (
            <a 
              key={index} 
              href={channel.url} 
              target={channel.url.startsWith('mailto:') ? '_self' : '_blank'}
              rel="noopener noreferrer"
              className="index-row hover-target" 
              style={{ 
                borderBottom: index === channels.length - 1 ? '1px solid rgba(255,255,255,0.1)' : 'none',
                padding: '2.5rem 0'
              }}
            >
              {/* Left Side: Number Index and Platform Name */}
              <div className="index-row-content" style={{ display: 'flex', alignItems: 'center', gap: '3rem' }}>
                <span style={{ fontSize: '0.85rem', fontFamily: 'monospace', color: 'var(--text-secondary)', width: '40px' }}>0{index + 1}</span>
                <span className="text-serif index-row-value" style={{ fontSize: 'clamp(2.5rem, 5vw, 5.5rem)', textTransform: 'uppercase', lineHeight: 1 }}>{channel.label}</span>
              </div>
              
              {/* Right Side: Arrow */}
              <span className="index-row-arrow" style={{ fontSize: '2rem' }}>&rarr;</span>
            </a>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-footer-bar {
            flex-direction: column-reverse !important;
            gap: 1.5rem !important;
            align-items: center !important;
            text-align: center !important;
            padding-bottom: 5vh !important;
          }
          .copyright-text {
            font-size: 0.68rem !important;
            line-height: 1.5 !important;
          }
        }
      `}</style>

      {/* Footer Bottom Bar */}
      <div className="contact-reveal contact-footer-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '2rem 0', borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: 'auto' }}>
        <p className="copyright-text" style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>&copy; {new Date().getFullYear()} Bishwajit Sharma. All Rights Reserved.</p>
        <button onClick={scrollToTop} className="hover-target back-to-top-btn" style={{ background: 'none', border: 'none', color: 'var(--text-primary)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'none' }}>
          Back to Top &uarr;
        </button>
      </div>
    </footer>
  );
}
