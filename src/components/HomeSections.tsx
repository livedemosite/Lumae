import React from 'react';
import heroImg from '../assets/images/hero_image_1781531596530.jpg';
import quizImg from '../assets/images/skin_quiz_banner_1781539982400.jpg';

export function Hero() {
  return (
    <section className="bg-[#FFEFED] min-h-[90vh] flex items-center py-12 md:py-[80px] w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left Content - 55% */}
          <div className="lg:w-[55%] space-y-6 lg:space-y-8 flex flex-col items-start pt-10 lg:pt-0">
            <div className="bg-[#FF6C84] text-white font-sans text-[12px] font-medium px-4 py-1.5 rounded-full inline-block">
              NEW ARRIVALS
            </div>
            
            <h1 className="font-serif text-[#1A1A1A] font-bold text-5xl md:text-6xl lg:text-[64px] leading-[1.1] tracking-tight">
              Your Glow,<br/>Simplified.
            </h1>
            
            <p className="font-sans text-[16px] text-[#888888] max-w-[480px] leading-relaxed">
              Science-backed serums and glow boosters for radiant, healthy skin.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button 
                onClick={() => {
                  document.getElementById('best-sellers')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="bg-[#FF6C84] text-white font-sans font-semibold px-8 py-3.5 rounded-full hover:brightness-105 transition-all text-[15px]"
              >
                Shop Serums
              </button>
              <button 
                onClick={() => {
                  document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="bg-[#FF6C84] text-white font-sans font-semibold px-8 py-3.5 rounded-full hover:brightness-105 transition-all text-[15px]"
              >
                Explore All
              </button>
            </div>

            <div className="pt-2 flex items-center space-x-2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M1 3h15v13H1V3z" stroke="#FF6C84" strokeWidth="1.5" strokeLinejoin="round"/>
                <path d="M16 8h4l3 3v5h-7V8z" stroke="#FF6C84" strokeWidth="1.5" strokeLinejoin="round"/>
                <circle cx="5.5" cy="18.5" r="2.5" stroke="#FF6C84" strokeWidth="1.5"/>
                <circle cx="18.5" cy="18.5" r="2.5" stroke="#FF6C84" strokeWidth="1.5"/>
              </svg>
              <p className="font-sans text-[13px] text-[#888888] m-0">
                Free shipping on orders over $50
              </p>
            </div>
          </div>

          {/* Right Image - 45% */}
          <div className="lg:w-[45%] w-full flex justify-center lg:justify-end">
            <div className="w-full max-w-[500px] aspect-[4/5] relative rounded-[24px] overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.06)] bg-white">
              <img 
                src={heroImg} 
                alt="Radiant healthy skin" 
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

export function TrustBar() {
  const items = [
    "Trusted by 12,000+ customers",
    "Cruelty Free",
    "Dermatologist Tested",
    "Clean Ingredients",
    "Fast US & UK Shipping",
    "30-Day Returns"
  ];

  return (
    <div className="bg-white py-4 border-b border-[#FFE0E4] w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex overflow-x-auto lg:overflow-visible hide-scrollbar whitespace-nowrap items-center justify-between pb-2 md:pb-0">
          {items.map((item, index) => (
            <React.Fragment key={index}>
              <div className="flex items-center space-x-2 shrink-0">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-0.5">
                  <circle cx="8" cy="8" r="7" stroke="#FF6C84" strokeWidth="1.5"/>
                  <path d="M5 8l2 2 4-4" stroke="#FF6C84" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="font-sans text-[13px] text-[#1A1A1A] font-medium">{item}</span>
              </div>
              {index < items.length - 1 && (
                <span className="text-[#FFE0E4] px-4 md:px-0 shrink-0">|</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

export function FreeShippingBanner() {
  return (
    <div className="bg-[#FFEFED] py-3 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
        <div className="flex items-center space-x-2">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M1 3h15v13H1V3z" stroke="#FF6C84" strokeWidth="1.5" strokeLinejoin="round"/>
            <path d="M16 8h4l3 3v5h-7V8z" stroke="#FF6C84" strokeWidth="1.5" strokeLinejoin="round"/>
            <circle cx="5.5" cy="18.5" r="2.5" stroke="#FF6C84" strokeWidth="1.5"/>
            <circle cx="18.5" cy="18.5" r="2.5" stroke="#FF6C84" strokeWidth="1.5"/>
          </svg>
          <p className="font-sans text-[14px] text-[#1A1A1A] m-0">
            Spend $50 more for FREE shipping!
          </p>
        </div>
        <a href="#shop" className="font-sans text-[14px] text-[#FF6C84] underline font-medium hover:opacity-80 transition-opacity">
          Shop Now &rarr;
        </a>
      </div>
    </div>
  );
}

export function PromoBanner() {
  return (
    <div className="bg-[#FF6C84] py-5 w-full relative overflow-hidden">
      {/* Confetti pattern overlay using CSS background - slightly tricky without external assets, but we can simulate with CSS radial gradients lightly */}
      <div className="absolute inset-0 opacity-[0.08]" 
           style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '16px 16px' }} 
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 md:gap-8">
          <p className="font-sans font-bold text-white text-[16px] md:text-[18px] m-0 text-center sm:text-left">
            Get 20% Off Your First Order — Use Code: GLOW20
          </p>
          <button 
            onClick={() => {
              document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className="bg-[#FF6C84] text-white font-sans font-semibold px-6 py-2.5 rounded-full border border-white hover:brightness-105 transition-colors shadow-sm text-[14px]"
          >
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
}

export function SkinQuizBanner() {
  return (
    <section className="bg-[#FFEFED] py-12 md:py-[80px] w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-16">
          {/* Left Side */}
          <div className="md:w-1/2 flex flex-col items-start space-y-4">
            <span className="font-sans text-[11px] text-[#FF6C84] font-bold tracking-[1px] uppercase">
              PERSONALIZED ROUTINE
            </span>
            <h2 className="font-serif text-[#1A1A1A] font-bold text-[36px] leading-[1.2]">
              Not sure where to start?
            </h2>
            <p className="font-sans text-[#666666] text-[16px] max-w-md leading-relaxed">
              Take our 60-second skin quiz and discover the exact products your skin needs.
            </p>
            <button className="bg-[#FF6C84] text-white font-sans font-semibold px-9 py-[14px] min-w-[200px] rounded-full hover:brightness-105 transition-all text-[15px] mt-6 shadow-md shadow-[#FF6C84]/20 flex items-center justify-center space-x-2 w-fit">
              <span>Find My Routine</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </button>
          </div>
          
          {/* Right Side */}
          <div className="md:w-1/2 w-full">
            <div className="aspect-[4/3] rounded-[24px] overflow-hidden shadow-lg border border-pink-50 relative">
              <img 
                src={quizImg} 
                alt="Skincare routine app quiz" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
