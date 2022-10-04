import {
  configureStore,
  ThunkAction,
  Action,
  AnyAction,
} from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { createLogger } from "redux-logger";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk, { ThunkDispatch } from "redux-thunk";

import productsReducer from "./productsSlice";
import cartsReducer from "./cartSlice";
import buyersReducer from "./buyerSlice";
import transactionsReducer from "./transactionsSlice";
import summaryReducer from "./summarySlice";

const logger = createLogger();

const persistConfig = {
  key: "root",
  storage,
};

const reducers = combineReducers({
  products: productsReducer,
  carts: cartsReducer,
  buyers: buyersReducer,
  transactions: transactionsReducer,
  summary: summaryReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk, logger],
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
