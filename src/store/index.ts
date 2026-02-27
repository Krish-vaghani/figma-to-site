import { configureStore } from "@reduxjs/toolkit";
import { landingApi } from "./services/landingApi";
import { authApi } from "./services/authApi";
import { productApi } from "./services/productApi";
import { addressApi } from "./services/addressApi";
import { wishlistApi } from "./services/wishlistApi";
import { cartApi } from "./services/cartApi";

export const store = configureStore({
  reducer: {
    [landingApi.reducerPath]: landingApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [addressApi.reducerPath]: addressApi.reducer,
    [wishlistApi.reducerPath]: wishlistApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      landingApi.middleware,
      authApi.middleware,
      productApi.middleware,
      addressApi.middleware,
      wishlistApi.middleware,
      cartApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
