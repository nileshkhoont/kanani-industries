'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Check, Plus, Minus, ArrowRight, Sparkles } from 'lucide-react';
import type { Product } from '@/lib/products';
import { formatPrice, calculateDiscount, formatWeight, calculatePackPrice } from '@/lib/format';
import { useCartStore } from '@/store/cart';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [selectedPack, setSelectedPack] = useState<number>(product.packSizes[0] || 1);
  const [justAdded, setJustAdded] = useState(false);

  const addItem = useCartStore((state) => state.addItem);
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  const cartItem = items.find(
    (item) => item.productId === product.id && item.packSize === selectedPack
  );
  const currentQuantityInCart = cartItem ? cartItem.quantity : 0;

  const discountPercent = calculateDiscount(product.price, product.mrp);
  const packPrice = calculatePackPrice(product.price, selectedPack);
  const packMrp = calculatePackPrice(product.mrp, selectedPack);

  const handleAddToCart = () => {
    addItem(product, selectedPack, 1);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
    }, 1400);
  };

  return (
    <div className="group relative rounded-3xl bg-white border border-border hover:border-secondary/30 shadow-navy-sm hover:shadow-navy-lg transition-all duration-300 flex flex-col overflow-hidden">
      {/* Top Media Container */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-surface-alt">
        <Link href={`/products/${product.slug}`} className="block w-full h-full">
          <Image
            src={product.images[0] || '/images/products/janap-toor-savaj/main.jpg'}
            alt={`${product.name} - ${product.brand}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-108"
          />
        </Link>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-secondary text-white text-[11px] font-bold tracking-wider uppercase shadow-sm">
            <Sparkles className="w-3 h-3 text-accent" />
            {product.brand}
          </span>

          {discountPercent > 0 && (
            <span className="px-2 py-0.8 rounded-full bg-accent text-primary-dark font-black text-xs shadow-sm">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {product.badges && product.badges.length > 0 && (
          <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5 pointer-events-none">
            {product.badges.slice(0, 2).map((badge) => (
              <span
                key={badge}
                className="px-2 py-0.5 rounded-md bg-primary-dark/80 backdrop-blur-sm text-white text-[10px] font-semibold tracking-wide"
              >
                {badge}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <Link href={`/products/${product.slug}`} className="block">
            <h3 className="font-heading font-extrabold text-xl text-primary-dark hover:text-secondary transition-colors">
              {product.name}
            </h3>
          </Link>
          <p className="text-xs text-ink-muted line-clamp-2 mt-1 leading-relaxed">
            {product.shortDescription}
          </p>
        </div>

        {/* Pack Size Selector */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[11px] font-bold text-ink-muted uppercase tracking-wider">
            <span>Select Bag Size</span>
            <span className="text-secondary font-semibold">
              Pack: {formatPrice(packPrice)}
              {packMrp > packPrice && (
                <span className="line-through text-[10px] text-ink-muted ml-1">
                  {formatPrice(packMrp)}
                </span>
              )}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {product.packSizes.map((size) => {
              const isSelected = selectedPack === size;
              return (
                <button
                  key={size}
                  onClick={() => setSelectedPack(size)}
                  type="button"
                  aria-label={`Select ${formatWeight(size)} bag size`}
                  className={`py-1.5 px-2 rounded-xl text-xs font-bold transition-all text-center border ${
                    isSelected
                      ? 'bg-primary-dark text-white border-primary-dark shadow-navy-xs'
                      : 'bg-surface-alt hover:bg-white text-ink border-border'
                  }`}
                >
                  {formatWeight(size)}
                </button>
              );
            })}
          </div>
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

          <Link
            href={`/products/${product.slug}`}
            aria-label={`View details for ${product.name}`}
            className="p-2 rounded-full text-primary hover:bg-surface-alt transition-colors"
          >
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Animated Add to Cart CTA / Stepper */}
        <div>
          {currentQuantityInCart > 0 && !justAdded ? (
            <div className="flex items-center justify-between bg-surface-alt border border-border rounded-2xl p-1.5">
              <button
                onClick={() => updateQuantity(product.id, selectedPack, currentQuantityInCart - 1)}
                aria-label="Decrease quantity in cart"
                className="w-9 h-9 rounded-xl bg-white hover:bg-border text-primary-dark flex items-center justify-center font-bold shadow-xs transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <div className="text-center">
                <span className="text-xs font-bold text-ink-muted block uppercase tracking-wider">
                  In Cart
                </span>
                <span className="font-heading font-black text-base text-primary-dark">
                  {currentQuantityInCart} × {formatWeight(selectedPack)}
                </span>
              </div>
              <button
                onClick={() => updateQuantity(product.id, selectedPack, currentQuantityInCart + 1)}
                aria-label="Increase quantity in cart"
                className="w-9 h-9 rounded-xl bg-white hover:bg-border text-primary-dark flex items-center justify-center font-bold shadow-xs transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleAddToCart}
              type="button"
              className={`w-full py-3 px-4 rounded-2xl font-heading font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 shadow-navy-xs active:scale-98 ${
                justAdded
                  ? 'bg-secondary text-white shadow-md'
                  : 'bg-primary hover:bg-primary-light text-white'
              }`}
            >
              <AnimatePresence mode="wait">
                {justAdded ? (
                  <motion.span
                    key="added"
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.7, opacity: 0 }}
                    className="flex items-center gap-1.5"
                  >
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>Added to Cart</span>
                  </motion.span>
                ) : (
                  <motion.span
                    key="add"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart ({formatPrice(packPrice)})</span>
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
