import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Base API configuration for all endpoints
export const baseApi = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/api/v1",
    }),
    tagTypes: ["Landing"],
    endpoints: () => ({}),
});
