import React from 'react';
import { Sparkles, Droplets, Moon, CheckCircle2 } from 'lucide-react';
import ingredientsImg from '../assets/images/ingredients_flatlay_1781531671670.jpg';
import aboutImg from '../assets/images/about_lifestyle_1781531690902.jpg';

export function HowItWorks() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-center text-text-charcoal mb-16">
          Your 3-Step Glow Routine
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          {/* Step 1 */}
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-bg-pink flex items-center justify-center mb-6 relative">
              <Sparkles className="w-8 h-8 text-primary-pink" />
              <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-accent-gold flex items-center justify-center text-white font-sans font-bold shadow-sm">
                1
              </div>
            </div>
            <h3 className="font-sans font-bold text-xl text-text-charcoal mb-3">Cleanse</h3>
            <p className="font-sans text-gray-600 leading-relaxed">
              Start with a fresh canvas. Gently remove impurities without stripping natural oils.
            </p>
          </div>
          
          {/* Step 2 */}
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-bg-pink flex items-center justify-center mb-6 relative">
              <Droplets className="w-8 h-8 text-primary-pink" />
              <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-accent-gold flex items-center justify-center text-white font-sans font-bold shadow-sm">
                2
              </div>
            </div>
            <h3 className="font-sans font-bold text-xl text-text-charcoal mb-3">Serum</h3>
            <p className="font-sans text-gray-600 leading-relaxed">
              Target your concerns. Press active ingredients deep into the skin for maximum glow.
            </p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-bg-pink flex items-center justify-center mb-6 relative">
              <Moon className="w-8 h-8 text-primary-pink" />
              <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-accent-gold flex items-center justify-center text-white font-sans font-bold shadow-sm">
                3
              </div>
            </div>
            <h3 className="font-sans font-bold text-xl text-text-charcoal mb-3">Moisturize</h3>
            <p className="font-sans text-gray-600 leading-relaxed">
              Lock it all in. Seal in hydration and protect your skin's delicate moisture barrier.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Ingredients() {
  return (
    <section id="ingredients" className="bg-bg-pink border-y border-pink-100 scroll-mt-20">
      <div className="flex flex-col lg:flex-row">
        {/* Left Half - Image */}
        <div className="lg:w-1/2 min-h-[400px] relative">
          <img 
            src={ingredientsImg} 
            alt="Natural skincare ingredients flat-lay" 
            className="absolute inset-0 w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        
        {/* Right Half - Content */}
        <div className="lg:w-1/2 p-12 lg:p-24 flex flex-col justify-center">
          <div className="max-w-lg">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-text-charcoal mb-10">
              Why Lumae Works
            </h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <CheckCircle2 className="w-6 h-6 text-accent-gold shrink-0 mt-0.5" />
                <p className="font-sans text-lg text-text-charcoal">
                  <strong className="font-semibold px-1">Vitamin C</strong> — Brightens and evens skin tone
                </p>
              </div>
              <div className="flex items-start space-x-4">
                <CheckCircle2 className="w-6 h-6 text-accent-gold shrink-0 mt-0.5" />
                <p className="font-sans text-lg text-text-charcoal">
                  <strong className="font-semibold px-1">Hyaluronic Acid</strong> — Deep 72-hour hydration
                </p>
              </div>
              <div className="flex items-start space-x-4">
                <CheckCircle2 className="w-6 h-6 text-accent-gold shrink-0 mt-0.5" />
                <p className="font-sans text-lg text-text-charcoal">
                  <strong className="font-semibold px-1">Niacinamide</strong> — Minimizes pores and controls oil
                </p>
              </div>
              <div className="flex items-start space-x-4">
                <CheckCircle2 className="w-6 h-6 text-accent-gold shrink-0 mt-0.5" />
                <p className="font-sans text-lg text-text-charcoal">
                  <strong className="font-semibold px-1">Peptides</strong> — Firms skin and reduces fine lines
                </p>
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
    <section id="about" className="bg-white py-20 lg:py-0 scroll-mt-20">
      <div className="flex flex-col-reverse lg:flex-row">
        {/* Left Half - Content */}
        <div className="lg:w-1/2 p-8 lg:p-24 flex flex-col justify-center items-center lg:items-start text-center lg:text-left bg-white">
          <div className="max-w-md">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-text-charcoal mb-6">
              The Lumae Story
            </h2>
            <p className="font-sans text-gray-600 text-lg leading-relaxed mb-8">
              Lumae was created for people who want real results without the overwhelm. We believe great skin starts with the right ingredients — clean, effective, and gentle on every skin type.
            </p>
            <a href="#" className="font-sans font-semibold text-primary-pink hover:text-opacity-80 transition-opacity text-lg inline-flex items-center group">
              Learn More 
              <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </div>
        </div>
        
        {/* Right Half - Image */}
        <div className="lg:w-1/2 min-h-[400px] lg:min-h-[600px] relative">
          <img 
            src={aboutImg} 
            alt="Woman with glowing skin" 
            className="absolute inset-0 w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </section>
  );
}
