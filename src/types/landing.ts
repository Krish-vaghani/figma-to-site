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
    createdAt: string;
    updatedAt: string;
}

export interface LandingPageResponse {
    message: string;
    data: Partial<Record<LandingSectionKey, LandingSection>>;
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
 * Map a landing section to the Product shape used by ProductCard / carousels.
 * Use when rendering landing API data in CollectionsSection, NewArrivalsSection, etc.
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
