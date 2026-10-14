import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';
import { Home, Package } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center py-20 px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <Logo variant="light-surface" size="lg" />
        </div>

        <div className="p-8 rounded-3xl bg-white border border-border shadow-navy-md space-y-3">
          <span className="font-heading font-black text-6xl text-secondary block">
            404
          </span>
          <h1 className="font-heading font-black text-2xl text-primary-dark">
            Page Not Found
          </h1>
          <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
            The page you are looking for may have been moved or does not exist. Explore our Sortex Toor
            dal brands or return to the homepage.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row gap-3">
            <Link
              href="/"
              className="flex-1 py-3 px-4 rounded-xl bg-primary hover:bg-primary-light text-white font-heading font-bold text-xs flex items-center justify-center gap-2 shadow-navy-xs transition-colors"
            >
              <Home className="w-4 h-4" />
              <span>Homepage</span>
            </Link>

            <Link
              href="/products"
              className="flex-1 py-3 px-4 rounded-xl bg-surface-alt hover:bg-surface text-primary-dark font-heading font-bold text-xs border border-border flex items-center justify-center gap-2 transition-colors"
            >
              <Package className="w-4 h-4 text-secondary" />
              <span>Browse Dals</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
