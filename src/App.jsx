import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import SmoothScroll from './components/SmoothScroll';
import CustomCursor from './components/CustomCursor';
import Header from './components/Header';
import InteractiveCanvas from './components/InteractiveCanvas';
import Home from './pages/Home';
import CaseStudy from './pages/CaseStudy';
import './App.css';

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  // 1. Initial Page Load Reveal Shutter Transition
  useEffect(() => {
    gsap.set('.transition-panel', { scaleY: 1 });
    gsap.to('.transition-panel', {
      scaleY: 0,
      duration: 0.8,
      stagger: 0.05,
      ease: 'power3.inOut',
      transformOrigin: 'bottom center',
      delay: 0.2
    });
  }, []);

  // 2. Global Link Click Interceptor (Capture Phase to prevent router instant swap)
  useEffect(() => {
    const handleGlobalClick = (e) => {
      const anchor = e.target.closest('a');
      
      if (anchor && anchor.href && anchor.href.startsWith(window.location.origin)) {
        const path = anchor.getAttribute('href') || anchor.pathname;
        
        // Skip files, external links, or downloads
        if (path && !path.includes('.') && !anchor.hasAttribute('download')) {
          // Intercept navigation
          e.preventDefault();
          e.stopPropagation();

          // Play shutter close timeline
          const tl = gsap.timeline();
          
          gsap.set('.transition-panel', { transformOrigin: 'top center' });
          
          tl.to('.transition-panel', {
            scaleY: 1,
            duration: 0.6,
            stagger: 0.05,
            ease: 'power3.inOut'
          });
          
          tl.call(() => {
            // Navigate under the shutter cover
            navigate(path);
          });
          
          // Play shutter open timeline (revealing bottom-out)
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
        }
      }
    };

    // Setting useCapture = true ensures we capture links before react-router swaps views
    window.addEventListener('click', handleGlobalClick, true);
    return () => window.removeEventListener('click', handleGlobalClick, true);
  }, [navigate]);

  return (
    <>
      {/* 5-Column Cinematic Shutter Transition Panels */}
      {[...Array(5)].map((_, i) => (
        <div 
          key={i}
          className="transition-panel"
          style={{
            position: 'fixed',
            top: 0,
            left: `${i * 20}vw`,
            width: '20.5vw', // slight overlay prevents alignment pixel gaps
            height: '100vh',
            backgroundColor: '#0a0a0c', // matching background
            zIndex: 99999,
            pointerEvents: 'none',
            transform: 'scaleY(0)',
            transformOrigin: 'top center'
          }}
        />
      ))}

      {/* Global Film Grain Overlay */}
      <div className="grain-overlay"></div>
      
      {/* Interactive Particle Grid Background */}
      <InteractiveCanvas />
      
      <CustomCursor />
      {!location.pathname.startsWith('/project/') && <Header />}
      <SmoothScroll>
        <main className="app-container" style={{ position: 'relative', zIndex: 1 }}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/project/:id" element={<CaseStudy />} />
          </Routes>
        </main>
      </SmoothScroll>
    </>
  );
}

export default App;
