import React, { useEffect, useRef, useState } from 'react';

/**
 * Fluid Motion Gooey Cursor in Brand Color (#ccff00)
 * Uses SVG filter (#goo) with Gaussian blur & Color Matrix threshold
 * to create a fluid, elastic metaball liquid trail that follows the cursor.
 */

const CIRCLE_COUNT = 20;

export default function GooeyCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const circlesRef = useRef<HTMLDivElement[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  const coords = useRef({ x: -100, y: -100 });
  const isHovering = useRef(false);
  const isClicking = useRef(false);

  useEffect(() => {
    // Only run on devices with a fine pointer (mouse / trackpad)
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const circles = circlesRef.current;
    if (!circles.length) return;

    // Initialize positions offscreen
    circles.forEach((circle) => {
      circle.dataset.x = '0';
      circle.dataset.y = '0';
    });

    const handleMouseMove = (e: MouseEvent) => {
      coords.current.x = e.clientX;
      coords.current.y = e.clientY;
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => {
      isClicking.current = true;
    };

    const handleMouseUp = () => {
      isClicking.current = false;
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target &&
        (target.closest('button') ||
          target.closest('a') ||
          target.closest('[role="button"]') ||
          target.closest('input') ||
          target.closest('textarea') ||
          target.closest('.interactive-target'))
      ) {
        isHovering.current = true;
      } else {
        isHovering.current = false;
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);

    let animId: number;

    const animate = () => {
      let x = coords.current.x;
      let y = coords.current.y;

      circles.forEach((circle, index) => {
        if (!circle) return;

        // Position current circle
        circle.style.left = `${x}px`;
        circle.style.top = `${y}px`;

        // Scale down smoothly towards the end of the fluid tail
        const baseScale = (circles.length - index) / circles.length;
        const multiplier = isClicking.current ? 0.75 : isHovering.current ? 1.45 : 1.0;
        const finalScale = Math.max(0.12, baseScale * multiplier);

        circle.style.transform = `scale(${finalScale})`;

        // Store current position in dataset
        circle.dataset.x = String(x);
        circle.dataset.y = String(y);

        // Next circle in the chain lerps towards the previous one
        const nextCircle = circles[index + 1] || circles[0];
        const nextX = parseFloat(nextCircle.dataset.x || String(coords.current.x));
        const nextY = parseFloat(nextCircle.dataset.y || String(coords.current.y));

        // Fluid spring interpolation factor
        x += (nextX - x) * 0.38;
        y += (nextY - y) * 0.38;
      });

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  return (
    <>
      {/* SVG Gooey / Fluid Metaball Filter */}
      <svg
        className="pointer-events-none fixed inset-0"
        style={{ width: 0, height: 0, position: 'absolute', opacity: 0 }}
        aria-hidden="true"
      >
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="
                1 0 0 0 0
                0 1 0 0 0
                0 0 1 0 0
                0 0 0 35 -15"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* Gooey Cursor Fluid Trail */}
      <div
        id="cursor"
        ref={cursorRef}
        className={`pointer-events-none fixed z-50 transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden="true"
      >
        {Array.from({ length: CIRCLE_COUNT }).map((_, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) circlesRef.current[i] = el;
            }}
            className="cursor-circle"
          />
        ))}
      </div>
    </>
  );
}
