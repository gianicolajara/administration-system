import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { billApi } from "../services/billApi";
import { changesApi } from "../services/changesApi";
import { currencyApi } from "../services/currencyApi";
import { usersApi } from "../services/userApi";

export const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
    [currencyApi.reducerPath]: currencyApi.reducer,
    [changesApi.reducerPath]: changesApi.reducer,
    [billApi.reducerPath]: billApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      usersApi.middleware,
      currencyApi.middleware,
      changesApi.middleware,
      billApi.middleware,
    ]),
});

setupListeners(store.dispatch);
