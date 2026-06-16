import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem } from '../types';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  promoCode: string;
  setPromoCode: (code: string) => void;
  discount: number; // percentage
  appliedCode: string;
  applyPromo: (code: string) => boolean;
  cartTotal: number;
  cartCount: number;
  currentView: 'home' | 'shop' | 'product-detail' | 'checkout';
  setCurrentView: (view: 'home' | 'shop' | 'product-detail' | 'checkout') => void;
  selectedProductId: number | null;
  setSelectedProductId: (id: number | null) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('lumae_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [appliedCode, setAppliedCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [currentView, setCurrentViewState] = useState<'home' | 'shop' | 'product-detail' | 'checkout'>('home');
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

  const setCurrentView = (view: 'home' | 'shop' | 'product-detail' | 'checkout') => {
    setCurrentViewState(view);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  useEffect(() => {
    localStorage.setItem('lumae_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true); // Open the drawer whenever an item is added for nice instant feedback
  };

  const removeFromCart = (productId: number) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCode('');
    setDiscount(0);
  };

  const applyPromo = (code: string): boolean => {
    const sanitized = code.trim().toUpperCase();
    if (sanitized === 'GLOW20') {
      setDiscount(20);
      setAppliedCode('GLOW20');
      return true;
    }
    return false;
  };

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const cartTotal = subtotal * (1 - discount / 100);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        promoCode,
        setPromoCode,
        discount,
        appliedCode,
        applyPromo,
        cartTotal,
        cartCount,
        currentView,
        setCurrentView,
        selectedProductId,
        setSelectedProductId,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
