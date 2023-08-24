import {
  InsideContainer,
  MainContainer,
} from "@/components/common/MainContainer";
import agent from "@/utils/agent";
import React, { useEffect, useState } from "react";
import { styled } from "styled-components";

const Table = styled.div`
  display: flex;
  /* justify-content: space-around; */
  /* background-color: red; */
  gap: 20px;
`;

const Tab = styled.div`
  text-align: center;
  padding: 10px;
  border-radius: 15px;
  background-color: gainsboro;
  display: flex;
  justify-content: center;
  flex: 1;
  width: 100%;
  transition: all 0.15s linear;
  &:hover {
    background-color: blue;
  }
`;

const index = () => {
  const [symbols, setSymbols] = useState([]);
  const [errosMsg, setErrosMsg] = useState();

  const getALLSymbols = async () => {
    try {
      const symbol = await agent.getAllSymbols();
      setSymbols(symbol);
      console.log(symbol);
    } catch (err) {
      setErrosMsg(err);
    }
  };

  useEffect(() => {
    getALLSymbols();
  }, []);

  return (
    <MainContainer>
      <InsideContainer>
        <Table>
          {symbols.map((element, index) => (
            <Tab key={index}>{element.symbol}</Tab>
          ))}
        </Table>
      </InsideContainer>
    </MainContainer>
  );
};

export default index;
