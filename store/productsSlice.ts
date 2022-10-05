import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { IIntialStateProducts, IProduct, IResponse } from '@/utils/Types';
import request from '@/utils/helper/axiosReq';

const initialState: IIntialStateProducts = {
  loading: false,
  data: [],
  dataById: {} as IProduct,
  error: undefined,
};

export const getDataProducts = createAsyncThunk('product/getDataProducts', async () => {
  const response = await request('get', '/Items');
  return response.data;
});

export const getDataProductsByID = createAsyncThunk('product/getDataProductByID', async (id: string) => {
  const response = await request('get', `/Items/${id}`);
  return response.data;
});

export const addDataProduct = createAsyncThunk('product/addDataProducts', async (product: IProduct) => {
  const response = await request('post', '/Items', product);
  return response.data;
});

export const editDataProduct = createAsyncThunk('product/editDataProduct', async (product: IProduct) => {
  const response = await request('put', `/Items/${product.id}`, product);
  return response.data;
});

export const deleteDataProduct = createAsyncThunk('product/deleteDataProduct', async (id: string) => {
  const response = await request('delete', `/Items/${id}`);
  return response.data;
});

export const products = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDataProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDataProducts.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getDataProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
    builder
      .addCase(getDataProductsByID.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDataProductsByID.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.dataById = action.payload;
      })
      .addCase(getDataProductsByID.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
    builder
      .addCase(addDataProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(addDataProduct.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data.push(action.payload);
      })
      .addCase(addDataProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
    builder
      .addCase(editDataProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(editDataProduct.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        const index = state.data.findIndex((item: IProduct) => item.id === action.payload.id);
        state.data[index] = action.payload;
      })
      .addCase(editDataProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
    builder
      .addCase(deleteDataProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteDataProduct.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        const index = state.data.findIndex((item: IProduct) => item.id === action.payload.id);
        state.data.splice(index, 1);
      })
      .addCase(deleteDataProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default products.reducer;
