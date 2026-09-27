import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { EASINGS } from './motion/MotionVariants';

const VIDEO_THUMBNAIL =
  "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=400&q=80";

interface StatementBannerProps {
  onVideoClick?: () => void;
}

export default function StatementBanner({ onVideoClick }: StatementBannerProps) {
  const bannerRef = useRef<HTMLElement>(null);

  // Scroll-linked continuous transformation for subtle Framer-grade inertia
  const { scrollYProgress } = useScroll({
    target: bannerRef,
    offset: ['start end', 'end start'],
  });

  const topRowX = useTransform(scrollYProgress, [0, 1], [-18, 18]);
  const bottomRowX = useTransform(scrollYProgress, [0, 1], [18, -18]);
  const videoScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1.06, 0.95]);

  return (
    <section
      ref={bannerRef}
      className="hero-copy py-12 sm:py-20 px-4 sm:px-6 relative overflow-hidden"
    >
      {/* Container aligned with max-w-6xl */}
      <div className="max-w-6xl mx-auto text-center w-full flex flex-col items-center justify-center font-display font-black tracking-[-1px] sm:tracking-[-1.5px] md:tracking-[-2px]">
        
        <div className="w-full max-w-[1080px] mx-auto flex flex-col items-center justify-center">
          
          {/* TOP TEXT LAYER with scroll-linked horizontal drift */}
          <motion.div
            style={{ x: topRowX }}
            initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.75, ease: EASINGS.cinematic }}
            className="text-row top-row text-[20px] sm:text-[30px] md:text-[38px] lg:text-[44px] xl:text-[48px] leading-[1.22] sm:leading-[1.2] text-center will-change-transform"
          >
            <GradientText>
              We create, edit, and market
            </GradientText>
          </motion.div>

          {/* MIDDLE AUTO LAYOUT — HORIZONTAL */}
          <motion.div
            initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.75, delay: 0.1, ease: EASINGS.cinematic }}
            className="text-row middle-row flex items-center justify-center flex-wrap sm:flex-nowrap gap-2 sm:gap-3 md:gap-3.5 my-1 sm:my-2 text-[20px] sm:text-[30px] md:text-[38px] lg:text-[44px] xl:text-[48px] leading-[1.22] sm:leading-[1.2]"
          >
            {/* TEXT LAYER 01 */}
            <GradientText>
              videos whether
            </GradientText>

            {/* VIDEO LAYER PILL with scroll-linked scale + hover interaction */}
            <motion.div
              style={{ scale: videoScale }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="video-wrapper project-card-interactive relative inline-flex items-center justify-center shrink-0 w-[54px] h-[30px] sm:w-[72px] sm:h-[38px] md:w-[86px] md:h-[44px] lg:w-[98px] lg:h-[48px] rounded-full overflow-hidden border border-white/25 shadow-[0_0_25px_rgba(204,255,0,0.18)] group cursor-pointer transition-colors duration-300 hover:border-[#ccff00] hover:shadow-[0_0_30px_rgba(204,255,0,0.35)]"
              onClick={onVideoClick}
              role="button"
              tabIndex={0}
              aria-label="Play sample video"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onVideoClick?.();
                }
              }}
            >
              <img
                src={VIDEO_THUMBNAIL}
                alt="Video preview"
                className="video-thumbnail w-full h-full object-cover filter brightness-90 contrast-105 group-hover:scale-110 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />

              <div className="play-button absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/25 transition-colors">
                <span className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 rounded-full bg-[#ccff00] text-black flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110">
                  <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-current ml-0.5" viewBox="0 0 24 24">
                    <polygon points="6 4 20 12 6 20 6 4" />
                  </svg>
                </span>
              </div>
            </motion.div>

            {/* TEXT LAYER 02 */}
            <GradientText>
              filmed at your
            </GradientText>
          </motion.div>

          {/* BOTTOM TEXT LAYER with scroll-linked horizontal drift */}
          <motion.div
            style={{ x: bottomRowX }}
            initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.75, delay: 0.18, ease: EASINGS.cinematic }}
            className="text-row bottom-row text-[20px] sm:text-[30px] md:text-[38px] lg:text-[44px] xl:text-[48px] leading-[1.22] sm:leading-[1.2] text-center will-change-transform"
          >
            <GradientText>
              place or sent by you
            </GradientText>
          </motion.div>

        </div>

      </div>
    </section>
  );
}

/* Reusable gradient text layer */
function GradientText({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="gradient-text block select-none whitespace-nowrap"
      style={{
        background: 'linear-gradient(90deg, #64748b 0%, #FFFFFF 25%, #FFFFFF 75%, #64748b 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}
    >
      {children}
    </span>
  );
}
