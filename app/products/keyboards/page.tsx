'use client';

import type { NextPage } from 'next';
import React, { useState, useEffect } from 'react';
import Layout from "@/app/Components/Layout";
import ProductBrowse from "@/app/Components/productBrowse";
import ProductFilter from "@/app/Components/ProductFilter";
import type { Product } from '@/app/Productstype';

const Products_home: NextPage = () => {
  const [keyboardProducts, setKeyboardProducts] = useState<Product[]>();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>();

  useEffect(() => {
    const fetchKeyboardProducts = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/products/keyboards');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setKeyboardProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchKeyboardProducts();
  }, []);

  return (
    <Layout>
      <h1 className="text-3xl font-bold text-center text-black mb-8 mt-8">Keyboard Products:</h1>
      <div className="flex">
        <div className="w-1/4">
          <ProductFilter
            products={keyboardProducts}
            onFilterChange={setFilteredProducts}
            showTypeFilter={false}
            showSwitchesFilter={true}
          />
        </div>
        <div className="w-3/4">
          <ProductBrowse
            products={filteredProducts}
            productType="keyboard"
          />
        </div>
      </div>
    </Layout>
  );
};

export default Products_home;