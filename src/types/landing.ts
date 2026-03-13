import type { ApiProduct } from "./product";
import { mapApiProductToProduct } from "./product";

export type LandingSectionKey =
    | "hero"
    | "best_collections"
    | "find_perfect_purse"
    | "elevate_look"
    | "fresh_styles"
    | "testimonials"
    | "crafted_confidence";

export type TagType = "bestseller" | "hot" | "trending" | "sale";

/** Color option from API; images can be single URL (e.g. elevate_look) or array (e.g. best_collections) */
export interface ColorOption {
    _id?: string;
    colorCode: string;
    images: string | string[] | null;
    default?: boolean;
}

/** Hero section from API (single object with sectionKey, order, products, etc.) */
export interface LandingSection {
    _id: string;
    sectionKey: LandingSectionKey;
    order: number;
    is_active: boolean;
    images: string[];
    price: number | null;
    originalPrice: number | null;
    rating: number | null;
    numberOfReviews: number;
    tags: TagType[];
    colors: ColorOption[];
    /** Full product objects for hero; first product is the featured hero product */
    products?: ApiProduct[];
    __v?: number;
    createdAt?: string;
    updatedAt?: string;
}

/** Get display info for the hero section: from first hero product or section fallbacks */
export function getHeroDisplay(section: LandingSection | undefined): {
    id: string;
    name: string;
    shortDescription: string;
    price: number;
    originalPrice: number;
    image: string;
    rating: number;
    numberOfReviews: number;
    tag: TagType | undefined;
} | null {
    if (!section) return null;
    const product = section.products?.[0];
    const variantImg =
        product?.colorVariants?.find((v) => v.default)?.images?.[0] ?? product?.colorVariants?.[0]?.images?.[0];
    const firstImage =
        (product?.image && String(product.image).trim()) || variantImg || section.images?.[0] || "";
    const price = product ? (product.salePrice ?? product.price) : (section.price ?? 0);
    const originalPrice = product ? product.price : (section.originalPrice ?? section.price ?? price);
    return {
        id: product?._id ?? section._id,
        name: product?.name ?? SECTION_DISPLAY_NAMES[section.sectionKey] ?? "Featured",
        shortDescription: product?.shortDescription ?? "Structured Crossbody With Top Handle",
        price,
        originalPrice,
        image: firstImage,
        rating: product?.averageRating ?? section.rating ?? 4,
        numberOfReviews: product?.numberOfReviews ?? section.numberOfReviews ?? 0,
        tag: (section.tags?.[0] ?? product?.tags?.[0]) as TagType | undefined,
    };
}

/** Legacy product-shaped item from landing API arrays (best_collections, elevate_look, fresh_styles) */
export interface LandingProductItemLegacy {
    /** Relation id for this landing entry */
    _id: string;
    /** Actual product id for detail page, cart, etc.; can be null for non-product entries */
    product: string | null;
    images: string[];
    price: number;
    originalPrice: number | null;
    rating: number;
    numberOfReviews: number;
    tags: TagType[];
    colors: ColorOption[];
}

/**
 * Landing API now returns full product objects in section arrays
 * (same shape as product list API), but we keep legacy support too.
 */
export type LandingProductItem = LandingProductItemLegacy | ApiProduct;

/** API response shape: message + data */
export interface LandingPageResponse {
    message: string;
    data: LandingPageData;
}

/** Inner payload from v1/landing API */
export interface LandingPageData {
    hero?: LandingSection;
    best_collections?: LandingProductItem[];
    elevate_look?: LandingProductItem[];
    fresh_styles?: LandingProductItem[];
    find_perfect_purse?: LandingSection;
    testimonials?: unknown;
    crafted_confidence?: unknown;
}

/** Section key -> display name for product cards */
const SECTION_DISPLAY_NAMES: Record<LandingSectionKey, string> = {
    hero: "Aurora Mini Purse",
    best_collections: "Best Collections",
    find_perfect_purse: "Find Your Perfect Purse",
    elevate_look: "Elevate Your Look",
    fresh_styles: "Fresh Styles",
    testimonials: "Testimonials",
    crafted_confidence: "Crafted Confidence",
};

/**
 * Map a landing section (hero) to the Product shape used by ProductCard / carousels.
 */
export function landingSectionToProduct(section: LandingSection): import("@/data/products").Product {
    const name = SECTION_DISPLAY_NAMES[section.sectionKey] ?? section.sectionKey;
    return {
        id: section._id,
        name,
        description: "Curated collection",
        price: section.price ?? 0,
        originalPrice: section.originalPrice ?? section.price ?? 0,
        reviews: `${section.numberOfReviews} Reviews`,
        rating: section.rating ?? 0,
        image: section.images?.[0] ?? "",
        badge: section.tags?.[0],
        colors: section.colors?.map((c) => c.colorCode) ?? [],
        stock: 5,
    };
}

/**
 * Map a landing product item (from best_collections, elevate_look, fresh_styles arrays) to Product.
 */
export function landingItemToProduct(
    item: LandingProductItem,
    displayName?: string
): import("@/data/products").Product {
    // New API shape: section arrays contain full products (same as product list API)
    if (!("product" in item)) {
        const p = mapApiProductToProduct(item);
        return {
            ...p,
            // Preserve real product name; only fall back to displayName when missing.
            name: p.name || displayName || "Curated collection",
        };
    }

    // Legacy landing item shape
    return {
        // Use backend product id for detail page routes
        id: item.product ?? item._id,
        name: displayName ?? "Curated collection",
        description: "Curated collection",
        price: item.price ?? 0,
        originalPrice: item.originalPrice ?? item.price ?? 0,
        reviews: `${item.numberOfReviews} Reviews`,
        rating: item.rating ?? 0,
        image: item.images?.[0] ?? "",
        badge: item.tags?.[0],
        colors: item.colors?.map((c) => c.colorCode) ?? [],
        stock: 5,
    };
}
