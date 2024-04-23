import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const videoReviews = createApi({
  reducerPath: 'videoReviews',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
  }),
  endpoints: (builder) => ({
    getVideoReviews: builder.query({
      query: () => '/video-review',
    }),
  }),
});
export const { useGetVideoReviewsQuery } = videoReviews;
