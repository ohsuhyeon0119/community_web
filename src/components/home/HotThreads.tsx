import { ThreadItem } from './ThreadItem';

import { getThreadList, getBoards } from '../../api/api';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { Thread } from '../../type/type';
import type { Board } from '../../type/type';

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

export default function HotThreads() {
  const threadListQuery = useQuery({
    queryKey: ['board', 'all'],
    queryFn: getThreadList,
  });

  const boardsQuery = useQuery({
    queryKey: ['boards'],
    queryFn: getBoards,
  });

  const boards = boardsQuery.data;
  const threadList: Thread[] = threadListQuery.data;

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

      {!!threadList && !!boards && (
        <div className={'threadItemContainer'}>
          {threadList.map((thread: Thread, i) => {
            const boardColor = boards?.find((board: Board) => {
              return board.boardName === thread.boardName;
            }).boardColor; // boards에서 thread의 boardName과 같은 board의 boardColor를 가져온다.

            return (
              <div key={i} className={'gridCell'}>
                <ThreadItem
                  boardColor={boardColor}
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
