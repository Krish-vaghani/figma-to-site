/**
 * Address API: add, list, update, delete.
 * Base URL: https://api.pursolina.com/api/v1
 * All endpoints require Authorization: Bearer <token>.
 */

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  AddressListResponse,
  AddAddressRequest,
  AddAddressResponse,
  UpdateAddressRequest,
  UpdateAddressResponse,
  DeleteAddressResponse,
} from "@/types/address";

const AUTH_TOKEN_KEY = "auth_token";
const ADDRESS_BASE_URL = "https://api.pursolina.com/api/v1";

function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

export const addressApi = createApi({
  reducerPath: "addressApi",
  baseQuery: fetchBaseQuery({
    baseUrl: ADDRESS_BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      const token = getAuthToken();
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["AddressList"],
  endpoints: (builder) => ({
    getAddressList: builder.query<AddressListResponse, { page?: number; limit?: number }>({
      query: ({ page = 1, limit = 20 }) => ({
        url: "/address/list",
        params: { page, limit },
      }),
      providesTags: ["AddressList"],
    }),

    addAddress: builder.mutation<AddAddressResponse, AddAddressRequest>({
      query: (body) => ({
        url: "/address/add",
        method: "POST",
        body,
      }),
      invalidatesTags: ["AddressList"],
    }),

    updateAddress: builder.mutation<
      UpdateAddressResponse,
      { id: string; body: UpdateAddressRequest }
    >({
      query: ({ id, body }) => ({
        url: `/address/update/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["AddressList"],
    }),

    deleteAddress: builder.mutation<DeleteAddressResponse, string>({
      query: (id) => ({
        url: `/address/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AddressList"],
    }),
  }),
});

export const {
  useGetAddressListQuery,
  useAddAddressMutation,
  useUpdateAddressMutation,
  useDeleteAddressMutation,
} = addressApi;
