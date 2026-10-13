import { Metadata } from 'next';
import { CheckoutForm } from '@/components/cart/CheckoutForm';
import { getAllProducts } from '@/lib/products';

export const metadata: Metadata = {
  title: 'Checkout & WhatsApp Order Placement',
  description:
    'Complete your Sortex toor dal order details and transmit directly to the Kanani Industries Gondal dispatch desk on WhatsApp.',
};

export default async function CheckoutPage() {
  const products = await getAllProducts();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <CheckoutForm verifiedProducts={products} />
    </div>
  );
}
