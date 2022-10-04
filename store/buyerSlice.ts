import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import { IInitialStateBuyer } from "@/utils/Types";
import request from "@/utils/helper/axiosReq";

const initialState: IInitialStateBuyer = {
  loading: false,
  data: [],
  error: undefined,
};

export const getDataBuyers = createAsyncThunk(
  "buyer/getDataBuyers",
  async () => {
    const response = await request("get", "/Buyers");
    return response.data;
  }
);

export const buyers = createSlice({
  name: "buyers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDataBuyers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDataBuyers.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getDataBuyers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default buyers.reducer;
