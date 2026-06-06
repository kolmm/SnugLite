import { Link } from 'react-router';
import type { Product } from '../../types';
import { NumberedTag } from '../ui/NumberedTag';
import { PriceTag } from '../ui/PriceTag';

interface ProductCardProps {
  product: Product;
  index?: number;
}

function normalizePath(path: string): string {
  return path.startsWith('/') ? path.slice(1) : path;
}

export function ProductCard({ product, index }: ProductCardProps) {
  const cover = product.images[0] ? normalizePath(product.images[0]) : '';
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
        {cover && (
          <img
            src={`/${cover}`}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            loading="lazy"
          />
        )}
        {!product.inStock && (
          <span className="absolute top-3 left-3 caption text-cream bg-ink/80 px-2 py-1">
            Sold Out
          </span>
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
