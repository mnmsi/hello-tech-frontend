import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const popularCategoriesApi = createApi({
  reducerPath: "popularCategoriesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
  }),
  endpoints: (builder) => ({
    getPopularCategories: builder.query({
      query: () => ({
        url: `/categories/popular-categories`,
      }),
    }),
  }),
});
export const { useGetPopularCategoriesQuery } = popularCategoriesApi;
