/**
 * Types for Wishlist API (list, add, remove).
 * List returns full product objects; image may be null (use colorVariants.images).
 * Base: https://api.pursolina.com/api/v1 (or VITE_WISHLIST_API_URL)
 */

/** Color variant from API (images array, optional default) */
export interface WishlistColorVariant {
  colorCode?: string;
  colorName?: string;
  images?: string[];
  default?: boolean;
  _id?: string;
}

/** Full product object returned in wishlist list response */
export interface WishlistItem {
  _id: string;
  name: string;
  slug: string;
  shortDescription?: string;
  description?: string;
  category?: string;
  price: number;
  salePrice: number | null;
  image: string | null;
  tags?: string[];
  colorVariants?: WishlistColorVariant[];
  dimensions?: { heightCm?: number; widthCm?: number; depthCm?: number };
  averageRating?: number;
  numberOfReviews?: number;
  viewCount?: number;
  landingSection?: string;
  is_active?: boolean;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
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

/** Get display image from wishlist item: image or first from default/any colorVariant */
export function getWishlistItemImage(item: WishlistItem): string {
  if (item.image && item.image.trim()) return item.image;
  const defaultVariant = item.colorVariants?.find((v) => v.default);
  const first = defaultVariant?.images?.[0] ?? item.colorVariants?.[0]?.images?.[0];
  return typeof first === "string" ? first : "";
}
