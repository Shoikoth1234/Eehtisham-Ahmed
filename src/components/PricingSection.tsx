import React from 'react';
import { Check, Sparkles, ArrowRight } from 'lucide-react';
import { PRICING_PLANS } from '../data/portfolioData';

interface PricingSectionProps {
  onSelectPlan: (planId: string) => void;
}

export default function PricingSection({ onSelectPlan }: PricingSectionProps) {
  return (
    <section id="pricing" className="py-16 sm:py-24 px-4 sm:px-6 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs sm:text-sm font-semibold tracking-widest text-neutral-400 uppercase">
            PRICING PLANS
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mt-2 tracking-tight">
            Find the right plan <span className="text-lime-glow">for your content</span>
          </h2>
        </div>

        {/* 3 Pricing Cards Grid matching the screenshot */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {PRICING_PLANS.map((plan) => {
            const isHighlighted = plan.isPopular;
            return (
              <div
                key={plan.id}
                className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 shadow-[0_15px_40px_rgba(0,0,0,0.5)] ${
                  isHighlighted
                    ? 'bg-[#12121c] border-2 border-[#ccff00] md:-translate-y-2 shadow-[0_0_50px_rgba(204,255,0,0.15)]'
                    : 'bg-[#0e0e14] border border-white/10 hover:border-white/20'
                }`}
              >
                {/* Popular Pill */}
                {isHighlighted && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold text-black bg-[#ccff00] shadow-[0_0_15px_rgba(204,255,0,0.5)]">
                      <Sparkles className="w-3 h-3" />
                      MOST POPULAR
                    </span>
                  </div>
                )}

                <div>
                  {/* Plan Name */}
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-display text-lg font-bold tracking-wider text-white uppercase">
                      {plan.name}
                    </h3>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-1 mb-3">
                    <span className="font-inter text-4xl sm:text-5xl font-black text-white tracking-tight">
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-sm font-medium text-neutral-400">
                        {plan.period}
                      </span>
                    )}
                  </div>

                  {/* Plan Description */}
                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mb-6">
                    {plan.description}
                  </p>

                  {/* Features List */}
                  <div className="space-y-3 pt-6 border-t border-white/10 mb-8">
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-[#ccff00]/10 border border-[#ccff00]/30 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-[#ccff00]" />
                        </div>
                        <span className="text-xs sm:text-sm text-neutral-200">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => onSelectPlan(plan.id)}
                  className={`w-full py-3.5 px-6 rounded-full font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                    isHighlighted
                      ? 'bg-[#ccff00] hover:bg-[#d9ff33] text-black shadow-[0_0_25px_rgba(204,255,0,0.4)] hover:shadow-[0_0_35px_rgba(204,255,0,0.6)]'
                      : 'bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20'
                  }`}
                >
                  <span>{plan.buttonText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
