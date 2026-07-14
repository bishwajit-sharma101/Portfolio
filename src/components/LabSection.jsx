import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function LabSection() {
  const labRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.lab-item', {
        scrollTrigger: {
          trigger: labRef.current,
          start: 'top 70%',
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
      });
    }, labRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section ref={labRef} id="lab" className="lab-section section-padding" style={{ backgroundColor: 'transparent', position: 'relative', zIndex: 10 }}>
      <div className="container">
        <div className="projects-header">
          <h2 className="text-serif about-title">The Lab.</h2>
          <p className="about-desc">Experiments in UI, WebGL, and interaction design.</p>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
          {[1, 2, 3].map((item) => (
            <div key={item} className="lab-item" style={{ 
              aspectRatio: '4/3', 
              backgroundColor: 'rgba(255, 255, 255, 0.03)', 
              border: '1px solid rgba(255, 255, 255, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              transition: 'background-color 0.3s ease'
            }}>
              <h3 className="text-serif text-accent">Experiment {item}</h3>
              <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem', fontSize: '0.9rem' }}>WebGL Shader</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
