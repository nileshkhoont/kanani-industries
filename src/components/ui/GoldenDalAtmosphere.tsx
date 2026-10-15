'use client';

import React, { useEffect, useRef } from 'react';

interface GoldenDalAtmosphereProps {
  density?: 'hero' | 'compact' | 'ambient';
  className?: string;
  showRays?: boolean;
}

interface ToorAtmosphereGrain {
  x: number;
  y: number;
  rx: number; // horizontal radius
  ry: number; // vertical radius
  speedY: number;
  speedX: number;
  angle: number;
  rotSpeed: number;
  opacity: number;
  baseOpacity: number;
  swaySpeed: number;
  swayOffset: number;
  swayAmp: number;
  tier: 0 | 1 | 2; // 0 = micro sparkle, 1 = midgrain, 2 = hero split pulse
  colorPrime: string;
  colorShadow: string;
}

export function GoldenDalAtmosphere({
  density = 'ambient',
  className = '',
  showRays = true,
}: GoldenDalAtmosphereProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let isVisible = true;

    // Pause canvas if section is scrolled out of viewport
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    }, { threshold: 0.05 });
    observer.observe(canvas);

    let width = 0;
    let height = 0;

    const resize = () => {
      if (!canvas || !canvas.parentElement) return;
      const rect = canvas.parentElement.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    // Mouse interactive physics
    let mouseX = -1000;
    let mouseY = -1000;
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    const onMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);

    // Color palettes for authentic golden Toor
    const toorPalette = [
      { prime: '#FBBF24', shadow: '#D97706' }, // Amber 400 / 600
      { prime: '#FDE047', shadow: '#CA8A04' }, // Yellow 300 / 600
      { prime: '#F59E0B', shadow: '#B45309' }, // Amber 500 / 700
      { prime: '#FEF08A', shadow: '#EAB308' }, // Bright Surface
    ];

    const count = density === 'hero' ? 45 : density === 'compact' ? 24 : 32;
    const grains: ToorAtmosphereGrain[] = [];

    for (let i = 0; i < count; i++) {
      const tier: 0 | 1 | 2 = i % 5 === 0 ? 2 : i % 2 === 0 ? 1 : 0;
      const palette = toorPalette[Math.floor(Math.random() * toorPalette.length)];

      const rx =
        tier === 2
          ? 10 + Math.random() * 5
          : tier === 1
          ? 5.5 + Math.random() * 3.5
          : 2 + Math.random() * 2;
      const ry = rx * (0.75 + Math.random() * 0.15); // natural toor ratio

      const baseOpacity =
        tier === 2
          ? 0.75 + Math.random() * 0.2
          : tier === 1
          ? 0.45 + Math.random() * 0.35
          : 0.25 + Math.random() * 0.35;

      grains.push({
        x: Math.random() * (width || 1200),
        y: Math.random() * (height || 800),
        rx,
        ry,
        speedY: tier === 2 ? 0.35 + Math.random() * 0.3 : tier === 1 ? 0.2 + Math.random() * 0.25 : 0.1 + Math.random() * 0.15,
        speedX: (Math.random() - 0.5) * 0.25,
        angle: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.015,
        opacity: baseOpacity,
        baseOpacity,
        swaySpeed: 0.015 + Math.random() * 0.02,
        swayOffset: Math.random() * Math.PI * 2,
        swayAmp: tier === 2 ? 0.8 : 0.45,
        tier,
        colorPrime: palette.prime,
        colorShadow: palette.shadow,
      });
    }

    let time = 0;

    const drawGrain = (g: ToorAtmosphereGrain) => {
      ctx.save();
      ctx.translate(g.x, g.y);
      ctx.rotate(g.angle);
      ctx.globalAlpha = g.opacity;

      // Tier 2: Large prominent toor grain with glow & 3D grain texture
      if (g.tier === 2) {
        ctx.shadowColor = 'rgba(245, 158, 11, 0.4)';
        ctx.shadowBlur = 10;
      }

      // 1. Draw outer pulse shell
      ctx.beginPath();
      ctx.ellipse(0, 0, g.rx, g.ry, 0, 0, Math.PI * 2);

      // Radial 3D shading
      const grad = ctx.createRadialGradient(
        -g.rx * 0.3,
        -g.ry * 0.3,
        g.rx * 0.1,
        0,
        0,
        g.rx * 1.1
      );
      grad.addColorStop(0, '#FFFBEB'); // sunlit specular reflection
      grad.addColorStop(0.35, g.colorPrime);
      grad.addColorStop(1, g.colorShadow);

      ctx.fillStyle = grad;
      ctx.fill();

      // 2. If mid/large grain, draw distinctive highlight curve of Toor
      if (g.tier >= 1) {
        ctx.beginPath();
        ctx.arc(0, 0, g.rx * 0.6, 0.2, Math.PI * 0.85);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.lineWidth = g.tier === 2 ? 1.2 : 0.75;
        ctx.stroke();

        // Subtle natural germ dot on edge
        ctx.beginPath();
        ctx.arc(-g.rx * 0.65, 0, g.tier === 2 ? 1.2 : 0.7, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(180, 83, 9, 0.7)';
        ctx.fill();
      }

      ctx.restore();
    };

    const render = () => {
      if (!isVisible) {
        animId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);
      time += 0.02;

      for (const g of grains) {
        // Natural upward floating drift
        g.y -= g.speedY;
        g.x += g.speedX + Math.sin(time * g.swaySpeed + g.swayOffset) * g.swayAmp;
        g.angle += g.rotSpeed;

        // Subtle interactive mouse deflection
        const dx = g.x - mouseX;
        const dy = g.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 140 && dist > 0) {
          const force = (140 - dist) / 140;
          g.x += (dx / dist) * force * 2.2;
          g.y += (dy / dist) * force * 2.2;
        }

        // Loop boundaries smoothly
        if (g.y < -30) {
          g.y = height + 30;
          g.x = Math.random() * width;
        }
        if (g.x < -30) g.x = width + 30;
        if (g.x > width + 30) g.x = -30;

        drawGrain(g);
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [density]);

  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden select-none z-0 ${className}`}
      aria-hidden="true"
    >
      {/* 1. Luxurious Golden Grain Aurora Light Mesh */}
      <div className="absolute inset-0 opacity-40 mix-blend-screen pointer-events-none">
        {/* Warm Golden Glow Orb (Top Right) */}
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(251,191,36,0.22)_0%,rgba(217,119,6,0.08)_50%,transparent_75%)] blur-3xl animate-[pulse_8s_easeInOut_infinite]" />

        {/* Emerald Agricultural Glow (Bottom Left) */}
        <div className="absolute -bottom-32 -left-32 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.18)_0%,rgba(5,150,105,0.06)_50%,transparent_75%)] blur-3xl animate-[pulse_10s_easeInOut_infinite]" />

        {/* Center Golden Light Stream */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[450px] bg-[radial-gradient(ellipse,rgba(245,158,11,0.14)_0%,transparent_70%)] blur-2xl" />
      </div>

      {/* 2. Optical Sortex Light Beams (Subtle diagonal rays representing computerized color sorting) */}
      {showRays && (
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="sortexRayGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FDE047" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#F59E0B" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
              </linearGradient>
            </defs>
            <line
              x1="-10%"
              y1="10%"
              x2="110%"
              y2="90%"
              stroke="url(#sortexRayGrad)"
              strokeWidth="1.5"
              strokeDasharray="16 24"
              className="animate-[pulse_6s_easeInOut_infinite]"
            />
            <line
              x1="10%"
              y1="-10%"
              x2="90%"
              y2="110%"
              stroke="url(#sortexRayGrad)"
              strokeWidth="1"
              strokeDasharray="12 28"
              className="animate-[pulse_9s_easeInOut_infinite]"
            />
          </svg>
        </div>
      )}

      {/* 3. HTML5 Canvas rendering realistic 3D floating Toor grains */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}
