import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUser } from "../../../types/interfaces/user";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/" }),
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    signup: builder.mutation({
      invalidatesTags: ["Users"],
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
      providesTags: ["Users"],
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

    //http://localhost:3000/api/users/64ad52a80e8bbc56a9839b13
    desactivateUser: builder.mutation({
      invalidatesTags: ["Users"],
      query: (args) => ({
        url: `users/${args}`,
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
      }),
    }),

    updateUser: builder.mutation({
      invalidatesTags: ["Users"],
      query: (args: { id: string; user: Partial<IUser> }) => ({
        url: `users/${args.id}`,
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: args.user,
      }),
    }),
  }),
});

export const {
  useSignupMutation,
  useGetAllUsersQuery,
  useDesactivateUserMutation,
  useUpdateUserMutation,
} = usersApi;
