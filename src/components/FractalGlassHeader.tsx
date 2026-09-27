import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Play, Sparkles } from 'lucide-react';

interface FractalGlassHeaderProps {
  onBookCallClick: () => void;
  onShowreelClick: () => void;
}

export default function FractalGlassHeader({ onBookCallClick, onShowreelClick }: FractalGlassHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Features', href: '#features' },
    { label: 'Projects', href: '#projects' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'About me', href: '#about' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-3 sm:py-4 px-3 sm:px-6 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Apple Trending Style Fractal Glass Capsule */}
        <div
          id="fractal-glass-navbar"
          className={`relative rounded-2xl md:rounded-full transition-all duration-500 overflow-hidden ${
            isScrolled ? 'apple-fractal-glass-scrolled' : 'apple-fractal-glass'
          }`}
        >
          {/* Apple-style Specular Rim Bevel (Top Light Refraction) */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 via-[#ccff00]/30 to-transparent pointer-events-none z-20 opacity-80" />

          {/* Fractal Crystalline Facets & Refractive Dispersion Overlays (Softened for see-through text visibility) */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
            {/* Prismatic Diagonal Fractal Facet 1 (Left Refraction) */}
            <div 
              className="absolute -top-12 -left-8 w-60 h-36 bg-gradient-to-br from-white/15 via-[#ccff00]/8 to-transparent rotate-25 blur-[1px] opacity-25"
              style={{ clipPath: 'polygon(0% 0%, 100% 0%, 80% 100%, 0% 80%)' }}
            />

            {/* Prismatic Diagonal Fractal Facet 2 (Right Refraction) */}
            <div 
              className="absolute -bottom-10 right-1/4 w-80 h-28 bg-gradient-to-tl from-purple-500/8 via-[#ccff00]/5 to-transparent -rotate-12 blur-[1px] opacity-20"
              style={{ clipPath: 'polygon(20% 0%, 100% 20%, 80% 100%, 0% 100%)' }}
            />

            {/* Crystalline Center Refractive Sheen */}
            <div className="absolute top-0 right-28 w-40 h-full bg-gradient-to-b from-white/8 to-transparent skew-x-12 opacity-15 pointer-events-none" />

            {/* Apple Ambient Dynamic Glass Light Shimmer */}
            <div className="absolute inset-y-0 w-32 bg-gradient-to-r from-transparent via-white/8 to-transparent pointer-events-none animate-glass-shimmer opacity-20" />

            {/* Bottom Subtle Bevel Shadow */}
            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-black/30 pointer-events-none" />
          </div>

          <div className="relative z-10 flex items-center justify-between px-4 sm:px-6 md:px-8 py-2.5 sm:py-3">
            {/* Brand Logo with Apple-grade precision */}
            <a
              href="#"
              id="brand-logo"
              className="flex items-center gap-2.5 group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ccff00] rounded-full p-1"
            >
              {/* Geometric FigBits Icon with glass backing */}
              <div className="relative w-8 h-8 rounded-xl bg-gradient-to-br from-white/15 to-white/5 border border-white/20 flex items-center justify-center p-1.5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] group-hover:border-[#ccff00]/60 transition-all duration-300">
                <div className="w-full h-full relative">
                  <span 
                    className="absolute inset-0 rounded-sm bg-[#ccff00] opacity-90 group-hover:opacity-100 transition-opacity" 
                    style={{ clipPath: 'polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%, 25% 50%)' }} 
                  />
                  <span className="absolute inset-[2px] rounded-sm bg-[#08080a] flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00] shadow-[0_0_8px_#ccff00]" />
                  </span>
                </div>
              </div>

              <div className="flex items-baseline">
                <span className="font-display font-extrabold text-xl tracking-tight text-white group-hover:text-white/95">
                  FigBits
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00] ml-1 shadow-[0_0_8px_#ccff00]" />
              </div>
            </a>

            {/* Desktop Navigation Links — Apple Frosted Pill Buttons */}
            <nav className="hidden md:flex items-center gap-1.5 lg:gap-2" aria-label="Main Navigation">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="px-3.5 py-1.5 rounded-full text-[13px] font-medium text-neutral-300 hover:text-white hover:bg-white/[0.08] active:bg-white/[0.14] transition-all duration-200 relative group focus:outline-none focus-visible:ring-1 focus-visible:ring-[#ccff00]"
                >
                  <span>{link.label}</span>
                  {/* Subtle hover indicator dot */}
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#ccff00] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </a>
              ))}
            </nav>

            {/* Right Action Buttons */}
            <div className="hidden sm:flex items-center gap-2.5">
              {/* Frosted Glass Showreel Button */}
              <button
                id="header-showreel-btn"
                onClick={onShowreelClick}
                className="hidden lg:flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-neutral-200 hover:text-white bg-white/[0.06] hover:bg-white/[0.12] rounded-full border border-white/15 backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.25)] transition-all duration-200 active:scale-95"
                title="Watch quick showreel"
              >
                <Play className="w-3 h-3 text-[#ccff00] fill-[#ccff00]" />
                <span>Showreel</span>
              </button>

              {/* Luminous Apple-Style CTA Button */}
              <button
                id="header-book-call-btn"
                onClick={onBookCallClick}
                className="group relative inline-flex items-center gap-2 px-5 py-2 text-xs sm:text-sm font-semibold text-[#0a0a0d] bg-[#ccff00] hover:bg-[#d8ff33] rounded-full transition-all duration-200 shadow-[0_0_24px_rgba(204,255,0,0.35),inset_0_1px_1px_rgba(255,255,255,0.6)] hover:shadow-[0_0_35px_rgba(204,255,0,0.55)] active:scale-95"
              >
                <span>Book a Call</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>

            {/* Mobile Hamburger Controls */}
            <div className="flex sm:hidden items-center gap-2">
              <button
                id="mobile-book-call-mini"
                onClick={onBookCallClick}
                className="px-3 py-1.5 text-xs font-semibold text-black bg-[#ccff00] rounded-full shadow-[0_0_15px_rgba(204,255,0,0.3)]"
              >
                Book
              </button>
              <button
                id="mobile-menu-toggle"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-neutral-300 hover:text-white rounded-full bg-white/5 border border-white/10 focus:outline-none"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu Dropdown with matching Apple Fractal Glass */}
          {mobileMenuOpen && (
            <div className="sm:hidden border-t border-white/10 px-5 py-4 bg-[#0d0d12]/95 backdrop-blur-2xl space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="grid grid-cols-2 gap-2 pb-2">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-3 py-2 text-sm text-neutral-200 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onShowreelClick();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-medium text-neutral-200 bg-white/5 rounded-xl border border-white/10"
                >
                  <Play className="w-3.5 h-3.5 text-[#ccff00] fill-[#ccff00]" />
                  <span>Watch Featured Showreel</span>
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onBookCallClick();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 text-sm font-semibold text-black bg-[#ccff00] rounded-xl shadow-[0_0_20px_rgba(204,255,0,0.3)]"
                >
                  <span>Book a Call Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
