import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { ROUTES, BRAND } from '../../lib/constants';
import { GrainOverlay } from '../brand/GrainOverlay';
import { ScriptReveal } from '../motion/ScriptReveal';
import { EASE_SOFT } from '../../lib/motion';

export function Hero() {
  return (
    <section className="relative h-[100svh] min-h-[600px] -mt-20 flex items-end overflow-hidden bg-ink text-cream">
      <img
        src="/images/lifestyle/hero-main.jpg"
        alt="Considered workspace at low light"
        className="absolute inset-0 h-full w-full object-cover opacity-70"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/30" />
      <GrainOverlay opacity={0.08} />

      <div className="relative z-10 px-6 lg:px-10 pb-24 max-w-7xl mx-auto w-full">
        <motion.p
          className="caption text-cream/60"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_SOFT }}
        >
          {BRAND.NAME} — Curated for Workspaces
        </motion.p>

        <h1 className="display-xl mt-6 max-w-4xl">
          <motion.span
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: EASE_SOFT }}
            className="block"
          >
            CONSIDERED
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: EASE_SOFT }}
            className="block"
          >
            <ScriptReveal delay={0.6}>objects</ScriptReveal>{' '}
            <span className="inline-block">FOR WORK</span>
          </motion.span>
        </h1>

        <motion.p
          className="mt-8 max-w-md text-cream/80 leading-relaxed"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: EASE_SOFT }}
        >
          A short catalogue of office seating, lighting, and workspace
          accessories. Vetted suppliers, tested in-studio, shipped from EU
          fulfilment with the spec sheet on every listing.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap gap-6 items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <Link
            to={ROUTES.SHOP}
            className="caption inline-flex items-center gap-3 border-b border-cream pb-1 hover:text-rust hover:border-rust transition-colors"
          >
            Shop the Catalogue
            <ArrowRight size={14} />
          </Link>
          <Link
            to={ROUTES.SOURCING}
            className="caption inline-flex items-center gap-3 text-cream/70 hover:text-rust transition-colors"
          >
            Read Our Sourcing Manifesto
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
