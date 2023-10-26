import { useEffect, useState } from 'react';
import { ThreadsList } from '../components/ThreadsList';
import styled, { keyframes, css } from 'styled-components';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 1fr);
  width: 300px;
  height: 300px;
`;

const Cell = styled.div`
  border: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const NewDiv = styled.div`
  background-color: blue;
  width: 80%;
  height: 80%;
  position: absolute;
`;

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

  const createRandomDivs = () => {
    const divs = [];
    const positions = [];
    while (divs.length < 10) {
      const randomIndex = Math.floor(Math.random() * 25);
      //positions에 randomIndex가 없으면

      if (!positions.includes(randomIndex)) {
        positions.push(randomIndex);
        divs.push(
          <NewDiv
            key={divs.length}
            style={
              {
                //   top: `${Math.floor(randomIndex / 5) * 20}%`,
                //  left: `${(randomIndex % 5) * 20}%`,
              }
            }
          />
        );
      }
    }
    return divs;
  };

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

        <Grid>
          {Array.from({ length: 25 }, (_, index) => (
            <Cell key={index}>{index < 10 && createRandomDivs()}</Cell>
          ))}
        </Grid>
      </main>
    </>
  );
}
