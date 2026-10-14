'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  MessageCircle,
  PhoneCall,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  MapPin,
  Clock,
  Award,
} from 'lucide-react';
import type { Product } from '@/lib/products';
import { formatPrice, calculateDiscount } from '@/lib/format';
import { siteConfig } from '@/config/site';
import { ProductCard } from '@/components/product/ProductCard';

interface ProductDetailViewProps {
  product: Product;
  relatedProducts: Product[];
}

export function ProductDetailView({ product, relatedProducts }: ProductDetailViewProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const discountPercent = calculateDiscount(product.price, product.mrp);
  const savingsPerKg = Math.max(0, product.mrp - product.price);

  const whatsappMessage = encodeURIComponent(
    `Hello Kanani Industries,\n\nI want to order / enquire about:\n• Product: ${product.name} (${product.brand})\n• Rate: ${formatPrice(
      product.price
    )}/kg\n\nPlease share availability, dispatch, and delivery details.`
  );
  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div className="py-6 sm:py-10">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex items-center gap-2 text-xs md:text-sm text-ink-muted">
          <li>
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
          </li>
          <li>
            <ChevronRight className="w-3.5 h-3.5 text-border" />
          </li>
          <li>
            <Link href="/products" className="hover:text-primary transition-colors">
              Products
            </Link>
          </li>
          <li>
            <ChevronRight className="w-3.5 h-3.5 text-border" />
          </li>
          <li className="font-semibold text-primary-dark truncate max-w-xs">
            {product.name} ({product.brand})
          </li>
        </ol>
      </nav>

      {/* 2-Column Product Detail Layout: Left Side Images, Right Side Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* ================= LEFT SIDE: IMAGES ================= */}
        <div className="lg:col-span-6 space-y-4">
          {/* Main Showcase Image */}
          <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-white border border-border shadow-navy-md group">
            <Image
              src={product.images[selectedImageIndex] || product.images[0]}
              alt={`${product.name} - ${product.brand} - view ${selectedImageIndex + 1}`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />

            {/* Top Discount Badge (if any) */}
            {discountPercent > 0 && (
              <div className="absolute top-4 right-4 pointer-events-none">
                <span className="px-3 py-1.5 rounded-full bg-accent text-primary-dark font-black text-xs shadow-sm">
                  {discountPercent}% OFF
                </span>
              </div>
            )}
          </div>

          {/* Thumbnails Row (if multiple images) */}
          {product.images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  aria-label={`View product image ${idx + 1}`}
                  className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all shrink-0 bg-white shadow-navy-xs ${
                    selectedImageIndex === idx
                      ? 'border-secondary scale-102 ring-2 ring-secondary/30'
                      : 'border-border opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image src={img} alt={`Thumbnail ${idx + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Trust Guarantees directly below images */}
          <div className="grid grid-cols-3 gap-2.5 pt-2">
            <div className="p-3 rounded-2xl bg-surface-alt border border-border text-center">
              <ShieldCheck className="w-5 h-5 text-secondary mx-auto mb-1" />
              <span className="text-[11px] font-bold text-primary-dark block leading-tight">
                99.8% Sortex
              </span>
              <span className="text-[10px] text-ink-muted">Optical Cleaned</span>
            </div>
            <div className="p-3 rounded-2xl bg-surface-alt border border-border text-center">
              <Award className="w-5 h-5 text-secondary mx-auto mb-1" />
              <span className="text-[11px] font-bold text-primary-dark block leading-tight">
                100% Unpolished
              </span>
              <span className="text-[10px] text-ink-muted">Zero Colour/Water</span>
            </div>
            <div className="p-3 rounded-2xl bg-surface-alt border border-border text-center">
              <MapPin className="w-5 h-5 text-secondary-light mx-auto mb-1" />
              <span className="text-[11px] font-bold text-primary-dark block leading-tight">
                Junagadh Mill
              </span>
              <span className="text-[10px] text-ink-muted">Direct Dispatch</span>
            </div>
          </div>
        </div>

        {/* ================= RIGHT SIDE: ALL OTHER DETAILS ================= */}
        <div className="lg:col-span-6 space-y-6">
          {/* Header & Title */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-light/15 text-secondary-dark font-heading font-bold text-xs uppercase tracking-wider mb-2">
              <span>{product.brand}</span>
              <span>•</span>
              <span>Sortex Cleaned Toor Dal</span>
            </div>

            <h1 className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-primary-dark tracking-tight">
              {product.name}
            </h1>

            <p className="text-sm text-ink-muted leading-relaxed mt-2.5">
              {product.shortDescription}
            </p>
          </div>

          {/* Highlighted Price Block */}
          <div className="p-5 rounded-3xl bg-surface-alt border border-border shadow-navy-xs space-y-2">
            <div className="flex items-baseline justify-between flex-wrap gap-2">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-ink-muted block">
                  Direct Miller Rate
                </span>
                <div className="flex items-baseline gap-3 mt-1.5">
                  <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-accent text-primary-dark font-heading font-black text-2xl shadow-sm">
                    <span>{formatPrice(product.price)}</span>
                    <span className="text-sm font-bold text-primary-dark/80 ml-1">/ kg</span>
                  </div>
                  <span className="line-through text-sm font-semibold text-ink-muted">
                    MRP {formatPrice(product.mrp)}
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs text-secondary-dark font-bold uppercase bg-secondary-light/20 px-2.5 py-1 rounded-md inline-block">
                  Direct Mill Dispatch
                </span>
              </div>
            </div>

            {savingsPerKg > 0 && (
              <div className="flex items-center gap-2 text-xs font-bold text-secondary-dark bg-secondary-light/20 p-2 rounded-xl mt-1">
                <Sparkles className="w-4 h-4 text-secondary shrink-0" />
                <span>You save {formatPrice(savingsPerKg)}/kg with direct mill rate!</span>
              </div>
            )}
          </div>

          {/* Essential Specifications Table (Clean & Focused, No Bloat) */}
          <div className="border border-border rounded-2xl overflow-hidden bg-white divide-y divide-border text-xs sm:text-sm">
            <div className="grid grid-cols-2 p-3 bg-surface-alt font-heading font-bold text-primary-dark">
              <span>Specification</span>
              <span>Details</span>
            </div>
            <div className="grid grid-cols-2 p-3">
              <span className="text-ink-muted">Commodity</span>
              <span className="font-semibold text-primary-dark">Sortex Cleaned Toor Dal</span>
            </div>
            <div className="grid grid-cols-2 p-3">
              <span className="text-ink-muted">Purity Grade</span>
              <span className="font-semibold text-primary-dark">99.8% Multi-Camera Optical Sortex</span>
            </div>
            <div className="grid grid-cols-2 p-3">
              <span className="text-ink-muted">Processing Type</span>
              <span className="font-semibold text-primary-dark">100% Natural Unpolished (Zero Chemical)</span>
            </div>
            <div className="grid grid-cols-2 p-3">
              <span className="text-ink-muted">Moisture Content</span>
              <span className="font-semibold text-primary-dark">&lt; 12% (Long Storage Life)</span>
            </div>
            <div className="grid grid-cols-2 p-3">
              <span className="text-ink-muted">Shelf Life</span>
              <span className="font-semibold text-primary-dark flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-secondary" />
                {product.shelfLife}
              </span>
            </div>
            <div className="grid grid-cols-2 p-3">
              <span className="text-ink-muted">Origin &amp; Mill</span>
              <span className="font-semibold text-primary-dark">Junagadh, Gujarat, India</span>
            </div>
          </div>

          {/* Direct Miller Action Buttons */}
          <div className="space-y-3 pt-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 px-6 rounded-2xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-heading font-extrabold text-base shadow-navy-md hover:shadow-navy-lg flex items-center justify-center gap-2.5 transition-all duration-300 hover:scale-[1.01] active:scale-98"
            >
              <MessageCircle className="w-5 h-5 fill-current shrink-0" />
              <span>Order / Enquire on WhatsApp</span>
            </a>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <a
                href={`tel:${siteConfig.contact.phone}`}
                className="py-3 px-4 rounded-xl bg-surface-alt hover:bg-border text-primary font-heading font-bold text-xs flex items-center justify-center gap-2 border border-border transition-colors"
              >
                <PhoneCall className="w-4 h-4 text-secondary shrink-0" />
                <span>Call Mill: {siteConfig.contact.displayPhone}</span>
              </a>

              <Link
                href="/contact"
                className="py-3 px-4 rounded-xl bg-primary-dark hover:bg-primary text-white font-heading font-bold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <span>Bulk Trade Enquiry</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <p className="text-[11px] text-ink-muted text-center pt-1">
              🌾 Available for retail buyers as well as wholesale truckloads across India.
            </p>
          </div>
        </div>
      </div>

      {/* Sticky Mobile WhatsApp Action Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 p-3 bg-white/95 backdrop-blur-md border-t border-border shadow-navy-xl flex items-center justify-between gap-3">
        <div>
          <span className="text-[10px] text-ink-muted uppercase font-bold block">
            Selling Rate
          </span>
          <span className="font-heading font-black text-lg text-primary-dark">
            {formatPrice(product.price)} / kg
          </span>
        </div>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-3 px-4 rounded-xl bg-[#25D366] text-white font-heading font-bold text-sm shadow-navy-sm flex items-center justify-center gap-2"
        >
          <MessageCircle className="w-4 h-4 fill-current shrink-0" />
          <span>WhatsApp Enquiry</span>
        </a>
      </div>

      {/* Related Products: Other Kanani Dal Brands */}
      {relatedProducts.length > 0 && (
        <div className="mt-16 pt-12 border-t border-border">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-secondary">
                More from Kanani Industries
              </span>
              <h2 className="font-heading font-black text-2xl sm:text-3xl text-primary-dark mt-1">
                Other Sortex Toor Brands
              </h2>
            </div>
            <Link
              href="/products"
              className="text-sm font-bold text-primary hover:text-secondary transition-colors"
            >
              View All Brands →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.slice(0, 3).map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
