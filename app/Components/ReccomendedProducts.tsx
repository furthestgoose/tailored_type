import React from 'react';
import { Product } from "@/app/mockProducts";
import ProductCard from '@/app/Components/Product_Card';

interface RecommendedProductsProps {
  currentProductId: string;
  products: Product[];
}

const RecommendedProducts: React.FC<RecommendedProductsProps> = ({ currentProductId, products }) => {
  // Filter out the current product
  const availableProducts = products.filter(product => product.id.toString() !== currentProductId);

  // Shuffle the available products
  const shuffled = availableProducts.sort(() => 0.5 - Math.random());

  // Select up to 4 products
  const recommendedProducts = shuffled.slice(0, 5);

  return (
    <div className="mt-16 text-black">
      <h2 className="text-2xl font-bold mb-6">Recommended Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {recommendedProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default RecommendedProducts;