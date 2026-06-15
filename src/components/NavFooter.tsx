import React, { useState } from 'react';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'motion/react';

export function Navigation() {
  const { cartCount, setIsCartOpen } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false); // Close mobile menu first
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className="sticky top-0 z-40 bg-white border-b border-pink-50/50 shadow-sm backdrop-blur-md bg-white/95">
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
              <a href="#" className="font-serif text-3xl font-bold text-primary-pink tracking-tight hover:opacity-90 transition-opacity">Lumae</a>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-10">
            <a 
              href="#shop" 
              onClick={(e) => handleSmoothScroll(e, 'shop')} 
              className="font-sans font-medium text-text-charcoal hover:text-primary-pink transition-colors text-[15px]"
            >
              Shop
            </a>
            <a 
              href="#about" 
              onClick={(e) => handleSmoothScroll(e, 'about')} 
              className="font-sans font-medium text-text-charcoal hover:text-primary-pink transition-colors text-[15px]"
            >
              About
            </a>
            <a 
              href="#ingredients" 
              onClick={(e) => handleSmoothScroll(e, 'ingredients')} 
              className="font-sans font-medium text-text-charcoal hover:text-primary-pink transition-colors text-[15px]"
            >
              Ingredients
            </a>
            <a 
              href="#reviews" 
              onClick={(e) => handleSmoothScroll(e, 'reviews')} 
              className="font-sans font-medium text-text-charcoal hover:text-primary-pink transition-colors text-[15px]"
            >
              Reviews
            </a>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-6">
            <button 
              onClick={() => setIsCartOpen(true)}
              className="text-text-charcoal hover:text-primary-pink transition-colors relative p-2"
              aria-label="Open cart"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  key={cartCount}
                  className="absolute -top-1 -right-1 bg-primary-pink text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-md scale-95"
                >
                  {cartCount}
                </motion.span>
              )}
            </button>
            <button 
              onClick={() => setIsCartOpen(true)}
              className="hidden sm:inline-flex bg-primary-pink text-white font-sans px-6 py-2.5 rounded-full hover:bg-opacity-95 shadow-sm shadow-pink-200 transition-all font-medium text-sm tracking-wide bg-gradient-to-r from-primary-pink to-[#ff5d77]"
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
              <a 
                href="#shop" 
                onClick={(e) => handleSmoothScroll(e, 'shop')} 
                className="block font-sans font-semibold text-text-charcoal hover:text-primary-pink transition-colors text-lg"
              >
                Shop Serums
              </a>
              <a 
                href="#about" 
                onClick={(e) => handleSmoothScroll(e, 'about')} 
                className="block font-sans font-semibold text-text-charcoal hover:text-primary-pink transition-colors text-lg"
              >
                Our Story
              </a>
              <a 
                href="#ingredients" 
                onClick={(e) => handleSmoothScroll(e, 'ingredients')} 
                className="block font-sans font-semibold text-text-charcoal hover:text-primary-pink transition-colors text-lg"
              >
                The Active Botanics
              </a>
              <a 
                href="#reviews" 
                onClick={(e) => handleSmoothScroll(e, 'reviews')} 
                className="block font-sans font-semibold text-text-charcoal hover:text-primary-pink transition-colors text-lg"
              >
                Real Testimonials
              </a>
              
              <div className="pt-6 border-t border-pink-100 flex flex-col gap-3">
                <button 
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsCartOpen(true);
                  }}
                  className="w-full bg-primary-pink text-white font-sans font-semibold py-3.5 rounded-full hover:bg-opacity-95 text-center text-sm shadow-md"
                >
                  Configure My System
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
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
    <footer className="bg-text-charcoal text-white py-20 border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Col 1 */}
          <div className="space-y-6">
            <h3 className="font-serif text-3xl font-bold text-white tracking-tight">Lumae</h3>
            <p className="font-sans text-gray-400 text-sm leading-relaxed">Clean Skin. Real Glow.</p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="font-sans text-sm text-gray-400 hover:text-primary-pink transition-colors">Instagram</a>
              <a href="#" className="font-sans text-sm text-gray-400 hover:text-primary-pink transition-colors">TikTok</a>
              <a href="#" className="font-sans text-sm text-gray-400 hover:text-primary-pink transition-colors">Facebook</a>
            </div>
          </div>

          {/* Col 2 */}
          <div className="space-y-4">
            <h4 className="font-sans font-semibold text-base uppercase tracking-wider text-gray-200">Quick Links</h4>
            <div className="flex flex-col space-y-3 text-sm">
              <a href="#" className="font-sans text-gray-400 hover:text-white transition-colors">Home</a>
              <a href="#shop" onClick={(e) => handleSmoothScroll(e, 'shop')} className="font-sans text-gray-400 hover:text-white transition-colors">Shop All</a>
              <a href="#about" onClick={(e) => handleSmoothScroll(e, 'about')} className="font-sans text-gray-400 hover:text-white transition-colors">About</a>
              <a href="#ingredients" onClick={(e) => handleSmoothScroll(e, 'ingredients')} className="font-sans text-gray-400 hover:text-white transition-colors">Ingredients</a>
              <a href="#" className="font-sans text-gray-400 hover:text-white transition-colors">Contact</a>
            </div>
          </div>

          {/* Col 3 */}
          <div className="space-y-4">
            <h4 className="font-sans font-semibold text-base uppercase tracking-wider text-gray-200">Customer Care</h4>
            <div className="flex flex-col space-y-3 text-sm">
              <a href="#" className="font-sans text-gray-400 hover:text-white transition-colors">FAQ</a>
              <a href="#" className="font-sans text-gray-400 hover:text-white transition-colors">Shipping Policy</a>
              <a href="#" className="font-sans text-gray-400 hover:text-white transition-colors">Return Policy</a>
              <a href="#" className="font-sans text-gray-400 hover:text-white transition-colors">Track My Order</a>
            </div>
          </div>

          {/* Col 4 */}
          <div className="space-y-4">
            <h4 className="font-sans font-semibold text-base uppercase tracking-wider text-gray-200">Contact</h4>
            <div className="flex flex-col space-y-3 text-sm">
              <a href="mailto:hello@lumae.co" className="font-sans text-gray-400 hover:text-white transition-colors">hello@lumae.co</a>
              <p className="font-sans text-gray-400">US & UK Shipping Available</p>
            </div>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-gray-800 text-center">
          <p className="font-sans text-xs text-gray-500">© 2025 Lumae. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
