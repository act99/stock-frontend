import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import React from "react";
import { StockChart } from "../components/stock-chart";
import { frontStockQuery } from "./__generated__/frontStockQuery";

export const Stock = () => {
  const { data, loading } = useQuery<frontStockQuery>(STOCK_QUERY, {
    variables: {},
  });

  const stockOpen = data?.gsStock.map((item) => item.open);
  const stockClose = data?.gsStock.map((item) => item.open);
  const stockVolume = data?.gsStock.map((item) => item.volume);
  const stockDate = data?.gsStock.map((item) => item.date);
  const openArray: number[] = [];
  const closeArray: number[] = [];
  const volumeArray: number[] = [];
  const dateArray: string[] = [];
  stockOpen?.forEach((open) => openArray.push(open));
  stockClose?.forEach((close) => closeArray.push(close));
  stockVolume?.forEach((volume) => volumeArray.push(volume));
  stockDate?.forEach((date) => dateArray.push(date.toString()));
  console.log(stockDate);

  // const stockData = data?.gsStock.map((item) => item);
  // const dataArray: any[] = [];
  // dataArray.push(stockData);
  // console.log(dataArray);
  return (
    <div>
      {!loading ? (
        <StockChart
          openArray={openArray}
          closeArray={closeArray}
          volumeArray={volumeArray}
          dateArray={dateArray}
        />
      ) : (
        <h3>Loading...</h3>
      )}

      {/* <StockChart open={openArray} close={closeArray} volume={volumeArray} /> */}
      {/* <div key={data?.gsStock.find(d1)}></div> */}
      {/* {data?.gsStock.map((stock) => (
        <div>
          <h1>{stock.open}</h1>
        </div>
      ))} */}
    </div>
  );
};

const STOCK_QUERY = gql`
  query frontStockQuery {
    gsStock {
      index
      date
      check_item
      code
      code_name
      d1_diff_rate
      close
      open
      high
      low
      volume
      clo5
      clo10
      clo20
      clo40
      clo60
      clo80
      clo100
      clo120
      clo5_diff_rate
      clo10_diff_rate
      clo20_diff_rate
      clo40_diff_rate
      clo60_diff_rate
      clo80_diff_rate
      clo100_diff_rate
      clo120_diff_rate
      yes_clo5
      yes_clo10
      yes_clo20
      yes_clo40
      yes_clo60
      yes_clo80
      yes_clo100
      yes_clo120
      vol5
      vol10
      vol20
      vol40
      vol60
      vol80
      vol100
      vol120
    }
  }
`;
