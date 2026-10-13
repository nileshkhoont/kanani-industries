'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  Truck,
  Sparkles,
} from 'lucide-react';
import {
  useCartStore,
  getCartSubtotal,
  getCartMrpTotal,
  getFreeShippingProgress,
} from '@/store/cart';
import { formatPrice, formatWeight } from '@/lib/format';

export function CartDrawer() {
  const isDrawerOpen = useCartStore((state) => state.isDrawerOpen);
  const closeDrawer = useCartStore((state) => state.closeDrawer);
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const hasHydrated = useCartStore((state) => state.hasHydrated);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeDrawer();
    };
    if (isDrawerOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isDrawerOpen, closeDrawer]);

  if (!hasHydrated) return null;

  const subtotal = getCartSubtotal(items);
  const mrpTotal = getCartMrpTotal(items);
  const savings = Math.max(0, mrpTotal - subtotal);
  const freeShipping = getFreeShippingProgress(subtotal);

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeDrawer}
            className="absolute inset-0 bg-primary-dark/60 backdrop-blur-sm"
          />

          {/* Slide-out Drawer Panel */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="w-screen max-w-md bg-surface shadow-navy-xl flex flex-col"
            >
              {/* Drawer Header */}
              <div className="p-5 border-b border-border bg-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-surface-alt text-primary">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg text-primary-dark">
                      Your Order Cart
                    </h3>
                    <p className="text-xs text-ink-muted">
                      {items.length === 0
                        ? 'Your basket is empty'
                        : `${items.length} unique item${items.length > 1 ? 's' : ''}`}
                    </p>
                  </div>
                </div>

                <button
                  onClick={closeDrawer}
                  aria-label="Close cart drawer"
                  className="p-2 rounded-full hover:bg-surface-alt text-ink-muted hover:text-primary transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Free Shipping Progress Bar */}
              <div className="px-5 py-3 bg-surface-alt border-b border-border">
                <div className="flex items-center justify-between text-xs font-semibold mb-1.5 text-primary-dark">
                  <span className="flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-secondary" />
                    {freeShipping.isFree ? (
                      <span className="text-secondary font-bold">
                        🎉 You unlocked Free Shipping!
                      </span>
                    ) : (
                      <span>
                        Add{' '}
                        <strong className="text-primary font-bold">
                          {formatPrice(freeShipping.remaining)}
                        </strong>{' '}
                        for Free Shipping
                      </span>
                    )}
                  </span>
                  <span>{freeShipping.percentage}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-border overflow-hidden">
                  <div
                    className="h-full bg-gradient-leaf rounded-full transition-all duration-300"
                    style={{ width: `${freeShipping.percentage}%` }}
                  />
                </div>
              </div>

              {/* Cart Items List */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                    <div className="w-20 h-20 rounded-full bg-surface-alt flex items-center justify-center text-secondary">
                      <ShoppingBag className="w-10 h-10 stroke-[1.5]" />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-lg text-primary-dark">
                        Your cart is empty
                      </h4>
                      <p className="text-xs text-ink-muted mt-1 max-w-xs">
                        Explore our Sortex-cleaned Gujarati Toor dals and select your preferred
                        pack size (1kg, 5kg or 25kg bulk bag).
                      </p>
                    </div>
                    <Link
                      href="/products"
                      onClick={closeDrawer}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-white text-sm font-bold shadow-navy-sm hover:bg-primary-light transition-all"
                    >
                      Browse Products
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                ) : (
                  items.map((item) => {
                    const itemUnitTotal = item.pricePerKg * item.packSize;
                    const itemLineTotal = itemUnitTotal * item.quantity;

                    return (
                      <div
                        key={`${item.productId}-${item.packSize}`}
                        className="p-3.5 rounded-2xl bg-white border border-border shadow-navy-xs flex gap-3.5 items-center"
                      >
                        {/* Thumbnail */}
                        <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-surface-alt shrink-0 border border-border">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="64px"
                            className="object-cover"
                          />
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-secondary">
                            {item.brand}
                          </span>
                          <h4 className="font-heading font-bold text-sm text-primary-dark truncate">
                            {item.name}
                          </h4>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-xs px-2 py-0.5 rounded-md bg-surface-alt text-primary font-semibold">
                              Pack: {formatWeight(item.packSize)}
                            </span>
                            <span className="text-xs font-bold text-primary-dark">
                              {formatPrice(itemUnitTotal)} / bag
                            </span>
                          </div>

                          {/* Stepper + Remove */}
                          <div className="flex items-center justify-between mt-2.5">
                            <div className="flex items-center border border-border rounded-lg bg-surface-alt overflow-hidden">
                              <button
                                onClick={() =>
                                  updateQuantity(item.productId, item.packSize, item.quantity - 1)
                                }
                                aria-label="Decrease quantity"
                                className="p-1 hover:bg-white text-ink transition-colors"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="px-2.5 py-0.5 text-xs font-bold text-primary-dark min-w-[24px] text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(item.productId, item.packSize, item.quantity + 1)
                                }
                                aria-label="Increase quantity"
                                className="p-1 hover:bg-white text-ink transition-colors"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            <div className="flex items-center gap-2">
                              <span className="font-heading font-black text-sm text-primary-dark">
                                {formatPrice(itemLineTotal)}
                              </span>
                              <button
                                onClick={() => removeItem(item.productId, item.packSize)}
                                aria-label="Remove item"
                                className="p-1 text-ink-muted hover:text-error transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Drawer Footer with Totals and Checkout CTA */}
              {items.length > 0 && (
                <div className="p-5 border-t border-border bg-white space-y-3.5 shadow-lg">
                  {savings > 0 && (
                    <div className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-secondary-light/15 text-xs text-secondary-dark font-bold">
                      <span className="flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-secondary" />
                        Total Savings Applied:
                      </span>
                      <span>{formatPrice(savings)}</span>
                    </div>
                  )}

                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-xs text-ink-muted font-medium">Estimated Subtotal</span>
                      <p className="text-[11px] text-ink-muted">Taxes included where applicable</p>
                    </div>
                    <span className="font-heading font-black text-2xl text-primary-dark">
                      {formatPrice(subtotal)}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <Link
                      href="/cart"
                      onClick={closeDrawer}
                      className="inline-flex items-center justify-center py-3 px-4 rounded-xl bg-surface-alt hover:bg-surface text-primary-dark font-bold text-xs border border-border transition-colors text-center"
                    >
                      View Full Cart
                    </Link>
                    <Link
                      href="/checkout"
                      onClick={closeDrawer}
                      className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-leaf text-white font-bold text-xs shadow-navy-sm hover:brightness-105 transition-all text-center"
                    >
                      <span>Checkout</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
