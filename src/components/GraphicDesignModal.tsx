import React, { useEffect } from 'react';
import { X, Sparkles, Download, Layers } from 'lucide-react';
import { GraphicDesignProject } from '../types';

interface GraphicDesignModalProps {
  graphic: GraphicDesignProject | null;
  onClose: () => void;
}

export default function GraphicDesignModal({ graphic, onClose }: GraphicDesignModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (graphic) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [graphic, onClose]);

  if (!graphic) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="graphic-modal-title"
    >
      <div
        className="relative w-full max-w-4xl rounded-3xl bg-[#0e0e14] border border-white/15 overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.8)] flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 bg-[#12121a]">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[11px] font-mono uppercase bg-[#ccff00] text-black font-bold">
              {graphic.category}
            </span>
            <span className="text-xs text-neutral-400 font-medium">Graphic Artwork Preview</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors"
            aria-label="Close image modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="relative bg-[#08080a] flex items-center justify-center p-4 sm:p-8 overflow-auto max-h-[65vh]">
          <img
            src={graphic.image}
            alt={graphic.title}
            className="max-h-[55vh] w-auto object-contain rounded-xl shadow-2xl border border-white/10"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="p-5 sm:p-6 bg-[#0e0e14] border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 id="graphic-modal-title" className="font-display text-lg sm:text-xl font-bold text-white">
              {graphic.title}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-xl">
              {graphic.description}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex flex-wrap gap-1.5">
              {graphic.tools.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 text-xs font-mono text-neutral-300 bg-white/5 rounded-md border border-white/10"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
