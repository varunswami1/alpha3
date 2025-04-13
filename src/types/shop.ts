
export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  discount: string;
  discountedPrice: number;
  stockStatus: "In Stock" | "Low Stock" | "Out of Stock";
  images: string[];
  hasVideo: boolean;
  rating: number;
  reviewsCount: number;
  smartFeatures: string[];
  compatibility: string[];
  deliveryEstimate: string;
  freeShipping: boolean;
  warranty: string;
  loyaltyPoints: number;
}

export interface Review {
  id: string;
  productId: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
}
