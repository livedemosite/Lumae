import React from 'react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

import catBrightening from '../assets/images/cat_brightening_1781531612355.jpg';
import catHydration from '../assets/images/cat_hydration_1781531628484.jpg';
import catAntiAging from '../assets/images/cat_anti_aging_1781531642204.jpg';
import catEssentials from '../assets/images/cat_essentials_1781531657570.jpg';

const categories = [
  { id: 1, name: "Brightening & Glow", image: catBrightening },
  { id: 2, name: "Deep Hydration", image: catHydration },
  { id: 3, name: "Anti-Aging", image: catAntiAging },
  { id: 4, name: "Daily Essentials", image: catEssentials },
];

export function CategoryGrid() {
  const handleScrollToFeatured = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('best-sellers');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="shop" className="py-12 md:py-[80px] bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-serif text-[40px] font-bold text-center text-[#1A1A1A]">
          Shop by Concern
        </h2>
        <p className="font-sans text-center text-[#888888] mb-12 text-[16px] max-w-sm mx-auto">
          Find your perfect routine
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <a 
              href="#best-sellers" 
              onClick={handleScrollToFeatured}
              key={cat.id} 
              className="group flex flex-col items-center bg-white rounded-[16px] p-0 transition-all duration-300 hover:-translate-y-1 block shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.12)] overflow-hidden"
            >
              <div className="w-full aspect-[1/1] overflow-hidden bg-gray-50 shrink-0">
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="py-5 text-center flex flex-col items-center">
                <h3 className="font-sans font-semibold text-[#1A1A1A] text-[16px] m-0">{cat.name}</h3>
                <span className="font-sans text-[#FF6C84] text-[14px] font-semibold mt-1 inline-block">Shop Now &rarr;</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// Product images explicitly loaded
import prodVitC from '../assets/images/prod_vit_c_1781531779488.jpg';
import prodHyaluronic from '../assets/images/prod_hyaluronic_1781531794118.jpg';
import prodGlow from '../assets/images/prod_glow_1781531810533.jpg';
import prodRetinol from '../assets/images/prod_retinol_1781531823526.jpg';
import prodRoseToner from '../assets/images/prod_rose_toner_1781531847790.jpg';
import prodEyeCream from '../assets/images/prod_eye_cream_1781531864576.jpg';
import prodNiacinamide from '../assets/images/prod_niacinamide_1781531880215.jpg';
import prodAhaBha from '../assets/images/prod_aha_bha_1781531899853.jpg';
import prodPeptideMist from '../assets/images/prod_peptide_mist_1781531915340.jpg';
import prodRepairCream from '../assets/images/prod_repair_cream_1781531932707.jpg';

export const products = [
  { id: 1, name: "Vitamin C Brightening Serum", price: 24.99, rating: 4.8, image: prodVitC, badge: "BESTSELLER", ingredients: ["Vitamin C", "Ferulic Acid", "Vitamin E"] },
  { id: 2, name: "Hyaluronic Acid Serum", price: 22.99, rating: 4.9, image: prodHyaluronic, badge: "BESTSELLER", ingredients: ["Hyaluronic Acid", "Vitamin B5"] },
  { id: 3, name: "Glow Booster Serum", price: 27.99, rating: 4.7, image: prodGlow, badge: "BESTSELLER", ingredients: ["Niacinamide", "Squalane", "Papaya Extract"] },
  { id: 4, name: "Retinol Night Serum", price: 29.99, rating: 4.8, image: prodRetinol, badge: "NEW", ingredients: ["Retinol", "Peptides", "Ceramides"] },
  { id: 5, name: "Rose Water Toner", price: 18.99, rating: 4.9, image: prodRoseToner, badge: "BESTSELLER", ingredients: ["Rose Water", "Aloe Vera", "Witch Hazel"] },
  { id: 6, name: "Brightening Eye Cream", price: 21.99, rating: 4.7, image: prodEyeCream, badge: "BESTSELLER", ingredients: ["Caffeine", "Vitamin C", "Peptides"] },
  { id: 7, name: "Niacinamide Serum", price: 19.99, rating: 4.8, image: prodNiacinamide, badge: "BESTSELLER", ingredients: ["Niacinamide", "Zinc PCA"] },
  { id: 8, name: "AHA/BHA Exfoliant", price: 23.99, rating: 4.9, image: prodAhaBha, badge: "BESTSELLER", ingredients: ["Glycolic Acid", "Salicylic Acid", "Lactic Acid"] },
  { id: 9, name: "Peptide Face Mist", price: 20.99, rating: 4.8, image: prodPeptideMist, badge: "NEW", ingredients: ["Peptides", "Green Tea", "Rose Water"] },
  { id: 10, name: "Overnight Repair Cream", price: 26.99, rating: 4.9, image: prodRepairCream, badge: "NEW", ingredients: ["Ceramides", "Shea Butter", "Hyaluronic Acid"] },
];

export function FeaturedProducts() {
  const { addToCart, setCurrentView, setSelectedProductId } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  return (
    <section id="best-sellers" className="py-12 md:py-[80px] bg-[#FFEFED] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-[80px]">
          <h2 className="font-serif text-[40px] font-bold text-[#1A1A1A] mb-1 leading-none">
            Best Sellers
          </h2>
          <p className="font-sans text-[#888888] text-[16px] italic">The glow routine, curated.</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-5">
          {products.map((product) => (
            <div 
              key={product.id} 
              onClick={() => {
                setSelectedProductId(product.id);
                setCurrentView('product-detail');
              }}
              className="group flex flex-col bg-white rounded-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.04)] relative overflow-hidden h-full cursor-pointer hover:shadow-md transition-shadow duration-300"
            >
              
              <div className="w-full h-[60%] bg-gray-50 overflow-hidden relative border-b border-pink-50 min-h-[180px]">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400 ease-out"
                  referrerPolicy="no-referrer"
                />
                
                {product.badge && (
                  <div className="absolute top-2 left-2 bg-[#FF6C84] px-2 py-0.5 rounded-[4px] z-10">
                    <span className="font-sans text-[10px] font-bold text-white uppercase">
                      {product.badge}
                    </span>
                  </div>
                )}

                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (isInWishlist(product.id)) {
                      removeFromWishlist(product.id);
                    } else {
                      addToWishlist(product);
                    }
                  }}
                  className="absolute top-2 right-2 z-10 bg-white/90 backdrop-blur-md p-1.5 rounded-full shadow-sm transition-all duration-300 hover:scale-110"
                  aria-label="Toggle wishlist"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" stroke="currentColor" fill="none" className={`transition-all duration-200 ${isInWishlist(product.id) ? 'stroke-[#FF6C84] fill-[#FF6C84]' : 'stroke-[#BBBBBB]'}`}>
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
              
              <div className="p-3 pb-[60px] lg:pb-3 flex-1 flex flex-col relative z-20 bg-white">
                <div className="flex gap-0.5 mb-1.5 text-[#C9A84C] items-center">
                  <svg width="0" height="0" className="absolute">
                    <defs>
                      <linearGradient id={`star-partial-${product.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset={`${(product.rating % 1) * 100}%`} stopColor="#C9A84C" />
                        <stop offset={`${(product.rating % 1) * 100}%`} stopColor="#E5E5E5" />
                      </linearGradient>
                    </defs>
                  </svg>
                  {[...Array(5)].map((_, i) => {
                    const isFull = i < Math.floor(product.rating);
                    const isPartial = i === Math.floor(product.rating);
                    const fillValue = isFull ? "#C9A84C" : isPartial ? `url(#star-partial-${product.id})` : "#E5E5E5";
                    
                    return (
                      <svg key={i} width="14" height="14" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill={fillValue}/>
                      </svg>
                    );
                  })}
                  <span className="font-sans text-[12px] text-[#C9A84C] font-semibold ml-1">{product.rating}</span>
                </div>
                
                <h3 className="font-sans font-semibold text-[#1A1A1A] text-[14px] mb-2 leading-[1.3] line-clamp-2">
                  {product.name}
                </h3>
                
                <div className="mt-auto">
                  <span className="font-sans font-bold text-[#FF6C84] text-[16px]">${product.price}</span>
                </div>
              </div>

              {/* Slide-up Add to Cart button */}
              <div className="absolute bottom-3 left-3 right-3 translate-y-[150%] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out z-30 hidden lg:block">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product);
                  }}
                  className="w-full bg-[#FF6C84] text-white font-sans text-[14px] font-semibold py-2.5 flex items-center justify-center rounded-full shadow-md"
                >
                  Add to Cart
                </button>
              </div>
              
              {/* Mobile always visible */}
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(product);
                }}
                className="w-[calc(100%-24px)] bg-[#FF6C84] text-white font-sans text-[13px] font-semibold py-2.5 rounded-full lg:hidden absolute bottom-3 left-3 z-30 animate-none"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
