import React, { useState, useRef, useCallback } from 'react';

export interface CardGlowMousePos {
  x: number;
  y: number;
  isHovered: boolean;
}

export function useCardGlow() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState<CardGlowMousePos>({
    x: 0,
    y: 0,
    isHovered: false,
  });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      isHovered: true,
    });
  }, []);

  const handleMouseEnter = useCallback(() => {
    setMousePos((prev) => ({ ...prev, isHovered: true }));
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMousePos((prev) => ({ ...prev, isHovered: false }));
  }, []);

  return {
    cardRef,
    mousePos,
    handleMouseMove,
    handleMouseEnter,
    handleMouseLeave,
    glowProps: {
      ref: cardRef,
      onMouseMove: handleMouseMove,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
    },
  };
}

interface CardGlowOverlayProps {
  mousePos: CardGlowMousePos;
  roundedClassName?: string;
  primaryGlowSize?: number;
  coreGlowSize?: number;
  borderGlowSize?: number;
}

export function CardGlowOverlay({
  mousePos,
  roundedClassName = 'rounded-3xl',
  primaryGlowSize = 380,
  coreGlowSize = 160,
  borderGlowSize = 380,
}: CardGlowOverlayProps) {
  return (
    <>
      {/* Primary Cursor-Following Radial Glow Effect (exact same as newsletter) */}
      <div
        className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full transition-opacity duration-300 ease-out z-0"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
          width: `${primaryGlowSize}px`,
          height: `${primaryGlowSize}px`,
          background:
            'radial-gradient(circle, rgba(204,255,0,0.22) 0%, rgba(204,255,0,0.08) 40%, rgba(0,255,180,0.03) 65%, transparent 75%)',
          filter: 'blur(50px)',
          opacity: mousePos.isHovered ? 1 : 0,
        }}
      />

      {/* Core Intense Neon Glow at Cursor Position */}
      <div
        className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full transition-opacity duration-200 ease-out z-0"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
          width: `${coreGlowSize}px`,
          height: `${coreGlowSize}px`,
          background:
            'radial-gradient(circle, rgba(204,255,0,0.4) 0%, rgba(204,255,0,0.12) 50%, transparent 80%)',
          filter: 'blur(25px)',
          opacity: mousePos.isHovered ? 1 : 0,
        }}
      />

      {/* Interactive Cursor-Reactive Border Glow Highlight */}
      <div
        className={`pointer-events-none absolute inset-0 ${roundedClassName} transition-opacity duration-300 z-10`}
        style={{
          opacity: mousePos.isHovered ? 1 : 0,
          background: `radial-gradient(${borderGlowSize}px circle at ${mousePos.x}px ${mousePos.y}px, rgba(204,255,0,0.38), transparent 45%)`,
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor',
          padding: '1.5px',
          borderRadius: 'inherit',
        }}
      />
    </>
  );
}
