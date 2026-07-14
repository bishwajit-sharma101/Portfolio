import { FaRegFileAlt } from 'react-icons/fa';

export default function Header() {
  return (
    <>
      {/* Header Overlay */}
      <header style={{ position: 'absolute', top: 0, left: 0, width: '100%', pointerEvents: 'none', zIndex: 100, display: 'flex', flexDirection: 'column', padding: '2rem 5vw' }}>
        
        {/* Top Header Row */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', pointerEvents: 'auto', width: '100%' }}>
          
          {/* Resume Download Action */}
          <a 
            href="/resume.pdf" 
            download 
            className="hover-target resume-header-link" 
            style={{ 
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              textDecoration: 'none', 
              color: 'var(--text-primary)', 
              textTransform: 'uppercase', 
              letterSpacing: '0.15em', 
              fontSize: '0.85rem', 
              padding: '0.5rem 1rem', 
              transition: 'all 0.3s ease'
            }}
          >
            <div className="resume-text-reveal" style={{ position: 'relative', overflow: 'hidden', height: '1.2rem', display: 'block' }}>
              <div className="resume-text-inner" style={{ transition: 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)' }}>
                <span style={{ display: 'block', height: '1.2rem', color: 'var(--text-primary)' }}>Resume</span>
                <span style={{ display: 'block', height: '1.2rem', color: 'var(--accent)' }}>Resume</span>
              </div>
            </div>
            <FaRegFileAlt className="resume-icon" style={{ fontSize: '0.95rem', transition: 'transform 0.3s ease' }} />
          </a>
        </div>

      </header>
    </>
  );
}
