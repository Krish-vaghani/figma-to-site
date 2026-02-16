import { product1, product2, product3, product4 } from "@/lib/assetUrls";

export type BadgeType = "bestseller" | "trending" | "new" | "hot" | "limited" | "sale";

export interface Product {
  id: number | string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  reviews: string;
  rating: number;
  image: string;
  badge?: BadgeType;
  colors: string[];
  stock: number; // For urgency indicators
  /** From API; used for product detail URL when present */
  slug?: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Aurora Mini Purse",
    description: "Structured Crossbody With Top Handle",
    price: 500,
    originalPrice: 800,
    reviews: "125k Reviews",
    rating: 4.0,
    image: product1,
    badge: "bestseller",
    colors: ["#374151", "#F5D0C5", "#F3C677"],
    stock: 3,
  },
  {
    id: 2,
    name: "Velora Crossbody",
    description: "Modern Structured Handheld Bag",
    price: 3299,
    originalPrice: 4025,
    reviews: "125k Reviews",
    rating: 4.0,
    image: product2,
    badge: "trending",
    colors: ["#374151", "#F5D0C5", "#F3C677"],
    stock: 15,
  },
  {
    id: 3,
    name: "Bloom Mini Tote",
    description: "Compact Tote With Spacious Interior",
    price: 2199,
    originalPrice: 3250,
    reviews: "125k Reviews",
    rating: 4.0,
    image: product3,
    badge: "new",
    colors: ["#374151", "#E8B4B8", "#D4A574"],
    stock: 7,
  },
  {
    id: 4,
    name: "Nova Chain Purse",
    description: "Premium Quilted Evening Bag",
    price: 2799,
    originalPrice: 29999,
    reviews: "125k Reviews",
    rating: 4.0,
    image: product4,
    badge: "hot",
    colors: ["#D4A574", "#F3C677", "#E8B4B8"],
    stock: 2,
  },
  {
    id: 5,
    name: "Aurora Mini Purse",
    description: "Structured Crossbody With Top Handle",
    price: 500,
    originalPrice: 800,
    reviews: "89k Reviews",
    rating: 4.5,
    image: product1,
    badge: "limited",
    colors: ["#374151", "#F5D0C5", "#F3C677"],
    stock: 1,
  },
  {
    id: 6,
    name: "Velora Crossbody",
    description: "Modern Structured Handheld Bag",
    price: 3299,
    originalPrice: 4025,
    reviews: "102k Reviews",
    rating: 4.2,
    image: product2,
    badge: "new",
    colors: ["#374151", "#F5D0C5", "#F3C677"],
    stock: 12,
  },
  {
    id: 7,
    name: "Bloom Mini Tote",
    description: "Compact Tote With Spacious Interior",
    price: 2199,
    originalPrice: 3250,
    reviews: "78k Reviews",
    rating: 4.3,
    image: product3,
    badge: "hot",
    colors: ["#374151", "#E8B4B8", "#D4A574"],
    stock: 5,
  },
  {
    id: 8,
    name: "Nova Chain Purse",
    description: "Premium Quilted Evening Bag",
    price: 2799,
    originalPrice: 29999,
    reviews: "95k Reviews",
    rating: 4.1,
    image: product4,
    badge: "trending",
    colors: ["#D4A574", "#F3C677", "#E8B4B8"],
    stock: 20,
  },
];

// Helper to get stock urgency info
export const getStockStatus = (stock: number) => {
  if (stock <= 2) {
    return { text: `Only ${stock} left!`, urgent: true, color: "destructive" as const };
  }
  if (stock <= 5) {
    return { text: `Low Stock - ${stock} left`, urgent: true, color: "warning" as const };
  }
  return { text: "In Stock", urgent: false, color: "success" as const };
};
