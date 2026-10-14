'use client';

import { useState, useEffect, useRef } from 'react';
import { siteConfig } from '@/config/site';
import { Award, Users, TrendingUp, Globe2 } from 'lucide-react';
import { GoldenDalAtmosphere } from '@/components/ui/GoldenDalAtmosphere';

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
    <section ref={containerRef} className="py-16 md:py-24 bg-primary-dark text-white relative overflow-hidden">
      {/* Unified Golden Toor Dal Atmosphere Animation */}
      <GoldenDalAtmosphere density="ambient" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-accent">
            Scale &amp; Proven Reputation
          </span>
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-white tracking-tight">
            Numbers That Reflect Decades of Trust
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm text-center flex flex-col items-center justify-between space-y-3 hover:bg-white/10 transition-colors"
              >
                <div className="w-12 h-12 rounded-2xl bg-secondary/20 flex items-center justify-center text-secondary-light">
                  <Icon className="w-6 h-6" />
                </div>

                <div>
                  <div className="font-heading font-black text-4xl sm:text-5xl text-accent tracking-tight">
                    <Counter end={item.value} startAnimation={hasAnimated} />
                    <span>{item.suffix}</span>
                  </div>
                  <h4 className="font-heading font-bold text-base text-white mt-1">
                    {item.label}
                  </h4>
                  <p className="text-xs text-white/70 mt-1 leading-relaxed">
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
