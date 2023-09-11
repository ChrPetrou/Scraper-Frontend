import React, { useEffect, useState } from "react";
import { InsideContainer, MainContainer } from "../common/MainContainer";
import { Line } from "react-chartjs-2";
import "chartjs-plugin-annotation"; // Import the annotation plugin
import colors from "@/config/colors";

const Chart = ({ progressData = [] }) => {
  const [activeIndex, setActiveIndex] = useState();

  // Index of the point where you want to draw the vertical line
  const verticalLineIndex = progressData.length - 1;

  // Define the annotation configuration for the vertical line
  const annotation = {
    type: "line",
    mode: "vertical",
    scaleID: "x", // Use the x-axis scale
    value: progressData[verticalLineIndex]?.createdAt, // X-coordinate corresponding to the data point
    borderColor: "red", // Customize the line color
    borderWidth: 2, // Customize the line width
    label: {
      content: "Vertical Line",
      enabled: true,
      position: "top",
    },
  };

  return (
    <MainContainer>
      {progressData?.length > 0 && (
        <Line
          style={{
            borderTop: "1px solid gray",
            paddingTop: "10px",
            height: "400px",
          }}
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
                animation: "none",
                label: "",
                data: progressData?.map((data) => data?.rate),
                backgroundColor: colors.mint,
                borderColor: colors.green,
                // borderWidth: 1,
                pointRadius: (index) =>
                  index.dataIndex === activeIndex
                    ? 5
                    : index.dataIndex === verticalLineIndex
                    ? 4
                    : 0,
                hoverRadius: (index) =>
                  index.dataIndex === verticalLineIndex ? 10 : undefined,
                fill: true,
                pointBackgroundColor: "green",
                pointBorderColor: "white",
                clip: true,
                animations: false,
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
                  display: false,
                },
              },
              y: {
                grid: {
                  display: false,
                },
              },
            },
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                mode: "index",
                intersect: false,
                callbacks: {
                  label: function (context) {
                    setActiveIndex(context.dataIndex);
                    return context.parsed.y;
                  },
                },
              },

              annotation: {
                annotations: [annotation], // Add the annotation to the chart
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
