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
  /** Optional: some list responses may include these fields */
  averageRating?: number;
  viewCount?: number;
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

/** Single review entry returned by product detail API.
 * The exact backend shape may vary slightly; this is a flexible representation that
 * we safely map inside the UI.
 */
export interface ApiProductReview {
  _id?: string;
  id?: string | number;
  user_name?: string;
  userName?: string;
  name?: string;
  user_image?: string | null;
  userImage?: string | null;
  rating?: number | string;
  review?: string;
  comment?: string;
  message?: string;
  createdAt?: string;
  updatedAt?: string;
}

/** Star breakdown map from product detail API (rating -> count). */
export interface ProductStarBreakdown {
  [star: string]: number;
}

/** Product detail API response (used for rating graph + reviews). */
export interface ProductDetailData {
  _id: string;
  name: string;
  slug: string;
  shortDescription?: string;
  description: string;
  category: string;
  price: number;
  salePrice: number | null;
  image: string;
  tags: string[];
  colorVariants: ProductColorVariant[];
  dimensions?: {
    heightCm: number;
    widthCm: number;
    depthCm: number;
  };
  averageRating: number;
  numberOfReviews: number;
  viewCount: number;
  is_active: boolean;
  createdAt: string;
  updatedAt: string;
  currentPrice: number;
  images?: string[];
  starBreakdown?: ProductStarBreakdown;
  reviews: ApiProductReview[];
  reviewPage?: number;
  reviewLimit?: number;
  totalReviews?: number;
}

export interface ProductReviewsResponse {
  message: string;
  data: ProductDetailData;
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
    category: CATEGORY_TO_LABEL[p.category] ?? p.category,
    material: "Leather",
    occasion: "Everyday Use",
    collections: collections.length > 0 ? collections : ["New Arrivals"],
  };
}
