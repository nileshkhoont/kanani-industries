import { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { formatPrice } from '@/lib/format';

export const metadata: Metadata = {
  title: 'Shipping & Delivery Policy',
  description: 'Shipping, dispatch timelines, and freight policies for Kanani Industries toor dal orders.',
};

export default function ShippingPolicyPage() {
  return (
    <div className="py-12 md:py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-10 pb-6 border-b border-border">
        <span className="text-xs font-bold uppercase tracking-widest text-secondary block">
          Logistics &amp; Transport
        </span>
        <h1 className="font-heading font-black text-3xl sm:text-4xl text-primary-dark tracking-tight mt-1">
          Shipping &amp; Delivery Policy
        </h1>
        <p className="text-xs text-ink-muted mt-2">Last Updated: October 2026</p>
      </div>

      <div className="prose prose-slate max-w-none space-y-6 text-sm text-ink-muted leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-heading font-bold text-lg text-primary-dark">1. Domestic Dispatch (Within India)</h2>
          <p>
            Retail and regional store orders are dispatched from our central facility in Gondal, Gujarat
            within 24–48 hours of order confirmation. Delivery timelines vary from 2 to 4 business days
            within Gujarat, and 4 to 7 business days for pan-India delivery destinations.
          </p>
          <p>
            <strong>Free Shipping:</strong> Domestic retail orders exceeding {formatPrice(siteConfig.freeShippingThreshold)}
            qualify for free standard delivery across Gujarat and select regional transport hubs.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-heading font-bold text-lg text-primary-dark">2. Wholesale Mandi &amp; Truckload Freight</h2>
          <p>
            Truckload dispatches (10 MT to 30 MT) for APMC wholesalers are coordinated via verified transport contractors
            on freight-to-pay (To-Pay) or prepaid freight basis. Weight slip tickets from certified electronic weighbridges
            accompany each consignment.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-heading font-bold text-lg text-primary-dark">3. International Ocean Freight</h2>
          <p>
            Containerized export dispatches are staged from Mundra Port (INMUN1) or Kandla Port (INIXY1).
            Bill of Lading (B/L) drafts, export packing lists, and vessel booking confirmations are issued promptly
            in accordance with the agreed international commercial terms (FOB/CIF/CFR).
          </p>
        </section>
      </div>
    </div>
  );
}
