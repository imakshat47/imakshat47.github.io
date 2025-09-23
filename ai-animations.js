// ai-animations.js – Neural network canvas + GSAP data bars

// Neural network background (Canvas)
(() => {
  const canvas = document.getElementById('nn-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d', { alpha: true });

  let W, H, nodes, edges, rafId;
  const NODE_COUNT = 70;              // adjust for performance
  const LINK_DIST = 120;              // how far to link nodes
  const SPEED = 0.25;                 // node drift speed

  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
    initGraph();
  }

  function rand(min, max) { return Math.random() * (max - min) + min; }

  function initGraph() {
    nodes = Array.from({ length: NODE_COUNT }, () => ({
      x: rand(0, W),
      y: rand(0, H),
      vx: rand(-SPEED, SPEED),
      vy: rand(-SPEED, SPEED),
      r: rand(1.5, 3.2),
      w: rand(0.65, 1.0) // node weight (used to vary glow)
    }));
    // Edges are dynamic; we’ll compute on the fly for responsiveness
  }

  function step() {
    ctx.clearRect(0, 0, W, H);

    // Theme colors from CSS variables
    const styles = getComputedStyle(document.body);
    const primary = styles.getPropertyValue('--primary').trim() || '#2563eb';
    const secondary = styles.getPropertyValue('--secondary').trim() || '#9333ea';

    // Move nodes with slow drift + wrap edges
    for (const n of nodes) {
      n.x += n.vx; n.y += n.vy;
      if (n.x < -10) n.x = W + 10;
      if (n.x > W + 10) n.x = -10;
      if (n.y < -10) n.y = H + 10;
      if (n.y > H + 10) n.y = -10;
    }

    // Connect near nodes (simulate “synapses”)
    ctx.lineWidth = 0.6;
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < LINK_DIST * LINK_DIST) {
          const alpha = 1 - Math.sqrt(d2) / LINK_DIST;
          const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
          grad.addColorStop(0, primary);
          grad.addColorStop(1, secondary);
          ctx.strokeStyle = `rgba(255,255,255,${0.08 + alpha * 0.25})`;
          ctx.globalAlpha = 0.3 + alpha * 0.4;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
          ctx.globalAlpha = 1.0;
        }
      }
    }

    // Draw nodes with soft glow
    for (const n of nodes) {
      ctx.beginPath();
      ctx.fillStyle = secondary;
      ctx.shadowColor = secondary;
      ctx.shadowBlur = 8 + n.w * 6;
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    rafId = requestAnimationFrame(step);
  }

  // Handle resize and prefers-reduced-motion
  const mediaReduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  function start() {
    if (mediaReduce.matches) return; // Respect user motion preference
    cancelAnimationFrame(rafId);
    step();
  }

  window.addEventListener('resize', () => { resize(); start(); });
  resize(); start();
})();

// GSAP: animate data-stream bars (subtle pulsing to imply throughput)
(() => {
  if (!window.gsap) return;
  const bars = document.querySelectorAll('.data-stream .bar');
  if (!bars.length) return;

  bars.forEach((bar, i) => {
    const base = 0.5 + (i % 3) * 0.1;
    gsap.to(bar, {
      scaleY: () => 0.8 + Math.random() * 1.4,
      opacity: () => 0.4 + Math.random() * 0.5,
      duration: () => 0.8 + Math.random() * 1.6,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: i * 0.15
    });
  });
})();
