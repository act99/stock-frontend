import React, { useState } from "react";
import { useGetCryptoCompareHistoryQuery } from "../../services/cryptoApi";
import { dataToArray } from "../../functions/data-to-array";
import { Candle } from "../../components/chart/common/candle";

type Props = {
  width: number | undefined;
  height: number | undefined;
};

export const CoinChart: React.FC<Props> = ({ width, height }) => {
  // const { data, isLoading, error } = useGetCryptosHistoryQuery("1");
  const [name, setName] = useState("BTC");
  const [defaultLimit, setdefaultLimit] = useState(1000);
  const [dataLength, setDataLength] = useState(900);
  const dataDefaultMinusLength = 18;
  const { data, isLoading, error } = useGetCryptoCompareHistoryQuery({
    limit: defaultLimit,
    coin: name,
  });
  const dataArray: any[] | undefined = [];
  const readingData = async () => {
    return !isLoading ? dataArray.push(data.Data.Data) : null;
  };
  readingData();
  const coinDummyArray = dataArray[0];

  const coinArray: any[] = [];
  coinDummyArray
    ?.slice(dataLength, coinDummyArray.length)
    .forEach((item: any) => coinArray.push(Object.values(item)));
  console.log(coinArray);

  const dataWheelHandler = () => {
    window.onwheel = function (e) {
      e.deltaY > 0
        ? setDataLength(
            dataLength < dataDefaultMinusLength
              ? dataLength + 0
              : dataLength - 8
          )
        : setDataLength(
            dataLength > defaultLimit ? dataLength + 0 : dataLength + 8
          );
    };
  };
  const onClickListener = () => {
    setName("ETH");
  };
  const loadDataHandler = () => {
    setdefaultLimit(defaultLimit + 500);
  };
  // 추후 1000개 이상의 데이터를 필요로 할 경우 데이터 끌고오기 (아래)
  // setDataLength(
  //   dataLength >= defaultLimit ? defaultLimit + 500 : defaultLimit + 0
  // );
  // dataLength >
  console.log(coinArray);
  console.log(coinDummyArray);
  console.log(dataToArray(coinArray, 1));

  //** */ 데이터 배열 순서 : time, high, low, open, volumeFrom volumeTo, close
  return (
    <div onWheel={dataWheelHandler}>
      <Candle
        width={width}
        height={height}
        date={dataToArray(coinArray, 0)}
        open={dataToArray(coinArray, 3)}
        close={dataToArray(coinArray, 6)}
        high={dataToArray(coinArray, 1)}
        low={dataToArray(coinArray, 2)}
        name={name}
      />
    </div>
  );
};
