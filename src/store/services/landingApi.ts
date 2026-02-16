import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LandingPageResponse } from "../../types/landing";

export const landingApi = createApi({
  reducerPath: "landingApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://13.61.155.235:3000/api/v1",
  }),
  endpoints: (builder) => ({
    getLandingPageData: builder.query<LandingPageResponse, void>({
      query: () => "/landing",
    }),
  }),
});

export const { useGetLandingPageDataQuery } = landingApi;
