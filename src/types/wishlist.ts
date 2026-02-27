/**
 * Types for Wishlist API (list, add, remove).
 * Base: https://api.pursolina.com/api/v1 (or VITE_WISHLIST_API_URL)
 */

export interface WishlistItem {
  _id: string;
  name: string;
  slug: string;
  price: number;
  salePrice: number | null;
  image: string;
  is_active: boolean;
}

export interface WishlistListResponse {
  message?: string;
  data: WishlistItem[];
}

export interface WishlistAddRequest {
  productId: string;
}

export interface WishlistAddResponse {
  message: string;
  data: WishlistItem[];
}

export interface WishlistRemoveRequest {
  productId: string;
}

export interface WishlistRemoveResponse {
  message?: string;
}
