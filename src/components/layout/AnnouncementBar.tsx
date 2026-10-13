'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles } from 'lucide-react';
import { siteConfig } from '@/config/site';

export function AnnouncementBar() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const isDismissed = sessionStorage.getItem('kanani_announcement_dismissed');
    if (isDismissed === 'true') {
      requestAnimationFrame(() => setIsVisible(false));
    }
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % siteConfig.announcements.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isVisible]);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem('kanani_announcement_dismissed', 'true');
  };

  if (!isVisible) return null;

  return (
    <div className="relative bg-primary-dark text-white text-xs md:text-sm font-medium py-2 px-4 border-b border-primary-light/20 z-40 overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex-1 flex items-center justify-center overflow-hidden min-h-[22px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="flex items-center gap-2 text-center"
            >
              <Sparkles className="w-3.5 h-3.5 text-accent shrink-0 animate-pulse" />
              <span className="tracking-wide">
                {siteConfig.announcements[currentIndex]}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          onClick={handleDismiss}
          aria-label="Dismiss announcement"
          className="text-white/70 hover:text-white p-1 rounded-md transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
