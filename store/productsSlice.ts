import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import { IIntialStateProducts, IProduct, IResponse } from "@/utils/Types";
import request from "@/utils/helper/axiosReq";

const initialState: IIntialStateProducts = {
  loading: false,
  data: [],
  error: undefined,
};

export const getDataProducts = createAsyncThunk(
  "product/getDataProducts",
  async () => {
    const response = await request("get", "/Items");
    return response.data;
  }
);

export const products = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDataProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getDataProducts.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(getDataProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default products.reducer;
