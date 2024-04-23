import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getCookie } from "cookies-next";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getCookie("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: [
    "Wishlist",
    "Cart",
    "user",
    "address",
    "orderList",
    "Review",
    "GuestCart",
    "products",
  ],
  endpoints: (builder) => ({
    googleLogin: builder.mutation({
      query: (body) => ({
        url: "/google-login",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Wishlist", "Cart", "user"],
    }),
    login: builder.mutation({
      query: (body) => ({
        url: "/login",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Wishlist", "Cart", "user"],
    }),
    getWishlist: builder.query({
      query: (token) => ({
        url: "/wishlist/list",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["Wishlist"],
    }),
    sendOtp: builder.mutation({
      query: (body) => ({
        url: "/send-otp",
        method: "POST",
        body,
      }),
    }),
    verifyOtp: builder.mutation({
      query: (body) => ({
        url: "/verify-otp",
        method: "POST",
        body,
      }),
    }),
    resetPassword: builder.mutation({
      query: (body) => ({
        url: "/reset-password",
        method: "POST",
        body,
      }),
    }),
    register: builder.mutation({
      query: (body) => ({
        url: "/register",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Wishlist", "Cart", "user"],
    }),
    logout: builder.query({
      query: (token) => ({
        url: "/logout",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Wishlist", "Cart", "user"],
    }),
    getUser: builder.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    updateUser: builder.mutation({
      query: (body) => ({
        url: "/user/update",
        method: "POST",
        body,
      }),
      invalidatesTags: ["user"],
    }),
    deleteWishlist: builder.mutation({
      query: (id, token) => ({
        url: `/wishlist/remove/${id}`,
        method: "delete",
      }),
      invalidatesTags: ["Wishlist"],
    }),
    addToWishlist: builder.mutation({
      query: (body) => ({
        url: "/wishlist/add",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Wishlist"],
    }),
    // promotional product
    getPromotionalProduct: builder.query({
      query: () => ({
        url: "/promotional-products",
        method: "GET",
      }),
    }),
    //   cart
    getCart: builder.query({
      query: () => ({
        url: "/cart",
        method: "GET",
      }),
      providesTags: ["Cart"],
    }),
    addToCart: builder.mutation({
      query: (body) => ({
        url: "/cart/add",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Cart"],
    }),
    updateCart: builder.mutation({
      query: (body) => ({
        url: "/cart/update",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Cart"],
    }),
    deleteCart: builder.mutation({
      query: (id) => ({
        url: "/cart/remove/" + id,
        method: "delete",
      }),
      invalidatesTags: ["Cart"],
    }),
    //   site settings
    getSiteSettings: builder.query({
      query: () => ({
        url: "/site-settings",
      }),
    }),
    //   seo
    getSeo: builder.query({
      query: () => ({
        url: "/seo-settings",
      }),
    }),
    //   address
    getDivision: builder.query({
      query: () => ({
        url: "/divisions",
      }),
    }),
    getCity: builder.query({
      query: (id) => ({
        url: "/city/" + id,
      }),
    }),
    getArea: builder.query({
      query: (id) => ({
        url: "/area/" + id,
      }),
    }),
    // address
    getAddress: builder.query({
      query: () => ({
        url: "/address",
      }),
      providesTags: ["address"],
    }),
    addAddress: builder.mutation({
      query: (body) => ({
        url: "/address/store",
        method: "POST",
        body,
      }),
      invalidatesTags: ["address"],
    }),
    editAddress: builder.query({
      query: (id) => ({
        url: "/address/edit/" + id,
      }),
      providesTags: ["address"],
    }),
    updateAddress: builder.mutation({
      query: (args) => ({
        url: `/address/update/${args.id}`,
        method: "POST",
        body: args.data,
      }),
      invalidatesTags: ["address"],
    }),
    deleteAddress: builder.mutation({
      query: (id) => ({
        url: `/address/delete/${id}`,
        method: "delete",
      }),
      invalidatesTags: ["address"],
    }),
    selectedAddress: builder.query({
      query: () => ({
        url: `/address/selected-address`,
        method: "GET",
      }),
    }),
    changePassword: builder.mutation({
      query: (body) => ({
        url: "/user/change-password",
        method: "POST",
        body,
      }),
    }),
    //   order start
    getDeliveryOptions: builder.query({
      query: () => ({
        url: "/delivery-options",
      }),
    }),
    getPaymentMethods: builder.query({
      query: () => ({
        url: "/payment-methods",
      }),
    }),
    getVoucherCode: builder.mutation({
      query: (params) => ({
        url: `/voucher-discount`,
        method: "GET",
        params: {
          code: params.code,
          amount: params.amount,
        },
      }),
    }),
    orderFromBuyNow: builder.mutation({
      query: (body) => ({
        url: `/make-order`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Cart", "orderList", "products"],
    }),
    getOrderList: builder.query({
      query: () => ({
        url: "/order-list",
      }),
      providesTags: ["orderList"],
    }),
    getSelectedProduct: builder.mutation({
      query: () => ({
        url: "/cart/selected-product",
      }),
    }),
    //   order end
    //   review start
    addReview: builder.mutation({
      query: (body) => ({
        url: "/product/add-review",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Review"],
    }),
    getReview: builder.query({
      query: (id) => ({
        url: `/product/review/${id}`,
      }),
      providesTags: ["Review"],
    }),
    getTotalReview: builder.query({
      query: (id) => ({
        url: `/product/total-review/${id}`,
      }),
      providesTags: ["Review"],
    }),
    //   review end
    //   product suggestion
    getProductSuggestion: builder.query({
      query: (name) => ({
        url: `/search-suggestions/${name}`,
      }),
    }),
    guestCartList: builder.query({
      query: (id) => ({
        url: "/guest-cart/list/" + getCookie("guest_id"),
        method: "GET",
      }),
      providesTags: ["GuestCart"],
    }),
    guestAddToCart: builder.mutation({
      query: (body) => ({
        url: "/guest-cart/add",
        method: "POST",
        body,
      }),
      invalidatesTags: ["GuestCart"],
    }),
    updateGuestCart: builder.mutation({
      query: (body) => ({
        url: "/guest-cart/update",
        method: "POST",
        body,
      }),
      invalidatesTags: ["GuestCart"],
    }),
    selectedGuestCart: builder.mutation({
      query: () => ({
        url: `/guest-cart/selected-product/${getCookie("guest_id")}`,
      }),
    }),
    deleteGuestCart: builder.mutation({
      query: (body) => ({
        url: "/guest-cart/delete",
        method: "POST",
        body,
      }),
      invalidatesTags: ["GuestCart"],
    }),
    guestOrderFromBuyNow: builder.mutation({
      query: (body) => ({
        url: `/guest-order/buy-now`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["GuestCart", "orderList", "products"],
    }),
    guestOrderFromCart: builder.mutation({
      query: (body) => ({
        url: `guest-order/cart/buy-now`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["GuestCart", "orderList", "products"],
    }),
    shippingCharge: builder.mutation({
      query: (body) => ({
        url: `/shipping-charges/${body}`,
        method: "GET",
      }),
    }),
    createGuestUser: builder.mutation({
      query: (body) => ({
        url: `/create-guest-user`,
        method: "POST",
        body,
      }),
    }),
    getSubCategory: builder.query({
      query: () => ({
        url: "/categories/subcategory",
        method: "GET",
      }),
    }),
    //   products
    getProductDetails: builder.query({
      query: (slug) => ({
        url: `/product/details/${slug}`,
      }),
      providesTags: ["products"],
    }),
    getRelatedProducts: builder.query({
      query: () => ({
        url: `/product/related`,
      }),
      providesTags: ["products"],
    }),
    getProducts: builder.query({
      query: (params) => ({
        url: `/product`,
        params,
      }),
    }),
    getProductMeta: builder.query({
      query: (category) => ({
        url: `/product-meta/category/${category}`,
      }),
      providesTags: ["products"],
    }),
    getProductByBrand: builder.query({
      query: (brand) => ({
        url: `/product/get-product-by-brand/${brand}`,
      }),
      providesTags: ["products"],
    }),
    calculateProductPrice: builder.mutation({
      query: (body) => ({
        url: `/product/calculate_product_price`,
        method: "POST",
        body,
      }),
    }),
    getDynamicProductData: builder.query({
      query: () => ({
        url: `/dynamic-section`,
      }),
      providesTags: ["products"],
    }),
  }),
});
// guest user
export const {
  useGoogleLoginMutation,
  useLogoutQuery,
  useLoginMutation,
  useRegisterMutation,
  useSendOtpMutation,
  useVerifyOtpMutation,
  useResetPasswordMutation,
  useGetWishlistQuery,
  useDeleteWishlistMutation,
  useAddToWishlistMutation,
  useGetCartQuery,
  useAddToCartMutation,
  useUpdateCartMutation,
  useDeleteCartMutation,
  useGetSiteSettingsQuery,
  useUpdateUserMutation,
  useGetDivisionQuery,
  useGetCityQuery,
  useGetAreaQuery,
  useGetAddressQuery,
  useAddAddressMutation,
  useSelectedAddressQuery,
  useEditAddressQuery,
  useDeleteAddressMutation,
  useUpdateAddressMutation,
  useChangePasswordMutation,
  useGetDeliveryOptionsQuery,
  useGetPaymentMethodsQuery,
  useGetVoucherCodeMutation,
  useOrderFromBuyNowMutation,
  useGetSelectedProductMutation,
  useGetOrderListQuery,
  useAddReviewMutation,
  useGetReviewQuery,
  useGetTotalReviewQuery,
  useGetSeoQuery,
  useGetUserQuery,
  useGetProductSuggestionQuery,
  useGuestAddToCartMutation,
  useGuestCartListQuery,
  useUpdateGuestCartMutation,
  useDeleteGuestCartMutation,
  useGuestOrderFromBuyNowMutation,
  useShippingChargeMutation,
  useSelectedGuestCartMutation,
  useGuestOrderFromCartMutation,
  useCreateGuestUserMutation,
  useGetPromotionalProductQuery,
  useGetSubCategoryQuery,
  useGetProductDetailsQuery,
  useGetRelatedProductsQuery,
  useGetProductsQuery,
  useGetProductMetaQuery,
  useGetProductByBrandQuery,
  useGetDynamicProductDataQuery,
  useGetProductDataQuery,
  // useGetRelatedProductsQuery,
  useCalculateProductPriceMutation,
} = authApi;
