'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Layout from '@/app/Components/Layout';
import Image from 'next/image';
import RecommendedProducts from '@/app/Components/ReccomendedProducts';
import { useCart } from '@/app/contexts/cartcontext';
import { Product, SwappableOption, SwappableOptions } from '@/app/Productstype';


export default function KeyboardPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [parsedSwappableOptions, setParsedSwappableOptions] = useState<SwappableOptions | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: SwappableOption }>({});
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchKeyboard = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`http://localhost:8080/api/products/keyboards/${id}`);
        if (!response.ok) throw new Error('Failed to fetch keyboard product');
        
        const data: Product[] = await response.json();
        if (!data.length) throw new Error('No keyboard found');
        
        const productData = data[0];
        
        // Ensure swappableOptionsJson is properly parsed if it's a string
        let parsedOptions: SwappableOptions;
        if (typeof productData.swappableOptionsJson === 'string') {
          parsedOptions = JSON.parse(productData.swappableOptionsJson);
        } else {
          parsedOptions = productData.swappableOptionsJson;
        }
        
        // Initialize selected options with the first option from each category
        const initialSelectedOptions: { [key: string]: SwappableOption } = {};
        Object.entries(parsedOptions).forEach(([category, options]) => {
          if (Array.isArray(options) && options.length > 0) {
            initialSelectedOptions[category] = options[0];
          }
        });
  
        setProduct(productData);
        setSelectedImage(productData.image);
        setParsedSwappableOptions(parsedOptions);
        setSelectedOptions(initialSelectedOptions);
        setTotalPrice(productData.price);
        setError(null);
      } catch (error) {
        console.error('Error fetching keyboard:', error);
        setError(error instanceof Error ? error.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchKeyboard();
  }, [id]);

  useEffect(() => {
    if (product) {
      let newTotalPrice = product.price;
      Object.values(selectedOptions).forEach(option => {
        newTotalPrice += option.price;
      });
      setTotalPrice(newTotalPrice);
    }
  }, [product, selectedOptions]);

  const handleOptionChange = (category: string, option: SwappableOption) => {
    setSelectedOptions(prev => ({
      ...prev,
      [category]: option,
    }));
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, 1, selectedOptions);
    }
  };

  if (isLoading) return (
    <Layout>
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-gray-700">Loading...</div>
      </div>
    </Layout>
  );

  if (error) return (
    <Layout>
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    </Layout>
  );

  if (!product) return (
    <Layout>
      <div className="text-center text-gray-700 text-xl py-16">Keyboard not found</div>
    </Layout>
  );

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image Section */}
          <div>
            <div className="mb-6">
              <Image
                src={selectedImage}
                alt={product.name}
                width={600}
                height={400}
                className="w-full h-auto object-cover rounded-lg shadow-md"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images?.length > 0 ? (
                product.images.map((img, index) => (
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
                ))
              ) : (
                <p className="text-gray-500">No additional images available</p>
              )}
            </div>
          </div>

          {/* Product Details Section */}
          <div>
            <h1 className="text-4xl font-bold mb-4 text-gray-900">{product.name}</h1>
            <p className="text-2xl font-semibold text-gray-800 mb-6">
              £{totalPrice.toFixed(2)} <span className="text-lg text-gray-500">inc VAT</span>
            </p>

            <div className="space-y-6">
              {parsedSwappableOptions && Object.entries(parsedSwappableOptions).map(([category, options]) => {
                // Ensure options is an array before mapping
                if (!Array.isArray(options)) {
                  console.error(`Options for category ${category} is not an array:`, options);
                  return null;
                }

                return (
                  <div key={category}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {category}
                    </label>
                    <select
                      className="w-full px-3 py-2 text-black bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                      value={selectedOptions[category]?.name || ''}
                      onChange={(e) => {
                        const selectedOption = options.find(opt => opt.name === e.target.value);
                        if (selectedOption) {
                          handleOptionChange(category, selectedOption);
                        }
                      }}
                    >
                      {options.map((option) => (
                        <option key={option.name} value={option.name}>
                          {option.name} (+£{option.price.toFixed(2)})
                        </option>
                      ))}
                    </select>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 space-y-4">
              <p className="text-gray-700">{product.description}</p>
              
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                <div>
                  <span className="font-medium">Layout:</span> {product.layout}
                </div>
                <div>
                  <span className="font-medium">Hot-swappable:</span> {product.hotswappable}
                </div>
                <div>
                  <span className="font-medium">HE:</span> {product.he}
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full bg-black text-white py-3 px-6 rounded-lg font-semibold shadow-lg hover:bg-gray-800 transition duration-300"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <RecommendedProducts currentProductId={id}/>
        </div>
      </div>
    </Layout>
  );
}