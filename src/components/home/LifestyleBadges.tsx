import { Leaf, Heart, ShieldAlert, Dumbbell } from 'lucide-react';

const lifestyles = [
  {
    icon: Leaf,
    title: '100% Vegan',
    subtitle: 'Pure wholesome plant origin',
  },
  {
    icon: ShieldAlert,
    title: 'Naturally Gluten-Free',
    subtitle: 'Processed in dedicated pulse line',
  },
  {
    icon: Dumbbell,
    title: 'High Plant Protein',
    subtitle: 'Over 22g natural protein per 100g',
  },
  {
    icon: Heart,
    title: 'Heart Healthy & Fiber Rich',
    subtitle: 'Supports gut health & balanced diet',
  },
];

export function LifestyleBadges() {
  const repeatedLifestyles = [...lifestyles, ...lifestyles];

  return (
    <section className="relative py-10 sm:py-12 bg-white border-b border-border overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="text-center">
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-secondary block">
            Pure &bull; Ethical &bull; Wholesome
          </span>
          <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-primary-dark mt-1">
            Naturally Good For Every Lifestyle
          </h3>
        </div>
      </div>

      {/* Left & Right Soft Fade Gradients for Seamless Look */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-28 bg-gradient-to-r from-white to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-28 bg-gradient-to-l from-white to-transparent z-10" />

      {/* Infinite Right-to-Left Continuous Slider */}
      <div className="flex w-max animate-trust-marquee hover:[animation-play-state:paused]">
        {/* Track 1 */}
        <div className="flex shrink-0 items-center gap-4 sm:gap-6 pr-4 sm:pr-6">
          {repeatedLifestyles.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={`track1-${idx}`}
                className="flex items-center gap-3.5 px-5 py-3.5 sm:px-6 sm:py-4 rounded-2xl bg-surface border border-border shadow-navy-xs shrink-0 whitespace-nowrap transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-navy-sm cursor-default"
              >
                <div className="w-11 h-11 rounded-xl bg-secondary/15 flex items-center justify-center text-secondary shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-sm text-primary-dark">
                    {item.title}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-ink-muted mt-0.5">{item.subtitle}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Track 2 (Duplicate for seamless infinite wrap) */}
        <div className="flex shrink-0 items-center gap-4 sm:gap-6 pr-4 sm:pr-6" aria-hidden="true">
          {repeatedLifestyles.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={`track2-${idx}`}
                className="flex items-center gap-3.5 px-5 py-3.5 sm:px-6 sm:py-4 rounded-2xl bg-surface border border-border shadow-navy-xs shrink-0 whitespace-nowrap transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-navy-sm cursor-default"
              >
                <div className="w-11 h-11 rounded-xl bg-secondary/15 flex items-center justify-center text-secondary shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-sm text-primary-dark">
                    {item.title}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-ink-muted mt-0.5">{item.subtitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
