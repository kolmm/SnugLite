import { Link, NavLink } from 'react-router';
import { useState, useEffect } from 'react';
import { Menu, ShoppingBag } from 'lucide-react';
import { ROUTES } from '../../lib/constants';
import { useCartStore } from '../../store/cartStore';
import { Logo } from './Logo';
import { MobileMenu } from './MobileMenu';

const NAV_LEFT: { to: string; label: string }[] = [
  { to: ROUTES.SHOP, label: 'Shop' },
  { to: ROUTES.ABOUT, label: 'About' },
  { to: ROUTES.SOURCING, label: 'Sourcing' },
];

const NAV_RIGHT: { to: string; label: string }[] = [
  { to: ROUTES.CONTACT, label: 'Contact' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const cartCount = useCartStore((s) => s.totalCount());

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const headerClass = [
    'fixed top-0 inset-x-0 z-40 transition-all duration-300',
    scrolled
      ? 'bg-cream/85 backdrop-blur-md border-b border-bone'
      : 'bg-transparent',
  ].join(' ');

  return (
    <>
      <header className={headerClass}>
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-6 px-6 lg:px-10 py-4">
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LEFT.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  [
                    'caption transition-colors hover:text-rust',
                    isActive ? 'text-rust' : 'text-ink',
                  ].join(' ')
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          <button
            type="button"
            className="md:hidden justify-self-start p-2"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>

          <Logo size="md" />

          <div className="flex items-center justify-end gap-6">
            {NAV_RIGHT.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  [
                    'hidden md:inline caption transition-colors hover:text-rust',
                    isActive ? 'text-rust' : 'text-ink',
                  ].join(' ')
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Link
              to={ROUTES.CART}
              className="caption inline-flex items-center gap-2 hover:text-rust transition-colors"
              aria-label={`Cart, ${cartCount} item${cartCount === 1 ? '' : 's'}`}
            >
              <ShoppingBag size={18} />
              <span className="tabular">[{cartCount}]</span>
            </Link>
          </div>
        </div>
      </header>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
