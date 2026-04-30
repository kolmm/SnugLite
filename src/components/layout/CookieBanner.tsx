import { Link } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { useCookieConsent } from '../../hooks/useCookieConsent';
import { Button } from '../ui/Button';
import { ROUTES } from '../../lib/constants';

export function CookieBanner() {
  const { accepted, accept, decline } = useCookieConsent();

  return (
    <AnimatePresence>
      {accepted === null && (
        <motion.div
          className="fixed bottom-4 inset-x-4 md:inset-x-auto md:right-6 md:left-auto md:bottom-6 md:max-w-md z-30 bg-ink text-cream p-6 border border-cream/20"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 32 }}
          transition={{ duration: 0.4 }}
          role="dialog"
          aria-label="Cookie consent"
        >
          <p className="caption text-cream/60 mb-2">Cookies</p>
          <p className="text-cream/90 leading-relaxed mb-5">
            We use functional cookies to remember your cart and preferences. No
            tracking, no analytics, no third parties.{' '}
            <Link to={ROUTES.PRIVACY} className="underline hover:text-rust">
              Read more
            </Link>
            .
          </p>
          <div className="flex gap-3">
            <Button variant="rust" onClick={accept} className="flex-1">
              Accept
            </Button>
            <Button
              onClick={decline}
              className="flex-1 bg-transparent text-cream border border-cream/40 hover:bg-cream hover:text-ink"
            >
              Decline
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
