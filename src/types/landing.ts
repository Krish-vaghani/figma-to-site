export type LandingSectionKey =
    | "hero"
    | "best_collections"
    | "find_perfect_purse"
    | "elevate_look"
    | "fresh_styles"
    | "testimonials"
    | "crafted_confidence";

export type TagType = "bestseller" | "hot" | "trending" | "sale";

export interface ColorOption {
    colorCode: string;
    images: string | null;
}

/** Hero section from API (single object with sectionKey, order, etc.) */
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
    createdAt?: string;
    updatedAt?: string;
}

/** Product-shaped item from landing API arrays (best_collections, elevate_look, fresh_styles) */
export interface LandingProductItem {
    /** Relation id for this landing entry */
    _id: string;
    /** Actual product id to use for detail page, cart, etc. */
    product: string;
    images: string[];
    price: number;
    originalPrice: number;
    rating: number;
    numberOfReviews: number;
    tags: TagType[];
    colors: ColorOption[];
}

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
