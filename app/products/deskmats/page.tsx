'use client';
import type { NextPage } from 'next';
import {useState, useEffect} from 'react';
import Layout from "/Users/adambyford/Desktop/Portfolio_Projects/Web stuff/Websites/tailored_type/app/Components/Layout";
import ProductBrowse from "@/app/Components/productBrowse";
import { Product } from '@/app/mockProducts';

const switches_home : NextPage = () => {
    const [deskmatProducts, setDeskMatProducts] = useState<Product[]>();
    
      useEffect(() => {
        const fetchDeskMatProducts = async () => {
          try {
            const response = await fetch('http://localhost:8080/api/products/deskmat');
            if (!response.ok) {
              throw new Error('Failed to fetch products');
            }
            const data = await response.json();
            setDeskMatProducts(data);
          } catch (error) {
            console.error('Error fetching products:', error);
          }
        };
    
        fetchDeskMatProducts();
      }, []);
    return (
        <Layout>
                <h1 className="text-3xl font-bold text-center text-black mb-8 mt-8">All Deskmats:</h1>
            <ProductBrowse products={deskmatProducts} productType={"deskmat"}/>
        </Layout>


    )
}

export default switches_home;
