import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import PremiumProjectCard from './PremiumProjectCard';

export default function Projects() {
  const containerRef = useRef(null);
  const scrollRef = useRef(null);
  const navigate = useNavigate();
  
  const projects = [
    { id: '01', title: "Project Kaevrix", desc: "AI-powered structured learning journeys.", protected: false },
    { id: '02', title: "Project Astrix", desc: "AI-native multilingual chat platform.", protected: false },
    { id: '03', title: "Project Memoriant", desc: "Experimental WebGL interactions.", protected: false }
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
          // Snapping omitted for smooth kinetic horizontal scrolling flow
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

  const handleProjectClick = (proj, e) => {
    e.preventDefault();
    navigate(`/project/${proj.id}`);
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

      {/* Passcode modal removed along with Project Delta */}
    </section>
  );
}
