/**
 * Cart API: list, add, update, remove.
 * All endpoints require Authorization: Bearer <token>.
 * Mutations run in background; never block UI.
 */

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  CartListResponse,
  CartAddRequest,
  CartAddResponse,
  CartUpdateRequest,
  CartUpdateResponse,
  CartRemoveRequest,
  CartRemoveResponse,
} from "@/types/cart";

const AUTH_TOKEN_KEY = "auth_token";
const CART_BASE_URL =
  import.meta.env.VITE_CART_API_URL ?? "https://api.pursolina.com/api/v1";

function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: fetchBaseQuery({
    baseUrl: CART_BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      const token = getAuthToken();
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Cart"],
  endpoints: (builder) => ({
    getCart: builder.query<CartListResponse, void>({
      query: () => "/cart",
      providesTags: ["Cart"],
    }),

    addToCart: builder.mutation<CartAddResponse, CartAddRequest>({
      query: (body) => ({
        url: "/cart/add",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Cart"],
    }),

    updateCart: builder.mutation<CartUpdateResponse, CartUpdateRequest>({
      query: (body) => ({
        url: "/cart/update",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Cart"],
    }),

    removeFromCart: builder.mutation<CartRemoveResponse, CartRemoveRequest>({
      query: (body) => ({
        url: "/cart/remove",
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useUpdateCartMutation,
  useRemoveFromCartMutation,
} = cartApi;
