import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const bannerApi = createApi({
  reducerPath: "bannerApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
  endpoints: (builder) => ({
    getBanner: builder.query({
      query: () => `/banners`,
    }),
    getHomeSlider: builder.query({
      query: () => `/banners/home-slider`,
    }),
  }),
});
export const { useGetBannerQuery, useGetHomeSliderQuery } = bannerApi;
