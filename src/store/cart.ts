import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Product } from '@/lib/products';
import { siteConfig } from '@/config/site';

export interface CartItem {
  productId: string;
  slug: string;
  name: string;
  brand: string;
  image: string;
  packSize: number; // in kg
  pricePerKg: number;
  mrpPerKg: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isDrawerOpen: boolean;
  hasHydrated: boolean;
  setHasHydrated: (val: boolean) => void;
  addItem: (product: Product, packSize: number, quantity?: number) => void;
  removeItem: (productId: string, packSize: number) => void;
  updateQuantity: (productId: string, packSize: number, quantity: number) => void;
  clearCart: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  repriceWithProducts: (products: Product[]) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isDrawerOpen: false,
      hasHydrated: false,

      setHasHydrated: (val: boolean) => {
        set({ hasHydrated: val });
      },

      addItem: (product: Product, packSize: number, quantity: number = 1) => {
        set((state) => {
          const existingIndex = state.items.findIndex(
            (item) => item.productId === product.id && item.packSize === packSize
          );

          if (existingIndex > -1) {
            const updated = [...state.items];
            updated[existingIndex] = {
              ...updated[existingIndex],
              quantity: updated[existingIndex].quantity + quantity,
              pricePerKg: product.price,
              mrpPerKg: product.mrp,
            };
            return { items: updated, isDrawerOpen: true };
          }

          const newItem: CartItem = {
            productId: product.id,
            slug: product.slug,
            name: product.name,
            brand: product.brand,
            image: product.images[0] || '/images/products/janap-toor-savaj/main.jpg',
            packSize,
            pricePerKg: product.price,
            mrpPerKg: product.mrp,
            quantity,
          };

          return {
            items: [...state.items, newItem],
            isDrawerOpen: true,
          };
        });
      },

      removeItem: (productId: string, packSize: number) => {
        set((state) => ({
          items: state.items.filter(
            (item) => !(item.productId === productId && item.packSize === packSize)
          ),
        }));
      },

      updateQuantity: (productId: string, packSize: number, quantity: number) => {
        set((state) => {
          if (quantity <= 0) {
            return {
              items: state.items.filter(
                (item) => !(item.productId === productId && item.packSize === packSize)
              ),
            };
          }

          return {
            items: state.items.map((item) =>
              item.productId === productId && item.packSize === packSize
                ? { ...item, quantity }
                : item
            ),
          };
        });
      },

      clearCart: () => {
        set({ items: [] });
      },

      openDrawer: () => {
        set({ isDrawerOpen: true });
      },

      closeDrawer: () => {
        set({ isDrawerOpen: false });
      },

      repriceWithProducts: (products: Product[]) => {
        set((state) => {
          let hasChanged = false;
          const updated = state.items.map((item) => {
            const found = products.find((p) => p.id === item.productId);
            if (found && (item.pricePerKg !== found.price || item.mrpPerKg !== found.mrp)) {
              hasChanged = true;
              return {
                ...item,
                pricePerKg: found.price,
                mrpPerKg: found.mrp,
                name: found.name,
                brand: found.brand,
              };
            }
            return item;
          });

          return hasChanged ? { items: updated } : state;
        });
      },
    }),
    {
      name: 'kanani-cart-storage',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);

// Helper calculation selectors
export function getCartSubtotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.pricePerKg * item.packSize * item.quantity, 0);
}

export function getCartMrpTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.mrpPerKg * item.packSize * item.quantity, 0);
}

export function getCartItemCount(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}

export function getFreeShippingProgress(subtotal: number): {
  threshold: number;
  percentage: number;
  remaining: number;
  isFree: boolean;
} {
  const threshold = siteConfig.freeShippingThreshold;
  const isFree = subtotal >= threshold;
  const percentage = Math.min(100, Math.round((subtotal / threshold) * 100));
  const remaining = Math.max(0, threshold - subtotal);

  return {
    threshold,
    percentage,
    remaining,
    isFree,
  };
}
