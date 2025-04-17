
import { createSlice } from "@reduxjs/toolkit";

const initialState = {

  language: "en", 
  direction: "LTR" 
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setLanguage(state, action) {
      state.language = action.payload;
      state.direction = action.payload === "ar" ? "RTL" : "LTR";
    }
  }
});

export const {  setLanguage } = uiSlice.actions;
export default uiSlice.reducer;
