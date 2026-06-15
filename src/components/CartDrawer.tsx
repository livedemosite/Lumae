import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../context/CartContext';
import { X, Plus, Minus, Trash2, Check } from 'lucide-react';

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
    setCurrentView,
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
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FF6C84" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5.5 h-5.5">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
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
                  <div className="w-16 h-16 bg-bg-pink rounded-full flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF6C84" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                      <line x1="3" y1="6" x2="21" y2="6" />
                      <path d="M16 10a4 4 0 0 1-8 0" />
                    </svg>
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
                    onClick={() => {
                      setIsCartOpen(false);
                      setCurrentView('checkout');
                    }}
                    className="w-full bg-[#FF6C84] hover:bg-[#FF8A9F] text-white font-sans font-bold py-3.5 rounded-full border border-pink-100 hover:brightness-105 transition-all text-center flex items-center justify-center gap-2 cursor-pointer text-[15px] tracking-wide shadow-sm"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-4.5 h-4.5">
                      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                      <line x1="8" y1="21" x2="16" y2="21" />
                      <line x1="12" y1="17" x2="12" y2="21" />
                    </svg>
                    Proceed to Checkout
                  </button>

                  <div className="flex items-center my-2 text-gray-400 text-xs uppercase font-semibold font-sans">
                    <span className="flex-1 h-[1px] bg-pink-100"></span>
                    <span className="px-3">or instant pay</span>
                    <span className="flex-1 h-[1px] bg-pink-100"></span>
                  </div>

                  <button
                    onClick={handleCheckout}
                    className="w-full bg-primary-pink text-white font-sans font-bold py-3.5 rounded-full border border-white/10 hover:brightness-105 transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-4.5 h-4.5">
                      <rect x="2" y="5" width="20" height="14" rx="2" ry="2" />
                      <line x1="2" y1="10" x2="22" y2="10" />
                    </svg>
                    Instant Demo Checkout
                  </button>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={handleCheckout}
                      className="bg-black text-white py-3 px-4 rounded-full font-sans font-semibold text-xs flex items-center justify-center gap-1.5 hover:bg-gray-900 transition-colors cursor-pointer"
                    >
                      <svg className="w-4 h-4 fill-current mr-0.5" viewBox="0 0 170 170">
                        <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.34.13-9.13-1.92-14.37-6.13-3.43-2.82-7.3-7.46-11.61-13.92-4.78-7.14-8.79-15.65-12.03-25.53-3.24-9.87-4.88-19.38-4.88-28.53 0-14.53 3.65-26.06 10.96-34.59 7.31-8.52 16.48-12.83 27.5-12.94 5.25 0 10.88 1.42 16.88 4.25 6 2.82 10.15 4.25 12.44 4.25 2.1 0 6.07-1.37 11.9-4.1 5.83-2.73 11.19-4.04 16.07-3.92 11.82.23 21.08 4.54 27.79 12.94 6.7 8.4 10.06 18.57 10.06 30.5 0 9.17-2.1 17.61-6.31 25.32zM119.22 35.15c0-7.73 2.76-14.86 8.28-21.39 5.53-6.53 12.46-10.29 20.8-11.28.16 1.14.23 2.07.23 2.79 0 7.44-2.76 14.42-8.28 20.95-5.52 6.53-12.59 10.36-21.2 11.48a27.16 27.16 0 01-.17-2.55z" stroke="none" />
                      </svg>
                      Pay
                    </button>
                    <button
                      onClick={handleCheckout}
                      className="bg-[#FFC439] text-[#003087] py-3 px-4 rounded-full font-sans font-bold text-xs flex items-center justify-center gap-1 hover:bg-[#F2B52B] transition-colors cursor-pointer"
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
