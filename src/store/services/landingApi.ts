import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { LandingPageResponse, LandingPageData } from "../../types/landing";

export const landingApi = createApi({
  reducerPath: "landingApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.pursolina.com/api/v1",
  }),
  endpoints: (builder) => ({
    getLandingPageData: builder.query<LandingPageData, void>({
      query: () => "/landing",
      transformResponse: (raw: LandingPageResponse): LandingPageData => raw?.data ?? {},
    }),
  }),
});

export const { useGetLandingPageDataQuery } = landingApi;
