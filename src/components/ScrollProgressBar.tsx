import React from 'react';
import { motion, useScroll, useSpring } from 'motion/react';

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 32,
    restDelta: 0.001,
  });

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[2.5px] z-[9999] pointer-events-none origin-left"
      aria-hidden="true"
    >
      <motion.div
        className="w-full h-full bg-gradient-to-r from-[#ccff00] via-[#d4ff33] to-[#e8ff80]"
        style={{
          scaleX,
          transformOrigin: '0%',
          boxShadow: '0 0 12px rgba(204, 255, 0, 0.75), 0 0 24px rgba(204, 255, 0, 0.35)',
        }}
      />
    </div>
  );
}
