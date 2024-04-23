import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const warrantyListApi = createApi({
  reducerPath: "warrantyListApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
  }),
  endpoints: (builder) => ({
    getWarrantyList: builder.query({
      query: () => ({
        url: "/warranty-list",
      }),
    }),
  }),
});

export const { useGetWarrantyListQuery } = warrantyListApi;
