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
        <h1 className="text-3xl font-bold text-center text-black mb-8 mt-8">Keyboard Switches:</h1>
        <div className="flex">
          <div className="w-1/4">
            <ProductFilter
              products={switchesProducts}
              onFilterChange={setFilteredProducts}
              showTypeFilter={false}
              showSwitchesFilter={false}
            />
          </div>
          <div className="w-3/4">
            <ProductBrowse
              products={filteredProducts}
              productType="switches"
            />
          </div>
        </div>
      </Layout>


    )
}

export default switches_home;
