import React, { useState } from "react";
import { useAsyncDebounce, useGlobalFilter, useTable } from "react-table";

type Props = {
  columns: any;
  data: any;
};

export const CoinTable: React.FC<Props> = ({ columns, data }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
      },
      useGlobalFilter
    );
  return (
    <>
      {/* <GlobalFilter
        preGlobalFilteredRows={preGlobalFilteredRows}
        globalFilter={state.globalFilter}
        setGlobalFilter={setGlobalFilter}
      /> */}
      <table
        {...getTableProps()}
        style={{
          // border: "1",
          borderWidth: "1px",
          borderColor: "#000000",
          borderStyle: "solid",
          textAlign: "center",
        }}
      >
        <thead>
          {headerGroups.map((headerGroups) => (
            <tr {...headerGroups.getHeaderGroupProps()}>
              {headerGroups.headers.map((columns) => (
                <th {...columns.getHeaderProps()}>
                  {columns.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

// type filterProps = {
//   preGlobalFilteredRows: any;
//   globalFilter: any;
//   setGlobalFilter: any;
// };

// const GlobalFilter: React.FC<filterProps> = ({
//   preGlobalFilteredRows,
//   globalFilter,
//   setGlobalFilter,
// }) => {
//   const count = preGlobalFilteredRows.length;
//   const [value, setValue] = useState(globalFilter);
//   const onChange = useAsyncDebounce((value) => {
//     setGlobalFilter(value || undefined);
//   }, 200);
//   // useAsyncDebounce 를 사용하면 입력 주기가 끝난 후 출력이 된다.
//   return (
//     <span>
//       Search:{" "}
//       <input
//         value={value || ""}
//         onChange={(e) => {
//           setValue(e.target.value);
//           onChange(e.target.value);
//         }}
//         placeholder={`${count} records...`}
//       />
//     </span>
//   );
// };
