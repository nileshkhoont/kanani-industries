'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';

export function LoadingScreen() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Show only once per browser session
    const hasSeen = sessionStorage.getItem('kanani_splash_seen');
    if (!hasSeen) {
      requestAnimationFrame(() => setShow(true));
      const timer = setTimeout(() => {
        setShow(false);
        sessionStorage.setItem('kanani_splash_seen', 'true');
      }, 950);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-surface pointer-events-none"
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.05, opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="flex flex-col items-center gap-4 text-center px-4"
          >
            <div className="p-4 rounded-3xl bg-white shadow-navy-lg border border-border">
              <Image
                src="/brand/kanani-logo.png"
                alt="Kanani Industries"
                width={120}
                height={120}
                priority
                className="object-contain"
              />
            </div>

            <div className="flex flex-col items-center">
              <span className="font-heading font-black text-2xl tracking-tight text-primary-dark">
                KANANI INDUSTRIES
              </span>
              <span className="font-heading font-bold uppercase tracking-[0.2em] text-secondary text-xs mt-0.5">
                Sortex Toor Trading | Import &amp; Export
              </span>
            </div>

            <div className="w-36 h-1 rounded-full bg-border overflow-hidden mt-2">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ repeat: Infinity, duration: 0.9, ease: 'easeInOut' }}
                className="w-full h-full bg-gradient-leaf rounded-full"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
