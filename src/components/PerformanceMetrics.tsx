import React from 'react';
import { motion } from 'motion/react';
import { METRICS_DATA } from '../data/portfolioData';
import { EASINGS, staggerContainer, itemFadeUp } from './motion/MotionVariants';

export default function PerformanceMetrics() {
  return (
    <section id="features" className="py-8 sm:py-12 px-4 sm:px-6 relative">
      <div className="max-w-6xl mx-auto">
        {/* Main Performance Card Container */}
        <motion.div
          initial={{ opacity: 0, y: 32, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.75, ease: EASINGS.cinematic }}
          className="relative rounded-3xl bg-[#0e0e13]/90 border border-white/10 p-6 sm:p-10 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden"
        >
          {/* Subtle top subtle border glow */}
          <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-[#ccff00]/40 to-transparent pointer-events-none" />

          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASINGS.smoothOut }}
            className="text-center max-w-xl mx-auto mb-10 sm:mb-12"
          >
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-3">
              Performance That Speaks for Itself
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 font-normal">
              We do not just edit videos, We craft content designed to perform.
            </p>
          </motion.div>

          {/* 5 Metrics Grid with staggered entrance */}
          <motion.div
            variants={staggerContainer(0.08, 0.2)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-6 md:gap-8 justify-items-center"
          >
            {METRICS_DATA.map((item) => (
              <motion.div
                key={item.id}
                variants={itemFadeUp}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group relative flex flex-col items-center text-center cursor-default"
              >
                {/* Metric Number Box */}
                <div
                  className="w-[104px] h-[104px] rounded-[16px] bg-[#090C12] mb-3.5 flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(204,255,0,0.25)]"
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
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
