export type Category = "furniture" | "shelving";

export interface ProductVariant {
  id: string;
  name: string;
  type: "color" | "material" | "size";
  priceModifier: number;
}

export interface ProductDimensions {
  width: number;
  height: number;
  depth: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  images: string[];
  features: string[];
  dimensions?: ProductDimensions;
  variants?: ProductVariant[];
  inStock: boolean;
  tags: string[];
}

export interface CartItem {
  product: Product;
  variant?: ProductVariant;
  quantity: number;
}

export interface CategoryInfo {
  slug: Category;
  name: string;
  description: string;
  image: string;
}
