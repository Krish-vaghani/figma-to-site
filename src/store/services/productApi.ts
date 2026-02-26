import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ProductListResponse, ProductListParams, ProductReviewsResponse } from "@/types/product";

const PRODUCT_BASE_URL = "https://api.pursolina.com/api/v1";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: PRODUCT_BASE_URL }),
  endpoints: (builder) => ({
    getProductList: builder.query<ProductListResponse, ProductListParams>({
      query: ({ page, limit, category, tag }) => {
        const params = new URLSearchParams();
        params.set("page", String(page));
        params.set("limit", String(limit));
        if (category) params.set("category", category);
        if (tag) params.set("tag", tag);
        return { url: `/product/list?${params.toString()}` };
      },
    }),

    /**
     * Product detail (rating graph + reviews).
     * Backend expects the product id in the URL segment.
     */
    getProductReviews: builder.query<ProductReviewsResponse, string>({
      query: (id) => `/product/detail/${id}`,
    }),
  }),
});

export const { useGetProductListQuery, useGetProductReviewsQuery } = productApi;
