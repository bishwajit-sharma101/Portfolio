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
        delay: 0.2,
        onComplete: () => {
          // Unlock overflow so that bouncy scale/translate character hovers do not clip
          gsap.set('.hero-word-container', { overflow: 'visible' });

          // Start a smooth, continuous floating wiggle on the name word blocks
          gsap.to('.hero-word-container', {
            y: '+=8',
            duration: 4,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            stagger: 0.4
          });
        }
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

      // 5. Scroll Exit Animation (Name and tags slide and fade out)
      gsap.to(['.hero-word-container', '.floating-tag-outer', '.scroll-indicator'], {
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

      // 6. Scroll Dot loop
      gsap.to('.scroll-dot', {
        y: 10,
        opacity: 0.3,
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      // 7. Keydown letter cascade wave
      const handleKeyDown = (e) => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
        
        const nameChars = gsap.utils.toArray('.name-char');
        gsap.timeline()
          .to(nameChars, {
            y: -20,
            scaleY: 1.25,
            scaleX: 0.75,
            color: '#ff6b35',
            stagger: 0.02,
            duration: 0.15,
            ease: 'power2.out'
          })
          .to(nameChars, {
            y: 0,
            scaleY: 1,
            scaleX: 1,
            color: (index, target) => {
              return target.textContent === '.' ? '#ff6b35' : 'var(--text-primary)';
            },
            stagger: 0.02,
            duration: 0.35,
            ease: 'back.out(2)'
          }, '-=0.22');
      };
      
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('keydown', handleKeyDown);
      };
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  // Responsive character-level hover react
  const handleCharEnter = (e) => {
    gsap.to(e.currentTarget, {
      scale: 1.16,
      y: -12,
      color: '#ff6b35', // Premium Orange
      duration: 0.3,
      ease: 'back.out(2.5)'
    });
  };

  const handleCharLeave = (e) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      y: 0,
      color: 'var(--text-primary)',
      duration: 0.4,
      ease: 'power2.out'
    });
  };

  // Tag hover react
  const handleTagEnter = (e) => {
    gsap.to(e.currentTarget.querySelector('.floating-tag-inner'), {
      scale: 1.1,
      color: '#ff6b35', // Premium Orange
      duration: 0.3,
      ease: 'power2.out'
    });
  };

  const handleTagLeave = (e) => {
    gsap.to(e.currentTarget.querySelector('.floating-tag-inner'), {
      scale: 1,
      color: 'var(--text-primary)',
      duration: 0.4,
      ease: 'power2.out'
    });
  };

  return (
    <section ref={containerRef} className="hero-section" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', position: 'relative', backgroundColor: 'transparent' }}>
      
      {/* ==================== CENTERED HORIZONTAL TAGS ROW (Positioned above the name) ==================== */}
      {floatingTags.map((tag, i) => (
        <div 
          key={i} 
          className="floating-tag-outer" 
          onMouseEnter={handleTagEnter}
          onMouseLeave={handleTagLeave}
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
            {/* Minimal orange accent dot instead of boxes */}
            <span style={{ color: '#ff6b35', marginRight: '0.6rem', fontSize: '1.2rem', lineHeight: 1 }}>•</span>
            {tag.label}
          </div>
        </div>
      ))}

      {/* Massive Kinetic Typography */}
      <div style={{ textAlign: 'center', zIndex: 6 }}>
        <div className="hero-word-container" style={{ overflow: 'hidden', display: 'block', paddingTop: '0.4em', marginTop: '-0.4em', paddingBottom: '0.8em', marginBottom: '-0.8em' }}>
          <h1 ref={textRef1} className="text-serif hero-word hover-target" style={{ fontSize: 'clamp(4rem, 16vw, 18rem)', lineHeight: 0.8, margin: 0, textTransform: 'uppercase', color: 'var(--text-primary)', whiteSpace: 'nowrap' }}>
            {"BISHWAJIT".split('').map((char, index) => (
              <span 
                key={index} 
                className="name-char" 
                onMouseEnter={handleCharEnter}
                onMouseLeave={handleCharLeave}
                style={{ display: 'inline-block', cursor: 'default', willChange: 'transform, color' }}
              >
                {char}
              </span>
            ))}
          </h1>
        </div>
        <div className="hero-word-container" style={{ overflow: 'hidden', display: 'block', marginTop: 'calc(-2vw - 0.4em)', paddingTop: '0.4em', paddingBottom: '0.8em', marginBottom: '-0.8em' }}>
          <h1 ref={textRef2} className="text-serif hero-word hover-target" style={{ fontSize: 'clamp(4rem, 16vw, 18rem)', lineHeight: 0.8, margin: 0, textTransform: 'uppercase', color: 'var(--text-primary)', whiteSpace: 'nowrap', marginLeft: '10vw' }}>
            {"SHARMA".split('').map((char, index) => (
              <span 
                key={index} 
                className="name-char" 
                onMouseEnter={handleCharEnter}
                onMouseLeave={handleCharLeave}
                style={{ display: 'inline-block', cursor: 'default', willChange: 'transform, color' }}
              >
                {char}
              </span>
            ))}
            <span 
              className="name-char" 
              onMouseEnter={handleCharEnter}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, {
                  scale: 1,
                  y: 0,
                  color: '#ff6b35',
                  duration: 0.4,
                  ease: 'power2.out'
                });
              }}
              style={{ display: 'inline-block', cursor: 'default', color: '#ff6b35', willChange: 'transform, color' }}
            >
              .
            </span>
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

      {/* Center Void Scroll Indicator */}
      <div className="scroll-indicator" style={{ position: 'absolute', bottom: '4vh', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', zIndex: 6 }}>
         <span style={{ fontSize: '0.62rem', fontFamily: 'monospace', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Scroll to Explore</span>
         <div style={{ width: '20px', height: '32px', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '10px', position: 'relative', display: 'flex', justifyContent: 'center' }}>
            <div className="scroll-dot" style={{ width: '2px', height: '6px', backgroundColor: '#ff6b35', borderRadius: '1px', marginTop: '6px', willChange: 'transform, opacity' }}></div>
         </div>
      </div>

      <div className="hero-meta" style={{ position: 'absolute', bottom: '5vh', right: '5vw', textAlign: 'right', zIndex: 6 }}>
         <p style={{ fontSize: '0.75rem', letterSpacing: '0.2em', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Available for Work</p>
         <p style={{ fontSize: '0.75rem', letterSpacing: '0.2em', color: 'var(--text-secondary)', textTransform: 'uppercase', marginTop: '0.5rem' }}>Global / Remote</p>
         <div style={{ width: '1px', height: '40px', backgroundColor: 'rgba(255,255,255,0.2)', margin: '1rem 0 0 auto' }}></div>
      </div>
    </section>
  );
}
