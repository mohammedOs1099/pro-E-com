import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  users: []
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    //   signup
    register(state, action) {
      const newUser = action.payload;

      const exists = state.users.find(
        existingUser => existingUser.username === newUser.username
      );

      if (!exists) {
        state.users.push(newUser);
      }
    },
    // signin
    login(state, action) {
      const { username, password } = action.payload;
      const existingUser = state.users.find(
        user => user.username === username && user.password === password
      );

      if (existingUser) {
        state.user = existingUser;
      }
    },
    // logout
    logout(state) {
      state.user = null;
    }
  }
});

export const { register, login, logout } = authSlice.actions;
export default authSlice.reducer;
