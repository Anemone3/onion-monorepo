import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/auth.api";
import { authSlice } from "./slices/authslice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    [authApi.reducerPath] : authApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

