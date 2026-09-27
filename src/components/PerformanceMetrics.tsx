import React from 'react';
import { METRICS_DATA } from '../data/portfolioData';

export default function PerformanceMetrics() {
  return (
    <section id="features" className="py-8 sm:py-12 px-4 sm:px-6 relative">
      <div className="max-w-6xl mx-auto">
        {/* Main Performance Card Container matching the screenshot */}
        <div className="relative rounded-3xl bg-[#0e0e13]/90 border border-white/10 p-6 sm:p-10 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
          {/* Subtle top subtle border glow */}
          <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-[#ccff00]/40 to-transparent" />

          {/* Section Header */}
          <div className="text-center max-w-xl mx-auto mb-10 sm:mb-12">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-3">
              Performance That Speaks for Itself
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 font-normal">
              We do not just edit videos, We craft content designed to perform.
            </p>
          </div>

          {/* 5 Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-6 md:gap-8 justify-items-center">
            {METRICS_DATA.map((item) => (
              <div
                key={item.id}
                className="group relative flex flex-col items-center text-center transition-all duration-300"
              >
                {/* Metric Number Box matching exact Figma specifications */}
                <div
                  className="w-[104px] h-[104px] rounded-[16px] bg-[#090C12] mb-3.5 flex items-center justify-center transition-all duration-300 group-hover:scale-105"
                  style={{
                    backgroundColor: '#090C12',
                    borderRadius: '16px',
                    border: '1.5px solid rgba(204, 255, 0, 0.80)',
                    boxShadow: '4px 4px 0px rgba(204, 255, 0, 0.20)',
                  }}
                >
                  <span
                    className="font-inter font-semibold text-[40px] text-[#ccff00] leading-none select-none tracking-[-4px]"
                    style={{ letterSpacing: '-4px' }}
                  >
                    {item.value}
                  </span>
                </div>

                {/* Metric Label */}
                <span className="text-xs sm:text-sm font-semibold text-neutral-200 leading-snug max-w-[120px]">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
