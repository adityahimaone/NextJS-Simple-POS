import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import { ITransaction, IInitialStateTransaction } from "@/utils/Types";
import request from "@/utils/helper/axiosReq";

const initialState: IInitialStateTransaction = {
  loading: false,
  data: [],
  error: undefined,
};

export const getDataTransactions = createAsyncThunk(
  "transaction/getDataTransactions",
  async () => {
    const response = await request("get", "/Transaction");
    return response.data;
  }
);

export const postDataTransaction = createAsyncThunk(
  "transaction/postDataTransaction",
  async (payload: ITransaction) => {
    const response = await request("post", "/Transaction", payload);
    return response.data;
  }
);

export const transactions = createSlice({
  name: "transactions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDataTransactions.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getDataTransactions.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(getDataTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
    builder
      .addCase(postDataTransaction.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        postDataTransaction.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data.push(action.payload);
        }
      )
      .addCase(postDataTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default transactions.reducer;
