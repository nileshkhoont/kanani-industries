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
  return (
    <section className="py-12 bg-white border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-secondary block">
            Pure &bull; Ethical &bull; Wholesome
          </span>
          <h3 className="font-heading font-extrabold text-xl text-primary-dark mt-1">
            Naturally Good For Every Lifestyle
          </h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {lifestyles.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-surface border border-border flex items-center gap-3.5 hover:bg-surface-alt transition-colors"
              >
                <div className="w-11 h-11 rounded-xl bg-secondary/15 flex items-center justify-center text-secondary shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-sm text-primary-dark">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-ink-muted">{item.subtitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
