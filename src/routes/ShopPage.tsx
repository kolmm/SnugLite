import { useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { useParams, Link } from 'react-router';
import { PRODUCTS } from '../data/products';
import { CATEGORIES } from '../data/categories';
import { ProductCard } from '../components/product/ProductCard';
import { Select } from '../components/ui/Select';
import { FadeRise } from '../components/motion/FadeRise';
import { ScriptReveal } from '../components/motion/ScriptReveal';

type SortKey = 'featured' | 'price-asc' | 'price-desc' | 'name';

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price — Low to High' },
  { value: 'price-desc', label: 'Price — High to Low' },
  { value: 'name', label: 'Name A-Z' },
];

interface FilterChipProps {
  to: string;
  active: boolean;
  children: ReactNode;
}

function FilterChip({ to, active, children }: FilterChipProps) {
  const cls = [
    'caption px-4 py-2 border transition-colors',
    active
      ? 'bg-ink text-cream border-ink'
      : 'bg-cream text-ink border-stone/60 hover:border-ink',
  ].join(' ');
  return (
    <Link to={to} className={cls}>
      {children}
    </Link>
  );
}

export function ShopPage() {
  const { category } = useParams<{ category?: string }>();
  const [sortKey, setSortKey] = useState<SortKey>('featured');

  const validCategory = useMemo(
    () => CATEGORIES.find((c) => c.slug === category)?.slug,
    [category],
  );

  const filtered = useMemo(() => {
    const base = validCategory
      ? PRODUCTS.filter((p) => p.category === validCategory)
      : PRODUCTS;
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

  const titleParts = headingTitle.split(' ');
  const lastWord = titleParts[titleParts.length - 1] ?? '';
  const leadingTitle = titleParts.slice(0, -1).join(' ');

  return (
    <section className="px-6 lg:px-10 py-24 max-w-7xl mx-auto">
      <header className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-end">
        <div className="lg:col-span-8">
          <p className="caption text-stone">Shop</p>
          <h1 className="display-lg mt-4">
            {leadingTitle}{' '}
            <ScriptReveal>{lastWord.toLowerCase()}</ScriptReveal>
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
        <FilterChip to="/shop" active={!validCategory}>
          All
        </FilterChip>
        {CATEGORIES.map((c) => (
          <FilterChip
            key={c.slug}
            to={`/shop/${c.slug}`}
            active={validCategory === c.slug}
          >
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
        <p className="text-stone text-center py-32">
          No pieces in this category yet.
        </p>
      )}
    </section>
  );
}
