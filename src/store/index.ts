import { configureStore } from "@reduxjs/toolkit";
import { appReducer } from "./slices";
import { landingApi } from "./services/landingApi";

export const store = configureStore({
  reducer: {
    app: appReducer,
    [landingApi.reducerPath]: landingApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(landingApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
