import { configureStore } from '@reduxjs/toolkit'
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query'
import { productsApi, oneProductApi } from './productsApi'
import counterReducer from './cartSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [oneProductApi.reducerPath]: oneProductApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
   getDefaultMiddleware().concat(productsApi.middleware).concat(oneProductApi.middleware)
})

setupListeners(store.dispatch)