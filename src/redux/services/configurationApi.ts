import {
  IConfiguration,
  IConfigurationResponse,
} from "@/types/interfaces/configuration";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { urlApi } from "./config";

export const configurationApi = createApi({
  reducerPath: "configurationApi",
  baseQuery: fetchBaseQuery({ baseUrl: urlApi }),
  tagTypes: ["Configuration"],
  endpoints: (builder) => ({
    getConfiguration: builder.query<IConfigurationResponse, void>({
      providesTags: ["Configuration"],
      query: () => ({
        url: "configuration",
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }),
      transformResponse: (rawResult: {
        configurations: IConfigurationResponse;
      }) => {
        return rawResult.configurations;
      },
    }),
    putConfiguration: builder.mutation<void, Partial<IConfiguration>>({
      invalidatesTags: ["Configuration"],
      query: (arg) => ({
        url: "configuration",
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: arg,
      }),
    }),
    createConfiguration: builder.mutation<void, Partial<IConfiguration>>({
      invalidatesTags: ["Configuration"],
      query: (arg) => ({
        url: "configuration",
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: arg,
      }),
    }),
  }),
});

export const {
  useGetConfigurationQuery,
  usePutConfigurationMutation,
  useCreateConfigurationMutation,
} = configurationApi;
