import { configureStore } from "@reduxjs/toolkit";
import { landingApi } from "./services/landingApi";

export const store = configureStore({
  reducer: {
    [landingApi.reducerPath]: landingApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(landingApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
