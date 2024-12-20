'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Layout from '@/app/Components/Layout';
import Image from 'next/image';
import { useCart } from '@/app/contexts/cartcontext';
import RecommendedProducts from '@/app/Components/ReccomendedProducts';
import { Product, SwappableOption, SwappableOptions } from '@/app/Productstype';

export default function ProductPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const quantity: number = 1;
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`http://localhost:8080/api/products/${id}`);
        if (!response.ok) throw new Error('Failed to fetch product');
        
        const data: Product[] = await response.json();
        if (!data.length) throw new Error('No product found');
        
        const productData = data[0];
        console.log('Product data:', productData);
        
        setProduct(productData);
        setSelectedImage(productData.image || productData.images?.[0] || '');
        setError(null);
      } catch (error) {
        console.error('Error fetching product:', error);
        setError(error instanceof Error ? error.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  



  const renderProductInfo = () => {
    if (!product) return null;

    switch (product.type) {
      case 'switches':
        return (
          <div className="bg-gray-100 p-4 rounded-lg shadow-md mt-6 text-black">
            <h2 className="text-2xl font-semibold mb-2">Switch Specifications</h2>
            <ul className="list-disc ml-6">
              <li>Type: {product.name}</li>
              {product.switches && product.switches.length > 0 && (
                <>
                  
                  <li>Durability: 50 million keystrokes</li>
                </>
              )}
              <li>Price: £{product.price}</li>
            </ul>
          </div>
        );

      case 'keycaps':
        return (
          <div className="bg-gray-100 p-4 rounded-lg shadow-md mt-6 text-black">
            <h2 className="text-2xl font-semibold mb-2">Keycap Specifications</h2>
            <ul className="list-disc ml-6">
              <li>Material: {product.keycapsMaterial || 'PBT'}</li>
              <li>Profile: Cherry</li>
              <li>Compatibility: MX Stem</li>
              <li>Price: £{product.price}</li>
            </ul>
          </div>
        );

      case 'case':
        return (
          <div className="bg-gray-100 p-4 rounded-lg shadow-md mt-6 text-black">
            <h2 className="text-2xl font-semibold mb-2">Case Specifications</h2>
            <ul className="list-disc ml-6">
              <li>Material: {product.caseMaterial || 'Aluminum'}</li>
              <li>Form Factor: {product.layout || '60%'}</li>
              <li>Price: £{product.price}</li>
            </ul>
          </div>
        );

      default:
        return (
          <div className="bg-gray-100 p-4 rounded-lg shadow-md mt-6 text-black">
            <h2 className="text-2xl font-semibold mb-2">Product Specifications</h2>
            <ul className="list-disc ml-6">
              <li>Price: £{product.price}</li>
            </ul>
          </div>
        );
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-xl text-gray-700">Loading...</div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-xl text-red-600">{error}</div>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="text-center text-gray-700 text-xl py-16">Product not found</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image Section */}
          <div>
            <div className="mb-6">
              {selectedImage ? (
                <Image
                  src={selectedImage}
                  alt={product.name}
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover rounded-lg shadow-md"
                />
              ) : (
                <div className="w-full h-96 bg-gray-200 flex items-center justify-center rounded-lg shadow-md">
                  <span className="text-gray-500">No Image Available</span>
                </div>
              )}
            </div>
            {product.images && product.images.length > 0 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    className={`cursor-pointer border-2 rounded-md transition-all duration-200 hover:border-gray-600 ${
                      img === selectedImage ? 'border-black' : 'border-transparent'
                    }`}
                    onClick={() => setSelectedImage(img)}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} view ${index + 1}`}
                      width={150}
                      height={150}
                      className="w-full h-auto object-cover rounded-md"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details Section */}
          <div>
            <h1 className="text-4xl font-bold mb-4 text-gray-900">{product.name}</h1>
            <p className="text-2xl font-semibold text-gray-800 mb-6">
              £{product.price} <span className="text-lg text-gray-500">inc VAT</span>
            </p>

            {renderProductInfo()}

            <div className="mt-8 space-y-4">
              <p className="text-gray-700">{product.description}</p>

              <button
                onClick={() => addToCart(product, quantity, {})}
                className="w-full bg-black text-white py-3 px-6 rounded-lg font-semibold shadow-lg hover:bg-gray-800 transition duration-300"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <RecommendedProducts currentProductId={id} />
        </div>
      </div>
    </Layout>
  );
}