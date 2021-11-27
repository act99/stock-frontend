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
};

type VolumeProps = {
  date: string[];
  volume: number[];
};

export const HandmadeChart: React.FC<Props> = ({
  date,
  open,
  close,
  high,
  low,
  volume,
}) => {
  return (
    <div className=" bg-chartGray-default flex-col flex">
      <CandleChart />
      <VolumeChart date={date} volume={volume} />
    </div>
  );
};

const CandleChart = () => {
  const x0 = 150;
  const xAxisLength = SVG_CHART_WIDTH - x0 * 2;
  const y0 = 50;
  const yAxisLength = SVG_CHART_HEIGHT - y0 * 2;

  const xAxisY = y0 + yAxisLength;

  return (
    <div>
      <svg width={SVG_CHART_WIDTH} height={SVG_CHART_HEIGHT}>
        <line x1={x0} y1={xAxisY} x2={x0 + xAxisLength} y2={xAxisY} />
        <text x={x0 + xAxisLength + 5} y={xAxisY + 10}>
          x
        </text>
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
        <text x={x0 + xAxisLength + 20} y={xAxisY + 10}>
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
                stroke="gray"
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
