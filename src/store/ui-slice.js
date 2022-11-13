import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: { cartIsVisible: false, billIsVisible: false },
  reducers: {
    toggle(state) {
      state.cartIsVisible = !state.cartIsVisible;
    },
    showBill(state) {
      state.billIsVisible = true;
    },
    hideBill(state) {
      state.billIsVisible = false;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
