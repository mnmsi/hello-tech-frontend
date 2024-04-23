import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getCookie } from "cookies-next";
export const newArrivalsApi = createApi({
  reducerPath: "newArrivalsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getCookie("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
    },
  }),
  endpoints: (builder) => ({
    featureNewArrivals: builder.query({
      query: () => `/product/featured-new-arrivals`,
    }),
    newArrivals: builder.query({
      query: () => `/product/new-arrivals`,
    }),
  }),
});

export const { useFeatureNewArrivalsQuery, useNewArrivalsQuery } =
  newArrivalsApi;
