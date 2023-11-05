import { ThreadItem } from '../ThreadItem';
import { useState, useEffect } from 'react';

import { getThreadList, getBoards } from '../../api/index';
import styled, { css } from 'styled-components';
import { useQuery } from '@tanstack/react-query';

const StyledTheadListWrapper = styled.div`
  margin-top: 5rem;
  & .threadItemContainer {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(18em, 1fr));

    grid-gap: 4rem;
    padding: 0.7rem;
    width: 100%;
  }
  & .gridCell {
    color: #444444;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  // 768px 부터는 모바일 전용
  @media (max-width: 768px) {
    & .threadItemContainer {
      grid-template-columns: 1fr;
      padding: 0rem;
      grid-gap: 1.5rem;
    }
  }
`;

export default function LatestThreads() {
  const threadListQuery = useQuery({
    queryKey: ['board', 'all'],
    queryFn: getThreadList,
  });

  const boardsQuery = useQuery({
    queryKey: ['boards'],
    queryFn: getBoards,
  });

  return (
    <StyledTheadListWrapper>
      <h1
        style={{ textAlign: 'center', fontSize: '2.5em', marginBottom: '4rem' }}
      >
        🔥 HOT REVIEWS 🔥
      </h1>
      <p style={{ textAlign: 'center', fontSize: '1em', marginBottom: '3rem' }}>
        많은 사람들에게 공감 받는 리뷰들을 확인하세요.
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
