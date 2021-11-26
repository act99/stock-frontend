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

type Props = {
  openArray: number[];
  closeArray: number[];
  volumeArray: number[];
  dateArray: string[];
};

export const StockChart: React.FC<Props> = ({
  openArray,
  closeArray,
  volumeArray,
  dateArray,
}) => {
  const generateChartData = () => {
    console.log(openArray);
    //   console.log();
    // gsStock.map((item) => item.open);
    // gsStock.forEach((stock) => {
    //   stock
    // });
    // console.log(stockData);
    return {
      labels: dateArray,
      datasets: [
        {
          label: "굿굿",
          data: dateArray.map(() => {
            return [openArray, closeArray];
          }),
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
      ],
    };
  };
  return (
    <div>
      <Bar options={options} data={generateChartData()} />
    </div>
  );
};
