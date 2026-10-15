import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';
import { GaneshTradingLogo } from '@/components/ui/GaneshTradingLogo';
import { siteConfig } from '@/config/site';
import { MapPin, Phone, ArrowRight } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-primary-dark text-white border-t border-primary-light/20 overflow-hidden">
      {/* Decorative ambient background mesh glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-secondary/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-accent/10 blur-3xl pointer-events-none" />

      {/* Main Footer Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 mb-12">
          {/* Brand Bio Column */}
          <div className="md:col-span-12 lg:col-span-6 space-y-4">
            <Logo variant="dark-surface" size="md" />

            <p className="text-white/80 text-sm leading-relaxed max-w-xl pt-1">
              Kanani Industries is a premier Gujarat-based pulse processor and Sortex toor trader,
              delivering uncompromised color-sorted purity and dependable bulk volume worldwide.
            </p>

            <div className="pt-2">
              <div className="inline-flex items-center gap-3 px-3.5 py-2 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-sm transition-colors">
                <GaneshTradingLogo size="sm" variant="dark-surface" showSisterTag={true} />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-6 lg:col-span-3 space-y-4">
            <h4 className="font-heading text-sm font-bold tracking-wider uppercase text-white/95 border-b border-white/10 pb-2">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm text-white/75">
              <li>
                <Link href="/" className="hover:text-accent transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-secondary-light" />
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-accent transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-secondary-light" />
                  About Our Heritage
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-accent transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-secondary-light" />
                  All Brands &amp; Products
                </Link>
              </li>
              <li>
                <Link href="/quality" className="hover:text-accent transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-secondary-light" />
                  Sortex Technology
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-accent transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-secondary-light" />
                  Contact &amp; Enquiry
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-6 lg:col-span-3 space-y-4">
            <h4 className="font-heading text-sm font-bold tracking-wider uppercase text-white/95 border-b border-white/10 pb-2">
              Corporate Desk
            </h4>
            <div className="space-y-3 text-sm text-white/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-secondary-light shrink-0 mt-1" />
                <span className="text-xs leading-relaxed">
                  {siteConfig.contact.address.full}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-secondary-light shrink-0" />
                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  className="text-xs hover:text-accent transition-colors"
                >
                  {siteConfig.contact.displayPhone}
                </a>
              </div>

              <div className="pt-2">
                <Link
                  href="/admin/login"
                  className="inline-block text-[11px] text-white/40 hover:text-white/80 transition-colors uppercase tracking-wider"
                >
                  Staff Admin Login
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal Policies */}
        <div className="pt-8 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/65">
          <p>© {currentYear} {siteConfig.legalName} &amp; {siteConfig.sisterCompany}. All rights reserved.</p>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms &amp; Conditions
            </Link>
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/shipping-policy" className="hover:text-white transition-colors">
              Shipping Policy
            </Link>
            <Link href="/refund-policy" className="hover:text-white transition-colors">
              Refund Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
