'use client';

import type { NextPage } from 'next';
import {useEffect, useState} from 'react';
import Layout from "@/app/Components/Layout";
import ProductBrowse from "@/app/Components/productBrowse";
import { Product } from '@/app/Productstype';
import ProductFilter from '@/app/Components/ProductFilter';

const SwitchesHome: NextPage = () => {
    const [accessoryProducts, setAccessoryProducts] = useState<Product[]>();
    const [filteredProducts, setFilteredProducts] = useState<Product[]>();
    
      useEffect(() => {
        const fetchAccessoryProducts = async () => {
          try {
            const response = await fetch('http://localhost:8080/api/products/accessories');
            if (!response.ok) {
              throw new Error('Failed to fetch products');
            }
            const data = await response.json();
            setAccessoryProducts(data);
            setFilteredProducts(data);
          } catch (error) {
            console.error('Error fetching products:', error);
          }
        };
    
        fetchAccessoryProducts();
      }, []);

    return (
        <Layout>
        <h1 className="text-3xl font-bold text-center text-black mb-8 mt-8">All Accessories:</h1>
        <div className="flex">
          <div className="w-1/4">
            <ProductFilter
              products={accessoryProducts}
              onFilterChange={setFilteredProducts}
              showTypeFilter={true}
              showSwitchesFilter={false}
            />
          </div>
          <div className="w-3/4">
            <ProductBrowse
              products={filteredProducts}
            />
          </div>
        </div>
      </Layout>
    );
};

export default SwitchesHome;