import React from 'react';
import ingredientsImg from '../assets/images/lumae_ingredients_1781540002245.jpg';
import aboutImg from '../assets/images/about_lifestyle_1781531690902.jpg';

export function HowItWorks() {
  return (
    <section className="py-12 md:py-[80px] bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="font-serif text-[40px] font-bold text-center text-[#1A1A1A] mb-16">
          Your 3-Step Glow Routine
        </h2>
        
        <div className="relative max-w-5xl mx-auto">
          {/* Dashed connector line for desktop */}
          <div className="hidden md:block absolute top-[40px] left-[16.66%] w-[66.66%] border-t border-dashed border-[#FFB3C0] z-0"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center">
              <div className="relative w-[80px] h-[80px] bg-[#FFEFED] border-2 border-[#FFB3C0] rounded-full flex items-center justify-center mb-6 z-10">
                <span className="absolute -top-2 -right-3 font-serif text-[18px] text-[#C9A84C] bg-white px-1 font-bold leading-none select-none">
                  01
                </span>
                <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
                  <path d="M24 6C24 6 10 20 10 30C10 37.7 16.3 44 24 44C31.7 44 38 37.7 38 30C38 20 24 6 24 6Z" fill="#FFEFED" stroke="#FF6C84" strokeWidth="2.5" strokeLinejoin="round"/>
                  <path d="M17 33C17 33 18 38 24 38" stroke="#FF6C84" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h3 className="font-serif font-bold text-[24px] text-[#1A1A1A] mb-2">Cleanse</h3>
              <p className="font-sans text-[15px] text-[#666666] leading-[1.6]">
                Start with a fresh canvas. Gently remove impurities without stripping natural oils.
              </p>
            </div>
            
            {/* Step 2 */}
            <div className="flex flex-col items-center text-center">
              <div className="relative w-[80px] h-[80px] bg-[#FFEFED] border-2 border-[#FFB3C0] rounded-full flex items-center justify-center mb-6 z-10">
                <span className="absolute -top-2 -right-3 font-serif text-[18px] text-[#C9A84C] bg-white px-1 font-bold leading-none select-none">
                  02
                </span>
                <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
                  <rect x="18" y="18" width="12" height="22" rx="6" fill="#FFEFED" stroke="#FF6C84" strokeWidth="2.5"/>
                  <path d="M21 14h6v4h-6z" fill="#FFEFED" stroke="#FF6C84" strokeWidth="2"/>
                  <path d="M24 10v4" stroke="#FF6C84" strokeWidth="2.5" strokeLinecap="round"/>
                  <circle cx="24" cy="9" r="2" fill="#FF6C84"/>
                  <path d="M24 28v4" stroke="#FF6C84" strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
                </svg>
              </div>
              <h3 className="font-serif font-bold text-[24px] text-[#1A1A1A] mb-2">Serum</h3>
              <p className="font-sans text-[15px] text-[#666666] leading-[1.6]">
                Target your concerns. Press active ingredients deep into skin for maximum glow and absorption.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center">
              <div className="relative w-[80px] h-[80px] bg-[#FFEFED] border-2 border-[#FFB3C0] rounded-full flex items-center justify-center mb-6 z-10">
                <span className="absolute -top-2 -right-3 font-serif text-[18px] text-[#C9A84C] bg-white px-1 font-bold leading-none select-none">
                  03
                </span>
                <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
                  <ellipse cx="24" cy="34" rx="16" ry="8" fill="#FFEFED" stroke="#FF6C84" strokeWidth="2.5"/>
                  <path d="M8 28h32v6H8z" fill="#FFEFED" stroke="#FF6C84" strokeWidth="2.5" strokeLinejoin="round"/>
                  <path d="M10 28c0-3 6.3-6 14-6s14 3 14 6" stroke="#FF6C84" strokeWidth="2.5"/>
                  <path d="M16 20c0-4 3.6-8 8-8s8 4 8 8" stroke="#FF6C84" strokeWidth="2" strokeDasharray="3 2"/>
                </svg>
              </div>
              <h3 className="font-serif font-bold text-[24px] text-[#1A1A1A] mb-2">Moisturize</h3>
              <p className="font-sans text-[15px] text-[#666666] leading-[1.6]">
                Lock it all in. Seal in hydration and protect your skin all day.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Ingredients() {
  return (
    <section id="ingredients" className="bg-[#FFEFED] py-12 md:py-[80px] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left Half - Image (45%) */}
          <div className="lg:w-[45%] w-full">
            <div className="w-full aspect-[4/5] md:aspect-square relative rounded-[24px] overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.06)] bg-white">
              <img 
                src={ingredientsImg} 
                alt="Natural skincare ingredients flat-lay" 
                className="absolute inset-0 w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          
          {/* Right Half - Content (55%) */}
          <div className="lg:w-[55%] w-full flex flex-col justify-center">
            <div className="max-w-lg">
              <h2 className="font-serif text-[40px] font-bold text-[#1A1A1A] leading-tight mb-1">
                Why Lumae Works
              </h2>
              <p className="font-sans text-[16px] text-[#888888] italic mb-8">
                Every ingredient chosen for a reason.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0 mt-0.5">
                    <circle cx="10" cy="10" r="9" fill="#C9A84C" opacity="0.15"/>
                    <path d="M6 10l3 3 5-5" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <p className="font-sans text-[15px] text-[#666666] m-0">
                    <strong className="font-bold text-[#1A1A1A]">Vitamin C</strong> — Brightens and evens skin tone
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0 mt-0.5">
                    <circle cx="10" cy="10" r="9" fill="#C9A84C" opacity="0.15"/>
                    <path d="M6 10l3 3 5-5" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <p className="font-sans text-[15px] text-[#666666] m-0">
                    <strong className="font-bold text-[#1A1A1A]">Hyaluronic Acid</strong> — Deep 72-hour hydration
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0 mt-0.5">
                    <circle cx="10" cy="10" r="9" fill="#C9A84C" opacity="0.15"/>
                    <path d="M6 10l3 3 5-5" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <p className="font-sans text-[15px] text-[#666666] m-0">
                    <strong className="font-bold text-[#1A1A1A]">Niacinamide</strong> — Minimizes pores and controls oil
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0 mt-0.5">
                    <circle cx="10" cy="10" r="9" fill="#C9A84C" opacity="0.15"/>
                    <path d="M6 10l3 3 5-5" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <p className="font-sans text-[15px] text-[#666666] m-0">
                    <strong className="font-bold text-[#1A1A1A]">Peptides</strong> — Firms skin and reduces fine lines
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <a href="#" className="font-sans text-[15px] text-[#FF6C84] underline font-medium hover:opacity-80 transition-opacity">
                  See All Ingredients &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function AboutSection() {
  return (
    <section id="about" className="bg-white py-12 md:py-[80px] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left Half - Image (40%) */}
          <div className="lg:w-[40%] w-full">
            <div className="w-full aspect-[4/5] relative rounded-[24px] overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.06)] bg-white">
              <img 
                src={aboutImg} 
                alt="Woman with glowing skin" 
                className="absolute inset-0 w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Right Half - Content (60%) */}
          <div className="lg:w-[60%] w-full flex flex-col justify-center">
            <div className="max-w-lg">
              <h2 className="font-serif text-[40px] font-bold text-[#1A1A1A] mb-6 leading-tight">
                The Lumae Story
              </h2>
              <p className="font-sans text-[16px] text-[#555555] leading-[1.7] mb-4">
                Lumae was created for people who want real results without the overwhelm. We believe great skin starts with the right ingredients — clean, effective, and gentle on every skin type.
              </p>
              <p className="font-sans text-[16px] text-[#555555] leading-[1.7] mb-6">
                No unnecessary fillers. No confusing routines. Just science-backed formulas that actually work — so you can spend less time worrying and more time glowing.
              </p>
              <a href="#" className="font-sans font-semibold text-[#FF6C84] hover:opacity-80 transition-opacity text-[15px] underline inline-block mt-2">
                Learn More About Us &rarr;
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
