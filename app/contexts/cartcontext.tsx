'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Product, SwappableOption } from '../Productstype';

interface CartItem extends Product {
  quantity: number;
  selectedOptions?: { [key: string]: SwappableOption };
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity: number, selectedOptions?: { [key: string]: SwappableOption }) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  cookieConsent: boolean;
  setCookieConsent: (consent: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_COOKIE_NAME = 'keyboard_store_cart';
const COOKIE_CONSENT_NAME = 'keyboard_store_cookie_consent';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [cookieConsent, setCookieConsent] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const consentCookie = Cookies.get(COOKIE_CONSENT_NAME);
    if (consentCookie === 'true') {
      setCookieConsent(true);
      const savedCart = Cookies.get(CART_COOKIE_NAME);
      if (savedCart) {
        try {
          setItems(JSON.parse(savedCart));
        } catch (error) {
          console.error('Failed to parse cart data from cookie:', error);
        }
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (cookieConsent && isLoaded) {
      Cookies.set(CART_COOKIE_NAME, JSON.stringify(items), { expires: 7 }); // Expires in 7 days
      Cookies.set(COOKIE_CONSENT_NAME, 'true', { expires: 365 }); // Consent lasts for a year
    }
  }, [items, cookieConsent, isLoaded]);

  const addToCart = (product: Product, quantity: number, selectedOptions?: { [key: string]: SwappableOption }) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity, selectedOptions }
            : item
        );
      }
      return [...prevItems, { ...product, quantity, selectedOptions }];
    });
  };

  const removeFromCart = (productId: number) => {
    setItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setItems([]);
    if (cookieConsent) {
      Cookies.remove(CART_COOKIE_NAME);
    }
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => {
    const itemTotal = item.price * item.quantity;
    const optionsTotal = item.selectedOptions
      ? Object.values(item.selectedOptions).reduce((optSum, opt) => optSum + opt.price, 0) * item.quantity
      : 0;
    return sum + itemTotal + optionsTotal;
  }, 0);

  const setUserCookieConsent = (consent: boolean) => {
    setCookieConsent(consent);
    if (consent) {
      Cookies.set(COOKIE_CONSENT_NAME, 'true', { expires: 365 });
    } else {
      Cookies.remove(CART_COOKIE_NAME);
      Cookies.remove(COOKIE_CONSENT_NAME);
      setItems([]);
    }
  };

  if (!isLoaded) {
    return null;
  }

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      clearCart,
      totalItems,
      totalPrice,
      cookieConsent,
      setCookieConsent: setUserCookieConsent
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};