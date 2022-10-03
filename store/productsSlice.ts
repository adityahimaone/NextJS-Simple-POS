import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Products } from "@/utils/Constans";
import { IIntialStateProducts } from "@/utils/Types";

const initialState: IIntialStateProducts = {
  loading: false,
  data: Products,
  error: undefined,
};

export const products = createSlice({
  name: "products",
  initialState,
  reducers: {},
});

export default products.reducer;
