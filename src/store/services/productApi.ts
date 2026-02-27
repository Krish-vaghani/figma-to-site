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
    getProductDetail: builder.query<ProductDetailResponse, ProductDetailParams>({
      query: ({ id, reviewPage, reviewLimit }) => {
        const params = new URLSearchParams();
        if (reviewPage != null) params.set("reviewPage", String(reviewPage));
        if (reviewLimit != null) params.set("reviewLimit", String(reviewLimit));
        const qs = params.toString();
        return { url: `/product/detail/${id}${qs ? `?${qs}` : ""}` };
      },
    }),
    viewProduct: builder.mutation<unknown, string>({
      query: (id) => ({
        url: `/product/${id}/view`,
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
