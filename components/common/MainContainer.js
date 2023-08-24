import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 20px 10px;
  width: 100%;
`;

export const MainContainer = ({ children, className }) => {
  return <Container className={className}>{children}</Container>;
};

const ContainerInner = styled.div`
  display: flex;
  margin: auto;
  flex-direction: column;
  max-width: 1140px;
  background-color: ${({ bgClr }) => bgClr};
  width: 100%;
`;

export const InsideContainer = ({ children, bgClr, className }) => {
  return (
    <ContainerInner className={className} bgClr={bgClr}>
      {children}
    </ContainerInner>
  );
};
