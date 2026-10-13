import { Metadata } from 'next';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy governing data collection, storage, and processing at Kanani Industries.',
};

export default function PrivacyPage() {
  return (
    <div className="py-12 md:py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-10 pb-6 border-b border-border">
        <span className="text-xs font-bold uppercase tracking-widest text-secondary block">
          Data Protection
        </span>
        <h1 className="font-heading font-black text-3xl sm:text-4xl text-primary-dark tracking-tight mt-1">
          Privacy Policy
        </h1>
        <p className="text-xs text-ink-muted mt-2">Last Updated: October 2026</p>
      </div>

      <div className="prose prose-slate max-w-none space-y-6 text-sm text-ink-muted leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-heading font-bold text-lg text-primary-dark">1. Information We Collect</h2>
          <p>
            When you inquire about bulk orders, place orders via WhatsApp, or submit contact requests,
            we may collect your name, company name, telephone number, email address, delivery location,
            and specific pulse requirement details.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-heading font-bold text-lg text-primary-dark">2. How We Use Your Data</h2>
          <p>
            The collected information is used strictly to fulfill grain dispatches, communicate shipping status,
            provide export documentation, and answer customer support inquiries. We never sell, rent, or share
            your personal details with third-party marketing companies.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-heading font-bold text-lg text-primary-dark">3. Cookies &amp; Storage</h2>
          <p>
            We use browser localStorage strictly for retaining your shopping cart contents and session flags
            (such as announcement bar dismissals). No invasive third-party tracking pixels or telemetry tools
            are employed on this platform.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-heading font-bold text-lg text-primary-dark">4. Contacting Us</h2>
          <p>
            If you have questions regarding your personal information, please email our data protection officer at{' '}
            <a href={`mailto:${siteConfig.contact.email}`} className="text-primary font-bold hover:underline">
              {siteConfig.contact.email}
            </a>.
          </p>
        </section>
      </div>
    </div>
  );
}
