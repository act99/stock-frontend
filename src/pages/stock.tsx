import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import React from "react";
import { ChartPage } from "../components/chart";
import { HandmadeChart } from "../components/handmade-chart";
import { StockChart } from "../components/stock-chart";
import { frontStockQuery } from "./__generated__/frontStockQuery";

export const Stock = () => {
  const { data, loading } = useQuery<frontStockQuery>(STOCK_QUERY, {
    variables: {},
  });

  const stockOpen = data?.gsStock.map((item) => item.open);
  const openArray: number[] = [];
  stockOpen?.forEach((open) => openArray.push(open));

  const stockClose = data?.gsStock.map((item) => item.close);
  const closeArray: number[] = [];
  stockClose?.forEach((close) => closeArray.push(close));

  const stockVolume = data?.gsStock.map((item) => item.volume);
  const volumeArray: number[] = [];
  stockVolume?.forEach((volume) => volumeArray.push(volume));

  const stockDate = data?.gsStock.map((item) => item.date);
  const dateArray: string[] = [];
  stockDate?.forEach((date) => dateArray.push(date.toString()));

  const stockHigh = data?.gsStock.map((item) => item.high);
  const highArray: number[] = [];
  stockHigh?.forEach((high) => highArray.push(high));

  const stockLow = data?.gsStock.map((item) => item.low);
  const lowArray: number[] = [];
  stockLow?.forEach((low) => lowArray.push(low));

  const stockName = data?.gsStock.map((item) => item.code_name);
  const nameArray: string[] = [];
  stockName?.forEach((name) => nameArray.push(name));
  // const;

  // const date = ["20200101", "20200102", "20200103", "20200104"];
  // const open = [10000, 12000, 11000, 13000];
  // const close = [12000, 11000, 12800, 11800];
  // const high = [12800, 12000, 13200, 13800];
  // const low = [9900, 10000, 11000, 11500];
  // const volume = [120542, 184232, 542153, 234532];
  // const stockData = data?.gsStock.map((item) => item);
  // const dataArray: any[] = [];
  // dataArray.push(stockData);
  // console.log(dataArray);
  return (
    <div>
      {/* {!loading ? (
        <ChartPage
          openArray={openArray}
          closeArray={closeArray}
          highArray={highArray}
          lowArray={lowArray}
          dateArray={dateArray}
        />
      ) : (
        <h3>Loading...</h3>
      )} */}
      <div>
        <HandmadeChart
          date={dateArray}
          open={openArray}
          close={closeArray}
          high={highArray}
          low={lowArray}
          volume={volumeArray}
          name={nameArray}
        />
      </div>

      {/* {!loading ? (
        <StockChart
          openArray={openArray}
          closeArray={closeArray}
          volumeArray={volumeArray}
          dateArray={dateArray}
        />
      ) : (
        <h3>Loading...</h3>
      )} */}

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
