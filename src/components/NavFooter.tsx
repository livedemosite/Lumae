import React, { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X, Heart, MapPin, Phone, Facebook, Instagram, Twitter, Youtube, Send } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { motion, AnimatePresence } from 'motion/react';

export function Navigation() {
  const { cartCount, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false); // Close mobile menu first
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="sticky top-0 z-50 flex flex-col">
      {/* Layer 1: Top Info Bar */}
      <div 
        className={`bg-primary-pink text-white w-full transition-all duration-300 overflow-hidden hidden sm:block ${scrolled ? 'h-0 opacity-0' : 'h-9 opacity-100'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex justify-between items-center text-[12px] font-sans">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Phone className="w-3.5 h-3.5" />
              <span>001 123 4789</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-3.5 h-3.5" />
              <span>123 Demo Street, London, UK</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <a href="#" aria-label="Facebook" className="hover:opacity-80 transition-opacity"><Facebook className="w-3.5 h-3.5 fill-current" /></a>
            <a href="#" aria-label="Instagram" className="hover:opacity-80 transition-opacity"><Instagram className="w-3.5 h-3.5" /></a>
            <a href="#" aria-label="Twitter" className="hover:opacity-80 transition-opacity"><Twitter className="w-3.5 h-3.5 fill-current" /></a>
            <a href="#" aria-label="YouTube" className="hover:opacity-80 transition-opacity"><Youtube className="w-3.5 h-3.5" /></a>
          </div>
        </div>
      </div>

      {/* Layer 2: Main Navigation */}
      <nav className="bg-white border-b border-pink-50/50 shadow-sm backdrop-blur-md bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            {/* Left Side: Mobile Menu Button & Logo */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden text-text-charcoal p-1 hover:text-primary-pink transition-colors focus:outline-none"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              <div className="flex-shrink-0 flex items-center">
                <a href="#" className="flex items-center hover:opacity-90 transition-opacity group">
                  <svg className="w-8 h-8 md:w-10 md:h-10 shrink-0" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M 40 10 C 15 35 15 65 30 85 C 40 95 50 95 55 90 C 45 80 40 65 55 45 C 50 65 50 80 50 85 C 35 75 30 55 40 10 Z" fill="#FF6C84" />
                    <path d="M 50 85 C 75 80 85 55 75 35 C 65 50 55 70 50 85 Z" fill="#FF6C84" />
                    <path d="M 58 60 C 78 50 82 30 75 15 C 65 30 60 45 58 60 Z" fill="#FF6C84" />
                    <path d="M 75 12 L 77 20 L 85 22 L 77 24 L 75 32 L 73 24 L 65 22 L 73 20 Z" fill="#C9A84C" />
                  </svg>
                  <div className="flex flex-col ml-2 justify-center">
                    <span className="font-serif text-2xl md:text-[28px] text-primary-pink tracking-widest uppercase leading-none pt-1">Lumae</span>
                    <span className="font-sans text-[10px] text-text-charcoal tracking-[2px] uppercase mt-0.5">BEAUTY & SKINCARE</span>
                  </div>
                </a>
              </div>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex space-x-6 lg:space-x-10 items-center">
              <a href="#shop" onClick={(e) => handleSmoothScroll(e, 'shop')} className="font-sans font-semibold text-text-charcoal hover:text-primary-pink transition-colors text-[14px] uppercase tracking-wide">HOME</a>
              <a href="#shop" onClick={(e) => handleSmoothScroll(e, 'shop')} className="font-sans font-semibold text-text-charcoal hover:text-primary-pink transition-colors text-[14px] uppercase tracking-wide">SHOP</a>
              <a href="#about" onClick={(e) => handleSmoothScroll(e, 'about')} className="font-sans font-semibold text-text-charcoal hover:text-primary-pink transition-colors text-[14px] uppercase tracking-wide">ABOUT</a>
              <a href="#ingredients" onClick={(e) => handleSmoothScroll(e, 'ingredients')} className="font-sans font-semibold text-text-charcoal hover:text-primary-pink transition-colors text-[14px] uppercase tracking-wide">INGREDIENTS</a>
              <a href="#reviews" onClick={(e) => handleSmoothScroll(e, 'reviews')} className="font-sans font-semibold text-text-charcoal hover:text-primary-pink transition-colors text-[14px] uppercase tracking-wide">REVIEWS</a>
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-3 md:space-x-5">
              <button 
                className="text-text-charcoal hover:text-primary-pink transition-colors relative p-2"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5 md:w-6 md:h-6" />
                {wishlistCount > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    key={wishlistCount}
                    className="absolute -top-1 -right-1 bg-primary-pink text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-md scale-95"
                  >
                    {wishlistCount}
                  </motion.span>
                )}
              </button>
              <button 
                onClick={() => setIsCartOpen(true)}
                className="text-text-charcoal hover:text-primary-pink transition-colors relative p-2"
                aria-label="Open cart"
              >
                <ShoppingCart className="w-5 h-5 md:w-6 md:h-6" />
                {cartCount > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    key={`cart-${cartCount}`}
                    className="absolute -top-1 -right-1 bg-primary-pink text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-md scale-95"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </button>
              <button 
                onClick={() => setIsCartOpen(true)}
                className="hidden sm:inline-flex bg-primary-pink text-white font-sans px-6 py-2.5 rounded-full hover:brightness-108 transition-all font-semibold text-[14px] tracking-wide"
              >
                Shop Now
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Mobile Sliding Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-pink-50 bg-white/98 backdrop-blur-lg overflow-hidden"
            >
              <div className="px-6 py-8 space-y-5">
                <a href="#shop" onClick={(e) => handleSmoothScroll(e, 'shop')} className="block font-sans font-semibold text-text-charcoal hover:text-primary-pink transition-colors text-lg uppercase">HOME</a>
                <a href="#shop" onClick={(e) => handleSmoothScroll(e, 'shop')} className="block font-sans font-semibold text-text-charcoal hover:text-primary-pink transition-colors text-lg uppercase">SHOP</a>
                <a href="#about" onClick={(e) => handleSmoothScroll(e, 'about')} className="block font-sans font-semibold text-text-charcoal hover:text-primary-pink transition-colors text-lg uppercase">ABOUT</a>
                <a href="#ingredients" onClick={(e) => handleSmoothScroll(e, 'ingredients')} className="block font-sans font-semibold text-text-charcoal hover:text-primary-pink transition-colors text-lg uppercase">INGREDIENTS</a>
                <a href="#reviews" onClick={(e) => handleSmoothScroll(e, 'reviews')} className="block font-sans font-semibold text-text-charcoal hover:text-primary-pink transition-colors text-lg uppercase">REVIEWS</a>
                
                <div className="pt-6 border-t border-pink-100 flex flex-col gap-3">
                  <button 
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setIsCartOpen(true);
                    }}
                    className="w-full bg-primary-pink text-white font-sans font-semibold py-3.5 rounded-full hover:bg-opacity-95 text-center text-sm shadow-md"
                  >
                    Shop Now
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
}

export function Footer() {
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className="bg-[#1A1A1A] text-white pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Col 1: Branding + Newsletter + Social */}
          <div>
            <div className="flex items-center">
              <svg className="w-8 h-8 md:w-10 md:h-10 shrink-0" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M 40 10 C 15 35 15 65 30 85 C 40 95 50 95 55 90 C 45 80 40 65 55 45 C 50 65 50 80 50 85 C 35 75 30 55 40 10 Z" fill="#FF6C84" />
                <path d="M 50 85 C 75 80 85 55 75 35 C 65 50 55 70 50 85 Z" fill="#FF6C84" />
                <path d="M 58 60 C 78 50 82 30 75 15 C 65 30 60 45 58 60 Z" fill="#FF6C84" />
                <path d="M 75 12 L 77 20 L 85 22 L 77 24 L 75 32 L 73 24 L 65 22 L 73 20 Z" fill="#C9A84C" />
              </svg>
              <div className="flex flex-col ml-2">
                <span className="font-serif text-[28px] text-white leading-none pt-1">Lumae</span>
              </div>
            </div>
            <p className="font-sans text-[10px] tracking-[2px] text-primary-pink uppercase mt-1">BEAUTY & SKINCARE</p>
            <p className="font-sans text-[#999999] text-[14px] mt-3">Clean Skin. Real Glow.</p>

            <h4 className="font-sans font-bold text-[15px] text-white mt-7">Our Newsletter</h4>
            <div className="mt-3 relative">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="w-full bg-transparent border border-white/20 text-white font-sans text-sm rounded-lg px-3.5 py-2.5 focus:outline-none focus:border-primary-pink transition-colors"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-pink hover:opacity-80 transition-opacity">
                <Send className="w-4 h-4" />
              </button>
            </div>

            <h4 className="font-sans font-bold text-[15px] text-white mt-6">Stay Connected</h4>
            <div className="flex space-x-3 mt-3">
              <a href="#" className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:border-primary-pink hover:text-primary-pink transition-all duration-300">
                <Facebook className="w-4 h-4 fill-current" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:border-primary-pink hover:text-primary-pink transition-all duration-300">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:border-primary-pink hover:text-primary-pink transition-all duration-300">
                <Twitter className="w-4 h-4 fill-current" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:border-primary-pink hover:text-primary-pink transition-all duration-300">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="font-sans font-bold text-[15px] text-white mb-4">Quick Links</h4>
            <div className="flex flex-col space-y-0 leading-[2.2]">
              <a href="#" className="font-sans text-[14px] text-[#999999] hover:text-primary-pink transition-colors duration-200">Home</a>
              <a href="#shop" onClick={(e) => handleSmoothScroll(e, 'shop')} className="font-sans text-[14px] text-[#999999] hover:text-primary-pink transition-colors duration-200">Shop All</a>
              <a href="#about" onClick={(e) => handleSmoothScroll(e, 'about')} className="font-sans text-[14px] text-[#999999] hover:text-primary-pink transition-colors duration-200">About</a>
              <a href="#ingredients" onClick={(e) => handleSmoothScroll(e, 'ingredients')} className="font-sans text-[14px] text-[#999999] hover:text-primary-pink transition-colors duration-200">Ingredients</a>
              <a href="#" className="font-sans text-[14px] text-[#999999] hover:text-primary-pink transition-colors duration-200">Blog</a>
              <a href="#" className="font-sans text-[14px] text-[#999999] hover:text-primary-pink transition-colors duration-200">Contact</a>
            </div>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="font-sans font-bold text-[15px] text-white mb-4">Customer Care</h4>
            <div className="flex flex-col space-y-0 leading-[2.2]">
              <a href="#" className="font-sans text-[14px] text-[#999999] hover:text-primary-pink transition-colors duration-200">FAQ</a>
              <a href="#" className="font-sans text-[14px] text-[#999999] hover:text-primary-pink transition-colors duration-200">Shipping Policy</a>
              <a href="#" className="font-sans text-[14px] text-[#999999] hover:text-primary-pink transition-colors duration-200">Return Policy</a>
              <a href="#" className="font-sans text-[14px] text-[#999999] hover:text-primary-pink transition-colors duration-200">Track My Order</a>
              <a href="#" className="font-sans text-[14px] text-[#999999] hover:text-primary-pink transition-colors duration-200">Privacy Policy</a>
              <a href="#" className="font-sans text-[14px] text-[#999999] hover:text-primary-pink transition-colors duration-200">Terms of Service</a>
            </div>
          </div>

          {/* Col 4 */}
          <div>
            <h4 className="font-sans font-bold text-[15px] text-white mb-4">Contact Us</h4>
            <div className="flex flex-col space-y-2 leading-[2.2]">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary-pink shrink-0 mt-1" />
                <span className="font-sans text-[14px] text-[#999999]">123 Demo Street, London, UK</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary-pink shrink-0" />
                <span className="font-sans text-[14px] text-[#999999]">001 123 4789</span>
              </div>
              <div className="flex items-center space-x-3">
                <Send className="w-5 h-5 text-primary-pink shrink-0" />
                <span className="font-sans text-[14px] text-[#999999]">hello@lumae.co</span>
              </div>
              <div className="flex items-center space-x-3 pt-1">
                <div className="w-5 h-5 flex items-center justify-center text-primary-pink shrink-0"><span className="text-[18px]">🕐</span></div>
                <span className="font-sans text-[13px] text-[#999999]">Mon–Sat: 9AM–9PM | Sun: 10AM–6PM</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="w-full h-px bg-white/10 my-10" />

        <div className="flex max-md:flex-col justify-between items-center pb-8 gap-4">
          <p className="font-sans text-[13px] text-[#666666]">© 2025 Lumae. All Rights Reserved.</p>
          <div className="flex space-x-2 font-sans text-[13px] text-[#666666]">
            <a href="#" className="hover:text-primary-pink transition-colors">Help Desk</a>
            <span>|</span>
            <a href="#" className="hover:text-primary-pink transition-colors">Privacy Policy</a>
            <span>|</span>
            <a href="#" className="hover:text-primary-pink transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
