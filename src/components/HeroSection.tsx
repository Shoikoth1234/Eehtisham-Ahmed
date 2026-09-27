import React, { useState, useRef } from 'react';
import { ArrowUpRight, Play } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import { VideoProject } from '../types';
import VideoPlayerModal from './VideoPlayerModal';
import { EASINGS } from './motion/MotionVariants';

export const HERO_SHOWCASE_PROJECT: VideoProject = {
  id: 'hero-product-video',
  title: 'Product Videos That Just Work | Showcase Reel',
  category: 'saas',
  tags: ['Product Video', 'Motion Graphics', 'SaaS', '4K UHD'],
  videoId: '3_dCjH9rCEE',
  youtubeUrl: 'https://www.youtube.com/watch?v=3_dCjH9rCEE',
  thumbnailUrl: 'https://i.ytimg.com/vi/3_dCjH9rCEE/maxresdefault.jpg',
  duration: '01:45',
  client: 'MZ Media Style Showcase',
  isShort: false,
  resolution: '4K UHD',
};

interface HeroSectionProps {
  onBookCallClick: () => void;
  onShowreelClick: () => void;
  onPlayHeroVideo?: (project: VideoProject) => void;
}

export default function HeroSection({
  onBookCallClick,
  onShowreelClick,
  onPlayHeroVideo,
}: HeroSectionProps) {
  const [isLocalModalOpen, setIsLocalModalOpen] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const heroVideoId = '3_dCjH9rCEE';

  // Scroll-linked cinematic parallax for hero showcase visual
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const videoY = useTransform(scrollYProgress, [0, 1], [0, 48]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 0.97]);
  const ambientGlowY = useTransform(scrollYProgress, [0, 1], [0, 90]);

  const handleTriggerVideoPopup = () => {
    if (onPlayHeroVideo) {
      onPlayHeroVideo(HERO_SHOWCASE_PROJECT);
    } else if (onShowreelClick) {
      onShowreelClick();
    } else {
      setIsLocalModalOpen(true);
    }
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative pt-28 sm:pt-36 md:pt-40 pb-16 sm:pb-24 px-4 sm:px-6 overflow-hidden bg-[#07070a]"
    >
      {/* Ambient Mesh Background Lighting with scroll-linked depth */}
      <motion.div
        style={{ y: ambientGlowY }}
        className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-indigo-900/20 via-purple-900/10 to-transparent blur-[140px] pointer-events-none -translate-x-1/3 -translate-y-1/3"
      />
      <motion.div
        style={{ y: ambientGlowY }}
        className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-[#ccff00]/10 via-emerald-900/10 to-transparent blur-[160px] pointer-events-none translate-x-1/3"
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-gradient-to-r from-blue-900/10 via-purple-900/10 to-[#ccff00]/5 blur-[160px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto flex flex-col items-center">
        {/* 1. Creator Trust Badge Pill */}
        <motion.div
          id="hero-trust-badge"
          initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.65, delay: 0.1, ease: EASINGS.cinematic }}
          className="inline-flex items-center gap-3 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#0a0a0f] border border-white/10 shadow-[0_4px_25px_rgba(0,0,0,0.6)] mb-8 sm:mb-10 backdrop-blur-md hover:border-white/25 transition-all duration-300"
        >
          {/* Avatar stack */}
          <div className="flex -space-x-2 overflow-hidden items-center shrink-0">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop"
              alt="Creator"
              className="inline-block h-6 w-6 sm:h-7 sm:w-7 rounded-full ring-2 ring-[#0a0a0f] object-cover"
              referrerPolicy="no-referrer"
            />
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop"
              alt="Creator"
              className="inline-block h-6 w-6 sm:h-7 sm:w-7 rounded-full ring-2 ring-[#0a0a0f] object-cover"
              referrerPolicy="no-referrer"
            />
            <img
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=120&auto=format&fit=crop"
              alt="Creator"
              className="inline-block h-6 w-6 sm:h-7 sm:w-7 rounded-full ring-2 ring-[#0a0a0f] object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <span className="text-xs sm:text-sm font-medium tracking-tight text-white select-none whitespace-nowrap">
            Trusted by <span className="text-[#ededf5]">100+ creators</span>
          </span>
        </motion.div>

        {/* 2. Hero Title & 3. Supporting Text */}
        <div className="text-center max-w-4xl mx-auto mb-6">
          <motion.h1
            initial={{ opacity: 0, y: 28, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.75, delay: 0.22, ease: EASINGS.cinematic }}
            className="font-display text-[38px] sm:text-[54px] md:text-[68px] lg:text-[76px] font-extrabold tracking-[-2px] leading-[1.08] text-white"
          >
            Product videos that{' '}
            <span className="bg-gradient-to-r from-white via-[#e8ff80] to-[#ccff00] bg-clip-text text-transparent">
              just work
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.7, delay: 0.36, ease: EASINGS.smoothOut }}
            className="mt-5 text-base sm:text-lg md:text-xl text-neutral-300 font-normal leading-relaxed max-w-2xl mx-auto"
          >
            Eehtisham helps creators and brands transform raw footage into scroll-stopping, high-retention video content that drives engagement, reach, and conversions.
          </motion.p>
        </div>

        {/* 4. Hero CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.65, delay: 0.48, ease: EASINGS.smoothOut }}
          className="flex flex-col sm:flex-row items-center gap-4 mb-10 sm:mb-14"
        >
          <motion.button
            id="hero-book-call-cta"
            whileHover={{ scale: 1.025 }}
            whileTap={{ scale: 0.98 }}
            onClick={onBookCallClick}
            className="group relative pl-7 pr-2.5 py-2.5 rounded-full bg-[#ccff00] hover:bg-[#d8ff33] text-[#08080a] font-bold text-sm sm:text-base flex items-center gap-3.5 transition-colors duration-200 shadow-[0_0_35px_rgba(204,255,0,0.4)] hover:shadow-[0_0_50px_rgba(204,255,0,0.65)] cursor-pointer"
          >
            <span className="font-display tracking-tight">Get your Product Video</span>
            <div className="w-8 h-8 rounded-full bg-[#08080a] text-[#ccff00] flex items-center justify-center transition-transform duration-300 group-hover:rotate-45">
              <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
            </div>
          </motion.button>

          <motion.button
            id="hero-watch-reel-cta"
            whileHover={{ scale: 1.025 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleTriggerVideoPopup}
            className="group px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border border-white/10 hover:border-white/25 transition-all text-sm font-semibold flex items-center gap-2 cursor-pointer"
          >
            <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#ccff00]/20 transition-colors">
              <Play className="w-2.5 h-2.5 text-[#ccff00] fill-[#ccff00] ml-0.5" />
            </div>
            <span>Watch Showreel</span>
          </motion.button>
        </motion.div>

        {/* 5. HERO SHOWCASE VIDEO CONTAINER with scroll-linked depth & entrance */}
        <motion.div
          initial={{ opacity: 0, y: 36, scale: 0.97, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.85, delay: 0.6, ease: EASINGS.cinematic }}
          style={{ y: videoY, scale: videoScale }}
          className="w-full max-w-5xl mx-auto relative will-change-transform"
        >
          <div
            id="hero-video-container"
            onClick={handleTriggerVideoPopup}
            className="project-card-interactive relative rounded-2xl sm:rounded-3xl border border-white/15 hover:border-white/30 overflow-hidden shadow-[0_25px_85px_rgba(0,0,0,0.9)] bg-black transition-all duration-300 cursor-pointer group"
          >
            {/* 16:9 Aspect Ratio Frame */}
            <div className="relative aspect-video w-full overflow-hidden bg-[#07070a]">
              {/* High Quality Thumbnail with hover zoom */}
              <img
                src={`https://i.ytimg.com/vi/${heroVideoId}/maxresdefault.jpg`}
                alt="Product Video Showcase"
                onError={(e) => {
                  e.currentTarget.src = `https://i.ytimg.com/vi/${heroVideoId}/hqdefault.jpg`;
                }}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out filter brightness-95 contrast-105"
                referrerPolicy="no-referrer"
              />

              {/* Cinematic Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30 opacity-60 group-hover:opacity-40 transition-opacity duration-300" />

              {/* Centered Frosted Glass Play Button */}
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <button
                  type="button"
                  id="hero-play-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTriggerVideoPopup();
                  }}
                  aria-label="Play showcase video in pop-up modal"
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-black/50 backdrop-blur-md border border-white/30 flex items-center justify-center text-white transition-all duration-300 group-hover:scale-110 group-hover:bg-[#ccff00] group-hover:text-black group-hover:border-[#ccff00] group-hover:shadow-[0_0_40px_rgba(204,255,0,0.7)] shadow-2xl cursor-pointer"
                >
                  <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-current ml-1" />
                </button>
              </div>
            </div>
          </div>

          {/* Floating 'Get Yours Next ↗' Tag */}
          <div className="flex justify-center -mt-4 sm:-mt-5 relative z-20">
            <motion.button
              type="button"
              id="hero-get-yours-next"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onBookCallClick}
              className="group inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#111116] hover:bg-[#ccff00] text-neutral-200 hover:text-black border border-white/20 hover:border-[#ccff00] transition-colors duration-200 text-xs sm:text-sm font-semibold shadow-[0_10px_30px_rgba(0,0,0,0.8)] hover:shadow-[0_0_25px_rgba(204,255,0,0.5)] cursor-pointer backdrop-blur-md"
            >
              <span>Get Yours Next</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Fallback Local Pop-up Modal */}
      {isLocalModalOpen && (
        <VideoPlayerModal
          project={HERO_SHOWCASE_PROJECT}
          onClose={() => setIsLocalModalOpen(false)}
        />
      )}
    </section>
  );
}
