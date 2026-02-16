/** Color variant from product list API */
export interface ProductColorVariant {
  colorCode: string;
  images: string[];
  _id?: string;
}

/** Single product from product list API */
export interface ApiProduct {
  _id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  price: number;
  salePrice: number | null;
  image: string;
  tags: string[];
  colorVariants: ProductColorVariant[];
  numberOfReviews: number;
  is_active: boolean;
  createdAt: string;
  updatedAt: string;
}

/** Product list API response */
export interface ProductListResponse {
  message: string;
  data: ApiProduct[];
  total: number;
  page: number;
  limit: number;
}

/** Query params for product list */
export interface ProductListParams {
  page: number;
  limit: number;
  category?: string;
  tag?: string;
}

/** BadgeType supported by UI (from @/data/products) */
const VALID_BADGES = ["bestseller", "trending", "new", "hot", "limited", "sale"] as const;

/** Map API product to the Product shape used by ShopProductCard etc. */
export function mapApiProductToProduct(p: ApiProduct): import("@/data/products").Product {
  const badge = p.tags[0];
  return {
    id: p._id,
    name: p.name,
    description: p.description,
    price: p.salePrice ?? p.price,
    originalPrice: p.price,
    reviews: `${p.numberOfReviews} Reviews`,
    rating: 0,
    image: p.image,
    badge: VALID_BADGES.includes(badge as typeof VALID_BADGES[number])
      ? (badge as import("@/data/products").BadgeType)
      : undefined,
    colors: p.colorVariants.map((c) => c.colorCode),
    stock: 0,
    slug: p.slug,
  };
}
