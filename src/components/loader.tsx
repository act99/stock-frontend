import React from "react";
import { ScaleLoader } from "react-spinners";

const LoadingComponent = () => (
  <div className="loader">
    <ScaleLoader height="160" width="32" color="#ff9900" radius="8" />;
  </div>
);

export default LoadingComponent;
