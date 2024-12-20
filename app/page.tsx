'use client';
import type { NextPage } from 'next';
import Layout from "/Users/adambyford/Desktop/Portfolio_Projects/Web stuff/Websites/tailored_type/app/Components/Layout";
import React, { useState, useEffect } from 'react';
import { Product } from "@/app/Productstype";
import Slideshow from "@/app/Components/Slideshow";
import ProductCard from "@/app/Components/Product_Card";

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
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);
  const [groupBuys, setGroupBuys] = useState<Product[]>([]);
  const [preOrders, setPreOrders] = useState<Product[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchFeaturedProducts = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/products/featured');
                if (!response.ok) {
                    throw new Error('Failed to fetch featured products');
                }
                const data = await response.json();
                setFeaturedProducts(data);
            } catch (error) {
                console.error(error);
            }
        };

        const fetchRecentProducts = async () => {
            try{
                const response = await fetch('http://localhost:8080/api/products/recent');
                if (!response.ok){
                    throw new Error('Failed to fetch recent products');
                }
                const data = await response.json();
                setRecentProducts(data);
            } catch (error){
                console.error(error);
            }
        }
        const fetchGroupBuys = async () => {
            try{
                const response = await fetch('http://localhost:8080/api/products/groupbuys');
                if (!response.ok){
                    throw new Error('Failed to fetch group buys');
                }
                const data = await response.json();
                setGroupBuys(data);
            }catch (error){
                console.error(error);
            }
        }
        const fetchPreOrders = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/products/preorders');
                if(!response.ok){
                    throw new Error('Failed to fetch pre orders');
                }
                const data = await response.json();
                setPreOrders(data);
            } catch (error){
                console.error(error);
            }
        }

        fetchGroupBuys()
        fetchRecentProducts()
        fetchFeaturedProducts()
        fetchPreOrders()
    }, []);


  return (
    <Layout>
      <section className="w-full h-[60vh] text-center bg-gradient-to-r from-green-700 to-gray-200">
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