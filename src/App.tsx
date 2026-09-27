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
import CursorGlow from './components/CursorGlow';
import GooeyCursor from './components/GooeyCursor';
import VideoPlayerModal from './components/VideoPlayerModal';
import GraphicDesignModal from './components/GraphicDesignModal';
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

  const handleOpenShorts = () => {
    const shortProject = VIDEO_PROJECTS.find((p) => p.videoId === 'dd0b5r9lxHE') || VIDEO_PROJECTS[1];
    setActiveVideo(shortProject);
  };

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
    setIsBookingOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-[#08080a] text-[#ededef] selection:bg-[#ccff00] selection:text-black font-sans">
      {/* Smooth Cursor Glow effect */}
      <CursorGlow />

      {/* Fluid Motion Gooey Cursor in Brand Color (#ccff00) */}
      <GooeyCursor />

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

        {/* Floating Typography Statement */}
        <StatementBanner onVideoClick={handleOpenShowreel} />

        {/* Projects Showcase with YouTube Videos, Overlays, and Graphic Design */}
        <ProjectsShowcase
          onSelectVideo={(project) => setActiveVideo(project)}
          onSelectGraphic={(graphic) => setActiveGraphic(graphic)}
        />

        {/* About Me Section */}
        <TestimonialsSection
          onShowreelClick={handleOpenShowreel}
          onBookCallClick={() => setIsBookingOpen(true)}
        />

        {/* Why Choose Us Case Studies */}
        <WhyChooseUs onShowreelClick={handleOpenShowreel} />

        {/* Work Process Steps */}
        <WorkProcess />

        {/* Pricing Plans */}
        <PricingSection onSelectPlan={handleSelectPlan} />

        {/* Book a Call Banner & Modal */}
        <BookCallSection
          isModalOpen={isBookingOpen}
          onOpenModal={() => setIsBookingOpen(true)}
          onCloseModal={() => setIsBookingOpen(false)}
          preselectedPlan={selectedPlan}
        />

        {/* FAQ Accordion */}
        <FaqSection />
      </main>

      {/* Footer with Behance, YouTube, and Instagram links */}
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
  );
}
