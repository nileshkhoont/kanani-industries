'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Menu, X, PhoneCall, Globe2 } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { AnnouncementBar } from './AnnouncementBar';
import { useCartStore, getCartItemCount } from '@/store/cart';
import { siteConfig } from '@/config/site';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about' },
  { name: 'Products', href: '/products' },
  { name: 'Sortex Quality', href: '/quality' },
  { name: 'Import & Export', href: '/export' },
  { name: 'Recipes', href: '/recipes' },
  { name: 'Contact', href: '/contact' },
];

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const items = useCartStore((state) => state.items);
  const hasHydrated = useCartStore((state) => state.hasHydrated);
  const openDrawer = useCartStore((state) => state.openDrawer);

  const itemCount = hasHydrated ? getCartItemCount(items) : 0;

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
            {/* Logo */}
            <Logo size="md" variant="light-surface" />

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

            {/* Actions: Cart, Phone, Mobile Menu Toggle */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              {/* Quick Export CTA on desktop */}
              <Link
                href="/export"
                className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-surface-alt text-primary hover:bg-primary hover:text-white border border-primary/20 transition-all duration-200"
              >
                <Globe2 className="w-3.5 h-3.5 text-secondary" />
                <span>Bulk Export</span>
              </Link>

              {/* Cart Drawer Trigger */}
              <button
                onClick={openDrawer}
                aria-label={`Open shopping cart with ${itemCount} items`}
                className="relative p-2.5 rounded-full bg-white hover:bg-surface-alt text-primary-dark shadow-navy-xs border border-border transition-all duration-200 hover:scale-105 active:scale-95"
              >
                <ShoppingBag className="w-5 h-5 text-primary" />
                {itemCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-secondary text-white font-bold text-[10px] flex items-center justify-center shadow-sm"
                  >
                    {itemCount > 99 ? '99+' : itemCount}
                  </motion.span>
                )}
              </button>

              {/* Mobile Menu Hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle Navigation Menu"
                className="lg:hidden p-2.5 rounded-full bg-white hover:bg-surface-alt text-primary-dark border border-border shadow-navy-xs transition-colors"
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

                <div className="pt-4 mt-2 border-t border-border flex flex-col sm:flex-row gap-3">
                  <Link
                    href={`tel:${siteConfig.contact.phone}`}
                    className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-surface-alt text-primary font-semibold text-sm border border-border"
                  >
                    <PhoneCall className="w-4 h-4 text-secondary" />
                    <span>Call: {siteConfig.contact.displayPhone}</span>
                  </Link>
                  <Link
                    href="/export"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-brand text-white font-semibold text-sm shadow-navy-sm"
                  >
                    <Globe2 className="w-4 h-4 text-accent" />
                    <span>Export Enquiry</span>
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
