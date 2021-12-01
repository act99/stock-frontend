import React, { useState } from "react";
import { scaleLinear } from "d3-scale";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import { frontStockQuery } from "../pages/__generated__/frontStockQuery";

type Props = {
  width: number | undefined;
  height: number | undefined;
};

export const HandmadeChart: React.FC<Props> = ({ width, height }) => {
  const { data, loading } = useQuery<frontStockQuery>(STOCK_QUERY, {
    variables: {},
  });

  const [dataLength, setDataLength] = useState(24);

  // 데이터 가져와서 array 처리
  // stockArray 값을 onWheel로 추가 삭제할 예정
  // dataDefaultMinusLength => 임시데이터를 사용하기 때문에 데이터 부족으로 구현한 숫자
  const dataDefaultMinusLength = 18;
  const stockData = data?.gsStock.map((item) => item);
  const stockDummyArray: any[] = [];
  stockData?.forEach((item) => stockDummyArray.push(item));

  const stockArray: any[] = [];
  stockData
    ?.slice(dataLength, stockDummyArray.length)
    .forEach((item) => stockArray.push(item));

  const dataWheelHandler = () => {
    window.onwheel = function (e) {
      e.deltaY > 0
        ? setDataLength(
            dataLength < dataDefaultMinusLength
              ? dataLength + 0
              : dataLength - 8
          )
        : setDataLength(
            dataLength > stockDummyArray?.length - dataDefaultMinusLength
              ? dataLength + 0
              : dataLength + 8
          );
    };
  };

  // array 데이터들 분류
  const stockOpen = stockArray.map((item) => item.open);
  const openArray: number[] = [];
  stockOpen?.forEach((open) => openArray.push(open));

  const stockClose = stockArray.map((item) => item.close);
  const closeArray: number[] = [];
  stockClose?.forEach((close) => closeArray.push(close));

  const stockVolume = stockArray.map((item) => item.volume);
  const volumeArray: number[] = [];
  stockVolume?.forEach((volume) => volumeArray.push(volume));

  const stockDate = stockArray.map((item) => item.date);
  const dateArray: string[] = [];
  stockDate?.forEach((date) => dateArray.push(date.toString()));

  const stockHigh = stockArray.map((item) => item.high);
  const highArray: number[] = [];
  stockHigh?.forEach((high) => highArray.push(high));

  const stockLow = stockArray.map((item) => item.low);
  const lowArray: number[] = [];
  stockLow?.forEach((low) => lowArray.push(low));

  const stockName = stockArray.map((item) => item.code_name);
  const nameArray: string[] = [];
  stockName?.forEach((name) => nameArray.push(name));

  const stockClo5 = stockArray.map((item) => item.clo5);
  const clo5Array: number[] = [];
  stockClo5?.forEach((clo5) => clo5Array.push(clo5));

  const stockClo20 = stockArray.map((item) => item.clo20);
  const clo20Array: number[] = [];
  stockClo20?.forEach((clo20) => clo20Array.push(clo20));

  const stockClo60 = stockArray.map((item) => item.clo60);
  const clo60Array: number[] = [];
  stockClo60?.forEach((clo60) => clo60Array.push(clo60));

  // ** 볼린저밴더
  // 표준편차
  let dummyLength = 0;
  const standardDeviation: number[] = [];
  const bolUp = () => {
    const clo20ArrayBol: number[][] = [];
    const clo20Average: number[] = [];
    const gap: number[][] = [];
    const variance: number[] = [];

    for (let i = 0; i < stockArray.length; i++) {
      const a = clo20Array.slice(i, i + 20);

      if (a.length > 19) {
        clo20ArrayBol.push(a);
      } else {
        clo20ArrayBol.push([
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        ]);
      }
      // [0000000] 이걸 넣은 이유는 데이터가 부족하기 때문이다.
      clo20Average.push(clo20ArrayBol[i].reduce((a, b) => a + b) / 20);
    }
    const calculate = () => {
      gap.push();
      for (let i = 0; i < stockArray.length; i++) {
        gap.push(
          clo20ArrayBol[i].map((item) => Math.abs(item - clo20Average[i]) ** 2)
        );
        variance.push(gap[i].reduce((a, b) => a + b) / 19);
        // 편의상 round로 반올림 시키겠다.
        standardDeviation.push(Math.round(Math.sqrt(variance[i])));
      }
    };
    calculate();
    // *************************************************
    // ** 아래 for 문은 나중에 real data 를 이용하면 삭제해도 되는 부분!!!
    // *************************************************
    for (let i = 0; i < standardDeviation.length; i++) {
      if (standardDeviation[i] === 0) {
        standardDeviation.splice(i, 1);
        dummyLength++;
        i--;
      }
    }
    for (let i = 0; i < dummyLength; i++) {
      standardDeviation.unshift(0);
    }
    // *************************************************
    // *************************************************

    console.log(dummyLength);
    console.log(stockArray);
    console.log(standardDeviation);
  };

  bolUp();
  const dummyClo20Array: number[] = [];

  const bollingerArray: number[][] = [];
  const caculateBol = () => {
    // *************************************************
    // ** 아래 for 문은 나중에 real data 를 이용하면 삭제해도 되는 부분!!!
    // *************************************************
    for (let i = 0; i < clo20Array.length - 19; i++) {
      dummyClo20Array.push(clo20Array[i + 19]);
    }
    for (let i = 0; i < dummyLength; i++) {
      dummyClo20Array.unshift(0);
    }
    // *************************************************
    // *************************************************
    for (let i = 0; i < clo20Array.length; i++) {
      bollingerArray.push([
        dummyClo20Array[i] + standardDeviation[i] * 2,
        dummyClo20Array[i] - standardDeviation[i] * 2,
      ]);
    }
  };
  caculateBol();

  console.log(bollingerArray);
  // ** 볼린저 끝!
  return (
    <div onWheel={dataWheelHandler}>
      <CandleChart
        width={width}
        height={height}
        date={dateArray}
        open={openArray}
        close={closeArray}
        high={highArray}
        low={lowArray}
        name={nameArray}
        clo5={clo5Array}
        clo20={clo20Array}
        clo60={clo60Array}
        bollinger={bollingerArray}
      />
      <VolumeChart
        width={width}
        height={height}
        date={dateArray}
        volume={volumeArray}
        open={openArray}
        close={closeArray}
      />
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

type CandleStickProps = {
  width: number | undefined;
  height: number | undefined;
  date: string[];
  open: number[];
  close: number[];
  high: number[];
  low: number[];
  name: string[];
  clo5: number[];
  clo20: number[];
  clo60: number[];
  bollinger: number[][];
};

const CandleChart: React.FC<CandleStickProps> = ({
  width,
  height,
  date,
  open,
  close,
  high,
  low,
  name,
  clo5,
  clo20,
  clo60,
  bollinger,
}) => {
  let SVG_CHART_WIDTH = typeof width === "number" ? width * 1 : 0;
  let SVG_CHART_HEIGHT = typeof height === "number" ? height * 0.5 : 0;

  const xForPrice = 75;
  const xAxisLength = SVG_CHART_WIDTH - xForPrice;
  const yAxisLength = SVG_CHART_HEIGHT * 0.94;
  const x0 = 0;
  const y0 = 0;

  // const xAxisY = y0 + yAxisLength;
  const clo5Array: [number, number][] = [];
  const clo20Array: [number, number][] = [];
  const clo60Array: [number, number][] = [];
  const bollingerUpper: number[][] = [];
  const bollingerLower: number[][] = [];

  const dataArray: [
    string,
    number,
    number,
    number,
    number,
    number[],
    number[],
    number[],
    number[],
    number[]
  ][] = [];
  for (let i = 0; i < bollinger.length; i++) {
    bollingerUpper.push([
      bollinger[i][0],
      bollinger[i + 1] == undefined ? bollinger[i][0] : bollinger[i + 1][0],
    ]);
    bollingerLower.push([
      bollinger[i][1],
      bollinger[i + 1] == undefined ? bollinger[i][1] : bollinger[i + 1][1],
    ]);
  }
  console.log(bollingerLower);
  for (let i = 0; i < date.length; i++) {
    clo5Array.push([clo5[i], clo5[i + 1] == undefined ? clo5[i] : clo5[i + 1]]);
    clo20Array.push([
      clo20[i],
      clo20[i + 1] == undefined ? clo20[i] : clo20[i + 1],
    ]);
    clo60Array.push([
      clo60[i],
      clo60[i + 1] == undefined ? clo60[i] : clo60[i + 1],
    ]);
    dataArray.push([
      date[i],
      open[i],
      close[i],
      high[i],
      low[i],
      clo5Array[i],
      clo20Array[i],
      clo60Array[i],
      bollingerUpper[i],
      bollingerLower[i],
    ]);
  }

  const dataYMax = dataArray.reduce(
    (max, [_, open, close, high, low]) => Math.max(max, high),
    -Infinity
  );
  const dataYMin = dataArray.reduce(
    (min, [_, open, close, high, low]) => Math.min(min, low),
    +Infinity
  );

  // const dateMax = dataArray.reduce(
  //   (max, [date, open, close, high, low]) => Math.max(max, parseInt(date)),
  //   -Infinity
  // );
  // const dateMin = dataArray.reduce(
  //   (min, [date, open, close, high, low]) => Math.min(min, parseInt(date)),
  //   +Infinity
  // );

  const dataYRange = dataYMax - dataYMin;
  const numYTicks = 7;
  const barPlothWidth = xAxisLength / dataArray.length;

  const numXTicks = 12;

  const xValue: string[] = [];
  const generateDate = () => {
    for (let i = 0; i < 12; i++) {
      xValue.push(date[Math.round(date.length / 12) * i]);
    }
    // xValue.reverse();
    // console.log(xValue);
    return xValue;
  };
  generateDate();
  return (
    <div>
      <svg width={SVG_CHART_WIDTH} height={SVG_CHART_HEIGHT}>
        <line
          x1={x0}
          y1={yAxisLength}
          x2={xAxisLength}
          y2={yAxisLength}
          stroke="gray"
        />
        <line
          x1={xAxisLength}
          y1={y0}
          x2={xAxisLength}
          y2={yAxisLength}
          stroke="gray"
        />
        <text
          x={x0 + 15}
          y={y0 + yAxisLength * 0.06}
          fontSize={
            SVG_CHART_WIDTH > 700
              ? SVG_CHART_WIDTH * 0.01
              : SVG_CHART_WIDTH * 0.02
          }
        >
          {name[name.length - 1]}
        </text>
        {/* 세로선 작성 */}
        {Array.from({ length: numXTicks }).map((_, index) => {
          const x = x0 + index * (xAxisLength / numXTicks) + 10;

          return (
            <g key={index}>
              <line
                className="lineLight"
                x1={x}
                x2={x}
                y1={yAxisLength}
                y2={y0}
              ></line>
              <text
                x={x}
                y={SVG_CHART_HEIGHT}
                textAnchor="middle"
                fontSize={SVG_CHART_WIDTH < 800 ? 6 : 10}
              >
                {xValue[index]}
              </text>
            </g>
          );
        })}
        {/* 가로선 작성(css name => lineLight) */}
        {Array.from({ length: numYTicks }).map((_, index) => {
          const y = y0 + index * (yAxisLength / numYTicks);
          const yValue = Math.round(
            dataYMax - index * (dataYRange / numYTicks)
          );
          return (
            <g key={index}>
              <line
                className="lineLight"
                x1={xAxisLength}
                x2={x0}
                y1={y}
                y2={y}
              ></line>
              <text x={SVG_CHART_WIDTH - 60} y={y + 10} fontSize="12">
                {yValue.toLocaleString()} ￦
              </text>
            </g>
          );
        })}
        {/* 캔들 구현 */}
        {dataArray.map(
          (
            [
              day,
              open,
              close,
              high,
              low,
              clo5,
              clo20,
              clo60,
              bolUpper,
              bolLower,
            ],
            index
          ) => {
            // 캔들 & 이동평균선
            const x = x0 + index * barPlothWidth;
            const xX = x0 + (index + 1) * barPlothWidth;
            const sidePadding = xAxisLength * 0.0015;
            const max = Math.max(open, close);
            const min = Math.min(open, close);
            // ** 여기도 나중에 real data가 오면 필요 없음
            // const bolGap =
            //********
            const scaleY = scaleLinear()
              .domain([dataYMin, dataYMax])
              .range([y0, yAxisLength]);
            const fill = close > open ? "#4AFA9A" : "#E33F64";
            // console.log(scaleY(max));
            // console.log(scaleY(min));
            console.log(bollingerUpper);
            return (
              <g key={index}>
                {/* 선행스팬 후행스팬 구름형성에 필요한 빗금 */}
                {/* <line
                  stroke="red"
                  x1={x + (barPlothWidth - sidePadding) / 2}
                  x2={xX + (barPlothWidth - sidePadding) / 2}
                  y1={yAxisLength - scaleY(clo5)}
                  y2={yAxisLength - scaleY(clo5)}
                /> */}

                {bolUpper[0] != bolUpper[1] && bollingerUpper[index][0] != 0 ? (
                  <line
                    stroke="blue"
                    x1={x + (barPlothWidth - sidePadding) / 2}
                    x2={xX + (barPlothWidth - sidePadding) / 2}
                    y1={yAxisLength - scaleY(bolUpper[0])}
                    y2={yAxisLength - scaleY(bolUpper[1])}
                  />
                ) : null}
                {bolLower[0] != bolLower[1] && bollingerUpper[index][0] != 0 ? (
                  <line
                    stroke="blue"
                    x1={x + (barPlothWidth - sidePadding) / 2}
                    x2={xX + (barPlothWidth - sidePadding) / 2}
                    y1={yAxisLength - scaleY(bolLower[0])}
                    y2={yAxisLength - scaleY(bolLower[1])}
                  />
                ) : null}
                {bolLower[0] != bolLower[1] && bollingerUpper[index][0] != 0 ? (
                  <line
                    stroke="blue"
                    x1={x + (barPlothWidth - sidePadding)}
                    x2={xX + (barPlothWidth - sidePadding)}
                    y1={yAxisLength - scaleY(bolUpper[1])}
                    y2={yAxisLength - scaleY(bolLower[0])}
                  />
                ) : null}

                {clo5[0] > dataYMin && clo5[0] != clo5[1] ? (
                  <line
                    stroke="green"
                    x1={x + (barPlothWidth - sidePadding) / 2}
                    x2={xX + (barPlothWidth - sidePadding) / 2}
                    y1={yAxisLength - scaleY(clo5[0])}
                    y2={yAxisLength - scaleY(clo5[1])}
                  />
                ) : null}
                {clo20[0] > dataYMin && clo20[0] != clo20[1] ? (
                  <line
                    stroke="red"
                    x1={x + (barPlothWidth - sidePadding) / 2}
                    x2={xX + (barPlothWidth - sidePadding) / 2}
                    y1={yAxisLength - scaleY(clo20[0])}
                    y2={yAxisLength - scaleY(clo20[1])}
                  />
                ) : null}
                {clo60[0] > dataYMin && clo60[0] != clo60[1] ? (
                  <line
                    stroke="gold"
                    x1={x + (barPlothWidth - sidePadding) / 2}
                    x2={xX + (barPlothWidth - sidePadding) / 2}
                    y1={yAxisLength - scaleY(clo60[0])}
                    y2={yAxisLength - scaleY(clo60[1])}
                  />
                ) : null}

                <line
                  x1={x + (barPlothWidth - sidePadding) / 2}
                  x2={x + (barPlothWidth - sidePadding) / 2}
                  y1={yAxisLength - scaleY(low)}
                  y2={yAxisLength - scaleY(high)}
                  stroke={open > close ? "red" : "green"}
                />
                <rect
                  {...{ fill }}
                  x={x}
                  width={barPlothWidth - sidePadding}
                  y={yAxisLength - scaleY(max)}
                  // 시가 종가 최대 최소값의 차
                  height={scaleY(max) - scaleY(min)}
                ></rect>
              </g>
            );
          }
        )}
      </svg>
    </div>
  );
};

type VolumeProps = {
  date: string[];
  volume: number[];
  width: number | undefined;
  height: number | undefined;
  open: number[];
  close: number[];
};

const VolumeChart: React.FC<VolumeProps> = ({
  date,
  volume,
  width,
  height,
  open,
  close,
}) => {
  let SVG_VOLUME_WIDTH = typeof width === "number" ? width * 1 : 0;
  let SVG_VOLUME_HEIGHT = typeof height === "number" ? height * 0.3 : 0;
  const xForPrice = 75;
  const xAxisLength = SVG_VOLUME_WIDTH - xForPrice;
  const yAxisLength = SVG_VOLUME_HEIGHT * 0.94;
  const x0 = 0;
  const y0 = 0;

  const xAxisY = y0 + yAxisLength;
  const dateVolume: [string, number, number, number][] = [];
  for (let i = 0; i < date.length; i++) {
    dateVolume.push([date[i], volume[i], open[i], close[i]]);
  }

  // 배열.reduce((누적값, 현잿값, 인덱스, 요소) => { return 결과 }, 초깃값);

  const dataYMax = dateVolume.reduce(
    (max, [_, dataY]) => Math.max(max, dataY),
    -Infinity
  );
  const dataYMin = dateVolume.reduce(
    (min, [_, dataY]) => Math.min(min, dataY),
    Infinity
  );
  const dataYRange = dataYMax - dataYMin;
  const numYTicks = 5;
  const barPlotWidth = xAxisLength / dateVolume.length;
  // const testYMax = dateVolume.map((item) => Math.max.apply(item[1]), Infinity);

  return (
    <div>
      <svg width={SVG_VOLUME_WIDTH} height={SVG_VOLUME_HEIGHT}>
        <line x1={x0} y1={xAxisY} x2={x0 + xAxisLength} y2={xAxisY} />
        <text x={SVG_VOLUME_WIDTH - x0} y={xAxisY + 10}>
          거래량
        </text>
        {/* Volume axis */}
        {/* <line x1={x0} y1={y0} x2={x0} y2={y0 + yAxisLength} stroke="grey" /> */}

        {/* 가로선 작성(css name => lineLight) */}
        {Array.from({ length: numYTicks }).map((_, index) => {
          const y = y0 + index * (yAxisLength / numYTicks);
          const yValue = Math.round(
            dataYMax - index * (dataYRange / numYTicks)
          );
          return (
            <g key={index}>
              <line
                className="lineLight"
                x1={SVG_VOLUME_WIDTH - x0}
                x2={x0}
                y1={y}
                y2={y}
              />
              <text
                x={SVG_VOLUME_WIDTH - 60}
                y={y + SVG_VOLUME_HEIGHT * 0.05}
                fontSize="12"
              >
                {/* volume 값 k로 치환 */}
                {Math.abs(yValue) > 999
                  ? Math.sign(yValue) *
                      (Math.round(Math.abs(yValue) / 100) / 10) +
                    "k"
                  : Math.sign(yValue) * Math.abs(yValue)}
                {/* {yValue} */}
              </text>
            </g>
          );
        })}

        {dateVolume.map(([day, dataY, open, close], index) => {
          // x는 바 위치
          const x = x0 + index * barPlotWidth;
          let yRatio = 0;
          const yRatioGenerator = () => {
            yRatio = (dataY - dataYMin) / dataYRange;
            if (yRatio > 0) {
              return yRatio;
            } else return (yRatio = dataY / dataYRange / 2);
          };
          // const yRatio = (dataY - dataYMin) / dataYRange;
          // y는 바 길이 측정용
          const y = y0 + (1 - yRatioGenerator()) * yAxisLength;
          const height = yRatioGenerator() * yAxisLength;

          const sidePadding = xAxisLength * 0.0015;
          const fill = close > open ? "#4AFA9A" : "#E33F64";
          return (
            <g key={index}>
              <rect
                {...{ fill }}
                x={x}
                y={y}
                width={barPlotWidth - sidePadding}
                height={height}
              ></rect>
            </g>
          );
        })}
        <line
          x1={SVG_VOLUME_WIDTH - x0}
          y1={y0}
          x2={x0 + xAxisLength}
          y2={y0 + yAxisLength}
        />
        {/* <text x={x0 + xAxisLength + 3} y={xAxisY - 280}>
            {Math.max.apply(null, volume)}
          </text> */}
      </svg>
    </div>
  );
};
