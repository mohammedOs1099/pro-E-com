import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], // { id, title, price, quantity هتكون مع الكارت بس , max, ... }
  totalPrice: 0
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const product = action.payload;
      const existing = state.items.find(item => item.id === product.id);

      if (existing) {
        // لو الكمية الموجودة أقل من الكمية المتوفرة للمنتج، نزود الكمية
        if (existing.quantity < product.max) {
          existing.quantity += 1;
        }
      } else {
        // لو مش موجود في الكارت و لو الكمية المتوفرة أكبر من صفر، نضيفه بكمية 1
        if (product.max > 0) {
          state.items.push({ ...product, quantity: 1 });
        }
      }

      state.totalPrice = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    },

    increaseQuantity(state, action) {
      const id = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item && item.quantity < item.max) {
        item.quantity += 1;
      }
      state.totalPrice = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    },

    decreaseQuantity(state, action) {
      const id = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
      state.totalPrice = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    },

    removeFromCart(state, action) {
      const id = action.payload;
      state.items = state.items.filter(item => item.id !== id);
      state.totalPrice = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    },

    clearCart(state) {
      state.items = [];
      state.totalPrice = 0;
    }
  }
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart
} = cartSlice.actions;

export default cartSlice.reducer;
