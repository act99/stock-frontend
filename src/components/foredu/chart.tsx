import React from "react";

import { Chart } from "react-google-charts";

type Props = {
  openArray: number[];
  closeArray: number[];
  highArray: number[];
  lowArray: number[];
  dateArray: string[];
};

export const ChartPage: React.FC<Props> = ({
  dateArray,
  openArray,
  highArray,
  lowArray,
  closeArray,
}) => {
  const totalArray: any[] = [["day", "a", "b", "c", "d"]];
  console.log(lowArray);

  for (let i = 0; i < dateArray.length; i++) {
    totalArray.push([
      dateArray[i],
      highArray[i],
      openArray[i],
      closeArray[i],
      lowArray[i],
    ]);
  }
  console.log(totalArray);
  return (
    <>
      <div>
        <Chart
          width={"100%"}
          height={800}
          chartType="CandlestickChart"
          loader={<div>Loading Chart</div>}
          data={totalArray}
          options={{
            legend: "none",
          }}
          rootProps={{ "data-testid": "1" }}
        />
      </div>
    </>
  );
};
