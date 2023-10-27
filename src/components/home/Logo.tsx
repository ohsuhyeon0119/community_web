import { useEffect, useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import styles from './../../pages/Home.module.css';

interface StyledLogoProps {
  fadein: string | undefined;
}
interface StyledSloganProps {
  fadein: string | undefined;
}
const StyledSlogan = styled.p<StyledSloganProps>`
  opacity: 0;
  font-size: 20px;
  color: black;
  animation: ${(props) =>
    props.fadein === 'fadein'
      ? css`
          ${fadein} 1s ease-in-out forwards
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
      props.fadein === 'fadein'
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
const fadein = keyframes`
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
    <div className={styles.Logowrapper}>
      {logoLetters.map((str, index) => {
        return (
          <StyledLogo key={index} fadein={islogofaded ? 'fadein' : undefined}>
            <span className={`letter letter_${str}`}> {str}</span>
          </StyledLogo>
        );
      })}

      <StyledSlogan fadein={islogofaded ? 'fadein' : undefined}>
        세상의 수많은 이야기를 공유해주세요, 당신의 의견을 적어주세요, 이
        커뮤니티에.
      </StyledSlogan>
    </div>
  );
}
