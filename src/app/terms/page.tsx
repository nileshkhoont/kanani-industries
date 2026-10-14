import { Metadata } from 'next';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'Terms and Conditions of sales, trading, and website usage for Kanani Industries.',
};

export default function TermsPage() {
  return (
    <div className="py-12 md:py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-10 pb-6 border-b border-border">
        <span className="text-xs font-bold uppercase tracking-widest text-secondary block">
          Legal Agreement
        </span>
        <h1 className="font-heading font-black text-3xl sm:text-4xl text-primary-dark tracking-tight mt-1">
          Terms &amp; Conditions
        </h1>
        <p className="text-xs text-ink-muted mt-2">Last Updated: October 2026</p>
      </div>

      <div className="prose prose-slate max-w-none space-y-6 text-sm text-ink-muted leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-heading font-bold text-lg text-primary-dark">1. Overview</h2>
          <p>
            Welcome to the official website of {siteConfig.legalName} (&quot;Company&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;).
            By accessing our website, browsing our product listings, or placing wholesale or retail orders,
            you agree to be bound by the following terms and conditions.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-heading font-bold text-lg text-primary-dark">2. Products &amp; Pricing</h2>
          <p>
            All products listed on this website represent agricultural pulses (Sortex Toor Dal / Split Pigeon Peas)
            processed and packaged under our brands (Savaj, Ganesh, Nilkanth, and Natural).
            Prices are quoted in Indian Rupees (INR) per kilogram and include applicable agricultural mandi cess and statutory taxes.
            Bulk wholesale and export prices are subject to prevailing APMC market fluctuations and contract agreements.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-heading font-bold text-lg text-primary-dark">3. Orders &amp; Communication</h2>
          <p>
            Orders initiated via our website are processed directly through WhatsApp communication or official purchase orders.
            An order is considered confirmed only upon issuance of an invoice or proforma from our sales desk in Junagadh, Gujarat.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-heading font-bold text-lg text-primary-dark">4. Export Contracts</h2>
          <p>
            International trade shipments (FOB / CIF / CFR) are governed by standard Incoterms 2020 rules and verified
            via bilateral contracts detailing moisture tolerance (under 12%), foreign seed limits, and independent surveyor inspections.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-heading font-bold text-lg text-primary-dark">5. Jurisdiction</h2>
          <p>
            Any disputes arising out of domestic or international transactions shall be subject to the exclusive jurisdiction
            of the courts in Junagadh, Gujarat, India.
          </p>
        </section>
      </div>
    </div>
  );
}
