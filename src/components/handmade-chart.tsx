import React, { useEffect, useState } from "react";
import { scaleLinear, ScaleLinear } from "d3-scale";

// date, open, close, high, low, volume

type Props = {
  width: number;
  height: number;
  date: string[];
  open: number[];
  close: number[];
  high: number[];
  low: number[];
  volume: number[];
  name: string[];
};

export const HandmadeChart: React.FC<Props> = ({
  width,
  height,
  date,
  open,
  close,
  high,
  low,
  volume,
  name,
}) => {
  // const [windowSize, setWindowSize] = useState({
  //   width: window.innerWidth,
  //   height: window.innerHeight,
  // });
  // const handleResize = () => {
  //   setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  // };
  // useEffect(() => {
  //   window.addEventListener("resize", handleResize);
  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);

  return (
    <div className=" bg-chartGray-default flex-col flex">
      <h3 className="text-white"> {width}</h3>
      <h3 className="text-white"> {height}</h3>

      <CandleChart
        width={width}
        height={height}
        date={date}
        open={open}
        close={close}
        high={high}
        low={low}
        name={name}
      />
      <VolumeChart width={width} height={height} date={date} volume={volume} />

      {/* <VolumeChart date={date} volume={volume} />  */}
    </div>
  );
};

type CandleStickProps = {
  width: number;
  height: number;
  date: string[];
  open: number[];
  close: number[];
  high: number[];
  low: number[];
  name: string[];
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
}) => {
  let SVG_CHART_WIDTH = typeof width === "number" ? width * 1 : 0;
  let SVG_CHART_HEIGHT = typeof height === "number" ? height * 0.5 : 0;

  const xForPrice = 75;
  const xAxisLength = SVG_CHART_WIDTH - xForPrice;
  const yAxisLength = SVG_CHART_HEIGHT * 0.94;
  const x0 = 0;
  const y0 = 0;
  // const xAxisY = y0 + yAxisLength;

  const dataArray: [string, number, number, number, number][] = [];
  for (let i = 0; i < date.length; i++) {
    dataArray.push([date[i], open[i], close[i], high[i], low[i]]);
  }
  console.log(dataArray);
  const dataYMax = dataArray.reduce(
    (max, [_, open, close, high, low]) => Math.max(max, high),
    -Infinity
  );
  console.log(dataYMax);
  const dataYMin = dataArray.reduce(
    (min, [_, open, close, high, low]) => Math.min(min, low),
    +Infinity
  );

  const dateMax = dataArray.reduce(
    (max, [date, open, close, high, low]) => Math.max(max, parseInt(date)),
    -Infinity
  );
  const dateMin = dataArray.reduce(
    (min, [date, open, close, high, low]) => Math.min(min, parseInt(date)),
    +Infinity
  );

  console.log(dataYMin);
  const dataYRange = dataYMax - dataYMin;
  const numYTicks = 7;
  const barPlothWidth = xAxisLength / dataArray.length;

  const numXTicks = 12;

  const xValue: string[] = [];
  const generateDate = () => {
    console.log(date[Math.round(9.121345)]);
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
          const y = y0 + index * (yAxisLength / numYTicks) + 10;
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
              <text x={SVG_CHART_WIDTH - 60} y={y} fontSize="12">
                {yValue.toLocaleString()} ￦
              </text>
            </g>
          );
        })}
        {dataArray.map(([day, open, close, high, low], index) => {
          const x = x0 + index * barPlothWidth;
          const sidePadding = xAxisLength * 0.0015;
          const max = Math.max(open, close);
          const min = Math.min(open, close);

          const scaleY = scaleLinear()
            .domain([dataYMin, dataYMax])
            .range([y0, yAxisLength]);
          const fill = close > open ? "#4AFA9A" : "#E33F64";
          console.log(scaleY(max));
          console.log(scaleY(min));
          return (
            <g key={index}>
              <line
                x1={x + xAxisLength * 0.002}
                y1={yAxisLength - scaleY(low)}
                x2={x + xAxisLength * 0.002}
                y2={yAxisLength - scaleY(high)}
                stroke={open > close ? "red" : "green"}
              />
              <rect
                {...{ fill }}
                x={x}
                y={yAxisLength - scaleY(max)}
                width={barPlothWidth - sidePadding}
                // 시가 종가 최대 최소값의 차
                height={scaleY(max) - scaleY(min)}
              ></rect>
              {/* <rect
                  fill={open > close ? "red" : "green"}
                  x={x + sidePadding / 2}
                  y={0}
                  width={1}
                  height={(SVG_CHART_HEIGHT * (high - low)) / dataYMax}
                ></rect> */}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

type VolumeProps = {
  date: string[];
  volume: number[];
  width: number;
  height: number;
};

const VolumeChart: React.FC<VolumeProps> = ({
  date,
  volume,
  width,
  height,
}) => {
  let SVG_VOLUME_WIDTH = typeof width === "number" ? width * 1 : 0;
  let SVG_VOLUME_HEIGHT = typeof height === "number" ? height * 0.3 : 0;
  const xForPrice = 75;
  const xAxisLength = SVG_VOLUME_WIDTH - xForPrice;
  const yAxisLength = SVG_VOLUME_HEIGHT * 0.94;
  const x0 = 0;
  const y0 = 0;

  const xAxisY = y0 + yAxisLength;
  const dateVolume: [string, number][] = [];
  for (let i = 0; i < date.length; i++) {
    dateVolume.push([date[i], volume[i]]);
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

  console.log(dataYMax);
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

        {dateVolume.map(([day, dataY], index) => {
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

          const sidePadding = 5;
          return (
            <g key={index}>
              <rect
                fill="red"
                x={x + sidePadding / 2}
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
