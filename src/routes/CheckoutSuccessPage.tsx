import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { SealStamp } from '../components/brand/SealStamp';
import { ROUTES } from '../lib/constants';
import { EASE_SOFT } from '../lib/motion';

export function CheckoutSuccessPage() {
  return (
    <section className="min-h-[80vh] flex items-center justify-center px-6 py-32">
      <div className="text-center max-w-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.85, rotate: -8 }}
          animate={{ opacity: 1, scale: 1, rotate: -6 }}
          transition={{ duration: 0.9, ease: EASE_SOFT }}
          className="inline-block mb-12 text-rust"
        >
          <SealStamp
            size={220}
            centerLines={['ORDER', 'RECEIVED']}
            perimeterText="SNUGLITE • THANK YOU FOR YOUR ORDER •"
            color="currentColor"
          />
        </motion.div>

        <h1 className="display-lg">
          Thank you.{' '}
          <span
            className="text-rust"
            style={{ fontFamily: 'Italianno, cursive', fontSize: '1.1em' }}
          >
            Truly.
          </span>
        </h1>
        <p className="text-stone mt-6 leading-relaxed">
          We will confirm your order by email and follow up with shipping
          details within one business day. If anything urgent, reach us anytime
          — every email is read by a human.
        </p>

        <div className="flex flex-wrap gap-4 justify-center mt-10">
          <Link
            to={ROUTES.SHOP}
            className="caption inline-flex items-center gap-2 border-b border-ink hover:text-rust hover:border-rust"
          >
            Continue Browsing
          </Link>
          <Link
            to={ROUTES.CONTACT}
            className="caption inline-flex items-center gap-2 text-stone hover:text-rust"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
