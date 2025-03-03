import { VITE_API } from "@/shared/envs";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

export interface CustomerDto {
  address?: string;

  phone?: string;

  departamento?: string;

  country?: string;

  zipcode?: string;
}

export const customerApi = createApi({
  reducerPath: "customerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: VITE_API,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.accessToken;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    updateCustomer: builder.mutation<any, CustomerDto>({
      query: (customerDto) => ({
        url: "customer",
        body: customerDto,
        method: "PATCH",
      }),
    }),
  }),
});


export const { useUpdateCustomerMutation } = customerApi;