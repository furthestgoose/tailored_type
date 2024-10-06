'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Layout from '@/app/Components/Layout';
import { mockProducts, Product, SwappableOption } from '@/app/mockProducts';
import Image from 'next/image';

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [selectedOptions, setSelectedOptions] = useState<{[key: string]: SwappableOption}>({});
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    const foundProduct = mockProducts.find(p => p.id.toString() === id);
    if (foundProduct) {
      if (foundProduct.type === 'keyboard') {
        // Redirect to custom keyboard page if the product is a keyboard
        router.push(`/keyboards/${id}`);
      } else {
        // Handle non-keyboard products
        setProduct(foundProduct);
        setSelectedImage(foundProduct.images[0]);
        setTotalPrice(foundProduct.price);

        // Initialize selected options with the first option of each category
        if (foundProduct.swappableOptions) {
          const initialOptions: {[key: string]: SwappableOption} = {};
          Object.entries(foundProduct.swappableOptions).forEach(([category, options]) => {
            if (options.length > 0) {
              initialOptions[category] = options[0];
            }
          });
          setSelectedOptions(initialOptions);
        }
      }
    }
  }, [id, router]);

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
      [category]: option
    }));
  };

  if (!product) {
    return <Layout><div className="text-center text-gray-700 text-xl py-16">Product not found</div></Layout>;
  }

  // Product information section based on product type
  const renderProductInfo = () => {
    switch (product.type) {
      case 'switches':
        return (
          <div className="bg-gray-100 p-4 rounded-lg shadow-md mt-6 text-black">
            <h2 className="text-2xl font-semibold mb-2">Switch Specifications</h2>
            <ul className="list-disc ml-6">
              <li>Type: {product.name}</li>
              <li>Actuation Force: 50g</li>
              <li>Durability: 50 million keystrokes</li>
            </ul>
          </div>
        );
      case 'keycaps':
        return (
          <div className="bg-gray-100 p-4 rounded-lg shadow-md mt-6">
            <h2 className="text-2xl font-semibold mb-2">Keycap Specifications</h2>
            <ul className="list-disc ml-6">
              <li>Material: {product.keycapsMaterial || 'PBT'}</li>
              <li>Profile: Cherry</li>
              <li>Compatibility: MX Stem</li>
            </ul>
          </div>
        );
      case 'case':
        return (
          <div className="bg-gray-100 p-4 rounded-lg shadow-md mt-6">
            <h2 className="text-2xl font-semibold mb-2">Case Specifications</h2>
            <ul className="list-disc ml-6">
              <li>Material: {product.caseMaterial || 'Wood'}</li>
              <li>Form Factor: 60%</li>
            </ul>
          </div>
        );
      default:
        return null;
    }
  };

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
              {product.images.map((img, index) => (
                <div
                  key={index}
                  className={`cursor-pointer border-2 rounded-md transition-all duration-200 hover:border-gray-600 ${img === selectedImage ? 'border-black' : 'border-transparent'}`}
                  onClick={() => setSelectedImage(img)}
                >
                  <Image
                    src={img}
                    alt={`${product.name} view ${index + 1}`}
                    width={150}
                    height={150}
                    className="w-full h-auto object-cover rounded-md"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Details Section */}
          <div>
            <h1 className="text-4xl font-bold mb-4 text-gray-900">{product.name}</h1>
            <p className="text-2xl font-semibold text-gray-800 mb-2">£{totalPrice.toFixed(2)} <span className="text-lg text-gray-500">inc VAT</span></p>
            <p className="text-gray-700 mb-6">{product.description}</p>

            {product.swappableOptions && Object.entries(product.swappableOptions).map(([category, options]) => (
              <div key={category} className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">{category}</label>
                <select
                  className="text-black bg-grey-700 mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-black focus:border-black sm:text-sm rounded-md"
                  value={selectedOptions[category]?.name || ''}
                  onChange={(e) => handleOptionChange(category, options.find(opt => opt.name === e.target.value) || options[0])}
                >
                  {options.map((option) => (
                    <option key={option.name} value={option.name}>
                      {option.name} (+£{option.price.toFixed(2)})
                    </option>
                  ))}
                </select>
              </div>
            ))}

            {/* Render product information based on the type */}
            {renderProductInfo()}

            <button className="bg-black text-white py-3 px-6 mt-8 rounded-lg font-semibold shadow-lg hover:bg-gray-800 transition duration-300">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}