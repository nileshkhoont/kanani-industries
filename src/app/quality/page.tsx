import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  Eye,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Sortex Quality & 7-Stage Processing | Zero Chemical Polishing',
  description:
    'Discover how Kanani Industries transforms raw Saurashtra pigeon peas into pristine 99.8% pure Toor using computerized Sortex optical color sorters.',
};

const stages = [
  {
    stage: '01',
    title: 'Farm-Gate Mandi Procurement',
    subtitle: 'Direct sourcing of sun-cured pigeon pea pods',
    image: '/images/process/step-1-sourcing.jpg',
    description:
      'We handpick prime harvest batches from agrarian mandis across Junagadh, Rajkot, and Saurashtra. Raw grains are tested for natural moisture (below 12%) and protein density before entering our mill premises.',
    specs: ['Direct Farmer Mandi Trade', 'Moisture Controlled (<12%)', 'High Natural Protein'],
  },
  {
    stage: '02',
    title: 'Pre-Cleaning & Dual Destoning',
    subtitle: 'Eliminating field dust, stones, and chaff',
    image: '/images/process/step-2-cleaning.jpg',
    description:
      'Raw pulses pass through multi-deck vibro-screeners, cyclonic air aspirators, and specific-gravity destoners. All foreign field impurities, plant stalks, and heavy stones are systematically separated.',
    specs: ['99.5% Heavy Destoning', 'Vibro-Sieve Screening', 'High-Flow Air Aspiration'],
  },
  {
    stage: '03',
    title: 'Sortex Optical Color Sorting (The Core Advantage)',
    subtitle: 'High-speed CCD cameras scanning every grain',
    image: '/images/process/step-3-sortex.jpg',
    description:
      'The heart of our technology: grains fall in a continuous curtain in front of multi-camera optical sensors operating in visible and infrared spectrums. Any grain that is discolored, chalky, insect-damaged, or spotted is instantly blown out by micro-pneumatic air nozzles firing at 1,000 pulses per second.',
    specs: ['Multi-CCD Color Inspection', '1000 Ejection Pulses/Sec', '99.8% Purity Ratio'],
    highlight: true,
  },
  {
    stage: '04',
    title: 'Precision Grading & Size Calibration',
    subtitle: 'Segregating bold kernels from small seeds',
    image: '/images/process/step-4-milling.jpg',
    description:
      'Color-sorted grains are passed through rotary drum sieves to classify them by split diameter. This guarantees that your bag contains consistent, evenly sized toor that cooks uniformly.',
    specs: ['Rotary Cylinder Calibration', 'Even Boiling Assured', 'Separation of Broken Pieces'],
  },
  {
    stage: '05',
    title: 'Gentle Dehusking & Symmetrical Splitting',
    subtitle: 'Preserving the nutrient-rich germ',
    image: '/images/process/step-4-milling.jpg',
    description:
      'Using rubber-lined emery dehusking cones, the outer brown seed coat is peeled away with minimal frictional heat. The split yellow cotyledons remain intact with their essential vitamin and mineral coatings.',
    specs: ['Emery Cone Dehusking', 'Cold Mechanical Milling', 'Kernel Germ Preservation'],
  },
  {
    stage: '06',
    title: '100% Natural Finishing (No Mineral Oil Polish)',
    subtitle: 'Pure toor, free from artificial glazes',
    image: '/images/process/step-1-sourcing.jpg',
    description:
      'Unlike commercial producers who apply synthetic paraffin or mineral oil for artificial shine, Kanani Industries relies purely on dry buffing and natural conditioning. The grain keeps its natural golden luster, authentic sweet taste, and high dietary fiber.',
    specs: ['Zero Mineral Oil', 'Zero Artificial Dyes', 'Chemical-Free Food Safety'],
  },
  {
    stage: '07',
    title: 'Hygienic Moisture-Barrier Packaging',
    subtitle: 'Freshness locked until kitchen preparation',
    image: '/images/process/step-5-packaging.jpg',
    description:
      'Automated form-fill-seal machines pack the finished Sortex toor into laminated food-grade retail pouches (1kg, 5kg) and heavy-gauge woven polypropylene/jute bags (25kg, 30kg, 50kg) for domestic and global export dispatch.',
    specs: ['Heavy-Gauge 50kg Export Bags', 'Food-Grade 1kg/5kg Pouches', 'Tamper-Evident Stitching'],
  },
];

export default function QualityPage() {
  return (
    <div className="py-12 md:py-20">
      {/* Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="p-8 sm:p-14 rounded-3xl bg-gradient-brand text-white shadow-navy-lg relative overflow-hidden">
          <div className="max-w-3xl space-y-4 relative z-10">
            <span className="inline-block px-3.5 py-1.5 rounded-full bg-white/10 text-xs font-bold uppercase tracking-widest text-accent border border-white/20">
              State-of-the-Art Processing
            </span>
            <h1 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-tight text-white">
              The Science of Sortex Grain Purity.
            </h1>
            <p className="text-base sm:text-lg text-white/85 leading-relaxed">
              What is Sortex sorting? It is computerized optical color sorting that inspects every
              single grain with micro-cameras, blowing away discolored, black-spotted, or foreign seeds.
              Here is how we deliver 99.8% spotless golden Toor across 7 rigorous stages.
            </p>
          </div>
        </div>
      </section>

      {/* Simple Sortex Explanation Card */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="p-8 rounded-3xl bg-surface-alt border border-secondary/30 shadow-navy-xs flex flex-col md:flex-row items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-secondary text-white flex items-center justify-center shrink-0 shadow-navy-xs">
            <Eye className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="font-heading font-black text-xl text-primary-dark">
              Sortex Technology Explained in 30 Seconds
            </h3>
            <p className="text-sm text-ink-muted leading-relaxed">
              Traditional pulse sorting relies on manual hand-picking, which is slow and misses inner
              discolorations. <strong>Sortex</strong> uses industrial multi-CCD optical cameras and
              high-speed microprocessors. As millions of grains free-fall through the machine, optical
              sensors detect color anomalies (black spots, brown burns, chalky seeds) and fire supersonic
              air ejectors that blow defects out into a reject bin, letting only flawless golden grains pass.
            </p>
          </div>
        </div>
      </section>

      {/* Vertical Animated Timeline */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="relative border-l-2 border-secondary/40 ml-4 sm:ml-8 lg:ml-12 pl-6 sm:pl-10 lg:pl-16 space-y-16">
          {stages.map((stage, idx) => (
            <div key={idx} className="relative group">
              {/* Timeline marker icon */}
              <div
                className={`absolute -left-[35px] sm:-left-[51px] lg:-left-[75px] top-4 w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-xs font-black shadow-navy-sm border-2 ${
                  stage.highlight
                    ? 'bg-secondary text-white border-white scale-110 ring-4 ring-secondary/20'
                    : 'bg-white text-primary-dark border-secondary'
                }`}
              >
                {stage.stage}
              </div>

              {/* Stage Card */}
              <div
                className={`p-6 sm:p-8 rounded-3xl bg-white border shadow-navy-xs transition-all hover:shadow-navy-md ${
                  stage.highlight
                    ? 'border-secondary/40 ring-1 ring-secondary/20'
                    : 'border-border'
                }`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7 space-y-4">
                    <div>
                      <span className="text-[11px] font-black uppercase tracking-wider text-secondary">
                        Stage {stage.stage} • {stage.subtitle}
                      </span>
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
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-surface-alt text-xs font-bold text-primary"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-secondary" />
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="lg:col-span-5">
                    <div className="relative aspect-16/10 rounded-2xl overflow-hidden shadow-navy-xs border border-border">
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
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary hover:bg-primary-light text-white font-heading font-bold text-sm shadow-navy-sm transition-all"
          >
            <span>Experience The Sortex Difference in Every Dish</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
