import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { products } from './ProductSections';
import { motion, AnimatePresence } from 'motion/react';

// Related products list with unique images, details, and review records
const relatedProducts = [
  {
    id: 101,
    name: "Glow Radiance Cleanser & Makeup Remover",
    price: 18.99,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?q=80&w=600&auto=format&fit=crop",
    reviewsCount: 94,
    badge: "DAILY ROUTINE"
  },
  {
    id: 102,
    name: "Overnight Botanical Repairing Gel Face Mask",
    price: 21.00,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=600&auto=format&fit=crop",
    reviewsCount: 81,
    badge: "GLOW TREAT"
  },
  {
    id: 103,
    name: "Mineral Clay Detoxifying Body & Face Scrub",
    price: 24.50,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop",
    reviewsCount: 112,
    badge: "ORGANIC SCRUB"
  },
  {
    id: 104,
    name: "Rose Gold Nourishing Elixir & Lip Serum",
    price: 19.99,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=600&auto=format&fit=crop",
    reviewsCount: 68,
    badge: "ELIXIR GLOW"
  }
];

// Helper SVGs to adhere strictly to "no emojis, inline SVGs only"
const StarIcon = ({ filled = true, size = 16 }: { filled?: boolean; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? "#C9A84C" : "none"} stroke={filled ? "#C9A84C" : "#E5E5E5"} strokeWidth={filled ? "0" : "2"} className="shrink-0">
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

const CircleCheckIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="shrink-0">
    <circle cx="12" cy="12" r="10" fill="#FFEFED" />
    <circle cx="12" cy="12" r="9" stroke="#FF6C84" strokeWidth="2" />
    <path d="M8 12l3 3 5-5" stroke="#FF6C84" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SmallCircleCheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="shrink-0">
    <circle cx="12" cy="12" r="10" fill="#E8F5E9" />
    <path d="M8 12l3 3 5-5" stroke="#2E7D32" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const LockIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF6C84" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const RefreshIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF6C84" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
    <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
  </svg>
);

const TruckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF6C84" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
    <rect x="1" y="3" width="15" height="13" />
    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
    <circle cx="5.5" cy="18.5" r="2.5" />
    <circle cx="18.5" cy="18.5" r="2.5" />
  </svg>
);

const LeafIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF6C84" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8a9 9 0 0 1-10 10z" />
    <path d="M19 21c-4.3-1.63-7.2-5-9-9" />
  </svg>
);

const DropletIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FF6C84" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22a7 7 0 0 0 7-7c0-4.3-7-13-7-13S5 10.7 5 15a7 7 0 0 0 7 7z" />
  </svg>
);

const ShieldIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FF6C84" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const Sparkle32Icon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FF6C84" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const LeftArrowIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF6C84" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const RightArrowIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF6C84" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const ShareIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </svg>
);

const HeartOutlineIcon = ({ filled = false }: { filled?: boolean }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill={filled ? "#FF6C84" : "none"} stroke={filled ? "#FF6C84" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const MinusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF6C84" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF6C84" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

export function ProductDetail() {
  const { selectedProductId, setCurrentView, addToCart, setSelectedProductId } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState<'how' | 'ingredients' | 'benefits'>('how');
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isPulsing, setIsPulsing] = useState(false);
  const [copied, setCopied] = useState(false);

  // Collect both standard and related products to ensure complete navigation support
  const allAvailableProducts = [...products, ...relatedProducts];
  const product = allAvailableProducts.find((p) => p.id === selectedProductId) || products[0];

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) {
      addToCart(product);
    }
  };

  const handleAddToCartGlow = () => {
    setIsPulsing(true);
    setTimeout(() => setIsPulsing(false), 200);
    handleAddToCart();
  };

  const isLiked = isInWishlist(product.id);

  // Dynamic gallery image compiler using the main product image and unique unsplash closeups
  const galleryImages = [
    product.image,
    "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=600&auto=format&fit=crop", // dropper close up
    "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=600&auto=format&fit=crop", // glow texture
    "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=600&auto=format&fit=crop"  // cream swipe
  ];

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Staggered trust badges scroll enter animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const badgeVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  return (
    <div className="bg-white min-h-screen py-10 md:py-[80px]" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back navigation */}
        <button 
          onClick={() => setCurrentView('shop')}
          className="inline-flex items-center gap-2 font-sans font-semibold text-[#1A1A1A] hover:text-[#FF6C84] transition-colors mb-8 group cursor-pointer"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          <span className="text-[14px] uppercase tracking-wider">Back to Shop</span>
        </button>

        {/* Product Layout: Two Column on Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-[52%_48%] gap-12 lg:gap-16 items-start">
          
          {/* LEFT COLUMN: IMAGE GALLERY (Non-sticky container, main image stays in place) */}
          <div className="w-full flex flex-col gap-4">
            
            {/* Main Image Slider Frame */}
            <div className="w-full max-w-[560px] aspect-square rounded-[16px] bg-[#FFFFFF] border border-[#FFEFED]/60 overflow-hidden relative shadow-md flex items-center justify-center select-none group">
              
              <AnimatePresence mode="wait">
                <motion.img 
                  key={activeImageIndex}
                  src={galleryImages[activeImageIndex]} 
                  alt={product.name} 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </AnimatePresence>

              {/* Bestseller Badge */}
              <div className="absolute top-4 left-4 bg-[#FF6C84] px-3 py-1 rounded-full z-10">
                <span className="font-sans text-[11px] font-bold text-white uppercase tracking-wider">
                  BESTSELLER
                </span>
              </div>

              {/* Image Navigation Overlaid Arrows */}
              <button
                onClick={handlePrevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md border border-[#FFEFED] hover:scale-105 active:scale-95 transition-all text-[#FF6C84] z-20 cursor-pointer"
                aria-label="Previous image"
              >
                <LeftArrowIcon />
              </button>

              <button
                onClick={handleNextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md border border-[#FFEFED] hover:scale-105 active:scale-95 transition-all text-[#FF6C84] z-20 cursor-pointer"
                aria-label="Next image"
              >
                <RightArrowIcon />
              </button>
            </div>

            {/* Gallery Thumbnail Strip */}
            <div className="flex gap-3 overflow-x-auto pb-1 mt-1 scrollbar-thin">
              {galleryImages.map((thumb, idx) => {
                const isActive = activeImageIndex === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-[80px] h-[80px] shrink-0 rounded-[8px] overflow-hidden bg-white cursor-pointer transition-transform duration-200 hover:scale-103 ${
                      isActive ? 'border-2 border-[#FF6C84]' : 'border-2 border-[#FFE0E5]'
                    }`}
                  >
                    <img 
                      src={thumb} 
                      alt={`Thumbnail ${idx + 1}`} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                );
              })}
            </div>

          </div>

          {/* RIGHT COLUMN: PRODUCT DETAILS (Sticky right column while images scroll or stay in place) */}
          <div className="lg:sticky lg:top-24 flex flex-col gap-6">
            
            {/* Rating row */}
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="inline-flex"><StarIcon /></span>
                ))}
              </div>
              <span className="font-sans text-[13px] text-[#888888] font-medium tracking-wide">
                (4.9/5.0 · 127 Reviews)
              </span>
            </div>

            {/* Product Name */}
            <h1 className="font-serif text-[40px] font-bold text-[#1A1A1A] leading-[1.12]">
              {product.name}
            </h1>

            {/* Price Row */}
            <div className="flex items-center gap-3">
              <span className="font-sans font-bold text-[#FF6C84] text-[28px]">
                ${product.price.toFixed(2)}
              </span>
              <span className="font-sans text-[18px] text-[#888888] line-through">
                ${(product.price / 0.77).toFixed(2)}
              </span>
              <span className="bg-[#E8F5E9] text-[#2E7D32] font-sans text-[12px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                Save 23%
              </span>
            </div>

            {/* Short description */}
            <p className="font-sans text-[#666666] text-[15px] leading-[1.7] max-h-[80px] overflow-hidden text-ellipsis line-clamp-3">
              Explore the ultimate dermal luxury with Lumae. Handcrafted from clinical biocompatible boosters, this professional-grade skin recipe targets deep cell layers to lock in long-lasting moisture, repair active surface texture, and unveil your vital radiant glow.
            </p>

            {/* Key benefits 2x2 Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-b border-[#FFE0E5]/50 py-5">
              <div className="flex items-center gap-3">
                <CircleCheckIcon />
                <span className="font-sans font-bold text-[14px] text-[#1A1A1A]">Organic Hyaluronic Acid</span>
              </div>
              <div className="flex items-center gap-3">
                <CircleCheckIcon />
                <span className="font-sans font-bold text-[14px] text-[#1A1A1A]">Vitamin B5 Complex</span>
              </div>
              <div className="flex items-center gap-3">
                <CircleCheckIcon />
                <span className="font-sans font-bold text-[14px] text-[#1A1A1A]">100% Vegan</span>
              </div>
              <div className="flex items-center gap-3">
                <CircleCheckIcon />
                <span className="font-sans font-bold text-[14px] text-[#1A1A1A]">Dermatologist Tested</span>
              </div>
            </div>

            {/* Free shipping threshold bar */}
            <div className="bg-[#FFEFED] rounded-[12px] p-4 flex flex-col gap-2.5">
              <div className="flex items-center gap-2.5">
                <TruckIcon />
                <span className="font-sans text-[13px] text-[#1A1A1A] font-semibold">
                  Add $27.01 more for FREE shipping
                </span>
              </div>
              <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div className="w-[40%] h-full bg-[#FF6C84] rounded-full" />
              </div>
            </div>

            {/* Qty and Primary Add to Cart Row */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              
              {/* Quantity selector */}
              <div className="flex items-center justify-between border border-[#FFE0E5] rounded-[16px] p-1.5 h-[52px] w-full sm:w-[130px] bg-white">
                <button 
                  onClick={() => setQty(q => Math.max(1, q - 1))}
                  className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-[#FFEFED] transition-colors select-none cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  <MinusIcon />
                </button>
                <span className="font-sans font-bold text-[16px] text-[#1A1A1A] select-none text-center">
                  {qty}
                </span>
                <button 
                  onClick={() => setQty(q => q + 1)}
                  className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-[#FFEFED] transition-colors select-none cursor-pointer"
                  aria-label="Increase quantity"
                >
                  <PlusIcon />
                </button>
              </div>

              {/* Solid primary add to cart button */}
              <motion.button
                animate={isPulsing ? { scale: [0.97, 1.03, 1] } : { scale: 1 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                onClick={handleAddToCartGlow}
                className="flex-1 bg-[#FF6C84] hover:bg-[#ff5570] text-white font-sans font-semibold text-[16px] h-[52px] px-8 rounded-full flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md select-none border-0"
              >
                Add to Cart
              </motion.button>
            </div>

            {/* Wishlist + Share row */}
            <div className="flex items-center gap-6 py-1 select-none">
              <button 
                onClick={() => {
                  if (isLiked) {
                    removeFromWishlist(product.id);
                  } else {
                    addToWishlist(product);
                  }
                }}
                className="flex items-center gap-2 text-[#888888] hover:text-[#FF6C84] font-sans font-medium text-[13px] transition-colors cursor-pointer"
              >
                <HeartOutlineIcon filled={isLiked} />
                <span>{isLiked ? 'In Wishlist' : 'Add to Wishlist'}</span>
              </button>
              <button 
                onClick={handleShare}
                className="flex items-center gap-2 text-[#888888] hover:text-[#FF6C84] font-sans font-medium text-[13px] transition-colors cursor-pointer"
              >
                <ShareIcon />
                <span>{copied ? 'Link Copied!' : 'Share'}</span>
              </button>
            </div>

            {/* Staggered Trust Badges Row */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-20px" }}
              className="w-full bg-[#FFEFED] rounded-[12px] p-4 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-2 text-center"
            >
              {[
                { icon: <LockIcon />, label: "Secure Payment" },
                { icon: <RefreshIcon />, label: "30-Day Returns" },
                { icon: <TruckIcon />, label: "Fast Shipping" },
                { icon: <LeafIcon />, label: "Cruelty Free" }
              ].map((b, idx) => (
                <motion.div 
                  key={idx}
                  variants={badgeVariants}
                  className="flex flex-col items-center justify-center gap-1.5"
                >
                  <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-2xs">
                    {b.icon}
                  </div>
                  <span className="font-sans text-[12px] text-[#666666] font-medium leading-tight">
                    {b.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* Tabs details: HOW, INGREDIENTS, BENEFITS */}
            <div className="border-b border-[#FFE0E5] pb-2 mt-4">
              <div className="flex gap-8 border-b border-[#FFE0E5] mb-4">
                {[
                  { id: 'how', label: 'How to Use' },
                  { id: 'ingredients', label: 'Ingredients' },
                  { id: 'benefits', label: 'Benefits' }
                ].map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as 'how' | 'ingredients' | 'benefits')}
                      className={`font-sans font-bold text-[14px] pb-2 transition-all relative cursor-pointer ${
                        isActive ? 'text-[#FF6C84]' : 'text-[#999999] hover:text-[#666666]'
                      }`}
                    >
                      {tab.label}
                      {isActive && (
                        <motion.div 
                          layoutId="activeTabUnderline" 
                          className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#FF6C84]" 
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Tab switching panel with opacity transition */}
              <div className="min-h-[140px] py-2">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="font-sans text-[#666666] text-[15px] leading-[1.8]"
                  >
                    {activeTab === 'how' && (
                      <p>
                        Gently massage 2–3 drops of the clean serum concentrate onto freshly washed, damp skin morning and night. Allow 60 seconds of light, warm patting for the botanical molecules to fully penetrate the epidermis before layering with your preferred sealant cream, eye hydrators, or SPF.
                      </p>
                    )}
                    {activeTab === 'ingredients' && (
                      <div className="flex flex-wrap gap-2">
                        {["Liquid Peptide Complex", "Pure Hyaluronic Acid", "Organic Rose hydrosol", "Active Vitamin B5", "Organic Aloe leaf juice", "Cold-pressed Jojoba oil"].map((ing, i) => (
                          <span 
                            key={i} 
                            className="px-3.5 py-1.5 bg-[#FFEFED] text-[#FF6C84] border border-[#FF6C84] rounded-full font-sans text-[12px] font-semibold tracking-wide"
                          >
                            {ing}
                          </span>
                        ))}
                      </div>
                    )}
                    {activeTab === 'benefits' && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="bg-[#FFFFFF] border border-[#FFE0E5] p-3 rounded-[12px] shadow-2xs">
                          <div className="mb-1.5"><DropletIcon /></div>
                          <h5 className="font-sans font-bold text-[#1A1A1A] text-[14px] mb-1">Deep Hydration</h5>
                          <p className="font-sans text-[13px] text-[#666666] leading-relaxed line-clamp-2">
                            Restores moisture up to 24 hours.
                          </p>
                        </div>
                        <div className="bg-[#FFFFFF] border border-[#FFE0E5] p-3 rounded-[12px] shadow-2xs">
                          <div className="mb-1.5"><ShieldIcon /></div>
                          <h5 className="font-sans font-bold text-[#1A1A1A] text-[14px] mb-1">Barrier Protection</h5>
                          <p className="font-sans text-[13px] text-[#666666] leading-relaxed line-clamp-2">
                            Strengthens fragile skin defenses.
                          </p>
                        </div>
                        <div className="bg-[#FFFFFF] border border-[#FFE0E5] p-3 rounded-[12px] shadow-2xs">
                          <div className="mb-1.5"><Sparkle32Icon /></div>
                          <h5 className="font-sans font-bold text-[#1A1A1A] text-[14px] mb-1">Silky Glow</h5>
                          <p className="font-sans text-[13px] text-[#666666] leading-relaxed line-clamp-2">
                            Refines skin texture for brilliant shine.
                          </p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

          </div>
        </div>

        {/* CUSTOMER REVIEWS SECTION */}
        <section className="mt-20 border-t border-[#FFE0E5]/50 pt-16">
          <h2 className="font-serif text-[32px] font-bold text-[#1A1A1A] mb-8 text-center md:text-left">
            What Our Customers Say
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10 items-start">
            
            {/* Rating Summary Block */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-2 bg-[#FFEFED]/40 border border-[#FFE0E5]/40 rounded-[16px] p-6">
              <span className="font-serif text-[64px] font-bold text-[#C9A84C] leading-none mb-1">
                4.9
              </span>
              <div className="flex gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="inline-flex"><StarIcon size={18} /></span>
                ))}
              </div>
              <span className="font-sans text-[13px] text-[#888888] font-medium uppercase tracking-wider">
                Based on 127 reviews
              </span>
            </div>

            {/* Review Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { 
                  name: "Sarah Jenkins", 
                  loc: "New York, NY", 
                  text: "Absolutely skin-changing! My dry patches disappeared within a single week. The redness around my cheeks has completely subsided, leaving a hydrated glass skin finish. I love layering it with the Glow Booster." 
                },
                { 
                  name: "Michael Thorne", 
                  loc: "Los Angeles, CA", 
                  text: "Highly recommended by my dermatologist and absolutely lives up to the reputation. It absorbs effortlessly and doesn't clog my combination oily skin. The texture is extremely light, velvet-soft, and non-sticky." 
                },
                { 
                  name: "Eleanor Vance", 
                  loc: "Austin, TX", 
                  text: "This has become a cornerstone of my daily morning glow routine! The formula feels ultra premium, deeply soothing, and pure. Plus, their commitment to carbon neutral shipping and vegan inputs is incredible." 
                }
              ].map((rev, idx) => (
                <div 
                  key={idx}
                  className="bg-white border border-[#FFE0E5] rounded-[16px] p-5 flex flex-col gap-3.5 shadow-[0_4px_16px_rgba(0,0,0,0.02)]"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="inline-flex"><StarIcon size={14} /></span>
                      ))}
                    </div>
                    <div className="flex items-center gap-1.5 text-[#2E7D32] bg-[#E8F5E9] px-2 py-0.5 rounded-full">
                      <SmallCircleCheckIcon />
                      <span className="font-sans font-bold text-[11px] uppercase tracking-wide">
                        Verified Purchase
                      </span>
                    </div>
                  </div>

                  <p className="font-sans text-[14px] text-[#666666] leading-[1.7] flex-1">
                    "{rev.text}"
                  </p>

                  <div className="border-t border-[#FFE0E5]/40 pt-3">
                    <h5 className="font-sans font-bold text-[#1A1A1A] text-[14px]">
                      {rev.name}
                    </h5>
                    <span className="font-sans text-[12px] text-[#888888]">
                      {rev.loc}
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* RELATED PRODUCTS SECTION */}
        <section className="mt-24 border-t border-[#FFE0E5]/50 pt-16">
          <h2 className="font-serif text-[32px] font-bold text-[#1A1A1A] mb-10 text-center md:text-left">
            Complete Your Routine
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  setSelectedProductId(item.id);
                  // Update page index and view
                  setActiveImageIndex(0);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group flex flex-col bg-white rounded-[16px] border border-[#FFE0E5] p-3 relative overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.02)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(255,108,132,0.08)] cursor-pointer h-full"
              >
                
                {/* Product Image Frame */}
                <div className="w-full aspect-square bg-gray-50 overflow-hidden relative rounded-[12px] border border-pink-50">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  
                  {item.badge && (
                    <div className="absolute top-2 left-2 bg-[#FF6C84]/90 px-2 py-0.5 rounded-[4px] z-10">
                      <span className="font-sans text-[9px] font-bold text-white uppercase tracking-wider">
                        {item.badge}
                      </span>
                    </div>
                  )}
                </div>

                {/* Info Block */}
                <div className="pt-3 pb-[56px] flex-1 flex flex-col justify-between">
                  <div>
                    {/* Related Stars Rating */}
                    <div className="flex gap-0.5 mb-1.5">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="inline-flex"><StarIcon size={12} /></span>
                      ))}
                      <span className="font-sans text-[11px] text-[#C9A84C] font-semibold ml-1">
                        {item.rating}
                      </span>
                    </div>

                    <h3 className="font-sans font-bold text-[#1A1A1A] text-[14px] leading-[1.3] line-clamp-2">
                      {item.name}
                    </h3>
                  </div>

                  <div className="mt-3">
                    <span className="font-sans font-bold text-[#FF6C84] text-[16px]">
                      ${item.price.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Slide-Up Add to Cart Button */}
                <div className="absolute bottom-3 left-3 right-3 translate-y-[150%] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out z-30">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(item);
                    }}
                    className="w-full bg-[#FF6C84] hover:bg-[#ff5570] text-white font-sans text-xs font-semibold h-9 flex items-center justify-center rounded-full shadow-md select-none border-0 cursor-pointer"
                  >
                    Add to Cart
                  </button>
                </div>

              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
