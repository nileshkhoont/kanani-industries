import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export function AboutTeaser() {
  return (
    <section className="py-20 md:py-28 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Visual Column (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-4/3 rounded-3xl overflow-hidden shadow-navy-lg border border-border">
              <Image
                src="/images/about/about-facility.jpg"
                alt="Kanani Industries Modern Milling Facility"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>

            {/* Experience Badge Card */}
            <div className="absolute -bottom-6 -right-4 sm:-right-6 p-4 rounded-2xl bg-primary-dark text-white shadow-navy-xl border border-white/10 max-w-[220px]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent text-primary-dark flex items-center justify-center font-heading font-black text-lg shrink-0">
                  28+
                </div>
                <div>
                  <span className="font-heading font-bold text-xs leading-tight block">
                    Years of Pulse
                  </span>
                  <span className="text-[11px] text-white/70">Heritage in Gujarat</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Text Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-secondary">
                About Kanani Industries
              </span>
              <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-primary-dark tracking-tight">
                Rooted in Gujarat’s Agrarian Heartland, Serving the World.
              </h2>
            </div>

            <p className="text-base text-ink-muted leading-relaxed">
              Founded in Gondal, the pulse capital of Saurashtra, Kanani Industries has grown from a
              regional grain trading firm into an integrated processor, brand holder, and international
              exporter. We bridge the distance between honest farming families and modern dinner tables.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <span className="text-sm font-semibold text-primary-dark">
                  Multi-CCD Optical Color Sorting Technology
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <span className="text-sm font-semibold text-primary-dark">
                  Direct Mandi Procurement from Gujarat Farmers
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <span className="text-sm font-semibold text-primary-dark">
                  Proprietary Brands: Savaj, Ganesh, Nilkanth &amp; Natural
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <span className="text-sm font-semibold text-primary-dark">
                  Custom Bulk Export Packing (25kg, 30kg &amp; 50kg)
                </span>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-primary hover:bg-primary-light text-white font-heading font-bold text-sm shadow-navy-sm transition-all duration-200 hover:scale-105 active:scale-95"
              >
                <span>Read Our Story</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
