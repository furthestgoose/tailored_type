'use client';

import type { NextPage } from 'next';
import Layout from "/Users/adambyford/Desktop/Portfolio_Projects/Web stuff/Websites/tailored_type/app/Components/Layout";
import Link from 'next/link';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { mockProducts, Product } from "@/app/mockProducts";
import Slideshow from "@/app/Components/Slideshow";

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const productLink = product.type === 'keyboard' ? `/keyboards/${product.id}` : `/products/${product.id}`;

  return (
    <div
      className="flex-shrink-0 w-64 bg-white p-4 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={productLink}>
        <div className="relative w-full h-48 mb-4 rounded overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            className="absolute w-full h-full object-cover transition-opacity duration-500 ease-in-out"
            style={{ opacity: isHovered ? 0 : 1 }}
            width={256}
            height={192}
          />
          <Image
            src={product.hoverImage}
            alt={`${product.name} (hover)`}
            className="absolute w-full h-full object-cover transition-opacity duration-500 ease-in-out"
            style={{ opacity: isHovered ? 1 : 0 }}
            width={256}
            height={192}
          />
        </div>
        <h3 className="text-lg font-semibold mb-2 text-black">{product.name}</h3>
      </Link>
      {!product.swappableOptions && (
        <>
          <p className="text-gray-600 text-lg">£{product.price.toFixed(2)} inc VAT</p>
          <p className="text-gray-500 text-sm">(£{(product.price - (product.price * 0.2)).toFixed(2)} ex VAT)</p>
        </>
      )}
      {product.swappableOptions && (
        <>
          <p className="text-gray-600 text-lg">From £{product.price.toFixed(2)} inc VAT</p>
          <p className="text-gray-500 text-sm">(From £{(product.price - (product.price * 0.2)).toFixed(2)} ex VAT)</p>
        </>
      )}
    </div>
  );
};

const ProductSection: React.FC<{ title: string; products: Product[] }> = ({ title, products }) => (
  <section className="w-full py-12 px-4 sm:px-6 lg:px-8">
    <h2 className="text-3xl font-semibold mb-8 text-center text-black">{title}</h2>
    <div className="relative">
      <div className="overflow-x-auto pb-4 hide-scrollbar">
        <div className="flex space-x-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  </section>
);

const Home: NextPage = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);
  const [groupBuys, setGroupBuys] = useState<Product[]>([]);
  const [preOrders, setPreOrders] = useState<Product[]>([]);

  useEffect(() => {
    // Simulate fetching products
    setFeaturedProducts(mockProducts.slice(0, 6));
    setRecentProducts(mockProducts.slice(6, 12));
    setGroupBuys(mockProducts.slice(12, 18));
    setPreOrders(mockProducts.slice(18, 24));
  }, []);

  return (
    <Layout>
      <section className="w-full h-[60vh] text-center bg-gradient-to-r from-green-700 to-gray-200">
        <Slideshow products={featuredProducts.slice(0, 6)} />
      </section>

      <section className="w-full text-center py-12 bg-gradient-to-r from-gray-100 to-gray-200">
        <h1 className="text-4xl font-bold mb-4 text-black">Tailored Type</h1>
        <p className="text-xl mb-8 text-black">Design and order your perfect mechanical keyboard.</p>
        <Link href="/customize" className="bg-black text-white py-3 px-6 rounded-full text-lg hover:bg-gray-800 transition-colors duration-300">
          Start Customizing
        </Link>
      </section>

      <ProductSection title="Featured Products" products={featuredProducts} />
      <ProductSection title="Recently Added" products={recentProducts} />
      <ProductSection title="Current Group Buys" products={groupBuys} />
      <ProductSection title="Current Pre-Orders" products={preOrders} />
    </Layout>
  );
};

export default Home;