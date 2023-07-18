import { IMoney } from "@/types/interfaces/money";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const currencyApi = createApi({
  reducerPath: "currencyApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/" }),
  tagTypes: ["Currency"],
  endpoints: (build) => ({
    getAllCurrencies: build.query({
      providesTags: ["Currency"],
      query: () => ({
        url: "currency",
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }),
      transformResponse(rawResult: {
        message: string;
        currency: Array<IMoney>;
      }) {
        return rawResult.currency;
      },
    }),
    createCurrency: build.mutation({
      invalidatesTags: ["Currency"],
      query: (arg) => ({
        url: "currency",
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: arg,
      }),
    }),
    updateCurrency: build.mutation({
      invalidatesTags: ["Currency"],
      query: (arg: { id: string; currency: Partial<IMoney> }) => ({
        url: `currency/${arg.id}`,
        body: arg.currency,
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
      }),
    }),
    deleteCurrency: build.mutation({
      invalidatesTags: ["Currency"],
      query: (arg: { id: string }) => ({
        url: `currency/${arg.id}`,
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
      }),
    }),
  }),
});

export const {
  useCreateCurrencyMutation,
  useGetAllCurrenciesQuery,
  useUpdateCurrencyMutation,
  useDeleteCurrencyMutation,
} = currencyApi;
