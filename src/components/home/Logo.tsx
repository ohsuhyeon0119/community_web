import { useEffect, useState } from 'react';
import styled, { keyframes, css } from 'styled-components';

const StyledLogoWrapper = styled.div`
  width: 100%;
  height: 50vh;
  background-color: #f5a550;
  .letter {
    color: white;
    font-size: 5rem;
  }
`;

export function Logo() {
  const logoLetters = ['세', '모', '리'];

  return (
    <StyledLogoWrapper>
      <div>
        {logoLetters.map((letter) => {
          return <span className="letter">{letter}</span>;
        })}
      </div>
    </StyledLogoWrapper>
  );
}
