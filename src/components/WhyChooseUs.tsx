import React from 'react';
import { Play } from 'lucide-react';
import { motion } from 'motion/react';
import { CASE_STUDIES } from '../data/portfolioData';
import { EASINGS, staggerContainer, itemFadeUp } from './motion/MotionVariants';

interface WhyChooseUsProps {
  onShowreelClick: () => void;
}

export default function WhyChooseUs({ onShowreelClick }: WhyChooseUsProps) {
  return (
    <section id="services" className="py-16 sm:py-24 px-4 sm:px-6 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: EASINGS.cinematic }}
          className="text-center max-w-2xl mx-auto mb-12 sm:mb-16"
        >
          <span className="text-xs sm:text-sm font-semibold tracking-widest text-neutral-400 uppercase">
            WHY CHOOSE US
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mt-2 tracking-tight">
            Why we're the smart <span className="text-lime-glow">choice for growth</span>
          </h2>
        </motion.div>

        {/* Case Studies Stack with staggered reveals */}
        <motion.div
          variants={staggerContainer(0.12, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="space-y-8 sm:space-y-10"
        >
          {CASE_STUDIES.map((study) => (
            <motion.div
              key={study.id}
              variants={itemFadeUp}
              whileHover={{ y: -4, transition: { duration: 0.25, ease: EASINGS.smoothOut } }}
              className="group relative rounded-3xl bg-[#0e0e14] border border-white/10 hover:border-[#ccff00]/30 p-6 sm:p-8 md:p-10 shadow-[0_15px_40px_rgba(0,0,0,0.5)] transition-colors duration-300 will-change-transform"
            >
              <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${study.reversed ? 'lg:flex-row-reverse' : ''}`}>
                {/* Content Side */}
                <div className={`lg:col-span-7 flex flex-col justify-between ${study.reversed ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div>
                    <span className="inline-block px-3 py-1 rounded-md text-[11px] font-mono tracking-widest uppercase text-[#ccff00] bg-[#ccff00]/10 border border-[#ccff00]/25 mb-4 font-semibold">
                      {study.tag}
                    </span>

                    <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3 leading-snug">
                      {study.title}
                    </h3>

                    <p className="text-sm sm:text-base text-neutral-400 leading-relaxed mb-8">
                      {study.description}
                    </p>
                  </div>

                  {/* Growth Metrics */}
                  <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/10">
                    <div>
                      <div className="font-inter font-bold sm:font-extrabold text-3xl sm:text-4xl text-[#ccff00] tracking-tight">
                        {study.growthStat}
                      </div>
                      <div className="text-xs sm:text-sm text-neutral-300 font-medium mt-1">
                        {study.growthLabel}
                      </div>
                    </div>

                    <div>
                      <div className="font-inter font-bold sm:font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
                        {study.viewsStat}
                      </div>
                      <div className="text-xs sm:text-sm text-neutral-300 font-medium mt-1">
                        {study.viewsLabel}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Media Side */}
                <div className={`lg:col-span-5 ${study.reversed ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div
                    onClick={onShowreelClick}
                    className="project-card-interactive relative aspect-video rounded-2xl overflow-hidden bg-[#161622] border border-white/10 group-hover:border-[#ccff00]/40 shadow-xl cursor-pointer"
                  >
                    <img
                      src={study.previewUrl}
                      alt={study.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out filter brightness-95"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />

                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white group-hover:bg-[#ccff00] group-hover:text-black group-hover:scale-110 transition-all duration-300 shadow-lg">
                        <Play className="w-5 h-5 ml-0.5 fill-current" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
