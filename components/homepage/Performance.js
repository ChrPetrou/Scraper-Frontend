import colors from "@/config/colors";
import agent from "@/utils/agent";
import React, { useEffect, useState } from "react";
import { styled } from "styled-components";

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  padding: 20px;
  gap: 20px;
  justify-content: space-between;
`;

const TableItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  cursor: pointer;
  padding: 10px;
  flex: 1;
  min-width: 120px;
  max-width: 120px;
  margin: auto;
  border-radius: 10px;
  transition: all 0.15s linear;
  background-color: ${({ $isActive }) => $isActive && colors.lightGray};
  & p {
    font-size: 16px;
    &:nth-child(2) {
      color: ${({ $isnegative }) =>
        $isnegative ? colors.tomato : colors.green};
    }
  }
  &:hover {
    background-color: ${colors.lightestGray};
  }
`;

const Performance = ({ activeSymbol, setTimeline, timeline }) => {
  const [performanceTable, setPerformanceTable] = useState([]);
  const [errosMsg, setErrosMsg] = useState();
  const getPerformance = async () => {
    if (activeSymbol)
      try {
        const performance = await agent.getPerformance({
          symbol: activeSymbol,
        });
        // setPerformanceTable(performance);
        // console.log(Object.keys(performance));
        for (var key in performance) {
          if (performance.hasOwnProperty(key)) {
            let newKey = key.replace(/(?=[A-Z0-9])/g, " ");
            newKey = newKey.split(" ");
            const swapkey = newKey[newKey.length - 1];
            newKey[newKey.length - 1] = newKey[0];
            newKey[0] = swapkey;
            newKey = newKey.map((element, index) =>
              index === 0
                ? element[0].toUpperCase() + element.slice(1)
                : element[0].toLowerCase() + element.slice(1)
            );
            let percentage = performance[key] * 100;

            setPerformanceTable((previous) => {
              return [
                ...previous,
                {
                  name: newKey.toString().replace(/,/g, " "),
                  value: percentage.toFixed(2),
                },
              ];
            });
          }
        }
      } catch (err) {
        setErrosMsg(err);
      }
  };

  useEffect(() => {
    getPerformance();
    setPerformanceTable([]);
  }, [activeSymbol]);

  useEffect(() => {
    // console.log(performanceTable);
  }, [performanceTable]);

  return (
    <Container>
      {performanceTable.length > 1 &&
        performanceTable.map((element, index) => (
          <TableItem
            onClick={() => setTimeline(element.name)}
            key={index}
            $isnegative={Number(element.value) < 0}
            $isActive={timeline == element.name}
          >
            <p>{element.name}</p>
            <p>{element.value}%</p>
          </TableItem>
        ))}
    </Container>
  );
};

export default Performance;
