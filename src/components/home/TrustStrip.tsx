import { Sparkles, ShieldCheck, Leaf, Globe2 } from 'lucide-react';

const badges = [
  {
    icon: Sparkles,
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
  return (
    <section className="relative bg-surface-alt border-y border-border py-6 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6">
          {badges.map((badge, idx) => {
            const Icon = badge.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-3.5 p-3 rounded-2xl bg-white border border-border/80 shadow-navy-xs"
              >
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-sm text-primary-dark">
                    {badge.title}
                  </h4>
                  <p className="text-xs text-ink-muted mt-0.5">{badge.subtitle}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile Infinite Marquee */}
        <div className="md:hidden flex gap-4 overflow-x-auto no-scrollbar py-1">
          {badges.map((badge, idx) => {
            const Icon = badge.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-border shadow-navy-xs shrink-0 min-w-[260px]"
              >
                <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-xs text-primary-dark">
                    {badge.title}
                  </h4>
                  <p className="text-[11px] text-ink-muted">{badge.subtitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
