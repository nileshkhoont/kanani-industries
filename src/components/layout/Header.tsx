'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, PhoneCall } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { GaneshTradingLogo } from '@/components/ui/GaneshTradingLogo';
import { AnnouncementBar } from './AnnouncementBar';
import { siteConfig } from '@/config/site';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about' },
  { name: 'Products', href: '/products' },
  { name: 'Sortex Quality', href: '/quality' },
  { name: 'Contact', href: '/contact' },
];

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <AnnouncementBar />

      <header
        className={`sticky top-0 z-30 transition-all duration-300 ${
          scrolled ? 'glass-header shadow-navy-sm py-2.5' : 'bg-surface/90 backdrop-blur-md py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Logo & Second Firm */}
            <div className="flex items-center gap-3 sm:gap-4 shrink-0">
              <Logo size="md" variant="light-surface" />
              <div className="hidden sm:flex items-center border-l border-border/80 pl-3 sm:pl-4 py-0.5">
                <GaneshTradingLogo size="sm" variant="light-surface" showSisterTag={true} />
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2">
              {navLinks.map((link) => {
                const isActive =
                  link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`relative px-3 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                      isActive
                        ? 'text-primary-dark font-bold'
                        : 'text-ink-muted hover:text-primary-dark hover:bg-surface-alt/70'
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <motion.span
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-leaf rounded-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Actions: Contact Us with Phone & Mobile Hamburger */}
            <div className="flex items-center gap-1.5 sm:gap-3">
              <a
                href={`tel:${siteConfig.contact.phone}`}
                className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-brand text-white text-[11px] sm:text-xs font-bold shadow-navy-xs hover:shadow-navy-sm hover:brightness-105 transition-all active:scale-98 shrink-0"
                aria-label={`Call ${siteConfig.contact.displayPhone}`}
              >
                <PhoneCall className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                <span className="hidden sm:inline">Contact Us: </span>
                <span>{siteConfig.contact.displayPhone}</span>
              </a>

              {/* Mobile Menu Hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle Navigation Menu"
                className="lg:hidden p-2 sm:p-2.5 rounded-full bg-white hover:bg-surface-alt text-primary-dark border border-border shadow-navy-xs transition-colors shrink-0"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Full Screen Animated Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.28, ease: 'easeInOut' }}
              className="lg:hidden bg-surface border-b border-border shadow-navy-lg overflow-hidden"
            >
              <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col gap-3">
                <nav className="flex flex-col gap-1.5">
                  {navLinks.map((link) => {
                    const isActive =
                      link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
                    return (
                      <Link
                        key={link.name}
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center justify-between px-4 py-3 rounded-xl font-heading font-semibold text-base transition-colors ${
                          isActive
                            ? 'bg-primary-dark text-white'
                            : 'text-primary-dark hover:bg-surface-alt'
                        }`}
                      >
                        <span>{link.name}</span>
                        {isActive && <span className="w-2 h-2 rounded-full bg-secondary-light" />}
                      </Link>
                    );
                  })}
                </nav>

                {/* Second Firm Brand with GT Logo */}
                <div className="px-3.5 py-2.5 rounded-xl bg-surface-alt/70 border border-border/80 flex items-center justify-between">
                  <GaneshTradingLogo size="sm" variant="light-surface" showSisterTag={true} />
                </div>

                <div className="pt-4 mt-1 border-t border-border flex flex-col sm:flex-row gap-3">
                  <Link
                    href={`tel:${siteConfig.contact.phone}`}
                    className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-surface-alt text-primary font-semibold text-sm border border-border"
                  >
                    <PhoneCall className="w-4 h-4 text-secondary" />
                    <span>Call: {siteConfig.contact.displayPhone}</span>
                  </Link>
                  <Link
                    href="/contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-brand text-white font-semibold text-sm shadow-navy-sm"
                  >
                    <span>Contact Us</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
