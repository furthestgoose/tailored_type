'use client';
import type { NextPage } from 'next';
import {useState, useEffect} from 'react';
import Layout from "/Users/adambyford/Desktop/Portfolio_Projects/Web stuff/Websites/tailored_type/app/Components/Layout";
import ProductBrowse from "@/app/Components/productBrowse";
import { Product } from '@/app/Productstype';
import ProductFilter from '@/app/Components/ProductFilter';

const switches_home : NextPage = () => {
    const [switchesProducts, setSwitchesProducts] = useState<Product[]>();
    const [filteredProducts, setFilteredProducts] = useState<Product[]>();
    
      useEffect(() => {
        const fetchSwitchesProducts = async () => {
          try {
            const response = await fetch('http://localhost:8080/api/products/switches');
            if (!response.ok) {
              throw new Error('Failed to fetch products');
            }
            const data = await response.json();
            setSwitchesProducts(data);
            setFilteredProducts(data);
          } catch (error) {
            console.error('Error fetching products:', error);
          }
        };
    
        fetchSwitchesProducts();
      }, []);
    return (
      <Layout>
        <h1 className="text-2xl md:text-3xl font-bold text-center text-black mb-6 mt-6">
    Keyboard Switches
  </h1>
      <div className="container mx-auto">
  
  <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
    <div className="w-full lg:w-1/4 lg:pr-4 ">
      <ProductFilter
        products={switchesProducts}
        onFilterChange={setFilteredProducts}
        showTypeFilter={false}
        showSwitchesFilter={false}
      />
    </div>
    <div className="w-full lg:w-3/4">
      <ProductBrowse
        products={filteredProducts}
        productType="switches"
      />
    </div>
  </div>
</div>
    </Layout>


    )
}

export default switches_home;
