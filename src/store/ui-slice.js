import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: { cartIsVisible: false, billIsVisible: false },
  reducers: {
    toggle(state) {
      state.cartIsVisible = !state.cartIsVisible;
    },
    showBill(state) {
      setTimeout(() => {
        state.billIsVisible = true;
      }, 5000);
      state.billIsVisible = false;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
