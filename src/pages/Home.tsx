import { useEffect, useState } from 'react';
import { ThreadsList } from '../components/ThreadsList';
import styled, { keyframes, css } from 'styled-components';

import ListContainer from './Test';
interface LogoProps {
  islogofaded: string | undefined;
}
interface explainProps {
  islogofaded: string | undefined;
}
const textIn = keyframes`
from {
  opacity: 0;
  transform: translateY(+100%);
}
to {
  opacity: 1;
  transform: translateY(0);
}
`;

const fadeIn = keyframes`
from {
  opacity: 0;
  transform: scale(0.7);
}
to {
  opacity: 1;
  transform: scale(1);
}
`;

const TextComponent = styled.p<explainProps>`
  opacity: 0;
  font-size: 20px;
  color: black;
  animation: ${(props) =>
    !!props.islogofaded
      ? css`
          ${textIn} 1s ease-in-out forwards
        `
      : 'none'};
  animation-delay: 0.8s;
`;

const Mycomponent = styled.span<LogoProps>`
  font-size: 120px;
  color: black;
  & > .letter {
    display: inline-block;
    margin-right: 0.2em;
    opacity: 0;
    animation: ${(props) =>
      !!props.islogofaded
        ? css`
            ${fadeIn} 1s ease-in-out forwards
          `
        : 'none'};
  }
  & > .letter_T {
    font-size: 220px;
    animation-delay: 0.4s;
  }
`;

//처음 접속할때 보여준다
export function Home() {
  const [islogofaded, setIsLogoFaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLogoFaded(true);
    }, 300);
  }, []);
  const logostr = ['G', 'E', 'T', 'W', 'O', 'R', 'L', 'D'];

  return (
    <>
      <main>
        <div style={{ width: '1200px' }}>
          {' '}
          {
            logostr.map((str, index) => {
              return (
                <Mycomponent islogofaded={islogofaded ? 'true' : undefined}>
                  <span className={`letter letter_${str}`}> {str}</span>
                </Mycomponent>
              );
            })

            /*<ThreadsList></ThreadsList>*/
          }
        </div>
        <TextComponent islogofaded={islogofaded ? 'true' : undefined}>
          세상의 모든 이야기가 만나는 곳
        </TextComponent>
        <p>hot topic</p>
        <ListContainer></ListContainer>
      </main>
    </>
  );
}
