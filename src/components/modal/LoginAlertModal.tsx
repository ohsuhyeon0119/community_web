import { useEffect, useState } from 'react';
import { useDispatch} from 'react-redux';
import { setAlertClose } from '../../module/modal';
import styled from 'styled-components';

import { useLocation, useNavigate } from 'react-router-dom';
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
    font-size: 0.8rem;
    font-weight: bold;
    padding: 0.5rem;
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
  .fadeout {
    animation: fadeout 0.5s forwards;
  }
  .modalout {
    animation: modalout 0.5s forwards;
  }
  @keyframes fadeout {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
  @keyframes modalout {
    from {
      transform: translateY(0vh) scale(1);
    }
    to {
      transform: translateY(90vh) scale(0);
    }
  }
`;

export default function LoginAlert() {
  const [onAnimate_modalout, set_onAnimate_modalout] = useState<boolean>(false);
  const { pathname, search } = useLocation();
  const navi = useNavigate();

  const dispatch = useDispatch();

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
  useEffect(() => {
    const timer = onAnimate_modalout
      ? setTimeout(() => {
          set_onAnimate_modalout(false);
          onSetAlertClose();
        }, 300)
      : undefined;
    return () => {
      clearTimeout(timer);
    };
  }, [onAnimate_modalout]);

  return (
    <StyledLoginAlertWrapper>
      <div
        className={`background ${onAnimate_modalout && 'fadeout'}`}
        onClick={() => {
          set_onAnimate_modalout(true);
        }}
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className={`alertModal ${onAnimate_modalout && 'modalout'}`}
        >
          <h1>LOGIN 해주세요!</h1>
          <p className={'text'}>로그인 또는 회원가입을 진행하세요</p>

          <div className={'buttonBox'}>
            <button
              onClick={() => {
                onSetAlertClose();
                navi('/login', { state: { pathname, search } });
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
