'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ShoppingBag,
  Zap,
  CheckCircle2,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  ChevronRight,
  Plus,
  Minus,
} from 'lucide-react';
import type { Product } from '@/lib/products';
import { formatPrice, calculateDiscount, formatWeight, calculatePackPrice } from '@/lib/format';
import { useCartStore } from '@/store/cart';
import { ProductCard } from '@/components/product/ProductCard';

interface ProductDetailViewProps {
  product: Product;
  relatedProducts: Product[];
}

export function ProductDetailView({ product, relatedProducts }: ProductDetailViewProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedPack, setSelectedPack] = useState<number>(product.packSizes[0] || 1);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'nutrition' | 'cooking' | 'specs'>('desc');

  const addItem = useCartStore((state) => state.addItem);
  const openDrawer = useCartStore((state) => state.openDrawer);

  const discountPercent = calculateDiscount(product.price, product.mrp);
  const packPrice = calculatePackPrice(product.price, selectedPack);
  const packMrp = calculatePackPrice(product.mrp, selectedPack);
  const totalLinePrice = packPrice * quantity;
  const totalLineMrp = packMrp * quantity;
  const totalSavings = Math.max(0, totalLineMrp - totalLinePrice);

  const handleAddToCart = () => {
    addItem(product, selectedPack, quantity);
  };

  const handleBuyNow = () => {
    addItem(product, selectedPack, quantity);
    openDrawer();
  };

  return (
    <div className="py-8 md:py-12">
      {/* Breadcrumbs */}
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

      {/* Main Grid: Gallery & Product Buy Box */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
        {/* Left Gallery (7 cols on lg) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Hero Image with Zoom Hover */}
          <div className="relative aspect-4/3 sm:aspect-16/11 w-full rounded-3xl overflow-hidden bg-white border border-border shadow-navy-md group">
            <Image
              src={product.images[selectedImageIndex] || product.images[0]}
              alt={`${product.name} - ${product.brand} - view ${selectedImageIndex + 1}`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
            />

            {/* Badges Overlay */}
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full bg-secondary text-white font-bold text-xs uppercase tracking-wider shadow-sm">
                {product.brand}
              </span>
              {discountPercent > 0 && (
                <span className="px-2.5 py-1 rounded-full bg-accent text-primary-dark font-black text-xs shadow-sm">
                  Save {discountPercent}%
                </span>
              )}
            </div>
          </div>

          {/* Thumbnails row */}
          {product.images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
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
        </div>

        {/* Right Product Details & Buy Box (5 cols on lg) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-surface-alt text-secondary-dark font-heading font-bold text-xs uppercase tracking-wider border border-border">
                {product.brand} • Gujarat Sortex Toor
              </span>
              <h1 className="font-heading font-black text-3xl sm:text-4xl text-primary-dark mt-2 tracking-tight">
                {product.name}
              </h1>
              <p className="text-sm text-ink-muted leading-relaxed mt-2">
                {product.shortDescription}
              </p>
            </div>

            {/* Highlights bullet pills */}
            <div className="flex flex-wrap gap-2">
              {product.highlights.map((h, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-surface-alt text-xs font-semibold text-primary"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-secondary" />
                  {h}
                </span>
              ))}
            </div>

            {/* Highlighted Price Block */}
            <div className="p-5 rounded-3xl bg-surface-alt border border-border shadow-navy-xs space-y-3">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-ink-muted">
                    Total Pack Price ({formatWeight(selectedPack)})
                  </span>
                  <div className="flex items-baseline gap-3 mt-1">
                    {/* Golden highlighted price pill */}
                    <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-accent text-primary-dark font-heading font-black text-2xl shadow-sm">
                      {formatPrice(packPrice)}
                    </div>
                    <span className="line-through text-sm font-semibold text-ink-muted">
                      MRP {formatPrice(packMrp)}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs text-ink-muted font-medium block">Per 1 kg Rate</span>
                  <span className="font-bold text-primary-dark text-sm">
                    {formatPrice(product.price)} / kg
                  </span>
                </div>
              </div>

              {totalSavings > 0 && (
                <div className="flex items-center gap-2 text-xs font-bold text-secondary-dark bg-secondary-light/15 p-2 rounded-xl">
                  <Sparkles className="w-4 h-4 text-secondary" />
                  <span>You save {formatPrice(totalSavings)} on this selection!</span>
                </div>
              )}
            </div>

            {/* Pack Size Selector */}
            <div className="space-y-2">
              <label className="text-xs font-extrabold uppercase tracking-wider text-primary-dark block">
                Choose Bag Size
              </label>
              <div className="grid grid-cols-3 gap-2">
                {product.packSizes.map((size) => {
                  const isSelected = selectedPack === size;
                  return (
                    <button
                      key={size}
                      onClick={() => setSelectedPack(size)}
                      type="button"
                      className={`py-3 px-3 rounded-2xl font-heading font-bold text-sm transition-all border flex flex-col items-center justify-center ${
                        isSelected
                          ? 'bg-primary-dark text-white border-primary-dark shadow-navy-sm scale-102'
                          : 'bg-white hover:bg-surface-alt text-ink border-border'
                      }`}
                    >
                      <span>{formatWeight(size)}</span>
                      <span
                        className={`text-[11px] font-medium mt-0.5 ${
                          isSelected ? 'text-accent' : 'text-ink-muted'
                        }`}
                      >
                        {formatPrice(calculatePackPrice(product.price, size))}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity Stepper */}
            <div className="flex items-center gap-4">
              <label className="text-xs font-extrabold uppercase tracking-wider text-primary-dark">
                Bags Qty:
              </label>
              <div className="flex items-center border border-border rounded-xl bg-white overflow-hidden shadow-xs">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  aria-label="Decrease quantity"
                  className="p-2 hover:bg-surface-alt text-ink transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 py-1 font-heading font-black text-sm text-primary-dark min-w-[36px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  aria-label="Increase quantity"
                  className="p-2 hover:bg-surface-alt text-ink transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <span className="text-xs font-semibold text-ink-muted">
                Line total: <strong className="text-primary-dark">{formatPrice(totalLinePrice)}</strong>
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={handleAddToCart}
                type="button"
                className="py-3.5 px-6 rounded-2xl bg-primary hover:bg-primary-light text-white font-heading font-bold text-sm shadow-navy-sm flex items-center justify-center gap-2 transition-all active:scale-98"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>

              <button
                onClick={handleBuyNow}
                type="button"
                className="py-3.5 px-6 rounded-2xl bg-gradient-leaf text-white font-heading font-bold text-sm shadow-navy-sm flex items-center justify-center gap-2 transition-all hover:brightness-105 active:scale-98"
              >
                <Zap className="w-4 h-4 text-accent fill-current" />
                <span>Buy Now (Express)</span>
              </button>
            </div>
          </div>

          {/* Trust Badges Strip */}
          <div className="p-4 rounded-2xl bg-surface-alt border border-border grid grid-cols-2 gap-3 text-xs text-ink-muted mt-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-secondary shrink-0" />
              <span>Multi-Camera Sortex 99.8% Purity</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-secondary shrink-0" />
              <span>Direct Mill Dispatch</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" />
              <span>Unadulterated Genuine Pulse</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-secondary shrink-0" />
              <span>Quality Guarantee</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Detail Tabs */}
      <div className="mt-16 pt-10 border-t border-border">
        {/* Tab Headers */}
        <div className="flex flex-wrap gap-2 border-b border-border pb-3">
          {[
            { id: 'desc', label: 'Detailed Description' },
            { id: 'nutrition', label: 'Nutrition Facts (Per 100g)' },
            { id: 'cooking', label: 'Culinary Uses & Tips' },
            { id: 'specs', label: 'Specifications & Shelf Life' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`py-2 px-5 rounded-xl font-heading font-bold text-sm transition-all ${
                activeTab === tab.id
                  ? 'bg-primary-dark text-white shadow-navy-xs'
                  : 'bg-white hover:bg-surface-alt text-ink-muted'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content Panes */}
        <div className="p-6 md:p-8 rounded-3xl bg-white border border-border shadow-navy-sm mt-4">
          {activeTab === 'desc' && (
            <div className="space-y-4 text-ink leading-relaxed max-w-4xl">
              <h3 className="font-heading font-extrabold text-xl text-primary-dark">
                About {product.name} ({product.brand})
              </h3>
              {product.description.split('\n\n').map((para, i) => (
                <p key={i} className="text-sm md:text-base text-ink-muted leading-relaxed">
                  {para}
                </p>
              ))}
            </div>
          )}

          {activeTab === 'nutrition' && (
            <div className="max-w-2xl space-y-4">
              <h3 className="font-heading font-extrabold text-xl text-primary-dark">
                Nutritional Profile (Approximate values per 100g)
              </h3>
              <p className="text-xs text-ink-muted">
                Naturally rich in dietary plant protein, complex carbohydrates, and essential
                minerals.
              </p>
              <div className="border border-border rounded-2xl overflow-hidden divide-y divide-border">
                <div className="grid grid-cols-2 p-3 bg-surface-alt text-xs font-bold text-primary-dark uppercase">
                  <span>Nutrient Component</span>
                  <span>Value Per 100g</span>
                </div>
                <div className="grid grid-cols-2 p-3 text-sm">
                  <span className="font-medium text-ink">Energy Value</span>
                  <span className="font-bold text-primary-dark">
                    {product.nutritionPer100g.energyKcal} kcal
                  </span>
                </div>
                <div className="grid grid-cols-2 p-3 text-sm">
                  <span className="font-medium text-ink">Plant Protein</span>
                  <span className="font-bold text-secondary-dark">
                    {product.nutritionPer100g.proteinG} g
                  </span>
                </div>
                <div className="grid grid-cols-2 p-3 text-sm">
                  <span className="font-medium text-ink">Carbohydrates</span>
                  <span className="font-bold text-primary-dark">
                    {product.nutritionPer100g.carbsG} g
                  </span>
                </div>
                <div className="grid grid-cols-2 p-3 text-sm">
                  <span className="font-medium text-ink">Dietary Fiber</span>
                  <span className="font-bold text-primary-dark">
                    {product.nutritionPer100g.fiberG} g
                  </span>
                </div>
                <div className="grid grid-cols-2 p-3 text-sm">
                  <span className="font-medium text-ink">Total Fat</span>
                  <span className="font-bold text-primary-dark">
                    {product.nutritionPer100g.fatG} g
                  </span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'cooking' && (
            <div className="max-w-3xl space-y-4 text-ink-muted">
              <h3 className="font-heading font-extrabold text-xl text-primary-dark">
                Recommended Culinary Applications
              </h3>
              <p className="text-sm">
                Kanani Industries Sortex Toor dal is graded specifically for fast hydration and
                uniform cooking. Follow these simple tips for delicious results:
              </p>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                  <span>
                    <strong>Gujarati Sweet &amp; Tangy Dal:</strong> Pressure cook for 4 whistles with
                    turmeric, whisk smooth, and simmer with jaggery, lemon juice/kokum, and
                    mustard-cumin vaghar.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                  <span>
                    <strong>Dhaba Dal Tadka:</strong> Cook till velvety, fold into sautéed onion,
                    garlic, and tomatoes, finished with smoking ghee and whole dried chilies.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                  <span>
                    <strong>South Indian Sambhar:</strong> Combines gracefully with drumstick, shallots,
                    and tamarind broth, offering high natural thickening power without artificial
                    additives.
                  </span>
                </li>
              </ul>
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="max-w-2xl space-y-4">
              <h3 className="font-heading font-extrabold text-xl text-primary-dark">
                Product Specifications
              </h3>
              <div className="border border-border rounded-2xl overflow-hidden divide-y divide-border text-sm">
                <div className="grid grid-cols-2 p-3">
                  <span className="text-ink-muted">Commodity</span>
                  <span className="font-bold text-primary-dark">Sortex Toor Dal (Split Pigeon Peas)</span>
                </div>
                <div className="grid grid-cols-2 p-3">
                  <span className="text-ink-muted">Country of Origin</span>
                  <span className="font-bold text-primary-dark">India (Gujarat State)</span>
                </div>
                <div className="grid grid-cols-2 p-3">
                  <span className="text-ink-muted">Sorting Technology</span>
                  <span className="font-bold text-primary-dark">Multi-CCD Optical Color Sorter</span>
                </div>
                <div className="grid grid-cols-2 p-3">
                  <span className="text-ink-muted">Shelf Life</span>
                  <span className="font-bold text-primary-dark">{product.shelfLife}</span>
                </div>
                <div className="grid grid-cols-2 p-3">
                  <span className="text-ink-muted">Storage Advisory</span>
                  <span className="font-bold text-primary-dark">
                    Store in a cool, dry place away from moisture and direct sunlight. Transfer to an
                    airtight container once opened.
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sticky Mobile Add-to-Cart Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 p-3 bg-white/95 backdrop-blur-md border-t border-border shadow-navy-xl flex items-center justify-between gap-3">
        <div>
          <span className="text-[10px] text-ink-muted uppercase font-bold block">
            {formatWeight(selectedPack)} Bag
          </span>
          <span className="font-heading font-black text-lg text-primary-dark">
            {formatPrice(packPrice)}
          </span>
        </div>
        <button
          onClick={handleAddToCart}
          className="flex-1 py-3 px-4 rounded-xl bg-primary text-white font-heading font-bold text-sm shadow-navy-sm flex items-center justify-center gap-2"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Add to Cart</span>
        </button>
      </div>

      {/* Related Products: "You May Also Like" */}
      {relatedProducts.length > 0 && (
        <div className="mt-20">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-secondary">
                More from Kanani Industries
              </span>
              <h2 className="font-heading font-black text-2xl sm:text-3xl text-primary-dark mt-1">
                You May Also Like
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
