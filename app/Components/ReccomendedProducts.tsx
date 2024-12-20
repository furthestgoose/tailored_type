'use client';

import React, { useEffect, useState } from 'react';
import { Product } from "@/app/Productstype";
import ProductCard from '@/app/Components/Product_Card';

interface RecommendedProductsProps {
  currentProductId: string;
}

const RecommendedProducts: React.FC<RecommendedProductsProps> = ({ currentProductId }) => {
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecommendedProducts = async () => {
      try {
        setIsLoading(true);
        // Fetch all products from your API
        const response = await fetch('http://localhost:8080/api/products');
        if (!response.ok) throw new Error('Failed to fetch recommended products');
        
        const data: Product[] = await response.json();
        
        // Filter out the current product and get random products
        const filteredProducts = data.filter(product => 
          product.id.toString() !== currentProductId
        );
        
        // Shuffle the filtered products
        const shuffled = [...filteredProducts].sort(() => 0.5 - Math.random());
        
        // Take the first 5 products
        const selected = shuffled.slice(0, 5);
        
        setRecommendedProducts(selected);
        setError(null);
      } catch (error) {
        console.error('Error fetching recommended products:', error);
        setError(error instanceof Error ? error.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommendedProducts();
  }, [currentProductId]);

  if (isLoading) {
    return (
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6 text-black">Recommended Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {[...Array(5)].map((_, index) => (
            <div 
              key={index}
              className="animate-pulse bg-gray-200 rounded-lg h-64"
            />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6 text-black">Recommended Products</h2>
        <p className="text-red-600">Failed to load recommended products</p>
      </div>
    );
  }

  if (recommendedProducts.length === 0) {
    return (
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6 text-black">Recommended Products</h2>
        <p className="text-gray-600">No recommended products available</p>
      </div>
    );
  }

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-6 text-black">Recommended Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {recommendedProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default RecommendedProducts;