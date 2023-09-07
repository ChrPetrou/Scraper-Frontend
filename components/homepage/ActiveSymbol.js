import { currencySymbols } from "@/config/images";
import agent from "@/utils/agent";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { InsideContainer } from "../common/MainContainer";

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  LineElement,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
} from "chart.js";

import Chart from "./Chart";
import Performance from "./Performance";

ChartJS.register(
  Title,
  Tooltip,
  LineElement,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler
);

const Header = styled.div`
  display: flex;
  margin-top: 20px;
  gap: 30px;
  width: 100%;
  margin-left: 40px;
`;

const HeaderImg = styled.div`
  position: relative;
  & img {
  }
  & :first-child {
    clip-path: path("M113 0H0V48c35-1 60 20 62 66v0h48V0Z");
    border-radius: 50%;
  }
  & :last-child {
    position: absolute;
    right: 0;
    top: 0;
    border-radius: 50%;
    transform: translate(-45px, 55px);
  }
`;

const HeaderContent = styled.div`
  display: flex;
  gap: 20px;
  flex-direction: column;
  h1 {
    font-size: 38px;
    font-weight: 600;
  }
  h2 {
    strong {
      font-size: 38px;
      margin-right: 10px;
      font-weight: 600;
    }
    font-size: 20px;
    font-weight: 300;
  }
`;

const GraphContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 60px;
  & h1 {
    font-size: 25px;
  }
`;

const ActiveSymbol = ({ activeSymbol }) => {
  const [rate, setRate] = useState({
    rate: activeSymbol?.rate,
    created_at: activeSymbol?.createdAt,
  });
  const [timeline, setTimeline] = useState("Today");
  const [previousRate, setPreviousRate] = useState();
  const [progressRate, setProggressRate] = useState([]);

  const [errosMsg, setErrosMsg] = useState();

  //get current rate of symbol
  const getRate = async () => {
    try {
      const rateValue = await agent.getlatestRate(activeSymbol);
      setRate({
        rate: rateValue?.rate,
        created_at: Intl.DateTimeFormat("en-US", {
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          month: "long",
        }).format(new Date(data?.createdAt)),
      });
    } catch (err) {
      setErrosMsg(err);
    }
  };

  const getProgressRate = async (symbol, dateStart, dateEnd) => {
    try {
      const progressRateValues = await agent.getHistoryRate({
        symbol,
        dateFrom: dateStart,
        dateTo: dateEnd,
      });
      // console.log(progressRateValues);

      setProggressRate(progressRateValues);
    } catch (err) {
      setErrosMsg(err);
    }
  };

  useEffect(() => {
    if (activeSymbol) {
      let dateNow = Date.now();
      let dateNowInSecs = Math.round(dateNow / 1000);
      //Get Start Of the Date
      let specificDate = new Date();
      switch (timeline) {
        case "Today":
          specificDate.setHours(0);
          specificDate.setMinutes(0);
          specificDate.setSeconds(0);
          specificDate.setMilliseconds(0);
          specificDate = specificDate.getTime();
          //to seconds

          break;
        case "Week":
          specificDate = new Date(
            specificDate.getTime() - 7 * 24 * 60 * 60 * 1000
          );
          break;
        case "1 month":
          specificDate.setMonth(specificDate.getMonth() - 1);
          break;
        case "6 months":
          specificDate.setMonth(specificDate.getMonth() - 6);
          break;
        case "Year to date":
          //from the start of the year

          specificDate = new Date(specificDate.getFullYear(), 0, 1);
          break;
        case "1 year":
          specificDate.setFullYear(specificDate.getFullYear() - 1);
          break;
        case "5 years":
          specificDate.setFullYear(specificDate.getFullYear() - 5);
          break;
        case "All time":
          specificDate = new Date(0);
          break;
        default:
          specificDate = new Date();
          specificDate.setHours(0);
          specificDate.setMinutes(0);
          specificDate.setSeconds(0);
          specificDate.setMilliseconds(0);
          break;
      }
      //to seconds
      specificDate = Math.floor(specificDate / 1000);
      console.log(specificDate);
      getProgressRate(activeSymbol.symbol, specificDate, dateNowInSecs);
      getRate();
    }
    const socket = new WebSocket(
      process.env.NEXT_PUBLIC_ENVIRONMENT_SOCKET_URL
    );

    socket.addEventListener("open", (event) => {
      console.log("Connected to WebSocket");
    });

    socket.addEventListener("message", (event) => {
      const message = JSON.parse(event.data);

      if (message.type === "update" && activeSymbol) {
        const { symbol, rate, createdAt } = message.message;

        if (symbol == activeSymbol.symbol) {
          setPreviousRate(rate.rate);

          setRate({
            rate: rate,
            created_at: Intl.DateTimeFormat("en-US", {
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
              month: "long",
            }).format(new Date(createdAt)),
          });

          setProggressRate((current) => [...current, message.message]);
        }
      }
    });

    return () => {
      socket.close(); // Clean up the WebSocket connection when the component unmounts
    };
  }, [activeSymbol, timeline]);

  return (
    <InsideContainer>
      <Header>
        <HeaderImg>
          <Image
            priority
            src={
              currencySymbols[activeSymbol?.symbol?.slice(-3)] ??
              "/images/flags/us.svg"
            }
            width={100}
            height={100}
            alt={activeSymbol?.symbol?.slice(-3) ?? "flag1"}
          />
          <Image
            priority
            src={
              currencySymbols[activeSymbol?.symbol?.slice(0, 3)] ??
              "/images/flags/us.svg"
            }
            width={100}
            height={100}
            alt={activeSymbol?.symbol?.slice(0, 3) ?? "flag2"}
          />
        </HeaderImg>
        <HeaderContent>
          <h1>{activeSymbol?.name}</h1>
          <h2>
            <strong>{rate?.rate}</strong>
            {activeSymbol?.symbol?.slice(-3)}
          </h2>
          <p>Last update at {rate.created_at}</p>
        </HeaderContent>
      </Header>
      <GraphContainer>
        <h1>{activeSymbol?.symbol} chart</h1>
        <p>{progressRate?.length}</p>
        <p>{timeline}</p>
        {/* <Chart
          progressData={progressRate.sort(
            (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
          )}
        /> */}

        <Chart progressData={progressRate} />
        <Performance
          activeSymbol={activeSymbol?.symbol}
          timeline={timeline}
          setTimeline={setTimeline}
        />
      </GraphContainer>
    </InsideContainer>
  );
};

export default ActiveSymbol;
