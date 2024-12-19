
export interface SwappableOption {
  name: string;
  price: number;
}

export interface SwappableOptions {
  [key: string]: SwappableOption[];
}

export type Product = {
  id: number;
  layout?: string;
  hotswappable?: string;
  HE?: string;
  type: string;
  name: string;
  price: number;
  image: string;
  hoverImage: string;
  images: string[];
  description: string;
  switches?: string[];
  keycapsMaterial?: string;
  caseMaterial?: string;
  swappableOptions?: SwappableOptions;
};