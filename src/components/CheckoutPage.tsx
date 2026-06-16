import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { products } from './ProductSections';
import { motion, AnimatePresence } from 'motion/react';

// ==========================================
// INLINE SVG ICONS
// ==========================================
const LockIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const ShieldIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const LeafIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 1 9.8a7 7 0 0 1-9 8.2z" />
    <path d="M9 22v-4h4" />
  </svg>
);

const BoltIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const CalendarIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const TrashIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <line x1="10" y1="11" x2="10" y2="17" />
    <line x1="14" y1="11" x2="14" y2="17" />
  </svg>
);

const ChevronIcon = ({ className = 'w-4 h-4', direction = 'down' }: { className?: string; direction?: 'up' | 'down' }) => (
  <svg className={`${className} transition-transform duration-300 ${direction === 'up' ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const PlusIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const MinusIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const QuestionIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const RefreshIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
  </svg>
);

const CheckCircleIcon = ({ className = 'w-10 h-10' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

// Payment method brand logos
const VisaLogo = () => (
  <svg className="h-4 w-auto" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.167 31.849h3.766l2.355-14.542h-3.766l-2.355 14.542zM33.689 17.653c-.766-.31-1.954-.643-3.41-.643-3.754 0-6.398 2.001-6.417 4.869-.022 2.115 1.892 3.292 3.332 3.996 1.478.72 1.975 1.182 1.968 1.824-.012.986-1.183 1.442-2.274 1.442-1.52 0-2.333-.243-3.578-.795l-.5-.24-.531 3.292c.887.41 2.531.765 4.24.78 4.004 0 6.618-1.981 6.65-5.048.016-1.68-.999-2.955-3.193-4.004-1.328-.673-2.144-1.127-2.138-1.815.003-.627.702-1.267 2.223-1.267.842-.016 1.464.179 1.944.385l.233.109.524-3.235-.494-.193v-.058zM42.271 17.307c-.878 0-1.618.513-1.929 1.258l-5.467 13.102c-.085.143-.131.259-.131.334h3.957l.791-2.186h4.832c.112.518.243.839.243.839 .62 1.347 1.44 1.347 3.553 1.347h1.002H48l-3.1-14.636c-.198-.958-.934-.958-2.629-.958h-.058z" fill="#0A349F" />
  </svg>
);

const MastercardLogo = () => (
  <svg className="h-4 w-auto" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="18" cy="24" r="14" fill="#EB001B" fillOpacity="0.85" />
    <circle cx="30" cy="24" r="14" fill="#F79E1B" fillOpacity="0.85" />
    <path d="M24 14.854a13.985 13.985 0 0 1 5.343 9.146 13.985 13.985 0 0 1-5.343 9.146 13.985 13.985 0 0 1-5.343-9.146 13.985 13.985 0 0 1 5.343-9.146" fill="#FF5F00" />
  </svg>
);

const AmexLogo = () => (
  <svg className="h-4 w-auto" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="6" fill="#0070CD" />
    <path d="M8 32V16h3.6l1.8 4.2 1.8-4.2H19v16h-2.5v-9.5L14.3 28h-1.6l-2.2-5.5V32H8zm14.5 0V16h6.8v2.5h-4.3v4.1h3.9v2.5h-3.9v4.4h4.3V32h-6.8zm9.5 0l2.8-5-2.6-5h2.9l1.2 2.4 1.2-2.4H40.2l-2.5 5 2.7 5H37.5l-1.3-2.6-1.3 2.6H32z" fill="#FFFFFF" />
  </svg>
);

const DiscoverLogo = () => (
  <svg className="h-4 w-auto" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="6" fill="#F47216" />
    <path d="M4 32V16h5.5c4 0 6.5 2.5 6.5 8s-2.5 8-6.5 8H4zm2.8-2.5h2.7c2.5 0 4-1.2 4-5.5s-1.5-5.5-4-5.5H6.8v11zM19.5 32V16h2.5v16h-2.5zm5.5-3.5h0.1l2.5-4h2.5V32H25V16h2.5v7.5l-2.5 5z" fill="#FFFFFF" />
  </svg>
);

// ==========================================
// FLOATING FLOATING LABEL INPUT
// ==========================================
interface FloatingInputProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  error?: string;
  maxLength?: number;
  rightElement?: React.ReactNode;
}

function FloatingInput({
  label,
  name,
  type = 'text',
  value,
  onChange,
  required = false,
  error,
  maxLength,
  rightElement,
}: FloatingInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="w-full">
      <div className="relative flex items-center">
        <input
          type={type}
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder=" "
          maxLength={maxLength}
          className={`peer w-full bg-white border rounded-[12px] ${
            rightElement ? 'pr-12 pl-4' : 'px-4'
          } pt-5 pb-1 text-sm font-sans placeholder-transparent transition-all duration-200 outline-none
            ${isFocused || value ? 'pt-5 pb-1' : 'py-3'} 
            ${error ? 'border-red-500 focus:border-red-500' : 'border-[#FFE0E5] focus:border-[#FF6C84]'} 
            ${isFocused ? 'border-2' : 'border'} 
            h-[52px] sm:h-[48px]`}
        />
        <label
          htmlFor={name}
          className={`absolute left-4 font-sans transition-all duration-200 pointer-events-none origin-left
            ${isFocused || value 
              ? 'top-1.5 text-[10px] text-[#FF6C84] font-semibold' 
              : 'top-3.5 text-sm text-[#888888]'
            }
            ${error ? 'text-red-500' : ''}`}
        >
          {label} {required && <span className="text-[#FF6C84]">*</span>}
        </label>
        {rightElement && (
          <div className="absolute right-4 flex items-center justify-center">
            {rightElement}
          </div>
        )}
      </div>
      {error && <p className="text-red-500 text-xs mt-1 font-sans">{error}</p>}
    </div>
  );
}

// ==========================================
// MAIN CHECKOUT COMPONENT
// ==========================================
export function CheckoutPage() {
  const { cart, cartTotal, discount, appliedCode, applyPromo, clearCart, setCurrentView, addToCart, updateQuantity, removeFromCart } = useCart();
  
  const [isSuccess, setIsSuccess] = useState(false);
  const [trackingId, setTrackingId] = useState('');
  
  // Cache for success receipt values
  const [purchasedProducts, setPurchasedProducts] = useState<any[]>([]);
  const [purchasedQuantity, setPurchasedQuantity] = useState(0);
  const [purchasedSubtotal, setPurchasedSubtotal] = useState(0);
  const [purchasedTotal, setPurchasedTotal] = useState(0);
  const [purchasedShipping, setPurchasedShipping] = useState('');
  const [purchasedTax, setPurchasedTax] = useState(0);
  const [purchasedCode, setPurchasedCode] = useState('');
  const [purchasedCodeDiscount, setPurchasedCodeDiscount] = useState(0);

  const [deliveryName, setDeliveryName] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryPhone, setDeliveryPhone] = useState('');
  const [deliveryEmail, setDeliveryEmail] = useState('');

  // Local config states
  const [shippingMethod, setShippingMethod] = useState<'eco' | 'express'>('eco');
  const [activeTab, setActiveTab] = useState<'card' | 'paypal' | 'apple'>('card');
  const [isCouponExpanded, setIsCouponExpanded] = useState(false);
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const [showCvvTooltip, setShowCvvTooltip] = useState(false);
  const [isMobileSummaryExpanded, setIsMobileSummaryExpanded] = useState(false);

  // Form inputs state
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zip: '',
    phone: '',
    cardName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Pre-populate standard target items if cart is empty on mount so user always gets a premium layout
  useEffect(() => {
    if (cart.length === 0) {
      const target = products.find(p => p.id === 2);
      if (target) {
        addToCart(target);
        setTimeout(() => {
          updateQuantity(target.id, 2);
        }, 50);
      }
    }
  }, [cart.length]);

  // Clean-up or formatting helpers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formatted = value;

    if (name === 'cardNumber') {
      const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
      const parts = [];
      for (let i = 0; i < v.length; i += 4) {
        parts.push(v.substring(i, i + 4));
      }
      formatted = parts.join(' ').slice(0, 19);
    } else if (name === 'cardExpiry') {
      const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
      if (v.length >= 2) {
        formatted = `${v.slice(0, 2)}/${v.slice(2, 4)}`;
      } else {
        formatted = v;
      }
      formatted = formatted.slice(0, 5);
    } else if (name === 'cardCvv') {
      formatted = value.replace(/[^0-9]/gi, '').slice(0, 4);
    } else if (name === 'phone') {
      formatted = value.replace(/[^0-9+()\s-]/gi, '');
    }

    setFormData(prev => ({ ...prev, [name]: formatted }));
    
    // Clear field error instantly on user typing
    if (errors[name]) {
      setErrors(prev => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  // Pricing calculations
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const activeCodeDiscount = subtotal * (discount / 100);
  const shippingCost = shippingMethod === 'express' ? 6.99 : 0;
  const estimatedTax = subtotal * 0.08;
  const finalTotal = subtotal - activeCodeDiscount + shippingCost + estimatedTax;

  const validateForm = () => {
    const tempErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      tempErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Please enter a valid email address';
    }

    if (!formData.firstName.trim()) tempErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) tempErrors.lastName = 'Last name is required';
    if (!formData.address.trim()) tempErrors.address = 'Shipping address is required';
    if (!formData.city.trim()) tempErrors.city = 'City is required';
    if (!formData.zip.trim()) tempErrors.zip = 'ZIP/Postal code is required';
    
    if (!formData.phone.trim()) {
      tempErrors.phone = 'Phone number is required';
    } else if (formData.phone.replace(/[^0-9]/g, '').length < 8) {
      tempErrors.phone = 'Please enter a valid phone number';
    }

    if (activeTab === 'card') {
      if (!formData.cardName.trim()) {
        tempErrors.cardName = 'Cardholder name is required';
      } else if (!formData.cardName.trim().includes(' ')) {
        tempErrors.cardName = 'Enter full name (First and Last as on card)';
      }

      const cleanNum = formData.cardNumber.replace(/\s/g, '');
      if (!cleanNum) {
        tempErrors.cardNumber = 'Card number is required';
      } else if (cleanNum.length < 13 || cleanNum.length > 19) {
        tempErrors.cardNumber = 'Card number must be 13-19 digits';
      }

      if (!formData.cardExpiry) {
        tempErrors.cardExpiry = 'Expiry is required';
      } else if (!/^\d{2}\/\d{2}$/.test(formData.cardExpiry)) {
        tempErrors.cardExpiry = 'Use MM/YY';
      }

      if (!formData.cardCvv) {
        tempErrors.cardCvv = 'CVV is required';
      } else if (formData.cardCvv.length < 3) {
        tempErrors.cardCvv = 'Must be 3-4 digits';
      }
    }

    setErrors(tempErrors);
    return tempErrors;
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tempErrors = validateForm();
    if (Object.keys(tempErrors).length > 0) {
      // scroll to first error
      const firstError = Object.keys(tempErrors)[0];
      const fieldElement = document.getElementsByName(firstError)[0];
      if (fieldElement) {
        fieldElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    // Capture success receipt summary info
    const purchaseId = 'LUM-' + Math.floor(10000 + Math.random() * 90000);
    setTrackingId(purchaseId);
    setPurchasedProducts([...cart]);
    setPurchasedQuantity(cart.reduce((sum, item) => sum + item.quantity, 0));
    setPurchasedSubtotal(subtotal);
    setPurchasedTotal(finalTotal);
    setPurchasedShipping(shippingMethod === 'eco' ? 'FREE' : '$6.99');
    setPurchasedTax(estimatedTax);
    setPurchasedCode(appliedCode);
    setPurchasedCodeDiscount(activeCodeDiscount);

    setDeliveryName(`${formData.firstName} ${formData.lastName}`);
    setDeliveryAddress(`${formData.address}, ${formData.city}, ${formData.zip}`);
    setDeliveryPhone(formData.phone);
    setDeliveryEmail(formData.email);

    setIsSuccess(true);
    clearCart();
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleApplyCoupon = () => {
    if (!couponInput.trim()) return;
    const success = applyPromo(couponInput);
    if (success) {
      setCouponError('');
    } else {
      setCouponError('Invalid promo code. Try discount code: GLOW20');
    }
  };

  // ==========================================
  // VIEW RENDER: SUCCESS SCREEN
  // ==========================================
  if (isSuccess) {
    return (
      <div className="bg-white min-h-screen py-12 md:py-20 flex items-center justify-center px-4">
        <div id="checkout-success-container" className="max-w-2xl w-full bg-white rounded-[24px] shadow-sm border border-[#FFE0E5] overflow-hidden">
          
          <div className="bg-radial from-[#FF6C84] to-[#e04f67] text-white p-8 text-center relative">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 text-[#FF6C84] shadow-sm">
              <CheckCircleIcon className="w-10 h-10 text-[#FF6C84]" />
            </div>
            
            <h2 className="font-serif text-3xl font-bold tracking-tight mb-2">Order Confirmed!</h2>
            <p className="font-sans text-white/90 text-sm max-w-md mx-auto">
              Thank you for shopping with Lumae. Your order is being packed with organic care and love.
            </p>
          </div>

          <div className="p-6 md:p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#FFEFED] rounded-[16px] p-4 border border-[#FFE0E5] text-sm">
                <span className="block font-sans text-[11px] font-bold text-[#666666] uppercase tracking-wider mb-2">Order Details</span>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="font-sans text-[#666666]">Order Number</span>
                  <span className="font-mono font-bold text-[#1A1A1A] bg-white px-2 py-0.5 rounded border border-[#FFE0E5]">{trackingId}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-sans text-[#666666]">Shipment Status</span>
                  <span className="font-sans font-bold text-xs text-[#2E7D32] bg-[#E8F5E9] px-2 py-0.5 rounded flex items-center gap-1">
                    Preparing for Dispatch
                  </span>
                </div>
              </div>

              <div className="bg-[#FFEFED] rounded-[16px] p-4 border border-[#FFE0E5] text-sm">
                <span className="block font-sans text-[11px] font-bold text-[#666666] uppercase tracking-wider mb-1">Shipping Details</span>
                <p className="font-sans font-bold text-[#1A1A1A] truncate">{deliveryName}</p>
                <p className="font-sans text-xs text-[#666666] truncate mt-0.5">{deliveryAddress}</p>
                <p className="font-sans text-xs text-gray-500 truncate mt-0.5">{deliveryEmail}</p>
              </div>
            </div>

            {/* Receipt details */}
            <div className="border border-[#FFE0E5] rounded-[20px] overflow-hidden bg-white text-sm">
              <div className="bg-[#FFEFED]/40 px-5 py-3 border-b border-[#FFE0E5] flex justify-between items-center">
                <h3 className="font-sans font-bold text-xs text-[#666666] uppercase tracking-wider">Receipt Summary</h3>
                <span className="font-sans text-[11px] text-[#888888] font-medium">{purchasedQuantity} items purchased</span>
              </div>
              
              <div className="divide-y divide-[#FFE0E5] px-5 max-h-[180px] overflow-y-auto">
                {purchasedProducts.map((item) => (
                  <div key={item.product.id} className="flex justify-between items-center py-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-50 border border-[#FFE0E5] shrink-0">
                        {item.product.image && <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />}
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-sans font-bold text-xs text-[#1A1A1A] truncate">{item.product.name}</h4>
                        <span className="font-sans text-[11px] text-[#888888] block mt-0.5">
                          Qty: {item.quantity} × ${item.product.price.toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <span className="font-sans font-semibold text-xs text-[#1A1A1A] ml-4 shrink-0">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="bg-[#FFEFED]/20 border-t border-[#FFE0E5] px-5 py-3.5 space-y-2 text-xs font-sans text-[#666666]">
                <div className="flex justify-between">
                  <span>Items Subtotal</span>
                  <span className="font-semibold text-[#1A1A1A]">${purchasedSubtotal.toFixed(2)}</span>
                </div>

                {purchasedCode && (
                  <div className="flex justify-between text-[#2E7D32]">
                    <span>Promo Discount ({purchasedCode})</span>
                    <span className="font-bold">-${purchasedCodeDiscount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Shipping & Eco Packaging</span>
                  <span className="text-[#2E7D32] font-semibold">{purchasedShipping}</span>
                </div>

                <div className="flex justify-between">
                  <span>Estimated Tax (8%)</span>
                  <span className="text-[#1A1A1A]">${purchasedTax.toFixed(2)}</span>
                </div>

                <div className="flex justify-between items-center pt-2.5 border-t border-[#FFE0E5] font-sans text-sm font-bold text-[#1A1A1A]">
                  <span>Total Amount Paid</span>
                  <span className="text-[#FF6C84] text-base font-bold">${purchasedTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3 items-start bg-[#FFEFED]/30 p-4 rounded-[12px] border border-[#FFE0E5] text-xs font-sans text-[#666666] leading-relaxed">
              <ShieldIcon className="w-5 h-5 text-[#FF6C84] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-[#1A1A1A] block mb-0.5">Secure Transaction Guarantee</span>
                Your invoice reference and packet telemetry have been sent to <strong className="text-[#1A1A1A] font-semibold">{deliveryEmail}</strong>. Contact us at support@lumae.com for any questions.
              </div>
            </div>

            <button
              onClick={() => setCurrentView('home')}
              className="w-full bg-[#FF6C84] text-white font-sans font-semibold py-3 rounded-full hover:brightness-[1.08] transition-all text-center tracking-wide block cursor-pointer text-sm"
            >
              Back to Home Page
            </button>
            
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // RENDERING PRINCIPLES: REGULAR PAGE W/ DESKTOP STICKY & MOBILE COLLAPSE
  // ==========================================
  return (
    <div className="bg-white min-h-screen pb-16">
      
      {/* 1. PROGRESS STEPS BAR */}
      <div className="w-full bg-white border-b border-[#FFE0E5] py-6 select-none">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 relative">
          <div className="flex items-center justify-between max-w-md mx-auto relative">
            <div className="absolute left-[8%] right-[8%] top-[16px] h-[1px] bg-[#FFE0E5]" />
            
            {/* Step 1: Cart (Completed) */}
            <div className="flex flex-col items-center relative z-10 bg-white px-2">
              <div className="w-8 h-8 rounded-full bg-[#FF6C84] flex items-center justify-center text-white shadow-sm">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="3.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <span className="font-sans text-[13px] font-semibold text-[#888888] mt-1.5">Cart</span>
            </div>

            {/* Step 2: Shipping (Active) */}
            <div className="flex flex-col items-center relative z-10 bg-white px-2">
              <div className="w-8 h-8 rounded-full bg-[#FF6C84] flex items-center justify-center text-white text-xs font-bold shadow-md">
                2
              </div>
              <span className="font-sans text-[13px] font-bold text-[#FF6C84] mt-1.5">Shipping</span>
            </div>

            {/* Step 3: Payment -> Confirm (Upcoming) */}
            <div className="flex flex-col items-center relative z-10 bg-white px-2">
              <div className="w-8 h-8 rounded-full bg-[#E0E0E0] flex items-center justify-center text-white text-xs font-semibold">
                3
              </div>
              <span className="font-sans text-[13px] font-semibold text-[#999999] mt-1.5">Payment → Confirm</span>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE STICKY COLLAPSIBLE ORDER SUMMARY VIEW */}
      <div 
        className="lg:hidden sticky top-[64px] z-30 bg-white border-b border-[#FFE0E5] py-3.5 px-4 flex justify-between items-center cursor-pointer shadow-xs"
        onClick={() => setIsMobileSummaryExpanded(!isMobileSummaryExpanded)}
      >
        <div className="flex items-center gap-2 min-w-0">
          <svg className="w-5 h-5 text-[#FF6C84] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          <span className="font-sans font-bold text-xs text-[#1A1A1A] truncate">
            {cart.map(item => `${item.product.name} × ${item.quantity}`).join(', ') || 'Hyaluronic Acid Serum × 2'}
          </span>
        </div>
        <div className="flex items-center gap-2 shrink-0 ml-4">
          <span className="font-sans font-bold text-sm text-[#FF6C84]">
            ${finalTotal.toFixed(2)}
          </span>
          <ChevronIcon direction={isMobileSummaryExpanded ? 'up' : 'down'} className="w-4 h-4 text-[#FF6C84]" />
        </div>
      </div>

      {/* 2. MAIN CONTAINER */}
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 mt-6 md:mt-10">
        
        {/* PAGE TITLE */}
        <div className="mb-8">
          <h1 className="font-serif text-[36px] font-bold text-[#1A1A1A] leading-tight select-none">
            Secure Checkout
          </h1>
          <div className="flex items-center gap-1.5 mt-2">
            <LockIcon className="w-4.5 h-4.5 text-[#FF6C84]" />
            <span className="font-sans text-[13px] text-[#888888] font-medium tracking-wide">
              256-bit SSL Encrypted
            </span>
          </div>
        </div>

        {/* COMPREHENSIVE SPLIT ROW LAYOUT */}
        <div className="flex flex-col lg:flex-row gap-[4%] items-start">
          
          {/* MOBILE EXPANDABLE ORDER SUMMARY AREA OR DESKTOP STATIC PINNED SUMMARY */}
          {isMobileSummaryExpanded && (
            <div className="w-full lg:hidden order-1 mb-6">
              <OrderSummaryCard 
                cart={cart}
                subtotal={subtotal}
                discount={discount}
                appliedCode={appliedCode}
                shippingMethod={shippingMethod}
                shippingCost={shippingCost}
                estimatedTax={estimatedTax}
                finalTotal={finalTotal}
                updateQuantity={updateQuantity}
                removeFromCart={removeFromCart}
              />
            </div>
          )}

          {/* LEFT COLUMN: FORM PANEL (58%) */}
          <div className="w-full lg:w-[58%] order-2">
            <form onSubmit={handleCheckoutSubmit} className="space-y-6">
              
              {/* Validation errors alerts block */}
              {Object.keys(errors).length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-[12px] p-4 flex gap-3 text-sm">
                  <div className="bg-red-100 text-red-600 rounded-full p-1.5 h-fit">
                    <ShieldIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-red-800">Please review your details</h4>
                    <p className="font-sans text-xs text-red-600 mt-0.5">
                      There are {Object.keys(errors).length} mandatory fields left incomplete or formatted incorrectly. Please update them below.
                    </p>
                  </div>
                </div>
              )}

              {/* 1.1 CONTACT INFORMATION */}
              <div className="space-y-4">
                <h3 className="font-sans font-bold text-[16px] text-[#1A1A1A]">
                  1. Contact Information
                </h3>
                <FloatingInput
                  label="Email address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  error={errors.email}
                />
              </div>

              {/* 1.2 SHIPPING ADDRESS */}
              <div className="space-y-4 pt-2">
                <h3 className="font-sans font-bold text-[16px] text-[#1A1A1A]">
                  2. Shipping Address
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FloatingInput
                    label="First name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    error={errors.firstName}
                  />
                  <FloatingInput
                    label="Last name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    error={errors.lastName}
                  />
                </div>
                
                <FloatingInput
                  label="Address line 1"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  error={errors.address}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FloatingInput
                    label="City"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    error={errors.city}
                  />
                  <FloatingInput
                    label="ZIP / Postal Code"
                    name="zip"
                    value={formData.zip}
                    onChange={handleInputChange}
                    required
                    error={errors.zip}
                  />
                </div>

                <FloatingInput
                  label="Phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  error={errors.phone}
                />
              </div>

              {/* 1.3 DELIVERY OPTIONS */}
              <div className="space-y-4 pt-2">
                <h3 className="font-sans font-bold text-[16px] text-[#1A1A1A]">
                  3. Delivery
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Option A: Eco Shipping */}
                  <label 
                    className={`relative cursor-pointer flex flex-col justify-between p-4 rounded-[16px] transition-all border duration-200 select-none ${
                      shippingMethod === 'eco' 
                        ? 'border-2 border-[#FF6C84] bg-[#FFEFED]' 
                        : 'border-[#FFE0E5] bg-white hover:border-[#FF6C84]/60'
                    }`}
                  >
                    <input 
                      type="radio" 
                      name="shippingMethod" 
                      value="eco" 
                      checked={shippingMethod === 'eco'} 
                      onChange={() => setShippingMethod('eco')}
                      className="sr-only" 
                    />
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <LeafIcon className="w-5 h-5 text-[#2E7D32] shrink-0" />
                          <span className="font-sans font-bold text-sm text-[#1A1A1A]">Eco Shipping (Carbon Neutral)</span>
                        </div>
                        <div className="w-4 h-4 rounded-full border border-[#FFE0E5] flex items-center justify-center bg-white shrink-0">
                          {shippingMethod === 'eco' && <div className="w-2.5 h-2.5 rounded-full bg-[#FF6C84]" />}
                        </div>
                      </div>
                      <p className="font-sans text-xs text-[#888888] mt-2">
                        FREE · Estimated 3-5 days
                      </p>
                    </div>
                    <div className="mt-3 flex">
                      <span className="inline-flex bg-[#E8F5E9] text-[#2E7D32] font-sans text-[11px] font-bold px-2 py-0.5 rounded-sm">
                        FREE
                      </span>
                    </div>
                  </label>

                  {/* Option B: Express Shipping */}
                  <label 
                    className={`relative cursor-pointer flex flex-col justify-between p-4 rounded-[16px] transition-all border duration-200 select-none ${
                      shippingMethod === 'express' 
                        ? 'border-2 border-[#FF6C84] bg-[#FFEFED]' 
                        : 'border-[#FFE0E5] bg-white hover:border-[#FF6C84]/60'
                    }`}
                  >
                    <input 
                      type="radio" 
                      name="shippingMethod" 
                      value="express" 
                      checked={shippingMethod === 'express'} 
                      onChange={() => setShippingMethod('express')}
                      className="sr-only" 
                    />
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <BoltIcon className="w-5 h-5 text-[#FF6C84] shrink-0" />
                          <span className="font-sans font-bold text-sm text-[#1A1A1A]">Express Shipping</span>
                        </div>
                        <div className="w-4 h-4 rounded-full border border-[#FFE0E5] flex items-center justify-center bg-white shrink-0">
                          {shippingMethod === 'express' && <div className="w-2.5 h-2.5 rounded-full bg-[#FF6C84]" />}
                        </div>
                      </div>
                      <p className="font-sans text-xs text-[#888888] mt-2">
                        $6.99 · Estimated 1-2 days
                      </p>
                    </div>
                    <div className="mt-3">
                      <span className="font-sans text-xs font-bold text-[#1A1A1A]">
                        $6.99
                      </span>
                    </div>
                  </label>
                  
                </div>
              </div>

              {/* 1.4 PAYMENT DETAILS */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-sans font-bold text-[16px] text-[#1A1A1A]">
                    4. Payment
                  </h3>
                  <div className="flex items-center gap-1 text-[#2E7D32]">
                    <ShieldIcon className="w-4 h-4 text-[#2E7D32]" />
                    <span className="font-sans text-xs text-[#2E7D32] font-semibold">Secure SSL</span>
                  </div>
                </div>

                {/* Tab selector bar */}
                <div className="flex border-b border-[#FFE0E5] select-none">
                  <button
                    type="button"
                    onClick={() => setActiveTab('card')}
                    className={`flex-1 text-center pb-2.5 font-sans text-xs sm:text-sm tracking-wide transition-all duration-200 cursor-pointer ${
                      activeTab === 'card' 
                        ? 'border-b-2 border-[#FF6C84] text-[#FF6C84] font-bold' 
                        : 'text-[#999999]'
                    }`}
                  >
                    Credit / Debit Card
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('paypal')}
                    className={`flex-1 text-center pb-2.5 font-sans text-xs sm:text-sm tracking-wide transition-all duration-200 cursor-pointer ${
                      activeTab === 'paypal' 
                        ? 'border-b-2 border-[#FF6C84] text-[#FF6C84] font-bold' 
                        : 'text-[#999999]'
                    }`}
                  >
                    PayPal
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('apple')}
                    className={`flex-1 text-center pb-2.5 font-sans text-xs sm:text-sm tracking-wide transition-all duration-200 cursor-pointer ${
                      activeTab === 'apple' 
                        ? 'border-b-2 border-[#FF6C84] text-[#FF6C84] font-bold' 
                        : 'text-[#999999]'
                    }`}
                  >
                    Apple Pay
                  </button>
                </div>

                {/* Tab content panel */}
                <div className="pt-2">
                  <style>{`
                    @keyframes customFadeIn {
                      from { opacity: 0; transform: translateY(4px); }
                      to { opacity: 1; transform: translateY(0); }
                    }
                    .animate-tab-fade {
                      animation: customFadeIn 0.2s ease-out forwards;
                    }
                  `}</style>
                  
                  {activeTab === 'card' && (
                    <div className="animate-tab-fade space-y-4">
                      
                      {/* Logo selection row */}
                      <div className="flex items-center gap-2 pb-1 bg-white">
                        <VisaLogo />
                        <MastercardLogo />
                        <AmexLogo />
                        <DiscoverLogo />
                      </div>

                      <FloatingInput
                        label="Cardholder name"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        required
                        error={errors.cardName}
                      />

                      <FloatingInput
                        label="Card number"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        maxLength={19}
                        required
                        error={errors.cardNumber}
                        rightElement={
                          <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="2" y="5" width="20" height="14" rx="2" ry="2" />
                            <line x1="2" y1="10" x2="22" y2="10" />
                          </svg>
                        }
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <FloatingInput
                          label="Expiry date"
                          name="cardExpiry"
                          value={formData.cardExpiry}
                          onChange={handleInputChange}
                          maxLength={5}
                          required
                          error={errors.cardExpiry}
                        />
                        <FloatingInput
                          label="CVV"
                          name="cardCvv"
                          value={formData.cardCvv}
                          onChange={handleInputChange}
                          maxLength={4}
                          required
                          error={errors.cardCvv}
                          rightElement={
                            <div className="relative">
                              <button
                                type="button"
                                onMouseEnter={() => setShowCvvTooltip(true)}
                                onMouseLeave={() => setShowCvvTooltip(false)}
                                onClick={() => setShowCvvTooltip(!showCvvTooltip)}
                                className="p-1 focus:outline-none cursor-pointer text-[#FF6C84] hover:opacity-80"
                              >
                                <QuestionIcon className="w-4.5 h-4.5 text-[#FF6C84]" />
                              </button>
                              {showCvvTooltip && (
                                <div className="absolute bottom-full right-0 mb-2.5 w-44 bg-[#1A1A1A] text-white text-[11px] font-sans p-2 rounded-[8px] shadow-lg z-50 text-center leading-normal">
                                  3 digits on card back
                                  <div className="absolute top-full right-2 w-2 h-2 bg-[#1A1A1A] rotate-45 transform -translate-y-1" />
                                </div>
                              )}
                            </div>
                          }
                        />
                      </div>
                    </div>
                  )}

                  {activeTab === 'paypal' && (
                    <div className="animate-tab-fade pt-4 text-center bg-[#FFEFED]/20 border border-[#FFE0E5] rounded-[16px] p-6 space-y-2">
                      <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M7.076 21.337H2.47a.641.641 0 0 1-.613-.762L4.944 3.32a.641.641 0 0 1 .614-.513h8.318c4.32 0 6.643 2.115 5.922 6.666-.466 2.946-2.28 4.603-5.26 4.603h-.62c-.516 0-.961.353-1.054.84l-.946 4.966-.015.074a.641.641 0 0 1-.613.481l-1.258.001z" />
                        </svg>
                      </div>
                      <p className="font-sans font-bold text-sm text-[#1A1A1A]">PayPal Integration</p>
                      <p className="font-sans text-xs text-[#666666] max-w-sm mx-auto leading-relaxed">
                        Redirects seamlessly to pay securely from your checkings, savings, or PayPal balance. No numbers required.
                      </p>
                    </div>
                  )}

                  {activeTab === 'apple' && (
                    <div className="animate-tab-fade pt-4 text-center bg-[#FFEFED]/20 border border-[#FFE0E5] rounded-[16px] p-6 space-y-2">
                      <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center mx-auto">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C4.34 16.74 3.78 10.9 6.8 9.17c1.5-.83 2.87-.36 3.75.14.7.4 1.34.42 1.83.13 1.13-.67 2.38-.97 3.84-.13 1.42.82 2.3 2.1 2.3 2.1s-1.8 1.14-1.74 3.42c.07 2.62 2.12 3.51 2.12 3.51s-1.6 3.42-3.8 3.94M12.03 2.1c.14 1.18-.32 2.42-1.12 3.2-.82.8-2 1.25-3.06 1.15-.17-1.15.35-2.34 1.07-3.13.82-.9 2.05-1.37 3.1-1.22" />
                        </svg>
                      </div>
                      <p className="font-sans font-bold text-sm text-[#1A1A1A]">Apple Pay Express</p>
                      <p className="font-sans text-xs text-[#666666] max-w-sm mx-auto leading-relaxed">
                        One-click facial recognition and tokenized safety directly with your iOS/Safari active keychain cards.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* COUPON CODE ROW (Collapsible) */}
              <div className="pt-4 border-t border-[#FFE0E5] space-y-2">
                <button
                  type="button"
                  onClick={() => setIsCouponExpanded(!isCouponExpanded)}
                  className="flex items-center gap-1 text-[#FF6C84] font-sans text-[13px] font-semibold hover:opacity-90 cursor-pointer"
                >
                  <span>Have a promo code?</span>
                  <ChevronIcon direction={isCouponExpanded ? 'up' : 'down'} className="w-4.5 h-4.5 text-[#FF6C84]" />
                </button>
                
                <AnimatePresence>
                  {isCouponExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="pt-2 flex gap-2">
                        <input
                          type="text"
                          value={couponInput}
                          onChange={e => setCouponInput(e.target.value)}
                          placeholder="GLOW20"
                          className="flex-1 bg-white border border-[#FFE0E5] rounded-[12px] px-4 py-2.5 text-sm font-sans focus:border-[#FF6C84] outline-none"
                        />
                        <button
                          type="button"
                          onClick={handleApplyCoupon}
                          className="px-6 border border-[#FF6C84] text-[#FF6C84] font-sans font-semibold text-sm rounded-full bg-white hover:bg-[#FFEFED]/40 transition-colors cursor-pointer"
                        >
                          Apply
                        </button>
                      </div>
                      {appliedCode && (
                        <p className="text-[#2E7D32] text-xs font-sans mt-1.5">
                          Code <strong>{appliedCode}</strong> successfully applied! ({discount}% discount)
                        </p>
                      )}
                      {couponError && (
                        <p className="text-red-500 text-xs font-sans mt-1.5">{couponError}</p>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* COMPLETE PAYMENT PROCESS */}
              <div className="pt-4 space-y-5">
                <motion.button
                  type="submit"
                  whileTap={{ scale: [0.97, 1.03, 1] }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="w-full h-[60px] bg-[#FF6C84] text-white font-sans font-bold text-[18px] rounded-full hover:brightness-[1.08] transition-all flex items-center justify-center gap-2.5 cursor-pointer shadow-sm select-none"
                >
                  <LockIcon className="w-5 h-5 text-white" />
                  <span>Complete Payment (${finalTotal.toFixed(2)})</span>
                </motion.button>

                {/* TRUST BADGES ROW */}
                <div className="flex items-center justify-center gap-3.5 pt-2 select-none">
                  <div className="flex items-center gap-1 text-[#888888]">
                    <LockIcon className="w-4.5 h-4.5 text-[#888888] shrink-0" />
                    <span className="font-sans text-[12px]">Secure Payment</span>
                  </div>
                  <div className="w-[1px] h-3.5 bg-[#FFE0E5]" />
                  <div className="flex items-center gap-1 text-[#888888]">
                    <RefreshIcon className="w-4.5 h-4.5 text-[#888888] shrink-0" />
                    <span className="font-sans text-[12px]">30-Day Returns</span>
                  </div>
                  <div className="w-[1px] h-3.5 bg-[#FFE0E5]" />
                  <div className="flex items-center gap-1 text-[#888888]">
                    <ShieldIcon className="w-4.5 h-4.5 text-[#888888] shrink-0" />
                    <span className="font-sans text-[12px]">Buyer Protection</span>
                  </div>
                </div>
              </div>

            </form>
          </div>

          {/* RIGHT COLUMN: STATIC SIDEBAR (38%) */}
          <div className="hidden lg:block lg:w-[38%] sticky top-[100px] order-2 z-10">
            <OrderSummaryCard 
              cart={cart}
              subtotal={subtotal}
              discount={discount}
              appliedCode={appliedCode}
              shippingMethod={shippingMethod}
              shippingCost={shippingCost}
              estimatedTax={estimatedTax}
              finalTotal={finalTotal}
              updateQuantity={updateQuantity}
              removeFromCart={removeFromCart}
            />
          </div>

        </div>

      </div>
    </div>
  );
}

// ==========================================
// SUB-COMPONENT: ORDER SUMMARY CARD
// ==========================================
interface OrderSummaryCardProps {
  cart: any[];
  subtotal: number;
  discount: number;
  appliedCode: string;
  shippingMethod: 'eco' | 'express';
  shippingCost: number;
  estimatedTax: number;
  finalTotal: number;
  updateQuantity: (id: number, qty: number) => void;
  removeFromCart: (id: number) => void;
}

function OrderSummaryCard({
  cart,
  subtotal,
  discount,
  appliedCode,
  shippingMethod,
  shippingCost,
  estimatedTax,
  finalTotal,
  updateQuantity,
  removeFromCart,
}: OrderSummaryCardProps) {
  const itemTotalCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="bg-white rounded-[16px] border border-[#FFE0E5] p-6 space-y-6 shadow-xs">
      
      {/* Card Header Title */}
      <div className="flex justify-between items-center pb-2 border-b border-[#FFE0E5] select-none">
        <h2 className="font-serif text-[22px] font-bold text-[#1A1A1A]">
          Glow Order Summary
        </h2>
        <span className="bg-[#FFEFED] text-[#FF6C84] font-sans text-[12px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
          {itemTotalCount} Item{itemTotalCount !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Cart Items List */}
      <div className="divide-y divide-[#FFE0E5] max-h-[340px] overflow-y-auto pr-1">
        {cart.map((item) => (
          <div key={item.product.id} className="flex gap-4 items-start py-4 first:pt-0 last:pb-0">
            <div className="w-[72px] h-[72px] rounded-[12px] overflow-hidden bg-gray-50 border border-[#FFE0E5] shrink-0">
              <img 
                src={item.product.image} 
                alt={item.product.name} 
                className="w-full h-full object-cover" 
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="font-sans font-bold text-sm text-[#1A1A1A] line-clamp-2 leading-snug">
                {item.product.name}
              </h4>
              <p className="font-sans text-[12px] text-[#888888] mt-0.5">30ml</p>
              
              <div className="flex items-center gap-2 mt-2 select-none">
                <button
                  type="button"
                  onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                  className="w-6 h-6 rounded-full border border-[#FFE0E5] flex items-center justify-center bg-white text-[#666666] hover:bg-[#FFEFED] hover:text-[#FF6C84] transition-colors cursor-pointer"
                >
                  <MinusIcon className="w-3.5 h-3.5" />
                </button>
                <span className="font-sans text-xs font-bold text-[#1A1A1A] min-w-[12px] text-center">
                  {item.quantity}
                </span>
                <button
                  type="button"
                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                  className="w-6 h-6 rounded-full border border-[#FFE0E5] flex items-center justify-center bg-white text-[#666666] hover:bg-[#FFEFED] hover:text-[#FF6C84] transition-colors cursor-pointer"
                >
                  <PlusIcon className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                type="button"
                onClick={() => removeFromCart(item.product.id)}
                className="flex items-center gap-1 text-[#FF6C84] hover:text-[#FF6C84]/80 mt-2 text-xs font-semibold cursor-pointer"
              >
                <TrashIcon className="w-3.5 h-3.5 text-[#FF6C84]" />
                <span>Remove</span>
              </button>
            </div>

            <div className="shrink-0 text-right">
              <span className="font-sans font-bold text-[16px] text-[#1A1A1A]">
                ${(item.product.price * item.quantity).toFixed(2)}
              </span>
            </div>
          </div>
        ))}

        {cart.length === 0 && (
          <div className="py-8 text-center text-[#888888] font-sans text-xs leading-relaxed select-none">
            Your cart is currently empty.
          </div>
        )}
      </div>

      {/* Financial calculations breakdown */}
      <div className="space-y-3 pt-4 border-t border-[#FFE0E5] text-sm text-[#666666] font-sans">
        <div className="flex justify-between">
          <span>Items Subtotal</span>
          <span className="font-semibold text-[#1A1A1A]">${subtotal.toFixed(2)}</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-[#2E7D32]">
            <span>Promo Discount ({appliedCode})</span>
            <span className="font-bold">-${(subtotal * (discount / 100)).toFixed(2)}</span>
          </div>
        )}

        <div className="flex justify-between">
          <span>{shippingMethod === 'eco' ? 'Eco Shipping' : 'Express Shipping'}</span>
          {shippingMethod === 'eco' ? (
            <span className="font-bold text-[#2E7D32] flex items-center gap-1">
              <LeafIcon className="w-3 h-3 text-[#2E7D32]" />
              <span>FREE</span>
            </span>
          ) : (
            <span className="font-bold text-[#1A1A1A]">$6.99</span>
          )}
        </div>

        <div className="flex justify-between">
          <span>Estimated Tax (8%)</span>
          <span>${estimatedTax.toFixed(2)}</span>
        </div>

        <div className="flex justify-between items-center pt-3 border-t border-[#FFE0E5] text-base font-bold text-[#1A1A1A]">
          <span>Total Due</span>
          <span className="text-[#FF6C84] text-xl font-bold">${finalTotal.toFixed(2)}</span>
        </div>
      </div>

      {/* ESTIMATED DELIVERY ROADSTRIP */}
      <div className="bg-[#FFEFED] rounded-[12px] p-3 text-sm select-none">
        <div className="flex items-center gap-2 text-[#666666]">
          <CalendarIcon className="w-4.5 h-4.5 text-[#FF6C84] shrink-0" />
          <span className="font-sans text-[13px] tracking-wide">
            Estimated arrival: <strong className="text-[#1A1A1A]">Jun 20 – Jun 22</strong>
          </span>
        </div>
      </div>

      {/* TRUST NOTES ACCREDITATION */}
      <div className="space-y-4 pt-1 select-none text-[13px]">
        {/* Row 1 */}
        <div className="flex gap-2.5 items-start">
          <LockIcon className="w-4 h-4 text-[#FF6C84] shrink-0 mt-0.5" />
          <p className="font-sans text-[#666666] leading-relaxed">
            <strong className="text-[#1A1A1A] font-bold">Lumae Secure Checkout guarantee</strong>: Your information is encrypted using industry standard protocols.
          </p>
        </div>
        {/* Row 2 */}
        <div className="flex gap-2.5 items-start">
          <LeafIcon className="w-4 h-4 text-[#2E7D32] shrink-0 mt-0.5" />
          <p className="font-sans text-[#666666] leading-relaxed">
            <strong className="text-[#1A1A1A] font-bold">Carbon-Neutral Shipping</strong>: Packaged with sustainable fiber cardboards.
          </p>
        </div>
      </div>

    </div>
  );
}
