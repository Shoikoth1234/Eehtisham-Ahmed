import React from 'react';
import { Compass, Wand2, Rocket } from 'lucide-react';
import { PROCESS_STEPS } from '../data/portfolioData';

export default function WorkProcess() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Compass':
        return <Compass className="w-6 h-6 text-[#ccff00]" />;
      case 'Wand2':
        return <Wand2 className="w-6 h-6 text-[#ccff00]" />;
      case 'Rocket':
        return <Rocket className="w-6 h-6 text-[#ccff00]" />;
      default:
        return <Compass className="w-6 h-6 text-[#ccff00]" />;
    }
  };

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs sm:text-sm font-semibold tracking-widest text-neutral-400 uppercase">
            WORK PROCESS
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mt-2 tracking-tight">
            How we turn <span className="text-lime-glow">content into impact</span>
          </h2>
        </div>

        {/* 3 Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {PROCESS_STEPS.map((item) => (
            <div
              key={item.step}
              className="group relative rounded-3xl bg-[#0e0e14] border border-white/10 hover:border-[#ccff00]/40 p-6 sm:p-8 flex flex-col justify-between overflow-hidden transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:-translate-y-1"
            >
              {/* Massive background step number */}
              <span className="absolute -top-4 -right-2 font-inter font-black text-7xl sm:text-8xl text-white/[0.04] group-hover:text-[#ccff00]/[0.08] transition-colors pointer-events-none select-none">
                {item.step}
              </span>

              <div>
                {/* Icon Box */}
                <div className="w-12 h-12 rounded-2xl bg-[#181824] border border-white/10 flex items-center justify-center mb-6 shadow-md group-hover:border-[#ccff00]/30 transition-colors">
                  {getIcon(item.iconName)}
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold text-[#ccff00]">
                    STEP <span className="font-inter font-bold">{item.step}</span>
                  </span>
                </div>

                <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-3">
                  {item.title}
                </h3>

                <p className="text-sm text-neutral-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
