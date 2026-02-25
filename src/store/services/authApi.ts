import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  RegisterOrLoginRequest,
  RegisterOrLoginResponse,
  LoginRequest,
  LoginResponse,
} from "@/types/auth";

const AUTH_BASE_URL = "https://api.pursolina.com/api/v1";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: AUTH_BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    registerOrLogin: builder.mutation<
      RegisterOrLoginResponse,
      RegisterOrLoginRequest
    >({
      query: (body) => ({
        url: "/auth/register-or-login",
        method: "POST",
        body,
      }),
    }),
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useRegisterOrLoginMutation, useLoginMutation } = authApi;
