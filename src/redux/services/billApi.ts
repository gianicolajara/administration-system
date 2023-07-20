import { IBill, IBillResponse } from "@/types/interfaces/bill";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { urlApi } from "./config";

export const billApi = createApi({
  reducerPath: "billApi",
  baseQuery: fetchBaseQuery({ baseUrl: urlApi }),
  tagTypes: ["Bill"],
  endpoints: (builder) => ({
    getAllBilles: builder.query<
      Array<IBillResponse>,
      { startDate?: string; endDate?: string }
    >({
      providesTags: ["Bill"],
      query: ({ endDate = undefined, startDate = undefined }) => ({
        url: `bill${
          endDate && startDate
            ? `?startDate=${startDate}&endDate=${endDate}`
            : ""
        }`,
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

/* export const addBillBySocketResponse = (
  bill: IBillResponse,
  dispatch: AppDispatch
) => {
  return dispatch(
    billApi.util.updateQueryData("getAllBilles", {}, (draft) => {
      draft.push(bill);
    })
  );
};

export const deleteBillBySoscketResponse = (
  id: string,
  dispatch: AppDispatch
) => {
  return dispatch(
    billApi.util.updateQueryData("getAllBilles", {}, (draft) => {
      return draft.filter((bill) => bill.id !== id);
    })
  );
};

export const updateBillIdBySocketResponse = (
  bill: IBillResponse,
  dispatch: AppDispatch
) => {
  return dispatch(
    billApi.util.updateQueryData("getAllBilles", {}, (draft) => {
      const indexBillFound = draft.findIndex(
        (billSelected) => billSelected.id === bill.id
      );

      draft[indexBillFound] = {
        ...draft[indexBillFound],
        ...bill,
      };

      return draft;
    })
  );
}; */

export const {
  useCreateBillMutation,
  useDeleteBillMutation,
  useGetAllBillesQuery,
  useUpdateBillMutation,
} = billApi;
