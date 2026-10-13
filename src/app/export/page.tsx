import { Metadata } from 'next';
import {
  Globe2,
  Ship,
  FileCheck2,
  CheckCircle2,
} from 'lucide-react';
import { siteConfig } from '@/config/site';
import { ExportEnquiryForm } from '@/components/export/ExportEnquiryForm';

export const metadata: Metadata = {
  title: 'Import & Export | Global Bulk Sortex Toor Supply',
  description:
    'Kanani Industries exports premium Sortex toor dal globally in 25kg, 30kg, and 50kg bulk bags with complete phytosanitary, origin, and SGS inspection certificates.',
};

const packingSizes = [
  {
    weight: '25 KG',
    type: 'Multi-Wall Moisture Barrier PP Bags',
    idealFor: 'Regional Distributors & High-Turnover Supermarkets',
    features: [
      'Biaxially oriented polypropylene (BOPP) outer layer',
      'High resistance against tropical humidity & sea spray',
      'Clean pallet stacking (40 bags per metric tonne)',
    ],
  },
  {
    weight: '30 KG',
    type: 'Gulf Standard Food-Grade Bags',
    idealFor: 'Middle East & GCC Importers',
    features: [
      'Standardized for GCC wholesale pulse markets',
      'Tamper-evident heat-sealed thread stitching',
      'Bilingual Arabic/English labeling available on demand',
    ],
  },
  {
    weight: '50 KG',
    type: 'Heavy-Duty Woven Jute & PP Commodity Sacks',
    idealFor: 'Commercial Millers, Caterers & Bulk Re-baggers',
    features: [
      'High tensile strength for rough ocean logistics',
      'Breathable natural jute or reinforced virgin PP woven',
      'Optimal 20ft / 40ft container payload utilization (24-26 MT)',
    ],
  },
];

const exportCertifications = [
  {
    title: 'Phytosanitary Certification',
    issuer: 'Ministry of Agriculture, Govt. of India',
    description:
      'Official plant quarantine certificate verifying zero pest presence, fungal pathogens, or prohibited weed seeds.',
  },
  {
    title: 'Certificate of Origin',
    issuer: 'Gujarat Chamber of Commerce & Industry',
    description:
      'Legal verification of genuine Indian agrarian origin for preferential tariff treatment under international trade treaties.',
  },
  {
    title: 'Independent SGS / Geo-Chem Analysis',
    issuer: 'Third-Party Accredited Inspection Bodies',
    description:
      'Pre-shipment verification of moisture content, broken grain percentage, protein count, and pesticide residue limits.',
  },
  {
    title: 'Fumigation & Clean Container Stuffing',
    issuer: 'Certified Port Pest Control Authorities',
    description:
      'Methyl Bromide / Phosphine fumigation before vessel loading at Mundra or Kandla container terminals.',
  },
];

export default function ExportPage() {
  return (
    <div className="py-12 md:py-20">
      {/* Hero Banner with Globe Motif */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="p-8 sm:p-14 rounded-3xl bg-gradient-brand text-white shadow-navy-lg relative overflow-hidden">
          {/* Decorative Rotating Globe Line Art */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none opacity-20">
            <svg
              className="w-full h-full animate-[spin_50s_linear_infinite]"
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="2" strokeDasharray="6 6" />
              <ellipse cx="100" cy="100" rx="80" ry="35" stroke="currentColor" strokeWidth="1.5" />
              <ellipse cx="100" cy="100" rx="35" ry="80" stroke="currentColor" strokeWidth="1.5" />
              <line x1="20" y1="100" x2="180" y2="100" stroke="currentColor" strokeWidth="2" />
            </svg>
          </div>

          <div className="max-w-3xl space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-xs font-bold uppercase tracking-widest text-accent border border-white/20">
              <Globe2 className="w-4 h-4 text-accent" />
              <span>International Trade &bull; Global Supply Network</span>
            </div>
            <h1 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-tight text-white">
              Exporting Gujarat’s Best Toor Dal to Global Harbors.
            </h1>
            <p className="text-base sm:text-lg text-white/85 leading-relaxed">
              Strategically situated in Gondal with uninterrupted transit routes to Mundra and Kandla
              ports, Kanani Industries supplies 20ft and 40ft containerloads of Sortex Toor Dal across
              18+ nations.
            </p>
          </div>
        </div>
      </section>

      {/* Global Country Chip Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-border shadow-navy-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-secondary block">
                Trade Destinations
              </span>
              <h2 className="font-heading font-black text-2xl text-primary-dark mt-0.5">
                Active International Export Markets
              </h2>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-ink-muted">
              <Ship className="w-4 h-4 text-secondary" />
              <span>Direct Ocean Container Dispatches</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {siteConfig.exportCountries.map((c) => (
              <div
                key={c.code}
                className="p-3.5 rounded-2xl bg-surface hover:bg-surface-alt border border-border flex items-center gap-3 transition-colors group"
              >
                <span className="text-2xl group-hover:scale-110 transition-transform">
                  {c.flag}
                </span>
                <div className="min-w-0">
                  <h4 className="font-heading font-bold text-xs text-primary-dark truncate">
                    {c.name}
                  </h4>
                  <span className="text-[10px] text-ink-muted block truncate">
                    {c.region}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bulk Packaging Sizes Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-secondary">
            Bulk Logistics Options
          </span>
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-primary-dark tracking-tight">
            Packaging Engineered for Ocean Transit
          </h2>
          <p className="text-sm text-ink-muted leading-relaxed">
            All sacks are moisture-proofed, puncture-resistant, and machine-stitched to endure rough
            maritime transit without loss of grain luster or hygiene.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packingSizes.map((pack, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-white border border-border shadow-navy-xs hover:shadow-navy-md transition-all flex flex-col justify-between space-y-6"
            >
              <div>
                <div className="flex items-baseline justify-between mb-4">
                  <span className="font-heading font-black text-3xl text-primary-dark">
                    {pack.weight}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-secondary/10 text-secondary font-bold text-xs">
                    Export Ready
                  </span>
                </div>

                <h3 className="font-heading font-bold text-lg text-primary-dark mb-2">
                  {pack.type}
                </h3>
                <p className="text-xs font-semibold text-secondary mb-4">
                  Target: {pack.idealFor}
                </p>

                <ul className="space-y-2.5 text-xs text-ink-muted">
                  {pack.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-border-subtle text-xs text-ink-muted font-medium">
                Container capacity: ~24–26 MT per 20ft FCL
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Export Certifications & Documentation */}
      <section className="bg-surface-alt border-y border-border py-20 mb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-secondary">
              Total Regulatory Compliance
            </span>
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-primary-dark tracking-tight">
              Export Documentation &amp; Quality Checks
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {exportCertifications.map((cert, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-white border border-border shadow-navy-xs space-y-3"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                  <FileCheck2 className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-base text-primary-dark">
                    {cert.title}
                  </h4>
                  <span className="text-[11px] font-bold text-secondary block mt-0.5">
                    {cert.issuer}
                  </span>
                </div>
                <p className="text-xs text-ink-muted leading-relaxed">
                  {cert.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Export Enquiry Form Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ExportEnquiryForm />
      </section>
    </div>
  );
}
