import React from "react";
import { useGetCryptosHistoryQuery } from "../../services/cryptoApi";

type Props = {
  width: number | undefined;
  height: number | undefined;
};

export const CoinChart: React.FC<Props> = ({ width, height }) => {
  const { data, isLoading, error } = useGetCryptosHistoryQuery("3");
  console.log(data);
  return (
    <div>
      <h3
        className={
          data?.data?.change < 0
            ? "text-red-700 text-center"
            : "text-green-700 text-center"
        }
      >
        {data?.data?.change}%
      </h3>
    </div>
  );
};
