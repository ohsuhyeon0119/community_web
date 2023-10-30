import { useEffect, useState } from 'react';
import styled, { keyframes, css } from 'styled-components';

interface StyledLogoProps {
  fadein: string | undefined;
}
interface StyledSloganProps {
  fadein: string | undefined;
}

const StyledLogoWrapper = styled.div`
  & .Logowrapper {
    width: 90%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .title {
    text-align: center;
  }
`;

const StyledSlogan = styled.p<StyledSloganProps>`
  opacity: 0;
  font-size: 2vw;
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
  font-size: 8vw;
  color: black;
  & > .letter {
    display: inline-block;
    margin-right: 1rem;
    opacity: 0;
    animation: ${(props) =>
      props.fadein === 'fadein'
        ? css`
            ${fadeOut} 1s ease-in-out forwards
          `
        : 'none'};
  }

  @media (max-width: 768px) {
    & {
      font-size: 4rem;
    }
    & > .letter_T {
      font-size: 6rem;
    }
  }
  @media (max-width: 720px) {
    & {
      font-size: 3.5rem;
    }
    & > .letter_T {
      font-size: 5.7rem;
    }
  }
  @media (max-width: 680px) {
    & {
      font-size: 3.2rem;
    }
    & > .letter_T {
      font-size: 4.8rem;
    }
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
    <StyledLogoWrapper>
      <div className={'Logowrapper'}>
        <div className={'title'}>
          {logoLetters.map((str, index) => {
            return (
              <StyledLogo
                key={index}
                fadein={islogofaded ? 'fadein' : undefined}
              >
                <span className={`letter letter_${str}`}> {str}</span>
              </StyledLogo>
            );
          })}
        </div>

        <StyledSlogan fadein={islogofaded ? 'fadein' : undefined}>
          세상의 수많은 이야기를 공유해주세요, 당신의 의견을 적어주세요, 이
          커뮤니티에서.
        </StyledSlogan>
      </div>
    </StyledLogoWrapper>
  );
}
