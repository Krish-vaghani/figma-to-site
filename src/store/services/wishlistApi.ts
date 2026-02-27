/**
 * Wishlist API: list, add, remove.
 * All endpoints require Authorization: Bearer <token>.
 * Add/remove run in background; never block UI.
 */

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  WishlistListResponse,
  WishlistAddRequest,
  WishlistAddResponse,
  WishlistRemoveRequest,
  WishlistRemoveResponse,
} from "@/types/wishlist";

const AUTH_TOKEN_KEY = "auth_token";
const WISHLIST_BASE_URL =
  import.meta.env.VITE_WISHLIST_API_URL ?? "https://api.pursolina.com/api/v1";

function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

export const wishlistApi = createApi({
  reducerPath: "wishlistApi",
  baseQuery: fetchBaseQuery({
    baseUrl: WISHLIST_BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      const token = getAuthToken();
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Wishlist"],
  endpoints: (builder) => ({
    getWishlist: builder.query<WishlistListResponse, void>({
      query: () => "/wishlist",
      providesTags: ["Wishlist"],
    }),

    addToWishlist: builder.mutation<WishlistAddResponse, WishlistAddRequest>({
      query: (body) => ({
        url: "/wishlist/add",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Wishlist"],
    }),

    removeFromWishlist: builder.mutation<WishlistRemoveResponse, WishlistRemoveRequest>({
      query: (body) => ({
        url: "/wishlist/remove",
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["Wishlist"],
    }),
  }),
});

export const {
  useGetWishlistQuery,
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
} = wishlistApi;
