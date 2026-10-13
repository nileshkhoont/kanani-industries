'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { Eye, Filter, Sparkles, PackageCheck, ArrowRight } from 'lucide-react';

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
    icon: Sparkles,
    title: 'Grading & Precision Splitting',
    description:
      'Uniform unblemished kernels are dehusked and split into symmetrical halves while preserving natural kernel germ and nutrient-dense inner fibers.',
  },
  {
    step: '04',
    icon: PackageCheck,
    title: 'Hygienic Moisture-Proof Bagging',
    description:
      'Zero synthetic polish or water glazing. Packaged directly into food-grade retail pouches and heavy-duty 25kg/50kg export bags.',
  },
];

export function ProcessTeaser() {
  return (
    <section className="py-20 md:py-28 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-secondary">
            Engineering Grain Perfection
          </span>
          <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-primary-dark tracking-tight">
            How Sortex Color Sorting Works
          </h2>
          <p className="text-base text-ink-muted leading-relaxed">
            Sortex sorting is high-tech optical color separation. Powerful computerized cameras
            inspect each grain individually, rejecting discolored, immature, or foreign seeds with
            precision air jets for 99.8% spotless purity.
          </p>
        </div>

        {/* 4 Step Horizontal Cards */}
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
                className="relative rounded-3xl bg-white border border-border p-6 shadow-navy-xs hover:shadow-navy-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-heading font-black text-3xl text-border group-hover:text-secondary transition-colors">
                      {item.step}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-surface-alt flex items-center justify-center text-primary group-hover:bg-secondary group-hover:text-white transition-all">
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

                <div className="pt-6 mt-4 border-t border-border-subtle flex items-center gap-1.5 text-xs font-bold text-secondary">
                  <span>Grade Standard A+</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/quality"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-surface-alt hover:bg-border text-primary font-heading font-bold text-xs uppercase tracking-wider transition-colors"
          >
            <span>Explore Full Sortex Technology &amp; Quality Parameters</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
