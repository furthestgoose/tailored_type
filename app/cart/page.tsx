'use client';
import Link from 'next/link';
import React from 'react';
import Layout from "../Components/Layout";
import { useCart } from '@/app/contexts/cartcontext';
import Image from 'next/image';

const CartPage: React.FC = () => {
  const { items, removeFromCart, clearCart, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 text-black">
          <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
          <p>Your cart is empty.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 text-black">
        <h1 className="text-black text-3xl font-bold mb-8">Your Cart</h1>
        {items.map((item) => (
          <div key={item.id} className="flex items-center border-b py-4">
            <Link href={item.type === 'keyboard' ? `/products/keyboards/${item.id}` : `/products/${item.id}`}>
              <Image src={item.image} alt={item.name} width={80} height={80} className="mr-4" />
            </Link>
            <div className="flex-grow">
              <Link href={item.type === 'keyboard' ? `/products/keyboards/${item.id}` : `/products/${item.id}`}>
                <h2 className="text-xl font-semibold">{item.name}</h2>
              </Link>
              <p className="text-gray-600">
                £{(item.price + (item.selectedOptions ? Object.values(item.selectedOptions).reduce((sum, opt) => sum + opt.price, 0) : 0)).toFixed(2)}
              </p>
              {item.selectedOptions && (
                <p className="text-sm text-gray-500">
                  Options: {Object.entries(item.selectedOptions).map(([key, value]) => `${key}: ${value.name}`).join(', ')}
                </p>
              )}
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              className="ml-4 text-red-500 hover:text-red-700"
            >
              Remove
            </button>
          </div>
        ))}
        <div className="mt-8 flex justify-between items-center">
          <button
            onClick={clearCart}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Clear Cart
          </button>
          <div className="text-xl font-semibold">
            Total: £{totalPrice.toFixed(2)}
          </div>
        </div>
        <Link href="/checkout">
          <button className="mt-4 w-full bg-black text-white py-3 rounded-lg font-semibold shadow-lg hover:bg-gray-800 transition duration-300">
            Proceed to Checkout
          </button>
        </Link>
      </div>
    </Layout>
  );
};

export default CartPage;