import { useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projectDatabase = {
  '01': {
    title: 'Project Kaevrix',
    description: 'An AI-powered learning platform that organizes scattered educational content into structured, personalized learning journeys.',
    github: 'https://github.com/bishwajit-sharma101/kaevrix',
    tech: ['React.js', 'Next.js', 'Node.js', 'Express.js', 'MongoDB', 'Redis', 'BullMQ', 'Socket.IO', 'Gemini API', 'YouTube IFrame API', 'JWT Authentication', 'Autocannon'],
    problem: 'Modern online learners are overwhelmed by unlimited, fragmented information but lack a structured path to turn it into actual knowledge. Navigating across disjointed tutorials, videos, and articles leads to severe decision fatigue, passive content consumption, and poor long-term retention. Developers and students need an intelligent learning operating system that dynamically organizes uncurated content into personalized roadmaps, distraction-free study environments, and active recall memory retrieval loops.',
    features: [
      'Pathfinder AI Roadmap Generator: Generates personalized step-by-step progressions based on what users want to learn, why they are learning it, their daily study budget, and target depth.',
      'Sanctum Study Environment: A distraction-free dashboard combining selected educational videos with AI notes, summaries, focus tools, and interactive recall quizzes.',
      'Chronos Progress Engine: An intelligent progress analyzer tracking study consistency, learning speed, estimated completion dates, and overall demonstrated mastery via visual skill trees.',
      'Mastery Adjustments: Allows users to configure learning roadmaps between lightweight practical concepts and advanced edge cases based on custom mastery goals.',
      'Gamified Active Recall: Quizzes and exercises generated after every lesson to ensure active memory retrieval, complete with experience points and cooperative study spaces.'
    ],
    challenges: 'Structuring uncurated external educational feeds dynamically while auto-generating contextually accurate, non-trivial active recall quizzes and structured roadmap milestones in real-time.',
    learnings: 'I learned to design lightweight, non-blocking telemetry evaluation layers, moving core metrics from passive content consumption indicators to active retrieval tracking and retention analysis.'
  },
  '02': {
    title: 'Project Astrix',
    description: 'An AI-native messaging platform designed to facilitate fluid, context-aware multilingual communication.',
    github: 'https://github.com/bishwajit-sharma101/astrix',
    tech: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'WebSockets', 'OpenAI API', 'GSAP', 'Tailwind CSS'],
    problem: 'Traditional translation systems translate text sentence-by-sentence in isolation. This mechanical method completely loses conversational context, tone, slang, and cultural nuances, resulting in awkward phrasing. Multi-party conversations in separate languages quickly become disjointed and unnatural, highlighting the need for a chat engine that processes multi-turn dialogue holistically and integrates seamless context-aware translation.',
    features: [
      'Context-Aware Multilingual Messaging: Processes discussions as a whole to deliver translations that preserve emotional intent, sarcasm, and technical terminology.',
      'Text, Voice, and AI-Assisted Language Refinements: Refines incomplete sentences, corrects grammar mistakes, and formats tone without altering original intent before delivery.',
      'Integrated AI Sidebar Assistant: A contextually aware real-time conversation assistant that answers user queries, summarizes discussions, maps action items, and explains terms.',
      'Searchable Knowledge Space: Dynamic chat-history parsing allowing users to ask questions like "What did we decide yesterday?" or "When was the meeting mentioned?"'
    ],
    challenges: 'Maintaining low-latency message transmission pipelines while feeding multi-turn conversation states to large language model context windows for translation.',
    learnings: 'I mastered context optimization strategies by caching previous chat highlights and summaries, achieving fluent translation calls with minimal latency.'
  },
  '03': {
    title: 'Project Memoriant',
    description: 'A collaborative bookmark and resource management engine built to curate, organize, and securely share knowledge bases across the web.',
    github: 'https://github.com/bishwajit-sharma101/memoriant',
    live: 'https://memoriant.vercel.app/',
    tech: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Supabase', 'PostgreSQL', 'Vercel'],
    problem: 'Online readers and developers lose valuable articles, documentation, and code repositories in cluttered, unsynchronized browser bookmarks. Traditional bookmark tools lack granular privacy toggles, shareable public curation pages, and robust database-level security policies, creating isolated knowledge silos instead of open, structured resource libraries.',
    features: [
      'Private Vault Dashboard: A protected personal workspace to save bookmarks, add metadata, assign tags, and configure granular privacy toggles.',
      'Public Curator Profiles: Dynamic public curation feeds mapped to unique user handles, enabling developers, designers, and students to share resource sets.',
      'Supabase Secure Identity: Full secure user authentication pipelines featuring email verification, session persistence, and protected routing layers.',
      'Row Level Security (RLS): Strict database-level isolation policies enforcing tenant separation at the query layer rather than the application layer.',
      'Safe Input Sanitization: Multi-tier URL verification, protocol validation, and input sanitization to block malicious links and system exploits.'
    ],
    challenges: 'Resolving dashboard data isolation leak bugs by implementing strict row-level security (RLS) schemas in PostgreSQL, refining PostgREST response code exceptions (406 vs 409) for concurrent sign-up collisions, and debugging responsive layout overflows caused by complex 3D CSS components.',
    learnings: 'I mastered database-level security policy engineering using Supabase RLS and custom PostgreSQL schemas, and learned to write automated test runners for user handle uniqueness and cross-tenant data leakage validations.'
  }
};

export default function CaseStudy() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projectDatabase[id] || projectDatabase['01'];
  const containerRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    let ctx = gsap.context(() => {
      // 1. Initial Page Load Animation
      gsap.from('.case-hero-reveal', {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: 'power3.out'
      });

      // 2. Scroll-Triggered Section Reveals for Readability
      const sections = gsap.utils.toArray('.case-section');
      sections.forEach(section => {
        const line = section.querySelector('.section-line');
        const headerBlock = section.querySelector('.section-header-block');
        const contentBlock = section.querySelector('.section-content-block');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        });

        tl.fromTo(line, { scaleX: 0 }, { scaleX: 1, duration: 1, ease: 'power3.inOut' })
          .fromTo(headerBlock, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, '-=0.5')
          .fromTo(contentBlock, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, '-=0.6');
      });

    }, containerRef);
    
    return () => ctx.revert();
  }, [id, navigate]);

  return (
    <div ref={containerRef} style={{ position: 'relative', minHeight: '100vh', paddingTop: '12vh', paddingBottom: '15vh', backgroundColor: 'transparent', zIndex: 10 }}>
      <style>{`
        @media (max-width: 768px) {
          .case-slide {
            max-height: 85vh !important;
            overflow-y: auto !important;
            padding: 2rem 1rem !important;
          }
        }
      `}</style>
      
      {/* Top Controls */}
      <div className="case-hero-reveal" style={{ padding: '0 5vw', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '2rem', marginBottom: '6rem' }}>
        <Link to="/" className="hover-target" style={{ textDecoration: 'none', color: 'var(--text-secondary)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.15em', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          &larr; Back to Home
        </Link>
        <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-secondary)' }}>[CASE STUDY / {id}]</span>
      </div>

      {/* ==================== 1. BIG TEXT ==================== */}
      <div className="case-hero-reveal" style={{ padding: '0 5vw', width: '100%', marginBottom: '5rem' }}>
        <h1 className="text-serif" style={{ fontSize: 'clamp(4rem, 10vw, 10rem)', lineHeight: 0.9, margin: '0 0 2rem 0', color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '-0.02em' }}>
          {project.title}
        </h1>
        <p style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)', lineHeight: 1.6, color: 'var(--text-secondary)', fontWeight: 300, maxWidth: '900px', margin: 0 }}>
          {project.description}
        </p>
      </div>

      {/* ==================== 2. PROJECT LINKS ==================== */}
      <div className="case-hero-reveal" style={{ width: '90vw', maxWidth: '1800px', margin: '0 auto 1.5rem auto', display: 'flex', justifyContent: 'flex-end', gap: '2rem' }}>
        {project.live && (
          <a href={project.live} target="_blank" rel="noopener noreferrer" className="hover-target animate-link" style={{ color: '#ff6b35', textDecoration: 'none', borderBottom: '1px solid #ff6b35', paddingBottom: '0.25rem', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em' }}>
            Live Demo &rarr;
          </a>
        )}
        <a href={project.github} target="_blank" rel="noopener noreferrer" className="hover-target" style={{ color: 'var(--text-primary)', textDecoration: 'none', borderBottom: '1px solid var(--text-primary)', paddingBottom: '0.25rem', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em' }}>
          GitHub Repository &rarr;
        </a>
      </div>

      {/* ==================== 3. VIDEO PLAYER ==================== */}
      <div className="case-hero-reveal" style={{ width: '90vw', maxWidth: '1800px', margin: '0 auto 6rem auto' }}>
        <div style={{ 
          position: 'relative', 
          width: '100%', 
          aspectRatio: '16/9', 
          backgroundColor: '#0f0f11', 
          border: '1px solid rgba(255,255,255,0.1)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden'
        }}>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', backgroundImage: 'radial-gradient(circle, transparent 50%, rgba(0,0,0,0.4) 100%)', zIndex: 2 }} />
          
          {/* Animated Waveform Visualizer */}
          <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end', height: '80px', opacity: 0.15 }}>
            {[...Array(12)].map((_, i) => (
              <div key={i} style={{ 
                width: '6px', 
                height: `${20 + Math.random() * 60}px`, 
                backgroundColor: 'var(--text-primary)',
                animation: 'pulse 1.5s infinite ease-in-out',
                animationDelay: `${i * 0.1}s`
              }} />
            ))}
          </div>

          {/* Interactive Play Button */}
          <div className="hover-target" style={{ 
            position: 'absolute', 
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
            zIndex: 3, 
            cursor: 'none' 
          }}>
            <div style={{ 
              width: '80px', 
              height: '80px', 
              borderRadius: '50%', 
              border: '1px solid rgba(255,255,255,0.3)', 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center',
              backgroundColor: 'rgba(0,0,0,0.4)',
              backdropFilter: 'blur(5px)',
              transition: 'transform 0.3s ease, border-color 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.1)';
              e.currentTarget.style.borderColor = 'var(--text-primary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
            }}>
              <span style={{ fontSize: '1.5rem', marginLeft: '5px', color: 'var(--text-primary)' }}>&#9658;</span>
            </div>
            <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--text-secondary)' }}>Watch Demo Walkthrough</span>
          </div>

          {/* Video Control Bar */}
          <div style={{ 
            position: 'absolute', 
            bottom: 0, 
            left: 0, 
            width: '100%', 
            padding: '1.5rem 2rem', 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            zIndex: 3,
            borderTop: '1px solid rgba(255,255,255,0.05)',
            backgroundColor: 'rgba(10,10,10,0.9)',
            backdropFilter: 'blur(10px)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', width: '70%' }}>
              <span style={{ fontSize: '0.8rem', fontFamily: 'monospace', color: 'var(--text-secondary)' }}>LIVE</span>
              <div style={{ flex: 1, height: '2px', backgroundColor: 'rgba(255,255,255,0.1)', position: 'relative' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '35%', height: '100%', backgroundColor: 'var(--accent)' }} />
              </div>
            </div>
            <span style={{ fontSize: '0.8rem', fontFamily: 'monospace', color: 'var(--text-secondary)' }}>00:45 / 02:30</span>
          </div>
        </div>
      </div>

      {/* ==================== 3. TECH STACK MARQUEE ==================== */}
      <div style={{ width: '90vw', maxWidth: '1800px', margin: '0 auto 6rem auto' }}>
        <div className="case-hero-reveal" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '2rem 0', overflow: 'hidden' }}>
          <span style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-secondary)', marginBottom: '1.5rem', paddingLeft: '5vw' }}>Tech Stack</span>
          
          <div className="tech-marquee-container">
            <div className="tech-marquee-track">
              {/* Track 1 */}
              <div className="tech-marquee-content">
                {project.tech.map((t, index) => (
                  <span key={index} className="text-serif" style={{ fontSize: 'clamp(1.5rem, 3.5vw, 4rem)', color: 'var(--text-primary)' }}>
                    {t}
                  </span>
                ))}
              </div>
              {/* Track 2 (Duplicate for Seamless Loop) */}
              <div className="tech-marquee-content">
                {project.tech.map((t, index) => (
                  <span key={index} className="text-serif" style={{ fontSize: 'clamp(1.5rem, 3.5vw, 4rem)', color: 'var(--text-primary)' }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ==================== 4. ASYMMETRICAL EDITORIAL GRID (Recruiter-Scanner Layout) ==================== */}
      <div style={{ width: '90vw', maxWidth: '1800px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '5rem' }}>
        
        {/* Left Column: Context & Challenges */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5rem' }}>
          {/* The Problem */}
          <div className="case-section" style={{ position: 'relative', paddingTop: '3rem' }}>
            <div className="section-line" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '1px', background: 'linear-gradient(90deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 100%)', transformOrigin: 'left center' }}></div>
            <div className="section-header-block" style={{ marginBottom: '2rem' }}>
              <span style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>[01 / CONTEXT]</span>
              <h2 className="text-serif" style={{ fontSize: 'clamp(1.8rem, 2.5vw, 2.5rem)', margin: 0, color: 'var(--text-primary)', textTransform: 'uppercase' }}>The Problem</h2>
            </div>
            <div className="section-content-block">
              {project.problem.split('\n\n').map((paragraph, idx) => (
                <p 
                  key={idx} 
                  style={{ 
                    fontSize: idx === 0 ? '1.25rem' : '1.1rem', 
                    lineHeight: idx === 0 ? 1.7 : 1.8, 
                    color: idx === 0 ? 'var(--text-primary)' : 'rgba(255,255,255,0.6)', 
                    fontWeight: idx === 0 ? 400 : 300, 
                    margin: '0 0 1.5rem 0' 
                  }}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Challenges */}
          <div className="case-section" style={{ position: 'relative', paddingTop: '3rem' }}>
            <div className="section-line" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '1px', background: 'linear-gradient(90deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 100%)', transformOrigin: 'left center' }}></div>
            <div className="section-header-block" style={{ marginBottom: '2rem' }}>
              <span style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>[03 / RESOLUTION]</span>
              <h2 className="text-serif" style={{ fontSize: 'clamp(1.8rem, 2.5vw, 2.5rem)', margin: 0, color: 'var(--text-primary)', textTransform: 'uppercase' }}>Challenges</h2>
            </div>
            <div className="section-content-block">
              <div style={{
                position: 'relative',
                padding: '2.5rem',
                backgroundColor: 'rgba(255, 107, 53, 0.015)',
                border: '1px solid rgba(255, 107, 53, 0.08)',
                borderLeft: '4px solid #ff6b35'
              }}>
                <div style={{ position: 'absolute', top: -4, right: -4, color: 'rgba(255, 107, 53, 0.3)', fontFamily: 'monospace', fontSize: '0.65rem' }}>+</div>
                <div style={{ position: 'absolute', bottom: -6, right: -4, color: 'rgba(255, 107, 53, 0.3)', fontFamily: 'monospace', fontSize: '0.65rem' }}>+</div>
                <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.75)', fontWeight: 300, margin: 0 }}>
                  {project.challenges}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Execution & Summary */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5rem' }}>
          {/* Key Features */}
          <div className="case-section" style={{ position: 'relative', paddingTop: '3rem' }}>
            <div className="section-line" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '1px', background: 'linear-gradient(90deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 100%)', transformOrigin: 'left center' }}></div>
            <div className="section-header-block" style={{ marginBottom: '2rem' }}>
              <span style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>[02 / EXECUTION]</span>
              <h2 className="text-serif" style={{ fontSize: 'clamp(1.8rem, 2.5vw, 2.5rem)', margin: 0, color: 'var(--text-primary)', textTransform: 'uppercase' }}>Key Features</h2>
            </div>
            <div className="section-content-block" style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
              {project.features.map((feature, index) => {
                const parts = feature.split(': ');
                const title = parts[0];
                const desc = parts[1] || '';
                return (
                  <div key={index} className="feature-card hover-target" style={{ borderLeft: '2px solid #ff6b35', paddingLeft: '1.5rem', position: 'relative' }}>
                    <span style={{ fontSize: '0.7rem', fontFamily: 'monospace', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.3rem', letterSpacing: '0.1em' }}>[ FEATURE 0{index + 1} ]</span>
                    <h4 className="text-serif" style={{ fontSize: '1.25rem', margin: '0 0 0.5rem 0', color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.01em' }}>{title}</h4>
                    <p style={{ fontSize: '1.05rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.55)', fontWeight: 300, margin: 0 }}>{desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Learnings */}
          <div className="case-section" style={{ position: 'relative', paddingTop: '3rem' }}>
            <div className="section-line" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '1px', background: 'linear-gradient(90deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 100%)', transformOrigin: 'left center' }}></div>
            <div className="section-header-block" style={{ marginBottom: '2rem' }}>
              <span style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>[04 / SUMMARY]</span>
              <h2 className="text-serif" style={{ fontSize: 'clamp(1.8rem, 2.5vw, 2.5rem)', margin: 0, color: 'var(--text-primary)', textTransform: 'uppercase' }}>Learnings</h2>
            </div>
            <div className="section-content-block">
              <div style={{
                position: 'relative',
                padding: '2.5rem',
                backgroundColor: 'rgba(255, 255, 255, 0.01)',
                border: '1px solid rgba(255, 255, 255, 0.04)',
                borderLeft: '4px solid var(--text-primary)'
              }}>
                <div style={{ position: 'absolute', top: -4, right: -4, color: 'rgba(255, 255, 255, 0.15)', fontFamily: 'monospace', fontSize: '0.65rem' }}>+</div>
                <div style={{ position: 'absolute', bottom: -6, right: -4, color: 'rgba(255, 255, 255, 0.15)', fontFamily: 'monospace', fontSize: '0.65rem' }}>+</div>
                <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.75)', fontWeight: 300, margin: 0 }}>
                  {project.learnings}
                </p>
              </div>
            </div>
          </div>
        </div>
        
      </div>

    </div>
  );
}
