import { Link } from 'react-router';
import { CATEGORIES } from '../../data/categories';
import { PRODUCTS } from '../../data/products';
import { FadeRise } from '../motion/FadeRise';
import { SectionHeading } from './SectionHeading';

function normalizePath(path: string): string {
  return path.startsWith('/') ? path.slice(1) : path;
}

export function CategoriesShowcase() {
  return (
    <section className="px-6 lg:px-10 py-32 max-w-7xl mx-auto">
      <SectionHeading
        caption="Categories"
        title="Browse"
        scriptAccent="by collection"
        className="mb-16"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {CATEGORIES.map((cat, idx) => {
          const count = PRODUCTS.filter((p) => p.category === cat.slug).length;
          const isWide = cat.slug === 'lighting';
          return (
            <FadeRise
              key={cat.slug}
              delay={idx * 0.1}
              className={isWide ? 'md:col-span-2' : undefined}
            >
              <Link
                to={`/shop/${cat.slug}`}
                className={
                  'group block relative overflow-hidden bg-paper ' +
                  (isWide ? 'aspect-[4/3] md:aspect-[8/3]' : 'aspect-[4/3]')
                }
              >
                <img
                  src={`/${normalizePath(cat.image)}`}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 text-cream">
                  <p className="caption text-cream/70">{count} pieces</p>
                  <h3 className="font-display text-3xl font-bold uppercase mt-2">
                    {cat.name}
                  </h3>
                  <p className="text-cream/80 mt-2 max-w-md">
                    {cat.description}
                  </p>
                </div>
              </Link>
            </FadeRise>
          );
        })}
      </div>
    </section>
  );
}
