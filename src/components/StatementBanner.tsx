import React from 'react';

const VIDEO_THUMBNAIL =
  "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=400&q=80";

interface StatementBannerProps {
  onVideoClick?: () => void;
}

export default function StatementBanner({ onVideoClick }: StatementBannerProps) {
  return (
    <section className="hero-copy py-12 sm:py-20 px-4 sm:px-6 relative overflow-hidden">
      {/* Container aligned with the Performance Card (max-w-6xl mx-auto) */}
      <div className="max-w-6xl mx-auto text-center w-full flex flex-col items-center justify-center font-display font-black tracking-[-1px] sm:tracking-[-1.5px] md:tracking-[-2px]">
        
        {/* Constrained text box strictly within the red line boundaries of the card */}
        <div className="w-full max-w-[1080px] mx-auto flex flex-col items-center justify-center">
          
          {/* TOP TEXT LAYER */}
          <div className="text-row top-row text-[20px] sm:text-[30px] md:text-[38px] lg:text-[44px] xl:text-[48px] leading-[1.22] sm:leading-[1.2] text-center">
            <GradientText>
              We create, edit, and market
            </GradientText>
          </div>

          {/* MIDDLE AUTO LAYOUT — HORIZONTAL */}
          <div className="text-row middle-row flex items-center justify-center flex-wrap sm:flex-nowrap gap-2 sm:gap-3 md:gap-3.5 my-1 sm:my-2 text-[20px] sm:text-[30px] md:text-[38px] lg:text-[44px] xl:text-[48px] leading-[1.22] sm:leading-[1.2]">
            
            {/* TEXT LAYER 01 */}
            <GradientText>
              videos whether
            </GradientText>

            {/* VIDEO LAYER PILL */}
            <div
              className="video-wrapper relative inline-flex items-center justify-center shrink-0 w-[54px] h-[30px] sm:w-[72px] sm:h-[38px] md:w-[86px] md:h-[44px] lg:w-[98px] lg:h-[48px] rounded-full overflow-hidden border border-white/25 shadow-[0_0_25px_rgba(204,255,0,0.18)] group cursor-pointer transition-all duration-300 hover:scale-105 hover:border-[#ccff00] hover:shadow-[0_0_30px_rgba(204,255,0,0.35)]"
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
            </div>

            {/* TEXT LAYER 02 */}
            <GradientText>
              filmed at your
            </GradientText>

          </div>

          {/* BOTTOM TEXT LAYER */}
          <div className="text-row bottom-row text-[20px] sm:text-[30px] md:text-[38px] lg:text-[44px] xl:text-[48px] leading-[1.22] sm:leading-[1.2] text-center">
            <GradientText>
              place or sent by you
            </GradientText>
          </div>

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
