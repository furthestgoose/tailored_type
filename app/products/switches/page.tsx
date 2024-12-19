'use client';
import type { NextPage } from 'next';
import {useState, useEffect} from 'react';
import Layout from "/Users/adambyford/Desktop/Portfolio_Projects/Web stuff/Websites/tailored_type/app/Components/Layout";
import ProductBrowse from "@/app/Components/productBrowse";
import { Product } from '@/app/mockProducts';

const switches_home : NextPage = () => {
    const [switchesProducts, setSwitchesProducts] = useState<Product[]>();
    
      useEffect(() => {
        const fetchSwitchesProducts = async () => {
          try {
            const response = await fetch('http://localhost:8080/api/products/switches');
            if (!response.ok) {
              throw new Error('Failed to fetch products');
            }
            const data = await response.json();
            setSwitchesProducts(data);
          } catch (error) {
            console.error('Error fetching products:', error);
          }
        };
    
        fetchSwitchesProducts();
      }, []);
    return (
        <Layout>
                <h1 className="text-3xl font-bold text-center text-black mb-8 mt-8">All Switches:</h1>
            <ProductBrowse products={switchesProducts} productType={"switches"}/>
        </Layout>


    )
}

export default switches_home;
