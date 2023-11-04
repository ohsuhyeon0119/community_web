import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAlert, setAlertClose } from '../module/loginstate';
import styled from 'styled-components';
import { RootState } from '../module';
import { useNavigate } from 'react-router-dom';
const StyledLoginAlertWrapper = styled.div`
  .background {
    position: fixed;
    top: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    background-color: rgba(0, 1, 0, 0.362);
    width: 100%;
    height: 100%;
    animation: fadein 0.5s forwards;
  }
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  .buttonBox {
    margin: 0 auto;
    margin-top: 15px;
  }
  .alertModal h1 {
    text-align: center;

    font-size: 24px;
  }

  .alertModal {
    padding: 20px;
    display: grid;
    grid-template-rows: auto auto auto auto;

    background-color: white;
    border-radius: 20px;
    animation: modalin 0.6s forwards;
  }
  @keyframes modalin {
    from {
      transform: translateY(90vh) scale(0.2);
    }
    to {
      transform: translateY(0vh) scale(1);
    }
  }
  .text {
    font-size: 20px;
    margin: 3px;
    text-align: center;
  }

  @media (max-width: 768px) {
    .alertModal h1 {
      font-size: 22px;
    }
    .text {
      font-size: 12px;
    }
  }
  .loginButton,
  .signupButton {
    transform: scale(1.1);
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    border-radius: 5px;
    border: none;
    background-color: #ff3399;
    cursor: pointer;
  }
  .signupButton {
    background-color: #9fc0de;
  }
`;

export default function LoginAlert() {
  const navi = useNavigate();
  const alertModal_isvisible = useSelector(
    (state: RootState) => state.loginStateReducer.alertModal_isvisible
  );
  const dispatch = useDispatch();
  function onSetAlert() {
    dispatch(setAlert());
  }
  function onSetAlertClose() {
    dispatch(setAlertClose());
  }
  const scroll_prevention = () => {
    const currentScrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.top = `-${currentScrollY}px`; // 현재 스크롤 위치
    document.body.style.overflowY = 'scroll';
    return currentScrollY;
  };

  const scroll_allow = (prevScrollY: number) => {
    document.body.style.position = '';
    document.body.style.width = '';
    document.body.style.top = '';
    document.body.style.overflowY = '';
    window.scrollTo(0, prevScrollY);
  };

  useEffect(() => {
    const prevScrollY = scroll_prevention();
    return () => {
      scroll_allow(prevScrollY);
    };
  }, []);

  return (
    <StyledLoginAlertWrapper>
      <div
        className={`background`}
        onClick={() => {
          onSetAlertClose();
        }}
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className={`alertModal`}
        >
          <h1>LOGIN 해주세요!</h1>
          <p className={'text'}>
            해당 페이지는 로그인을 해야만 이용할 수 있습니다.
          </p>

          <div className={'buttonBox'}>
            <button
              onClick={() => {
                onSetAlertClose();
                navi('/login');
              }}
              className={'loginButton'}
            >
              로그인
            </button>
            <button
              onClick={() => {
                onSetAlertClose();
                navi('/signup');
              }}
              className={'signupButton'}
            >
              회원가입
            </button>
          </div>
        </div>
      </div>
    </StyledLoginAlertWrapper>
  );
}
