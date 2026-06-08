import { Link } from 'react-router';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from '../product/ProductCard';
import { SectionHeading } from './SectionHeading';
import { FadeRise } from '../motion/FadeRise';
import { ROUTES } from '../../lib/constants';

const FEATURED_SLUGS = [
  'luxury-gaming-office-chair',
  'executive-desk-drawers',
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
            Three things sit on the desk this season. Each chosen because it
            earns the room it occupies — quietly, day after day.
          </p>
          <Link
            to={ROUTES.SHOP}
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
