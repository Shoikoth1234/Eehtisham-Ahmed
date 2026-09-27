import React, { useState, useRef } from 'react';
import { ArrowUpRight, Youtube, Instagram, Facebook } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import { SOCIAL_LINKS } from '../data/portfolioData';
import { EASINGS, staggerContainer, itemFadeUp } from './motion/MotionVariants';

interface AboutMeSectionProps {
  onShowreelClick?: () => void;
  onBookCallClick?: () => void;
}

const ABOUT_ME_IMAGE = 'https://i.postimg.cc/WbXFqhQP/Social-Post-Eehtisham-Ahmed.jpg';
const FALLBACK_PORTRAIT = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop';

export default function AboutMeSection({ onShowreelClick, onBookCallClick }: AboutMeSectionProps) {
  const [profileImg, setProfileImg] = useState<string>(ABOUT_ME_IMAGE);
  const sectionRef = useRef<HTMLElement>(null);

  // Subtle scroll-linked parallax depth for the portrait frame
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const photoY = useTransform(scrollYProgress, [0, 1], [-20, 20]);
  const glowY = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-20 sm:py-28 px-4 sm:px-6 relative overflow-hidden"
    >
      {/* Ambient background glow behind the glass with subtle parallax */}
      <motion.div
        style={{ y: glowY }}
        className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[550px] h-[550px] bg-[#ccff00]/10 rounded-full blur-[150px] pointer-events-none"
      />

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Photo with Social Icons & Open to Work Badge */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              style={{ y: photoY }}
              initial={{ opacity: 0, scale: 0.95, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, ease: EASINGS.cinematic }}
              className="relative w-full max-w-sm sm:max-w-md will-change-transform"
            >
              {/* Photo Frame Container */}
              <div className="relative rounded-[28px] sm:rounded-[36px] overflow-hidden bg-[#161622] border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.6)] group">
                <div className="relative aspect-[4/5] overflow-hidden bg-[#0d0d14]">
                  <img
                    src={profileImg}
                    alt="Eehtisham - Senior Video Editor"
                    onError={() => {
                      if (profileImg !== FALLBACK_PORTRAIT) {
                        setProfileImg(FALLBACK_PORTRAIT);
                      }
                    }}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out filter contrast-[1.05]"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle bottom shadow vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                  {/* Social Media Icons on Photo (Facebook, Instagram, YouTube) */}
                  <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 bg-black/65 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 shadow-lg">
                    <a
                      href={SOCIAL_LINKS.facebook || 'https://facebook.com'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-200 hover:text-[#1877F2] transition-colors p-1"
                      title="Facebook"
                    >
                      <Facebook className="w-4 h-4" />
                    </a>
                    <a
                      href={SOCIAL_LINKS.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-200 hover:text-[#E4405F] transition-colors p-1"
                      title="Instagram"
                    >
                      <Instagram className="w-4 h-4" />
                    </a>
                    <a
                      href={SOCIAL_LINKS.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-200 hover:text-[#FF0000] transition-colors p-1"
                      title="YouTube"
                    >
                      <Youtube className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Floating "Open TO WORK" Badge */}
              <div className="absolute -bottom-3 -right-2 sm:-bottom-4 sm:-right-3 z-20 px-4 sm:px-5 py-3 rounded-2xl bg-black/85 backdrop-blur-md border border-white/25 shadow-[0_12px_35px_rgba(0,0,0,0.8)] flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-[#ccff00] animate-pulse shadow-[0_0_10px_#ccff00]" />
                <div>
                  <span className="block text-sm sm:text-[15px] font-black tracking-tight text-[#ccff00] uppercase leading-tight">
                    Open
                  </span>
                  <span className="block text-[10px] sm:text-[11px] font-bold tracking-widest text-neutral-200 uppercase leading-tight">
                    TO WORK
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Information & Description */}
          <motion.div
            variants={staggerContainer(0.09, 0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            {/* Minimal Eyebrow Tag */}
            <motion.div variants={itemFadeUp} className="inline-flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#ccff00] animate-pulse" />
              <span className="text-xs font-mono font-bold tracking-widest text-[#ccff00] uppercase">
                ABOUT ME
              </span>
            </motion.div>

            {/* Display Heading exactly 48px on desktop */}
            <motion.h2
              variants={itemFadeUp}
              className="font-display text-3xl sm:text-4xl md:text-[48px] font-extrabold text-white tracking-tight leading-[1.15] mb-5"
            >
              Senior Video Editor &amp; Motion Artist.
            </motion.h2>

            {/* Shorter, punchy bio */}
            <motion.div variants={itemFadeUp} className="space-y-3 text-neutral-200 text-sm sm:text-base leading-relaxed max-w-xl mb-7">
              <p>
                I'm <strong className="text-white font-semibold">Eehtisham</strong>, lead video editor and motion designer. I help modern creators and brands turn raw takes into high-retention cinematic edits that command attention.
              </p>
              <p className="text-neutral-300">
                Through psychological pacing, dynamic typography, and punchy sound design, I engineer video content built to hook viewers from the first second.
              </p>
            </motion.div>

            {/* 4 Stats Grid */}
            <motion.div variants={itemFadeUp} className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-5 border-y border-white/15 mb-7">
              <div className="flex flex-col">
                <span className="font-inter font-black text-2xl sm:text-3xl text-white tracking-tight">5+</span>
                <span className="text-xs text-neutral-300 font-medium mt-1">Years Experience</span>
              </div>
              <div className="flex flex-col">
                <span className="font-inter font-black text-2xl sm:text-3xl text-[#ccff00] tracking-tight">100+</span>
                <span className="text-xs text-neutral-300 font-medium mt-1">Videos Delivered</span>
              </div>
              <div className="flex flex-col">
                <span className="font-inter font-black text-2xl sm:text-3xl text-white tracking-tight">15M+</span>
                <span className="text-xs text-neutral-300 font-medium mt-1">Client Views</span>
              </div>
              <div className="flex flex-col">
                <span className="font-inter font-black text-2xl sm:text-3xl text-[#ccff00] tracking-tight">24-48h</span>
                <span className="text-xs text-neutral-300 font-medium mt-1">Fast Turnaround</span>
              </div>
            </motion.div>

            {/* Action CTA Button */}
            {onBookCallClick && (
              <motion.div variants={itemFadeUp} className="flex items-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.025 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onBookCallClick}
                  className="group inline-flex items-center justify-center gap-2.5 px-8 py-3.5 text-sm sm:text-base font-bold text-black bg-[#ccff00] hover:bg-[#d8ff33] rounded-full transition-colors duration-200 shadow-[0_0_25px_rgba(204,255,0,0.35)] hover:shadow-[0_0_35px_rgba(204,255,0,0.55)] cursor-pointer"
                >
                  <span>Work With Me</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Alias export for backward-compatibility
export { AboutMeSection as TestimonialsSection };
