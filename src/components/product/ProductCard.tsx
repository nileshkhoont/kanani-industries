'use client';

import Link from 'next/link';
import Image from 'next/image';
import { MessageCircle, ArrowRight, Sparkles } from 'lucide-react';
import type { Product } from '@/lib/products';
import { formatPrice, calculateDiscount } from '@/lib/format';
import { siteConfig } from '@/config/site';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const discountPercent = calculateDiscount(product.price, product.mrp);

  const whatsappMessage = encodeURIComponent(
    `Hello Kanani Industries, I am interested in ${product.name} (${product.brand}) at ${formatPrice(
      product.price
    )}/kg. Please share booking and dispatch details.`
  );
  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div className="group relative rounded-3xl bg-white border border-border hover:border-secondary/30 shadow-navy-sm hover:shadow-navy-lg transition-all duration-300 flex flex-col overflow-hidden">
      {/* Top Media Container */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-surface-alt">
        <Link href={`/products/${product.slug}`} className="block w-full h-full">
          <Image
            src={product.images[0] || '/images/products/janap-toor-savaj/dry-toor.jpg'}
            alt={`${product.name} - ${product.brand}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-108"
          />
        </Link>

        {/* Top Discount Badge (if any) */}
        {discountPercent > 0 && (
          <div className="absolute top-3 right-3 pointer-events-none">
            <span className="px-2.5 py-1 rounded-full bg-accent text-primary-dark font-black text-xs shadow-sm">
              {discountPercent}% OFF
            </span>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-secondary">
            {product.brand}
          </span>
          <Link href={`/products/${product.slug}`} className="block mt-0.5">
            <h3 className="font-heading font-extrabold text-xl text-primary-dark hover:text-secondary transition-colors">
              {product.name}
            </h3>
          </Link>
          <p className="text-xs text-ink-muted line-clamp-2 mt-1 leading-relaxed">
            {product.shortDescription}
          </p>
        </div>

        {/* Highlighted Price Block */}
        <div className="pt-2 border-t border-border-subtle flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <span className="text-[10px] text-ink-muted uppercase font-bold tracking-wider">
              Selling Rate
            </span>
            <div className="flex items-baseline gap-2 mt-0.5">
              {/* Highlighted Golden Price Pill */}
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-accent text-primary-dark font-heading font-black text-base shadow-sm">
                <span>{formatPrice(product.price)}</span>
                <span className="text-xs font-bold text-primary-dark/80 ml-1">/ kg</span>
              </div>
              <span className="line-through text-xs font-semibold text-ink-muted">
                {formatPrice(product.mrp)}
              </span>
            </div>
          </div>

          <span className="text-[11px] font-bold text-secondary-dark uppercase bg-secondary-light/15 px-2 py-0.5 rounded-md">
            Direct Mill
          </span>
        </div>

        {/* Direct Action Buttons: WhatsApp Enquiry + View Details */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Enquire about ${product.name} on WhatsApp`}
            className="py-2.5 px-3 rounded-2xl bg-secondary hover:bg-secondary-dark text-white font-heading font-bold text-xs flex items-center justify-center gap-1.5 shadow-navy-xs transition-all active:scale-98"
          >
            <MessageCircle className="w-4 h-4 fill-current shrink-0" />
            <span className="truncate">WhatsApp</span>
          </a>

          <Link
            href={`/products/${product.slug}`}
            className="py-2.5 px-3 rounded-2xl bg-primary hover:bg-primary-light text-white font-heading font-bold text-xs flex items-center justify-center gap-1.5 shadow-navy-xs transition-all active:scale-98"
          >
            <span>Details</span>
            <ArrowRight className="w-3.5 h-3.5 shrink-0" />
          </Link>
        </div>
      </div>
    </div>
  );
}
