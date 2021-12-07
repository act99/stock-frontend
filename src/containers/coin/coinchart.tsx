import React, { useState } from "react";
import {
  useGetCryptoCompareHistoryQuery,
  useGetCryptoCompareVolumeQuery,
} from "../../services/cryptoApi";
import { dataToArray } from "../../functions/data-to-array";
import { Candle } from "../../components/chart/common/candle";
import { CoinCandle } from "../../components/chart/coin/coin_candle";
import { CoinVolume } from "../../components/chart/coin/coin_volume";

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

  const dataWheelHandler = () => {
    window.onwheel = function (e) {
      e.deltaY > 0
        ? setDataLength(dataLength < 18 ? dataLength + 0 : dataLength - 8)
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

  //** */ 데이터 배열 순서 : time, high, low, open, volumeFrom volumeTo, close
  return (
    <div onWheel={dataWheelHandler}>
      <CoinCandle
        width={width}
        height={height}
        defaultLimit={defaultLimit}
        dataLength={dataLength}
        name={name}
      />
      <CoinVolume
        width={width}
        height={height}
        defaultLimit={defaultLimit}
        dataLength={dataLength}
        name={name}
      />
    </div>
  );
};
