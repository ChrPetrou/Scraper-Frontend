import React, { useEffect, useState } from "react";
import { InsideContainer, MainContainer } from "../common/MainContainer";
import { Line } from "react-chartjs-2";
import { scales } from "chart.js";

const Chart = ({ progressData = [] }) => {
  // console.log("CHART", progressData);
  return (
    <MainContainer>
      {" "}
      {progressData?.length > 0 && (
        <Line
          data={{
            labels: progressData?.map((data) =>
              new Date(data?.createdAt).toLocaleString("en-US", {
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                month: "numeric",
              })
            ),
            datasets: [
              {
                label: "First Dataset",
                data: progressData?.map((data) => data?.rate),
                backgroundColor: "lightGreen",
                borderColor: "green",
                fill: true,
                pointBackgroundColor: "transparent",
              },
            ],
          }}
        >
          WTF
        </Line>
      )}
    </MainContainer>
  );
};

export default Chart;
