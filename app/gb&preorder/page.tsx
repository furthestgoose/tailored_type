'use client';

import type { NextPage } from 'next';
import {useEffect, useState} from 'react';
import Layout from "@/app/Components/Layout";
import ProductBrowse from "@/app/Components/productBrowse";
import { Product } from '@/app/mockProducts';

const SwitchesHome: NextPage = () => {
    const [groupBuyAndPreorderProducts, setGroupBuyAndPreorderProducts] = useState<Product[]>();
    
      useEffect(() => {
        const fetchKeyboardProducts = async () => {
          try {
            const response = await fetch('http://localhost:8080/api/products/groupbuys&preorders');
            if (!response.ok) {
              throw new Error('Failed to fetch products');
            }
            const data = await response.json();
            setGroupBuyAndPreorderProducts(data);
          } catch (error) {
            console.error('Error fetching products:', error);
          }
        };
    
        fetchKeyboardProducts();
      }, []);

    return (
        <Layout>
            <h1 className="text-3xl font-bold text-center text-black mb-8 mt-8">
                All Group Buys & Pre Orders:
            </h1>
            <ProductBrowse products={groupBuyAndPreorderProducts} />
        </Layout>
    );
};

export default SwitchesHome;