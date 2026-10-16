'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';

export interface StageItem {
  stage: string;
  title: string;
  subtitle: string;
  image: string;
  description: string;
  specs: string[];
  highlight?: boolean;
}

interface ScrollStagesTimelineProps {
  stages: StageItem[];
}

export function ScrollStagesTimeline({ stages }: ScrollStagesTimelineProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progressPct, setProgressPct] = useState(0);

  const timelineRef = useRef<HTMLDivElement | null>(null);
  const stageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      // The reading line in the viewport (40% down from top)
      const viewportReadingLine = window.innerHeight * 0.4;
      let currentActive = 0;

      stageRefs.current.forEach((el, idx) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        // If the card top has scrolled past the reading line
        if (rect.top <= viewportReadingLine) {
          currentActive = idx;
        }
      });

      setActiveIndex(currentActive);

      // Calculate vertical progress line percentage
      if (timelineRef.current && stageRefs.current.length > 0) {
        const firstEl = stageRefs.current[0];
        const lastEl = stageRefs.current[stageRefs.current.length - 1];
        if (firstEl && lastEl) {
          const firstRect = firstEl.getBoundingClientRect();
          const lastRect = lastEl.getBoundingClientRect();
          const totalHeight = lastRect.top - firstRect.top;
          if (totalHeight > 0) {
            const scrolledDistance = viewportReadingLine - firstRect.top;
            const pct = Math.max(0, Math.min(100, (scrolledDistance / totalHeight) * 100));
            setProgressPct(pct);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial calculation
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [stages.length]);

  return (
    <div
      ref={timelineRef}
      className="relative ml-4 sm:ml-8 lg:ml-12 pl-6 sm:pl-10 lg:pl-16 space-y-14 sm:space-y-16"
    >
      {/* Static background track line */}
      <div className="absolute left-0 top-4 bottom-4 w-0.5 bg-secondary/20 rounded-full pointer-events-none" />

      {/* Dynamic green scroll progress line */}
      <div
        className="absolute left-0 top-4 w-0.5 bg-secondary rounded-full pointer-events-none transition-all duration-150 ease-out"
        style={{ height: `${progressPct}%` }}
      />

      {stages.map((stage, idx) => {
        const isActive = activeIndex === idx;
        const isPassed = activeIndex > idx;

        return (
          <div
            key={idx}
            ref={(el) => {
              stageRefs.current[idx] = el;
            }}
            className="relative group scroll-mt-28"
          >
            {/* Dynamic Stage Timeline Marker Icon */}
            <div
              className={`absolute -left-6 sm:-left-10 lg:-left-16 -translate-x-1/2 top-4 w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-xs sm:text-sm font-black transition-all duration-300 z-10 select-none ${
                isActive
                  ? 'bg-secondary text-white border-2 border-white scale-110 ring-4 ring-secondary/25 shadow-md'
                  : isPassed
                  ? 'bg-secondary text-white border-2 border-secondary/30 scale-100 shadow-sm'
                  : 'bg-white text-primary-dark/60 border-2 border-secondary/40 scale-95 shadow-xs'
              }`}
            >
              {stage.stage}
            </div>

            {/* Stage Card with Dynamic Background & Border */}
            <div
              className={`p-6 sm:p-8 rounded-3xl border transition-all duration-300 ${
                isActive
                  ? 'border-secondary/60 ring-2 ring-secondary/15 shadow-navy-md bg-gradient-to-br from-secondary/[0.04] via-white to-white'
                  : isPassed
                  ? 'border-border/90 bg-white shadow-navy-xs'
                  : 'border-border bg-white shadow-navy-xs'
              }`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[11px] font-black uppercase tracking-wider transition-colors ${
                          isActive ? 'text-secondary font-black' : 'text-secondary/80'
                        }`}
                      >
                        Stage {stage.stage} • {stage.subtitle}
                      </span>

                      {isActive && (
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-secondary/10 text-secondary text-[10px] font-bold uppercase tracking-wider">
                          <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                          <span>Active Stage</span>
                        </span>
                      )}
                    </div>

                    <h3 className="font-heading font-black text-2xl text-primary-dark mt-1">
                      {stage.title}
                    </h3>
                  </div>

                  <p className="text-sm text-ink-muted leading-relaxed">
                    {stage.description}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {stage.specs.map((spec, i) => (
                      <span
                        key={i}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                          isActive
                            ? 'bg-secondary/10 text-primary-dark border border-secondary/20'
                            : 'bg-surface-alt text-primary'
                        }`}
                      >
                        <CheckCircle2
                          className={`w-3.5 h-3.5 ${
                            isActive ? 'text-secondary' : 'text-secondary/70'
                          }`}
                        />
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <div
                    className={`relative aspect-16/10 rounded-2xl overflow-hidden shadow-navy-xs border transition-all duration-300 ${
                      isActive ? 'border-secondary/50 ring-2 ring-secondary/20' : 'border-border'
                    }`}
                  >
                    <Image
                      src={stage.image}
                      alt={stage.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 35vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
