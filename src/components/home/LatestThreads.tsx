import { ThreadItem } from '../ThreadItem';
import { useState, useEffect } from 'react';
import styles from './../../pages/Home.module.css';
import { apiURL } from '../../App';
import type { Thread } from '../../App';
import type { Board } from '../../App';
import { getThreadList, getBoards } from '../../api/index';
import styled, { css } from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
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
  const threadListQuery = useQuery({
    queryKey: ['threadlist'],
    queryFn: getThreadList,
  });

  const boardsQuery = useQuery({
    queryKey: ['boards'],
    queryFn: getBoards,
  });

  return (
    <StyledTheadListWrapper>
      <h1 style={{ textAlign: 'center', fontSize: '3em' }}>LATEST THREADS</h1>
      <p
        style={{ textAlign: 'center', fontSize: '1.5em', marginBottom: '4em' }}
      >
        최근에 올라온 글들을 확인하세요!
      </p>
      {!!threadListQuery.data && !!boardsQuery && (
        <div className={'threadItemContainer'}>
          {threadListQuery.data?.map((thread) => {
            const boardColor = boardsQuery.data?.filter((board) => {
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
      )}
    </StyledTheadListWrapper>
  );
}
