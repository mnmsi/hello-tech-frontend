import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getCookie } from "cookies-next";
export const productApi = createApi({
  reducerPath: "productApi",
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
    // getProducts: builder.query({
    //   query: (params) => ({
    //     url: `/product`,
    //     params,
    //   }),
    // }),
    // getProductMeta: builder.query({
    //   query: (category) => ({
    //     url: `/product-meta/category/${category}`,
    //   }),
    // }),
    // getProductDetails: builder.query({
    //   query: (slug) => ({
    //     url: `/product/details/${slug}`,
    //   }),
    // }),
    // getRelatedProducts: builder.query({
    //   query: () => ({
    //     url: `/product/related`,
    //   }),
    // }),
    // getProductByBrand: builder.query({
    //   query: (brand) => ({
    //     url: `/product/get-product-by-brand/${brand}`,
    //   }),
    // }),
    // calculateProductPrice: builder.mutation({
    //   query: (body) => ({
    //     url: `/product/calculate_product_price`,
    //     method: "POST",
    //     body,
    //   }),
    // }),
    // getDynamicProductData: builder.query({
    //   query: () => ({
    //     url: `/dynamic-section`,
    //   }),
    // }),
  }),
});

export const {
  // useGetProductsQuery,
  // useGetProductMetaQuery,
  // useGetProductDetailsQuery,
  // useGetProductByBrandQuery,
  // useGetDynamicProductDataQuery,
  useGetProductDataQuery,
  useGetRelatedProductsQuery,
  useCalculateProductPriceMutation,
} = productApi;
