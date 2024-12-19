
export interface SwappableOption {
  name: string;
  price: number;
}

export interface SwappableOptions {
  [key: string]: SwappableOption[];
}

export type Product = {
  id: number;
  name: string;
  type: string;
  price: number;
  image: string;
  hoverImage: string;
  images: string[];
  layout: string;
  hotswappable: string;
  description: string;
  switches: string[];
  keycapsMaterial: string | undefined;
  caseMaterial: string | undefined;
  swappableOptionsJson: SwappableOptions;
  he: string;
};