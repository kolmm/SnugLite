# SnugLite SRL Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a multi-page e-commerce website for SnugLite SRL — premium reseller of office furniture and lighting — with editorial luxury aesthetics inspired by casperscaviar.com, integrating 36 existing products from `WarmNest-products-export`.

**Architecture:** Vite + React 18 + TypeScript SPA with React Router v7, Tailwind CSS v4 (CSS-native theme tokens), Zustand (cart with localStorage persist), React Hook Form (checkout/contact), Framer Motion (animations), Lucide React (icons). Static catalog (36 products imported as TS module), local-only checkout flow (no backend), GDPR cookie banner + legal pages with placeholder address.

**Tech Stack:**
- React 18.3, Vite 5, TypeScript 5.5
- Tailwind CSS v4 + `@tailwindcss/vite` plugin
- React Router v7 (DOM)
- Framer Motion 11
- Zustand 5 (with `persist` middleware)
- React Hook Form 7 + Zod
- Lucide React 0.5+
- Vitest + Testing Library (logic tests only)
- `@fontsource/bodoni-moda`, `@fontsource/italianno`, `@fontsource/jost` (self-hosted fonts)

**Design System Reference:** `design-system/MASTER.md` (locked, do NOT modify during implementation)

**Working Directory:** `/Users/kolmm/work/SnugLite/`

**Critical Constraints:**
- NEVER run `npm run dev` / `npm start` (user runs dev server themselves)
- NO emojis anywhere (code, comments, copy, commits)
- NO TODO/FIXME placeholder comments in production code
- ALL code comments in English
- Use named constants, no magic strings
- Color system uses CSS variables via Tailwind v4 `@theme`

---

## File Structure

```
SnugLite/
├── design-system/MASTER.md          # locked, reference-only
├── docs/plans/                      # this plan
├── public/
│   ├── favicon.svg                  # generated
│   ├── images/
│   │   ├── products/                # copied from WarmNest export
│   │   │   ├── furniture/<slug>/{1,2,3}.{jpg,png}
│   │   │   └── shelving/<slug>/{1,2,3}.{jpg,png}
│   │   ├── categories/{furniture,shelving}.jpg
│   │   ├── marketing/{hero,1972}.jpg
│   │   └── lifestyle/               # 6 Unsplash downloads
│   │       ├── hero-main.jpg
│   │       ├── about-hero.jpg
│   │       ├── about-inset.jpg
│   │       ├── sourcing-hero.jpg
│   │       ├── sourcing-detail.jpg
│   │       └── contact-bg.jpg
├── src/
│   ├── main.tsx                     # entry, RouterProvider
│   ├── App.tsx                      # not used (router replaces)
│   ├── styles/
│   │   ├── global.css               # @import tailwind, @theme tokens, @layer base
│   │   └── fonts.css                # @fontsource imports
│   ├── routes/
│   │   ├── index.ts                 # createBrowserRouter config
│   │   ├── RootLayout.tsx           # Header/Footer/CookieBanner wrapper
│   │   ├── ScrollToTop.tsx          # router scroll restoration
│   │   ├── HomePage.tsx
│   │   ├── ShopPage.tsx
│   │   ├── ProductPage.tsx
│   │   ├── AboutPage.tsx
│   │   ├── SourcingPage.tsx
│   │   ├── CartPage.tsx
│   │   ├── CheckoutPage.tsx
│   │   ├── CheckoutSuccessPage.tsx
│   │   ├── ContactPage.tsx
│   │   ├── FaqPage.tsx
│   │   ├── PrivacyPolicyPage.tsx
│   │   ├── TermsOfUsePage.tsx
│   │   ├── RefundPolicyPage.tsx
│   │   └── NotFoundPage.tsx
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── CookieBanner.tsx
│   │   │   ├── MobileMenu.tsx
│   │   │   └── Logo.tsx
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Textarea.tsx
│   │   │   ├── Select.tsx
│   │   │   ├── QtyStepper.tsx
│   │   │   ├── Accordion.tsx
│   │   │   ├── NumberedTag.tsx
│   │   │   ├── ScriptAccent.tsx
│   │   │   └── PriceTag.tsx
│   │   ├── brand/
│   │   │   ├── SealStamp.tsx
│   │   │   ├── PostageFrame.tsx
│   │   │   └── GrainOverlay.tsx
│   │   ├── product/
│   │   │   ├── ProductCard.tsx
│   │   │   ├── ProductGallery.tsx
│   │   │   ├── VariantSelector.tsx
│   │   │   └── RelatedProducts.tsx
│   │   ├── cart/
│   │   │   ├── CartLineItem.tsx
│   │   │   └── OrderSummary.tsx
│   │   ├── sections/
│   │   │   ├── Hero.tsx
│   │   │   ├── FeaturedCollection.tsx
│   │   │   ├── AboutTeaser.tsx
│   │   │   ├── CategoriesShowcase.tsx
│   │   │   ├── Newsletter.tsx
│   │   │   ├── SectionHeading.tsx
│   │   │   └── Manifesto.tsx
│   │   └── motion/
│   │       ├── FadeRise.tsx
│   │       └── ScriptReveal.tsx
│   ├── data/
│   │   ├── products.ts              # imports from WarmNest export
│   │   ├── categories.ts
│   │   └── faq.ts
│   ├── store/
│   │   └── cartStore.ts             # Zustand + persist
│   ├── lib/
│   │   ├── format.ts                # formatPriceEUR, slugify, generateOrderNumber
│   │   ├── constants.ts             # ROUTES, CONTACT, BRAND
│   │   └── motion.ts                # easing tokens, common variants
│   ├── hooks/
│   │   ├── useScrollLock.ts
│   │   └── useCookieConsent.ts
│   ├── types/
│   │   └── index.ts                 # re-exports product types
│   └── tests/
│       ├── cartStore.test.ts
│       ├── format.test.ts
│       └── slugify.test.ts
├── index.html
├── vite.config.ts
├── tsconfig.json
├── tsconfig.node.json
├── package.json
└── .gitignore
```

---

## Task 1: Project Scaffold

**Files:**
- Create: `package.json`, `vite.config.ts`, `tsconfig.json`, `tsconfig.node.json`, `index.html`, `src/main.tsx`, `src/vite-env.d.ts`, `.gitignore`, `src/App.tsx` (placeholder)

- [ ] **Step 1: Init project with Vite React-TS template**

```bash
cd /Users/kolmm/work/SnugLite
npm create vite@latest . -- --template react-ts
```

When prompted "Current directory is not empty", choose "Ignore files and continue".

- [ ] **Step 2: Install runtime dependencies**

```bash
npm install react-router@^7 framer-motion@^11 zustand@^5 react-hook-form@^7 @hookform/resolvers zod lucide-react @fontsource/bodoni-moda @fontsource/italianno @fontsource/jost
```

- [ ] **Step 3: Install dev dependencies**

```bash
npm install -D tailwindcss@next @tailwindcss/vite@next vitest @testing-library/react @testing-library/jest-dom jsdom
```

- [ ] **Step 4: Replace `vite.config.ts`**

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/tests/setup.ts'],
  },
});
```

- [ ] **Step 5: Replace `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "useDefineForClassFields": true,
    "module": "ESNext",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "types": ["vite/client", "vitest/globals"],
    "baseUrl": ".",
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

- [ ] **Step 6: Verify scaffold builds**

```bash
npx tsc --noEmit
```

Expected: zero errors.

```bash
npm run build
```

Expected: completes without errors, produces `dist/`.

- [ ] **Step 7: Init git, first commit**

```bash
cd /Users/kolmm/work/SnugLite
git init
git add -A
git commit -m "chore: scaffold Vite + React + TypeScript + Tailwind v4 project"
```

---

## Task 2: Asset Pipeline

**Files:**
- Create: `public/images/products/`, `public/images/categories/`, `public/images/marketing/`, `public/images/lifestyle/`

- [ ] **Step 1: Copy WarmNest product/category/marketing images**

```bash
cd /Users/kolmm/work/SnugLite
mkdir -p public/images/lifestyle
cp -R /Users/kolmm/work/WarmNest-products-export/images/products public/images/products
cp -R /Users/kolmm/work/WarmNest-products-export/images/categories public/images/categories
mkdir -p public/images/marketing
cp /Users/kolmm/work/WarmNest-products-export/images/hero.jpg public/images/marketing/hero.jpg
cp /Users/kolmm/work/WarmNest-products-export/images/1972.jpg public/images/marketing/1972.jpg
find public/images -name '.DS_Store' -delete
```

- [ ] **Step 2: Download Unsplash lifestyle images**

```bash
cd /Users/kolmm/work/SnugLite/public/images/lifestyle

curl -L -o hero-main.jpg "https://images.unsplash.com/photo-hz2hOyhuIvw?w=2400&q=85&fm=jpg&auto=format"
curl -L -o about-hero.jpg "https://images.unsplash.com/photo-agz5hQ0rXUc?w=2000&q=85&fm=jpg&auto=format"
curl -L -o about-inset.jpg "https://images.unsplash.com/photo-XneRmPhXl0w?w=1400&q=85&fm=jpg&auto=format"
curl -L -o sourcing-hero.jpg "https://images.unsplash.com/photo-olhmapwEgdo?w=2000&q=85&fm=jpg&auto=format"
curl -L -o sourcing-detail.jpg "https://images.unsplash.com/photo-MO-xupGNAck?w=1400&q=85&fm=jpg&auto=format"
curl -L -o contact-bg.jpg "https://images.unsplash.com/photo-CT5_HdidO8o?w=2000&q=85&fm=jpg&auto=format"

ls -lh
```

Expected: 6 jpg files, each 100KB-2MB. If any 404s, fall back to copy from `public/images/marketing/1972.jpg`.

- [ ] **Step 3: Verify image counts**

```bash
find public/images/products -type f \( -name '*.jpg' -o -name '*.png' \) | wc -l
```

Expected: 107.

- [ ] **Step 4: Commit assets**

```bash
git add public/
git commit -m "chore: import product images from WarmNest export and Unsplash lifestyle"
```

---

## Task 3: Data Layer — Products and Types

**Files:**
- Create: `src/data/products.ts`, `src/data/categories.ts`, `src/types/index.ts`

- [ ] **Step 1: Copy products data files**

```bash
cd /Users/kolmm/work/SnugLite
mkdir -p src/data
cp /Users/kolmm/work/WarmNest-products-export/products.ts src/data/products.ts
cp /Users/kolmm/work/WarmNest-products-export/categories.ts src/data/categories.ts
cp /Users/kolmm/work/WarmNest-products-export/types.ts src/types/index.ts
```

- [ ] **Step 2: Create `src/data/faq.ts`**

```ts
export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Do you ship across the EU?",
    answer:
      "Yes. SnugLite ships to all EU member states. Standard delivery takes five to ten business days depending on destination. We coordinate freight directly with each supplier so larger items arrive insured and assembled where possible.",
  },
  {
    question: "How does pricing work?",
    answer:
      "All prices on the site are quoted in EUR and include VAT. Volume orders for offices over twenty pieces qualify for trade pricing — contact us for a tailored quote.",
  },
  {
    question: "Can I see a piece before ordering?",
    answer:
      "Some pieces are available to view at our partner showrooms in Milan and Bucharest. Reach out via the contact form and we will arrange access.",
  },
  {
    question: "What is your return policy?",
    answer:
      "Unused items in original packaging may be returned within fourteen days of delivery. See the refund policy page for full conditions.",
  },
  {
    question: "Do you offer lighting?",
    answer:
      "A curated lighting range is in development and will launch alongside our autumn collection. Sign up for updates to be notified first.",
  },
  {
    question: "How are products selected?",
    answer:
      "Every piece in the catalog is chosen for material honesty, build quality, and longevity. We work with a small group of European manufacturers and visit production sites annually.",
  },
];
```

- [ ] **Step 3: Verify TypeScript imports compile**

```bash
npx tsc --noEmit
```

Expected: zero errors.

- [ ] **Step 4: Commit data layer**

```bash
git add src/data src/types
git commit -m "feat: import product catalog, categories, and FAQ data"
```

---

## Task 4: Constants and Format Utilities (TDD)

**Files:**
- Create: `src/lib/constants.ts`, `src/lib/format.ts`, `src/tests/setup.ts`, `src/tests/format.test.ts`

- [ ] **Step 1: Create test setup**

`src/tests/setup.ts`:

```ts
import '@testing-library/jest-dom/vitest';
```

- [ ] **Step 2: Create constants**

`src/lib/constants.ts`:

```ts
export const ROUTES = {
  HOME: '/',
  SHOP: '/shop',
  SHOP_CATEGORY: '/shop/:category',
  PRODUCT: '/products/:slug',
  ABOUT: '/about',
  SOURCING: '/sourcing',
  CART: '/cart',
  CHECKOUT: '/checkout',
  CHECKOUT_SUCCESS: '/checkout/success',
  CONTACT: '/contact',
  FAQ: '/faq',
  PRIVACY: '/privacy-policy',
  TERMS: '/terms-of-use',
  REFUND: '/refund-policy',
} as const;

export const BRAND = {
  NAME: 'SnugLite',
  ENTITY: 'SnugLite SRL',
  TAGLINE: 'Considered Workspaces',
  SUBTITLE: 'Office Furniture & Workspace Solutions',
  YEAR_FOUNDED: 2026,
} as const;

export const CONTACT = {
  EMAIL: 'orders@snuglite.eu',
  PHONE: '+39 02 0000 0000',
  ADDRESS_LINE_1: '[ADDRESS_PLACEHOLDER]',
  ADDRESS_LINE_2: '[CITY_POSTAL_PLACEHOLDER]',
  COUNTRY: '[COUNTRY_PLACEHOLDER]',
} as const;

export const STORAGE_KEYS = {
  CART: 'snuglite-cart-v1',
  COOKIE_CONSENT: 'snuglite-cookie-consent-v1',
} as const;

export const ORDER_NUMBER_OFFSET = 1042;
```

- [ ] **Step 3: Write failing tests for format utilities**

`src/tests/format.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { formatPriceEUR, slugify, generateOrderNumber } from '../lib/format';

describe('formatPriceEUR', () => {
  it('formats integer price with euro symbol', () => {
    expect(formatPriceEUR(389)).toBe('€389');
  });

  it('formats decimals with two places', () => {
    expect(formatPriceEUR(89.5)).toBe('€89.50');
  });

  it('handles zero', () => {
    expect(formatPriceEUR(0)).toBe('€0');
  });

  it('rounds to two decimals', () => {
    expect(formatPriceEUR(99.999)).toBe('€100');
  });
});

describe('slugify', () => {
  it('lowercases and replaces spaces with dashes', () => {
    expect(slugify('Office Furniture')).toBe('office-furniture');
  });

  it('strips special characters', () => {
    expect(slugify('Nº 001 — Premium!')).toBe('n-001-premium');
  });

  it('collapses multiple separators', () => {
    expect(slugify('a   b---c')).toBe('a-b-c');
  });
});

describe('generateOrderNumber', () => {
  it('returns 4-digit zero-padded number based on timestamp', () => {
    const result = generateOrderNumber(1700000000000);
    expect(result).toMatch(/^\d{4}$/);
  });

  it('different timestamps produce different numbers', () => {
    const a = generateOrderNumber(1700000000000);
    const b = generateOrderNumber(1700000000001);
    expect(a).not.toBe(b);
  });
});
```

- [ ] **Step 4: Run tests to confirm failure**

```bash
npx vitest run src/tests/format.test.ts
```

Expected: FAIL with "Cannot find module '../lib/format'".

- [ ] **Step 5: Implement format utilities**

`src/lib/format.ts`:

```ts
import { ORDER_NUMBER_OFFSET } from './constants';

export function formatPriceEUR(amount: number): string {
  const rounded = Math.round(amount * 100) / 100;
  if (Number.isInteger(rounded)) {
    return `€${rounded}`;
  }
  return `€${rounded.toFixed(2)}`;
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function generateOrderNumber(timestamp: number = Date.now()): string {
  const seed = (timestamp % 100000) + ORDER_NUMBER_OFFSET;
  return String(seed).padStart(4, '0').slice(-4);
}
```

- [ ] **Step 6: Run tests to confirm pass**

```bash
npx vitest run src/tests/format.test.ts
```

Expected: PASS, 9 tests.

- [ ] **Step 7: Commit**

```bash
git add src/lib src/tests
git commit -m "feat: add constants and format utilities with tests"
```

---

## Task 5: Cart Store (TDD)

**Files:**
- Create: `src/store/cartStore.ts`, `src/tests/cartStore.test.ts`

- [ ] **Step 1: Write failing tests**

`src/tests/cartStore.test.ts`:

```ts
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
    const { addItem, totalCount } = useCartStore.getState();
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
```

- [ ] **Step 2: Run tests to confirm failure**

```bash
npx vitest run src/tests/cartStore.test.ts
```

Expected: FAIL with "Cannot find module".

- [ ] **Step 3: Implement cart store**

`src/store/cartStore.ts`:

```ts
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
```

- [ ] **Step 4: Run tests**

```bash
npx vitest run src/tests/cartStore.test.ts
```

Expected: PASS, 10 tests.

- [ ] **Step 5: Commit**

```bash
git add src/store src/tests/cartStore.test.ts
git commit -m "feat: add Zustand cart store with localStorage persistence and tests"
```

---

## Task 6: Tailwind v4 Theme and Global Styles

**Files:**
- Create: `src/styles/global.css`, `src/styles/fonts.css`
- Modify: `src/main.tsx`, `index.html`

- [ ] **Step 1: Create fonts CSS**

`src/styles/fonts.css`:

```css
@import '@fontsource/bodoni-moda/400.css';
@import '@fontsource/bodoni-moda/500.css';
@import '@fontsource/bodoni-moda/700.css';
@import '@fontsource/bodoni-moda/700-italic.css';
@import '@fontsource/bodoni-moda/900.css';
@import '@fontsource/italianno/400.css';
@import '@fontsource/jost/300.css';
@import '@fontsource/jost/400.css';
@import '@fontsource/jost/500.css';
@import '@fontsource/jost/700.css';
```

- [ ] **Step 2: Create global stylesheet with @theme**

`src/styles/global.css`:

```css
@import 'tailwindcss';
@import './fonts.css';

@theme {
  --font-display: 'Bodoni Moda', 'Times New Roman', serif;
  --font-body: 'Jost', system-ui, sans-serif;
  --font-script: 'Italianno', cursive;

  --color-ink: #0A0A0A;
  --color-cream: #F4F1EA;
  --color-paper: #FAF8F3;
  --color-stone: #8B847D;
  --color-bone: #E8E3D8;
  --color-rust: #B85C38;
  --color-rust-dark: #94472A;
  --color-success: #4A6741;
  --color-error: #8B2E1F;

  --ease-soft: cubic-bezier(0.32, 0.72, 0, 1);
  --ease-snap: cubic-bezier(0.65, 0, 0.35, 1);

  --duration-fast: 200ms;
  --duration-base: 400ms;
  --duration-slow: 700ms;

  --breakpoint-3xl: 1920px;
}

@layer base {
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html {
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }

  body {
    background-color: var(--color-cream);
    color: var(--color-ink);
    font-family: var(--font-body);
    font-weight: 400;
    line-height: 1.6;
    margin: 0;
    min-height: 100vh;
  }

  ::selection {
    background-color: var(--color-ink);
    color: var(--color-cream);
  }

  :focus-visible {
    outline: 2px solid var(--color-ink);
    outline-offset: 2px;
  }

  button {
    cursor: pointer;
    font-family: inherit;
  }

  input, textarea, select {
    font-family: inherit;
  }

  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
}

@utility display-xl {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: clamp(3rem, 9vw, 6.5rem);
  line-height: 1;
  letter-spacing: -0.02em;
}

@utility display-lg {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  line-height: 1.05;
  letter-spacing: -0.015em;
}

@utility display-md {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(2rem, 4vw, 3rem);
  line-height: 1.1;
  letter-spacing: -0.01em;
}

@utility heading-lg {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 2rem;
  line-height: 1.2;
}

@utility heading-md {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.5rem;
  line-height: 1.3;
}

@utility script-accent {
  font-family: var(--font-script);
  font-weight: 400;
  font-size: clamp(2.5rem, 6vw, 5rem);
  line-height: 1;
  color: var(--color-rust);
}

@utility caption {
  font-family: var(--font-body);
  font-size: 0.8125rem;
  font-weight: 500;
  line-height: 1.5;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

@utility tabular {
  font-feature-settings: 'tnum' 1, 'lnum' 1;
}
```

- [ ] **Step 3: Update `src/main.tsx`**

```tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import './styles/global.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

- [ ] **Step 4: Replace `src/App.tsx` with smoke test**

```tsx
export function App() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-2xl">
        <p className="caption text-stone">SnugLite • Considered Workspaces</p>
        <h1 className="display-xl mt-6">
          ATELIER FOR <span className="script-accent text-rust">workspaces</span>
        </h1>
        <p className="mt-8 text-lg text-stone">Scaffold ready.</p>
      </div>
    </main>
  );
}
```

- [ ] **Step 5: Update `index.html` title and meta**

Replace contents:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
    <meta name="description" content="SnugLite — premium office furniture and lighting for considered workspaces. Curated catalogue across the EU." />
    <meta name="theme-color" content="#F4F1EA" />
    <title>SnugLite — Considered Workspaces</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 6: Verify build**

```bash
npx tsc --noEmit && npm run build
```

Expected: success.

- [ ] **Step 7: Commit**

```bash
git add src/styles src/main.tsx src/App.tsx index.html
git commit -m "feat: configure Tailwind v4 theme tokens, fonts, base styles"
```

---

## Task 7: Brand SVG Components

**Files:**
- Create: `src/components/brand/SealStamp.tsx`, `src/components/brand/PostageFrame.tsx`, `src/components/brand/GrainOverlay.tsx`

- [ ] **Step 1: Create `SealStamp.tsx`**

```tsx
import { useId } from 'react';

interface SealStampProps {
  size?: number;
  centerLines?: string[];
  perimeterText?: string;
  className?: string;
  color?: string;
}

const DEFAULT_PERIMETER = 'SNUGLITE • CONSIDERED WORKSPACES • EST. 2026 •';

export function SealStamp({
  size = 160,
  centerLines = ['SRL', 'EU', '2026'],
  perimeterText = DEFAULT_PERIMETER,
  className,
  color = 'currentColor',
}: SealStampProps) {
  const pathId = useId();
  const radius = size / 2 - 4;
  const innerRadius = radius - 14;

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label="SnugLite stamp"
    >
      <defs>
        <path
          id={pathId}
          d={`M ${size / 2}, ${size / 2} m -${radius - 8}, 0 a ${radius - 8},${radius - 8} 0 1,1 ${(radius - 8) * 2},0 a ${radius - 8},${radius - 8} 0 1,1 -${(radius - 8) * 2},0`}
          fill="none"
        />
      </defs>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth="1"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={innerRadius}
        fill="none"
        stroke={color}
        strokeWidth="0.5"
        strokeDasharray="2 2"
      />
      <text fontFamily="Jost, sans-serif" fontSize="8" letterSpacing="2" fill={color}>
        <textPath href={`#${pathId}`} startOffset="0">
          {perimeterText}
        </textPath>
      </text>
      {centerLines.map((line, idx) => (
        <text
          key={line + idx}
          x={size / 2}
          y={size / 2 + (idx - (centerLines.length - 1) / 2) * 14}
          textAnchor="middle"
          dominantBaseline="middle"
          fontFamily="Bodoni Moda, serif"
          fontSize="11"
          fontWeight="700"
          letterSpacing="2"
          fill={color}
        >
          {line}
        </text>
      ))}
    </svg>
  );
}
```

- [ ] **Step 2: Create `PostageFrame.tsx`**

```tsx
import type { ReactNode } from 'react';

interface PostageFrameProps {
  children: ReactNode;
  className?: string;
}

export function PostageFrame({ children, className }: PostageFrameProps) {
  return (
    <div className={['relative p-6 border border-dashed border-stone/60', className].filter(Boolean).join(' ')}>
      {children}
    </div>
  );
}
```

- [ ] **Step 3: Create `GrainOverlay.tsx`**

```tsx
interface GrainOverlayProps {
  opacity?: number;
  className?: string;
}

export function GrainOverlay({ opacity = 0.06, className }: GrainOverlayProps) {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='1'/></svg>`;
  const dataUri = `url("data:image/svg+xml;utf8,${svg}")`;

  return (
    <div
      aria-hidden
      className={['pointer-events-none absolute inset-0 mix-blend-multiply', className].filter(Boolean).join(' ')}
      style={{ backgroundImage: dataUri, opacity }}
    />
  );
}
```

- [ ] **Step 4: Verify build**

```bash
npx tsc --noEmit
```

- [ ] **Step 5: Commit**

```bash
git add src/components/brand
git commit -m "feat: add SealStamp, PostageFrame, GrainOverlay brand components"
```

---

## Task 8: UI Primitives

**Files:**
- Create: `src/components/ui/{Button,Input,Textarea,Select,QtyStepper,Accordion,NumberedTag,ScriptAccent,PriceTag}.tsx`

- [ ] **Step 1: Create `Button.tsx`**

```tsx
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { forwardRef } from 'react';

type Variant = 'primary' | 'secondary' | 'rust' | 'text';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  fullWidth?: boolean;
  children: ReactNode;
}

const VARIANT_CLASS: Record<Variant, string> = {
  primary:
    'bg-ink text-cream hover:bg-stone disabled:bg-stone/50 disabled:cursor-not-allowed',
  secondary:
    'bg-cream text-ink border border-ink hover:bg-ink hover:text-cream',
  rust:
    'bg-rust text-cream hover:bg-rust-dark disabled:bg-rust/50 disabled:cursor-not-allowed',
  text:
    'bg-transparent text-ink border-b border-ink hover:border-rust hover:text-rust px-0 py-1',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', fullWidth, className, children, ...props }, ref) => {
    const base =
      'caption inline-flex items-center justify-center px-8 py-4 transition-colors duration-200 ease-[var(--ease-soft)]';
    const widthClass = fullWidth ? 'w-full' : '';
    const composed = [base, VARIANT_CLASS[variant], widthClass, className]
      .filter(Boolean)
      .join(' ');

    return (
      <button ref={ref} className={composed} {...props}>
        {children}
      </button>
    );
  },
);
Button.displayName = 'Button';
```

- [ ] **Step 2: Create `Input.tsx`**

```tsx
import type { InputHTMLAttributes } from 'react';
import { forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, id, className, ...props }, ref) => {
    const inputId = id ?? props.name;
    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label htmlFor={inputId} className="caption text-stone">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={[
            'bg-transparent border-0 border-b border-dashed border-stone/60 py-3 text-ink placeholder:text-stone/60 focus:border-solid focus:border-ink focus:outline-none transition-colors',
            error ? 'border-error' : '',
            className,
          ]
            .filter(Boolean)
            .join(' ')}
          {...props}
        />
        {error && <span className="caption text-error normal-case tracking-normal">{error}</span>}
      </div>
    );
  },
);
Input.displayName = 'Input';
```

- [ ] **Step 3: Create `Textarea.tsx`**

```tsx
import type { TextareaHTMLAttributes } from 'react';
import { forwardRef } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, id, className, ...props }, ref) => {
    const inputId = id ?? props.name;
    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label htmlFor={inputId} className="caption text-stone">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          rows={5}
          className={[
            'bg-transparent border border-dashed border-stone/60 px-4 py-3 text-ink placeholder:text-stone/60 focus:border-solid focus:border-ink focus:outline-none transition-colors resize-vertical',
            error ? 'border-error' : '',
            className,
          ]
            .filter(Boolean)
            .join(' ')}
          {...props}
        />
        {error && <span className="caption text-error normal-case tracking-normal">{error}</span>}
      </div>
    );
  },
);
Textarea.displayName = 'Textarea';
```

- [ ] **Step 4: Create `Select.tsx`**

```tsx
import type { SelectHTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, id, className, ...props }, ref) => {
    const selectId = id ?? props.name;
    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label htmlFor={selectId} className="caption text-stone">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            className={[
              'w-full appearance-none bg-transparent border-0 border-b border-dashed border-stone/60 py-3 pr-8 text-ink focus:border-solid focus:border-ink focus:outline-none cursor-pointer',
              error ? 'border-error' : '',
              className,
            ]
              .filter(Boolean)
              .join(' ')}
            {...props}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown
            size={16}
            className="absolute right-1 top-1/2 -translate-y-1/2 text-stone pointer-events-none"
          />
        </div>
        {error && <span className="caption text-error normal-case tracking-normal">{error}</span>}
      </div>
    );
  },
);
Select.displayName = 'Select';
```

- [ ] **Step 5: Create `QtyStepper.tsx`**

```tsx
import { Minus, Plus } from 'lucide-react';

interface QtyStepperProps {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
  ariaLabel?: string;
}

export function QtyStepper({
  value,
  onChange,
  min = 1,
  max = 99,
  ariaLabel = 'Quantity',
}: QtyStepperProps) {
  const dec = () => onChange(Math.max(min, value - 1));
  const inc = () => onChange(Math.min(max, value + 1));

  return (
    <div className="inline-flex items-stretch border border-dashed border-stone/60" role="group" aria-label={ariaLabel}>
      <button
        type="button"
        onClick={dec}
        disabled={value <= min}
        className="px-3 hover:bg-ink hover:text-cream disabled:opacity-30 transition-colors"
        aria-label="Decrease quantity"
      >
        <Minus size={14} />
      </button>
      <span className="px-4 py-2 min-w-[3ch] text-center tabular">{value}</span>
      <button
        type="button"
        onClick={inc}
        disabled={value >= max}
        className="px-3 hover:bg-ink hover:text-cream disabled:opacity-30 transition-colors"
        aria-label="Increase quantity"
      >
        <Plus size={14} />
      </button>
    </div>
  );
}
```

- [ ] **Step 6: Create `Accordion.tsx`**

```tsx
import { useState } from 'react';
import type { ReactNode } from 'react';
import { Plus, Minus } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

interface AccordionItem {
  title: string;
  content: ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  initialOpenIndex?: number;
}

export function Accordion({ items, initialOpenIndex = -1 }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState(initialOpenIndex);

  return (
    <ul className="border-t border-dashed border-stone/60">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <li key={item.title} className="border-b border-dashed border-stone/60">
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? -1 : idx)}
              className="w-full flex items-center justify-between gap-6 py-5 text-left hover:text-rust transition-colors"
              aria-expanded={isOpen}
            >
              <span className="caption">{item.title}</span>
              {isOpen ? <Minus size={16} /> : <Plus size={16} />}
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pb-6 pr-12 text-stone leading-relaxed">{item.content}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
```

- [ ] **Step 7: Create `NumberedTag.tsx`**

```tsx
interface NumberedTagProps {
  number: number;
  className?: string;
}

export function NumberedTag({ number, className }: NumberedTagProps) {
  return (
    <span className={['caption tabular text-stone', className].filter(Boolean).join(' ')}>
      Nº {String(number).padStart(3, '0')}
    </span>
  );
}
```

- [ ] **Step 8: Create `ScriptAccent.tsx`**

```tsx
import type { ReactNode } from 'react';

interface ScriptAccentProps {
  children: ReactNode;
  className?: string;
}

export function ScriptAccent({ children, className }: ScriptAccentProps) {
  return (
    <span
      className={[
        'script-accent inline-block align-baseline',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </span>
  );
}
```

- [ ] **Step 9: Create `PriceTag.tsx`**

```tsx
import { formatPriceEUR } from '../../lib/format';

interface PriceTagProps {
  amount: number;
  fromAmount?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const SIZE_CLASS = {
  sm: 'text-base',
  md: 'text-xl',
  lg: 'text-2xl',
} as const;

export function PriceTag({ amount, fromAmount, size = 'md', className }: PriceTagProps) {
  return (
    <span className={['tabular font-display', SIZE_CLASS[size], className].filter(Boolean).join(' ')}>
      {fromAmount !== undefined && fromAmount !== amount && (
        <span className="caption text-stone mr-1 align-middle">From</span>
      )}
      {formatPriceEUR(amount)}
    </span>
  );
}
```

- [ ] **Step 10: Verify**

```bash
npx tsc --noEmit
```

- [ ] **Step 11: Commit**

```bash
git add src/components/ui
git commit -m "feat: add UI primitives — Button, Input, Textarea, Select, QtyStepper, Accordion, NumberedTag, ScriptAccent, PriceTag"
```

---

## Task 9: Motion Primitives

**Files:**
- Create: `src/components/motion/FadeRise.tsx`, `src/components/motion/ScriptReveal.tsx`, `src/lib/motion.ts`

- [ ] **Step 1: Create motion tokens**

`src/lib/motion.ts`:

```ts
import type { Variants, Transition } from 'framer-motion';

export const EASE_SOFT: Transition['ease'] = [0.32, 0.72, 0, 1];
export const EASE_SNAP: Transition['ease'] = [0.65, 0, 0.35, 1];

export const fadeRiseVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
};

export const staggerParent: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};
```

- [ ] **Step 2: Create `FadeRise.tsx`**

```tsx
import { motion, useInView } from 'framer-motion';
import type { ReactNode } from 'react';
import { useRef } from 'react';
import { EASE_SOFT } from '../../lib/motion';

interface FadeRiseProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  amount?: number;
  className?: string;
  as?: 'div' | 'section' | 'article' | 'header' | 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

export function FadeRise({
  children,
  delay = 0,
  duration = 0.7,
  amount = 0.2,
  className,
  as = 'div',
}: FadeRiseProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount });
  const Component = motion[as];
  return (
    <Component
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ duration, ease: EASE_SOFT, delay }}
      className={className}
    >
      {children}
    </Component>
  );
}
```

- [ ] **Step 3: Create `ScriptReveal.tsx`**

```tsx
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import type { ReactNode } from 'react';

interface ScriptRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function ScriptReveal({ children, className, delay = 0 }: ScriptRevealProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  return (
    <motion.span
      ref={ref}
      className={['script-accent inline-block', className].filter(Boolean).join(' ')}
      style={{ overflow: 'hidden' }}
      initial={{ clipPath: 'inset(0 100% 0 0)' }}
      animate={inView ? { clipPath: 'inset(0 0% 0 0)' } : { clipPath: 'inset(0 100% 0 0)' }}
      transition={{ duration: 0.9, ease: [0.32, 0.72, 0, 1], delay }}
    >
      {children}
    </motion.span>
  );
}
```

- [ ] **Step 4: Verify**

```bash
npx tsc --noEmit
```

- [ ] **Step 5: Commit**

```bash
git add src/components/motion src/lib/motion.ts
git commit -m "feat: add FadeRise and ScriptReveal motion primitives"
```

---

## Task 10: Layout — Header, Footer, CookieBanner

**Files:**
- Create: `src/components/layout/Header.tsx`, `src/components/layout/Footer.tsx`, `src/components/layout/CookieBanner.tsx`, `src/components/layout/Logo.tsx`, `src/components/layout/MobileMenu.tsx`, `src/hooks/useCookieConsent.ts`, `src/hooks/useScrollLock.ts`

- [ ] **Step 1: Create `useCookieConsent` hook**

```tsx
import { useEffect, useState } from 'react';
import { STORAGE_KEYS } from '../lib/constants';

export function useCookieConsent() {
  const [accepted, setAccepted] = useState<boolean | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.COOKIE_CONSENT);
    setAccepted(stored === 'true' ? true : stored === 'false' ? false : null);
  }, []);

  const accept = () => {
    localStorage.setItem(STORAGE_KEYS.COOKIE_CONSENT, 'true');
    setAccepted(true);
  };
  const decline = () => {
    localStorage.setItem(STORAGE_KEYS.COOKIE_CONSENT, 'false');
    setAccepted(false);
  };

  return { accepted, accept, decline };
}
```

- [ ] **Step 2: Create `useScrollLock` hook**

```tsx
import { useEffect } from 'react';

export function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, [active]);
}
```

- [ ] **Step 3: Create `Logo.tsx`**

```tsx
import { Link } from 'react-router';
import { ROUTES } from '../../lib/constants';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  inverted?: boolean;
}

const SIZE_CLASS = {
  sm: 'text-lg',
  md: 'text-2xl',
  lg: 'text-4xl',
} as const;

export function Logo({ size = 'md', inverted = false }: LogoProps) {
  return (
    <Link to={ROUTES.HOME} className="inline-flex flex-col items-center group" aria-label="SnugLite — Home">
      <span
        className={[
          'font-display font-bold tracking-tight uppercase leading-none transition-opacity group-hover:opacity-80',
          SIZE_CLASS[size],
          inverted ? 'text-cream' : 'text-ink',
        ].join(' ')}
      >
        SnugLite
      </span>
      <span
        className={[
          'script-accent text-base mt-[-0.3em] transition-opacity group-hover:opacity-80',
          inverted ? 'text-cream/80' : 'text-rust',
        ].join(' ')}
        style={{ fontSize: '1rem' }}
      >
        srl
      </span>
    </Link>
  );
}
```

- [ ] **Step 4: Create `MobileMenu.tsx`**

```tsx
import { Link } from 'react-router';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ROUTES } from '../../lib/constants';
import { useScrollLock } from '../../hooks/useScrollLock';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

const LINKS: { to: string; label: string }[] = [
  { to: ROUTES.SHOP, label: 'Shop' },
  { to: ROUTES.ABOUT, label: 'About' },
  { to: ROUTES.SOURCING, label: 'Sourcing' },
  { to: ROUTES.CONTACT, label: 'Contact' },
];

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  useScrollLock(open);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 bg-cream"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex justify-end p-6">
            <button onClick={onClose} aria-label="Close menu" className="p-2">
              <X size={24} />
            </button>
          </div>
          <nav className="flex flex-col items-center justify-center gap-6 px-6 py-12">
            {LINKS.map((link, idx) => (
              <motion.div
                key={link.to}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + idx * 0.05, duration: 0.4 }}
              >
                <Link
                  to={link.to}
                  onClick={onClose}
                  className="display-md hover:text-rust transition-colors"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

- [ ] **Step 5: Create `Header.tsx`**

```tsx
import { Link, NavLink } from 'react-router';
import { useState, useEffect } from 'react';
import { Menu, ShoppingBag } from 'lucide-react';
import { ROUTES } from '../../lib/constants';
import { useCartStore } from '../../store/cartStore';
import { Logo } from './Logo';
import { MobileMenu } from './MobileMenu';

const NAV_LEFT: { to: string; label: string }[] = [
  { to: ROUTES.SHOP, label: 'Shop' },
  { to: ROUTES.ABOUT, label: 'About' },
  { to: ROUTES.SOURCING, label: 'Sourcing' },
];

const NAV_RIGHT: { to: string; label: string }[] = [
  { to: ROUTES.CONTACT, label: 'Contact' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const cartCount = useCartStore((s) => s.totalCount());

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header
        className={[
          'fixed top-0 inset-x-0 z-40 transition-all duration-300',
          scrolled ? 'bg-cream/85 backdrop-blur-md border-b border-bone' : 'bg-transparent',
        ].join(' ')}
      >
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-6 px-6 lg:px-10 py-4">
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LEFT.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  [
                    'caption transition-colors hover:text-rust',
                    isActive ? 'text-rust' : 'text-ink',
                  ].join(' ')
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          <button
            type="button"
            className="md:hidden justify-self-start p-2"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>

          <Logo size="md" />

          <div className="flex items-center justify-end gap-6">
            {NAV_RIGHT.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  [
                    'hidden md:inline caption transition-colors hover:text-rust',
                    isActive ? 'text-rust' : 'text-ink',
                  ].join(' ')
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Link
              to={ROUTES.CART}
              className="caption inline-flex items-center gap-2 hover:text-rust transition-colors"
              aria-label={`Cart, ${cartCount} item${cartCount === 1 ? '' : 's'}`}
            >
              <ShoppingBag size={18} />
              <span className="tabular">[{cartCount}]</span>
            </Link>
          </div>
        </div>
      </header>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
```

- [ ] **Step 6: Create `Footer.tsx`**

```tsx
import { Link } from 'react-router';
import { ROUTES, BRAND } from '../../lib/constants';

const INFO_LINKS = [
  { to: ROUTES.ABOUT, label: 'About' },
  { to: ROUTES.SOURCING, label: 'Sourcing' },
  { to: ROUTES.CONTACT, label: 'Contact' },
  { to: ROUTES.FAQ, label: 'FAQ' },
];

const SHOP_LINKS = [
  { to: '/shop/furniture', label: 'Furniture' },
  { to: '/shop/shelving', label: 'Shelving' },
  { to: ROUTES.SHOP, label: 'All Products' },
];

const LEGAL_LINKS = [
  { to: ROUTES.PRIVACY, label: 'Privacy Policy' },
  { to: ROUTES.TERMS, label: 'Terms of Use' },
  { to: ROUTES.REFUND, label: 'Refund Policy' },
];

export function Footer() {
  return (
    <footer className="bg-ink text-cream mt-32">
      <div className="px-6 lg:px-10 py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <p className="font-display text-3xl font-bold uppercase">{BRAND.NAME}</p>
            <p className="script-accent text-cream/80 mt-[-0.4em] mb-6" style={{ fontSize: '1.5rem' }}>
              considered workspaces
            </p>
            <p className="text-cream/70 max-w-sm leading-relaxed">
              Office furniture and lighting selected for material honesty and longevity. Curated for design-led
              workspaces across the EU.
            </p>
          </div>

          <div className="md:col-span-2">
            <p className="caption text-cream/50 mb-4">Information</p>
            <ul className="flex flex-col gap-2">
              {INFO_LINKS.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="hover:text-rust transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="caption text-cream/50 mb-4">Shop</p>
            <ul className="flex flex-col gap-2">
              {SHOP_LINKS.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="hover:text-rust transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="caption text-cream/50 mb-4">Legal</p>
            <ul className="flex flex-col gap-2">
              {LEGAL_LINKS.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="hover:text-rust transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-cream/15 mt-16 pt-8 flex flex-col md:flex-row justify-between gap-4 caption text-cream/50">
          <span>© {new Date().getFullYear()} {BRAND.ENTITY}. All rights reserved.</span>
          <span>Designed in the EU. Built with care.</span>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 7: Create `CookieBanner.tsx`**

```tsx
import { Link } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { useCookieConsent } from '../../hooks/useCookieConsent';
import { Button } from '../ui/Button';
import { ROUTES } from '../../lib/constants';

export function CookieBanner() {
  const { accepted, accept, decline } = useCookieConsent();

  return (
    <AnimatePresence>
      {accepted === null && (
        <motion.div
          className="fixed bottom-4 inset-x-4 md:inset-x-auto md:right-6 md:left-auto md:bottom-6 md:max-w-md z-30 bg-ink text-cream p-6 border border-cream/20"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 32 }}
          transition={{ duration: 0.4 }}
          role="dialog"
          aria-label="Cookie consent"
        >
          <p className="caption text-cream/60 mb-2">Cookies</p>
          <p className="text-cream/90 leading-relaxed mb-5">
            We use functional cookies to remember your cart and preferences. No tracking, no analytics, no third
            parties.{' '}
            <Link to={ROUTES.PRIVACY} className="underline hover:text-rust">
              Read more
            </Link>
            .
          </p>
          <div className="flex gap-3">
            <Button variant="rust" onClick={accept} className="flex-1">
              Accept
            </Button>
            <Button variant="secondary" onClick={decline} className="flex-1 bg-transparent text-cream border-cream/40 hover:bg-cream hover:text-ink">
              Decline
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

- [ ] **Step 8: Verify**

```bash
npx tsc --noEmit
```

- [ ] **Step 9: Commit**

```bash
git add src/components/layout src/hooks
git commit -m "feat: add Header, Footer, CookieBanner, MobileMenu, Logo with hooks"
```

---

## Task 11: Routing Skeleton

**Files:**
- Create: `src/routes/index.tsx`, `src/routes/RootLayout.tsx`, `src/routes/ScrollToTop.tsx`, `src/routes/NotFoundPage.tsx`, plus 13 placeholder page files
- Modify: `src/App.tsx`, `src/main.tsx`

- [ ] **Step 1: Create `ScrollToTop.tsx`**

```tsx
import { useEffect } from 'react';
import { useLocation } from 'react-router';

export function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);
  return null;
}
```

- [ ] **Step 2: Create `RootLayout.tsx`**

```tsx
import { Outlet, useLocation } from 'react-router';
import { AnimatePresence, motion } from 'framer-motion';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { CookieBanner } from '../components/layout/CookieBanner';
import { ScrollToTop } from './ScrollToTop';

export function RootLayout() {
  const location = useLocation();
  return (
    <>
      <ScrollToTop />
      <Header />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
          className="pt-20"
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
      <Footer />
      <CookieBanner />
    </>
  );
}
```

- [ ] **Step 3: Create `NotFoundPage.tsx`**

```tsx
import { Link } from 'react-router';
import { ROUTES } from '../lib/constants';

export function NotFoundPage() {
  return (
    <section className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6 py-32">
      <p className="caption text-stone">404</p>
      <h1 className="display-lg mt-6">Page Not Found</h1>
      <p className="text-stone mt-4 max-w-md">
        The page you are looking for has moved or no longer exists.
      </p>
      <Link to={ROUTES.HOME} className="caption mt-8 border-b border-ink hover:text-rust hover:border-rust">
        Return Home
      </Link>
    </section>
  );
}
```

- [ ] **Step 4: Create stub page files (each: `src/routes/<Name>Page.tsx`)**

For each page below, create a stub matching this template (replace `PageTitle`):

```tsx
export function HomePage() {
  return <section className="px-6 py-32"><h1 className="display-lg">Home</h1></section>;
}
```

Create stubs for: `HomePage`, `ShopPage`, `ProductPage`, `AboutPage`, `SourcingPage`, `CartPage`, `CheckoutPage`, `CheckoutSuccessPage`, `ContactPage`, `FaqPage`, `PrivacyPolicyPage`, `TermsOfUsePage`, `RefundPolicyPage`.

- [ ] **Step 5: Create router config `src/routes/index.tsx`**

```tsx
import { createBrowserRouter } from 'react-router';
import { ROUTES } from '../lib/constants';
import { RootLayout } from './RootLayout';
import { HomePage } from './HomePage';
import { ShopPage } from './ShopPage';
import { ProductPage } from './ProductPage';
import { AboutPage } from './AboutPage';
import { SourcingPage } from './SourcingPage';
import { CartPage } from './CartPage';
import { CheckoutPage } from './CheckoutPage';
import { CheckoutSuccessPage } from './CheckoutSuccessPage';
import { ContactPage } from './ContactPage';
import { FaqPage } from './FaqPage';
import { PrivacyPolicyPage } from './PrivacyPolicyPage';
import { TermsOfUsePage } from './TermsOfUsePage';
import { RefundPolicyPage } from './RefundPolicyPage';
import { NotFoundPage } from './NotFoundPage';

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    Component: RootLayout,
    children: [
      { index: true, Component: HomePage },
      { path: 'shop', Component: ShopPage },
      { path: 'shop/:category', Component: ShopPage },
      { path: 'products/:slug', Component: ProductPage },
      { path: 'about', Component: AboutPage },
      { path: 'sourcing', Component: SourcingPage },
      { path: 'cart', Component: CartPage },
      { path: 'checkout', Component: CheckoutPage },
      { path: 'checkout/success', Component: CheckoutSuccessPage },
      { path: 'contact', Component: ContactPage },
      { path: 'faq', Component: FaqPage },
      { path: 'privacy-policy', Component: PrivacyPolicyPage },
      { path: 'terms-of-use', Component: TermsOfUsePage },
      { path: 'refund-policy', Component: RefundPolicyPage },
      { path: '*', Component: NotFoundPage },
    ],
  },
]);
```

- [ ] **Step 6: Replace `src/App.tsx`**

```tsx
import { RouterProvider } from 'react-router/dom';
import { router } from './routes';

export function App() {
  return <RouterProvider router={router} />;
}
```

- [ ] **Step 7: Verify build**

```bash
npx tsc --noEmit && npm run build
```

Expected: success.

- [ ] **Step 8: Commit**

```bash
git add src/routes src/App.tsx
git commit -m "feat: add routing skeleton with all page stubs and root layout"
```

---

## Task 12: Section Components — Reusable

**Files:**
- Create: `src/components/sections/{SectionHeading,Hero,FeaturedCollection,AboutTeaser,CategoriesShowcase,Newsletter,Manifesto}.tsx`

- [ ] **Step 1: Create `SectionHeading.tsx`**

```tsx
import type { ReactNode } from 'react';
import { ScriptReveal } from '../motion/ScriptReveal';

interface SectionHeadingProps {
  caption?: string;
  title: string;
  scriptAccent?: string;
  description?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeading({
  caption,
  title,
  scriptAccent,
  description,
  align = 'left',
  className,
}: SectionHeadingProps) {
  return (
    <header
      className={[
        'flex flex-col gap-4',
        align === 'center' ? 'items-center text-center' : 'items-start',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {caption && <p className="caption text-stone">{caption}</p>}
      <h2 className="display-md">
        {title}
        {scriptAccent && (
          <>
            {' '}
            <ScriptReveal>{scriptAccent}</ScriptReveal>
          </>
        )}
      </h2>
      {description && <p className="text-lg text-stone max-w-xl">{description}</p>}
    </header>
  );
}
```

- [ ] **Step 2: Create `Hero.tsx`**

```tsx
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { ROUTES, BRAND } from '../../lib/constants';
import { GrainOverlay } from '../brand/GrainOverlay';
import { ScriptReveal } from '../motion/ScriptReveal';

export function Hero() {
  return (
    <section className="relative h-[100svh] min-h-[600px] -mt-20 flex items-end overflow-hidden bg-ink text-cream">
      <img
        src="/images/lifestyle/hero-main.jpg"
        alt="Considered workspace at low light"
        className="absolute inset-0 h-full w-full object-cover opacity-70"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/30" />
      <GrainOverlay opacity={0.08} />

      <div className="relative z-10 px-6 lg:px-10 pb-24 max-w-7xl mx-auto w-full">
        <motion.p
          className="caption text-cream/60"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
        >
          {BRAND.NAME} — Atelier for Workspaces
        </motion.p>

        <h1 className="display-xl mt-6 max-w-4xl">
          <motion.span
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.32, 0.72, 0, 1] }}
            className="block"
          >
            CONSIDERED
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.32, 0.72, 0, 1] }}
            className="block"
          >
            <ScriptReveal delay={0.6}>objects</ScriptReveal>{' '}
            <span className="inline-block">FOR WORK</span>
          </motion.span>
        </h1>

        <motion.p
          className="mt-8 max-w-md text-cream/80 leading-relaxed"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.32, 0.72, 0, 1] }}
        >
          A small catalogue of office furniture and lighting, chosen for material honesty and built to outlast the
          season. Sourced across the EU. Delivered with care.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap gap-6 items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <Link
            to={ROUTES.SHOP}
            className="caption inline-flex items-center gap-3 border-b border-cream pb-1 hover:text-rust hover:border-rust transition-colors"
          >
            Shop the Catalogue
            <ArrowRight size={14} />
          </Link>
          <Link
            to={ROUTES.SOURCING}
            className="caption inline-flex items-center gap-3 text-cream/70 hover:text-rust transition-colors"
          >
            Read Our Sourcing Manifesto
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Create `FeaturedCollection.tsx`**

```tsx
import { Link } from 'react-router';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from '../product/ProductCard';
import { SectionHeading } from './SectionHeading';
import { FadeRise } from '../motion/FadeRise';

const FEATURED_SLUGS = [
  'luxury-gaming-office-chair',
  'electric-adjustable-desk',
  'multi-layer-rolling-bookshelf',
];

export function FeaturedCollection() {
  const featured = FEATURED_SLUGS
    .map((slug) => PRODUCTS.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <section className="px-6 lg:px-10 py-32 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
        <div className="lg:col-span-7">
          <SectionHeading
            caption="Featured Collection"
            title="Pieces"
            scriptAccent="we love right now"
          />
        </div>
        <div className="lg:col-span-5 lg:pt-12">
          <p className="text-stone leading-relaxed">
            Three things sit on the desk this season. Each chosen because it earns the room it occupies — quietly, day
            after day.
          </p>
          <Link
            to="/shop"
            className="caption mt-6 inline-block border-b border-ink hover:text-rust hover:border-rust"
          >
            View All Products
          </Link>
        </div>
      </div>

      <FadeRise>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featured.map((product, idx) => (
            <ProductCard key={product.id} product={product} index={idx + 1} />
          ))}
        </div>
      </FadeRise>
    </section>
  );
}
```

- [ ] **Step 4: Create `AboutTeaser.tsx`**

```tsx
import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { SealStamp } from '../brand/SealStamp';
import { ScriptReveal } from '../motion/ScriptReveal';
import { FadeRise } from '../motion/FadeRise';

export function AboutTeaser() {
  return (
    <section className="bg-paper px-6 lg:px-10 py-32">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <FadeRise className="lg:col-span-5 relative">
          <div className="relative">
            <img
              src="/images/lifestyle/about-hero.jpg"
              alt="Wood-paneled workspace with natural light"
              className="w-full aspect-[4/5] object-cover"
            />
            <div className="absolute -top-12 -right-8 hidden md:block">
              <SealStamp size={140} centerLines={['EST', '2026']} perimeterText="SNUGLITE • CONSIDERED WORKSPACES •" />
            </div>
          </div>
        </FadeRise>

        <div className="lg:col-span-6 lg:col-start-7">
          <FadeRise>
            <p className="caption text-stone">About</p>
            <h2 className="display-lg mt-4">
              Where function meets <ScriptReveal>material</ScriptReveal>
            </h2>
            <p className="text-lg text-stone leading-relaxed mt-8 max-w-xl">
              SnugLite is a curated reseller of office furniture and lighting working with a small group of European
              manufacturers. We choose pieces for the way they feel under hand, the grain you only notice in afternoon
              light, the joinery that holds for decades.
            </p>
            <Link
              to="/about"
              className="caption inline-flex items-center gap-3 border-b border-ink mt-8 hover:text-rust hover:border-rust"
            >
              Read Our Story
              <ArrowRight size={14} />
            </Link>
          </FadeRise>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Create `CategoriesShowcase.tsx`**

```tsx
import { Link } from 'react-router';
import { CATEGORIES } from '../../data/categories';
import { PRODUCTS } from '../../data/products';
import { FadeRise } from '../motion/FadeRise';
import { SectionHeading } from './SectionHeading';

export function CategoriesShowcase() {
  return (
    <section className="px-6 lg:px-10 py-32 max-w-7xl mx-auto">
      <SectionHeading caption="Categories" title="Browse" scriptAccent="by collection" className="mb-16" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {CATEGORIES.map((cat, idx) => {
          const count = PRODUCTS.filter((p) => p.category === cat.slug).length;
          return (
            <FadeRise key={cat.slug} delay={idx * 0.1}>
              <Link
                to={`/shop/${cat.slug}`}
                className="group block relative overflow-hidden bg-paper aspect-[4/3]"
              >
                <img
                  src={`/${cat.image}`}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 text-cream">
                  <p className="caption text-cream/70">{count} pieces</p>
                  <h3 className="font-display text-3xl font-bold uppercase mt-2">{cat.name}</h3>
                  <p className="text-cream/80 mt-2 max-w-md">{cat.description}</p>
                </div>
              </Link>
            </FadeRise>
          );
        })}

        <FadeRise delay={0.2} className="md:col-span-2">
          <div className="bg-ink text-cream aspect-[8/3] flex items-center justify-center text-center px-6">
            <div>
              <p className="caption text-cream/60">Coming Autumn 2026</p>
              <h3 className="display-md mt-4">
                Lighting <span className="script-accent text-rust">soon</span>
              </h3>
              <p className="text-cream/70 mt-3 max-w-md mx-auto">
                A curated lighting range is in development with our partner ateliers. Sign up to be notified first.
              </p>
            </div>
          </div>
        </FadeRise>
      </div>
    </section>
  );
}
```

- [ ] **Step 6: Create `Manifesto.tsx`**

```tsx
import { ScriptReveal } from '../motion/ScriptReveal';
import { FadeRise } from '../motion/FadeRise';

interface ManifestoProps {
  caption?: string;
  body: string[];
  scriptAccent?: { text: string; insertAfter: string };
}

export function Manifesto({ caption = 'Manifesto', body, scriptAccent }: ManifestoProps) {
  return (
    <section className="px-6 lg:px-10 py-32 bg-paper">
      <div className="max-w-3xl mx-auto">
        <p className="caption text-stone text-center mb-12">{caption}</p>
        <FadeRise>
          <div className="font-display text-3xl md:text-4xl leading-tight tracking-tight">
            {body.map((para, idx) => (
              <p key={idx} className="mb-8">
                {scriptAccent && para.includes(scriptAccent.insertAfter)
                  ? para.split(scriptAccent.insertAfter).map((piece, i, arr) => (
                      <span key={i}>
                        {piece}
                        {i < arr.length - 1 && (
                          <>
                            {scriptAccent.insertAfter}
                            {' '}
                            <ScriptReveal>{scriptAccent.text}</ScriptReveal>
                            {' '}
                          </>
                        )}
                      </span>
                    ))
                  : para}
              </p>
            ))}
          </div>
        </FadeRise>
      </div>
    </section>
  );
}
```

- [ ] **Step 7: Create `Newsletter.tsx`**

```tsx
import { useState } from 'react';
import type { FormEvent } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { ArrowRight } from 'lucide-react';
import { GrainOverlay } from '../brand/GrainOverlay';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="relative bg-ink text-cream overflow-hidden">
      <img
        src="/images/marketing/1972.jpg"
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover opacity-30"
      />
      <GrainOverlay opacity={0.08} />
      <div className="relative px-6 lg:px-10 py-32 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7">
          <p className="caption text-cream/60">Join the List</p>
          <h2 className="display-lg mt-4">
            New pieces. <span className="script-accent text-rust">Quietly.</span>
          </h2>
          <p className="text-cream/70 mt-6 max-w-lg leading-relaxed">
            Two emails a year, when something we are proud of arrives. No promotions, no noise.
          </p>
        </div>

        <form className="lg:col-span-5 self-end w-full" onSubmit={onSubmit}>
          {submitted ? (
            <p className="text-cream/90 py-4 caption">Subscribed. We will be in touch.</p>
          ) : (
            <div className="flex flex-col gap-4">
              <Input
                name="email"
                type="email"
                required
                label="Email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-cream placeholder:text-cream/40 border-cream/40 focus:border-cream"
              />
              <Button type="submit" variant="rust" className="self-start">
                Subscribe
                <ArrowRight size={14} className="ml-2" />
              </Button>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
```

- [ ] **Step 8: Verify**

```bash
npx tsc --noEmit
```

Expected: error about ProductCard not yet existing — that is the next task.

- [ ] **Step 9: Commit (allow build to fail until next task)**

```bash
git add src/components/sections
git commit -m "feat: add reusable section components (depends on ProductCard)"
```

---

## Task 13: Product Components

**Files:**
- Create: `src/components/product/{ProductCard,ProductGallery,VariantSelector,RelatedProducts}.tsx`

- [ ] **Step 1: Create `ProductCard.tsx`**

```tsx
import { Link } from 'react-router';
import type { Product } from '../../types';
import { NumberedTag } from '../ui/NumberedTag';
import { PriceTag } from '../ui/PriceTag';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index }: ProductCardProps) {
  const cover = product.images[0]?.replace(/^\//, '') ?? '';
  const fromAmount = product.variants?.length
    ? Math.min(...product.variants.map((v) => product.price + v.priceModifier))
    : product.price;

  return (
    <Link
      to={`/products/${product.slug}`}
      className="group flex flex-col gap-4"
      aria-label={`${product.name} — view product`}
    >
      <div className="relative bg-paper aspect-square overflow-hidden">
        <img
          src={`/${cover}`}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-[var(--ease-soft)] group-hover:scale-[1.03]"
          loading="lazy"
        />
        {!product.inStock && (
          <span className="absolute top-3 left-3 caption text-cream bg-ink/80 px-2 py-1">Sold Out</span>
        )}
      </div>
      <div className="flex justify-between items-baseline gap-3">
        <div className="flex flex-col gap-1">
          {index !== undefined && <NumberedTag number={index} />}
          <h3 className="font-display text-xl font-bold leading-tight group-hover:text-rust transition-colors">
            {product.name}
          </h3>
        </div>
        <PriceTag amount={fromAmount} fromAmount={fromAmount} size="sm" />
      </div>
    </Link>
  );
}
```

- [ ] **Step 2: Create `ProductGallery.tsx`**

```tsx
import { useState } from 'react';

interface ProductGalleryProps {
  images: string[];
  alt: string;
}

export function ProductGallery({ images, alt }: ProductGalleryProps) {
  const [active, setActive] = useState(0);
  if (images.length === 0) return null;
  const safe = (s: string) => s.replace(/^\//, '');

  return (
    <div className="grid grid-cols-[80px_1fr] gap-4 lg:gap-6">
      <div className="flex flex-col gap-3 sticky top-24 self-start">
        {images.map((img, idx) => (
          <button
            key={img}
            type="button"
            onClick={() => setActive(idx)}
            className={[
              'aspect-square overflow-hidden border transition-colors',
              idx === active ? 'border-ink' : 'border-bone hover:border-stone',
            ].join(' ')}
            aria-label={`View image ${idx + 1}`}
          >
            <img src={`/${safe(img)}`} alt="" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
      <div className="bg-paper aspect-square overflow-hidden">
        <img src={`/${safe(images[active])}`} alt={alt} className="w-full h-full object-cover" />
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Create `VariantSelector.tsx`**

```tsx
import type { ProductVariant } from '../../types';
import { formatPriceEUR } from '../../lib/format';

interface VariantSelectorProps {
  variants: ProductVariant[];
  selectedId?: string;
  onSelect: (variant: ProductVariant) => void;
}

const TYPE_LABEL: Record<ProductVariant['type'], string> = {
  color: 'Color',
  material: 'Material',
  size: 'Size',
};

export function VariantSelector({ variants, selectedId, onSelect }: VariantSelectorProps) {
  if (variants.length === 0) return null;
  const groups = new Map<ProductVariant['type'], ProductVariant[]>();
  for (const v of variants) {
    const list = groups.get(v.type) ?? [];
    list.push(v);
    groups.set(v.type, list);
  }

  return (
    <div className="flex flex-col gap-6">
      {Array.from(groups.entries()).map(([type, opts]) => (
        <fieldset key={type} className="flex flex-col gap-3">
          <legend className="caption text-stone">{TYPE_LABEL[type]}</legend>
          <div className="flex flex-wrap gap-3">
            {opts.map((v) => {
              const active = v.id === selectedId;
              return (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => onSelect(v)}
                  className={[
                    'px-4 py-2 border transition-colors caption',
                    active
                      ? 'bg-ink text-cream border-ink'
                      : 'bg-cream text-ink border-stone/60 hover:border-ink',
                  ].join(' ')}
                  aria-pressed={active}
                >
                  {v.name}
                  {v.priceModifier !== 0 && (
                    <span className="ml-2 text-stone normal-case tracking-normal">
                      ({v.priceModifier > 0 ? '+' : ''}
                      {formatPriceEUR(v.priceModifier)})
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </fieldset>
      ))}
    </div>
  );
}
```

- [ ] **Step 4: Create `RelatedProducts.tsx`**

```tsx
import { PRODUCTS } from '../../data/products';
import type { Product } from '../../types';
import { ProductCard } from './ProductCard';
import { SectionHeading } from '../sections/SectionHeading';

interface RelatedProductsProps {
  current: Product;
}

export function RelatedProducts({ current }: RelatedProductsProps) {
  const related = PRODUCTS.filter(
    (p) => p.category === current.category && p.id !== current.id,
  ).slice(0, 3);

  if (related.length === 0) return null;

  return (
    <section className="px-6 lg:px-10 py-24 max-w-7xl mx-auto">
      <SectionHeading caption="Continue Browsing" title="More from this" scriptAccent="collection" className="mb-12" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {related.map((p, idx) => (
          <ProductCard key={p.id} product={p} index={idx + 1} />
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Verify**

```bash
npx tsc --noEmit && npm run build
```

Expected: success.

- [ ] **Step 6: Commit**

```bash
git add src/components/product
git commit -m "feat: add ProductCard, ProductGallery, VariantSelector, RelatedProducts"
```

---

## Task 14: Home Page Assembly

**Files:**
- Modify: `src/routes/HomePage.tsx`

- [ ] **Step 1: Replace `HomePage.tsx`**

```tsx
import { Hero } from '../components/sections/Hero';
import { FeaturedCollection } from '../components/sections/FeaturedCollection';
import { AboutTeaser } from '../components/sections/AboutTeaser';
import { CategoriesShowcase } from '../components/sections/CategoriesShowcase';
import { Manifesto } from '../components/sections/Manifesto';
import { Newsletter } from '../components/sections/Newsletter';

const MANIFESTO_BODY = [
  'We started SnugLite because the office is the place we spend most of our waking life — and most of what fills it is forgettable.',
  'Every piece in this catalogue is chosen for material honesty and longevity. We work with a small group of European makers and visit their workshops yearly.',
  'Function meets material. Nothing more, nothing less.',
];

export function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedCollection />
      <AboutTeaser />
      <Manifesto
        body={MANIFESTO_BODY}
        scriptAccent={{ text: 'matters', insertAfter: 'material honesty' }}
      />
      <CategoriesShowcase />
      <Newsletter />
    </>
  );
}
```

- [ ] **Step 2: Verify**

```bash
npx tsc --noEmit && npm run build
```

- [ ] **Step 3: Commit**

```bash
git add src/routes/HomePage.tsx
git commit -m "feat: assemble Home page from section components"
```

---

## Task 15: Shop Page

**Files:**
- Modify: `src/routes/ShopPage.tsx`

- [ ] **Step 1: Replace `ShopPage.tsx`**

```tsx
import { useMemo, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { PRODUCTS } from '../data/products';
import { CATEGORIES } from '../data/categories';
import { ProductCard } from '../components/product/ProductCard';
import { Select } from '../components/ui/Select';
import { FadeRise } from '../components/motion/FadeRise';
import { ScriptReveal } from '../components/motion/ScriptReveal';
import type { Category } from '../types';

type SortKey = 'featured' | 'price-asc' | 'price-desc' | 'name';

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price — Low to High' },
  { value: 'price-desc', label: 'Price — High to Low' },
  { value: 'name', label: 'Name A-Z' },
];

export function ShopPage() {
  const { category } = useParams<{ category?: string }>();
  const navigate = useNavigate();
  const [sortKey, setSortKey] = useState<SortKey>('featured');

  const validCategory = useMemo(() => {
    return CATEGORIES.find((c) => c.slug === category)?.slug;
  }, [category]);

  const filtered = useMemo(() => {
    const base = validCategory ? PRODUCTS.filter((p) => p.category === validCategory) : PRODUCTS;
    const sorted = [...base];
    switch (sortKey) {
      case 'price-asc':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }
    return sorted;
  }, [validCategory, sortKey]);

  const headingTitle = validCategory
    ? CATEGORIES.find((c) => c.slug === validCategory)!.name.toUpperCase()
    : 'THE CATALOGUE';

  return (
    <section className="px-6 lg:px-10 py-24 max-w-7xl mx-auto">
      <header className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-end">
        <div className="lg:col-span-8">
          <p className="caption text-stone">Shop</p>
          <h1 className="display-lg mt-4">
            {headingTitle.split(' ').slice(0, -1).join(' ')}{' '}
            <ScriptReveal>{headingTitle.split(' ').slice(-1)[0]?.toLowerCase()}</ScriptReveal>
          </h1>
          <p className="text-stone mt-4">{filtered.length} pieces</p>
        </div>
        <div className="lg:col-span-4 flex flex-col md:flex-row gap-4 lg:justify-end">
          <Select
            label="Sort"
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value as SortKey)}
            options={SORT_OPTIONS}
            className="min-w-[200px]"
          />
        </div>
      </header>

      <nav className="flex flex-wrap gap-3 mb-16">
        <FilterChip to="/shop" active={!validCategory}>All</FilterChip>
        {CATEGORIES.map((c) => (
          <FilterChip key={c.slug} to={`/shop/${c.slug}`} active={validCategory === c.slug}>
            {c.name}
          </FilterChip>
        ))}
      </nav>

      <FadeRise>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {filtered.map((p, idx) => (
            <ProductCard key={p.id} product={p} index={idx + 1} />
          ))}
        </div>
      </FadeRise>

      {filtered.length === 0 && (
        <p className="text-stone text-center py-32">No pieces in this category yet.</p>
      )}
    </section>
  );
}

interface FilterChipProps {
  to: string;
  active: boolean;
  children: React.ReactNode;
}

function FilterChip({ to, active, children }: FilterChipProps) {
  return (
    <Link
      to={to}
      className={[
        'caption px-4 py-2 border transition-colors',
        active ? 'bg-ink text-cream border-ink' : 'bg-cream text-ink border-stone/60 hover:border-ink',
      ].join(' ')}
    >
      {children}
    </Link>
  );
}
```

- [ ] **Step 2: Verify**

```bash
npx tsc --noEmit && npm run build
```

- [ ] **Step 3: Commit**

```bash
git add src/routes/ShopPage.tsx
git commit -m "feat: implement Shop page with category filter and sort"
```

---

## Task 16: Product Page

**Files:**
- Modify: `src/routes/ProductPage.tsx`

- [ ] **Step 1: Replace `ProductPage.tsx`**

```tsx
import { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router';
import { ChevronRight } from 'lucide-react';
import { getProductBySlug, PRODUCTS } from '../data/products';
import { CATEGORIES } from '../data/categories';
import { ProductGallery } from '../components/product/ProductGallery';
import { VariantSelector } from '../components/product/VariantSelector';
import { RelatedProducts } from '../components/product/RelatedProducts';
import { Accordion } from '../components/ui/Accordion';
import { Button } from '../components/ui/Button';
import { QtyStepper } from '../components/ui/QtyStepper';
import { PriceTag } from '../components/ui/PriceTag';
import { NumberedTag } from '../components/ui/NumberedTag';
import { useCartStore } from '../store/cartStore';
import type { ProductVariant } from '../types';

export function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const product = slug ? getProductBySlug(slug) : undefined;
  const [variant, setVariant] = useState<ProductVariant | undefined>(product?.variants?.[0]);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  if (!product) return <Navigate to="/shop" replace />;

  const category = CATEGORIES.find((c) => c.slug === product.category);
  const productIndex = PRODUCTS.findIndex((p) => p.id === product.id) + 1;
  const effectivePrice = product.price + (variant?.priceModifier ?? 0);

  const onAdd = () => {
    addItem(product, variant, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const accordionItems = [
    {
      title: 'Dimensions',
      content: product.dimensions ? (
        <dl className="grid grid-cols-3 gap-4 caption">
          <div>
            <dt className="text-stone">Width</dt>
            <dd className="text-ink mt-1 tabular">{product.dimensions.width} cm</dd>
          </div>
          <div>
            <dt className="text-stone">Height</dt>
            <dd className="text-ink mt-1 tabular">{product.dimensions.height} cm</dd>
          </div>
          <div>
            <dt className="text-stone">Depth</dt>
            <dd className="text-ink mt-1 tabular">{product.dimensions.depth} cm</dd>
          </div>
        </dl>
      ) : (
        <p>Dimensions available on request.</p>
      ),
    },
    {
      title: 'What is included',
      content: (
        <ul className="space-y-2 list-disc pl-5 marker:text-stone">
          {product.features.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
      ),
    },
    {
      title: 'Shipping & Lead Time',
      content: (
        <p>
          Standard EU delivery in five to ten business days. Larger items ship via insured freight with assembly where
          possible. Contact us for tailored timelines on volume orders.
        </p>
      ),
    },
    {
      title: 'Materials & Care',
      content: (
        <p>
          Wipe with a soft, dry cloth. Avoid abrasive cleaners and direct sunlight where the material is finished. Tags:
          {product.tags.length > 0 && ` ${product.tags.join(' • ')}`}.
        </p>
      ),
    },
  ];

  return (
    <article className="px-6 lg:px-10 py-12 max-w-7xl mx-auto">
      <nav className="caption text-stone flex items-center gap-2 mb-12 flex-wrap">
        <Link to="/shop" className="hover:text-ink">Shop</Link>
        {category && (
          <>
            <ChevronRight size={12} />
            <Link to={`/shop/${category.slug}`} className="hover:text-ink">
              {category.name}
            </Link>
          </>
        )}
        <ChevronRight size={12} />
        <span className="text-ink">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7">
          <ProductGallery images={product.images} alt={product.name} />
        </div>

        <div className="lg:col-span-5 lg:sticky lg:top-24 self-start flex flex-col gap-8">
          <div>
            <NumberedTag number={productIndex} />
            <h1 className="font-display text-4xl lg:text-5xl font-bold leading-tight mt-3">{product.name}</h1>
            {category && <p className="caption text-stone mt-3">{category.name}</p>}
          </div>

          <p className="text-lg text-stone leading-relaxed">{product.description}</p>

          <PriceTag amount={effectivePrice} size="lg" className="text-3xl" />

          {product.variants && product.variants.length > 0 && (
            <VariantSelector
              variants={product.variants}
              selectedId={variant?.id}
              onSelect={setVariant}
            />
          )}

          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
            <QtyStepper value={qty} onChange={setQty} />
            <Button variant="rust" onClick={onAdd} disabled={!product.inStock} fullWidth>
              {added ? 'Added' : product.inStock ? 'Add to Cart' : 'Sold Out'}
            </Button>
          </div>

          <Accordion items={accordionItems} />
        </div>
      </div>

      <RelatedProducts current={product} />
    </article>
  );
}
```

- [ ] **Step 2: Verify**

```bash
npx tsc --noEmit && npm run build
```

- [ ] **Step 3: Commit**

```bash
git add src/routes/ProductPage.tsx
git commit -m "feat: implement Product page with gallery, variants, accordion, add to cart"
```

---

## Task 17: Cart Page

**Files:**
- Create: `src/components/cart/CartLineItem.tsx`, `src/components/cart/OrderSummary.tsx`
- Modify: `src/routes/CartPage.tsx`

- [ ] **Step 1: Create `CartLineItem.tsx`**

```tsx
import { Link } from 'react-router';
import { X } from 'lucide-react';
import type { CartLine } from '../../store/cartStore';
import { useCartStore } from '../../store/cartStore';
import { QtyStepper } from '../ui/QtyStepper';
import { PriceTag } from '../ui/PriceTag';
import { formatPriceEUR } from '../../lib/format';

interface CartLineItemProps {
  line: CartLine;
}

export function CartLineItem({ line }: CartLineItemProps) {
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const cover = line.product.images[0]?.replace(/^\//, '') ?? '';
  const price = line.product.price + (line.variant?.priceModifier ?? 0);

  return (
    <article className="grid grid-cols-[100px_1fr_auto] sm:grid-cols-[140px_1fr_auto] gap-6 py-6 border-b border-bone">
      <Link to={`/products/${line.product.slug}`} className="block bg-paper aspect-square overflow-hidden">
        <img src={`/${cover}`} alt={line.product.name} className="w-full h-full object-cover" />
      </Link>
      <div className="flex flex-col justify-between gap-3">
        <div>
          <Link to={`/products/${line.product.slug}`} className="font-display text-xl font-bold hover:text-rust transition-colors">
            {line.product.name}
          </Link>
          {line.variant && (
            <p className="caption text-stone mt-1 normal-case tracking-normal">{line.variant.name}</p>
          )}
          <p className="caption text-stone mt-1 tabular">{formatPriceEUR(price)} each</p>
        </div>
        <div className="flex items-center gap-4">
          <QtyStepper value={line.quantity} onChange={(n) => updateQuantity(line.lineId, n)} />
          <button
            type="button"
            onClick={() => removeItem(line.lineId)}
            className="caption text-stone hover:text-error inline-flex items-center gap-1"
            aria-label={`Remove ${line.product.name}`}
          >
            <X size={14} />
            Remove
          </button>
        </div>
      </div>
      <div className="flex items-start">
        <PriceTag amount={price * line.quantity} size="md" />
      </div>
    </article>
  );
}
```

- [ ] **Step 2: Create `OrderSummary.tsx`**

```tsx
import { useCartStore } from '../../store/cartStore';
import { formatPriceEUR } from '../../lib/format';

interface OrderSummaryProps {
  showShippingNote?: boolean;
}

export function OrderSummary({ showShippingNote = true }: OrderSummaryProps) {
  const subtotal = useCartStore((s) => s.subtotal());
  const count = useCartStore((s) => s.totalCount());

  return (
    <div className="border border-dashed border-stone/60 p-8 flex flex-col gap-4">
      <p className="caption text-stone">Order Summary</p>
      <dl className="flex justify-between items-baseline">
        <dt>Subtotal ({count} {count === 1 ? 'item' : 'items'})</dt>
        <dd className="tabular font-display font-bold text-xl">{formatPriceEUR(subtotal)}</dd>
      </dl>
      {showShippingNote && (
        <p className="caption text-stone normal-case tracking-normal">
          Shipping calculated at checkout. EU delivery only.
        </p>
      )}
    </div>
  );
}
```

- [ ] **Step 3: Replace `CartPage.tsx`**

```tsx
import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { CartLineItem } from '../components/cart/CartLineItem';
import { OrderSummary } from '../components/cart/OrderSummary';
import { Button } from '../components/ui/Button';
import { ROUTES } from '../lib/constants';

export function CartPage() {
  const items = useCartStore((s) => s.items);

  if (items.length === 0) {
    return (
      <section className="px-6 py-32 max-w-7xl mx-auto text-center">
        <p className="caption text-stone">Cart</p>
        <h1 className="display-lg mt-4">Your cart is empty</h1>
        <p className="text-stone mt-6 max-w-md mx-auto">
          Browse the catalogue to find pieces worth keeping.
        </p>
        <Link
          to={ROUTES.SHOP}
          className="caption inline-flex items-center gap-2 border-b border-ink mt-8 hover:text-rust hover:border-rust"
        >
          Shop the Catalogue <ArrowRight size={14} />
        </Link>
      </section>
    );
  }

  return (
    <section className="px-6 lg:px-10 py-16 max-w-7xl mx-auto">
      <header className="text-center mb-16">
        <p className="caption text-stone">Your Selection</p>
        <h1 className="display-lg mt-4">Cart</h1>
        <p className="text-stone mt-3">{items.length} {items.length === 1 ? 'piece' : 'pieces'}</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 border-t border-bone">
          {items.map((line) => (
            <CartLineItem key={line.lineId} line={line} />
          ))}
        </div>
        <aside className="lg:col-span-4 lg:sticky lg:top-24 self-start flex flex-col gap-6">
          <OrderSummary />
          <Link to={ROUTES.CHECKOUT} className="contents">
            <Button variant="rust" fullWidth>
              Proceed to Checkout
              <ArrowRight size={14} className="ml-2" />
            </Button>
          </Link>
          <Link to={ROUTES.SHOP} className="caption text-center text-stone hover:text-rust">
            Continue shopping
          </Link>
        </aside>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Verify**

```bash
npx tsc --noEmit && npm run build
```

- [ ] **Step 5: Commit**

```bash
git add src/components/cart src/routes/CartPage.tsx
git commit -m "feat: implement Cart page with line items and order summary"
```

---

## Task 18: Checkout Page (form)

**Files:**
- Modify: `src/routes/CheckoutPage.tsx`

- [ ] **Step 1: Replace `CheckoutPage.tsx`**

```tsx
import { useNavigate, Link } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCartStore } from '../store/cartStore';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import { Button } from '../components/ui/Button';
import { OrderSummary } from '../components/cart/OrderSummary';
import { ROUTES } from '../lib/constants';
import { generateOrderNumber } from '../lib/format';

const schema = z.object({
  firstName: z.string().min(1, 'Required'),
  lastName: z.string().min(1, 'Required'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(6, 'Invalid phone'),
  addressLine1: z.string().min(1, 'Required'),
  addressLine2: z.string().optional(),
  city: z.string().min(1, 'Required'),
  postalCode: z.string().min(3, 'Required'),
  country: z.string().min(2, 'Required'),
  notes: z.string().optional(),
});

type CheckoutForm = z.infer<typeof schema>;

export function CheckoutPage() {
  const navigate = useNavigate();
  const items = useCartStore((s) => s.items);
  const clear = useCartStore((s) => s.clear);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutForm>({ resolver: zodResolver(schema) });

  if (items.length === 0) {
    return (
      <section className="px-6 py-32 max-w-2xl mx-auto text-center">
        <h1 className="display-lg">Nothing to checkout</h1>
        <Link to={ROUTES.SHOP} className="caption inline-block mt-8 border-b border-ink hover:text-rust">
          Browse Products
        </Link>
      </section>
    );
  }

  const onSubmit = async () => {
    const orderNumber = generateOrderNumber();
    sessionStorage.setItem('snuglite-last-order', orderNumber);
    clear();
    navigate(ROUTES.CHECKOUT_SUCCESS);
  };

  return (
    <section className="px-6 lg:px-10 py-16 max-w-7xl mx-auto">
      <header className="text-center mb-16">
        <p className="caption text-stone">Checkout</p>
        <h1 className="display-lg mt-4">Place Your Order</h1>
        <p className="text-stone mt-3 max-w-md mx-auto">
          We will confirm your order by email and follow up with shipping details within one business day.
        </p>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7 flex flex-col gap-12">
          <fieldset className="flex flex-col gap-6">
            <legend className="caption text-stone mb-2">Contact</legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Input label="First name" {...register('firstName')} error={errors.firstName?.message} />
              <Input label="Last name" {...register('lastName')} error={errors.lastName?.message} />
            </div>
            <Input label="Email" type="email" {...register('email')} error={errors.email?.message} />
            <Input label="Phone" type="tel" {...register('phone')} error={errors.phone?.message} />
          </fieldset>

          <fieldset className="flex flex-col gap-6">
            <legend className="caption text-stone mb-2">Shipping Address</legend>
            <Input label="Address line 1" {...register('addressLine1')} error={errors.addressLine1?.message} />
            <Input label="Address line 2 (optional)" {...register('addressLine2')} />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <Input label="City" {...register('city')} error={errors.city?.message} />
              <Input label="Postal code" {...register('postalCode')} error={errors.postalCode?.message} />
              <Input label="Country" {...register('country')} error={errors.country?.message} />
            </div>
          </fieldset>

          <fieldset>
            <legend className="caption text-stone mb-4">Notes (optional)</legend>
            <Textarea
              {...register('notes')}
              placeholder="Delivery instructions, gift message, building access codes..."
            />
          </fieldset>
        </div>

        <aside className="lg:col-span-5 flex flex-col gap-6 lg:sticky lg:top-24 self-start">
          <OrderSummary showShippingNote={false} />
          <Button type="submit" variant="rust" fullWidth disabled={isSubmitting}>
            {isSubmitting ? 'Placing Order...' : 'Place Order'}
          </Button>
          <p className="caption text-stone normal-case tracking-normal">
            By placing this order you agree to our <Link to={ROUTES.TERMS} className="underline">terms of use</Link> and{' '}
            <Link to={ROUTES.PRIVACY} className="underline">privacy policy</Link>.
          </p>
        </aside>
      </form>
    </section>
  );
}
```

- [ ] **Step 2: Verify**

```bash
npx tsc --noEmit && npm run build
```

- [ ] **Step 3: Commit**

```bash
git add src/routes/CheckoutPage.tsx
git commit -m "feat: implement Checkout page with React Hook Form + Zod validation"
```

---

## Task 19: Checkout Success Page

**Files:**
- Modify: `src/routes/CheckoutSuccessPage.tsx`

- [ ] **Step 1: Replace `CheckoutSuccessPage.tsx`**

```tsx
import { Link } from 'react-router';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { SealStamp } from '../components/brand/SealStamp';
import { ROUTES } from '../lib/constants';

export function CheckoutSuccessPage() {
  const [orderNumber, setOrderNumber] = useState('0001');

  useEffect(() => {
    const stored = sessionStorage.getItem('snuglite-last-order');
    if (stored) setOrderNumber(stored);
  }, []);

  return (
    <section className="min-h-[80vh] flex items-center justify-center px-6 py-32">
      <div className="text-center max-w-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.85, rotate: -8 }}
          animate={{ opacity: 1, scale: 1, rotate: -6 }}
          transition={{ duration: 0.9, ease: [0.32, 0.72, 0, 1] }}
          className="inline-block mb-12 text-rust"
        >
          <SealStamp
            size={220}
            centerLines={[`Nº ${orderNumber}`, 'ORDER', 'RECEIVED']}
            perimeterText="SNUGLITE • THANK YOU FOR YOUR ORDER •"
            color="currentColor"
          />
        </motion.div>

        <p className="caption text-stone">Order Nº {orderNumber}</p>
        <h1 className="display-lg mt-4">
          Thank you. <span className="script-accent text-rust">Truly.</span>
        </h1>
        <p className="text-stone mt-6 leading-relaxed">
          We will confirm your order by email and follow up with shipping details within one business day. If anything
          urgent, reach us anytime — every email is read by a human.
        </p>

        <div className="flex flex-wrap gap-4 justify-center mt-10">
          <Link
            to={ROUTES.SHOP}
            className="caption inline-flex items-center gap-2 border-b border-ink hover:text-rust hover:border-rust"
          >
            Continue Browsing
          </Link>
          <Link
            to={ROUTES.CONTACT}
            className="caption inline-flex items-center gap-2 text-stone hover:text-rust"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify**

```bash
npx tsc --noEmit && npm run build
```

- [ ] **Step 3: Commit**

```bash
git add src/routes/CheckoutSuccessPage.tsx
git commit -m "feat: implement Checkout Success page with animated stamp seal"
```

---

## Task 20: About, Sourcing, Contact, FAQ Pages

**Files:**
- Modify: `src/routes/AboutPage.tsx`, `src/routes/SourcingPage.tsx`, `src/routes/ContactPage.tsx`, `src/routes/FaqPage.tsx`

- [ ] **Step 1: Replace `AboutPage.tsx`**

```tsx
import { ScriptReveal } from '../components/motion/ScriptReveal';
import { FadeRise } from '../components/motion/FadeRise';
import { SealStamp } from '../components/brand/SealStamp';
import { Manifesto } from '../components/sections/Manifesto';

const ABOUT_BODY = [
  'SnugLite was founded on the conviction that the office should be the place we choose, not endure.',
  'We curate furniture and lighting from a small group of European makers — workshops we visit, materials we hold, joinery we trust to last decades. Each piece earns its space.',
  'Function meets material. The rest is noise.',
];

export function AboutPage() {
  return (
    <>
      <section className="px-6 lg:px-10 py-24 max-w-7xl mx-auto">
        <header className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          <div className="lg:col-span-7">
            <p className="caption text-stone">About SnugLite</p>
            <h1 className="display-xl mt-6">
              Atelier <ScriptReveal>for</ScriptReveal> Workspaces
            </h1>
          </div>
          <div className="lg:col-span-4 lg:col-start-9 lg:pt-8">
            <p className="text-lg text-stone leading-relaxed">
              A curated reseller of office furniture and lighting working with European makers since 2026.
            </p>
          </div>
        </header>

        <FadeRise>
          <div className="grid grid-cols-12 gap-6">
            <img src="/images/lifestyle/about-hero.jpg" alt="Workshop interior" className="col-span-12 md:col-span-8 aspect-[4/3] object-cover" />
            <div className="col-span-12 md:col-span-4 flex flex-col gap-6">
              <img src="/images/lifestyle/about-inset.jpg" alt="Considered cabinet" className="w-full aspect-square object-cover" />
              <div className="text-rust self-end">
                <SealStamp size={140} centerLines={['SRL', '2026']} perimeterText="SNUGLITE • CONSIDERED WORKSPACES •" />
              </div>
            </div>
          </div>
        </FadeRise>
      </section>

      <Manifesto body={ABOUT_BODY} scriptAccent={{ text: 'matters', insertAfter: 'Function meets material' }} />
    </>
  );
}
```

- [ ] **Step 2: Replace `SourcingPage.tsx`**

```tsx
import { ScriptReveal } from '../components/motion/ScriptReveal';
import { FadeRise } from '../components/motion/FadeRise';

const PRINCIPLES: { title: string; body: string }[] = [
  {
    title: 'Material honesty',
    body:
      'Solid wood, brushed steel, woven textile. We choose materials that age with use rather than hide behind veneer.',
  },
  {
    title: 'Small-batch makers',
    body:
      'Our partners run workshops measured in dozens, not thousands. Every order ships through people we know by name.',
  },
  {
    title: 'European origin',
    body:
      'Producing in the EU keeps lead times honest, supports local craft, and lets us visit the workshops yearly.',
  },
  {
    title: 'Built to last decades',
    body:
      'Joinery, hardware, and finishes specified to outlast trends. Spare parts available for years after purchase.',
  },
];

export function SourcingPage() {
  return (
    <>
      <section className="px-6 lg:px-10 py-24 max-w-7xl mx-auto">
        <header className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          <div className="lg:col-span-8">
            <p className="caption text-stone">Sourcing</p>
            <h1 className="display-xl mt-6">
              Where it <ScriptReveal>comes from</ScriptReveal>
            </h1>
          </div>
        </header>

        <FadeRise>
          <img
            src="/images/lifestyle/sourcing-hero.jpg"
            alt="Weathered wooden surface with grain"
            className="w-full aspect-[16/9] object-cover mb-20"
          />
        </FadeRise>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl">
          {PRINCIPLES.map((p, idx) => (
            <FadeRise key={p.title} delay={idx * 0.1}>
              <div className="flex flex-col gap-4">
                <p className="caption text-stone">Nº {String(idx + 1).padStart(2, '0')}</p>
                <h2 className="font-display text-3xl font-bold leading-tight">{p.title}</h2>
                <p className="text-stone leading-relaxed">{p.body}</p>
              </div>
            </FadeRise>
          ))}
        </div>

        <FadeRise>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-24">
            <img src="/images/lifestyle/sourcing-detail.jpg" alt="Wooden drawers detail" className="w-full aspect-[4/5] object-cover" />
            <div className="flex flex-col justify-center">
              <p className="caption text-stone">Coming Autumn 2026</p>
              <h3 className="display-md mt-4">
                Lighting <ScriptReveal>collection</ScriptReveal>
              </h3>
              <p className="text-stone mt-6 leading-relaxed">
                Our first lighting drop launches alongside our autumn furniture additions, sourced from two ateliers in
                northern Italy and one in Denmark.
              </p>
            </div>
          </div>
        </FadeRise>
      </section>
    </>
  );
}
```

- [ ] **Step 3: Replace `ContactPage.tsx`**

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import { Button } from '../components/ui/Button';
import { Select } from '../components/ui/Select';
import { SealStamp } from '../components/brand/SealStamp';
import { PostageFrame } from '../components/brand/PostageFrame';
import { ScriptReveal } from '../components/motion/ScriptReveal';
import { CONTACT } from '../lib/constants';

const schema = z.object({
  name: z.string().min(1, 'Required'),
  email: z.string().email('Invalid email'),
  phone: z.string().optional(),
  topic: z.enum(['general', 'order', 'wholesale', 'press']),
  message: z.string().min(10, 'Tell us a little more (10+ characters).'),
});

type ContactForm = z.infer<typeof schema>;

const TOPIC_OPTIONS = [
  { value: 'general', label: 'General inquiry' },
  { value: 'order', label: 'Question about an order' },
  { value: 'wholesale', label: 'Wholesale / trade' },
  { value: 'press', label: 'Press' },
];

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactForm>({ resolver: zodResolver(schema), defaultValues: { topic: 'general' } });

  const onSubmit = async () => {
    setSubmitted(true);
  };

  return (
    <section className="px-6 lg:px-10 py-24 max-w-7xl mx-auto">
      <header className="text-center mb-16">
        <p className="caption text-stone">Get in Touch</p>
        <h1 className="display-xl mt-6">
          Contact <ScriptReveal>us</ScriptReveal>
        </h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7">
          {submitted ? (
            <PostageFrame className="text-center py-20">
              <p className="caption text-stone">Sent</p>
              <h2 className="display-md mt-4">Thank you.</h2>
              <p className="text-stone mt-4 max-w-md mx-auto">
                We read every message. Expect a reply within one business day.
              </p>
            </PostageFrame>
          ) : (
            <PostageFrame>
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Input label="Name" {...register('name')} error={errors.name?.message} />
                  <Input label="Email" type="email" {...register('email')} error={errors.email?.message} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Input label="Phone (optional)" type="tel" {...register('phone')} />
                  <Select label="Topic" {...register('topic')} options={TOPIC_OPTIONS} />
                </div>
                <Textarea
                  label="Message"
                  {...register('message')}
                  error={errors.message?.message}
                  placeholder="Tell us how we can help..."
                />
                <Button type="submit" variant="rust" disabled={isSubmitting} className="self-start">
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </PostageFrame>
          )}
        </div>

        <aside className="lg:col-span-5 flex flex-col gap-12">
          <div>
            <p className="caption text-stone mb-4">Email</p>
            <a href={`mailto:${CONTACT.EMAIL}`} className="font-display text-xl hover:text-rust transition-colors">
              {CONTACT.EMAIL}
            </a>
          </div>
          <div>
            <p className="caption text-stone mb-4">Phone</p>
            <a href={`tel:${CONTACT.PHONE.replace(/\s/g, '')}`} className="font-display text-xl hover:text-rust transition-colors tabular">
              {CONTACT.PHONE}
            </a>
          </div>
          <div>
            <p className="caption text-stone mb-4">Address</p>
            <p className="text-ink leading-relaxed">
              {CONTACT.ADDRESS_LINE_1}
              <br />
              {CONTACT.ADDRESS_LINE_2}
              <br />
              {CONTACT.COUNTRY}
            </p>
          </div>
          <div className="text-rust self-start">
            <SealStamp size={160} centerLines={['SRL', 'EU', '2026']} />
          </div>
        </aside>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Replace `FaqPage.tsx`**

```tsx
import { Accordion } from '../components/ui/Accordion';
import { FAQ_ITEMS } from '../data/faq';
import { ScriptReveal } from '../components/motion/ScriptReveal';
import { FadeRise } from '../components/motion/FadeRise';

export function FaqPage() {
  const items = FAQ_ITEMS.map((q) => ({
    title: q.question,
    content: <p>{q.answer}</p>,
  }));

  return (
    <section className="px-6 lg:px-10 py-24 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <FadeRise className="lg:col-span-5 lg:sticky lg:top-24 self-start">
          <p className="caption text-stone">Information</p>
          <h1 className="display-lg mt-6">
            Frequently <ScriptReveal>asked</ScriptReveal>
          </h1>
          <p className="text-stone mt-8 leading-relaxed max-w-md">
            Everything we get asked, in one place. If you do not find what you need, the contact form is one click away.
          </p>
          <img
            src="/images/lifestyle/contact-bg.jpg"
            alt=""
            aria-hidden
            className="mt-12 aspect-[4/5] object-cover"
          />
        </FadeRise>

        <div className="lg:col-span-7">
          <Accordion items={items} />
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Verify**

```bash
npx tsc --noEmit && npm run build
```

- [ ] **Step 6: Commit**

```bash
git add src/routes/AboutPage.tsx src/routes/SourcingPage.tsx src/routes/ContactPage.tsx src/routes/FaqPage.tsx
git commit -m "feat: implement About, Sourcing, Contact, FAQ pages"
```

---

## Task 21: Legal Pages — Privacy, Terms, Refund

**Files:**
- Modify: `src/routes/PrivacyPolicyPage.tsx`, `src/routes/TermsOfUsePage.tsx`, `src/routes/RefundPolicyPage.tsx`
- Create: `src/components/sections/LegalLayout.tsx`

- [ ] **Step 1: Create `LegalLayout.tsx`**

```tsx
import type { ReactNode } from 'react';

interface LegalLayoutProps {
  caption?: string;
  title: string;
  effectiveDate: string;
  children: ReactNode;
}

export function LegalLayout({ caption = 'Legal', title, effectiveDate, children }: LegalLayoutProps) {
  return (
    <article className="px-6 lg:px-10 py-24 max-w-3xl mx-auto">
      <header className="mb-12">
        <p className="caption text-stone">{caption}</p>
        <h1 className="display-md mt-4">{title}</h1>
        <p className="caption text-stone mt-4">Effective: {effectiveDate}</p>
      </header>
      <div className="prose-legal flex flex-col gap-8 text-ink leading-relaxed">{children}</div>
    </article>
  );
}
```

- [ ] **Step 2: Replace `PrivacyPolicyPage.tsx`**

```tsx
import { LegalLayout } from '../components/sections/LegalLayout';
import { CONTACT, BRAND } from '../lib/constants';

export function PrivacyPolicyPage() {
  return (
    <LegalLayout title="Privacy Policy" effectiveDate="2026-04-30">
      <section>
        <h2 className="font-display text-xl font-bold mb-3">1. Who we are</h2>
        <p>
          {BRAND.ENTITY} ({BRAND.NAME}) operates this website. Registered office:
          {' '}
          {CONTACT.ADDRESS_LINE_1}, {CONTACT.ADDRESS_LINE_2}, {CONTACT.COUNTRY}. Contact: {CONTACT.EMAIL}.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl font-bold mb-3">2. What data we collect</h2>
        <p>
          We collect data you provide directly: name, email, phone, shipping address, and order details. We do not use
          third-party analytics, advertising trackers, or marketing pixels on this site.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl font-bold mb-3">3. How we use it</h2>
        <p>
          Your data is used solely to fulfil orders, respond to inquiries, and send delivery updates. We do not sell or
          share data with third parties beyond the carriers required to ship your order.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl font-bold mb-3">4. Cookies</h2>
        <p>
          We use only functional cookies to remember your cart and consent preferences. No advertising or analytics
          cookies are set.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl font-bold mb-3">5. Your rights (GDPR)</h2>
        <p>
          Under EU General Data Protection Regulation, you have the right to access, correct, delete, or export your
          personal data, and to object to processing. To exercise these rights, write to {CONTACT.EMAIL}. We respond
          within thirty days.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl font-bold mb-3">6. Data retention</h2>
        <p>
          Order records are kept for ten years for tax compliance. Inquiry messages are retained for up to two years.
          Cart data is kept locally in your browser and is not stored on our servers.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl font-bold mb-3">7. Changes</h2>
        <p>
          We update this policy when our practices change. The effective date above marks the latest revision.
        </p>
      </section>
    </LegalLayout>
  );
}
```

- [ ] **Step 3: Replace `TermsOfUsePage.tsx`**

```tsx
import { LegalLayout } from '../components/sections/LegalLayout';
import { CONTACT, BRAND } from '../lib/constants';

export function TermsOfUsePage() {
  return (
    <LegalLayout title="Terms of Use" effectiveDate="2026-04-30">
      <section>
        <h2 className="font-display text-xl font-bold mb-3">1. Acceptance</h2>
        <p>
          By accessing this website you agree to these terms. If you do not agree, please do not use the site.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl font-bold mb-3">2. Orders and contracts</h2>
        <p>
          Orders are an offer to purchase. The contract is formed when we send order confirmation by email. Prices are
          shown in EUR and include VAT where applicable.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl font-bold mb-3">3. Delivery</h2>
        <p>
          We ship across the EU. Standard delivery takes five to ten business days. Risk passes to you at delivery.
          Larger items are coordinated directly with the carrier and may require a delivery appointment.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl font-bold mb-3">4. Intellectual property</h2>
        <p>
          All content on this site — photographs, copy, graphics, layout — is the property of {BRAND.ENTITY} or its
          partners and is protected under EU copyright law. Reproduction without written permission is prohibited.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl font-bold mb-3">5. Limitation of liability</h2>
        <p>
          {BRAND.NAME} is not liable for indirect or consequential damages arising from use of this site or its
          products beyond the limits set by EU consumer law.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl font-bold mb-3">6. Governing law</h2>
        <p>
          These terms are governed by the laws of {CONTACT.COUNTRY}. Disputes will be resolved before the courts of
          {' '}
          {CONTACT.ADDRESS_LINE_2}.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl font-bold mb-3">7. Contact</h2>
        <p>For questions about these terms, write to {CONTACT.EMAIL}.</p>
      </section>
    </LegalLayout>
  );
}
```

- [ ] **Step 4: Replace `RefundPolicyPage.tsx`**

```tsx
import { LegalLayout } from '../components/sections/LegalLayout';
import { CONTACT } from '../lib/constants';

export function RefundPolicyPage() {
  return (
    <LegalLayout title="Refund Policy" effectiveDate="2026-04-30">
      <section>
        <h2 className="font-display text-xl font-bold mb-3">1. Right of withdrawal</h2>
        <p>
          Under EU consumer protection law you have fourteen days from delivery to withdraw from your purchase without
          giving reason. Custom and made-to-order items are excluded where this is clearly communicated at checkout.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl font-bold mb-3">2. Condition of returns</h2>
        <p>
          Items must be returned in original packaging, unused, and in resalable condition. We reserve the right to
          deduct from the refund where condition is materially diminished beyond inspection.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl font-bold mb-3">3. How to return</h2>
        <p>
          Email {CONTACT.EMAIL} with your order number and reason. We will arrange collection or provide a return label.
          Return shipping costs are borne by the buyer except for items received damaged or defective.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl font-bold mb-3">4. Refund timing</h2>
        <p>
          Refunds are processed within fourteen days of receiving the returned item, using the original payment method.
          Bank processing may add a few additional working days.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl font-bold mb-3">5. Damaged or faulty items</h2>
        <p>
          Inspect your delivery on arrival. If anything is damaged or missing, photograph and notify us within
          forty-eight hours. We will arrange replacement or full refund including return shipping.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl font-bold mb-3">6. Exchanges</h2>
        <p>
          We currently process exchanges as a return + new order. Reach out for assistance — we will hold pricing on
          your new selection for fourteen days.
        </p>
      </section>
    </LegalLayout>
  );
}
```

- [ ] **Step 5: Verify**

```bash
npx tsc --noEmit && npm run build
```

- [ ] **Step 6: Commit**

```bash
git add src/components/sections/LegalLayout.tsx src/routes/PrivacyPolicyPage.tsx src/routes/TermsOfUsePage.tsx src/routes/RefundPolicyPage.tsx
git commit -m "feat: implement Privacy, Terms, Refund legal pages with GDPR baseline"
```

---

## Task 22: Favicon and Logo SVG

**Files:**
- Create: `public/favicon.svg`

- [ ] **Step 1: Create `favicon.svg`**

```bash
cat > /Users/kolmm/work/SnugLite/public/favicon.svg <<'EOF'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" fill="#0A0A0A"/>
  <text x="16" y="22" font-family="Bodoni Moda, Times New Roman, serif" font-size="20" font-weight="700" text-anchor="middle" fill="#F4F1EA" letter-spacing="-1">S</text>
</svg>
EOF
```

- [ ] **Step 2: Verify**

```bash
ls -la /Users/kolmm/work/SnugLite/public/favicon.svg
```

- [ ] **Step 3: Commit**

```bash
git add public/favicon.svg
git commit -m "chore: add favicon SVG"
```

---

## Task 23: Animation Polish + Reduced Motion Verification

**Files:**
- Verify code already produced respects `prefers-reduced-motion`

- [ ] **Step 1: Search for any unguarded transitions**

```bash
cd /Users/kolmm/work/SnugLite
grep -rn "transition" src/components/ src/routes/ | grep -v "@media\|prefers-reduced\|.tsx:.*className" | head -20
```

Output should only show CSS class usages (Tailwind utilities) which are guarded globally by `@media (prefers-reduced-motion: reduce)` in `global.css`.

- [ ] **Step 2: Verify global reduced-motion rule exists**

```bash
grep -n "prefers-reduced-motion" src/styles/global.css
```

Expected: line found inside `@layer base`.

- [ ] **Step 3: Quick smoke build**

```bash
npm run build
```

Expected: `dist/` produced, no warnings.

- [ ] **Step 4: Commit (no changes if all clean — skip if nothing modified)**

If nothing changed, skip. Otherwise:

```bash
git commit -am "fix: ensure all animations respect reduced motion"
```

---

## Task 24: Responsive Verification at 375 / 768 / 1440

**Files:** none modified directly — code review only

- [ ] **Step 1: Build and inspect**

```bash
npm run build
ls -lh dist/
```

- [ ] **Step 2: Check each page file for mobile/tablet/desktop classes**

For each page file in `src/routes/`, verify it uses responsive Tailwind prefixes (`md:`, `lg:`) on grid layouts, padding, and font sizing. The `display-*` and `heading-*` utilities use `clamp()` so they scale automatically.

Pages to manually scan: `HomePage`, `ShopPage`, `ProductPage`, `CartPage`, `CheckoutPage`, `AboutPage`, `SourcingPage`, `ContactPage`, `FaqPage`.

Expected: every page-level `grid` uses `grid-cols-1` as default with `md:` or `lg:` overrides.

- [ ] **Step 3: Final type and build check**

```bash
npx tsc --noEmit && npm run build
```

Expected: success.

- [ ] **Step 4: Commit any responsive tweaks made (if applicable)**

```bash
git commit -am "fix: tighten responsive breakpoints across pages" || true
```

---

## Task 25: Humanize User-Facing Copy

**Files:** every page file plus section components

- [ ] **Step 1: Invoke humanizer skill**

Use the `Skill` tool to invoke `humanizer` with this scope: review all user-facing copy in:

- `src/routes/HomePage.tsx`
- `src/routes/AboutPage.tsx`
- `src/routes/SourcingPage.tsx`
- `src/routes/CartPage.tsx`
- `src/routes/CheckoutPage.tsx`
- `src/routes/CheckoutSuccessPage.tsx`
- `src/routes/ContactPage.tsx`
- `src/routes/FaqPage.tsx`
- `src/routes/PrivacyPolicyPage.tsx`, `TermsOfUsePage.tsx`, `RefundPolicyPage.tsx`
- `src/components/sections/Hero.tsx`, `FeaturedCollection.tsx`, `AboutTeaser.tsx`, `CategoriesShowcase.tsx`, `Manifesto.tsx`, `Newsletter.tsx`
- `src/data/faq.ts`
- `src/lib/constants.ts` (BRAND.SUBTITLE, taglines)

Goal: rewrite to remove AI patterns (significance inflation, generic conclusions, copula avoidance, sycophancy, filler phrases) while preserving design system, voice, and meaning.

- [ ] **Step 2: Apply suggested rewrites**

Edit affected files in place. Keep design tokens and structure unchanged — only copy is updated.

- [ ] **Step 3: Verify build still passes**

```bash
npx tsc --noEmit && npm run build
```

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "copy: humanize user-facing text across all pages"
```

---

## Task 26: Final QA Checklist

**Files:** none — verification only

- [ ] **Step 1: Type check + tests + build**

```bash
cd /Users/kolmm/work/SnugLite
npx tsc --noEmit
npx vitest run
npm run build
```

Expected: all pass.

- [ ] **Step 2: Verify no emoji in source**

```bash
grep -rEn "[\xF0\x9F]|[\xE2\x98]|[\xE2\x99]|[\xE2\x9A]" src/ --include='*.ts' --include='*.tsx' || echo "OK: no emoji found"
```

Expected: "OK: no emoji found".

- [ ] **Step 3: Verify no TODO/FIXME**

```bash
grep -rn "TODO\|FIXME\|XXX" src/ --include='*.ts' --include='*.tsx' || echo "OK: no TODO/FIXME"
```

Expected: "OK: no TODO/FIXME".

- [ ] **Step 4: Verify all routes render**

The plan has covered all 14 routes. Check the router config matches:

```bash
grep -c "Component:" src/routes/index.tsx
```

Expected: 15 (RootLayout + 14 page components).

- [ ] **Step 5: Verify no unused dependencies**

```bash
npm prune
```

- [ ] **Step 6: Final commit and tag**

```bash
git add -A
git diff --cached --quiet || git commit -m "chore: final QA pass — types, tests, build all green"
git tag v0.1.0-mvp
```

---

## Self-Review

**1. Spec coverage**

- [x] Phase 1 brief — all fields applied (SnugLite SRL, EUR, English, [ADDRESS_PLACEHOLDER])
- [x] Phase 2 design system — Variant A "Atelier Editorial" embedded in Tailwind theme + utilities (Tasks 6, 7, 8, 9, 10)
- [x] Phase 3 architecture — all 14 routes implemented, components organized per file structure (Tasks 11-21)
- [x] Visual asset map — Unsplash downloads + WarmNest copy automated (Task 2)
- [x] Cart with localStorage — Zustand persist (Task 5)
- [x] Local-only checkout + thank-you page (Tasks 18, 19)
- [x] GDPR cookie banner + legal pages with placeholder address (Tasks 10, 21)
- [x] Logo + favicon (Tasks 10, 22)
- [x] Animations across pages (Tasks 9, 12, motion primitives used in every section)
- [x] Responsive verification (Task 24)
- [x] Humanize copy (Task 25)
- [x] FAQ page (Task 20)
- [x] Lighting "coming soon" handled in CategoriesShowcase + SourcingPage (Tasks 12, 20)

**2. Placeholder scan** — no TODO/FIXME/TBD; all code blocks complete; no "fill in details" comments.

**3. Type consistency** — `CartLine.lineId`, `useCartStore`, `Product`, `ProductVariant`, `CartItem` (renamed CartLine in store but exported correctly), `ROUTES.*`, `BRAND.*`, `CONTACT.*` consistent across tasks. `getProductBySlug` is used in Task 16 — verify it exists in WarmNest export. (It does, per README example.)

---

**Plan complete and saved to `/Users/kolmm/work/SnugLite/docs/plans/2026-04-30-snuglite-website.md`. Two execution options:**

**1. Subagent-Driven (recommended)** — I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** — Execute tasks in this session using executing-plans, batch execution with checkpoints

**Which approach?**
