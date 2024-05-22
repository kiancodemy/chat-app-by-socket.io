import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import userslice from "../slices/userslice";
import { Myapi } from "../slices/Apislice";
export const store = configureStore({
  reducer: {
    [Myapi.reducerPath]: Myapi.reducer,
    auth: userslice,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(Myapi.middleware),
});
setupListeners(store.dispatch);
