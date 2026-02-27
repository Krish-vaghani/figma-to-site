/** Color variant from product list API */
export interface ProductColorVariant {
  colorCode: string;
  images: string[];
  _id?: string;
}

/** Single product from product list API (GET /product/list) */
export interface ApiProduct {
  _id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  price: number;
  salePrice: number | null;
  /** Primary image URL */
  image: string;
  /** Optional array; when present, first item can be used as primary image */
  images?: string[];
  tags: string[];
  colorVariants: ProductColorVariant[];
  numberOfReviews: number;
  viewCount?: number;
  is_active: boolean;
  __v?: number;
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

/** Product detail API (GET /product/detail/:id) */
export interface ProductDetailParams {
  id: string;
  reviewPage?: number;
  reviewLimit?: number;
}

/** Single review from product detail API (when returned) */
export interface ApiReview {
  _id?: string;
  user_name?: string;
  name?: string;
  rating?: number;
  comment?: string;
  text?: string;
  createdAt?: string;
  avatar?: string;
}

/** Product detail API response */
export interface ProductDetailResponse {
  message?: string;
  data: ApiProduct;
  /** When reviewPage/reviewLimit are used; may be array or { list: ApiReview[] } */
  reviews?: ApiReview[] | { list?: ApiReview[] };
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

/** API category -> filter category label (By Category in ShopFilters) */
const CATEGORY_TO_LABEL: Record<string, string> = {
  purse: "Handbags",
};

/** Tag -> collection label (By Collection in ShopFilters) */
const TAG_TO_COLLECTION: Record<string, string> = {
  bestseller: "Best Sellers",
  trending: "Trending",
  sale: "On Sale",
  new: "New Arrivals",
};

/** Map API product to the Product shape used by ShopProductCard etc. */
export function mapApiProductToProduct(p: ApiProduct): import("@/data/products").Product {
  const badge = p.tags[0];
  const collections = p.tags
    .map((t) => TAG_TO_COLLECTION[t])
    .filter(Boolean);
  const image = (p.images && p.images[0]) ?? p.image ?? "";
  return {
    id: p._id,
    name: p.name,
    description: p.description,
    price: p.salePrice ?? p.price,
    originalPrice: p.price,
    reviews: `${p.numberOfReviews} Reviews`,
    rating: 0,
    image,
    badge: VALID_BADGES.includes(badge as typeof VALID_BADGES[number])
      ? (badge as import("@/data/products").BadgeType)
      : undefined,
    colors: p.colorVariants.map((c) => c.colorCode),
    stock: 0,
    slug: p.slug,
    category: CATEGORY_TO_LABEL[p.category] ?? p.category,
    material: "Leather",
    occasion: "Everyday Use",
    collections: collections.length > 0 ? collections : ["New Arrivals"],
  };
}
