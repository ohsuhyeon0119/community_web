import { ThreadItem } from '../ThreadItem';
import { useState, useEffect } from 'react';
import styles from './../../pages/Home.module.css';
import { apiURL } from '../../App';
import type { Thread } from '../../App';
import type { Board } from '../../App';
import styled, { css } from 'styled-components';

const StyledTheadListWrapper = styled.div`
  & .threadItemContainer {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(18em, 1fr));

    grid-gap: 2rem;
    padding: 0.7rem;
    width: 100%;
  }
  & .gridCell {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  // 768px 부터는 모바일 전용
  @media (max-width: 768px) {
    & .threadItemContainer {
      grid-template-columns: 1fr;

      grid-gap: 1.5rem;
      padding: 0rem;
    }
  }
`;

export default function LatestThreads() {
  const [threads, setThreads] = useState<Thread[] | null>(null);
  const [boards, setBoards] = useState<Board[] | null>(null);
  //네트워크 연결이 끝났을 때의 분기 처리도 하기 (렌더링이 달라야 한다.)
  useEffect(() => {
    fetch(apiURL + '/threadlist')
      .then((response) => {
        // HTTP 응답을 JSON으로 파싱
        return response.json();
      })
      .then((data) => {
        // 성공적으로 데이터를 가져온 경우 실행될 코드
        console.log('threads get request completed: ', data);

        setThreads(data);
      })
      .catch((error) => {
        // 오류 처리
        console.error('데이터 가져오기 실패:', error);
      });
  }, []);

  useEffect(() => {
    fetch(apiURL + `/boards`)
      .then((response) => {
        // HTTP 응답을 JSON으로 파싱
        return response.json();
      })
      .then((data) => {
        // 성공적으로 데이터를 가져온 경우 실행될 코드
        console.log('boards get request completed: ', data);
        setBoards(data);
      })
      .catch((error) => {
        // 오류 처리
        console.error('데이터 가져오기 실패:', error);
      });
  }, []);

  return (
    <StyledTheadListWrapper>
      <h1 style={{ textAlign: 'center', fontSize: '3em' }}>LATEST THREADS</h1>
      <p
        style={{ textAlign: 'center', fontSize: '1.5em', marginBottom: '4em' }}
      >
        최근에 올라온 글들을 확인하세요!
      </p>
      <div className={'threadItemContainer'}>
        {threads?.map((thread) => {
          const boardColor = boards?.filter((board) => {
            return board.boardName === thread.boardName;
          })[0].boardColor; // boards에서 thread의 boardName과 같은 board의 boardColor를 가져온다.
          console.log('boardColor: ', boardColor);
          return (
            <div className={'gridCell'}>
              <ThreadItem
                boardColor={boardColor}
                key={thread.id as number}
                thread={thread}
              ></ThreadItem>
            </div>
          );
        })}
      </div>
    </StyledTheadListWrapper>
  );
}
