import { IoIosCreate } from 'react-icons/io';
import { IoCreateOutline } from 'react-icons/io5';
import { IconContext } from 'react-icons';

import styled from 'styled-components';

import { useNavigate, useLocation } from 'react-router-dom';

const StyledCreateButtonWrapper = styled.div`
  & .createButton {
    width: 4rem;
    height: 4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 2rem;
    background-color: red;
    position: fixed;
    bottom: 3rem;
    right: 3rem;
    background-color: rgba(240, 232, 232, 0.878);
    transform: scale(1);
    transition: background-color 0.3s, transform 0.3s;
  }
  & .createButton:hover {
    background-color: rgba(192, 192, 192, 0.7);
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export function CreateButton() {
  const location = useLocation();
  const nav = location.pathname.split('/')[1];
  // 버튼의 display 가 선택적으로 none;

  const navi = useNavigate();
  return (
    <StyledCreateButtonWrapper>
      {/* 특정 페이지에서만 보여지게, 나중에는 로그인에 대한 조건부*/}
      {nav === '' || nav === 'boards' || nav === 'search' ? (
        <IconContext.Provider value={{ size: '30px' }}>
          <div
            onClick={() => {
              navi('/write');
            }}
            className={'createButton'}
          >
            <IoCreateOutline></IoCreateOutline>
          </div>
        </IconContext.Provider>
      ) : (
        <></>
      )}
    </StyledCreateButtonWrapper>
  );
}
