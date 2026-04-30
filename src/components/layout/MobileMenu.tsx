import { Link } from 'react-router';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ROUTES } from '../../lib/constants';
import { useScrollLock } from '../../hooks/useScrollLock';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

const LINKS: { to: string; label: string }[] = [
  { to: ROUTES.SHOP, label: 'Shop' },
  { to: ROUTES.ABOUT, label: 'About' },
  { to: ROUTES.SOURCING, label: 'Sourcing' },
  { to: ROUTES.CONTACT, label: 'Contact' },
];

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  useScrollLock(open);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 bg-cream"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex justify-end p-6">
            <button
              onClick={onClose}
              aria-label="Close menu"
              className="p-2"
              type="button"
            >
              <X size={24} />
            </button>
          </div>
          <nav className="flex flex-col items-center justify-center gap-6 px-6 py-12">
            {LINKS.map((link, idx) => (
              <motion.div
                key={link.to}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + idx * 0.05, duration: 0.4 }}
              >
                <Link
                  to={link.to}
                  onClick={onClose}
                  className="display-md hover:text-rust transition-colors"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
