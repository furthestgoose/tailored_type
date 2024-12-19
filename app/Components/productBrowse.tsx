import React from 'react';
import { Product } from "@/app/mockProducts";
import ProductCard from '@/app/Components/Product_Card';

interface ProductBrowseProps {
  products: Product[] | undefined;
  productType?: string;
}

const ProductBrowse: React.FC<ProductBrowseProps> = ({ products, productType }) => {
  // Handle loading state
  if (!products) {
    return (
      <div className="text-center">
        <h1 className="text-black text-2xl">Loading products...</h1>
      </div>
    );
  }

  // Filter products by type if specified
  const availableProducts = products.filter(product =>
    (!productType || product.type === productType)
  );

  // Show all available products instead of random ones
  return (
    <div>
      {availableProducts.length > 0 ? (
        <div className="grid md:grid-cols-4 gap-5">
          {availableProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center">
          <h1 className="text-black text-2xl">No Products found :(</h1>
        </div>
      )}
    </div>
  );
};

export default ProductBrowse;