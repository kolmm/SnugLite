import { motion, useInView } from 'framer-motion';
import type { ReactNode } from 'react';
import { useRef } from 'react';
import { EASE_SOFT } from '../../lib/motion';

type AsTag = 'div' | 'section' | 'article' | 'header' | 'h1' | 'h2' | 'h3' | 'p' | 'span';

interface FadeRiseProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  amount?: number;
  className?: string;
  as?: AsTag;
}

export function FadeRise({
  children,
  delay = 0,
  duration = 0.7,
  amount = 0.2,
  className,
  as = 'div',
}: FadeRiseProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount });
  const Component = motion[as];
  return (
    <Component
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ duration, ease: EASE_SOFT, delay }}
      className={className}
    >
      {children}
    </Component>
  );
}
