import React, { useState, useRef } from 'react';
import { Calendar, CheckCircle2, ArrowRight, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BookingFormData } from '../types';
import { EASINGS } from './motion/MotionVariants';

interface BookCallSectionProps {
  isModalOpen: boolean;
  onOpenModal: () => void;
  onCloseModal: () => void;
  preselectedPlan?: string;
}

export default function BookCallSection({
  isModalOpen,
  onOpenModal,
  onCloseModal,
  preselectedPlan,
}: BookCallSectionProps) {
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    email: '',
    projectType: preselectedPlan || 'YouTube Videos',
    date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    timeSlot: '14:00 EST',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);

  // Mouse tracking state for cursor-following animated glow
  const [mousePos, setMousePos] = useState<{ x: number; y: number; isHovered: boolean }>({
    x: 0,
    y: 0,
    isHovered: false,
  });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      isHovered: true,
    });
  };

  const handleMouseEnter = () => {
    setMousePos((prev) => ({ ...prev, isHovered: true }));
  };

  const handleMouseLeave = () => {
    setMousePos((prev) => ({ ...prev, isHovered: false }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const timeSlots = ['10:00 AM EST', '01:30 PM EST', '03:00 PM EST', '05:30 PM EST'];

  return (
    <>
      {/* Banner Section with Interactive Cursor-Following Animated Glow */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 relative overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 32, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.75, ease: EASINGS.cinematic }}
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="relative rounded-3xl bg-[#0e0e14] border border-white/10 p-8 sm:p-12 md:p-16 text-center shadow-[0_25px_60px_rgba(0,0,0,0.6)] overflow-hidden transition-all duration-300 group"
          >
            {/* Primary Cursor-Following Radial Glow Effect */}
            <div
              className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full transition-opacity duration-300 ease-out"
              style={{
                left: `${mousePos.x}px`,
                top: `${mousePos.y}px`,
                width: '450px',
                height: '450px',
                background:
                  'radial-gradient(circle, rgba(204,255,0,0.22) 0%, rgba(204,255,0,0.08) 40%, rgba(0,255,180,0.03) 65%, transparent 75%)',
                filter: 'blur(50px)',
                opacity: mousePos.isHovered ? 1 : 0,
              }}
            />

            {/* Core Intense Neon Glow at Cursor Position */}
            <div
              className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full transition-opacity duration-200 ease-out"
              style={{
                left: `${mousePos.x}px`,
                top: `${mousePos.y}px`,
                width: '180px',
                height: '180px',
                background:
                  'radial-gradient(circle, rgba(204,255,0,0.4) 0%, rgba(204,255,0,0.12) 50%, transparent 80%)',
                filter: 'blur(25px)',
                opacity: mousePos.isHovered ? 1 : 0,
              }}
            />

            {/* Interactive Cursor-Reactive Border Glow Highlight */}
            <div
              className="pointer-events-none absolute inset-0 rounded-3xl transition-opacity duration-300"
              style={{
                opacity: mousePos.isHovered ? 1 : 0,
                background: `radial-gradient(500px circle at ${mousePos.x}px ${mousePos.y}px, rgba(204,255,0,0.35), transparent 45%)`,
                mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                maskComposite: 'exclude',
                WebkitMaskComposite: 'xor',
                padding: '1.5px',
              }}
            />

            <div className="relative z-10 max-w-2xl mx-auto">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold tracking-widest uppercase text-[#ccff00] bg-[#ccff00]/10 border border-[#ccff00]/25 mb-4 shadow-[0_0_15px_rgba(204,255,0,0.2)]">
                BOOK A CALL
              </span>

              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
                Let's level up your business!
              </h2>

              <p className="text-sm sm:text-base text-neutral-400 leading-relaxed mb-8 max-w-xl mx-auto">
                Let's discuss your content goals, editing needs, and the best way to help your brand grow
                through video.
              </p>

              <motion.button
                id="schedule-call-banner-btn"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onOpenModal}
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold text-black bg-[#ccff00] hover:bg-[#d9ff33] rounded-full transition-colors duration-200 shadow-[0_0_35px_rgba(204,255,0,0.4)] hover:shadow-[0_0_45px_rgba(204,255,0,0.6)] cursor-pointer"
              >
                <span>Schedule your call</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Interactive Booking Modal with Framer AnimatePresence */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md"
            onClick={onCloseModal}
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ duration: 0.3, ease: EASINGS.smoothOut }}
              className="relative w-full max-w-lg rounded-3xl bg-[#0e0e14] border border-white/15 p-6 sm:p-8 shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#ccff00]/10 border border-[#ccff00]/30 flex items-center justify-center text-[#ccff00]">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-white text-lg">
                      Schedule <span className="font-inter">15-Min</span> Strategy Call
                    </h3>
                    <p className="text-xs text-neutral-400">Directly with our creative director</p>
                  </div>
                </div>

                <button
                  onClick={onCloseModal}
                  className="p-1.5 text-neutral-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {submitted ? (
                <div className="py-12 text-center flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-[#ccff00]/20 border border-[#ccff00]/40 flex items-center justify-center text-[#ccff00] mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-display text-xl font-bold text-white mb-2">
                    Call Confirmed!
                  </h4>
                  <p className="text-sm text-neutral-300 max-w-xs mb-6">
                    Calendar invite and Google Meet link have been dispatched to{' '}
                    <span className="text-[#ccff00]">{formData.email || 'your email'}</span>.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      onCloseModal();
                    }}
                    className="px-6 py-2.5 rounded-full text-xs font-semibold bg-white/10 hover:bg-white/15 text-white cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">
                      Your Name or Channel Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Rivera / TechPulse"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#14141c] border border-white/10 text-white placeholder:text-neutral-500 text-sm focus:outline-none focus:border-[#ccff00] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alex@creatorlab.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#14141c] border border-white/10 text-white placeholder:text-neutral-500 text-sm focus:outline-none focus:border-[#ccff00] transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1">
                        Primary Project Focus
                      </label>
                      <select
                        value={formData.projectType}
                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl bg-[#14141c] border border-white/10 text-white text-xs focus:outline-none focus:border-[#ccff00]"
                      >
                        <option value="YouTube Videos">YouTube Long-Form</option>
                        <option value="Shorts / Reels">Shorts &amp; Reels</option>
                        <option value="SaaS Videos">SaaS Product Video</option>
                        <option value="Ad Creatives & VSL">Ad Creative / VSL</option>
                        <option value="Graphic Design">Graphic Design &amp; Thumbnails</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl bg-[#14141c] border border-white/10 text-white text-xs focus:outline-none focus:border-[#ccff00]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                      Select Time Window (EST)
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {timeSlots.map((slot) => (
                        <button
                          type="button"
                          key={slot}
                          onClick={() => setFormData({ ...formData, timeSlot: slot })}
                          className={`py-2 px-2.5 rounded-lg text-xs font-inter font-medium border transition-colors cursor-pointer ${
                            formData.timeSlot === slot
                              ? 'bg-[#ccff00] text-black border-[#ccff00]'
                              : 'bg-[#14141c] text-neutral-300 border-white/10 hover:border-white/20'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">
                      Channel / Social Link or Project Brief
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Drop your YouTube / Instagram URL or tell us about your footage volume..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-[#14141c] border border-white/10 text-white placeholder:text-neutral-500 text-xs focus:outline-none focus:border-[#ccff00]"
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl font-bold text-sm bg-[#ccff00] hover:bg-[#d8ff33] text-black transition-colors flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(204,255,0,0.3)] mt-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Confirm Strategy Call</span>
                  </motion.button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
