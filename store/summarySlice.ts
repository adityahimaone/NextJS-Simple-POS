import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import { IInitialStateSummary } from "@/utils/Types";
import request from "@/utils/helper/axiosReq";

const initialState: IInitialStateSummary = {
  loading: false,
  data: {} as any,
  error: undefined,
};

export const getDataSummary = createAsyncThunk(
  "summary/getDataSummary",
  async () => {
    const response = await request("get", "/Summary");
    return response.data;
  }
);

export const summary = createSlice({
  name: "summary",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDataSummary.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getDataSummary.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(getDataSummary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default summary.reducer;
