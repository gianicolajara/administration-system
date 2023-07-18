import { IBill, IBillResponse } from "@/types/interfaces/bill";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const billApi = createApi({
  reducerPath: "billApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/" }),
  tagTypes: ["Bill"],
  endpoints: (builder) => ({
    getAllBilles: builder.query<Array<IBillResponse>, void>({
      providesTags: ["Bill"],
      query: () => ({
        url: "bill",
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }),
      transformResponse: (rawResult: {
        message: string;
        billes: Array<IBillResponse>;
      }) => {
        return rawResult?.billes;
      },
    }),
    createBill: builder.mutation<void, Partial<IBill>>({
      invalidatesTags: ["Bill"],
      query: (arg) => ({
        url: "bill",
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
    updateBill: builder.mutation<void, { id: string; change: Partial<IBill> }>({
      invalidatesTags: ["Bill"],
      query: (arg) => ({
        url: `bill/${arg.id}`,
        method: "PUT",
        body: arg.change,
        headers: {
          "Content-type": "application/json",
        },
      }),
      transformErrorResponse: (baseQueryReturnValue) => {
        return baseQueryReturnValue?.data;
      },
    }),
    deleteBill: builder.mutation<void, string>({
      invalidatesTags: ["Bill"],
      query: (arg) => ({
        url: `bill/${arg}`,
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
      }),
    }),
  }),
});

export const {
  useCreateBillMutation,
  useDeleteBillMutation,
  useGetAllBillesQuery,
  useUpdateBillMutation,
} = billApi;
