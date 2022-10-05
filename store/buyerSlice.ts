import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { IInitialStateBuyer, IBuyer } from '@/utils/Types';
import request from '@/utils/helper/axiosReq';

const initialState: IInitialStateBuyer = {
  loading: false,
  data: [],
  error: undefined,
};

export const getDataBuyers = createAsyncThunk('buyer/getDataBuyers', async () => {
  const response = await request('get', '/Buyers');
  return response.data;
});

export const getDataBuyerById = createAsyncThunk('buyer/getDataBuyerById', async (id: string) => {
  const response = await request('get', `/Buyers/${id}`);
  return response.data;
});

export const addDataBuyer = createAsyncThunk('buyer/addDataBuyer', async (buyer: any) => {
  const response = await request('post', '/Buyers', buyer);
  return response.data;
});

export const editDataBuyer = createAsyncThunk('buyer/editDataBuyer', async (buyer: any) => {
  const response = await request('put', `/Buyers/${buyer.id}`, buyer);
  return response.data;
});

export const deleteDataBuyer = createAsyncThunk('buyer/deleteDataBuyer', async (id: string) => {
  const response = await request('delete', `/Buyers/${id}`);
  return response.data;
});

export const buyers = createSlice({
  name: 'buyers',
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
    builder
      .addCase(getDataBuyerById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDataBuyerById.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
      })
      .addCase(getDataBuyerById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
    builder
      .addCase(addDataBuyer.pending, (state) => {
        state.loading = true;
      })
      .addCase(addDataBuyer.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data.push(action.payload);
      })
      .addCase(addDataBuyer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
    builder
      .addCase(editDataBuyer.pending, (state) => {
        state.loading = true;
      })
      .addCase(editDataBuyer.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        const index = state.data.findIndex((item: IBuyer) => item.id === action.payload.id);
        state.data[index] = action.payload;
      })
      .addCase(editDataBuyer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
    builder
      .addCase(deleteDataBuyer.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteDataBuyer.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        const index = state.data.findIndex((item: IBuyer) => item.id === action.payload.id);
        state.data.splice(index, 1);
      })
      .addCase(deleteDataBuyer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default buyers.reducer;
