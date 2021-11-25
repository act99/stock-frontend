import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import React from "react";
import { frontStockQuery } from "./__generated__/frontStockQuery";

export const Stock = ({}) => {
  const { data, loading } = useQuery<frontStockQuery>(STOCK_QUERY, {
    variables: {},
  });
  console.log(data);
  return <div></div>;
};

// type StockTypes = {
//   index: number;
//   date: number;
//   check_item: string;
//   code: number;
//   code_name: string;
//   d1_diff_rate: number;
//   close: number;
//   open: number;
//   high: number;
//   low: number;
//   volume: number;
//   clo5: number;
//   clo10: number;
//   clo20: number;
//   clo40: number;
//   clo60: number;
//   clo80: number;
//   clo100: number;
//   clo120: number;
//   clo5_diff_rate: number;
//   clo10_diff_rate: number;
//   clo20_diff_rate: number;
//   clo40_diff_rate: number;
//   clo60_diff_rate: number;
//   clo80_diff_rate: number;
//   clo100_diff_rate: number;
//   clo120_diff_rate: number;
//   yes_clo5: number;
//   yes_clo10: number;
//   yes_clo20: number;
//   yes_clo40: number;
//   yes_clo60: number;
//   yes_clo80: number;
//   yes_clo100: number;
//   yes_clo120: number;
//   vol5: number;
//   vol10: number;
//   vol20: number;
//   vol40: number;
//   vol60: number;
//   vol80: number;
//   vol100: number;
//   vol120: number;
// };

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
