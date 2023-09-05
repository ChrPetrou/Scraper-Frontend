import React, { useEffect, useState } from "react";
import { InsideContainer, MainContainer } from "../common/MainContainer";
import { Line } from "react-chartjs-2";

const Chart = ({ progressData = [] }) => {
  useEffect(() => {}, [progressData]);

  return (
    <MainContainer>
      {" "}
      {progressData?.length > 0 && (
        <Line
          style={{ borderTop: "1px solid gray", paddingTop: "20px" }}
          data={{
            labels: progressData?.map((data) => {
              const now = new Date(data?.createdAt);

              const dateString = Intl.DateTimeFormat("en-US", {
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                month: "numeric",
              }).format(now);
              return dateString;
            }),
            datasets: [
              {
                label: "",
                data: progressData?.map((data) => data?.rate),
                backgroundColor: "lightGreen",
                borderColor: "green",
                pointRadius: 0,
                onHover: (event, chartElement) => {
                  event.target.style.cursor = chartElement[0]
                    ? "crosshair"
                    : "default";
                  // updatePointRadius(event, chartElement);
                },
                fill: true,
                pointBackgroundColor: "transparent",
                clip: true,
              },
            ],
          }}
          options={{
            scales: {
              x: {
                ticks: {
                  maxTicksLimit: 10,
                },
                grid: {
                  display: false, // Hide x-axis gridlines
                },
              },
              y: {
                grid: {
                  display: false, // Hide x-axis gridlines
                },
              },
            },
            plugins: {
              legend: {
                display: false,
              },

              tooltip: {
                mode: "index", // Set the tooltip mode to "nearest"
                intersect: false,
                callbacks: {
                  label: function (context) {
                    return context.dataset.label + ": " + context.parsed.y;
                  },
                },
              },
              onHover: (event, chartElement) => {
                event.target.style.cursor = chartElement[0]
                  ? "crosshair"
                  : "default";
              },
            },
            maintainAspectRatio: false,
          }}
        />
      )}
    </MainContainer>
  );
};

export default Chart;
