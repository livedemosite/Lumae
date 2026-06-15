/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Navigation, Footer } from './components/NavFooter';
import { Hero, TrustBar, PromoBanner, FreeShippingBanner, SkinQuizBanner } from './components/HomeSections';
import { CategoryGrid, FeaturedProducts } from './components/ProductSections';
import { HowItWorks, Ingredients, AboutSection } from './components/InfoSections';
import { BeforeAfter, Testimonials, Newsletter } from './components/SocialProof';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { CartDrawer } from './components/CartDrawer';
import { ScrollAnimate } from './components/ScrollAnimate';

export default function App() {
  return (
    <WishlistProvider>
      <CartProvider>
        <div className="min-h-screen bg-white">
          {/* 1. STICKY NAVIGATION */}
          <Navigation />

          <main>
            {/* 2. HERO SECTION */}
            <ScrollAnimate>
              <Hero />
            </ScrollAnimate>

            {/* 3. TRUST BAR */}
            <ScrollAnimate>
              <TrustBar />
            </ScrollAnimate>

            {/* 4. FREE SHIPPING BANNER */}
            <ScrollAnimate>
              <FreeShippingBanner />
            </ScrollAnimate>

            {/* 5. PRODUCT CATEGORY GRID */}
            <ScrollAnimate>
              <CategoryGrid />
            </ScrollAnimate>

            {/* 6. BEST SELLERS PRODUCT GRID */}
            <ScrollAnimate>
              <FeaturedProducts />
            </ScrollAnimate>

            {/* 7. PROMO / OFFER BANNER */}
            <ScrollAnimate>
              <PromoBanner />
            </ScrollAnimate>

            {/* 8. HOW IT WORKS */}
            <ScrollAnimate>
              <HowItWorks />
            </ScrollAnimate>

            {/* 9. SKIN TYPE QUIZ BANNER */}
            <ScrollAnimate>
              <SkinQuizBanner />
            </ScrollAnimate>

            {/* 10. INGREDIENTS / BENEFITS SECTION */}
            <ScrollAnimate>
              <Ingredients />
            </ScrollAnimate>

            {/* 11. UGC / BEFORE & AFTER SECTION */}
            <ScrollAnimate>
              <BeforeAfter />
            </ScrollAnimate>

            {/* 12. TESTIMONIALS SECTION */}
            <ScrollAnimate>
              <Testimonials />
            </ScrollAnimate>

            {/* 13. BRAND ABOUT SECTION */}
            <ScrollAnimate>
              <AboutSection />
            </ScrollAnimate>

            {/* 14. NEWSLETTER / EMAIL CAPTURE */}
            <ScrollAnimate>
              <Newsletter />
            </ScrollAnimate>
          </main>

          {/* 15. FOOTER */}
          <Footer />

          {/* Sliding Interactive Cart Drawer */}
          <CartDrawer />
        </div>
      </CartProvider>
    </WishlistProvider>
  );
}

