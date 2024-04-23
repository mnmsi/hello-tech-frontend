import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const preOrderApi = createApi({
  reducerPath: "preOrderApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
  endpoints: (builder) => ({
    postPreOrder: builder.mutation({
      query: (data) => ({
        url: "/pre-order/store",
        method: "POST",
        body: data,
      }),
      onSuccess: (response, variables, api) => {},
    }),
  }),
});

export const { usePostPreOrderMutation } = preOrderApi;
