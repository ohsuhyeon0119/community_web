import { AiOutlineHome } from 'react-icons/ai';
import { BiSearchAlt2 } from 'react-icons/bi';
import { BiSolidSearchAlt2 } from 'react-icons/bi';

import { AiFillHome } from 'react-icons/ai';
import { IconContext } from 'react-icons';
import { BsChatLeftTextFill } from 'react-icons/bs';
import { BsChatLeftText } from 'react-icons/bs';
import { BiUser } from 'react-icons/bi';
import { BiSolidUser } from 'react-icons/bi';
import { useLocation, useNavigate } from 'react-router-dom';
import styled, { keyframes, css } from 'styled-components';

const StyledNavWrapper = styled.div`
  & .Nav {
    display: flex;

    align-items: center;
    flex-direction: column;
    top: 0px;
    position: fixed;
    height: 100vh;
    z-index: 100;
    width: 100px;
    justify-content: space-around;
    background-color: white;
    border-right: 1px solid rgb(222, 222, 222);
  }
  & .navButton {
    width: 3.5rem;
    height: 3.5rem;

    background-color: white;
    transform: scale(1);
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    transform: scale(1);
    transition: background-color 0.3s, transform 0.3s;
  }
  & .navButton:hover {
    background-color: rgba(192, 192, 192, 0.7);
    transform: scale(1.1);
  }
  @media (max-width: 768px) {
    & .Nav {
      flex-direction: row;
      top: auto;
      bottom: 0px;
      position: fixed;
      height: 3rem;
      border-top: 1.2px solid rgb(222, 222, 222);
      width: 100vw;
      justify-content: space-around;
    }
    & .navButton {
      width: 2rem;
      height: 2rem;
    }
  }
`;

export function Nav() {
  const location = useLocation();
  const nav = location.pathname.split('/')[1];
  // 현재 주소값을 받아와 stlye을 변경
  const navigate = useNavigate();
  // 클릭 시 해당 페이지로 이동

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
          </div>
          <div
            onClick={() => {
              navigate('/thread');
            }}
            className={'navButton threadContainer'}
          >
            {nav === 'thread' ? (
              <BsChatLeftTextFill></BsChatLeftTextFill>
            ) : (
              <BsChatLeftText></BsChatLeftText>
            )}
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
          </div>
          <div
            onClick={() => {
              navigate('/user');
            }}
            className={'navButton userContainer'}
          >
            {nav === 'user' ? <BiSolidUser></BiSolidUser> : <BiUser></BiUser>}
          </div>
        </div>
      </IconContext.Provider>
    </StyledNavWrapper>
  );
}
