import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from "@/app/Productstype";

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const productLink = product.type === 'keyboard' ? 
    `/products/keyboards/${product.id}` : 
    `/products/${product.id}`;

  return (
    <div 
      className="relative flex flex-col w-full h-full bg-white p-3 rounded-lg shadow-md 
                 transition-all duration-300 hover:shadow-xl 
                 transform hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={productLink} className="block">
        <div className="relative w-full aspect-square mb-3 rounded overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-opacity duration-500"
            style={{ opacity: isHovered ? 0 : 1 }}
          />
          <Image
            src={product.hoverImage}
            alt={`${product.name} (hover)`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-opacity duration-500"
            style={{ opacity: isHovered ? 1 : 0 }}
          />
        </div>
        <h3 className="text-base md:text-lg font-semibold mb-2 text-black line-clamp-2">
          {product.name}
        </h3>
      </Link>
      <div className="mt-auto">
        <p className="text-sm md:text-base text-gray-600">
          £{product.price.toFixed(2)} inc VAT
        </p>
        <p className="text-xs md:text-sm text-gray-500">
          (£{(product.price * 0.8).toFixed(2)} ex VAT)
        </p>
      </div>
    </div>
  );
};

export default ProductCard;