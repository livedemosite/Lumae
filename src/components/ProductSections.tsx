import React, { useState, useMemo } from 'react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { SlidersHorizontal, X, RotateCcw, Sparkles } from 'lucide-react';

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
  const { setCurrentView } = useCart();

  const handleGoToShop = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentView('shop');
  };

  return (
    <section id="shop-concern" className="py-12 md:py-[80px] bg-white scroll-mt-20">
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
              href="#" 
              onClick={handleGoToShop}
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
  { id: 1, name: "Vitamin C Brightening Serum", price: 24.99, rating: 4.8, image: prodVitC, badge: "BESTSELLER", ingredients: ["Vitamin C", "Ferulic Acid", "Vitamin E"], skinTypes: ["Dry", "Oily", "Combination", "Acne-Prone"] },
  { id: 2, name: "Hyaluronic Acid Serum", price: 22.99, rating: 4.9, image: prodHyaluronic, badge: "BESTSELLER", ingredients: ["Hyaluronic Acid", "Vitamin B5"], skinTypes: ["Dry", "Sensitive"] },
  { id: 3, name: "Glow Booster Serum", price: 27.99, rating: 4.7, image: prodGlow, badge: "BESTSELLER", ingredients: ["Niacinamide", "Squalane", "Papaya Extract"], skinTypes: ["Dry", "Oily", "Combination"] },
  { id: 4, name: "Retinol Night Serum", price: 29.99, rating: 4.8, image: prodRetinol, badge: "NEW", ingredients: ["Retinol", "Peptides", "Ceramides"], skinTypes: ["Oily", "Combination"] },
  { id: 5, name: "Rose Water Toner", price: 18.99, rating: 4.9, image: prodRoseToner, badge: "BESTSELLER", ingredients: ["Rose Water", "Aloe Vera", "Witch Hazel"], skinTypes: ["Dry", "Sensitive", "Combination"] },
  { id: 6, name: "Brightening Eye Cream", price: 21.99, rating: 4.7, image: prodEyeCream, badge: "BESTSELLER", ingredients: ["Caffeine", "Vitamin C", "Peptides"], skinTypes: ["Sensitive", "Dry"] },
  { id: 7, name: "Niacinamide Serum", price: 19.99, rating: 4.8, image: prodNiacinamide, badge: "BESTSELLER", ingredients: ["Niacinamide", "Zinc PCA"], skinTypes: ["Oily", "Combination", "Acne-Prone"] },
  { id: 8, name: "AHA/BHA Exfoliant", price: 23.99, rating: 4.9, image: prodAhaBha, badge: "BESTSELLER", ingredients: ["Glycolic Acid", "Salicylic Acid", "Lactic Acid"], skinTypes: ["Oily", "Combination", "Acne-Prone"] },
  { id: 9, name: "Peptide Face Mist", price: 20.99, rating: 4.8, image: prodPeptideMist, badge: "NEW", ingredients: ["Peptides", "Green Tea", "Rose Water"], skinTypes: ["Sensitive", "Dry", "Combination"] },
  { id: 10, name: "Overnight Repair Cream", price: 26.99, rating: 4.9, image: prodRepairCream, badge: "NEW", ingredients: ["Ceramides", "Shea Butter", "Hyaluronic Acid"], skinTypes: ["Dry", "Sensitive"] },
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
                      <linearGradient id={`star-partial-home-${product.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset={`${(product.rating % 1) * 100}%`} stopColor="#C9A84C" />
                        <stop offset={`${(product.rating % 1) * 100}%`} stopColor="#E5E5E5" />
                      </linearGradient>
                    </defs>
                  </svg>
                  {[...Array(5)].map((_, i) => {
                    const isFull = i < Math.floor(product.rating);
                    const isPartial = i === Math.floor(product.rating);
                    const fillValue = isFull ? "#C9A84C" : isPartial ? `url(#star-partial-home-${product.id})` : "#E5E5E5";
                    
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
                  className="w-full bg-[#FF6C84] hover:bg-[#ff5570] text-white font-sans text-xs font-bold py-2.5 flex items-center justify-center rounded-full shadow-md"
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
                className="w-[calc(100%-24px)] bg-[#FF6C84] active:bg-[#ff5570] text-white font-sans text-[13px] font-semibold py-2.5 rounded-full lg:hidden absolute bottom-3 left-3 z-30"
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

export function ShopPage() {
  const { addToCart, setCurrentView, setSelectedProductId } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  // Filter States
  const [selectedSkinTypes, setSelectedSkinTypes] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(35);
  const [sortBy, setBy] = useState<string>('trending');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState<boolean>(false);

  const skinTypeOptions = ['Dry', 'Oily', 'Combination', 'Sensitive', 'Acne-Prone'];

  const toggleSkinType = (skinType: string) => {
    setSelectedSkinTypes(prev =>
      prev.includes(skinType)
        ? prev.filter(t => t !== skinType)
        : [...prev, skinType]
    );
  };

  const handlePricePreset = (preset: 'under-20' | 'under-25' | 'all') => {
    if (preset === 'under-20') setMaxPrice(20);
    else if (preset === 'under-25') setMaxPrice(25);
    else if (preset === 'all') setMaxPrice(35);
  };

  const clearFilters = () => {
    setSelectedSkinTypes([]);
    setMaxPrice(35);
    setBy('trending');
  };

  // Memoized filter-and-sort execution
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by selected skin types
    if (selectedSkinTypes.length > 0) {
      result = result.filter(product => {
        const prodTypes = (product as any).skinTypes || [];
        return selectedSkinTypes.some(t => prodTypes.includes(t));
      });
    }

    // Filter by max price
    result = result.filter(product => product.price <= maxPrice);

    // Sorting implementations
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [selectedSkinTypes, maxPrice, sortBy]);

  const activeFilterCount = selectedSkinTypes.length + (maxPrice < 35 ? 1 : 0) + (sortBy !== 'trending' ? 1 : 0);

  const FilterContent = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div className="space-y-8">
      {/* Title & Reset Row */}
      <div className="flex items-center justify-between pb-3 border-b border-pink-100/60">
        <h3 className="font-sans font-bold text-base text-[#1A1A1A] flex items-center gap-1.5">
          <SlidersHorizontal className="w-4 h-4 text-[#FF6C84]" />
          <span>Skincare Filters</span>
        </h3>
        {activeFilterCount > 0 && (
          <button
            onClick={clearFilters}
            className="text-[12px] font-sans font-bold text-[#FF6C84] hover:text-[#ff5570] flex items-center gap-1 cursor-pointer transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Skin Type Filters */}
      <div className="space-y-3.5">
        <label className="font-sans text-xs font-bold text-gray-400 uppercase tracking-wider block">
          Target Skin Type
        </label>
        <div className="space-y-2.5">
          {skinTypeOptions.map((type) => {
            const isChecked = selectedSkinTypes.includes(type);
            return (
              <label 
                key={type} 
                className="flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleSkinType(type)}
                    className="w-4 h-4 rounded border-pink-200 text-[#FF6C84] focus:ring-[#FF6C84] cursor-pointer accent-[#FF6C84]"
                  />
                  <span className={`font-sans text-[13.5px] transition-colors duration-150 ${isChecked ? 'text-[#FF6C84] font-bold' : 'text-gray-600 group-hover:text-gray-900'}`}>
                    {type} Skin
                  </span>
                </div>
                <span className="font-sans text-[11px] text-gray-400 font-medium px-2 py-0.5 rounded-full bg-gray-50 group-hover:bg-pink-50 transition-colors">
                  {products.filter(p => ((p as any).skinTypes || []).includes(type)).length}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Price Range Slider */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <label className="font-sans text-xs font-bold text-gray-400 uppercase tracking-wider">
            Price Bracket
          </label>
          <span className="font-sans text-sm font-bold text-[#FF6C84] bg-pink-50 px-2.5 py-0.5 rounded-full">
            Under ${maxPrice.toFixed(0)}
          </span>
        </div>
        <div className="space-y-3">
          <input
            type="range"
            min="15"
            max="35"
            step="1"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full h-1.5 bg-pink-100 rounded-lg appearance-none cursor-pointer accent-[#FF6C84] focus:outline-none"
          />
          <div className="flex justify-between font-sans text-[11px] text-gray-400 font-bold px-0.5">
            <span>Min: $15</span>
            <span>Max: $35</span>
          </div>
          
          {/* Preset Buttons */}
          <div className="grid grid-cols-3 gap-1.5 pt-1.5">
            <button
              onClick={() => handlePricePreset('under-20')}
              className={`font-sans text-[11px] py-1.5 px-1 rounded-md border text-center transition-all cursor-pointer font-semibold ${maxPrice === 20 ? 'border-[#FF6C84] bg-[#FF6C84]/10 text-[#FF6C84] font-bold' : 'border-gray-100 bg-white text-gray-500 hover:bg-gray-50'}`}
            >
              Under $20
            </button>
            <button
              onClick={() => handlePricePreset('under-25')}
              className={`font-sans text-[11px] py-1.5 px-1 rounded-md border text-center transition-all cursor-pointer font-semibold ${maxPrice === 25 ? 'border-[#FF6C84] bg-[#FF6C84]/10 text-[#FF6C84] font-bold' : 'border-gray-100 bg-white text-gray-500 hover:bg-gray-50'}`}
            >
              Under $25
            </button>
            <button
              onClick={() => handlePricePreset('all')}
              className={`font-sans text-[11px] py-1.5 px-1 rounded-md border text-center transition-all cursor-pointer font-semibold ${maxPrice === 35 ? 'border-[#FF6C84] bg-[#FF6C84]/10 text-[#FF6C84] font-bold' : 'border-gray-100 bg-white text-gray-500 hover:bg-gray-50'}`}
            >
              Show All
            </button>
          </div>
        </div>
      </div>

      {/* Sorting Dropdown/Radio in Sidebar */}
      <div className="space-y-3.5">
        <label className="font-sans text-xs font-bold text-gray-400 uppercase tracking-wider block">
          Sort Products
        </label>
        <div className="space-y-2">
          {[
            { id: 'trending', label: 'Featured / Trending' },
            { id: 'price-asc', label: 'Price: Low to High' },
            { id: 'price-desc', label: 'Price: High to Low' },
            { id: 'rating', label: 'Customer Rating' },
          ].map(opt => (
            <label key={opt.id} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="radio"
                name={isMobile ? "sort-mobile" : "sort-desktop"}
                checked={sortBy === opt.id}
                onChange={() => setBy(opt.id)}
                className="w-4 h-4 text-[#FF6C84] border-gray-200 focus:ring-[#FF6C84] accent-[#FF6C84]"
              />
              <span className={`font-sans text-[13px] transition-colors ${sortBy === opt.id ? 'text-[#FF6C84] font-bold' : 'text-gray-500 group-hover:text-gray-800'}`}>
                {opt.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Glow Tips Badge */}
      <div className="bg-[#FFEFED] rounded-xl p-4 border border-pink-100 flex gap-2.5 items-start">
        <Sparkles className="w-4 h-4 text-[#FF6C84] shrink-0 mt-0.5" />
        <p className="font-sans text-[11px] text-[#A64554] leading-relaxed">
          <strong className="block font-bold mb-0.5 text-[#FF6C84]">Clean Formulation</strong>
          Select active skin concerns to explore organic recipes catered to you.
        </p>
      </div>

    </div>
  );

  return (
    <section id="shop-all" className="py-12 md:py-[80px] bg-[#FFEFED] scroll-mt-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Heading Panel */}
        <div className="text-center mb-10 md:mb-[60px]">
          <h2 className="font-serif text-[40px] font-bold text-[#1A1A1A] mb-1 leading-none">
            Shop All Products
          </h2>
          <p className="font-sans text-[#888888] text-[16px] italic">Find tailored solutions for your skin's vital radiance</p>
        </div>

        {/* Mobile Control Header (Mobile-Only Filter Button) */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 bg-white/70 backdrop-blur-md p-4 rounded-2xl border border-pink-100/40 lg:hidden shadow-xs">
          <button
            onClick={() => setIsMobileFiltersOpen(true)}
            className="flex items-center gap-2 bg-[#FF6C84] text-white px-4 py-2.5 rounded-full font-sans font-bold text-xs shadow-xs hover:bg-[#ff5570] transition-colors cursor-pointer"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters & Sort</span>
            {activeFilterCount > 0 && (
              <span className="bg-white text-[#FF6C84] rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-black">
                {activeFilterCount}
              </span>
            )}
          </button>
          
          <div className="font-sans text-xs text-gray-500 font-semibold">
            Showing <span className="text-[#FF6C84]">{filteredProducts.length}</span> recipes
          </div>
        </div>

        {/* Global Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* DESKTOP SIDEBAR FILTER */}
          <div className="hidden lg:block lg:col-span-1 bg-white rounded-[24px] p-6 border border-pink-100/60 shadow-xs sticky top-24 self-start">
            <FilterContent />
          </div>

          {/* MAIN COLUMN (ACTIVE CHIPS + PRODUCT LISTING) */}
          <div className="lg:col-span-3 space-y-6">

            {/* Desktop Top Control Panel Info & Dual Sorting Quick-Access */}
            <div className="hidden lg:flex items-center justify-between bg-white/45 backdrop-blur-md px-5 py-3 rounded-xl border border-pink-100/20">
              <span className="font-sans text-xs text-gray-500 font-medium">
                We've found <strong className="text-gray-800">{filteredProducts.length}</strong> perfect recipe matches
              </span>
              
              <div className="flex items-center gap-2.5">
                <span className="font-sans text-xs text-gray-400 font-bold uppercase tracking-wider">Quick Sort:</span>
                <select 
                  value={sortBy} 
                  onChange={(e) => setBy(e.target.value)}
                  className="font-sans text-xs text-gray-700 bg-white border border-gray-100 hover:border-pink-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#FF6C84] cursor-pointer shadow-2xs"
                >
                  <option value="trending">Featured / Trending</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Star Rating</option>
                </select>
              </div>
            </div>

            {/* Selected active dismissible chips */}
            {activeFilterCount > 0 && (
              <div className="flex flex-wrap items-center gap-2 bg-white/30 p-2 rounded-xl border border-pink-100/10 backdrop-blur-xs">
                <span className="font-sans text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-2">Applied:</span>
                {selectedSkinTypes.map(type => (
                  <span 
                    key={type}
                    className="inline-flex items-center gap-1.5 bg-white border border-pink-100/80 px-2.5 py-1 rounded-full font-sans text-xs text-[#FF6C84] font-bold shadow-2xs"
                  >
                    <span>{type} Skin</span>
                    <button onClick={() => toggleSkinType(type)} className="hover:bg-pink-100 text-pink-400 rounded-full cursor-pointer p-0.5">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                {maxPrice < 35 && (
                  <span className="inline-flex items-center gap-1.5 bg-white border border-pink-100/80 px-2.5 py-1 rounded-full font-sans text-xs text-[#FF6C84] font-bold shadow-2xs">
                    <span>Under ${maxPrice}</span>
                    <button onClick={() => setMaxPrice(35)} className="hover:bg-pink-100 text-pink-400 rounded-full cursor-pointer p-0.5">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {sortBy !== 'trending' && (
                  <span className="inline-flex items-center gap-1.5 bg-white border border-pink-100/80 px-2.5 py-1 rounded-full font-sans text-xs text-[#FF6C84] font-bold shadow-2xs">
                    <span>Sort: {sortBy === 'price-asc' ? 'Low-High' : sortBy === 'price-desc' ? 'High-Low' : 'Stars'}</span>
                    <button onClick={() => setBy('trending')} className="hover:bg-pink-100 text-pink-400 rounded-full cursor-pointer p-0.5">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                <button
                  onClick={clearFilters}
                  className="font-sans text-[11px] font-bold text-gray-500 hover:text-[#FF6C84] transition-colors underline underline-offset-2 hover:decoration-solid decoration-dotted ml-2 cursor-pointer"
                >
                  Clear All
                </button>
              </div>
            )}

            {/* Result Grid */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-3xl border border-dashed border-pink-200/50 p-12 text-center max-w-md mx-auto my-12 shadow-2xs">
                <div className="w-14 h-14 bg-pink-50 text-[#FF6C84] rounded-full flex items-center justify-center mx-auto mb-4">
                  <SlidersHorizontal className="w-6 h-6 animate-pulse" />
                </div>
                <h3 className="font-sans font-bold text-[#1A1A1A] text-lg mb-1">No recipes found</h3>
                <p className="font-sans text-xs text-gray-400 mb-6 max-w-xs mx-auto leading-relaxed">
                  We couldn't find any glow items matching your current criteria. Consider adjusting your tags or price slide limits to explore other formulas.
                </p>
                <button
                  onClick={clearFilters}
                  className="bg-[#FF6C84] hover:bg-[#ff5570] text-white text-xs font-semibold py-2.5 px-6 rounded-full transition-colors font-sans flex items-center gap-1.5 mx-auto shadow-xs cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset All Filters</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div 
                    key={product.id} 
                    onClick={() => {
                      setSelectedProductId(product.id);
                      setCurrentView('product-detail');
                    }}
                    className="group flex flex-col bg-white rounded-[16px] shadow-[0_4px_16px_rgba(0,0,0,0.03)] relative overflow-hidden h-full cursor-pointer hover:shadow-md transition-shadow duration-300 border border-pink-50/40"
                  >
                    
                    <div className="w-full h-[60%] bg-gray-50 overflow-hidden relative border-b border-pink-50 min-h-[180px]">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400 ease-out"
                        referrerPolicy="no-referrer"
                      />
                      
                      {product.badge && (
                        <div className="absolute top-2.5 left-2.5 bg-[#FF6C84] px-2.5 py-0.5 rounded-[4px] z-10">
                          <span className="font-sans text-[9px] font-bold text-white uppercase tracking-wider">
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
                        className="absolute top-2.5 right-2.5 z-10 bg-white/90 backdrop-blur-md p-1.5 rounded-full shadow-sm transition-all duration-300 hover:scale-110"
                        aria-label="Toggle wishlist"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" stroke="currentColor" fill="none" className={`transition-all duration-200 ${isInWishlist(product.id) ? 'stroke-[#FF6C84] fill-[#FF6C84]' : 'stroke-[#BBBBBB]'}`}>
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
                        </svg>
                      </button>
                    </div>
                    
                    <div className="p-4 pb-[68px] lg:pb-4 flex-1 flex flex-col relative z-20 bg-white">
                      
                      {/* Rating stars */}
                      <div className="flex gap-0.5 mb-1.5 text-[#C9A84C] items-center">
                        <svg width="0" height="0" className="absolute">
                          <defs>
                            <linearGradient id={`star-partial-shop-${product.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset={`${(product.rating % 1) * 100}%`} stopColor="#C9A84C" />
                              <stop offset={`${(product.rating % 1) * 100}%`} stopColor="#E5E5E5" />
                            </linearGradient>
                          </defs>
                        </svg>
                        {[...Array(5)].map((_, i) => {
                          const isFull = i < Math.floor(product.rating);
                          const isPartial = i === Math.floor(product.rating);
                          const fillValue = isFull ? "#C9A84C" : isPartial ? `url(#star-partial-shop-${product.id})` : "#E5E5E5";
                          
                          return (
                            <svg key={i} width="12" height="12" viewBox="0 0 24 24">
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill={fillValue}/>
                            </svg>
                          );
                        })}
                        <span className="font-sans text-[11px] text-[#C9A84C] font-semibold ml-1">{product.rating}</span>
                      </div>
                      
                      <h3 className="font-sans font-semibold text-[#1A1A1A] text-[13.5px] mb-1.5 leading-[1.3] line-clamp-2">
                        {product.name}
                      </h3>

                      {/* Display targeted skin types badge */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {((product as any).skinTypes || []).slice(0, 2).map((t: string) => (
                          <span key={t} className="font-sans text-[9px] font-bold text-gray-400 bg-gray-50 border border-gray-100 px-1.5 py-0.5 rounded">
                            {t}
                          </span>
                        ))}
                      </div>
                      
                      <div className="mt-auto">
                        <span className="font-sans font-bold text-[#FF6C84] text-[15.5px]">${product.price}</span>
                      </div>
                    </div>

                    {/* Desktop Hover Slide-up Button */}
                    <div className="absolute bottom-3 left-3 right-3 translate-y-[150%] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out z-30 hidden lg:block">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(product);
                        }}
                        className="w-full bg-[#FF6C84] hover:bg-[#ff5570] text-white font-sans text-xs font-bold py-2.5 flex items-center justify-center rounded-full shadow-md cursor-pointer"
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
                      className="w-[calc(100%-24px)] bg-[#FF6C84] active:bg-[#ff5570] text-white font-sans text-[12px] font-bold py-2.5 rounded-full lg:hidden absolute bottom-3 left-3 z-30 cursor-pointer shadow-sm"
                    >
                      Add to Cart
                    </button>
                  </div>
                ))}
              </div>
            )}

          </div>

        </div>

      </div>

      {/* MOBILE OVERLAY FILTER DRAWER */}
      {isMobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
          {/* Transparent Dark Backdrop */}
          <div 
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setIsMobileFiltersOpen(false)}
          ></div>
          
          {/* Drawer Body container */}
          <div className="relative w-80 bg-white h-full shadow-2xl p-6 overflow-y-auto flex flex-col justify-between border-l border-pink-100 z-50 transition-transform duration-300 animate-none">
            <div className="space-y-6">
              
              {/* Header inside drawer */}
              <div className="flex justify-between items-center pb-3 border-b border-pink-100">
                <span className="font-serif font-black text-lg text-[#1A1A1A]">Filters & Sort</span>
                <button 
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="p-1 rounded-full text-gray-400 hover:text-[#FF6C84] hover:bg-pink-50 cursor-pointer"
                  title="Close Filters"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Injected Widget Filter forms */}
              <FilterContent isMobile={true} />

            </div>

            {/* Bottom sticky Apply button */}
            <div className="pt-6 border-t border-pink-50 mt-6 shrink-0">
              <button
                onClick={() => setIsMobileFiltersOpen(false)}
                className="w-full bg-[#FF6C84] text-white py-3 rounded-full font-sans font-bold text-xs shadow-md"
              >
                Apply Filters ({filteredProducts.length} Results)
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
