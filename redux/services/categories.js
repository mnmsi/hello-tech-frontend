import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const categoriesApi = createApi({
  reducerPath: "categoriesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
  }),
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => "/categories",
      invalidatesTags: ["featuredBannerByCategory"],
    }),
  }),
});
export const { useGetCategoriesQuery } = categoriesApi;
