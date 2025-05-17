export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: ProductCategory;
  seller: {
    id: string;
    name: string;
    rating: number;
  };
  createdAt: string;
  status: ProductStatus;
}

export type ProductCategory = 
  | 'food'
  | 'fashion'
  | 'craft'
  | 'electronics'
  | 'health'
  | 'other';

export type ProductStatus = 'active' | 'sold' | 'inactive';

export interface ProductFormData {
  name: string;
  description: string;
  price: string; // Changed to string for form handling
  category: ProductCategory;
  images: string[];
}

export interface MarketplaceFilters {
  category?: ProductCategory;
  minPrice?: number;
  maxPrice?: number;
  searchQuery?: string;
}
