'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { Eye, Filter, Scale, PackageCheck, ArrowRight } from 'lucide-react';

const steps = [
  {
    step: '01',
    icon: Filter,
    title: 'Pre-Cleaning & Destoning',
    description:
      'Raw pigeon peas from Saurashtra mandis are cleared of husks, field dust, straw, and heavy stones using vibro-sieves and gravity tables.',
  },
  {
    step: '02',
    icon: Eye,
    title: 'Sortex Optical Color Sorting',
    description:
      'High-speed multi-camera Sortex sensors scan every single falling grain in milliseconds, blowing out discolored, chalky, or spotted grains with micro-air ejectors.',
  },
  {
    step: '03',
    icon: Scale,
    title: 'Precision Density Grading & Sizing',
    description:
      'Uniform unblemished whole toor grains are graded by density, weight, and diameter, preserving 100% natural whole seed coat and nutrient-rich germ.',
  },
  {
    step: '04',
    icon: PackageCheck,
    title: 'Hygienic Moisture-Proof Bagging',
    description:
      'Zero synthetic polish or water glazing. Packaged directly into food-grade retail pouches and heavy-duty 25kg/50kg export bags.',
  },
];

function PulseLineArt({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-12 h-12 sm:w-16 sm:h-16 stroke-white stroke-[2.2] select-none pointer-events-none shrink-0 drop-shadow-md ${className}`}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Outer curved legume pod silhouette */}
      <path d="M10 32C10 18 20 10 32 10C46 10 54 22 54 32C54 44 44 54 32 54C18 54 10 44 10 32Z" />
      {/* Three round whole toor seeds inside */}
      <circle cx="23" cy="32" r="4.5" />
      <circle cx="32" cy="32" r="4.5" />
      <circle cx="41" cy="32" r="4.5" />
      {/* Subtle stem detail on top */}
      <path d="M32 10C32 6 36 3 40 4C40 8 36 10 32 10Z" />
    </svg>
  );
}

export function ProcessTeaser() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-primary-dark select-none">
      {/* Background Image: Bright Golden Dry Raw Toor Mound */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/process/golden-toor-banner-bg.jpg"
          alt="Golden Dry Raw Toor Grains Background"
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
        />
        {/* Soft, subtle gradient overlay that keeps the golden toor bright & visible */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-black/60" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header matching the reference banner layout */}
        <div className="max-w-4xl mx-auto mb-14 text-center">
          <p className="text-sm sm:text-base font-semibold tracking-wide text-white mb-3 font-sans drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
            &ldquo;Sourcing the Finest Gujarat Toor: Your Trusted Milling &amp; Export Partner.&rdquo;
          </p>

          <div className="flex items-center justify-center gap-4 sm:gap-6 mb-5">
            {/* Left Floating Line-Art Icon */}
            <PulseLineArt />

            <h2 className="font-heading font-black text-2xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight max-w-3xl drop-shadow-sm">
              Transforming Soil into Gold: Discover the Power of Superior Toor.
            </h2>

            {/* Right Floating Line-Art Icon (Mirrored) */}
            <PulseLineArt className="scale-x-[-1]" />
          </div>

          <p className="text-sm sm:text-base font-bold text-white leading-relaxed max-w-2xl mx-auto mb-6 tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
            Sortex sorting is high-tech optical color separation. Powerful computerized cameras
            inspect each grain individually, rejecting discolored, immature, or foreign seeds with
            precision air jets for 99.8% spotless purity.
          </p>

          <div>
            <Link
              href="/quality"
              className="inline-flex items-center gap-2 px-7 py-2.5 rounded-md bg-[#9D5213] hover:bg-[#B35E17] text-white font-heading font-bold text-sm shadow-xl transition-all duration-200 hover:scale-105 active:scale-95 border border-white/20"
            >
              <span>Learn More</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* 4 Step Process Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                className="relative rounded-3xl bg-white/95 hover:bg-white backdrop-blur-md border border-white/80 p-6 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group text-primary-dark"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-heading font-black text-3xl text-border group-hover:text-secondary transition-colors">
                      {item.step}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-surface-alt flex items-center justify-center text-primary group-hover:bg-secondary group-hover:text-white transition-all shadow-sm">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <h3 className="font-heading font-extrabold text-lg text-primary-dark mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-ink-muted leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-5 mt-4 border-t border-border-subtle flex items-center gap-1.5 text-xs font-bold text-secondary">
                  <span>Grade Standard A+</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
