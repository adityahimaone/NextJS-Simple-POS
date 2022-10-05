import { createSlice } from "@reduxjs/toolkit";

import { IIntialStateCart } from "@/utils/Types";
import { ICartAdd } from "./types";

const initialState: IIntialStateCart = {
  loading: false,
  data: {
    product: {
      id: "",
      name: "",
      type: "",
      prices: [
        {
          priceFor: "",
          price: 0,
        },
      ],
    },
    amount: 0,
  },
  error: undefined,
};

export const carts = createSlice({
  name: "carts",
  initialState,
  reducers: {
    addCart: (state, action: { payload: ICartAdd }) => {
      const { product, amount } = action.payload;
      if (state.data && state.data.product.id === product.id) {
        state.data.amount += amount;
      } else {
        state.data = { product, amount };
      }
    },
    removeCart: (state, action: { payload: { amount: number } }) => {
      const { amount } = action.payload;
      if (state.data.amount > 0) {
        state.data.amount -= amount;
      }
    },
  },
});

export const { addCart, removeCart } = carts.actions;
export default carts.reducer;
