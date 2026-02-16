import { configureStore } from "@reduxjs/toolkit";
import { landingApi } from "./services/landingApi";
import { authApi } from "./services/authApi";
import { productApi } from "./services/productApi";

export const store = configureStore({
  reducer: {
    [landingApi.reducerPath]: landingApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      landingApi.middleware,
      authApi.middleware,
      productApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
