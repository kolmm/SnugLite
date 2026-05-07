import { Link } from 'react-router';
import { ROUTES, BRAND } from '../../lib/constants';

const INFO_LINKS = [
  { to: ROUTES.ABOUT, label: 'About' },
  { to: ROUTES.SOURCING, label: 'Sourcing' },
  { to: ROUTES.CONTACT, label: 'Contact' },
  { to: ROUTES.FAQ, label: 'FAQ' },
];

const SHOP_LINKS = [
  { to: '/shop/furniture', label: 'Furniture' },
  { to: '/shop/shelving', label: 'Shelving' },
  { to: ROUTES.SHOP, label: 'All Products' },
];

const LEGAL_LINKS = [
  { to: ROUTES.PRIVACY, label: 'Privacy Policy' },
  { to: ROUTES.TERMS, label: 'Terms of Use' },
  { to: ROUTES.REFUND, label: 'Refund Policy' },
];

export function Footer() {
  return (
    <footer className="bg-ink text-cream mt-32">
      <div className="px-6 lg:px-10 py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <p className="font-display text-3xl font-bold uppercase">
              {BRAND.NAME}
            </p>
            <p
              className="text-cream/80 mt-[-0.4em] mb-6"
              style={{ fontFamily: 'Italianno, cursive', fontSize: '1.5rem' }}
            >
              considered workspaces
            </p>
            <p className="text-cream/70 max-w-sm leading-relaxed">
              Office furniture and lighting selected for material honesty and
              longevity. Curated for design-led workspaces across the EU.
            </p>
          </div>

          <div className="md:col-span-2">
            <p className="caption text-cream/50 mb-4">Information</p>
            <ul className="flex flex-col gap-2">
              {INFO_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="hover:text-rust transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="caption text-cream/50 mb-4">Shop</p>
            <ul className="flex flex-col gap-2">
              {SHOP_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="hover:text-rust transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="caption text-cream/50 mb-4">Legal</p>
            <ul className="flex flex-col gap-2">
              {LEGAL_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="hover:text-rust transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-cream/15 mt-16 pt-8 flex flex-col md:flex-row justify-between gap-4 caption text-cream/50">
          <span>
            © {new Date().getFullYear()} {BRAND.ENTITY}. All rights reserved.
            <span className="ml-2">Company No. {BRAND.COMPANY_NUMBER}</span>
          </span>
          <span>Designed in the EU. Built with care.</span>
        </div>
      </div>
    </footer>
  );
}
