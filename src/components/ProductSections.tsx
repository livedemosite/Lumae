import React from 'react';
import { Star } from 'lucide-react';
import { useCart } from '../context/CartContext';

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
    <section id="shop" className="py-24 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-serif text-3xl md:text-5xl font-bold text-center text-text-charcoal mb-4">
          Shop by Concern
        </h2>
        <p className="font-sans text-center text-gray-500 mb-16 max-w-sm mx-auto text-sm">
          Targeted clean formulas packed with active organic botanical extracts.
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {categories.map((cat) => (
            <a 
              href="#best-sellers" 
              onClick={handleScrollToFeatured}
              key={cat.id} 
              className="group flex flex-col items-center bg-bg-pink/40 rounded-2xl p-4 transition-all hover:bg-bg-pink/80 hover:shadow-lg hover:shadow-pink-100/50"
            >
              <div className="w-full aspect-[4/3] rounded-xl overflow-hidden mb-6 bg-white shrink-0">
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h3 className="font-sans font-semibold text-text-charcoal text-base md:text-lg mb-2 text-center">{cat.name}</h3>
              <span className="font-sans text-primary-pink text-xs font-semibold tracking-wide uppercase">Shop Concern</span>
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

const products = [
  { id: 1, name: "Vitamin C Serum", price: 24.99, rating: 4.8, image: prodVitC, tag: "Brightening", badge: "Best Seller" },
  { id: 2, name: "Hyaluronic Acid Serum", price: 22.99, rating: 4.9, image: prodHyaluronic, tag: "Plumping", badge: "Hydra Lock" },
  { id: 3, name: "Glow Booster Serum", price: 27.99, rating: 4.7, image: prodGlow, tag: "Dewy Radial", badge: "Award Winner" },
  { id: 4, name: "Retinol Night Serum", price: 29.99, rating: 4.8, image: prodRetinol, tag: "Fine Lines", badge: "Formulators Pick" },
  { id: 5, name: "Rose Water Toner", price: 18.99, rating: 4.9, image: prodRoseToner, tag: "Balancing", badge: "Highly Rated" },
  { id: 6, name: "Brightening Eye Cream", price: 21.99, rating: 4.7, image: prodEyeCream, tag: "Soothe Puff", badge: "Clean Care" },
  { id: 7, name: "Niacinamide Serum", price: 19.99, rating: 4.8, image: prodNiacinamide, tag: "Oil Control", badge: "Skin Uniform" },
  { id: 8, name: "AHA/BHA Exfoliant", price: 23.99, rating: 4.9, image: prodAhaBha, tag: "Pore Refiner", badge: "Derm Choice" },
  { id: 9, name: "Peptide Face Mist", price: 20.99, rating: 4.8, image: prodPeptideMist, tag: "Instant Mist", badge: "New Arrival" },
  { id: 10, name: "Overnight Repair Cream", price: 26.99, rating: 4.9, image: prodRepairCream, tag: "Cell Barrier", badge: "Rich Butter" },
];

export function FeaturedProducts() {
  const { addToCart } = useCart();

  return (
    <section id="best-sellers" className="py-24 bg-gray-50/50 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-text-charcoal mb-4">
            Best Sellers
          </h2>
          <p className="font-sans text-gray-500 text-lg">The glow routine, curated.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
          {products.map((product) => (
            <div key={product.id} className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm shadow-pink-100/30 border border-pink-50 relative hover:shadow-lg transition-all duration-300">
              <div className="aspect-square bg-gray-50 overflow-hidden relative">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                
                {/* Premium Small Curated Badge */}
                {product.badge && (
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-pink-100 shadow-sm">
                    <span className="font-sans text-[10px] font-bold text-text-charcoal uppercase tracking-wider">
                      {product.badge}
                    </span>
                  </div>
                )}

                {/* Desktop Hover Add to Cart Overlay */}
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 flex items-end justify-center pb-4 transition-all duration-300">
                  <button 
                    onClick={() => addToCart(product)}
                    className="bg-primary-pink text-white font-sans text-xs font-bold px-6 py-2.5 rounded-full shadow-lg transform translate-y-3 group-hover:translate-y-0 transition-all duration-300 hover:bg-opacity-95"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
              
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-sans text-[10px] font-bold text-primary-pink uppercase tracking-widest">
                      {product.tag}
                    </span>
                    <div className="flex space-x-0.5 items-center">
                      <Star className="w-3 h-3 text-accent-gold fill-accent-gold" />
                      <span className="text-[10px] text-gray-500 font-sans font-medium ml-1">({product.rating})</span>
                    </div>
                  </div>
                  <h3 className="font-sans font-semibold text-text-charcoal text-sm leading-snug tracking-tight mb-2">
                    {product.name}
                  </h3>
                </div>
                <div className="pt-2 flex items-center justify-between mt-auto">
                  <span className="font-sans font-bold text-text-charcoal text-base">${product.price}</span>
                  {/* Quick-add for mobile view since hover is hidden */}
                  <button 
                    onClick={() => addToCart(product)}
                    className="sm:hidden text-primary-pink font-sans font-bold text-xs bg-bg-pink px-3 py-1 rounded-full active:scale-95 transition-transform"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
