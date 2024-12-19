
import Link from 'next/link';
import Image from 'next/image';
import React, { useState } from 'react';
import { Product } from "@/app/mockProducts";
const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
    const [isHovered, setIsHovered] = useState(false);
    const productLink = product.type === 'keyboard' ? `/products/keyboards/${product.id}` : `/products/${product.id}`;

    return (
      <div
        className="flex-shrink-0 w-64 bg-white p-4 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Link href={productLink}>
          <div className="relative w-full h-48 mb-4 rounded overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              className="absolute w-full h-full object-cover transition-opacity duration-500 ease-in-out"
              style={{ opacity: isHovered ? 0 : 1 }}
              width={256}
              height={192}
            />
            <Image
              src={product.hoverImage}
              alt={`${product.name} (hover)`}
              className="absolute w-full h-full object-cover transition-opacity duration-500 ease-in-out"
              style={{ opacity: isHovered ? 1 : 0 }}
              width={256}
              height={192}
            />
          </div>
          <h3 className="text-lg font-semibold mb-2 text-black">{product.name}</h3>
        </Link>
        {!product.swappableOptions && (
          <>
            <p className="text-gray-600 text-lg">£{product.price.toFixed(2)} inc VAT</p>
            <p className="text-gray-500 text-sm">(£{(product.price - (product.price * 0.2)).toFixed(2)} ex VAT)</p>
          </>
        )}
        {product.swappableOptions && (
          <>
            <p className="text-gray-600 text-lg">From £{product.price.toFixed(2)} inc VAT</p>
            <p className="text-gray-500 text-sm">(From £{(product.price - (product.price * 0.2)).toFixed(2)} ex VAT)</p>
          </>
        )}
      </div>
    );
  };

export default ProductCard;