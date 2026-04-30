import { LegalLayout } from '../components/sections/LegalLayout';
import { CONTACT } from '../lib/constants';

export function RefundPolicyPage() {
  return (
    <LegalLayout title="Refund Policy" effectiveDate="2026-04-30">
      <section>
        <h2 className="font-display text-xl font-bold mb-3">
          1. Right of withdrawal
        </h2>
        <p>
          Under EU consumer protection law you have fourteen days from delivery
          to withdraw from your purchase without giving reason. Custom and
          made-to-order items are excluded where this is clearly communicated
          at checkout.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl font-bold mb-3">
          2. Condition of returns
        </h2>
        <p>
          Items must be returned in original packaging, unused, and in
          resalable condition. We reserve the right to deduct from the refund
          where condition is materially diminished beyond inspection.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl font-bold mb-3">
          3. How to return
        </h2>
        <p>
          Email {CONTACT.EMAIL} with your order number and reason. We will
          arrange collection or provide a return label. Return shipping costs
          are borne by the buyer except for items received damaged or
          defective.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl font-bold mb-3">4. Refund timing</h2>
        <p>
          Refunds are processed within fourteen days of receiving the returned
          item, using the original payment method. Bank processing may add a
          few additional working days.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl font-bold mb-3">
          5. Damaged or faulty items
        </h2>
        <p>
          Inspect your delivery on arrival. If anything is damaged or missing,
          photograph and notify us within forty-eight hours. We will arrange
          replacement or full refund including return shipping.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl font-bold mb-3">6. Exchanges</h2>
        <p>
          We currently process exchanges as a return + new order. Reach out for
          assistance — we will hold pricing on your new selection for fourteen
          days.
        </p>
      </section>
    </LegalLayout>
  );
}
