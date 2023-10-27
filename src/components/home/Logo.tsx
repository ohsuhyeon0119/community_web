import { useEffect, useState } from 'react';
import styled, { keyframes, css } from 'styled-components';

interface StyledLogoProps {
  fadeIn: string | undefined;
}
interface StyledSloganProps {
  fadeIn: string | undefined;
}
const StyledSlogan = styled.p<StyledSloganProps>`
  opacity: 0;
  font-size: 20px;
  color: black;
  animation: ${(props) =>
    props.fadeIn === 'fadeIn'
      ? css`
          ${fadeIn} 1s ease-in-out forwards
        `
      : 'none'};
  animation-delay: 0.8s;
`;
const StyledLogo = styled.span<StyledLogoProps>`
  font-size: 100px;
  color: black;
  & > .letter {
    display: inline-block;
    margin-right: 0.2em;
    opacity: 0;
    animation: ${(props) =>
      props.fadeIn === 'fadeIn'
        ? css`
            ${fadeOut} 1s ease-in-out forwards
          `
        : 'none'};
  }
  & > .letter_T {
    font-size: 220px;
    animation-delay: 0.4s;
  }
`;
const fadeIn = keyframes`
from {
  opacity: 0;
  transform: translateY(+100%);
}
to {
  opacity: 1;
  transform: translateY(0);
}
`;
const fadeOut = keyframes`
from {
  opacity: 0;
  transform: scale(0.7);
}
to {
  opacity: 1;
  transform: scale(1);
}
`;
export function Logo() {
  const [islogofaded, setIsLogoFaded] = useState(false);
  // logo fade in animation을 위한 state
  //약간의 애니메이션 지연을 위하여
  useEffect(() => {
    setTimeout(() => {
      setIsLogoFaded(true);
    }, 300);
  }, []);

  const logoLetters = ['G', 'E', 'T', 'W', 'O', 'R', 'L', 'D'];

  return (
    <>
      {logoLetters.map((str, index) => {
        return (
          <StyledLogo key={index} fadeIn={islogofaded ? 'fadeIn' : undefined}>
            <span className={`letter letter_${str}`}> {str}</span>
          </StyledLogo>
        );
      })}

      <StyledSlogan fadeIn={islogofaded ? 'fadeIn' : undefined}>
        세상의 모든 이야기가 만나는 곳
      </StyledSlogan>
    </>
  );
}
