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
  flex-direction: column;
  h1 {
    font-size: 30px;
    font-weight: 600;
  }
`;

const ActiveSymbol = ({ activeSymbol }) => {
  const [rate, setRate] = useState();
  const [errosMsg, setErrosMsg] = useState();

  const getRate = async () => {
    try {
      const rateValue = await agent.getlatestRate(activeSymbol);

      setRate(rateValue);
    } catch (err) {
      setErrosMsg(err);
    }
  };

  useEffect(() => {
    if (activeSymbol) getRate();
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
        <h2>{rate?.rate}</h2>
      </HeaderContent>
    </Header>
  );
};

export default ActiveSymbol;
