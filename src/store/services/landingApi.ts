import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LandingPageResponse } from "../../types/landing";

export const landingApi = createApi({
    reducerPath: "landingApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/v1" }),
    endpoints: (builder) => ({
        getLandingPageData: builder.query<LandingPageResponse, void>({
            query: () => "/landing",
        }),
    }),
});

export const { useGetLandingPageDataQuery } = landingApi;
