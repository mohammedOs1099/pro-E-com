import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  orders: []
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addOrder: (state, action) => {
      const newOrder = {
        id: uuidv4(),
        items: action.payload.items,
        totalPrice: action.payload.totalPrice,
        status: "Pending",
        createdAt: new Date().toISOString(),
        userID: action.payload.userID
      };
      state.orders.push(newOrder);
    },

    updateOrderStatus: (state, action) => {
      const { id, status } = action.payload;
      const order = state.orders.find(o => o.id === id);
      if (order) {
        order.status = status;
      }
    },

    deleteOrder: (state, action) => {
      state.orders = state.orders.filter(order => order.id !== action.payload);
    }
  }
});

export const { addOrder, updateOrderStatus, deleteOrder } = orderSlice.actions;
export default orderSlice.reducer;
