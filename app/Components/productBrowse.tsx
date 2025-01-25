import React from 'react';
import { Product } from "@/app/Productstype";
import ProductCard from '@/app/Components/Product_Card';

interface ProductBrowseProps {
  products: Product[] | undefined;
  productType?: string;
}

const ProductBrowse: React.FC<ProductBrowseProps> = ({ products, productType }) => {
  if (!products) {
    return (
      <div className="text-center py-10">
        <h1 className="text-lg md:text-2xl text-black">Loading products...</h1>
      </div>
    );
  }

  const availableProducts = products.filter(product => 
    !productType || product.type === productType
  );

  return (
    <div>
      {availableProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
          {availableProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <h1 className="text-lg md:text-2xl text-black">No Products found :(</h1>
        </div>
      )}
    </div>
  );
};

export default ProductBrowse;