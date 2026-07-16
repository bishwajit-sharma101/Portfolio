import { useRef, useState, useEffect } from 'react';

// Contextual marquees for each project
const projectDetails = {
  '01': { text: "INTELLIGENT LEARNING PATHS • STRUCTURED KNOWLEDGE • KAEVRIX • ", color: "#ff944d", bgColor: "#1f0c00" },
  '02': { text: "CONTEXT-AWARE MULTILINGUAL CHAT • FLUID DIALOGUE • ASTRIX • ", color: "#66a3ff", bgColor: "#000f26" },
  '03': { text: "RESOURCE VAULT • SECURE KNOWLEDGE MANAGEMENT • MEMORIANT • ", color: "#ff4d88", bgColor: "#26000d" }
};

export default function PremiumProjectCard({ proj }) {
  const cardRef = useRef(null);
  const revealRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [smoothMouse, setSmoothMouse] = useState({ x: 0, y: 0 });

  // Smooth mouse interpolation for the mask
  useEffect(() => {
    let animationFrameId;
    const render = () => {
      setSmoothMouse((prev) => ({
        x: prev.x + (mousePos.x - prev.x) * 0.15,
        y: prev.y + (mousePos.y - prev.y) * 0.15,
      }));
      animationFrameId = requestAnimationFrame(render);
    };
    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, [mousePos]);

  // Attach event listeners to the parent .project-card so hovering text triggers box
  useEffect(() => {
    const parentCard = cardRef.current?.closest('.project-card');
    if (!parentCard) return;

    const handleParentMouseMove = (e) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    const handleParentMouseEnter = (e) => {
      setIsHovered(true);
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        const startX = e.clientX - rect.left;
        const startY = e.clientY - rect.top;
        setMousePos({ x: startX, y: startY });
        setSmoothMouse({ x: startX, y: startY });
      }
    };

    const handleParentMouseLeave = () => {
      setIsHovered(false);
    };

    parentCard.addEventListener('mousemove', handleParentMouseMove);
    parentCard.addEventListener('mouseenter', handleParentMouseEnter);
    parentCard.addEventListener('mouseleave', handleParentMouseLeave);

    return () => {
      parentCard.removeEventListener('mousemove', handleParentMouseMove);
      parentCard.removeEventListener('mouseenter', handleParentMouseEnter);
      parentCard.removeEventListener('mouseleave', handleParentMouseLeave);
    };
  }, []);

  const details = projectDetails[proj.id] || projectDetails['01'];

  return (
    <div
      ref={cardRef}
      className="premium-project-card"
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        backgroundColor: details.bgColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        cursor: 'none',
        borderRadius: '24px',
        border: '1px solid rgba(255,255,255,0.05)',
        transition: 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
        transform: isHovered ? 'scale(0.98)' : 'scale(1)',
      }}
    >
      {/* 1. Kinetic Scrolling Marquee Background - Always visible but toned down */}
      <div
        ref={revealRef}
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          overflow: 'hidden',
          pointerEvents: 'none',
          zIndex: 1,
          opacity: 1,
          transition: 'opacity 0.4s ease'
        }}
      >
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '2rem', 
          transform: `rotate(-10deg) scale(1.2)`,
          transition: 'transform 0.4s ease'
        }}>
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`kinetic-marquee ${i % 2 === 0 ? 'marquee-left' : 'marquee-right'} ${isHovered ? 'hover-speed' : ''}`}
              style={{
                display: 'flex',
                whiteSpace: 'nowrap',
                fontSize: 'clamp(3rem, 6vw, 6rem)',
                fontWeight: 900,
                color: details.color,
                textTransform: 'uppercase',
                lineHeight: 0.9,
                letterSpacing: '-0.02em',
                userSelect: 'none',
                opacity: isHovered ? 1.0 : 0.85,
                transition: 'opacity 0.4s ease'
              }}
            >
              <span>{details.text.repeat(10)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Mouse spotlight overlay on hover (color-matched to project) */}
      {isHovered && (
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(circle 200px at ${smoothMouse.x}px ${smoothMouse.y}px, ${details.color}25, transparent 80%)`,
            pointerEvents: 'none',
            zIndex: 3
          }}
        />
      )}

      {/* CSS Animations embedded directly for portability */}
      <style>{`
        @keyframes marqueeLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marqueeRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .marquee-left {
          animation: marqueeLeft 35s linear infinite;
        }
        .marquee-right {
          animation: marqueeRight 35s linear infinite;
        }
        .marquee-left.hover-speed {
          animation-duration: 12s;
        }
        .marquee-right.hover-speed {
          animation-duration: 12s;
        }
      `}</style>
    </div>
  );
}
