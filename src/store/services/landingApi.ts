import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { LandingPageResponse, LandingSectionKey, LandingSection } from "../../types/landing";

/** Inner payload: sections keyed by section key */
export type LandingSectionsData = Partial<Record<LandingSectionKey, LandingSection>>;

export const landingApi = createApi({
  reducerPath: "landingApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.pursolina.com/api/v1",
  }),
  endpoints: (builder) => ({
    getLandingPageData: builder.query<LandingSectionsData, void>({
      query: () => "/landing",
      transformResponse: (raw: LandingPageResponse): LandingSectionsData => raw?.data ?? {},
    }),
  }),
});

export const { useGetLandingPageDataQuery } = landingApi;
