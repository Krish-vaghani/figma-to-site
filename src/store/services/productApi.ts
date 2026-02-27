import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  ProductListResponse,
  ProductListParams,
  ProductDetailResponse,
  ProductDetailParams,
} from "@/types/product";

const PRODUCT_BASE_URL =
  import.meta.env.VITE_PRODUCT_API_URL ?? "https://api.pursolina.com/api/v1";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: PRODUCT_BASE_URL,
    headers: { Accept: "application/json" },
  }),
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
    /** Single product detail (GET /product/detail/:id?reviewPage=1&reviewLimit=10) */
    getProductDetail: builder.query<ProductDetailResponse, ProductDetailParams>({
      query: ({ id, reviewPage = 1, reviewLimit = 10 }) => {
        const params = new URLSearchParams();
        params.set("reviewPage", String(reviewPage));
        params.set("reviewLimit", String(reviewLimit));
        return { url: `/product/detail/${encodeURIComponent(id)}?${params.toString()}` };
      },
    }),
    /** Increment product view count in background when a product is clicked */
    viewProduct: builder.mutation<void, string>({
      query: (productId) => ({
        url: `/product/${productId}/view`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetProductListQuery,
  useGetProductDetailQuery,
  useViewProductMutation,
} = productApi;
