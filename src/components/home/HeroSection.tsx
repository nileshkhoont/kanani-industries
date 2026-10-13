'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { ArrowRight, Globe2, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';
import { siteConfig } from '@/config/site';

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-hero text-white py-16 md:py-24">
      {/* Decorative Brand SVG Motif: Leaf + Arrow + Rotating Globe line-art */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-25">
        <svg
          className="absolute right-0 top-1/2 -translate-y-1/2 w-[700px] h-[700px] text-white/20"
          viewBox="0 0 500 500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Rotating Globe Motif */}
          <g className="animate-[spin_40s_linear_infinite] origin-[360px_220px]">
            <circle cx="360" cy="220" r="90" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
            <ellipse cx="360" cy="220" rx="90" ry="40" stroke="currentColor" strokeWidth="1.2" />
            <ellipse cx="360" cy="220" rx="40" ry="90" stroke="currentColor" strokeWidth="1.2" />
            <line x1="270" y1="220" x2="450" y2="220" stroke="currentColor" strokeWidth="1.5" />
            <line x1="360" y1="130" x2="360" y2="310" stroke="currentColor" strokeWidth="1.5" />
          </g>

          {/* Upward Growth Arrow */}
          <path
            d="M 220 320 Q 300 240 380 140 M 350 140 L 380 140 L 380 170"
            stroke="var(--color-secondary-light)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Sprouting Leaf Path */}
          <path
            d="M 190 340 C 190 260 250 190 340 160 C 310 240 260 320 190 340 Z"
            fill="url(#heroLeafGrad)"
            opacity="0.35"
          />
          <defs>
            <linearGradient id="heroLeafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--color-secondary-light)" />
              <stop offset="100%" stopColor="var(--color-secondary)" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Floating Animated Golden Grain Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[
          { x: '10%', y: '20%', delay: 0, size: 8 },
          { x: '25%', y: '75%', delay: 1.2, size: 10 },
          { x: '80%', y: '15%', delay: 0.8, size: 9 },
          { x: '88%', y: '65%', delay: 2.1, size: 7 },
          { x: '50%', y: '85%', delay: 1.5, size: 11 },
          { x: '70%', y: '40%', delay: 0.4, size: 6 },
        ].map((particle, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-accent shadow-sm"
            style={{
              left: particle.x,
              top: particle.y,
              width: particle.size,
              height: particle.size,
            }}
            animate={{
              y: [0, -18, 0],
              opacity: [0.35, 0.9, 0.35],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3.5 + (i % 3),
              repeat: Infinity,
              delay: particle.delay,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline, Tagline, CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Tagline Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-semibold tracking-widest text-accent uppercase"
            >
              <Sparkles className="w-4 h-4 text-accent animate-pulse" />
              <span>{siteConfig.tagline}</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-heading font-black text-4xl sm:text-5xl md:text-6xl lg:text-6xl tracking-tight leading-[1.1] text-white"
            >
              Gujarat’s Finest{' '}
              <span className="text-secondary-light">
                Sortex Toor Dal
              </span>
              , Milled for Pure Taste.
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-white/85 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal"
            >
              Direct processing &amp; global trading from Saurashtra. Computerized multi-stage optical
              color sorting ensures 99.8% grain purity across our flagship brands:{' '}
              <strong className="text-white">Savaj, Ganesh, Nilkanth &amp; Natural</strong>.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
            >
              <Link
                href="/products"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-accent hover:bg-accent-dark text-primary-dark font-heading font-extrabold text-base shadow-navy-lg flex items-center justify-center gap-2.5 transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <span>Shop Dals</span>
                <ArrowRight className="w-5 h-5 text-primary-dark" />
              </Link>

              <Link
                href="/export"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-heading font-bold text-base backdrop-blur-md border border-white/25 flex items-center justify-center gap-2.5 transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <Globe2 className="w-5 h-5 text-secondary-light" />
                <span>Export &amp; Bulk Enquiry</span>
              </Link>
            </motion.div>

            {/* Trust points */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-white/80"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-secondary-light shrink-0" />
                <span>No Artificial Polishing</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-secondary-light shrink-0" />
                <span>28+ Years Processing Heritage</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe2 className="w-4 h-4 text-accent shrink-0" />
                <span>18+ Export Destinations</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Layered Parallax Grain Imagery */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative mx-auto max-w-md lg:max-w-none"
            >
              {/* Main Card */}
              <div className="relative aspect-4/3 rounded-3xl overflow-hidden shadow-navy-xl border border-white/20 bg-primary-dark/40 backdrop-blur-sm">
                <Image
                  src="/images/hero/hero-1.jpg"
                  alt="Golden Sortex Cleaned Toor Dal"
                  fill
                  priority
                  sizes="(max-width: 1024px) 90vw, 40vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-2xl bg-primary-dark/85 backdrop-blur-md border border-white/15 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-secondary-light tracking-wider block">
                      Guaranteed Quality
                    </span>
                    <span className="font-heading font-black text-sm text-white">
                      100% Sortex Optical Sorted
                    </span>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-white">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Floating Second Card Accent */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                className="hidden sm:flex absolute -bottom-8 -left-8 p-3 rounded-2xl bg-white text-primary-dark shadow-navy-lg border border-border items-center gap-3 z-20"
              >
                <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0">
                  <Image
                    src="/images/hero/hero-2.jpg"
                    alt="Gujarat Pulse Farm"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-secondary tracking-wider block">
                    Farm Direct Sourcing
                  </span>
                  <span className="font-heading font-extrabold text-xs text-primary-dark">
                    Saurashtra Harvest
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
