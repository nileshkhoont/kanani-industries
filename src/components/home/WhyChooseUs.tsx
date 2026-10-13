import { Shield, Sparkles, Scale, RefreshCw } from 'lucide-react';

const pillars = [
  {
    icon: Sparkles,
    title: 'Zero Artificial Polish',
    description:
      'Unlike commercially glazed lentils that use mineral oil or excessive water polishing to hide defects, our toor dal retains its natural golden grain coat, aroma, and high dietary fiber.',
  },
  {
    icon: Shield,
    title: 'Direct Sourcing Integrity',
    description:
      'We procure high-protein pigeon peas directly from certified farmer producer groups across Saurashtra and Gujarat, guaranteeing harvest freshness and complete traceability.',
  },
  {
    icon: Scale,
    title: 'Consistent Commercial Grading',
    description:
      'Every 1kg packet and 50kg export sack adheres to stringent moisture thresholds (under 12%), uniform split diameters, and zero foreign seed contamination.',
  },
  {
    icon: RefreshCw,
    title: 'Dependable High Volume Supply',
    description:
      'With automated high-throughput Sortex lines operating year-round in Gondal, we fulfill retail chains, institutional caterers, and export container orders without seasonal delays.',
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-20 md:py-28 bg-surface-alt border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-secondary">
            The Kanani Standard
          </span>
          <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-primary-dark tracking-tight">
            Why Wholesale Traders &amp; Kitchens Choose Us
          </h2>
          <p className="text-base text-ink-muted leading-relaxed">
            From field selection to computerized optical rejection, every step is designed to
            protect the flavor, nutrition, and trust of our customers.
          </p>
        </div>

        {/* 4 Card Grid with Hover Tilt */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group relative p-7 rounded-3xl bg-white border border-border hover:border-secondary/30 shadow-navy-xs hover:shadow-navy-lg transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary mb-6 group-hover:bg-gradient-leaf group-hover:text-white transition-all duration-300 shadow-navy-xs">
                    <Icon className="w-7 h-7" />
                  </div>

                  <h3 className="font-heading font-bold text-lg text-primary-dark mb-2.5">
                    {item.title}
                  </h3>
                  <p className="text-xs text-ink-muted leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-border-subtle flex items-center gap-1.5 text-[11px] font-extrabold text-primary uppercase tracking-wider">
                  <span>Guaranteed Purity</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
