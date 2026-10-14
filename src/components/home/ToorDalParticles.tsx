'use client';

import { useEffect, useRef } from 'react';

interface DalGrain {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  angle: number;
  rotationSpeed: number;
  opacity: number;
  pulsePhase: number;
  aspectRatio: number; // toor dal split grain is slightly oval (length vs width)
  shade: string;
  depth: number; // 0 = far (small/blurred), 1 = mid, 2 = near
}

export function ToorDalParticles() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    // Responsive resize handler
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Mouse tracking for subtle interactive breeze effect
    let mouseX = -1000;
    let mouseY = -1000;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Curated natural golden Toor Dal hues
    const dalColors = [
      '#FBBF24', // Amber 400 - Radiant golden yellow
      '#F59E0B', // Amber 500 - Deep golden pulse
      '#FCD34D', // Amber 300 - Sun-cured yellow
      '#FDE047', // Yellow 300 - Clean sortex highlight
      '#EAB308', // Yellow 500 - Pure Gujarat Toor
    ];

    // Number of grains scaled to screen size (approx 35-50 grains)
    const grainCount = Math.min(50, Math.max(25, Math.floor(width / 35)));
    const grains: DalGrain[] = [];

    for (let i = 0; i < grainCount; i++) {
      const depth = Math.random() < 0.25 ? 2 : Math.random() < 0.65 ? 1 : 0;
      grains.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: depth === 2 ? 9 + Math.random() * 5 : depth === 1 ? 5 + Math.random() * 4 : 3 + Math.random() * 3,
        speedY: depth === 2 ? 0.35 + Math.random() * 0.45 : depth === 1 ? 0.2 + Math.random() * 0.3 : 0.1 + Math.random() * 0.18,
        speedX: (Math.random() - 0.5) * 0.3,
        angle: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.015,
        opacity: depth === 2 ? 0.45 + Math.random() * 0.35 : depth === 1 ? 0.3 + Math.random() * 0.25 : 0.15 + Math.random() * 0.15,
        pulsePhase: Math.random() * Math.PI * 2,
        aspectRatio: 1.25 + Math.random() * 0.2, // characteristic oval lentil proportion
        shade: dalColors[Math.floor(Math.random() * dalColors.length)],
        depth,
      });
    }

    let time = 0;

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.015;

      for (const grain of grains) {
        // Organic vertical float with gentle sinusoidal sway
        grain.y -= grain.speedY;
        grain.x += grain.speedX + Math.sin(time + grain.pulsePhase) * 0.35;
        grain.angle += grain.rotationSpeed;

        // Interactive subtle breeze from mouse
        const dx = grain.x - mouseX;
        const dy = grain.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120 && dist > 0) {
          const force = (120 - dist) / 120;
          grain.x += (dx / dist) * force * 1.8;
          grain.y += (dy / dist) * force * 1.8;
        }

        // Screen wrap
        if (grain.y < -30) {
          grain.y = height + 20;
          grain.x = Math.random() * width;
        }
        if (grain.x < -30) grain.x = width + 20;
        if (grain.x > width + 30) grain.x = -20;

        // Draw individual Split Toor Dal Grain
        ctx.save();
        ctx.translate(grain.x, grain.y);
        ctx.rotate(grain.angle);

        // Soft glow for near grains
        if (grain.depth === 2) {
          ctx.shadowColor = 'rgba(251, 191, 36, 0.45)';
          ctx.shadowBlur = 8;
        }

        ctx.globalAlpha = grain.opacity;

        // Draw Lentil / Split Toor Dal Shape (rounded split oval)
        const rx = grain.size;
        const ry = grain.size / grain.aspectRatio;

        ctx.beginPath();
        ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);

        // Radial gradient to give authentic 3D split pulse convex appearance
        const grad = ctx.createRadialGradient(-rx * 0.25, -ry * 0.25, rx * 0.1, 0, 0, rx * 1.2);
        grad.addColorStop(0, '#FEF08A'); // bright sunlit inner split surface
        grad.addColorStop(0.45, grain.shade);
        grad.addColorStop(1, '#B45309'); // warm rich natural edge

        ctx.fillStyle = grad;
        ctx.fill();

        // Subtle split seam line characteristic of Toor Dal
        ctx.beginPath();
        ctx.ellipse(-rx * 0.15, 0, rx * 0.6, ry * 0.4, 0, 0, Math.PI * 0.8);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
        ctx.lineWidth = 0.75;
        ctx.stroke();

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0 w-full h-full"
      style={{ opacity: 0.9 }}
      aria-hidden="true"
    />
  );
}
