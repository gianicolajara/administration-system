import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUser } from "../../../types/interfaces/user";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/" }),
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (arg) => ({
        url: "signup",
        method: "POST",
        body: arg,
        headers: {
          "Content-type": "application/json",
        },
      }),
    }),
    getAllUsers: builder.query({
      query: () => ({
        url: "users",
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }),
      transformResponse(rawResult: { message: string; users: Array<IUser> }) {
        return rawResult.users;
      },
    }),
  }),
});

export const { useSignupMutation, useGetAllUsersQuery } = usersApi;
