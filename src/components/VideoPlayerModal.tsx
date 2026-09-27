import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize, Minimize } from 'lucide-react';
import { VideoProject } from '../types';

interface VideoPlayerModalProps {
  project: VideoProject | null;
  onClose: () => void;
}

export default function VideoPlayerModal({ project, onClose }: VideoPlayerModalProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true); // Starts muted for reliable autoplay matching reference "Unmute" pill
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(90); // default duration
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hoverTime, setHoverTime] = useState<number | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const scrubberRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);

  // Parse duration if project has string duration like "01:30" or "02:45"
  useEffect(() => {
    if (project?.duration) {
      const parts = project.duration.split(':').map((p) => parseInt(p, 10));
      if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
        setDuration(parts[0] * 60 + parts[1]);
      } else if (parts.length === 3 && !isNaN(parts[0]) && !isNaN(parts[1]) && !isNaN(parts[2])) {
        setDuration(parts[0] * 3600 + parts[1] * 60 + parts[2]);
      }
    }
    setCurrentTime(0);
    setIsPlaying(true);
    setIsMuted(true);
  }, [project]);

  // Post message command helper to control YouTube iframe
  const postToIframe = useCallback((func: string, args: any[] = []) => {
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: 'command', func, args }),
        '*'
      );
    }
  }, []);

  // Listen to incoming messages from YouTube IFrame
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      try {
        const data = typeof e.data === 'string' ? JSON.parse(e.data) : e.data;
        if (data?.event === 'infoDelivery' && data?.info) {
          if (typeof data.info.currentTime === 'number') {
            setCurrentTime(data.info.currentTime);
          }
          if (typeof data.info.duration === 'number' && data.info.duration > 0) {
            setDuration(data.info.duration);
          }
          if (typeof data.info.playerState === 'number') {
            // 1 = playing, 2 = paused, 0 = ended
            setIsPlaying(data.info.playerState === 1);
          }
          if (typeof data.info.muted === 'boolean') {
            setIsMuted(data.info.muted);
          }
        }
      } catch {
        // Ignore non-json messages
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Smooth local timer interval for fluid scrubber progress
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentTime((prev) => {
        if (prev >= duration) return 0;
        return prev + 0.25;
      });
    }, 250);

    return () => clearInterval(interval);
  }, [isPlaying, duration]);

  // Keyboard navigation & lock body scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      } else if (e.key === 'm' || e.key === 'M') {
        toggleMute();
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
      }
    };

    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose, isPlaying, isMuted]);

  // Toggle play/pause
  const togglePlay = () => {
    if (isPlaying) {
      postToIframe('pauseVideo');
      setIsPlaying(false);
    } else {
      postToIframe('playVideo');
      setIsPlaying(true);
    }
  };

  // Toggle mute/unmute
  const toggleMute = () => {
    if (isMuted) {
      postToIframe('unMute');
      postToIframe('setVolume', [100]);
      setIsMuted(false);
    } else {
      postToIframe('mute');
      setIsMuted(true);
    }
  };

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // Seek time handler
  const seekToPosition = (clientX: number) => {
    if (!scrubberRef.current || duration <= 0) return;
    const rect = scrubberRef.current.getBoundingClientRect();
    const offsetX = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = offsetX / rect.width;
    const newTime = percent * duration;
    setCurrentTime(newTime);
    postToIframe('seekTo', [newTime, true]);
  };

  const handleScrubberClick = (e: React.MouseEvent<HTMLDivElement>) => {
    seekToPosition(e.clientX);
  };

  const handleScrubberMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    seekToPosition(e.clientX);

    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (isDraggingRef.current) {
        seekToPosition(moveEvent.clientX);
      }
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const handleScrubberHover = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrubberRef.current || duration <= 0) return;
    const rect = scrubberRef.current.getBoundingClientRect();
    const offsetX = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percent = offsetX / rect.width;
    setHoverTime(percent * duration);
  };

  // Format MM:SS
  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds < 0) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!project) return null;

  const videoId = project.videoId || '3_dCjH9rCEE';
  // Embed with controls=0 to use our custom reference controls matching image.png
  const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&enablejsapi=1&controls=0&rel=0&playsinline=1&modestbranding=1&loop=1`;

  const progressPercent = duration > 0 ? Math.min(100, Math.max(0, (currentTime / duration) * 100)) : 0;

  return (
    <div
      id="video-popup-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Video Showcase Player"
    >
      {/* Centered Video Frame (Matching reference screenshot image.png) */}
      <div
        ref={containerRef}
        id="video-popup-window"
        className="relative w-full max-w-5xl aspect-video rounded-2xl sm:rounded-3xl overflow-hidden bg-black border border-white/15 shadow-[0_30px_90px_rgba(0,0,0,0.95)] ring-1 ring-white/5 select-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Center: Reference Style 'Unmute' / 'Mute' Pill Button */}
        <button
          type="button"
          id="video-popup-unmute-btn"
          onClick={toggleMute}
          className="absolute top-4 sm:top-5 left-1/2 -translate-x-1/2 z-30 px-5 py-1.5 rounded-full bg-black text-white text-xs sm:text-sm font-semibold tracking-tight shadow-[0_4px_25px_rgba(0,0,0,0.8)] border border-white/15 hover:border-white/30 hover:bg-neutral-900 transition-all duration-200 cursor-pointer select-none active:scale-95"
        >
          {isMuted ? 'Unmute' : 'Mute'}
        </button>

        {/* Top Right: Circular Reference Style Close Button 'X' */}
        <button
          type="button"
          id="video-popup-close-btn"
          onClick={onClose}
          aria-label="Close video"
          className="absolute top-4 sm:top-5 right-4 sm:right-5 z-30 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/75 hover:bg-black text-white flex items-center justify-center border border-white/15 hover:border-white/30 transition-all duration-200 shadow-xl cursor-pointer hover:scale-105 active:scale-95"
        >
          <X className="w-5 h-5 stroke-[2.5]" />
        </button>

        {/* Video Surface */}
        <div className="relative w-full h-full bg-black">
          <iframe
            ref={iframeRef}
            id="video-popup-iframe"
            src={embedUrl}
            title={project.title || 'Video Showcase'}
            className="w-full h-full border-0 absolute inset-0 pointer-events-auto"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>

        {/* Bottom Custom Controls Bar (Exact layout from image.png) */}
        <div
          id="video-popup-controls-bar"
          className="absolute bottom-0 left-0 right-0 p-3.5 sm:p-5 z-30 bg-gradient-to-t from-black/95 via-black/60 to-transparent flex items-center gap-3 sm:gap-4 pointer-events-auto"
        >
          {/* Play / Pause Button */}
          <button
            type="button"
            id="video-popup-playpause-btn"
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pause' : 'Play'}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-black/90 hover:bg-black border border-white/15 hover:border-white/30 text-white flex items-center justify-center transition-all shadow-md active:scale-95 cursor-pointer shrink-0"
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 sm:w-5 sm:h-5 fill-white text-white" />
            ) : (
              <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-white text-white ml-0.5" />
            )}
          </button>

          {/* Scrubber Timeline Track */}
          <div
            ref={scrubberRef}
            id="video-popup-timeline-scrubber"
            onClick={handleScrubberClick}
            onMouseDown={handleScrubberMouseDown}
            onMouseMove={handleScrubberHover}
            onMouseLeave={() => setHoverTime(null)}
            className="relative flex-1 flex items-center h-8 cursor-pointer group select-none py-3"
          >
            {/* Dark background track */}
            <div className="w-full h-1 sm:h-1.5 bg-neutral-700/80 group-hover:bg-neutral-600/80 rounded-full relative transition-colors">
              {/* Cyan / Sky-blue Progress Fill matching reference image */}
              <div
                className="h-full bg-[#00a2ff] sm:bg-[#38bdf8] rounded-full relative transition-[width] duration-75 ease-linear"
                style={{ width: `${progressPercent}%` }}
              >
                {/* Playhead circular knob */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-white shadow-[0_0_8px_rgba(56,189,248,0.9)]" />

                {/* Floating white time tooltip badge (e.g. 00:03) right above the knob */}
                <div className="absolute -top-7 sm:-top-8 right-0 translate-x-1/2 px-2 py-0.5 rounded bg-white text-black text-[10px] sm:text-[11px] font-mono font-bold shadow-lg pointer-events-none whitespace-nowrap flex flex-col items-center">
                  <span>{formatTime(hoverTime ?? currentTime)}</span>
                  {/* Downward pointing triangle arrow */}
                  <div className="w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-white -mb-1" />
                </div>
              </div>
            </div>
          </div>

          {/* Volume / Mute Speaker Toggle */}
          <button
            type="button"
            id="video-popup-volume-btn"
            onClick={toggleMute}
            aria-label={isMuted ? 'Unmute' : 'Mute'}
            className="p-2 text-neutral-300 hover:text-white transition-colors cursor-pointer rounded-lg hover:bg-white/10 active:scale-95 shrink-0"
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" />
            ) : (
              <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />
            )}
          </button>

          {/* Fullscreen Toggle */}
          <button
            type="button"
            id="video-popup-fullscreen-btn"
            onClick={toggleFullscreen}
            aria-label={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
            className="p-2 text-neutral-300 hover:text-white transition-colors cursor-pointer rounded-lg hover:bg-white/10 active:scale-95 shrink-0"
          >
            {isFullscreen ? (
              <Minimize className="w-4 h-4 sm:w-5 sm:h-5" />
            ) : (
              <Maximize className="w-4 h-4 sm:w-5 sm:h-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
