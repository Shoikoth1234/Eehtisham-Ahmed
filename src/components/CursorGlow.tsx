import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'motion/react';

export default function CursorGlow() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);

  const cursorX = useSpring(0, { damping: 28, stiffness: 220, mass: 0.5 });
  const cursorY = useSpring(0, { damping: 28, stiffness: 220, mass: 0.5 });

  useEffect(() => {
    // Only enable on fine pointer devices (desktops/laptops)
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Suppress cursor glow over FAQ and Footer
      if (target && (target.closest('#faq') || target.closest('footer'))) {
        setIsVisible(false);
        return;
      }
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Do not trigger interactive glow over FAQ or Footer
      if (target && (target.closest('#faq') || target.closest('footer'))) {
        setIsHoveringInteractive(false);
        return;
      }

      if (
        target.closest('button') ||
        target.closest('a') ||
        target.closest('[role="button"]') ||
        target.closest('.interactive-target')
      ) {
        setIsHoveringInteractive(true);
      } else {
        setIsHoveringInteractive(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleElementHover);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleElementHover);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden" aria-hidden="true">
      {/* Primary smooth cursor spotlight glow */}
      <motion.div
        className="absolute rounded-full -translate-x-1/2 -translate-y-1/2 transition-transform duration-150 ease-out"
        style={{
          left: cursorX,
          top: cursorY,
          width: isHoveringInteractive ? 340 : 220,
          height: isHoveringInteractive ? 340 : 220,
          background: isHoveringInteractive
            ? 'radial-gradient(circle, rgba(204, 255, 0, 0.16) 0%, rgba(204, 255, 0, 0.04) 45%, transparent 70%)'
            : 'radial-gradient(circle, rgba(204, 255, 0, 0.08) 0%, transparent 60%)',
          filter: 'blur(30px)',
          mixBlendMode: 'screen',
        }}
      />
    </div>
  );
}
