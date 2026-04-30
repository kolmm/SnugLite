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
      <SectionHeading
        caption="Continue Browsing"
        title="More from this"
        scriptAccent="collection"
        className="mb-12"
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {related.map((p, idx) => (
          <ProductCard key={p.id} product={p} index={idx + 1} />
        ))}
      </div>
    </section>
  );
}
