/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Navigation, Footer } from './components/NavFooter';
import { Hero, TrustBar, PromoBanner, FreeShippingBanner, SkinQuizBanner } from './components/HomeSections';
import { CategoryGrid, FeaturedProducts, ShopPage } from './components/ProductSections';
import { HowItWorks, Ingredients, AboutSection } from './components/InfoSections';
import { BeforeAfter, Testimonials, Newsletter } from './components/SocialProof';
import { CartProvider, useCart } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { CartDrawer } from './components/CartDrawer';
import { ScrollAnimate } from './components/ScrollAnimate';
import { ProductDetail } from './components/ProductDetail';
import { CheckoutPage } from './components/CheckoutPage';

export default function App() {
  return (
    <WishlistProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </WishlistProvider>
  );
}

function AppContent() {
  const { currentView } = useCart();

  return (
    <div className="min-h-screen bg-white">
      {/* 1. STICKY NAVIGATION */}
      <Navigation />

      <main>
        {currentView === 'home' && (
          <>
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
          </>
        )}

        {currentView === 'shop' && (
          <ScrollAnimate>
            <ShopPage />
          </ScrollAnimate>
        )}

        {currentView === 'product-detail' && (
          <ScrollAnimate>
            <ProductDetail />
          </ScrollAnimate>
        )}

        {currentView === 'checkout' && (
          <ScrollAnimate>
            <CheckoutPage />
          </ScrollAnimate>
        )}
      </main>

      {/* 15. FOOTER */}
      <Footer />

      {/* Sliding Interactive Cart Drawer */}
      <CartDrawer />
    </div>
  );
}

