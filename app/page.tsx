'use client';
import type { NextPage } from 'next';
import Layout from "/Users/adambyford/Desktop/Portfolio_Projects/Web stuff/Websites/tailored_type/app/Components/Layout";
import React, { useState, useEffect } from 'react';
import { Product } from "@/app/Productstype";
import Slideshow from "@/app/Components/Slideshow";
import ProductCard from "@/app/Components/Product_Card";

const ProductSection: React.FC<{ title: string; products: Product[] }> = ({ title, products }) => (
  <section className="w-full py-8 px-4 sm:px-6 lg:px-8">
    <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-center text-black">{title}</h2>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  </section>
);

const Home: NextPage = () => {
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);
  const [groupBuys, setGroupBuys] = useState<Product[]>([]);
  const [preOrders, setPreOrders] = useState<Product[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [recentResponse, groupBuysResponse, preOrdersResponse, featuredResponse] = await Promise.all([
          fetch('http://localhost:8080/api/products/recent'),
          fetch('http://localhost:8080/api/products/groupbuys'),
          fetch('http://localhost:8080/api/products/preorders'),
          fetch('http://localhost:8080/api/products/featured')
        ]);
        if (!recentResponse.ok || !groupBuysResponse.ok || !preOrdersResponse.ok || !featuredResponse.ok) {
          throw new Error('Failed to fetch product data');
        }
        const [recentData, groupBuysData, preOrdersData, featuredData] = await Promise.all([
          recentResponse.json(),
          groupBuysResponse.json(),
          preOrdersResponse.json(),
          featuredResponse.json()
        ]);
        setRecentProducts(recentData);
        setGroupBuys(groupBuysData);
        setPreOrders(preOrdersData);
        setFeaturedProducts(featuredData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <Layout>
      <section className="w-full h-[40vh] sm:h-[50vh] md:h-[60vh] text-center bg-gradient-to-r from-green-700 to-gray-200">
        <Slideshow products={featuredProducts.slice(0, 6)} />
      </section>
      <ProductSection title="Featured Products" products={featuredProducts} />
      <ProductSection title="Recently Added" products={recentProducts} />
      <ProductSection title="Open Group Buys" products={groupBuys} />
      <ProductSection title="Open Pre-Orders" products={preOrders} />
    </Layout>
  );
};

export default Home;