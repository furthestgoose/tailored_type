// /data/mockProducts.ts

// Define the structure for a swappable option
export interface SwappableOption {
  name: string;
  price: number;
}

// Define the structure for categories of swappable options
export interface SwappableOptions {
  [key: string]: SwappableOption[];
}

// Extend the Product type to include swappable options
export type Product = {
  layout?: string;
  hotswappable?: string;
  id: number;
  type: string;
  name: string;
  price: number;
  image: string;
  hoverImage: string;
  images: string[];
  description: string;
  switches?: string[]; // Specific to 'keyboard' or 'switches' types
  keycapsMaterial?: string; // Specific to 'keycaps' type
  caseMaterial?: string; // Specific to 'case' type
  swappableOptions?: SwappableOptions; // New field for swappable options
};

export const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Custom TKL Keyboard',
    type: 'keyboard',
    price: 199.99,
    switches: ['any 3pin or 5pin switches'],
    image: '/images/keyboard1.jpg',
    layout: 'TKL',
    hotswappable: 'With Hotswap PCB Installed',
    images: ['/images/keyboard1.jpg','/images/switches1.webp'],
    hoverImage: '/images/switches1.webp',
    description: 'A customizable TKL keyboard with various options',
    swappableOptions: {
      PCB: [
        { name: 'Standard PCB', price: 0 },
        { name: 'Hot-swappable PCB', price: 30 },
        { name: 'Hot-swappable RGB PCB', price: 50 }
      ],
      Case: [
        { name: 'Plastic Case', price: 0 },
        { name: 'Aluminum Case', price: 80 },
        { name: 'Wood Case', price: 100 }
      ],
      Switches: [
        { name: 'Cherry MX Blue', price: 0 },
        { name: 'Gateron Red', price: 10 },
        { name: 'Kailh Box White', price: 15 }
      ]
    }
  },
  { id: 2, name: 'Cherry MX Blue Switches', type: 'switches', price: 49.99, image: '/images/switches1.webp', images: ['/images/keyboard1.jpg'], hoverImage: '/images/switches1-hover.jpg', description: 'test',
swappableOptions:{
Quantity: [
  {name: '90', price: 0},
  {name: '110', price: 15}
]
}
  },
  { id: 3, name: 'Minimalist Keycap Set', type: 'keycaps', price: 79.99, image: '/images/keycaps1.jpg', images: ['/images/keyboard1.jpg'], hoverImage: '/images/keycaps1-hover.jpg', description: 'test' },
  { id: 4, name: '60% Wooden Case', type: 'case', price: 89.99, image: '/images/case1.jpg', images: ['/images/keyboard1.jpg'], hoverImage: '/images/case1-hover.jpg', description: 'test' },
  { id: 5, name: 'Custom Coiled Cable', type: 'cable', price: 39.99, image: '/images/cable1.jpg', images: ['/images/keyboard1.jpg'], hoverImage: '/images/cable1-hover.jpg', description: 'test' },
  { id: 6, name: 'Artisan Keycap', type: 'keycap', price: 29.99, image: '/images/artisan1.jpg', images: ['/images/keyboard1.jpg'], hoverImage: '/images/artisan1-hover.jpg', description: 'test' },
  { id: 7, name: 'Artisan Keycap', type: 'keycap', price: 29.99, image: '/images/artisan1.jpg', images: ['/images/keyboard1.jpg'], hoverImage: '/images/artisan1-hover.jpg', description: 'test' },
  { id: 8, name: 'Artisan Keycap', type: 'keycap', price: 29.99, image: '/images/artisan1.jpg', images: ['/images/keyboard1.jpg'], hoverImage: '/images/artisan1-hover.jpg', description: 'test' },
  { id: 9, name: 'Artisan Keycap', type: 'keycap', price: 29.99, image: '/images/artisan1.jpg', images: ['/images/keyboard1.jpg'], hoverImage: '/images/artisan1-hover.jpg', description: 'test' },
];