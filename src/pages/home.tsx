import React from "react";
import LoadingComponent from "../components/loader";
import { CoinTable } from "../components/table/cointable";
import { useGetCryptosQuery } from "../services/cryptoApi";

type ColumnProps = {
  value: string;
};

export const Home = () => {
  const { data, isLoading, error } = useGetCryptosQuery("coins");
  const globalStats = data?.data?.stats;

  const columns = [
    {
      Header: "",
      accessor: "iconUrl",
      Cell: ({ value }: ColumnProps) => (
        <img src={value} width={30} height={30} />
      ),
    },
    {
      Header: "name",
      accessor: "name",
    },
    {
      Header: "change",
      accessor: "change",
    },
    {
      Header: "price",
      accessor: "price",
    },
    {
      Header: "symbol",
      accessor: "symbol",
    },
    {
      Header: "volume",
      accessor: "volume",
    },
  ];

  const tableData = data?.data?.coins;

  if (isLoading) {
    return <LoadingComponent />;
  }
  return (
    <div className="flex flex-col bg-gray-200">
      <CoinTable columns={columns} data={tableData} />
    </div>
  );
};
