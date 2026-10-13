'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  Truck,
  ShieldCheck,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import {
  useCartStore,
  getCartSubtotal,
  getCartMrpTotal,
  getCartItemCount,
  getFreeShippingProgress,
} from '@/store/cart';
import { formatPrice, formatWeight } from '@/lib/format';
import type { Product } from '@/lib/products';

interface CartPageContentProps {
  products: Product[];
}

export function CartPageContent({ products }: CartPageContentProps) {
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);
  const repriceWithProducts = useCartStore((state) => state.repriceWithProducts);
  const hasHydrated = useCartStore((state) => state.hasHydrated);

  // On load, automatically re-price cart items from current products.json
  useEffect(() => {
    if (products && products.length > 0) {
      repriceWithProducts(products);
    }
  }, [products, repriceWithProducts]);

  if (!hasHydrated) {
    return (
      <div className="py-24 text-center">
        <div className="w-10 h-10 border-4 border-secondary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-sm font-semibold text-ink-muted">Loading your basket...</p>
      </div>
    );
  }

  const subtotal = getCartSubtotal(items);
  const mrpTotal = getCartMrpTotal(items);
  const itemCount = getCartItemCount(items);
  const savings = Math.max(0, mrpTotal - subtotal);
  const freeShipping = getFreeShippingProgress(subtotal);

  if (items.length === 0) {
    return (
      <div className="py-20 md:py-28 text-center max-w-lg mx-auto px-4">
        <div className="w-24 h-24 rounded-full bg-surface-alt flex items-center justify-center text-secondary mx-auto mb-6 shadow-inner">
          <ShoppingBag className="w-12 h-12 stroke-[1.5]" />
        </div>
        <h1 className="font-heading font-black text-3xl text-primary-dark">
          Your Cart is Currently Empty
        </h1>
        <p className="text-sm text-ink-muted mt-2 leading-relaxed">
          Looks like you haven&apos;t added any Sortex toor dal to your cart yet. Browse our
          flagship brands and select your desired pack sizes.
        </p>
        <div className="mt-8">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary hover:bg-primary-light text-white font-heading font-bold text-sm shadow-navy-sm transition-all hover:scale-105 active:scale-95"
          >
            <span>Explore All Dals</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 md:py-16">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-border">
        <div>
          <h1 className="font-heading font-black text-3xl sm:text-4xl text-primary-dark tracking-tight">
            Review Your Order
          </h1>
          <p className="text-xs sm:text-sm text-ink-muted mt-1">
            {itemCount} total bag{itemCount > 1 ? 's' : ''} across {items.length} item
            {items.length > 1 ? 's' : ''}
          </p>
        </div>

        <button
          onClick={clearCart}
          className="text-xs font-bold text-error hover:underline flex items-center gap-1 p-2"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear All</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Cart Items List (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          {/* Free Shipping Meter */}
          <div className="p-4 rounded-2xl bg-surface-alt border border-border">
            <div className="flex items-center justify-between text-xs font-bold text-primary-dark mb-2">
              <span className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-secondary" />
                {freeShipping.isFree ? (
                  <span className="text-secondary font-black">
                    🎉 Free Dispatch Unlocked Across India!
                  </span>
                ) : (
                  <span>
                    Add <strong>{formatPrice(freeShipping.remaining)}</strong> more to qualify for
                    Free Shipping!
                  </span>
                )}
              </span>
              <span>{freeShipping.percentage}%</span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-border overflow-hidden">
              <div
                className="h-full bg-gradient-leaf rounded-full transition-all duration-300"
                style={{ width: `${freeShipping.percentage}%` }}
              />
            </div>
          </div>

          {/* Items */}
          <div className="divide-y divide-border border border-border rounded-3xl bg-white overflow-hidden shadow-navy-xs">
            {items.map((item) => {
              const itemUnitTotal = item.pricePerKg * item.packSize;
              const itemLineTotal = itemUnitTotal * item.quantity;
              const itemMrpTotal = item.mrpPerKg * item.packSize * item.quantity;

              return (
                <div
                  key={`${item.productId}-${item.packSize}`}
                  className="p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-surface-alt shrink-0 border border-border">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-secondary">
                        {item.brand}
                      </span>
                      <h3 className="font-heading font-extrabold text-lg text-primary-dark">
                        <Link href={`/products/${item.slug}`} className="hover:text-secondary">
                          {item.name}
                        </Link>
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="px-2.5 py-0.5 rounded-md bg-surface-alt text-xs font-bold text-primary">
                          {formatWeight(item.packSize)} Bag
                        </span>
                        <span className="text-xs text-ink-muted">
                          Rate: {formatPrice(item.pricePerKg)} / kg
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right actions & price */}
                  <div className="w-full sm:w-auto flex items-center justify-between sm:justify-end gap-6 pt-2 sm:pt-0 border-t sm:border-0 border-border-subtle">
                    <div className="flex items-center border border-border rounded-xl bg-surface-alt overflow-hidden">
                      <button
                        onClick={() =>
                          updateQuantity(item.productId, item.packSize, item.quantity - 1)
                        }
                        aria-label="Decrease quantity"
                        className="p-1.5 hover:bg-white text-ink transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-3 py-1 font-heading font-black text-sm text-primary-dark min-w-[28px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.productId, item.packSize, item.quantity + 1)
                        }
                        aria-label="Increase quantity"
                        className="p-1.5 hover:bg-white text-ink transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="text-right">
                      <div className="font-heading font-black text-lg text-primary-dark">
                        {formatPrice(itemLineTotal)}
                      </div>
                      {itemMrpTotal > itemLineTotal && (
                        <div className="line-through text-xs text-ink-muted">
                          {formatPrice(itemMrpTotal)}
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => removeItem(item.productId, item.packSize)}
                      aria-label="Remove item"
                      className="p-2 text-ink-muted hover:text-error transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Summary Column (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-border shadow-navy-md space-y-4">
            <h3 className="font-heading font-black text-xl text-primary-dark pb-3 border-b border-border">
              Order Summary
            </h3>

            <div className="space-y-2.5 text-sm">
              <div className="flex justify-between text-ink-muted">
                <span>Items Subtotal</span>
                <span className="font-bold text-primary-dark">{formatPrice(subtotal)}</span>
              </div>

              {savings > 0 && (
                <div className="flex justify-between text-secondary-dark font-bold bg-secondary/10 p-2 rounded-xl">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-secondary" />
                    Total Savings
                  </span>
                  <span>- {formatPrice(savings)}</span>
                </div>
              )}

              <div className="flex justify-between text-ink-muted">
                <span>Shipping &amp; Delivery</span>
                <span className="font-bold text-primary-dark">
                  {freeShipping.isFree ? (
                    <span className="text-secondary font-black">FREE</span>
                  ) : (
                    <span>Calculated at dispatch</span>
                  )}
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-border flex justify-between items-baseline">
              <div>
                <span className="font-heading font-black text-base text-primary-dark block">
                  Grand Total
                </span>
                <span className="text-[11px] text-ink-muted">Inclusive of all mill taxes</span>
              </div>
              <span className="font-heading font-black text-3xl text-primary-dark">
                {formatPrice(subtotal)}
              </span>
            </div>

            <div className="pt-2">
              <Link
                href="/checkout"
                className="w-full py-4 px-6 rounded-full bg-gradient-leaf text-white font-heading font-bold text-sm shadow-navy-sm flex items-center justify-center gap-2 hover:brightness-105 transition-all"
              >
                <span>Proceed to WhatsApp Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Guarantees Box */}
          <div className="p-5 rounded-3xl bg-surface-alt border border-border space-y-3 text-xs text-ink-muted">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-secondary shrink-0" />
              <span>Certified Gujarat APMC Mandi Sourcing</span>
            </div>
            <div className="flex items-center gap-2.5">
              <RotateCcw className="w-4 h-4 text-secondary shrink-0" />
              <span>7-Day Quality Replacement Guarantee</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Truck className="w-4 h-4 text-secondary shrink-0" />
              <span>Prompt Dispatch via Safe Logistics</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
