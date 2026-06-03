import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Product, ProductVariant } from '../types';
import { STORAGE_KEYS } from '../lib/constants';

export interface CartLine {
  lineId: string;
  product: Product;
  variant?: ProductVariant;
  quantity: number;
}

interface CartState {
  items: CartLine[];
  addItem: (product: Product, variant: ProductVariant | undefined, quantity: number) => void;
  updateQuantity: (lineId: string, quantity: number) => void;
  removeItem: (lineId: string) => void;
  clear: () => void;
  totalCount: () => number;
  subtotal: () => number;
}

function buildLineId(productId: string, variantId: string | undefined): string {
  return variantId ? `${productId}::${variantId}` : productId;
}

function effectivePrice(line: CartLine): number {
  return line.product.price + (line.variant?.priceModifier ?? 0);
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, variant, quantity) =>
        set((state) => {
          const lineId = buildLineId(product.id, variant?.id);
          const existing = state.items.find((l) => l.lineId === lineId);
          if (existing) {
            return {
              items: state.items.map((l) =>
                l.lineId === lineId ? { ...l, quantity: l.quantity + quantity } : l,
              ),
            };
          }
          return {
            items: [...state.items, { lineId, product, variant, quantity }],
          };
        }),

      updateQuantity: (lineId, quantity) =>
        set((state) => {
          if (quantity <= 0) {
            return { items: state.items.filter((l) => l.lineId !== lineId) };
          }
          return {
            items: state.items.map((l) =>
              l.lineId === lineId ? { ...l, quantity } : l,
            ),
          };
        }),

      removeItem: (lineId) =>
        set((state) => ({ items: state.items.filter((l) => l.lineId !== lineId) })),

      clear: () => set({ items: [] }),

      totalCount: () => get().items.reduce((sum, l) => sum + l.quantity, 0),

      subtotal: () =>
        get().items.reduce((sum, l) => sum + effectivePrice(l) * l.quantity, 0),
    }),
    {
      name: STORAGE_KEYS.CART,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
      version: 1,
    },
  ),
);
