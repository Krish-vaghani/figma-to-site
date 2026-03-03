/**
 * Wraps fetchBaseQuery to clear auth and redirect to /login on 401.
 * Use for APIs that send Bearer token (cart, address, wishlist).
 */

import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn } from "@reduxjs/toolkit/query";

const AUTH_TOKEN_KEY = "auth_token";
const AUTH_USER_KEY = "auth_user";

function clearAuthAndRedirect(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_USER_KEY);
  window.location.href = "/login";
}

export type AuthBaseQueryConfig = Parameters<typeof fetchBaseQuery>[0];

/**
 * Creates a baseQuery that on 401 clears token/user from localStorage and redirects to /login.
 */
export function createAuthBaseQuery(
  config: AuthBaseQueryConfig
): BaseQueryFn {
  const base = fetchBaseQuery(config);
  return async (args, api, extraOptions) => {
    const result = await base(args, api, extraOptions);
    if (result.error && typeof result.error === "object" && "status" in result.error && result.error.status === 401) {
      clearAuthAndRedirect();
    }
    return result;
  };
}

export { clearAuthAndRedirect };
