import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { CartLineItem } from '../components/cart/CartLineItem';
import { OrderSummary } from '../components/cart/OrderSummary';
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
        <p className="text-stone mt-3">
          {items.length} {items.length === 1 ? 'piece' : 'pieces'}
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 border-t border-bone">
          {items.map((line) => (
            <CartLineItem key={line.lineId} line={line} />
          ))}
        </div>
        <aside className="lg:col-span-4 lg:sticky lg:top-24 self-start flex flex-col gap-6">
          <OrderSummary />
          <Link
            to={ROUTES.CHECKOUT}
            className="bg-rust text-cream caption px-8 py-4 inline-flex items-center justify-center hover:bg-rust-dark transition-colors w-full"
          >
            Proceed to Checkout
            <ArrowRight size={14} className="ml-2" />
          </Link>
          <Link
            to={ROUTES.SHOP}
            className="caption text-center text-stone hover:text-rust"
          >
            Continue shopping
          </Link>
        </aside>
      </div>
    </section>
  );
}
