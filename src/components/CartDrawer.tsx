import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../context/CartContext';
import { X, Plus, Minus, Trash2, Sparkles, Check } from 'lucide-react';

export function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    applyPromo,
    discount,
    appliedCode,
    cartTotal,
  } = useCart();

  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const success = applyPromo(promoInput);
    if (success) {
      setPromoError('');
    } else {
      setPromoError('Invalid promo code. Try "GLOW20"');
    }
  };

  const handleCheckout = () => {
    setCheckoutComplete(true);
    setTimeout(() => {
      setCheckoutComplete(false);
      setIsCartOpen(false);
    }, 2800);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black z-50 cursor-pointer"
          />

          {/* Drawer Body */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-50 flex flex-col h-full"
          >
            {/* Header */}
            <div className="p-6 border-b border-pink-50 flex justify-between items-center bg-bg-pink">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-primary-pink" />
                <h3 className="font-serif text-2xl font-bold text-text-charcoal text-left">Your Glow Cart</h3>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1.5 rounded-full hover:bg-white/80 transition-colors text-text-charcoal"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {checkoutComplete ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center text-green-500 mb-2">
                    <Check className="w-8 h-8" />
                  </div>
                  <h4 className="font-serif text-2xl font-bold text-text-charcoal">Order Placed!</h4>
                  <p className="font-sans text-gray-500 max-w-xs">
                    Your glowing skincare regimen is being prepared. Thank you for choosing Lumae!
                  </p>
                </div>
              ) : cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                  <div className="w-16 h-16 bg-bg-pink rounded-full flex items-center justify-center text-primary-pink">
                    <Sparkles className="w-6 h-6 animate-pulse" />
                  </div>
                  <div>
                    <h4 className="font-sans font-semibold text-lg text-text-charcoal">Your cart is empty</h4>
                    <p className="font-sans text-gray-500 text-sm mt-1 max-w-xs">
                      Ready to start your journey? Explore our targeted botanical serums and premium sets.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="bg-primary-pink text-white font-sans font-medium px-8 py-3 rounded-full hover:bg-opacity-90 transition-all text-sm"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex gap-4 p-4 rounded-2xl bg-bg-pink/30 border border-pink-50"
                      key={item.product.id}
                    >
                      <div className="w-20 h-20 bg-white rounded-xl overflow-hidden shrink-0 border border-pink-50">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="font-sans font-semibold text-text-charcoal text-sm truncate">
                          {item.product.name}
                        </h4>
                        <p className="font-sans text-primary-pink text-sm font-bold mt-1">
                          ${item.product.price}
                        </p>

                        <div className="flex items-center justify-between mt-3">
                          {/* Quantity selector */}
                          <div className="flex items-center border border-pink-100 rounded-full bg-white px-2 py-0.5">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="p-1 hover:text-primary-pink transition-colors"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="px-3 font-sans text-sm text-text-charcoal font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="p-1 hover:text-primary-pink transition-colors"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {/* Delete */}
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-gray-400 hover:text-red-500 p-1 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer Calculation & Actions */}
            {cart.length > 0 && !checkoutComplete && (
              <div className="border-t border-pink-50 p-6 bg-gray-50 space-y-4">
                {/* Promo Input */}
                <form onSubmit={handleApplyPromo} className="space-y-1">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="GLOW20"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="flex-1 bg-white border border-pink-200 rounded-full px-4 py-2 text-sm font-sans focus:outline-none focus:border-primary-pink"
                    />
                    <button
                      type="submit"
                      className="bg-[#FF6C84] text-white rounded-full px-5 py-2 font-sans text-xs font-semibold flex items-center justify-center hover:brightness-105 transition-colors uppercase"
                    >
                      Apply
                    </button>
                  </div>
                  {promoError && (
                    <p className="text-red-500 font-sans text-xs pl-2">{promoError}</p>
                  )}
                  {appliedCode && (
                    <p className="text-green-600 font-sans text-xs pl-2 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
                      Promo {appliedCode} applied (20% off!)
                    </p>
                  )}
                </form>

                {/* Subtotal & Discount Calculation */}
                <div className="space-y-2 text-sm font-sans text-gray-600 pt-2 border-t border-pink-100">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-text-charcoal">${subtotal.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount (20%)</span>
                      <span className="font-semibold">-${(subtotal * 0.2).toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-base font-semibold text-text-charcoal pt-2 border-t border-pink-100">
                    <span>Total Estimate</span>
                    <span className="text-primary-pink font-bold">${cartTotal.toFixed(2)}</span>
                  </div>
                </div>

                {/* Checkout CTA Options */}
                <div className="space-y-3 pt-2">
                  <button
                    onClick={handleCheckout}
                    className="w-full bg-primary-pink text-white font-sans font-bold py-3.5 rounded-full border border-accent-gold/30 hover:bg-opacity-90 transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Sparkles className="w-5 h-5 text-accent-gold" />
                    Pay with Credit Card
                  </button>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={handleCheckout}
                      className="bg-[#FF6C84] text-white py-3 px-4 rounded-full font-sans font-semibold text-xs flex items-center justify-center gap-1.5 hover:brightness-105 transition-colors cursor-pointer"
                    >
                      <span className="text-sm font-bold"></span> Pay
                    </button>
                    <button
                      onClick={handleCheckout}
                      className="bg-[#FF6C84] text-white py-3 px-4 rounded-full font-sans font-bold text-xs flex items-center justify-center gap-1 hover:brightness-105 transition-colors cursor-pointer"
                    >
                      PayPal
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
