import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  items: [],
  totalQuantity: 0,
  totalCharge: 0,
  changed: false,
  sendOrder: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  //   items: [],
  //   totalQuantity: 0,
  //   totalPrice: 0,
  //   changed: false,
  // },
  reducers: {
    replaceCart: (state, action) => {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
      state.totalCharge = action.payload.totalCharge;
    },
    addItemToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      state.changed = true;
      state.sendOrder = false;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          title: newItem.title,
        });
        state.totalCharge += newItem.price;
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
        state.totalCharge += newItem.price;
      }
    },
    removeItemFromCart: (state, action) => {
      const removeItemId = action.payload;
      const existingItem = state.items.find((item) => item.id === removeItemId);
      state.totalQuantity--;
      state.changed = true;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== removeItemId);
        state.totalCharge = state.totalCharge - existingItem.price;
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
        state.totalCharge = state.totalCharge - existingItem.totalPrice;
      }
    },
    emptyCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalCharge = 0;
      state.changed = true;
      state.sendOrder = true;
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
