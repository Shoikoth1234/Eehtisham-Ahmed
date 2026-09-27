import { Variants } from 'motion/react';

// Premium Framer-style cubic-bezier easing curves
export const EASINGS = {
  smoothOut: [0.21, 0.47, 0.32, 0.98] as const,
  cinematic: [0.16, 1, 0.3, 1] as const,
  springy: [0.34, 1.56, 0.64, 1] as const,
};

// Section Reveal Variant: subtle upward movement + soft blur decrease
export const sectionReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 35,
    filter: 'blur(8px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      ease: EASINGS.cinematic,
    },
  },
};

// Staggered Container
export const staggerContainer = (staggerChildren = 0.09, delayChildren = 0.05): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

// Item Fade Up
export const itemFadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
    filter: 'blur(6px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.7,
      ease: EASINGS.smoothOut,
    },
  },
};

// Card Hover Interaction
export const cardHoverProps = {
  whileHover: {
    y: -5,
    transition: { duration: 0.28, ease: EASINGS.smoothOut },
  },
};

// Button Micro-interactions
export const buttonInteractiveProps = {
  whileHover: {
    scale: 1.025,
    transition: { duration: 0.2, ease: EASINGS.smoothOut },
  },
  whileTap: {
    scale: 0.975,
    transition: { duration: 0.15 },
  },
};
