/**
 * Types for Cart API (list, add, update, remove).
 * Base: https://api.pursolina.com/api/v1 (or VITE_CART_API_URL)
 */

export interface CartApiProduct {
  _id: string;
  name: string;
  slug: string;
  price: number;
  salePrice: number | null;
  image: string;
  is_active: boolean;
}

export interface CartApiItem {
  product: CartApiProduct;
  quantity: number;
  _id: string;
}

export interface CartListResponse {
  message?: string;
  data: CartApiItem[];
}

export interface CartAddRequest {
  productId: string;
  quantity: number;
}

export interface CartAddResponse {
  message: string;
  data: CartApiItem[];
}

export interface CartUpdateRequest {
  productId: string;
  quantity: number;
}

export interface CartUpdateResponse {
  message?: string;
  data?: CartApiItem[];
}

export interface CartRemoveRequest {
  productId: string;
}

export interface CartRemoveResponse {
  message?: string;
}

/** Map API cart item to app CartItem (id, name, price, image, color, quantity) */
export function cartApiItemToCartItem(
  apiItem: CartApiItem
): import("@/contexts/CartContext").CartItem {
  const p = apiItem.product;
  return {
    id: p._id,
    name: p.name,
    price: p.salePrice ?? p.price,
    originalPrice: p.price,
    image: p.image,
    color: "#000",
    quantity: apiItem.quantity,
  };
}
