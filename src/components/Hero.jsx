import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Hero() {
  const containerRef = useRef(null);
  const textRef1 = useRef(null);
  const textRef2 = useRef(null);

  // Structured row positioned safely above the name to guarantee NO overlap
  const floatingTags = [
    { label: 'DEV', left: '15vw' },
    { label: 'ENGINEER', left: '35vw' },
    { label: 'FULLSTACK', right: '35vw' },
    { label: 'UI ARCHITECT', right: '15vw' }
  ];

  useEffect(() => {
    let ctx = gsap.context(() => {
      const innerTags = gsap.utils.toArray('.floating-tag-inner');

      // 1. Slow, continuous floating wiggle (Only float, no cursor interaction)
      innerTags.forEach((inner, index) => {
        gsap.to(inner, {
          y: '+=12',
          x: '+=8',
          rotation: index % 2 === 0 ? 3 : -3,
          duration: 4 + Math.random() * 2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: Math.random() * 1.5
        });
      });

      // 2. Mouse Parallax (Only on the name text)
      const onMouseMove = (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 50; 
        const y = (e.clientY / window.innerHeight - 0.5) * 50;
        
        gsap.to(textRef1.current, { x: -x, y: -y, duration: 1.2, ease: 'power2.out' });
        gsap.to(textRef2.current, { x: x, y: y, duration: 1.2, ease: 'power2.out' });
      };
      
      window.addEventListener('mousemove', onMouseMove);

      // 3. Brutalist Intro Reveal
      gsap.from('.hero-word', {
        yPercent: 120,
        duration: 1.5,
        stagger: 0.2,
        ease: 'power4.out',
        delay: 0.2
      });
      
      gsap.from('.floating-tag-outer', {
        opacity: 0,
        y: -20,
        duration: 1.2,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.8
      });

      gsap.from('.hero-meta', {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 1,
        ease: 'power2.out'
      });

      // 4. Scroll Exit Animation (Name and tags slide and fade out)
      gsap.to(['.hero-word-container', '.floating-tag-outer'], {
        yPercent: -40,
        opacity: 0,
        stagger: 0.03,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });

      return () => window.removeEventListener('mousemove', onMouseMove);
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="hero-section" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', position: 'relative', backgroundColor: 'transparent' }}>
      
      {/* ==================== CENTERED HORIZONTAL TAGS ROW (Positioned above the name) ==================== */}
      {floatingTags.map((tag, i) => (
        <div 
          key={i} 
          className="floating-tag-outer" 
          style={{ 
            position: 'absolute', 
            top: '20vh', // High enough to avoid name letters entirely
            left: tag.left || 'auto',
            right: tag.right || 'auto',
            zIndex: 5
          }}
        >
          <div 
            className="floating-tag-inner" 
            style={{
              fontFamily: 'monospace',
              fontSize: 'clamp(0.75rem, 1.2vw, 0.9rem)',
              letterSpacing: '0.2em',
              color: 'var(--text-primary)', // Crisp white
              display: 'flex',
              alignItems: 'center',
              whiteSpace: 'nowrap',
              willChange: 'transform, opacity'
            }}
          >
            {/* Minimal accent dot instead of boxes */}
            <span style={{ color: 'var(--accent)', marginRight: '0.6rem', fontSize: '1.2rem', lineHeight: 1 }}>•</span>
            {tag.label}
          </div>
        </div>
      ))}

      {/* Massive Kinetic Typography */}
      <div style={{ textAlign: 'center', zIndex: 6 }}>
        <div className="hero-word-container" style={{ overflow: 'hidden', display: 'block' }}>
          <h1 ref={textRef1} className="text-serif hero-word hover-target" style={{ fontSize: 'clamp(4rem, 16vw, 18rem)', lineHeight: 0.8, margin: 0, textTransform: 'uppercase', color: 'var(--text-primary)', whiteSpace: 'nowrap' }}>
            BISHWAJIT
          </h1>
        </div>
        <div className="hero-word-container" style={{ overflow: 'hidden', display: 'block', marginTop: '-2vw' }}>
          <h1 ref={textRef2} className="text-serif hero-word hover-target" style={{ fontSize: 'clamp(4rem, 16vw, 18rem)', lineHeight: 0.8, margin: 0, textTransform: 'uppercase', color: 'var(--text-primary)', whiteSpace: 'nowrap', marginLeft: '10vw' }}>
            SHARMA<span style={{ color: 'var(--accent)' }}>.</span>
          </h1>
        </div>
      </div>

      {/* Editorial Meta Data */}
      <div className="hero-meta" style={{ position: 'absolute', bottom: '5vh', left: '5vw', maxWidth: '350px', zIndex: 6 }}>
         <p style={{ fontSize: '0.9rem', lineHeight: 1.8, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            <strong style={{ color: 'var(--text-primary)' }}>Fullstack Developer</strong> <br/> 
            Building premium digital experiences with robust architectural logic and high-end aesthetic execution.
         </p>
      </div>

      <div className="hero-meta" style={{ position: 'absolute', bottom: '5vh', right: '5vw', textAlign: 'right', zIndex: 6 }}>
         <p style={{ fontSize: '0.75rem', letterSpacing: '0.2em', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Available for Work</p>
         <p style={{ fontSize: '0.75rem', letterSpacing: '0.2em', color: 'var(--text-secondary)', textTransform: 'uppercase', marginTop: '0.5rem' }}>Global / Remote</p>
         <div style={{ width: '1px', height: '40px', backgroundColor: 'rgba(255,255,255,0.2)', margin: '1rem 0 0 auto' }}></div>
      </div>
    </section>
  );
}
