import { Metadata } from 'next';
import { getAllProducts } from '@/lib/products';
import { CartPageContent } from '@/components/cart/CartPageContent';

export const metadata: Metadata = {
  title: 'Shopping Basket & Order Review',
  description:
    'Review your selected Kanani Industries Sortex toor dal items, adjust bag quantities, and proceed to direct WhatsApp order placement.',
};

export default async function CartPage() {
  const products = await getAllProducts();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <CartPageContent products={products} />
    </div>
  );
}
