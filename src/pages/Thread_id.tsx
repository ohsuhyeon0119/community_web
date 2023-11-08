import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { apiURL } from '../App';
import { getThreadById, deleteThreadById } from '../api/api';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { getBoards } from '../api/api';
import { ThreadBox } from '../components/thread/ThreadBox';
import { Board } from '../type/type';
interface ThreadBoxWrapperProps {
  boardcolor: string | undefined;
}
export const ThreadBoxWrapper = styled.div<ThreadBoxWrapperProps>`
  margin-top: 2rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .reviewbox {
    width: 80%;
    height: 100%;
  }
  .threadbox {
    position: relative;
    background-color: white;
    color: #444444;

    width: 100%;
    border-top: ${(props) => '0.5rem solid' + props.boardcolor};
    margin: 0 auto;

    margin-bottom: 5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .comments {
    width: 80%;
  }
  @media (max-width: 768px) {
    .threadbox {
      width: 100%;
      padding: 0.5rem;
    }
    .reviewbox {
      width: 100%;
    }
    .comments {
      width: 100%;
    }
  }
  .bookmark {
    position: absolute;
    top: -1rem;
    left: +2rem;
  }
  .titlewrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .title {
    font-size: 3rem;
    font-weight: 800;
    margin-top: 1.5rem;
    padding-top: 1rem;
    margin-bottom: 1.5rem;
    @media (max-width: 768px) {
      font-size: 1.5rem;
    }
  }

  .box {
    color: #a6a6a6;
  }
  button {
    background-color: inherit;
    color: #a6a6a6;
    border: none;
    z-index: 10;
    cursor: pointer;
    transition: transform 0.2s;
    margin-left: 0.4rem;
  }
  button:hover {
    transform: scale(1.15);
  }
  .review_content {
    font-weight: 800;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    line-height: 2.3rem;
    font-size: 1.3rem;
  }
  .liked {
    color: black;
    padding-right: 1rem;
  }
  .likedicon {
    cursor: pointer;
    color: red;
    margin-right: 0.5rem;
  }
  img {
    width: 80%;
    margin: 0 auto;
    height: auto;
  }
  .explanation {
    font-size: 1.2rem;
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding-bottom: 2rem;
    padding-top: 2rem;
    border: none;
  }
  .backbutton {
    width: 100%;
    margin-top: 2rem;
    display: flex;
    justify-content: center;
    margin-bottom: 1rem;
  }
  .backbutton:hover {
    color: black;
    font-weight: bold;
    transform: scale(1);
  }
`;

interface ThreadProps {
  setDeleteId: (id: number | null) => void;
}
export function Thread({ setDeleteId }: ThreadProps) {
  const { id } = useParams();
  const [boardcolor, setBoardcolor] = useState('');
  const [boardicon, setBoardicon] = useState('');
  const threadQuery = useQuery({
    queryKey: ['thread', Number(id)],
    queryFn: () => getThreadById(Number(id)),
  });
  const boardsQuery = useQuery({
    queryKey: ['boards'],
    queryFn: getBoards,
  });
  const boards = boardsQuery.data;
  const thread = threadQuery.data;
  useEffect(() => {
    if (!!thread && !!boards) {
      const board = boards?.filter((board: Board) => {
        return board.boardName === thread.boardName;
      })[0]; // boards에서 thread의 boardName과 같은 board의 boardColor를 가져온다.

      setBoardcolor(board.boardColor);
      setBoardicon(board.icon);
      console.log('board:', board);
    }
  }, [boardsQuery.data, threadQuery.data]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      {!!threadQuery.data && (
        <ThreadBox
          setDeleteId={setDeleteId}
          thread={threadQuery.data}
          boardcolor={boardcolor}
          boardicon={boardicon}
          id={Number(id)}
        ></ThreadBox>
      )}
    </div>
  );
}
