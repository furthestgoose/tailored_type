import React, { useState, useEffect } from 'react';
import type { Product } from '@/app/Productstype';

interface FilterOptions {
  layout?: string;
  priceRange: [number, number];
  type?: string;
  hotswappable?: boolean;
  HE?: boolean;
}

type FilterKey = keyof FilterOptions;

interface ProductFilterProps {
  products: Product[] | undefined;
  onFilterChange: (filteredProducts: Product[]) => void;
  showTypeFilter: boolean;
  showSwitchesFilter: boolean;
}

const ProductFilter: React.FC<ProductFilterProps> = ({ products, onFilterChange, showTypeFilter , showSwitchesFilter}) => {
  const [filters, setFilters] = useState<FilterOptions>({
    priceRange: [0, 1000],
    hotswappable: false,
    HE: false
  });

  const applyFilters = () => {
    if (!products) return;

    const filteredProducts = products.filter(product => {
      if (filters.layout && product.layout !== filters.layout) return false;
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) return false;
      if (filters.type && product.type !== filters.type) return false;
      if (filters.hotswappable && product.hotswappable !== 'Yes') return false;
      if (filters.HE && product.he !== 'Yes') return false;
      return true;
    });
    onFilterChange(filteredProducts);
  };

  const handleFilterChange = (key: FilterKey, value: FilterOptions[FilterKey]) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    applyFilters();
  }, [filters, products]);

  const uniqueLayouts = products ? Array.from(new Set(products.map(p => p.layout).filter(Boolean))) : [];
  const uniqueTypes = products ? Array.from(new Set(products.map(p => p.type))) : [];

  if (!products) {
    return <div className="p-4 bg-white rounded-lg">Loading filters...</div>;
  }

  return (
    <div className="space-y-4 p-4 bg-white rounded-lg overflow-x-auto mr-2">
      <h2 className="text-xl font-bold text-black">Filters</h2>
      {showSwitchesFilter && (
      <div>
        <label className="block text-xl font-medium text-black">Layout</label>
        <select
          className="mt-1 block w-auto pl-3 pr-10 py-2 text-base text-black border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          onChange={(e) => handleFilterChange('layout', e.target.value)}
          value={filters.layout || ''}
        >
          <option value="">Any</option>
          {uniqueLayouts.map(layout => (
            <option key={layout} value={layout}>{layout}</option>
          ))}
        </select>
      </div>
        )}
      <div className="flex items-center space-x-2">
        <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
          <span className="text-black px-2">£</span>
          <input
            type="number"
            min="0"
            max="1000"
            value={filters.priceRange[0]}
            onChange={(e) => handleFilterChange('priceRange', [parseInt(e.target.value) || 0, filters.priceRange[1]])}
            className="w-full text-black border-none outline-none px-2 py-1"
          />
        </div>

        <p className="text-black">to</p>

        <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
          <span className="text-black px-2">£</span>
          <input
            type="number"
            min="0"
            max="1000"
            value={filters.priceRange[1]}
            onChange={(e) => handleFilterChange('priceRange', [filters.priceRange[0], parseInt(e.target.value) || 1000])}
            className="w-full text-black border-none outline-none px-2 py-1"
          />
        </div>
      </div>

      {showTypeFilter && (
        <div>
          <label className="block text-xl font-medium text-black">Type</label>
          <select
            className="mt-1 text-black block w-Auto pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            onChange={(e) => handleFilterChange('type', e.target.value)}
            value={filters.type || ''}
          >
            <option value="">Any</option>
            {uniqueTypes.map(type => (
              <option key={type} value={type}>{type.toUpperCase()}</option>
            ))}
          </select>
        </div>
      )}

      {showSwitchesFilter && (
        <>
          <label className="block text-xl font-medium text-black">Switch Mount</label>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="hotswappable"
              checked={filters.hotswappable}
              onChange={(e) => handleFilterChange('hotswappable', e.target.checked)}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label
              htmlFor="hotswappable"
              className="text-sm font-medium text-black"
            >
              Hot-swappable only
            </label>
          </div>
      
          <label className="block text-xl font-medium text-black">Switch Type</label>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="HE"
              checked={filters.HE}
              onChange={(e) => handleFilterChange('HE', e.target.checked)}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label
              htmlFor="HE"
              className="text-sm font-medium text-black"
            >
              Magnetic (Hall-Effect)
            </label>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductFilter;