import { configureStore } from "@reduxjs/toolkit";
import { usersApi } from "../services/userApi";

import { setupListeners } from "@reduxjs/toolkit/query";
import { changesApi } from "../services/changesApi";
import { currencyApi } from "../services/currencyApi";

export const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
    [currencyApi.reducerPath]: currencyApi.reducer,
    [changesApi.reducerPath]: changesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      usersApi.middleware,
      currencyApi.middleware,
      changesApi.middleware,
    ]),
});

setupListeners(store.dispatch);
