import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import type { ReactNode } from 'react';
import { EASE_SOFT } from '../../lib/motion';

interface ScriptRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function ScriptReveal({ children, className, delay = 0 }: ScriptRevealProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const composed = ['script-accent inline-block', className]
    .filter(Boolean)
    .join(' ');

  return (
    <motion.span
      ref={ref}
      className={composed}
      style={{ overflow: 'hidden' }}
      initial={{ clipPath: 'inset(0 100% 0 0)' }}
      animate={inView ? { clipPath: 'inset(0 0% 0 0)' } : { clipPath: 'inset(0 100% 0 0)' }}
      transition={{ duration: 0.9, ease: EASE_SOFT, delay }}
    >
      {children}
    </motion.span>
  );
}
