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

function normalizePath(path: string): string {
  return path.startsWith('/') ? path.slice(1) : path;
}

export function CartLineItem({ line }: CartLineItemProps) {
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const cover = line.product.images[0]
    ? normalizePath(line.product.images[0])
    : '';
  const price = line.product.price + (line.variant?.priceModifier ?? 0);

  return (
    <article className="grid grid-cols-[100px_1fr_auto] sm:grid-cols-[140px_1fr_auto] gap-6 py-6 border-b border-bone">
      <Link
        to={`/products/${line.product.slug}`}
        className="block bg-paper aspect-square overflow-hidden"
      >
        {cover && (
          <img
            src={`/${cover}`}
            alt={line.product.name}
            className="w-full h-full object-cover"
          />
        )}
      </Link>
      <div className="flex flex-col justify-between gap-3">
        <div>
          <Link
            to={`/products/${line.product.slug}`}
            className="font-display text-xl font-bold hover:text-rust transition-colors"
          >
            {line.product.name}
          </Link>
          {line.variant && (
            <p className="caption text-stone mt-1 normal-case tracking-normal">
              {line.variant.name}
            </p>
          )}
          <p className="caption text-stone mt-1 tabular">
            {formatPriceEUR(price)} each
          </p>
        </div>
        <div className="flex items-center gap-4">
          <QtyStepper
            value={line.quantity}
            onChange={(n) => updateQuantity(line.lineId, n)}
          />
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
