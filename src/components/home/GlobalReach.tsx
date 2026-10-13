import Link from 'next/link';
import { Globe2, ArrowRight, Ship, ShieldCheck, Box } from 'lucide-react';
import { siteConfig } from '@/config/site';

export function GlobalReach() {
  return (
    <section className="py-20 md:py-28 bg-primary-dark text-white relative overflow-hidden">
      {/* Background radial accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-secondary/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-accent/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading, Info, Features, CTA */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-xs font-bold uppercase tracking-wider text-accent border border-white/15">
              <Globe2 className="w-4 h-4" />
              <span>International Trade Desk</span>
            </div>

            <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
              Exporting Gujarat’s Premier Toor Across 18+ Global Ports
            </h2>

            <p className="text-base text-white/80 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              From our Gondal processing hub with immediate connectivity to Mundra and Kandla ports,
              Kanani Industries delivers containerized bulk pulses conforming to international
              phytosanitary and fumigation standards.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
                <Box className="w-5 h-5 text-accent shrink-0" />
                <div className="text-left">
                  <span className="font-heading font-bold text-xs text-white block">
                    Bulk Packaging
                  </span>
                  <span className="text-[11px] text-white/60">25kg, 30kg, 50kg PP/Jute</span>
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
                <Ship className="w-5 h-5 text-secondary-light shrink-0" />
                <div className="text-left">
                  <span className="font-heading font-bold text-xs text-white block">
                    Port Dispatch
                  </span>
                  <span className="text-[11px] text-white/60">FOB &amp; CIF Mundra / Kandla</span>
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-secondary-light shrink-0" />
                <div className="text-left">
                  <span className="font-heading font-bold text-xs text-white block">
                    Export Certified
                  </span>
                  <span className="text-[11px] text-white/60">SGS / Geo-Chem Inspection</span>
                </div>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                href="/export"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-accent hover:bg-accent-dark text-primary-dark font-heading font-black text-sm shadow-navy-lg flex items-center justify-center gap-2.5 transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <span>Bulk / Export Enquiry</span>
                <ArrowRight className="w-4 h-4 text-primary-dark" />
              </Link>
            </div>
          </div>

          {/* Right Column: Country Chip Grid & Rotating Globe Line Art */}
          <div className="lg:col-span-5 relative">
            <div className="p-6 rounded-3xl bg-white/5 border border-white/15 backdrop-blur-md">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                <span className="text-xs font-bold uppercase tracking-wider text-secondary-light">
                  Active Export Markets
                </span>
                <span className="text-xs text-white/60">Direct Container Lines</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {siteConfig.exportCountries.map((c) => (
                  <div
                    key={c.code}
                    className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center gap-2 transition-colors"
                  >
                    <span className="text-lg">{c.flag}</span>
                    <span className="text-xs font-semibold text-white/90 truncate">
                      {c.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
