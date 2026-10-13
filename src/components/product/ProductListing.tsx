'use client';

import { useState, useMemo } from 'react';
import type { Product } from '@/lib/products';
import { ProductCard } from '@/components/product/ProductCard';
import { Filter, ArrowUpDown } from 'lucide-react';

interface ProductListingProps {
  initialProducts: Product[];
}

export function ProductListing({ initialProducts }: ProductListingProps) {
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc'>('default');

  const brands = useMemo(() => {
    const list = Array.from(new Set(initialProducts.map((p) => p.brand)));
    return ['all', ...list];
  }, [initialProducts]);

  const filteredAndSorted = useMemo(() => {
    let result = [...initialProducts];

    // Filter by brand
    if (selectedBrand !== 'all') {
      result = result.filter((p) => p.brand === selectedBrand);
    }

    // Sort by price
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [initialProducts, selectedBrand, sortBy]);

  return (
    <div>
      {/* Filter and Sort Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-border shadow-navy-xs mb-8">
        {/* Brand Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <div className="flex items-center gap-1.5 text-xs font-bold text-ink-muted mr-1 shrink-0">
            <Filter className="w-3.5 h-3.5 text-secondary" />
            <span>Brand:</span>
          </div>

          {brands.map((b) => (
            <button
              key={b}
              onClick={() => setSelectedBrand(b)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedBrand === b
                  ? 'bg-primary-dark text-white shadow-navy-xs'
                  : 'bg-surface-alt hover:bg-border text-ink'
              }`}
            >
              {b === 'all' ? 'All Brands' : b}
            </button>
          ))}
        </div>

        {/* Price Sorting */}
        <div className="flex items-center justify-end gap-2 shrink-0">
          <div className="flex items-center gap-1.5 text-xs font-bold text-ink-muted">
            <ArrowUpDown className="w-3.5 h-3.5 text-secondary" />
            <span>Sort:</span>
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="px-3 py-1.5 rounded-xl text-xs font-bold bg-surface-alt border border-border text-primary-dark focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="default">Default Order</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Grid of Product Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredAndSorted.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filteredAndSorted.length === 0 && (
        <div className="py-16 text-center text-ink-muted">
          <p className="text-base font-semibold">No products found matching this filter.</p>
        </div>
      )}
    </div>
  );
}
