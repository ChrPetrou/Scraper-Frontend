import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  min-height: 100vh;
`;

const PageLayout = ({ children, metaData }) => {
  return (
    <>
      <Container>
        {/* <Navbar /> */}
        {children}
        {/* <Footer /> */}
      </Container>
    </>
  );
};

export default PageLayout;
