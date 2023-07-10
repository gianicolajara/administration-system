import { configureStore } from "@reduxjs/toolkit";
import { usersApi } from "../services";

import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(usersApi.middleware),
});

setupListeners(store.dispatch);
