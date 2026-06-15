import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { CreditCard, CheckCircle, ArrowLeft, ShieldCheck, Truck, Sparkles, Minus, Plus, Trash2 } from 'lucide-react';

export function CheckoutPage() {
  const { cart, cartTotal, discount, appliedCode, clearCart, setCurrentView } = useCart();
  const [isSuccess, setIsSuccess] = useState(false);
  const [trackingId, setTrackingId] = useState('');
  
  // Purchased caching details for receipt summary on order success screen
  const [purchasedQty, setPurchasedQty] = useState(0);
  const [purchasedProducts, setPurchasedProducts] = useState<any[]>([]);
  const [purchasedTotal, setPurchasedTotal] = useState(0);
  const [purchasedSubtotal, setPurchasedSubtotal] = useState(0);
  const [purchasedDiscount, setPurchasedDiscount] = useState(0);
  const [purchasedAppliedCode, setPurchasedAppliedCode] = useState('');
  const [deliveryName, setDeliveryName] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryEmail, setDeliveryEmail] = useState('');
  
  // Form state
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

  // Helper to format Card Number (adds spaces every 4 digits)
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length > 0) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  // Helper to format Card Expiry (adds '/' after 2 digits)
  const formatCardExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return `${v.slice(0, 2)}/${v.slice(2, 4)}`;
    }
    return v;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;
    
    if (name === 'cardNumber') {
      formattedValue = formatCardNumber(value);
    } else if (name === 'cardExpiry') {
      formattedValue = formatCardExpiry(value);
    } else if (name === 'cardCvv') {
      formattedValue = value.replace(/[^0-9]/gi, '');
    } else if (name === 'phone') {
      formattedValue = value.replace(/[^0-9+()]/gi, '');
    }

    setFormData(prev => ({ ...prev, [name]: formattedValue }));
    if (errors[name]) {
      setErrors(prev => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const validateForm = () => {
    const tempErrors: Record<string, string> = {};
    
    // Email Validation
    if (!formData.email.trim()) {
      tempErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Please enter a valid email address (e.g., name@domain.com)';
    }

    // First and Last Name
    if (!formData.firstName.trim()) {
      tempErrors.firstName = 'First name is required';
    } else if (formData.firstName.trim().length < 2) {
      tempErrors.firstName = 'First name must be at least 2 characters';
    }

    if (!formData.lastName.trim()) {
      tempErrors.lastName = 'Last name is required';
    } else if (formData.lastName.trim().length < 2) {
      tempErrors.lastName = 'Last name must be at least 2 characters';
    }

    // Shipping address
    if (!formData.address.trim()) {
      tempErrors.address = 'Shipping address is required';
    } else if (formData.address.trim().length < 5) {
      tempErrors.address = 'Please enter a complete shipping address (building, street)';
    }

    // City
    if (!formData.city.trim()) {
      tempErrors.city = 'City is required';
    }

    // ZIP code (Alphanumeric format for international, US standard checking)
    const cleanedZip = formData.zip.trim();
    if (!cleanedZip) {
      tempErrors.zip = 'ZIP / Postal code is required';
    } else if (cleanedZip.length < 3) {
      tempErrors.zip = 'Please enter a valid ZIP / Postal code';
    }

    // Phone: numerical format, min length 8
    const cleanPhone = formData.phone.replace(/[^0-9]/g, '');
    if (!formData.phone.trim()) {
      tempErrors.phone = 'Phone number is required';
    } else if (cleanPhone.length < 8) {
      tempErrors.phone = 'Please enter a valid phone number (at least 8 digits)';
    }

    // Cardholder Name
    if (!formData.cardName.trim()) {
      tempErrors.cardName = 'Cardholder name is required';
    } else if (!formData.cardName.trim().includes(' ')) {
      tempErrors.cardName = 'Please enter full name (First and Last as on card)';
    }

    // Card Number: standard Luhn algorithm validation
    const rawCardNum = formData.cardNumber.replace(/\s/g, '');
    if (!rawCardNum) {
      tempErrors.cardNumber = 'Card number is required';
    } else if (rawCardNum.length < 13 || rawCardNum.length > 19) {
      tempErrors.cardNumber = 'Card number must be between 13 and 19 digits';
    } else {
      // Luhn checksum test
      let sum = 0;
      let shouldDouble = false;
      for (let i = rawCardNum.length - 1; i >= 0; i--) {
        let digit = parseInt(rawCardNum.charAt(i), 10);
        if (shouldDouble) {
          if ((digit *= 2) > 9) digit -= 9;
        }
        sum += digit;
        shouldDouble = !shouldDouble;
      }
      if (sum % 10 !== 0) {
        tempErrors.cardNumber = 'Invalid credit card checksum';
      }
    }

    // Card Expiry: MM/YY check
    const expiryMatch = formData.cardExpiry.match(/^(\d{2})\/(\d{2})$/);
    if (!formData.cardExpiry) {
      tempErrors.cardExpiry = 'Expiry date is required';
    } else if (!expiryMatch) {
      tempErrors.cardExpiry = 'Must be in MM/YY format';
    } else {
      const month = parseInt(expiryMatch[1], 10);
      const year = parseInt(expiryMatch[2], 10);
      if (month < 1 || month > 12) {
        tempErrors.cardExpiry = 'Month must be 01-12';
      } else {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear() % 100; // last 2 digits of current year
        const currentMonth = currentDate.getMonth() + 1; // 1-12
        
        if (year < currentYear || (year === currentYear && month < currentMonth)) {
          tempErrors.cardExpiry = 'Card has expired';
        } else if (year > currentYear + 20) {
          tempErrors.cardExpiry = 'Invalid expiration year';
        }
      }
    }

    // Card CVV
    const cleanedCvv = formData.cardCvv.replace(/\D/g, '');
    if (!formData.cardCvv) {
      tempErrors.cardCvv = 'CVV is required';
    } else if (cleanedCvv.length < 3 || cleanedCvv.length > 4) {
      tempErrors.cardCvv = 'Must be 3 or 4 digits';
    }

    setErrors(tempErrors);
    return tempErrors;
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tempErrors = validateForm();
    if (Object.keys(tempErrors).length > 0) {
      // Smoothly scroll to the first active field with an error
      const firstErrorKey = Object.keys(tempErrors)[0];
      if (firstErrorKey) {
        const errField = document.getElementsByName(firstErrorKey)[0];
        if (errField) {
          errField.scrollIntoView({ behavior: 'smooth', block: 'center' });
          // Focus the input to allow quick typing
          try {
            (errField as HTMLInputElement).focus();
          } catch (e) {
            // handle silent fail if not focusable
          }
        }
      }
      return;
    }

    // Simulate order submission
    const randomId = 'LUM-' + Math.floor(Math.random() * 90000 + 10000);
    setTrackingId(randomId);
    
    // Save purchased data details before clearing the active cart
    setPurchasedProducts([...cart]);
    setPurchasedQty(cart.reduce((sum, item) => sum + item.quantity, 0));
    setPurchasedTotal(cartTotal);
    setPurchasedSubtotal(subtotal);
    setPurchasedDiscount(discount);
    setPurchasedAppliedCode(appliedCode);
    setDeliveryAddress(`${formData.address}, ${formData.city}, ${formData.zip}`);
    setDeliveryName(`${formData.firstName} ${formData.lastName}`);
    setDeliveryEmail(formData.email);

    setIsSuccess(true);
    clearCart();
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  if (isSuccess) {
    return (
      <div className="bg-amber-50/20 min-h-screen py-12 md:py-20 flex items-center justify-center px-4">
        <div id="checkout-success-container" className="max-w-2xl w-full bg-white rounded-[32px] shadow-xl border border-pink-100 overflow-hidden transition-all duration-300">
          
          {/* Top colored success accent banner */}
          <div className="bg-radial from-pink-500 to-[#FF6C84] text-white p-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent)] pointer-events-none"></div>
            <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-white/5 blur-3xl"></div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-white/5 blur-3xl"></div>
            
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 text-[#FF6C84] shadow-md animate-bounce">
              <CheckCircle className="w-10 h-10" />
            </div>
            
            <h2 className="font-serif text-3xl font-extrabold tracking-tight mb-2">Order Confirmed!</h2>
            <p className="font-sans text-white/90 text-sm max-w-md mx-auto">
              Thank you for shopping with Lumae. Your order is being prepped for dispatch.
            </p>
          </div>

          <div className="p-6 md:p-8 space-y-6">
            
            {/* Quick Summary Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#FFEFED]/25 rounded-[20px] p-4 border border-pink-100/50">
                <span className="block font-sans text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Order Details</span>
                <div className="flex justify-between items-center mt-1.5">
                  <span className="font-sans text-[13px] text-gray-500">Order Number</span>
                  <span className="font-mono font-bold text-gray-800 bg-white border border-pink-100 px-2.5 py-0.5 rounded text-sm">{trackingId}</span>
                </div>
                <div className="flex justify-between items-center mt-2.5">
                  <span className="font-sans text-[13px] text-gray-500">Shipment Status</span>
                  <span className="font-sans font-bold text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded flex items-center gap-1">
                    <Truck className="w-3 h-3" /> Preparing for Dispatch
                  </span>
                </div>
              </div>

              <div className="bg-[#FFEFED]/25 rounded-[20px] p-4 border border-pink-100/50">
                <span className="block font-sans text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Shipping Address</span>
                <p className="font-sans text-[13px] text-gray-800 font-semibold truncate mt-1.5">{deliveryName}</p>
                <p className="font-sans text-xs text-gray-500 truncate mt-0.5">{deliveryAddress}</p>
                <p className="font-sans text-xs text-gray-400 truncate mt-0.5">{deliveryEmail}</p>
              </div>
            </div>

            {/* Dynamic Items Purchase Receipt */}
            <div className="border border-pink-100/50 rounded-[20px] overflow-hidden bg-white">
              <div className="bg-gray-50 px-5 py-3 border-b border-pink-100/30 flex justify-between items-center">
                <h3 className="font-sans font-bold text-xs text-gray-500 uppercase tracking-widest">Receipt Summary</h3>
                <span className="font-sans text-[11px] text-gray-400 font-medium">{purchasedQty} item{purchasedQty > 1 ? 's' : ''} purchased</span>
              </div>
              
              <div className="divide-y divide-pink-50 max-h-[220px] overflow-y-auto px-5">
                {purchasedProducts.map((item) => (
                  <div key={item.product.id} className="flex justify-between items-center py-3.5">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-11 h-11 rounded-lg overflow-hidden bg-gray-50 border border-pink-100/50 shrink-0">
                        <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-sans font-bold text-[13px] text-gray-800 truncate">{item.product.name}</h4>
                        <span className="font-sans text-[11px] text-gray-400 block mt-0.5">
                          Qty: {item.quantity} × ${item.product.price.toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <span className="font-sans font-bold text-sm text-gray-700 ml-4 shrink-0">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Price Calculation Bottom Details */}
              <div className="bg-gray-50/50 border-t border-pink-100/30 px-5 py-4 space-y-2.5 text-xs font-sans text-gray-500">
                <div className="flex justify-between">
                  <span>Items Subtotal</span>
                  <span className="font-bold text-gray-700">${purchasedSubtotal.toFixed(2)}</span>
                </div>

                {purchasedDiscount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-green-500" />
                      Promo Code ({purchasedAppliedCode})
                    </span>
                    <span className="font-bold">-${(purchasedSubtotal * (purchasedDiscount / 100)).toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Shipping & Eco Packing</span>
                  <span className="text-green-600 font-bold uppercase tracking-wider text-[10px]">Free</span>
                </div>

                <div className="flex justify-between items-center pt-3 border-t border-pink-100 font-sans text-sm font-bold text-gray-800">
                  <span className="text-gray-800 font-bold">Total Amount Paid</span>
                  <span className="text-[#FF6C84] text-base font-black">${purchasedTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Support Guarantee */}
            <div className="flex gap-3 items-start bg-rose-50/30 p-4 rounded-xl border border-rose-100/40 text-xs font-sans text-gray-500 leading-relaxed">
              <ShieldCheck className="w-5 h-5 text-[#FF6C84] shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-gray-700 block mb-0.5">Payment processed securely</span>
                Your invoice reference have been dispatched to your email <strong className="text-gray-700 font-semibold">{deliveryEmail}</strong>. If you have questions, reach us under support@lumae.com.
              </div>
            </div>

            {/* Back action */}
            <button
              onClick={() => setCurrentView('home')}
              className="w-full bg-[#FF6C84] text-white font-sans font-bold py-3.5 rounded-full hover:brightness-105 transition-all text-center tracking-wide shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home Page</span>
            </button>
            
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen py-10 md:py-[80px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back control */}
        <button 
          onClick={() => setCurrentView('home')}
          className="flex items-center gap-2 font-sans font-semibold text-text-charcoal hover:text-[#FF6C84] transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Products</span>
        </button>

        <h1 className="font-serif text-[38px] font-bold text-[#1A1A1A] mb-8 leading-tight">Secure checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Main Delivery & Payment column */}
          <div className="lg:col-span-7">
            <form onSubmit={handleCheckoutSubmit} className="space-y-8">
              
              {Object.keys(errors).length > 0 && (
                <div className="bg-red-50/80 border border-red-200 rounded-[20px] p-5 flex items-start gap-3.5 shadow-xs">
                  <div className="bg-red-100 text-red-600 rounded-full p-2 shrink-0">
                    <svg className="w-5 h-5 animate-pulse" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-sans font-bold text-[#991B1B] text-[15px]">Please check your details</h3>
                    <p className="font-sans text-[#B91C1C] text-[13px] mt-1.5 leading-relaxed">
                      We've found {Object.keys(errors).length} invalid or missing field{Object.keys(errors).length > 1 ? 's' : ''}. Please check the highlighted inputs below.
                    </p>
                  </div>
                </div>
              )}

              {/* Shipping Address */}
              <div>
                <h2 className="font-sans font-bold text-lg text-[#1A1A1A] mb-5 pb-2 border-b border-pink-50">
                  1. Shipping Information
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block font-sans text-xs font-semibold text-gray-500 mb-1">Email for invoice</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="you@example.com"
                      className={`w-full bg-gray-50/50 border rounded-xl px-4 py-3 text-sm font-sans focus:outline-none focus:border-[#FF6C84] ${errors.email ? 'border-red-500' : 'border-pink-100'}`}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1 font-sans">{errors.email}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-sans text-xs font-semibold text-gray-500 mb-1">First name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="Sarah"
                        className={`w-full bg-gray-50/50 border rounded-xl px-4 py-3 text-sm font-sans focus:outline-none focus:border-[#FF6C84] ${errors.firstName ? 'border-red-500' : 'border-pink-100'}`}
                      />
                      {errors.firstName && <p className="text-red-500 text-xs mt-1 font-sans">{errors.firstName}</p>}
                    </div>
                    <div>
                      <label className="block font-sans text-xs font-semibold text-gray-500 mb-1">Last name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Miller"
                        className={`w-full bg-gray-50/50 border rounded-xl px-4 py-3 text-sm font-sans focus:outline-none focus:border-[#FF6C84] ${errors.lastName ? 'border-red-500' : 'border-pink-100'}`}
                      />
                      {errors.lastName && <p className="text-red-500 text-xs mt-1 font-sans">{errors.lastName}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block font-sans text-xs font-semibold text-gray-500 mb-1">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Apt, Suite, Street location"
                      className={`w-full bg-gray-50/50 border rounded-xl px-4 py-3 text-sm font-sans focus:outline-none focus:border-[#FF6C84] ${errors.address ? 'border-red-500' : 'border-pink-100'}`}
                    />
                    {errors.address && <p className="text-red-500 text-xs mt-1 font-sans">{errors.address}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-sans text-xs font-semibold text-gray-500 mb-1">City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="London"
                        className={`w-full bg-gray-50/50 border rounded-xl px-4 py-3 text-sm font-sans focus:outline-none focus:border-[#FF6C84] ${errors.city ? 'border-red-500' : 'border-pink-100'}`}
                      />
                      {errors.city && <p className="text-red-500 text-xs mt-1 font-sans">{errors.city}</p>}
                    </div>
                    <div>
                      <label className="block font-sans text-xs font-semibold text-gray-500 mb-1">ZIP / Postal Code</label>
                      <input
                        type="text"
                        name="zip"
                        value={formData.zip}
                        onChange={handleInputChange}
                        placeholder="EC1A 1BB"
                        className={`w-full bg-gray-50/50 border rounded-xl px-4 py-3 text-sm font-sans focus:outline-none focus:border-[#FF6C84] ${errors.zip ? 'border-red-500' : 'border-pink-100'}`}
                      />
                      {errors.zip && <p className="text-red-500 text-xs mt-1 font-sans">{errors.zip}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block font-sans text-xs font-semibold text-gray-500 mb-1">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+44 7911 123456"
                      className={`w-full bg-gray-50/50 border rounded-xl px-4 py-3 text-sm font-sans focus:outline-none focus:border-[#FF6C84] ${errors.phone ? 'border-red-500' : 'border-pink-100'}`}
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1 font-sans">{errors.phone}</p>}
                  </div>
                </div>
              </div>

              {/* Express Payments or Card */}
              <div>
                <h2 className="font-sans font-bold text-lg text-[#1A1A1A] mb-5 pb-2 border-b border-pink-50 flex items-center justify-between">
                  <span>2. Payment Details</span>
                  <span className="flex items-center gap-1 text-[11px] font-sans font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded">
                    <ShieldCheck className="w-3.5 h-3.5" /> Secure SSL Encryption
                  </span>
                </h2>

                {/* Simulated credit card entry */}
                <div className="bg-[#FFEFED]/20 border border-pink-50 rounded-[20px] p-6 space-y-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-sans font-bold text-[13px] text-[#1A1A1A] flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-primary-pink" /> Credit / Debit Card
                    </span>
                    <span className="text-xs text-gray-400">Visa, Mastercard, Amex, Discover</span>
                  </div>

                  <div>
                    <label className="block font-sans text-xs font-semibold text-gray-500 mb-1">Cardholder name</label>
                    <input
                      type="text"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      placeholder="SARAH MILLER"
                      className={`w-full bg-white border rounded-xl px-4 py-3 text-sm font-sans focus:outline-none focus:border-[#FF6C84] uppercase tracking-wide ${errors.cardName ? 'border-red-500' : 'border-pink-100'}`}
                    />
                    {errors.cardName && <p className="text-red-500 text-xs mt-1 font-sans">{errors.cardName}</p>}
                  </div>

                  <div>
                    <label className="block font-sans text-xs font-semibold text-gray-500 mb-1">Card number</label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      placeholder="4000 1234 5678 9010"
                      maxLength={19}
                      className={`w-full bg-white border rounded-xl px-4 py-3 text-sm font-sans focus:outline-none focus:border-[#FF6C84] ${errors.cardNumber ? 'border-red-500' : 'border-pink-100'}`}
                    />
                    {errors.cardNumber && <p className="text-red-500 text-xs mt-1 font-sans">{errors.cardNumber}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-sans text-xs font-semibold text-gray-500 mb-1">Expiry date</label>
                      <input
                        type="text"
                        name="cardExpiry"
                        value={formData.cardExpiry}
                        onChange={handleInputChange}
                        placeholder="MM / YY"
                        maxLength={5}
                        className={`w-full bg-white border rounded-xl px-4 py-3 text-sm font-sans focus:outline-none focus:border-[#FF6C84] ${errors.cardExpiry ? 'border-red-500' : 'border-pink-100'}`}
                      />
                      {errors.cardExpiry && <p className="text-red-500 text-xs mt-1 font-sans">{errors.cardExpiry}</p>}
                    </div>
                    <div>
                      <label className="block font-sans text-xs font-semibold text-gray-500 mb-1">Security Code (CVV)</label>
                      <input
                        type="text"
                        name="cardCvv"
                        value={formData.cardCvv}
                        onChange={handleInputChange}
                        placeholder="123"
                        maxLength={4}
                        className={`w-full bg-white border rounded-xl px-4 py-3 text-sm font-sans focus:outline-none focus:border-[#FF6C84] ${errors.cardCvv ? 'border-red-500' : 'border-pink-100'}`}
                      />
                      {errors.cardCvv && <p className="text-red-500 text-xs mt-1 font-sans">{errors.cardCvv}</p>}
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Submission Button */}
              <button
                type="submit"
                className="w-full bg-[#FF6C84] text-white font-sans font-bold py-4 rounded-full border border-white/10 hover:brightness-105 transition-all text-center flex items-center justify-center gap-2 cursor-pointer shadow-md text-[16px] tracking-wide"
              >
                Complete Payment (${cartTotal.toFixed(2)})
              </button>
            </form>
          </div>

          {/* Sidebar Order Summary */}
          <div className="lg:col-span-5">
            <OrderSummary />
          </div>

        </div>

      </div>
    </div>
  );
}

export function OrderSummary() {
  const { cart, cartTotal, discount, appliedCode, updateQuantity, removeFromCart } = useCart();
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  return (
    <div className="bg-[#FFEFED]/20 rounded-[24px] p-6 border border-pink-50 space-y-6 shadow-xs">
      <h2 className="font-sans font-bold text-lg text-[#1A1A1A] pb-3 border-b border-pink-100 flex items-center justify-between">
        <span>Glow Order Summary</span>
        <span className="font-sans text-xs bg-[#FF6C84]/15 text-[#FF6C84] px-2.5 py-1 rounded-full font-bold">
          {cart.reduce((sum, item) => sum + item.quantity, 0)} Items
        </span>
      </h2>

      {cart.length === 0 ? (
        <div className="py-12 text-center text-gray-400 font-sans text-sm flex flex-col items-center justify-center gap-3 bg-white/50 rounded-2xl border border-dashed border-pink-100">
          <svg className="w-8 h-8 text-pink-300" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
          <span className="font-medium">Your glow list is empty.</span>
        </div>
      ) : (
        <div className="space-y-4 max-h-[380px] overflow-y-auto pr-1 scrollbar-thin">
          {cart.map((item) => (
            <div key={item.product.id} className="flex gap-4 justify-between items-center py-3 border-b border-pink-50/50 last:border-0 group transition-all duration-150">
              <div className="flex gap-3 items-center">
                <div className="w-16 h-16 rounded-[12px] overflow-hidden bg-white border border-pink-100 shrink-0 relative shadow-sm">
                  <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-sans font-semibold text-[14px] text-[#1A1A1A] line-clamp-1">{item.product.name}</h4>
                  
                  {/* Dynamic quantity controls straight within order summary list */}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="w-5 h-5 rounded-full border border-pink-100 flex items-center justify-center bg-white text-gray-500 hover:bg-pink-50 hover:text-[#FF6C84] transition-colors shadow-2xs cursor-pointer"
                      title="Decrease quantity"
                    >
                      <Minus className="w-2.5 h-2.5" />
                    </button>
                    <span className="font-sans text-xs font-bold text-gray-700 min-w-4 text-center">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="w-5 h-5 rounded-full border border-pink-100 flex items-center justify-center bg-white text-gray-500 hover:bg-pink-50 hover:text-[#FF6C84] transition-colors shadow-2xs cursor-pointer"
                      title="Increase quantity"
                    >
                      <Plus className="w-2.5 h-2.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-gray-400 hover:text-[#FF6C84]/80 ml-2 transition-colors duration-150 cursor-pointer"
                      title="Remove from cart"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="text-right shrink-0">
                <span className="block font-sans font-bold text-text-charcoal text-[14px]">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </span>
                {item.quantity > 1 && (
                  <span className="text-[11px] font-sans text-gray-400 block mt-0.5">
                    ${item.product.price.toFixed(2)} each
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Price values breakdown */}
      <div className="space-y-3 pt-4 border-t border-pink-100 text-sm font-sans text-gray-600">
        <div className="flex justify-between">
          <span>Items Subtotal</span>
          <span className="font-semibold text-text-charcoal">${subtotal.toFixed(2)}</span>
        </div>
        
        {discount > 0 && (
          <div className="flex justify-between text-green-600 font-medium">
            <span className="flex items-center gap-1.5">
              <span className="bg-green-100 text-green-700 text-[10px] uppercase font-bold py-0.5 px-1.5 rounded-sm">
                {appliedCode}
              </span>
              <span>Promo Discount ({discount}%)</span>
            </span>
            <span className="font-semibold">-${(subtotal * (discount / 100)).toFixed(2)}</span>
          </div>
        )}

        <div className="flex justify-between items-center text-green-600">
          <span className="flex items-center gap-1"><Truck className="w-4 h-4" /> Eco Shipping</span>
          <span className="font-semibold uppercase tracking-wider text-xs">Free</span>
        </div>

        <div className="flex justify-between text-base font-bold text-text-charcoal pt-3 border-t border-pink-100">
          <span>Total Due</span>
          <span className="text-[#FF6C84] text-lg font-black">${cartTotal.toFixed(2)}</span>
        </div>
      </div>

      {/* Quick Guarantees */}
      <div className="bg-white rounded-[16px] p-4 text-xs font-sans text-gray-500 space-y-3 border border-pink-100/50">
        <div className="flex gap-2.5 items-start">
          <ShieldCheck className="w-4 h-4 text-[#FF6C84] shrink-0" />
          <span><strong className="text-text-charcoal">Lumae Secure Checkout guarantee</strong>: Your information is encrypted using industry standard protocols.</span>
        </div>
        <div className="flex gap-2.5 items-start">
          <Truck className="w-4 h-4 text-[#FF6C84] shrink-0" />
          <span><strong className="text-text-charcoal">Carbon-Neutral Shipping</strong> included. Packaged nicely with sustainable fiber cardboards.</span>
        </div>
      </div>
    </div>
  );
}
