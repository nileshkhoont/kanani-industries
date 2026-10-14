import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  Target,
  Eye,
  ShieldCheck,
  HeartHandshake,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us | Heritage & Sortex Pulse Milling',
  description:
    'Learn about Kanani Industries — our 28-year journey from the Junagadh APMC grain market to becoming a leading Sortex toor dal processor and global exporter.',
};

const values = [
  {
    icon: Sparkles,
    title: 'Uncompromised Sortex Purity',
    description:
      'We reject shortcut chemical polishing and mineral oils. Every grain is cleaned purely through computerized optical color sorting.',
  },
  {
    icon: HeartHandshake,
    title: 'Farmer Welfare & Mandi Integrity',
    description:
      'We build direct relationships with Saurashtra pulse farmers, ensuring ethical compensation and consistent harvest quality.',
  },
  {
    icon: ShieldCheck,
    title: 'Hygiene & Food Safety',
    description:
      'All processing lines operate under strict moisture-controlled environments to eliminate pest risks and safeguard shelf life.',
  },
  {
    icon: Target,
    title: 'Global Trading Reliability',
    description:
      'From custom retail pouches to 50kg bulk containers, we honor every dispatch commitment with prompt logistics and documentation.',
  },
];

const milestones = [
  {
    year: '1998',
    title: 'Foundation in Junagadh Mandi',
    description:
      'Started as a dedicated raw pulse trading company in the agricultural market yard of Junagadh, Gujarat.',
  },
  {
    year: '2006',
    title: 'First Modern Dehusking Mill',
    description:
      'Set up our first semi-automated splitting and dehusking facility with a daily processing capacity of 30 tonnes.',
  },
  {
    year: '2014',
    title: 'Launch of Savaj & Ganesh Brands',
    description:
      'Transitioned into branded retail and wholesale distribution, rapidly establishing market presence across Western India.',
  },
  {
    year: '2019',
    title: 'High-Speed Sortex Optical Lines',
    description:
      'Upgraded the entire mill infrastructure with multi-camera computerized Sortex optical color sorters for 99.8% grain purity.',
  },
  {
    year: '2022',
    title: 'Global Export Desk Expansion',
    description:
      'Commenced regular container shipments through Mundra and Kandla ports to the Gulf, United Kingdom, and North America.',
  },
  {
    year: 'Present',
    title: '45,000+ Tonnes Traded Annually',
    description:
      'Operating 4 dedicated brand portfolios serving millions of families, wholesalers, and institutional caterers worldwide.',
  },
];

export default function AboutPage() {
  return (
    <div className="py-12 md:py-20">
      {/* Page Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="p-8 sm:p-14 rounded-3xl bg-gradient-brand text-white shadow-navy-lg relative overflow-hidden">
          {/* Ambient decorative glow */}
          <div
            aria-hidden="true"
            className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-secondary/20 blur-3xl pointer-events-none"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-accent/10 blur-3xl pointer-events-none"
          />

          <div className="max-w-3xl space-y-4 relative z-10">
            <span className="inline-block px-3.5 py-1.5 rounded-full bg-white/10 text-xs font-bold uppercase tracking-widest text-accent border border-white/20">
              Our Heritage &bull; Junagadh, Gujarat
            </span>
            <h1 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-tight text-white">
              Rooted in Saurashtra Soil,{' '}
              <span className="text-accent">Milling Purity for the World.</span>
            </h1>
            <p className="text-base sm:text-lg text-white/90 leading-relaxed font-normal">
              For over 28 years, Kanani Industries has honored Gujarat’s rich agrarian traditions by
              delivering pristine, Sortex-cleaned Toor Dal (Pigeon Peas) under our own established
              brands: Savaj, Ganesh, Nilkanth, and Natural.
            </p>
          </div>
        </div>
      </section>

      {/* Story & Facility Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-secondary">
                The Kanani Journey
              </span>
              <h2 className="font-heading font-black text-3xl sm:text-4xl text-primary-dark tracking-tight">
                From Saurashtra Mandis to Global Kitchens
              </h2>
            </div>

            <p className="text-base text-ink-muted leading-relaxed">
              Gujarat’s Saurashtra region produces some of the world’s most flavorful pigeon peas,
              blessed with rich black cotton soils and radiant sunshine. However, raw pulses often
              contain natural irregularities — chalky grains, broken halves, and foreign seeds.
            </p>

            <p className="text-base text-ink-muted leading-relaxed">
              Kanani Industries was founded to solve this challenge through technological precision.
              By investing in state-of-the-art optical color-sorting machines (Sortex), we ensure that
              only full-bodied, golden, unblemished grains reach our customers. We say no to synthetic
              oil treatments and artificial glazes, preserving the authentic nutritional integrity of
              every pulse.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-white border border-border shadow-navy-xs">
                <span className="font-heading font-black text-2xl text-primary-dark">28+</span>
                <span className="text-xs text-ink-muted block mt-0.5">Years of pulse milling</span>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-border shadow-navy-xs">
                <span className="font-heading font-black text-2xl text-secondary">99.8%</span>
                <span className="text-xs text-ink-muted block mt-0.5">Sortex grain purity rate</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="relative aspect-4/5 rounded-3xl overflow-hidden shadow-navy-md">
              <Image
                src="/images/about/about-heritage.jpg"
                alt="Gujarat Pigeon Pea Harvest"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative aspect-4/5 rounded-3xl overflow-hidden shadow-navy-md sm:translate-y-8">
              <Image
                src="/images/about/about-quality.jpg"
                alt="Pulse Quality Laboratory"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="bg-surface-alt border-y border-border py-20 mb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-border shadow-navy-sm space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center">
                <Target className="w-7 h-7" />
              </div>
              <h3 className="font-heading font-black text-2xl text-primary-dark">
                Our Mission
              </h3>
              <p className="text-sm text-ink-muted leading-relaxed">
                To process and supply nutritious, unadulterated Sortex toor dal that respects culinary
                heritage and health. We strive to be the most trusted pulse partner for families,
                wholesalers, and international importers by pairing Gujarat’s agricultural richness
                with high-precision color sorting.
              </p>
            </div>

            {/* Vision */}
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-border shadow-navy-sm space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                <Eye className="w-7 h-7" />
              </div>
              <h3 className="font-heading font-black text-2xl text-primary-dark">
                Our Vision
              </h3>
              <p className="text-sm text-ink-muted leading-relaxed">
                To position Gujarat as the gold standard of global pulse processing, pioneering zero-waste
                milling, clean energy operations, and ethical farmer relationships that span generations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-secondary">
            Our Guiding Pillars
          </span>
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-primary-dark tracking-tight">
            Values That Anchor Every Grain
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <div
                key={i}
                className="p-6 rounded-3xl bg-white border border-border shadow-navy-xs hover:shadow-navy-md transition-all space-y-3"
              >
                <div className="w-12 h-12 rounded-xl bg-surface-alt flex items-center justify-center text-secondary">
                  <Icon className="w-6 h-6" />
                </div>
                <h4 className="font-heading font-bold text-base text-primary-dark">
                  {v.title}
                </h4>
                <p className="text-xs text-ink-muted leading-relaxed">
                  {v.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Milestones Timeline */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-secondary">
            Quarter-Century Legacy
          </span>
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-primary-dark tracking-tight">
            Milestones Along Our Journey
          </h2>
        </div>

        <div className="relative border-l-2 border-secondary/30 ml-4 sm:ml-8 md:mx-auto md:max-w-3xl space-y-10 pl-6 sm:pl-8">
          {milestones.map((m, idx) => (
            <div key={idx} className="relative group">
              {/* Dot */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-5 h-5 rounded-full bg-white border-4 border-secondary group-hover:scale-125 transition-transform" />

              <div className="p-6 rounded-3xl bg-white border border-border shadow-navy-xs group-hover:shadow-navy-md transition-all space-y-2">
                <span className="inline-block px-3 py-1 rounded-full bg-secondary/10 text-secondary font-heading font-black text-xs">
                  {m.year}
                </span>
                <h4 className="font-heading font-black text-lg text-primary-dark">
                  {m.title}
                </h4>
                <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                  {m.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary hover:bg-primary-light text-white font-heading font-bold text-sm shadow-navy-sm transition-all"
          >
            <span>Explore Our 4 Signature Brands</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
