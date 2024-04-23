import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const popularBrandApi = createApi({
  reducerPath: "popularBrandApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
  }),
  endpoints: (builder) => ({
    getPopularBrand: builder.query({
      query: () => ({ url: "/brands/popular" }),
    }),
    getBrandByCategory: builder.query({
      query: (category) => ({ url: `/brands/category/${category}` }),
    }),
  }),
});
export const { useGetPopularBrandQuery, useGetBrandByCategoryQuery } =
  popularBrandApi;
