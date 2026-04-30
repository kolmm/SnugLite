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
        <dt>
          Subtotal ({count} {count === 1 ? 'item' : 'items'})
        </dt>
        <dd className="tabular font-display font-bold text-xl">
          {formatPriceEUR(subtotal)}
        </dd>
      </dl>
      {showShippingNote && (
        <p className="caption text-stone normal-case tracking-normal">
          Shipping calculated at checkout. EU delivery only.
        </p>
      )}
    </div>
  );
}
