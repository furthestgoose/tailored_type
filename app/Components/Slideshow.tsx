import React, { useState, useEffect } from 'react';
import { Product } from "@/app/Productstype";
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Slideshow: React.FC<{ products: Product[] }> = ({ products }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval);
  }, [products.length]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
  };

  return (
    <div className="relative w-full h-[40vh] sm:h-[50vh] md:h-[60vh] overflow-hidden">
      {products.map((product, index) => (
        <div
          key={product.id}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-700 ${
            currentIndex === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <div className="relative w-full h-full">
            <Image
              src={product.image}
              alt={product.name}
              layout="fill"
              objectFit="cover"
              priority
            />
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
            <h3 className="text-sm sm:text-lg font-semibold">{product.name}</h3>
            {product.swappableOptionsJson 
              ? <p className="text-xs sm:text-lg">From £{product.price.toFixed(2)} inc VAT</p>
              : <p className="text-xs sm:text-lg">£{product.price.toFixed(2)} inc VAT</p>
            }
            <Link href={product.type === 'keyboard' ? `/products/keyboards/${product.id}` : `/products/${product.id}`}>
              <button className="mt-2 text-xs sm:text-base bg-white text-black py-1 px-2 sm:py-2 sm:px-4 rounded hover:bg-gray-200 transition-colors duration-300">
                Buy Now!
              </button>
            </Link>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 sm:p-2 rounded-full hover:bg-opacity-75 transition-all duration-300 z-50"
        aria-label="Previous slide"
      >
        <ChevronLeft className=' size={16} sm:size={24}' />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 sm:p-2 rounded-full hover:bg-opacity-75 transition-all duration-300 z-50"
        aria-label="Next slide"
      >
        <ChevronRight  className='size={16} sm:size={24}'/>
      </button>
    </div>
  );
};

export default Slideshow;