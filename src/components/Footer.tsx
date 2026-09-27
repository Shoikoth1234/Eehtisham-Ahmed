import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Youtube, Instagram, ArrowUp, Send, Sparkles } from 'lucide-react';
import { SOCIAL_LINKS, BRAND_INFO } from '../data/portfolioData';

// Custom Behance SVG Icon
function BehanceIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M7.799 6c1.171 0 2.064.24 2.68.72.615.48.923 1.169.923 2.067 0 .548-.13 1.012-.39 1.393a2.63 2.63 0 0 1-1.026.899c.563.26 1 .632 1.312 1.116.312.483.468 1.077.468 1.782 0 1.02-.34 1.815-1.02 2.385-.68.57-1.635.855-2.865.855H2V6h5.799zM5.04 10.154h2.466c.465 0 .825-.098 1.08-.293.255-.195.383-.495.383-.9 0-.42-.128-.727-.383-.923-.255-.195-.615-.293-1.08-.293H5.04v2.409zm0 4.606h2.646c.54 0 .952-.113 1.238-.338.285-.225.427-.57.427-1.035 0-.48-.142-.832-.427-1.057-.286-.225-.698-.338-1.238-.338H5.04v2.768zm11.238-3.376c-.99 0-1.748.278-2.273.833-.525.555-.832 1.35-.922 2.385h6.248c-.045-.96-.33-1.725-.855-2.295-.525-.57-1.257-.923-2.198-.923zm.18-2.61c1.875 0 3.3.562 4.275 1.687.975 1.125 1.463 2.67 1.463 4.635 0 .225-.015.54-.045.945h-9.15c.09 1.08.48 1.912 1.17 2.497.69.585 1.575.878 2.655.878 1.65 0 2.85-.615 3.6-1.845l2.4 1.425c-.705 1.11-1.635 1.95-2.79 2.52-1.155.57-2.49.855-4.005.855-2.19 0-3.952-.69-5.288-2.07C9.442 18.945 8.78 17.07 8.78 14.7c0-2.31.67-4.14 2.01-5.49 1.34-1.35 3.09-2.025 5.25-2.025zm-3.69-2.61h7.02v1.68h-7.02V6.16z" />
    </svg>
  );
}

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
    }, 3500);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#050508] border-t border-white/10 pt-16 sm:pt-20 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-[#ccff00]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-white/10">
          
          {/* Brand & Newsletter Column */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              {/* Brand Logo & Status */}
              <div className="flex items-center gap-3 mb-4">
                <a href="#" className="flex items-center gap-2.5 group">
                  <div className="relative w-9 h-9 rounded-full ring-2 ring-white/20 group-hover:ring-[#ccff00] overflow-hidden transition-all duration-300 shadow-[0_0_15px_rgba(204,255,0,0.25)] bg-[#0d0d14] flex-shrink-0">
                    <img
                      src={BRAND_INFO.logoUrl}
                      alt={BRAND_INFO.name}
                      className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-300 filter contrast-[1.05]"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <span className="font-display font-black text-2xl text-white tracking-tight">
                    {BRAND_INFO.name}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-[#ccff00] animate-pulse" />
                </a>

                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] font-mono text-neutral-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00] animate-pulse" />
                  <span>Available for Projects</span>
                </div>
              </div>

              <p className="text-sm sm:text-base text-neutral-400 max-w-lg leading-relaxed mb-8">
                Premium video editing and high-retention visual storytelling engineered to turn views into subscribers and high-ticket clients.
              </p>
            </div>

            {/* Newsletter Field */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.03] border border-white/10 max-w-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-white uppercase tracking-wider">
                  Subscribe to our newsletter
                </span>
                <span className="text-[11px] font-mono text-[#ccff00]">
                  Weekly Tips
                </span>
              </div>
              <p className="text-xs text-neutral-400 mb-4">
                Get high-retention editing breakdowns, storytelling tactics, and creative insights delivered to your inbox.
              </p>

              {subscribed ? (
                <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-[#ccff00]/10 border border-[#ccff00]/30 text-xs font-medium text-[#ccff00]">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Thank you! You have successfully subscribed.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 focus:border-[#ccff00] text-white placeholder:text-neutral-500 text-xs sm:text-sm outline-none transition-all"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-[#ccff00] hover:bg-[#d9ff33] active:scale-95 text-black font-bold text-xs sm:text-sm transition-all duration-200 flex items-center justify-center gap-1.5 shrink-0 cursor-pointer shadow-[0_0_15px_rgba(204,255,0,0.3)]"
                  >
                    <span>Subscribe</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Navigation Links & Connect With Us */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-8">
            
            {/* Quick Links */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-300 font-semibold mb-4">
                Navigation
              </h4>
              <ul className="space-y-3 text-sm text-neutral-400">
                <li>
                  <a href="#projects" className="hover:text-white hover:text-[#ccff00] transition-colors">
                    Selected Works
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-white hover:text-[#ccff00] transition-colors">
                    Services &amp; Capabilities
                  </a>
                </li>
                <li>
                  <a href="#process" className="hover:text-white hover:text-[#ccff00] transition-colors">
                    Our Workflow
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="hover:text-white hover:text-[#ccff00] transition-colors">
                    Pricing &amp; Plans
                  </a>
                </li>
                <li>
                  <a href="#testimonials" className="hover:text-white hover:text-[#ccff00] transition-colors">
                    Client Reviews
                  </a>
                </li>
                <li>
                  <a href="#faq" className="hover:text-white hover:text-[#ccff00] transition-colors">
                    Frequently Asked Questions
                  </a>
                </li>
              </ul>
            </div>

            {/* Connect With Us */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-300 font-semibold mb-4 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#ccff00]" />
                Connect With Us
              </h4>
              <p className="text-xs text-neutral-400 mb-4">
                Explore our full showcase and creative portfolios across major platforms:
              </p>

              <div className="space-y-2.5">
                {/* Behance Link */}
                <a
                  href={SOCIAL_LINKS.behance}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-blue-400/40 transition-all text-neutral-300 hover:text-white"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
                      <BehanceIcon className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-medium">Behance Portfolio</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                </a>

                {/* YouTube Link */}
                <a
                  href={SOCIAL_LINKS.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-red-400/40 transition-all text-neutral-300 hover:text-white"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-red-500/20 text-red-400 flex items-center justify-center">
                      <Youtube className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-medium">YouTube Channel</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                </a>

                {/* Instagram Link */}
                <a
                  href={SOCIAL_LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-pink-400/40 transition-all text-neutral-300 hover:text-white"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-pink-500/20 text-pink-400 flex items-center justify-center">
                      <Instagram className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-medium">Instagram</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                </a>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-neutral-500 font-mono text-center sm:text-left">
            &copy; {new Date().getFullYear()} {BRAND_INFO.name}. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-mono text-neutral-300 hover:text-white transition-all cursor-pointer group"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform text-[#ccff00]" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
