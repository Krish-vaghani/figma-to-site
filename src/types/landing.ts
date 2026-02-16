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
