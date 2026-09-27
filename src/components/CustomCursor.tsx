import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'motion/react';

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorState, setCursorState] = useState<'default' | 'interactive' | 'project' | 'clicking'>('default');

  // Mouse coords
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth trailing spring physics for outer ring
  const springX = useSpring(mouseX, { damping: 26, stiffness: 280, mass: 0.45 });
  const springY = useSpring(mouseY, { damping: 26, stiffness: 280, mass: 0.45 });

  useEffect(() => {
    // Only run on desktop devices with fine pointer
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => {
      setCursorState('clicking');
    };

    const handleMouseUp = (e: MouseEvent) => {
      checkHoverTarget(e.target as HTMLElement);
    };

    const checkHoverTarget = (target: HTMLElement | null) => {
      if (!target) {
        setCursorState('default');
        return;
      }

      if (target.closest('.project-card-interactive')) {
        setCursorState('project');
        return;
      }

      if (
        target.closest('button') ||
        target.closest('a') ||
        target.closest('[role="button"]') ||
        target.closest('input') ||
        target.closest('textarea') ||
        target.closest('.interactive-target')
      ) {
        setCursorState('interactive');
        return;
      }

      setCursorState('default');
    };

    const handleMouseOver = (e: MouseEvent) => {
      checkHoverTarget(e.target as HTMLElement);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  if (!isVisible) return null;

  const isInteractive = cursorState === 'interactive';
  const isProject = cursorState === 'project';
  const isClicking = cursorState === 'clicking';

  const ringSize = isProject ? 64 : isInteractive ? 48 : isClicking ? 24 : 32;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[9998] overflow-hidden hidden md:block"
      aria-hidden="true"
    >
      {/* Precision Center Dot - Zero lag */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-[#ccff00] shadow-[0_0_8px_#ccff00]"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isProject ? 0 : 1,
        }}
        transition={{ duration: 0.1 }}
      />

      {/* Trailing Fluid Spring Ring / Aura */}
      <motion.div
        className="fixed top-0 left-0 rounded-full flex items-center justify-center transition-colors duration-200"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
          width: ringSize,
          height: ringSize,
          background: isProject
            ? 'rgba(204, 255, 0, 0.14)'
            : isInteractive
            ? 'rgba(204, 255, 0, 0.08)'
            : 'rgba(255, 255, 255, 0.02)',
          border: isProject
            ? '1.5px solid rgba(204, 255, 0, 0.85)'
            : isInteractive
            ? '1px solid rgba(204, 255, 0, 0.65)'
            : '1px solid rgba(255, 255, 255, 0.18)',
          boxShadow: isProject
            ? '0 0 25px rgba(204, 255, 0, 0.35)'
            : isInteractive
            ? '0 0 15px rgba(204, 255, 0, 0.2)'
            : 'none',
          backdropFilter: isProject ? 'blur(4px)' : 'none',
        }}
        transition={{
          width: { type: 'spring', damping: 25, stiffness: 300 },
          height: { type: 'spring', damping: 25, stiffness: 300 },
        }}
      >
        {isProject && (
          <span className="text-[10px] font-mono font-bold tracking-widest text-[#ccff00] uppercase select-none">
            PLAY
          </span>
        )}
      </motion.div>
    </div>
  );
}
