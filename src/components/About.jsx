import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { 
  SiReact, SiNextdotjs, SiTypescript, SiGreensock, SiRedux, SiVite, SiHtml5, SiCss, SiTailwindcss, SiJavascript, SiSass, SiThreedotjs,
  SiNodedotjs, SiGo, SiPostgresql, SiGraphql, SiRedis, SiExpress, SiMongodb, SiPython, SiRust, SiPrisma, SiFirebase,
  SiGooglecloud, SiDocker, SiKubernetes, SiTerraform, SiServerless, SiGithubactions, SiLinux, SiNginx, SiVercel, SiNetlify, SiCloudflare
} from 'react-icons/si';
import { FaAws } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const techCategories = [
  {
    title: 'Frontend',
    description: 'Crafting immersive, interactive web experiences. I build fluid, highly optimized interfaces with clean semantic structure, custom motion systems, and refined typography.',
    icons: [
      { Icon: SiReact, name: 'React', tooltip: 'Component Architecture • Hooks', featured: true },
      { Icon: SiNextdotjs, name: 'Next.js', tooltip: 'SSR • App Router • Server Actions', featured: true },
      { Icon: SiTypescript, name: 'TypeScript', tooltip: 'Type-Safe Scalability', featured: true },
      { Icon: SiGreensock, name: 'GSAP', tooltip: 'High-Performance Motion Systems', featured: true },
      { Icon: SiRedux, name: 'Redux', tooltip: 'Global State Engines', featured: false },
      { Icon: SiVite, name: 'Vite', tooltip: 'Fast ESM Build Tooling', featured: false },
      { Icon: SiHtml5, name: 'HTML5', tooltip: 'Semantic Web Architecture', featured: false },
      { Icon: SiCss, name: 'CSS3', tooltip: 'Custom Layout Systems • Flex/Grid', featured: false },
      { Icon: SiTailwindcss, name: 'Tailwind', tooltip: 'Utility-First Styling Design', featured: false },
      { Icon: SiJavascript, name: 'JavaScript', tooltip: 'Modern ES6+ Logic Engine', featured: true },
      { Icon: SiSass, name: 'Sass', tooltip: 'Modular CSS Preprocessing', featured: false },
      { Icon: SiThreedotjs, name: 'Three.js', tooltip: 'WebGL Shaders • 3D Mathematics', featured: true }
    ]
  },
  {
    title: 'Backend',
    description: 'Architecting robust, transactional engines. I specialize in designing scalable RESTful & GraphQL APIs, microservices, high-performance database schemas, and caching layers.',
    icons: [
      { Icon: SiNodedotjs, name: 'Node.js', tooltip: 'Event-Driven Async Runtime', featured: true },
      { Icon: SiGo, name: 'Go', tooltip: 'Highly Concurrent Microservices', featured: true },
      { Icon: SiPostgresql, name: 'PostgreSQL', tooltip: 'Relational Database Engine', featured: true },
      { Icon: SiGraphql, name: 'GraphQL', tooltip: 'Flexible Schema Query Layer', featured: true },
      { Icon: SiRedis, name: 'Redis', tooltip: 'Distributed Caching • Queues', featured: false },
      { Icon: SiExpress, name: 'Express', tooltip: 'Minimalist API Router', featured: false },
      { Icon: SiMongodb, name: 'MongoDB', tooltip: 'Document Store Store', featured: false },
      { Icon: SiPython, name: 'Python', tooltip: 'Data Science & Automation', featured: false },
      { Icon: SiRust, name: 'Rust', tooltip: 'Systems Speed & Memory Safety', featured: true },
      { Icon: SiPrisma, name: 'Prisma', tooltip: 'Type-Safe Database ORM Client', featured: false },
      { Icon: SiTypescript, name: 'TypeScript', tooltip: 'Backend Typings & Contracts', featured: true },
      { Icon: SiFirebase, name: 'Firebase', tooltip: 'Serverless Real-time Sync', featured: false }
    ]
  },
  {
    title: 'Infrastructure',
    description: 'Automating cloud ecosystems. I structure clean CI/CD pipelines, containerized environments, cloud-native orchestration platforms, and repeatable infrastructure-as-code.',
    icons: [
      { Icon: FaAws, name: 'AWS', tooltip: 'EC2 • S3 • RDS Cloud Hosting', featured: true },
      { Icon: SiGooglecloud, name: 'GCP', tooltip: 'Cloud Computing • BigQuery', featured: false },
      { Icon: SiDocker, name: 'Docker', tooltip: 'Isolated Container Sandbox', featured: true },
      { Icon: SiKubernetes, name: 'Kubernetes', tooltip: 'Container Orchestration & Clusters', featured: true },
      { Icon: SiTerraform, name: 'Terraform', tooltip: 'Declarative Infrastructure-as-Code', featured: true },
      { Icon: SiServerless, name: 'Serverless', tooltip: 'FaaS & API Lambda Routing', featured: false },
      { Icon: SiGithubactions, name: 'GitHub Actions', tooltip: 'Automated CI/CD Workflows', featured: true },
      { Icon: SiLinux, name: 'Linux', tooltip: 'POSIX Systems & Bash Scripting', featured: false },
      { Icon: SiNginx, name: 'Nginx', tooltip: 'Reverse Proxy & Load Balancing', featured: false },
      { Icon: SiVercel, name: 'Vercel', tooltip: 'Edge Distribution Network', featured: false },
      { Icon: SiNetlify, name: 'Netlify', tooltip: 'Serverless Web App Hosting', featured: false },
      { Icon: SiCloudflare, name: 'Cloudflare', tooltip: 'DNS Security & Edge CDN', featured: true }
    ]
  }
];

const introBackgroundIcons = [
  { Icon: SiReact, x: '8%', y: '15%' },
  { Icon: SiNextdotjs, x: '25%', y: '12%' },
  { Icon: SiTypescript, x: '12%', y: '35%' },
  { Icon: SiGreensock, x: '28%', y: '40%' },
  { Icon: SiNodedotjs, x: '78%', y: '18%' },
  { Icon: SiGo, x: '90%', y: '25%' },
  { Icon: SiRust, x: '74%', y: '42%' },
  { Icon: SiDocker, x: '88%', y: '48%' },
  { Icon: SiKubernetes, x: '70%', y: '68%' },
  { Icon: SiTerraform, x: '85%', y: '72%' },
  { Icon: FaAws, x: '75%', y: '88%' },
  { Icon: SiCloudflare, x: '90%', y: '88%' },
  { Icon: SiThreedotjs, x: '48%', y: '15%' },
  { Icon: SiJavascript, x: '52%', y: '48%' },
  { Icon: SiPython, x: '42%', y: '32%' },
  { Icon: SiGraphql, x: '58%', y: '28%' },
  { Icon: SiHtml5, x: '38%', y: '58%' },
  { Icon: SiNginx, x: '62%', y: '64%' }
];

const introBackgroundLinks = [
  { from: 0, to: 1 },
  { from: 0, to: 2 },
  { from: 1, to: 12 },
  { from: 2, to: 3 },
  { from: 3, to: 13 },
  { from: 12, to: 13 },
  { from: 13, to: 14 },
  { from: 13, to: 15 },
  { from: 13, to: 16 },
  { from: 13, to: 17 },
  { from: 14, to: 4 },
  { from: 15, to: 4 },
  { from: 15, to: 6 },
  { from: 16, to: 8 },
  { from: 17, to: 8 },
  { from: 17, to: 9 },
  { from: 4, to: 5 },
  { from: 4, to: 6 },
  { from: 6, to: 7 },
  { from: 7, to: 10 },
  { from: 8, to: 9 },
  { from: 9, to: 10 },
  { from: 10, to: 11 }
];

export default function About() {
  const sectionRef = useRef(null);
  const capSectionRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      
      // 1. Page load fade-in for Story elements
      gsap.from('.story-wrapper .about-text-reveal', {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
      });

      // Unified float wiggle for the background constellation group inside the stack intro
      gsap.to('.intro-constellation-group', {
        y: '-=25',
        x: '+=15',
        rotation: 0.8,
        duration: 9,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      // Synapse lighting loop: periodically select 1 or 2 background icons, light them up, and fade back
      const triggerSynapse = () => {
        const icons = gsap.utils.toArray('.intro-bg-icon');
        if (icons.length === 0) return;

        // Choose 3 or 4 random indices, sometimes 2
        const randVal = Math.random();
        const count = randVal < 0.15 ? 2 : randVal < 0.65 ? 3 : 4;
        const selected = [];
        while (selected.length < count) {
          const randIdx = Math.floor(Math.random() * icons.length);
          if (!selected.includes(randIdx)) {
            selected.push(randIdx);
          }
        }

        selected.forEach((idx) => {
          const icon = icons[idx];
          const color = Math.random() > 0.5 ? '#ff6b00' : '#ffffff';
          const glow = color === '#ff6b00' ? 'rgba(255, 107, 0, 0.75)' : 'rgba(255, 255, 255, 0.45)';

          gsap.timeline()
            .to(icon, {
              color: color,
              textShadow: `0 0 16px ${glow}`,
              scale: 1.2,
              duration: 0.5,
              ease: 'power2.out'
            })
            .to(icon, {
              color: 'rgba(255, 255, 255, 0.075)',
              textShadow: '0 0 0px rgba(0,0,0,0)',
              scale: 1,
              duration: 1.5,
              ease: 'power2.inOut',
              delay: 0.8
            });
        });

        // Trigger next synapse in 2.2s - 4s
        gsap.delayedCall(2.2 + Math.random() * 1.8, triggerSynapse);
      };

      // Firing synapses starts after 1.5s
      gsap.delayedCall(1.5, triggerSynapse);

      // 2. Slow continuous independent float for icons
      const iconInners = gsap.utils.toArray('.tech-icon-inner');
      iconInners.forEach((inner, i) => {
        gsap.to(inner, {
          y: `-=${10 + Math.random() * 15}`,
          x: `+=${(Math.random() - 0.5) * 15}`,
          rotation: (Math.random() - 0.5) * 20,
          duration: 3 + Math.random() * 3,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: Math.random() * 2
        });
      });

      // 3. Pin Capabilities Section and Gravity Float Sequences
      const mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: capSectionRef.current,
          pin: true,
          start: 'top top',
          end: '+=600%', 
          scrub: 1.5,
        }
      });

      const isMobile = window.innerWidth < 768;
      const excludeWidth = isMobile ? 90 : 45; // vw exclusion for text block
      const excludeHeight = isMobile ? 50 : 55; // vh exclusion for text block

      // --- PHASE 0: STORY EXIT & INTRO ENTER ---
      mainTl.to('.story-wrapper', {
        y: '-80vh',
        opacity: 0,
        duration: 0.55,
        ease: 'power3.in'
      }, 0);

      // Set initial hidden state for intro block elements to enter cleanly
      gsap.set('.tech-intro-text-block', { opacity: 0, y: '80vh' });
      gsap.set('.intro-constellation-outer', { opacity: 0, y: '80vh' });

      mainTl.to('.intro-constellation-outer', {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out'
      }, 0.4);

      mainTl.to('.tech-intro-text-block', {
        opacity: 1,
        y: 0,
        duration: 0.55,
        ease: 'power3.out'
      }, 0.5);

      // --- PHASE 1: INTRO EXIT & FRONTEND ENTER ---
      mainTl.to('.tech-intro-wrapper', {
        y: '-80vh',
        opacity: 0,
        duration: 0.55,
        ease: 'power3.in'
      }, 1.5);

      // --- PHASES 1, 2, 3: TECH CATEGORIES ---
      techCategories.forEach((cat, index) => {
        const startTime = index + 2;
        const outStart = (index + 2) + 0.65;

        // --- BOTTOM LEFT TEXT EDITORIAL ANIMATION ---
        mainTl.fromTo(`.tech-info-${index}`, 
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' },
          startTime
        );
        mainTl.to(`.tech-info-${index}`,
          { opacity: 0, y: -30, duration: 0.35, ease: 'power2.in' },
          outStart
        );

        // --- FULLSCREEN GRAVITY ICONS ANIMATION ---
        // Deterministic placement to completely avoid overlapping (12 positions)
        const desktopPositions = [
          { x: 8, y: 15 }, { x: 30, y: 10 }, { x: 55, y: 18 }, { x: 82, y: 12 },
          { x: 15, y: 45 }, { x: 42, y: 38 }, { x: 68, y: 45 }, { x: 88, y: 38 },
          { x: 50, y: 75 }, { x: 70, y: 82 }, { x: 92, y: 72 }, { x: 60, y: 60 } // avoiding bottom-left
        ];
        
        const mobilePositions = [
          { x: 10, y: 5 }, { x: 40, y: 8 }, { x: 70, y: 5 }, { x: 90, y: 12 },
          { x: 20, y: 25 }, { x: 55, y: 22 }, { x: 85, y: 28 }, { x: 15, y: 45 },
          { x: 45, y: 40 }, { x: 75, y: 45 }, { x: 30, y: 58 }, { x: 65, y: 55 } // top 60% of screen only
        ];

        const positions = isMobile ? mobilePositions : desktopPositions;

        cat.icons.forEach(({ Icon, featured }, i) => {
          const iconEl = `.tech-icon-${index}-${i}`;
          
          const pos = positions[i % positions.length];
          // Add a tiny bit of random jitter so it doesn't look completely rigid, but keep it small to prevent overlaps
          const scatteredX = `${pos.x + (Math.random() * 3 - 1.5)}vw`;
          const scatteredY = `${pos.y + (Math.random() * 3 - 1.5)}vh`;
          
          // Visual hierarchy: Featured icons are slightly larger and brighter
          const randomScale = featured 
            ? 1.15 + Math.random() * 0.45 // 1.15 to 1.6 scale
            : 0.8 + Math.random() * 0.35; // 0.8 to 1.15 scale
            
          const randomOpacity = featured 
            ? 0.9 + Math.random() * 0.1 // 0.9 to 1.0 opacity
            : 0.5 + Math.random() * 0.15; // 0.5 to 0.65 opacity
            
          const randomRotation = (Math.random() - 0.5) * 45;

          // ENTRY: Gravity Rise from bottom
          mainTl.fromTo(iconEl,
            { x: scatteredX, y: '120vh', rotation: randomRotation - 30, scale: randomScale * 0.5, opacity: 0 },
            { 
              y: scatteredY, 
              rotation: randomRotation, 
              scale: randomScale, 
              opacity: randomOpacity, 
              duration: 0.35, 
              ease: 'back.out(1.2)' 
            },
            startTime + (Math.random() * 0.15) // randomized stagger for organic bubble effect
          );

          // EXIT: Float away to top
          mainTl.to(iconEl,
            { 
              y: '-30vh', 
              rotation: randomRotation + 30, 
              scale: randomScale * 0.5, 
              opacity: 0, 
              duration: 0.35, 
              ease: 'power2.in' 
            },
            outStart + (Math.random() * 0.15)
          );
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} style={{ backgroundColor: 'transparent' }}>
      
      {/* ==================== FULLSCREEN PINNED CONTAINER ==================== */}
      <section 
        ref={capSectionRef} 
        style={{ 
          height: '100vh', 
          width: '100vw', 
          position: 'relative', 
          overflow: 'hidden', 
          backgroundColor: 'transparent'
        }}
      >
        {/* ==================== STAGE 0: THE STORY & GOALS ==================== */}
        <div 
          className="story-wrapper" 
          style={{ 
            position: 'absolute', 
            inset: 0, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            zIndex: 50,
            pointerEvents: 'auto',
            willChange: 'transform, opacity'
          }}
        >
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '6rem' }}>
              
              {/* Left: The Story */}
              <div className="about-text-reveal">
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '2rem', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-secondary)' }}>
                   <span>[01 / PROFILE]</span>
                </div>
                <h2 className="text-serif" style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)', lineHeight: 1.1, margin: '0 0 2rem 0' }}>The Story.</h2>
                <p style={{ fontSize: '1.15rem', lineHeight: 1.8, color: 'var(--text-secondary)', fontWeight: 300 }}>
                  I started my engineering journey with a deep curiosity for how complex systems operate under the hood. Over the years, that curiosity evolved into a career building fullstack applications. I believe software should not just be architecturally sound—it should be visually compelling and responsive.
                </p>
                <p style={{ fontSize: '1.15rem', lineHeight: 1.8, color: 'var(--text-secondary)', fontWeight: 300, marginTop: '1.5rem' }}>
                  I focus heavily on performance optimization, bridging backend infrastructure with fluid frontend design systems, and ensuring every line of code serves a product goal.
                </p>
              </div>

              {/* Right: Interests & Career Goals */}
              <div className="about-text-reveal" style={{ display: 'flex', flexDirection: 'column', gap: '3rem', justifyContent: 'center' }}>
                <div>
                  <h3 className="text-serif text-accent" style={{ fontSize: '1.8rem', margin: '0 0 0.75rem 0' }}>Interests</h3>
                  <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--text-secondary)', fontWeight: 300, margin: 0 }}>
                    Creative computing, real-time database syncing, motion design systems, open-source developer tooling, and building accessible products that run fast on low-bandwidth networks.
                  </p>
                </div>

                <div>
                  <h3 className="text-serif text-accent" style={{ fontSize: '1.8rem', margin: '0 0 0.75rem 0' }}>Career Goals</h3>
                  <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--text-secondary)', fontWeight: 300, margin: 0 }}>
                    To lead technical architecture for product-led engineering teams, design highly scalable core infrastructure, and continuously push the visual standards of what web interfaces can achieve.
                  </p>
                </div>
              </div>
   
            </div>
          </div>
        </div>
        {/* Top Left Label */}
        <div 
          style={{ 
            position: 'absolute', 
            top: '5vh', 
            left: '5vw', 
            fontSize: '0.8rem', 
            textTransform: 'uppercase', 
            letterSpacing: '0.15em', 
            color: 'var(--text-secondary)',
            zIndex: 30
          }}
        >
          [02 / CAPABILITIES]
        </div>

        {/* --- PHASE 0: AWESOME INTRO TITLE CARD --- */}
        <div 
          className="tech-intro-wrapper" 
          style={{ 
            position: 'absolute', 
            inset: 0, 
            zIndex: 40, 
            pointerEvents: 'none' 
          }}
        >
            {/* Outer wrapper for ScrollTrigger entrance (resolves animation conflict) */}
            <div className="intro-constellation-outer" style={{ position: 'absolute', inset: 0, zIndex: -2, pointerEvents: 'none', willChange: 'transform, opacity' }}>
              {/* Inner wrapper for continuous wiggle float */}
              <div className="intro-constellation-group" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', willChange: 'transform' }}>
             
             {/* Blueprint SVG Network Grid Floor & Connecting Links */}
             <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
               {/* Ambient Radar grid guides in background */}
               <circle cx="65%" cy="45%" r="140" fill="none" stroke="rgba(255, 255, 255, 0.015)" strokeWidth="1" strokeDasharray="3 3" />
               <circle cx="65%" cy="45%" r="240" fill="none" stroke="rgba(255, 255, 255, 0.01)" strokeWidth="1" />
               <line x1="65%" y1="10%" x2="65%" y2="80%" stroke="rgba(255, 255, 255, 0.01)" strokeWidth="1" strokeDasharray="2 2" />
               <line x1="30%" y1="45%" x2="90%" y2="45%" stroke="rgba(255, 255, 255, 0.01)" strokeWidth="1" strokeDasharray="2 2" />
               
               {/* Constellation lines */}
               {introBackgroundLinks.map((link, idx) => {
                 const fromIcon = introBackgroundIcons[link.from];
                 const toIcon = introBackgroundIcons[link.to];
                 return (
                   <line
                     key={idx}
                     x1={fromIcon.x}
                     y1={fromIcon.y}
                     x2={toIcon.x}
                     y2={toIcon.y}
                     stroke="rgba(255, 255, 255, 0.03)"
                     strokeWidth="1.2"
                     strokeDasharray="4 4"
                   />
                 );
               })}
             </svg>

             {/* Background Icons mapped */}
             {introBackgroundIcons.map(({ Icon, x, y }, i) => (
               <div
                 key={i}
                 className="intro-bg-icon"
                 style={{
                   position: 'absolute',
                   left: x,
                   top: y,
                   transform: 'translate(-50%, -50%)',
                   color: 'rgba(255, 255, 255, 0.075)', // Faint monochrome integration
                   fontSize: 'clamp(2.2rem, 3vw, 4rem)',
                   transition: 'color 0.3s ease',
                   willChange: 'transform, color, text-shadow'
                 }}
               >
                 <Icon fontSize="inherit" />
               </div>
             ))}
              </div>
            </div>

           {/* Technical Blueprint Coordinates & Bracket Overlay */}
           <div className="intro-vector-lines" style={{ position: 'absolute', inset: '12vh 12vw', border: '1px solid rgba(255, 255, 255, 0.025)', pointerEvents: 'none', zIndex: -1 }}>
             <div style={{ position: 'absolute', top: -5, left: -5, color: 'rgba(255, 255, 255, 0.25)', fontFamily: 'monospace', fontSize: '0.65rem' }}>+</div>
             <div style={{ position: 'absolute', top: -5, right: -5, color: 'rgba(255, 255, 255, 0.25)', fontFamily: 'monospace', fontSize: '0.65rem' }}>+</div>
             <div style={{ position: 'absolute', bottom: -5, left: -5, color: 'rgba(255, 255, 255, 0.25)', fontFamily: 'monospace', fontSize: '0.65rem' }}>+</div>
             <div style={{ position: 'absolute', bottom: -5, right: -5, color: 'rgba(255, 255, 255, 0.25)', fontFamily: 'monospace', fontSize: '0.65rem' }}>+</div>
             
             <div style={{ position: 'absolute', top: '50%', left: '4%', width: '40px', height: '1px', backgroundColor: 'rgba(255, 255, 255, 0.06)' }}></div>
             <div style={{ position: 'absolute', top: '50%', right: '4%', width: '40px', height: '1px', backgroundColor: 'rgba(255, 255, 255, 0.06)' }}></div>
             
             <div style={{ position: 'absolute', left: '50%', top: '4%', width: '1px', height: '40px', backgroundColor: 'rgba(255, 255, 255, 0.06)' }}></div>
             <div style={{ position: 'absolute', left: '50%', bottom: '4%', width: '1px', height: '40px', backgroundColor: 'rgba(255, 255, 255, 0.06)' }}></div>
           </div>

           {/* Faint Floating Developer Code Strings */}
           <div className="intro-code-bg code-snip-1" style={{ position: 'absolute', top: '22vh', left: '15vw', fontFamily: 'monospace', fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.04)', transform: 'rotate(-4deg)', userSelect: 'none' }}>
             {`const engine = createSystem({ fps: 60 });`}
           </div>
           <div className="intro-code-bg code-snip-2" style={{ position: 'absolute', bottom: '26vh', right: '18vw', fontFamily: 'monospace', fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.04)', transform: 'rotate(6deg)', userSelect: 'none' }}>
             {`import { motion, scrub } from "gsap";`}
           </div>

           {/* Bottom Left Editorial Text Anchor */}
           <div 
             className="tech-intro-text-block"
             style={{ 
               position: 'absolute', 
               bottom: '8vh', 
               left: '5vw', 
               width: 'clamp(300px, 40vw, 600px)',
               willChange: 'transform, opacity'
             }}
           >
             <h1 
               className="tech-intro-text text-serif" 
               style={{ 
                 fontSize: 'clamp(3.5rem, 6vw, 6.5rem)', 
                 margin: '0 0 1.5rem 0', 
                 lineHeight: 1, 
                 textTransform: 'uppercase', 
                 color: 'var(--text-primary)', 
                 letterSpacing: '-0.02em', 
                 willChange: 'transform, opacity, filter' 
               }}
             >
                The Stack.
             </h1>
             <p 
               className="tech-intro-sub" 
               style={{ 
                 fontSize: '1.1rem', 
                 lineHeight: 1.7,
                 color: 'var(--text-secondary)', 
                 margin: 0,
                 fontWeight: 300, 
                 willChange: 'transform, opacity' 
               }}
             >
                The technologies I work with are detailed below. Scroll to explore my frontend, backend, and cloud systems.
             </p>
           </div>
        </div>

        {/* --- PHASES 1, 2, 3: TECH CATEGORIES --- */}
        {techCategories.map((cat, index) => (
          <div key={index} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
            
            {/* Bottom Left Editorial Text Anchors */}
            <div 
              className={`tech-info-${index}`} 
              style={{ 
                position: 'absolute', 
                bottom: '8vh', 
                left: '5vw', 
                width: 'clamp(300px, 35vw, 600px)', 
                zIndex: 30,
                opacity: 0,
                willChange: 'transform, opacity'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
                <span style={{ fontSize: '0.85rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                  [ 0{index + 1} / STACK ]
                </span>
                <div style={{ height: '1px', flex: 1, backgroundColor: 'rgba(255,255,255,0.15)' }}></div>
              </div>
              <h2 style={{ fontSize: 'clamp(3.5rem, 6vw, 6rem)', fontFamily: 'var(--font-serif)', color: 'var(--text-primary)', margin: '0 0 1.25rem 0', lineHeight: 1, letterSpacing: '-0.02em' }}>
                {cat.title}
              </h2>
              <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0, fontWeight: 300 }}>
                {cat.description}
              </p>
              
              {/* Color legend indicator */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginTop: '1.5rem', fontSize: '0.8rem', fontFamily: 'monospace', color: '#ff6b00', opacity: 0.9 }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#ff6b00', display: 'inline-block', boxShadow: '0 0 8px #ff6b00' }}></span>
                <span style={{ letterSpacing: '0.05em' }}>Orange highlights the technologies I specialize in</span>
              </div>
            </div>

            {/* Scattered Tech SVG Logos (Fullscreen Grid Spaced) */}
            {cat.icons.map(({ Icon, name, tooltip, featured }, i) => (
              <div 
                key={i}
                className={`tech-icon-wrapper tech-icon-${index}-${i}`}
                style={{ 
                  position: 'absolute', 
                  top: 0, 
                  left: 0,
                  opacity: 0, 
                  zIndex: 20,
                  pointerEvents: 'auto', // Enable hover pointer events
                  willChange: 'transform, opacity'
                }}
              >
                <div 
                  className="tech-icon-inner" 
                  style={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem',
                    willChange: 'transform'
                  }}
                >
                  <div
                    style={{
                      color: featured ? '#ff6b00' : 'rgba(255, 255, 255, 0.45)', // Orange for featured, soft white for secondary
                      filter: featured ? 'drop-shadow(0 0 15px rgba(255, 107, 0, 0.45))' : 'none',
                      fontSize: 'clamp(2.5rem, 4vw, 4.5rem)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Icon fontSize="inherit" />
                  </div>
                  
                  {/* Subtle, uppercase monospace label */}
                  <span
                    style={{
                      fontFamily: 'monospace',
                      fontSize: '0.65rem',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: featured ? '#ff6b00' : 'rgba(255, 255, 255, 0.65)', // Brighter, readable soft white
                      opacity: 0.95,
                      marginTop: '0.2rem'
                    }}
                  >
                    {name}
                  </span>

                  {/* Elegant Tiny Monospace Tooltip */}
                  <div className="tech-tooltip">
                    <div className="tooltip-name">{name}</div>
                    <div className="tooltip-desc" style={{ color: featured ? '#ff6b00' : 'var(--text-secondary)' }}>{tooltip}</div>
                  </div>
                </div>
              </div>
            ))}
            
          </div>
        ))}

      </section>

    </div>
  );
}
