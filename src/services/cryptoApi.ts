import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoApiHeaders = {
  "x-rapidapi-host": "coinranking1.p.rapidapi.com",
  "x-rapidapi-key": process.env.REACT_APP_CRYPTO_API_KEY,
};

const baseUrl = "https://coinranking1.p.rapidapi.com";

const createRequest = (url: string) => ({ url, headers: cryptoApiHeaders });

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (name) => createRequest(`/${name}`),
    }),
  }),
});

export const cryptoHistoryApi = createApi({
  reducerPath: "cryptoHistoryApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptosHistory: builder.query({
      query: (id) => createRequest(`/coin/${id}/history/7d`),
    }),
  }),
});

export const { useGetCryptosQuery } = cryptoApi;
export const { useGetCryptosHistoryQuery } = cryptoHistoryApi;
