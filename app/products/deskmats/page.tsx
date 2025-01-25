'use client';
import type { NextPage } from 'next';
import {useState, useEffect} from 'react';
import Layout from "/Users/adambyford/Desktop/Portfolio_Projects/Web stuff/Websites/tailored_type/app/Components/Layout";
import ProductBrowse from "@/app/Components/productBrowse";
import { Product } from '@/app/Productstype';
import ProductFilter from '@/app/Components/ProductFilter';

const switches_home : NextPage = () => {
    const [deskmatProducts, setDeskMatProducts] = useState<Product[]>();
    const [filteredProducts, setFilteredProducts] = useState<Product[]>();
    
      useEffect(() => {
        const fetchDeskMatProducts = async () => {
          try {
            const response = await fetch('http://localhost:8080/api/products/deskmat');
            if (!response.ok) {
              throw new Error('Failed to fetch products');
            }
            const data = await response.json();
            setDeskMatProducts(data);
            setFilteredProducts(data);
          } catch (error) {
            console.error('Error fetching products:', error);
          }
        };
    
        fetchDeskMatProducts();
      }, []);
    return (
        <Layout>
        <h1 className="text-3xl font-bold text-center text-black mb-8 mt-8">Deskmats:</h1>
        <div className="flex">
          <div className="w-1/4">
            <ProductFilter
              products={deskmatProducts}
              onFilterChange={setFilteredProducts}
              showTypeFilter={false}
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


    )
}

export default switches_home;
