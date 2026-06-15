import React from 'react';
import { ShieldCheck, Leaf, Truck, RefreshCcw, CheckCircle2 } from 'lucide-react';
import heroImg from '../assets/images/hero_image_1781531596530.jpg';

export function Hero() {
  return (
    <section className="bg-bg-pink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left Content */}
          <div className="lg:w-[60%] space-y-8">
            <h1 className="font-serif tracking-tight text-5xl md:text-6xl lg:text-7xl font-bold text-text-charcoal leading-tight">
              Your Glow, <br className="hidden md:block" />Simplified.
            </h1>
            <p className="font-sans text-lg md:text-xl text-gray-700 max-w-xl">
              Science-backed serums and glow boosters for radiant, healthy skin.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => {
                  document.getElementById('best-sellers')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="bg-primary-pink text-white font-sans px-8 py-3.5 rounded-full hover:bg-opacity-90 transition-all font-medium text-lg text-center shadow-lg shadow-pink-200"
              >
                Shop Serums
              </button>
              <button 
                onClick={() => {
                  document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="border-2 border-primary-pink text-primary-pink font-sans px-8 py-3.5 rounded-full hover:bg-primary-pink hover:text-white transition-all font-medium text-lg text-center"
              >
                Explore All
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="lg:w-[40%] w-full">
            <div className="aspect-[4/3] lg:aspect-[3/4] relative rounded-2xl overflow-hidden shadow-2xl shadow-pink-200/50">
              <img 
                src={heroImg} 
                alt="Woman glowing skin holding serum bottle" 
                className="object-cover w-full h-full"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function TrustLogos() {
  return (
    <div className="bg-bg-pink py-6 border-t border-b border-pink-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="font-sans font-medium text-text-charcoal whitespace-nowrap">
            Trusted by 12,000+ customers
          </div>
          <div className="flex flex-wrap justify-center md:justify-end gap-x-8 gap-y-4">
            <div className="flex items-center space-x-2 text-text-charcoal">
              <Leaf className="w-5 h-5 text-text-charcoal/80" />
              <span className="font-sans text-sm font-medium">Cruelty Free</span>
            </div>
            <div className="flex items-center space-x-2 text-text-charcoal">
              <ShieldCheck className="w-5 h-5 text-text-charcoal/80" />
              <span className="font-sans text-sm font-medium">Dermatologist Tested</span>
            </div>
            <div className="flex items-center space-x-2 text-text-charcoal">
              <CheckCircle2 className="w-5 h-5 text-text-charcoal/80" />
              <span className="font-sans text-sm font-medium">Clean Ingredients</span>
            </div>
            <div className="flex items-center space-x-2 text-text-charcoal">
              <Truck className="w-5 h-5 text-text-charcoal/80" />
              <span className="font-sans text-sm font-medium">Fast UK & US Shipping</span>
            </div>
            <div className="flex items-center space-x-2 text-text-charcoal">
              <RefreshCcw className="w-5 h-5 text-text-charcoal/80" />
              <span className="font-sans text-sm font-medium">30-Day Returns</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PromoBanner() {
  return (
    <div className="bg-primary-pink py-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left">
          <p className="font-sans text-white text-lg font-bold">
            Get 20% Off Your First Order — Use Code: <span className="font-black tracking-wider">GLOW20</span>
          </p>
          <a href="#" className="inline-flex bg-white text-primary-pink font-sans font-bold px-6 py-2 rounded-full border-2 border-accent-gold/40 hover:bg-bg-pink transition-colors">
            Shop Now
          </a>
        </div>
      </div>
    </div>
  );
}
