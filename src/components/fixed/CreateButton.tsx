import { IoIosCreate } from 'react-icons/io';
import { IoCreateOutline } from 'react-icons/io5';
import { IconContext } from 'react-icons';
import { setAlert } from '../../module/modal';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../module';
import { Navigate } from 'react-router-dom';
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
  const dispatch = useDispatch();
  const navi = useNavigate();
  // 클릭 시 해당 페이지로 이동
  const isLoggedIn = useSelector(
    (state: RootState) => state.loginStateReducer.isLoggedIn
  );
  function onSetAlert() {
    dispatch(setAlert());
  }

  const location = useLocation();
  const nav = location.pathname.split('/')[1];
  // 버튼의 display 가 선택적으로 none;

  return (
    <StyledCreateButtonWrapper>
      {/* 특정 페이지에서만 보여지게, 나중에는 로그인에 대한 조건부*/}
      {nav === '' || nav === 'boards' || nav === 'search' ? (
        <IconContext.Provider value={{ size: '30px' }}>
          <div
            onClick={() => {
              if (isLoggedIn) {
                navi('/write');
              } else {
                onSetAlert();
              }
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
