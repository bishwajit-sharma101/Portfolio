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

      // Pulse the key smash hint wtf indicator
      gsap.to('.key-hint', {
        opacity: 0.8,
        duration: 0.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      // Spawn funny arcade popup words on key press
      const spawnFunnyText = () => {
        const words = ['WTF!', 'BRRR!', 'OOF!', 'HACKED!', 'YEET!', 'BOOM!', 'ZAP!', 'BZZT!', 'BAM!', 'CLICK!', 'OOMPH!', 'HACK!', 'LOL!'];
        const randomWord = words[Math.floor(Math.random() * words.length)];
        
        const el = document.createElement('div');
        el.textContent = randomWord;
        el.style.position = 'fixed';
        
        // Position safely above the "BISHWAJIT" name block (top 8vh to 23vh)
        const rx = 20 + Math.random() * 60;
        const ry = 8 + Math.random() * 15;
        
        el.style.left = `${rx}vw`;
        el.style.top = `${ry}vh`;
        el.style.transform = 'translate(-50%, -50%)'; // Center aligning
        el.style.color = '#ff6b35';
        el.style.fontFamily = 'monospace';
        el.style.fontSize = 'clamp(2.5rem, 5vw, 4.5rem)'; // Huge, punchy arcade style text
        el.style.fontWeight = '900';
        el.style.letterSpacing = '0.05em';
        el.style.zIndex = '9999';
        el.style.pointerEvents = 'none';
        el.style.textShadow = '0 0 15px rgba(255, 107, 53, 0.6)';
        
        document.body.appendChild(el);
        
        gsap.fromTo(el,
          { scale: 0.5, rotation: -25 + Math.random() * 50, opacity: 0 },
          { 
            scale: 1.3, 
            y: -100, 
            opacity: 1, 
            duration: 0.65, 
            ease: 'back.out(2.2)',
            onComplete: () => {
              gsap.to(el, {
                opacity: 0,
                y: -150,
                duration: 0.25,
                onComplete: () => el.remove()
              });
            }
          }
        );
      };

      // 7. Keydown letter cascade wave
      const handleKeyDown = (e) => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
        
        // Spawn arcade popup
        spawnFunnyText();

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
      
      {/* ======================= MOBILE BENTO GRID (Hidden on Desktop) ======================= */}
      <div className="hero-mobile-wrapper">
        <style>{`
          .hero-mobile-wrapper {
            display: none;
          }
          .hero-desktop-wrapper {
            display: contents;
          }
          @media (max-width: 768px) {
            .hero-desktop-wrapper {
              display: none !important;
            }
            .hero-section {
              padding: 0 !important;
              justify-content: flex-start !important;
              align-items: stretch !important;
              display: block !important;
            }
            .hero-mobile-wrapper {
              display: flex;
              flex-direction: column;
              width: 100%;
              min-height: 100vh;
              padding: 12vh 6vw 6vh 6vw;
              box-sizing: border-box;
              background: transparent;
              position: relative;
              overflow: hidden;
            }
            
            .reveal-item {
              opacity: 0;
              animation: reveal-up 1.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            }
            
            @keyframes reveal-up {
              0% {
                transform: translateY(40px);
                opacity: 0;
              }
              100% {
                transform: translateY(0);
                opacity: 1;
              }
            }
            
            @keyframes marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            
            @keyframes stroke-glow {
              0% { -webkit-text-stroke-color: rgba(255,255,255,0.7); }
              50% { -webkit-text-stroke-color: rgba(255,107,53,0.9); }
              100% { -webkit-text-stroke-color: rgba(255,255,255,0.7); }
            }
            
            @keyframes pulse-soft {
              0% { transform: scale(1); opacity: 0.7; }
              100% { transform: scale(1.2); opacity: 1; }
            }

            @keyframes bounce-subtle {
              0% { transform: translateY(0); }
              100% { transform: translateY(-4px); }
            }
          }
        `}</style>

        {/* Ambient Marquee Background (Looping infinitely behind the text) */}
        <div style={{
          position: 'absolute',
          top: '30vh',
          left: 0,
          width: '100%',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          zIndex: 0,
          opacity: 0.04
        }}>
          <div style={{ display: 'inline-block', fontSize: '10vh', fontWeight: '900', textTransform: 'uppercase', color: 'transparent', WebkitTextStroke: '1px white', fontFamily: 'sans-serif', animation: 'marquee 25s linear infinite', paddingRight: '2rem' }}>
            CREATIVE ENGINEER • FULLSTACK DEVELOPER • PROBLEM SOLVER • UI ARCHITECT • 
          </div>
          <div style={{ display: 'inline-block', fontSize: '10vh', fontWeight: '900', textTransform: 'uppercase', color: 'transparent', WebkitTextStroke: '1px white', fontFamily: 'sans-serif', animation: 'marquee 25s linear infinite', paddingRight: '2rem' }}>
            CREATIVE ENGINEER • FULLSTACK DEVELOPER • PROBLEM SOLVER • UI ARCHITECT • 
          </div>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', zIndex: 1, position: 'relative' }}>
          
          <div style={{ overflow: 'hidden' }}>
            <h1 className="reveal-item" style={{ fontSize: 'clamp(3.5rem, 15vw, 5rem)', lineHeight: 0.9, margin: 0, color: 'white', textTransform: 'uppercase', fontFamily: 'serif', letterSpacing: '-0.02em', animationDelay: '0.3s' }}>
              Bishwajit
            </h1>
          </div>
          <div style={{ overflow: 'hidden', marginTop: '0.2rem' }}>
            <h1 className="reveal-item" style={{ fontSize: 'clamp(3.5rem, 15vw, 5rem)', lineHeight: 0.9, margin: 0, textTransform: 'uppercase', fontFamily: 'serif', letterSpacing: '-0.02em', animationDelay: '0.5s' }}>
              <span style={{ color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.7)', animation: 'stroke-glow 6s infinite ease-in-out' }}>Sharma.</span>
            </h1>
          </div>

          <h2 className="reveal-item" style={{ fontSize: '1.2rem', fontWeight: 500, marginTop: '2.5rem', color: 'var(--text-primary)', letterSpacing: '-0.02em', fontFamily: 'sans-serif', animationDelay: '0.7s' }}>
            Fullstack Developer
          </h2>
          
          <p className="reveal-item" style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.6)', marginTop: '0.8rem', maxWidth: '90%', fontFamily: 'sans-serif', animationDelay: '0.9s' }}>
            Building premium digital experiences with robust architectural logic and high-end aesthetic execution.
          </p>

          <div className="reveal-item" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '2.5rem', animationDelay: '1.1s' }}>
            {['DEV', 'ENGINEER', 'FULLSTACK', 'UI ARCHITECT'].map(tag => (
              <span key={tag} style={{ fontSize: '0.65rem', border: '1px solid rgba(255,255,255,0.2)', padding: '0.4rem 0.8rem', borderRadius: '20px', color: 'rgba(255,255,255,0.8)', letterSpacing: '0.1em', fontFamily: 'monospace' }}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="reveal-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem', marginTop: '3rem', zIndex: 1, position: 'relative', animationDelay: '1.3s' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ 
                fontSize: '0.65rem', 
                textTransform: 'uppercase', 
                letterSpacing: '0.12em', 
                color: '#ff6b35', 
                fontFamily: 'monospace',
                border: '1px solid rgba(255, 107, 53, 0.35)',
                padding: '2px 6px',
                borderRadius: '4px',
                display: 'inline-block'
              }}>
                Available for work
              </span>
            </div>
            <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em', display: 'block', marginTop: '6px', fontFamily: 'monospace', textTransform: 'uppercase' }}>Global / Remote</span>
          </div>
          <div style={{ fontSize: '0.65rem', letterSpacing: '0.2em', color: '#ff6b35', textTransform: 'uppercase', fontFamily: 'monospace', animation: 'bounce-subtle 1s infinite alternate ease-in-out' }}>
            Scroll ↓
          </div>
        </div>
      </div>

      {/* ======================= DESKTOP LAYOUT (Hidden on Mobile) ======================= */}
      <div className="hero-desktop-wrapper">
        <div className="floating-tags-container">
          {floatingTags.map((tag, i) => (
            <div 
              key={i} 
              className="floating-tag-outer" 
              onMouseEnter={handleTagEnter}
              onMouseLeave={handleTagLeave}
              style={{ 
                position: 'absolute', 
                top: '10vh',
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
                  color: 'var(--text-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  whiteSpace: 'nowrap',
                  willChange: 'transform, opacity'
                }}
              >
                <span style={{ color: '#ff6b35', marginRight: '0.6rem', fontSize: '1.2rem', lineHeight: 1 }}>•</span>
                {tag.label}
              </div>
            </div>
          ))}
        </div>

        <div className="hero-name-container" style={{ textAlign: 'center', zIndex: 6 }}>
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
          
          <div className="key-hint" style={{ marginTop: '2.5rem', fontFamily: 'monospace', fontSize: '0.75rem', letterSpacing: '0.2em', color: '#ff6b35', opacity: 0.5, textTransform: 'uppercase' }}>
            [ PRESS ANY KEY TO INTERACT ]
          </div>
        </div>

        <div className="hero-meta hero-meta-left" style={{ position: 'absolute', bottom: '5vh', left: '5vw', maxWidth: '350px', zIndex: 6 }}>
           <p style={{ fontSize: '0.9rem', lineHeight: 1.8, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
              <strong style={{ color: 'var(--text-primary)' }}>Fullstack Developer</strong> <br/> 
              Building premium digital experiences with robust architectural logic and high-end aesthetic execution.
           </p>
        </div>

        <div className="scroll-indicator hero-scroll-indicator" style={{ position: 'absolute', bottom: '4vh', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', zIndex: 6 }}>
           <span style={{ fontSize: '0.62rem', fontFamily: 'monospace', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Scroll to Explore</span>
           <div style={{ width: '20px', height: '32px', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '10px', position: 'relative', display: 'flex', justifyContent: 'center' }}>
              <div className="scroll-dot" style={{ width: '2px', height: '6px', backgroundColor: '#ff6b35', borderRadius: '1px', marginTop: '6px', willChange: 'transform, opacity' }}></div>
           </div>
        </div>

        <div className="hero-meta hero-meta-right" style={{ position: 'absolute', bottom: '5vh', right: '5vw', textAlign: 'right', zIndex: 6 }}>
           <p style={{ fontSize: '0.75rem', letterSpacing: '0.2em', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Available for Work</p>
           <p style={{ fontSize: '0.75rem', letterSpacing: '0.2em', color: 'var(--text-secondary)', textTransform: 'uppercase', marginTop: '0.5rem' }}>Global / Remote</p>
           <div className="hero-meta-line" style={{ width: '1px', height: '40px', backgroundColor: 'rgba(255,255,255,0.2)', margin: '1rem 0 0 auto' }}></div>
        </div>
      </div>
    </section>
  );
}
