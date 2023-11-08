import { Outlet } from 'react-router-dom';

import styled from 'styled-components';
import { Footer } from '../components/fixed/Footer';

const StyledScreenLayoutWrapper = styled.div`
  .screenLayout {
    display: grid;
    grid-template-columns: 100px 1fr;
    grid-template-rows: 1fr 100px;
    grid-template-areas: 'nav main' 'footer footer';
    width: 100%;
    height: 100%;
  }
  .headerLayout {
    grid-area: header;
  }
  .navLayout {
    grid-area: nav;
  }
  .mainLayout {
    grid-area: main;
  }

  .footerLayout {
    grid-area: footer;
    margin-left: 2rem;
    margin-right: 2rem;
    border-top: 0.1em solid rgb(222, 222, 222);
  }
  @media (max-width: 768px) {
    .screenLayout {
      width: 100%;
      height: 100%;
      grid-template-columns: none;
      grid-template-rows: 3rem 1fr 3rem 3rem;
      grid-template-areas: 'header' 'main' 'footer' 'nav';
    }
    .footerLayout {
      border: none;
    }
  }
`;

export function ScreenLayout() {
  return (
    <StyledScreenLayoutWrapper>
      <div className={'screenLayout'}>
        <div className={'headerLayout'}></div>
        <div className={'navLayout'}></div>
        {/* main */}
        <div className={'mainLayout'}>
          <Outlet></Outlet>
        </div>

        <div className={'footerLayout'}>
          <Footer></Footer>
        </div>
      </div>
    </StyledScreenLayoutWrapper>
  );
}
