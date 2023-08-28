import { currencySymbols } from "@/config/images";
import agent from "@/utils/agent";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { styled } from "styled-components";

const Header = styled.div`
  display: flex;
  margin-top: 20px;
  gap: 20px;
  width: 100%;
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
      font-weight: 600;
    }
    font-size: 20px;
    font-weight: 300;
  }
`;

const ActiveSymbol = ({ activeSymbol }) => {
  const [rate, setRate] = useState();
  const [errosMsg, setErrosMsg] = useState();
  const [updates, setUpdates] = useState([]);
  const getRate = async () => {
    try {
      const rateValue = await agent.getlatestRate(activeSymbol);

      setRate(rateValue?.rate);
    } catch (err) {
      setErrosMsg(err);
    }
  };

  useEffect(() => {
    if (activeSymbol) getRate();
    const socket = new WebSocket("ws://localhost:4000");

    socket.addEventListener("open", (event) => {
      console.log("Connected to WebSocket");
    });

    socket.addEventListener("message", (event) => {
      const message = JSON.parse(event.data);
      console.log(activeSymbol);
      if (message.type === "update" && activeSymbol) {
        const { symbol, rate } = message.message;
        console.log(message);

        if (symbol == activeSymbol.symbol) {
          setRate(rate);
        }
      }
    });

    return () => {
      socket.close(); // Clean up the WebSocket connection when the component unmounts
    };
  }, [activeSymbol]);

  return (
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
          <strong> {rate}</strong> {activeSymbol?.symbol?.slice(-3)}
        </h2>
        {/* {updates.map((update, index) => (
          <p key={index}>{update.rate}</p>
        ))} */}
      </HeaderContent>
    </Header>
  );
};

export default ActiveSymbol;
