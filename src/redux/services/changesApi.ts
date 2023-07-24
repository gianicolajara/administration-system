import { IChanges, IChangesResponse } from "@/types/interfaces/changes";
import {
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { urlApi } from "./config";

export const changesApi = createApi({
  reducerPath: "changesAPi",
  baseQuery: fetchBaseQuery({ baseUrl: urlApi }),
  tagTypes: ["Changes"],
  endpoints: (builder) => ({
    getAllChanges: builder.query({
      providesTags: ["Changes"],
      query: () => ({
        url: "changes",
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }),
      transformResponse: (rawResult: {
        message: string;
        changes: Array<IChangesResponse>;
      }) => {
        return rawResult?.changes;
      },
    }),
    createChange: builder.mutation({
      invalidatesTags: ["Changes"],
      query: (arg: IChanges) => ({
        url: "changes",
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: arg,
      }),
      transformErrorResponse: (baseQueryReturnValue) => {
        return baseQueryReturnValue?.data;
      },
    }),
    updateChange: builder.mutation({
      invalidatesTags: ["Changes"],
      query: (arg: { id: string; change: Partial<IChanges> }) => ({
        url: `changes/${arg.id}`,
        method: "PUT",
        body: arg.change,
        headers: {
          "Content-type": "application/json",
        },
      }),
      transformErrorResponse: (baseQueryReturnValue: FetchBaseQueryError) => {
        return baseQueryReturnValue?.data;
      },
    }),
    deleteChange: builder.mutation({
      invalidatesTags: ["Changes"],
      query: (arg: string) => ({
        url: `changes/${arg}`,
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
      }),
    }),
  }),
});

export const {
  useGetAllChangesQuery,
  useCreateChangeMutation,
  useUpdateChangeMutation,
  useDeleteChangeMutation,
} = changesApi;
