import { useEffect, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
// 로그인 페이지는 대문에서만 관리

// 재사용 할 수 있도록 styled-component 사용
interface StyledLoginBoxWrapperProps {
  fadein?: string;
}

const StyledLoginBoxWrapper = styled.div<StyledLoginBoxWrapperProps>`
  & {
    height: 10rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 1rem;
  }
  & .loginButton,
  & .signupButton {
    width: 7rem;
    height: 2rem;
    margin: 0.5rem;
    font-weight: bold;

    cursor: pointer;
    font-size: 1.2rem;
    border-radius: 0.5rem;
    transition: background-color 0.3s, transform 0.3s;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  & .loginButton:hover,
  & .signupButton:hover {
    background-color: rgba(192, 192, 192, 0.7);
    transform: scale(1.1);
  }
  opacity: 0;
  transform: translateY(+50%);
  animation: ${(props) =>
    props.fadein === 'fadein'
      ? css`
          ${fadein} 1s ease-in-out forwards
        `
      : 'none'};
  animation-delay: 0.8s;
`;
const fadein = keyframes`
from {
  
}
to {
  opacity: 1;
  transform: translateY(0);
}`;

export function LoginBox() {
  const [islogofaded, setIsLogoFaded] = useState(false);
  // logo fade in animation을 위한 state
  //약간의 애니메이션 지연을 위하여
  useEffect(() => {
    setTimeout(() => {
      setIsLogoFaded(true);
    }, 500);
  }, []);

  const navi = useNavigate();
  return (
    <>
      <StyledLoginBoxWrapper fadein={islogofaded ? 'fadein' : undefined}>
        <div
          onClick={() => {
            navi('/login');
          }}
          className={'loginButton'}
        >
          LOGIN
        </div>
        <div
          onClick={() => {
            navi('/signup'); // modal로 구현하기
          }}
          className={'signupButton'}
        >
          SIGNUP
        </div>
      </StyledLoginBoxWrapper>
    </>
  );
}
