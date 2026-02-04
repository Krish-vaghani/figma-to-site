import { baseApi } from "./api";

// TypeScript interfaces matching backend schema
export interface LandingSectionColor {
    colorCode: string;
    images: string | null;
}

export interface LandingSection {
    _id: string;
    sectionKey:
    | "hero"
    | "best_collections"
    | "find_perfect_purse"
    | "elevate_look"
    | "fresh_styles"
    | "testimonials"
    | "crafted_confidence";
    order: number;
    is_active: boolean;
    images: string[];
    price: number | null;
    originalPrice: number | null;
    rating: number | null;
    numberOfReviews: number;
    tags: ("bestseller" | "hot" | "trending" | "sale")[];
    colors: LandingSectionColor[];
    createdAt: string;
    updatedAt: string;
}

export type LandingPageData = {
    [K in LandingSection["sectionKey"]]?: LandingSection;
};

export interface LandingPageResponse {
    message: string;
    data: LandingPageData;
}

// Landing page API slice
export const landingApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getLandingPageData: builder.query<LandingPageResponse, void>({
            query: () => "/landing",
            providesTags: ["Landing"],
        }),
    }),
});

export const { useGetLandingPageDataQuery } = landingApi;
