import { useEffect, useRef } from 'react';

export default function ProjectVisualizer({ id }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = 0;
    let height = 0;

    // Handle high DPI screens
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    // ==================== PATHFINDER INITIALIZATION (ID: 01) ====================
    const initPathfinder = () => {
      const nodes = [
        { id: 0, label: 'ROOT', relX: 0.15, relY: 0.5, size: 6, active: 0 },
        { id: 1, label: 'PARSER', relX: 0.4, relY: 0.25, size: 5, active: 0 },
        { id: 2, label: 'AI_AGENT', relX: 0.4, relY: 0.5, size: 5, active: 0 },
        { id: 3, label: 'COMPILER', relX: 0.4, relY: 0.75, size: 5, active: 0 },
        { id: 4, label: 'VECTOR_DB', relX: 0.65, relY: 0.2, size: 5, active: 0 },
        { id: 5, label: 'SANCTUM', relX: 0.65, relY: 0.4, size: 5, active: 0 },
        { id: 6, label: 'CHRONOS', relX: 0.65, relY: 0.6, size: 5, active: 0 },
        { id: 7, label: 'METRICS', relX: 0.65, relY: 0.8, size: 5, active: 0 },
        { id: 8, label: 'MASTERY', relX: 0.85, relY: 0.5, size: 6, active: 0 }
      ];

      const connections = [
        [0, 1], [0, 2], [0, 3],
        [1, 4], [1, 5],
        [2, 5], [2, 6],
        [3, 6], [3, 7],
        [4, 8], [5, 8], [6, 8], [7, 8]
      ];

      // Simulated glowing signals flowing through paths
      const signals = [];
      const spawnSignal = () => {
        if (signals.length > 25) return;
        const conn = connections[Math.floor(Math.random() * connections.length)];
        signals.push({
          from: conn[0],
          to: conn[1],
          progress: 0,
          speed: 0.015 + Math.random() * 0.02
        });
      };

      return { nodes, connections, signals, spawnSignal };
    };

    // ==================== ASTRIX INITIALIZATION (ID: 02) ====================
    const initAstrix = () => {
      const glyphs = ['あ', 'Ω', 'Б', 'Д', 'Ψ', 'Ж', '한', '文', '篆', 'Σ', 'λ', 'θ', '★', '⚡'];
      const english = ['CHAT', 'TEXT', 'VOICE', 'NUANCE', 'CONTEXT', 'AI', 'INTENT', 'FLOW', 'DIALOGUE', 'SYSTEM', 'API', 'SPEECH'];
      
      const particles = [];
      const count = 22;

      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * 100, // percentage x
          y: Math.random() * 100, // percentage y
          vx: (Math.random() - 0.5) * 0.15,
          vy: (Math.random() - 0.5) * 0.15,
          glyph: glyphs[i % glyphs.length],
          word: english[i % english.length],
          size: 11 + Math.random() * 4,
          morphProgress: 0
        });
      }
      return { particles };
    };

    // ==================== TELEMETRY INITIALIZATION (ID: 03) ====================
    const initTelemetry = () => {
      const services = [
        { label: 'GATEWAY', relX: 0.25, relY: 0.5, r: 24 },
        { label: 'TRANS_SRV', relX: 0.55, relY: 0.3, r: 20 },
        { label: 'AUTH_SRV', relX: 0.55, relY: 0.7, r: 20 },
        { label: 'DATAPOOL', relX: 0.8, relY: 0.5, r: 24 }
      ];

      const lines = [
        [0, 1], [0, 2], [1, 3], [2, 3], [1, 2]
      ];

      const packets = [];
      const count = 40;

      for (let i = 0; i < count; i++) {
        const lineIdx = Math.floor(Math.random() * lines.length);
        packets.push({
          lineIdx,
          progress: Math.random(),
          speed: 0.003 + Math.random() * 0.005,
          dir: Math.random() > 0.5 ? 1 : -1,
          size: 2 + Math.random() * 2
        });
      }

      return { services, lines, packets };
    };

    // ==================== SECURITY DIAL INITIALIZATION (ID: 04) ====================
    const initSecurity = () => {
      const binaryRain = [];
      const cols = 20;
      for (let i = 0; i < cols; i++) {
        binaryRain.push({
          x: i * (100 / cols),
          y: Math.random() * -100,
          speed: 0.5 + Math.random() * 1.5,
          chars: Array.from({ length: 15 }, () => Math.round(Math.random()))
        });
      }
      return { binaryRain, angle: 0 };
    };

    // Setup state
    const pathfinder = id === '01' ? initPathfinder() : null;
    const astrix = id === '02' ? initAstrix() : null;
    const telemetry = id === '03' ? initTelemetry() : null;
    const security = id === '04' ? initSecurity() : null;

    // ==================== RENDERING LOOPS ====================
    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw faint background grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.015)';
      ctx.lineWidth = 1;
      const step = 40;
      for (let x = 0; x < width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      const mouse = mouseRef.current;

      // ==================== DRAW ID: 01 (PATHFINDER) ====================
      if (id === '01' && pathfinder) {
        if (Math.random() < 0.06) pathfinder.spawnSignal();

        // 1. Draw connections
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
        ctx.lineWidth = 1;
        pathfinder.connections.forEach(([f, t]) => {
          const fromNode = pathfinder.nodes[f];
          const toNode = pathfinder.nodes[t];
          ctx.beginPath();
          ctx.moveTo(fromNode.relX * width, fromNode.relY * height);
          ctx.lineTo(toNode.relX * width, toNode.relY * height);
          ctx.stroke();
        });

        // 2. Draw signals
        pathfinder.signals.forEach((sig, index) => {
          sig.progress += sig.speed;
          if (mouse.active) sig.progress += sig.speed * 1.5; // speed up on hover
          
          if (sig.progress >= 1) {
            pathfinder.signals.splice(index, 1);
            return;
          }

          const fromNode = pathfinder.nodes[sig.from];
          const toNode = pathfinder.nodes[sig.to];
          const curX = fromNode.relX * width + (toNode.relX * width - fromNode.relX * width) * sig.progress;
          const curY = fromNode.relY * height + (toNode.relY * height - fromNode.relY * height) * sig.progress;

          ctx.beginPath();
          ctx.arc(curX, curY, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = mouse.active ? 'rgba(255, 107, 0, 0.8)' : 'rgba(255, 255, 255, 0.6)';
          ctx.fill();
        });

        // 3. Draw nodes
        pathfinder.nodes.forEach((node) => {
          const nodeX = node.relX * width;
          const nodeY = node.relY * height;

          // Track hover activation
          if (mouse.active) {
            const dist = Math.hypot(mouse.x - nodeX, mouse.y - nodeY);
            if (dist < 100) {
              node.active = Math.min(1, node.active + 0.1);
            } else {
              node.active = Math.max(0, node.active - 0.05);
            }
          } else {
            node.active = Math.max(0, node.active - 0.05);
          }

          // Inner pulsing ring
          const scale = 1 + node.active * 0.5;
          ctx.beginPath();
          ctx.arc(nodeX, nodeY, node.size * scale, 0, Math.PI * 2);
          ctx.fillStyle = node.active > 0 
            ? `rgba(255, 107, 0, ${0.1 + node.active * 0.2})` 
            : 'rgba(255, 255, 255, 0.03)';
          ctx.fill();

          // Outer solid dot
          ctx.beginPath();
          ctx.arc(nodeX, nodeY, 3, 0, Math.PI * 2);
          ctx.fillStyle = node.active > 0 ? 'var(--accent)' : 'rgba(255, 255, 255, 0.4)';
          ctx.fill();

          // Node Text label
          ctx.font = '8px monospace';
          ctx.fillStyle = node.active > 0 ? 'var(--accent)' : 'rgba(255, 255, 255, 0.15)';
          ctx.textAlign = 'center';
          ctx.fillText(node.label, nodeX, nodeY - 12);
        });

        // Blueprint scanner under cursor
        if (mouse.active) {
          ctx.strokeStyle = 'rgba(255, 107, 0, 0.08)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(mouse.x, mouse.y, 80, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      // ==================== DRAW ID: 02 (ASTRIX) ====================
      if (id === '02' && astrix) {
        astrix.particles.forEach((p) => {
          // Absolute coordinates
          let px = (p.x / 100) * width;
          let py = (p.y / 100) * height;

          // Float motion
          p.x += p.vx * (mouse.active ? 1.5 : 1);
          p.y += p.vy * (mouse.active ? 1.5 : 1);

          // Boundaries wrap
          if (p.x < 0) p.x = 100;
          if (p.x > 100) p.x = 0;
          if (p.y < 0) p.y = 100;
          if (p.y > 100) p.y = 0;

          // Distance check
          let targetWord = p.glyph;
          if (mouse.active) {
            const dist = Math.hypot(mouse.x - px, mouse.y - py);
            if (dist < 100) {
              p.morphProgress = Math.min(1, p.morphProgress + 0.08);
            } else {
              p.morphProgress = Math.max(0, p.morphProgress - 0.04);
            }
          } else {
            p.morphProgress = Math.max(0, p.morphProgress - 0.04);
          }

          // Morph character string visually
          if (p.morphProgress > 0.8) {
            targetWord = p.word;
          } else if (p.morphProgress > 0.1) {
            // Glitchy string phase
            targetWord = Math.random() > 0.5 ? p.glyph : p.word.slice(0, Math.ceil(p.word.length * p.morphProgress));
          }

          ctx.font = `${p.size}px ${p.morphProgress > 0.5 ? 'monospace' : 'serif'}`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          
          if (p.morphProgress > 0) {
            ctx.fillStyle = `rgba(255, 107, 0, ${0.3 + p.morphProgress * 0.7})`;
            // Draw a subtle translate blur glow behind
            ctx.shadowColor = 'rgba(255, 107, 0, 0.4)';
            ctx.shadowBlur = 8 * p.morphProgress;
          } else {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
            ctx.shadowBlur = 0;
          }

          ctx.fillText(targetWord, px, py);
          ctx.shadowBlur = 0; // reset
        });

        // Translation scanner reticle
        if (mouse.active) {
          ctx.strokeStyle = 'rgba(255, 107, 0, 0.05)';
          ctx.beginPath();
          ctx.arc(mouse.x, mouse.y, 90, 0, Math.PI * 2);
          ctx.stroke();

          ctx.fillStyle = 'rgba(255, 107, 0, 0.02)';
          ctx.beginPath();
          ctx.arc(mouse.x, mouse.y, 90, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // ==================== DRAW ID: 03 (TELEMETRY) ====================
      if (id === '03' && telemetry) {
        // Draw Pipelines
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
        ctx.lineWidth = 1;
        telemetry.lines.forEach(([f, t]) => {
          const fromNode = telemetry.services[f];
          const toNode = telemetry.services[t];
          ctx.beginPath();
          ctx.moveTo(fromNode.relX * width, fromNode.relY * height);
          ctx.lineTo(toNode.relX * width, toNode.relY * height);
          ctx.stroke();
        });

        // Render running packets
        telemetry.packets.forEach((pack) => {
          const line = telemetry.lines[pack.lineIdx];
          const fromNode = telemetry.services[line[0]];
          const toNode = telemetry.services[line[1]];

          // Speed factor shifts based on hover
          const currentSpeed = mouse.active ? pack.speed * 2.5 : pack.speed;
          pack.progress += currentSpeed * pack.dir;

          if (pack.progress > 1) {
            pack.progress = 0;
          } else if (pack.progress < 0) {
            pack.progress = 1;
          }

          const startX = fromNode.relX * width;
          const startY = fromNode.relY * height;
          const endX = toNode.relX * width;
          const endY = toNode.relY * height;

          const curX = startX + (endX - startX) * pack.progress;
          const curY = startY + (endY - startY) * pack.progress;

          ctx.beginPath();
          ctx.arc(curX, curY, pack.size, 0, Math.PI * 2);
          ctx.fillStyle = mouse.active ? 'rgba(255, 107, 0, 0.7)' : 'rgba(255, 255, 255, 0.3)';
          ctx.fill();
        });

        // Draw Service Servers
        telemetry.services.forEach((srv) => {
          const sx = srv.relX * width;
          const sy = srv.relY * height;

          let hoverScale = 1;
          if (mouse.active) {
            const dist = Math.hypot(mouse.x - sx, mouse.y - sy);
            if (dist < 100) hoverScale = 1.15;
          }

          // Outer dashed guide ring
          ctx.strokeStyle = hoverScale > 1 ? 'rgba(255, 107, 0, 0.15)' : 'rgba(255, 255, 255, 0.05)';
          ctx.setLineDash([3, 3]);
          ctx.beginPath();
          ctx.arc(sx, sy, srv.r * hoverScale * 1.5, 0, Math.PI * 2);
          ctx.stroke();
          ctx.setLineDash([]); // reset

          // Solid border circle
          ctx.strokeStyle = hoverScale > 1 ? 'rgba(255, 107, 0, 0.4)' : 'rgba(255, 255, 255, 0.1)';
          ctx.fillStyle = 'rgba(10, 10, 12, 0.9)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(sx, sy, srv.r * hoverScale, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();

          // Server Node tag
          ctx.font = '8px monospace';
          ctx.fillStyle = hoverScale > 1 ? 'var(--accent)' : 'rgba(255, 255, 255, 0.2)';
          ctx.textAlign = 'center';
          ctx.fillText(srv.label, sx, sy + 3);
        });
      }

      // ==================== DRAW ID: 04 (SECURITY LOCK / SYSTEM DELTA) ====================
      if (id === '04' && security) {
        // Draw cascading security metrics binary in background
        ctx.font = '8px monospace';
        ctx.fillStyle = mouse.active ? 'rgba(255, 107, 0, 0.04)' : 'rgba(255, 255, 255, 0.015)';
        security.binaryRain.forEach((column) => {
          column.y += column.speed * (mouse.active ? 2.5 : 1);
          if (column.y > 100) {
            column.y = -50;
          }

          const colX = (column.x / 100) * width;
          column.chars.forEach((char, index) => {
            const charY = ((column.y + index * 5) / 100) * height;
            if (charY > 0 && charY < height) {
              ctx.fillText(char, colX, charY);
            }
          });
        });

        // Central Dial Target Reticle
        const cx = width * 0.5;
        const cy = height * 0.5;
        const rMax = Math.min(width, height) * 0.35;

        security.angle += mouse.active ? 0.015 : 0.004;

        // Dial 1 (outer)
        ctx.strokeStyle = mouse.active ? 'rgba(255, 107, 0, 0.25)' : 'rgba(255, 255, 255, 0.05)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(cx, cy, rMax, security.angle, security.angle + Math.PI * 1.5);
        ctx.stroke();

        // Dial 2 (inner)
        ctx.strokeStyle = mouse.active ? 'rgba(255, 107, 0, 0.15)' : 'rgba(255, 255, 255, 0.03)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(cx, cy, rMax - 15, -security.angle * 1.5, -security.angle * 1.5 + Math.PI * 0.8);
        ctx.stroke();

        // Crosshairs targeting HUD
        if (mouse.active) {
          ctx.strokeStyle = 'rgba(255, 107, 0, 0.08)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(cx - rMax - 10, cy);
          ctx.lineTo(cx + rMax + 10, cy);
          ctx.moveTo(cx, cy - rMax - 10);
          ctx.lineTo(cx, cy + rMax + 10);
          ctx.stroke();
        }

        // Text security read-out
        ctx.font = '8px monospace';
        ctx.fillStyle = mouse.active ? 'var(--accent)' : 'rgba(255, 255, 255, 0.15)';
        ctx.textAlign = 'center';
        ctx.fillText(mouse.active ? 'SYS_SECURE: RLS_ENFORCED' : 'SYS_IDLE: GATEWAY_SECURED', cx, cy + 3);
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    // Attach mouse move listeners to container
    const container = containerRef.current;
    
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    const handleMouseEnter = () => {
      mouseRef.current.active = true;
    };

    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseenter', handleMouseEnter);
      container.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseenter', handleMouseEnter);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [id]);

  return (
    <div 
      ref={containerRef} 
      style={{ 
        width: '100%', 
        height: '100%', 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        zIndex: 2, 
        overflow: 'hidden' 
      }}
    >
      <canvas 
        ref={canvasRef} 
        style={{ 
          display: 'block', 
          width: '100%', 
          height: '100%', 
          pointerEvents: 'none' 
        }} 
      />
    </div>
  );
}
