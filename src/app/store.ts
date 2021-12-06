import { configureStore } from "@reduxjs/toolkit";
import { cryptoApi, cryptoHistoryApi } from "../services/cryptoApi";

export default configureStore({
  reducer: {
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    [cryptoHistoryApi.reducerPath]: cryptoHistoryApi.reducer,
  },
});
