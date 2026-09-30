import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { FAQ_DATA } from '../data/portfolioData';
import { EASINGS, staggerContainer, itemFadeUp } from './motion/MotionVariants';
import { useCardGlow, CardGlowOverlay } from './InteractiveGlow';

function FaqItemCard({
  item,
  isOpen,
  onToggle,
}: {
  item: typeof FAQ_DATA[number];
  isOpen: boolean;
  onToggle: () => void;
}) {
  const { glowProps, mousePos } = useCardGlow();

  return (
    <motion.div
      variants={itemFadeUp}
      {...glowProps}
      className={`relative rounded-2xl transition-colors duration-300 border overflow-hidden ${
        isOpen
          ? 'bg-[#12121c] border-[#ccff00]/40 shadow-[0_4px_20px_rgba(0,0,0,0.4)]'
          : 'bg-[#0e0e14] border-white/10 hover:border-white/20'
      }`}
    >
      <CardGlowOverlay
        mousePos={mousePos}
        roundedClassName="rounded-2xl"
        primaryGlowSize={320}
        coreGlowSize={140}
        borderGlowSize={320}
      />

      <div className="relative z-10">
        <button
          type="button"
          onClick={onToggle}
          className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ccff00] rounded-2xl cursor-pointer"
          aria-expanded={isOpen}
        >
          <span className="font-display text-base sm:text-lg font-bold text-white pr-4">
            {item.question}
          </span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.25, ease: EASINGS.smoothOut }}
            className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
              isOpen ? 'bg-[#ccff00] text-black' : 'bg-white/5 text-neutral-400'
            }`}
          >
            {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          </motion.div>
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="content"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: EASINGS.smoothOut }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-neutral-300 leading-relaxed border-t border-white/5">
                {item.answer}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function FaqSection() {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const toggleFaq = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-16 sm:py-24 px-4 sm:px-6 relative">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: EASINGS.cinematic }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Frequently asked <span className="text-lime-glow">questions?</span>
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 mt-3 max-w-lg mx-auto">
            Everything you need to know about our editing workflow, turnaround, and deliverables.
          </p>
        </motion.div>

        {/* FAQ Accordion List with staggered entrance */}
        <motion.div
          variants={staggerContainer(0.08, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="space-y-4"
        >
          {FAQ_DATA.map((item) => (
            <FaqItemCard
              key={item.id}
              item={item}
              isOpen={openId === item.id}
              onToggle={() => toggleFaq(item.id)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
