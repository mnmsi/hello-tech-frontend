import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getCookie } from "cookies-next";
export const featuredProductByCategoryApi = createApi({
  reducerPath: "featuredProductByCategoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getCookie("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
    },
  }),
  tagTypes: ["FeaturedProductByCategory"],
  endpoints: (builder) => ({
    getFeaturedProductByCategory: builder.query({
      query: (id) => `/product/featured/${id}`,
      providesTags: ["FeaturedProductByCategory"],
    }),
  }),
});

export const { useGetFeaturedProductByCategoryQuery } =
  featuredProductByCategoryApi;
