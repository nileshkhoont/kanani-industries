import { Filter, ShieldCheck, Leaf, Globe2 } from 'lucide-react';

const badges = [
  {
    icon: Filter,
    title: 'Sortex Cleaned',
    subtitle: '99.8% Color-sorted purity',
  },
  {
    icon: ShieldCheck,
    title: 'Hygienically Packed',
    subtitle: 'Food-grade barrier pouches & bags',
  },
  {
    icon: Leaf,
    title: '100% Natural',
    subtitle: 'Zero artificial polish or colors',
  },
  {
    icon: Globe2,
    title: 'Pan-India & Export Delivery',
    subtitle: 'Global logistics & container dispatch',
  },
];

export function TrustStrip() {
  const repeatedBadges = [...badges, ...badges];

  return (
    <section className="relative bg-surface-alt border-y border-border py-4 sm:py-5 overflow-hidden select-none">
      {/* Left & Right Soft Fade Gradients for Seamless Look */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-28 bg-gradient-to-r from-surface-alt to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-28 bg-gradient-to-l from-surface-alt to-transparent z-10" />

      {/* Infinite Right-to-Left Continuous Slider */}
      <div className="flex w-max animate-trust-marquee hover:[animation-play-state:paused]">
        {/* Track 1 */}
        <div className="flex shrink-0 items-center gap-4 sm:gap-6 pr-4 sm:pr-6">
          {repeatedBadges.map((badge, idx) => {
            const Icon = badge.icon;
            return (
              <div
                key={`track1-${idx}`}
                className="flex items-center gap-3.5 px-4 py-3 sm:px-5 sm:py-3.5 rounded-2xl bg-white border border-border/80 shadow-navy-xs shrink-0 whitespace-nowrap transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-navy-sm cursor-default"
              >
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
                  <Icon className="w-5 h-5 sm:w-5.5 sm:h-5.5" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-xs sm:text-sm text-primary-dark">
                    {badge.title}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-ink-muted mt-0.5">{badge.subtitle}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Track 2 (Duplicate for seamless infinite wrap) */}
        <div className="flex shrink-0 items-center gap-4 sm:gap-6 pr-4 sm:pr-6" aria-hidden="true">
          {repeatedBadges.map((badge, idx) => {
            const Icon = badge.icon;
            return (
              <div
                key={`track2-${idx}`}
                className="flex items-center gap-3.5 px-4 py-3 sm:px-5 sm:py-3.5 rounded-2xl bg-white border border-border/80 shadow-navy-xs shrink-0 whitespace-nowrap transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-navy-sm cursor-default"
              >
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
                  <Icon className="w-5 h-5 sm:w-5.5 sm:h-5.5" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-xs sm:text-sm text-primary-dark">
                    {badge.title}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-ink-muted mt-0.5">{badge.subtitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
