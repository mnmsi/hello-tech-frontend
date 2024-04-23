import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getCookie } from "cookies-next";

export const wishlistApi = createApi({
  reducerPath: "wishlistApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: (headers) => {
      const token = getCookie("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Wishlist"],
  endpoints: (builder) => ({
    getWishlist: builder.query({
      query: () => "/wishlist/list",
      providesTags: ["Wishlist"],
    }),
    addToWishlist: builder.mutation({
      query: (productId) => ({
        url: "/wishlist/add",
        method: "POST",
        body: { productId },
      }),
      invalidatesTags: ["Wishlist"],
    }),
  }),
});

export const { useAddToWishlistMutation } = wishlistApi;
