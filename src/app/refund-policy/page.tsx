import { Metadata } from 'next';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Refund & Quality Replacement Policy',
  description: 'Quality guarantee, inspection procedures, and refund guidelines for Kanani Industries.',
};

export default function RefundPolicyPage() {
  return (
    <div className="py-12 md:py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-10 pb-6 border-b border-border">
        <span className="text-xs font-bold uppercase tracking-widest text-secondary block">
          Customer Satisfaction
        </span>
        <h1 className="font-heading font-black text-3xl sm:text-4xl text-primary-dark tracking-tight mt-1">
          Refund &amp; Replacement Policy
        </h1>
        <p className="text-xs text-ink-muted mt-2">Last Updated: October 2026</p>
      </div>

      <div className="prose prose-slate max-w-none space-y-6 text-sm text-ink-muted leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-heading font-bold text-lg text-primary-dark">1. 100% Sortex Quality Guarantee</h2>
          <p>
            Because we process through advanced computerized optical color sorters, Kanani Industries guarantees
            unmatched grain purity. If any sealed retail package is found to have moisture damage, defective seals,
            or quality deviations upon initial delivery, we offer a hassle-free replacement within 7 business days.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-heading font-bold text-lg text-primary-dark">2. Claim Procedure</h2>
          <p>
            To lodge a replacement or refund claim, please contact our support desk at{' '}
            <a href={`tel:${siteConfig.contact.phone}`} className="text-primary font-bold hover:underline">
              {siteConfig.contact.displayPhone}
            </a>{' '}
            or message our official WhatsApp number with photos of the sealed packaging, lot batch number, and delivery receipt.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-heading font-bold text-lg text-primary-dark">3. Non-Returnable Scenarios</h2>
          <p>
            Due to strict food safety protocols, goods that have been transferred out of original packaging,
            exposed to external kitchen moisture, or held in improper storage conditions exceeding 14 days after receipt
            are not eligible for return.
          </p>
        </section>
      </div>
    </div>
  );
}
