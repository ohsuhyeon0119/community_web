import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../module';
import { IoIosCreate } from 'react-icons/io';
import { IoCreateOutline } from 'react-icons/io5';
import { setAlert } from '../module/loginstate';
const StyledHeaderWrapper = styled.div`
  z-index: 100;
  background-color: #f8f9fa;
  top: 0px;
  position: fixed;
  height: 3.2rem;
  border-bottom: 1.2px solid rgb(222, 222, 222);
  width: 100%;

  display: none;

  @media (max-width: 768px) {
    & {
      display: grid;
      grid-template-columns: 10rem 1fr 5rem;
    }
  }
  & .header-title {
    cursor: pointer;
    text-align: left;
    font-size: 1.5rem;
    font-weight: bold;
    color: black;
    margin-top: 0rem;
  }
  .triangle {
    margin-left: 1rem;
    font-size: 2.5rem;
  }
  .writeContainer {
    padding-right: 1rem;
  }
  .buttonContainer {
    width: 5rem;

    position: relative;
    right: 0px;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .icon {
    position: abolute;
    left: 0px;
    font-size: 1.5rem;
    cursor: pointer;
    transition: transform 0.3s;
  }
  .icon: hover {
    transform: scale(1.2);
  }
`;

export default function Header() {
  const location = useLocation();
  const dispatch = useDispatch();
  const nav = location.pathname.split('/')[1];
  // 현재 주소값을 받아와 stlye을 변경
  const navi = useNavigate();
  // 클릭 시 해당 페이지로 이동
  const isLoggedIn = useSelector(
    (state: RootState) => state.loginStateReducer.isLoggedIn
  );
  function onSetAlert() {
    dispatch(setAlert());
  }
  return (
    <StyledHeaderWrapper>
      <span
        className="header-title"
        onClick={() => {
          window.scrollTo(0, 0);
          navi('/');
        }}
      >
        <span className="triangle">△</span>
        Review
      </span>
      <div></div>
      <div className={'writeContainer'}>
        <div className="buttonContainer">
          <span
            className="icon"
            onClick={() => {
              if (isLoggedIn) {
                navi('/write');
              } else {
                onSetAlert();
              }
            }}
          >
            {nav === 'write' ? (
              <IoIosCreate></IoIosCreate>
            ) : (
              <IoCreateOutline></IoCreateOutline>
            )}
          </span>
        </div>
      </div>
    </StyledHeaderWrapper>
  );
}
