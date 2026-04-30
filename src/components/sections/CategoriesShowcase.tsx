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
          return (
            <FadeRise key={cat.slug} delay={idx * 0.1}>
              <Link
                to={`/shop/${cat.slug}`}
                className="group block relative overflow-hidden bg-paper aspect-[4/3]"
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

        <FadeRise delay={0.2} className="md:col-span-2">
          <div className="bg-ink text-cream aspect-[8/3] flex items-center justify-center text-center px-6">
            <div>
              <p className="caption text-cream/60">Coming Autumn 2026</p>
              <h3 className="display-md mt-4">
                Lighting{' '}
                <span
                  className="text-rust"
                  style={{ fontFamily: 'Italianno, cursive', fontSize: '1.1em' }}
                >
                  soon
                </span>
              </h3>
              <p className="text-cream/70 mt-3 max-w-md mx-auto">
                A curated lighting range is in development with our partner
                ateliers. Sign up to be notified first.
              </p>
            </div>
          </div>
        </FadeRise>
      </div>
    </section>
  );
}
