import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { postsApi } from "../services/posts";
import { videoReviews } from "@/redux/services/videoReviews";
import { bannerApi } from "@/redux/services/banner";
import { popularBrandApi } from "@/redux/services/popularBrand";
import { popularCategoriesApi } from "@/redux/services/popularCategories";
import { categoriesApi } from "@/redux/services/categories";
import { preOrderApi } from "@/redux/services/preOrder";
import { featuredProductByCategoryApi } from "@/redux/services/featuredProductByCategory";
import { featuredBannerByCategory } from "@/redux/services/featureBannerByCategory";
import { newArrivalsApi } from "@/redux/services/newArrivals";
import { warrantyListApi } from "@/redux/services/warrantyList";
import { productApi } from "@/redux/services/product";
import { authApi } from "@/redux/services/auth";
import checkAuth from "../features/checkAuth";
import { wishlistApi } from "@/redux/services/wishlistSlice";
import addressReducer from "../features/selectAddress";

export const store = configureStore({
  reducer: {
    [postsApi.reducerPath]: postsApi.reducer,
    [videoReviews.reducerPath]: videoReviews.reducer,
    [bannerApi.reducerPath]: bannerApi.reducer,
    [popularBrandApi.reducerPath]: popularBrandApi.reducer,
    [popularCategoriesApi.reducerPath]: popularCategoriesApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [preOrderApi.reducerPath]: preOrderApi.reducer,
    [featuredProductByCategoryApi.reducerPath]:
      featuredProductByCategoryApi.reducer,
    [featuredBannerByCategory.reducerPath]: featuredBannerByCategory.reducer,
    [newArrivalsApi.reducerPath]: newArrivalsApi.reducer,
    [warrantyListApi.reducerPath]: warrantyListApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [wishlistApi.reducerPath]: wishlistApi.reducer,
    checkAuth: checkAuth,
    address: addressReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      postsApi.middleware,
      videoReviews.middleware,
      bannerApi.middleware,
      popularBrandApi.middleware,
      popularCategoriesApi.middleware,
      categoriesApi.middleware,
      preOrderApi.middleware,
      featuredProductByCategoryApi.middleware,
      featuredBannerByCategory.middleware,
      newArrivalsApi.middleware,
      warrantyListApi.middleware,
      productApi.middleware,
      authApi.middleware,
      wishlistApi.middleware,
    ]),
});

setupListeners(store.dispatch);
