/**
 * Types for Cart API (list, add, update, remove).
 * Base: https://api.pursolina.com/api/v1 (or VITE_CART_API_URL)
 */
import { heroProduct as DEFAULT_PRODUCT_IMAGE } from "@/lib/assetUrls";
import { getCachedProductImage } from "@/lib/productImageCache";

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

/** Ensure we always have a safe, absolute product image URL for the cart. */
function getSafeProductImage(image: unknown, productId: string): string {
  // Some APIs return image as { url }, or as an array. Normalize to string first.
  let candidate = "";
  if (typeof image === "string") {
    candidate = image;
  } else if (Array.isArray(image)) {
    candidate = (image.find((v) => typeof v === "string") as string | undefined) ?? "";
  } else if (typeof image === "object" && image !== null) {
    const obj = image as Record<string, unknown>;
    if (typeof obj.url === "string") candidate = obj.url;
    else if (typeof obj.image === "string") candidate = obj.image;
    else if (typeof obj.path === "string") candidate = obj.path;
  }

  let trimmed = candidate.trim();

  // If backend cart API does not send image (null), fall back to what we cached
  // from the product list/detail APIs.
  if (!trimmed) {
    const fromCache = getCachedProductImage(productId);
    if (fromCache && typeof fromCache === "string") {
      trimmed = fromCache.trim();
    }
  }

  if (!trimmed) return DEFAULT_PRODUCT_IMAGE;

  // If already absolute (http/https), use as-is
  if (/^https?:\/\//i.test(trimmed)) return trimmed;

  // Otherwise, prefix with the API origin (NOT /api/v1).
  // Most backends host images at e.g. https://api.pursolina.com/uploads/... (or /public/...).
  const apiBase =
    import.meta.env.VITE_IMAGE_BASE_URL ??
    import.meta.env.VITE_CART_API_URL ??
    "https://api.pursolina.com/api/v1";

  let origin = apiBase;
  try {
    origin = new URL(apiBase).origin;
  } catch {
    // If env is not a full URL, keep as-is.
  }

  if (trimmed.startsWith("/")) return `${origin}${trimmed}`;
  return `${origin}/${trimmed}`;
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
    image: getSafeProductImage(p.image, p._id),
    color: "#000",
    quantity: apiItem.quantity,
  };
}
