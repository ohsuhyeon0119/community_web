import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getThreadById } from '../api/api';
import { useQuery } from '@tanstack/react-query';
import { getBoards } from '../api/api';
import { ThreadBox } from '../components/thread/ThreadBox';
import { Board } from '../type/type';
import ThreadById_Skeleton from '../components/thread/Skeleton';
import { animateScroll as scroll } from 'react-scroll';
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
  const isLoading_board = boardsQuery.isLoading;
  const isLoading_thread = threadQuery.isLoading;

  useEffect(() => {
    if (!!thread && !!boards) {
      const board = boards?.find((board: Board) => {
        return board.boardName === thread.boardName;
      }); // boards에서 thread의 boardName과 같은 board의 boardColor를 가져온다.

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
      {isLoading_board || isLoading_thread ? (
        <ThreadById_Skeleton></ThreadById_Skeleton>
      ) : (
        <ThreadBox
          setDeleteId={setDeleteId}
          thread={thread}
          boardcolor={boardcolor}
          boardicon={boardicon}
          id={Number(id)}
        ></ThreadBox>
      )}
    </div>
  );
}
