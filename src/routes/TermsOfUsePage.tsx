import { LegalLayout } from '../components/sections/LegalLayout';
import { CONTACT, BRAND } from '../lib/constants';

export function TermsOfUsePage() {
  return (
    <LegalLayout title="Terms of Use" effectiveDate="2026-04-30">
      <section>
        <h2 className="font-display text-xl font-bold mb-3">1. Acceptance</h2>
        <p>
          By accessing this website you agree to these terms. If you do not
          agree, please do not use the site.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl font-bold mb-3">
          2. Orders and contracts
        </h2>
        <p>
          Orders are an offer to purchase. The contract is formed when we send
          order confirmation by email. Prices are shown in EUR and include VAT
          where applicable.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl font-bold mb-3">3. Delivery</h2>
        <p>
          We ship across the EU. Standard delivery takes five to ten business
          days. Risk passes to you at delivery. Larger items are coordinated
          directly with the carrier and may require a delivery appointment.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl font-bold mb-3">
          4. Intellectual property
        </h2>
        <p>
          All content on this site — photographs, copy, graphics, layout — is
          the property of {BRAND.ENTITY} or its partners and is protected under
          EU copyright law. Reproduction without written permission is
          prohibited.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl font-bold mb-3">
          5. Limitation of liability
        </h2>
        <p>
          {BRAND.NAME} is not liable for indirect or consequential damages
          arising from use of this site or its products beyond the limits set
          by EU consumer law.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl font-bold mb-3">6. Governing law</h2>
        <p>
          These terms are governed by the laws of {CONTACT.COUNTRY}. Disputes
          will be resolved before the courts of {CONTACT.ADDRESS_LINE_2}.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl font-bold mb-3">7. Contact</h2>
        <p>For questions about these terms, write to {CONTACT.EMAIL}.</p>
      </section>
    </LegalLayout>
  );
}
