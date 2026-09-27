/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import FractalGlassHeader from './components/FractalGlassHeader';
import HeroSection, { HERO_SHOWCASE_PROJECT } from './components/HeroSection';
import PerformanceMetrics from './components/PerformanceMetrics';
import StatementBanner from './components/StatementBanner';
import ProjectsShowcase from './components/ProjectsShowcase';
import TestimonialsSection from './components/TestimonialsSection';
import WhyChooseUs from './components/WhyChooseUs';
import WorkProcess from './components/WorkProcess';
import PricingSection from './components/PricingSection';
import BookCallSection from './components/BookCallSection';
import FaqSection from './components/FaqSection';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import ScrollProgressBar from './components/ScrollProgressBar';
import VideoPlayerModal from './components/VideoPlayerModal';
import GraphicDesignModal from './components/GraphicDesignModal';
import { SmoothScrollProvider } from './context/SmoothScrollContext';
import { VIDEO_PROJECTS } from './data/portfolioData';
import { VideoProject, GraphicDesignProject } from './types';

export default function App() {
  const [activeVideo, setActiveVideo] = useState<VideoProject | null>(null);
  const [activeGraphic, setActiveGraphic] = useState<GraphicDesignProject | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string>('Growth Tier');

  const handleOpenHeroVideo = () => {
    setActiveVideo(HERO_SHOWCASE_PROJECT);
  };

  const handleOpenShowreel = () => {
    const featuredProject = VIDEO_PROJECTS.find((p) => p.videoId === 'DV3tNChkCvE') || VIDEO_PROJECTS[0];
    setActiveVideo(featuredProject);
  };

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
    setIsBookingOpen(true);
  };

  const isAnyModalOpen = isBookingOpen || !!activeVideo || !!activeGraphic;

  return (
    <SmoothScrollProvider isModalOpen={isAnyModalOpen}>
      <div className="relative min-h-screen bg-[#08080a] text-[#ededef] selection:bg-[#ccff00] selection:text-black font-sans">
        {/* Subtle 2px glowing scroll progress line at top of viewport */}
        <ScrollProgressBar />

        {/* High-performance, Framer-inspired custom cursor for desktop */}
        <CustomCursor />

        {/* Fractal Glass Navigation Header */}
        <FractalGlassHeader
          onBookCallClick={() => setIsBookingOpen(true)}
          onShowreelClick={handleOpenHeroVideo}
        />

        {/* Main Content Sections */}
        <main id="main-content" tabIndex={-1}>
          {/* Hero Section */}
          <HeroSection
            onBookCallClick={() => setIsBookingOpen(true)}
            onShowreelClick={handleOpenHeroVideo}
            onPlayHeroVideo={handleOpenHeroVideo}
          />

          {/* Performance Metrics */}
          <PerformanceMetrics />

          {/* Floating Typography Statement with Scroll-Linked Parallax */}
          <StatementBanner onVideoClick={handleOpenShowreel} />

          {/* Projects Showcase with Framer Category Tabs, Overlays, and Smooth Zoom */}
          <ProjectsShowcase
            onSelectVideo={(project) => setActiveVideo(project)}
            onSelectGraphic={(graphic) => setActiveGraphic(graphic)}
          />

          {/* About Me Section with Scroll Parallax */}
          <TestimonialsSection
            onShowreelClick={handleOpenShowreel}
            onBookCallClick={() => setIsBookingOpen(true)}
          />

          {/* Why Choose Us Case Studies */}
          <WhyChooseUs onShowreelClick={handleOpenShowreel} />

          {/* Work Process Steps */}
          <WorkProcess />

          {/* Pricing Plans with Micro-interactions */}
          <PricingSection onSelectPlan={handleSelectPlan} />

          {/* Book a Call Banner & Modal */}
          <BookCallSection
            isModalOpen={isBookingOpen}
            onOpenModal={() => setIsBookingOpen(true)}
            onCloseModal={() => setIsBookingOpen(false)}
            preselectedPlan={selectedPlan}
          />

          {/* FAQ Accordion with Spring Transitions */}
          <FaqSection />
        </main>

        {/* Footer with Lenis-powered Back-to-Top and Social Links */}
        <Footer />

        {/* Video Modal Player with YouTube integration */}
        <VideoPlayerModal
          project={activeVideo}
          onClose={() => setActiveVideo(null)}
        />

        {/* Graphic Design Artwork Modal */}
        <GraphicDesignModal
          graphic={activeGraphic}
          onClose={() => setActiveGraphic(null)}
        />
      </div>
    </SmoothScrollProvider>
  );
}
