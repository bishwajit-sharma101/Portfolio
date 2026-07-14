import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    
    // Set initial position off-screen
    gsap.set(cursor, { x: -100, y: -100 });

    const onMouseMove = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3, // Slightly trailing for elegance
        ease: "power3.out"
      });
    };

    const onMouseEnterLink = () => {
      gsap.to(cursor, {
        scale: 3,
        duration: 0.3,
        ease: "power3.out"
      });
    };

    const onMouseLeaveLink = () => {
      gsap.to(cursor, {
        scale: 1,
        duration: 0.3,
        ease: "power3.out"
      });
    };

    window.addEventListener('mousemove', onMouseMove);
    
    // Attach hover effects to all links and interactive elements
    const links = document.querySelectorAll('a, button, .hover-target');
    links.forEach(link => {
      link.addEventListener('mouseenter', onMouseEnterLink);
      link.addEventListener('mouseleave', onMouseLeaveLink);
    });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      links.forEach(link => {
        link.removeEventListener('mouseenter', onMouseEnterLink);
        link.removeEventListener('mouseleave', onMouseLeaveLink);
      });
    };
  }, []);

  return (
    <div 
      ref={cursorRef} 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '30px',
        height: '30px',
        backgroundColor: '#ffffff',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 9999,
        mixBlendMode: 'difference',
        transform: 'translate(-50%, -50%)',
        willChange: 'transform'
      }}
    />
  );
}
