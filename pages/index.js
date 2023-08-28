import {
  InsideContainer,
  MainContainer,
} from "@/components/common/MainContainer";
import ActiveSymbol from "@/components/homepage/ActiveSymbol";
import colors from "@/config/colors";
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
  font-weight: 600;
  background-color: ${colors.lightGreen};
  color: ${colors.green};
  display: flex;
  justify-content: center;
  flex: 1;
  width: 100%;
  &.Active {
    background-color: ${colors.mint};
  }
  transition: all 0.15s linear;
  &:hover {
    background-color: ${colors.mint};
    cursor: pointer;
  }
`;

const index = () => {
  const [symbols, setSymbols] = useState([]);
  const [errosMsg, setErrosMsg] = useState();
  const [activeSymbol, setActiveSymbol] = useState();

  const getALLSymbols = async () => {
    try {
      const symbol = await agent.getAllSymbols();
      setSymbols(symbol);
      setActiveSymbol(symbol[0]);
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
            <Tab
              key={index}
              onClick={() => setActiveSymbol(element)}
              className={element.symbol == activeSymbol?.symbol ? "Active" : ""}
            >
              {element.symbol}
            </Tab>
          ))}
        </Table>
        <ActiveSymbol activeSymbol={activeSymbol} />
      </InsideContainer>
    </MainContainer>
  );
};

export async function getStaticProps(context) {
  return {
    props: {},
  };
}

export default index;
