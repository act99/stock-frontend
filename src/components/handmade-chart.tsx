import React from "react";

const SVG_CHART_WIDTH = 1600;
const SVG_CHART_HEIGHT = 400;
const SVG_VOLUME_WIDTH = 1600;
const SVG_VOLUME_HEIGHT = 400;

// date, open, close, high, low, volume

type Props = {
  date: string[];
  open: number[];
  close: number[];
  high: number[];
  low: number[];
  volume: number[];
  name: string[];
};

type VolumeProps = {
  date: string[];
  volume: number[];
};

type CandleStickProps = {
  date: string[];
  open: number[];
  close: number[];
  high: number[];
  low: number[];
  name: string[];
};

export const HandmadeChart: React.FC<Props> = ({
  date,
  open,
  close,
  high,
  low,
  volume,
  name,
}) => {
  return (
    <div className=" bg-chartGray-default flex-col flex">
      <CandleChart
        date={date}
        open={open}
        close={close}
        high={high}
        low={low}
        name={name}
      />
      <VolumeChart date={date} volume={volume} />
    </div>
  );
};

const CandleChart: React.FC<CandleStickProps> = ({
  date,
  open,
  close,
  high,
  low,
  name,
}) => {
  const x0 = 150;
  const xAxisLength = SVG_CHART_WIDTH - x0 * 2;
  const y0 = 50;
  const yAxisLength = SVG_CHART_HEIGHT - y0 * 2;
  const xAxisY = y0 + yAxisLength;

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
  console.log(dataYMin);
  const dataYRange = dataYMax - dataYMin;
  const numYTicks = 7;
  const barPlothWidth = xAxisLength / dataArray.length;
  return (
    <div>
      <svg width={SVG_CHART_WIDTH} height={SVG_CHART_HEIGHT}>
        <line x1={x0} y1={xAxisY} x2={x0 + xAxisLength} y2={xAxisY} />
        <text x={SVG_CHART_WIDTH - x0} y={xAxisY + 10}>
          {name[name.length - 1]}
        </text>
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
                x1={SVG_CHART_WIDTH - x0}
                x2={x0}
                y1={y}
                y2={y}
              ></line>
              <text x={x0 + xAxisLength + 80} y={y + 5} textAnchor="end">
                {yValue.toLocaleString()} ￦
              </text>
            </g>
          );
        })}
        {dataArray.map(([day, open, close, high, low], index) => {
          const openAndClose = [];
          openAndClose.push([open, close]);
          // console.log(open > close ? 1 : 2);
          console.log(open);
          console.log(close);
          console.log(openAndClose);
          const x = x0 + index * barPlothWidth;
          const sidePadding = 5;
          let yRatio = 0;
          const yRatioGenerator = (open: number, close: number) => {
            if (open > close) {
              yRatio = (open - dataYMin) / dataYRange;
              if (yRatio > 0) {
                return yRatio;
              } else return (yRatio = open / dataYRange / 2);
            } else {
              yRatio = (close - dataYMin) / dataYRange;
              if (yRatio > 0) {
                return yRatio;
              } else return (yRatio = open / dataYRange / 2);
            }
          };
          let yHighRatio = 0;
          const yHighRatioGenerator = (high: number) => {
            yHighRatio = (high - dataYMin) / dataYRange;
            if (yHighRatio > 0) {
              return yHighRatio;
            } else return (yRatio = high / dataYRange / 2);
          };
          const yOpenClose =
            y0 + (1 - yRatioGenerator(open, close)) * yAxisLength;
          const yHighLow = y0 + (1 - yHighRatioGenerator(high)) * yAxisLength;
          // const height = yRatioGenerator(open, high) * yAxisLength;
          return (
            <g key={index}>
              <rect
                fill={open > close ? "red" : "green"}
                x={x + sidePadding / 2}
                y={yOpenClose}
                // y={
                //   open > close
                //     ? SVG_CHART_HEIGHT +
                //       100 -
                //       (SVG_CHART_HEIGHT * ((open + close) / 2)) / dataYMax
                //     : (SVG_CHART_HEIGHT * ((close + open) / 2)) / dataYMax
                // }
                width={barPlothWidth - sidePadding}
                height={
                  open > close
                    ? (SVG_CHART_HEIGHT * (open - close)) / dataYMax
                    : (SVG_CHART_HEIGHT * (close - open)) / dataYMax
                }
              ></rect>
              <rect
                fill={open > close ? "red" : "green"}
                x={x + sidePadding / 2}
                y={yHighLow}
                // y={
                //   open > close
                //     ? SVG_CHART_HEIGHT +
                //       100 -
                //       (SVG_CHART_HEIGHT * ((open + close) / 2)) / dataYMax
                //     : (SVG_CHART_HEIGHT * ((close + open) / 2)) / dataYMax
                // }
                width={1}
                height={(SVG_CHART_HEIGHT * (high - low)) / dataYMax}
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
      </svg>
    </div>
  );
};

const VolumeChart: React.FC<VolumeProps> = ({ date, volume }) => {
  const x0 = 150;
  const xAxisLength = SVG_VOLUME_WIDTH - x0 * 2;
  const y0 = 50;
  const yAxisLength = SVG_VOLUME_HEIGHT - y0 * 2;

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
              <text x={x0 + xAxisLength + 70} y={y + 5} textAnchor="end">
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
              <text
                fontSize={barPlotWidth - sidePadding}
                x={x + barPlotWidth / 2}
                y={xAxisY + 16}
                textAnchor="middle"
              >
                {day}
              </text>
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
