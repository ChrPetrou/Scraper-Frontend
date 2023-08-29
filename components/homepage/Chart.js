import React, { useEffect, useState } from "react";
import { InsideContainer } from "../common/MainContainer";
import { Line } from "react-chartjs-2";

const Chart = ({ progressData = [], activeSymbol }) => {
  console.log("CHART", progressData);
  return (
    <InsideContainer>
      {" "}
      {progressData?.length > 0 && (
        <Line
          data={{
            labels: progressData?.map((data) =>
              new Date(data?.createdAt).toLocaleString("en-US", {
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                month: "long",
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
    </InsideContainer>
  );
};

export default Chart;
