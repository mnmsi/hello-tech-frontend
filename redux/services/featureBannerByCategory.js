import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const featuredBannerByCategory = createApi({
  reducerPath: "featuredBannerByCategory",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
  endpoints: (builder) => ({
    getFeaturedBannerByCategory: builder.query({
      query: (id) => `/banners/category/${id}`,
    }),
  }),
});
export const { useGetFeaturedBannerByCategoryQuery } = featuredBannerByCategory;
