'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { PhoneCall, MessageCircle, ShieldCheck, CheckCircle2, ShoppingBag } from 'lucide-react';
import { useCartStore, getCartItemCount } from '@/store/cart';
import type { Product } from '@/lib/products';
import { formatPrice, formatWeight } from '@/lib/format';
import { siteConfig } from '@/config/site';
import { CheckoutFormSchema } from '@/lib/validators';
import { z } from 'zod';

type CheckoutFormData = z.infer<typeof CheckoutFormSchema>;

interface CheckoutFormProps {
  verifiedProducts?: Product[];
}

export function CheckoutForm({ verifiedProducts = [] }: CheckoutFormProps) {
  const items = useCartStore((state) => state.items);
  const repriceWithProducts = useCartStore((state) => state.repriceWithProducts);
  const hasHydrated = useCartStore((state) => state.hasHydrated);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Automatically heal and reprice any tampered localStorage rates with true server rates
  useEffect(() => {
    if (verifiedProducts.length > 0) {
      repriceWithProducts(verifiedProducts);
    }
  }, [verifiedProducts, repriceWithProducts]);

  const [formData, setFormData] = useState<CheckoutFormData>({
    fullName: '',
    phone: '',
    address: '',
    city: 'Gondal',
    state: 'Gujarat',
    pincode: '',
    notes: '',
  });

  // Calculate tamper-proof subtotal using authoritative server product prices
  const verifiedSubtotal = useMemo(() => {
    return items.reduce((sum, item) => {
      const genuine = verifiedProducts.find((p) => p.id === item.productId);
      const pricePerKg = genuine ? genuine.price : item.pricePerKg;
      return sum + pricePerKg * item.packSize * item.quantity;
    }, 0);
  }, [items, verifiedProducts]);

  const itemCount = getCartItemCount(items);

  if (!hasHydrated) {
    return (
      <div className="py-24 text-center">
        <div className="w-10 h-10 border-4 border-secondary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-sm font-semibold text-ink-muted">Loading checkout...</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="py-20 text-center max-w-md mx-auto">
        <ShoppingBag className="w-16 h-16 text-secondary mx-auto mb-4" />
        <h2 className="font-heading font-black text-2xl text-primary-dark">
          Your Cart is Empty
        </h2>
        <p className="text-sm text-ink-muted mt-2">
          Please add items to your cart before proceeding to checkout.
        </p>
        <Link
          href="/products"
          className="mt-6 inline-block px-6 py-3 rounded-full bg-primary text-white font-bold text-sm"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleWhatsAppOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const validation = CheckoutFormSchema.safeParse(formData);
    if (!validation.success) {
      const errMap: Record<string, string> = {};
      validation.error.issues.forEach((err) => {
        if (err.path[0]) {
          errMap[err.path[0].toString()] = err.message;
        }
      });
      setFormErrors(errMap);
      setIsSubmitting(false);
      return;
    }

    try {
      // Security: Transmit ONLY product identifiers and quantities.
      // The server independently reads products.json to compute prices and totals.
      const payload = {
        customer: formData,
        items: items.map((item) => ({
          productId: item.productId,
          packSize: item.packSize,
          quantity: item.quantity,
        })),
      };

      const res = await fetch('/api/order/prepare', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.whatsappUrl) {
        window.open(data.whatsappUrl, '_blank');
        return;
      }

      throw new Error(data.error || 'Server validation failed');
    } catch {
      // Fallback calculation using verified server products passed to component
      let message = `*NEW ORDER - KANANI INDUSTRIES*\n`;
      message += `-----------------------------------------\n`;
      message += `*Customer:* ${formData.fullName}\n`;
      message += `*Phone:* ${formData.phone}\n`;
      message += `*Delivery Address:*\n${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}\n`;
      if (formData.notes) {
        message += `*Instructions:* ${formData.notes}\n`;
      }
      message += `-----------------------------------------\n`;
      message += `*VERIFIED ORDER ITEMS:*\n`;

      items.forEach((item, idx) => {
        const genuine = verifiedProducts.find((p) => p.id === item.productId);
        const actualPrice = genuine ? genuine.price : item.pricePerKg;
        const lineTotal = actualPrice * item.packSize * item.quantity;
        message += `${idx + 1}. *${item.name}* (${item.brand})\n`;
        message += `   Pack Size: ${item.packSize}kg bag | Qty: ${item.quantity}\n`;
        message += `   Line Price: ₹${lineTotal} (₹${actualPrice}/kg)\n`;
      });

      message += `-----------------------------------------\n`;
      message += `*TOTAL AMOUNT:* ₹${verifiedSubtotal}\n`;
      message += `*Dispatch Location:* Gujarat Facility\n`;
      message += `\nPlease confirm my order and share dispatch timeline. Thank you!`;

      const waUrl = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(
        message
      )}`;

      window.open(waUrl, '_blank');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-12 md:py-16">
      <div className="mb-10 text-center sm:text-left">
        <span className="text-xs font-bold uppercase tracking-widest text-secondary block">
          Express Checkout
        </span>
        <h1 className="font-heading font-black text-3xl sm:text-4xl text-primary-dark tracking-tight mt-1">
          Complete Your Order on WhatsApp
        </h1>
        <p className="text-sm text-ink-muted mt-1 max-w-2xl">
          Enter your delivery details below. We will generate your order breakdown and connect you
          directly to our Gondal dispatch desk on WhatsApp for instant confirmation.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Form (7 cols) */}
        <div className="lg:col-span-7">
          <form
            onSubmit={handleWhatsAppOrder}
            className="p-6 sm:p-8 rounded-3xl bg-white border border-border shadow-navy-md space-y-6"
          >
            <h2 className="font-heading font-bold text-xl text-primary-dark pb-3 border-b border-border">
              Customer &amp; Shipping Details
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-primary-dark mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  placeholder="e.g. Ramesh Patel"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border bg-surface text-ink text-sm focus:outline-none focus:ring-2 focus:ring-primary ${
                    formErrors.fullName ? 'border-error' : 'border-border'
                  }`}
                />
                {formErrors.fullName && (
                  <p className="text-xs text-error mt-1">{formErrors.fullName}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-primary-dark mb-1">
                  Phone / WhatsApp Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="e.g. 9876543210"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border bg-surface text-ink text-sm focus:outline-none focus:ring-2 focus:ring-primary ${
                    formErrors.phone ? 'border-error' : 'border-border'
                  }`}
                />
                {formErrors.phone && (
                  <p className="text-xs text-error mt-1">{formErrors.phone}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-primary-dark mb-1">
                Complete Delivery Address *
              </label>
              <textarea
                name="address"
                required
                rows={3}
                placeholder="House/Shop No., Street, Landmark, Area"
                value={formData.address}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border bg-surface text-ink text-sm focus:outline-none focus:ring-2 focus:ring-primary ${
                  formErrors.address ? 'border-error' : 'border-border'
                }`}
              />
              {formErrors.address && (
                <p className="text-xs text-error mt-1">{formErrors.address}</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-primary-dark mb-1">
                  City *
                </label>
                <input
                  type="text"
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-surface text-ink text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-primary-dark mb-1">
                  State *
                </label>
                <input
                  type="text"
                  name="state"
                  required
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-surface text-ink text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-primary-dark mb-1">
                  PIN Code *
                </label>
                <input
                  type="text"
                  name="pincode"
                  required
                  placeholder="6 digits"
                  maxLength={6}
                  value={formData.pincode}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border bg-surface text-ink text-sm focus:outline-none focus:ring-2 focus:ring-primary ${
                    formErrors.pincode ? 'border-error' : 'border-border'
                  }`}
                />
                {formErrors.pincode && (
                  <p className="text-xs text-error mt-1">{formErrors.pincode}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-primary-dark mb-1">
                Order Notes / Packaging Request (Optional)
              </label>
              <textarea
                name="notes"
                rows={2}
                placeholder="e.g. Call before delivery, bulk sack preference, etc."
                value={formData.notes}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-border bg-surface text-ink text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="pt-4 border-t border-border flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 py-4 px-6 rounded-2xl bg-secondary hover:bg-secondary-dark text-white font-heading font-extrabold text-sm shadow-navy-md flex items-center justify-center gap-2.5 transition-all hover:scale-102 active:scale-98"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>Place Order on WhatsApp ({formatPrice(verifiedSubtotal)})</span>
              </button>

              <a
                href={`tel:${siteConfig.contact.phone}`}
                className="sm:w-auto py-4 px-6 rounded-2xl bg-surface-alt hover:bg-surface text-primary-dark font-heading font-bold text-sm border border-border flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-primary" />
                <span>Call to Order</span>
              </a>
            </div>
          </form>
        </div>

        {/* Right Summary (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-border shadow-navy-md space-y-4">
            <h3 className="font-heading font-black text-xl text-primary-dark pb-3 border-b border-border">
              Order Breakdown ({itemCount} bags)
            </h3>

            <div className="divide-y divide-border-subtle max-h-80 overflow-y-auto space-y-3 pr-1">
              {items.map((item) => {
                const genuine = verifiedProducts.find((p) => p.id === item.productId);
                const actualPrice = genuine ? genuine.price : item.pricePerKg;
                const lineTotal = actualPrice * item.packSize * item.quantity;
                return (
                  <div
                    key={`${item.productId}-${item.packSize}`}
                    className="pt-3 first:pt-0 flex items-center justify-between text-sm"
                  >
                    <div>
                      <span className="text-[10px] uppercase font-bold text-secondary block">
                        {item.brand}
                      </span>
                      <h4 className="font-bold text-primary-dark">{item.name}</h4>
                      <span className="text-xs text-ink-muted">
                        {formatWeight(item.packSize)} bag × {item.quantity}
                      </span>
                    </div>
                    <span className="font-heading font-black text-primary-dark">
                      {formatPrice(lineTotal)}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="pt-4 border-t border-border flex items-baseline justify-between">
              <div>
                <span className="font-heading font-black text-base text-primary-dark block">
                  Grand Total
                </span>
                <span className="text-[11px] text-ink-muted">Direct mill price</span>
              </div>
              <span className="font-heading font-black text-3xl text-primary-dark">
                {formatPrice(verifiedSubtotal)}
              </span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-surface-alt border border-border text-xs text-ink-muted space-y-2.5">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-secondary" />
              <span>Direct communication with Kanani sales team</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-secondary" />
              <span>Payment modes confirmed securely on WhatsApp (UPI / Bank Transfer / COD)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
