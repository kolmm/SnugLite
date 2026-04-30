import { describe, it, expect, beforeEach } from 'vitest';
import { useCartStore } from '../store/cartStore';
import type { Product, ProductVariant } from '../types';

const mockProduct: Product = {
  id: 'prod-001',
  slug: 'test-chair',
  name: 'Test Chair',
  description: 'desc',
  price: 100,
  category: 'furniture',
  images: [],
  features: [],
  inStock: true,
  tags: [],
};

const mockVariant: ProductVariant = {
  id: 'v-001-blk',
  name: 'Black',
  type: 'color',
  priceModifier: 20,
};

describe('cartStore', () => {
  beforeEach(() => {
    useCartStore.getState().clear();
    localStorage.clear();
  });

  it('starts empty', () => {
    expect(useCartStore.getState().items).toEqual([]);
  });

  it('addItem inserts new line', () => {
    useCartStore.getState().addItem(mockProduct, undefined, 1);
    const items = useCartStore.getState().items;
    expect(items).toHaveLength(1);
    expect(items[0].product.id).toBe('prod-001');
    expect(items[0].quantity).toBe(1);
  });

  it('addItem with same product+variant increments quantity', () => {
    const { addItem } = useCartStore.getState();
    addItem(mockProduct, mockVariant, 2);
    addItem(mockProduct, mockVariant, 3);
    const items = useCartStore.getState().items;
    expect(items).toHaveLength(1);
    expect(items[0].quantity).toBe(5);
  });

  it('addItem with same product different variants creates separate lines', () => {
    const { addItem } = useCartStore.getState();
    addItem(mockProduct, mockVariant, 1);
    addItem(mockProduct, undefined, 1);
    expect(useCartStore.getState().items).toHaveLength(2);
  });

  it('updateQuantity changes line quantity', () => {
    const { addItem, updateQuantity } = useCartStore.getState();
    addItem(mockProduct, undefined, 1);
    const lineId = useCartStore.getState().items[0].lineId;
    updateQuantity(lineId, 5);
    expect(useCartStore.getState().items[0].quantity).toBe(5);
  });

  it('updateQuantity to zero or below removes line', () => {
    const { addItem, updateQuantity } = useCartStore.getState();
    addItem(mockProduct, undefined, 2);
    const lineId = useCartStore.getState().items[0].lineId;
    updateQuantity(lineId, 0);
    expect(useCartStore.getState().items).toHaveLength(0);
  });

  it('removeItem deletes line', () => {
    const { addItem, removeItem } = useCartStore.getState();
    addItem(mockProduct, undefined, 1);
    const lineId = useCartStore.getState().items[0].lineId;
    removeItem(lineId);
    expect(useCartStore.getState().items).toHaveLength(0);
  });

  it('clear empties cart', () => {
    const { addItem, clear } = useCartStore.getState();
    addItem(mockProduct, undefined, 2);
    addItem(mockProduct, mockVariant, 1);
    clear();
    expect(useCartStore.getState().items).toEqual([]);
  });

  it('totalCount sums all quantities', () => {
    const { addItem } = useCartStore.getState();
    addItem(mockProduct, undefined, 2);
    addItem(mockProduct, mockVariant, 3);
    expect(useCartStore.getState().totalCount()).toBe(5);
  });

  it('subtotal applies variant priceModifier', () => {
    const { addItem } = useCartStore.getState();
    addItem(mockProduct, undefined, 2);
    addItem(mockProduct, mockVariant, 1);
    expect(useCartStore.getState().subtotal()).toBe(100 * 2 + (100 + 20) * 1);
  });
});
