import { LegalLayout } from '../components/sections/LegalLayout';
import { CONTACT, BRAND } from '../lib/constants';

export function PrivacyPolicyPage() {
  return (
    <LegalLayout title="Privacy Policy" effectiveDate="2026-04-30">
      <section>
        <h2 className="font-display text-xl font-bold mb-3">1. Who we are</h2>
        <p>
          {BRAND.ENTITY} ({BRAND.NAME}), Company No. {BRAND.COMPANY_NUMBER},
          operates this website. Registered office: {CONTACT.ADDRESS_LINE_1},{' '}
          {CONTACT.ADDRESS_LINE_2}, {CONTACT.COUNTRY}. Contact: {CONTACT.EMAIL}.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl font-bold mb-3">
          2. What data we collect
        </h2>
        <p>
          We collect data you provide directly: name, email, phone, shipping
          address, and order details. We do not use third-party analytics,
          advertising trackers, or marketing pixels on this site.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl font-bold mb-3">3. How we use it</h2>
        <p>
          Your data is used solely to fulfil orders, respond to inquiries, and
          send delivery updates. We do not sell or share data with third
          parties beyond the carriers required to ship your order.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl font-bold mb-3">4. Cookies</h2>
        <p>
          We use only functional cookies to remember your cart and consent
          preferences. No advertising or analytics cookies are set.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl font-bold mb-3">
          5. Your rights (GDPR)
        </h2>
        <p>
          Under EU General Data Protection Regulation, you have the right to
          access, correct, delete, or export your personal data, and to object
          to processing. To exercise these rights, write to {CONTACT.EMAIL}. We
          respond within thirty days.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl font-bold mb-3">
          6. Data retention
        </h2>
        <p>
          Order records are kept for ten years for tax compliance. Inquiry
          messages are retained for up to two years. Cart data is kept locally
          in your browser and is not stored on our servers.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl font-bold mb-3">7. Changes</h2>
        <p>
          We update this policy when our practices change. The effective date
          above marks the latest revision.
        </p>
      </section>
    </LegalLayout>
  );
}
