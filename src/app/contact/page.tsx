import { Metadata } from 'next';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  PhoneCall,
} from 'lucide-react';
import { siteConfig } from '@/config/site';
import { ContactForm } from '@/components/contact/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us | Gondal Milling Facility & Sales Desk',
  description:
    'Get in touch with Kanani Industries in Gondal, Gujarat. Phone, email, address, Google Maps directions, and WhatsApp trade support.',
};

export default function ContactPage() {
  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(
    'Hello Kanani Industries, I have an inquiry regarding your Sortex toor dal brands.'
  )}`;

  return (
    <div className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner */}
        <div className="mb-12 text-center sm:text-left">
          <span className="text-xs font-bold uppercase tracking-widest text-secondary block">
            Direct Trade Support
          </span>
          <h1 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-primary-dark tracking-tight mt-1">
            Connect With Our Team
          </h1>
          <p className="text-sm sm:text-base text-ink-muted mt-2 max-w-2xl">
            Whether you run a regional wholesale mandi shop, a supermarket chain, or an overseas
            import desk, our Gondal headquarters is ready to assist you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Form (7 cols) */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

          {/* Right Contact Info & Map (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Address & Quick Actions Card */}
            <div className="p-8 rounded-3xl bg-primary-dark text-white shadow-navy-md space-y-6">
              <h3 className="font-heading font-black text-xl text-white pb-3 border-b border-white/15">
                Headquarters &amp; Processing Facility
              </h3>

              <div className="space-y-4 text-sm text-white/85">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-secondary-light shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-heading font-bold text-sm">
                      {siteConfig.legalName}
                    </strong>
                    <p className="text-xs text-white/70 mt-0.5 leading-relaxed">
                      {siteConfig.contact.address.full}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-secondary-light shrink-0" />
                  <div>
                    <span className="text-[11px] text-white/60 block">Direct Line</span>
                    <a
                      href={`tel:${siteConfig.contact.phone}`}
                      className="font-bold text-white hover:text-accent transition-colors"
                    >
                      {siteConfig.contact.displayPhone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-secondary-light shrink-0" />
                  <div>
                    <span className="text-[11px] text-white/60 block">Email Inquiries</span>
                    <a
                      href={`mailto:${siteConfig.contact.email}`}
                      className="font-bold text-white hover:text-accent transition-colors"
                    >
                      {siteConfig.contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-secondary-light shrink-0" />
                  <div>
                    <span className="text-[11px] text-white/60 block">Operational Hours</span>
                    <span className="text-xs font-semibold text-white/90">
                      Monday &ndash; Saturday: 9:00 AM &ndash; 7:30 PM IST
                    </span>
                  </div>
                </div>
              </div>

              {/* Call & WhatsApp Action Buttons */}
              <div className="pt-2 grid grid-cols-2 gap-3 border-t border-white/15">
                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  className="py-3 px-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-heading font-bold text-xs flex items-center justify-center gap-2 border border-white/20 transition-all text-center"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-accent" />
                  <span>Call Us</span>
                </a>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded-2xl bg-secondary hover:bg-secondary-dark text-white font-heading font-bold text-xs flex items-center justify-center gap-2 shadow-navy-xs transition-all text-center"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-current" />
                  <span>WhatsApp Chat</span>
                </a>
              </div>
            </div>

            {/* Google Map Embed */}
            <div className="rounded-3xl overflow-hidden border border-border shadow-navy-sm bg-white aspect-16/10 relative">
              <iframe
                title="Kanani Industries Facility Location Map"
                src={siteConfig.contact.googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
