import { Metadata } from 'next';
import { getAllProducts } from '@/lib/products';
import { ProductListing } from '@/components/product/ProductListing';
import { Package } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Our Sortex Toor Brands | Buy Online & Bulk Orders',
  description:
    'Browse Kanani Industries 4 signature Sortex Toor brands: Savaj Brand Janap Toor, Ganesh Brand Varjin Toor, Nilkanth Brand Bidian Toor, and Natural Brand Rasdi Toor.',
};

export default async function ProductsPage() {
  const products = await getAllProducts();

  return (
    <div className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner */}
        <div className="mb-10 text-center sm:text-left">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-secondary">
            <Package className="w-3.5 h-3.5 text-secondary" />
            Direct Mill Catalog
          </span>
          <h1 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-primary-dark tracking-tight mt-1">
            Sortex Toor Collection
          </h1>
          <p className="text-sm sm:text-base text-ink-muted mt-2 max-w-2xl">
            Cleaned with computerized multi-CCD color sorting technology, free from chemical polish,
            and packaged in 1kg, 5kg and 25kg heavy-duty bags.
          </p>
        </div>

        {/* Interactive Listing */}
        <ProductListing initialProducts={products} />
      </div>
    </div>
  );
}
