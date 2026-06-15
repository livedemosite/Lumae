/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Navigation, Footer } from './components/NavFooter';
import { Hero, TrustLogos, PromoBanner } from './components/HomeSections';
import { CategoryGrid, FeaturedProducts } from './components/ProductSections';
import { HowItWorks, Ingredients, AboutSection } from './components/InfoSections';
import { BeforeAfter, Testimonials, Newsletter } from './components/SocialProof';
import { CartProvider } from './context/CartContext';
import { CartDrawer } from './components/CartDrawer';
import { ScrollAnimate } from './components/ScrollAnimate';

export default function App() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-white">
        {/* 1. STICKY NAVIGATION */}
        <Navigation />

        <main>
          {/* 2. HERO SECTION */}
          <ScrollAnimate>
            <Hero />
          </ScrollAnimate>

          {/* 3. BRAND TRUST LOGOS / SOCIAL PROOF BAR */}
          <ScrollAnimate>
            <TrustLogos />
          </ScrollAnimate>

          {/* 4. PRODUCT CATEGORY GRID */}
          <ScrollAnimate>
            <CategoryGrid />
          </ScrollAnimate>

          {/* 5. FEATURED PRODUCTS GRID */}
          <ScrollAnimate>
            <FeaturedProducts />
          </ScrollAnimate>

          {/* 6. PROMO / OFFER BANNER */}
          <ScrollAnimate>
            <PromoBanner />
          </ScrollAnimate>

          {/* 7. HOW IT WORKS */}
          <ScrollAnimate>
            <HowItWorks />
          </ScrollAnimate>

          {/* 8. INGREDIENTS / BENEFITS SECTION */}
          <ScrollAnimate>
            <Ingredients />
          </ScrollAnimate>

          {/* 9. UGC / BEFORE & AFTER SECTION */}
          <ScrollAnimate>
            <BeforeAfter />
          </ScrollAnimate>

          {/* 10. TESTIMONIALS SECTION */}
          <ScrollAnimate>
            <Testimonials />
          </ScrollAnimate>

          {/* 11. BRAND ABOUT SECTION */}
          <ScrollAnimate>
            <AboutSection />
          </ScrollAnimate>

          {/* 12. NEWSLETTER / EMAIL CAPTURE */}
          <ScrollAnimate>
            <Newsletter />
          </ScrollAnimate>
        </main>

        {/* 13. FOOTER */}
        <Footer />

        {/* Sliding Interactive Cart Drawer */}
        <CartDrawer />
      </div>
    </CartProvider>
  );
}

