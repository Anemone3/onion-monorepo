export interface ProductResponse {
  id: string;
  name: string;
  description: string;
  color: string;
  sweetness: number;
  storageLife: string;
  culinaryUses: string[];
  image: string;
  origin: string;
  price: string;
  stock: number;
  slug: string;
  organic: boolean;
  seasonal: boolean;
  seasonalAvailability: null | string[];
  sku: string;
  categories: Category[];
}

export interface Category {
  id: number;
  name: string;
}
