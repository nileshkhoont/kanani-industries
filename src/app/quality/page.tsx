import { Metadata } from 'next';
import { Eye } from 'lucide-react';
import { GlobalDistributionMap } from '@/components/ui/GlobalDistributionMap';
import { ScrollStagesTimeline, StageItem } from '@/components/quality/ScrollStagesTimeline';

export const metadata: Metadata = {
  title: 'Sortex Quality & 7-Stage Processing | Zero Chemical Polishing',
  description:
    'Discover how Kanani Industries transforms raw Saurashtra pigeon peas into pristine 99.8% pure Toor using computerized Sortex optical color sorters.',
};

const stages: StageItem[] = [
  {
    stage: '01',
    title: 'Farm-Gate Mandi Procurement',
    subtitle: 'Direct sourcing of sun-cured pigeon pea pods',
    image: '/images/process/kanani-stage-1-procurement.jpg',
    description:
      'We handpick prime harvest batches from agrarian mandis across Junagadh, Rajkot, and Saurashtra. Raw grains are tested for natural moisture (below 12%) and protein density before entering our mill premises.',
    specs: ['Direct Farmer Mandi Trade', 'Moisture Controlled (<12%)', 'High Natural Protein'],
  },
  {
    stage: '02',
    title: 'Pre-Cleaning & Dual Destoning',
    subtitle: 'Eliminating field dust, stones, and chaff',
    image: '/images/process/kanani-stage-2-cleaning.jpg',
    description:
      'Raw pulses pass through multi-deck vibro-screeners, cyclonic air aspirators, and specific-gravity destoners. All foreign field impurities, plant stalks, and heavy stones are systematically separated.',
    specs: ['99.5% Heavy Destoning', 'Vibro-Sieve Screening', 'High-Flow Air Aspiration'],
  },
  {
    stage: '03',
    title: 'Sortex Optical Color Sorting (The Core Advantage)',
    subtitle: 'High-speed CCD cameras scanning every grain',
    image: '/images/process/kanani-stage-3-sortex.jpg',
    description:
      'The heart of our technology: grains fall in a continuous curtain in front of multi-camera optical sensors operating in visible and infrared spectrums. Any grain that is discolored, chalky, insect-damaged, or spotted is instantly blown out by micro-pneumatic air nozzles firing at 1,000 pulses per second.',
    specs: ['Multi-CCD Color Inspection', '1000 Ejection Pulses/Sec', '99.8% Purity Ratio'],
  },
  {
    stage: '04',
    title: 'Precision Grading & Size Calibration',
    subtitle: 'Segregating bold kernels from small seeds',
    image: '/images/process/kanani-stage-4-grading.jpg',
    description:
      'Color-sorted grains are passed through rotary drum sieves to classify them by grain diameter. This guarantees that your bag contains consistent, evenly sized dry toor that cooks uniformly.',
    specs: ['Rotary Cylinder Calibration', 'Even Cooking Assured', 'Separation of Broken Pieces'],
  },
  {
    stage: '05',
    title: 'Pulse Conditioning & Processing',
    subtitle: 'Preserving the nutrient-rich germ and seed integrity',
    image: '/images/process/kanani-stage-5-processing.jpg',
    description:
      'Whole dry toor grains undergo precise moisture conditioning and gentle mechanical processing. This stabilizes internal grain moisture and safeguards the natural protein and mineral density of the pulse.',
    specs: ['Precision Conditioning', 'Cold Mechanical Processing', 'Kernel Germ Preservation'],
  },
  {
    stage: '06',
    title: '100% Natural Finishing (No Mineral Oil Polish)',
    subtitle: 'Pure toor, free from artificial glazes',
    image: '/images/process/kanani-stage-6-natural.jpg',
    description:
      'Unlike commercial producers who apply synthetic paraffin or mineral oil for artificial shine, Kanani Industries relies purely on dry buffing and natural conditioning. The grain keeps its natural golden luster, authentic sweet taste, and high dietary fiber.',
    specs: ['Zero Mineral Oil', 'Zero Artificial Dyes', 'Chemical-Free Food Safety'],
  },
  {
    stage: '07',
    title: 'Hygienic Moisture-Barrier Packaging',
    subtitle: 'Freshness locked until kitchen preparation',
    image: '/images/process/kanani-stage-7-packaging.jpg',
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
        <div className="p-8 sm:p-14 rounded-3xl bg-white border border-border/80 shadow-navy-xs relative overflow-hidden min-h-[380px] flex items-center">
          {/* Animated Global Distribution Map Background */}
          <GlobalDistributionMap />

          <div className="max-w-3xl space-y-4 relative z-10">
            <span className="inline-block px-3.5 py-1.5 rounded-full bg-secondary/10 text-xs font-bold uppercase tracking-widest text-secondary border border-secondary/20">
              State-of-the-Art Processing
            </span>
            <h1 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-tight text-primary-dark">
              The Science of Sortex Grain Purity.
            </h1>
            <p className="text-base sm:text-lg text-ink-muted leading-relaxed">
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

      {/* Vertical Animated Timeline with Dynamic Scroll-Driven Active Stage */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <ScrollStagesTimeline stages={stages} />
      </section>
    </div>
  );
}
