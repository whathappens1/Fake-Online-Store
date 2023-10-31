import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  selectedProducts: localStorage.getItem("selectedProducts") ? JSON.parse(localStorage.getItem("selectedProducts")) : [],
  selectedProductsID: localStorage.getItem("selectedProductsID") ? JSON.parse(localStorage.getItem("selectedProductsID")) : [],
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.selectedProducts.push({ ...action.payload, quantity: 1 })
      state.selectedProductsID.push(action.payload.id)

      localStorage.setItem("selectedProducts", JSON.stringify(state.selectedProducts))
      localStorage.setItem("selectedProductsID", JSON.stringify(state.selectedProductsID))
    },


    increaseQuantity: (state, action) => {
      const increasedProduct = state.selectedProducts.find((item) => {
        return item.id === action.payload
      })
      if (increasedProduct.quantity < 10) {
        increasedProduct.quantity += 1
      }

      localStorage.setItem("selectedProducts", JSON.stringify(state.selectedProducts))
    },
    decreaseQuantity: (state, action) => {
      const decreasedProduct = state.selectedProducts.find((item) => {
        return item.id === action.payload
      })
      decreasedProduct.quantity -= 1

      if (decreasedProduct.quantity === 0) {
        const newArr = state.selectedProducts.filter((item) => {
          return item.id !== decreasedProduct.id
        })
        const newArr2 = state.selectedProductsID.filter((item) => {
          return item !== decreasedProduct.id
        })
        state.selectedProducts = newArr
        state.selectedProductsID = newArr2

        localStorage.setItem("selectedProductsID", JSON.stringify(state.selectedProductsID))
      }

      localStorage.setItem("selectedProducts", JSON.stringify(state.selectedProducts))
    },
    deleteFromCart: (state, action) => {
      const decreasedProduct = state.selectedProducts.find((item) => {
        return item.id === action.payload
      })
      const newArr = state.selectedProducts.filter((item) => {
        return item.id !== decreasedProduct.id
      })
      const newArr2 = state.selectedProductsID.filter((item) => {
        return item !== decreasedProduct.id
      })
      state.selectedProducts = newArr
      state.selectedProductsID = newArr2

      localStorage.setItem("selectedProducts", JSON.stringify(state.selectedProducts))
      localStorage.setItem("selectedProductsID", JSON.stringify(state.selectedProductsID))
    },
  },
})

// Action creators are generated for each case reducer function
export const { addToCart, decreaseQuantity, increaseQuantity, deleteFromCart } = counterSlice.actions
export default counterSlice.reducer