import { AiOutlineHome } from 'react-icons/ai';
import { BiSearchAlt2 } from 'react-icons/bi';
import { BiSolidSearchAlt2 } from 'react-icons/bi';

import { AiFillHome } from 'react-icons/ai';
import { IconContext } from 'react-icons';
import { BsChatLeftTextFill, BsFillChatLeftTextFill } from 'react-icons/bs';
import { BsChatLeftText } from 'react-icons/bs';
import { BiUser } from 'react-icons/bi';
import { BiSolidUser } from 'react-icons/bi';
import { useLocation, useNavigate } from 'react-router-dom';
import styled, { keyframes, css } from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../module';
import { setAlert } from '../../module/modal';
const StyledNavWrapper = styled.div`
  & .Nav {
    display: flex;

    align-items: center;
    flex-direction: column;
    top: 0px;
    position: fixed;
    height: 100vh;
    z-index: 100;
    width: 80px;
    justify-content: space-around;
    background-color: #f8f9fa;
    border-right: 1px solid rgb(222, 222, 222);
  }
  & .navButton {
    width: 3.5rem;
    height: 3.5rem;

    background-color: #f8f9fa;
    transform: scale(1);
    border-radius: 20px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;

    transform: scale(1);
    transition: transform 0.3s;
  }
  & .navButton:hover {
    transform: scale(1.1);
  }
  .writeContainer {
    display: none;
  }
  span {
    margin-top: 0rem;
    font-size: 0.8rem;
  }
  @media (max-width: 768px) {
    & .Nav {
      flex-direction: row;
      top: auto;
      bottom: 0px;
      position: fixed;
      height: 3.3rem;
      border-top: 1.2px solid rgb(222, 222, 222);
      width: 100%;
      justify-content: space-around;
    }
    & .navButton {
      width: 2rem;
      height: 2rem;
    }
    & .navButton:hover {
      background-color: white;
      transform: scale(1.2);
    }
    .writeContainer {
      display: flex;
    }
  }
  .bold {
    font-weight: bold;
  }
`;

export function Nav() {
  const location = useLocation();
  const nav = location.pathname.split('/')[1];
  // 현재 주소값을 받아와 stlye을 변경
  const navigate = useNavigate();
  // 클릭 시 해당 페이지로 이동
  const isLoggedIn = useSelector(
    (state: RootState) => state.loginStateReducer.isLoggedIn
  );

  const dispatch = useDispatch();
  function onSetAlert() {
    dispatch(setAlert());
  }

  return (
    <StyledNavWrapper>
      <IconContext.Provider value={{ size: '1.3em' }}>
        <div className={'Nav'}>
          <div
            onClick={() => {
              navigate('/');
            }}
            className={'navButton homeContainer'}
          >
            {nav === '' ? (
              <AiFillHome></AiFillHome>
            ) : (
              <AiOutlineHome></AiOutlineHome>
            )}

            <span className={nav === '' ? 'bold' : ''}> HOME</span>
          </div>
          <div
            onClick={() => {
              navigate('/boards/all?pagenum=1');
            }}
            className={'navButton threadContainer'}
          >
            {nav === 'boards' ? (
              <BsFillChatLeftTextFill></BsFillChatLeftTextFill>
            ) : (
              <BsChatLeftText></BsChatLeftText>
            )}
            <span className={nav === 'boards' ? 'bold' : ''}>REVIEWS</span>
          </div>
          <div
            onClick={() => {
              navigate('/search');
            }}
            className={'navButton searchContainer'}
          >
            {nav === 'search' ? (
              <BiSolidSearchAlt2></BiSolidSearchAlt2>
            ) : (
              <BiSearchAlt2></BiSearchAlt2>
            )}
            <span className={nav === 'search' ? 'bold' : ''}>SEARCH</span>
          </div>

          <div
            onClick={() => {
              if (isLoggedIn) {
                navigate('/user');
              } else {
                onSetAlert();
              }
            }}
            className={'navButton userContainer'}
          >
            {nav === 'user' ? <BiSolidUser></BiSolidUser> : <BiUser></BiUser>}
            <span className={nav === 'user' ? 'bold' : ''}>USER</span>
          </div>
        </div>
      </IconContext.Provider>
    </StyledNavWrapper>
  );
}
