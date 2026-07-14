import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import PremiumProjectCard from './PremiumProjectCard';

export default function Projects() {
  const containerRef = useRef(null);
  const scrollRef = useRef(null);
  const navigate = useNavigate();
  
  // Passcode states
  const [showModal, setShowModal] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState(false);
  const inputRef = useRef(null);

  const projects = [
    { id: '01', title: "Project Kaevrix", desc: "AI-powered structured learning journeys.", protected: false },
    { id: '02', title: "Project Astrix", desc: "AI-native multilingual chat platform.", protected: false },
    { id: '03', title: "Project Memoriant", desc: "Experimental WebGL interactions.", protected: false },
    { id: '04', title: "Project Delta", desc: "NDA Restricted Commercial System.", protected: true }
  ];

  const sentences = [
    "I build products, not just websites.",
    "I use modern AI workflows to accelerate development,",
    "so I can spend more time solving complex problems,",
    "refining architecture, and delivering polished experiences."
  ];

  useEffect(() => {
    let ctx = gsap.context(() => {
      const chars = document.querySelectorAll('.reveal-char');
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 2, // Smooth, slow scrub
          snap: {
            snapTo: [0, 0.088, 0.177, 0.266, 0.5, 0.667, 0.833, 1.0],
            duration: 0.8,
            delay: 0.1,
            ease: 'power1.inOut'
          },
          start: 'top top',
          end: '+=1500%' // Expanded scroll distance for detailed step-by-step kinetic text
        }
      });
      
      // 1. Horizontal Scroll across the container using scrollWidth
      tl.to(scrollRef.current, {
        x: () => -(scrollRef.current.scrollWidth - window.innerWidth),
        ease: "none",
        duration: 4
      });
      
      // 2. Vertical stacked transition (like Frontend to Backend in About)
      tl.to('.projects-horizontal-wrapper', {
        y: '-100vh',
        opacity: 0,
        ease: "power2.inOut",
        duration: 1.5
      }, 4.5);
      
      tl.fromTo('.text-reveal-container', {
        y: '100vh',
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        pointerEvents: 'auto',
        ease: "power2.inOut",
        duration: 1.5
      }, 4.5);
      
      // Scrub reveal each character in a bouncy, squishy wave (stretch to squish)
      tl.to(chars, {
        y: '0%',
        scaleY: 1,
        scaleX: 1,
        duration: 0.28,
        stagger: 0.016,
        ease: 'back.out(2.5)'
      }, 6.0);

      // Localized subtle glow transitions behind the text paragraph
      tl.to('.glow-0', { opacity: 1, duration: 0.8, ease: 'power1.inOut' }, 6.0);
      
      tl.to('.glow-0', { opacity: 0, duration: 0.8, ease: 'power1.inOut' }, 6.8);
      tl.to('.glow-1', { opacity: 1, duration: 0.8, ease: 'power1.inOut' }, 6.8);
      
      tl.to('.glow-1', { opacity: 0, duration: 0.8, ease: 'power1.inOut' }, 7.6);
      tl.to('.glow-2', { opacity: 1, duration: 0.8, ease: 'power1.inOut' }, 7.6);
      
      tl.to('.glow-2', { opacity: 0, duration: 0.8, ease: 'power1.inOut' }, 8.4);
      tl.to('.glow-3', { opacity: 1, duration: 0.8, ease: 'power1.inOut' }, 8.4);
      
      tl.to('.glow-3', { opacity: 0, duration: 0.8, ease: 'power1.inOut' }, 9.2);
      
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  // Autofocus the hidden input when modal opens
  useEffect(() => {
    if (showModal) {
      inputRef.current?.focus();
    }
  }, [showModal]);

  const handleProjectClick = (proj, e) => {
    e.preventDefault();
    if (proj.protected) {
      // Check if already unlocked in this session
      if (sessionStorage.getItem('project_delta_unlocked') === 'true') {
        // Run shutter transition manually since we bypass global click intercept
        gsap.set('.transition-panel', { transformOrigin: 'top center' });
        const tl = gsap.timeline();
        tl.to('.transition-panel', {
          scaleY: 1,
          duration: 0.6,
          stagger: 0.05,
          ease: 'power3.inOut'
        });
        tl.call(() => {
          navigate(`/project/${proj.id}`);
        });
        tl.call(() => {
          gsap.set('.transition-panel', { transformOrigin: 'bottom center' });
        });
        tl.to('.transition-panel', {
          scaleY: 0,
          duration: 0.7,
          stagger: 0.05,
          ease: 'power3.inOut',
          delay: 0.15
        });
      } else {
        setShowModal(true);
      }
    } else {
      // Click intercept handles regular cards automatically
      // But we call navigate to trigger transitions properly via App.jsx global listener
      navigate(`/project/${proj.id}`);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 4);
    setPasscode(value);
    setError(false);

    if (value.length === 4) {
      if (value === '2026') {
        // Correct Passcode -> Trigger Cinematic Transition
        sessionStorage.setItem('project_delta_unlocked', 'true');
        
        const tl = gsap.timeline();
        
        // 1. Hide modal container first
        tl.to('.passcode-panel', {
          opacity: 0,
          y: -20,
          duration: 0.4
        });
        
        // 2. Animate shutter panels closed
        tl.call(() => {
          gsap.set('.transition-panel', { transformOrigin: 'top center' });
        });
        
        tl.to('.transition-panel', {
          scaleY: 1,
          duration: 0.6,
          stagger: 0.05,
          ease: 'power3.inOut'
        }, '-=0.2');
        
        // 3. Swap route under cover
        tl.call(() => {
          setShowModal(false);
          setPasscode('');
          navigate('/project/04');
        });
        
        // 4. Open shutter panels to reveal Project Delta Case Study
        tl.call(() => {
          gsap.set('.transition-panel', { transformOrigin: 'bottom center' });
        });
        
        tl.to('.transition-panel', {
          scaleY: 0,
          duration: 0.7,
          stagger: 0.05,
          ease: 'power3.inOut',
          delay: 0.15
        });
      } else {
        // Shake visualizer for failure
        setError(true);
        gsap.to('.passcode-dots-container', {
          x: 10,
          duration: 0.05,
          yoyo: true,
          repeat: 5,
          onComplete: () => {
            setPasscode('');
            setError(false);
          }
        });
      }
    }
  };

  return (
    <section ref={containerRef} className="projects-section" style={{ position: 'relative', overflow: 'hidden', height: '100vh' }}>
      
      {/* 1. Horizontal Scroll Phase (Artifact Cards) */}
      <div className="projects-horizontal-wrapper" style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div className="projects-header container">
          <h2 className="text-serif about-title">The Artifacts.</h2>
        </div>
        <div ref={scrollRef} className="projects-scroll-container" style={{ width: 'max-content', display: 'flex', gap: '12vw', padding: '0 max(5vw, calc((100vw - 1440px) / 2 + 72px))' }}>
          {projects.map((proj, i) => (
            <a 
              href={`/project/${proj.id}`} 
              key={i} 
              onClick={(e) => handleProjectClick(proj, e)} 
              className="project-card hover-target" 
              style={{ width: '1000px', maxWidth: '85vw', flexShrink: 0, textDecoration: 'none', color: 'inherit', position: 'relative' }}
            >
              {proj.protected && (
                <span style={{ position: 'absolute', top: '2rem', right: '2rem', fontSize: '0.75rem', fontFamily: 'monospace', letterSpacing: '0.1em', backgroundColor: 'rgba(255,255,255,0.05)', padding: '0.5rem 1rem', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-secondary)', zIndex: 10 }}>
                  [NDA LOCKED]
                </span>
              )}
              <div className="project-card-inner">
                <div className="project-image-placeholder">
                  <PremiumProjectCard proj={proj} />
                </div>
                <div className="project-info mt-2">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.5rem' }}>
                    <h3 className="text-serif project-title" style={{ margin: 0 }}>
                      {proj.title} {proj.protected && <span style={{ fontSize: '1rem', verticalAlign: 'middle', opacity: 0.5 }}>&#128274;</span>}
                    </h3>
                    <span className="text-serif" style={{ fontSize: '1.8rem', opacity: 0.3, fontWeight: 300 }}>{proj.id}</span>
                  </div>
                  <p className="project-desc">{proj.desc}</p>
                  <div className="project-case-study" style={{ marginTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem' }}>
                    <p style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-secondary)' }}>
                      {proj.protected ? 'Unlock Case Study \u2192' : 'View Case Study \u2192'}
                    </p>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* 2. Vertical Transition Phase (Text Reveal) */}
      <div className="text-reveal-container" style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, pointerEvents: 'none' }}>

        <div style={{ position: 'relative', width: '90%', maxWidth: '1000px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          
          {/* Localized Ambient glows sitting strictly behind the text block */}
          <div className="reveal-glow glow-0" style={{ position: 'absolute', width: '120%', height: '140%', top: '-20%', left: '-10%', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255, 148, 77, 0.16) 0%, rgba(0,0,0,0) 70%)', filter: 'blur(45px)', opacity: 0, pointerEvents: 'none', zIndex: 1 }} />
          <div className="reveal-glow glow-1" style={{ position: 'absolute', width: '120%', height: '140%', top: '-20%', left: '-10%', borderRadius: '50%', background: 'radial-gradient(circle, rgba(102, 163, 255, 0.16) 0%, rgba(0,0,0,0) 70%)', filter: 'blur(45px)', opacity: 0, pointerEvents: 'none', zIndex: 1 }} />
          <div className="reveal-glow glow-2" style={{ position: 'absolute', width: '120%', height: '140%', top: '-20%', left: '-10%', borderRadius: '50%', background: 'radial-gradient(circle, rgba(163, 102, 255, 0.16) 0%, rgba(0,0,0,0) 70%)', filter: 'blur(45px)', opacity: 0, pointerEvents: 'none', zIndex: 1 }} />
          <div className="reveal-glow glow-3" style={{ position: 'absolute', width: '120%', height: '140%', top: '-20%', left: '-10%', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255, 102, 178, 0.16) 0%, rgba(0,0,0,0) 70%)', filter: 'blur(45px)', opacity: 0, pointerEvents: 'none', zIndex: 1 }} />

          <p 
            className="reveal-paragraph"
            style={{ 
              margin: 0, 
              textAlign: 'left', 
              fontFamily: 'serif', 
              fontSize: 'clamp(1.8rem, 3.5vw, 3.5rem)', 
              lineHeight: 1.5, 
              color: '#ffffff', 
              fontWeight: 300,
              position: 'relative',
              zIndex: 2 // ensures text sits clearly in front of the glows
            }}
          >
            {sentences.join(' ').split(' ').map((word, wIdx) => (
              <span key={wIdx} style={{ display: 'inline-block', marginRight: '0.25em' }}>
                {word.split('').map((char, cIdx) => (
                  <span 
                    key={cIdx} 
                    style={{ 
                      display: 'inline-block', 
                      overflow: 'hidden',
                      verticalAlign: 'bottom',
                      lineHeight: 1.2,
                      paddingTop: '0.25em',    // Headroom for bouncy overshoot
                      paddingBottom: '0.15em', // Room for descenders & overshoot
                      marginTop: '-0.25em',
                      marginBottom: '-0.15em'
                    }}
                  >
                    <span 
                      className="reveal-char" 
                      style={{ 
                        display: 'inline-block',
                        transform: 'translateY(150%) scaleY(1.35) scaleX(0.75)',
                        transformOrigin: 'bottom center',
                        willChange: 'transform'
                      }}
                    >
                      {char}
                    </span>
                  </span>
                ))}
              </span>
            ))}
          </p>
        </div>
      </div>

      {/* ==================== PASSCODE VERIFICATION MODAL ==================== */}
      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(10,10,12,0.92)',
          backdropFilter: 'blur(15px)',
          zIndex: 1000,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'var(--text-primary)'
        }}>
          
          <div className="passcode-panel" style={{ textAlign: 'center', maxWidth: '400px', width: '100%', padding: '2rem' }}>
            <p style={{ fontSize: '0.8rem', fontFamily: 'monospace', letterSpacing: '0.2em', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '2rem' }}>
              &#128274; Protected Case Study
            </p>
            
            <h3 className="text-serif" style={{ fontSize: '2rem', margin: '0 0 1rem 0' }}>Enter Passcode</h3>
            
            <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--text-secondary)', fontWeight: 300, marginBottom: '3rem' }}>
              This work is subject to non-disclosure agreements. Enter code <strong style={{ color: 'var(--accent)' }}>2026</strong> to unlock.
            </p>

            {/* Hidden Input field */}
            <input 
              ref={inputRef}
              type="text" 
              value={passcode}
              onChange={handleInputChange}
              style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }} 
            />

            {/* Digit Visualizers */}
            <div className="passcode-dots-container" style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginBottom: '4rem', cursor: 'none' }} onClick={() => inputRef.current?.focus()}>
              {[...Array(4)].map((_, i) => {
                const filled = passcode.length > i;
                return (
                  <div key={i} style={{
                    width: '60px',
                    height: '60px',
                    border: error ? '1px solid #ff4a4a' : filled ? '1px solid var(--accent)' : '1px solid rgba(255,255,255,0.1)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(255,255,255,0.02)',
                    fontSize: '1.5rem',
                    fontFamily: 'monospace',
                    fontWeight: 'bold',
                    transition: 'border-color 0.2s ease'
                  }}>
                    {filled ? passcode[i] : '■'}
                  </div>
                );
              })}
            </div>

            <button 
              onClick={() => {
                setShowModal(false);
                setPasscode('');
              }} 
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-secondary)',
                fontSize: '0.8rem',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                cursor: 'none',
                textDecoration: 'underline',
                textUnderlineOffset: '4px'
              }}
              className="hover-target"
            >
              Cancel
            </button>
          </div>

        </div>
      )}
    </section>
  );
}
