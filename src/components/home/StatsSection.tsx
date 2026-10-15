'use client';

import { useState, useEffect, useRef } from 'react';
import { siteConfig } from '@/config/site';
import { Award, Users, TrendingUp, Globe2 } from 'lucide-react';

interface StatItem {
  icon: typeof Award;
  value: number;
  suffix: string;
  label: string;
  description: string;
}

export function StatsSection() {
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.25 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats: StatItem[] = [
    {
      icon: Award,
      value: siteConfig.stats.yearsOfExperience,
      suffix: '+',
      label: 'Years of Experience',
      description: 'Milling & grain trading excellence in Gujarat',
    },
    {
      icon: Users,
      value: siteConfig.stats.happyCustomers,
      suffix: '+',
      label: 'Happy Clients',
      description: 'Wholesalers, retailers, and household buyers',
    },
    {
      icon: TrendingUp,
      value: siteConfig.stats.tonnesTraded,
      suffix: '+',
      label: 'Tonnes Traded',
      description: 'Annual Sortex toor volume dispatched',
    },
    {
      icon: Globe2,
      value: siteConfig.stats.countriesServed,
      suffix: '+',
      label: 'Countries Served',
      description: 'Across the Middle East, Europe & Americas',
    },
  ];

  return (
    <section
      ref={containerRef}
      className="py-16 md:py-24 bg-gradient-to-b from-[#e3e6e7] via-[#ebeded] to-[#dfe2e3] text-ink relative overflow-hidden border-y border-slate-200/80"
    >
      {/* Ambient Studio Lighting Glow */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-80"
        style={{
          background: 'radial-gradient(circle at 50% 35%, rgba(255,255,255,0.7) 0%, rgba(225,229,231,0.2) 70%, transparent 100%)',
        }}
      />

      {/* Left Side: Dry Toor Animation Video */}
      <div
        className="hidden md:block absolute left-0 bottom-0 w-[220px] md:w-[250px] lg:w-[270px] xl:w-[320px] 2xl:w-[380px] pointer-events-none z-0 select-none"
        aria-hidden="true"
        style={{
          maskImage: 'radial-gradient(ellipse at 50% 55%, black 50%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 55%, black 50%, transparent 75%)',
        }}
      >
        <video
          src="/animation/gemini_generated_video_705406bf.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-auto object-contain mix-blend-multiply opacity-95"
        />
      </div>

      {/* Right Side: Dry Toor Animation Video (Mirrored for balance) */}
      <div
        className="hidden md:block absolute right-0 bottom-0 w-[220px] md:w-[250px] lg:w-[270px] xl:w-[320px] 2xl:w-[380px] pointer-events-none z-0 select-none transform scale-x-[-1]"
        aria-hidden="true"
        style={{
          maskImage: 'radial-gradient(ellipse at 50% 55%, black 50%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 55%, black 50%, transparent 75%)',
        }}
      >
        <video
          src="/animation/gemini_generated_video_705406bf.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-auto object-contain mix-blend-multiply opacity-95"
        />
      </div>

      <div className="relative z-10 max-w-[620px] sm:max-w-[680px] lg:max-w-[700px] xl:max-w-[760px] 2xl:max-w-[820px] mx-auto px-4 sm:px-6">
        <div className="text-center max-w-lg mx-auto mb-8 sm:mb-10 space-y-1">
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-secondary block">
            Scale &amp; Proven Reputation
          </span>
          <h2 className="font-heading font-black text-2xl sm:text-3xl text-primary-dark tracking-tight">
            Numbers That Reflect Decades of Trust
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 xl:gap-4">
          {stats.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-3 sm:p-3.5 xl:p-4 rounded-2xl bg-white/95 border border-slate-200/90 shadow-sm backdrop-blur-md text-center flex flex-col items-center justify-between space-y-1.5 hover:bg-white hover:shadow-md transition-all"
              >
                <div className="w-8 h-8 rounded-xl bg-secondary/15 flex items-center justify-center text-secondary shrink-0">
                  <Icon className="w-4 h-4" />
                </div>

                <div>
                  <div className="font-heading font-black text-xl sm:text-2xl xl:text-3xl text-primary-dark tracking-tight leading-none">
                    <Counter end={item.value} startAnimation={hasAnimated} />
                    <span className="text-accent">{item.suffix}</span>
                  </div>
                  <h4 className="font-heading font-bold text-xs sm:text-[13px] text-primary-dark mt-1 leading-tight">
                    {item.label}
                  </h4>
                  <p className="text-[10px] sm:text-[11px] text-ink-muted mt-0.5 leading-snug line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Counter({ end, startAnimation }: { end: number; startAnimation: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startAnimation) return;

    const duration = 1800; // ms
    const frameRate = 1000 / 60;
    const totalFrames = Math.round(duration / frameRate);
    let frame = 0;

    const timer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      // easeOutExpo
      const current = Math.round(end * (1 - Math.pow(2, -10 * progress)));
      setCount(current);

      if (frame >= totalFrames) {
        clearInterval(timer);
        setCount(end);
      }
    }, frameRate);

    return () => clearInterval(timer);
  }, [end, startAnimation]);

  return <span>{count.toLocaleString('en-IN')}</span>;
}
