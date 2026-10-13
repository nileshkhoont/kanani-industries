'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';
import { RotateCcw, Home, AlertTriangle } from 'lucide-react';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error occurred:', error);
  }, [error]);

  return (
    <div className="min-h-[75vh] flex items-center justify-center py-20 px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <Logo variant="light-surface" size="lg" />
        </div>

        <div className="p-8 rounded-3xl bg-white border border-border shadow-navy-md space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-error/10 text-error flex items-center justify-center mx-auto">
            <AlertTriangle className="w-7 h-7" />
          </div>

          <h1 className="font-heading font-black text-2xl text-primary-dark">
            Something went wrong
          </h1>
          <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
            An unexpected error occurred while loading this page. Our technical team has been
            notified. Please try refreshing or return to the home page.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => reset()}
              className="flex-1 py-3 px-4 rounded-xl bg-primary hover:bg-primary-light text-white font-heading font-bold text-xs flex items-center justify-center gap-2 shadow-navy-xs transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Try Again</span>
            </button>

            <Link
              href="/"
              className="flex-1 py-3 px-4 rounded-xl bg-surface-alt hover:bg-surface text-primary-dark font-heading font-bold text-xs border border-border flex items-center justify-center gap-2 transition-colors"
            >
              <Home className="w-4 h-4" />
              <span>Return Home</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
