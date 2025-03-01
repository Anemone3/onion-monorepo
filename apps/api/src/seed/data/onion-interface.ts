

export interface Onion {
  name: string;
  categories: string[];
  description: string;
  color: string;
  sweetness: number;
  storageLife: string;
  culinaryUses: string[];
  image: string;
  origin: string;
  price: number;
  stock: number;
  organic: boolean;
  seasonal: boolean;
  seasonalAvailability?: string[];
  sku: string;
  slug: string;
}