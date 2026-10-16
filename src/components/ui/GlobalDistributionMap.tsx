'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';

interface Destination {
  id: string;
  relX: number; // relative coordinate matching reference image
  relY: number;
  arcLift: number;
  delay: number; // staggered drawing timing
}

// Draw classic teardrop map pin icon
function drawMapPinIcon(
  ctx: CanvasRenderingContext2D,
  x: number, // tip X (bottom point touching ground)
  y: number, // tip Y (bottom point touching ground)
  height: number = 18,
  pinColor: string = '#DC2626', // Classic Red
  dotColor: string = '#FFFFFF',
  glow: boolean = true
) {
  ctx.save();

  // Subtle contact shadow
  ctx.beginPath();
  ctx.ellipse(x, y + 1.2, height * 0.24, height * 0.08, 0, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(0, 0, 0, 0.18)';
  ctx.fill();

  if (glow) {
    ctx.shadowColor = 'rgba(220, 38, 38, 0.4)';
    ctx.shadowBlur = 8;
  }

  const width = height * 0.72;
  const headRadius = width / 2;
  const headCenterY = y - height + headRadius;

  // Teardrop pin path
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.bezierCurveTo(
    x + headRadius * 0.92, y - height * 0.35,
    x + headRadius, headCenterY + headRadius * 0.4,
    x + headRadius, headCenterY
  );
  ctx.arc(x, headCenterY, headRadius, 0, Math.PI, true);
  ctx.bezierCurveTo(
    x - headRadius, headCenterY + headRadius * 0.4,
    x - headRadius * 0.92, y - height * 0.35,
    x, y
  );
  ctx.closePath();

  ctx.fillStyle = pinColor;
  ctx.fill();

  // Crisp clean border
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.75)';
  ctx.lineWidth = 0.9;
  ctx.stroke();

  // Inner white dot
  ctx.shadowBlur = 0;
  ctx.beginPath();
  ctx.arc(x, headCenterY, headRadius * 0.42, 0, Math.PI * 2);
  ctx.fillStyle = dotColor;
  ctx.fill();

  ctx.restore();
}

export function GlobalDistributionMap({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let isVisible = true;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    let width = 0;
    let height = 0;

    const resize = () => {
      if (!canvas || !canvas.parentElement) return;
      const rect = canvas.parentElement.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);

    // Origin: India (Gujarat / Mundra Export HQ) matching reference image
    const origin = {
      relX: 0.612,
      relY: 0.452,
    };

    // Full Worldwide Distribution across ALL continents matching shared image
    const destinations: Destination[] = [
      {
        id: 'north-america',
        relX: 0.216,
        relY: 0.322,
        arcLift: 80,
        delay: 0.22,
      },
      {
        id: 'south-america',
        relX: 0.321,
        relY: 0.642,
        arcLift: 45,
        delay: 0.32,
      },
      {
        id: 'europe',
        relX: 0.490,
        relY: 0.285,
        arcLift: 50,
        delay: 0.15,
      },
      {
        id: 'africa',
        relX: 0.519,
        relY: 0.728,
        arcLift: 38,
        delay: 0.18,
      },
      {
        id: 'russia-eurasia',
        relX: 0.720,
        relY: 0.237,
        arcLift: 55,
        delay: 0.08,
      },
      {
        id: 'east-asia-japan',
        relX: 0.822,
        relY: 0.351,
        arcLift: 42,
        delay: 0.12,
      },
      {
        id: 'southeast-asia-coast',
        relX: 0.791,
        relY: 0.449,
        arcLift: 30,
        delay: 0.05,
      },
      {
        id: 'singapore-indonesia',
        relX: 0.780,
        relY: 0.597,
        arcLift: 35,
        delay: 0.1,
      },
      {
        id: 'australia',
        relX: 0.861,
        relY: 0.754,
        arcLift: 52,
        delay: 0.26,
      },
    ];

    // Slow, graceful loop duration (~8.5 seconds)
    const cycleDuration = 8.5;
    const startTime = performance.now();

    // Quadratic Bezier interpolation
    const getBezierPoint = (
      p0: { x: number; y: number },
      p1: { x: number; y: number },
      p2: { x: number; y: number },
      t: number
    ) => {
      const oneMinusT = 1 - t;
      return {
        x: oneMinusT * oneMinusT * p0.x + 2 * oneMinusT * t * p1.x + t * t * p2.x,
        y: oneMinusT * oneMinusT * p0.y + 2 * oneMinusT * t * p1.y + t * t * p2.y,
      };
    };

    const render = (now: number) => {
      if (!isVisible) {
        animId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      const elapsed = ((now - startTime) / 1000) % cycleDuration;
      const cycleProgress = elapsed / cycleDuration; // 0..1

      const ox = origin.relX * width;
      const oy = origin.relY * height;

      // Pin scale calibrated to container dimensions
      const pinHeight = Math.max(13, Math.min(21, width * 0.016));
      const originPinHeight = pinHeight * 1.3;

      // 1. Draw animated curved routes to ALL 9 worldwide destinations
      for (const dest of destinations) {
        const dx = dest.relX * width;
        const dy = dest.relY * height;

        const midX = (ox + dx) / 2;
        const midY = (oy + dy) / 2;
        const dist = Math.hypot(dx - ox, dy - oy);
        const arcLift = Math.min(dest.arcLift * (width / 1000), dist * 0.42);
        const ctrlX = midX;
        const ctrlY = midY - arcLift;

        const drawDuration = 0.42;
        let routeProgress = 0;

        if (cycleProgress < dest.delay) {
          routeProgress = 0;
        } else if (cycleProgress <= dest.delay + drawDuration) {
          const raw = (cycleProgress - dest.delay) / drawDuration;
          routeProgress = Math.sin((raw * Math.PI) / 2);
        } else if (cycleProgress < 0.9) {
          routeProgress = 1;
        } else {
          routeProgress = 1 - (cycleProgress - 0.9) / 0.1;
        }

        if (routeProgress > 0.005) {
          // Subtle dashed guide path
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(ox, oy);
          ctx.quadraticCurveTo(ctrlX, ctrlY, dx, dy);
          ctx.strokeStyle = 'rgba(46, 125, 50, 0.2)'; // Soft green dashed guide
          ctx.lineWidth = 1;
          ctx.setLineDash([3, 5]);
          ctx.stroke();
          ctx.restore();

          // Gradual drawing route line
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(ox, oy);

          const steps = Math.max(15, Math.floor(45 * routeProgress));
          let headPos = { x: ox, y: oy };

          for (let s = 1; s <= steps; s++) {
            const t = (s / steps) * routeProgress;
            const pt = getBezierPoint({ x: ox, y: oy }, { x: ctrlX, y: ctrlY }, { x: dx, y: dy }, t);
            ctx.lineTo(pt.x, pt.y);
            if (s === steps) headPos = pt;
          }

          const lineGrad = ctx.createLinearGradient(ox, oy, dx, dy);
          lineGrad.addColorStop(0, 'rgba(220, 38, 38, 0.9)'); // Red at India
          lineGrad.addColorStop(0.5, 'rgba(46, 125, 50, 0.75)'); // Soft green mid-arc
          lineGrad.addColorStop(1, 'rgba(220, 38, 38, 0.95)'); // Red at destination

          ctx.strokeStyle = lineGrad;
          ctx.lineWidth = 1.6;
          ctx.stroke();
          ctx.restore();

          // Leading comet head
          if (routeProgress < 1 && routeProgress > 0.02) {
            ctx.save();
            ctx.beginPath();
            ctx.arc(headPos.x, headPos.y, 3, 0, Math.PI * 2);
            ctx.fillStyle = '#DC2626';
            ctx.shadowColor = 'rgba(220, 38, 38, 0.5)';
            ctx.shadowBlur = 6;
            ctx.fill();

            ctx.beginPath();
            ctx.arc(headPos.x, headPos.y, 1.2, 0, Math.PI * 2);
            ctx.fillStyle = '#FFFFFF';
            ctx.fill();
            ctx.restore();
          }
        }

        // 2. Red Destination Map Pin Icons
        const hasArrived = routeProgress >= 0.98;

        if (hasArrived) {
          const pulsePhase = ((now - startTime) / 1000 + dest.delay * 4) % 1.5;
          const pulseNorm = pulsePhase / 1.5;
          const ringRadius = 4 + pulseNorm * 11;
          const ringAlpha = (1 - pulseNorm) * 0.6;

          ctx.save();
          ctx.beginPath();
          ctx.arc(dx, dy, ringRadius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(220, 38, 38, ${ringAlpha})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
          ctx.restore();

          // Active Red Map Pin Icon
          drawMapPinIcon(ctx, dx, dy, pinHeight, '#DC2626', '#FFFFFF', true);
        } else {
          // Idle soft red map pin icon
          drawMapPinIcon(ctx, dx, dy, pinHeight * 0.88, 'rgba(220, 38, 38, 0.55)', 'rgba(255, 255, 255, 0.8)', false);
        }
      }

      // 3. India Origin Red Map Pin with Concentric Pulse Rings
      const originPhase = ((now - startTime) / 1000) % 1.8;
      const waveNorm = originPhase / 1.8;

      ctx.save();
      for (let w = 0; w < 3; w++) {
        const p = (waveNorm + w * 0.33) % 1;
        const r = 6 + p * 22;
        const alpha = (1 - p) * 0.65;
        ctx.beginPath();
        ctx.arc(ox, oy, r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(220, 38, 38, ${alpha})`;
        ctx.lineWidth = 1.3;
        ctx.stroke();
      }
      ctx.restore();

      // India Origin Red Map Pin Icon
      drawMapPinIcon(ctx, ox, oy, originPinHeight, '#B91C1C', '#FFFFFF', true);

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden select-none z-0 ${className}`}>
      {/* Background Image: Clean Green Continents Map */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/map/world-continents-clean-green.png"
          alt="Green World Continents Distribution Map"
          fill
          sizes="100vw"
          className="object-cover object-center opacity-85"
          priority
        />
        {/* Soft edge fades keeping focus on center and text */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/75 via-transparent to-white/75" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white/50" />
      </div>

      {/* HTML5 Canvas: Full Worldwide Curved Routes & Red Map Pin Icons (Zero Text) */}
      <canvas ref={canvasRef} className="relative z-10 w-full h-full block" />
    </div>
  );
}
