import React from 'react';
import { motion } from 'motion/react';

import ba1 from '../assets/images/before_after_1_1781531717410.jpg';
import ba2 from '../assets/images/before_after_2_1781531730805.jpg';
import ba3 from '../assets/images/before_after_3_1781531745763.jpg';
import ba4 from '../assets/images/before_after_4_1781531763043.jpg';

const beforeAfterData = [
  { id: 1, image: ba1 },
  { id: 2, image: ba2 },
  { id: 3, image: ba3 },
  { id: 4, image: ba4 },
];

export function BeforeAfter() {
  return (
    <section className="py-12 md:py-[80px] bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-[40px] font-bold text-[#1A1A1A] mb-2 leading-none">
            Real Results. No Filters.
          </h2>
          <p className="font-sans text-[#888888] text-[16px]">From the Lumae community.</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {beforeAfterData.map((item) => (
            <div key={item.id} className="relative rounded-[16px] overflow-hidden aspect-[3/4] bg-gray-50 border border-[#FFEFED]">
              <img 
                src={item.image} 
                alt="Before and after skincare results" 
                className="absolute inset-0 w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              
              <div className="absolute top-0 bottom-0 left-1/2 w-[2px] bg-white -translate-x-1/2 z-10 pointer-events-none"></div>

              <div className="absolute top-0 left-0 bg-black/40 text-white font-sans text-[10px] font-bold px-[8px] py-[4px] rounded-br-[8px] tracking-wider z-20">
                BEFORE
              </div>
              <div className="absolute top-0 right-0 bg-[#FF6C84]/70 text-white font-sans text-[10px] font-bold px-[8px] py-[4px] rounded-bl-[8px] tracking-wider z-20">
                AFTER
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const testimonials = [
  { id: 1, text: "I've tried so many serums, but the Glow Booster is magic. My skin looks so plump and hydrated within minutes.", name: "Sarah M.", location: "London" },
  { id: 2, text: "Finally, a Vitamin C serum that doesn't feel sticky! The brightness it gave my face is unbelievable.", name: "Jessica T.", location: "Los Angeles" },
  { id: 3, text: "My dry patches disappear instantly. It sits perfectly under my makeup, giving me a literal glass-skin effect all day.", name: "Emma H.", location: "New York" },
  { id: 4, text: "I threw out my other toners. The Rose Water Toner is refreshing and makes my skin feel incredibly soft and balanced.", name: "Chloe D.", location: "Manchester" },
  { id: 5, text: "The hydration from the Hyaluronic Acid serum lasts all day. Highly recommend if you want bouncy, dewy skin.", name: "Olivia R.", location: "Chicago" },
  { id: 6, text: "People keep asking me what highlighter I use, but it's literally just my bare skin after using Lumae for a month.", name: "Mia K.", location: "Austin" },
];

export function Testimonials() {
  return (
    <section id="reviews" className="py-12 md:py-[80px] bg-white border-t border-gray-50 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-serif text-[40px] font-bold text-center text-[#1A1A1A] mb-12">
          Glow Notes
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((review) => (
            <div key={review.id} className="bg-[#FFEFED] p-[28px] rounded-[16px] flex flex-col min-h-[200px] h-full transform transition-transform hover:-translate-y-1">
              <div className="flex gap-[3px] mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#C9A84C">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>
              <p className="font-sans text-[#555] leading-[1.7] mb-6 flex-1 italic text-[14px]">
                "{review.text}"
              </p>
              <div>
                <p className="font-sans font-semibold text-[#1A1A1A] text-[14px]">{review.name}</p>
                <p className="font-sans text-[#999] text-[13px]">{review.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Newsletter() {
  const [email, setEmail] = React.useState('');
  const [success, setSuccess] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSuccess(true);
    setEmail('');
  };

  return (
    <section className="bg-[#FFEFED] py-12 md:py-[80px] px-4">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="font-serif text-[40px] font-bold text-[#1A1A1A] mb-4 leading-none">
          The Glow Club
        </h2>
        <p className="font-sans text-[#666666] text-[16px] mb-10">
          Subscribe for early access to new launches and receive 15% off your first order.
        </p>
        
        {success ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white border border-[#FFEFED] text-[#1A1A1A] max-w-md mx-auto p-8 rounded-[24px] shadow-sm"
          >
            <h4 className="font-serif text-[24px] font-bold text-[#FF6C84] mb-2">Welcome to the Club! 🌸</h4>
            <p className="font-sans text-[#666666] text-[15px]">
              Check your inbox. We've sent your exclusive 15% off coupon code & secret glow guides.
            </p>
          </motion.div>
        ) : (
          <form className="flex flex-col sm:flex-row gap-3 max-w-[500px] mx-auto mb-4" onSubmit={handleSubmit}>
            <input 
              type="email" 
              placeholder="Your email address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-white border border-[#FFB3C0] rounded-full px-6 py-3.5 font-sans text-[#1A1A1A] outline-none focus:border-[#FF6C84] transition-all text-[15px]"
              required
            />
            <button 
              type="submit" 
              className="bg-[#FF6C84] text-white font-sans font-bold px-8 py-3.5 rounded-full hover:brightness-105 transition-all shrink-0 text-[15px] shadow-sm"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
