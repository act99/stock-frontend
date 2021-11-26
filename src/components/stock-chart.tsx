import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {
  frontStockQuery,
  frontStockQuery_gsStock,
} from "../pages/__generated__/frontStockQuery";
import { StockTypes } from "../types";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: false,
      text: ``,
    },
  },
};

export const StockChart: React.FC<frontStockQuery> = ({ gsStock }) => {
  const generateChartData = () => {
    const stockData: any[] = [];
    const openData: any[] = [];
    const closeData: number[] = [];
    const volume: number[] = [];

    gsStock.map((item) => console.log([item.open]));
    //   console.log();
    // gsStock.map((item) => item.open);
    // gsStock.forEach((stock) => {
    //   stock
    // });
    // console.log(stockData);
    return {
      label: "gs 주식",
      datasets: [
        {
          label: "라벨",
          data: gsStock.map((item) => item.open),
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
      ],
    };
  };
  return (
    <div>
      <Bar options={options} data={generateChartData()}></Bar>
    </div>
  );
};
