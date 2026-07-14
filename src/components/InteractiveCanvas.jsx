import { useEffect, useRef } from 'react';

export default function InteractiveCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Grid properties
    const spacing = 60; // distance between dots
    let dots = [];
    const mouse = { x: -1000, y: -1000, radius: 150 };
    let time = 0;
    let shockwave = { x: 0, y: 0, radius: 0, active: false };

    // Initialize grid of dots
    const initGrid = () => {
      dots = [];
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      
      const cols = Math.ceil(width / spacing) + 1;
      const rows = Math.ceil(height / spacing) + 1;

      for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
          dots.push({
            x: x * spacing,
            y: y * spacing,
            baseX: x * spacing,
            baseY: y * spacing,
            vx: 0,
            vy: 0
          });
        }
      }
    };

    // Animation Loop
    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.008; // Increment time for background wave

      if (shockwave.active) {
        shockwave.radius += 20; // propagation speed of the shockwave ring
        if (shockwave.radius > Math.max(width, height) * 1.3) {
          shockwave.active = false;
        }
      }

      dots.forEach((dot) => {
        // Slow organic background grid wave (Slight, subtle breathing sway)
        const waveX = Math.sin(time + dot.baseY * 0.004) * 6;
        const waveY = Math.cos(time + dot.baseX * 0.004) * 6;

        // Shockwave displacement calculations
        let swForceX = 0;
        let swForceY = 0;
        if (shockwave.active) {
          const sdx = dot.x - shockwave.x;
          const sdy = dot.y - shockwave.y;
          const sdist = Math.sqrt(sdx * sdx + sdy * sdy);
          
          const thickness = 120; // width of the shockwave ring
          if (sdist > shockwave.radius - thickness && sdist < shockwave.radius + thickness) {
            const power = (thickness - Math.abs(sdist - shockwave.radius)) / thickness;
            const angle = Math.atan2(sdy, sdx);
            
            // Push dots outward relative to shockwave origin
            swForceX = Math.cos(angle) * power * 35;
            swForceY = Math.sin(angle) * power * 35;
          }
        }

        // Calculate vector from mouse to dot
        const dx = dot.x - mouse.x;
        const dy = dot.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          // Push away force
          const force = (mouse.radius - dist) / mouse.radius;
          const angle = Math.atan2(dy, dx);
          
          // Target coordinate pushed away + wave + shockwave
          const targetX = dot.baseX + waveX + swForceX + Math.cos(angle) * force * 45;
          const targetY = dot.baseY + waveY + swForceY + Math.sin(angle) * force * 45;

          // Smooth interpolation towards pushed target
          dot.x += (targetX - dot.x) * 0.1;
          dot.y += (targetY - dot.y) * 0.1;
        } else {
          // Pull back to anchor coordinates + wave + shockwave
          const targetX = dot.baseX + waveX + swForceX;
          const targetY = dot.baseY + waveY + swForceY;

          dot.x += (targetX - dot.x) * 0.12;
          dot.y += (targetY - dot.y) * 0.12;
        }

        // Draw dot
        ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const handleResize = () => {
      initGrid();
    };

    const triggerShockwave = (x, y) => {
      shockwave.x = x;
      shockwave.y = y;
      shockwave.radius = 0;
      shockwave.active = true;
    };

    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      triggerShockwave(width / 2, height / 2);
    };

    const handleClick = (e) => {
      triggerShockwave(e.clientX, e.clientY);
    };

    initGrid();
    draw();

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('click', handleClick);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.8
      }}
    />
  );
}
