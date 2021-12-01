import React, { useEffect, useState } from "react";
import { HandmadeChart } from "../components/handmade-chart";

interface Size {
  width: number | undefined;
  height: number | undefined;
}

function useWindowSize(): Size {
  const [windowSize, setWindowSize] = useState<Size>({
    width: 0,
    height: 0,
  });
  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    // Add event listener
    window.addEventListener("resize", handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  const a = [0, 2, 3, 4, 8, 5, 1, 2, 3];
  const arr: any[] = [];
  const b = () => arr.push(a.map((item) => Math.sqrt(item)));
  b();
  console.log(arr);
  return windowSize;
}

export const Stock = () => {
  const size: Size = useWindowSize();
  // console.log(size.width, size.height);

  return (
    <div className=" bg-chartGray-default flex-col flex">
      <div>
        <HandmadeChart width={size.width} height={size.height} />
      </div>
    </div>
  );
};
