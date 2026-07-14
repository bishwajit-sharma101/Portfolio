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
    tech: ['React', 'Next.js', 'Go', 'PostgreSQL', 'Docker', 'OpenAI API', 'Tailwind CSS', 'Pathfinder', 'Sanctum', 'Chronos'],
    problem: `Kaevrix is an AI-powered learning platform designed to solve one of the biggest problems in modern education: people have access to unlimited information but struggle to turn that information into real knowledge. Today, students often jump between YouTube videos, articles, online courses, and notes without a clear direction, leading to confusion, inconsistent learning, and poor retention. Kaevrix addresses this by acting as an intelligent learning system rather than another content platform. Instead of creating educational videos itself, it organizes the world's existing educational content into structured, personalized learning journeys that guide users from beginner to mastery.\n\nThe experience begins with Pathfinder, Kaevrix's AI roadmap generator. Rather than asking users to search for hundreds of tutorials, Pathfinder understands what they want to learn, why they are learning it, how much time they can study each day, and what level of depth they want to achieve. Using this information, it generates a personalized roadmap that breaks a complex subject into manageable milestones. Whether someone wants to become a full-stack developer, prepare for technical interviews, learn mathematics, study history, or master a creative skill, Kaevrix creates a step-by-step progression that removes decision fatigue and gives learners a clear path forward.\n\nUnlike traditional learning platforms that often follow a one-size-fits-all approach, Kaevrix adapts to different learning goals through multiple mastery levels. Someone who only needs practical knowledge can choose a lightweight roadmap focused on the highest-impact concepts, while learners seeking complete expertise can follow a much deeper path that explores advanced topics, edge cases, implementation details, optimization techniques, and real-world applications. The objective is not simply to finish a course but to reach the level of understanding that matches the learner's personal goal.\n\nOnce a roadmap has been generated, learning takes place inside a distraction-free environment called Sanctum. Here, learners study using carefully selected educational videos while having access to AI-generated notes, summaries, study guides, focus tools, and other resources that help them stay engaged. However, Kaevrix does not consider watching a video as proof of learning. After every lesson, artificial intelligence generates quizzes and active recall exercises based specifically on the material that was just studied. This ensures that users retrieve information from memory rather than merely recognizing concepts, significantly improving long-term retention and understanding.\n\nAs learners continue progressing, Kaevrix continuously tracks their development through Chronos, an intelligent progress engine that analyzes consistency, learning speed, estimated completion dates, and overall mastery. Instead of simply displaying percentages, Chronos helps learners understand whether they are ahead or behind schedule and suggests realistic adjustments to their daily study routine. Every completed topic contributes to a visual skill tree, allowing users to see their knowledge expand over time instead of simply collecting certificates. Progress is represented through demonstrated understanding, completed milestones, and mastery of interconnected concepts rather than hours spent watching content.\n\nKaevrix also incorporates carefully designed game mechanics that encourage consistency without distracting from education. Learners earn experience points by completing meaningful activities such as quizzes, reviews, and roadmap milestones instead of passively consuming videos. Future social features, including collaborative study spaces and multiplayer learning experiences, aim to make education less isolating by allowing learners to motivate one another through shared challenges and cooperative learning rather than competition alone.\n\nUltimately, Kaevrix is built around the belief that learning should be an active process instead of passive content consumption. Its goal is to become an intelligent operating system for learning—one that helps people discover what to study, guides them through a structured path, verifies that they truly understand each concept, tracks their progress over time, and transforms scattered educational resources into a single, personalized journey toward genuine mastery. Instead of measuring success by how much content a learner has watched, Kaevrix measures success by how much knowledge they have actually retained and can confidently apply.`,
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
    problem: `Traditional translators process messages one sentence at a time, often losing context, tone, and intent, which can result in awkward or inaccurate translations. AstrixChat approaches translation differently by understanding the conversation as a whole. Instead of translating isolated messages, it continuously analyzes the surrounding context, previous exchanges, the relationship between participants, and the flow of the discussion to produce translations that better preserve meaning, emotion, and nuance. This contextual understanding allows the platform to distinguish between slang, idioms, sarcasm, technical terminology, and words with multiple meanings, generating translations that are significantly more natural than conventional machine translation.\n\nBeyond text translation, AstrixChat is designed to support seamless multilingual communication through text, voice, and AI-assisted messaging. Users can communicate in their native language while the platform automatically delivers messages in the recipient's preferred language, eliminating the need to manually translate or switch between external tools. AI also helps refine incomplete sentences, correct grammatical mistakes without altering intent, and ensure messages remain clear and easy to understand before they are delivered. By combining context-aware translation with intelligent language assistance, AstrixChat transforms multilingual conversations from a series of translated messages into a single, fluid dialogue where language becomes virtually invisible, allowing people to focus on the conversation rather than the act of translation itself. Alongside every conversation, AstrixChat includes an integrated AI sidebar that acts as a real-time conversational assistant rather than a separate chatbot. Instead of requiring users to copy and paste messages into another AI application, the assistant has contextual awareness of the current chat—with appropriate user permissions—and can help users understand, navigate, and interact with their conversations more effectively. Users can ask questions such as "What did we decide yesterday?", "Summarize the discussion", "What are the action items?", or "When did they mention the meeting?", and the AI instantly analyzes the conversation to provide accurate, context-aware responses.\n\nThe assistant can also explain messages, clarify misunderstandings, translate specific parts of the conversation, rewrite replies in different tones, generate response suggestions, and answer questions based on the information already shared in the chat. Because it understands the full conversational context rather than individual messages in isolation, it can resolve references, identify who said what, recognize ongoing topics, and provide answers that remain consistent with the discussion. Whether users need a quick summary of hundreds of messages, want to recall an important detail, or need help composing a thoughtful response, the AI sidebar transforms every conversation into an intelligent, searchable knowledge space while keeping the experience seamless and integrated within the chat itself.`,
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
    description: 'An experimental web interface analyzing distributed microservice architectures.',
    github: 'https://github.com/bishwajit-sharma101/memoriant',
    tech: ['Go', 'gRPC', 'GraphQL', 'AWS ECS', 'Terraform', 'Docker', 'Kubernetes', 'Jaeger Tracing', 'Envoy Proxy', 'Prometheus', 'Redis', 'GitHub Actions'],
    problem: 'Microservice tracking tools are often complex and hard to scan. Developers needed a clear, typographic-driven structural explorer that maps server endpoints and health metrics in real-time.',
    features: [
      'Real-time dependency graphs mapping gRPC traffic.',
      'GraphQL gateway aggregating metrics from five distinct mock services.',
      'Automated cloud deployment setup using infrastructure-as-code.'
    ],
    challenges: 'Setting up real-time telemetry pipelines across dockerized environments introduced significant processing overhead and metric delays.',
    learnings: 'I learned to design lightweight, non-blocking telemetry agents in Go, decreasing instrumentation overhead to less than 1.5% CPU utilization.'
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

      {/* ==================== 2. GITHUB LINK ==================== */}
      <div className="case-hero-reveal" style={{ width: '90vw', maxWidth: '1800px', margin: '0 auto 1.5rem auto', display: 'flex', justifyContent: 'flex-end' }}>
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
      <div style={{ width: '90vw', maxWidth: '1800px', margin: '0 auto 8rem auto' }}>
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

      {/* ==================== 4. ASYMMETRICAL EDITORIAL SECTIONS ==================== */}
      <div style={{ width: '90vw', maxWidth: '1800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '8rem' }}>
        
        {/* The Problem */}
        <div className="case-section" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', position: 'relative', paddingTop: '4rem' }}>
          <div className="section-line" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '1px', backgroundColor: 'rgba(255,255,255,0.05)', transformOrigin: 'left center' }}></div>
          
          {/* Left Column: Marker & Heading */}
          <div className="section-header-block">
            <span style={{ display: 'block', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>[01 / CONTEXT]</span>
            <h2 className="text-serif" style={{ fontSize: 'clamp(2rem, 3.5vw, 3.5rem)', margin: 0, color: 'var(--text-primary)', textTransform: 'uppercase' }}>The Problem</h2>
          </div>
          
          {/* Right Column: Paragraph */}
          <div className="section-content-block" style={{ maxWidth: '650px' }}>
            {project.problem.split('\n\n').map((paragraph, idx) => (
              <p key={idx} style={{ fontSize: '1.15rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.7)', fontWeight: 300, margin: '0 0 1.5rem 0' }}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="case-section" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', position: 'relative', paddingTop: '4rem' }}>
          <div className="section-line" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '1px', backgroundColor: 'rgba(255,255,255,0.05)', transformOrigin: 'left center' }}></div>
          
          {/* Left Column: Marker & Heading */}
          <div className="section-header-block">
            <span style={{ display: 'block', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>[02 / EXECUTION]</span>
            <h2 className="text-serif" style={{ fontSize: 'clamp(2rem, 3.5vw, 3.5rem)', margin: 0, color: 'var(--text-primary)', textTransform: 'uppercase' }}>Key Features</h2>
          </div>
          
          {/* Right Column: List */}
          <div className="section-content-block" style={{ maxWidth: '650px' }}>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingLeft: '1.5rem', color: 'rgba(255,255,255,0.7)', fontSize: '1.15rem', lineHeight: 1.6, fontWeight: 300, margin: 0 }}>
              {project.features.map((feature, index) => (
                <li key={index} style={{ paddingLeft: '0.5rem' }}>{feature}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Challenges */}
        <div className="case-section" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', position: 'relative', paddingTop: '4rem' }}>
          <div className="section-line" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '1px', backgroundColor: 'rgba(255,255,255,0.05)', transformOrigin: 'left center' }}></div>
          
          {/* Left Column: Marker & Heading */}
          <div className="section-header-block">
            <span style={{ display: 'block', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>[03 / RESOLUTION]</span>
            <h2 className="text-serif" style={{ fontSize: 'clamp(2rem, 3.5vw, 3.5rem)', margin: 0, color: 'var(--text-primary)', textTransform: 'uppercase' }}>Challenges</h2>
          </div>
          
          {/* Right Column: Paragraph */}
          <div className="section-content-block" style={{ maxWidth: '650px' }}>
            <p style={{ fontSize: '1.15rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.7)', fontWeight: 300, margin: 0 }}>
              {project.challenges}
            </p>
          </div>
        </div>

        {/* Learnings */}
        <div className="case-section" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', position: 'relative', paddingTop: '4rem' }}>
          <div className="section-line" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '1px', backgroundColor: 'rgba(255,255,255,0.05)', transformOrigin: 'left center' }}></div>
          
          {/* Left Column: Marker & Heading */}
          <div className="section-header-block">
            <span style={{ display: 'block', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>[04 / SUMMARY]</span>
            <h2 className="text-serif" style={{ fontSize: 'clamp(2rem, 3.5vw, 3.5rem)', margin: 0, color: 'var(--text-primary)', textTransform: 'uppercase' }}>Learnings</h2>
          </div>
          
          {/* Right Column: Paragraph */}
          <div className="section-content-block" style={{ maxWidth: '650px' }}>
            <p style={{ fontSize: '1.15rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.7)', fontWeight: 300, margin: 0 }}>
              {project.learnings}
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
