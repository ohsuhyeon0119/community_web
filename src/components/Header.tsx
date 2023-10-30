import styled from 'styled-components';

const StyledHeaderWrapper = styled.div`
  z-index: 100;
  background-color: white;
  flex-direction: row;
  top: 0px;
  position: fixed;
  height: 3rem;
  border-bottom: 1.2px solid rgb(222, 222, 222);
  width: 100vw;
  justify-content: space-around;

  display: none;

  @media (max-width: 768px) {
    display: flex;
  }
`;

export default function Header() {
  return (
    <StyledHeaderWrapper>
      <p>GLOBAL THINKINGS</p>
    </StyledHeaderWrapper>
  );
}
