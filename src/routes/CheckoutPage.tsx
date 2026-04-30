import { useNavigate, Link } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCartStore } from '../store/cartStore';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import { Button } from '../components/ui/Button';
import { OrderSummary } from '../components/cart/OrderSummary';
import { ROUTES, STORAGE_KEYS } from '../lib/constants';
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
        <Link
          to={ROUTES.SHOP}
          className="caption inline-block mt-8 border-b border-ink hover:text-rust"
        >
          Browse Products
        </Link>
      </section>
    );
  }

  const onSubmit = async () => {
    const orderNumber = generateOrderNumber();
    sessionStorage.setItem(STORAGE_KEYS.LAST_ORDER, orderNumber);
    clear();
    navigate(ROUTES.CHECKOUT_SUCCESS);
  };

  return (
    <section className="px-6 lg:px-10 py-16 max-w-7xl mx-auto">
      <header className="text-center mb-16">
        <p className="caption text-stone">Checkout</p>
        <h1 className="display-lg mt-4">Place Your Order</h1>
        <p className="text-stone mt-3 max-w-md mx-auto">
          We will confirm your order by email and follow up with shipping
          details within one business day.
        </p>
      </header>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 lg:grid-cols-12 gap-12"
      >
        <div className="lg:col-span-7 flex flex-col gap-12">
          <fieldset className="flex flex-col gap-6">
            <legend className="caption text-stone mb-2">Contact</legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Input
                label="First name"
                {...register('firstName')}
                error={errors.firstName?.message}
              />
              <Input
                label="Last name"
                {...register('lastName')}
                error={errors.lastName?.message}
              />
            </div>
            <Input
              label="Email"
              type="email"
              {...register('email')}
              error={errors.email?.message}
            />
            <Input
              label="Phone"
              type="tel"
              {...register('phone')}
              error={errors.phone?.message}
            />
          </fieldset>

          <fieldset className="flex flex-col gap-6">
            <legend className="caption text-stone mb-2">
              Shipping Address
            </legend>
            <Input
              label="Address line 1"
              {...register('addressLine1')}
              error={errors.addressLine1?.message}
            />
            <Input
              label="Address line 2 (optional)"
              {...register('addressLine2')}
            />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <Input
                label="City"
                {...register('city')}
                error={errors.city?.message}
              />
              <Input
                label="Postal code"
                {...register('postalCode')}
                error={errors.postalCode?.message}
              />
              <Input
                label="Country"
                {...register('country')}
                error={errors.country?.message}
              />
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
            By placing this order you agree to our{' '}
            <Link to={ROUTES.TERMS} className="underline">
              terms of use
            </Link>{' '}
            and{' '}
            <Link to={ROUTES.PRIVACY} className="underline">
              privacy policy
            </Link>
            .
          </p>
        </aside>
      </form>
    </section>
  );
}
