import Link from 'next/link';
import Image from 'next/image';
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
            {/* Logos: Kanani Industries and Second Firm Ganesh Trading Co. right after */}
            <div className="flex flex-wrap items-center gap-3.5 sm:gap-4">
              <Logo variant="dark-surface" size="md" />
              <div className="hidden sm:block h-9 w-px bg-white/20" />
              <GaneshTradingLogo size="sm" variant="dark-surface" showSisterTag={true} />
            </div>

            <p className="text-white/80 text-sm leading-relaxed max-w-xl pt-1">
              Kanani Industries is a premier Gujarat-based pulse processor and Sortex toor trader,
              delivering uncompromised color-sorted purity and dependable bulk volume worldwide.
            </p>
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

        {/* Bottom Bar: Copyright & Legal Policies & Powered by */}
        <div className="pt-8 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/65">
          <p>© {currentYear} {siteConfig.legalName} &amp; {siteConfig.sisterCompany.replace(/\.+$/, '')}. All rights reserved.</p>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>

            <span className="text-white/20 hidden sm:inline" aria-hidden="true">•</span>

            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 hover:border-white/25 hover:bg-white/10 transition-all select-none">
              <span className="text-[11px] text-white/60">Powered by:</span>
              <div className="relative w-4 h-4 rounded-full overflow-hidden shrink-0 ring-1 ring-white/30 bg-black flex items-center justify-center">
                <Image
                  src="/brand/movya-logo.png"
                  alt="Movya Logo"
                  width={16}
                  height={16}
                  className="object-contain w-full h-full"
                />
              </div>
              <span className="font-heading font-bold text-xs tracking-wide text-white">
                Movya
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
