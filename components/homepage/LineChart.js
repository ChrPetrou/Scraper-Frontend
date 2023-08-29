import React from "react";
import { Line } from "react-chartjs-2";
const LineChart = ({ chartData }) => {
  return (
    <div>
      <Line data={chartData}></Line>
    </div>
  );
};

export default LineChart;
