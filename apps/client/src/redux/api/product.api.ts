import { Category, ProductResponse } from "@/models/product-interface";
import { VITE_API } from "@/shared/envs";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: VITE_API,
  }),
  endpoints: (builder) => ({
    getProducts: builder.query<ProductResponse, void>({
      query: () => ({
        url: "product",
        method: "GET",
      }),
    }),
    getCategories: builder.query<Category[], void>({
      query: () => ({
        url: "categories",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetProductsQuery, useGetCategoriesQuery } = productApi;
