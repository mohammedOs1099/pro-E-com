// src/store/slices/productSlice.js
import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  products: [],
  filter: {
    category: "all",
    priceRange: [0, Infinity],// أو مثلاً [0, 100]
    keyword: ""
  }
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
      state.filteredProducts = action.payload;
    },
    addProduct: (state, action) => {
      state.products.push(action.payload);
      state.filteredProducts = state.products;
    },
    updateProduct: (state, action) => {
      const index = state.products.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
        state.filteredProducts = state.products;
      }
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter(p => p.id !== action.payload);
      state.filteredProducts = state.products;
    },
    setCategoryFilter(state, action) {
      state.filter.category = action.payload;
    },
    setPriceFilter(state, action) {
      state.filter.priceRange = action.payload;
    },
    setKeyword(state, action) {
      state.filter.keyword = action.payload;
    }
  }
});

export const {setKeyword, setProducts, addProduct, updateProduct, deleteProduct, setCategoryFilter, setPriceFilter } = productSlice.actions;

export default productSlice.reducer;
