import type { Variants } from 'framer-motion';

export const EASE_SOFT: [number, number, number, number] = [0.32, 0.72, 0, 1];
export const EASE_SNAP: [number, number, number, number] = [0.65, 0, 0.35, 1];

export const fadeRiseVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
};

export const staggerParent: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};
