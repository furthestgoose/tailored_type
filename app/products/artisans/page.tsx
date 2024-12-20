'use client';
import type { NextPage } from 'next';
import {useEffect, useState} from 'react';
import Layout from "/Users/adambyford/Desktop/Portfolio_Projects/Web stuff/Websites/tailored_type/app/Components/Layout";
import ProductBrowse from "@/app/Components/productBrowse";
import { Product } from '@/app/Productstype';

const switches_home : NextPage = () => {
    const [artisanProducts, setArtisanProducts] = useState<Product[]>();
    
      useEffect(() => {
        const fetchArtisanProducts = async () => {
          try {
            const response = await fetch('http://localhost:8080/api/products/artisans');
            if (!response.ok) {
              throw new Error('Failed to fetch products');
            }
            const data = await response.json();
            setArtisanProducts(data);
          } catch (error) {
            console.error('Error fetching products:', error);
          }
        };
    
        fetchArtisanProducts();
      }, []);
    return (
        <Layout>
                <h1 className="text-3xl font-bold text-center text-black mb-8 mt-8">All Artisans:</h1>
            <ProductBrowse products={artisanProducts} productType={"artisan"}/>
        </Layout>


    )
}

export default switches_home;
