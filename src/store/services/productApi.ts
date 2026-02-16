import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ProductListResponse, ProductListParams } from "@/types/product";

const PRODUCT_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "/api/v1";

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
  }),
});

export const { useGetProductListQuery } = productApi;
