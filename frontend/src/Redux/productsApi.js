// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Get All Data
export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://fakeonlinestore.onrender.com/' }),
  endpoints: (builder) => ({
    getproductsByName: builder.query({
      query: (name) => `products`,
    }),
  }),
})

// Get one Product "Only"
export const oneProductApi = createApi({
  reducerPath: 'oneProductApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://fakeonlinestore.onrender.com/' }),
  endpoints: (builder) => ({
    getOneProduct: builder.query({
      query: (name) => `products/${name}`,
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetOneProductQuery } = oneProductApi
export const { useGetproductsByNameQuery } = productsApi
