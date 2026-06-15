import React from 'react';
import { Sparkles, Droplets, Moon } from 'lucide-react';
import ingredientsImg from '../assets/images/ingredients_flatlay_1781531671670.jpg';
import aboutImg from '../assets/images/about_lifestyle_1781531690902.jpg';

export function HowItWorks() {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="font-serif text-[40px] font-bold text-center text-[#1A1A1A] mb-16">
          Your 3-Step Glow Routine
        </h2>
        
        <div className="relative">
          {/* Dashed connector line for desktop */}
          <div className="hidden md:block absolute top-[48px] left-[15%] right-[15%] border-t-2 border-dashed border-[#FFB3C0] z-0"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center">
              <div className="relative w-24 h-24 flex items-center justify-center mb-6">
                <span className="absolute font-serif text-[80px] text-[#C9A84C] opacity-20 -top-2 z-0 font-bold leading-none select-none">
                  01
                </span>
                <Droplets className="w-12 h-12 text-[#FF6C84] relative z-10" strokeWidth={1.5} />
              </div>
              <h3 className="font-sans font-bold text-[20px] text-[#1A1A1A] mb-2">Cleanse</h3>
              <p className="font-sans text-[15px] text-[#666666] leading-[1.6]">
                Start with a fresh canvas. Gently remove impurities without stripping natural oils.
              </p>
            </div>
            
            {/* Step 2 */}
            <div className="flex flex-col items-center text-center">
              <div className="relative w-24 h-24 flex items-center justify-center mb-6">
                <span className="absolute font-serif text-[80px] text-[#C9A84C] opacity-20 -top-2 z-0 font-bold leading-none select-none">
                  02
                </span>
                {/* Note: In actual implementation, maybe a different icon for serum, but Droplets/Sparkles works */}
                <Sparkles className="w-12 h-12 text-[#FF6C84] relative z-10" strokeWidth={1.5} />
              </div>
              <h3 className="font-sans font-bold text-[20px] text-[#1A1A1A] mb-2">Serum</h3>
              <p className="font-sans text-[15px] text-[#666666] leading-[1.6]">
                Target your concerns. Press active ingredients deep into skin for maximum glow and absorption.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center">
              <div className="relative w-24 h-24 flex items-center justify-center mb-6">
                <span className="absolute font-serif text-[80px] text-[#C9A84C] opacity-20 -top-2 z-0 font-bold leading-none select-none">
                  03
                </span>
                <Moon className="w-12 h-12 text-[#FF6C84] relative z-10" strokeWidth={1.5} />
              </div>
              <h3 className="font-sans font-bold text-[20px] text-[#1A1A1A] mb-2">Moisturize</h3>
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
    <section id="ingredients" className="bg-[#FFEFED] py-20 scroll-mt-20">
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
                  <span className="text-[#C9A84C] text-[20px] font-bold leading-none mt-1">✓</span>
                  <p className="font-sans text-[15px] text-[#666666] m-0">
                    <strong className="font-bold text-[#1A1A1A]">Vitamin C</strong> — Brightens and evens skin tone
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-[#C9A84C] text-[20px] font-bold leading-none mt-1">✓</span>
                  <p className="font-sans text-[15px] text-[#666666] m-0">
                    <strong className="font-bold text-[#1A1A1A]">Hyaluronic Acid</strong> — Deep 72-hour hydration
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-[#C9A84C] text-[20px] font-bold leading-none mt-1">✓</span>
                  <p className="font-sans text-[15px] text-[#666666] m-0">
                    <strong className="font-bold text-[#1A1A1A]">Niacinamide</strong> — Minimizes pores and controls oil
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-[#C9A84C] text-[20px] font-bold leading-none mt-1">✓</span>
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
    <section id="about" className="bg-white py-20 scroll-mt-20">
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
