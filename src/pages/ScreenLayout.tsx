import { Outlet } from 'react-router-dom';

import styled from 'styled-components';
import { Footer } from '../components/Footer';

const StyledScreenLayoutWrapper = styled.div`
  & .screenLayout {
    display: grid;
    grid-template-columns: 100px 1fr;
    grid-template-rows: 1fr 100px;
    grid-template-areas: 'nav main' 'footer footer';
    width: 100%;
    height: 100%;
  }

  & .navLayout {
    grid-area: nav;
  }
  & .mainLayout {
    grid-area: main;
    padding-left: 10px;
    padding-right: 10px;
  }

  & .footerLayout {
    grid-area: footer;
    margin-left: 2rem;
    margin-right: 2rem;
    border-top: 0.1em solid rgb(222, 222, 222);
  }
  @media (max-width: 768px) {
    & .screenLayout {
      grid-template-columns: 1fr;
      grid-template-rows: 1fr 100px;
      grid-template-areas: 'main' 'footer';
    }
  }
`;

export function ScreenLayout() {
  return (
    <StyledScreenLayoutWrapper>
      <div className={'screenLayout'}>
        {/* 좌단의 Nav를 fix한다 */}
        {/* Nav */}
        <div className={'navLayout'}></div>
        {/* main */}
        <div className={'mainLayout'}>
          <Outlet></Outlet>
        </div>
        {/* Footer */}
        <div></div>
        <div className={'footerLayout'}>
          <Footer></Footer>
        </div>
      </div>
    </StyledScreenLayoutWrapper>
  );
}
