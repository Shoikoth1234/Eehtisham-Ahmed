import React, { useState } from 'react';
import { Play, Volume2, Maximize2, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { VIDEO_PROJECTS } from '../data/portfolioData';
import { VideoProject } from '../types';
import { EASINGS } from './motion/MotionVariants';

interface ProjectsShowcaseProps {
  onSelectVideo?: (project: VideoProject) => void;
  onSelectGraphic?: (graphic: any) => void;
}

export default function ProjectsShowcase({ onSelectVideo }: ProjectsShowcaseProps) {
  // Category tabs matching the user's uploaded image exactly
  const [activeTab, setActiveTab] = useState<string>('youtube');
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);

  const filterTabs = [
    { id: 'youtube', label: 'Youtube Videos' },
    { id: 'shorts', label: 'Shorts' },
    { id: 'saas', label: 'SAAS Videos' },
    { id: 'ads', label: 'Ad Creatives & VSL' },
  ];

  // Filter video projects by the selected category tab
  const categoryVideos = VIDEO_PROJECTS.filter((item) => {
    if (activeTab === 'youtube') return item.category === 'youtube';
    if (activeTab === 'shorts') return item.category === 'shorts';
    if (activeTab === 'saas') return item.category === 'saas';
    if (activeTab === 'ads') return item.category === 'ads';
    return true;
  });

  // Ensure we have a pool of videos; if a category has fewer than 4, borrow from all projects to fill 4 per view
  const displayVideos = categoryVideos.length >= 4 
    ? categoryVideos 
    : [...categoryVideos, ...VIDEO_PROJECTS.filter(v => v.category !== activeTab)].slice(0, 8);

  // Group into pages of 4 videos (2 columns x 2 rows)
  const pageSize = 4;
  const totalSlides = Math.max(1, Math.ceil(displayVideos.length / pageSize));
  const safeSlideIndex = Math.min(currentSlide, totalSlides - 1);
  const currentBatch = displayVideos.slice(safeSlideIndex * pageSize, (safeSlideIndex + 1) * pageSize);

  const handlePrevSlide = () => {
    setPlayingVideoId(null);
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : totalSlides - 1));
  };

  const handleNextSlide = () => {
    setPlayingVideoId(null);
    setCurrentSlide((prev) => (prev < totalSlides - 1 ? prev + 1 : 0));
  };

  const handleTabChange = (tabId: string) => {
    setPlayingVideoId(null);
    setActiveTab(tabId);
    setCurrentSlide(0);
  };

  const isShortsTab = activeTab === 'shorts';

  return (
    <section id="projects" className="py-16 sm:py-24 px-4 sm:px-6 relative overflow-hidden bg-[#060609]">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#ccff00]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: EASINGS.cinematic }}
          className="text-center max-w-2xl mx-auto mb-8 sm:mb-10"
        >
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Some of our latest <span className="text-[#ccff00]">projects</span>
          </h2>
        </motion.div>

        {/* Category Tabs with Framer sliding active pill */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASINGS.smoothOut }}
          className="flex items-center justify-center mb-10 sm:mb-14 overflow-x-auto no-scrollbar py-1"
        >
          <div className="inline-flex items-center gap-1 sm:gap-2 p-1.5 rounded-full bg-[#111118]/80 border border-white/10 backdrop-blur-md relative">
            {filterTabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`tab-${tab.id}`}
                  onClick={() => handleTabChange(tab.id)}
                  className={`relative px-5 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-colors duration-200 whitespace-nowrap cursor-pointer z-10 ${
                    isActive ? 'text-black font-bold' : 'text-neutral-300 hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeCategoryPill"
                      className="absolute inset-0 bg-[#ccff00] rounded-full shadow-[0_0_20px_rgba(204,255,0,0.4)] z-[-1]"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  {tab.label}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Slider Controls Header / Pagination indicator */}
        <div className="flex items-center justify-between mb-6 px-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#ccff00] animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">
              Showing 4 Selected Projects
            </span>
          </div>

          {/* Slider Prev / Next Controls */}
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={handlePrevSlide}
              aria-label="Previous video slide"
              className="w-9 h-9 rounded-full bg-[#14141c] hover:bg-[#20202c] border border-white/10 hover:border-[#ccff00]/50 text-white flex items-center justify-center transition-colors duration-200 shadow-md cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>
            <span className="text-xs font-mono text-neutral-400 px-1">
              0{safeSlideIndex + 1} / 0{totalSlides}
            </span>
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={handleNextSlide}
              aria-label="Next video slide"
              className="w-9 h-9 rounded-full bg-[#14141c] hover:bg-[#20202c] border border-white/10 hover:border-[#ccff00]/50 text-white flex items-center justify-center transition-colors duration-200 shadow-md cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        {/* Layout: 4 Columns for 9:16 Shorts, 2 Columns for 16:9 Landscape Videos */}
        <div
          className={
            isShortsTab
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6'
              : 'grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8'
          }
        >
          <AnimatePresence mode="popLayout">
            {currentBatch.map((project, index) => {
              const isPlaying = playingVideoId === project.id;
              return (
                <motion.div
                  key={`${activeTab}-${project.id}`}
                  initial={{ opacity: 0, y: 22, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.45, delay: index * 0.06, ease: EASINGS.smoothOut }}
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                  id={`project-card-${project.id}`}
                  className={`group relative rounded-2xl bg-black border overflow-hidden shadow-[0_15px_45px_rgba(0,0,0,0.8)] transition-all duration-300 flex flex-col will-change-transform ${
                    isShortsTab ? 'max-w-[320px] mx-auto w-full' : ''
                  } ${
                    isPlaying
                      ? 'border-[#ccff00] shadow-[0_20px_50px_rgba(204,255,0,0.25)] ring-1 ring-[#ccff00]/40'
                      : 'border-white/10 hover:border-[#ccff00]/50 hover:shadow-[0_20px_50px_rgba(204,255,0,0.15)]'
                  }`}
                >
                  {/* Video Player Frame with 9:16 dimension for Shorts, 16:9 aspect-video for standard */}
                  <div
                    className={`relative ${
                      isShortsTab ? 'aspect-[9/16]' : 'aspect-video'
                    } w-full overflow-hidden bg-[#07070a]`}
                  >
                    {isPlaying ? (
                      <div className="relative w-full h-full bg-black">
                        <iframe
                          src={`https://www.youtube-nocookie.com/embed/${project.videoId}?autoplay=1&controls=1&rel=0&playsinline=1&modestbranding=0`}
                          title={project.title}
                          className="w-full h-full border-0 absolute inset-0 z-20"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        />
                        {/* Stop / Return to preview button */}
                        <button
                          type="button"
                          id={`close-video-${project.id}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setPlayingVideoId(null);
                          }}
                          className="absolute top-2.5 right-2.5 z-30 px-3 py-1 rounded-full bg-black/85 hover:bg-black text-xs font-mono text-white/90 hover:text-[#ccff00] border border-white/20 hover:border-[#ccff00]/60 transition-colors shadow-xl cursor-pointer flex items-center gap-1.5 backdrop-blur-md"
                          title="Close video player"
                        >
                          <X className="w-3.5 h-3.5" />
                          <span>Stop</span>
                        </button>
                      </div>
                    ) : (
                      <div
                        className="project-card-interactive relative w-full h-full cursor-pointer overflow-hidden"
                        onClick={() => setPlayingVideoId(project.id)}
                      >
                        {/* Video Preview Image with subtle Framer-style zoom */}
                        <img
                          src={project.thumbnailUrl}
                          alt={project.title}
                          onError={(e) => {
                            if (project.videoId) {
                              e.currentTarget.src = `https://i.ytimg.com/vi/${project.videoId}/hqdefault.jpg`;
                            }
                          }}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out filter brightness-90 contrast-105"
                          referrerPolicy="no-referrer"
                        />

                        {/* Subtle Cinematic Vignette Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/40 opacity-80 group-hover:opacity-60 transition-opacity duration-300" />

                        {/* Centered Frosted Glass Play Button */}
                        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                          <div
                            className={`${
                              isShortsTab ? 'w-12 h-12 sm:w-14 sm:h-14' : 'w-14 h-14 sm:w-16 sm:h-16'
                            } rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-[#ccff00] group-hover:text-black group-hover:border-[#ccff00] group-hover:shadow-[0_0_30px_rgba(204,255,0,0.6)] transition-all duration-300 shadow-2xl`}
                          >
                            <Play className={`${isShortsTab ? 'w-5 h-5 sm:w-6 sm:h-6' : 'w-6 h-6 sm:w-7 sm:h-7'} ml-0.5 fill-current`} />
                          </div>
                        </div>

                        {/* Bottom Untitled UI Video Control Bar */}
                        <div className="absolute bottom-0 left-0 right-0 z-10 px-3 sm:px-4 py-3 bg-gradient-to-t from-black/95 via-black/70 to-transparent">
                          <div className="flex items-center gap-2 text-white">
                            <Play className="w-3.5 h-3.5 fill-current text-white shrink-0 group-hover:text-[#ccff00] transition-colors" />
                            <Volume2 className="w-3.5 h-3.5 text-neutral-300 shrink-0" />
                            <span className="text-[10px] sm:text-[11px] font-mono text-white/90 shrink-0">
                              Play
                            </span>

                            {/* Horizontal Scrubber Track */}
                            <div className="flex-1 relative flex items-center h-4 mx-1">
                              <div className="w-full h-1 bg-white/25 rounded-full overflow-hidden">
                                <div className="h-full bg-[#ccff00]/90 rounded-full w-[24%]" />
                              </div>
                              <div
                                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#ccff00] shadow-[0_0_8px_rgba(204,255,0,0.9)]"
                                style={{ left: '24%' }}
                              />
                            </div>

                            <span className="text-[10px] sm:text-[11px] font-mono text-[#ccff00] shrink-0 font-medium">
                              {project.duration || '9:16'}
                            </span>
                            <Maximize2 className="w-3.5 h-3.5 text-neutral-300 hover:text-white shrink-0" />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Bottom Slider Dots Pagination */}
        {totalSlides > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8 sm:mt-10">
            {Array.from({ length: totalSlides }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === safeSlideIndex
                    ? 'w-8 bg-[#ccff00] shadow-[0_0_10px_rgba(204,255,0,0.5)]'
                    : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
