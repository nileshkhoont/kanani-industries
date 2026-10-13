'use client';

import { useState, useEffect } from 'react';
import { ArrowUp, MessageCircle } from 'lucide-react';
import { siteConfig } from '@/config/site';

export function FloatingActions() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(
    'Hello Kanani Industries, I would like to inquire about your Sortex Toor Dal products.'
  )}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-3">
      {/* Back To Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          aria-label="Back to top"
          className="p-3 rounded-full bg-white text-primary-dark shadow-navy-md hover:bg-surface-alt border border-border transition-all duration-300 hover:-translate-y-1 active:translate-y-0"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {/* Floating WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Kanani Industries on WhatsApp"
        className="group relative flex items-center justify-center p-3.5 rounded-full bg-secondary hover:bg-secondary-dark text-white shadow-navy-lg transition-all duration-300 hover:scale-110 active:scale-95"
      >
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-accent" />
        </span>
        <MessageCircle className="w-6 h-6 fill-current" />
        <span className="sr-only">Chat on WhatsApp</span>

        {/* Hover Tooltip */}
        <span className="hidden md:block pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-lg bg-primary-dark px-2.5 py-1.5 text-xs font-semibold text-white shadow-navy-md opacity-0 transition-opacity group-hover:opacity-100">
          Chat with Sales
        </span>
      </a>
    </div>
  );
}
