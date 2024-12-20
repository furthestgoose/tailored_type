'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import Layout from "../Components/Layout";
import { useCart } from '@/app/contexts/cartcontext';
import Image from 'next/image';

// Define types for better type safety
interface SelectedOption {
  name: string;
  price: number;
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  selectedOptions?: Record<string, SelectedOption>;
  cartItemId?: string;
}

const CartPage: React.FC = () => {
  const { items, removeFromCart, clearCart, totalPrice } = useCart();

  const getCartItemId = (item: CartItem): string => {
    if (!item.selectedOptions) {
      return item.id.toString();
    }
    const optionsString = Object.entries(item.selectedOptions)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, value]) => `${key}:${value.name}`)
      .join('|');
    return `${item.id}-${optionsString}`;
  };

  // State to track removal quantities
  const [removalQuantities, setRemovalQuantities] = useState<Record<string, number>>({});

  const handleQuantityChange = (uniqueId: string, quantity: number) => {
    setRemovalQuantities((prev) => ({
      ...prev,
      [uniqueId]: quantity,
    }));
  };

  const cartItems = items.map(item => ({
    ...item,
    uniqueId: getCartItemId(item),
  }));

  if (cartItems.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-4 text-black">Your Cart</h1>
          <p className="text-gray-600">Your cart is empty.</p>
          <Link href="/" className="text-blue-500 hover:text-blue-700 mt-4 inline-block">
            Continue Shopping
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 text-black">
        <h1 className="text-2xl font-bold mb-4 text-black">Your Cart</h1>
        <div className="space-y-4">
          {cartItems.map((item) => {
            const itemTotal = (
              (item.price +
                (item.selectedOptions
                  ? Object.values(item.selectedOptions).reduce((sum, opt) => sum + opt.price, 0)
                  : 0)) *
              item.quantity
            ).toFixed(2);

            return (
              <div
                key={item.uniqueId}
                className="flex items-center justify-between border p-4 rounded-lg"
              >
                <div className="flex-shrink-0">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-gray-200 flex items-center justify-center rounded-lg">
                      <span className="text-gray-500">No Image</span>
                    </div>
                  )}
                </div>
                <div className="flex-1 px-4">
                  <a href={`/products/${item.id}`}>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-gray-600">
                      £{itemTotal} (Quantity: {item.quantity})
                    </p>
                    {item.selectedOptions && Object.entries(item.selectedOptions).length > 0 && (
                      <p className="text-sm text-gray-500 mt-1">
                        Options:{' '}
                        {Object.entries(item.selectedOptions)
                          .map(([key, value]) => `${key}: ${value.name}`)
                          .join(', ')}
                      </p>
                    )}
                  </a>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    min="1"
                    max={item.quantity}
                    value={removalQuantities[item.uniqueId] || 1}
                    onChange={(e) =>
                      handleQuantityChange(item.uniqueId, Math.min(item.quantity, Number(e.target.value)))
                    }
                    className="w-16 px-2 py-1 border rounded-md text-gray-700"
                  />
                  <button
                    onClick={() => removeFromCart(item.id, item.selectedOptions, removalQuantities[item.uniqueId] || 1)}
                    className="ml-4 text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-8 space-y-4 text-white">
          <button
            onClick={clearCart}
            className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
          >
            Clear Cart
          </button>
          <div className="text-xl font-bold">Total: £{totalPrice.toFixed(2)}</div>
          <Link
            href="/checkout"
            className="bg-blue-500 text-white px-6 py-3 rounded block text-center hover:bg-blue-600"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
