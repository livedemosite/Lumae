import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { products } from './ProductSections';
import { Heart, Minus, Plus, ShoppingBag, ArrowLeft } from 'lucide-react';

export function ProductDetail() {
  const { selectedProductId, setCurrentView, addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState<'how' | 'ingredients' | 'benefits'>('how');

  const product = products.find((p) => p.id === selectedProductId) || products[0];

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) {
      addToCart(product);
    }
  };

  const isLiked = isInWishlist(product.id);

  // Tab contents based on item specifications
  const tabContent = {
    how: `Gently pat 2–3 drops onto clean, damp skin morning and night. Allow to absorb fully before applying creams or SPF. For optimal results, use consistently as part of your Lumae skincare routine.`,
    ingredients: product.ingredients ? product.ingredients.join(', ') + ', Water/Aqua, Glycerin, Propanediol, Phenoxyethanol, Ethylhexylglycerin' : 'Aqua, Hyaluronic acid, botanical extracts, vitamin complex',
    benefits: `Restores natural moisture barrier, brightens dark spots and unifies skin tone, boosts skin elasticity, and leaves a healthy, non-greasy natural glow.`
  };

  return (
    <div className="bg-white min-h-screen py-10 md:py-[80px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back navigation */}
        <button 
          onClick={() => setCurrentView('home')}
          className="flex items-center gap-2 font-sans font-semibold text-text-charcoal hover:text-[#FF6C84] transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Products</span>
        </button>

        {/* Product view columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* Left Column: Image wrapper */}
          <div className="w-full aspect-[4/5] overflow-hidden rounded-[24px] bg-[#FFEFED]/30 relative shadow-sm border border-pink-50">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {product.badge && (
              <div className="absolute top-4 left-4 bg-[#FF6C84] px-3 py-1 rounded-[4px] z-10">
                <span className="font-sans text-[11px] font-bold text-white uppercase tracking-wider">
                  {product.badge}
                </span>
              </div>
            )}
          </div>

          {/* Right Column: Information */}
          <div className="flex flex-col justify-center">
            
            {/* Rating */}
            <div className="flex items-center gap-1.5 mb-3">
              <div className="flex gap-0.5 text-[#C9A84C]">
                {[...Array(5)].map((_, i) => {
                  const isFull = i < Math.floor(product.rating);
                  const isPartial = i === Math.floor(product.rating);
                  const fillValue = isFull ? "#C9A84C" : isPartial ? "#C9A84C" : "#E5E5E5";
                  
                  return (
                    <svg key={i} width="16" height="16" viewBox="0 0 24 24">
                      {isPartial ? (
                        <g>
                          <defs>
                            <linearGradient id={`star-partial-detail-${product.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset={`${(product.rating % 1) * 100}%`} stopColor="#C9A84C" />
                              <stop offset={`${(product.rating % 1) * 100}%`} stopColor="#E5E5E5" />
                            </linearGradient>
                          </defs>
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill={`url(#star-partial-detail-${product.id})`}/>
                        </g>
                      ) : (
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill={fillValue}/>
                      )}
                    </svg>
                  );
                })}
              </div>
              <span className="font-sans text-[13px] text-gray-500 font-medium">({product.rating} / 5.0 Rating)</span>
            </div>

            {/* Title */}
            <h1 className="font-serif text-[38px] md:text-[48px] font-bold text-[#1A1A1A] leading-tight mb-4">
              {product.name}
            </h1>

            {/* Price */}
            <div className="mb-6">
              <span className="font-sans font-bold text-[#FF6C84] text-[28px]">${product.price.toFixed(2)}</span>
            </div>

            {/* Short Decription */}
            <p className="font-sans text-gray-600 text-[16px] leading-[1.7] mb-8">
              Experience the nourishing magic of Lumae. Formulated by skincare experts, this professional-grade formula deeply nurtures your skin cells, revealing your natural, vibrant glow from the inside out. 100% vegan, cruelty-free, and dermatologically tested.
            </p>

            {/* Keys bullet checkmarks */}
            <div className="space-y-3.5 mb-8">
              {product.ingredients?.map((ing, k) => (
                <div key={k} className="flex items-center gap-3">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0">
                    <circle cx="10" cy="10" r="9" fill="#C9A84C" opacity="0.15"/>
                    <path d="M6 10l3 3 5-5" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="font-sans text-[15px] font-medium text-gray-700">Enriched with organic <strong className="text-[#1A1A1A] font-semibold">{ing}</strong></span>
                </div>
              ))}
            </div>

            {/* Interactions: Qty selector + Add to Cart + Wishlist */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              
              {/* Qty */}
              <div className="flex items-center border border-pink-100 rounded-full bg-gray-50/50 p-1 px-2.5">
                <button 
                  onClick={() => setQty(q => Math.max(1, q - 1))}
                  className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white text-gray-500 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-sans font-bold text-text-charcoal text-[15px]">{qty}</span>
                <button 
                  onClick={() => setQty(q => q + 1)}
                  className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white text-gray-500 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Add To Cart Button */}
              <button
                onClick={handleAddToCart}
                className="flex-1 min-w-[200px] bg-[#FF6C84] text-white font-sans font-bold py-3.5 rounded-full hover:brightness-105 transition-all text-center flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <ShoppingBag className="w-4.5 h-4.5" />
                <span>Add to Glow Cart</span>
              </button>

              {/* Wishlist Button */}
              <button
                onClick={() => {
                  if (isLiked) {
                    removeFromWishlist(product.id);
                  } else {
                    addToWishlist(product);
                  }
                }}
                className="w-[52px] h-[52px] rounded-full border border-pink-100 flex items-center justify-center bg-white hover:bg-pink-50/30 transition-colors shadow-sm"
                aria-label="Wishlist"
              >
                <Heart className={`w-5.5 h-5.5 transition-colors duration-200 ${isLiked ? 'stroke-[#FF6C84] fill-[#FF6C84]' : 'stroke-gray-400'}`} />
              </button>
            </div>

            {/* Tabs details: HOW, INCE, BENE */}
            <div className="border-t border-b border-pink-100 py-6">
              <div className="flex gap-6 mb-4 border-b border-pink-50 pb-2">
                <button 
                  onClick={() => setActiveTab('how')}
                  className={`font-sans font-bold text-[14px] uppercase tracking-wider pb-2 relative transition-all ${activeTab === 'how' ? 'text-[#FF6C84]' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  How to Use
                  {activeTab === 'how' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF6C84]" />}
                </button>
                <button 
                  onClick={() => setActiveTab('ingredients')}
                  className={`font-sans font-bold text-[14px] uppercase tracking-wider pb-2 relative transition-all ${activeTab === 'ingredients' ? 'text-[#FF6C84]' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  Ingredients
                  {activeTab === 'ingredients' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF6C84]" />}
                </button>
                <button 
                  onClick={() => setActiveTab('benefits')}
                  className={`font-sans font-bold text-[14px] uppercase tracking-wider pb-2 relative transition-all ${activeTab === 'benefits' ? 'text-[#FF6C84]' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  Benefits
                  {activeTab === 'benefits' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF6C84]" />}
                </button>
              </div>

              <p className="font-sans text-gray-600 text-[14px] leading-relaxed italic">
                {tabContent[activeTab]}
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
