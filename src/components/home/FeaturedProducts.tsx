import Link from 'next/link';
import { ArrowRight, Factory } from 'lucide-react';
import type { Product } from '@/lib/products';
import { ProductCard } from '@/components/product/ProductCard';

interface FeaturedProductsProps {
  products: Product[];
}

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  return (
    <section className="py-20 md:py-28 bg-surface-alt border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-secondary">
              <Factory className="w-3.5 h-3.5 text-secondary" />
              Direct From The Miller
            </span>
            <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-primary-dark tracking-tight">
              Our Signature Sortex Brands
            </h2>
            <p className="text-sm sm:text-base text-ink-muted max-w-xl">
              Each brand is curated for distinct kitchen preferences — from daily home cooking and
              rustic unpolished grains to banquet-grade bold split lentils.
            </p>
          </div>

          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-secondary transition-colors"
          >
            <span>Compare All Products</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 4 Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
