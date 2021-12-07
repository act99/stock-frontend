import { configureStore } from "@reduxjs/toolkit";
import {
  cryptoApi,
  cryptoCompareHistoryApi,
  cryptoHistoryApi,
} from "../services/cryptoApi";

export default configureStore({
  reducer: {
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    [cryptoHistoryApi.reducerPath]: cryptoHistoryApi.reducer,
    [cryptoCompareHistoryApi.reducerPath]: cryptoCompareHistoryApi.reducer,
  },
});
